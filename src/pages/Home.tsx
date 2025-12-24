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
import { StickyStackingSection } from '../components/common/StickyStackingSection';
import asset11 from '../assets/images/dokyungja_11.webp'; // Wait, asset11 is used in floating char. Keeping it.

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

            {/* All sections after Hero use sticky stacking with unified background */}

            {/* Section 0: IntroText */}
            <StickyStackingSection zIndex={1} className="bg-[var(--sticky-section)]">
                <IntroText />
            </StickyStackingSection>

            {/* Section 1: Community - keeps dark background (component has own bg-black) */}
            <StickyStackingSection zIndex={2}>
                <div className="relative h-40 md:h-64 bg-black">
                    <FloatingDevice type="mac" position="left" offsetY={0} />
                </div>
                <Community />
            </StickyStackingSection>

            {/* Section 2: Typing with Keyboard spacer */}
            <StickyStackingSection zIndex={3} className="bg-[var(--sticky-section)]">
                <div className="relative h-40 md:h-64">
                    <FloatingDevice type="keyboard" position="right" offsetY={-120} />
                </div>
                <TypingSection />
            </StickyStackingSection>

            {/* Section 3: News with Bell spacer */}
            <StickyStackingSection zIndex={4} className="bg-[var(--sticky-section)]">
                <div className="relative h-40 md:h-64">
                    <FloatingDevice type="newsbell" position="left" offsetY={0} />
                </div>
                <NewsSection />
            </StickyStackingSection>

            {/* Section 4: Trend with Robot spacer */}
            <StickyStackingSection zIndex={5} className="bg-[var(--sticky-section)]">
                <div className="relative h-40 md:h-64">
                    <FloatingDevice type="newsrobot" position="right" offsetY={0} />
                </div>
                <TrendSection />
            </StickyStackingSection>

            {/* Section 5: Engineer Character */}
            <StickyStackingSection zIndex={6} className="bg-[var(--sticky-section)]">
                <div className="flex justify-center py-16 overflow-visible">
                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <motion.img
                            src={asset11}
                            alt="Floating Character"
                            className="w-[300px] md:w-[700px] object-contain drop-shadow-2xl"
                            animate={{ y: [0, -20, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.8
                            }}
                        />
                    </motion.div>
                </div>
            </StickyStackingSection>

            {/* Section 6: Feature Hub */}
            <StickyStackingSection zIndex={7} className="bg-[var(--sticky-section)]">
                <FeatureHub />
            </StickyStackingSection>

            {/* Section 7: Skills Universe */}
            <StickyStackingSection zIndex={8} className="bg-[var(--sticky-section)]">
                <SkillsUniverse />
            </StickyStackingSection>

            {/* Section 8: Journey Map */}
            <StickyStackingSection zIndex={9} className="bg-[var(--sticky-section)]">
                <JourneyMap />
            </StickyStackingSection>

            {/* Section 9: Closing */}
            <StickyStackingSection zIndex={10} className="bg-[var(--sticky-section)]">
                <ClosingSection />
            </StickyStackingSection>
        </Layout>
    );
}
