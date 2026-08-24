import React from "react";
import {
  Gavel,
  Languages,
  Search,
  Volume2,
  VolumeX,
  Bookmark,
  User,
  ShieldCheck,
  FileSearch,
  Bot,
  Building,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const Header: React.FC = () => {
  const {
    isTe,
    toggleLanguage,
    currentScreen,
    navigateTo,
    searchQuery,
    setSearchQuery,
    isSpeaking,
    stopSpeaking,
    user,
    bookmarks,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#0B2545] text-white border-b border-blue-900/60 shadow-md">
      {/* Top micro-bar: Official AP Gov Banner */}
      <div className="bg-[#07182C] border-b border-blue-950 px-4 py-1 text-[11px] text-slate-300 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
            <span>
              {isTe
                ? "ఆంధ్రప్రదేశ్ ప్రభుత్వం • పౌర సేవల అధికారిక పోర్టల్"
                : "Government of Andhra Pradesh • Official Citizen Services Portal"}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-300">
            <span>
              {isTe ? "టోల్‌ఫ్రీ గ్రీవెన్స్: " : "Tollfree Grievance: "}
              <strong className="text-amber-300 font-bold">1902</strong>
            </span>
            <span>|</span>
            <span>
              {isTe ? "భూ రికార్డుల హెల్ప్‌లైన్: " : "Land Helpline: "}
              <strong className="text-amber-300 font-bold">1800-425-4440</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div
          id="brand-header"
          onClick={() => navigateTo("home")}
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
        >
          {/* Emblem / Badge */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 to-[#0A2540] flex items-center justify-center shadow-lg border border-amber-400/40 text-amber-300 group-hover:scale-105 transition-transform">
            <Building className="w-6 h-6 text-amber-300" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white font-serif">
                Praja<span className="text-amber-400">Mitra</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                AP
              </span>
            </div>
            <p className="text-xs text-blue-200 font-medium">
              {isTe
                ? "ఆంధ్రప్రదేశ్ పౌర సేవల వేదిక"
                : "Andhra Pradesh Citizen Services"}
            </p>
          </div>
        </div>

        {/* Global Search Bar (Center) */}
        <div className="flex-1 max-w-lg mx-2 hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isTe
                  ? "సేవలు, రెవెన్యూ, ఈసీ, పథకాలు, సమస్యలు శోధించండి..."
                  : "Search services, revenue, EC, schemes, problems..."
              }
              className="w-full pl-10 pr-8 py-2 text-sm rounded-xl bg-[#133B68] border border-blue-400/30 text-white placeholder-blue-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-200 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Tracking Button */}
          <button
            id="header-track-btn"
            onClick={() => navigateTo("tracking")}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              currentScreen === "tracking"
                ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                : "bg-[#133B68] text-amber-300 border-blue-400/40 hover:bg-blue-800"
            }`}
            title="Track Application"
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span>{isTe ? "దరఖాస్తు స్థితి" : "Track Status"}</span>
          </button>

          {/* AI Assistant Button */}
          <button
            id="header-ai-btn"
            onClick={() => navigateTo("ai_assistant")}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              currentScreen === "ai_assistant"
                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md"
                : "bg-blue-800/80 text-blue-100 border-blue-400/40 hover:bg-blue-700"
            }`}
            title="AI Citizen Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isTe ? "AI సహాయకుడు" : "AI Assistant"}</span>
          </button>

          {/* Audio TTS Stop Button if speaking */}
          {isSpeaking && (
            <button
              id="stop-tts-btn"
              onClick={stopSpeaking}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-red-600/30 text-red-200 border border-red-400/40 text-xs font-semibold animate-pulse"
              title="Stop Voice"
            >
              <VolumeX className="w-3.5 h-3.5 text-red-300" />
              <span className="hidden sm:inline">
                {isTe ? "ఆడియో ఆపు" : "Stop Audio"}
              </span>
            </button>
          )}

          {/* Language Toggle Button */}
          <button
            id="lang-toggle-btn"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#133B68] hover:bg-blue-800 border border-blue-400/40 text-xs font-bold text-amber-300 transition-all shadow-sm"
            title="Toggle Language"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{isTe ? "English" : "తెలుగు"}</span>
          </button>

          {/* Bookmarks Button */}
          <button
            id="header-bookmarks-btn"
            onClick={() => navigateTo("bookmarks")}
            className={`relative p-2 rounded-xl border transition-colors ${
              currentScreen === "bookmarks"
                ? "bg-amber-400/20 text-amber-300 border-amber-400/50"
                : "bg-[#133B68] hover:bg-blue-800 text-blue-100 border-blue-400/40"
            }`}
            title="Saved Bookmarks"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-950 rounded-full text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                {bookmarks.length}
              </span>
            )}
          </button>

          {/* Profile / Login */}
          <button
            id="header-profile-btn"
            onClick={() => navigateTo(user.isLoggedIn ? "profile" : "login")}
            className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition-colors ${
              currentScreen === "profile"
                ? "bg-amber-400/20 text-amber-300 border-amber-400/50"
                : "bg-[#133B68] hover:bg-blue-800 text-white border-blue-400/40"
            }`}
          >
            <div className="w-6 h-6 rounded-lg bg-blue-900 flex items-center justify-center text-xs font-bold text-amber-300 border border-blue-700">
              {user.isLoggedIn ? user.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
            </div>
            <span className="text-xs font-medium hidden md:inline truncate max-w-[110px]">
              {user.isLoggedIn ? user.name.split(" ")[0] : (isTe ? "లాగిన్" : "Login")}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
