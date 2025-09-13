class QuestionDatabase {
  constructor() {
    this.questions = new Map();
    this.competencies = new Map();
    this.activities = new Map();
  }

  addQuestion(questionData) {
    const standardized = this.standardizeQuestion(questionData);
    this.questions.set(standardized.id, standardized);
    return standardized.id;
  }

  getQuestionForCompetency(questionId, competencyType) {
    const question = this.questions.get(questionId);
    if (!question) return null;

    return {
      ...question.content,
      competency: question.competencies[competencyType],
      metadata: question.metadata
    };
  }

  generateActivity(questionIds, competencyType, options = {}) {
    return questionIds.map(id =>
      this.getQuestionForCompetency(id, competencyType)
    ).filter(Boolean);
  }

  standardizeQuestion(rawQuestion) {
    return {
      id: this.generateId(rawQuestion),
      content: {
        statement: rawQuestion.statement,
        context: rawQuestion.context || 'general',
        keywords: this.extractKeywords(rawQuestion.statement),
        audio: rawQuestion.audio || {},
        visual: rawQuestion.visual || {}
      },
      mathematics: rawQuestion.mathematics || {},
      competencies: this.generateCompetencies(rawQuestion),
      metadata: {
        subject: rawQuestion.subject,
        difficulty: rawQuestion.difficulty,
        ageRange: rawQuestion.ageRange,
        createdAt: new Date().toISOString(),
        originalActivity: rawQuestion.originalActivity
      }
    };
  }

  generateCompetencies(rawQuestion) {
    const competencies = {};

    // Operation Identification
    if (rawQuestion.mathematics?.operation) {
      competencies.operation_identification = this.createOperationIdentification(rawQuestion);
    }

    // Calculation
    if (rawQuestion.mathematics?.result) {
      competencies.calculation = this.createCalculation(rawQuestion);
    }

    // Text Interpretation
    competencies.text_interpretation = this.createTextInterpretation(rawQuestion);

    // Problem Solving (advanced)
    competencies.problem_solving = this.createProblemSolving(rawQuestion);

    return competencies;
  }

  createOperationIdentification(rawQuestion) {
    const operations = {
      'adição': ['+', 'somar', 'adicionar'],
      'subtração': ['-', 'subtrair', 'tirar'],
      'multiplicação': ['×', '*', 'multiplicar', 'vezes'],
      'divisão': ['÷', '/', 'dividir', 'repartir']
    };

    return {
      type: 'multiple_choice',
      question: `Qual operação matemática deve ser usada para resolver: "${rawQuestion.statement}"?`,
      options: Object.keys(operations),
      correctAnswer: rawQuestion.mathematics?.operation || 'adição',
      explanation: `Esta questão requer ${rawQuestion.mathematics?.operation || 'cálculo'}.`
    };
  }

  createCalculation(rawQuestion) {
    return {
      type: 'input_number',
      question: rawQuestion.statement,
      correctAnswer: rawQuestion.mathematics?.result,
      allowedRange: this.calculateRange(rawQuestion.mathematics?.result),
      explanation: rawQuestion.mathematics?.explanation || 'Calcule o resultado da operação.'
    };
  }

  createTextInterpretation(rawQuestion) {
    return {
      type: 'multiple_choice',
      question: `O que está sendo perguntado no problema: "${rawQuestion.statement}"?`,
      options: this.generateInterpretationOptions(rawQuestion),
      correctAnswer: this.extractMainQuestion(rawQuestion.statement),
      explanation: 'Identifique corretamente o que o problema está pedindo.'
    };
  }

  createProblemSolving(rawQuestion) {
    return {
      type: 'step_by_step',
      question: rawQuestion.statement,
      steps: this.generateSolutionSteps(rawQuestion),
      explanation: 'Resolva o problema passo a passo.'
    };
  }

  generateId(rawQuestion) {
    const context = rawQuestion.context || 'general';
    const subject = rawQuestion.subject || 'math';
    const timestamp = Date.now();
    const hash = this.simpleHash(rawQuestion.statement || '');
    return `${subject}_${context}_${hash}_${timestamp}`.toLowerCase();
  }

  extractKeywords(statement) {
    if (!statement) return [];
    const words = statement.toLowerCase().split(/\s+/);
    const keywords = words.filter(word =>
      word.length > 3 &&
      !['para', 'com', 'uma', 'dos', 'das', 'que', 'são'].includes(word)
    );
    return keywords.slice(0, 5);
  }

  calculateRange(result) {
    if (!result) return null;
    const num = parseFloat(result);
    return {
      min: Math.max(0, num - 2),
      max: num + 2
    };
  }

  generateInterpretationOptions(rawQuestion) {
    const statement = rawQuestion.statement || '';
    const options = [];

    if (statement.includes('quantos')) {
      options.push('Contar quantidade total');
      options.push('Encontrar a diferença');
      options.push('Calcular o resultado');
    }

    if (statement.includes('quanto')) {
      options.push('Calcular o valor total');
      options.push('Encontrar o resultado');
      options.push('Determinar a quantidade');
    }

    // Fill with generic options if needed
    while (options.length < 4) {
      options.push(`Opção ${options.length + 1}`);
    }

    return options.slice(0, 4);
  }

  extractMainQuestion(statement) {
    if (!statement) return 'Resolver o problema';

    if (statement.includes('quantos')) return 'Contar quantidade total';
    if (statement.includes('quanto')) return 'Calcular o valor total';
    return 'Calcular o resultado';
  }

  generateSolutionSteps(rawQuestion) {
    const steps = [];

    if (rawQuestion.mathematics?.operation) {
      steps.push(`1. Identificar a operação: ${rawQuestion.mathematics.operation}`);
    }

    if (rawQuestion.mathematics?.expression) {
      steps.push(`2. Montar a expressão: ${rawQuestion.mathematics.expression}`);
    }

    if (rawQuestion.mathematics?.result) {
      steps.push(`3. Calcular o resultado: ${rawQuestion.mathematics.result}`);
    }

    return steps.length > 0 ? steps : ['1. Ler o problema', '2. Identificar os dados', '3. Calcular'];
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36).substr(0, 8);
  }

  // Database management methods
  getAllQuestions() {
    return Array.from(this.questions.values());
  }

  getQuestionsBySubject(subject) {
    return this.getAllQuestions().filter(q => q.metadata.subject === subject);
  }

  exportDatabase() {
    return {
      questions: Array.from(this.questions.entries()),
      competencies: Array.from(this.competencies.entries()),
      activities: Array.from(this.activities.entries()),
      exportDate: new Date().toISOString()
    };
  }

  importDatabase(data) {
    if (data.questions) {
      this.questions = new Map(data.questions);
    }
    if (data.competencies) {
      this.competencies = new Map(data.competencies);
    }
    if (data.activities) {
      this.activities = new Map(data.activities);
    }
  }
}

// Initialize global database instance
const questionDB = new QuestionDatabase();

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuestionDatabase, questionDB };
} else {
  window.QuestionDatabase = QuestionDatabase;
  window.questionDB = questionDB;
}