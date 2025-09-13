# MULTI-COMPETENCY DATABASE IMPLEMENTATION

## IMPLEMENTATION OBJECTIVE
Create database system where single question statement generates multiple educational activities with different competencies and pedagogical objectives, maximizing reuse of audiovisual content.

## DATABASE SCHEMA IMPLEMENTATION

### Core Question Structure
```javascript
// src/data/schemas/QuestionSchema.js
export const QuestionSchema = {
  // UNIQUE IDENTIFICATION
  id: String, // "bikes_wheels_001"
  category: String, // "multiplicacao_basica" 
  difficulty: String, // "intermediario"
  ageRange: String, // "8-12"
  
  // REUSABLE CONTENT
  content: {
    statement: String, // Core question text
    context: String, // "colecao_brinquedos"
    keywords: Array, // ["bicicletas", "rodas", "cada", "total"]
    
    // SHARED AUDIO ASSETS
    audio: {
      enunciado: String, // Path to statement audio
      explicacao: String // Path to explanation audio
    },
    
    // VISUAL ELEMENTS
    visual: {
      emoji: String, // "🚲"
      illustration: String, // SVG path
      animation: String // Animation file path
    }
  },
  
  // MATHEMATICAL DATA
  mathematics: {
    operation: String, // "multiplicação"
    expression: String, // "9 × 2"
    result: Number, // 18
    steps: Array, // ["9 bicicletas", "2 rodas cada", "9 × 2 = 18"]
    verification: String // "9 + 9 + 9 + 9 + 9 + 9 + 9 + 9 + 9 = 18"
  },
  
  // MULTIPLE COMPETENCIES
  competencies: Object // Defined below
};
```

### Competency Variations Database
```javascript
// src/data/CompetencyDatabase.js
export class CompetencyDatabase {
  constructor() {
    this.competencyTemplates = {
      // 1. OPERATION IDENTIFICATION
      operation_identification: {
        title: "Qual operação devemos usar?",
        type: "multiple_choice",
        subject: "Matematica",
        activity: "Identificacao de Operacoes",
        
        generate: (questionData) => ({
          question: "Para resolver este problema, qual operação matemática devemos usar?",
          options: [
            { id: "a", text: "Adição (somar)", hint: "Quando juntamos quantidades" },
            { id: "b", text: "Subtração (diminuir)", hint: "Quando tiramos ou perdemos algo" },
            { id: "c", text: "Multiplicação (vezes)", hint: "Quando temos grupos iguais", 
              correct: questionData.mathematics.operation === "multiplicação" },
            { id: "d", text: "Divisão (dividir)", hint: "Quando repartimos igualmente" }
          ],
          feedback: {
            correct: `Perfeito! ${this.generateOperationExplanation(questionData)}`,
            wrong: "Pense: como os elementos estão organizados no problema?"
          }
        })
      },

      // 2. MATHEMATICAL CALCULATION  
      calculation: {
        title: "Calcule a resposta",
        type: "input_number", 
        subject: "Matematica",
        activity: "Quiz de Calculos",
        
        generate: (questionData) => ({
          question: `Calcule: ${questionData.mathematics.expression} = ?`,
          input: {
            type: "number",
            min: 0,
            max: 9999,
            placeholder: "Digite sua resposta"
          },
          answer: {
            correct: questionData.mathematics.result,
            tolerance: 0
          },
          hints: questionData.mathematics.steps || [],
          feedback: {
            correct: `Excelente! ${questionData.mathematics.expression} = ${questionData.mathematics.result}`,
            wrong: "Vamos tentar novamente. Siga os passos com calma..."
          }
        })
      },

      // 3. TEXT INTERPRETATION
      text_interpretation: {
        title: "Entendimento do Texto",
        type: "multiple_choice",
        subject: "Portugues", 
        activity: "Interpretacao de Texto",
        
        generate: (questionData) => {
          const variations = this.generateTextVariations(questionData);
          return variations[Math.floor(Math.random() * variations.length)];
        }
      },

      // 4. CALCULATOR SIMULATION
      calculator_simulation: {
        title: "Use a Calculadora",
        type: "calculator_interface",
        subject: "Matematica",
        activity: "Simulacao Calculadora",
        
        generate: (questionData) => ({
          question: "Use a calculadora digital para resolver o problema:",
          expectedSequence: this.generateCalculatorSequence(questionData),
          interface: {
            display: "0",
            buttons: ["0","1","2","3","4","5","6","7","8","9","+","-","×","÷","=","C"],
            history: true,
            sound: true
          },
          validation: {
            correctResult: questionData.mathematics.result,
            allowAlternativeSequences: this.generateAlternativeSequences(questionData)
          }
        })
      },

      // 5. PROBLEM SOLVING COMPLEX
      problem_solving: {
        title: "Problema Avançado",
        type: "multi_step",
        subject: "Matematica", 
        activity: "Resolucao de Problemas",
        
        generate: (questionData) => ({
          scenarios: this.generateProblemVariations(questionData),
          difficulty: questionData.difficulty,
          multiStep: true
        })
      }
    };
  }

  // Generate specific competency variation
  generateCompetency(questionData, competencyType) {
    const template = this.competencyTemplates[competencyType];
    if (!template) return null;
    
    return {
      ...template,
      ...template.generate(questionData),
      metadata: {
        questionId: questionData.id,
        competencyType,
        generatedAt: new Date().toISOString()
      }
    };
  }

  // Generate all competencies for a question
  generateAllCompetencies(questionData) {
    const competencies = {};
    
    for (const competencyType of Object.keys(this.competencyTemplates)) {
      if (this.isCompatible(questionData, competencyType)) {
        competencies[competencyType] = this.generateCompetency(questionData, competencyType);
      }
    }
    
    return competencies;
  }

  // Check if question is compatible with competency
  isCompatible(questionData, competencyType) {
    switch (competencyType) {
      case 'operation_identification':
        return questionData.mathematics?.operation !== undefined;
      case 'calculation':
        return questionData.mathematics?.result !== undefined;
      case 'calculator_simulation':
        return questionData.mathematics?.expression !== undefined;
      case 'problem_solving':
        return questionData.difficulty !== 'basico';
      default:
        return true;
    }
  }
}
```

### Activity Generation Engine
```javascript
// src/engines/ActivityGenerator.js
export class ActivityGenerator {
  constructor(questionDatabase, competencyDatabase) {
    this.questionDB = questionDatabase;
    this.competencyDB = competencyDatabase;
  }

  // Generate activity for specific competency
  generateActivity(questionIds, competencyType, options = {}) {
    const activities = [];
    
    for (const questionId of questionIds) {
      const questionData = this.questionDB.getQuestion(questionId);
      const competencyData = this.competencyDB.generateCompetency(questionData, competencyType);
      
      if (competencyData) {
        activities.push({
          id: `${questionId}_${competencyType}`,
          question: questionData,
          competency: competencyData,
          adaptations: this.applyAgeAdaptations(competencyData, options.ageRange)
        });
      }
    }
    
    return activities;
  }

  // Generate complete activity set (all competencies)
  generateFullSet(questionId) {
    const questionData = this.questionDB.getQuestion(questionId);
    const allCompetencies = this.competencyDB.generateAllCompetencies(questionData);
    
    return Object.entries(allCompetencies).map(([competencyType, competencyData]) => ({
      competencyType,
      activity: {
        id: `${questionId}_${competencyType}`,
        question: questionData,
        competency: competencyData
      }
    }));
  }

  // Filter activities by age range
  filterByAge(activities, ageRange) {
    const ageConfigs = {
      "6-8": {
        allowedCompetencies: ["operation_identification", "calculation"],
        maxOptions: 3,
        hintsEnabled: true,
        timeLimit: null
      },
      "9-11": {
        allowedCompetencies: ["calculation", "text_interpretation", "calculator_simulation"],
        maxOptions: 4,
        hintsEnabled: true,
        timeLimit: 300
      },
      "12+": {
        allowedCompetencies: ["problem_solving", "calculator_simulation", "text_interpretation"],
        maxOptions: 5,
        hintsEnabled: false,
        timeLimit: 180
      }
    };
    
    const config = ageConfigs[ageRange] || ageConfigs["9-11"];
    
    return activities.filter(activity => 
      config.allowedCompetencies.includes(activity.competency.metadata.competencyType)
    );
  }
}
```

### React Activity Component Template
```javascript
// src/components/MultiCompetencyActivity.js
export class MultiCompetencyActivity extends React.Component {
  constructor(props) {
    super(props);
    
    this.activityGenerator = new ActivityGenerator(questionDB, competencyDB);
    
    this.state = {
      studentName: localStorage.getItem('studentName') || '',
      selectedCompetency: props.defaultCompetency || 'calculation',
      availableQuestions: props.questionIds || [],
      currentActivity: null,
      sessionResults: [],
      showCompetencySelector: true
    };
  }

  componentDidMount() {
    this.loadAvailableCompetencies();
  }

  loadAvailableCompetencies() {
    const { availableQuestions } = this.state;
    const firstQuestion = questionDB.getQuestion(availableQuestions[0]);
    const allCompetencies = competencyDB.generateAllCompetencies(firstQuestion);
    
    this.setState({
      availableCompetencies: Object.keys(allCompetencies)
    });
  }

  selectCompetency(competencyType) {
    const { availableQuestions } = this.state;
    const activities = this.activityGenerator.generateActivity(
      availableQuestions,
      competencyType,
      { ageRange: this.props.ageRange }
    );
    
    this.setState({
      selectedCompetency: competencyType,
      currentActivity: activities[0],
      showCompetencySelector: false
    });
  }

  renderCompetencySelector() {
    const { availableCompetencies } = this.state;
    
    return (
      <div className="competency-selector">
        <h3>Escolha o tipo de atividade:</h3>
        <div className="competency-options">
          {availableCompetencies.map(competency => (
            <button 
              key={competency}
              onClick={() => this.selectCompetency(competency)}
              className="competency-option"
            >
              {this.getCompetencyTitle(competency)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  renderActivity() {
    const { currentActivity } = this.state;
    if (!currentActivity) return null;

    return (
      <div className="activity-container">
        <div className="question-statement">
          {currentActivity.question.content.statement}
        </div>
        
        <div className="competency-interface">
          {this.renderCompetencyInterface(currentActivity.competency)}
        </div>
        
        {currentActivity.question.content.audio && (
          <div className="audio-controls">
            <audio controls>
              <source src={currentActivity.question.content.audio.enunciado} type="audio/mpeg" />
            </audio>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { showCompetencySelector } = this.state;
    
    return (
      <div className="multi-competency-activity">
        {showCompetencySelector ? this.renderCompetencySelector() : this.renderActivity()}
      </div>
    );
  }
}
```

### CSV Export Integration
```javascript
// Maintain original CSV format while supporting multiple competencies
generateCSV() {
  const { sessionResults, studentName } = this.state;
  
  return sessionResults.map(result => [
    studentName,
    result.competency.subject, // Matematica/Portugues based on competency
    result.competency.activity, // Activity name from competency
    `${result.competency.metadata.competencyType}_block`, // Block identifier
    result.question.id, // Question identifier
    result.timeSpent,
    result.correct ? 1 : 0,
    result.correct ? 0 : 1,
    result.score
  ]);
}
```

## IMPLEMENTATION PHASES

### Phase 1: Core Database (Week 1)
- Implement QuestionSchema and CompetencyDatabase
- Create 5 sample questions with all competency variations
- Test competency generation functionality

### Phase 2: Activity Generator (Week 2)  
- Build ActivityGenerator engine
- Implement age-based filtering
- Create React component templates

### Phase 3: Integration (Week 3)
- Integrate with existing activity structure
- Maintain CSV export compatibility
- Test with real question data

### Phase 4: Migration (Week 4)
- Extract existing questions using Enhanced Content Reviewer
- Migrate existing activities to multi-competency system
- Validate functionality and performance

## SUCCESS METRICS

### Productivity Gains
- 500% more activities from same question base
- 90% reduction in development time for new activities
- 75% less maintenance overhead

### Educational Value
- Multiple learning approaches per question
- Natural difficulty progression within competencies
- Cross-curricular integration opportunities

### Technical Performance
- Database queries under 50ms response time
- Activity generation under 100ms
- CSV export maintains original format compatibility

Execute implementation following phased approach. Validate each component before integration. Document deviations from expected functionality.