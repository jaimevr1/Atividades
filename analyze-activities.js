// Script para analisar atividades e mapear competências
const fs = require('fs').promises;
const { QuestionDatabase } = require('./src/data/questionDatabase.js');

async function analyzeActivities() {
    console.log('📊 Analisando atividades para mapeamento de competências\n');

    try {
        // Carregar banco de dados
        const databaseData = JSON.parse(await fs.readFile('./src/data/exported-database.json', 'utf8'));
        const db = new QuestionDatabase();
        db.importDatabase(databaseData);

        const allQuestions = db.getAllQuestions();

        // Mapear questões por atividade original
        const activitiesMap = {};

        allQuestions.forEach(question => {
            const activity = question.metadata.originalActivity;
            if (!activitiesMap[activity]) {
                activitiesMap[activity] = {
                    questions: [],
                    contexts: new Set(),
                    difficulties: new Set(),
                    subjects: new Set(),
                    mathOperations: new Set()
                };
            }

            activitiesMap[activity].questions.push(question);
            activitiesMap[activity].contexts.add(question.content.context);
            activitiesMap[activity].difficulties.add(question.metadata.difficulty);
            activitiesMap[activity].subjects.add(question.metadata.subject);

            if (question.mathematics?.operation) {
                activitiesMap[activity].mathOperations.add(question.mathematics.operation);
            }
        });

        // Analisar cada atividade
        console.log('🎯 MAPEAMENTO DE ATIVIDADES PARA REFATORAÇÃO');
        console.log('='.repeat(60));

        const activityMappings = {};

        for (const [activityName, data] of Object.entries(activitiesMap)) {
            if (activityName === 'Operações Matemáticas - Database Driven') continue; // Skip o exemplo já criado

            console.log(`\n📘 ${activityName}`);
            console.log(`   Questões: ${data.questions.length}`);
            console.log(`   Contextos: ${Array.from(data.contexts).join(', ')}`);
            console.log(`   Dificuldades: ${Array.from(data.difficulties).join(', ')}`);
            console.log(`   Matérias: ${Array.from(data.subjects).join(', ')}`);
            console.log(`   Operações: ${Array.from(data.mathOperations).join(', ')}`);

            // Sugerir competência baseada na análise
            const suggestedCompetency = suggestCompetency(activityName, data);
            console.log(`   Competência Sugerida: ${suggestedCompetency}`);

            // Sugerir configuração de blocos
            const blockConfig = suggestBlockConfiguration(data.questions.length);
            console.log(`   Configuração de Blocos: ${blockConfig.blocks} blocos de ${blockConfig.questionsPerBlock} questões`);

            // Mapear arquivo HTML correspondente
            const htmlFile = mapToHtmlFile(activityName);
            console.log(`   Arquivo HTML: ${htmlFile}`);

            // Salvar mapeamento
            activityMappings[activityName] = {
                questionsCount: data.questions.length,
                contexts: Array.from(data.contexts),
                difficulties: Array.from(data.difficulties),
                subjects: Array.from(data.subjects),
                mathOperations: Array.from(data.mathOperations),
                suggestedCompetency,
                blockConfig,
                htmlFile,
                questionIds: data.questions.map(q => q.id)
            };
        }

        // Salvar mapeamento
        await fs.writeFile(
            './src/data/activity-mappings.json',
            JSON.stringify(activityMappings, null, 2)
        );

        console.log('\n✅ Mapeamento salvo em: ./src/data/activity-mappings.json');
        console.log(`\n📈 ESTATÍSTICAS GERAIS:`);
        console.log(`   Total de atividades: ${Object.keys(activityMappings).length}`);
        console.log(`   Total de questões: ${allQuestions.length - 1}`); // -1 para excluir o exemplo

        return activityMappings;

    } catch (error) {
        console.error('❌ Erro na análise:', error);
        return null;
    }
}

function suggestCompetency(activityName, data) {
    const name = activityName.toLowerCase();

    if (name.includes('calculadora')) {
        return 'calculator_simulation';
    } else if (name.includes('operações') || name.includes('identificação')) {
        return 'operation_identification';
    } else if (name.includes('história') || name.includes('detective')) {
        return 'text_interpretation';
    } else if (name.includes('construtor') || name.includes('minecraft')) {
        return 'calculation';
    } else if (data.mathOperations.size > 0) {
        return 'calculation';
    } else if (data.subjects.has('historia')) {
        return 'text_interpretation';
    } else {
        return 'calculation'; // default para matemática
    }
}

function suggestBlockConfiguration(totalQuestions) {
    if (totalQuestions <= 20) {
        return { blocks: Math.ceil(totalQuestions / 5), questionsPerBlock: 5 };
    } else if (totalQuestions <= 60) {
        return { blocks: Math.ceil(totalQuestions / 10), questionsPerBlock: 10 };
    } else {
        return { blocks: Math.ceil(totalQuestions / 15), questionsPerBlock: 15 };
    }
}

function mapToHtmlFile(activityName) {
    const mappings = {
        '🧮 Calculadora Digital Expert': 'calculadora_digital_integrada.html',
        'Quiz de Identificação de Operações Matemáticas': 'operacoes_matematicas.html',
        'Loja do Roblox - Nível 2': 'loja_roblox_nivel2.html',
        'Fazenda de Mobs': 'fazenda_mobs.html',
        'Construtor Minecraft': 'minecraft_constructor.html',
        'Construtor de História do Brasil': 'construtor_historia_brasil.html',
        'Detective da História - Independência do Brasil': 'detective_historia_independencia.html',
        'Corrida da História do Brasil': 'corrida_historia_brasil.html'
    };

    return mappings[activityName] || 'unknown.html';
}

// Executar análise
analyzeActivities().catch(console.error);