import React, { useState, useRef, useEffect } from 'react';
import { Trophy, Star, Zap, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const words = [
  // Substantivos
  { id: 1, text: 'creeper', category: 'substantivo', theme: 'minecraft' },
  { id: 2, text: 'diamante', category: 'substantivo', theme: 'minecraft' },
  { id: 3, text: 'espada', category: 'substantivo', theme: 'minecraft' },
  { id: 4, text: 'youtuber', category: 'substantivo', theme: 'youtube' },
  { id: 5, text: 'robux', category: 'substantivo', theme: 'roblox' },
  { id: 6, text: 'avatar', category: 'substantivo', theme: 'roblox' },
  
  // Verbos
  { id: 7, text: 'construir', category: 'verbo', theme: 'minecraft' },
  { id: 8, text: 'minerar', category: 'verbo', theme: 'minecraft' },
  { id: 9, text: 'jogar', category: 'verbo', theme: 'roblox' },
  { id: 10, text: 'gravar', category: 'verbo', theme: 'youtube' },
  { id: 11, text: 'explorar', category: 'verbo', theme: 'minecraft' },
  { id: 12, text: 'criar', category: 'verbo', theme: 'roblox' },
  
  // Adjetivos
  { id: 13, text: 'rápido', category: 'adjetivo', theme: 'geral' },
  { id: 14, text: 'forte', category: 'adjetivo', theme: 'geral' },
  { id: 15, text: 'brilhante', category: 'adjetivo', theme: 'minecraft' },
  { id: 16, text: 'divertido', category: 'adjetivo', theme: 'geral' },
  { id: 17, text: 'colorido', category: 'adjetivo', theme: 'roblox' },
  { id: 18, text: 'famoso', category: 'adjetivo', theme: 'youtube' },
];

const categories = [
  { 
    id: 'substantivo', 
    name: 'SUBSTANTIVOS', 
    description: 'Nome de coisas, pessoas ou lugares',
    color: 'from-green-400 to-emerald-500',
    icon: '🎮'
  },
  { 
    id: 'verbo', 
    name: 'VERBOS', 
    description: 'Palavras que indicam ação',
    color: 'from-blue-400 to-cyan-500',
    icon: '⚡'
  },
  { 
    id: 'adjetivo', 
    name: 'ADJETIVOS', 
    description: 'Características e qualidades',
    color: 'from-purple-400 to-pink-500',
    icon: '✨'
  },
];

export default function AtividadeGramatica() {
  const [availableWords, setAvailableWords] = useState([]);
  const [droppedWords, setDroppedWords] = useState({ substantivo: [], verbo: [], adjetivo: [] });
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [level, setLevel] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [draggedItem, setDraggedItem] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    if (gameStarted) {
      loadLevel(level);
    }
  }, [level, gameStarted]);

  const loadLevel = (lvl) => {
    const wordsPerLevel = 6 + (lvl * 2);
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, wordsPerLevel);
    setAvailableWords(shuffled);
    setDroppedWords({ substantivo: [], verbo: [], adjetivo: [] });
  };

  const startGame = () => {
    setGameStarted(true);
    setShowTutorial(false);
    loadLevel(1);
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    const audio = new Audio();
    if (type === 'correct') {
      audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi2Gyv';
    } else if (type === 'wrong') {
      audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi2Gyv';
    }
  };

  const handleDragStart = (e, word) => {
    setDraggedItem(word);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, categoryId) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const isCorrect = draggedItem.category === categoryId;
    
    if (isCorrect) {
      setDroppedWords(prev => ({
        ...prev,
        [categoryId]: [...prev[categoryId], draggedItem]
      }));
      setAvailableWords(prev => prev.filter(w => w.id !== draggedItem.id));
      setScore(prev => prev + 10);
      setFeedback({ type: 'success', message: '🎉 Muito bem!' });
      playSound('correct');
    } else {
      setFeedback({ type: 'error', message: '❌ Ops! Tente outra categoria' });
      playSound('wrong');
    }

    setDraggedItem(null);
    setTimeout(() => setFeedback(null), 2000);

    // Check if level complete
    if (availableWords.length === 1 && isCorrect) {
      setTimeout(() => {
        setFeedback({ type: 'level', message: '🏆 Nível completo! Próximo nível...' });
        setTimeout(() => {
          setLevel(prev => prev + 1);
          setFeedback(null);
        }, 2000);
      }, 500);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setGameStarted(false);
    setShowTutorial(true);
  };

  if (showTutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-xl p-8 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Classificador de Palavras
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Arraste as palavras para a categoria correta e mostre que você é um expert em gramática!
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 my-8">
              {categories.map(cat => (
                <div key={cat.id} className="bg-gradient-to-br p-4 rounded-xl text-white shadow-lg ${cat.color}">
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <h3 className="font-bold text-sm">{cat.name}</h3>
                  <p className="text-xs opacity-90 mt-1">{cat.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 text-left">
              <p className="font-bold text-yellow-800 mb-2">💡 Dicas:</p>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• <strong>Substantivos:</strong> nomes (creeper, diamante, youtuber)</li>
                <li>• <strong>Verbos:</strong> ações (jogar, construir, minerar)</li>
                <li>• <strong>Adjetivos:</strong> qualidades (rápido, forte, divertido)</li>
              </ul>
            </div>

            <Button 
              onClick={startGame}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
            >
              Começar o Jogo! 🚀
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 mb-6 shadow-2xl border border-white/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-lg font-bold">
                <Trophy className="w-5 h-5 mr-2" />
                Nível {level}
              </Badge>
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 text-lg font-bold">
                <Star className="w-5 h-5 mr-2" />
                {score} pontos
              </Badge>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="bg-white/20 border-white/30 hover:bg-white/30"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
              <Button
                onClick={resetGame}
                className="bg-white/20 hover:bg-white/30 border border-white/30"
              >
                Reiniciar
              </Button>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`mb-6 p-4 rounded-xl text-center font-bold text-xl animate-bounce ${
            feedback.type === 'success' ? 'bg-green-500 text-white' :
            feedback.type === 'error' ? 'bg-red-500 text-white' :
            'bg-yellow-500 text-white'
          }`}>
            {feedback.message}
          </div>
        )}

        {/* Available Words */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/20">
          <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Arraste as palavras:
          </h2>
          <div className="flex flex-wrap gap-3">
            {availableWords.map(word => (
              <div
                key={word.id}
                draggable
                onDragStart={(e) => handleDragStart(e, word)}
                className="bg-gradient-to-r from-white to-gray-100 px-6 py-3 rounded-xl font-bold text-gray-800 cursor-move hover:scale-110 transition-transform shadow-lg border-2 border-gray-300 hover:border-yellow-400"
              >
                {word.text}
              </div>
            ))}
            {availableWords.length === 0 && (
              <p className="text-white/70 text-center w-full py-4">
                🎉 Todas as palavras foram classificadas!
              </p>
            )}
          </div>
        </div>

        {/* Drop Zones */}
        <div className="grid md:grid-cols-3 gap-4">
          {categories.map(category => (
            <div
              key={category.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category.id)}
              className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 min-h-[300px] transition-all border-4 border-dashed ${
                draggedItem ? 'border-white scale-105 shadow-2xl' : 'border-white/30'
              }`}
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{category.icon}</div>
                <h3 className="text-white font-black text-xl mb-1">{category.name}</h3>
                <p className="text-white/90 text-sm">{category.description}</p>
              </div>
              
              <div className="space-y-2">
                {droppedWords[category.id].map(word => (
                  <div
                    key={word.id}
                    className="bg-white/95 backdrop-blur px-4 py-2 rounded-lg font-bold text-gray-800 text-center shadow-lg transform hover:scale-105 transition-transform"
                  >
                    ✓ {word.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
          <div className="flex justify-between text-white text-sm mb-2">
            <span>Progresso do Nível</span>
            <span>{words.length - availableWords.length} / {words.length}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${((words.length - availableWords.length) / words.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}