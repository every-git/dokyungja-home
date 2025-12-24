
import { motion } from 'motion/react';
import { Code, TrendingUp, ShoppingBag, Users, ArrowRight, Keyboard, Newspaper } from 'lucide-react';

const features = [
    {
        title: '802 Community',
        titleKo: '빠르고 트렌디한 소규모 커뮤니티',
        desc: '단순한 커뮤니티가 아닌, 빠르게 소통할 수 있는 공간. 개발자들의 프라이빗 그룹.',
        icon: Users,
        link: 'https://802.dokyungja.us',
        color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
    },
    {
        title: 'Tech Blog',
        titleKo: '세상에서 제일 빠른 기술 블로그',
        desc: 'VS-Code로 글을 쓰는 Blog. React, Architecture, AI 딥다이브.',
        icon: Code,
        link: 'https://dev.dokyungja.us',
        color: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    },
    {
        title: 'Economy Blog',
        titleKo: '세상에서 제일 빠른 경제 블로그',
        desc: 'VS-Code로 글을 쓰는 Blog. 경제 트렌드, 시장 분석, 투자 인사이트 딥다이브.',
        icon: TrendingUp,
        link: 'https://dokyungja.us',
        color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    },
    {
        title: 'Snack Shop',
        titleKo: '한땀한땀 만든 과자 쇼핑몰',
        desc: '관리자 페이지까지 직접 개발한 커머스. 큐레이션된 스낵과 굿즈.',
        icon: ShoppingBag,
        link: 'https://snack.playw.work',
        color: 'bg-pink-500/10 text-pink-500 border-pink-500/20'
    },
    {
        title: 'Typing Practice',
        titleKo: '개발자를 위한 타자 연습',
        desc: '언어별 연습공간, 커스텀 설정, 순위 제공까지 재미를 더한 타자 연습 프로그램.',
        icon: Keyboard,
        link: 'https://802.dokyungja.us/typing-game',
        color: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    },
    {
        title: 'News Curator',
        titleKo: '뉴스 자동 수집기',
        desc: '하루 3번, 최신 IT/경제 뉴스를 자동 수집하고 큐레이팅합니다.',
        icon: Newspaper,
        link: 'https://802.dokyungja.us/newsletter',
        color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
    }
];

export function FeatureHub() {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Projects</span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-2">이런 걸 만들었습니다.</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <a
                                href={feature.link}
                                target={feature.link.startsWith('http') ? '_blank' : undefined}
                                rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="block group h-full"
                            >
                                <div className={`h-full p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card ${feature.color.replace('text-', 'hover:border-')}`}>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                                        <feature.icon size={28} />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-primary/80 font-medium mb-3">
                                        {feature.titleKo}
                                    </p>
                                    <p className="text-muted-foreground mb-6 line-clamp-2">
                                        {feature.desc}
                                    </p>

                                    <div className="flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                        Explore <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
