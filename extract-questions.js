// Question extraction script for educational activities database
// Usage: node extract-questions.js

const fs = require('fs').promises;
const path = require('path');

// Import our modules (using require for Node.js compatibility)
const { LegacyQuestionExtractor } = require('./src/extractors/LegacyQuestionExtractor.js');
const { QuestionDatabase } = require('./src/data/questionDatabase.js');

class ExtractionRunner {
  constructor() {
    this.extractor = new LegacyQuestionExtractor();
    this.questionDB = new QuestionDatabase();
    this.results = {
      totalFiles: 0,
      processedFiles: 0,
      totalQuestions: 0,
      errors: []
    };
  }

  async run() {
    console.log('🚀 Starting question extraction process...\n');

    try {
      // Get HTML files from pages directory
      const htmlFiles = await this.getHTMLFiles('./pages/');
      this.results.totalFiles = htmlFiles.length;

      console.log(`📁 Found ${htmlFiles.length} HTML files to process:`);
      htmlFiles.forEach(file => console.log(`   - ${file.name}`));
      console.log('');

      // Extract questions from each file
      const extractionResults = await this.extractAllQuestions(htmlFiles);

      // Add questions to database
      await this.populateDatabase(extractionResults);

      // Export database to file
      await this.exportDatabase();

      // Generate report
      this.generateReport();

      console.log('✅ Question extraction completed successfully!');

    } catch (error) {
      console.error('❌ Extraction process failed:', error.message);
      process.exit(1);
    }
  }

  async getHTMLFiles(directory) {
    try {
      const files = await fs.readdir(directory);
      return files
        .filter(file => file.endsWith('.html'))
        .map(file => ({
          name: file,
          path: path.join(directory, file)
        }));
    } catch (error) {
      throw new Error(`Failed to read directory ${directory}: ${error.message}`);
    }
  }

  async extractAllQuestions(htmlFiles) {
    const results = [];

    console.log('🔍 Extracting questions from HTML files...\n');

    for (const file of htmlFiles) {
      try {
        console.log(`   Processing: ${file.name}`);
        const content = await fs.readFile(file.path, 'utf8');
        const extracted = await this.extractor.extractFromHTML(content, file.name);

        results.push(extracted);
        this.results.processedFiles++;
        this.results.totalQuestions += extracted.extractedQuestions.length;

        console.log(`   ✓ Found ${extracted.extractedQuestions.length} questions in ${file.name}`);

      } catch (error) {
        const errorMsg = `Failed to extract from ${file.name}: ${error.message}`;
        console.error(`   ✗ ${errorMsg}`);
        this.results.errors.push(errorMsg);
      }
    }

    console.log('');
    return results;
  }

  async populateDatabase(extractionResults) {
    console.log('💾 Adding questions to database...\n');

    let addedCount = 0;

    for (const result of extractionResults) {
      console.log(`   Processing questions from: ${result.filename}`);

      for (const question of result.extractedQuestions) {
        try {
          const questionId = this.questionDB.addQuestion(question);
          addedCount++;
          console.log(`   ✓ Added question: ${questionId}`);
        } catch (error) {
          const errorMsg = `Failed to add question from ${result.filename}: ${error.message}`;
          console.error(`   ✗ ${errorMsg}`);
          this.results.errors.push(errorMsg);
        }
      }
    }

    console.log(`\n📊 Successfully added ${addedCount} questions to database\n`);
  }

  async exportDatabase() {
    console.log('💿 Exporting database...\n');

    try {
      // Export to JSON file
      const dbData = this.questionDB.exportDatabase();
      const jsonPath = './src/data/exported-database.json';

      await fs.writeFile(jsonPath, JSON.stringify(dbData, null, 2));
      console.log(`   ✓ Database exported to: ${jsonPath}`);

      // Export questions summary
      const summary = this.generateDatabaseSummary();
      const summaryPath = './src/data/database-summary.json';

      await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));
      console.log(`   ✓ Summary exported to: ${summaryPath}`);

      // Export CSV for analysis
      await this.exportToCSV();
      console.log(`   ✓ CSV export completed`);

    } catch (error) {
      throw new Error(`Database export failed: ${error.message}`);
    }

    console.log('');
  }

  async exportToCSV() {
    const questions = this.questionDB.getAllQuestions();
    const csvRows = [
      ['ID', 'Statement', 'Subject', 'Context', 'Difficulty', 'AgeRange', 'Mathematics', 'OriginalActivity']
    ];

    for (const question of questions) {
      csvRows.push([
        question.id,
        `"${question.content.statement.replace(/"/g, '""')}"`,
        question.metadata.subject,
        question.content.context,
        question.metadata.difficulty,
        question.metadata.ageRange,
        question.mathematics.operation || 'N/A',
        question.metadata.originalActivity
      ]);
    }

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    await fs.writeFile('./src/data/questions-export.csv', csvContent);
  }

  generateDatabaseSummary() {
    const questions = this.questionDB.getAllQuestions();

    const summary = {
      totalQuestions: questions.length,
      bySubject: {},
      byDifficulty: {},
      byContext: {},
      byAgeRange: {},
      byActivity: {},
      generatedAt: new Date().toISOString()
    };

    questions.forEach(q => {
      // By subject
      const subject = q.metadata.subject;
      summary.bySubject[subject] = (summary.bySubject[subject] || 0) + 1;

      // By difficulty
      const difficulty = q.metadata.difficulty;
      summary.byDifficulty[difficulty] = (summary.byDifficulty[difficulty] || 0) + 1;

      // By context
      const context = q.content.context;
      summary.byContext[context] = (summary.byContext[context] || 0) + 1;

      // By age range
      const ageRange = q.metadata.ageRange;
      summary.byAgeRange[ageRange] = (summary.byAgeRange[ageRange] || 0) + 1;

      // By original activity
      const activity = q.metadata.originalActivity;
      summary.byActivity[activity] = (summary.byActivity[activity] || 0) + 1;
    });

    return summary;
  }

  generateReport() {
    console.log('📋 EXTRACTION REPORT');
    console.log('==========================================');
    console.log(`Total files found: ${this.results.totalFiles}`);
    console.log(`Files processed: ${this.results.processedFiles}`);
    console.log(`Total questions extracted: ${this.results.totalQuestions}`);
    console.log(`Success rate: ${((this.results.processedFiles / this.results.totalFiles) * 100).toFixed(1)}%`);

    if (this.results.errors.length > 0) {
      console.log(`\n❌ Errors encountered: ${this.results.errors.length}`);
      this.results.errors.forEach(error => console.log(`   - ${error}`));
    }

    // Database statistics
    const questions = this.questionDB.getAllQuestions();
    const summary = this.generateDatabaseSummary();

    console.log('\n📊 DATABASE STATISTICS');
    console.log('==========================================');
    console.log(`Questions in database: ${questions.length}`);

    console.log('\nBy Subject:');
    Object.entries(summary.bySubject).forEach(([subject, count]) => {
      console.log(`   ${subject}: ${count}`);
    });

    console.log('\nBy Difficulty:');
    Object.entries(summary.byDifficulty).forEach(([difficulty, count]) => {
      console.log(`   ${difficulty}: ${count}`);
    });

    console.log('\nBy Context:');
    Object.entries(summary.byContext).forEach(([context, count]) => {
      console.log(`   ${context}: ${count}`);
    });

    console.log('\n==========================================\n');
  }
}

// Main execution
async function main() {
  const runner = new ExtractionRunner();
  await runner.run();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { ExtractionRunner };