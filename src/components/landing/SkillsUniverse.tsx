
import { motion } from 'motion/react';
import { Braces, Cloud, Database, GitBranch, Layers, Monitor, Server, ShieldCheck, Waves, Lock, Activity } from 'lucide-react';

// Apple-style easing
const appleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

type TetrominoType = 'T' | 'L' | 'J' | 'S' | 'Z' | 'O';

type StackBlock = {
    id: string;
    layerLabel: string;
    title: string;
    desc: string;
    icon: any;
    color: string; // gradient tailwind class
    tetromino: TetrominoType;
    pos: { col: 1 | 4 | 7 | 10; row: 1 | 3 | 5 };
};

// 12-col board, 3 layers (each layer is 2 rows tall). 4 blocks per layer (col 1/4/7/10)
// 논리: UI/UX → API/Services → Data/Cloud/Ops
const PREMIUM_BLOCK_COLOR = 'bg-gradient-to-br from-slate-950 to-slate-900';

const STACK_BLOCKS: StackBlock[] = [
    // Layer 1 (row 1-2): UI / Experience
    {
        id: 'frontend',
        layerLabel: 'UI / EXPERIENCE',
        title: 'Frontend',
        desc: 'React · TypeScript\nTailwind · Motion',
        icon: Monitor,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'T',
        pos: { col: 1, row: 1 },
    },
    {
        id: 'design-system',
        layerLabel: 'UI / EXPERIENCE',
        title: 'Design System',
        desc: '규칙 · 컴포넌트\n반응형 · 접근성',
        icon: Layers,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'L',
        pos: { col: 4, row: 1 },
    },
    {
        id: 'ux-motion',
        layerLabel: 'UI / EXPERIENCE',
        title: 'UX Motion',
        desc: 'Micro-interaction\nScroll · Transitions',
        icon: Waves,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'S',
        pos: { col: 7, row: 1 },
    },
    {
        id: 'accessibility',
        layerLabel: 'UI / EXPERIENCE',
        title: 'Accessibility',
        desc: 'Contrast · Focus\nKeyboard',
        icon: Lock,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'O',
        pos: { col: 10, row: 1 },
    },

    // Layer 2 (row 3-4): API / Services
    {
        id: 'backend',
        layerLabel: 'API / SERVICES',
        title: 'Backend',
        desc: 'REST API · Auth\nWorker/Jobs',
        icon: Server,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'J',
        pos: { col: 1, row: 3 },
    },
    {
        id: 'integration',
        layerLabel: 'API / SERVICES',
        title: 'Integration',
        desc: 'Crawler · Newsletter\nData Pipeline',
        icon: Braces,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'Z',
        pos: { col: 4, row: 3 },
    },
    {
        id: 'rate-limit',
        layerLabel: 'API / SERVICES',
        title: 'Rate Limit',
        desc: 'Protect endpoints\nAbuse control',
        icon: ShieldCheck,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'T',
        pos: { col: 7, row: 3 },
    },
    {
        id: 'observability',
        layerLabel: 'API / SERVICES',
        title: 'Observability',
        desc: 'Logs · Metrics\nTracing',
        icon: Activity,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'L',
        pos: { col: 10, row: 3 },
    },

    // Layer 3 (row 5-6): Data / Cloud / Delivery
    {
        id: 'database',
        layerLabel: 'DATA / CLOUD',
        title: 'Database',
        desc: 'PostgreSQL · Turso\nSchema · Index',
        icon: Database,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'S',
        pos: { col: 1, row: 5 },
    },
    {
        id: 'security',
        layerLabel: 'DATA / CLOUD',
        title: 'Security',
        desc: 'Token · ACL\nSecrets',
        icon: ShieldCheck,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'O',
        pos: { col: 4, row: 5 },
    },
    {
        id: 'cloud',
        layerLabel: 'DATA / CLOUD',
        title: 'Cloud',
        desc: 'Edge · CDN\nServerless',
        icon: Cloud,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'J',
        pos: { col: 7, row: 5 },
    },
    {
        id: 'cicd',
        layerLabel: 'DATA / CLOUD',
        title: 'CI/CD',
        desc: 'GitHub Actions\nPreview Deploy',
        icon: GitBranch,
        color: PREMIUM_BLOCK_COLOR,
        tetromino: 'Z',
        pos: { col: 10, row: 5 },
    },
];

function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(' ');
}

// 3x2 (or 2x2) tetrominoes rendered within a 3x2 bounding box for consistent placement.
// Coordinates are [x, y] within 3 columns (0..2) and 2 rows (0..1).
const TETROMINO_CELLS: Record<TetrominoType, Array<[number, number]>> = {
    // ###
    // .#.
    T: [[0, 0], [1, 0], [2, 0], [1, 1]],
    // #..
    // ###
    L: [[0, 0], [0, 1], [1, 1], [2, 1]],
    // ..#
    // ###
    J: [[2, 0], [0, 1], [1, 1], [2, 1]],
    // .##
    // ##.
    S: [[1, 0], [2, 0], [0, 1], [1, 1]],
    // ##.
    // .##
    Z: [[0, 0], [1, 0], [1, 1], [2, 1]],
    // ##
    // ##
    // (placed at left inside 3x2)
    O: [[0, 0], [1, 0], [0, 1], [1, 1]],
};

function TetrominoBlock({ block, delay }: { block: StackBlock; delay: number }) {
    const Icon = block.icon;
    const cells = TETROMINO_CELLS[block.tetromino];

    return (
        <motion.div
            initial={{ opacity: 0, y: -28, rotate: -1.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: appleEase, delay }}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: appleEase } }}
            className="relative"
            style={{
                gridColumn: `${block.pos.col} / span 3`,
                gridRow: `${block.pos.row} / span 2`,
            }}
        >
            {/* cell stack (actual shape) */}
            <div className="relative w-full h-full">
                {cells.map(([x, y], idx) => (
                    <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        className={cn(
                            "absolute rounded-2xl shadow-xl border border-white/15",
                            block.color,
                        )}
                        style={{
                            width: "var(--cell)",
                            height: "var(--cell)",
                            left: `calc(${x} * (var(--cell) + var(--gap)))`,
                            top: `calc(${y} * (var(--cell) + var(--gap)))`,
                        }}
                    >
                        <div
                            className="absolute inset-0 opacity-25"
                            style={{
                                backgroundImage:
                                    "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
                                backgroundSize: "14px 14px",
                            }}
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                    </div>
                ))}

                {/* overlay content (text never clipped) */}
                <div className="absolute inset-0 flex items-end">
                    <div className="m-2 md:m-3 w-[calc(100%-0.75rem)] rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 px-3 py-2 text-white">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                                <Icon size={16} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-extrabold tracking-wider text-white/80 uppercase">
                                    {block.layerLabel}
                                </p>
                                <h4 className="text-sm md:text-base font-black leading-tight break-words">
                                    {block.title}
                                </h4>
                            </div>
                        </div>
                        <p className="text-[11px] md:text-xs text-white/85 leading-relaxed whitespace-pre-line break-words">
                            {block.desc}
                        </p>
                    </div>
                </div>
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

                {/* Mobile fallback: readable cards */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {STACK_BLOCKS.map((b) => {
                        const Icon = b.icon;
                        return (
                            <div key={b.id} className={cn("rounded-3xl p-5 text-white shadow-xl border border-white/10", b.color)}>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-extrabold tracking-wider text-white/80 uppercase">
                                                {b.layerLabel}
                                            </p>
                                            <p className="text-lg font-black">{b.title}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-white/85">{b.tetromino}</span>
                                </div>
                                <p className="mt-3 text-sm text-white/90 whitespace-pre-line">{b.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop: true tetris board with different shapes */}
                <div className="hidden md:block relative">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

                    <div className="rounded-[32px] border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-md shadow-xl p-8">
                        <div className="flex items-end justify-between gap-6 mb-8">
                            <div>
                                <p className="text-sm font-bold tracking-wider text-primary uppercase">Stack Builder</p>
                                <p className="text-muted-foreground mt-1">
                                    서로 다른 모양의 블럭이 “레이어” 순서대로 쌓이며, 구조가 자연스럽게 이어집니다.
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

                        {/* board */}
                        <div
                            className="relative mx-auto"
                            style={{
                                // fixed cell size on desktop for proper tetromino look
                                // 12 cols × 6 rows (each block occupies 3×2 bounding box)
                                ['--cell' as any]: '74px',
                                ['--gap' as any]: '8px',
                                width: 'calc(12 * var(--cell) + 11 * var(--gap))',
                                height: 'calc(6 * var(--cell) + 5 * var(--gap))',
                            }}
                        >
                            <div
                                className="absolute inset-0 rounded-3xl border border-black/5 dark:border-white/10 bg-white/30 dark:bg-black/15"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
                                    backgroundSize: "calc(var(--cell) + var(--gap)) calc(var(--cell) + var(--gap))",
                                }}
                            />

                            <div
                                className="absolute inset-0 grid"
                                style={{
                                    gridTemplateColumns: 'repeat(12, var(--cell))',
                                    gridTemplateRows: 'repeat(6, var(--cell))',
                                    gap: 'var(--gap)',
                                }}
                            >
                                {STACK_BLOCKS.map((b, i) => (
                                    <TetrominoBlock key={b.id} block={b} delay={i * 0.06} />
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 text-sm text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-2">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">논리 구조:</span>
                            <span>UI/UX → API/Services → Data/Cloud/Delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
