import { Link } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';
import { motion, useScroll, useSpring } from 'motion/react';
import { useState } from 'react';
import { BuyCoffeeModal } from '../common/BuyCoffeeModal';

export function Header() {
    const [isCoffeeOpen, setIsCoffeeOpen] = useState(false);

    // Scroll progress tracking
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="fixed top-0 left-0 right-0 z-50 bg-[var(--sticky-section)]/90 backdrop-blur-md border-b border-border"
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Logo / Brand Name */}
                        <Link to="/" className="text-xl font-bold font-sans hover:text-primary/80 transition-colors">
                            도경자
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsCoffeeOpen(true)}
                            className="hidden sm:block px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                        >
                            커피 한잔
                        </button>
                    </div>
                </div>

                {/* Scroll Progress Bar */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-400 dark:bg-gray-600 origin-left"
                    style={{ scaleX }}
                />
            </motion.header>

            <BuyCoffeeModal isOpen={isCoffeeOpen} onClose={() => setIsCoffeeOpen(false)} />
        </>
    );
}
