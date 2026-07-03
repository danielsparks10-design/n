import { useState } from "react";
import { DANIEL_YOUTUBE_STATS, POPULAR_VIDEOS } from "../data";
import { Play, Eye, Clock, Calendar, ArrowRight, Sparkles, Youtube, ChevronRight, MessageSquare, Award, MoreVertical } from "lucide-react";
import { motion } from "motion/react";

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

interface Props {
  onNavigateToCompare: () => void;
}

export default function WelcomeView({ onNavigateToCompare }: Props) {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 text-center max-w-4xl mx-auto px-4">
        {/* Soft atmospheric radial background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-bronze/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-12 left-1/4 w-[250px] h-[250px] bg-brand-copper/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Floating Accent Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-charcoal/80 border border-[#c5a880]/20 text-brand-bronze text-xs font-mono mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Smart Wallet Strategy — 2026 Edition</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight"
        >
          Credit Cards <br />
          <span className="bg-gradient-to-r from-brand-bronze via-brand-gold to-brand-copper bg-clip-text text-transparent">
            Made Simple
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base md:text-lg text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed"
        >
          Hey, I’m Daniel Sparks. I make credit cards less confusing by breaking down which cards are actually worth it, how to use them, and what to avoid.
        </motion.p>

        {/* Main call to actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onNavigateToCompare}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-bronze to-brand-gold hover:from-brand-gold hover:to-brand-bronze text-brand-dark font-sans font-semibold tracking-wide shadow-[0_4px_20px_rgba(197,168,128,0.25)] hover:shadow-[0_4px_30px_rgba(197,168,128,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            id="cta-endorse-hero"
          >
            <span>Recommended Cards</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          <a
            href="#featured-videos"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-charcoal/80 hover:bg-brand-charcoal border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-sans font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Youtube className="w-4 h-4 text-red-500" />
            <span>Latest Tutorials</span>
          </a>
        </motion.div>
      </section>

      {/* High-End Channel Statistics Board */}
      <section className="px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-brand-charcoal/40 to-brand-slate/80 border border-zinc-800/80 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/20 to-transparent" />
          
          <div className="grid grid-cols-3 gap-2 md:gap-8 text-center relative z-10">
            <div className="space-y-2 border-r border-zinc-800/50 pr-2">
              <span className="block text-xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                {DANIEL_YOUTUBE_STATS.subscribers}
              </span>
              <span className="block text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-zinc-500 font-medium">
                Subscribers
              </span>
            </div>
            
            <div className="space-y-2 border-r border-zinc-800/50 pr-2">
              <span className="block text-xl sm:text-3xl md:text-4xl font-display font-extrabold text-brand-bronze tracking-tight">
                {DANIEL_YOUTUBE_STATS.totalViews}
              </span>
              <span className="block text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-zinc-500 font-medium">
                Channel Views
              </span>
            </div>

            <div className="space-y-2">
              <span className="block text-xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                {DANIEL_YOUTUBE_STATS.videoCount}
              </span>
              <span className="block text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-zinc-500 font-medium">
                Uploaded Videos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feature Video Grid */}
      <section id="featured-videos" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
              Featured Videos
            </h2>
            <p className="text-zinc-400 mt-2 text-sm max-w-lg">
              Check out my deeper review of how these cards compare in real world situations.
            </p>
          </div>
          
          <button 
            onClick={onNavigateToCompare}
            className="text-brand-bronze hover:text-brand-gold text-sm font-semibold tracking-wide flex items-center gap-1 group transition-colors duration-200"
          >
            <span>Launch Compare Tool</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {POPULAR_VIDEOS.map((video) => {
            const isHovered = hoveredVideo === video.id;
            const thumbnailUrl = getYouTubeThumbnail(video.youtubeUrl);
            return (
              <a
                key={video.id}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                className="group block bg-brand-charcoal/20 border border-zinc-800/60 hover:border-zinc-700/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] cursor-pointer"
                id={`video-card-${video.id}`}
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                      <Youtube className="w-12 h-12 text-zinc-700" />
                    </div>
                  )}

                  {/* Play Button Overlay (YouTube Style) */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg transition-transform duration-300 transform scale-90 group-hover:scale-100">
                      <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/85 text-[10px] font-mono text-white font-semibold rounded tracking-wider shadow-md">
                    {video.length}
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm sm:text-base font-sans font-bold text-white tracking-tight leading-snug group-hover:text-brand-bronze transition-colors duration-200 line-clamp-2">
                      {video.title}
                    </h3>
                    <span className="text-zinc-500 hover:text-white transition-colors flex-shrink-0 p-0.5" aria-label="More options">
                      <MoreVertical className="w-4 h-4" />
                    </span>
                  </div>
                  
                  {/* Stats & Meta matching the screenshot exactly without date */}
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-sans font-medium">
                    <span className="text-brand-bronze font-bold">▷</span>
                    <span>{video.views.replace(" views", "")}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
