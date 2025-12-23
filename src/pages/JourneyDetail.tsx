import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Layout } from '../components/layout/Layout';
import { ArrowLeft, Cpu, TrendingUp, ShoppingBag, Palette } from 'lucide-react';

const detailContent = {
    tech: {
        title: "AI × Engineering",
        subtitle: "Architecture Beyond Coding",
        icon: <Cpu size={48} />,
        color: "from-slate-900 to-indigo-900",
        description: `
            단순한 코딩을 넘어, AI와 함께 아키텍처를 설계합니다.
            
            **Anti-Gravity Engineering Philosophy**
            
            우리는 '중력'과 같은 기존의 개발 관습과 한계를 거부합니다.
            AI 에이전트 기반의 워크플로우를 통해 생산성의 물리적 한계를 뛰어넘습니다.
            
            - **AI-Native Architecture**: 처음부터 AI와의 협업을 전제로 시스템을 설계합니다.
            - **Autonomous Pipelines**: 코드 작성, 테스트, 배포의 전 과정을 지능형 에이전트가 보조합니다.
            - **Future-Proof Stack**: 가장 최신의 기술 파도를 서핑하며, 언제나 'Next'를 준비합니다.
            
            기술은 도구이지만, 그 도구를 다루는 방식이 예를 만듭니다.
            도경자는 엔지니어링의 새로운 지평을 엽니다.
        `
    },
    economy: {
        title: "Data Insight & AI",
        subtitle: "Market Intelligence, Redefined",
        icon: <TrendingUp size={48} />,
        color: "from-red-800 to-rose-900",
        description: `
            방대한 시장 데이터를 AI 에이전트로 분석하여 남들이 보지 못하는 흐름을 읽어냅니다.
            
            **Data-Driven Decision Making**
            
            감각이나 소문에 의존하는 투자가 아닌, 철저한 데이터 기반의 인사이트를 제공합니다.
            
            - **Real-time Crawling**: 전 세계 주요 경제 지표와 뉴스를 실시간으로 수집합니다.
            - **Sentiment Analysis**: 시장 참여자들의 심리를 AI로 분석하여 트렌드의 변곡점을 포착합니다.
            - **Predictive Modeling**: 과거의 패턴을 학습하여 미래의 시나리오를 시뮬레이션합니다.
            
            데이터는 거짓말을 하지 않습니다. 단지 해석을 기다릴 뿐입니다.
            도경자의 경제 인사이트는 그 해석의 정점입니다.
        `
    },
    shop: {
        title: "Curated by Algorithm",
        subtitle: "Smart Taste, Smart Choice",
        icon: <ShoppingBag size={48} />,
        color: "from-purple-800 to-fuchsia-900",
        description: `
            나의 취향 데이터와 트렌드 분석 AI가 만났습니다.
            
            **Hyper-Personalized Curation**
            
            수많은 제품의 홍수 속에서, 당신에게 정말 가치 있는 물건만을 찾아냅니다.
            
            - **Trend Spotting**: 소셜 미디어와 커머스 데이터를 분석하여 지금 가장 핫한 아이템을 발굴합니다.
            - **Quality Filter**: 리뷰 데이터와 스펙 분석을 통해 검증된 품질의 1% 제품만 엄선합니다.
            - **Hidden Gems**: 알고리즘이 찾아낸, 아직 유명하지 않지만 보석 같은 브랜드를 소개합니다.
            
            쇼핑의 피로를 줄이고, 발견의 기쁨만을 남겨드립니다.
        `
    },
    art: {
        title: "Generative Creativity",
        subtitle: "Imagination Unlimited",
        icon: <Palette size={48} />,
        color: "from-emerald-800 to-teal-900",
        description: `
            인간의 상상력에 AI의 표현력을 더했습니다.
            
            **Prompt Engineering Art**
            
            한 줄의 문장이 하나의 세계가 됩니다. 프롬프트 엔지니어링으로 그려내는 새로운 차원의 예술입니다.
            
            - **Style Transfer**: 고전 명화부터 사이버펑크까지, 시공간을 초월한 스타일을 융합합니다.
            - **Narrative Visuals**: 단순한 이미지가 아닌, 이야기가 담긴 비주얼 스토리텔링을 구현합니다.
            - **Interactive Art**: 관객의 참여로 완성되는 생성형 예술 경험을 제공합니다.
            
            상상하는 모든 것이 현실이 되는 곳, 도경자의 갤러리에 오신 것을 환영합니다.
        `
    }
};

// Simple helper to render bold text from markdown-like syntax
const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
        // Handle list items
        const isList = line.trim().startsWith('-');
        const cleanLine = isList ? line.trim().substring(1).trim() : line;

        // Split by ** for bolding
        const parts = cleanLine.split('**');

        return (
            <div key={i} className={`min-h-[1.5em] ${isList ? 'pl-4 relative flex gap-2' : ''}`}>
                {isList && <span className="text-primary mt-2">●</span>}
                <p className={`${isList ? 'flex-1' : ''}`}>
                    {parts.map((part, index) => {
                        if (index % 2 === 1) { // Odd indices are between ** **
                            return <strong key={index} className="text-foreground font-bold">{part}</strong>;
                        }
                        return part;
                    })}
                </p>
            </div>
        );
    });
};

export default function JourneyDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const content = detailContent[id as keyof typeof detailContent];

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!content) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
                        <button onClick={() => navigate('/')} className="text-primary hover:underline">Go Home</button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen pb-20"
            >
                {/* Hero Header */}
                <div className={`relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-gradient-to-br ${content.color} text-white overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                    <div className="relative z-10 text-center px-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/10 p-6 rounded-full inline-flex mb-6 backdrop-blur-md shadow-lg"
                        >
                            {content.icon}
                        </motion.div>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
                        >
                            {content.title}
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-2xl font-light opacity-90"
                        >
                            {content.subtitle}
                        </motion.p>
                    </div>
                </div>

                {/* Content Body */}
                <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20">
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-card text-card-foreground p-8 md:p-12 rounded-3xl shadow-2xl border border-border"
                    >
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors cursor-pointer"
                        >
                            <ArrowLeft size={16} className="mr-2" />
                            Back
                        </button>

                        <div className="space-y-2 text-lg leading-relaxed text-muted-foreground">
                            {renderContent(content.description)}
                        </div>

                        <div className="mt-12 pt-12 border-t border-border flex justify-center">
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-all cursor-pointer shadow-lg hover:translate-y-[-2px]"
                            >
                                다음 여정 계속하기
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </Layout>
    );
}
