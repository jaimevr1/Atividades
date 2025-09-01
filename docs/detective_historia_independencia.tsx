import React, { useState, useEffect } from 'react';

const DetectiveHistoriaIndependencia = () => {
  const [studentName, setStudentName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [investigationPhase, setInvestigationPhase] = useState(true);
  const [currentMystery, setCurrentMystery] = useState(null);
  const [revealedClues, setRevealedClues] = useState([]);
  const [solvedMysteries, setSolvedMysteries] = useState([]);
  const [score, setScore] = useState(100);
  const [attempts, setAttempts] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timelinePhase, setTimelinePhase] = useState(false);
  const [timelineOrder, setTimelineOrder] = useState([]);
  const [connections, setConnections] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Dossiês de investigação
  const mysteries = [
    {
      id: 0,
      year: 1808,
      code: "MISTÉRIO-001",
      clues: [
        "A família de um rei precisou fugir de Napoleão Bonaparte.",
        "Eles atravessaram o oceano e trouxeram a corte para o Brasil.",
        "O Brasil deixou de ser apenas uma colônia e o porto do Rio de Janeiro foi aberto."
      ],
      solution: "Abertura dos Portos às Nações Amigas",
      image: "misterios/familia_real_1808.png",
      icon: "🔍",
      alternatives: [
        "Abertura dos Portos às Nações Amigas",
        "Criação do Reino Unido",
        "Invasão Napoleônica no Brasil"
      ]
    },
    {
      id: 1,
      year: 1821,
      code: "MISTÉRIO-002", 
      clues: [
        "A família real precisou voltar para Portugal.",
        "A corte portuguesa queria que o Brasil voltasse a ser apenas uma colônia.",
        "O príncipe herdeiro, Dom Pedro, foi aconselhado a ficar no Brasil."
      ],
      solution: "O Dia do Fico",
      image: "misterios/dia_do_fico_1821.png",
      icon: "🔍",
      alternatives: [
        "O Dia do Fico",
        "Regresso Real Forçado",
        "Revolução Pernambucana"
      ]
    },
    {
      id: 2,
      year: 1822,
      code: "MISTÉRIO-003",
      clues: [
        "Um príncipe estava viajando por São Paulo.",
        "Ele recebeu uma carta de Portugal exigindo que voltasse imediatamente.",
        "Às margens de um rio, ele levantou sua espada e gritou 'Independência ou Morte!'."
      ],
      solution: "O Grito do Ipiranga",
      image: "misterios/grito_ipiranga_1822.png", 
      icon: "🔍",
      alternatives: [
        "O Grito do Ipiranga",
        "Batalha do Ipiranga",
        "Revolta Paulista"
      ]
    },
    {
      id: 3,
      year: 1889,
      code: "MISTÉRIO-004",
      clues: [
        "A monarquia do Brasil já não era popular.",
        "Um grupo de militares se juntou a líderes civis para mudar a forma de governo.",
        "O imperador Dom Pedro II foi deposto e o Brasil se tornou uma República."
      ],
      solution: "Proclamação da República",
      image: "misterios/proclamacao_republica_1889.png",
      icon: "🔍",
      alternatives: [
        "Proclamação da República", 
        "Golpe Imperial",
        "Revolução Federalista"
      ]
    },
    {
      id: 4,
      year: 1988,
      code: "MISTÉRIO-005",
      clues: [
        "Depois de um longo período sem liberdade, o Brasil precisava de novas leis.",
        "Essa Constituição garantiu muitos direitos importantes, como o voto para todos os maiores de 16 anos.",
        "Por isso, ela é chamada de 'Constituição Cidadã'."
      ],
      solution: "Constituição Federal de 1988",
      image: "misterios/constituicao_cidada_1988.png",
      icon: "🔍",
      alternatives: [
        "Constituição Federal de 1988",
        "Lei Áurea",
        "Código Civil Brasileiro"
      ]
    }
  ];

  const celebrationMessages = [
    "EXCELENTE WORK, SHERLOCK!",
    "CÉREBRO FUNCIONANDO! Esfrega as mãos!",
    "CASO RESOLVIDO! Comemoração style detetive!",
    "INVESTIGADOR NATO! Faz pose de detetive!",
    "SHERLOCK BRASILEIRO! Ajusta o chapéu!"
  ];

  const errorMessages = [
    "Ops! Analise as evidências novamente...",
    "Investigação incompleta! Revise as pistas!",
    "Não foi dessa vez! Examine melhor!",
    "Quase detetive! Olhe os detalhes!",
    "Pense como um investigador!"
  ];

  useEffect(() => {
    if (gameStarted) {
      setStartTime(new Date());
    }
  }, [gameStarted]);

  const startGame = () => {
    if (studentName.trim()) {
      setGameStarted(true);
    }
  };

  const openMystery = (mysteryId) => {
    setCurrentDossier(mysteryId);
    setRevealedClues([]);
  };

  const openMystery = (mysteryId) => {
    setCurrentMystery(mysteryId);
    setRevealedClues([]);
  };

  const revealNextClue = () => {
    if (revealedClues.length < 3) {
      setRevealedClues(prev => [...prev, revealedClues.length]);
      
      if (revealedClues.length === 0) {
        setCelebrationMessage("EXCELENTE WORK, SHERLOCK!");
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    }
  };

  const selectSolution = (selectedSolution) => {
    const mystery = mysteries[currentMystery];
    const isCorrect = selectedSolution === mystery.solution;
    
    const attemptData = {
      timestamp: new Date(),
      mysteryId: currentMystery,
      mysteryCode: mystery.code,
      correctSolution: mystery.solution,
      selectedSolution: selectedSolution,
      correct: isCorrect,
      cluesRevealed: revealedClues.length,
      investigationTime: Math.round((new Date() - startTime) / 1000)
    };
    setAttempts(prev => [...prev, attemptData]);

    if (isCorrect) {
      setSolvedMysteries(prev => [...prev, currentMystery]);
      setCelebrationMessage("CÉREBRO FUNCIONANDO! Esfrega as mãos!");
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2500);
      
      if (solvedMysteries.length + 1 >= 5) {
        setTimeout(() => setTimelinePhase(true), 1500);
      }
    } else {
      setScore(prev => Math.max(0, prev - 10));
      setErrorMessage("Investigação incompleta! Revise as pistas!");
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
    }
    
    setCurrentMystery(null);
    setRevealedClues([]);
  };

  const handleTimelineConnection = (fromIndex, toIndex) => {
    const newConnection = { from: fromIndex, to: toIndex };
    setConnections(prev => [...prev, newConnection]);
    
    if (connections.length + 1 >= 4) {
      setTimeout(() => {
        setCelebrationMessage("CASO RESOLVIDO! Comemoração style detetive!");
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
        setTimeout(() => setGameCompleted(true), 1000);
      }, 500);
    }
  };

  const downloadCSV = () => {
    const endTime = new Date();
    const totalTime = startTime ? Math.round((endTime - startTime) / 1000) : 0;
    
    const detailedAttempts = attempts.map((attempt, index) => [
      studentName,
      attempt.timestamp.toISOString(),
      `Investigacao_${index + 1}`,
      attempt.mysteryCode,
      attempt.correctSolution.replace(/[^a-zA-Z0-9\s]/g, ''),
      attempt.selectedSolution.replace(/[^a-zA-Z0-9\s]/g, ''),
      attempt.correct ? 'Resolvido' : 'Erro',
      `${attempt.cluesRevealed}_pistas`,
      `${attempt.investigationTime}s`,
      'Detective_Independencia'
    ]);

    const csvData = [
      ['Aluno', 'Data_Hora', 'Tipo_Acao', 'Misterio_Codigo', 'Solucao_Correta', 'Solucao_Escolhida', 'Resultado', 'Pistas_Reveladas', 'Tempo_Investigacao', 'Atividade'],
      ...detailedAttempts,
      ['', '', '', '', '', '', '', '', '', ''],
      ['RESUMO_FINAL', '', '', '', '', '', '', '', '', ''],
      [studentName, new Date().toISOString(), 'Caso_Completo', 'Independencia_Brasil', `${solvedMysteries.length}_misterios`, `Score_${score}%`, `${attempts.length}_tentativas`, `${totalTime}s_total`, 'Detective_Historia', solvedMysteries.length === 5 ? 'CASO_RESOLVIDO' : 'CASO_PENDENTE']
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Detective_Independencia_${studentName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSessionEnd = () => {
    if (attempts.length > 0) {
      downloadCSV();
    }
    setStudentName('');
    setGameStarted(false);
    setInvestigationPhase(true);
    setTimelinePhase(false);
    setCurrentMystery(null);
    setRevealedClues([]);
    setSolvedMysteries([]);
    setScore(100);
    setAttempts([]);
    setStartTime(null);
    setTimelineOrder([]);
    setConnections([]);
    setGameCompleted(false);
    setShowCelebration(false);
    setShowError(false);
  };

  // Tela inicial
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-800 via-orange-900 to-red-900 p-4">
        <div className="max-w-2xl mx-auto bg-amber-100 rounded-lg shadow-xl p-8 border-4 border-amber-600">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              🕵️ Detective da História
            </h1>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">
              📁 CASO: Independência do Brasil
            </h2>
            <div className="bg-amber-200 rounded-lg p-4 border-2 border-amber-400">
              <p className="text-lg text-amber-800">
                🔍 MISSÃO: Investigar 5 dossiês históricos e resolver o caso da Independência Brasileira
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-lg font-semibold text-amber-900 mb-3">
              👤 Nome do Detective:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-4 border-3 border-amber-400 rounded-lg text-lg focus:border-amber-600 focus:outline-none bg-white"
              placeholder="Digite seu nome, detetive..."
              autoFocus
            />
          </div>
          
          <button
            onClick={startGame}
            disabled={!studentName.trim()}
            className={`w-full px-6 py-4 rounded-lg text-xl font-bold transition-all ${
              studentName.trim()
                ? 'bg-amber-600 text-white hover:bg-amber-700 transform hover:scale-105 border-3 border-amber-800'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed border-3 border-gray-500'
            }`}
          >
            🔍 Iniciar Investigação
          </button>
        </div>
      </div>
    );
  }

  // Tela de investigação de dossiês
  if (investigationPhase && !timelinePhase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-800 via-orange-900 to-red-900 p-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header investigativo */}
          <div className="bg-amber-100 rounded-xl border-4 border-amber-600 p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-amber-900">
                  🕵️ Detective {studentName}
                </h1>
                <p className="text-lg text-amber-800">CASO: Independência do Brasil</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-900">Score: {score}%</div>
                <div className="text-sm text-amber-700">Mistérios resolvidos: {solvedMysteries.length}/5</div>
              </div>
            </div>
            
            <div className="mt-4 w-full bg-amber-200 rounded-full h-4 border-2 border-amber-400">
              <div 
                className="bg-gradient-to-r from-green-600 to-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(solvedMysteries.length / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Mesa de dossiês */}
          {!currentDossier ? (
            <div className="bg-amber-100 rounded-xl border-4 border-amber-600 p-8">
              <h2 className="text-3xl font-bold text-amber-900 text-center mb-6">
                📂 Mesa de Investigação
              </h2>
              <p className="text-lg text-amber-800 text-center mb-8">
                Clique em um dossiê para começar a investigação:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {dossiers.map((dossier) => (
                  <button
                    key={dossier.id}
                    onClick={() => openMystery(mystery.id)}
                    disabled={solvedDossiers.includes(dossier.id)}
                    className={`
                      relative p-6 rounded-xl border-4 transition-all duration-300 transform
                      ${solvedDossiers.includes(dossier.id)
                        ? 'bg-green-200 border-green-500 opacity-75'
                        : 'bg-yellow-200 border-yellow-600 hover:bg-yellow-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{dossier.icon}</div>
                      <div className="text-lg font-bold text-gray-800">{dossier.code}</div>
                      <div className="text-sm text-gray-700">Ano: {dossier.year}</div>
                      {solvedDossiers.includes(dossier.id) && (
                        <div className="absolute top-2 right-2 text-2xl">✅</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              {solvedMysteries.length === 5 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setTimelinePhase(true)}
                    className="px-8 py-4 bg-blue-600 text-white rounded-xl border-4 border-blue-800 hover:bg-blue-700 transition-all transform hover:scale-105 text-xl font-bold"
                  >
                    🧩 Organizar Evidências na Timeline
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Interface de investigação do mistério
            <div className="bg-amber-100 rounded-xl border-4 border-amber-600 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-900">
                  📋 {mysteries[currentMystery].code}
                </h2>
                <button
                  onClick={() => setCurrentMystery(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ← Voltar à Mesa
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Área de evidências */}
                <div className="bg-white rounded-lg border-3 border-gray-400 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    🔍 Evidências Coletadas
                  </h3>
                  
                  <div className="bg-gray-200 rounded-lg p-4 mb-4">
                    <img 
                      src={mysteries[currentMystery].image} 
                      alt={`Evidência ${mysteries[currentMystery].year}`}
                      className="w-full h-40 object-cover rounded-lg bg-gray-300 flex items-center justify-center text-gray-600"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden w-full h-40 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                      Evidência Fotográfica {mysteries[currentMystery].year}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {revealedClues.map((clueIndex) => (
                      <div key={clueIndex} className="bg-yellow-100 rounded-lg p-3 border-2 border-yellow-400 animate-pulse">
                        <p className="text-gray-800 font-medium">
                          <span className="font-bold text-yellow-800">Pista {clueIndex + 1}:</span> {mysteries[currentMystery].clues[clueIndex]}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {revealedClues.length < 3 && (
                    <button
                      onClick={revealNextClue}
                      className="w-full mt-4 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all transform hover:scale-105 font-bold border-3 border-yellow-700"
                    >
                      🔍 Revelar Próxima Pista ({revealedClues.length + 1}/3)
                    </button>
                  )}
                </div>
                
                {/* Área de soluções */}
                <div className="bg-white rounded-lg border-3 border-gray-400 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    🎯 Qual é o evento histórico?
                  </h3>
                  
                  {revealedClues.length === 3 ? (
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 text-center mb-6">
                        Com base nas evidências, qual evento histórico você identifica?
                      </p>
                      
                      {mysteries[currentMystery].alternatives.map((alternative, index) => (
                        <button
                          key={index}
                          onClick={() => selectSolution(alternative)}
                          className="w-full p-4 bg-blue-100 hover:bg-blue-200 rounded-lg border-2 border-blue-300 hover:border-blue-500 transition-all transform hover:scale-105 text-left"
                        >
                          <span className="font-bold text-blue-800">{index + 1}. </span>
                          <span className="text-gray-800">{alternative}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4 animate-bounce">🔍</div>
                      <p className="text-lg text-gray-600">
                        Colete todas as 3 pistas antes de fazer sua dedução!
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Pistas coletadas: {revealedClues.length}/3
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Celebração */}
        {showCelebration && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white text-2xl font-bold text-center p-6 rounded-xl border-4 border-green-800 animate-bounce z-50 shadow-2xl">
            {celebrationMessage}
          </div>
        )}

        {/* Popup de erro */}
        {showError && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xl font-bold text-center p-6 rounded-xl border-4 border-red-800 animate-pulse z-50 shadow-2xl">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }

  // Fase de timeline e conexões
  if (timelinePhase && !gameCompleted) {
    const sortedMysteries = [...mysteries].sort((a, b) => a.year - b.year);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-800 via-orange-900 to-red-900 p-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="bg-amber-100 rounded-xl border-4 border-amber-600 p-6 mb-6 text-center">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              🧩 FASE FINAL: Organização das Evidências
            </h2>
            <p className="text-lg text-amber-800">
              Conecte os eventos na ordem cronológica clicando de um para o outro:
            </p>
          </div>
          
          <div className="bg-white rounded-xl border-4 border-gray-400 p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              📈 Linha do Tempo da Independência
            </h3>
            
            <div className="flex justify-between items-center relative">
              {sortedMysteries.map((mystery, index) => (
                <button
                  key={mystery.id}
                  onClick={() => {
                    if (timelineOrder.length === 0 || timelineOrder[timelineOrder.length - 1] !== index) {
                      const newOrder = [...timelineOrder, index];
                      setTimelineOrder(newOrder);
                      
                      if (newOrder.length > 1) {
                        handleTimelineConnection(newOrder[newOrder.length - 2], index);
                      }
                    }
                  }}
                  className={`
                    flex-1 mx-2 p-4 rounded-xl border-4 transition-all duration-300 text-center
                    ${timelineOrder.includes(index)
                      ? 'bg-green-200 border-green-500 text-green-800'
                      : 'bg-blue-100 border-blue-400 hover:bg-blue-200 hover:scale-105 cursor-pointer text-blue-800'}
                  `}
                >
                  <div className="text-3xl mb-2">{mystery.icon}</div>
                  <div className="text-xl font-bold">{mystery.year}</div>
                  <div className="text-sm font-semibold">{mystery.solution}</div>
                  {timelineOrder.includes(index) && (
                    <div className="text-2xl mt-2">✅</div>
                  )}
                </button>
              ))}
              
              {/* Linhas de conexão */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {connections.map((connection, index) => (
                  <line
                    key={index}
                    x1={`${(connection.from / 4) * 100}%`}
                    y1="50%"
                    x2={`${(connection.to / 4) * 100}%`}
                    y2="50%"
                    stroke="#059669"
                    strokeWidth="4"
                    strokeDasharray="10,5"
                    className="animate-pulse"
                  />
                ))}
              </svg>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-lg text-gray-700 mb-4">
                Conexões feitas: {connections.length}/4
              </p>
              <button
                onClick={() => setTimelineOrder([])}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors border-3 border-orange-700"
              >
                🔄 Reiniciar Conexões
              </button>
            </div>
          </div>
        </div>

        {/* Celebração */}
        {showCelebration && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white text-2xl font-bold text-center p-6 rounded-xl border-4 border-green-800 animate-bounce z-50 shadow-2xl">
            {celebrationMessage}
          </div>
        )}
      </div>
    );
  }

  // Tela de caso resolvido
  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-800 via-orange-900 to-red-900 p-4">
        <div className="max-w-3xl mx-auto bg-amber-100 rounded-xl border-4 border-amber-600 p-8 text-center">
          <h1 className="text-4xl font-bold mb-6 text-amber-900">
            🎉 CASO RESOLVIDO!
          </h1>
          
          <div className="bg-white rounded-lg border-3 border-gray-400 p-6 mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Detective {studentName.toUpperCase()}
            </h2>
            
            <div className="text-6xl mb-4">
              {score >= 90 ? '🏆' : score >= 70 ? '🌟' : '🕵️'}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-2xl font-bold text-gray-800 mb-2">
                Score Final: {score}%
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Mistérios resolvidos: {solvedMysteries.length}/5
              </p>
              <p className="text-lg font-semibold text-blue-600">
                {score >= 90 ? 'Detective Master! Caso perfeito!' :
                 score >= 70 ? 'Bom trabalho investigativo!' :
                 'Continue desenvolvendo suas habilidades!'}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                setInvestigationPhase(true);
                setTimelinePhase(false);
                setCurrentDossier(null);
                setRevealedClues([]);
                setSolvedDossiers([]);
                setScore(100);
                setAttempts([]);
                setTimelineOrder([]);
                setConnections([]);
                setGameCompleted(false);
              }}
              className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xl font-bold transform hover:scale-105 border-3 border-blue-800"
            >
              🔍 Investigar Novamente
            </button>
            <button
              onClick={handleSessionEnd}
              className="w-full px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xl font-bold border-3 border-red-800"
            >
              📊 Finalizar Sessão
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DetectiveHistoriaIndependencia;