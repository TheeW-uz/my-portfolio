'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Play, Trophy } from 'lucide-react';

export default function ReflexGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bugPos, setBugPos] = useState({ top: '50%', left: '50%' });
  const [nickname, setNickname] = useState('Abubakr'); // Default or user input

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState('playing');
    moveBug();
  };

  const moveBug = useCallback(() => {
    const top = Math.floor(Math.random() * 80) + 10 + '%';
    const left = Math.floor(Math.random() * 80) + 10 + '%';
    setBugPos({ top, left });
  }, []);

  const handleBugClick = () => {
    if (gameState !== 'playing') return;
    setScore(prev => prev + 1);
    moveBug();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('ended');
      saveScore();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const saveScore = () => {
    // Score display only — no backend
  };

  return (
    <section id="game" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto glass p-10 rounded-[3rem] border border-white/10 relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center">
          
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Bug size={40} className="text-primary" />
                </div>
                <h2 className="text-4xl font-black italic">Bug Smasher</h2>
                <p className="text-gray-400">Can you catch the bugs before time runs out? <br /> Test your developer reflexes.</p>
                
                <div className="flex flex-col gap-4 max-w-xs mx-auto">
                  <input 
                    type="text" 
                    placeholder="Enter Nickname" 
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-primary text-center"
                  />
                  <button 
                    onClick={startGame}
                    className="px-10 py-4 bg-primary text-white font-black rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3 mx-auto w-full"
                  >
                    <Play size={20} fill="currentColor" /> START MISSION
                  </button>
                </div>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full absolute inset-0 cursor-crosshair"
              >
                <div className="absolute top-8 left-8 text-2xl font-black">SCORE: {score}</div>
                <div className="absolute top-8 right-8 text-2xl font-black text-secondary">TIME: {timeLeft}s</div>
                
                <motion.button
                  style={{ top: bugPos.top, left: bugPos.left }}
                  className="absolute p-4 bg-red-500 rounded-xl text-white shadow-lg shadow-red-500/40"
                  onClick={handleBugClick}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <Bug size={32} />
                </motion.button>
              </motion.div>
            )}

            {gameState === 'ended' && (
              <motion.div
                key="ended"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy size={48} className="text-yellow-500" />
                </div>
                <h2 className="text-5xl font-black italic">Mission Over!</h2>
                <div className="text-3xl font-bold text-gradient">Final Score: {score}</div>
                <p className="text-gray-400">You eliminated {score} bugs. Not bad, dev.</p>
                <div className="flex gap-4 justify-center">
                   <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold"
                  >
                    RETRY
                  </button>
                  <button className="px-8 py-3 bg-primary rounded-xl font-bold">SHARE SCORE</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background Glows */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
