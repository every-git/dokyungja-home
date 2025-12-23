import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

// Apple-style cubic bezier easing
const appleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

// Toss-style text reveal animation component
function AnimatedWord({
    children,
    delay = 0,
    highlight = false,
    large = false
}: {
    children: string;
    delay?: number;
    highlight?: boolean;
    large?: boolean;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.span
            ref={ref}
            className={`
                inline-block font-bold tracking-tight
                ${large
                    ? 'text-5xl md:text-7xl lg:text-8xl'
                    : 'text-2xl md:text-4xl lg:text-5xl'
                }
                ${highlight
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                    : 'text-foreground/80'
                }
            `}
            initial={{
                opacity: 0,
                y: 40,
                filter: "blur(10px)"
            }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
            } : {}}
            transition={{
                duration: 0.8,
                delay,
                ease: appleEase
            }}
        >
            {children}
        </motion.span>
    );
}

// Character-by-character animation for dramatic effect
function AnimatedTitle({ text, delay = 0 }: { text: string; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const characters = text.split('');

    return (
        <motion.div ref={ref} className="overflow-hidden">
            <motion.div
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            >
                {characters.map((char, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        initial={{
                            opacity: 0,
                            y: 80,
                            rotateX: -90
                        }}
                        animate={isInView ? {
                            opacity: 1,
                            y: 0,
                            rotateX: 0
                        } : {}}
                        transition={{
                            duration: 0.6,
                            delay: delay + i * 0.03,
                            ease: appleEase
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.div>
        </motion.div>
    );
}

export function IntroText() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

    return (
        <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden">
            {/* No visible background - seamless with Hero */}

            <motion.div
                style={{ opacity, scale }}
                className="max-w-5xl mx-auto px-6 text-center"
            >
                <div className="space-y-6 md:space-y-8">
                    {/* Line 1 */}
                    <AnimatedWord delay={0}>
                        기존 개발 프로세스에 AI를 접목하여
                    </AnimatedWord>

                    {/* Line 2 - Highlighted */}
                    <div className="pt-4">
                        <AnimatedWord delay={0.3} highlight>
                            10배의 생산성을 만드는
                        </AnimatedWord>
                    </div>

                    {/* Line 3 - Large Title with character animation - Split into two lines */}
                    <div className="pt-6 space-y-2">
                        <AnimatedTitle text="AI-Native" delay={0.6} />
                        <AnimatedTitle text="Developer" delay={0.9} />
                    </div>
                </div>

                {/* Decorative Line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.4, duration: 1.2, ease: appleEase }}
                    className="mt-16 md:mt-20 h-[2px] w-32 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                />
            </motion.div>
        </section>
    );
}
