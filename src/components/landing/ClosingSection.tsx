import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import asset12 from '../../assets/images/dokyungja.12.mp4';

export function ClosingSection() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-20">

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 flex justify-center md:justify-end"
                    >
                        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" />
                            <video
                                src={asset12}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2 max-w-2xl text-center md:text-left space-y-6 md:space-y-8 px-6 md:px-8"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight break-words">
                            Gravity is just{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">a suggestion.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            지금까지 도경자의 여정을 함께해주셔서 감사합니다.<br />
                            우리는 계속해서 상식의 중력을 거스르고,<br />
                            새로운 기술의 우주를 유영할 것입니다.<br />
                            <br />
                            더 궁금한 이야기나 제안이 있으신가요?
                        </p>

                        <div className="flex justify-center md:justify-start pt-4">
                            <a
                                href="mailto:contact@dokyungja.us"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-xl hover:shadow-primary/25 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Mail className="w-5 h-5" />
                                    Contact Me
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Update Anticipation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="mt-24 text-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <span className="text-sm font-medium text-primary">
                            계속 업데이트 됩니다. Stay tuned for more.
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
