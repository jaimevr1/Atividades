// Database-driven activity template for educational activities
// Uses centralized question database with multi-competency support

class DatabaseDrivenActivity extends React.Component {
  constructor(props) {
    super(props);

    // Initialize activity configuration
    this.activityConfig = {
      // These will be set by specific activity implementations
      questionIds: props.questionIds || [],
      competencyType: props.competencyType || 'calculation',
      activityName: props.activityName || 'Atividade Educativa',
      subject: props.subject || 'Matemática',
      blocksPerSession: props.blocksPerSession || 3,
      questionsPerBlock: props.questionsPerBlock || 5,
      allowRestart: props.allowRestart !== false,
      showProgress: props.showProgress !== false,
      audioEnabled: props.audioEnabled !== false
    };

    // Initialize engines
    this.competencyEngine = new CompetencyEngine(questionDB);

    // Initialize state
    this.state = {
      // Session management
      sessionStarted: false,
      studentName: '',
      currentBlock: 0,
      currentQuestion: 0,

      // Activity data
      activityBlocks: [],
      currentQuestionData: null,

      // User interaction
      userAnswer: '',
      selectedOption: null,
      answerSubmitted: false,
      showExplanation: false,

      // Session tracking
      sessionData: [],
      currentQuestionStart: null,

      // UI states
      loading: false,
      audioPlaying: false,
      showResults: false,
      activityCompleted: false,

      // Error handling
      error: null
    };

    // Bind methods
    this.startActivity = this.startActivity.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.restartActivity = this.restartActivity.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.generateCSV = this.generateCSV.bind(this);
  }

  componentDidMount() {
    this.initializeActivity();
  }

  async initializeActivity() {
    try {
      this.setState({ loading: true });

      // Generate activity blocks using competency engine
      const blocks = this.competencyEngine.generateActivityBlocks(
        this.activityConfig.questionIds,
        this.activityConfig.competencyType,
        this.activityConfig.questionsPerBlock
      );

      // Adapt for age range if specified
      const adaptedBlocks = blocks.map(block => ({
        ...block,
        questions: block.questions.map(q =>
          this.activityConfig.ageRange
            ? this.competencyEngine.adaptForAgeRange(q, this.activityConfig.ageRange)
            : q
        )
      }));

      this.setState({
        activityBlocks: adaptedBlocks.slice(0, this.activityConfig.blocksPerSession),
        loading: false
      });

    } catch (error) {
      console.error('Failed to initialize activity:', error);
      this.setState({
        error: 'Falha ao carregar atividade. Tente novamente.',
        loading: false
      });
    }
  }

  startActivity(studentName) {
    if (!studentName.trim()) {
      alert('Por favor, digite seu nome para começar.');
      return;
    }

    this.setState({
      studentName: studentName.trim(),
      sessionStarted: true,
      currentQuestionStart: new Date()
    }, () => {
      this.loadCurrentQuestion();
    });
  }

  loadCurrentQuestion() {
    const { activityBlocks, currentBlock, currentQuestion } = this.state;

    if (!activityBlocks[currentBlock] || !activityBlocks[currentBlock].questions[currentQuestion]) {
      this.completeActivity();
      return;
    }

    const questionData = activityBlocks[currentBlock].questions[currentQuestion];
    const interface = this.competencyEngine.getCompetencyInterface(
      this.activityConfig.competencyType,
      questionData
    );

    this.setState({
      currentQuestionData: { ...questionData, interface },
      userAnswer: '',
      selectedOption: null,
      answerSubmitted: false,
      showExplanation: false,
      currentQuestionStart: new Date()
    });
  }

  submitAnswer(answer = null) {
    const { currentQuestionData, selectedOption, userAnswer, currentQuestionStart } = this.state;

    if (!currentQuestionData) return;

    const finalAnswer = answer || selectedOption || userAnswer;
    if (!finalAnswer && finalAnswer !== 0) {
      alert('Por favor, selecione uma resposta antes de continuar.');
      return;
    }

    // Calculate time spent
    const timeSpent = new Date() - currentQuestionStart;

    // Check if answer is correct
    const isCorrect = this.checkAnswer(finalAnswer, currentQuestionData);

    // Record session data
    const questionRecord = {
      blockId: this.state.currentBlock + 1,
      questionId: currentQuestionData.id || `q_${this.state.currentBlock}_${this.state.currentQuestion}`,
      questionText: currentQuestionData.content?.statement || currentQuestionData.statement,
      userAnswer: finalAnswer,
      correctAnswer: this.getCorrectAnswer(currentQuestionData),
      correct: isCorrect,
      timeSpent: Math.round(timeSpent / 1000), // in seconds
      timestamp: new Date().toISOString(),
      competencyType: this.activityConfig.competencyType,
      subject: this.activityConfig.subject,
      activityName: this.activityConfig.activityName
    };

    this.setState(prevState => ({
      answerSubmitted: true,
      showExplanation: true,
      sessionData: [...prevState.sessionData, questionRecord]
    }));

    // Auto-advance after showing feedback
    if (this.activityConfig.autoAdvance !== false) {
      setTimeout(() => {
        this.nextQuestion();
      }, isCorrect ? 2000 : 4000); // More time for wrong answers
    }
  }

  checkAnswer(userAnswer, questionData) {
    const correctAnswer = this.getCorrectAnswer(questionData);

    if (typeof correctAnswer === 'number') {
      return parseFloat(userAnswer) === correctAnswer;
    }

    return userAnswer.toString().toLowerCase().trim() ===
           correctAnswer.toString().toLowerCase().trim();
  }

  getCorrectAnswer(questionData) {
    // Check different possible locations for the correct answer
    if (questionData.competency?.correctAnswer !== undefined) {
      return questionData.competency.correctAnswer;
    }

    if (questionData.mathematics?.result !== undefined) {
      return questionData.mathematics.result;
    }

    if (questionData.correct !== undefined) {
      return questionData.correct;
    }

    // Fallback for multiple choice questions
    if (questionData.options && questionData.options.length > 0) {
      return questionData.options[0]; // First option as default
    }

    return null;
  }

  nextQuestion() {
    const { activityBlocks, currentBlock, currentQuestion } = this.state;
    const currentBlockData = activityBlocks[currentBlock];

    if (!currentBlockData) {
      this.completeActivity();
      return;
    }

    // Check if there are more questions in current block
    if (currentQuestion + 1 < currentBlockData.questions.length) {
      this.setState({
        currentQuestion: currentQuestion + 1
      }, () => {
        this.loadCurrentQuestion();
      });
    }
    // Check if there are more blocks
    else if (currentBlock + 1 < activityBlocks.length) {
      this.setState({
        currentBlock: currentBlock + 1,
        currentQuestion: 0
      }, () => {
        this.loadCurrentQuestion();
      });
    }
    // Activity completed
    else {
      this.completeActivity();
    }
  }

  completeActivity() {
    // Generate activity metadata
    const activityMetadata = this.competencyEngine.generateActivityMetadata(
      this.state.activityBlocks,
      this.activityConfig.competencyType
    );

    // Generate competency report
    const competencyReport = this.competencyEngine.generateCompetencyReport({
      competencyType: this.activityConfig.competencyType,
      questions: this.state.sessionData
    });

    this.setState({
      activityCompleted: true,
      showResults: true,
      activityMetadata,
      competencyReport
    });
  }

  restartActivity() {
    this.setState({
      sessionStarted: false,
      studentName: '',
      currentBlock: 0,
      currentQuestion: 0,
      currentQuestionData: null,
      userAnswer: '',
      selectedOption: null,
      answerSubmitted: false,
      showExplanation: false,
      sessionData: [],
      currentQuestionStart: null,
      audioPlaying: false,
      showResults: false,
      activityCompleted: false,
      error: null
    }, () => {
      this.initializeActivity();
    });
  }

  async playAudio(audioUrl) {
    if (!audioUrl || !this.activityConfig.audioEnabled) return;

    try {
      this.setState({ audioPlaying: true });
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        this.setState({ audioPlaying: false });
      };

      audio.onerror = () => {
        console.warn('Failed to play audio:', audioUrl);
        this.setState({ audioPlaying: false });
      };

      await audio.play();
    } catch (error) {
      console.warn('Audio playback failed:', error);
      this.setState({ audioPlaying: false });
    }
  }

  generateCSV() {
    const { sessionData, studentName, activityMetadata } = this.state;

    const headers = [
      'Nome do Aluno',
      'Matéria',
      'Nome da Atividade',
      'Nome do Bloco',
      'ID da Questão',
      'Tempo Gasto (s)',
      'Acertos',
      'Erros',
      'Pontuação'
    ];

    const rows = sessionData.map((data, index) => [
      studentName,
      data.subject,
      data.activityName,
      `Bloco ${data.blockId}`,
      data.questionId,
      data.timeSpent,
      data.correct ? 1 : 0,
      data.correct ? 0 : 1,
      data.correct ? 100 : 0
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${studentName}_${this.activityConfig.activityName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Render methods
  renderNameInput() {
    return (
      <div className="name-input-container">
        <h2>{this.activityConfig.activityName}</h2>
        <div className="input-group">
          <label htmlFor="studentName">Digite seu nome:</label>
          <input
            type="text"
            id="studentName"
            placeholder="Seu nome aqui"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.startActivity(e.target.value);
              }
            }}
          />
          <button onClick={(e) => {
            const input = e.target.previousElementSibling;
            this.startActivity(input.value);
          }}>
            Começar Atividade
          </button>
        </div>
      </div>
    );
  }

  renderProgress() {
    const { activityBlocks, currentBlock, currentQuestion } = this.state;

    if (!this.activityConfig.showProgress) return null;

    const totalQuestions = activityBlocks.reduce((sum, block) => sum + block.questions.length, 0);
    const currentQuestionNumber = activityBlocks
      .slice(0, currentBlock)
      .reduce((sum, block) => sum + block.questions.length, 0) + currentQuestion + 1;

    return (
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <span className="progress-text">
          Questão {currentQuestionNumber} de {totalQuestions}
        </span>
      </div>
    );
  }

  renderQuestion() {
    const { currentQuestionData, answerSubmitted } = this.state;

    if (!currentQuestionData) return null;

    return (
      <div className="question-container">
        {this.renderProgress()}

        <div className="question-content">
          <h3>{currentQuestionData.content?.statement || currentQuestionData.statement}</h3>

          {this.renderAudioControls(currentQuestionData.content?.audio || currentQuestionData.audio)}

          <div className="answer-section">
            {this.renderAnswerInterface(currentQuestionData)}
          </div>

          {answerSubmitted && this.renderFeedback(currentQuestionData)}
        </div>
      </div>
    );
  }

  renderAnswerInterface(questionData) {
    const interfaceConfig = questionData.interface || { type: 'multiple_choice' };

    switch (interfaceConfig.type) {
      case 'multiple_choice':
        return this.renderMultipleChoice(questionData);
      case 'input_number':
      case 'number_input':
        return this.renderNumberInput(questionData);
      case 'calculator':
        return this.renderCalculatorInterface(questionData);
      case 'step_by_step':
        return this.renderStepByStep(questionData);
      default:
        return this.renderMultipleChoice(questionData);
    }
  }

  renderMultipleChoice(questionData) {
    const { selectedOption, answerSubmitted } = this.state;

    // Get options from competency or fallback to original options
    const options = questionData.competency?.options ||
                   questionData.options ||
                   ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'];

    return (
      <div className="multiple-choice">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === option ? 'selected' : ''} ${answerSubmitted ? 'disabled' : ''}`}
            onClick={() => !answerSubmitted && this.setState({ selectedOption: option })}
            disabled={answerSubmitted}
          >
            {option}
          </button>
        ))}

        {!answerSubmitted && (
          <button
            className="submit-button"
            onClick={() => this.submitAnswer()}
            disabled={!selectedOption}
          >
            Confirmar Resposta
          </button>
        )}
      </div>
    );
  }

  renderNumberInput(questionData) {
    const { userAnswer, answerSubmitted } = this.state;

    return (
      <div className="number-input">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => this.setState({ userAnswer: e.target.value })}
          placeholder="Digite sua resposta"
          disabled={answerSubmitted}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !answerSubmitted) {
              this.submitAnswer();
            }
          }}
        />

        {!answerSubmitted && (
          <button
            className="submit-button"
            onClick={() => this.submitAnswer()}
            disabled={!userAnswer}
          >
            Confirmar Resposta
          </button>
        )}
      </div>
    );
  }

  renderCalculatorInterface(questionData) {
    // Simplified calculator interface - extend as needed
    return (
      <div className="calculator-interface">
        {this.renderNumberInput(questionData)}
        <div className="calculator-hint">
          Use a calculadora mental ou papel para resolver!
        </div>
      </div>
    );
  }

  renderStepByStep(questionData) {
    // Simplified step-by-step interface - extend as needed
    const steps = questionData.competency?.steps || ['Passo 1', 'Passo 2', 'Passo 3'];

    return (
      <div className="step-by-step">
        <div className="steps-list">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              {step}
            </div>
          ))}
        </div>
        {this.renderNumberInput(questionData)}
      </div>
    );
  }

  renderAudioControls(audioData) {
    if (!audioData || !this.activityConfig.audioEnabled) return null;

    const { audioPlaying } = this.state;

    return (
      <div className="audio-controls">
        {audioData.enunciado && (
          <button
            className="audio-button"
            onClick={() => this.playAudio(`./media/audios/${audioData.enunciado}`)}
            disabled={audioPlaying}
          >
            🔊 Ouvir Enunciado
          </button>
        )}

        {audioData.explicacao && (
          <button
            className="audio-button"
            onClick={() => this.playAudio(`./media/audios/${audioData.explicacao}`)}
            disabled={audioPlaying}
          >
            🔊 Ouvir Explicação
          </button>
        )}
      </div>
    );
  }

  renderFeedback(questionData) {
    const { sessionData } = this.state;
    const lastAnswer = sessionData[sessionData.length - 1];

    if (!lastAnswer) return null;

    const isCorrect = lastAnswer.correct;
    const explanation = questionData.competency?.explanation ||
                       questionData.explanation ||
                       (isCorrect ? 'Parabéns! Resposta correta!' : 'Resposta incorreta. Tente novamente!');

    return (
      <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
        <div className="feedback-icon">
          {isCorrect ? '✅' : '❌'}
        </div>
        <div className="feedback-message">
          {explanation}
        </div>
        {!this.activityConfig.autoAdvance && (
          <button className="continue-button" onClick={this.nextQuestion}>
            Continuar
          </button>
        )}
      </div>
    );
  }

  renderResults() {
    const { sessionData, competencyReport, studentName } = this.state;
    const correctAnswers = sessionData.filter(q => q.correct).length;
    const totalQuestions = sessionData.length;
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions * 100).toFixed(1) : 0;

    return (
      <div className="results-container">
        <h2>Atividade Concluída!</h2>

        <div className="results-summary">
          <div className="stat">
            <span className="stat-label">Acertos:</span>
            <span className="stat-value">{correctAnswers}/{totalQuestions}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Precisão:</span>
            <span className="stat-value">{accuracy}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Tempo Médio:</span>
            <span className="stat-value">{competencyReport?.averageTime || 0}s</span>
          </div>
        </div>

        {competencyReport?.recommendations && (
          <div className="recommendations">
            <h3>Recomendações:</h3>
            <ul>
              {competencyReport.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="results-actions">
          <button className="csv-button" onClick={this.generateCSV}>
            📄 Baixar Relatório CSV
          </button>

          {this.activityConfig.allowRestart && (
            <button className="restart-button" onClick={this.restartActivity}>
              🔄 Reiniciar Atividade
            </button>
          )}
        </div>
      </div>
    );
  }

  renderError() {
    const { error } = this.state;

    return (
      <div className="error-container">
        <h2>Erro</h2>
        <p>{error}</p>
        <button onClick={this.restartActivity}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando atividade...</p>
      </div>
    );
  }

  render() {
    const {
      loading, error, sessionStarted, showResults,
      currentQuestionData, activityCompleted
    } = this.state;

    if (loading) return this.renderLoading();
    if (error) return this.renderError();
    if (!sessionStarted) return this.renderNameInput();
    if (showResults) return this.renderResults();

    return (
      <div className="database-activity">
        {this.renderQuestion()}
      </div>
    );
  }
}

// Export for use in HTML pages
if (typeof window !== 'undefined') {
  window.DatabaseDrivenActivity = DatabaseDrivenActivity;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DatabaseDrivenActivity };
}