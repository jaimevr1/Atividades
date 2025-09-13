# CLAUDE CODE - QUESTION DATABASE CREATOR

## PRIMARY MISSION
Create centralized question database system implementing multi-competency architecture. Extract existing questions from single-page activities and refactor system to use shared question bank with competency-based variations.

## TASKS OVERVIEW

### Task 1: Database Architecture Creation
Create question database structure supporting multiple competencies per question

### Task 2: Question Extraction Engine  
Extract questions from existing single-page HTML activities into standardized format

### Task 3: Legacy Activity Refactoring
Convert existing activities to use centralized database with competency selection

## TASK 1: DATABASE ARCHITECTURE

### Create: `src/data/questionDatabase.js`
```javascript
class QuestionDatabase {
  constructor() {
    this.questions = new Map();
    this.competencies = new Map();
    this.activities = new Map();
  }

  // Add question with multiple competency variations
  addQuestion(questionData) {
    const standardized = this.standardizeQuestion(questionData);
    this.questions.set(standardized.id, standardized);
    return standardized.id;
  }

  // Get question for specific competency
  getQuestionForCompetency(questionId, competencyType) {
    const question = this.questions.get(questionId);
    if (!question) return null;
    
    return {
      ...question.content,
      competency: question.competencies[competencyType],
      metadata: question.metadata
    };
  }

  // Generate activity with selected competencies
  generateActivity(questionIds, competencyType, options = {}) {
    return questionIds.map(id => 
      this.getQuestionForCompetency(id, competencyType)
    ).filter(Boolean);
  }

  // Standardize question format
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
        createdAt: new Date().toISOString()
      }
    };
  }

  // Auto-generate competency variations
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
}

// Initialize global database instance
const questionDB = new QuestionDatabase();
export default questionDB;
```

### Create: `src/engines/CompetencyEngine.js`
```javascript
class CompetencyEngine {
  constructor(database) {
    this.db = database;
    this.competencyTypes = [
      'operation_identification',
      'calculation', 
      'text_interpretation',
      'problem_solving',
      'calculator_simulation'
    ];
  }

  // Generate activity blocks with specific competency focus
  generateActivityBlocks(questionIds, competencyType, blockSize = 5) {
    const blocks = [];
    for (let i = 0; i < questionIds.length; i += blockSize) {
      const blockQuestionIds = questionIds.slice(i, i + blockSize);
      const blockData = this.db.generateActivity(blockQuestionIds, competencyType);
      
      blocks.push({
        blockId: Math.floor(i / blockSize) + 1,
        competencyType,
        questions: blockData,
        metadata: {
          totalQuestions: blockData.length,
          estimatedTime: blockData.length * 30, // 30s per question
          difficulty: this.calculateBlockDifficulty(blockData)
        }
      });
    }
    return blocks;
  }

  // Adapt difficulty for age range
  adaptForAgeRange(questionData, ageRange) {
    const adaptations = {
      '6-8': { maxOptions: 3, hintsEnabled: true, timeLimit: null },
      '9-11': { maxOptions: 4, hintsEnabled: true, timeLimit: 300 },
      '12+': { maxOptions: 5, hintsEnabled: false, timeLimit: 180 }
    };
    
    const config = adaptations[ageRange] || adaptations['9-11'];
    return { ...questionData, ...config };
  }
}
```

## TASK 2: QUESTION EXTRACTION ENGINE

### Create: `src/extractors/LegacyQuestionExtractor.js`
```javascript
class LegacyQuestionExtractor {
  constructor() {
    this.extractionPatterns = {
      questionArrays: [
        /const questions = \[(.*?)\]/gms,
        /const questionBank = \[(.*?)\]/gms,
        /questionData:\s*\[(.*?)\]/gms
      ],
      audioReferences: /(['"`])([^'"`]*\.mp3)\1/g,
      mathOperations: /([\+\-\×\÷])/g
    };
  }

  // Extract questions from single-page HTML file
  async extractFromHTML(htmlContent, filename) {
    const scriptContent = this.extractScriptContent(htmlContent);
    const questionData = this.parseQuestionData(scriptContent);
    const activityMetadata = this.extractActivityMetadata(htmlContent, filename);
    
    return {
      filename,
      activityMetadata,
      extractedQuestions: questionData.map(q => this.standardizeExtracted(q, activityMetadata))
    };
  }

  // Extract React script from HTML
  extractScriptContent(htmlContent) {
    const scriptMatch = htmlContent.match(/<script type="text\/babel">(.*?)<\/script>/ms);
    return scriptMatch ? scriptMatch[1] : '';
  }

  // Parse question data from script
  parseQuestionData(scriptContent) {
    const questions = [];
    
    // Try different patterns to find question arrays
    for (const pattern of this.extractionPatterns.questionArrays) {
      const matches = scriptContent.matchAll(pattern);
      for (const match of matches) {
        try {
          const questionText = match[1];
          const parsedQuestions = this.parseQuestionArray(questionText);
          questions.push(...parsedQuestions);
        } catch (error) {
          console.warn(`Failed to parse question pattern in ${pattern}:`, error);
        }
      }
    }
    
    return questions;
  }

  // Standardize extracted question to database format
  standardizeExtracted(rawQuestion, activityMetadata) {
    return {
      statement: this.extractStatement(rawQuestion),
      context: this.inferContext(rawQuestion.statement),
      audio: this.extractAudioReferences(rawQuestion),
      mathematics: this.extractMathematics(rawQuestion),
      subject: activityMetadata.subject,
      difficulty: this.inferDifficulty(rawQuestion),
      ageRange: this.inferAgeRange(rawQuestion),
      originalActivity: activityMetadata.activityName
    };
  }

  // Extract mathematics data from question
  extractMathematics(questionData) {
    const statement = questionData.statement || questionData.text || '';
    const operations = {
      '+': 'adição', 
      '-': 'subtração',
      '×': 'multiplicação', 
      '÷': 'divisão'
    };
    
    for (const [symbol, name] of Object.entries(operations)) {
      if (statement.includes(symbol)) {
        return {
          operation: name,
          expression: this.extractExpression(statement),
          result: this.extractResult(questionData)
        };
      }
    }
    
    return {};
  }

  // Batch extract from directory
  async extractFromDirectory(htmlFiles) {
    const results = [];
    
    for (const file of htmlFiles) {
      try {
        const content = await this.readFile(file.path);
        const extracted = await this.extractFromHTML(content, file.name);
        results.push(extracted);
      } catch (error) {
        console.error(`Failed to extract from ${file.name}:`, error);
      }
    }
    
    return results;
  }
}
```

### Extraction Command Script
```javascript
// Usage: node extract-questions.js
import { LegacyQuestionExtractor } from './src/extractors/LegacyQuestionExtractor.js';
import questionDB from './src/data/questionDatabase.js';
import fs from 'fs/promises';

async function extractAllQuestions() {
  const extractor = new LegacyQuestionExtractor();
  const htmlFiles = await this.getHTMLFiles('./pages/');
  
  console.log(`Found ${htmlFiles.length} HTML files to process`);
  
  const extractionResults = await extractor.extractFromDirectory(htmlFiles);
  
  // Add to database
  for (const result of extractionResults) {
    for (const question of result.extractedQuestions) {
      const questionId = questionDB.addQuestion(question);
      console.log(`Added question ${questionId} from ${result.filename}`);
    }
  }
  
  // Export database
  await this.exportDatabase();
  
  console.log('Question extraction completed successfully');
}

extractAllQuestions().catch(console.error);
```

## TASK 3: LEGACY ACTIVITY REFACTORING

### Refactored Activity Template
```javascript
// New activity structure using database
import questionDB from '../data/questionDatabase.js';
import { CompetencyEngine } from '../engines/CompetencyEngine.js';

class DatabaseDrivenActivity extends React.Component {
  constructor(props) {
    super(props);
    
    this.competencyEngine = new CompetencyEngine(questionDB);
    this.activityConfig = {
      questionIds: ['bikes_wheels_001', 'toys_count_002', /* ... */],
      competencyType: 'calculation', // or 'operation_identification', etc.
      blocksPerSession: 3,
      questionsPerBlock: 5
    };
    
    this.state = {
      studentName: '',
      currentBlock: 0,
      currentQuestion: 0,
      activityBlocks: [],
      sessionData: []
    };
  }

  componentDidMount() {
    this.initializeActivity();
  }

  initializeActivity() {
    const blocks = this.competencyEngine.generateActivityBlocks(
      this.activityConfig.questionIds,
      this.activityConfig.competencyType,
      this.activityConfig.questionsPerBlock
    );
    
    this.setState({ activityBlocks: blocks });
  }

  renderQuestion() {
    const { activityBlocks, currentBlock, currentQuestion } = this.state;
    const question = activityBlocks[currentBlock]?.questions[currentQuestion];
    
    if (!question) return null;

    return (
      <div className="question-container">
        <div className="statement">{question.content.statement}</div>
        {this.renderCompetencyInterface(question.competency)}
        {this.renderAudioControls(question.content.audio)}
      </div>
    );
  }

  renderCompetencyInterface(competency) {
    switch (competency.type) {
      case 'multiple_choice':
        return this.renderMultipleChoice(competency);
      case 'input_number':
        return this.renderNumberInput(competency);
      case 'calculator_interface':
        return this.renderCalculator(competency);
      default:
        return null;
    }
  }

  // CSV export using database metadata
  generateCSV() {
    const { sessionData, studentName } = this.state;
    const csvRows = sessionData.map(data => [
      studentName,
      data.subject,
      data.activityName,
      data.blockName,
      data.questionId,
      data.timeSpent,
      data.correct ? 1 : 0,
      data.correct ? 0 : 1,
      data.score
    ]);
    
    return this.formatCSV(csvRows);
  }
}
```

### Migration Script Template
```javascript
// Migrate single activity to database-driven
async function migrateActivity(activityName) {
  const htmlPath = `./pages/${activityName}.html`;
  const htmlContent = await fs.readFile(htmlPath, 'utf8');
  
  // Extract questions using extractor
  const extractor = new LegacyQuestionExtractor();
  const extracted = await extractor.extractFromHTML(htmlContent, activityName);
  
  // Add to database
  const questionIds = [];
  for (const question of extracted.extractedQuestions) {
    const questionId = questionDB.addQuestion(question);
    questionIds.push(questionId);
  }
  
  // Generate new activity file
  const newActivityContent = this.generateRefactoredActivity({
    activityName: extracted.activityMetadata.activityName,
    questionIds,
    competencyType: this.inferCompetencyType(extracted),
    subject: extracted.activityMetadata.subject
  });
  
  // Write new file
  const newPath = `./pages/${activityName}_refactored.html`;
  await fs.writeFile(newPath, newActivityContent);
  
  console.log(`Migrated ${activityName} -> ${newPath}`);
  return { originalPath: htmlPath, newPath, questionIds };
}
```

## EXECUTION SEQUENCE

### Phase 1: Database Setup
1. Create database architecture files
2. Implement competency engine
3. Test with sample questions

### Phase 2: Question Extraction
1. Run extraction on existing HTML activities
2. Validate extracted question data
3. Populate database with extracted questions

### Phase 3: Activity Refactoring  
1. Create refactored activity templates
2. Migrate each existing activity
3. Test functionality and CSV export compliance

### Phase 4: Validation
1. Compare original vs refactored activity outputs
2. Ensure CSV export maintains required format
3. Validate competency variations work correctly

## SUCCESS CRITERIA

### Database Functionality
- All existing questions extracted and stored
- Multiple competency variations generated per question
- Database queries return correct question data
- CSV export maintains original format compliance

### Refactored Activities
- Activities function identically to originals
- New competency selection capabilities added
- Navigation and session management preserved
- Guidelines compliance maintained

### Performance  
- Database queries execute efficiently
- Activity loading times remain acceptable
- Memory usage stays within reasonable limits
- No regression in user experience

Execute tasks sequentially. Validate each phase before proceeding to next. Document any issues or deviations from expected results.