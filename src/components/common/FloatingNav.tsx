import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function FloatingNav() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const { scrollY, scrollYProgress } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Show floating nav after scrolling 200px
        setIsVisible(latest > 200);
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Check if near bottom
        setIsAtBottom(latest > 0.9);
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-6 bottom-6 z-50 flex flex-col gap-2"
        >
            {/* Scroll to Top */}
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-[var(--sticky-section)]/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="맨 위로"
            >
                <ChevronUp size={24} />
            </motion.button>

            {/* Scroll to Bottom */}
            <motion.button
                onClick={scrollToBottom}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 rounded-full bg-[var(--sticky-section)]/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors ${isAtBottom ? 'opacity-30' : ''}`}
                aria-label="맨 아래로"
                disabled={isAtBottom}
            >
                <ChevronDown size={24} />
            </motion.button>
        </motion.div>
    );
}
