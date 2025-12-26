import { motion } from 'motion/react';
import TypingGame from '../typing/TypingGame';

// Apple-style easing
const appleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function TypingSection() {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: appleEase }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Typing Game</span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 mt-2 tracking-tighter">
                        개발자 타자연습
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        JavaScript 코드를 타이핑하며 연습해보세요.<br />
                        정확도와 속도를 측정합니다.
                    </p>
                </motion.div>

                {/* Typing Game */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: appleEase }}
                    className="w-full"
                >
                    <TypingGame />
                </motion.div>

            </div>
        </section>
    );
}
