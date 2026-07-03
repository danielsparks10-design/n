/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import WelcomeView from "./components/WelcomeView";
import CompareView from "./components/CompareView";
import { Youtube, Award, Compass, Heart, Github, Star, Sparkles, User, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type ViewState = "welcome" | "compare";

export default function App() {
  const [view, setView] = useState<ViewState>(() => {
    const hash = window.location.hash;
    if (hash === "#compare" || hash === "#/compare" || hash === "#compare-cards") {
      return "compare";
    }
    return "welcome";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#compare" || hash === "#/compare" || hash === "#compare-cards") {
        setView("compare");
      } else {
        setView("welcome");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (newView: ViewState) => {
    if (newView === "compare") {
      window.location.hash = "compare";
    } else {
      window.location.hash = "";
      if (window.history.pushState) {
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    }
    setView(newView);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans selection:bg-[#c5a880]/30 selection:text-white relative">
      
      {/* Sleek luxury gradient background accents */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#16161a] via-[#0a0a0c]/50 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-bl from-brand-bronze/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-brand-copper/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative luxury grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Luxury Navigation Bar */}
      <header className="relative z-40 border-b border-zinc-800/40 bg-[#0a0a0c]/60 backdrop-blur-md sticky top-0" id="main-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo("welcome")} id="brand-logo">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-bronze via-brand-gold to-brand-copper p-[1px] flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-brand-dark rounded-xl flex items-center justify-center font-display font-black text-[#c5a880] text-sm tracking-tighter">
                DS
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm md:text-base tracking-[0.12em] text-white flex items-center gap-1.5 leading-none">
                DANIEL SPARKS
                <span className="text-brand-bronze text-[10px]">●</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mt-1">
                Credit card strategist
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-semibold tracking-wider uppercase text-zinc-400">
            <button 
              onClick={() => navigateTo("welcome")}
              className={`hover:text-white transition-colors py-2 ${view === "welcome" ? "text-[#c5a880] border-b border-brand-bronze" : ""}`}
              id="nav-link-welcome"
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo("compare")}
              className={`hover:text-white transition-colors py-2 ${view === "compare" ? "text-[#c5a880] border-b border-brand-bronze" : ""}`}
              id="nav-link-compare"
            >
              Compare Cards
            </button>
            <a 
              href="https://www.youtube.com/@daniel.sparks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-1 py-2"
              id="nav-link-youtube"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </nav>

          {/* Right Action button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo(view === "welcome" ? "compare" : "welcome")}
              className="px-5 py-2.5 rounded-full bg-brand-charcoal hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-1.5"
              id="nav-action-toggle"
            >
              {view === "welcome" ? (
                <>
                  <Compass className="w-3.5 h-3.5 text-brand-bronze" />
                  <span>Recommended Cards</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-brand-bronze" />
                  <span>Bio & Videos</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-20 relative z-10 min-h-[calc(100vh-16rem)]">
        <AnimatePresence mode="wait">
          {view === "welcome" ? (
            <motion.div
              key="welcome-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <WelcomeView onNavigateToCompare={() => navigateTo("compare")} />
            </motion.div>
          ) : (
            <motion.div
              key="compare-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <CompareView onBack={() => navigateTo("welcome")} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Premium Elegant Footer */}
      <footer className="relative z-40 border-t border-zinc-800/60 bg-[#070709] py-16 px-6" id="site-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-white tracking-[0.15em] text-sm">
                DANIEL SPARKS
              </span>
              <span className="text-brand-bronze text-xs">●</span>
            </div>
            <a 
              href="https://www.youtube.com/@daniel.sparks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-xs font-mono"
            >
              <Youtube className="w-4 h-4 text-red-500/60 hover:text-red-500" />
              <span>youtube.com/@daniel.sparks</span>
            </a>
          </div>

          {/* Navigation Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#c5a880] font-black">
              Navigation
            </h4>
            <div className="grid grid-cols-1 gap-2 text-xs text-zinc-400 font-sans font-medium">
              <button onClick={() => navigateTo("welcome")} className="text-left hover:text-white transition-colors py-1">Home</button>
              <button onClick={() => navigateTo("compare")} className="text-left hover:text-white transition-colors py-1">Compare Cards</button>
            </div>
          </div>

          {/* Legal / Disclaimer Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-black">
              Advertiser Disclosure
            </h4>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              <i>*Some of the products that appear on this website are from companies from which Daniel Sparks will earn an affiliate commission or referral bonus. The content in these videos or posts are accurate as of the posting date. Some of the offers mentioned may no longer be available*</i>
            </p>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              The views, reviews, analyses, and recommendations expressed are solely those of the author and have not been reviewed, endorsed, or approved by any of the mentioned entities.
            </p>
          </div>
        </div>


      </footer>

    </div>
  );
}
