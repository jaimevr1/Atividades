import React, { useState, useEffect } from 'react';

const LojaRoblox = () => {
  // Estados principais
  const [studentName, setStudentName] = useState('');
  const [currentPhase, setCurrentPhase] = useState('inicio'); // inicio, jogo, resultado
  const [currentLevel, setCurrentLevel] = useState(0);
  const [robuxBalance, setRobuxBalance] = useState(50);
  const [carrinho, setCarrinho] = useState([]);
  const [totalGasto, setTotalGasto] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [collectedData, setCollectedData] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanationSlide, setExplanationSlide] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Estrutura pedagógica baseada na BNCC
  const niveis = [
    // Nível 1: Significado "juntar" - números até 20
    {
      titulo: "Primeiros Itens",
      robuxInicial: 50,
      objetivo: "Junte 2 itens no carrinho",
      tipoSoma: "juntar",
      itens: [
        { id: 1, nome: "Boné Legal", preco: 8, emoji: "🧢" },
        { id: 2, nome: "Óculos", preco: 12, emoji: "🕶️" },
        { id: 3, nome: "Camisa Cool", preco: 15, emoji: "👕" },
        { id: 4, nome: "Tênis", preco: 20, emoji: "👟" }
      ],
      pergunta: "Quanto você gastará se pegar o [item1] E o [item2]?",
      metaItens: 2
    },
    // Nível 2: Significado "acrescentar" - números até 30
    {
      titulo: "Upgrade do Avatar",
      robuxInicial: 75,
      objetivo: "Acrescente 1 item caro ao seu kit",
      tipoSoma: "acrescentar",
      itens: [
        { id: 1, nome: "Kit Básico", preco: 25, emoji: "📦" },
        { id: 2, nome: "Acessório Premium", preco: 18, emoji: "✨" },
        { id: 3, nome: "Emote Especial", preco: 22, emoji: "💃" },
        { id: 4, nome: "Pet Fofo", preco: 30, emoji: "🐱" }
      ],
      pergunta: "Se você já tem [valor1] Robux gastos, quanto ficará acrescentando [item2]?",
      metaItens: 3
    },
    // Nível 3: Significado "comparar" - números até 50
    {
      titulo: "Qual Compra é Melhor?",
      robuxInicial: 100,
      objetivo: "Compare preços e escolha a melhor opção",
      tipoSoma: "comparar",
      itens: [
        { id: 1, nome: "Combo A", preco: 35, emoji: "🎁" },
        { id: 2, nome: "Item Individual", preco: 15, emoji: "⭐" },
        { id: 3, nome: "Combo B", preco: 42, emoji: "🎊" },
        { id: 4, nome: "Oferta Especial", preco: 28, emoji: "🔥" }
      ],
      pergunta: "Quanto você economiza comprando [combo1] em vez de [item1] + [item2] separados?",
      metaItens: 4
    },
    // Nível 4: Significado "completar" - números até 75
    {
      titulo: "Completar o Look",
      robuxInicial: 150,
      objetivo: "Complete seu avatar gastando exatamente o planejado",
      tipoSoma: "completar",
      itens: [
        { id: 1, nome: "Cabelo Estiloso", preco: 45, emoji: "💇" },
        { id: 2, nome: "Roupa Completa", preco: 38, emoji: "👗" },
        { id: 3, nome: "Acessórios", preco: 22, emoji: "👑" },
        { id: 4, nome: "Skin Especial", preco: 55, emoji: "🌟" }
      ],
      pergunta: "Quanto falta para chegar em [meta] Robux se você já gastou [gasto]?",
      metaItens: 5
    },
    // Nível 5: Soma complexa - números até 100
    {
      titulo: "Loja Premium",
      robuxInicial: 200,
      objetivo: "Resolva problemas de soma mais complexos",
      tipoSoma: "complexa",
      itens: [
        { id: 1, nome: "Avatar Completo", preco: 85, emoji: "🦸" },
        { id: 2, nome: "Casa Virtual", preco: 92, emoji: "🏠" },
        { id: 3, nome: "Veículo", preco: 78, emoji: "🚗" },
        { id: 4, nome: "Pacote VIP", preco: 95, emoji: "💎" }
      ],
      pergunta: "Se você comprar [qtd] itens de [preco] Robux cada, quanto gastará no total?",
      metaItens: 6
    }
  ];

  // Sistema de explicação conceitual
  const explicacoes = {
    soma: [
      {
        imagem: "🧮",
        texto: "Soma é juntar valores!",
        audio: "soma_slide1.mp3",
        explicacao: "Quando somamos, estamos juntando quantidades. Como juntar dinheiro no seu cofrinho!"
      },
      {
        imagem: "💰",
        texto: "Robux + Item = Total gasto",
        audio: "soma_slide2.mp3", 
        explicacao: "Se você tem 50 Robux e gasta 20 em um item, você calculou: 50 - 20 = 30 Robux restantes!"
      },
      {
        imagem: "🛒",
        texto: "Carrinho mostra o resultado",
        audio: "soma_slide3.mp3",
        explicacao: "O carrinho sempre mostra quanto você já gastou. É como uma calculadora automática!"
      }
    ]
  };

  // Efeitos
  useEffect(() => {
    if (currentPhase === 'jogo' && !startTime) {
      setStartTime(Date.now());
    }
  }, [currentPhase]);

  useEffect(() => {
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    setTotalGasto(total);
  }, [carrinho]);

  // Funções principais
  const iniciarJogo = () => {
    if (!studentName.trim()) {
      alert('Digite seu nome primeiro!');
      return;
    }
    setCurrentPhase('jogo');
    setStartTime(Date.now());
  };

  const adicionarAoCarrinho = (item) => {
    if (carrinho.length < niveis[currentLevel].metaItens) {
      setCarrinho([...carrinho, item]);
      if (carrinho.length + 1 === niveis[currentLevel].metaItens) {
        verificarResposta();
      }
    }
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(novoCarrinho);
  };

  const verificarResposta = () => {
    const timeSpent = (Date.now() - startTime) / 1000;
    const isCorrect = totalGasto <= robuxBalance;
    
    const attempt = {
      studentName,
      timestamp: new Date().toISOString(),
      level: currentLevel + 1,
      concept: niveis[currentLevel].tipoSoma,
      timeSpent: Math.round(timeSpent),
      totalSpent: totalGasto,
      robuxBalance: robuxBalance,
      items: carrinho.map(item => item.nome).join(', '),
      correct: isCorrect,
      attempts: attempts + 1
    };

    setCollectedData([...collectedData, attempt]);
    setAttempts(attempts + 1);

    if (isCorrect) {
      setScore(score + 1);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        proximoNivel();
      }, 3000);
    } else {
      alert(`Ops! Você gastou ${totalGasto} Robux mas só tem ${robuxBalance}. Tente novamente!`);
      setCarrinho([]);
    }
  };

  const proximoNivel = () => {
    if (currentLevel < niveis.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setCarrinho([]);
      setRobuxBalance(niveis[currentLevel + 1].robuxInicial);
      setStartTime(Date.now());
    } else {
      setCurrentPhase('resultado');
    }
  };

  const exportarCSV = () => {
    const headers = ['Aluno', 'Data_Hora', 'Nivel', 'Conceito', 'Tempo_Gasto', 'Total_Gasto', 'Robux_Disponivel', 'Itens_Escolhidos', 'Correto', 'Tentativa'];
    const csvContent = [
      headers.join(','),
      ...collectedData.map(row => [
        row.studentName,
        row.timestamp,
        row.level,
        row.concept,
        row.timeSpent,
        row.totalSpent,
        row.robuxBalance,
        `"${row.items}"`,
        row.correct,
        row.attempts
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `loja_roblox_${studentName}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const resetarJogo = () => {
    setStudentName('');
    setCurrentPhase('inicio');
    setCurrentLevel(0);
    setRobuxBalance(50);
    setCarrinho([]);
    setScore(0);
    setAttempts(0);
    setCollectedData([]);
    setStartTime(null);
  };

  // Componente de Explicação
  const ExplanationModal = () => {
    if (!showExplanation) return null;

    const currentExplanation = explicacoes.soma[explanationSlide];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md mx-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-purple-600">💡 Explicação</h3>
            <button 
              onClick={() => setShowExplanation(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{currentExplanation.imagem}</div>
            <h4 className="text-lg font-bold text-blue-600 mb-2">{currentExplanation.texto}</h4>
            <p className="text-gray-700">{currentExplanation.explicacao}</p>
          </div>

          <div className="flex justify-center items-center space-x-4 mb-4">
            <button 
              onClick={() => setExplanationSlide(Math.max(0, explanationSlide - 1))}
              disabled={explanationSlide === 0}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              ← Anterior
            </button>
            
            <div className="flex space-x-2">
              {explicacoes.soma.map((_, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === explanationSlide ? 'bg-purple-500' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            
            <button 
              onClick={() => setExplanationSlide(Math.min(explicacoes.soma.length - 1, explanationSlide + 1))}
              disabled={explanationSlide === explicacoes.soma.length - 1}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Próximo →
            </button>
          </div>

          <button 
            onClick={() => setShowExplanation(false)}
            className="w-full py-3 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600"
          >
            Entendi! 🎯
          </button>
        </div>
      </div>
    );
  };

  // Tela de Início
  if (currentPhase === 'inicio') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-3xl font-bold text-purple-600 mb-2">Loja do Roblox</h1>
          <h2 className="text-xl text-blue-600 mb-6">Aprenda Soma Comprando!</h2>
          
          <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              🎯 <strong>Missão:</strong> Use seus Robux com sabedoria! Calcule quanto gastará antes de comprar.
            </p>
          </div>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full p-4 border-2 border-purple-300 rounded-lg text-lg mb-6 text-center font-bold"
          />
          
          <button
            onClick={iniciarJogo}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl rounded-lg hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🚀 Começar Aventura!
          </button>
        </div>
      </div>
    );
  }

  // Tela do Jogo
  if (currentPhase === 'jogo') {
    const nivel = niveis[currentLevel];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
        <ExplanationModal />
        
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-purple-600">👋 {studentName}</h2>
              <p className="text-sm text-gray-600">Nível {currentLevel + 1}: {nivel.titulo}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">💰 {robuxBalance} Robux</div>
              <div className="text-sm text-gray-600">💸 Gastou: {totalGasto} Robux</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-sm font-bold text-blue-800">🎯 {nivel.objetivo}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Loja */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">🛍️ Loja Roblox</h3>
            <div className="grid grid-cols-2 gap-4">
              {nivel.itens.map((item) => (
                <div key={item.id} className="border-2 border-purple-200 rounded-lg p-4 text-center hover:border-purple-400 transition-all">
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <h4 className="font-bold text-gray-800 text-sm mb-2">{item.nome}</h4>
                  <div className="text-lg font-bold text-green-600 mb-3">{item.preco} Robux</div>
                  <button
                    onClick={() => adicionarAoCarrinho(item)}
                    disabled={carrinho.length >= nivel.metaItens}
                    className="w-full py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Adicionar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Carrinho */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">🛒 Seu Carrinho</h3>
            
            {carrinho.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">🛒</div>
                <p>Seu carrinho está vazio!</p>
                <p className="text-sm">Adicione {nivel.metaItens} itens</p>
              </div>
            ) : (
              <div className="space-y-3">
                {carrinho.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="font-bold">{item.nome}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-bold">{item.preco} R</span>
                      <button
                        onClick={() => removerDoCarrinho(index)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="border-t-2 border-gray-300 pt-3">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">{totalGasto} Robux</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Sobra: {robuxBalance - totalGasto} Robux
                  </div>
                </div>
              </div>
            )}

            {carrinho.length > 0 && carrinho.length < nivel.metaItens && (
              <div className="mt-4 p-3 bg-yellow-100 rounded-lg text-center">
                <p className="text-sm text-yellow-800">
                  Adicione mais {nivel.metaItens - carrinho.length} item(s)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Botão de Ajuda */}
        {(attempts > 0 || Date.now() - startTime > 30000) && (
          <button
            onClick={() => setShowExplanation(true)}
            className="fixed bottom-6 right-6 bg-orange-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 animate-pulse"
          >
            🤔 Tô perdido!
          </button>
        )}

        {/* Celebração */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Parabéns!</h3>
              <p className="text-lg">Você calculou certinho! Bate palma 3 vezes! 👏</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Tela de Resultado
  if (currentPhase === 'resultado') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Missão Completa!</h1>
          <h2 className="text-xl text-blue-600 mb-6">{studentName}, você é um expert em soma!</h2>
          
          <div className="bg-green-100 border-2 border-green-300 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-gray-600">Níveis Completos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{collectedData.length}</div>
                <div className="text-gray-600">Tentativas</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={exportarCSV}
              className="w-full py-3 bg-green-500 text-white font-bold text-lg rounded-lg hover:bg-green-600 transition-all"
            >
              📊 Baixar Relatório
            </button>
            
            <button
              onClick={resetarJogo}
              className="w-full py-3 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 transition-all"
            >
              🔄 Jogar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default LojaRoblox;