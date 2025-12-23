import { motion } from 'motion/react';
import devtyperBg from '../../assets/images/devtyper_bg.png';

// Apple-style easing
const appleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function TypingSection() {
    return (
        <section className="relative py-32 bg-background overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: appleEase }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Typing Game</span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 mt-2 tracking-tighter">
                        개발자 타자연습
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        언어별 연습공간, 커스텀 설정, 순위 제공까지<br />
                        재미를 더한 타자 연습 프로그램.
                    </p>
                </motion.div>

                {/* DevTyper Screenshot as Background */}
                <motion.a
                    href="https://802.dokyungja.us/typing-game"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8, ease: appleEase }}
                    className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer group"
                >
                    <img
                        src={devtyperBg}
                        alt="DevTyper - 개발자 타자연습"
                        className="w-full h-auto group-hover:brightness-110 transition-all duration-500"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold px-8 py-4 bg-primary/90 rounded-full">
                            연습 시작하기 →
                        </span>
                    </div>
                </motion.a>

            </div>
        </section>
    );
}
