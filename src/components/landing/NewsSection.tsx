import { motion } from 'motion/react';
import techImg from '../../assets/images/tech.webp';
import economyImg from '../../assets/images/Economy.webp';
import NewsletterCard from '../newsletter/NewsletterCard';

interface Newsletter {
    id: number;
    title: string;
    summary: string;
    originalUrl: string;
    source: string;
    thumbnailUrl?: string;
    category: string;
    tags: string[];
    publishedAt: string;
    viewCount: number;
}

// 더미 뉴스 데이터 (시각적 표현용)
const dummyItNews: Newsletter[] = [
    {
        id: 1,
        title: 'GPT-4o 출시: 멀티모달 AI의 새로운 지평',
        summary: 'OpenAI가 이미지, 텍스트, 오디오를 동시에 처리할 수 있는 GPT-4o를 공개했습니다.',
        originalUrl: 'https://802.dokyungja.us/newsletter?type=it',
        source: 'OpenAI',
        category: 'AI',
        tags: ['AI', 'GPT-4o'],
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        viewCount: 0,
    },
    {
        id: 2,
        title: 'React 19 정식 출시: 서버 컴포넌트와 새로운 훅',
        summary: 'React 19가 정식 출시되며 서버 컴포넌트와 use() 훅이 추가되었습니다.',
        originalUrl: 'https://802.dokyungja.us/newsletter?type=it',
        source: 'React Blog',
        category: 'Frontend',
        tags: ['React', 'Frontend'],
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        viewCount: 0,
    },
    {
        id: 3,
        title: 'TypeScript 5.5 베타: 새로운 타입 추론 개선',
        summary: 'TypeScript 5.5 베타가 출시되며 타입 추론과 성능이 크게 개선되었습니다.',
        originalUrl: 'https://802.dokyungja.us/newsletter?type=it',
        source: 'TypeScript',
        category: 'Frontend',
        tags: ['TypeScript', 'Frontend'],
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        viewCount: 0,
    },
];

const dummyEconomyNews: Newsletter[] = [
    {
        id: 4,
        title: '미국 연준, 금리 인하 기대감 확산',
        summary: '연준의 금리 인하 발언으로 글로벌 주식 시장이 상승세를 보이고 있습니다.',
        originalUrl: 'https://802.dokyungja.us/newsletter?type=economy',
        source: '월스트리트저널',
        category: '거시경제',
        tags: ['금리', '연준'],
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        viewCount: 0,
    },
    {
        id: 5,
        title: '반도체 업체들, AI 수요 급증으로 실적 호조',
        summary: 'AI 반도체 수요 증가로 주요 반도체 기업들의 실적이 예상을 뛰어넘었습니다.',
        originalUrl: 'https://802.dokyungja.us/newsletter?type=economy',
        source: '블룸버그',
        category: '증권',
        tags: ['반도체', 'AI'],
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        viewCount: 0,
    },
    {
        id: 6,
        title: '부동산 시장, 금리 인하 기대감으로 반등 조짐',
        summary: '금리 인하 기대감이 높아지면서 부동산 시장에 긍정적 신호가 나타나고 있습니다.',
        originalUrl: 'https://802.dokyungja.us/newsletter?type=economy',
        source: '부동산뉴스',
        category: '부동산',
        tags: ['부동산', '금리'],
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        viewCount: 0,
    },
];

export function NewsSection() {

    return (
        <section className="relative py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
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
                    <div className="space-y-6">
                        <motion.a
                            href="https://802.dokyungja.us/newsletter?type=it"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden bg-background rounded-3xl p-8 shadow-sm border hover:shadow-xl transition-all h-[400px] flex flex-col justify-between group cursor-pointer block"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img src={techImg} alt="Tech Background" loading="lazy" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-md rounded-full flex items-center justify-center text-2xl mb-4 border border-white/10">
                                    💎
                                </div>
                                <div className="text-white">
                                    <h3 className="text-3xl font-bold mb-2 text-blue-200 group-hover:text-blue-100 transition-colors">Tech Trends</h3>
                                    <p className="text-gray-300">생성형 AI의 다음 물결,<br />그리고 우리가 준비해야 할 것들.</p>
                                </div>
                            </div>
                        </motion.a>

                        {/* News List - 카드 하단에 표시 */}
                        <div className="space-y-3">
                            {dummyItNews.map((news) => (
                                <NewsletterCard key={news.id} newsletter={news} />
                            ))}
                        </div>
                    </div>

                    {/* Card 2: Market Watch */}
                    <div className="space-y-6">
                        <motion.a
                            href="https://802.dokyungja.us/newsletter?type=economy"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="relative overflow-hidden bg-background rounded-3xl p-8 shadow-sm border hover:shadow-xl transition-all h-[400px] flex flex-col justify-between group cursor-pointer block"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img src={economyImg} alt="Economy Background" loading="lazy" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-green-500/20 backdrop-blur-md rounded-full flex items-center justify-center text-2xl mb-4 border border-white/10">
                                    📈
                                </div>
                                <div className="text-white">
                                    <h3 className="text-3xl font-bold mb-2 text-green-200 group-hover:text-green-100 transition-colors">Market Watch</h3>
                                    <p className="text-gray-300">금리 인하와 글로벌 시장의<br />움직임 분석.</p>
                                </div>
                            </div>
                        </motion.a>

                        {/* News List - 카드 하단에 표시 */}
                        <div className="space-y-3">
                            {dummyEconomyNews.map((news) => (
                                <NewsletterCard key={news.id} newsletter={news} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
