import React, { useState, useEffect } from 'react';

const ConstruitorHistoriaBrasil = () => {
  const [studentName, setStudentName] = useState('');
  const [fontSize, setFontSize] = useState('dyslexic');
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [showBlockSelection, setShowBlockSelection] = useState(false);
  const [placedEvents, setPlacedEvents] = useState([null, null, null, null, null]);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  const eventBlocks = [
    [
      { id: 0, year: '1500', title: 'Descobrimento do Brasil', icon: '🚢', color: 'bg-red-500' },
      { id: 1, year: '1808', title: 'Chegada da Família Real', icon: '👑', color: 'bg-blue-500' },
      { id: 2, year: '1821', title: 'Volta de Dom João VI', icon: '🇵🇹', color: 'bg-green-500' },
      { id: 3, year: '1822', title: 'Grito do Ipiranga', icon: '📢', color: 'bg-yellow-500' },
      { id: 4, year: '1822', title: 'Coroação de Dom Pedro I', icon: '👑', color: 'bg-purple-500' }
    ],
    [
      { id: 0, year: '1888', title: 'Abolição da Escravatura', icon: '⛓️', color: 'bg-indigo-500' },
      { id: 1, year: '1889', title: 'Proclamação da República', icon: '🏛️', color: 'bg-green-600' },
      { id: 2, year: '1891', title: 'Primeira Constituição Republicana', icon: '📜', color: 'bg-blue-600' },
      { id: 3, year: '1930', title: 'Era Vargas Começa', icon: '🏭', color: 'bg-gray-600' },
      { id: 4, year: '1988', title: 'Nova Constituição', icon: '⚖️', color: 'bg-red-600' }
    ],
    [
      { id: 0, year: '1960', title: 'Fundação de Brasília', icon: '🏗️', color: 'bg-orange-500' },
      { id: 1, year: '1964', title: 'Início da Ditadura Militar', icon: '🪖', color: 'bg-gray-700' },
      { id: 2, year: '1985', title: 'Fim da Ditadura', icon: '🗳️', color: 'bg-green-500' },
      { id: 3, year: '1994', title: 'Criação do Real', icon: '💰', color: 'bg-green-600' },
      { id: 4, year: '2016', title: 'Olimpíadas no Rio', icon: '🏅', color: 'bg-yellow-600' }
    ],
    [
      { id: 0, year: '1415', title: 'Conquista de Ceuta', icon: '⚔️', color: 'bg-red-700' },
      { id: 1, year: '1488', title: 'Cabo da Boa Esperança', icon: '🧭', color: 'bg-blue-700' },
      { id: 2, year: '1492', title: 'Colombo chega à América', icon: '🌎', color: 'bg-green-700' },
      { id: 3, year: '1498', title: 'Vasco da Gama na Índia', icon: '🏺', color: 'bg-purple-700' },
      { id: 4, year: '1500', title: 'Pedro Álvares no Brasil', icon: '🚢', color: 'bg-orange-700' }
    ],
    [
      { id: 0, year: '1530', title: 'Expedições Colonizadoras', icon: '⛵', color: 'bg-teal-500' },
      { id: 1, year: '1549', title: 'Primeiro Governo-Geral', icon: '🏰', color: 'bg-indigo-600' },
      { id: 2, year: '1694', title: 'Destruição de Palmares', icon: '🗡️', color: 'bg-red-800' },
      { id: 3, year: '1789', title: 'Inconfidência Mineira', icon: '💎', color: 'bg-yellow-700' },
      { id: 4, year: '1798', title: 'Conjuração Baiana', icon: '🌴', color: 'bg-green-800' }
    ],
    [
      { id: 0, year: '1930', title: 'Revolução de 1930', icon: '🚂', color: 'bg-gray-600' },
      { id: 1, year: '1934', title: 'Nova Constituição', icon: '📋', color: 'bg-blue-800' },
      { id: 2, year: '1937', title: 'Estado Novo', icon: '🏛️', color: 'bg-red-900' },
      { id: 3, year: '1943', title: 'CLT - Leis Trabalhistas', icon: '👷', color: 'bg-orange-600' },
      { id: 4, year: '1945', title: 'Fim do Estado Novo', icon: '🗳️', color: 'bg-green-700' }
    ]
  ];

  const blockTitles = [
    'Brasil Independente',
    'República Brasileira', 
    'Brasil Moderno',
    'Grandes Navegações',
    'Período Colonial',
    'Era Vargas'
  ];

  const celebrations = [
    "ISSO AÍ! Bate palmas!",
    "DEMAIS! Sorria bem grande!",
    "INCRÍVEL! Língua pra fora!",
    "QUASE LÁ! Balance os braços!",
    "VOCÊ É UM HISTORIADOR! Dance de alegria!"
  ];

  const errorMessages = [
    "Ops! Pense na ordem dos anos...",
    "Atenção! Veja as datas com cuidado!",
    "Não foi dessa vez! Olhe o ano!",
    "Quase! Verifique a cronologia!",
    "Pense: o que aconteceu primeiro?"
  ];

  useEffect(() => {
    if (gameStarted && selectedBlock !== null) {
      const events = [...eventBlocks[selectedBlock]];
      setAvailableEvents(shuffleArray(events));
      setStartTime(new Date());
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

  const handleDragStart = (e, eventData) => {
    setDraggedEvent(eventData);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, position) => {
    e.preventDefault();
    if (!draggedEvent) return;

    const isCorrect = draggedEvent.id === position;
    
    const attemptData = {
      timestamp: new Date(),
      eventId: draggedEvent.id,
      positionTried: position + 1,
      correct: isCorrect,
      eventTitle: draggedEvent.title,
      eventYear: draggedEvent.year
    };
    setAttempts(prev => [...prev, attemptData]);

    if (isCorrect) {
      const newPlaced = [...placedEvents];
      newPlaced[position] = draggedEvent;
      setPlacedEvents(newPlaced);
      setCorrectCount(prev => prev + 1);
      
      setAvailableEvents(prev => prev.filter(e => e.id !== draggedEvent.id));
      
      setCelebrationMessage(celebrations[position]);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
      
      if (correctCount + 1 === 5) {
        setTimeout(() => setGameCompleted(true), 1000);
      }
    } else {
      const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      setErrorMessage(randomError);
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
    }
    
    setDraggedEvent(null);
  };

  const downloadCSV = () => {
    const endTime = new Date();
    const totalTime = startTime ? Math.round((endTime - startTime) / 1000) : 0;
    
    const detailedAttempts = attempts.map((attempt, index) => [
      studentName,
      attempt.timestamp.toISOString(),
      `Tentativa_${index + 1}`,
      attempt.eventTitle.replace(/[^a-zA-Z0-9\s]/g, ''),
      attempt.eventYear,
      `Posicao_${attempt.positionTried}`,
      attempt.correct ? 'Acerto' : 'Erro',
      `${Math.round((attempt.timestamp - startTime) / 1000)}s`,
      blockTitles[selectedBlock].replace(/[^a-zA-Z0-9\s]/g, '')
    ]);

    const csvData = [
      ['Aluno', 'Data_Hora', 'Tipo_Acao', 'Evento_Trabalhado', 'Ano_Evento', 'Posicao_Tentada', 'Resultado', 'Tempo_Decorrido', 'Bloco_Historico'],
      ...detailedAttempts,
      ['', '', '', '', '', '', '', '', ''],
      ['RESUMO_FINAL', '', '', '', '', '', '', '', ''],
      [studentName, new Date().toISOString(), 'Atividade_Completa', blockTitles[selectedBlock].replace(/[^a-zA-Z0-9\s]/g, ''), 'Multiplos_periodos', `${correctCount}/5_acertos`, `${attempts.length}_tentativas`, `${totalTime}s_total`, 'Sequenciamento_Historico']
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Historia_${blockTitles[selectedBlock].replace(/[^a-zA-Z0-9]/g, '_')}_${studentName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const finishSession = () => {
    downloadCSV();
    setShowBlockSelection(false);
    setStudentName('');
    setGameStarted(false);
    setGameCompleted(false);
    setPlacedEvents([null, null, null, null, null]);
    setAvailableEvents([]);
    setCorrectCount(0);
    setAttempts([]);
    setStartTime(null);
    setShowCelebration(false);
    setShowError(false);
  };

  const resetGame = () => {
    setPlacedEvents([null, null, null, null, null]);
    setAvailableEvents([]);
    setCorrectCount(0);
    setAttempts([]);
    setStartTime(null);
    setShowCelebration(false);
    setShowError(false);
    setGameCompleted(false);
    setGameStarted(false);
    setShowBlockSelection(true);
  };

  const backToBlockSelection = () => {
    resetGame();
  };

  const handleSessionEnd = () => {
    if (attempts.length > 0) {
      const endTime = new Date();
      const totalTime = startTime ? Math.round((endTime - startTime) / 1000) : 0;
      
      const detailedAttempts = attempts.map((attempt, index) => [
        studentName,
        attempt.timestamp.toISOString(),
        `Tentativa_${index + 1}`,
        attempt.eventTitle.replace(/[^a-zA-Z0-9\s]/g, ''),
        attempt.eventYear,
        `Posicao_${attempt.positionTried}`,
        attempt.correct ? 'Acerto' : 'Erro',
        `${Math.round((attempt.timestamp - startTime) / 1000)}s`,
        blockTitles[selectedBlock].replace(/[^a-zA-Z0-9\s]/g, '')
      ]);

      const csvData = [
        ['Aluno', 'Data_Hora', 'Tipo_Acao', 'Evento_Trabalhado', 'Ano_Evento', 'Posicao_Tentada', 'Resultado', 'Tempo_Decorrido', 'Bloco_Historico'],
        ...detailedAttempts,
        ['', '', '', '', '', '', '', '', ''],
        ['RESUMO_FINAL', '', '', '', '', '', '', '', ''],
        [studentName, new Date().toISOString(), 'Atividade_Completa', blockTitles[selectedBlock].replace(/[^a-zA-Z0-9\s]/g, ''), 'Multiplos_periodos', `${correctCount}/5_acertos`, `${attempts.length}_tentativas`, `${totalTime}s_total`, 'Sequenciamento_Historico']
      ];

      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `Historia_${blockTitles[selectedBlock].replace(/[^a-zA-Z0-9]/g, '_')}_${studentName}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    setShowBlockSelection(false);
    setStudentName('');
    setGameStarted(false);
    setGameCompleted(false);
    setSelectedBlock(0);
    setPlacedEvents([null, null, null, null, null]);
    setAvailableEvents([]);
    setCorrectCount(0);
    setAttempts([]);
    setStartTime(null);
    setShowCelebration(false);
    setShowError(false);
  };

  const getFontStyle = () => ({
    fontSize: fontSize === 'large' ? '28px' : '24px',
    fontFamily: fontSize === 'dyslexic' ? "'OpenDyslexic', sans-serif" : 
               fontSize === 'comic' ? "'Comic Sans MS', cursive" :
               "'OpenDyslexic', sans-serif"
  });

  if (!gameStarted && !showBlockSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 p-4" style={getFontStyle()}>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Construtor de História do Brasil
          </h1>
          
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Digite seu nome:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-orange-500 focus:outline-none"
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
                    ? 'bg-orange-500 text-white' 
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
                    ? 'bg-orange-500 text-white' 
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
                ? 'bg-orange-500 text-white hover:bg-orange-600 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Começar Aventura Histórica!
          </button>
        </div>
      </div>
    );
  }

  if (showBlockSelection && !gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 p-4" style={getFontStyle()}>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Olá, {studentName}!
            </h1>
            <p className="text-xl text-gray-600">
              Escolha qual período da História do Brasil você quer organizar:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blockTitles.map((title, index) => (
              <button
                key={index}
                onClick={() => handleBlockSelect(index)}
                className="p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl border-3 border-orange-200 hover:border-orange-500 hover:from-orange-200 hover:to-red-200 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="text-4xl mb-3">
                  📚
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600">
                  5 eventos para organizar
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  {eventBlocks[index][0].year} - {eventBlocks[index][4].year}
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

  if (gameCompleted) {
    const percentage = Math.round((correctCount / 5) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 p-4" style={getFontStyle()}>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            PARABÉNS, {studentName.toUpperCase()}!
          </h1>
          
          <div className="mb-6">
            <p className="text-lg text-purple-600 font-semibold mb-2">
              {blockTitles[selectedBlock]}
            </p>
            <div className="text-8xl mb-4">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '🌟' : '💪'}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-3xl font-bold text-gray-800 mb-2">
              {correctCount} de 5 eventos corretos
            </p>
            <p className="text-xl text-gray-600 mb-4">
              {percentage}% de aproveitamento
            </p>
            <p className="text-lg font-semibold text-blue-600">
              {percentage >= 80 ? 'Fantástico! Você é um expert em História!' :
               percentage >= 60 ? 'Muito bem! Continue estudando!' :
               'Continue tentando! A História é fascinante!'}
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={resetGame}
              className="w-full px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xl font-bold transform hover:scale-105"
            >
              Escolher Outro Período
            </button>
            <button
              onClick={backToBlockSelection}
              className="w-full px-8 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-xl font-bold"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 p-4" style={getFontStyle()}>
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {blockTitles[selectedBlock]}
          </h1>
          <p className="text-lg text-gray-600">
            Arraste os eventos para a linha do tempo na ordem correta!
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl border-3 border-orange-200 p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-gray-800">
              Progresso: {correctCount}/5 eventos
            </h3>
            <button
              onClick={backToBlockSelection}
              className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold py-2 px-4 rounded-lg border-2 border-gray-600"
            >
              Trocar Período
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(correctCount / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {showCelebration && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-2xl font-bold text-center p-6 rounded-xl border-4 border-green-600 animate-bounce z-50 shadow-2xl">
            {celebrationMessage}
          </div>
        )}

        {showError && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xl font-bold text-center p-6 rounded-xl border-4 border-red-600 animate-pulse z-50 shadow-2xl">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl border-3 border-orange-200 p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Eventos Históricos
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Arraste os eventos para a linha do tempo
            </p>
            
            <div className="space-y-3">
              {availableEvents.map((event) => (
                <div
                  key={`available-${event.id}`}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, event)}
                  className={`
                    w-full min-h-[80px] p-4 rounded-lg border-3 font-bold text-white text-lg
                    cursor-grab active:cursor-grabbing
                    transition-all duration-300 flex items-center justify-between
                    ${event.color} border-gray-700
                    hover:scale-105 shadow-lg hover:shadow-xl
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{event.icon}</span>
                    <div className="text-left">
                      <div className="text-lg font-semibold">{event.title}</div>
                      <div className="text-xs text-white/70">Arraste para organizar</div>
                    </div>
                  </div>
                  
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
                    🔊
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl border-3 border-orange-200 p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Linha do Tempo
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Solte os eventos aqui na ordem certa
            </p>
            
            <div className="space-y-3">
              {[0, 1, 2, 3, 4].map((position) => (
                <div
                  key={position}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, position)}
                  className={`
                    min-h-[80px] p-4 rounded-lg border-3 border-dashed
                    flex items-center justify-center text-lg font-bold
                    transition-all duration-300
                    ${placedEvents[position] !== null 
                      ? `${eventBlocks[selectedBlock][position].color} border-solid border-gray-700 text-white`
                      : 'border-gray-400 bg-gray-100 text-gray-500 hover:border-orange-400 hover:bg-orange-50 hover:border-4 hover:shadow-lg'}
                  `}
                >
                  {placedEvents[position] !== null ? (
                    <div className="flex items-center space-x-3 w-full">
                      <span className="text-3xl">{placedEvents[position].icon}</span>
                      <div className="text-left flex-1">
                        <div className="text-2xl font-black">{placedEvents[position].year}</div>
                        <div className="text-sm">{placedEvents[position].title}</div>
                      </div>
                      <div className="text-3xl">✅</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-1 animate-pulse">⬇️</div>
                      <div className="text-lg font-bold">Posição {position + 1}</div>
                      <div className="text-sm text-gray-400">Arraste um evento aqui</div>
                      <div className="text-xs text-orange-500 font-semibold mt-1">DROP ZONE</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl border-3 border-orange-200 p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Como Jogar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-100 rounded-lg p-4">
              <div className="text-2xl mb-2">1️⃣</div>
              <div className="text-lg font-semibold">Arraste os eventos</div>
              <div className="text-sm text-gray-600">Da lista da esquerda</div>
            </div>
            <div className="bg-green-100 rounded-lg p-4">
              <div className="text-2xl mb-2">2️⃣</div>
              <div className="text-lg font-semibold">Solte na linha do tempo</div>
              <div className="text-sm text-gray-600">Na ordem cronológica</div>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4">
              <div className="text-2xl mb-2">3️⃣</div>
              <div className="text-lg font-semibold">Complete a história</div>
              <div className="text-sm text-gray-600">Todos os 5 eventos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstruitorHistoriaBrasil;