export interface CreditCardPointDetail {
  label: string;
  sublabel?: string;
  multiplier: string;
}

export interface CreditCardBenefit {
  text: string;
  isBold?: boolean;
}

export interface BiltCreditCard {
  id: string;
  name: string;
  subtitle: string;
  annualFeeLabel: string;
  annualFeeAmount: number;
  signupBonus: {
    title: string;
    description: string;
    extraBonus?: {
      title: string;
      description: string;
    };
  };
  pointEarnings: CreditCardPointDetail[];
  housingReward: string;
  featuredBenefitsTitle: string;
  featuredBenefits: CreditCardBenefit[];
  defaultApplyUrl: string;
  cardDesign: {
    bgColor: string;
    textColor: string;
    borderColor: string;
    chipColor: string;
    accentColor: string;
    logoColor: string;
    metallicSheen: string;
    gridOpacity: string;
  };
}

export const DANIEL_YOUTUBE_STATS = {
  subscribers: "7.41K",
  totalViews: "1,562,902",
  videoCount: "196",
  weeklyUploads: "Weekly Uploads",
  averageViewDuration: "8:42",
};

export const POPULAR_VIDEOS = [
  {
    id: "v1",
    title: "I Ranked Every Budgeting App (Here's What's ACTUALLY Good)",
    views: "85K views",
    length: "13:03",
    published: "",
    category: "Budgeting Apps",
    description: "",
    youtubeUrl: "https://youtu.be/wdTnDiGsAZQ?si=HNfzzga_lXHJxptd",
    thumbnailSeed: "nature"
  },
  {
    id: "v2",
    title: "What I Wish I Knew Before Opening a SoFi Account",
    views: "65K views",
    length: "15:09",
    published: "",
    category: "Bank Review",
    description: "",
    youtubeUrl: "https://youtu.be/e_9Ax3VMNuA?si=H8qCu1hql1Pt0akW",
    thumbnailSeed: "tech"
  },
  {
    id: "v3",
    title: "I Ranked Every Stock Brokerage (Here's What's ACTUALLY Good)",
    views: "59K views",
    length: "23:26",
    published: "",
    category: "Brokerage Review",
    description: "",
    youtubeUrl: "https://youtu.be/oPAqAv-rErQ?si=t0nHlscd4VNnYIof",
    thumbnailSeed: "city"
  }
];

export const BILT_CARDS_DATA: BiltCreditCard[] = [
  {
    id: "bilt-palladium",
    name: "Bilt Palladium Card",
    subtitle: "The premium card",
    annualFeeLabel: "$495 annual fee†",
    annualFeeAmount: 495,
    signupBonus: {
      title: "50,000 points and Gold Status",
      description: "After you spend $4,000 on purchases (excluding rent or mortgage) in your first 90 days. Learn more",
      extraBonus: {
        title: "$300 of Bilt Cash",
        description: "Spend across the Bilt ecosystem. Learn more"
      }
    },
    pointEarnings: [
      {
        label: "Bilt partner restaurants",
        sublabel: "20,000+ U.S. restaurants",
        multiplier: "up to 5X"
      },
      {
        label: "Hotels & Flights",
        sublabel: "Booked on Bilt Travel Portal",
        multiplier: "up to 4X"
      },
      {
        label: "Lyft",
        sublabel: "After linking Bilt and Lyft accounts",
        multiplier: "4X"
      },
      {
        label: "Other everyday purchases",
        multiplier: "2X"
      }
    ],
    housingReward: "up to 1.25X",
    featuredBenefitsTitle: "Featured benefits — Get over $1,000 in annual value¹",
    featuredBenefits: [
      { text: "Cardholder exclusive — No transaction fees on housing payments", isBold: true },
      { text: "$400 Bilt Travel Hotel credit¹ (Applied twice a year, as $200 statement credits, for qualifying Bilt Travel Portal hotel bookings)" },
      { text: "$200 of Bilt Cash¹ (Awarded annually. Up to $100 of Bilt Cash rolls over into the next calendar year.)" },
      { text: "Stack rewards with Neighborhood Benefits™" },
      { text: "Priority Pass (worth $469/year)²" }
    ],
    defaultApplyUrl: "https://www.bilt.com/card/application?tier=palladium",
    cardDesign: {
      bgColor: "bg-gradient-to-br from-[#c0c0c8] via-[#e2e2eb] to-[#9999a3]",
      textColor: "text-[#2e303d]",
      borderColor: "border-zinc-300 hover:border-zinc-400",
      chipColor: "bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-400",
      accentColor: "#8b5cf6",
      logoColor: "text-[#1a1b23]",
      metallicSheen: "from-white/40 to-transparent",
      gridOpacity: "opacity-25"
    }
  },
  {
    id: "bilt-obsidian",
    name: "Bilt Obsidian Card",
    subtitle: "For dining & grocery",
    annualFeeLabel: "$95 annual fee†",
    annualFeeAmount: 95,
    signupBonus: {
      title: "$200 of Bilt Cash",
      description: "Spend across the Bilt ecosystem. Learn more"
    },
    pointEarnings: [
      {
        label: "Bilt partner restaurants",
        sublabel: "20,000+ U.S. restaurants",
        multiplier: "up to 6X"
      },
      {
        label: "Other dining or grocery",
        sublabel: "Your choice. Grocery up to $25K/year",
        multiplier: "3X"
      },
      {
        label: "Hotels & Flights",
        sublabel: "Booked on Bilt Travel Portal",
        multiplier: "up to 4X"
      },
      {
        label: "Lyft",
        sublabel: "After linking Bilt and Lyft accounts",
        multiplier: "3X"
      },
      {
        label: "Other travel",
        multiplier: "2X"
      },
      {
        label: "Other everyday purchases",
        multiplier: "1X"
      }
    ],
    housingReward: "up to 1.25X",
    featuredBenefitsTitle: "Featured benefits — Get $100 in annual value¹",
    featuredBenefits: [
      { text: "Cardholder exclusive — No transaction fees on housing payments", isBold: true },
      { text: "$100 Bilt Travel Hotel credit¹ (Applied twice a year, as $50 statement credits, for qualifying Bilt Travel Portal hotel bookings)" },
      { text: "Trip Delay Insurance²" },
      { text: "Stack rewards with Neighborhood Benefits™" }
    ],
    defaultApplyUrl: "https://www.bilt.com/card/application?tier=obsidian",
    cardDesign: {
      bgColor: "bg-gradient-to-br from-[#111115] via-[#1a1a22] to-[#070709]",
      textColor: "text-[#d1d5db]",
      borderColor: "border-zinc-800 hover:border-zinc-700",
      chipColor: "bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500",
      accentColor: "#10b981",
      logoColor: "text-zinc-200",
      metallicSheen: "from-zinc-500/15 to-transparent",
      gridOpacity: "opacity-15"
    }
  },
  {
    id: "bilt-blue",
    name: "Bilt Blue Card",
    subtitle: "No annual fee",
    annualFeeLabel: "$0 annual fee†",
    annualFeeAmount: 0,
    signupBonus: {
      title: "$100 of Bilt Cash",
      description: "Spend across the Bilt ecosystem. Learn more"
    },
    pointEarnings: [
      {
        label: "Bilt partner restaurants",
        sublabel: "20,000+ U.S. restaurants",
        multiplier: "up to 4X"
      },
      {
        label: "Hotels & Flights",
        sublabel: "Booked on Bilt Travel Portal",
        multiplier: "up to 3X"
      },
      {
        label: "Lyft",
        sublabel: "After linking Bilt and Lyft accounts",
        multiplier: "3X"
      },
      {
        label: "Other everyday purchases",
        multiplier: "1X"
      }
    ],
    housingReward: "up to 1.25X",
    featuredBenefitsTitle: "Featured benefits",
    featuredBenefits: [
      { text: "Cardholder exclusive — No transaction fees on housing payments", isBold: true },
      { text: "No foreign transaction fees¹" },
      { text: "Cellular Wireless Telephone Protection²" },
      { text: "Stack rewards with Neighborhood Benefits™" }
    ],
    defaultApplyUrl: "https://www.bilt.com/card/application?tier=blue",
    cardDesign: {
      bgColor: "bg-gradient-to-br from-[#0a1e36] via-[#0d2847] to-[#040e1b]",
      textColor: "text-[#aed1f5]",
      borderColor: "border-blue-500/20 hover:border-blue-400/40",
      chipColor: "bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300",
      accentColor: "#3b82f6",
      logoColor: "text-blue-200",
      metallicSheen: "from-blue-400/10 to-transparent",
      gridOpacity: "opacity-30"
    }
  }
];
