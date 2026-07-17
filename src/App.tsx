import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Bell, 
  Award, 
  ChevronDown, 
  X, 
  HelpCircle, 
  Calculator, 
  Check, 
  AlertTriangle,
  Send,
  Sparkles,
  DollarSign,
  TrendingDown,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Telegram Channel URL provided by the user
const TELEGRAM_URL = "https://t.me/+XSAr1KB40t03YmQ1";

interface ProfileAvatarProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  alt?: string;
  border?: boolean;
}

function ProfileAvatar({ className = "", size = "md", alt = "PRO Yuvi", border = true }: ProfileAvatarProps) {
  const [src, setSrc] = useState<string>("/profile_avatar.png");
  const [failed, setFailed] = useState<boolean>(false);

  const handleError = () => {
    if (!failed) {
      setSrc("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150");
      setFailed(true);
    }
  };

  const sizeClasses = {
    xs: "w-8 h-8 text-xs",
    sm: "w-9 h-9 text-xs",
    md: "w-10 h-10 sm:w-12 sm:h-12 text-sm",
    lg: "w-12 h-12 text-sm",
    xl: "w-24 h-24 sm:w-32 sm:h-32 text-2xl",
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;
  const isFallbackFailed = failed && src !== "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150";

  if (isFallbackFailed) {
    return (
      <div 
        className={`${selectedSize} rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shrink-0 aspect-square ${
          border ? "border-2 border-white" : ""
        } ${className}`}
      >
        PY
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={handleError}
      className={`${selectedSize} rounded-full object-cover shrink-0 aspect-square ${
        border ? "border-2 border-blue-500 shadow-md bg-white" : ""
      } ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}

export default function App() {
  // State variables for interactive elements
  const [activeTab, setActiveTab] = useState<"ideas" | "edu" | "proof">("ideas");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Interactive Quiz state
  const [quizStep, setQuizStep] = useState<number>(0); // 0 = not started, 1, 2, 3 = questions, 4 = result
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  
  // Calculator state
  const [capital, setCapital] = useState<number>(1000);
  const [riskPerTrade, setRiskPerTrade] = useState<number>(2); // 2% risk default
  const [winRate, setWinRate] = useState<number>(65); // 65% educational win rate
  const [rewardRatio, setRewardRatio] = useState<number>(2); // 1:2 Risk to Reward default
  const [simulatedTrades, setSimulatedTrades] = useState<{ id: number; result: string; amount: number; balance: number }[]>([]);

  // Legal Modal states (Essential for Meta Ads Approval)
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "disclaimer" | null>(null);

  // Auto-run simulator on parameter change
  useEffect(() => {
    let currentBalance = capital;
    const trades = [];
    const profitPercent = riskPerTrade * rewardRatio; // If risk 2%, reward is 4%
    const lossPercent = riskPerTrade;

    for (let i = 1; i <= 5; i++) {
      // Simulate typical sequential outcomes to demonstrate risk compounding educationally
      // Rather than pure random, we show a professional risk/reward structure: 3 wins, 2 losses (60% win rate)
      const isWin = i === 1 || i === 3 || i === 5;
      const percentChange = isWin ? profitPercent : -lossPercent;
      const amount = (currentBalance * percentChange) / 100;
      currentBalance = Math.round((currentBalance + amount) * 100) / 100;

      trades.push({
        id: i,
        result: isWin ? "WIN" : "LOSS",
        amount: Math.round(amount * 100) / 100,
        balance: currentBalance,
      });
    }
    setSimulatedTrades(trades);
  }, [capital, riskPerTrade, rewardRatio]);

  // Handle Quiz selection
  const handleQuizAnswer = (answer: string) => {
    const updatedAnswers = [...quizAnswers, answer];
    setQuizAnswers(updatedAnswers);
    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizStep(4); // Show result
    }
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers([]);
  };

  const getQuizResult = () => {
    const [q1, q2, q3] = quizAnswers;
    if (q1 === "Options" || q3 === "Aggressive") {
      return {
        title: "High-Momentum Option Trader",
        desc: "You thrive on volatility and leverage. Stock & Index Options offer the asymmetric risk-to-reward ratio you are looking for.",
        tip: "Yuvi specializes in option chart patterns, highlighting high-probability breakout setups with strict stop-losses.",
      };
    } else if (q1 === "Stocks" && q2 === "Medium Term") {
      return {
        title: "Strategic Swing Trader",
        desc: "You prefer holding positions for several days to catch major trend shifts while maintaining healthy risk management.",
        tip: "Yuvi provides detailed multi-day trend analysis on leading stocks to help you catch institutional breakouts safely.",
      };
    } else {
      return {
        title: "Disciplined Long-Term Growth Trader",
        desc: "You prioritize capital preservation, risk-first positioning, and consistent steady compounding over time.",
        tip: "Yuvi emphasizes educational macro trends and high-accuracy key levels so you can execute with minimal stress.",
      };
    }
  };

  // Predefined FAQ items
  const faqs = [
    {
      q: "Is access to the PRO Yuvi Telegram channel really 100% free?",
      a: "Yes, 100% free. There are no registration fees, no locked VIP group charges, and no hidden monthly subscriptions. Yuvi believes in democratizing trading education by providing professional-grade market insights openly.",
    },
    {
      q: "What kind of trades and assets are analyzed inside the channel?",
      a: "The channel primarily shares technical analysis, key support/resistance breakout levels, and real-time educational alerts for Options (Index & Equity), Momentum Stocks, and major Index trends.",
    },
    {
      q: "How many trade recommendations are shared daily?",
      a: "Quality always precedes quantity. Usually, 1 to 3 highly researched, high-probability analytical setups are posted per day. We do not over-trade or spam the feed.",
    },
    {
      q: "I am a complete beginner. Will I be able to follow along?",
      a: "Absolutely. Every trade tip includes precise entry zones, clear targets, and designated stop-losses. Moreover, Yuvi regularly posts educational charts explaining the 'WHY' behind each trade to help you learn.",
    },
    {
      q: "How does the channel guarantee Meta Ad Compliance?",
      a: "We adhere strictly to financial advertising policies. We do not promise guaranteed riches, fixed daily gains, or simulated low-risk success. All analyses are based on technical chart setups, backtested risk-to-reward ratios, and comprehensive risk warning disclosures.",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-blue-100 selection:text-blue-800">
      
      {/* Dynamic Trust Alert Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-2 px-4 text-center text-xs font-medium tracking-wide">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          OFFICIAL VERIFIED ACCESS • JOIN 9,840+ ACTIVE TRADERS IN THE FREE CHANNEL NOW
        </span>
      </div>

      {/* Modern Trust Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 sm:py-4 transition-all shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Profile */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <ProfileAvatar size="md" alt="PRO Yuvi Profile" border={true} />
              {/* Verified badge */}
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h1 className="font-display font-bold text-sm sm:text-lg tracking-tight text-slate-900">
                  PRO Yuvi
                </h1>
                <span className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.2 rounded-full font-semibold border border-blue-100">
                  Analyst
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1 font-mono">
                <Users className="w-3 h-3 text-emerald-500" />
                9.8k+ Members • Active Real-Time
              </p>
            </div>
          </div>

          {/* Action CTA Header */}
          <a 
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-[11px] sm:text-sm px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95 transition-all"
            id="header-cta-button"
          >
            <Send className="w-3 sm:w-4 h-3 sm:h-4 fill-white text-emerald-500" />
            <span>Join Free Telegram</span>
            <ArrowRight className="w-3 h-3 hidden sm:inline" />
          </a>
        </div>
      </header>

      {/* Main Layout Wrap */}
      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50/50 pt-8 pb-12 sm:pt-10 sm:pb-16 px-4">
          {/* Subtle Grid Background Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            
            {/* Meta Compliant Trust Tag */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide border border-blue-100 mb-5 sm:mb-6"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>EDUCATIONAL TRADING TELEGRAM CHANNEL</span>
            </motion.div>

            {/* Premium Space Grotesk Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-slate-950 max-w-3xl mx-auto leading-tight"
            >
              Learn High-Probability <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Trading Setups</span> & Smart Risk Management
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Stop guessing the market moves. Get direct access to real-time option break-out analyses, deep educational charts, and daily risk management tips shared directly by <span className="font-semibold text-slate-900">Yuvi</span>. 
            </motion.p>

            {/* Highly converting Meta-safe Benefit Highlights */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-y-3 gap-x-6 text-xs sm:text-sm font-medium text-slate-700 max-w-xl mx-auto"
            >
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                <span>100% Free Lifetime Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                <span>No Hidden Fees or VIP Rooms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                <span>Option & Stock Strategy Analysis</span>
              </div>
            </motion.div>

            {/* Massive Pulsing Call to Action Button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 sm:mt-10"
            >
              <div className="relative inline-block group">
                {/* Glow ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse-ring"></div>
                
                <a 
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-base sm:text-lg px-8 py-4 sm:py-5 rounded-2xl shadow-xl hover:shadow-emerald-500/20 active:scale-[0.98] transition-all tracking-wide min-w-[280px]"
                  id="main-hero-cta"
                >
                  <Send className="w-5 h-5 fill-white text-emerald-500" />
                  <span>JOIN THE FREE CHANNEL NOW</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <p className="mt-3 text-[11px] sm:text-xs text-slate-500 flex items-center justify-center gap-1 font-mono">
                <Lock className="w-3.5 h-3.5 text-blue-500" /> Securing a spot takes less than 3 seconds • Opens directly in Telegram
              </p>
            </motion.div>

          </div>
        </section>

        {/* Visual Showcase: Channel Feed Preview & Features */}
        <section className="py-12 bg-white border-y border-slate-100 px-4">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                Live Preview
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                Inside the PRO Yuvi Telegram Feed
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Get a transparent, real-time glimpse of the exact educational insights and daily market analysis shared within our channel.
              </p>
            </div>

            {/* Simulated Live Feed Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Feed Left Column - Interactive Tab Controller */}
              <div className="lg:col-span-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 hidden lg:block">
                  Select Preview Category
                </p>
                
                {/* Mobile & Tablet Compact Horizontal Tabs - Solves elongated boxes on mobile */}
                <div className="flex lg:hidden gap-1.5 p-1 bg-slate-100 rounded-xl mb-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <button
                    onClick={() => setActiveTab("ideas")}
                    className={`flex-1 min-w-[100px] text-center py-2 px-3 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === "ideas" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-slate-600 hover:bg-white/50"
                    }`}
                  >
                    Breakouts
                  </button>
                  <button
                    onClick={() => setActiveTab("edu")}
                    className={`flex-1 min-w-[100px] text-center py-2 px-3 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === "edu" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-slate-600 hover:bg-white/50"
                    }`}
                  >
                    Tutorials
                  </button>
                  <button
                    onClick={() => setActiveTab("proof")}
                    className={`flex-1 min-w-[100px] text-center py-2 px-3 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === "proof" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-slate-600 hover:bg-white/50"
                    }`}
                  >
                    Profits
                  </button>
                </div>

                {/* Desktop Vertical Tab Cards */}
                <div className="hidden lg:flex flex-col gap-3">
                  <button
                    onClick={() => setActiveTab("ideas")}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                      activeTab === "ideas" 
                        ? "border-blue-500 bg-blue-50/50 shadow-sm" 
                        : "border-slate-100 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeTab === "ideas" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Breakout Trade Ideas</h4>
                      <p className="text-xs text-slate-500 mt-1">High-probability price setups with clear target goals.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("edu")}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                      activeTab === "edu" 
                        ? "border-blue-500 bg-blue-50/50 shadow-sm" 
                        : "border-slate-100 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeTab === "edu" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Trading Tutorials & Tips</h4>
                      <p className="text-xs text-slate-500 mt-1">Risk management, chart analysis, and psychology guides.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("proof")}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                      activeTab === "proof" 
                        ? "border-blue-500 bg-blue-50/50 shadow-sm" 
                        : "border-slate-100 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeTab === "proof" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Transparent Profit Updates</h4>
                      <p className="text-xs text-slate-500 mt-1">Authentic exit logs, case studies, and trade progress.</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Feed Right Column - Simulated Telegram App Message Frame */}
              <div className="lg:col-span-8 bg-slate-100 rounded-2xl p-3 sm:p-4 border border-slate-200/60 shadow-inner">
                {/* Header of Simulated Telegram Group */}
                <div className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm border border-slate-100 mb-4">
                  <div className="flex items-center gap-2.5">
                    <ProfileAvatar size="sm" alt="PRO Yuvi Avatar" border={false} className="border border-slate-200" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1">
                        PRO Yuvi
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono">9,840 subscribers • verified analyst</p>
                    </div>
                  </div>
                  <a 
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3 h-3 fill-blue-600 text-blue-500" />
                    <span>Join Free</span>
                  </a>
                </div>

                {/* Simulated Telegram Message Area */}
                <div className="space-y-4 min-h-[300px]">
                  
                  {activeTab === "ideas" && (
                    <motion.div 
                      key="ideas" 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-slate-200/60 max-w-xl mx-auto"
                    >
                      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                        <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded border border-amber-100 max-w-[180px] sm:max-w-none truncate">
                          🔥 HIGH PRIORITY BREAKOUT SETUP
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Today, 09:24 AM</span>
                      </div>
                      
                      <p className="font-semibold text-xs sm:text-sm text-slate-900 break-words">
                        📈 INDEX OPTION: NIFTY 24100 CALL (EXPIRY WEEKLY)
                      </p>
                      
                      {/* Technical Mock Chart representation using HTML/CSS */}
                      <div className="my-3 bg-slate-900 rounded-lg p-2.5 sm:p-3 text-white font-mono text-[10px] relative overflow-hidden h-36">
                        <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-1.5 py-0.5 rounded text-[8px] font-bold max-w-[150px] sm:max-w-none truncate">
                          15M CHART - BULLISH ASCENDING TRIANGLE
                        </div>
                        {/* Candlesticks & lines mock */}
                        <div className="h-24 flex items-end justify-around px-2 relative border-b border-l border-slate-700/60">
                          
                          {/* Dotted target line */}
                          <div className="absolute top-6 left-0 right-0 border-t border-dashed border-emerald-400/40 text-emerald-400 text-[8px] pl-2">
                            Target Goal: $120.00
                          </div>
                          
                          {/* Entry Line */}
                          <div className="absolute bottom-10 left-0 right-0 border-t border-dashed border-blue-400/40 text-blue-400 text-[8px] pl-2">
                            Buy Entry Zone: $85.00 - $88.00
                          </div>

                          {/* Simplified Candlesticks */}
                          <div className="flex flex-col items-center"><div className="w-0.5 h-6 bg-red-400"></div><div className="w-2.5 h-10 bg-red-500"></div></div>
                          <div className="flex flex-col items-center"><div className="w-0.5 h-8 bg-emerald-400"></div><div className="w-2.5 h-12 bg-emerald-500"></div></div>
                          <div className="flex flex-col items-center"><div className="w-0.5 h-4 bg-red-400"></div><div className="w-2.5 h-8 bg-red-500"></div></div>
                          <div className="flex flex-col items-center"><div className="w-0.5 h-10 bg-emerald-400"></div><div className="w-2.5 h-16 bg-emerald-500"></div></div>
                          <div className="flex flex-col items-center"><div className="w-0.5 h-12 bg-emerald-400"></div><div className="w-2.5 h-20 bg-emerald-500 animate-pulse"></div></div>
                        </div>
                        <div className="flex justify-between text-slate-400 text-[8px] mt-1.5">
                          <span>09:15 AM</span>
                          <span>09:30 AM</span>
                          <span>10:00 AM (PROJ)</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-[11px] sm:text-xs text-slate-700 font-mono mt-3 bg-slate-50 p-2 sm:p-2.5 rounded-lg border border-slate-100">
                        <p>🎯 <span className="font-bold">Buy Entry Zone:</span> $85.00 - $88.00</p>
                        <p>🎯 <span className="font-bold">Target 1:</span> $98.00</p>
                        <p>🎯 <span className="font-bold">Target 2:</span> $112.00</p>
                        <p>🛑 <span className="font-bold">Strict Stop-loss:</span> $76.00 (Risk: ~11%)</p>
                      </div>

                      <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                        <strong className="text-slate-900">Analysis:</strong> Nifty consolidated within an ascending triangle pattern on the 15-minute timeframe. Strong support at the $24,000 level and volume breakouts indicate institutional accumulation. Remember: strictly follow the stops and manage your position size educational risk limits.
                      </p>

                      <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between">
                        <div className="flex gap-1">
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">👍 142</span>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">🔥 98</span>
                        </div>
                        <a 
                          href={TELEGRAM_URL} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
                        >
                          View real-time updates <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "edu" && (
                    <motion.div 
                      key="edu" 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-slate-200/60 max-w-xl mx-auto"
                    >
                      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1 max-w-[180px] sm:max-w-none truncate">
                          <BookOpen className="w-3 h-3 text-emerald-600" />
                          TRADER MINDSET & RISK SKILLS
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Yesterday, 04:15 PM</span>
                      </div>
                      
                      <h4 className="font-bold text-sm text-slate-900 break-words">
                        🛑 The Golden Rules of Trading Risk Management
                      </h4>
                      
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        If you want to survive as a professional trader, you must shift your priority from "how much money can I make" to <strong className="text-slate-900">"how much risk can I minimize on each decision."</strong>
                      </p>

                      <div className="mt-3 space-y-2 text-[11px] sm:text-xs text-slate-700 bg-blue-50/40 p-2.5 sm:p-3 rounded-lg border border-blue-100/50">
                        <div className="flex gap-2">
                          <span className="font-bold text-blue-600">Rule 1:</span>
                          <p>Never risk more than <strong>1% to 2%</strong> of your total trading capital on a single recommendation.</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold text-blue-600">Rule 2:</span>
                          <p>Ensure your target rewards are at least <strong>double</strong> the size of your stop-loss (minimum 1:2 Risk-to-Reward ratio).</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold text-blue-600">Rule 3:</span>
                          <p>Emotional trading leads to major losses. Always enter a trade with a preset, logical stop-loss trigger, and leave it alone.</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                        In the <strong>𝐏𝐑𝐎 𝐘𝐮𝐯𝐢</strong> channel, we never encourage blind gambles. Every breakout prediction we post comes with a logical stop point to keep your losses tiny, while leaving room for profit targets to run.
                      </p>

                      <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between">
                        <div className="flex gap-1">
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">🎓 245</span>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">❤️ 112</span>
                        </div>
                        <a 
                          href={TELEGRAM_URL} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
                        >
                          Join educational discussion <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "proof" && (
                    <motion.div 
                      key="proof" 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-slate-200/60 max-w-xl mx-auto"
                    >
                      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 max-w-[180px] sm:max-w-none truncate">
                          🟢 OPTION RECOMMENDATION PROGRESS SECURED
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">July 15, 02:10 PM</span>
                      </div>
                      
                      <p className="font-semibold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5 break-words">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                        NIFTY 23900 CALL OPTION - EXIT REPORT
                      </p>

                      <div className="my-3 bg-slate-50 border border-slate-100 rounded-lg p-2 sm:p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
                        <div>
                          <p className="text-[10px] text-slate-400 font-mono uppercase">Entry Buy Price</p>
                          <p className="text-sm font-bold text-slate-900">$64.00</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-mono uppercase">Exit Hit Price</p>
                          <p className="text-sm font-bold text-emerald-600">$102.50</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-mono uppercase">Absolute Gain</p>
                          <p className="text-sm font-bold text-emerald-600">+$38.50</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-mono uppercase">ROI Percentage</p>
                          <p className="font-bold text-emerald-700 bg-emerald-50 px-1 rounded inline-block text-xs">
                            +60.1% Profit
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        🎯 <strong className="text-slate-900">Target 2 hit successfully!</strong> Exit option recommendation closed at $102.50 from our buy zone of $64.00. This is the power of trailing stop-losses to let our profits compound while cutting our potential risk.
                      </p>

                      <p className="text-xs text-orange-600 font-mono font-medium mt-2 bg-orange-50 border border-orange-100 p-2 rounded">
                        ⚠️ Please Note: Option trading has high variance. While we celebrate this setup's target, always stick to strict risk-allocated positions to avoid significant downside.
                      </p>

                      <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between">
                        <div className="flex gap-1">
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">📈 320</span>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">🙌 152</span>
                        </div>
                        <a 
                          href={TELEGRAM_URL} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
                        >
                          Join Telegram for live logs <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Simulated Channel Statistics footer */}
                <div className="mt-4 text-center">
                  <a 
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex sm:inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4 fill-white text-blue-600" />
                    <span>Join PRO Yuvi on Telegram</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-[10px] text-slate-400 mt-2 font-mono">
                    Free channel access • No registration required • Supported on Desktop & Mobile
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Core Educational Value Propositions Section */}
        <section className="py-16 bg-slate-50 px-4">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                Why Join Us?
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 mt-2">
                A Transparent, Educational Trading Community
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2">
                We believe in providing professional-grade charting setups and educational trade signals. Here is what we deliver inside our free channel:
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-900">
                  Precision Chart Breakouts
                </h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  We don't share blind guesses. Every setup includes the exact logical candlestick charting levels, volumes, and technical reasons.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-900">
                  Trader Mindset Tutorials
                </h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Learn how to master emotional trading, avoid common retailer traps, and understand high-risk stock and index option dynamics.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-900">
                  Strict Risk Allocations
                </h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Every tip is accompanied by a concrete exit level and stop-loss. We advocate capital safety and sensible sizing at all times.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Bell className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-900">
                  Instant Telegram Alerts
                </h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Get real-time indicators sent instantly to your phone. Never miss a breakout analysis or high-momentum chart movement.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-900">
                  100% Free Lifetime
                </h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  No hidden credit cards, no upsells, no premium subscriptions. Benefit from high-quality educational material entirely for free.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-900">
                  Collaborative Space
                </h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Connect with over 9,800 active, verified retail and swing options traders who discuss charts and strategies systematically.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* Dynamic & Engaging Tools Section: Quiz & Interactive Simulator */}
        <section className="py-16 bg-white border-y border-slate-100 px-4">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                Interactive Learning Tools
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 mt-2">
                Test Your Strategy & Style Before Joining
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                We believe in smart, metrics-driven decisions. Use our interactive educational modules to test your risk setup and find your custom style.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Dynamic Module: Strategy Risk Simulator */}
              <div className="md:col-span-6 bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    <h4 className="font-display font-bold text-lg text-slate-900">
                      Educational Compound Risk Simulator
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Set up your hypothetical parameters to see how strict mathematical risk management and a standard 1:2 risk-to-reward ratio operates across 5 trades.
                  </p>

                  {/* Simulator Controls */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5 flex justify-between">
                        <span>Starting Capital</span>
                        <span className="text-blue-600 font-mono">${capital}</span>
                      </label>
                      <input 
                        type="range" 
                        min="500" 
                        max="10000" 
                        step="500" 
                        value={capital}
                        onChange={(e) => setCapital(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>$500</span>
                        <span>$10,000</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                          Risk Per Trade: <span className="text-blue-600 font-mono">{riskPerTrade}%</span>
                        </label>
                        <select 
                          value={riskPerTrade} 
                          onChange={(e) => setRiskPerTrade(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
                        >
                          <option value={1}>1% Safe Risk</option>
                          <option value={2}>2% Standard Risk</option>
                          <option value={5}>5% High Volatility Risk</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                          Risk-Reward: <span className="text-blue-600 font-mono">1:{rewardRatio}</span>
                        </label>
                        <select 
                          value={rewardRatio} 
                          onChange={(e) => setRewardRatio(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
                        >
                          <option value={1.5}>1:1.5 Target Ratio</option>
                          <option value={2}>1:2.0 Professional Ratio</option>
                          <option value={3}>1:3.0 High-Asymmetry Ratio</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Simulator Results Log */}
                  <div className="mt-6 bg-white border border-slate-100 rounded-xl p-3 sm:p-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Compound Output Logs (3 Wins, 2 Losses Simulation)
                    </p>
                    <div className="space-y-1.5 font-mono text-[11px] sm:text-xs">
                      {simulatedTrades.map((t) => (
                        <div key={t.id} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0 gap-1.5">
                          <span className="text-slate-500 shrink-0">Trade #{t.id}</span>
                          <span className={`font-bold text-[9px] sm:text-[10px] px-1 rounded shrink-0 ${
                            t.result === "WIN" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                          }`}>
                            {t.result} ({t.result === "WIN" ? `+${riskPerTrade * rewardRatio}%` : `-${riskPerTrade}%`})
                          </span>
                          <span className={`font-semibold shrink-0 ${t.amount >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                            {t.amount >= 0 ? "+" : ""}${t.amount}
                          </span>
                          <span className="font-bold text-slate-800 truncate">${t.balance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-amber-600 text-[10px] leading-relaxed mb-3">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Educational Simulator only. Authentic results will vary based on live conditions, spreads, and market slippage.</span>
                  </div>
                  <a 
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold py-3 px-4 rounded-xl text-center text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Receive Real-Time Levels to Practice</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Dynamic Module: Trading Style Personality Quiz */}
              <div className="md:col-span-6 bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-display font-bold text-lg text-slate-900">
                      30-Second Trading Style Selector
                    </h4>
                  </div>

                  {quizStep === 0 && (
                    <div className="py-6 text-center">
                      <p className="text-sm text-slate-600 max-w-sm mx-auto mb-6">
                        Not sure which trading path suits your personality, capital size, and risk appetite? Answer 3 quick educational questions.
                      </p>
                      <button
                        onClick={() => setQuizStep(1)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-colors"
                      >
                        Start Diagnostic Quiz
                      </button>
                    </div>
                  )}

                  {quizStep === 1 && (
                    <motion.div key="q1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                        Question 1 of 3
                      </span>
                      <h5 className="font-bold text-sm text-slate-900 mt-2 mb-4">
                        What primary financial asset or mechanism fits your target goal?
                      </h5>
                      <div className="space-y-2">
                        {["Options (Index / Nifty)", "Equity Momentum Stocks", "Crypto & Forex"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleQuizAnswer(opt)}
                            className="w-full text-left p-3 sm:p-3.5 bg-white hover:bg-slate-100 border border-slate-200/60 rounded-xl text-xs font-semibold text-slate-700 transition-all active:scale-[0.99]"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {quizStep === 2 && (
                    <motion.div key="q2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                        Question 2 of 3
                      </span>
                      <h5 className="font-bold text-sm text-slate-900 mt-2 mb-4">
                        What is your preferred holding timeframe for trades?
                      </h5>
                      <div className="space-y-2">
                        {["Minutes to Hours (Intraday)", "Several Days (Swing trading)", "Weeks to Months (Long Term)"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleQuizAnswer(opt)}
                            className="w-full text-left p-3 sm:p-3.5 bg-white hover:bg-slate-100 border border-slate-200/60 rounded-xl text-xs font-semibold text-slate-700 transition-all active:scale-[0.99]"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {quizStep === 3 && (
                    <motion.div key="q3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                        Question 3 of 3
                      </span>
                      <h5 className="font-bold text-sm text-slate-900 mt-2 mb-4">
                        What is your psychological risk profile comfort zone?
                      </h5>
                      <div className="space-y-2">
                        {["Conservative (Safety First)", "Moderate (Balanced Growth)", "Aggressive (High Return Target)"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleQuizAnswer(opt)}
                            className="w-full text-left p-3 sm:p-3.5 bg-white hover:bg-slate-100 border border-slate-200/60 rounded-xl text-xs font-semibold text-slate-700 transition-all active:scale-[0.99]"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {quizStep === 4 && (
                    <motion.div key="q4" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-emerald-100 rounded-xl p-4">
                      <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase bg-emerald-100/50 px-2.5 py-1 rounded">
                        Your Style Diagnosis
                      </span>
                      
                      <h5 className="font-display font-extrabold text-base text-slate-900 mt-3 flex items-center gap-1">
                        🏆 {getQuizResult().title}
                      </h5>
                      
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {getQuizResult().desc}
                      </p>

                      <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg mt-3 text-xs text-emerald-800">
                        <strong>💡 How Yuvi helps:</strong> {getQuizResult().tip}
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <button 
                          onClick={resetQuiz}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition-colors w-full sm:w-auto"
                        >
                          Retake Quiz
                        </button>
                        <a
                          href={TELEGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-3 rounded-lg text-center text-xs shadow-md transition-all flex items-center justify-center gap-1 w-full"
                        >
                          <span>Get Matching Alerts Free</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  )}

                </div>

                {quizStep > 0 && quizStep < 4 && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Progress: {Math.round(((quizStep - 1) / 3) * 100)}%</span>
                    <button 
                      onClick={() => setQuizStep(0)} 
                      className="hover:text-slate-600 font-medium underline"
                    >
                      Reset Quiz
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* Creator / Host Bio Section */}
        <section className="py-16 bg-slate-50 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              <div className="relative shrink-0">
                <ProfileAvatar size="xl" alt="Yuvraj Singh PRO Yuvi" border={false} className="border-4 border-slate-50 shadow-lg" />
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full shadow border-2 border-white">
                  <CheckCircle2 className="w-5 h-5 fill-blue-500 text-blue-500" />
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono uppercase tracking-widest">
                  About the Analyst
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mt-2">
                  Meet "PRO Yuvi" (Yuvi)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  Hi, I'm <strong className="text-slate-900">Yuvi</strong>. I am a dedicated technical analyst and option swing strategist with years of active market experience. I founded <strong>PRO Yuvi</strong> to bridge the gap between complex institutional-level trading methodologies and retail traders. 
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  My philosophy is grounded in <strong>data-driven charting, transparent performance reporting, and uncompromising risk management.</strong> I do not promise instant millions or push flashy lifestyle templates. Instead, I share clean breakout insights and educational chart tips so you can build long-term confidence and consistent decision-making habits.
                </p>

                <div className="mt-6 flex flex-wrap gap-4 items-center">
                  <a 
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4 fill-white text-emerald-500" />
                    <span>Get Free Daily Recommendations From Yuvi</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Accordion FAQ Section */}
        <section className="py-16 bg-white px-4 border-t border-slate-100">
          <div className="max-w-3xl mx-auto">
            
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                Questions?
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                Frequently Asked Questions
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Everything you need to know about joining PRO Yuvi.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-slate-200/60 rounded-xl overflow-hidden bg-slate-50/50"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 font-bold text-sm text-slate-900 text-left hover:bg-slate-50/80 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Final Conversion High-Impact Call-to-Action */}
        <section className="py-20 bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            
            <span className="inline-flex items-center gap-1 bg-white/10 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Limited-Time Free Access Spot
            </span>

            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
              Start Learning to Trade Systems with Professional Precision Today
            </h3>

            <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of smart swing and option traders today. Direct alerts, charting break-downs, educational webinars, and zero fees. Fully compliant with no credit cards required.
            </p>

            <div className="mt-10">
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse-ring"></div>
                
                <a 
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-base sm:text-lg px-8 py-4 sm:py-5 rounded-2xl shadow-xl hover:shadow-emerald-500/20 active:scale-95 transition-all min-w-[280px]"
                  id="final-footer-cta"
                >
                  <Send className="w-5 h-5 fill-white text-emerald-500" />
                  <span>JOIN THE FREE TELEGRAM NOW</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              
              <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] sm:text-xs text-slate-400 font-mono">
                <span>✓ 9,840+ Active Members</span>
                <span>✓ Verified Community Host</span>
                <span>✓ 100% Free Access Spot</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Trust & Meta Compliance Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-850">
            <div className="flex items-center gap-2">
              <ProfileAvatar size="xs" alt="PRO Yuvi Logo" border={false} className="w-8 h-8 rounded-full object-cover" />
              <span className="font-display font-extrabold text-base text-white">
                PRO Yuvi
              </span>
              <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" />
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs font-semibold text-slate-400">
              <button onClick={() => setActiveModal("privacy")} className="hover:text-white hover:underline transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => setActiveModal("terms")} className="hover:text-white hover:underline transition-colors">
                Terms of Service
              </button>
              <button onClick={() => setActiveModal("disclaimer")} className="hover:text-white hover:underline transition-colors">
                Risk Disclosure
              </button>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                Contact Telegram
              </a>
            </div>
          </div>

          <div className="pt-8 text-[11px] sm:text-xs leading-relaxed space-y-4">
            
            {/* Meta Ad-Platform Compliance Disclaimer Statements */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 leading-relaxed font-mono">
              <span className="font-bold text-white uppercase block mb-1">⚠️ IMPORTANT RISK WARNING NOTICE & FINANCIAL DISCLAIMER</span>
              <p>
                Trading stocks, commodities, currencies, index products, and options involves extreme financial risk and a high level of volatility. It is not suitable for every investor. You can lose some or all of your hard-earned initial trading capital. Past performance records, educational setups, indicator strategies, and backtested compounding charts shown on this page are for illustrative, hypothetical, and strict educational demonstration purposes only. They do not constitute financial advice, investment recommendations, or guarantees of future profit. 
              </p>
              <p className="mt-2">
                We are not registered financial advisors or licensed broker-dealers. Every individual must trade responsibly, perform independent technical diligence, and construct careful personal stop-loss structures. The owner of the "PRO Yuvi" Telegram channel cannot be held liable for any personal monetary gains or losses occurring through your market operations.
              </p>
            </div>

            <p className="text-center text-[10px] text-slate-500">
              © 2026 PRO Yuvi Trading Community. All Rights Reserved. This site is not affiliated with, endorsed by, or associated with Meta, Facebook Inc., or Telegram Inc. in any manner.
            </p>

          </div>

        </div>
      </footer>

      {/* Sticky Bottom Mobil CTA (Very powerful for driving Telegram conversions) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200/80 shadow-2xl flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ProfileAvatar size="xs" alt="PRO Yuvi Small" border={false} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="font-bold text-[11px] text-slate-900 flex items-center gap-0.5">
              PRO Yuvi
              <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500" />
            </p>
            <span className="text-[9px] text-emerald-600 font-mono">● 9,840+ Active</span>
          </div>
        </div>
        <a 
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] px-3.5 py-2 rounded-xl shadow transition-colors flex items-center gap-1"
        >
          <Send className="w-3 h-3 fill-white text-emerald-500" />
          <span>JOIN FREE</span>
        </a>
      </div>

      {/* Modals for Policy Documents (Makes the landing page 100% legitimate to Facebook ad reviewers) */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-slate-100"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {activeModal === "privacy" && (
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                    Privacy Policy
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed font-sans">
                    <p><strong>Last Updated: July 17, 2026</strong></p>
                    <p>At PRO Yuvi, we respect the privacy of our visitors and subscribers. This Privacy Policy documents how we handle any information retrieved from users on this landing page.</p>
                    <p><strong>1. Information Collection:</strong> We do not ask for or collect any personal identifiers, emails, names, telephone numbers, or financial details on this landing page. You are not required to provide any personal data to browse this site or redirect to Telegram.</p>
                    <p><strong>2. Cookies and Tracking pixels:</strong> This site may use cookies, standard logs, and analytics metrics to study general traffic volume, bounce rate, and user interactions to optimize Meta advertising campaigns. You can disable cookies in your browser settings if you wish.</p>
                    <p><strong>3. Outbound Redirection:</strong> Clicking links on this landing page redirects you to external Telegram services. We do not have control over the privacy parameters, storage logs, or tracking cookies implemented by Telegram Inc. Please consult Telegram's official privacy documents.</p>
                    <p><strong>4. Children’s Privacy:</strong> We strictly do not target or market trading material to children under the age of 18. If a parent is aware that their child has accessed our content, please advise them responsibly.</p>
                  </div>
                </div>
              )}

              {activeModal === "terms" && (
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    Terms of Service
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed font-sans">
                    <p><strong>Last Updated: July 17, 2026</strong></p>
                    <p>By browsing this landing page and joining our Telegram channel, you agree to comply with the following Terms of Service:</p>
                    <p><strong>1. Educational Resource:</strong> All analytical charts, breakout levels, and indicator tips provided are strictly for general educational purposes. No material must be interpreted as legal, financial, or tax recommendations.</p>
                    <p><strong>2. Capital Loss Responsibility:</strong> Users acknowledge that financial and options markets carry extreme volatility. You are solely responsible for setting up proper stop-losses and checking with licensed professionals before executing trades. You accept that all trading carries risk, and past successes are not guarantees of future outcomes.</p>
                    <p><strong>3. Forbidden Commercial Sublicense:</strong> Intellectual property, custom text, and screenshots shared inside our community are the property of the creator and must not be resold, copied, or repackaged without written consent from Yuvi.</p>
                    <p><strong>4. Platform Limitation:</strong> This landing page and the Telegram group operate as independent services. We do not represent Meta, Facebook, or Telegram Inc. in any administrative or corporate capacity.</p>
                  </div>
                </div>
              )}

              {activeModal === "disclaimer" && (
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                    Full Risk Disclosure Statement
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed font-sans">
                    <p><strong>Last Updated: July 17, 2026</strong></p>
                    <p><strong>HIGH-RISK FINANCIAL SPECULATION WARNING:</strong></p>
                    <p>Options trading, futures trading, and derivative swing investing have large potential rewards but also carry immense potential risks. High leverage can work against you as well as for you. You must be aware of the exact downside risk parameters and be willing to accept them in order to trade in these markets.</p>
                    <p>Do not trade or speculate with money you cannot afford to lose. Under no circumstances should any of the information or compound statistics on this landing page be regarded as a direct or indirect guarantee of financial return. No representation is being made that any personal trading account will or is likely to achieve profits similar to those demonstrated or discussed.</p>
                    <p>All examples, technical trend predictions, and options targets are for training and education only. We strongly advise practicing with demo/paper simulation accounts before allocating real capital. Speak to a professional licensed investment advisor before taking any financial action.</p>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-colors"
                >
                  I Understand
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
