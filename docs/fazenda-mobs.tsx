import React, { useState, useRef, useEffect } from 'react';
import { Home, Download, Clock, Star, Target, Users } from 'lucide-react';

const RobloxMultiplicacao = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentBlock, setCurrentBlock] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [sessionData, setSessionData] = useState({
    startTime: null,
    questions: []
  });
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Questões organizadas por faixa etária e progressão pedagógica
  const questionsBlocks = {
    1: { // 6-7 anos - Multiplicação básica até 4x, produtos até 20
      title: "🎮 Novato no Roblox - Primeiros Passos",
      ageRange: "6-7 anos",
      questions: [
        {
          scenario: "Você acabou de entrar no Roblox! Seu avatar precisa de roupas novas. Você encontrou 3 lojas, cada uma vendendo 2 camisetas legais. Quantas camisetas diferentes você pode escolher no total?",
          visual: "🏪[👕👕] 🏪[👕👕] 🏪[👕👕]",
          calculation: "2 + 2 + 2",
          answer: 6,
          multiplication: "3 × 2",
          hint: "Conte as camisetas de cada loja e some tudo!",
          context: "Customização de avatar - conceito fundamental do Roblox"
        },
        {
          scenario: "No jogo 'Pet Simulator', você ganhou 4 ovos especiais. Cada ovo sempre dá exatamente 3 pets quando quebra. Se você quebrar todos os ovos, quantos pets novos você terá?",
          visual: "🥚[🐱🐶🐰] 🥚[🐱🐶🐰] 🥚[🐱🐶🐰] 🥚[🐱🐶🐰]",
          calculation: "3 + 3 + 3 + 3",
          answer: 12,
          multiplication: "4 × 3",
          hint: "Cada ovo sempre dá 3 pets. Conte todos!",
          context: "Pet games são muito populares entre crianças pequenas"
        },
        {
          scenario: "Você está jogando 'Obby Escape' e chegou numa sala com 5 plataformas. Em cada plataforma há exatamente 2 moedas brilhantes para coletar. Quantas moedas você conseguirá pegar nesta sala?",
          visual: "⬜[🪙🪙] ⬜[🪙🪙] ⬜[🪙🪙] ⬜[🪙🪙] ⬜[🪙🪙]",
          calculation: "2 + 2 + 2 + 2 + 2",
          answer: 10,
          multiplication: "5 × 2",
          hint: "Cada plataforma tem 2 moedas. Some todas!",
          context: "Obbys são obstacle courses muito jogados por crianças"
        },
        {
          scenario: "No 'Tycoon dos Dinossauros', você construiu 2 cercados gigantes. Cada cercado abriga exatamente 4 dinossauros bebês. Quantos dinossauros bebês você está cuidando no total?",
          visual: "🦕🦕🦕🦕 | 🦕🦕🦕🦕",
          calculation: "4 + 4",
          answer: 8,
          multiplication: "2 × 4",
          hint: "Conte os dinossauros de cada cercado!",
          context: "Tycoons ensinam gestão de recursos de forma lúdica"
        },
        {
          scenario: "Você está no 'Pizza Place' trabalhando como entregador. Você fez 3 viagens de entrega hoje. Em cada viagem, você entregou exatamente 5 pizzas quentinhas. Quantas pizzas você entregou no dia todo?",
          visual: "🚗[🍕🍕🍕🍕🍕] 🚗[🍕🍕🍕🍕🍕] 🚗[🍕🍕🍕🍕🍕]",
          calculation: "5 + 5 + 5",
          answer: 15,
          multiplication: "3 × 5",
          hint: "Some as pizzas de todas as suas viagens!",
          context: "Roleplay games ajudam a entender profissões"
        }
      ]
    },
    2: { // 8-9 anos - Multiplicação até 8x, produtos até 60
      title: "⚔️ Aventureiro Experiente - Desafios Maiores",
      ageRange: "8-9 anos", 
      questions: [
        {
          scenario: "No 'Simulator de Mineração Espacial', você descobriu um asteroide raro com 7 pontos de escavação. Cada ponto sempre rende exatamente 6 cristais preciosos quando minerado completamente. Se você minerar todo o asteroide, quantos cristais terá coletado?",
          visual: "☄️ → ⛏️[💎💎💎💎💎💎] × 7 pontos",
          calculation: "6 + 6 + 6 + 6 + 6 + 6 + 6",
          answer: 42,
          multiplication: "7 × 6",
          hint: "Cada ponto de escavação rende 6 cristais. Multiplique!",
          context: "Simulators espaciais estimulam interesse por ciências"
        },
        {
          scenario: "Você é dono de uma loja de carros no 'Vehicle Simulator'. Hoje chegaram 6 caminhões de entrega, cada um trazendo exatamente 8 carros novos para sua loja. Quantos carros novos você recebeu para vender?",
          visual: "🚛[🚗🚗🚗🚗🚗🚗🚗🚗] × 6 caminhões",
          calculation: "8 + 8 + 8 + 8 + 8 + 8",
          answer: 48,
          multiplication: "6 × 8",
          hint: "Cada caminhão trouxe 8 carros. Calcule o total!",
          context: "Vehicle simulators trabalham conceitos de negócios"
        },
        {
          scenario: "No 'Torre de Batalha', você formou uma guilda com 8 membros (incluindo você). Cada membro da guilda ganhou exatamente 7 pontos de experiência na última missão. Quantos pontos de experiência sua guilda ganhou no total?",
          visual: "👥[⭐⭐⭐⭐⭐⭐⭐] × 8 membros",
          calculation: "7 + 7 + 7 + 7 + 7 + 7 + 7 + 7",
          answer: 56,
          multiplication: "8 × 7",
          hint: "Cada membro ganhou 7 pontos. Multiplique pelo número de membros!",
          context: "Guilds ensinam trabalho em equipe e colaboração"
        },
        {
          scenario: "Você trabalha no 'Restaurante Cinco Estrelas' como chef. Para o jantar especial de hoje, você precisa preparar 9 mesas VIP. Cada mesa VIP sempre serve exatamente 5 pratos principais. Quantos pratos principais você precisa cozinhar?",
          visual: "🍽️[🥘🥘🥘🥘🥘] × 9 mesas VIP",
          calculation: "5 + 5 + 5 + 5 + 5 + 5 + 5 + 5 + 5",
          answer: 45,
          multiplication: "9 × 5",
          hint: "Cada mesa VIP precisa de 5 pratos. Calcule o total!",
          context: "Gestão de restaurante ensina planejamento e organização"
        },
        {
          scenario: "No 'Academia de Super Heróis', você está treinando com 6 colegas novatos. O instrutor deu para cada um de vocês exatamente 9 exercícios especiais para praticar esta semana. Quantos exercícios no total o grupo inteiro precisa completar?",
          visual: "🦸‍♂️[📋📋📋📋📋📋📋📋📋] × 6 novatos",
          calculation: "9 + 9 + 9 + 9 + 9 + 9",
          answer: 54,
          multiplication: "6 × 9",
          hint: "Cada novato recebeu 9 exercícios. Multiplique!",
          context: "Temas de super-heróis motivam persistência e esforço"
        }
      ]
    },
    3: { // 10-11 anos - Multiplicação com dezenas, produtos até 200
      title: "👑 Mestre do Roblox - Grandes Conquistas",
      ageRange: "10-11 anos",
      questions: [
        {
          scenario: "Você criou um 'Império Comercial' no Roblox e agora possui 12 lojas diferentes espalhadas pelo mapa. Cada loja gera exatamente 15 Robux de lucro por dia. Se todas as lojas funcionarem perfeitamente por um dia inteiro, quanto Robux você ganhará?",
          visual: "🏪[💰15] × 12 lojas = ? Robux por dia",
          calculation: "15 + 15 + 15... (12 vezes)",
          answer: 180,
          multiplication: "12 × 15",
          hint: "Cada loja rende 15 Robux por dia. Multiplique pelo número de lojas!",
          context: "Empreendedorismo digital e gestão financeira"
        },
        {
          scenario: "No 'Torneio Mundial de Esportes', você é técnico de 14 equipes diferentes. Cada equipe tem exatamente 11 jogadores prontos para competir. Quantos atletas estão sob sua responsabilidade no total?",
          visual: "⚽[👤👤👤👤👤👤👤👤👤👤👤] × 14 equipes",
          calculation: "11 + 11 + 11... (14 vezes)",
          answer: 154,
          multiplication: "14 × 11",
          hint: "Cada equipe tem 11 jogadores. Multiplique pelo número de equipes!",
          context: "Esportes ensinam liderança e responsabilidade"
        },
        {
          scenario: "Você é arquiteto no 'Cidade dos Sonhos' e recebeu uma encomenda gigante: construir 16 edifícios residenciais idênticos. Cada edifício precisa de exatamente 13 tipos diferentes de materiais de construção. Quantos tipos de materiais você precisa calcular no total?",
          visual: "🏢[🧱📦⚙️🪟🚪...13 tipos] × 16 edifícios",
          calculation: "13 + 13 + 13... (16 vezes)",
          answer: 208,
          multiplication: "16 × 13",
          hint: "Cada edifício usa 13 tipos de materiais. Multiplique!",
          context: "Arquitetura estimula pensamento espacial e planejamento"
        },
        {
          scenario: "No 'Festival de Música Virtual', você é organizador de 13 palcos simultâneos. Cada palco terá exatamente 12 apresentações musicais durante o evento. Quantas apresentações musicais acontecerão no festival inteiro?",
          visual: "🎵[🎤🎤🎤🎤🎤🎤🎤🎤🎤🎤🎤🎤] × 13 palcos",
          calculation: "12 + 12 + 12... (13 vezes)",
          answer: 156,
          multiplication: "13 × 12",
          hint: "Cada palco terá 12 apresentações. Multiplique pelo número de palcos!",
          context: "Organização de eventos desenvolve habilidades de coordenação"
        },
        {
          scenario: "Você é líder da aliança mais poderosa no 'Estratégia Galáctica'. Sua aliança controla 15 planetas habitados. Cada planeta contribui com exatamente 14 naves de guerra para a frota unificada. Quantas naves de guerra sua aliança possui no total?",
          visual: "🪐[🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀] × 15 planetas",
          calculation: "14 + 14 + 14... (15 vezes)",
          answer: 210,
          multiplication: "15 × 14",
          hint: "Cada planeta contribui com 14 naves. Multiplique pelo número de planetas!",
          context: "Estratégia espacial desenvolve pensamento tático"
        }
      ]
    }
  };

  const startSession = () => {
    setCurrentView('game');
    setCurrentBlock(1);
    setCurrentQuestion(0);
    setSessionData({
      startTime: new Date(),
      questions: []
    });
    setResponses([]);
  };

  const getCurrentQuestionData = () => {
    return questionsBlocks[currentBlock].questions[currentQuestion];
  };

  const submitAnswer = () => {
    const questionData = getCurrentQuestionData();
    const correct = parseInt(userAnswer) === questionData.answer;
    const responseTime = new Date() - (sessionData.questionStartTime || new Date());
    
    const questionResult = {
      block: currentBlock,
      ageRange: questionsBlocks[currentBlock].ageRange,
      questionIndex: currentQuestion,
      scenario: questionData.scenario,
      correctAnswer: questionData.answer,
      userAnswer: parseInt(userAnswer) || 0,
      isCorrect: correct,
      responseTime: responseTime,
      timestamp: new Date(),
      context: questionData.context
    };

    setSessionData(prev => ({
      ...prev,
      questions: [...prev.questions, questionResult]
    }));

    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Auto avançar após 4 segundos (mais tempo para processar)
    setTimeout(() => {
      nextQuestion();
    }, 4000);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setUserAnswer('');
    
    if (currentQuestion < 4) {
      setCurrentQuestion(prev => prev + 1);
      setSessionData(prev => ({
        ...prev,
        questionStartTime: new Date()
      }));
    } else if (currentBlock < 3) {
      setCurrentBlock(prev => prev + 1);
      setCurrentQuestion(0);
      setSessionData(prev => ({
        ...prev,
        questionStartTime: new Date()
      }));
    } else {
      setCurrentView('complete');
    }
  };

  const downloadCSV = () => {
    const csvContent = [
      ['Bloco', 'Faixa Etária', 'Questão', 'Cenário', 'Contexto', 'Resposta Correta', 'Resposta do Usuário', 'Correto', 'Tempo (ms)', 'Timestamp'],
      ...sessionData.questions.map(q => [
        q.block,
        q.ageRange,
        q.questionIndex + 1,
        `"${q.scenario.replace(/"/g, '""')}"`,
        `"${q.context.replace(/"/g, '""')}"`,
        q.correctAnswer,
        q.userAnswer,
        q.isCorrect ? 'Sim' : 'Não',
        q.responseTime,
        q.timestamp.toISOString()
      ])
    ];

    const csvString = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `roblox-multiplicacao-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getBlockInfo = (block) => {
    return questionsBlocks[block];
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">🎮 Roblox Multiplicação</h1>
          <p className="text-xl text-gray-600 mb-2">Aprenda multiplicação jogando seus games favoritos!</p>
          <p className="text-sm text-gray-500">Aventuras matemáticas no universo Roblox</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(blockNum => {
            const blockInfo = getBlockInfo(blockNum);
            return (
              <div key={blockNum} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{blockInfo.title}</h3>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {blockInfo.ageRange}
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• 5 desafios únicos</p>
                  <p>• Contexto Roblox real</p>
                  <p>• Multiplicação prática</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-8 border-2 border-yellow-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <Star className="text-yellow-500" size={24} />
            Como Funciona a Jornada:
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</span>
                <div>
                  <p className="font-medium">Escolha Sua Idade</p>
                  <p className="text-sm text-gray-600">Questões adequadas ao seu nível</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <p className="font-medium">Viva Aventuras Roblox</p>
                  <p className="text-sm text-gray-600">Contextos reais dos seus games favoritos</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <p className="font-medium">Pratique Multiplicação</p>
                  <p className="text-sm text-gray-600">De soma repetida até problemas complexos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</span>
                <div>
                  <p className="font-medium">Conquiste Seu Certificado</p>
                  <p className="text-sm text-gray-600">Dados completos para acompanhar evolução</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={startSession}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
          >
            🚀 Começar Aventura Matemática
          </button>
          <p className="text-xs text-gray-500 mt-3">Progresso automático • Relatório detalhado • Diversão garantida</p>
        </div>
      </div>
    </div>
  );

  const renderGame = () => {
    const blockInfo = getBlockInfo(currentBlock);
    const questionData = getCurrentQuestionData();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <Home size={20} />
              <span className="font-medium">Voltar ao Início</span>
            </button>
            
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-800">{blockInfo.title}</h2>
              <p className="text-sm text-gray-600">{blockInfo.ageRange} • Questão {currentQuestion + 1} de 5</p>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
              <Target size={20} />
              <span className="font-medium">Nível {currentBlock}/3</span>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
            <div className="flex justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Progresso do Nível</span>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{currentQuestion + 1}/5 questões</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${((currentQuestion + 1) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
                  {questionData.scenario}
                </h3>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6 border border-gray-200">
                <div className="text-center mb-4">
                  <p className="text-2xl font-mono text-gray-700 mb-3">
                    {questionData.visual}
                  </p>
                  <div className="bg-white rounded-lg p-3 inline-block shadow-sm border">
                    <p className="text-lg text-gray-700 font-medium">
                      Calcule: {questionData.calculation}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-blue-700 font-medium bg-blue-50 inline-block px-4 py-2 rounded-full">
                    💡 {questionData.hint}
                  </p>
                </div>
              </div>
            </div>

            {!showFeedback ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Digite sua resposta:
                  </label>
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full p-6 border-3 border-gray-300 rounded-xl text-2xl text-center focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                    placeholder="Sua resposta aqui..."
                    onKeyPress={(e) => e.key === 'Enter' && userAnswer && submitAnswer()}
                  />
                </div>
                
                <button
                  onClick={submitAnswer}
                  disabled={!userAnswer}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-6 px-6 rounded-xl text-xl transition-all shadow-lg transform hover:scale-[1.02] disabled:transform-none"
                >
                  ✅ Confirmar Resposta
                </button>
              </div>
            ) : (
              <div className={`text-center p-8 rounded-xl border-4 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="text-6xl mb-4">
                  {isCorrect ? '🎉' : '🤔'}
                </div>
                <h4 className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Excelente! Você acertou!' : 'Quase lá! Continue tentando!'}
                </h4>
                <div className="space-y-3">
                  <p className="text-xl text-gray-700">
                    <span className="font-semibold">Resposta correta:</span> {questionData.answer}
                  </p>
                  <p className="text-lg text-gray-600">
                    <span className="font-semibold">Multiplicação:</span> {questionData.multiplication} = {questionData.answer}
                  </p>
                  <div className="bg-white rounded-lg p-4 mt-4 border border-gray-200">
                    <p className="text-sm text-gray-600 font-medium">
                      📚 Contexto: {questionData.context}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-6 bg-gray-100 inline-block px-4 py-2 rounded-full">
                  ⏱️ Próxima questão em alguns segundos...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderComplete = () => {
    const totalQuestions = sessionData.questions.length;
    const correctAnswers = sessionData.questions.filter(q => q.isCorrect).length;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    const averageTime = Math.round(sessionData.questions.reduce((sum, q) => sum + q.responseTime, 0) / totalQuestions / 1000);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-orange-400 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-3">🏆 Missão Cumprida!</h1>
            <p className="text-xl text-gray-600 mb-2">Você completou todos os desafios do Roblox!</p>
            <p className="text-sm text-gray-500">Parabéns pela dedicação e esforço!</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">📊 Seu Desempenho Final:</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-blue-100">
                <div className="text-3xl font-bold text-blue-700 mb-1">{correctAnswers}</div>
                <div className="text-sm text-blue-600 font-medium">Questões Corretas</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-green-100">
                <div className="text-3xl font-bold text-green-700 mb-1">{accuracy}%</div>
                <div className="text-sm text-green-600 font-medium">Precisão</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-purple-100">
                <div className="text-3xl font-bold text-purple-700 mb-1">{totalQuestions}</div>
                <div className="text-sm text-purple-600 font-medium">Total de Questões</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-orange-100">
                <div className="text-3xl font-bold text-orange-700 mb-1">{averageTime}s</div>
                <div className="text-sm text-orange-600 font-medium">Tempo Médio</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={downloadCSV}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all shadow-lg flex items-center justify-center gap-3 transform hover:scale-[1.02]"
            >
              <Download size={24} />
              📄 Baixar Relatório Completo (CSV)
            </button>
            
            <button 
              onClick={() => setCurrentView('home')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all shadow-lg flex items-center justify-center gap-3 transform hover:scale-[1.02]"
            >
              <Home size={24} />
              🎮 Jogar Novamente
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
            <p>💡 <strong>Dica para pais/professores:</strong> O relatório CSV contém dados detalhados sobre tempo de resposta, contextos utilizados e progressão por faixa etária para análise pedagógica.</p>
          </div>
        </div>
      </div>
    );
  };

  // Initialize question start time when starting
  useEffect(() => {
    if (currentView === 'game' && sessionData.startTime) {
      setSessionData(prev => ({
        ...prev,
        questionStartTime: new Date()
      }));
    }
  }, [currentView, currentBlock, currentQuestion]);

  return (
    <div className="font-sans">
      {currentView === 'home' && renderHome()}
      {currentView === 'game' && renderGame()}
      {currentView === 'complete' && renderComplete()}
    </div>
  );
};

export default RobloxMultiplicacao;