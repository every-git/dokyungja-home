import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';

import asset02 from '../../assets/images/dokyungja_02.png';
import asset03 from '../../assets/images/dokyungja_03.png';
import asset04 from '../../assets/images/dokyungja_04.png';
import asset05 from '../../assets/images/dokyungja_05.png';
import asset09 from '../../assets/images/dokyungja_09.mp4';
// Helper to compose Character + Device visual
// (Code moved to StoryVisual inside StoryItem)



const MockContent = ({ title, color, icon }: { title: string, color: string, icon?: string }) => (
    <div className={`w-full h-full ${color} flex flex-col items-center justify-center p-6 text-center space-y-4`}>
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-lg">
            {icon || "✨"}
        </div>
        <div>
            <h4 className="text-white text-2xl font-bold tracking-tight">{title}</h4>
            <div className="mt-3 w-12 h-1 bg-white/40 rounded-full mx-auto" />
        </div>
    </div>
);

const stories = [
    {
        id: 'tech',
        title: 'AI × Engineering',
        desc: '단순한 코딩을 넘어,\nAI와 함께 아키텍처를 설계합니다.\nAnti-Gravity와 함께 생산성의 한계를 시험하고,\n새로운 기술의 파도를 가장 먼저 섭렵합니다.',
        device: 'mac',
        char: asset09,
        isVideo: true,
        content: <MockContent title="AI-Assisted Dev" color="bg-gradient-to-br from-slate-900 to-indigo-900" icon="🤖" />
    },
    {
        id: 'economy',
        title: 'Data Insight & AI',
        desc: '방대한 시장 데이터를 AI 에이전트로 분석하여\n남들이 보지 못하는 흐름을 읽어냅니다.\n감각이 아닌 데이터로 증명하는 경제 인사이트.',
        device: 'ipad',
        char: asset04,
        content: <MockContent title="Market Intelligence" color="bg-gradient-to-br from-red-800 to-rose-900" icon="📊" />
    },
    {
        id: 'shop',
        title: 'Curated by Algorithm',
        desc: '나의 취향 데이터와 트렌드 분석 AI가 만났습니다.\n수많은 제품 홍수 속에서\n정말 가치 있는 물건만을 큐레이션합니다.',
        device: 'iphone',
        char: asset03,
        content: <MockContent title="Smart Select Shop" color="bg-gradient-to-br from-purple-800 to-fuchsia-900" icon="🛍️" />
    },
    {
        id: 'art',
        title: 'Generative Creativity',
        desc: '인간의 상상력에 AI의 표현력을 더했습니다.\n프롬프트 엔지니어링으로 그려내는\n새로운 차원의 예술 세계를 경험하세요.',
        device: 'ipad',
        char: asset05,
        content: <MockContent title="AI Art Gallery" color="bg-gradient-to-br from-emerald-800 to-teal-900" icon="🎨" />
    }
];

// Helper to compose Character + Device visual
const StoryVisual = ({ charImg, isVideo }: { charImg: string, deviceType?: string, isVideo?: boolean }) => {
    return (
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
            {/* Character (Main) */}
            {isVideo ? (
                <motion.video
                    src={charImg}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain relative z-20 drop-shadow-xl"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1.1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                />
            ) : (
                <motion.img
                    src={charImg}
                    alt="Character"
                    className="w-full h-full object-contain relative z-20 drop-shadow-xl"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1.1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                />
            )}
        </div>
    );
};

function StoryItem({ story, index }: { story: typeof stories[0], index: number }) {
    const ref = useRef(null);
    const isEven = index % 2 === 0;

    return (
        <div
            id={`journey-${story.id}`}
            ref={ref}
            className="min-h-[50vh] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 py-16 md:py-32 relative scroll-mt-20"
        >
            {/* Background Spot */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r ${isEven ? 'from-blue-200/20 to-purple-200/20' : 'from-orange-200/20 to-pink-200/20'} dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl -z-10`} />

            {/* Visual Section */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-10%" }}
                transition={{ duration: 0.8 }}
                className={`w-full md:w-1/2 flex justify-center px-4 ${isEven ? 'md:order-1' : 'md:order-2'}`}
            >
                <StoryVisual charImg={story.char} deviceType={story.device} isVideo={story.isVideo} />
            </motion.div>

            {/* Text Section */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`w-full md:w-1/2 text-center ${isEven ? 'md:text-left md:order-2' : 'md:text-right md:order-1'} px-8`}
            >
                <h3 className="text-4xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70">
                    {story.title}
                </h3>
                <p className="text-xl md:text-3xl text-muted-foreground whitespace-pre-line leading-relaxed font-medium">
                    {story.desc}
                </p>
                <Link
                    to={`/journey/${story.id}`}
                    onClick={() => sessionStorage.setItem('journeyScrollY', window.scrollY.toString())}
                    className="inline-block mt-10 px-10 py-4 rounded-full border border-primary/20 bg-background/50 hover:bg-primary hover:text-primary-foreground backdrop-blur-sm transition-all text-xl font-bold shadow-lg"
                >
                    More Detail →
                </Link>
            </motion.div>
        </div>
    );
}

export function JourneyMap() {
    return (
        <section id="journey" className="relative bg-background overflow-hidden scroll-mt-16">
            <div className="max-w-7xl mx-auto pb-32">
                <div className="py-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black mb-4 tracking-tighter"
                    >
                        My Journey
                    </motion.h2>
                    <p className="text-xl text-muted-foreground">도경자가 걸어온 길을 소개합니다.</p>
                </div>

                <div className="flex flex-col">
                    {stories.map((story, index) => (
                        <StoryItem key={story.id} story={story} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
