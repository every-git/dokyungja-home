import React from 'react';
import { motion } from 'motion/react';

interface StickyStackingSectionProps {
    children: React.ReactNode;
    zIndex: number;
    className?: string;
}

/**
 * Sticky Stacking Section with Slide-Up Animation
 * 
 * Creates the "bottom-to-top sticky stacking" scroll effect:
 * - Each section sticks to viewport top
 * - Next section slides up and covers the previous one
 * - Spring animation creates natural snapping feel
 */
export function StickyStackingSection({
    children,
    zIndex,
    className = '',
}: StickyStackingSectionProps) {
    return (
        <motion.div
            className={`sticky top-0 overflow-hidden ${className}`}
            style={{ zIndex }}
            initial={{ y: 100, opacity: 0.8 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5,
            }}
        >
            {children}
        </motion.div>
    );
}

