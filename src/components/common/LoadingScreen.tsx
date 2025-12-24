import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TARGET_TEXT = 'Dokyungja';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>';

interface LoadingScreenProps {
    onComplete: () => void;
    minDuration?: number; // Minimum display time in ms
}

export function LoadingScreen({ onComplete, minDuration = 2000 }: LoadingScreenProps) {
    const [displayText, setDisplayText] = useState(
        Array(TARGET_TEXT.length).fill('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
    );
    const [isExiting, setIsExiting] = useState(false);
    const [revealedCount, setRevealedCount] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        let frameCount = 0;
        let currentRevealed = 0;

        const scrambleInterval = setInterval(() => {
            frameCount++;

            // Every 8 frames, reveal next character
            if (frameCount % 8 === 0 && currentRevealed < TARGET_TEXT.length) {
                currentRevealed++;
                setRevealedCount(currentRevealed);
            }

            // Generate new scrambled text
            const newText = TARGET_TEXT.split('').map((char, i) => {
                if (i < currentRevealed) {
                    return char; // Already revealed
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join('');

            setDisplayText(newText);

            // Check if complete
            if (currentRevealed >= TARGET_TEXT.length) {
                clearInterval(scrambleInterval);

                // Ensure minimum duration
                const elapsed = Date.now() - startTime;
                const remainingTime = Math.max(0, minDuration - elapsed);

                setTimeout(() => {
                    setIsExiting(true);
                    setTimeout(onComplete, 500); // Wait for exit animation
                }, remainingTime + 500); // Extra 500ms to appreciate the final text
            }
        }, 50); // 20fps scramble

        return () => clearInterval(scrambleInterval);
    }, [onComplete, minDuration]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--sticky-section)]"
                >
                    <div className="text-center">
                        {/* Scrambling Text */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter"
                        >
                            {displayText.split('').map((char, i) => (
                                <span
                                    key={i}
                                    className={`inline-block transition-colors duration-200 ${i < revealedCount
                                            ? 'text-blue-500'
                                            : 'text-foreground/30'
                                        }`}
                                    style={{
                                        fontFamily: 'monospace',
                                        width: '0.6em',
                                        display: 'inline-block',
                                        textAlign: 'center',
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: revealedCount === TARGET_TEXT.length ? 1 : 0.3 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 text-lg text-muted-foreground"
                        >
                            AI-Native Developer
                        </motion.p>

                        {/* Loading indicator */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: revealedCount / TARGET_TEXT.length }}
                            className="mt-8 h-[2px] w-48 mx-auto bg-blue-500 origin-left"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
