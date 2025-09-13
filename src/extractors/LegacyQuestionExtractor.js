class LegacyQuestionExtractor {
  constructor() {
    this.extractionPatterns = {
      // Updated patterns for the specific HTML structure found in these files
      problemBlocks: /const problemBlocks\s*=\s*\[([\s\S]*?)\]\s*;/,
      situacoes: /situacoes:\s*\[([\s\S]*?)\]/,
      questions: /questions:\s*\[([\s\S]*?)\]/,
      blocos: /const blocos\s*=\s*\[([\s\S]*?)\]\s*;/,
      levels: /const levels\s*=\s*\{([\s\S]*?)\}\s*;/,
      audioReferences: /(['"`])([^'"`]*\.mp3)\1/g,
      mathOperations: /([\+\-×÷])/g,
      questionObjects: /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g
    };
  }

  // Extract questions from single-page HTML file
  async extractFromHTML(htmlContent, filename) {
    const scriptContent = this.extractScriptContent(htmlContent);
    const questionData = this.parseQuestionData(scriptContent, filename);
    const activityMetadata = this.extractActivityMetadata(htmlContent, filename);

    return {
      filename,
      activityMetadata,
      extractedQuestions: questionData.map(q => this.standardizeExtracted(q, activityMetadata))
    };
  }

  // Extract React script from HTML
  extractScriptContent(htmlContent) {
    const scriptMatches = [
      /<script type="text\/babel">(.*?)<\/script>/ms,
      /<script[^>]*>(.*?)<\/script>/ms
    ];

    for (const pattern of scriptMatches) {
      const match = htmlContent.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return htmlContent; // Fallback to entire content
  }

  // Parse question data from script - now handles the specific patterns found
  parseQuestionData(scriptContent, filename) {
    const questions = [];

    // Handle operacoes_matematicas.html style (problemBlocks)
    if (scriptContent.includes('problemBlocks')) {
      questions.push(...this.extractFromProblemBlocks(scriptContent));
    }

    // Handle loja_roblox_nivel2.html style (blocos with situacoes)
    else if (scriptContent.includes('const blocos')) {
      questions.push(...this.extractFromBlocos(scriptContent));
    }

    // Handle calculadora_digital_integrada.html style (levels with questions)
    else if (scriptContent.includes('const levels')) {
      questions.push(...this.extractFromLevels(scriptContent));
    }

    // Fallback to original extraction methods
    else {
      questions.push(...this.extractWithOriginalMethod(scriptContent));
    }

    return questions;
  }

  // Extract from problemBlocks pattern (operacoes_matematicas.html)
  extractFromProblemBlocks(scriptContent) {
    const questions = [];
    const match = scriptContent.match(this.extractionPatterns.problemBlocks);

    if (!match) return questions;

    try {
      // Extract individual blocks
      const blocksText = match[1];
      const blocks = this.parseNestedArrays(blocksText);

      for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
        const block = blocks[blockIndex];
        for (let questionIndex = 0; questionIndex < block.length; questionIndex++) {
          const question = block[questionIndex];

          if (question.text && question.operation) {
            questions.push({
              statement: this.cleanText(question.text),
              operation: question.operation,
              explanation: this.cleanText(question.explanation) || '',
              calculation: question.calculation || '',
              blockIndex: blockIndex + 1,
              questionIndex: questionIndex + 1,
              difficulty: this.inferDifficultyFromBlock(blockIndex),
              type: 'operation_identification'
            });
          }
        }
      }
    } catch (error) {
      console.warn('Failed to parse problemBlocks:', error.message);
    }

    return questions;
  }

  // Extract from blocos pattern (loja_roblox_nivel2.html)
  extractFromBlocos(scriptContent) {
    const questions = [];
    const match = scriptContent.match(this.extractionPatterns.blocos);

    if (!match) return questions;

    try {
      const blocosText = match[1];
      const blocos = this.parseBlocosArray(blocosText);

      for (const bloco of blocos) {
        if (bloco.situacoes) {
          for (let situacaoIndex = 0; situacaoIndex < bloco.situacoes.length; situacaoIndex++) {
            const situacao = bloco.situacoes[situacaoIndex];

            // Generate actual question by combining context and question
            const fullStatement = `${situacao.contexto} ${situacao.pergunta}`;

            // Extract options from the opcoes array
            const options = situacao.opcoes ? situacao.opcoes.map(opcao => opcao.texto) : [];
            const correctAnswer = situacao.respostaCorreta || '';

            questions.push({
              statement: this.cleanText(fullStatement),
              context: this.cleanText(situacao.contexto),
              question: this.cleanText(situacao.pergunta),
              options: options,
              correct: correctAnswer,
              explanation: situacao.dica || '',
              blockTitle: bloco.titulo,
              difficulty: bloco.dificuldade || 'medium',
              robuxInicial: bloco.robuxInicial,
              type: 'shopping_calculation'
            });
          }
        }
      }
    } catch (error) {
      console.warn('Failed to parse blocos:', error.message);
    }

    return questions;
  }

  // Extract from levels pattern (calculadora_digital_integrada.html)
  extractFromLevels(scriptContent) {
    const questions = [];
    const match = scriptContent.match(this.extractionPatterns.levels);

    if (!match) return questions;

    try {
      const levelsText = match[1];
      const levels = this.parseLevelsObject(levelsText);

      for (const [levelKey, level] of Object.entries(levels)) {
        if (level.questions) {
          for (let questionIndex = 0; questionIndex < level.questions.length; questionIndex++) {
            const question = level.questions[questionIndex];

            // Generate example with actual numbers from the range
            const [min, max] = question.range;
            const a = Math.floor(Math.random() * (max - min)) + min;
            const b = Math.floor(Math.random() * (max - min)) + min;
            const actualStatement = question.context
              .replace('{a}', a.toLocaleString())
              .replace('{b}', b.toLocaleString());

            questions.push({
              statement: this.cleanText(actualStatement),
              templateContext: this.cleanText(question.context),
              numberRange: question.range,
              sampleNumbers: { a, b },
              expectedResult: a + b, // Assuming addition for calculator
              levelName: level.name,
              levelEmoji: level.emoji,
              difficulty: level.level,
              type: 'calculator_practice'
            });
          }
        }
      }
    } catch (error) {
      console.warn('Failed to parse levels:', error.message);
    }

    return questions;
  }

  // Parse nested array structure for problemBlocks
  parseNestedArrays(text) {
    const blocks = [];
    let currentBlock = [];
    let braceCount = 0;
    let currentObject = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const prevChar = i > 0 ? text[i - 1] : '';

      // Handle string literals
      if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = '';
        }
      }

      if (!inString) {
        if (char === '{') {
          braceCount++;
        } else if (char === '}') {
          braceCount--;
        }

        if (char === '[' && braceCount === 0) {
          // Start new block
          currentBlock = [];
          continue;
        } else if (char === ']' && braceCount === 0) {
          // End current block
          if (currentObject.trim()) {
            try {
              currentBlock.push(this.parseQuestionObject(currentObject.trim()));
            } catch (e) {
              console.warn('Failed to parse question object:', e.message);
            }
          }
          blocks.push(currentBlock);
          currentObject = '';
          continue;
        }

        if (braceCount > 0) {
          currentObject += char;
        } else if (char === '}' && braceCount === 0) {
          // End of a question object
          currentObject += char;
          try {
            currentBlock.push(this.parseQuestionObject(currentObject.trim()));
            currentObject = '';
          } catch (e) {
            console.warn('Failed to parse question object:', e.message);
            currentObject = '';
          }
        } else if (braceCount === 0 && char.match(/[,\s]/)) {
          // Skip commas and whitespace between objects
          continue;
        }
      } else {
        currentObject += char;
      }
    }

    return blocks;
  }

  // Parse blocos array structure
  parseBlocosArray(text) {
    const blocos = [];

    // Find each bloco object in the array
    let braceCount = 0;
    let currentObject = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const prevChar = i > 0 ? text[i - 1] : '';

      // Handle string literals
      if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = '';
        }
      }

      if (!inString) {
        if (char === '{') {
          braceCount++;
          currentObject += char;
        } else if (char === '}') {
          braceCount--;
          currentObject += char;

          if (braceCount === 0 && currentObject.trim()) {
            // We found a complete object
            try {
              const bloco = this.parseBlocoObject(currentObject.trim());
              if (bloco) {
                blocos.push(bloco);
              }
            } catch (error) {
              console.warn('Failed to parse bloco:', error.message);
            }
            currentObject = '';
          }
        } else if (braceCount > 0) {
          currentObject += char;
        }
      } else {
        if (braceCount > 0) {
          currentObject += char;
        }
      }
    }

    return blocos;
  }

  // Parse individual bloco object
  parseBlocoObject(objectText) {
    const bloco = {};

    // Extract basic properties
    bloco.id = this.extractProperty(objectText, 'id');
    bloco.titulo = this.extractProperty(objectText, 'titulo');
    bloco.dificuldade = this.extractProperty(objectText, 'dificuldade');
    bloco.robuxInicial = this.extractNumericProperty(objectText, 'robuxInicial');

    // Extract situacoes array
    const situacoesMatch = objectText.match(/situacoes:\s*\[([\s\S]*?)\](?=\s*\})/);
    if (situacoesMatch) {
      bloco.situacoes = this.parseSituacoesArray(situacoesMatch[1]);
    }

    return bloco;
  }

  // Parse situacoes array
  parseSituacoesArray(text) {
    const situacoes = [];

    // Parse objects similar to blocos parsing
    let braceCount = 0;
    let currentObject = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const prevChar = i > 0 ? text[i - 1] : '';

      // Handle string literals
      if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = '';
        }
      }

      if (!inString) {
        if (char === '{') {
          braceCount++;
          currentObject += char;
        } else if (char === '}') {
          braceCount--;
          currentObject += char;

          if (braceCount === 0 && currentObject.trim()) {
            try {
              const situacao = this.parseSituacaoObject(currentObject.trim());
              if (situacao) {
                situacoes.push(situacao);
              }
            } catch (error) {
              console.warn('Failed to parse situacao:', error.message);
            }
            currentObject = '';
          }
        } else if (braceCount > 0) {
          currentObject += char;
        }
      } else {
        if (braceCount > 0) {
          currentObject += char;
        }
      }
    }

    return situacoes;
  }

  // Parse individual situacao object
  parseSituacaoObject(objectText) {
    const situacao = {};

    situacao.contexto = this.extractProperty(objectText, 'contexto');
    situacao.pergunta = this.extractProperty(objectText, 'pergunta');
    situacao.dica = this.extractProperty(objectText, 'dica');
    situacao.respostaCorreta = this.extractNumericProperty(objectText, 'respostaCorreta');

    // Extract opcoes array
    const opcoesMatch = objectText.match(/opcoes:\s*\[([\s\S]*?)\]/);
    if (opcoesMatch) {
      situacao.opcoes = this.parseOpcoesArray(opcoesMatch[1]);
    }

    return situacao;
  }

  // Parse opcoes array
  parseOpcoesArray(text) {
    const opcoes = [];

    // Parse objects similar to other array parsers
    let braceCount = 0;
    let currentObject = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const prevChar = i > 0 ? text[i - 1] : '';

      // Handle string literals
      if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = '';
        }
      }

      if (!inString) {
        if (char === '{') {
          braceCount++;
          currentObject += char;
        } else if (char === '}') {
          braceCount--;
          currentObject += char;

          if (braceCount === 0 && currentObject.trim()) {
            try {
              const opcao = {};
              opcao.id = this.extractNumericProperty(currentObject, 'id');
              opcao.valor = this.extractNumericProperty(currentObject, 'valor');
              opcao.texto = this.extractProperty(currentObject, 'texto');
              opcoes.push(opcao);
            } catch (error) {
              console.warn('Failed to parse opcao:', error.message);
            }
            currentObject = '';
          }
        } else if (braceCount > 0) {
          currentObject += char;
        }
      } else {
        if (braceCount > 0) {
          currentObject += char;
        }
      }
    }

    return opcoes;
  }

  // Parse levels object structure
  parseLevelsObject(text) {
    const levels = {};

    // Parse each level manually with proper brace matching
    let i = 0;
    while (i < text.length) {
      // Find the next level key (bloco_X:)
      const levelKeyMatch = text.substring(i).match(/(\w+):\s*\{/);
      if (!levelKeyMatch) break;

      const levelKey = levelKeyMatch[1];
      const levelStart = i + levelKeyMatch.index + levelKeyMatch[0].length;

      // Find the matching closing brace for this level
      let braceCount = 1;
      let levelEnd = levelStart;
      let inString = false;
      let stringChar = '';

      for (let j = levelStart; j < text.length && braceCount > 0; j++) {
        const char = text[j];
        const prevChar = j > 0 ? text[j - 1] : '';

        // Handle string literals
        if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
          if (!inString) {
            inString = true;
            stringChar = char;
          } else if (char === stringChar) {
            inString = false;
            stringChar = '';
          }
        }

        if (!inString) {
          if (char === '{') {
            braceCount++;
          } else if (char === '}') {
            braceCount--;
          }
        }

        if (braceCount === 0) {
          levelEnd = j;
          break;
        }
      }

      // Extract the level content
      const levelContent = text.substring(levelStart, levelEnd);

      try {
        const level = {};
        level.name = this.extractProperty(levelContent, 'name');
        level.emoji = this.extractProperty(levelContent, 'emoji');
        level.level = this.extractProperty(levelContent, 'level');
        level.description = this.extractProperty(levelContent, 'description');

        // Extract questions array with proper bracket matching
        const questionsStart = levelContent.indexOf('questions:');
        if (questionsStart !== -1) {
          const arrayStart = levelContent.indexOf('[', questionsStart);
          if (arrayStart !== -1) {
            // Find matching closing bracket
            let bracketCount = 0;
            let arrayEnd = -1;

            for (let i = arrayStart; i < levelContent.length; i++) {
              if (levelContent[i] === '[') bracketCount++;
              else if (levelContent[i] === ']') {
                bracketCount--;
                if (bracketCount === 0) {
                  arrayEnd = i;
                  break;
                }
              }
            }

            if (arrayEnd !== -1) {
              const questionsText = levelContent.substring(arrayStart + 1, arrayEnd);
              level.questions = this.parseQuestionsArray(questionsText);
            }
          }
        }

        levels[levelKey] = level;
      } catch (error) {
        console.warn(`Failed to parse level ${levelKey}:`, error.message);
      }

      // Move to next level
      i = levelEnd + 1;
    }

    return levels;
  }

  // Parse questions array for levels
  parseQuestionsArray(text) {
    const questions = [];

    // Parse objects with proper brace matching (handles nested {a} {b} placeholders)
    let braceCount = 0;
    let currentObject = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const prevChar = i > 0 ? text[i - 1] : '';

      // Handle string literals
      if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = '';
        }
      }

      if (!inString) {
        if (char === '{') {
          braceCount++;
          if (braceCount === 1) {
            currentObject = char;
          } else {
            currentObject += char;
          }
        } else if (char === '}') {
          braceCount--;
          currentObject += char;

          if (braceCount === 0 && currentObject.trim()) {
            // We found a complete object
            try {
              const contextMatch = currentObject.match(/context:\s*["'`](.*?)["'`]/);
              const rangeMatch = currentObject.match(/range:\s*\[(\d+),\s*(\d+)\]/);

              if (contextMatch && rangeMatch) {
                questions.push({
                  context: contextMatch[1],
                  range: [parseInt(rangeMatch[1]), parseInt(rangeMatch[2])]
                });
              }
            } catch (error) {
              console.warn('Failed to parse question:', error.message);
            }
            currentObject = '';
          }
        } else if (braceCount > 0) {
          currentObject += char;
        }
      } else {
        if (braceCount > 0) {
          currentObject += char;
        }
      }
    }

    return questions;
  }

  // Extract numeric property
  extractNumericProperty(text, propertyPattern) {
    const regex = new RegExp(`(?:${propertyPattern})\\s*[:\=]\\s*(\\d+)`, 'i');
    const match = text.match(regex);
    return match ? parseInt(match[1]) : null;
  }

  // Improved question object parser for new patterns
  parseQuestionObject(objectText) {
    try {
      const question = {};

      // Extract all possible text fields
      question.text = this.extractProperty(objectText, 'text|statement|enunciado');
      question.operation = this.extractProperty(objectText, 'operation|operacao');
      question.explanation = this.extractProperty(objectText, 'explanation|explicacao');
      question.calculation = this.extractProperty(objectText, 'calculation|calculo');

      return question;
    } catch (error) {
      console.warn('Error parsing question object:', error.message);
      return null;
    }
  }

  // Fallback to original extraction method
  extractWithOriginalMethod(scriptContent) {
    const questions = [];

    // Try different patterns to find question arrays
    for (const pattern of Object.values(this.extractionPatterns)) {
      if (typeof pattern === 'object' && pattern.source) continue; // Skip regex objects

      const matches = [...scriptContent.matchAll(pattern)];
      for (const match of matches) {
        try {
          const questionText = match[1];
          const parsedQuestions = this.parseQuestionArray(questionText);
          questions.push(...parsedQuestions);
        } catch (error) {
          console.warn(`Failed to parse question pattern:`, error.message);
        }
      }
    }

    // If no structured arrays found, try to extract individual question objects
    if (questions.length === 0) {
      questions.push(...this.extractIndividualQuestions(scriptContent));
    }

    return questions;
  }

  // Parse question array text into objects (original method)
  parseQuestionArray(questionText) {
    const questions = [];

    try {
      // Clean up the text for parsing
      const cleanText = questionText
        .replace(/^\s*[\[\{]/, '')
        .replace(/[\]\}]\s*$/, '')
        .trim();

      // Try to split by question objects
      const questionMatches = [...cleanText.matchAll(this.extractionPatterns.questionObjects)];

      for (const match of questionMatches) {
        try {
          const questionObj = this.parseQuestionObject(match[0]);
          if (questionObj) {
            questions.push(questionObj);
          }
        } catch (e) {
          console.warn('Failed to parse individual question:', e.message);
        }
      }

      // If no objects found, try simpler patterns
      if (questions.length === 0) {
        questions.push(...this.parseSimpleQuestions(cleanText));
      }

    } catch (error) {
      console.warn('Failed to parse question array:', error.message);
    }

    return questions;
  }

  // Extract property value from object text (improved)
  extractProperty(text, propertyPattern) {
    const regex = new RegExp(`(?:${propertyPattern})\\s*[:\=]\\s*(['"\`])((?:(?!\\1)[^\\\\]|\\\\.)*)\\1`, 'i');
    const match = text.match(regex);
    return match ? match[2] : null;
  }

  // Extract array property from object text
  extractArrayProperty(text, propertyPattern) {
    const regex = new RegExp(`(?:${propertyPattern})\\s*[:\=]\\s*\\[(.*?)\\]`, 'is');
    const match = text.match(regex);
    if (!match) return null;

    try {
      // Extract quoted strings from array
      const arrayContent = match[1];
      const items = [...arrayContent.matchAll(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g)];
      return items.map(item => this.cleanText(item[2]));
    } catch (error) {
      return null;
    }
  }

  // Parse simple question formats
  parseSimpleQuestions(text) {
    const questions = [];

    // Split by common delimiters
    const parts = text.split(/,\s*(?=["'\{])/);

    for (const part of parts) {
      const cleanPart = part.trim().replace(/^[,\[\{]\s*/, '').replace(/\s*[\]\}]$/, '');

      if (cleanPart.length > 10) { // Minimum length for a question
        questions.push({
          statement: this.cleanText(cleanPart),
          options: [],
          correct: '',
          audio: '',
          explanation: ''
        });
      }
    }

    return questions;
  }

  // Extract individual questions from unstructured content
  extractIndividualQuestions(scriptContent) {
    const questions = [];

    // Look for common question patterns
    const patterns = [
      /["']([^"']*\?[^"']*)[\"']/g,
      /enunciado[:\s]*["']([^"']+)["']/gi,
      /statement[:\s]*["']([^"']+)["']/gi,
      /question[:\s]*["']([^"']+)["']/gi
    ];

    for (const pattern of patterns) {
      const matches = [...scriptContent.matchAll(pattern)];
      for (const match of matches) {
        const statement = this.cleanText(match[1]);
        if (statement.length > 10) {
          questions.push({
            statement,
            options: [],
            correct: '',
            audio: '',
            explanation: ''
          });
        }
      }
    }

    return questions;
  }

  // Infer difficulty from block index
  inferDifficultyFromBlock(blockIndex) {
    if (blockIndex <= 3) return 'easy';
    if (blockIndex <= 8) return 'medium';
    return 'hard';
  }

  // Clean text content
  cleanText(text) {
    if (!text) return '';
    return text
      .replace(/\\n/g, ' ')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Extract activity metadata from HTML
  extractActivityMetadata(htmlContent, filename) {
    const title = this.extractTitle(htmlContent) || filename.replace(/\.html$/, '');
    const subject = this.inferSubject(htmlContent, filename);
    const ageRange = this.inferAgeRange(htmlContent);

    return {
      activityName: title,
      filename,
      subject,
      ageRange,
      extractedAt: new Date().toISOString()
    };
  }

  // Extract title from HTML
  extractTitle(htmlContent) {
    const patterns = [
      /<title[^>]*>([^<]+)<\/title>/i,
      /<h1[^>]*>([^<]+)<\/h1>/i,
      /<h2[^>]*>([^<]+)<\/h2>/i
    ];

    for (const pattern of patterns) {
      const match = htmlContent.match(pattern);
      if (match) {
        return this.cleanText(match[1]);
      }
    }

    return null;
  }

  // Infer subject from content
  inferSubject(htmlContent, filename) {
    const content = (htmlContent + ' ' + filename).toLowerCase();

    if (content.includes('matemat') || content.includes('calculadora') || content.includes('operac')) {
      return 'matematica';
    }
    if (content.includes('historia') || content.includes('brasil')) {
      return 'historia';
    }
    if (content.includes('portugu') || content.includes('texto')) {
      return 'portugues';
    }

    return 'geral';
  }

  // Infer age range from content
  inferAgeRange(htmlContent) {
    const content = htmlContent.toLowerCase();

    if (content.includes('infantil') || content.includes('6') || content.includes('7') || content.includes('8')) {
      return '6-8';
    }
    if (content.includes('fundamental') || content.includes('9') || content.includes('10') || content.includes('11')) {
      return '9-11';
    }
    if (content.includes('medio') || content.includes('12') || content.includes('13')) {
      return '12+';
    }

    return '9-11'; // Default
  }

  // Standardize extracted question to database format
  standardizeExtracted(rawQuestion, activityMetadata) {
    return {
      // Core question data
      statement: rawQuestion.statement || '',
      context: rawQuestion.context || this.inferContext(rawQuestion.statement),

      // Audio references
      audio: this.extractAudioReferences(rawQuestion),

      // Visual data
      visual: {},

      // Mathematics data
      mathematics: this.extractMathematics(rawQuestion),

      // Metadata
      subject: activityMetadata.subject,
      difficulty: rawQuestion.difficulty || this.inferDifficulty(rawQuestion),
      ageRange: activityMetadata.ageRange,
      originalActivity: activityMetadata.activityName,

      // Question specifics
      options: rawQuestion.options || [],
      correct: rawQuestion.correct || '',
      explanation: rawQuestion.explanation || '',

      // Additional data from specific question types
      questionType: rawQuestion.type || 'general',
      blockInfo: {
        blockIndex: rawQuestion.blockIndex,
        questionIndex: rawQuestion.questionIndex,
        blockTitle: rawQuestion.blockTitle,
        levelName: rawQuestion.levelName
      },

      // Special data for template questions
      templateData: rawQuestion.templateContext ? {
        template: rawQuestion.templateContext,
        numberRange: rawQuestion.numberRange,
        sampleNumbers: rawQuestion.sampleNumbers,
        expectedResult: rawQuestion.expectedResult
      } : null,

      // Operation data for math questions
      operationData: rawQuestion.operation ? {
        operation: rawQuestion.operation,
        calculation: rawQuestion.calculation
      } : null
    };
  }

  // Infer context from statement
  inferContext(statement) {
    if (!statement) return 'general';

    const contexts = {
      'bicicleta|bike|roda': 'vehicles',
      'brinquedo|toy|jogo': 'toys',
      'escola|aluno|classe': 'school',
      'loja|comprar|vender|robux': 'shopping',
      'fazenda|animal|gado': 'farm',
      'casa|quarto|cozinha': 'home',
      'parque|diversão|brincadeira': 'entertainment',
      'calculadora|calcu|conta': 'calculator',
      'operação|operacao|soma|subtração': 'mathematics'
    };

    const lowerStatement = statement.toLowerCase();

    for (const [keywords, context] of Object.entries(contexts)) {
      if (keywords.split('|').some(keyword => lowerStatement.includes(keyword))) {
        return context;
      }
    }

    return 'general';
  }

  // Extract audio references
  extractAudioReferences(questionData) {
    const audioRefs = {};
    const content = JSON.stringify(questionData);

    const matches = [...content.matchAll(this.extractionPatterns.audioReferences)];

    for (const match of matches) {
      const audioFile = match[2];
      if (audioFile.includes('enunciado')) {
        audioRefs.enunciado = audioFile;
      } else if (audioFile.includes('explicacao')) {
        audioRefs.explicacao = audioFile;
      } else {
        audioRefs.principal = audioFile;
      }
    }

    return audioRefs;
  }

  // Extract mathematics data from question
  extractMathematics(questionData) {
    const statement = questionData.statement || questionData.text || '';
    const operations = {
      '+': 'adição',
      '-': 'subtração',
      '×': 'multiplicação',
      '*': 'multiplicação',
      '÷': 'divisão',
      '/': 'divisão'
    };

    // Check if operation is explicitly provided
    if (questionData.operation) {
      return {
        operation: questionData.operation,
        expression: questionData.calculation || this.extractExpression(statement),
        result: this.extractResult(questionData),
        hasCalculation: true
      };
    }

    // Check for operation symbols in statement
    for (const [symbol, name] of Object.entries(operations)) {
      if (statement.includes(symbol)) {
        return {
          operation: name,
          expression: this.extractExpression(statement),
          result: this.extractResult(questionData),
          hasCalculation: true
        };
      }
    }

    // Check for number patterns indicating math
    const numberPattern = /\b\d+\b/g;
    const numbers = statement.match(numberPattern);

    if (numbers && numbers.length >= 2) {
      return {
        operation: 'calculo',
        expression: statement,
        hasCalculation: true,
        numbers: numbers.map(n => parseInt(n))
      };
    }

    return {};
  }

  // Extract mathematical expression
  extractExpression(statement) {
    const mathPattern = /(\d+)\s*([\+\-×÷\*\/])\s*(\d+)/;
    const match = statement.match(mathPattern);
    return match ? match[0] : '';
  }

  // Extract result from question data
  extractResult(questionData) {
    if (questionData.expectedResult) return questionData.expectedResult;
    if (questionData.correct && typeof questionData.correct === 'number') return questionData.correct;

    const content = JSON.stringify(questionData);
    const resultPattern = /(?:result|resultado|answer|resposta)[:\s]*(\d+)/i;
    const match = content.match(resultPattern);
    return match ? parseInt(match[1]) : null;
  }

  // Infer difficulty level
  inferDifficulty(questionData) {
    const statement = questionData.statement || '';
    const mathData = this.extractMathematics(questionData);

    // Use predefined difficulty if available
    if (questionData.difficulty && typeof questionData.difficulty === 'string') {
      return questionData.difficulty.toLowerCase();
    }

    // Check for complexity indicators
    if (statement.includes('calculadora') || mathData.operation === 'divisão') {
      return 'hard';
    }

    if (mathData.numbers && mathData.numbers.some(n => n > 100)) {
      return 'medium';
    }

    if (mathData.operation === 'adição' && mathData.numbers && mathData.numbers.every(n => n <= 20)) {
      return 'easy';
    }

    return 'medium';
  }

  // Batch extract from directory
  async extractFromDirectory(htmlFiles) {
    const results = [];

    for (const file of htmlFiles) {
      try {
        const content = await this.readFile(file.path);
        const extracted = await this.extractFromHTML(content, file.name);
        results.push(extracted);
        console.log(`✓ Extracted ${extracted.extractedQuestions.length} questions from ${file.name}`);
      } catch (error) {
        console.error(`✗ Failed to extract from ${file.name}:`, error.message);
      }
    }

    return results;
  }

  // Read file helper (Node.js compatible)
  async readFile(filePath) {
    if (typeof require !== 'undefined') {
      const fs = require('fs').promises;
      return await fs.readFile(filePath, 'utf8');
    } else {
      // Browser fallback
      const response = await fetch(filePath);
      return await response.text();
    }
  }

  // Get HTML files from directory
  async getHTMLFiles(directory) {
    if (typeof require !== 'undefined') {
      const fs = require('fs').promises;
      const path = require('path');

      const files = await fs.readdir(directory);
      return files
        .filter(file => file.endsWith('.html'))
        .map(file => ({
          name: file,
          path: path.join(directory, file)
        }));
    } else {
      throw new Error('getHTMLFiles only available in Node.js environment');
    }
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LegacyQuestionExtractor };
} else {
  window.LegacyQuestionExtractor = LegacyQuestionExtractor;
}