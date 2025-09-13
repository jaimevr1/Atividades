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

  // Calculate difficulty based on question complexity
  calculateBlockDifficulty(blockData) {
    if (!blockData || blockData.length === 0) return 'medium';

    const difficultyScores = blockData.map(question => {
      if (!question.metadata) return 2;

      switch (question.metadata.difficulty) {
        case 'easy': return 1;
        case 'medium': return 2;
        case 'hard': return 3;
        default: return 2;
      }
    });

    const avgScore = difficultyScores.reduce((a, b) => a + b, 0) / difficultyScores.length;

    if (avgScore <= 1.3) return 'easy';
    if (avgScore >= 2.7) return 'hard';
    return 'medium';
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

  // Generate competency-specific interface configurations
  getCompetencyInterface(competencyType, questionData) {
    switch (competencyType) {
      case 'operation_identification':
        return this.createOperationInterface(questionData);
      case 'calculation':
        return this.createCalculationInterface(questionData);
      case 'text_interpretation':
        return this.createTextInterface(questionData);
      case 'problem_solving':
        return this.createProblemSolvingInterface(questionData);
      case 'calculator_simulation':
        return this.createCalculatorInterface(questionData);
      default:
        return this.createDefaultInterface(questionData);
    }
  }

  createOperationInterface(questionData) {
    return {
      type: 'multiple_choice',
      layout: 'vertical',
      showHints: true,
      feedback: {
        immediate: true,
        explanationOnWrong: true
      },
      styling: {
        buttonClass: 'btn-operation',
        containerClass: 'operation-container'
      }
    };
  }

  createCalculationInterface(questionData) {
    return {
      type: 'number_input',
      validation: {
        allowDecimals: true,
        positiveOnly: false,
        maxDigits: 10
      },
      feedback: {
        immediate: true,
        showSteps: true
      },
      styling: {
        inputClass: 'calculation-input',
        containerClass: 'calculation-container'
      }
    };
  }

  createTextInterface(questionData) {
    return {
      type: 'multiple_choice',
      layout: 'horizontal',
      showHints: false,
      feedback: {
        immediate: true,
        explanationOnWrong: true
      },
      styling: {
        buttonClass: 'btn-text',
        containerClass: 'text-container'
      }
    };
  }

  createProblemSolvingInterface(questionData) {
    return {
      type: 'step_by_step',
      allowSkipSteps: false,
      showProgress: true,
      feedback: {
        immediate: false,
        stepByStep: true
      },
      styling: {
        stepClass: 'problem-step',
        containerClass: 'problem-container'
      }
    };
  }

  createCalculatorInterface(questionData) {
    return {
      type: 'calculator',
      calculatorType: 'basic',
      allowedOperations: ['+', '-', '×', '÷'],
      feedback: {
        immediate: true,
        showCalculation: true
      },
      styling: {
        calculatorClass: 'mini-calculator',
        containerClass: 'calculator-container'
      }
    };
  }

  createDefaultInterface(questionData) {
    return {
      type: 'multiple_choice',
      layout: 'vertical',
      showHints: true,
      feedback: {
        immediate: true,
        explanationOnWrong: true
      },
      styling: {
        buttonClass: 'btn-default',
        containerClass: 'default-container'
      }
    };
  }

  // Generate activity metadata for CSV export
  generateActivityMetadata(blocks, competencyType) {
    const totalQuestions = blocks.reduce((sum, block) => sum + block.questions.length, 0);
    const totalTime = blocks.reduce((sum, block) => sum + block.metadata.estimatedTime, 0);

    return {
      activityId: `activity_${competencyType}_${Date.now()}`,
      competencyFocus: competencyType,
      totalBlocks: blocks.length,
      totalQuestions,
      estimatedTime: totalTime,
      difficulty: this.calculateOverallDifficulty(blocks),
      createdAt: new Date().toISOString()
    };
  }

  calculateOverallDifficulty(blocks) {
    const difficulties = blocks.map(block => block.metadata.difficulty);
    const counts = difficulties.reduce((acc, diff) => {
      acc[diff] = (acc[diff] || 0) + 1;
      return acc;
    }, {});

    // Return most common difficulty
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }

  // Validate competency implementation
  validateCompetencyData(questionData, competencyType) {
    const required = {
      operation_identification: ['statement', 'mathematics.operation'],
      calculation: ['statement', 'mathematics.result'],
      text_interpretation: ['statement'],
      problem_solving: ['statement', 'mathematics'],
      calculator_simulation: ['statement', 'mathematics.result']
    };

    const requiredFields = required[competencyType] || ['statement'];

    for (const field of requiredFields) {
      if (!this.getNestedValue(questionData, field)) {
        return {
          valid: false,
          error: `Missing required field: ${field}`,
          competencyType
        };
      }
    }

    return { valid: true, competencyType };
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // Generate competency report for analytics
  generateCompetencyReport(sessionData) {
    const report = {
      competencyType: sessionData.competencyType,
      totalQuestions: sessionData.questions.length,
      correctAnswers: sessionData.questions.filter(q => q.correct).length,
      averageTime: this.calculateAverageTime(sessionData.questions),
      difficultyBreakdown: this.analyzeDifficultyDistribution(sessionData.questions),
      recommendations: this.generateRecommendations(sessionData)
    };

    return report;
  }

  calculateAverageTime(questions) {
    if (!questions.length) return 0;
    const totalTime = questions.reduce((sum, q) => sum + (q.timeSpent || 0), 0);
    return Math.round(totalTime / questions.length);
  }

  analyzeDifficultyDistribution(questions) {
    return questions.reduce((acc, q) => {
      const difficulty = q.metadata?.difficulty || 'medium';
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    }, {});
  }

  generateRecommendations(sessionData) {
    const accuracy = sessionData.questions.filter(q => q.correct).length / sessionData.questions.length;
    const avgTime = this.calculateAverageTime(sessionData.questions);

    const recommendations = [];

    if (accuracy < 0.6) {
      recommendations.push('Considere revisar conceitos básicos antes de continuar');
    } else if (accuracy > 0.9) {
      recommendations.push('Excelente performance! Pronto para desafios mais complexos');
    }

    if (avgTime > 60) {
      recommendations.push('Pratique mais para aumentar a velocidade de resolução');
    }

    return recommendations;
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CompetencyEngine };
} else {
  window.CompetencyEngine = CompetencyEngine;
}