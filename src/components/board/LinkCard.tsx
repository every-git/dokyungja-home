import { useState, useEffect } from 'react';
import { Loader2, ExternalLink } from 'lucide-react';

interface LinkCardProps {
    metaData: any; // { url, title?, description?, image? }
    likeCount?: number;
    commentCount?: number;
}

// 좋아요 + 댓글 수를 합산하여 12단계 색상 강도 계산
const getColorLevel = (likeCount: number, commentCount: number): number => {
    const score = likeCount + commentCount;
    return Math.min(Math.floor(score) + 1, 12);
};

// 12단계 색상 스타일 (에메랄드 계열)
const getColorStyle = (level: number) => {
    const styles = [
        { bg: 'bg-emerald-50/50 dark:bg-emerald-950/10', border: 'border-emerald-100/50 dark:border-emerald-900/30', hoverBorder: 'hover:border-emerald-200/60 dark:hover:border-emerald-800/40', imageBg: 'bg-emerald-50 dark:bg-emerald-950/20', textHover: 'group-hover:text-emerald-400 dark:group-hover:text-emerald-500' },
        { bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-100 dark:border-emerald-900/40', hoverBorder: 'hover:border-emerald-200 dark:hover:border-emerald-800/50', imageBg: 'bg-emerald-100/50 dark:bg-emerald-900/20', textHover: 'group-hover:text-emerald-500 dark:group-hover:text-emerald-400' },
        { bg: 'bg-emerald-100/50 dark:bg-emerald-900/20', border: 'border-emerald-150 dark:border-emerald-800/50', hoverBorder: 'hover:border-emerald-250 dark:hover:border-emerald-700/60', imageBg: 'bg-emerald-100 dark:bg-emerald-900/30', textHover: 'group-hover:text-emerald-500 dark:group-hover:text-emerald-400' },
        { bg: 'bg-emerald-100 dark:bg-emerald-900/30', border: 'border-emerald-200 dark:border-emerald-800/60', hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700', imageBg: 'bg-emerald-150 dark:bg-emerald-800/40', textHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400' },
        { bg: 'bg-emerald-150 dark:bg-emerald-800/40', border: 'border-emerald-250 dark:border-emerald-700/70', hoverBorder: 'hover:border-emerald-350 dark:hover:border-emerald-600', imageBg: 'bg-emerald-200 dark:bg-emerald-800/50', textHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-300' },
        { bg: 'bg-emerald-200 dark:bg-emerald-800/50', border: 'border-emerald-300 dark:border-emerald-700', hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-600', imageBg: 'bg-emerald-250 dark:bg-emerald-700/60', textHover: 'group-hover:text-emerald-700 dark:group-hover:text-emerald-300' },
        { bg: 'bg-emerald-250 dark:bg-emerald-700/60', border: 'border-emerald-350 dark:border-emerald-600/80', hoverBorder: 'hover:border-emerald-450 dark:hover:border-emerald-500', imageBg: 'bg-emerald-300 dark:bg-emerald-700/70', textHover: 'group-hover:text-emerald-700 dark:group-hover:text-emerald-200' },
        { bg: 'bg-emerald-300 dark:bg-emerald-700/70', border: 'border-emerald-400 dark:border-emerald-600', hoverBorder: 'hover:border-emerald-500 dark:hover:border-emerald-500', imageBg: 'bg-emerald-350 dark:bg-emerald-600/80', textHover: 'group-hover:text-emerald-800 dark:group-hover:text-emerald-200' },
        { bg: 'bg-emerald-350 dark:bg-emerald-600/80', border: 'border-emerald-450 dark:border-emerald-500/90', hoverBorder: 'hover:border-emerald-550 dark:hover:border-emerald-400', imageBg: 'bg-emerald-400 dark:bg-emerald-600', textHover: 'group-hover:text-emerald-800 dark:group-hover:text-emerald-100' },
        { bg: 'bg-emerald-400 dark:bg-emerald-600', border: 'border-emerald-500 dark:border-emerald-500', hoverBorder: 'hover:border-emerald-600 dark:hover:border-emerald-400', imageBg: 'bg-emerald-450 dark:bg-emerald-500', textHover: 'group-hover:text-emerald-900 dark:group-hover:text-emerald-100' },
        { bg: 'bg-emerald-500 dark:bg-emerald-500', border: 'border-emerald-600 dark:border-emerald-400', hoverBorder: 'hover:border-emerald-700 dark:hover:border-emerald-300', imageBg: 'bg-emerald-550 dark:bg-emerald-400', textHover: 'group-hover:text-emerald-950 dark:group-hover:text-white' },
        { bg: 'bg-emerald-600 dark:bg-emerald-400', border: 'border-emerald-700 dark:border-emerald-300', hoverBorder: 'hover:border-emerald-800 dark:hover:border-emerald-200', imageBg: 'bg-emerald-700 dark:bg-emerald-300', textHover: 'group-hover:text-white dark:group-hover:text-emerald-950' },
    ];
    return styles[level - 1] || styles[0];
};

export default function LinkCard({ metaData, likeCount = 0, commentCount = 0 }: LinkCardProps) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const colorLevel = getColorLevel(likeCount, commentCount);
    const colors = getColorStyle(colorLevel);

    useEffect(() => {
        if (metaData?.url) {
            // 메타데이터가 이미 있으면 사용, 없으면 URL만 표시
            if (metaData.title || metaData.description || metaData.image) {
                setData({
                    url: metaData.url,
                    title: metaData.title || metaData.url,
                    description: metaData.description,
                    image: metaData.image,
                });
                setLoading(false);
            } else {
                // 간단한 URL 파싱
                try {
                    const url = new URL(metaData.url);
                    setData({
                        url: metaData.url,
                        title: url.hostname,
                        description: metaData.url,
                        image: null,
                    });
                } catch {
                    setData({
                        url: metaData.url,
                        title: metaData.url,
                        description: '',
                        image: null,
                    });
                }
                setLoading(false);
            }
        }
    }, [metaData]);

    if (!metaData?.url) return null;

    if (loading) {
        return (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2 text-gray-500">
                <Loader2 className="animate-spin" size={16} />
                <span className="text-xs">링크 정보 불러오는 중...</span>
            </div>
        );
    }

    const displayData = data || { url: metaData.url, title: metaData.url, description: '', image: null };

    return (
        <a
            href={displayData.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block mt-4 group ${colors.bg} rounded-lg overflow-hidden border ${colors.border} ${colors.hoverBorder} transition-all shadow-sm hover:shadow-md`}
        >
            {displayData.image && (
                <div className={`h-48 overflow-hidden ${colors.imageBg}`}>
                    <img
                        src={displayData.image}
                        alt={displayData.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </div>
            )}
            <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-bold text-gray-900 dark:text-gray-100 text-base line-clamp-1 flex-1 ${colors.textHover} transition-colors`}>
                        {displayData.title}
                    </h3>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-emerald-500 transition-colors flex-shrink-0 mt-0.5" />
                </div>
                {displayData.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                        {displayData.description}
                    </p>
                )}
                <div className="text-xs text-gray-400 flex items-center gap-1">
                    🔗 {(() => {
                        try {
                            return new URL(displayData.url).hostname;
                        } catch {
                            return displayData.url;
                        }
                    })()}
                </div>
            </div>
        </a>
    );
}

