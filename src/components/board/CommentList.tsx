import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';

interface Comment {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    nickname: string;
    like_count?: number;
    dislike_count?: number;
}

interface CommentListProps {
    postId: string;
    dummyComments: Comment[];
    onCommentAdded?: (delta: number) => void;
}

export default function CommentList({ postId, dummyComments, onCommentAdded }: CommentListProps) {
    const [userComments, setUserComments] = useState<Comment[]>([]); // 사용자가 작성한 댓글 (새로고침 시 사라짐)
    const [newComment, setNewComment] = useState('');
    const [commentVotes, setCommentVotes] = useState<Record<string, number>>({});

    // 더미 댓글과 사용자 댓글 합치기
    const allComments = [...userComments, ...dummyComments];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: `user-comment-${Date.now()}`,
            content: newComment.trim(),
            created_at: new Date().toISOString(),
            user_id: 'current-user',
            nickname: '나',
            like_count: 0,
            dislike_count: 0,
        };

        setUserComments(prev => [comment, ...prev]);
        setNewComment('');
        onCommentAdded?.(1);
    };

    const handleReaction = (commentId: string, type: 1 | -1) => {
        const currentVote = commentVotes[commentId] || 0;
        const newVote = currentVote === type ? 0 : type;
        setCommentVotes(prev => ({ ...prev, [commentId]: newVote }));
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                댓글 {allComments.length}개
            </div>

            {/* 댓글 작성 폼 */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Send size={16} />
                        작성
                    </button>
                </div>
            </form>

            {/* 댓글 목록 */}
            <div className="space-y-4">
                {allComments.map((comment) => {
                    const userVote = commentVotes[comment.id] || 0;
                    // 더미 댓글의 기본 좋아요/싫어요 수 + 사용자 투표 반영
                    const baseLikes = comment.like_count || 0;
                    const baseDislikes = comment.dislike_count || 0;
                    
                    // 사용자가 투표한 경우에만 표시 숫자 변경 (간단한 optimistic update)
                    const likes = userVote === 1 ? baseLikes + 1 : (userVote === -1 && baseLikes > 0 ? baseLikes - 1 : baseLikes);
                    const dislikes = userVote === -1 ? baseDislikes + 1 : (userVote === 1 && baseDislikes > 0 ? baseDislikes - 1 : baseDislikes);

                    return (
                        <div key={comment.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                {comment.nickname?.[0] || '?'}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {comment.nickname}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ko })}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    {comment.content}
                                </p>
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleReaction(comment.id, 1)}
                                        className={`flex items-center gap-1 text-xs transition-colors ${
                                            userVote === 1 ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
                                        }`}
                                    >
                                        <ThumbsUp size={14} fill={userVote === 1 ? "currentColor" : "none"} />
                                        <span>{likes}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleReaction(comment.id, -1)}
                                        className={`flex items-center gap-1 text-xs transition-colors ${
                                            userVote === -1 ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                                        }`}
                                    >
                                        <ThumbsDown size={14} fill={userVote === -1 ? "currentColor" : "none"} />
                                        <span>{dislikes}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {allComments.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                    아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
                </div>
            )}
        </div>
    );
}

