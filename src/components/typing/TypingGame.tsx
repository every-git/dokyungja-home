import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// JavaScript 코드 스니펫만 사용
const JAVASCRIPT_SNIPPETS = [
    {
        code: `const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};`
    },
    {
        code: `const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};`
    },
    {
        code: `const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = deepClone(obj[key]);
    return acc;
  }, {});
};`
    },
    {
        code: `const pipe = (...fns) => (value) => {
  return fns.reduce((acc, fn) => fn(acc), value);
};`
    },
    {
        code: `const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried.apply(this, args.concat(nextArgs));
  };
};`
    },
    {
        code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`
    },
    {
        code: `const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
};`
    },
    {
        code: `const binarySearch = (arr, target) => {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};`
    },
];

export default function TypingGame() {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
    const [snippetIndex, setSnippetIndex] = useState(0);
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [cpm, setCpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [comboPopup, setComboPopup] = useState<number | null>(null);

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const codeContainerRef = useRef<HTMLDivElement>(null);

    const currentSnippet = JAVASCRIPT_SNIPPETS[snippetIndex];

    // Reset Game
    const startGame = () => {
        const randomIdx = Math.floor(Math.random() * JAVASCRIPT_SNIPPETS.length);
        setSnippetIndex(randomIdx);
        setGameState('playing');
        setInput('');
        setStartTime(Date.now());
        setWpm(0);
        setCpm(0);
        setAccuracy(100);
        setCombo(0);
        setMaxCombo(0);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    // Calculate Stats
    useEffect(() => {
        if (gameState === 'playing' && startTime) {
            const interval = setInterval(() => {
                const timeElapsed = (Date.now() - startTime) / 60000; // in minutes
                const wordsTyped = input.length / 5;
                const currentWpm = Math.round(wordsTyped / timeElapsed) || 0;
                setWpm(currentWpm);

                const currentCpm = Math.round(input.length / timeElapsed) || 0;
                setCpm(currentCpm);
            }, 500);
            return () => clearInterval(interval);
        }
    }, [gameState, startTime, input]);

    // Prevent Paste
    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        alert('붙여넣기는 비활성화되어 있습니다. 직접 타이핑해주세요!');
    };

    // Handle Input
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const targetCode = currentSnippet.code;

        setInput(value);

        // Check Accuracy & Combo
        let correctChars = 0;
        for (let i = 0; i < value.length; i++) {
            if (value[i] === targetCode[i]) {
                correctChars++;
            }
        }

        const currentAccuracy = value.length > 0 ? Math.round((correctChars / value.length) * 100) : 0;
        setAccuracy(currentAccuracy);

        if (value.length > input.length) {
            // User typed a character
            const lastCharIdx = value.length - 1;

            // Auto-indentation Logic
            if (value[lastCharIdx] === '\n') {
                const targetSubstring = targetCode.substring(lastCharIdx + 1);
                const match = targetSubstring.match(/^ +/);
                if (match) {
                    const indentation = match[0];
                    const newValue = value + indentation;
                    setInput(newValue);
                    return;
                }
            }

            if (value[lastCharIdx] === targetCode[lastCharIdx]) {
                setCombo(prev => {
                    const newCombo = prev + 1;
                    if (newCombo > maxCombo) setMaxCombo(newCombo);

                    if (newCombo >= 5) {
                        setComboPopup(newCombo);
                        setTimeout(() => setComboPopup(null), 400);
                    }

                    return newCombo;
                });
            } else {
                setCombo(0);
                setComboPopup(null);
            }
        }

        // Check Completion
        if (value.length >= targetCode.length) {
            if (currentAccuracy < 90) {
                return;
            }

            setGameState('finished');
        }
    };

    // Handle Special Keys (Tab)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const targetCode = currentSnippet.code;
            const currentPos = input.length;

            const closingChars = [')', ']', '}', '"', "'", '`', '>'];

            if (currentPos < targetCode.length) {
                const nextChar = targetCode[currentPos];
                let newInput = input;

                if (closingChars.includes(nextChar)) {
                    newInput = input + nextChar;
                } else {
                    const tabMatch = targetCode.substring(currentPos).match(/^(  |\t)/);
                    if (tabMatch) {
                        newInput = input + tabMatch[0];
                    } else {
                        newInput = input + '  ';
                    }
                }

                setInput(newInput);

                let correctChars = 0;
                for (let i = 0; i < newInput.length; i++) {
                    if (newInput[i] === targetCode[i]) {
                        correctChars++;
                    }
                }
                const currentAccuracy = newInput.length > 0 ? Math.round((correctChars / newInput.length) * 100) : 0;
                setAccuracy(currentAccuracy);

                if (newInput.length >= targetCode.length) {
                    if (currentAccuracy < 90) {
                        return;
                    }
                    setGameState('finished');
                }
            }
        }
    };

    // Render Code with Highlighting
    const renderCode = () => {
        return currentSnippet.code.split('').map((char, index) => {
            let color = 'text-gray-400';
            let bg = 'transparent';
            const isCursor = index === input.length;

            if (index < input.length) {
                if (input[index] === char) {
                    color = 'text-green-400';
                } else {
                    color = 'text-red-500';
                    bg = 'bg-red-500/20';
                }
            } else if (isCursor) {
                bg = 'bg-blue-500/50';
            }

            if (char === '\n') {
                return (
                    <span
                        key={index}
                        ref={isCursor ? cursorRef : null}
                        className={`${color} ${bg} font-mono transition-colors duration-75`}
                    >
                        <span className="opacity-30 select-none">↵</span>
                        {'\n'}
                    </span>
                );
            }

            return (
                <span
                    key={index}
                    ref={isCursor ? cursorRef : null}
                    className={`${color} ${bg} font-mono transition-colors duration-75`}
                >
                    {char}
                </span>
            );
        });
    };

    // Auto scroll to cursor
    useEffect(() => {
        if (cursorRef.current && codeContainerRef.current && gameState === 'playing') {
            const cursor = cursorRef.current;
            const container = codeContainerRef.current;

            const cursorLeft = cursor.offsetLeft;
            const containerWidth = container.clientWidth;
            const scrollLeft = container.scrollLeft;

            if (cursorLeft > scrollLeft + containerWidth - 100) {
                container.scrollLeft = cursorLeft - containerWidth + 150;
            } else if (cursorLeft < scrollLeft + 50) {
                container.scrollLeft = Math.max(0, cursorLeft - 50);
            }

            const cursorTop = cursor.offsetTop;
            const containerHeight = container.clientHeight;
            const scrollTop = container.scrollTop;

            if (cursorTop > scrollTop + containerHeight - 50) {
                container.scrollTop = cursorTop - containerHeight + 100;
            } else if (cursorTop < scrollTop + 20) {
                container.scrollTop = Math.max(0, cursorTop - 20);
            }
        }
    }, [input, gameState]);

    return (
        <div className="w-full max-w-5xl mx-auto p-6 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 text-slate-100 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        DevTyper
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">JavaScript 타자 연습</p>
                </div>

                {gameState !== 'start' && (
                    <div className="flex gap-4 text-sm font-mono">
                        <div className="flex flex-col items-center">
                            <span className="text-slate-500 text-xs">속도 (CPM)</span>
                            <span className="text-xl font-bold text-blue-400">{cpm}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-slate-500 text-xs">정확도</span>
                            <span className={`text-xl font-bold ${accuracy > 95 ? 'text-green-400' : accuracy > 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                                {accuracy}%
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-slate-500 text-xs">콤보</span>
                            <AnimatePresence mode='wait'>
                                <motion.span
                                    key={combo}
                                    initial={{ scale: 1.2, color: '#fff' }}
                                    animate={{ scale: 1, color: combo > 10 ? '#f472b6' : '#94a3b8' }}
                                    className="text-xl font-bold"
                                >
                                    {combo}x
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>

            {/* Game Area */}
            <div className="relative min-h-[300px] bg-slate-950 rounded-lg p-6 border border-slate-800 overflow-x-auto">

                {/* Combo Display */}
                <AnimatePresence>
                    {comboPopup !== null && gameState === 'playing' && (
                        <motion.div
                            key={comboPopup}
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute bottom-4 right-4 z-40 pointer-events-none"
                        >
                            <div className={`px-4 py-2 rounded-lg font-mono font-bold text-lg backdrop-blur-sm border ${
                                comboPopup >= 20 ? 'bg-purple-500/20 border-purple-400/50 text-purple-300' :
                                comboPopup >= 10 ? 'bg-blue-500/20 border-blue-400/50 text-blue-300' :
                                'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                            } shadow-lg`}>
                                <span className="text-sm opacity-70">COMBO</span>
                                <span className="ml-2 text-xl">{comboPopup}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {gameState === 'start' && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startGame}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all"
                        >
                            Start Coding
                        </motion.button>
                        <p className="mt-4 text-slate-400 text-sm">코드를 정확히 타이핑하세요.</p>
                    </div>
                )}

                {gameState === 'finished' && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <h3 className="text-3xl font-bold text-white mb-2">Great Job! 🎉</h3>
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-slate-800 p-4 rounded-lg">
                                    <div className="text-slate-400 text-xs mb-1">속도 (CPM)</div>
                                    <div className="text-2xl font-bold text-blue-400">{cpm}</div>
                                </div>
                                <div className="bg-slate-800 p-4 rounded-lg">
                                    <div className="text-slate-400 text-xs mb-1">정확도</div>
                                    <div className="text-2xl font-bold text-green-400">{accuracy}%</div>
                                </div>
                                <div className="bg-slate-800 p-4 rounded-lg">
                                    <div className="text-slate-400 text-xs mb-1">최대 콤보</div>
                                    <div className="text-2xl font-bold text-purple-400">{maxCombo}</div>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-semibold transition-all"
                            >
                                다시 시작
                            </motion.button>
                        </motion.div>
                    </div>
                )}

                {/* Code Display */}
                <div
                    ref={codeContainerRef}
                    className="font-mono text-lg leading-relaxed whitespace-pre select-none relative z-10 overflow-auto max-h-[400px]"
                    onClick={() => inputRef.current?.focus()}
                >
                    {renderCode()}
                </div>

                {/* Hidden Input */}
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    className="absolute opacity-0 top-0 left-0 w-full h-full cursor-default resize-none z-20"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    disabled={gameState !== 'playing'}
                />
            </div>

            {/* Footer */}
            <div className="mt-4 flex flex-col gap-1 text-xs text-slate-500">
                <div className="flex justify-between">
                    <p>Press <kbd className="bg-slate-800 px-1 rounded border border-slate-700">Tab</kbd> to insert spaces</p>
                    <p>{input.length} / {currentSnippet.code.length} chars</p>
                </div>
            </div>
        </div>
    );
}

