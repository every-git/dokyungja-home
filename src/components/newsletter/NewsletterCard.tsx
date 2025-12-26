import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ExternalLink } from 'lucide-react';

interface Newsletter {
    id: number;
    title: string;
    summary: string;
    originalUrl: string;
    source: string;
    thumbnailUrl?: string;
    category: string;
    tags: string[];
    publishedAt: string;
    viewCount: number;
}

interface NewsletterCardProps {
    newsletter: Newsletter;
}

const categoryColors: Record<string, string> = {
    // IT 카테고리
    AI: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    Frontend: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    Backend: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    Mobile: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    DevOps: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    General: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    // 경제 카테고리
    '증권': 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
    '부동산': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    '금융': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    '산업': 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
    '거시경제': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    '글로벌': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
};

export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
    const categoryColor = categoryColors[newsletter.category] || categoryColors.General;
    const date = new Date(newsletter.publishedAt);
    const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: ko });

    return (
        <a
            href={newsletter.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor} flex-shrink-0`}>
                    {newsletter.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {timeAgo}
                </span>
            </div>

            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {newsletter.title}
            </h3>

            {newsletter.summary && (
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                    {newsletter.summary}
                </p>
            )}

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">{newsletter.source}</span>
                <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
        </a>
    );
}

