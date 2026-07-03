import { useState, useEffect } from "react";
import { BILT_CARDS_DATA, BiltCreditCard } from "../data";
import InteractiveCreditCard from "./InteractiveCreditCard";
import { ChevronLeft, Check, Sparkles, ExternalLink, Settings, ShieldCheck, Link, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  onBack: () => void;
}

export default function CompareView({ onBack }: Props) {
  // Customized outbound links that Daniel Sparks can manage directly!
  const [links, setLinks] = useState<Record<string, string>>({
    "bilt-blue": "https://www.bilt.com/card/application?tier=blue",
    "bilt-obsidian": "https://www.bilt.com/card/application?tier=obsidian",
    "bilt-palladium": "https://www.bilt.com/card/application?tier=palladium",
  });

  // Customizable video urls for Daniel Sparks
  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({
    "bilt-blue": "blue video.webm",
    "bilt-obsidian": "obisidan video.webm",
    "bilt-palladium": "palladium video.webm",
  });

  const [showSettings, setShowSettings] = useState(false);
  const [tempLinks, setTempLinks] = useState(links);
  const [tempVideoUrls, setTempVideoUrls] = useState(videoUrls);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load custom links and videos from localStorage on mount
  useEffect(() => {
    const savedLinks = localStorage.getItem("daniel_sparks_bilt_links");
    if (savedLinks) {
      try {
        const parsed = JSON.parse(savedLinks);
        // Automatically upgrade old default paths or empty ones to working live links
        const upgraded = { ...parsed };
        if (!upgraded["bilt-blue"] || upgraded["bilt-blue"] === "https://www.biltrewards.com/card") {
          upgraded["bilt-blue"] = "https://www.bilt.com/card/application?tier=blue";
        }
        if (!upgraded["bilt-obsidian"] || upgraded["bilt-obsidian"] === "https://www.biltrewards.com/card") {
          upgraded["bilt-obsidian"] = "https://www.bilt.com/card/application?tier=obsidian";
        }
        if (!upgraded["bilt-palladium"] || upgraded["bilt-palladium"] === "https://www.biltrewards.com/card") {
          upgraded["bilt-palladium"] = "https://www.bilt.com/card/application?tier=palladium";
        }
        setLinks(upgraded);
        setTempLinks(upgraded);
      } catch (e) {
        console.error("Failed to parse saved links", e);
      }
    } else {
      // If no links are saved yet, sync the tempState with our live default list
      setTempLinks({
        "bilt-blue": "https://www.bilt.com/card/application?tier=blue",
        "bilt-obsidian": "https://www.bilt.com/card/application?tier=obsidian",
        "bilt-palladium": "https://www.bilt.com/card/application?tier=palladium",
      });
    }

    const savedVideos = localStorage.getItem("daniel_sparks_bilt_videos");
    if (savedVideos) {
      try {
        const parsed = JSON.parse(savedVideos);
        // Automatically upgrade old local paths or broken defaults to working live CDNs
        const upgraded = { ...parsed };
        if (!upgraded["bilt-blue"] || upgraded["bilt-blue"] === "/bilt-blue.mp4") {
          upgraded["bilt-blue"] = "blue video.webm";
        }
        if (!upgraded["bilt-obsidian"] || upgraded["bilt-obsidian"] === "/bilt-obsidian.mp4") {
          upgraded["bilt-obsidian"] = "obisidan video.webm";
        }
        if (!upgraded["bilt-palladium"] || upgraded["bilt-palladium"] === "/bilt-palladium.mp4") {
          upgraded["bilt-palladium"] = "palladium video.webm";
        }
        setVideoUrls(upgraded);
        setTempVideoUrls(upgraded);
      } catch (e) {
        console.error("Failed to parse saved videos", e);
      }
    } else {
      // If no videos are saved yet, sync the tempState with our live default CDN list
      setTempVideoUrls({
        "bilt-blue": "blue video.webm",
        "bilt-obsidian": "obisidan video.webm",
        "bilt-palladium": "palladium video.webm",
      });
    }
  }, []);

  const handleSaveSettings = () => {
    setLinks(tempLinks);
    setVideoUrls(tempVideoUrls);
    localStorage.setItem("daniel_sparks_bilt_links", JSON.stringify(tempLinks));
    localStorage.setItem("daniel_sparks_bilt_videos", JSON.stringify(tempVideoUrls));
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSettings(false);
    }, 1500);
  };

  const handleResetSettings = () => {
    const defaultLinks = {
      "bilt-blue": "https://www.bilt.com/card/application?tier=blue",
      "bilt-obsidian": "https://www.bilt.com/card/application?tier=obsidian",
      "bilt-palladium": "https://www.bilt.com/card/application?tier=palladium",
    };
    const defaultVideos = {
      "bilt-blue": "blue video.webm",
      "bilt-obsidian": "obisidan video.webm",
      "bilt-palladium": "palladium video.webm",
    };
    setTempLinks(defaultLinks);
    setLinks(defaultLinks);
    setTempVideoUrls(defaultVideos);
    setVideoUrls(defaultVideos);
    localStorage.removeItem("daniel_sparks_bilt_links");
    localStorage.removeItem("daniel_sparks_bilt_videos");
  };

  return (
    <div className="space-y-12">
      {/* Back Navigation & Affiliate Manager */}
      <div className="flex flex-row items-center justify-between pb-6 border-b border-zinc-800/60 gap-4">
        <button
          onClick={onBack}
          className="text-zinc-400 hover:text-white font-sans text-xs flex items-center gap-1.5 transition-colors group self-start"
          id="btn-back-home"
        >
          <ChevronLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Settings Manager panel */}
      {showSettings && (
        <div className="bg-brand-charcoal/90 border border-brand-bronze/30 rounded-2xl p-6 space-y-5 max-w-3xl mx-auto shadow-2xl relative z-20">
          <div className="space-y-1">
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Link className="w-4 h-4 text-[#c5a880]" />
              <span>Configure your channel outbound links & card videos</span>
            </h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Daniel, you can configure your custom outbound affiliate/apply links and map the video file paths for each card. If you uploaded videos, input their path (e.g., <code className="text-brand-bronze font-mono">/bilt-blue.mp4</code> or <code className="text-brand-bronze font-mono">/assets/bilt-blue.mp4</code>). If a video fails to load, it automatically falls back to our ultra-realistic 3D CSS digital credit card.
            </p>
          </div>

          <div className="space-y-4 pt-2 text-xs">
            {BILT_CARDS_DATA.map((card) => (
              <div key={card.id} className="p-4 rounded-xl bg-brand-dark/50 border border-zinc-800/80 space-y-3">
                <div className="font-sans font-bold text-white text-xs border-b border-zinc-800/60 pb-1.5 flex items-center justify-between">
                  <span>{card.name} Settings</span>
                  <span className="text-[10px] text-zinc-500 font-mono font-normal">ID: {card.id}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-zinc-400 font-medium font-mono text-[9px] uppercase">
                      Apply Destination URL
                    </label>
                    <input
                      type="text"
                      value={tempLinks[card.id] || ""}
                      onChange={(e) => setTempLinks({ ...tempLinks, [card.id]: e.target.value })}
                      placeholder="Paste referral or Bilt link here..."
                      className="w-full px-3 py-2 bg-brand-dark border border-zinc-800 rounded-lg text-zinc-200 focus:border-brand-bronze/50 focus:outline-none font-mono text-[11px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-zinc-400 font-medium font-mono text-[9px] uppercase flex items-center justify-between">
                        <span>Card Video File / CDN Link</span>
                      </label>
                      <input
                        type="text"
                        value={tempVideoUrls[card.id] || ""}
                        onChange={(e) => setTempVideoUrls({ ...tempVideoUrls, [card.id]: e.target.value })}
                        placeholder="e.g. /bilt-blue.mp4"
                        className="w-full px-3 py-2 bg-brand-dark border border-zinc-800 rounded-lg text-zinc-200 focus:border-brand-bronze/50 focus:outline-none font-mono text-[11px]"
                      />
                    </div>
                    {/* Quick presets helper */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      <span className="text-[8px] text-zinc-500 block w-full uppercase tracking-wider mb-0.5 font-bold">Preset loops:</span>
                      {card.id === "bilt-blue" && (
                        <>
                          <button
                            type="button"
                            onClick={() => setTempVideoUrls({ ...tempVideoUrls, "bilt-blue": "blue video.webm" })}
                            className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 text-[9px] text-zinc-400 hover:text-white transition-all font-mono"
                          >
                            Laser Glow (Default)
                          </button>
                          <button
                            type="button"
                            onClick={() => setTempVideoUrls({ ...tempVideoUrls, "bilt-blue": "blue video.webm" })}
                            className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 text-[9px] text-zinc-400 hover:text-white transition-all font-mono"
                          >
                            Starry Space
                          </button>
                        </>
                      )}
                      {card.id === "bilt-obsidian" && (
                        <>
                          <button
                            type="button"
                            onClick={() => setTempVideoUrls({ ...tempVideoUrls, "bilt-obsidian": "obisidan video.webm" })}
                            className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-[9px] text-zinc-400 hover:text-white transition-all font-mono"
                          >
                            Cyber Circuit (Default)
                          </button>
                          <button
                            type="button"
                            onClick={() => setTempVideoUrls({ ...tempVideoUrls, "bilt-obsidian": "obisidan video.webm" })}
                            className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-[9px] text-zinc-400 hover:text-white transition-all font-mono"
                          >
                            Midnight Flow
                          </button>
                        </>
                      )}
                      {card.id === "bilt-palladium" && (
                        <>
                          <button
                            type="button"
                            onClick={() => setTempVideoUrls({ ...tempVideoUrls, "bilt-palladium": "hpalladium video.webm" })}
                            className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 text-[9px] text-zinc-400 hover:text-white transition-all font-mono"
                          >
                            Elite Gold (Default)
                          </button>
                          <button
                            type="button"
                            onClick={() => setTempVideoUrls({ ...tempVideoUrls, "bilt-palladium": "palladium video.webm" })}
                            className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 text-[9px] text-zinc-400 hover:text-white transition-all font-mono"
                          >
                            Silver Wave
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => setTempVideoUrls({ ...tempVideoUrls, [card.id]: "" })}
                        className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 hover:border-red-500/50 text-[9px] text-zinc-500 hover:text-zinc-300 transition-all font-mono"
                      >
                        Matte 3D Card (Off)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-zinc-800/40">
            <button
              onClick={handleResetSettings}
              className="text-zinc-500 hover:text-zinc-300 text-[10px] font-mono uppercase flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset to Defaults</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-1.5 rounded-lg bg-brand-bronze text-brand-dark text-xs font-semibold hover:bg-brand-gold flex items-center gap-1.5 transition-colors"
              >
                {saveSuccess ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 animate-bounce" />
                    <span>Saved successfully!</span>
                  </>
                ) : (
                  <span>Save configurations</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container styled exactly like bilt.com card compare */}
      <div className="text-center max-w-4xl mx-auto space-y-12">
        {/* Top Header matching image */}
        <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight leading-none pt-4">
          The new Bilt 2.0 lineup
        </h2>

        {/* 3-Column Grid representing cards exactly from image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left max-w-6xl mx-auto items-stretch">
          {BILT_CARDS_DATA.map((card) => {
            const isBlue = card.id === "bilt-blue";
            const isObsidian = card.id === "bilt-obsidian";
            const isPalladium = card.id === "bilt-palladium";

            return (
              <div
                key={card.id}
                className={`flex flex-col justify-between rounded-[24px] bg-[#030914]/40 border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  isBlue
                    ? "border-blue-500/20 shadow-[0_20px_40px_rgba(10,30,54,0.15)] bg-gradient-to-b from-[#030c18]/50 to-[#030811]/40"
                    : isObsidian
                    ? "border-zinc-800/80 shadow-[0_20px_40px_rgba(0,0,0,0.3)] bg-gradient-to-b from-brand-charcoal/20 to-brand-slate/40"
                    : "border-zinc-300/10 shadow-[0_20px_40px_rgba(255,255,255,0.01)] bg-gradient-to-b from-zinc-900/10 to-zinc-950/20"
                }`}
                id={`card-column-${card.id}`}
              >
                {/* Visual content section */}
                <div className="space-y-6 flex flex-col items-center text-center">
                  {/* Card visual showcase */}
                  <div className="flex justify-center py-4 w-full">
                    <InteractiveCreditCard card={card} isSelected={false} videoUrl={videoUrls[card.id]} />
                  </div>

                  {/* Title block */}
                  <div className="space-y-2 flex flex-col items-center">
                    <h3 className="text-xl font-display font-extrabold text-white tracking-tight">
                      {card.name}
                    </h3>
                    
                    {/* Annual Fee Badge pill */}
                    <div className="pt-2">
                      <span className="inline-block px-4 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-[11px] font-mono tracking-wider font-semibold">
                        {card.annualFeeLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Links & Direct Application CTA */}
                <div className="pt-8 space-y-4 flex flex-col items-center w-full">
                  {/* Apply Now button */}
                  <a
                    href={links[card.id] || (card.id === "bilt-blue" ? "https://www.bilt.com/card/application?tier=blue" : card.id === "bilt-obsidian" ? "https://www.bilt.com/card/application?tier=obsidian" : "https://www.bilt.com/card/application?tier=palladium")}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="w-full max-w-[220px] flex items-center justify-center py-3 px-5 rounded-full bg-white hover:bg-zinc-200 text-brand-dark font-sans font-bold text-xs tracking-wide transition-all duration-300 hover:scale-[1.01] shadow-xl text-center cursor-pointer"
                    id={`apply-now-btn-${card.id}`}
                  >
                    <span>Apply now</span>
                  </a>

                  {/* Rates and Fees links */}
                  <div className="flex justify-center items-center text-[10px] font-mono text-zinc-500 pt-1">
                    <a
                      href="https://www.biltrewards.com/terms/bilt-card-offer-terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-300 underline flex items-center gap-1 transition-colors"
                    >
                      <span>Rates & Fees</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
