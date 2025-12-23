
import { ReactNode } from 'react';

// Simplified CSS-only representations of Apple devices
// In production, you'd use high-res images or SVGs.

export const MacBookFrame = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
    <div className={`relative mx-auto ${className}`}>
        {/* Lid */}
        <div className="relative bg-[#0d1b2a] rounded-t-2xl border-4 border-gray-700/50 p-1 md:p-2 w-[300px] md:w-[600px] aspect-[16/10] mx-auto shadow-2xl overflow-hidden">
            {/* Screen Content */}
            <div className="bg-background w-full h-full rounded overflow-hidden relative">
                {children}
            </div>
            {/* Webcam */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-b-xl z-20" />
        </div>
        {/* Base */}
        <div className="bg-[#e2e2e4] dark:bg-[#2c2c35] w-[340px] md:w-[680px] h-3 md:h-4 mx-auto rounded-b-2xl shadow-xl relative z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-40 h-2 bg-[#bdbdbf] dark:bg-[#1a1a1f] rounded-b-md" />
        </div>
    </div>
);

export const IPhoneFrame = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
    <div className={`relative mx-auto ${className} w-[280px] md:w-[320px] aspect-[9/19.5]`}>
        <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-xl border-[6px] border-gray-800 overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20" />
            {/* Content */}
            <div className="w-full h-full bg-background pt-8 overflow-hidden">
                {children}
            </div>
        </div>
    </div>
);

export const IPadFrame = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
    <div className={`relative mx-auto ${className} w-[300px] md:w-[500px] aspect-[4/3]`}>
        <div className="absolute inset-0 bg-gray-900 rounded-[1.5rem] shadow-xl border-[6px] border-gray-800 overflow-hidden">
            {/* Content */}
            <div className="w-full h-full bg-background overflow-hidden relative">
                {children}
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
            </div>
        </div>
    </div>
);
