import React, { useState, useEffect } from 'react';
import { Download, Home, RotateCcw } from 'lucide-react';

const MinecraftConstructor = () => {
  const [currentBlock, setCurrentBlock] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [performance, setPerformance] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [grid, setGrid] = useState([]);
  const [availableBlocks, setAvailableBlocks] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [budget, setBudget] = useState(null);
  const [targetStructure, setTargetStructure] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Configurações dos blocos por faixa etária
  const blockConfigs = {
    1: {
      name: "Explorador (6-7 anos)",
      gridSize: { rows: 2, cols: 2 },
      blockTypes: [
        { name: "Madeira", color: "#8B4513", value: 1 },
        { name: "Pedra", color: "#808080", value: 2 },
        { name: "Terra", color: "#654321", value: 3 }
      ],
      questions: [
        { structure: "Casa Pequena", target: 4, budget: null },
        { structure: "Torre Simples", target: 6, budget: null },
        { structure: "Ponte Básica", target: 5, budget: null },
        { structure: "Muro Baixo", target: 7, budget: null },
        { structure: "Fundação", target: 8, budget: null }
      ]
    },
    2: {
      name: "Construtor (8-9 anos)",
      gridSize: { rows: 3, cols: 3 },
      blockTypes: [
        { name: "Madeira", color: "#8B4513", value: 2 },
        { name: "Pedra", color: "#808080", value: 3 },
        { name: "Ferro", color: "#C0C0C0", value: 4 },
        { name: "Ouro", color: "#FFD700", value: 5 }
      ],
      questions: [
        { structure: "Casa Média", target: 12, budget: 25 },
        { structure: "Torre com Base", target: 15, budget: 30 },
        { structure: "Ponte Reforçada", target: 18, budget: 35 },
        { structure: "Castelo Pequeno", target: 20, budget: 40 },
        { structure: "Fortaleza Inicial", target: 22, budget: 45 }
      ]
    },
    3: {
      name: "Arquiteto (10-11 anos)",
      gridSize: { rows: 3, cols: 4 },
      blockTypes: [
        { name: "Madeira", color: "#8B4513", value: 3, property: "Leve" },
        { name: "Pedra", color: "#808080", value: 5, property: "Resistente" },
        { name: "Ferro", color: "#C0C0C0", value: 7, property: "Durável" },
        { name: "Diamante", color: "#00FFFF", value: 10, property: "Raro" },
        { name: "Obsidiana", color: "#1a0033", value: 8, property: "Especial" }
      ],
      questions: [
        { structure: "Mansão", target: 35, budget: 60, special: "Use pelo menos 2 tipos diferentes" },
        { structure: "Castelo Grande", target: 42, budget: 70, special: "Base deve ser de Pedra ou Ferro" },
        { structure: "Torre Mágica", target: 50, budget: 80, special: "Deve conter pelo menos 1 Diamante" },
        { structure: "Fortaleza Suprema", target: 45, budget: 75, special: "Máximo 3 de cada tipo" },
        { structure: "Palácio Real", target: 55, budget: 90, special: "Use todos os tipos de bloco" }
      ]
    }
  };

  const initializeGrid = (rows, cols) => {
    return Array(rows).fill().map(() => Array(cols).fill(null));
  };

  const calculateSum = (gridToCalculate) => {
    let sum = 0;
    gridToCalculate.forEach(row => {
      row.forEach(cell => {
        if (cell) sum += cell.value;
      });
    });
    return sum;
  };

  const startQuestion = () => {
    const config = blockConfigs[currentBlock];
    const question = config.questions[currentQuestion];
    const { rows, cols } = config.gridSize;
    
    const newGrid = initializeGrid(rows, cols);
    setGrid(newGrid);
    setAvailableBlocks(config.blockTypes);
    setCurrentSum(0);
    setBudget(question.budget);
    setTargetStructure(question.structure);
    setIsComplete(false);
    setFeedback('');
    setStartTime(Date.now());
  };

  useEffect(() => {
    if (currentBlock && currentQuestion >= 0) {
      startQuestion();
    }
  }, [currentBlock, currentQuestion]);

  // Effect para verificar completion quando grid muda
  useEffect(() => {
    if (!currentBlock || !grid.length) return;

    const config = blockConfigs[currentBlock];
    const question = config.questions[currentQuestion];
    const sum = calculateSum(grid);
    
    setCurrentSum(sum);
    
    let success = sum === question.target;
    let newFeedback = "";
    
    if (budget && sum > budget) {
      success = false;
      newFeedback = `Orçamento estourado! Limite: ${budget}, Usado: ${sum}`;
    } else if (sum !== question.target) {
      if (sum > 0) { // Só mostra feedback se houver blocos
        newFeedback = `Soma atual: ${sum} | Necessário: ${question.target}`;
      }
      success = false;
    } else if (question.special) {
      // Verificar regras especiais para bloco 3
      const usedTypes = new Set();
      let specialRuleMet = true;
      
      grid.forEach(row => {
        row.forEach(cell => {
          if (cell) usedTypes.add(cell.name);
        });
      });
      
      if (question.special.includes("pelo menos 2 tipos diferentes") && usedTypes.size < 2) {
        specialRuleMet = false;
        newFeedback = "Use pelo menos 2 tipos diferentes de blocos!";
      } else if (question.special.includes("Base deve ser de Pedra ou Ferro")) {
        const bottomRow = grid[grid.length - 1];
        const hasValidBase = bottomRow.some(cell => cell && (cell.name === "Pedra" || cell.name === "Ferro"));
        if (!hasValidBase) {
          specialRuleMet = false;
          newFeedback = "A base deve conter Pedra ou Ferro!";
        }
      } else if (question.special.includes("pelo menos 1 Diamante")) {
        if (!usedTypes.has("Diamante")) {
          specialRuleMet = false;
          newFeedback = "Deve conter pelo menos 1 bloco de Diamante!";
        }
      } else if (question.special.includes("Máximo 3 de cada tipo")) {
        const typeCounts = {};
        grid.forEach(row => {
          row.forEach(cell => {
            if (cell) {
              typeCounts[cell.name] = (typeCounts[cell.name] || 0) + 1;
            }
          });
        });
        const maxCount = Math.max(...Object.values(typeCounts));
        if (maxCount > 3) {
          specialRuleMet = false;
          newFeedback = "Máximo 3 blocos de cada tipo!";
        }
      } else if (question.special.includes("Use todos os tipos de bloco")) {
        if (usedTypes.size < availableBlocks.length) {
          specialRuleMet = false;
          newFeedback = "Use todos os tipos de bloco disponíveis!";
        }
      }
      
      success = success && specialRuleMet;
    }
    
    if (success && sum > 0) {
      newFeedback = "Parabéns! Estrutura construída com sucesso!";
      
      if (!isComplete) { // Evita registrar múltiplas vezes
        setIsComplete(true);
        
        // Registrar performance
        const endTime = Date.now();
        const timeSpent = Math.round((endTime - startTime) / 1000);
        
        setPerformance(prev => [...prev, {
          block: currentBlock,
          question: currentQuestion + 1,
          structure: question.structure,
          success: true,
          timeSpent,
          finalSum: sum,
          targetSum: question.target,
          budget: budget || 'N/A',
          timestamp: new Date().toISOString()
        }]);
      }
    } else {
      setIsComplete(false);
    }
    
    setFeedback(newFeedback);
  }, [grid, currentBlock, currentQuestion, budget, availableBlocks.length, isComplete, startTime]);

  const handleDrop = (rowIndex, colIndex, blockType) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = blockType;
    setGrid(newGrid);
  };

  const handleRemove = (rowIndex, colIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = null;
    setGrid(newGrid);
  };

  const nextQuestion = () => {
    const config = blockConfigs[currentBlock];
    if (currentQuestion < config.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert("Bloco concluído! Selecione outro bloco ou finalize a sessão.");
      setCurrentBlock(null);
    }
  };

  const resetQuestion = () => {
    startQuestion();
  };

  const goHome = () => {
    setCurrentBlock(null);
    setCurrentQuestion(0);
  };

  const downloadCSV = () => {
    if (performance.length === 0) {
      alert("Nenhum dado de performance para baixar!");
      return;
    }
    
    const headers = ['Bloco', 'Questão', 'Estrutura', 'Sucesso', 'Tempo (s)', 'Soma Final', 'Soma Target', 'Orçamento', 'Timestamp'];
    const csvContent = [
      headers.join(','),
      ...performance.map(p => [
        p.block,
        p.question,
        p.structure,
        p.success,
        p.timeSpent,
        p.finalSum,
        p.targetSum,
        p.budget,
        p.timestamp
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minecraft_constructor_performance_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!currentBlock) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            🏗️ Construtor Minecraft - Soma e Agrupamento
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(blockConfigs).map(([key, config]) => (
              <div 
                key={key}
                className="bg-white rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setCurrentBlock(parseInt(key))}
              >
                <h3 className="text-xl font-bold mb-2">{config.name}</h3>
                <p className="text-gray-600 mb-4">
                  Grid: {config.gridSize.rows}x{config.gridSize.cols}
                </p>
                <p className="text-sm text-gray-500">
                  {config.questions.length} questões
                </p>
              </div>
            ))}
          </div>
          
          {performance.length > 0 && (
            <div className="text-center">
              <button
                onClick={downloadCSV}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
              >
                <Download size={20} />
                Baixar Relatório de Performance
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const config = blockConfigs[currentBlock];
  const question = config.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{config.name}</h2>
            <p className="text-gray-600">Questão {currentQuestion + 1}/5 - {question.structure}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={goHome} className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded">
              <Home size={20} />
            </button>
            <button onClick={resetQuestion} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Layout Principal: 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna Esquerda: Objetivo */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4">🎯 Objetivo</h3>
                <p className="mb-4 text-lg">🏗️ Construa: <span className="font-bold text-blue-600">{question.structure}</span></p>
                <p className="mb-4 text-lg">➕ Soma necessária: <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold text-xl">{question.target}</span></p>
                {budget && <p className="mb-4 text-lg">💰 Orçamento máximo: <span className="bg-yellow-500 text-white px-3 py-1 rounded-full font-bold text-xl">{budget}</span></p>}
                {question.special && (
                  <div className="mb-4 p-3 bg-purple-100 rounded-lg border-l-4 border-purple-500">
                    <p className="text-purple-700">
                      <strong>⭐ Regra especial:</strong> {question.special}
                    </p>
                  </div>
                )}
                
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-lg">📊 Soma atual: <span className={`font-bold text-2xl px-3 py-1 rounded-full ${currentSum > (budget || Infinity) ? 'bg-red-500 text-white' : currentSum === question.target ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                    {currentSum}
                  </span></p>
                </div>

                {feedback && (
                  <div className={`p-4 rounded-lg border-l-4 ${isComplete ? 'bg-green-100 text-green-800 border-green-500' : 'bg-blue-100 text-blue-800 border-blue-500'}`}>
                    <p className="font-medium">{isComplete ? '🎉' : '💡'} {feedback}</p>
                  </div>
                )}

                {isComplete && (
                  <button
                    onClick={nextQuestion}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg mt-4 font-bold text-lg"
                  >
                    🚀 Próxima Questão
                  </button>
                )}
              </div>
              
              {/* Placeholder para imagem */}
              <div className="w-full h-32 bg-gray-200 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🖼️</div>
                  <div className="text-xs">Imagem da Estrutura</div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Área de Construção + Blocos lado a lado */}
          <div className="grid grid-cols-2 gap-6">
            {/* Área de Construção */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🏗️ Área de Construção</h3>
              <div className="grid gap-2 mx-auto w-fit" style={{
                gridTemplateColumns: `repeat(${config.gridSize.cols}, 1fr)`
              }}>
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                      style={{
                        backgroundColor: cell ? cell.color : 'white'
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const blockType = JSON.parse(e.dataTransfer.getData('blockType'));
                        handleDrop(rowIndex, colIndex, blockType);
                      }}
                      onClick={() => cell && handleRemove(rowIndex, colIndex)}
                    >
                      {cell && (
                        <div className="text-center font-bold">
                          <div className="bg-white bg-opacity-90 text-black px-1 py-0.5 rounded text-sm border border-gray-300">
                            {cell.value}
                          </div>
                          {cell.property && (
                            <div className="bg-white bg-opacity-90 text-black px-1 py-0.5 rounded text-[8px] mt-0.5 border border-gray-300">
                              {cell.property}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              <p className="text-center text-gray-600 mt-2 text-xs">
                🖱️ <strong>Clique</strong> para remover
              </p>
            </div>

            {/* Blocos Disponíveis */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🧱 Blocos Disponíveis</h3>
              <div className="space-y-2">
                {availableBlocks.map((block, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg cursor-move hover:opacity-80 border-2 border-gray-300 hover:border-gray-400 transition-all"
                    style={{ backgroundColor: block.color }}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('blockType', JSON.stringify(block));
                    }}
                  >
                    <div className="font-bold">
                      <div className="text-white text-sm mb-1" style={{ 
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)'
                      }}>
                        🪨 {block.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm" style={{ 
                          textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)'
                        }}>
                          Valor:
                        </span>
                        <span className="bg-white text-black px-2 py-0.5 rounded-full font-bold text-sm border-2 border-gray-400">
                          {block.value}
                        </span>
                      </div>
                      {block.property && (
                        <div className="mt-1 text-white text-xs" style={{ 
                          textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)'
                        }}>
                          ✨ {block.property}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700">
                  💡 <strong>Arraste</strong> para construir! 🖱️➡️
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinecraftConstructor;