import React, { useEffect, useState } from 'react';
import { LucideNewspaper, LucideExternalLink, LucideRefreshCw } from 'lucide-react';
import { geminiService } from '../services/geminiService';

export const TechNews: React.FC = () => {
  const [news, setNews] = useState<string>('');
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await geminiService.getTechNews();
      setNews(data.text);
      setSources(data.sources);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bg-surface/40 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl group transition-all hover:border-brand-500/30">
      <div className="bg-gradient-to-r from-brand-900/80 to-[#050f1a]/80 p-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center mr-4 border border-brand-500/20 shadow-inner">
            <LucideNewspaper className="text-brand-500" size={20} />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white leading-none">ORIBISERV <span className="text-brand-500">Insights</span></h3>
            <p className="text-[0.6rem] text-muted uppercase tracking-widest mt-1">Live Tech Intelligence</p>
          </div>
        </div>
        <button 
          onClick={fetchNews} 
          disabled={loading}
          className="p-2 text-muted hover:text-brand-500 transition-all hover:bg-brand-500/10 rounded-lg active:scale-90"
          title="Refresh News"
        >
          <LucideRefreshCw size={20} className={loading ? 'animate-spin' : 'hover:rotate-180 transition-transform duration-500'} />
        </button>
      </div>
      
      <div className="p-8">
        {loading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-4 bg-white/5 rounded-full w-3/4"></div>
            <div className="h-4 bg-white/5 rounded-full w-1/2"></div>
            <div className="h-4 bg-white/5 rounded-full w-5/6"></div>
            <div className="h-24 bg-white/5 rounded-2xl w-full"></div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="prose prose-invert prose-sm max-w-none">
               {news.split('\n').map((line, i) => {
                 if (!line.trim()) return null;
                 const isBullet = line.startsWith('-') || line.startsWith('*');
                 return (
                   <p key={i} className={`text-muted leading-relaxed mb-4 ${isBullet ? 'pl-6 relative' : ''}`}>
                     {isBullet && <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_8px_rgba(93,217,234,0.6)]" />}
                     {line.replace(/^[-*]\s*/, '')}
                   </p>
                 );
               })}
            </div>

            {sources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/5">
                <h4 className="text-[0.6rem] font-bold text-brand-500 uppercase tracking-[0.2em] mb-4">Verified Intelligence Sources</h4>
                <div className="flex flex-wrap gap-3">
                  {sources.map((chunk, idx) => {
                    const web = chunk.web;
                    if (!web) return null;
                    return (
                      <a 
                        key={idx} 
                        href={web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white/5 hover:bg-brand-500/10 text-[0.65rem] text-muted hover:text-brand-400 transition-all border border-white/5 hover:border-brand-500/20 group/link"
                      >
                        <LucideExternalLink size={10} className="mr-2 opacity-50 group-hover/link:opacity-100" />
                        <span className="truncate max-w-[150px]">{web.title || new URL(web.uri).hostname}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center text-[0.55rem] text-muted/50 uppercase tracking-widest font-bold">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
                System Online
              </div>
              <p className="text-[0.55rem] text-muted/50 italic font-medium">
                Feed
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
