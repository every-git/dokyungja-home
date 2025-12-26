import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MessageSquare, ThumbsUp, ThumbsDown, User } from 'lucide-react';
import CommentList from './CommentList';
import LinkCard from './LinkCard';
import PollCard from './PollCard';

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

interface PostCardProps {
    post: Post;
    isExpanded: boolean;
    onToggleExpand: () => void;
}

export default function PostCard({ post, isExpanded, onToggleExpand }: PostCardProps) {
    const [likes, setLikes] = useState(post.like_count || 0);
    const [dislikes, setDislikes] = useState(post.dislike_count || 0);
    const [userVote, setUserVote] = useState<number>(0);
    const [commentCount, setCommentCount] = useState(post.comment_count || 0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const handleReaction = (type: 1 | -1) => {
        if (userVote === type) {
            setUserVote(0);
            if (type === 1) setLikes(prev => prev - 1);
            else setDislikes(prev => prev - 1);
        } else {
            setUserVote(type);
            if (type === 1) {
                setLikes(prev => prev + 1);
                if (userVote === -1) setDislikes(prev => prev - 1);
            } else {
                setDislikes(prev => prev + 1);
                if (userVote === 1) setLikes(prev => prev - 1);
            }
        }
    };

    const handleExpand = () => {
        if (!isExpanded) {
            onToggleExpand();
        } else {
            onToggleExpand();
        }
    };

    // 12단계 색상 레벨 계산 (좋아요 + 댓글)
    const getColorLevel = (): number => {
        const score = likes + commentCount;
        return Math.min(Math.floor(score) + 1, 12);
    };

    // 색상 팔레트별 12단계 스타일
    const getPostStyle = () => {
        const level = getColorLevel();

        switch (post.type) {
            case 'poll':
                // 투표글: 보라색 계열
                const purpleStyles = [
                    'bg-purple-50/50 dark:bg-purple-950/10 border-purple-100/50 dark:border-purple-900/30',
                    'bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/40',
                    'bg-purple-100/50 dark:bg-purple-900/20 border-purple-150 dark:border-purple-800/50',
                    'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800/60',
                    'bg-purple-150 dark:bg-purple-800/40 border-purple-250 dark:border-purple-700/70',
                    'bg-purple-200 dark:bg-purple-800/50 border-purple-300 dark:border-purple-700',
                    'bg-purple-250 dark:bg-purple-700/60 border-purple-350 dark:border-purple-600/80',
                    'bg-purple-300 dark:bg-purple-700/70 border-purple-400 dark:border-purple-600',
                    'bg-purple-350 dark:bg-purple-600/80 border-purple-450 dark:border-purple-500/90',
                    'bg-purple-400 dark:bg-purple-600 border-purple-500 dark:border-purple-500',
                    'bg-purple-500 dark:bg-purple-500 border-purple-600 dark:border-purple-400',
                    'bg-purple-600 dark:bg-purple-400 border-purple-700 dark:border-purple-300',
                ];
                return purpleStyles[level - 1] || purpleStyles[0];
            case 'link':
                // 꿀정보: 에메랄드(초록) 계열
                const emeraldStyles = [
                    'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-100/50 dark:border-emerald-900/30',
                    'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40',
                    'bg-emerald-100/50 dark:bg-emerald-900/20 border-emerald-150 dark:border-emerald-800/50',
                    'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800/60',
                    'bg-emerald-150 dark:bg-emerald-800/40 border-emerald-250 dark:border-emerald-700/70',
                    'bg-emerald-200 dark:bg-emerald-800/50 border-emerald-300 dark:border-emerald-700',
                    'bg-emerald-250 dark:bg-emerald-700/60 border-emerald-350 dark:border-emerald-600/80',
                    'bg-emerald-300 dark:bg-emerald-700/70 border-emerald-400 dark:border-emerald-600',
                    'bg-emerald-350 dark:bg-emerald-600/80 border-emerald-450 dark:border-emerald-500/90',
                    'bg-emerald-400 dark:bg-emerald-600 border-emerald-500 dark:border-emerald-500',
                    'bg-emerald-500 dark:bg-emerald-500 border-emerald-600 dark:border-emerald-400',
                    'bg-emerald-600 dark:bg-emerald-400 border-emerald-700 dark:border-emerald-300',
                ];
                return emeraldStyles[level - 1] || emeraldStyles[0];
            default:
                // 일반 게시글: 블루(파란색) 계열
                const blueStyles = [
                    'bg-slate-50/50 dark:bg-slate-900/10 border-slate-100/50 dark:border-slate-800/30',
                    'bg-slate-50 dark:bg-slate-900/20 border-slate-100 dark:border-slate-800/40',
                    'bg-blue-50/50 dark:bg-blue-950/20 border-blue-100/50 dark:border-blue-900/50',
                    'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/60',
                    'bg-blue-100/50 dark:bg-blue-900/40 border-blue-150 dark:border-blue-800/70',
                    'bg-blue-100 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800',
                    'bg-blue-150 dark:bg-blue-800/60 border-blue-250 dark:border-blue-700/80',
                    'bg-blue-200 dark:bg-blue-800/70 border-blue-300 dark:border-blue-700',
                    'bg-blue-250 dark:bg-blue-700/80 border-blue-350 dark:border-blue-600/90',
                    'bg-blue-300 dark:bg-blue-700 border-blue-400 dark:border-blue-600',
                    'bg-blue-400 dark:bg-blue-600 border-blue-500 dark:border-blue-500',
                    'bg-blue-500 dark:bg-blue-500 border-blue-600 dark:border-blue-400',
                ];
                return blueStyles[level - 1] || blueStyles[0];
        }
    };

    return (
        <div className={`${getPostStyle()} rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border break-inside-avoid mb-6`}>
            <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                            {post.nickname?.[0] || '?'}
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    {post.nickname || '익명'}
                                </p>
                            </div>
                            <p className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {post.type !== 'general' && (
                            <span className={`px-2 py-1 rounded text-xs font-bold
                                ${post.type === 'poll' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' : 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'}`}>
                                {post.type === 'poll' ? '투표' : '꿀정보'}
                            </span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div
                    className={`text-gray-800 dark:text-gray-200 text-base leading-relaxed cursor-pointer relative ${isExpanded ? '' : 'line-clamp-4'}`}
                    onClick={handleExpand}
                >
                    {post.content}
                    {!isExpanded && post.content.length > 100 && (
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
                    )}
                </div>

                {/* Images */}
                {post.image_urls && post.image_urls.length > 0 && (
                    <div className="mt-3 mb-4 overflow-x-auto pb-2 flex gap-2 scrollbar-hide">
                        {post.image_urls.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`Attachment ${idx + 1}`}
                                className="h-48 rounded-lg object-cover border border-gray-100 dark:border-gray-700 flex-shrink-0 cursor-zoom-in hover:opacity-90 transition-opacity"
                                loading="lazy"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex(idx);
                                    setIsLightboxOpen(true);
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Dynamic Content based on Type */}
                {post.type === 'poll' && isExpanded && (
                    <PollCard
                        postId={post.id}
                        metaData={post.meta_data}
                        currentUserId={undefined}
                        currentUserNickname={undefined}
                    />
                )}
                {post.type === 'link' && (
                    <LinkCard metaData={post.meta_data} likeCount={likes} commentCount={commentCount} />
                )}

                {/* Comments Section (Visible when expanded) */}
                {isExpanded && (
                    <CommentList
                        postId={post.id}
                        dummyComments={post.dummyComments || []}
                        onCommentAdded={(delta) => setCommentCount(prev => prev + delta)}
                    />
                )}

                {/* Footer Actions */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-gray-400 text-sm">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleReaction(1);
                            }}
                            className={`flex items-center gap-1 transition-all cursor-pointer rounded px-2 py-1 ${
                                userVote === 1 
                                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30' 
                                    : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            <ThumbsUp size={16} fill={userVote === 1 ? "currentColor" : "none"} />
                            <span className="font-medium">{likes}</span>
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleReaction(-1);
                            }}
                            className={`flex items-center gap-1 transition-all cursor-pointer rounded px-2 py-1 ${
                                userVote === -1 
                                    ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30' 
                                    : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            <ThumbsDown size={16} fill={userVote === -1 ? "currentColor" : "none"} />
                            <span className="font-medium">{dislikes}</span>
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleExpand();
                            }}
                            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer rounded px-2 py-1"
                        >
                            <MessageSquare size={16} />
                            <span className="font-medium">{commentCount}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Simple Lightbox */}
            {isLightboxOpen && post.image_urls && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <img
                        src={post.image_urls[lightboxIndex]}
                        alt={`Image ${lightboxIndex + 1}`}
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
