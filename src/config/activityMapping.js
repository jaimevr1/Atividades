/**
 * Mapeamento de atividades para competências e blocos de questões
 * Define quais questões do banco de dados cada atividade deve consumir
 */

const ACTIVITY_MAPPING = {
  // Atividades de Matemática
  'operacoes_matematicas': {
    name: 'Quiz de Identificação de Operações Matemáticas',
    subject: 'matematica',
    competencies: ['operation_identification', 'text_interpretation'],
    questionBlocks: [
      { blockId: 'matematica_basica_01', questions: 5 },
      { blockId: 'matematica_basica_02', questions: 5 },
      { blockId: 'matematica_basica_03', questions: 5 },
      { blockId: 'matematica_basica_04', questions: 5 },
      { blockId: 'matematica_basica_05', questions: 5 }
    ],
    difficulty: 'easy',
    ageRange: '6-8',
    theme: 'general'
  },

  'calculadora_digital_integrada': {
    name: '🧮 Calculadora Digital Expert',
    subject: 'matematica',
    competencies: ['calculation', 'operation_identification', 'problem_solving'],
    questionBlocks: [
      { blockId: 'calculadora_01', questions: 10 },
      { blockId: 'calculadora_02', questions: 10 },
      { blockId: 'calculadora_03', questions: 10 },
      { blockId: 'calculadora_04', questions: 10 },
      { blockId: 'calculadora_05', questions: 10 },
      { blockId: 'calculadora_06', questions: 10 }
    ],
    difficulty: 'medium',
    ageRange: '6-8',
    theme: 'calculator'
  },

  'loja_roblox_nivel2': {
    name: 'Loja do Roblox - Nível 2',
    subject: 'matematica',
    competencies: ['calculation', 'problem_solving', 'text_interpretation'],
    questionBlocks: [
      { blockId: 'roblox_shopping_01', questions: 5 },
      { blockId: 'roblox_shopping_02', questions: 5 },
      { blockId: 'roblox_shopping_03', questions: 5 }
    ],
    difficulty: 'medium',
    ageRange: '6-8',
    theme: 'shopping',
    context: 'Você está na loja do Roblox comprando itens para seu avatar!'
  },

  'fazenda_mobs': {
    name: 'Fazenda de Mobs',
    subject: 'matematica',
    competencies: ['calculation', 'operation_identification'],
    questionBlocks: [
      { blockId: 'fazenda_01', questions: 5 },
      { blockId: 'fazenda_02', questions: 5 },
      { blockId: 'fazenda_03', questions: 5 },
      { blockId: 'fazenda_04', questions: 5 }
    ],
    difficulty: 'easy',
    ageRange: '6-8',
    theme: 'farm'
  },

  'minecraft_constructor': {
    name: 'Construtor Minecraft',
    subject: 'matematica',
    competencies: ['calculation', 'problem_solving'],
    questionBlocks: [
      { blockId: 'minecraft_01', questions: 1 },
      { blockId: 'minecraft_02', questions: 1 },
      { blockId: 'minecraft_03', questions: 1 },
      { blockId: 'minecraft_04', questions: 1 }
    ],
    difficulty: 'medium',
    ageRange: '6-8',
    theme: 'entertainment'
  },

  // Atividades de História
  'construtor_historia_brasil': {
    name: 'Construtor de História do Brasil',
    subject: 'historia',
    competencies: ['text_interpretation', 'problem_solving'],
    questionBlocks: [
      { blockId: 'historia_brasil_01', questions: 2 },
      { blockId: 'historia_brasil_02', questions: 2 },
      { blockId: 'historia_brasil_03', questions: 3 },
      { blockId: 'historia_brasil_04', questions: 3 }
    ],
    difficulty: 'medium',
    ageRange: '6-8',
    theme: 'general'
  },

  'detective_historia_independencia': {
    name: 'Detective da História - Independência do Brasil',
    subject: 'historia',
    competencies: ['text_interpretation', 'problem_solving'],
    questionBlocks: [
      { blockId: 'independencia_01', questions: 2 },
      { blockId: 'independencia_02', questions: 2 },
      { blockId: 'independencia_03', questions: 3 },
      { blockId: 'independencia_04', questions: 3 }
    ],
    difficulty: 'medium',
    ageRange: '6-8',
    theme: 'general'
  },

  'corrida_historia_brasil': {
    name: 'Corrida da História do Brasil',
    subject: 'historia',
    competencies: ['text_interpretation'],
    questionBlocks: [
      { blockId: 'corrida_historia_01', questions: 2 },
      { blockId: 'corrida_historia_02', questions: 3 },
      { blockId: 'corrida_historia_03', questions: 2 },
      { blockId: 'corrida_historia_04', questions: 3 }
    ],
    difficulty: 'easy',
    ageRange: '6-8',
    theme: 'general'
  }
};

/**
 * Configuração de competências por matéria
 */
const COMPETENCY_CONFIG = {
  matematica: {
    operation_identification: {
      name: 'Identificação de Operações',
      description: 'Identificar qual operação matemática usar em um problema',
      weight: 0.25
    },
    calculation: {
      name: 'Cálculo',
      description: 'Resolver operações matemáticas básicas',
      weight: 0.35
    },
    text_interpretation: {
      name: 'Interpretação de Texto',
      description: 'Entender o que está sendo perguntado no problema',
      weight: 0.20
    },
    problem_solving: {
      name: 'Resolução de Problemas',
      description: 'Resolver problemas matemáticos passo a passo',
      weight: 0.20
    }
  },
  historia: {
    text_interpretation: {
      name: 'Interpretação de Texto',
      description: 'Compreender textos históricos e contextos',
      weight: 0.40
    },
    problem_solving: {
      name: 'Análise Histórica',
      description: 'Analisar eventos e fazer conexões históricas',
      weight: 0.35
    },
    critical_thinking: {
      name: 'Pensamento Crítico',
      description: 'Avaliar informações históricas criticamente',
      weight: 0.25
    }
  }
};

/**
 * Mapeamento de blocos para questões específicas do banco de dados
 * Cada bloco referencia questões reais do banco
 */
const BLOCK_QUESTION_MAPPING = {
  // Blocos de Matemática Básica
  'matematica_basica_01': {
    questions: [1, 2, 3, 4, 5],
    difficulty: 'easy',
    topic: 'operacoes_basicas'
  },
  'matematica_basica_02': {
    questions: [6, 7, 8, 9, 10],
    difficulty: 'easy',
    topic: 'operacoes_basicas'
  },
  'matematica_basica_03': {
    questions: [11, 12, 13, 14, 15],
    difficulty: 'medium',
    topic: 'operacoes_basicas'
  },
  'matematica_basica_04': {
    questions: [16, 17, 18, 19, 20],
    difficulty: 'medium',
    topic: 'operacoes_basicas'
  },
  'matematica_basica_05': {
    questions: [21, 22, 23, 24, 25],
    difficulty: 'hard',
    topic: 'operacoes_basicas'
  },

  // Blocos da Calculadora
  'calculadora_01': {
    questions: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    difficulty: 'medium',
    topic: 'calculadora'
  },
  'calculadora_02': {
    questions: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    difficulty: 'medium',
    topic: 'calculadora'
  },
  'calculadora_03': {
    questions: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
    difficulty: 'hard',
    topic: 'calculadora'
  },
  'calculadora_04': {
    questions: [56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
    difficulty: 'hard',
    topic: 'calculadora'
  },
  'calculadora_05': {
    questions: [66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
    difficulty: 'hard',
    topic: 'calculadora'
  },
  'calculadora_06': {
    questions: [76, 77, 78, 79, 80, 81, 82, 83, 84, 85],
    difficulty: 'hard',
    topic: 'calculadora'
  },

  // Blocos do Roblox
  'roblox_shopping_01': {
    questions: [200, 201, 202, 203, 204],
    difficulty: 'medium',
    topic: 'compras'
  },
  'roblox_shopping_02': {
    questions: [205, 206, 207, 208, 209],
    difficulty: 'medium',
    topic: 'compras'
  },
  'roblox_shopping_03': {
    questions: [210, 211, 212, 213, 214],
    difficulty: 'medium',
    topic: 'compras'
  },

  // Blocos da Fazenda
  'fazenda_01': {
    questions: [86, 87, 88, 89, 90],
    difficulty: 'easy',
    topic: 'fazenda'
  },
  'fazenda_02': {
    questions: [91, 92, 93, 94, 95],
    difficulty: 'easy',
    topic: 'fazenda'
  },
  'fazenda_03': {
    questions: [96, 97, 98, 99, 100],
    difficulty: 'medium',
    topic: 'fazenda'
  },
  'fazenda_04': {
    questions: [101, 102, 103, 104, 105],
    difficulty: 'medium',
    topic: 'fazenda'
  },

  // Blocos do Minecraft
  'minecraft_01': {
    questions: [215],
    difficulty: 'medium',
    topic: 'construcao'
  },
  'minecraft_02': {
    questions: [216],
    difficulty: 'medium',
    topic: 'construcao'
  },
  'minecraft_03': {
    questions: [217],
    difficulty: 'hard',
    topic: 'construcao'
  },
  'minecraft_04': {
    questions: [218],
    difficulty: 'hard',
    topic: 'construcao'
  },

  // Blocos de História
  'historia_brasil_01': {
    questions: [236, 237],
    difficulty: 'medium',
    topic: 'brasil_colonial'
  },
  'historia_brasil_02': {
    questions: [238, 239],
    difficulty: 'medium',
    topic: 'independencia'
  },
  'historia_brasil_03': {
    questions: [240, 241, 242],
    difficulty: 'hard',
    topic: 'republica'
  },
  'historia_brasil_04': {
    questions: [243, 244, 245],
    difficulty: 'hard',
    topic: 'brasil_moderno'
  },

  'independencia_01': {
    questions: [246, 247],
    difficulty: 'medium',
    topic: 'independencia'
  },
  'independencia_02': {
    questions: [248, 249],
    difficulty: 'medium',
    topic: 'independencia'
  },
  'independencia_03': {
    questions: [250, 251, 252],
    difficulty: 'hard',
    topic: 'independencia'
  },
  'independencia_04': {
    questions: [253, 254, 255],
    difficulty: 'hard',
    topic: 'independencia'
  },

  'corrida_historia_01': {
    questions: [256, 257],
    difficulty: 'easy',
    topic: 'descobrimento'
  },
  'corrida_historia_02': {
    questions: [258, 259, 260],
    difficulty: 'easy',
    topic: 'colonizacao'
  },
  'corrida_historia_03': {
    questions: [261, 262],
    difficulty: 'medium',
    topic: 'imperio'
  },
  'corrida_historia_04': {
    questions: [263, 264, 265],
    difficulty: 'medium',
    topic: 'republica'
  }
};

/**
 * Utilitários para trabalhar com o mapeamento
 */
const ActivityMapping = {
  getActivityConfig(activityId) {
    return ACTIVITY_MAPPING[activityId];
  },

  getBlockQuestions(blockId) {
    return BLOCK_QUESTION_MAPPING[blockId];
  },

  getCompetencyConfig(subject, competencyId) {
    return COMPETENCY_CONFIG[subject]?.[competencyId];
  },

  getAllActivities() {
    return Object.keys(ACTIVITY_MAPPING);
  },

  getActivitiesBySubject(subject) {
    return Object.entries(ACTIVITY_MAPPING)
      .filter(([_, config]) => config.subject === subject)
      .map(([id, _]) => id);
  },

  generateActivityQuestions(activityId) {
    const config = ACTIVITY_MAPPING[activityId];
    if (!config) return [];

    const allQuestions = [];
    config.questionBlocks.forEach(block => {
      const blockData = BLOCK_QUESTION_MAPPING[block.blockId];
      if (blockData) {
        const questions = blockData.questions.slice(0, block.questions);
        allQuestions.push(...questions);
      }
    });

    return allQuestions;
  },

  validateActivityMapping() {
    const errors = [];

    Object.entries(ACTIVITY_MAPPING).forEach(([activityId, config]) => {
      config.questionBlocks.forEach(block => {
        if (!BLOCK_QUESTION_MAPPING[block.blockId]) {
          errors.push(`Block ${block.blockId} not found for activity ${activityId}`);
        }
      });
    });

    return errors;
  }
};

// Export para usar em Node.js ou browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ACTIVITY_MAPPING,
    COMPETENCY_CONFIG,
    BLOCK_QUESTION_MAPPING,
    ActivityMapping
  };
} else {
  window.ACTIVITY_MAPPING = ACTIVITY_MAPPING;
  window.COMPETENCY_CONFIG = COMPETENCY_CONFIG;
  window.BLOCK_QUESTION_MAPPING = BLOCK_QUESTION_MAPPING;
  window.ActivityMapping = ActivityMapping;
}