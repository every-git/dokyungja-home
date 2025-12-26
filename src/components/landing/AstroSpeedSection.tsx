import { motion } from 'motion/react';
import { ExternalLink, Zap, Rocket, Globe } from 'lucide-react';

const BLOGS = [
    {
        name: 'Dev Blog',
        url: 'https://dev.dokyungja.us',
        description: '기술 블로그 · Tech Insights',
        tagline: '개발자를 위한 심층 기술 분석과 실전 가이드',
        gradient: 'from-cyan-500 via-blue-600 to-purple-700',
        icon: '🛠️',
        stats: { lighthouse: 100, fcp: '0.3s', lcp: '0.5s' }
    },
    {
        name: 'Main Blog',
        url: 'https://dokyungja.us',
        description: '메인 블로그 · Lifestyle & Economy',
        tagline: '트렌드와 경제 인사이트를 한눈에',
        gradient: 'from-orange-500 via-rose-500 to-purple-600',
        icon: '📊',
        stats: { lighthouse: 100, fcp: '0.3s', lcp: '0.5s' }
    },
];

function BlogCard({ blog, index }: { blog: typeof BLOGS[0], index: number }) {
    return (
        <motion.a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative block rounded-[2rem] overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
        >
            {/* Gradient Header */}
            <div className={`relative h-40 md:h-52 bg-gradient-to-br ${blog.gradient} flex items-center justify-center overflow-hidden`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '24px 24px'
                        }}
                        animate={{ x: [0, 24], y: [0, 24] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                </div>

                {/* Icon */}
                <motion.div
                    className="text-7xl md:text-8xl drop-shadow-lg"
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {blog.icon}
                </motion.div>

                {/* External Link Icon */}
                <div className="absolute top-4 right-4 p-3 rounded-xl bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-5 h-5 text-white" />
                </div>

                {/* Speed Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md">
                    <Zap className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm font-bold text-white">Lighthouse {blog.stats.lighthouse}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{blog.name}</h3>
                    <motion.span
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-orange-400 to-rose-500 text-white"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        LIVE
                    </motion.span>
                </div>
                <p className="text-base text-muted-foreground font-medium mb-4">{blog.description}</p>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">{blog.tagline}</p>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-black/5 dark:border-white/10">
                    <div className="text-center">
                        <p className="text-2xl font-black text-green-500">{blog.stats.fcp}</p>
                        <p className="text-xs text-muted-foreground mt-1">FCP</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-black text-blue-500">{blog.stats.lcp}</p>
                        <p className="text-xs text-muted-foreground mt-1">LCP</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-black text-purple-500">100</p>
                        <p className="text-xs text-muted-foreground mt-1">SEO</p>
                    </div>
                </div>

                {/* URL Preview */}
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    <Globe className="w-4 h-4" />
                    <span className="font-mono">{blog.url.replace('https://', '')}</span>
                </div>
            </div>
        </motion.a>
    );
}

export function AstroSpeedSection() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        >
                            <Rocket className="w-10 h-10 text-orange-500" />
                        </motion.div>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight"
                    >
                        Astro ×<br />Speed.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto"
                    >
                        0.1초의 로딩도 용납하지 않습니다.<br />
                        Astro 프레임워크로 구현한 번개처럼 빠른 블로그.
                    </motion.p>
                </div>

                {/* Blog Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {BLOGS.map((blog, index) => (
                        <BlogCard key={blog.url} blog={blog} index={index} />
                    ))}
                </div>

                {/* Tech Stack Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-14 flex flex-wrap justify-center gap-3"
                >
                    {['Astro', 'MDX', 'Tailwind', 'TypeScript', 'Cloudflare'].map((tech, i) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="px-5 py-2 rounded-full text-sm font-semibold bg-black/5 dark:bg-white/10 text-foreground/80 border border-black/5 dark:border-white/10"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
