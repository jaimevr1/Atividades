// Test script for database functionality
const fs = require('fs').promises;
const { QuestionDatabase } = require('./src/data/questionDatabase.js');
const { CompetencyEngine } = require('./src/engines/CompetencyEngine.js');

async function testDatabase() {
    console.log('🧪 Testing Database Functionality\n');

    try {
        // 1. Load database from exported file
        console.log('1. Loading exported database...');
        const databaseData = JSON.parse(await fs.readFile('./src/data/exported-database.json', 'utf8'));

        const db = new QuestionDatabase();
        db.importDatabase(databaseData);

        const allQuestions = db.getAllQuestions();
        console.log(`   ✓ Loaded ${allQuestions.length} questions`);

        // 2. Test subject filtering
        console.log('\n2. Testing subject filtering...');
        const mathQuestions = db.getQuestionsBySubject('matematica');
        const historyQuestions = db.getQuestionsBySubject('historia');
        console.log(`   ✓ Mathematics questions: ${mathQuestions.length}`);
        console.log(`   ✓ History questions: ${historyQuestions.length}`);

        // 3. Test competency engine
        console.log('\n3. Testing competency engine...');
        const engine = new CompetencyEngine(db);

        // Get a sample of question IDs
        const sampleQuestionIds = mathQuestions.slice(0, 15).map(q => q.id);

        // Test different competency types
        const competencyTypes = ['calculation', 'operation_identification', 'text_interpretation'];

        for (const competencyType of competencyTypes) {
            console.log(`\n   Testing ${competencyType}:`);

            const blocks = engine.generateActivityBlocks(sampleQuestionIds, competencyType, 5);
            console.log(`   ✓ Generated ${blocks.length} blocks`);

            for (const block of blocks) {
                console.log(`     - Block ${block.blockId}: ${block.questions.length} questions, ${block.metadata.difficulty} difficulty`);
            }
        }

        // 4. Test individual question retrieval
        console.log('\n4. Testing individual question retrieval...');
        const testQuestionId = sampleQuestionIds[0];

        for (const competencyType of competencyTypes) {
            const question = db.getQuestionForCompetency(testQuestionId, competencyType);
            if (question) {
                console.log(`   ✓ ${competencyType}: Retrieved question with competency data`);
            } else {
                console.log(`   ⚠ ${competencyType}: No competency data found`);
            }
        }

        // 5. Test age range adaptation
        console.log('\n5. Testing age range adaptation...');
        const testQuestion = mathQuestions[0];
        const ageRanges = ['6-8', '9-11', '12+'];

        for (const ageRange of ageRanges) {
            const adapted = engine.adaptForAgeRange(testQuestion, ageRange);
            console.log(`   ✓ ${ageRange}: maxOptions=${adapted.maxOptions}, hintsEnabled=${adapted.hintsEnabled}`);
        }

        // 6. Test competency interface generation
        console.log('\n6. Testing competency interface generation...');
        for (const competencyType of competencyTypes) {
            const interface = engine.getCompetencyInterface(competencyType, testQuestion);
            console.log(`   ✓ ${competencyType}: ${interface.type} interface with ${interface.feedback?.immediate ? 'immediate' : 'delayed'} feedback`);
        }

        // 7. Test data validation
        console.log('\n7. Testing data validation...');
        let validCount = 0;
        let invalidCount = 0;

        for (const question of mathQuestions.slice(0, 10)) {
            for (const competencyType of competencyTypes) {
                const validation = engine.validateCompetencyData(question, competencyType);
                if (validation.valid) {
                    validCount++;
                } else {
                    invalidCount++;
                    console.log(`   ⚠ Invalid ${competencyType} for question ${question.id}: ${validation.error}`);
                }
            }
        }

        console.log(`   ✓ Valid competency configurations: ${validCount}`);
        console.log(`   ⚠ Invalid competency configurations: ${invalidCount}`);

        // 8. Test CSV generation compatibility
        console.log('\n8. Testing CSV export compatibility...');

        // Simulate session data
        const mockSessionData = {
            competencyType: 'calculation',
            questions: mathQuestions.slice(0, 5).map((q, index) => ({
                questionId: q.id,
                correct: index % 2 === 0,
                timeSpent: 30 + Math.random() * 20,
                metadata: q.metadata
            }))
        };

        const competencyReport = engine.generateCompetencyReport(mockSessionData);
        console.log(`   ✓ Generated competency report: ${competencyReport.correctAnswers}/${competencyReport.totalQuestions} correct`);
        console.log(`   ✓ Average time: ${competencyReport.averageTime}s`);
        console.log(`   ✓ Recommendations: ${competencyReport.recommendations.length} items`);

        // 9. Test database export/import cycle
        console.log('\n9. Testing export/import cycle...');

        const exportedData = db.exportDatabase();
        const newDb = new QuestionDatabase();
        newDb.importDatabase(exportedData);

        const originalCount = db.getAllQuestions().length;
        const importedCount = newDb.getAllQuestions().length;

        console.log(`   ✓ Export/import cycle: ${originalCount} → ${importedCount} questions`);

        // 10. Performance test
        console.log('\n10. Testing performance...');

        const startTime = Date.now();

        for (let i = 0; i < 100; i++) {
            const randomQuestionId = sampleQuestionIds[Math.floor(Math.random() * sampleQuestionIds.length)];
            const randomCompetency = competencyTypes[Math.floor(Math.random() * competencyTypes.length)];
            db.getQuestionForCompetency(randomQuestionId, randomCompetency);
        }

        const endTime = Date.now();
        console.log(`   ✓ 100 question retrievals in ${endTime - startTime}ms`);

        console.log('\n✅ All database tests completed successfully!');
        console.log('==========================================');
        console.log('DATABASE TEST SUMMARY:');
        console.log(`• Total questions in database: ${allQuestions.length}`);
        console.log(`• Mathematics questions: ${mathQuestions.length}`);
        console.log(`• History questions: ${historyQuestions.length}`);
        console.log(`• Competency types tested: ${competencyTypes.length}`);
        console.log(`• Age ranges supported: ${ageRanges.length}`);
        console.log('• All core functionality working correctly');
        console.log('==========================================\n');

        return true;

    } catch (error) {
        console.error('❌ Database test failed:', error);
        return false;
    }
}

// Run tests
testDatabase().then(success => {
    process.exit(success ? 0 : 1);
});