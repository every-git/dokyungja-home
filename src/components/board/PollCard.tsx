import { useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface PollCardProps {
    postId: string;
    metaData: any; // { options: [{ id, text }], end_date, is_anonymous }
    currentUserId?: string;
    currentUserNickname?: string;
}

export default function PollCard({ postId, metaData, currentUserId, currentUserNickname }: PollCardProps) {
    // 로컬 상태로 투표 관리 (새로고침 시 사라짐)
    const [userVotes, setUserVotes] = useState<Record<string, string>>({}); // postId -> optionId
    const [voteCounts, setVoteCounts] = useState<Record<string, number>>(() => {
        // 초기 투표 수 (더미 데이터용)
        const initial: Record<string, number> = {};
        if (metaData?.options) {
            metaData.options.forEach((opt: any) => {
                initial[opt.id] = opt.vote_count || 0;
            });
        }
        return initial;
    });

    const isExpired = metaData?.end_date ? new Date(metaData.end_date) < new Date() : false;
    const options = metaData?.options || [];
    const userVote = userVotes[postId] || null;

    const handleVote = (optionId: string, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (isExpired) {
            alert('투표가 종료되었습니다.');
            return;
        }

        if (userVote === optionId) {
            return; // 이미 선택한 항목
        }

        // Optimistic update
        const prevVote = userVote;
        setUserVotes(prev => ({ ...prev, [postId]: optionId }));

        // 투표 수 업데이트
        setVoteCounts(prev => {
            const newCounts = { ...prev };
            if (prevVote) {
                // 이전 투표 취소
                newCounts[prevVote] = (newCounts[prevVote] || 0) - 1;
            }
            // 새 투표 추가
            newCounts[optionId] = (newCounts[optionId] || 0) + 1;
            return newCounts;
        });
    };

    const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);

    return (
        <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800/50">
            <div className="flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {isExpired ? '투표 종료' : '진행 중'}
                </span>
                <span>{metaData?.is_anonymous ? '익명 투표' : '실명 투표'}</span>
            </div>

            <div className="space-y-2">
                {options.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        투표 항목이 없습니다.
                    </div>
                ) : (
                    options.map((opt: any) => {
                        const voteCount = voteCounts[opt.id] || 0;
                        const percentage = totalVotes === 0 ? 0 : Math.round((voteCount / totalVotes) * 100);
                        const isSelected = userVote === opt.id;

                        return (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={(e) => handleVote(opt.id, e)}
                                disabled={isExpired}
                                className={`relative w-full text-left p-3 rounded-lg border transition-all overflow-hidden
                                    ${isSelected
                                        ? 'border-purple-400 bg-purple-100 dark:bg-purple-900/40 ring-1 ring-purple-400'
                                        : 'border-purple-200 dark:border-purple-700/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/30'}
                                    ${isExpired ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                {/* Progress Bar Background */}
                                {(userVote || isExpired) && (
                                    <div
                                        className="absolute top-0 left-0 bottom-0 bg-purple-200 dark:bg-purple-800/50 transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                )}

                                <div className="relative z-10 flex justify-between items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`font-medium ${isSelected ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-200'}`}>
                                                {opt.text}
                                            </span>
                                            {isSelected && <CheckCircle size={16} className="text-purple-500" />}
                                        </div>
                                    </div>
                                    {(userVote || isExpired) && (
                                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 ml-2">
                                            {percentage}%
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    })
                )}
            </div>

            <div className="mt-3 text-right text-xs text-gray-400">
                총 {totalVotes}명 참여
            </div>
        </div>
    );
}

