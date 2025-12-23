import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'motion/react';

import asset_01 from '../../assets/images/dokyungja_06.png'; // Main Character

export function Hero() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Mobile vs Desktop logic is handled via CSS classes usually, but for complex animations
    // we often rely on resize listeners or just make it responsive via media queries in JS if needed.
    // Ideally, for simplicity and performance, we use CSS variables or simple transforms.

    // Transform: Start square-ish (focused) -> Expand Width
    // On mobile, we might keep it static or simplified. 
    // This animation targets MD screens and up.

    // Scale starts at 1, stays 1? No, user wants width expansion.
    // "Square person focused" means initially it might be width: 400px, height: 400px, object-fit: cover.
    // Scroll -> width: 100vw, height: 100vh? Or just wider?
    // "Fills the screen horizontally" implies width -> 100%.

    const width = useTransform(scrollYProgress, [0, 0.5], ["30%", "100%"]);
    const height = useTransform(scrollYProgress, [0, 0.5], ["500px", "800px"]); // Optional height growth
    const borderRadius = useTransform(scrollYProgress, [0, 0.3], ["2rem", "0rem"]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]); // Parallax down slow

    // Mouse Interaction
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section ref={sectionRef} className="relative min-h-[150vh] flex flex-col items-center pt-24 overflow-x-hidden">

            {/* Sticky Text Container - Fades out as we scroll */}
            <div className="fixed top-32 left-0 w-full z-10 pointer-events-none mix-blend-difference text-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                        className="text-left"
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.05]">
                            Hello,<br />
                            I'm <span className="text-blue-500">Dokyungja.</span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-2xl md:text-3xl font-bold text-white/80 mb-4"
                        >
                            AI-Native Developer
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-lg md:text-xl text-white/60 font-medium"
                        >
                            "Life is short, use AI"
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            {/* Expanding Image Container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{
                        width: width, // Animated width (desktop)
                        height: "100%",
                        borderRadius: borderRadius,
                    }}
                    className="relative z-20 overflow-hidden shadow-2xl min-w-[70vw] md:min-w-0 h-[500px] md:h-auto mx-auto bg-black"
                >
                    <motion.img
                        src={asset_01}
                        alt="Dokyungja Visionary"
                        className="w-full h-full object-cover object-center"
                        style={{ scale: 1.1 }} // Slight zoom to allow parallax inside if wanted
                    />

                    {/* Overlay Gradient that fades in */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </motion.div>
            </div>

        </section>
    );
}
