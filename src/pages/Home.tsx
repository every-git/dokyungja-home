import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { motion } from 'motion/react';
import { Hero } from '../components/landing/Hero';
import { IntroText } from '../components/landing/IntroText';
import { SkillsUniverse } from '../components/landing/SkillsUniverse';
import { JourneyMap } from '../components/landing/JourneyMap';
import { FeatureHub } from '../components/landing/FeatureHub';
import { TypingSection } from '../components/landing/TypingSection';
import { NewsSection } from '../components/landing/NewsSection';
import { TrendSection } from '../components/landing/TrendSection';
import { Community } from '../components/landing/Community';
import { FloatingDevice } from '../components/common/FloatingDevice';
import { ClosingSection } from '../components/landing/ClosingSection';
import asset11 from '../assets/images/dokyungja_11.png'; // Wait, asset11 is used in floating char. Keeping it.

export default function Home() {
    const location = useLocation();

    // Restore scroll position instantly on navigation back
    useEffect(() => {
        const savedScrollY = sessionStorage.getItem('journeyScrollY');
        if (savedScrollY) {
            // Instant scroll (no animation)
            window.scrollTo(0, parseInt(savedScrollY, 10));
            sessionStorage.removeItem('journeyScrollY');
        } else if (location.hash) {
            // Fallback for hash navigation
            setTimeout(() => {
                const element = document.getElementById(location.hash.slice(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
            }, 50);
        }
    }, [location]);

    return (
        <Layout>
            <Hero />
            <IntroText />

            {/* Spacer with MacBook (Intro to Community) */}
            <div className="relative h-40 md:h-64">
                <FloatingDevice type="mac" position="left" offsetY={0} />
            </div>

            {/* 1. Community Intro */}
            <Community />

            {/* Spacer with Keyboard for Typing Section */}
            <div className="relative h-40 md:h-64">
                <FloatingDevice type="keyboard" position="right" offsetY={0} />
            </div>

            {/* 2. Features Flow */}
            <TypingSection />

            {/* Spacer with News Bell for NewsSection */}
            <div className="relative h-40 md:h-64">
                <FloatingDevice type="newsbell" position="left" offsetY={0} />
            </div>

            <NewsSection />

            {/* Spacer with News Robot for TrendSection */}
            <div className="relative h-40 md:h-64">
                <FloatingDevice type="newsrobot" position="right" offsetY={0} />
            </div>

            <TrendSection />

            {/* Engineer Character (After Trend Collector) */}
            {/* Animated Character (Floating from bottom) */}
            <div className="flex justify-center py-16 bg-background overflow-hidden">
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <motion.img
                        src={asset11}
                        alt="Floating Character"
                        className="w-[400px] md:w-[700px] object-contain drop-shadow-2xl"
                        animate={{ y: [0, -20, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.8 // Start floating after entrance
                        }}
                    />
                </motion.div>
            </div>

            <FeatureHub />
            <SkillsUniverse />
            <JourneyMap />

            {/* Closing Section with Contact */}
            <ClosingSection />
        </Layout>
    );
}
