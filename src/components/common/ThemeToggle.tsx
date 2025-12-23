import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className={`
                relative flex items-center gap-2 px-1 py-1 rounded-full border-2 transition-colors duration-300
                ${theme === 'dark'
                    ? 'bg-slate-800 border-slate-600'
                    : 'bg-indigo-50 border-indigo-200'}
            `}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Slider Background for Light Mode */}
            <div className={`
                flex items-center gap-2 px-2 text-xs font-bold transition-colors duration-300
                ${theme === 'active' ? 'opacity-0' : 'opacity-100'}
            `}>
                <div className={`flex items-center gap-1 ${theme === 'dark' ? 'opacity-50' : 'text-indigo-600'}`}>
                    <Sun size={14} className="fill-current" />
                    <span>Light</span>
                </div>
                <div className={`flex items-center gap-1 ${theme === 'light' ? 'opacity-50' : 'text-slate-200'}`}>
                    <span>Dark</span>
                    <Moon size={14} className="fill-current" />
                </div>
            </div>

            {/* Moving Switch Knob */}
            <motion.div
                layout
                className={`
                    absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full shadow-sm flex items-center justify-center
                    ${theme === 'light'
                        ? 'left-1 bg-white text-amber-500'
                        : 'right-1 bg-slate-600 text-yellow-300'}
                `}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                {theme === 'light' ? <Sun size={16} fill="currentColor" /> : <Moon size={16} fill="currentColor" />}
            </motion.div>
        </motion.button>
    );
}
