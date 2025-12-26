import { useState } from 'react';
import { X } from 'lucide-react';

interface WriteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (post: { content: string; type: 'general' | 'poll' | 'link'; meta_data?: any }) => void;
}

export default function WriteModal({ isOpen, onClose, onSubmit }: WriteModalProps) {
    const [content, setContent] = useState('');
    const [type, setType] = useState<'general' | 'poll' | 'link'>('general');
    
    // Link type fields
    const [linkUrl, setLinkUrl] = useState('');
    
    // Poll type fields
    const [pollOptions, setPollOptions] = useState(['', '']);
    const [pollEndDate, setPollEndDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString().slice(0, 16);
    });
    const [isAnonymous, setIsAnonymous] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }

        // Link type validation
        if (type === 'link' && !linkUrl.trim()) {
            alert('링크 URL을 입력해주세요.');
            return;
        }

        // Poll type validation
        if (type === 'poll') {
            const validOptions = pollOptions.filter(opt => opt.trim());
            if (validOptions.length < 2) {
                alert('투표 항목을 최소 2개 이상 입력해주세요.');
                return;
            }
        }

        const postData: any = { content: content.trim(), type };
        
        if (type === 'link') {
            postData.meta_data = { url: linkUrl.trim() };
        } else if (type === 'poll') {
            const validOptions = pollOptions.filter(opt => opt.trim());
            postData.meta_data = {
                options: validOptions.map((text, idx) => ({ id: `opt-${idx}`, text, vote_count: 0 })),
                end_date: new Date(pollEndDate).toISOString(),
                is_anonymous: isAnonymous,
            };
        }

        onSubmit(postData);
        setContent('');
        setType('general');
        setLinkUrl('');
        setPollOptions(['', '']);
        setIsAnonymous(false);
        onClose();
    };

    const addPollOption = () => {
        setPollOptions([...pollOptions, '']);
    };

    const removePollOption = (index: number) => {
        if (pollOptions.length > 2) {
            setPollOptions(pollOptions.filter((_, i) => i !== index));
        }
    };

    const updatePollOption = (index: number, value: string) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">새 게시글 작성</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Type Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            게시글 유형
                        </label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setType('general')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                    type === 'general'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                일반
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('poll')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                    type === 'poll'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                투표
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('link')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                    type === 'link'
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                꿀정보
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            내용
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="게시글 내용을 입력하세요..."
                            className="w-full h-48 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            required
                        />
                    </div>

                    {/* Link URL (for link type) */}
                    {type === 'link' && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                링크 URL <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="url"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                required
                            />
                        </div>
                    )}

                    {/* Poll Options (for poll type) */}
                    {type === 'poll' && (
                        <div className="mb-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    투표 항목 <span className="text-red-500">*</span> (최소 2개)
                                </label>
                                <div className="space-y-2">
                                    {pollOptions.map((option, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => updatePollOption(index, e.target.value)}
                                                placeholder={`항목 ${index + 1}`}
                                                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                            {pollOptions.length > 2 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removePollOption(index)}
                                                    className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
                                                    삭제
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={addPollOption}
                                    className="mt-2 px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                                >
                                    + 항목 추가
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    종료 일시
                                </label>
                                <input
                                    type="datetime-local"
                                    value={pollEndDate}
                                    onChange={(e) => setPollEndDate(e.target.value)}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isAnonymous"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                />
                                <label htmlFor="isAnonymous" className="text-sm text-gray-700 dark:text-gray-300">
                                    익명 투표
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold"
                        >
                            작성하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

