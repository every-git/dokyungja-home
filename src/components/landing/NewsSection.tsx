import { motion } from 'motion/react';
import techImg from '../../assets/images/tech.webp';
import economyImg from '../../assets/images/Economy.webp';

export function NewsSection() {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">News Curation</span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2 mt-2">
                            하루 3번,<br />최신뉴스 큐레이팅.
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            뉴스 자동 수집기로 IT/경제 트렌드를 분석.<br />놓치면 안 될 인사이트만 모았습니다.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 1: Tech Trends */}
                    {/* Card 1: Tech Trends */}
                    <a
                        href="https://802.dokyungja.us/newsletter?type=it"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative overflow-hidden bg-background rounded-3xl p-8 shadow-sm border hover:shadow-xl transition-all h-[400px] flex flex-col justify-between group cursor-pointer block"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img src={techImg} alt="Tech Background" loading="lazy" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        </div>

                        <div className="relative z-10 w-12 h-12 bg-blue-500/20 backdrop-blur-md rounded-full flex items-center justify-center text-2xl mb-4 border border-white/10">
                            💎
                        </div>
                        <div className="relative z-10 text-white">
                            <h3 className="text-3xl font-bold mb-2 text-blue-200 group-hover:text-blue-100 transition-colors">Tech Trends</h3>
                            <p className="text-gray-300">생성형 AI의 다음 물결,<br />그리고 우리가 준비해야 할 것들.</p>
                        </div>
                    </a>

                    {/* Card 2: Market Watch */}
                    <a
                        href="https://802.dokyungja.us/newsletter?type=economy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative overflow-hidden bg-background rounded-3xl p-8 shadow-sm border hover:shadow-xl transition-all h-[400px] flex flex-col justify-between group cursor-pointer block"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img src={economyImg} alt="Economy Background" loading="lazy" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        </div>

                        <div className="relative z-10 w-12 h-12 bg-green-500/20 backdrop-blur-md rounded-full flex items-center justify-center text-2xl mb-4 border border-white/10">
                            📈
                        </div>
                        <div className="relative z-10 text-white">
                            <h3 className="text-3xl font-bold mb-2 text-green-200 group-hover:text-green-100 transition-colors">Market Watch</h3>
                            <p className="text-gray-300">금리 인하와 글로벌 시장의<br />움직임 분석.</p>
                        </div>
                    </a>
                </div>

            </div>
        </section>
    );
}
