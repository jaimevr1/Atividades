import React, { useState } from 'react';

const QuizOperacoes = () => {
  const [studentName, setStudentName] = useState('');
  const [fontSize, setFontSize] = useState('normal');
  const [selectedBlocks, setSelectedBlocks] = useState([0]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [fontType, setFontType] = useState('comic-sans');
  const [currentChunk, setCurrentChunk] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [chunkScore, setChunkScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [chunkResults, setChunkResults] = useState([]);
  const [currentChunkAnswers, setCurrentChunkAnswers] = useState([]);
  const [shuffledProblems, setShuffledProblems] = useState([]);
  const [showChunkReport, setShowChunkReport] = useState(false);
  const [pendingReports, setPendingReports] = useState([]);

  // Problemas organizados por blocos baseados nos interesses das crianças
  const problemBlocks = [
    // Bloco 1: Soma e Subtração (Fácil)
    [
      {
        text: "João tem 3 carros de brinquedo no Roblox e ganhou mais 2. Quantos carros ele tem agora?",
        operation: "adição",
        explanation: "A palavra 'ganhou MAIS' indica que estamos SOMANDO.",
        calculation: "3 + 2 = 5"
      },
      {
        text: "Maria tinha 8 doces e comeu 3. Quantos doces sobraram?",
        operation: "subtração",
        explanation: "Ela COMEU alguns doces, então eles SAÍRAM.",
        calculation: "8 - 3 = 5"
      },
      {
        text: "Pedro viu 6 vídeos do Diário do Bananinha e sua irmã viu mais 4. Quantos vídeos eles viram juntos?",
        operation: "adição",
        explanation: "Estamos JUNTANDO os vídeos dos dois.",
        calculation: "6 + 4 = 10"
      },
      {
        text: "Ana tinha 9 pipas e 4 voaram no vento. Quantas pipas ficaram?",
        operation: "subtração",
        explanation: "As pipas VOARAM, então SAÍRAM.",
        calculation: "9 - 4 = 5"
      },
      {
        text: "Lucas tem 5 tênis e ganhou 3 novos. Quantos tênis ele possui agora?",
        operation: "adição",
        explanation: "Ele GANHOU mais tênis, então SOMAMOS.",
        calculation: "5 + 3 = 8"
      }
    ],
    // Bloco 2: Soma e Subtração (Médio)
    [
      {
        text: "Julia construiu 12 casas no Minecraft e destruiu 5. Quantas casas restaram?",
        operation: "subtração",
        explanation: "Ela DESTRUIU casas, então TIRAMOS.",
        calculation: "12 - 5 = 7"
      },
      {
        text: "Carlos coleciona 15 carros de brinquedo e ganhou 8 novos na festa. Quantos carros ele tem?",
        operation: "adição",
        explanation: "Ele GANHOU mais carros, então SOMAMOS.",
        calculation: "15 + 8 = 23"
      },
      {
        text: "Beatriz tinha 20 doces de aniversário e distribuiu 12. Quantos doces sobraram?",
        operation: "subtração",
        explanation: "Ela DISTRIBUIU doces, então eles SAÍRAM.",
        calculation: "20 - 12 = 8"
      },
      {
        text: "Roberto assistiu 18 vídeos de motos no YouTube e sua mãe deixou ele ver mais 7. Quantos vídeos no total?",
        operation: "adição",
        explanation: "Somamos os vídeos que ele já viu com os novos.",
        calculation: "18 + 7 = 25"
      },
      {
        text: "Livia tinha 25 bicicletas no jogo e perdeu 9 na competição. Quantas bicicletas restaram?",
        operation: "subtração",
        explanation: "Ela PERDEU bicicletas, então TIRAMOS.",
        calculation: "25 - 9 = 16"
      }
    ],
    // Bloco 3: Soma e Subtração (Difícil)
    [
      {
        text: "Gabriel coleta 125 moedas no Roblox e gastou 78 numa skin. Quantas moedas sobraram?",
        operation: "subtração",
        explanation: "Ele GASTOU moedas, então elas SAÍRAM.",
        calculation: "125 - 78 = 47"
      },
      {
        text: "Sofia juntou 89 diamantes no Minecraft com mais 156 que achou. Quantos diamantes ela tem?",
        operation: "adição",
        explanation: "Ela ACHOU mais diamantes, então SOMAMOS.",
        calculation: "89 + 156 = 245"
      },
      {
        text: "Mateus tinha 200 seguidores e 45 pararam de seguir. Quantos seguidores ficaram?",
        operation: "subtração",
        explanation: "Alguns PARARAM de seguir, então SAÍRAM.",
        calculation: "200 - 45 = 155"
      },
      {
        text: "Isadora dormiu 8 horas na segunda e 9 horas na terça. Quantas horas dormiu no total?",
        operation: "adição",
        explanation: "Somamos as horas dos dois dias.",
        calculation: "8 + 9 = 17"
      },
      {
        text: "Diego tinha 350 blocos no Minecraft e usou 127 para construir. Quantos blocos sobraram?",
        operation: "subtração",
        explanation: "Ele USOU blocos para construir, então SAÍRAM.",
        calculation: "350 - 127 = 223"
      }
    ],
    // Bloco 4: Soma, Subtração e Multiplicação
    [
      {
        text: "Carolina tem 4 grupos de amigos no Roblox. Cada grupo tem 6 pessoas. Quantas pessoas no total?",
        operation: "multiplicação",
        explanation: "Temos GRUPOS IGUAIS (4 grupos com 6 pessoas cada). É MULTIPLICAÇÃO.",
        calculation: "4 × 6 = 24"
      },
      {
        text: "Vitor colecionou 35 cartas Pokémon e deu 12 para o amigo. Quantas cartas ficaram?",
        operation: "subtração",
        explanation: "Ele DEU cartas, então elas SAÍRAM.",
        calculation: "35 - 12 = 23"
      },
      {
        text: "Laura comprou 3 pacotes de doces. Cada pacote tem 8 doces. Quantos doces no total?",
        operation: "multiplicação",
        explanation: "Cada pacote tem a mesma quantidade de doces.",
        calculation: "3 × 8 = 24"
      },
      {
        text: "Rafael tinha 45 tênis de coleção e comprou mais 18. Quantos tênis ele possui agora?",
        operation: "adição",
        explanation: "Ele COMPROU mais tênis, então SOMAMOS.",
        calculation: "45 + 18 = 63"
      },
      {
        text: "Camila assiste 5 influencers diferentes. Cada um posta 7 vídeos por semana. Quantos vídeos por semana?",
        operation: "multiplicação",
        explanation: "Cada influencer posta a mesma quantidade.",
        calculation: "5 × 7 = 35"
      }
    ],
    // Bloco 5: Soma, Subtração e Multiplicação
    [
      {
        text: "Artur tem 6 motos virtuais no jogo. Cada moto custa 15 moedas. Quanto gastou no total?",
        operation: "multiplicação",
        explanation: "Cada moto custa o mesmo valor.",
        calculation: "6 × 15 = 90"
      },
      {
        text: "Juliana tinha 80 seguidores no TikTok e ganhou 25 novos. Quantos seguidores tem agora?",
        operation: "adição",
        explanation: "Ela GANHOU novos seguidores, então SOMAMOS.",
        calculation: "80 + 25 = 105"
      },
      {
        text: "Guilherme tinha 120 blocos no Minecraft e usou 65 numa construção. Quantos blocos restam?",
        operation: "subtração",
        explanation: "Ele USOU blocos, então eles SAÍRAM.",
        calculation: "120 - 65 = 55"
      },
      {
        text: "Alice coleta 12 itens por fase do jogo. Ela passou 8 fases. Quantos itens coletou?",
        operation: "multiplicação",
        explanation: "Cada fase dá a mesma quantidade de itens.",
        calculation: "12 × 8 = 96"
      },
      {
        text: "Bruno dormiu 9 horas na sexta e 11 horas no sábado. Quantas horas dormiu no fim de semana?",
        operation: "adição",
        explanation: "Somamos as horas dos dois dias.",
        calculation: "9 + 11 = 20"
      }
    ],
    // Bloco 6: Soma, Subtração e Multiplicação
    [
      {
        text: "Leticia comprou 4 pares de tênis novos. Cada par custou 25 reais. Quanto gastou no total?",
        operation: "multiplicação",
        explanation: "Cada par de tênis custa o mesmo valor.",
        calculation: "4 × 25 = 100"
      },
      {
        text: "Ricardo tinha 150 moedas no Roblox e comprou um carro por 89 moedas. Quantas moedas sobraram?",
        operation: "subtração",
        explanation: "Ele COMPROU algo, então as moedas SAÍRAM.",
        calculation: "150 - 89 = 61"
      },
      {
        text: "Mariana empinou 7 pipas ontem e 12 pipas hoje. Quantas pipas empinou no total?",
        operation: "adição",
        explanation: "Somamos as pipas dos dois dias.",
        calculation: "7 + 12 = 19"
      },
      {
        text: "Pedro tem 9 bicicletas de coleção. Cada bicicleta tem 2 rodas. Quantas rodas no total?",
        operation: "multiplicação",
        explanation: "Cada bicicleta tem a mesma quantidade de rodas.",
        calculation: "9 × 2 = 18"
      },
      {
        text: "Sara tinha 95 doces de Halloween e comeu 28. Quantos doces ainda tem?",
        operation: "subtração",
        explanation: "Ela COMEU doces, então eles SAÍRAM.",
        calculation: "95 - 28 = 67"
      }
    ],
    // Bloco 7: Soma, Subtração e Multiplicação
    [
      {
        text: "João assiste 8 influencers. Cada um faz 12 vídeos por mês. Quantos vídeos por mês no total?",
        operation: "multiplicação",
        explanation: "Cada influencer faz a mesma quantidade de vídeos.",
        calculation: "8 × 12 = 96"
      },
      {
        text: "Valentina construiu 75 casas no Minecraft e destruiu 23. Quantas casas restaram?",
        operation: "subtração",
        explanation: "Ela DESTRUIU casas, então elas SAÍRAM.",
        calculation: "75 - 23 = 52"
      },
      {
        text: "Thago colecionou 45 carros de brinquedo e ganhou 37 no aniversário. Quantos carros tem agora?",
        operation: "adição",
        explanation: "Ele GANHOU mais carros, então SOMAMOS.",
        calculation: "45 + 37 = 82"
      },
      {
        text: "Beatriz dorme 11 horas por noite. Em 6 noites, quantas horas dormiu?",
        operation: "multiplicação",
        explanation: "Cada noite ela dorme a mesma quantidade de horas.",
        calculation: "11 × 6 = 66"
      },
      {
        text: "Gabriel tinha 200 seguidores e perdeu 45. Quantos seguidores ficaram?",
        operation: "subtração",
        explanation: "Ele PERDEU seguidores, então eles SAÍRAM.",
        calculation: "200 - 45 = 155"
      }
    ],
    // Bloco 8: Todas as 4 operações
    [
      {
        text: "Luca dividiu 24 doces igualmente entre 6 amigos. Quantos doces cada amigo recebeu?",
        operation: "divisão",
        explanation: "A palavra 'dividiu igualmente' indica DIVISÃO.",
        calculation: "24 ÷ 6 = 4"
      },
      {
        text: "Sofia tem 7 grupos de seguidores. Cada grupo tem 45 pessoas. Quantos seguidores no total?",
        operation: "multiplicação",
        explanation: "Temos GRUPOS IGUAIS de seguidores.",
        calculation: "7 × 45 = 315"
      },
      {
        text: "Daniel tinha 180 blocos no Minecraft e comprou mais 95. Quantos blocos tem agora?",
        operation: "adição",
        explanation: "Ele COMPROU mais blocos, então SOMAMOS.",
        calculation: "180 + 95 = 275"
      },
      {
        text: "Isabella queria repartir 36 tênis da coleção em 9 caixas iguais. Quantos tênis em cada caixa?",
        operation: "divisão",
        explanation: "A palavra 'repartir' em caixas iguais é DIVISÃO.",
        calculation: "36 ÷ 9 = 4"
      },
      {
        text: "Matheus tinha 250 moedas no Roblox e gastou 89 numa skin. Quantas moedas restaram?",
        operation: "subtração",
        explanation: "Ele GASTOU moedas, então elas SAÍRAM.",
        calculation: "250 - 89 = 161"
      }
    ],
    // Bloco 9: Todas as 4 operações
    [
      {
        text: "Ana Julia tem 72 doces e quer dividir igualmente entre 12 crianças. Quantos doces cada uma vai receber?",
        operation: "divisão",
        explanation: "A palavra 'dividir igualmente' indica DIVISÃO.",
        calculation: "72 ÷ 12 = 6"
      },
      {
        text: "Fernando coleciona motos. Ele tem 15 motos clássicas e comprou 28 motos modernas. Quantas motos tem no total?",
        operation: "adição",
        explanation: "Ele COMPROU mais motos, então SOMAMOS as duas coleções.",
        calculation: "15 + 28 = 43"
      },
      {
        text: "Caroline assiste o Diário do Bananinha 3 vezes por semana durante 8 semanas. Quantos episódios assistiu?",
        operation: "multiplicação",
        explanation: "Cada semana ela assiste a mesma quantidade.",
        calculation: "3 × 8 = 24"
      },
      {
        text: "Roberto tinha 300 seguidores no YouTube e perdeu 125 porque ficou sem postar. Quantos seguidores ficaram?",
        operation: "subtração",
        explanation: "Ele PERDEU seguidores, então eles SAÍRAM.",
        calculation: "300 - 125 = 175"
      },
      {
        text: "Maria tem 60 pipas para repartir igualmente entre 5 amigas. Quantas pipas cada amiga vai receber?",
        operation: "divisão",
        explanation: "A palavra 'repartir igualmente' indica DIVISÃO.",
        calculation: "60 ÷ 5 = 12"
      }
    ]
  ];

  const blockIcons = ['🎮', '🏆', '⭐', '🎯', '🚀', '💎', '🎪', '🎭', '👑'];
  const blockTitles = [
    '🎮 Nível Iniciante',
    '🏆 Nível Aventureiro', 
    '⭐ Nível Explorador',
    '🎯 Nível Estrategista',
    '🚀 Nível Construtor',
    '💎 Nível Colecionador',
    '🎪 Nível Mestre',
    '🎭 Nível Expert',
    '👑 Nível Champion'
  ];

  const operations = [
    { value: 'adição', label: 'Adição (+)', color: 'bg-green-100 text-green-800' },
    { value: 'subtração', label: 'Subtração (-)', color: 'bg-red-100 text-red-800' },
    { value: 'multiplicação', label: 'Multiplicação (×)', color: 'bg-blue-100 text-blue-800' },
    { value: 'divisão', label: 'Divisão (÷)', color: 'bg-purple-100 text-purple-800' }
  ];

  const fontSizes = {
    normal: { fontSize: '24px' },
    large: { fontSize: '36px' }
  };

  const fontStyles = {
    'comic-sans': { fontFamily: "'Comic Sans MS', cursive" },
    'opendyslexic': { 
      fontFamily: "'OpenDyslexic', 'OpenDyslexic-Regular', monospace",
      fontWeight: 'normal'
    }
  };

  const combinedStyles = {
    ...fontStyles[fontType],
    ...fontSizes[fontSize]
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateShuffledProblems = () => {
    const chunks = [];
    selectedBlocks.forEach(blockIndex => {
      chunks.push(shuffleArray([...problemBlocks[blockIndex]]));
    });
    setShuffledProblems(chunks);
  };

  const toggleBlock = (blockIndex) => {
    setSelectedBlocks([blockIndex]); // Apenas um bloco por vez
  };

  const handleStartQuiz = () => {
    if (studentName.trim() && selectedBlocks.length > 0) {
      generateShuffledProblems();
      setQuizStarted(true);
    }
  };

  const getCelebrationMessage = () => {
    const celebrations = [
      "👏 Parabéns! Bata palmas! 👏",
      "🎉 Isso aí! Levante o braço comemorando! 🎉",  
      "⭐ Perfeito! Faça um sinal de positivo! ⭐",
      "🏆 Muito bem! Dê um sorriso grande! 🏆",
      "✨ Ótimo! Faça a dança da vitória! ✨"
    ];
    return celebrations[Math.floor(Math.random() * celebrations.length)];
  };

  const getEncouragementMessage = (score, total) => {
    const percentage = (score / total) * 100;
    
    if (percentage >= 90) {
      return {
        title: "🏆 FANTÁSTICO! 🏆",
        message: "Você é um verdadeiro detetive de operações matemáticas! Continue assim!",
        color: "text-green-600"
      };
    } else if (percentage >= 70) {
      return {
        title: "👏 MUITO BEM! 👏", 
        message: "Você está indo super bem! Cada acerto é uma conquista!",
        color: "text-blue-600"
      };
    } else if (percentage >= 50) {
      return {
        title: "💪 CONTINUE ASSIM! 💪",
        message: "Você está aprendendo cada vez mais! O importante é não desistir!",
        color: "text-orange-600"
      };
    } else {
      return {
        title: "⭐ VOCÊ CONSEGUE! ⭐",
        message: "Todo mundo tem seu ritmo! O mais importante é que você está tentando!",
        color: "text-purple-600"
      };
    }
  };

  const downloadReport = (chunkIndex, score, answers) => {
    const chunkTitle = blockTitles[selectedBlocks[chunkIndex]];
    const totalQuestions = answers.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Criar dados CSV com UTF-8 BOM
    const csvHeader = 'Aluno,Data,Hora,Bloco,Operacao,Questao_Numero,Questao_Texto,Resposta_Dada,Resposta_Correta,Acertou,Explicacao';
    const csvRows = answers.map((answer, index) => {
      const questaoTexto = answer.question.replace(/,/g, ';').replace(/"/g, '""'); // Escapar aspas e vírgulas
      const explicacao = answer.explanation ? answer.explanation.replace(/,/g, ';').replace(/"/g, '""') : '';
      return `"${studentName}","${new Date().toLocaleDateString('pt-BR')}","${new Date().toLocaleTimeString('pt-BR')}","${chunkTitle}","${answer.correctAnswer}","${index + 1}","${questaoTexto}","${answer.givenAnswer}","${answer.correctAnswer}","${answer.correct ? 'SIM' : 'NÃO'}","${explicacao}"`;
    });
    
    // Adicionar linha de resumo
    const resumoRow = `"${studentName}","${new Date().toLocaleDateString('pt-BR')}","${new Date().toLocaleTimeString('pt-BR')}","RESUMO - ${chunkTitle}","RESULTADO GERAL","${totalQuestions} questões","${score} acertos","${percentage}%","","",""`;
    
    // Adicionar BOM UTF-8 para garantir codificação correta
    const BOM = '\uFEFF';
    const csvContent = BOM + [csvHeader, ...csvRows, resumoRow].join('\n');

    return { 
      fileName: `${studentName.replace(/[^a-zA-Z0-9]/g, '_')}_${chunkTitle.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`, 
      content: csvContent 
    };
  };

  const handleAnswerClick = (operation) => {
    setSelectedAnswer(operation);
    const currentProblem = shuffledProblems[currentChunk][currentQuestion];
    const correct = operation === currentProblem.operation;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
    
    const answerData = {
      question: currentProblem.text,
      correctAnswer: currentProblem.operation,
      givenAnswer: operation,
      correct: correct
    };
    
    setCurrentChunkAnswers([...currentChunkAnswers, answerData]);
    
    if (correct) {
      setChunkScore(chunkScore + 1);
      setTotalScore(totalScore + 1);
    }
  };

  const handleNext = () => {
    const totalChunkQuestions = 5;
    
    if (currentQuestion < totalChunkQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      const report = downloadReport(currentChunk, chunkScore, currentChunkAnswers);
      setPendingReports([...pendingReports, report]);
      
      const chunkResult = {
        chunkIndex: currentChunk,
        chunkTitle: blockTitles[selectedBlocks[currentChunk]],
        score: chunkScore,
        total: totalChunkQuestions,
        answers: currentChunkAnswers
      };
      
      setChunkResults([...chunkResults, chunkResult]);
      setShowChunkReport(true);
    }
  };

  const handleNextChunk = () => {
    setShowChunkReport(false);
    
    if (currentChunk < shuffledProblems.length - 1) {
      setCurrentChunk(currentChunk + 1);
      setCurrentQuestion(0);
      setChunkScore(0);
      setCurrentChunkAnswers([]);
      setSelectedAnswer('');
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    pendingReports.forEach(report => {
      const blob = new Blob([report.content], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = report.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    setStudentName('');
    setSelectedBlocks([0]);
    setQuizStarted(false);
    setCurrentChunk(0);
    setCurrentQuestion(0);
    setChunkScore(0);
    setTotalScore(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setShowCelebration(false);
    setIsCorrect(false);
    setQuizCompleted(false);
    setShowChunkReport(false);
    setChunkResults([]);
    setCurrentChunkAnswers([]);
    setShuffledProblems([]);
    setPendingReports([]);
  };

  // Tela inicial
  if (!quizStarted) {
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-blue-100"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(254, 240, 138, 0.6) 0%, rgba(254, 249, 195, 0.4) 50%, rgba(219, 234, 254, 0.6) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6" style={combinedStyles}>
            <style>
              {`
                @import url('https://forge.hackers.town/antijingoist/opendyslexic/raw/branch/main/OpenDyslexic-Regular.ttf');
                @font-face {
                  font-family: 'OpenDyslexic';
                  src: url('https://forge.hackers.town/antijingoist/opendyslexic/raw/branch/main/OpenDyslexic-Regular.ttf') format('truetype');
                  font-weight: normal;
                  font-style: normal;
                }
              `}
            </style>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                Quiz de Operações Matemáticas
              </h1>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Digite seu nome:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                placeholder="Seu nome aqui..."
                onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Escolha sua fonte:
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setFontType('comic-sans')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                      fontType === 'comic-sans' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Comic Sans
                  </button>
                  <button
                    onClick={() => setFontType('opendyslexic')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                      fontType === 'opendyslexic' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    OpenDyslexic
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Tamanho da fonte:
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                      fontSize === 'normal' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                      fontSize === 'large' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Grande
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Escolha um nível:
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {blockTitles.map((title, index) => (
                  <button
                    key={index}
                    onClick={() => toggleBlock(index)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedBlocks.includes(index)
                        ? 'bg-blue-100 border-blue-500 text-blue-800 shadow-md transform scale-105'
                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:scale-102'
                    }`}
                  >
                    <div className="font-semibold text-sm">{title}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      5 questões
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              disabled={!studentName.trim() || selectedBlocks.length === 0}
              className={`w-full px-6 py-3 rounded-lg text-lg font-semibold transition-colors ${
                studentName.trim() && selectedBlocks.length > 0
                  ? 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Começar Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Relatório do chunk
  if (showChunkReport) {
    const lastResult = chunkResults[chunkResults.length - 1];
    const encouragement = getEncouragementMessage(lastResult.score, lastResult.total);
    
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-blue-100"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(254, 240, 138, 0.6) 0%, rgba(254, 249, 195, 0.4) 50%, rgba(219, 234, 254, 0.6) 100%)'
        }}
      >
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6" style={combinedStyles}>
            <div className="text-center">
              <h2 className={`text-2xl font-bold mb-4 ${encouragement.color}`}>
                {encouragement.title}
              </h2>
              
              <div className="text-6xl mb-4">
                {lastResult.score >= lastResult.total * 0.8 ? '🏆' : 
                 lastResult.score >= lastResult.total * 0.6 ? '👏' : '💪'}
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Nível Concluído: {lastResult.chunkTitle}
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  {lastResult.score} de {lastResult.total} acertos
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  {Math.round((lastResult.score / lastResult.total) * 100)}% de aproveitamento
                </p>
                <p className={`text-lg font-semibold ${encouragement.color}`}>
                  {encouragement.message}
                </p>
              </div>
              
              <button
                onClick={handleNextChunk}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold transform hover:scale-105"
              >
                {currentChunk < shuffledProblems.length - 1 ? '➡️ Próximo Nível' : '🎯 Ver Resultado Final'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz finalizado
  if (quizCompleted) {
    const totalQuestions = chunkResults.reduce((sum, result) => sum + result.total, 0);
    
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-blue-100"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(254, 240, 138, 0.6) 0%, rgba(254, 249, 195, 0.4) 50%, rgba(219, 234, 254, 0.6) 100%)'
        }}
      >
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6" style={combinedStyles}>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                Parabéns, {studentName}!
              </h1>
              <div className="text-6xl mb-4">
                {totalScore >= totalQuestions * 0.8 ? '🏆' : totalScore >= totalQuestions * 0.6 ? '👏' : '💪'}
              </div>
              <p className="text-2xl mb-6">
                Você completou o nível selecionado!
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Resumo dos Resultados:
                </h3>
                {chunkResults.map((result, index) => (
                  <div key={index} className="mb-2 text-left">
                    <span className="font-semibold">{result.chunkTitle}:</span> {result.score}/{result.total} 
                    <span className="text-gray-600 ml-2">
                      ({Math.round((result.score / result.total) * 100)}%)
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-3 font-bold">
                  <span>
                    Total Geral: {totalScore}/{totalQuestions} ({Math.round((totalScore / totalQuestions) * 100)}%)
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Clique em "Voltar ao Início" para baixar o relatório!
              </p>
              
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold transform hover:scale-105"
              >
                🏠 Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!shuffledProblems[currentChunk]) return <div>Carregando...</div>;

  const currentProblem = shuffledProblems[currentChunk][currentQuestion];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-blue-100"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(254, 240, 138, 0.6) 0%, rgba(254, 249, 195, 0.4) 50%, rgba(219, 234, 254, 0.6) 100%)'
      }}
    >
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6" style={combinedStyles}>
          <style>
            {`
              @import url('https://forge.hackers.town/antijingoist/opendyslexic/raw/branch/main/OpenDyslexic-Regular.ttf');
              @font-face {
                font-family: 'OpenDyslexic';
                src: url('https://forge.hackers.town/antijingoist/opendyslexic/raw/branch/main/OpenDyslexic-Regular.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
              }
            `}
          </style>

          {/* Celebração */}
          {showCelebration && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 text-center shadow-xl">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {getCelebrationMessage()}
                </div>
              </div>
            </div>
          )}

          {/* Cabeçalho */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">
                Aluno: {studentName}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setFontType('comic-sans')}
                  className={`px-2 py-1 rounded text-sm transition-colors ${
                    fontType === 'comic-sans' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Comic
                </button>
                <button
                  onClick={() => setFontType('opendyslexic')}
                  className={`px-2 py-1 rounded text-sm transition-colors ${
                    fontType === 'opendyslexic' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Dyslexic
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-800">
                {blockTitles[selectedBlocks[currentChunk]]}
              </h2>
              <span className="text-sm text-gray-600">
                Questão {currentQuestion + 1} de 5
              </span>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>
                Progresso do Nível
              </span>
              <span>{chunkScore} acertos</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentQuestion / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Pergunta */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Que tipo de operação resolve este problema?
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-lg leading-relaxed text-gray-800">
                {currentProblem.text}
              </p>
            </div>
          </div>

          {/* Opções */}
          {!showFeedback && (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                {operations.map((operation) => (
                  <button
                    key={operation.value}
                    onClick={() => handleAnswerClick(operation.value)}
                    className={`p-4 rounded-lg border-2 border-gray-300 hover:border-blue-500 transition-all duration-200 text-left transform hover:scale-105 ${operation.color}`}
                  >
                    <div className="font-semibold text-lg">{operation.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className="mb-6">
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border-2`}>
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">
                    {isCorrect ? '✅' : '❌'}
                  </span>
                  <span className={`font-bold text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? 'Correto!' : 'Não é essa operação...'}
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700 mb-2">
                    <strong>
                      Resposta correta:
                    </strong> {operations.find(op => op.value === currentProblem.operation)?.label}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    <strong>
                      Explicação:
                    </strong> {currentProblem.explanation}
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="text-gray-700">
                    <strong>
                      Cálculo:
                    </strong> {currentProblem.calculation}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={handleNext}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold transform hover:scale-105"
                >
                  {currentQuestion < 4 
                    ? <>➡️ Próxima Questão</> 
                    : <>🏁 Finalizar Nível</>
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizOperacoes;