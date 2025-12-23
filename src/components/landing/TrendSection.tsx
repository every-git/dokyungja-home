import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import trendCollectorImg from '../../assets/images/trend_collector_new.png';

export function TrendSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Expansion Animation Logic
    // Start smaller and expand to full width
    const width = useTransform(scrollYProgress, [0.2, 0.6], ["60%", "100%"]);
    const borderRadius = useTransform(scrollYProgress, [0.2, 0.6], ["3rem", "0rem"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    // Parallax for text to move nicely with it
    const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="relative py-32 bg-background overflow-hidden min-h-[150vh]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">

                {/* Text Title - Fades out as image expands or just stays relative? 
                   Let's keep it visible at the top initially then image covers or expands below/around it
                   Actually for "center focus -> expand", usually image is central.
                */}
                <motion.div
                    style={{ y: yText, opacity: useTransform(scrollYProgress, [0.5, 0.8], [1, 0]) }}
                    className="absolute top-24 z-10 text-center"
                >
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
                        Trend<br />Collector.
                    </h2>
                    <p className="text-2xl text-muted-foreground font-medium">
                        매일 수집되는 트렌드 키워드.<br />
                        세상의 모든 영감을 한곳에 모읍니다.
                    </p>
                </motion.div>

                {/* Expanding Image Container */}
                <motion.div
                    style={{
                        width: width,
                        height: "60vh", // Fixed height or expanding? Let's keep fixed height logic for now but expanding width
                        borderRadius: borderRadius,
                        opacity: opacity
                    }}
                    className="relative z-0 overflow-hidden shadow-2xl mt-32"
                >
                    <img
                        src={trendCollectorImg}
                        alt="Trend Collector"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay for text readability if needed later */}
                    <div className="absolute inset-0 bg-black/10" />
                </motion.div>

            </div>
        </section>
    );
}
