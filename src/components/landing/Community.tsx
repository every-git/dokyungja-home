import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Plus } from 'lucide-react';
import asset02 from '../../assets/images/dokyungja_02.webp';
import asset07 from '../../assets/images/dokyungja_07.webp';
import asset08 from '../../assets/images/dokyungja_08.webp';
import asset10 from '../../assets/images/dokyungja_10.webp';
import PostCard from '../board/PostCard';
import MasonryGrid from '../board/MasonryGrid';
import WriteModal from '../board/WriteModal';

// Apple-style cubic bezier easing
const appleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

interface Comment {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    nickname: string;
    like_count?: number;
    dislike_count?: number;
}

interface Post {
    id: string;
    content: string;
    created_at: string;
    view_count: number;
    user_id: string;
    nickname: string;
    type: 'general' | 'poll' | 'link';
    like_count?: number;
    dislike_count?: number;
    comment_count?: number;
    image_urls?: string[];
    dummyComments?: Comment[];
    meta_data?: any; // { url } for link, { options, end_date, is_anonymous } for poll
}

export function Community() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Cards start upright (0deg) and tilt as you scroll
    const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 8, 15]);
    const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

    // Individual card rotations for more dynamic effect
    const rotateLeft = useTransform(scrollYProgress, [0, 0.5, 1], [0, -5, -12]);
    const rotateRight = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 12]);

    // 더미 댓글 데이터
    interface Comment {
        id: string;
        content: string;
        created_at: string;
        user_id: string;
        nickname: string;
        like_count?: number;
        dislike_count?: number;
    }

    // 더미 게시글 데이터
    const dummyPosts: Post[] = [
        {
            id: '1',
            content: '오늘 타자 연습하면서 새로운 단축키를 배웠어요! ⌘ + K로 명령 팔레트를 열 수 있다니... 이제 훨씬 빠르게 작업할 수 있을 것 같아요. 여러분도 자주 쓰는 단축키가 있나요?',
            created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30분 전
            view_count: 42,
            user_id: 'user-1',
            nickname: '타자왕',
            type: 'general',
            like_count: 12,
            dislike_count: 0,
            comment_count: 5,
            dummyComments: [
                {
                    id: 'c1-1',
                    content: '⌘ + Shift + P도 유용해요! 명령 팔레트의 확장 버전이에요.',
                    created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
                    user_id: 'user-a',
                    nickname: '단축키마스터',
                    like_count: 3,
                    dislike_count: 0,
                },
                {
                    id: 'c1-2',
                    content: '저는 ⌘ + B로 사이드바 토글하는 게 가장 많이 쓰는 단축키네요.',
                    created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
                    user_id: 'user-b',
                    nickname: '코딩러버',
                    like_count: 2,
                    dislike_count: 0,
                },
                {
                    id: 'c1-3',
                    content: '좋은 정보 감사합니다! 바로 적용해볼게요.',
                    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
                    user_id: 'user-c',
                    nickname: '초보개발자',
                    like_count: 1,
                    dislike_count: 0,
                },
            ],
        },
        {
            id: '2',
            content: '최근 AI 개발 트렌드에 대해 정리한 글입니다. GPT-4o, Claude 3.5, 그리고 Gemini의 차이점과 각각의 장단점을 비교해봤어요. 특히 멀티모달 처리 능력이 인상적이었습니다.',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2시간 전
            view_count: 128,
            user_id: 'user-2',
            nickname: '개발자',
            type: 'link',
            like_count: 28,
            dislike_count: 1,
            comment_count: 12,
            meta_data: {
                url: 'https://openai.com/research/gpt-4',
                title: 'GPT-4o: 멀티모달 AI의 새로운 지평',
                description: 'OpenAI의 최신 모델 GPT-4o는 이미지, 텍스트, 오디오를 동시에 처리할 수 있는 혁신적인 멀티모달 AI입니다.',
                image: null,
            },
            dummyComments: [
                {
                    id: 'c2-1',
                    content: 'Claude 3.5가 코드 작성 면에서 가장 뛰어난 것 같아요.',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
                    user_id: 'user-d',
                    nickname: 'AI연구원',
                    like_count: 8,
                    dislike_count: 0,
                },
                {
                    id: 'c2-2',
                    content: 'GPT-4o의 멀티모달 기능이 정말 인상적이에요. 이미지와 텍스트를 동시에 처리하는 게 신기합니다.',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
                    user_id: 'user-e',
                    nickname: '멀티모달러',
                    like_count: 5,
                    dislike_count: 1,
                },
                {
                    id: 'c2-3',
                    content: 'Gemini는 한국어 처리 능력이 좋은 것 같아요.',
                    created_at: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
                    user_id: 'user-f',
                    nickname: '언어학자',
                    like_count: 4,
                    dislike_count: 0,
                },
            ],
        },
        {
            id: '3',
            content: '다음 프로젝트에서 어떤 프레임워크를 사용할까요? React vs Vue vs Svelte - 각각의 장단점을 고려해서 투표해주세요!',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5시간 전
            view_count: 89,
            user_id: 'user-3',
            nickname: '프론트엔드',
            type: 'poll',
            like_count: 15,
            dislike_count: 0,
            comment_count: 8,
            meta_data: {
                options: [
                    { id: 'opt-1', text: 'React - 가장 널리 쓰이고 생태계가 풍부함', vote_count: 8 },
                    { id: 'opt-2', text: 'Vue - 학습 곡선이 완만하고 직관적임', vote_count: 5 },
                    { id: 'opt-3', text: 'Svelte - 번들 크기가 작고 성능이 우수함', vote_count: 3 },
                ],
                end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7일 후
                is_anonymous: false,
            },
            dummyComments: [
                {
                    id: 'c3-1',
                    content: 'React가 가장 널리 쓰이고 있어서 협업하기 좋을 것 같아요.',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
                    user_id: 'user-g',
                    nickname: '팀리더',
                    like_count: 6,
                    dislike_count: 0,
                },
                {
                    id: 'c3-2',
                    content: 'Svelte는 번들 크기가 작아서 성능이 좋아요!',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3.5).toISOString(),
                    user_id: 'user-h',
                    nickname: '성능최적화',
                    like_count: 4,
                    dislike_count: 0,
                },
            ],
        },
        {
            id: '4',
            content: '경제 뉴스 분석: 최근 금리 인하 기대감이 높아지고 있는데, 이게 주식 시장에 미치는 영향은 어떨까요? 특히 테크 주식들의 움직임이 눈에 띄네요.',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12시간 전
            view_count: 156,
            user_id: 'user-4',
            nickname: '경제분석가',
            type: 'general',
            like_count: 34,
            dislike_count: 2,
            comment_count: 18,
            dummyComments: [
                {
                    id: 'c4-1',
                    content: '테크 주식들이 반등할 가능성이 높아 보입니다.',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(),
                    user_id: 'user-i',
                    nickname: '투자자',
                    like_count: 12,
                    dislike_count: 1,
                },
                {
                    id: 'c4-2',
                    content: '금리 인하는 부동산 시장에도 영향을 줄 것 같아요.',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
                    user_id: 'user-j',
                    nickname: '부동산전문가',
                    like_count: 8,
                    dislike_count: 0,
                },
                {
                    id: 'c4-3',
                    content: '좋은 분석 감사합니다. 참고하겠습니다!',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
                    user_id: 'user-k',
                    nickname: '경제학도',
                    like_count: 3,
                    dislike_count: 0,
                },
            ],
        },
        {
            id: '5',
            content: '유용한 개발 도구 추천: Raycast를 사용해보니 정말 편리하네요! Spotlight보다 훨씬 강력하고 확장 가능합니다. 특히 워크플로우 자동화 기능이 인상적이에요.',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1일 전
            view_count: 203,
            user_id: 'user-5',
            nickname: '도구수집가',
            type: 'link',
            like_count: 45,
            dislike_count: 0,
            comment_count: 22,
            meta_data: {
                url: 'https://www.raycast.com',
                title: 'Raycast - Mac을 위한 강력한 생산성 도구',
                description: 'Spotlight를 대체할 수 있는 강력한 런처이자 워크플로우 자동화 도구입니다. 확장 기능으로 무한한 가능성을 제공합니다.',
                image: null,
            },
            dummyComments: [
                {
                    id: 'c5-1',
                    content: 'Raycast 확장 기능들이 정말 다양하네요! 추천해주셔서 감사합니다.',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
                    user_id: 'user-l',
                    nickname: '생산성중독',
                    like_count: 15,
                    dislike_count: 0,
                },
                {
                    id: 'c5-2',
                    content: '워크플로우 자동화가 정말 편리해요. 시간을 많이 절약할 수 있네요.',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
                    user_id: 'user-m',
                    nickname: '자동화러버',
                    like_count: 10,
                    dislike_count: 0,
                },
                {
                    id: 'c5-3',
                    content: 'Alfred와 비교하면 어떤가요?',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString(),
                    user_id: 'user-n',
                    nickname: '도구비교',
                    like_count: 7,
                    dislike_count: 0,
                },
            ],
        },
        {
            id: '6',
            content: '오늘의 트렌드 수집: WebAssembly가 점점 더 주목받고 있네요. 특히 서버리스 환경에서의 성능 향상이 기대됩니다. 여러분은 어떻게 생각하시나요?',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 36시간 전
            view_count: 98,
            user_id: 'user-6',
            nickname: '트렌드헌터',
            type: 'general',
            like_count: 19,
            dislike_count: 1,
            comment_count: 7,
            dummyComments: [
                {
                    id: 'c6-1',
                    content: 'WebAssembly는 정말 미래가 밝아 보여요. 브라우저 성능이 크게 향상될 것 같습니다.',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 35).toISOString(),
                    user_id: 'user-o',
                    nickname: '웹개발자',
                    like_count: 5,
                    dislike_count: 0,
                },
                {
                    id: 'c6-2',
                    content: '서버리스와 결합하면 정말 강력할 것 같아요.',
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 34).toISOString(),
                    user_id: 'user-p',
                    nickname: '서버리스팬',
                    like_count: 3,
                    dislike_count: 0,
                },
            ],
        },
    ];

    // 게시판 상태 관리
    const [userPosts, setUserPosts] = useState<Post[]>([]); // 사용자가 작성한 글 (새로고침 시 사라짐)
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

    // 더미 게시글과 사용자 게시글 합치기
    const allPosts = [...userPosts, ...dummyPosts];

    // 게시글 작성 핸들러 (로컬 스토리지에 저장하지 않음)
    const handlePostSubmit = useCallback((newPost: { content: string; type: 'general' | 'poll' | 'link'; meta_data?: any }) => {
        const post: Post = {
            id: `user-${Date.now()}`,
            content: newPost.content,
            created_at: new Date().toISOString(),
            view_count: 0,
            user_id: 'current-user',
            nickname: '나',
            type: newPost.type,
            like_count: 0,
            dislike_count: 0,
            comment_count: 0,
            meta_data: newPost.meta_data,
        };

        setUserPosts(prev => [post, ...prev]);
    }, []);

    const handleToggleExpand = useCallback((postId: string) => {
        setExpandedPostId(prevId => prevId === postId ? null : postId);
    }, []);

    return (
        <section ref={containerRef} className="relative py-32 overflow-hidden bg-black text-white">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/40 rounded-full blur-[120px]" />
            </div>

            {/* Floating Write Button - FloatingNav 위에 표시되도록 z-50보다 높게 */}
            <button
                onClick={() => setIsWriteModalOpen(true)}
                className="fixed bottom-[196px] right-6 z-[60] p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                aria-label="글쓰기"
            >
                <Plus size={24} />
            </button>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Text Content - Narrative Intro */}
                    <div className="space-y-8 relative z-[50] pl-0 lg:pl-24 lg:pr-4">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: appleEase }}
                            className="relative bg-black/80 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 shadow-2xl"
                        >
                            <span className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-semibold tracking-wider mb-4 text-purple-300">
                                COMMUNITY
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6">
                                Small but <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    Sharp.
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                                우리는 단순히 모여있는 것이 아닙니다.<br />
                                함께 <strong>타자 실력</strong>을 겨루고,<br />
                                <strong>최신 IT/경제 뉴스</strong>를 분석하며,<br />
                                매일 새로운 <strong>트렌드</strong>를 수집합니다.
                            </p>
                        </motion.div>

                        <div className="flex gap-4 pt-4">
                            <span className="text-gray-500 text-sm animate-pulse">
                                스크롤하여 커뮤니티 활동을 확인해보세요 ↓
                            </span>
                        </div>

                        {/* Stats or Social Proof */}
                        <div className="flex items-center gap-8 pt-8 border-t border-white/10">
                            <div>
                                <h4 className="text-3xl font-bold">Private</h4>
                                <p className="text-sm text-gray-500">Group</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold">Shared</h4>
                                <p className="text-sm text-gray-500">Knowledge</p>
                            </div>
                        </div>
                    </div>

                    {/* Visuals - Cards that tilt on scroll */}
                    <div className="relative perspective-[1000px]">
                        <motion.div
                            style={{ y }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {/* Left Column - tilts left */}
                            <motion.div
                                style={{ rotate: rotateLeft }}
                                className="space-y-4 mt-12 origin-bottom"
                            >
                                <Card img={asset07} label="Creator" delay={0} />
                                <Card img={asset02} label="Analyst" delay={0.1} />
                            </motion.div>

                            {/* Right Column - tilts right */}
                            <motion.div
                                style={{ rotate: rotateRight }}
                                className="space-y-4 origin-bottom"
                            >
                                <Card img={asset08} label="Engineer" delay={0.2} />
                                <Card img={asset10} label="Visionary" delay={0.3} />
                            </motion.div>
                        </motion.div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                    </div>
                </div>

                {/* 게시판 섹션 */}
                <div className="mt-32 pt-16 border-t border-white/10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: appleEase }}
                        className="mb-8"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            커뮤니티 게시판
                        </h3>
                        <p className="text-gray-400 text-lg">
                            함께 소통하고 지식을 나누는 공간입니다.
                        </p>
                    </motion.div>

                    {/* 게시글 목록 */}
                    {allPosts.length > 0 ? (
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <MasonryGrid>
                                {allPosts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        isExpanded={expandedPostId === post.id}
                                        onToggleExpand={() => handleToggleExpand(post.id)}
                                    />
                                ))}
                            </MasonryGrid>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center"
                        >
                            <p className="text-gray-400 text-lg mb-4">
                                아직 게시글이 없습니다.
                            </p>
                            <p className="text-gray-500 text-sm">
                                우측 하단의 <span className="text-blue-400">+</span> 버튼을 눌러 첫 게시글을 작성해보세요!
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* 글쓰기 모달 */}
            <WriteModal
                isOpen={isWriteModalOpen}
                onClose={() => setIsWriteModalOpen(false)}
                onSubmit={handlePostSubmit}
            />
        </section>
    );
}

function Card({ img, label, delay = 0 }: { img: string, label: string, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.1, 0.25, 1.0] // Apple-style ease
            }}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
            }}
            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm aspect-[3/4] shadow-xl"
        >
            <img
                src={img}
                alt={label}
                loading="lazy"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-white font-medium text-sm">{label}</span>
            </div>
        </motion.div>
    );
}
