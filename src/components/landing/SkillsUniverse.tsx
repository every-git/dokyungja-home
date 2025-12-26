
import { motion } from 'motion/react';
import { Braces, Cloud, Database, GitBranch, Layers, Monitor, Server, ShieldCheck, Waves, Lock, Activity, LucideIcon } from 'lucide-react';

// Apple-style easing
const appleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

// Lego-inspired vibrant color palette
const LEGO_COLORS = {
    purple: 'bg-gradient-to-br from-purple-500 to-purple-700',
    orange: 'bg-gradient-to-br from-orange-400 to-orange-600',
    blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
    green: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    red: 'bg-gradient-to-br from-red-400 to-red-600',
    yellow: 'bg-gradient-to-br from-yellow-300 to-yellow-500',
    cyan: 'bg-gradient-to-br from-cyan-300 to-cyan-500',
    pink: 'bg-gradient-to-br from-pink-400 to-pink-600',
    indigo: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    teal: 'bg-gradient-to-br from-teal-400 to-teal-600',
    violet: 'bg-gradient-to-br from-violet-400 to-violet-600',
    slate: 'bg-gradient-to-br from-slate-500 to-slate-700',
};

type LegoBrick = {
    id: string;
    layerLabel: string;
    title: string;
    desc: string;
    icon: LucideIcon;
    color: string;
    // Grid position (1-indexed for CSS grid)
    gridRow: string;
    gridCol: string;
    studsCount: number;
    isLarge?: boolean;
};

// Grid: 6 columns x 4 rows
// Layout designed to NOT overlap, with key components larger
//
// Row 1: [Frontend 2col] [Design System 1col] [UX Motion 1col] [Accessibility 2col]
// Row 2: [Backend 2col] [Integration 2col] [Rate Limit 1col] [Observability 1col]
// Row 3: [Database 2col] [Security 1col] [Cloud 1col] [CI/CD 2col]
//
const LEGO_BRICKS: LegoBrick[] = [
    // === Row 1: UI/Experience ===
    {
        id: 'frontend',
        layerLabel: 'UI / EXPERIENCE',
        title: 'Frontend',
        desc: 'React · TypeScript · Tailwind · Motion',
        icon: Monitor,
        color: LEGO_COLORS.purple,
        gridRow: '1',
        gridCol: '1 / span 2',
        studsCount: 4,
        isLarge: true,
    },
    {
        id: 'design-system',
        layerLabel: 'UI / EXPERIENCE',
        title: 'Design System',
        desc: '규칙 · 컴포넌트',
        icon: Layers,
        color: LEGO_COLORS.orange,
        gridRow: '1',
        gridCol: '3',
        studsCount: 2,
    },
    {
        id: 'ux-motion',
        layerLabel: 'UI / EXPERIENCE',
        title: 'UX Motion',
        desc: 'Scroll · Transitions',
        icon: Waves,
        color: LEGO_COLORS.green,
        gridRow: '1',
        gridCol: '4',
        studsCount: 2,
    },
    {
        id: 'accessibility',
        layerLabel: 'UI / EXPERIENCE',
        title: 'Accessibility',
        desc: 'Contrast · Focus · Keyboard',
        icon: Lock,
        color: LEGO_COLORS.yellow,
        gridRow: '1',
        gridCol: '5 / span 2',
        studsCount: 4,
        isLarge: true,
    },

    // === Row 2: API/Services ===
    {
        id: 'backend',
        layerLabel: 'API / SERVICES',
        title: 'Backend',
        desc: 'REST API · Auth · Worker/Jobs',
        icon: Server,
        color: LEGO_COLORS.blue,
        gridRow: '2',
        gridCol: '1 / span 2',
        studsCount: 4,
        isLarge: true,
    },
    {
        id: 'integration',
        layerLabel: 'API / SERVICES',
        title: 'Integration',
        desc: 'Crawler · Newsletter · Data Pipeline',
        icon: Braces,
        color: LEGO_COLORS.red,
        gridRow: '2',
        gridCol: '3 / span 2',
        studsCount: 4,
        isLarge: true,
    },
    {
        id: 'rate-limit',
        layerLabel: 'API / SERVICES',
        title: 'Rate Limit',
        desc: 'Protect endpoints',
        icon: ShieldCheck,
        color: LEGO_COLORS.cyan,
        gridRow: '2',
        gridCol: '5',
        studsCount: 2,
    },
    {
        id: 'observability',
        layerLabel: 'API / SERVICES',
        title: 'Observability',
        desc: 'Logs · Metrics',
        icon: Activity,
        color: LEGO_COLORS.pink,
        gridRow: '2',
        gridCol: '6',
        studsCount: 2,
    },

    // === Row 3: Data/Cloud ===
    {
        id: 'database',
        layerLabel: 'DATA / CLOUD',
        title: 'Database',
        desc: 'PostgreSQL · Turso · Schema',
        icon: Database,
        color: LEGO_COLORS.indigo,
        gridRow: '3',
        gridCol: '1 / span 2',
        studsCount: 4,
        isLarge: true,
    },
    {
        id: 'security',
        layerLabel: 'DATA / CLOUD',
        title: 'Security',
        desc: 'Token · ACL',
        icon: ShieldCheck,
        color: LEGO_COLORS.teal,
        gridRow: '3',
        gridCol: '3',
        studsCount: 2,
    },
    {
        id: 'cloud',
        layerLabel: 'DATA / CLOUD',
        title: 'Cloud',
        desc: 'Edge · CDN',
        icon: Cloud,
        color: LEGO_COLORS.violet,
        gridRow: '3',
        gridCol: '4',
        studsCount: 2,
    },
    {
        id: 'cicd',
        layerLabel: 'DATA / CLOUD',
        title: 'CI/CD',
        desc: 'GitHub Actions · Preview Deploy',
        icon: GitBranch,
        color: LEGO_COLORS.slate,
        gridRow: '3',
        gridCol: '5 / span 2',
        studsCount: 4,
        isLarge: true,
    },
];

function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(' ');
}

// Lego Studs
function LegoStuds({ count }: { count: number }) {
    return (
        <div className="flex justify-center gap-1.5">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-full bg-white/40 border border-white/50 shadow-sm flex items-center justify-center"
                >
                    <div className="w-1 h-1 rounded-full bg-white/30" />
                </div>
            ))}
        </div>
    );
}

// Lego Brick Component
function LegoBrickComponent({ brick, index }: { brick: LegoBrick; index: number }) {
    const Icon = brick.icon;

    const appearDelay = 0.05 + (index * 0.05);
    const textAppearDelay = appearDelay + 0.2;

    return (
        <motion.div
            className={cn(
                "relative rounded-xl shadow-lg overflow-visible",
                brick.color,
            )}
            style={{
                gridRow: brick.gridRow,
                gridColumn: brick.gridCol,
            }}
            initial={{
                opacity: 0,
                scale: 0.85,
                y: 12,
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
                delay: appearDelay,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                y: -4,
                scale: 1.02,
                boxShadow: "0 12px 20px -6px rgba(0,0,0,0.2)",
                transition: { duration: 0.2, ease: appleEase }
            }}
        >
            {/* Lego studs on top */}
            <div className="absolute -top-1.5 left-0 right-0 z-10">
                <LegoStuds count={brick.studsCount} />
            </div>

            {/* Brick body */}
            <div className="relative h-full pt-2">
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent rounded-t-xl" />
                <div className="absolute inset-x-2 bottom-0 h-1 bg-black/10 rounded-t-sm" />

                {/* Content */}
                <motion.div
                    className="absolute inset-1 top-2 flex flex-col justify-end"
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.3,
                        delay: textAppearDelay,
                        ease: appleEase,
                    }}
                >
                    <div className={cn(
                        "rounded-lg bg-black/30 backdrop-blur-sm border border-white/15 text-white",
                        brick.isLarge ? "p-2.5" : "p-1.5"
                    )}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <div className={cn(
                                "rounded-md bg-white/20 flex items-center justify-center shrink-0",
                                brick.isLarge ? "w-6 h-6" : "w-5 h-5"
                            )}>
                                <Icon size={brick.isLarge ? 12 : 10} />
                            </div>
                            <div className="min-w-0">
                                <p className={cn(
                                    "font-extrabold tracking-wider text-white/70 uppercase leading-tight",
                                    brick.isLarge ? "text-[7px]" : "text-[6px]"
                                )}>
                                    {brick.layerLabel}
                                </p>
                                <h4 className={cn(
                                    "font-black leading-tight",
                                    brick.isLarge ? "text-xs" : "text-[10px]"
                                )}>
                                    {brick.title}
                                </h4>
                            </div>
                        </div>
                        <p className={cn(
                            "text-white/75 leading-tight",
                            brick.isLarge ? "text-[9px]" : "text-[8px]"
                        )}>
                            {brick.desc}
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export function SkillsUniverse() {
    return (
        <section className="py-32 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ ease: appleEase }}
                    className="mb-16 text-center"
                >
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Tech Stack</span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-2">Built for Impact.</h2>
                    <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
                        프론트부터 백엔드, 클라우드까지 — 풀스택으로 생각하고 실행합니다.
                    </p>
                </motion.div>

                {/* Mobile fallback */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {LEGO_BRICKS.map((b) => {
                        const Icon = b.icon;
                        return (
                            <div key={b.id} className={cn("rounded-2xl p-5 text-white shadow-xl border border-white/10", b.color)}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-extrabold tracking-wider text-white/80 uppercase">
                                            {b.layerLabel}
                                        </p>
                                        <p className="text-lg font-black">{b.title}</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm text-white/90">{b.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop: Clean 6-col x 3-row Lego grid - NO OVERLAP */}
                <div className="hidden md:block relative">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

                    <div className="rounded-[32px] border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-md shadow-xl p-8">
                        <div className="flex items-end justify-between gap-6 mb-8">
                            <div>
                                <p className="text-sm font-bold tracking-wider text-primary uppercase">Brick Builder</p>
                                <p className="text-muted-foreground mt-1">
                                    다양한 크기의 블럭을 조립해 하나의 완성된 시스템을 만듭니다.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30">
                                    UI/UX
                                </span>
                                <span className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30">
                                    API
                                </span>
                                <span className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30">
                                    Data/Cloud
                                </span>
                            </div>
                        </div>

                        {/* 6 cols x 3 rows - clean non-overlapping layout */}
                        <div
                            className="grid gap-3 mx-auto pt-2"
                            style={{
                                gridTemplateColumns: 'repeat(6, 1fr)',
                                gridTemplateRows: 'repeat(3, 90px)',
                                maxWidth: '900px',
                            }}
                        >
                            {LEGO_BRICKS.map((brick, index) => (
                                <LegoBrickComponent
                                    key={brick.id}
                                    brick={brick}
                                    index={index}
                                />
                            ))}
                        </div>

                        <div className="mt-8 text-sm text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-2">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">논리 구조:</span>
                            <span>UI/UX → API/Services → Data/Cloud/Delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
