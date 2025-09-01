import React, { useState, useEffect } from 'react';

const CorridaHistoriaBrasil = () => {
  const [studentName, setStudentName] = useState('');
  const [fontSize, setFontSize] = useState('dyslexic');
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [showBlockSelection, setShowBlockSelection] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState(8);
  const [maxTime, setMaxTime] = useState(8);
  const [score, setScore] = useState(0);
  const [eventQueue, setEventQueue] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isExpertMode, setIsExpertMode] = useState(false);

  // 5 blocos de eventos históricos
  const eventBlocks = [
    // Bloco 1: Colonização e Invasões Holandesas
    {
      name: "Colonização e Invasões Holandesas",
      timeline: [1500, 1549, 1555, 1624, 1630],
      events: [
        { id: 0, year: 1500, text: "A chegada de Pedro Álvares Cabral ao Brasil.", image: "caminhos/ilustra_cabral.png", icon: "🚢" },
        { id: 1, year: 1549, text: "A criação da primeira capital do Brasil, Salvador.", image: "caminhos/ilustra_salvador.png", icon: "🏛️" },
        { id: 2, year: 1555, text: "Os franceses chegam e tentam criar uma colônia no Rio de Janeiro.", image: "caminhos/ilustra_franca_antartica.png", icon: "🇫🇷" },
        { id: 3, year: 1624, text: "Os holandeses invadem e ocupam a cidade de Salvador.", image: "caminhos/ilustra_holanda_salvador.png", icon: "🇳🇱" },
        { id: 4, year: 1630, text: "A chegada de Maurício de Nassau, que modernizou Recife.", image: "caminhos/ilustra_nassau.png", icon: "👑" }
      ]
    },
    
    // Bloco 2: Expansão e Mineração
    {
      name: "Expansão e Mineração",
      timeline: [1693, 1750, 1789, 1808, 1815],
      events: [
        { id: 0, year: 1693, text: "A descoberta de grandes jazidas de ouro em Minas Gerais.", image: "caminhos/ilustra_ouro_minas.png", icon: "💰" },
        { id: 1, year: 1750, text: "O Tratado de Madri definiu novas fronteiras entre Portugal e Espanha.", image: "caminhos/ilustra_tratado_madri.png", icon: "📜" },
        { id: 2, year: 1789, text: "Inconfidência Mineira, uma revolta contra os impostos de Portugal.", image: "caminhos/ilustra_inconfidencia.png", icon: "💎" },
        { id: 3, year: 1808, text: "A família real portuguesa fugiu de Napoleão e veio para o Brasil.", image: "caminhos/ilustra_dom_joao.png", icon: "👑" },
        { id: 4, year: 1815, text: "O Brasil deixou de ser colônia e se tornou Reino Unido.", image: "caminhos/ilustra_reino_unido.png", icon: "🏰" }
      ]
    },
    
    // Bloco 3: Independência e Império
    {
      name: "Independência e Império",
      timeline: [1822, 1824, 1831, 1840, 1850],
      events: [
        { id: 0, year: 1822, text: "O Grito do Ipiranga! O Brasil se torna independente.", image: "caminhos/ilustra_grito_ipiranga.png", icon: "📢" },
        { id: 1, year: 1824, text: "O Brasil tem sua primeira Constituição.", image: "caminhos/ilustra_primeira_constituicao.png", icon: "📋" },
        { id: 2, year: 1831, text: "Dom Pedro I abdicou do trono e deixou seu filho pequeno no Brasil.", image: "caminhos/ilustra_abdicacao_dom_pedro.png", icon: "👑" },
        { id: 3, year: 1840, text: "O jovem Dom Pedro II é coroado imperador.", image: "caminhos/ilustra_dom_pedro_ii_jovem.png", icon: "👤" },
        { id: 4, year: 1850, text: "A Lei Eusébio de Queirós proibiu o tráfico de escravos para o Brasil.", image: "caminhos/ilustra_lei_eusebio.png", icon: "⛓️" }
      ]
    },
    
    // Bloco 4: Abolição e República Velha
    {
      name: "Abolição e República Velha",
      timeline: [1888, 1889, 1930, 1932, 1937],
      events: [
        { id: 0, year: 1888, text: "A Princesa Isabel assinou a Lei Áurea, acabando com a escravidão.", image: "caminhos/ilustra_lei_aurea.png", icon: "⛓️" },
        { id: 1, year: 1889, text: "A Proclamação da República, o Brasil deixa de ter imperador.", image: "caminhos/ilustra_proclamacao_republica.png", icon: "🏛️" },
        { id: 2, year: 1930, text: "A Revolução de 1930 leva Getúlio Vargas ao poder.", image: "caminhos/ilustra_revolucao_30.png", icon: "🚂" },
        { id: 3, year: 1932, text: "A Revolução Constitucionalista em São Paulo.", image: "caminhos/ilustra_revolucao_32.png", icon: "⚔️" },
        { id: 4, year: 1937, text: "Getúlio Vargas cria o Estado Novo e fecha o Congresso.", image: "caminhos/ilustra_estado_novo.png", icon: "🏛️" }
      ]
    },
    
    // Bloco 5: Brasil Contemporâneo
    {
      name: "Brasil Contemporâneo",
      timeline: [1950, 1960, 1964, 1985, 1988],
      events: [
        { id: 0, year: 1950, text: "O Brasil sedia a Copa do Mundo.", image: "caminhos/ilustra_copa_50.png", icon: "⚽" },
        { id: 1, year: 1960, text: "A inauguração de Brasília, a nova capital do Brasil.", image: "caminhos/ilustra_brasilia.png", icon: "🏗️" },
        { id: 2, year: 1964, text: "O início da Ditadura Militar no Brasil.", image: "caminhos/ilustra_ditadura.png", icon: "🪖" },
        { id: 3, year: 1985, text: "O fim da Ditadura e a volta do voto direto para presidente.", image: "caminhos/ilustra_fim_ditadura.png", icon: "🗳️" },
        { id: 4, year: 1988, text: "A promulgação da Constituição Federal, a Constituição Cidadã.", image: "caminhos/ilustra_constituicao_88.png", icon: "⚖️" }
      ]
    }
  ];

  const blockTitles = [
    "Colonização e Invasões Holandesas",
    "Expansão e Mineração", 
    "Independência e Império",
    "Abolição e República Velha",
    "Brasil Contemporâneo"
  ];

  const celebrations = [
    "RAPIDINHO! Soca o ar!",
    "CERTEIRO! Pula de alegria!",
    "VELOZ! Grita 'EEEE'!",
    "NINJA DA HISTÓRIA! Faz pose de herói!",
    "CRONÔMETRO HUMANO! Flexiona os músculos!"
  ];

  const errorMessages = [
    "Ops! Pense no ano certo...",
    "Atenção! Veja a data!",
    "Tempo esgotado! Vamos tentar de novo!",
    "Quase! Olhe a cronologia!",
    "Pense: quando isso aconteceu?"
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (currentEvent && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (currentEvent && timeLeft === 0) {
      handleTimeout();
    }
    
    return () => clearInterval(interval);
  }, [currentEvent, timeLeft]);

  // Inicializar jogo
  useEffect(() => {
    if (gameStarted && selectedBlock !== null) {
      const events = [...eventBlocks[selectedBlock].events];
      setEventQueue(shuffleArray(events));
      setStartTime(new Date());
      setTimeout(() => spawnNextEvent(shuffleArray(events)), 1000);
    }
  }, [gameStarted, selectedBlock]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const spawnNextEvent = (queue = eventQueue) => {
    if (completedEvents.length >= 5) {
      setGameCompleted(true);
      return;
    }

    const remainingEvents = queue.filter(event => !completedEvents.some(completed => completed.id === event.id));
    
    if (remainingEvents.length === 0) {
      setGameCompleted(true);
      return;
    }
    
    const nextEvent = remainingEvents[Math.floor(Math.random() * remainingEvents.length)];
    setCurrentEvent(nextEvent);
    setTimeLeft(maxTime);
  };

  const handleSlotClick = (year) => {
    if (!currentEvent) return;

    const isCorrect = currentEvent.year === year;
    const responseTime = maxTime - timeLeft;
    
    const attemptData = {
      timestamp: new Date(),
      eventId: currentEvent.id,
      eventText: currentEvent.text,
      eventYear: currentEvent.year,
      slotClicked: year,
      correct: isCorrect,
      responseTime: responseTime,
      timeRemaining: timeLeft
    };
    setAttempts(prev => [...prev, attemptData]);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setCompletedEvents(prev => [...prev, currentEvent]);
      
      const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)];
      setCelebrationMessage(randomCelebration);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2500);
      
      // Modo expert após 3 acertos
      if (score + 1 >= 3 && !isExpertMode) {
        setIsExpertMode(true);
        setMaxTime(6);
      }
      
      if (score + 1 >= 5) {
        setTimeout(() => setGameCompleted(true), 1500);
      } else {
        setTimeout(() => spawnNextEvent(), 1500);
      }
    } else {
      const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      setErrorMessage(randomError);
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      setTimeout(() => spawnNextEvent(), 2000);
    }
    
    setCurrentEvent(null);
  };

  const handleTimeout = () => {
    if (!currentEvent) return;
    
    const attemptData = {
      timestamp: new Date(),
      eventId: currentEvent.id,
      eventText: currentEvent.text,
      eventYear: currentEvent.year,
      slotClicked: null,
      correct: false,
      responseTime: maxTime,
      timeRemaining: 0
    };
    setAttempts(prev => [...prev, attemptData]);

    setErrorMessage("Tempo esgotado! Vamos tentar de novo!");
    setShowError(true);
    setTimeout(() => setShowError(false), 2000);
    setTimeout(() => spawnNextEvent(), 2000);
    setCurrentEvent(null);
  };

  const downloadCSV = () => {
    const endTime = new Date();
    const totalTime = startTime ? Math.round((endTime - startTime) / 1000) : 0;
    
    const detailedAttempts = attempts.map((attempt, index) => [
      studentName,
      attempt.timestamp.toISOString(),
      `Tentativa_${index + 1}`,
      attempt.eventText.replace(/[^a-zA-Z0-9\s]/g, ''),
      attempt.eventYear,
      attempt.slotClicked || 'Timeout',
      attempt.correct ? 'Acerto' : 'Erro',
      `${attempt.responseTime}s`,
      `${attempt.timeRemaining}s`,
      blockTitles[selectedBlock].replace(/[^a-zA-Z0-9\s]/g, '')
    ]);

    const csvData = [
      ['Aluno', 'Data_Hora', 'Tipo_Acao', 'Evento_Trabalhado', 'Ano_Correto', 'Ano_Clicado', 'Resultado', 'Tempo_Resposta', 'Tempo_Restante', 'Bloco_Historico'],
      ...detailedAttempts,
      ['', '', '', '', '', '', '', '', '', ''],
      ['RESUMO_FINAL', '', '', '', '', '', '', '', '', ''],
      [studentName, new Date().toISOString(), 'Corrida_Completa', blockTitles[selectedBlock].replace(/[^a-zA-Z0-9\s]/g, ''), 'Multiplos_anos', `${score}_estrelas`, `${attempts.length}_tentativas`, `${totalTime}s_total`, isExpertMode ? 'Modo_Expert' : 'Modo_Normal', 'Corrida_Historica']
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Corrida_Historia_${blockTitles[selectedBlock].replace(/[^a-zA-Z0-9]/g, '_')}_${studentName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSessionEnd = () => {
    if (attempts.length > 0) {
      downloadCSV();
    }
    setShowBlockSelection(false);
    setStudentName('');
    setGameStarted(false);
    setGameCompleted(false);
    setSelectedBlock(0);
    setCurrentEvent(null);
    setScore(0);
    setEventQueue([]);
    setCompletedEvents([]);
    setAttempts([]);
    setStartTime(null);
    setTimeLeft(8);
    setMaxTime(8);
    setIsExpertMode(false);
    setShowCelebration(false);
    setShowError(false);
  };

  const startGame = () => {
    if (studentName.trim()) {
      setShowBlockSelection(true);
    }
  };

  const handleBlockSelect = (blockIndex) => {
    setSelectedBlock(blockIndex);
    setGameStarted(true);
    setShowBlockSelection(false);
  };

  const resetGame = () => {
    setCurrentEvent(null);
    setScore(0);
    setEventQueue([]);
    setCompletedEvents([]);
    setAttempts([]);
    setTimeLeft(8);
    setMaxTime(8);
    setIsExpertMode(false);
    setShowCelebration(false);
    setShowError(false);
    setGameCompleted(false);
    setGameStarted(false);
    setShowBlockSelection(true);
  };

  const getFontStyle = () => ({
    fontSize: '24px',
    fontFamily: fontSize === 'dyslexic' ? "'OpenDyslexic', sans-serif" : "'Comic Sans MS', cursive"
  });

  // Tela inicial
  if (!gameStarted && !showBlockSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4" style={getFontStyle()}>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Corrida da História do Brasil
          </h1>
          
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Digite seu nome:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
              placeholder="Seu nome aqui..."
              autoFocus
            />
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Escolha sua Fonte:
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFontSize('dyslexic')}
                className={`px-3 py-2 rounded font-semibold transition-colors text-sm ${
                  fontSize === 'dyslexic' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={{ fontFamily: "'OpenDyslexic', sans-serif" }}
              >
                OpenDyslexic
              </button>
              <button
                onClick={() => setFontSize('comic')}
                className={`px-3 py-2 rounded font-semibold transition-colors text-sm ${
                  fontSize === 'comic' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={{ fontFamily: "'Comic Sans MS', cursive" }}
              >
                Comic Sans
              </button>
            </div>
          </div>
          
          <button
            onClick={startGame}
            disabled={!studentName.trim()}
            className={`w-full px-6 py-4 rounded-lg text-xl font-bold transition-all ${
              studentName.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Começar Corrida Histórica!
          </button>
        </div>
      </div>
    );
  }

  // Tela de seleção de blocos
  if (showBlockSelection && !gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4" style={getFontStyle()}>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Olá, {studentName}!
            </h1>
            <p className="text-xl text-gray-600">
              Escolha qual período histórico você quer correr contra o tempo:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blockTitles.map((title, index) => (
              <button
                key={index}
                onClick={() => handleBlockSelect(index)}
                className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl border-3 border-blue-200 hover:border-blue-500 hover:from-blue-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="text-4xl mb-3">
                  🏃‍♂️
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600">
                  5 eventos contra o tempo
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  {eventBlocks[index].timeline[0]} - {eventBlocks[index].timeline[4]}
                </div>
              </button>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={handleSessionEnd}
              className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold text-lg transform hover:scale-105"
            >
              Finalizar Sessão
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela de jogo completado
  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4" style={getFontStyle()}>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {score >= 5 ? "MESTRE DO TEMPO!" : "PARABÉNS, " + studentName.toUpperCase() + "!"}
          </h1>
          
          <div className="mb-6">
            <p className="text-lg text-purple-600 font-semibold mb-2">
              {blockTitles[selectedBlock]}
            </p>
            <div className="text-8xl mb-4">
              {score >= 5 ? '🏆' : score >= 3 ? '🌟' : '💪'}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-4xl mx-1 ${i < score ? 'text-yellow-500' : 'text-gray-300'}`}>
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-2">
              {score} de 5 estrelas coletadas
            </p>
            {isExpertMode && (
              <p className="text-lg font-bold text-purple-600 mb-2">
                🚀 MODO EXPERT ATIVADO!
              </p>
            )}
            <p className="text-lg font-semibold text-blue-600">
              {score >= 5 ? 'Você dominou este período histórico!' :
               score >= 3 ? 'Excelente velocidade histórica!' :
               'Continue treinando sua velocidade!'}
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={resetGame}
              className="w-full px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xl font-bold transform hover:scale-105"
            >
              Escolher Outro Período
            </button>
            <button
              onClick={() => {
                setShowBlockSelection(false);
                setStudentName('');
                setGameStarted(false);
                setGameCompleted(false);
              }}
              className="w-full px-8 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-xl font-bold"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela principal do jogo
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4" style={getFontStyle()}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header com score e modo */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border-3 border-blue-200 p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {blockTitles[selectedBlock]}
              </h3>
              {isExpertMode && (
                <p className="text-lg font-bold text-purple-600">
                  🚀 MODO EXPERT - Timer: 6s
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-3xl ${i < score ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">Estrelas: {score}/5</p>
            </div>
          </div>
        </div>

        {/* Timeline horizontal */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border-3 border-blue-200 p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            🎯 Linha do Tempo - Clique no ano correto!
          </h3>
          <div className="flex justify-between items-center">
            {eventBlocks[selectedBlock].timeline.map((year, index) => (
              <button
                key={year}
                onClick={() => handleSlotClick(year)}
                disabled={!currentEvent}
                className={`
                  flex-1 mx-2 min-h-[80px] p-4 rounded-xl border-3 border-dashed
                  transition-all duration-300 text-center font-bold
                  ${currentEvent 
                    ? 'border-orange-400 bg-orange-50 hover:border-orange-600 hover:bg-orange-100 hover:scale-105 cursor-pointer' 
                    : 'border-gray-300 bg-gray-100 cursor-not-allowed'}
                `}
              >
                <div className="text-2xl font-black text-gray-800">{year}</div>
                <div className="text-sm text-gray-600">Clique aqui</div>
                {completedEvents.some(e => e.year === year) && (
                  <div className="text-2xl mt-1">✅</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Área central do evento */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border-3 border-blue-200 p-6 mb-6">
          {currentEvent ? (
            <div className="text-center">
              {/* Timer visual */}
              <div className="mb-4">
                <div className="flex justify-center items-center mb-2">
                  <span className="text-2xl font-bold text-gray-800 mr-3">⏰ {timeLeft}s</span>
                  {isExpertMode && <span className="text-lg font-bold text-purple-600">MODO EXPERT</span>}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      timeLeft > maxTime * 0.6 ? 'bg-green-500' :
                      timeLeft > maxTime * 0.3 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(timeLeft / maxTime) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Evento atual */}
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl border-3 border-yellow-200 p-6 animate-pulse">
                <div className="text-4xl mb-4">{currentEvent.icon}</div>
                <div className="bg-white/60 rounded-lg p-4 mb-4">
                  <img 
                    src={currentEvent.image} 
                    alt={`Ilustração ${currentEvent.year}`}
                    className="w-full h-32 object-cover rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-sm"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                    Placeholder Imagem {currentEvent.year}
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                  {currentEvent.text}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  📅 Clique no ano correto na linha do tempo acima!
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4 animate-bounce">🏃‍♂️</div>
              <p className="text-2xl font-bold text-gray-800">
                Prepare-se! Próximo evento chegando...
              </p>
            </div>
          )}
        </div>

        {/* Celebração */}
        {showCelebration && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-2xl font-bold text-center p-6 rounded-xl border-4 border-green-600 animate-bounce z-50 shadow-2xl">
            {celebrationMessage}
          </div>
        )}

        {/* Popup de erro */}
        {showError && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xl font-bold text-center p-6 rounded-xl border-4 border-red-600 animate-pulse z-50 shadow-2xl">
            {errorMessage}
          </div>
        )}

        {/* Instruções */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border-3 border-blue-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Como Jogar a Corrida
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-100 rounded-lg p-4">
              <div className="text-2xl mb-2">1️⃣</div>
              <div className="text-sm font-semibold">Evento aparece</div>
              <div className="text-xs text-gray-600">No centro da tela</div>
            </div>
            <div className="bg-green-100 rounded-lg p-4">
              <div className="text-2xl mb-2">2️⃣</div>
              <div className="text-sm font-semibold">Timer de 8 segundos</div>
              <div className="text-xs text-gray-600">Corra contra o tempo!</div>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4">
              <div className="text-2xl mb-2">3️⃣</div>
              <div className="text-sm font-semibold">Clique no ano</div>
              <div className="text-xs text-gray-600">Na linha do tempo</div>
            </div>
            <div className="bg-purple-100 rounded-lg p-4">
              <div className="text-2xl mb-2">4️⃣</div>
              <div className="text-sm font-semibold">Colete estrelas</div>
              <div className="text-xs text-gray-600">5 estrelas = vitória!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorridaHistoriaBrasil;