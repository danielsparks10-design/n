import { useState, useEffect } from "react";
import { BiltCreditCard } from "../data";
import { Sparkles, Radio } from "lucide-react";

interface Props {
  card: BiltCreditCard;
  isSelected?: boolean;
  videoUrl?: string;
}

const fallbackImages: Record<string, string> = {
  "bilt-blue": "https://www.bilt.com/_next/image?url=https%3A%2F%2Fstatic.biltrewards.com%2Fassets%2Fwallet%2Fbilt-tahoe.png&w=384&q=75",
  "bilt-obsidian": "https://www.bilt.com/_next/image?url=https%3A%2F%2Fstatic.biltrewards.com%2Fassets%2Fwallet%2Fbilt-vail.png&w=384&q=75",
  "bilt-palladium": "https://www.bilt.com/_next/image?url=https%3A%2F%2Fstatic.biltrewards.com%2Fassets%2Fwallet%2Fbilt-aspen.png&w=384&q=75",
};

export default function InteractiveCreditCard({ card, isSelected = false, videoUrl }: Props) {
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset error states when video url or card changes so that the card tries loading again
  useEffect(() => {
    setVideoError(false);
    setImageError(false);
  }, [videoUrl, card.id]);

  const isBlue = card.id === "bilt-blue";
  const isObsidian = card.id === "bilt-obsidian";
  const isPalladium = card.id === "bilt-palladium";

  const hasActiveVideo = videoUrl && !videoError;
  const fallbackImage = fallbackImages[card.id];
  const showFallbackImage = !hasActiveVideo && fallbackImage && !imageError;
  const showFullBleed = hasActiveVideo || showFallbackImage;

  return (
    <div
      className={`relative aspect-[1.586/1] w-full max-w-[340px] rounded-[16px] overflow-hidden cursor-pointer select-none transition-all duration-300 ${
        showFullBleed 
          ? "bg-transparent border-0 border-none p-0 shadow-none hover:shadow-none hover:scale-[1.01]" 
          : `card-shadow ${card.cardDesign.bgColor} border ${card.cardDesign.borderColor} p-5 md:p-6 ${
              isSelected 
                ? "ring-2 ring-brand-bronze scale-[1.02] shadow-[0_0_25px_rgba(197,168,128,0.25)]" 
                : "hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:scale-[1.01]"
            }`
      }`}
      style={showFullBleed ? { border: "none", borderWidth: "0px", outline: "none", boxShadow: "none" } : undefined}
      id={`card-visual-${card.id}`}
    >
      {hasActiveVideo ? (
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover rounded-[16px] z-10"
          style={{ border: "none", borderWidth: "0px", outline: "none", boxShadow: "none" }}
          onError={() => setVideoError(true)}
        />
      ) : showFallbackImage ? (
        <img
          src={fallbackImage}
          alt={card.name}
          className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover rounded-[16px] z-10"
          style={{ border: "none", borderWidth: "0px", outline: "none", boxShadow: "none" }}
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <>
          {/* Futuristic tech grid lines for Bilt Blue */}
          {isBlue && (
            <div className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none opacity-[0.25]">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cardGridBlue" width="16" height="16" patternUnits="userSpaceOnUse">
                    <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cardGridBlue)" />
              </svg>
            </div>
          )}

          {/* Cyber circuitry lines for Obsidian */}
          {isObsidian && (
            <div className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none opacity-[0.12]">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cardGridObsidian" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#ffffff" strokeWidth="0.5" />
                    <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cardGridObsidian)" />
              </svg>
            </div>
          )}

          {/* Sophisticated diagonal stripes for Palladium */}
          {isPalladium && (
            <div className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none opacity-[0.15]">
              <div className="w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-12 scale-150 transform" />
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cardGridPalladium" width="40" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="4" stroke="#000000" strokeWidth="0.7" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cardGridPalladium)" />
              </svg>
            </div>
          )}

          {/* Card Content - Front */}
          <div className="h-full flex flex-col justify-between">
            {/* Top Row: Issuer & Logo */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className={`text-[9px] uppercase font-bold tracking-[0.2em] ${card.cardDesign.textColor} opacity-80`}>
                  BILT REWARDS
                </span>
                <span className={`text-[10px] font-mono tracking-[0.08em] mt-0.5 ${card.cardDesign.textColor} opacity-60`}>
                  {isBlue ? "Blue Edition" : isObsidian ? "Obsidian Preferred" : "Palladium Elite"}
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                {isPalladium && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                <span className={`text-base font-display font-black tracking-[0.18em] ${card.cardDesign.textColor}`}>
                  BILT
                </span>
              </div>
            </div>

            {/* Middle Row: Chip, Contactless Signal, Card Details */}
            <div className="flex justify-between items-center my-3">
              {/* EMV Metal Chip */}
              <div className={`w-9 h-6.5 rounded-[4px] relative overflow-hidden border border-black/15 ${card.cardDesign.chipColor}`}>
                {/* Inner chip lines */}
                <div className="absolute inset-y-0 left-1/3 w-[1px] bg-black/10" />
                <div className="absolute inset-y-0 right-1/3 w-[1px] bg-black/10" />
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/10" />
              </div>
              
              {/* Contactless Signal */}
              <Radio className={`w-3.5 h-3.5 -rotate-90 ${card.cardDesign.textColor} opacity-40`} />
            </div>

            {/* Bottom Row: Cardholder & Metallic details */}
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                {/* Masked Card Number */}
                <span className={`text-xs font-mono tracking-[0.2em] mb-0.5 ${card.cardDesign.textColor} opacity-80`}>
                  •••• •••• •••• {isBlue ? "4012" : isObsidian ? "8831" : "9900"}
                </span>
                {/* Cardholder Name */}
                <span className={`text-[10px] font-display font-bold tracking-[0.2em] uppercase ${card.cardDesign.textColor}`}>
                  DANIEL SPARKS
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className={`text-[7px] uppercase tracking-wider ${card.cardDesign.textColor} opacity-50`}>Expires</span>
                <span className={`text-[10px] font-mono ${card.cardDesign.textColor} opacity-90`}>12/31</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Decorative metal edge shine - only show for static card, hide for video to keep it clean */}
      {!showFullBleed && (
        <div 
          className="absolute bottom-0 right-0 w-28 h-10 bg-gradient-to-tr from-white/10 to-transparent blur-md rounded-br-[16px] pointer-events-none z-20" 
        />
      )}
    </div>
  );
}
