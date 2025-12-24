
import { motion } from 'motion/react';
import { Database, Code2, LineChart, Palette, ShoppingBag, Terminal, Server, Cpu } from 'lucide-react';

// Apple-style easing
const appleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

// Skills with varying sizes for Lego-block effect
const skills = [
    // === Row 1: Development Core ===
    {
        id: 'frontend',
        title: 'Frontend',
        category: 'Development',
        desc: 'React · Astro · TypeScript\nTailwind · Framer Motion',
        icon: Code2,
        color: 'bg-blue-600',
        size: 'col-span-2 row-span-2', // Large
    },
    {
        id: 'backend',
        title: 'Backend',
        category: 'Development',
        desc: 'Node.js · PostgreSQL\nTurso DB · REST API',
        icon: Database,
        color: 'bg-slate-700',
        size: 'col-span-1 row-span-1', // Small
    },
    {
        id: 'java',
        title: 'Java',
        category: 'Development',
        desc: 'Spring Boot · MySQL\nTomcat · Python',
        icon: Server,
        color: 'bg-rose-600',
        size: 'col-span-1 row-span-2', // Tall
    },

    // === Row 2: Infrastructure ===
    {
        id: 'devops',
        title: 'DevOps',
        category: 'Infrastructure',
        desc: 'GitHub · CI/CD\nCloudflare Pages',
        icon: Terminal,
        color: 'bg-purple-600',
        size: 'col-span-1 row-span-1', // Small
    },

    // === Row 3: Mixed ===
    {
        id: 'serverless',
        title: 'Serverless',
        category: 'Infrastructure',
        desc: 'Edge Functions · Turso Edge\nZero Server Management',
        icon: Cpu,
        color: 'bg-cyan-600',
        size: 'col-span-2 row-span-1', // Wide
    },
    {
        id: 'design',
        title: 'Design',
        category: 'Creative',
        desc: 'Figma · UI/UX\n3D Assets',
        icon: Palette,
        color: 'bg-pink-600',
        size: 'col-span-1 row-span-1', // Small
    },
    {
        id: 'economy',
        title: 'Economy',
        category: 'Business',
        desc: '매크로 분석 · 투자 전략\n데이터 기반 의사결정',
        icon: LineChart,
        color: 'bg-green-600',
        size: 'col-span-1 row-span-1', // Small
    },

    // === Row 4: Business ===
    {
        id: 'commerce',
        title: 'E-Commerce',
        category: 'Business',
        desc: '스마트스토어 · 브랜딩 · 물류\n관리자 페이지 직접 개발',
        icon: ShoppingBag,
        color: 'bg-orange-600',
        size: 'col-span-2 row-span-1', // Wide
    },
];

// Category labels for visual grouping
const categoryLabels: Record<string, string> = {
    'Development': '개발',
    'Infrastructure': '인프라',
    'Creative': '디자인',
    'Business': '비즈니스',
};

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

                {/* Lego-style Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
                            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                delay: i * 0.08,
                                duration: 0.6,
                                ease: appleEase
                            }}
                            whileHover={{
                                scale: 1.05,
                                y: -8,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                                transition: { duration: 0.3, ease: appleEase }
                            }}
                            className={`
                                relative rounded-3xl p-5 ${skill.color} text-white 
                                overflow-hidden shadow-xl cursor-pointer group
                                ${skill.size}
                            `}
                        >
                            {/* Category Badge */}
                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/20 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                                {skill.category}
                            </div>

                            {/* Background Icon - Animated */}
                            <motion.div
                                className="absolute -right-6 -bottom-6 opacity-10"
                                animate={{ rotate: [0, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <skill.icon size={skill.size.includes('span-2') ? 180 : 100} />
                            </motion.div>

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                    <skill.icon size={20} />
                                </div>

                                <div>
                                    <h4 className="text-xl md:text-2xl font-bold mb-1">{skill.title}</h4>
                                    <p className="text-white/70 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                                        {skill.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/10 to-transparent" />
                        </motion.div>
                    ))}
                </div>

                {/* Category Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground"
                >
                    {Object.entries(categoryLabels).map(([en, ko]) => (
                        <div key={en} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${en === 'Development' ? 'bg-blue-500' :
                                en === 'Infrastructure' ? 'bg-purple-500' :
                                    en === 'Creative' ? 'bg-pink-500' :
                                        'bg-orange-500'
                                }`} />
                            <span>{en} / {ko}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
