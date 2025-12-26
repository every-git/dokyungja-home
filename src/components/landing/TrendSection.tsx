import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { TrendingUp, Search, BarChart3, Sparkles } from 'lucide-react';
import trendCollectorImg from '../../assets/images/trend_collector_new.webp';
import trendSheetImg from '../../assets/images/trend_sheet_generated.svg';

// 더미 네이버 트렌드 키워드 데이터
const TREND_KEYWORDS = [
    { keyword: '생성형 AI', category: '기술', rank: 1, change: '+3' },
    { keyword: '반도체', category: '산업', rank: 2, change: '+1' },
    { keyword: '금리 인하', category: '경제', rank: 3, change: '-1' },
    { keyword: '웹3.0', category: '기술', rank: 4, change: '+5' },
    { keyword: 'ESG 경영', category: '경영', rank: 5, change: '+2' },
    { keyword: '메타버스', category: '기술', rank: 6, change: '-2' },
    { keyword: '친환경 에너지', category: '환경', rank: 7, change: '+4' },
    { keyword: '원격근무', category: '사회', rank: 8, change: '-1' },
    { keyword: '클라우드 마이그레이션', category: '기술', rank: 9, change: '+2' },
    { keyword: '디지털 전환', category: '경영', rank: 10, change: 'NEW' },
];

const CATEGORIES = ['기술', '경제', '산업', '경영', '환경', '사회'];

export function TrendSection() {
    const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

    // 스크롤과 무관한 반복 애니메이션: 일정 시간마다 step 전환
    useEffect(() => {
        const id = window.setInterval(() => {
            setActiveStep((prev) => (prev === 4 ? 1 : ((prev + 1) as 1 | 2 | 3 | 4)));
        }, 3200);
        return () => window.clearInterval(id);
    }, []);

    // 카테고리별 그룹화된 키워드
    const categorizedKeywords = CATEGORIES.map(cat => ({
        category: cat,
        keywords: TREND_KEYWORDS.filter(k => k.category === cat)
    })).filter(group => group.keywords.length > 0);

    return (
        <section className="relative py-32 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* 기존 섹션 제목/내용 유지 */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
                        Trend<br />Collector.
                    </h2>
                    <p className="text-2xl text-muted-foreground font-medium">
                        매일 수집되는 트렌드 키워드.<br />
                        세상의 모든 영감을 한곳에 모읍니다.
                    </p>
                </div>

                {/* 기존 이미지 유지 */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative overflow-hidden rounded-[3rem] shadow-2xl"
                >
                    <img
                        src={trendCollectorImg}
                        alt="Trend Collector"
                        loading="lazy"
                        className="w-full h-[420px] md:h-[520px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </motion.div>

                {/* 아래: 스크롤과 무관한 반복 애니메이션 */}
                <div className="mt-14">
                    <div className="flex items-end justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-3xl font-bold">네이버 트렌드 분석 파이프라인</h3>
                            <p className="text-muted-foreground mt-1">
                                스크롤 없이도 자동으로 반복되는 수집 → 정제 → 분류 → 인사이트 과정
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            {[1, 2, 3, 4].map((n) => (
                                <div
                                    key={n}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        activeStep === n ? 'w-10 bg-blue-500' : 'w-2 bg-blue-500/30'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="relative w-full rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur-md shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10 items-center">
                            {/* visual */}
                            <div className="relative">
                                <div className="absolute -inset-6 bg-blue-500/10 blur-2xl rounded-[32px]" />
                                <div className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-white/30 dark:bg-black/20">
                                    <img src={trendSheetImg} alt="Trend Sheet (generated)" className="w-full h-auto" />

                                    {/* scanning line (always loop) */}
                                    <motion.div
                                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"
                                        animate={{ y: [24, 460, 24] }}
                                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                                    />

                                    {/* step focus overlays */}
                                    <AnimatePresence mode="wait">
                                        {activeStep === 2 && (
                                            <motion.div
                                                key="focus-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute left-[14%] top-[30%] w-[64%] h-[26%] rounded-xl border border-purple-400/70 bg-purple-500/10"
                                            />
                                        )}
                                        {activeStep === 3 && (
                                            <motion.div
                                                key="focus-3"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute left-[8%] top-[18%] w-[30%] h-[64%] rounded-2xl border border-yellow-400/60 bg-yellow-500/10"
                                            />
                                        )}
                                    </AnimatePresence>

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                                </div>
                            </div>

                            {/* text panels */}
                            <div className="relative min-h-[340px]">
                                <AnimatePresence mode="wait">
                                    {activeStep === 1 && (
                                        <motion.div
                                            key="panel-1"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute inset-0"
                                        >
                                            <div className="flex items-center gap-3 mb-5">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                                                    className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center"
                                                >
                                                    <Search className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                                                </motion.div>
                                                <div>
                                                    <h4 className="text-2xl font-bold">수집</h4>
                                                    <p className="text-muted-foreground">실시간 트렌드를 시트에 저장합니다</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {TREND_KEYWORDS.map((item, index) => (
                                                    <motion.div
                                                        key={item.keyword}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.25, delay: index * 0.05 }}
                                                        className="rounded-2xl p-3 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/40 backdrop-blur-md shadow-sm"
                                                    >
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs font-bold text-blue-600 dark:text-blue-300">#{item.rank}</span>
                                                            <span
                                                                className={`text-xs font-semibold ${
                                                                    item.change.startsWith('+') ? 'text-red-500' :
                                                                    item.change.startsWith('-') ? 'text-blue-500' :
                                                                    'text-green-500'
                                                                }`}
                                                            >
                                                                {item.change}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.keyword}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeStep === 2 && (
                                        <motion.div
                                            key="panel-2"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute inset-0"
                                        >
                                            <div className="flex items-center gap-3 mb-5">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                                                    className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center"
                                                >
                                                    <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                                                </motion.div>
                                                <div>
                                                    <h4 className="text-2xl font-bold">정제 & 점수화</h4>
                                                    <p className="text-muted-foreground">검색량·상승률을 계산해 점수를 만듭니다</p>
                                                </div>
                                            </div>
                                            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/40 backdrop-blur-md p-5 shadow-sm">
                                                <div className="flex items-center justify-between mb-3">
                                                    <p className="text-sm font-semibold">분석 진행</p>
                                                    <motion.p
                                                        className="text-sm font-bold text-purple-600 dark:text-purple-300"
                                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                                        transition={{ duration: 1.2, repeat: Infinity }}
                                                    >
                                                        계산 중...
                                                    </motion.p>
                                                </div>
                                                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                                        animate={{ width: ["10%", "100%", "10%"] }}
                                                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                                    />
                                                </div>
                                                <div className="mt-5 flex flex-wrap gap-2">
                                                    {['검색량 분석', '상승률 계산', '연관성 파악', '카테고리 분류'].map((text, i) => (
                                                        <motion.div
                                                            key={text}
                                                            initial={{ opacity: 0, y: 6 }}
                                                            animate={{ opacity: [0.3, 1, 0.3], y: 0 }}
                                                            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
                                                            className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                                        >
                                                            {text}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeStep === 3 && (
                                        <motion.div
                                            key="panel-3"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute inset-0"
                                        >
                                            <div className="flex items-center gap-3 mb-5">
                                                <motion.div
                                                    animate={{ scale: [1, 1.08, 1], rotate: [0, 180, 360] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    className="w-12 h-12 rounded-2xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center"
                                                >
                                                    <Sparkles className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
                                                </motion.div>
                                                <div>
                                                    <h4 className="text-2xl font-bold">분류</h4>
                                                    <p className="text-muted-foreground">키워드를 주제별로 자동 그룹화합니다</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {categorizedKeywords.map((group, idx) => (
                                                    <motion.div
                                                        key={group.category}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.25, delay: idx * 0.08 }}
                                                        className="rounded-2xl p-4 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/40 backdrop-blur-md shadow-sm"
                                                    >
                                                        <h5 className="font-bold mb-2">{group.category}</h5>
                                                        <div className="space-y-1.5">
                                                            {group.keywords.slice(0, 3).map((k) => (
                                                                <div key={k.keyword} className="text-sm text-muted-foreground">
                                                                    <span className="font-bold text-blue-600 dark:text-blue-300 mr-2">#{k.rank}</span>
                                                                    <span className="text-gray-800 dark:text-gray-200">{k.keyword}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeStep === 4 && (
                                        <motion.div
                                            key="panel-4"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute inset-0"
                                        >
                                            <div className="flex items-center gap-3 mb-5">
                                                <motion.div
                                                    initial={{ scale: 0.98 }}
                                                    animate={{ scale: [0.98, 1, 0.98] }}
                                                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                                    className="w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/25 flex items-center justify-center"
                                                >
                                                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-300" />
                                                </motion.div>
                                                <div>
                                                    <h4 className="text-2xl font-bold">인사이트</h4>
                                                    <p className="text-muted-foreground">오늘의 TOP 키워드를 요약합니다</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {TREND_KEYWORDS.slice(0, 6).map((item, idx) => (
                                                    <motion.div
                                                        key={item.keyword}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.25, delay: idx * 0.06 }}
                                                        className="rounded-2xl p-4 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-900/40 backdrop-blur-md shadow-sm"
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                                                    idx < 3
                                                                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                                                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                                }`}>
                                                                    {item.rank}
                                                                </div>
                                                                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                                    {item.category}
                                                                </span>
                                                            </div>
                                                            <span className={`text-sm font-bold ${
                                                                item.change.startsWith('+') ? 'text-red-500' :
                                                                item.change.startsWith('-') ? 'text-blue-500' :
                                                                'text-green-500'
                                                            }`}>
                                                                {item.change}
                                                            </span>
                                                        </div>
                                                        <p className="text-base font-bold text-gray-900 dark:text-gray-100">{item.keyword}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
