import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';

import asset02 from '../../assets/images/dokyungja_02.webp';
import asset03 from '../../assets/images/dokyungja_03.mp4';
import asset04 from '../../assets/images/dokyungja_04.mp4';
import asset05 from '../../assets/images/dokyungja_05.webp';
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
        desc: '단순한 코딩을 넘어,\nAI와 함께 아키텍처를 설계합니다.\n생산성의 한계를 시험하고,\n새로운 기술의 파도를 가장 먼저 섭렵합니다.',
        device: 'mac',
        char: asset09,
        isVideo: true,
        content: <MockContent title="AI-Assisted Dev" color="bg-gradient-to-br from-slate-950 to-slate-900" icon="🤖" />
    },
    {
        id: 'economy',
        title: 'Data Insight & AI',
        desc: '방대한 시장 데이터를 AI 에이전트로 분석하여\n남들이 보지 못하는 흐름을 읽어냅니다.\n감각이 아닌 데이터로 증명하는 경제 인사이트.',
        device: 'ipad',
        char: asset04,
        isVideo: true,
        content: <MockContent title="Market Intelligence" color="bg-gradient-to-br from-slate-950 to-slate-900" icon="📊" />
    },
    {
        id: 'shop',
        title: 'Curated by Algorithm',
        desc: '나의 취향 데이터와 트렌드 분석 AI가 만났습니다.\n수많은 제품 홍수 속에서\n정말 가치 있는 물건만을 큐레이션합니다.',
        device: 'iphone',
        char: asset03,
        isVideo: true,
        content: <MockContent title="Smart Select Shop" color="bg-gradient-to-br from-slate-950 to-slate-900" icon="🛍️" />
    },
    // NOTE: 'Generative Creativity' 섹션은 요구사항에 따라 제거됨
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
            className="min-h-[50vh] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 py-16 md:py-32 relative scroll-mt-20"
        >
            {/* Background Spot */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[620px] md:h-[620px] bg-gradient-to-r ${isEven ? 'from-slate-300/20 to-slate-100/10' : 'from-slate-200/15 to-slate-50/10'} dark:from-white/6 dark:to-white/3 rounded-full blur-3xl -z-10`} />

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
                className={`w-full md:w-1/2 max-w-2xl text-center ${isEven ? 'md:text-left md:order-2' : 'md:text-right md:order-1'} px-6 md:px-12`}
            >
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 break-words">
                    {story.title}
                </h3>
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground whitespace-pre-line leading-relaxed font-medium">
                    {story.desc}
                </p>
                <Link
                    to={`/journey/${story.id}`}
                    onClick={() => sessionStorage.setItem('journeyScrollY', window.scrollY.toString())}
                    className="inline-block mt-8 md:mt-10 px-8 md:px-10 py-3 md:py-4 rounded-full border border-primary/20 bg-background/50 hover:bg-primary hover:text-primary-foreground backdrop-blur-sm transition-all text-lg md:text-xl font-bold shadow-lg"
                >
                    More Detail →
                </Link>
            </motion.div>
        </div>
    );
}

export function JourneyMap() {
    return (
        <section id="journey" className="relative overflow-hidden scroll-mt-16">
            <div className="max-w-7xl mx-auto pb-32">
                <div className="py-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black mb-4 tracking-tighter"
                    >
                        Principles
                    </motion.h2>
                    <p className="text-xl text-muted-foreground">도경자가 추구하는 것.</p>
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
