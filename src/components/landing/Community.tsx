import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import asset02 from '../../assets/images/dokyungja_02.webp';
import asset07 from '../../assets/images/dokyungja_07.webp';
import asset08 from '../../assets/images/dokyungja_08.webp';
import asset10 from '../../assets/images/dokyungja_10.webp';

// Apple-style cubic bezier easing
const appleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function Community() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Cards start upright (0deg) and tilt as you scroll
    const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 8, 15]);
    const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

    // Individual card rotations for more dynamic effect
    const rotateLeft = useTransform(scrollYProgress, [0, 0.5, 1], [0, -5, -12]);
    const rotateRight = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 12]);

    return (
        <section ref={containerRef} className="relative py-32 overflow-hidden bg-black text-white">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/40 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content - Narrative Intro */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: appleEase }}
                        >
                            <span className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-semibold tracking-wider mb-4 text-purple-300">
                                COMMUNITY
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6">
                                Small but <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    Sharp.
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                                우리는 단순히 모여있는 것이 아닙니다.<br />
                                함께 <strong>타자 실력</strong>을 겨루고,<br />
                                <strong>최신 IT/경제 뉴스</strong>를 분석하며,<br />
                                매일 새로운 <strong>트렌드</strong>를 수집합니다.
                            </p>
                        </motion.div>

                        <div className="flex gap-4 pt-4">
                            <span className="text-gray-500 text-sm animate-pulse">
                                스크롤하여 커뮤니티 활동을 확인해보세요 ↓
                            </span>
                        </div>

                        {/* Stats or Social Proof */}
                        <div className="flex items-center gap-8 pt-8 border-t border-white/10">
                            <div>
                                <h4 className="text-3xl font-bold">Private</h4>
                                <p className="text-sm text-gray-500">Group</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold">Shared</h4>
                                <p className="text-sm text-gray-500">Knowledge</p>
                            </div>
                        </div>
                    </div>

                    {/* Visuals - Cards that tilt on scroll */}
                    <div className="relative perspective-[1000px]">
                        <motion.div
                            style={{ y }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {/* Left Column - tilts left */}
                            <motion.div
                                style={{ rotate: rotateLeft }}
                                className="space-y-4 mt-12 origin-bottom"
                            >
                                <Card img={asset07} label="Creator" delay={0} />
                                <Card img={asset02} label="Analyst" delay={0.1} />
                            </motion.div>

                            {/* Right Column - tilts right */}
                            <motion.div
                                style={{ rotate: rotateRight }}
                                className="space-y-4 origin-bottom"
                            >
                                <Card img={asset08} label="Engineer" delay={0.2} />
                                <Card img={asset10} label="Visionary" delay={0.3} />
                            </motion.div>
                        </motion.div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Card({ img, label, delay = 0 }: { img: string, label: string, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.1, 0.25, 1.0] // Apple-style ease
            }}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
            }}
            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm aspect-[3/4] shadow-xl"
        >
            <img
                src={img}
                alt={label}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-white font-medium text-sm">{label}</span>
            </div>
        </motion.div>
    );
}
