import React from "react";
import {
  Home,
  Layers,
  HeartHandshake,
  HelpCircle,
  Calculator,
  FileSearch,
  Bot,
  Scale,
  Building2,
  Bookmark,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { NavigationScreen } from "../types";

export const NavigationTabs: React.FC = () => {
  const { currentScreen, navigateTo, isTe } = useApp();

  const tabs: {
    id: NavigationScreen;
    labelTe: string;
    labelEn: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
    {
      id: "home",
      labelTe: "హోమ్",
      labelEn: "Home",
      icon: Home,
    },
    {
      id: "services",
      labelTe: "ప్రభుత్వ సేవలు",
      labelEn: "Citizen Services",
      icon: Layers,
    },
    {
      id: "schemes",
      labelTe: "సంక్షేమ పథకాలు",
      labelEn: "Schemes",
      icon: HeartHandshake,
      badge: "2026",
    },
    {
      id: "problems",
      labelTe: "సమస్యలు & పరిష్కారాలు",
      labelEn: "Problems & Guides",
      icon: HelpCircle,
    },
    {
      id: "land_tools",
      labelTe: "భూమి కొలతలు (Land Tools)",
      labelEn: "Land Area Tools",
      icon: Calculator,
    },
    {
      id: "tracking",
      labelTe: "దరఖాస్తు స్థితి",
      labelEn: "Track Application",
      icon: FileSearch,
    },
    {
      id: "ai_assistant",
      labelTe: "AI అసిస్టెంట్",
      labelEn: "AI Assistant",
      icon: Bot,
      badge: "AI",
    },
    {
      id: "ror_appeal",
      labelTe: "ROR అప్పీల్ & చట్టాలు",
      labelEn: "ROR & RTI Guides",
      icon: Scale,
    },
    {
      id: "administrative_directory",
      labelTe: "సచివాలయాల డైరెక్టరీ",
      labelEn: "AP Directory",
      icon: Building2,
    },
  ];

  return (
    <nav className="bg-[#081F38] border-b border-blue-900/50 shadow-inner overflow-x-auto">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center gap-1 sm:gap-1.5 py-1.5 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => navigateTo(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all select-none ${
                isActive
                  ? "bg-[#133B68] text-white border border-amber-400/60 shadow-sm"
                  : "text-blue-200 hover:text-white hover:bg-blue-900/50 border border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-blue-300"}`} />
              <span>{isTe ? tab.labelTe : tab.labelEn}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                    isActive
                      ? "bg-amber-400 text-slate-950"
                      : "bg-blue-700/60 text-amber-300"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
