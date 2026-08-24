import React from "react";
import {
  Building,
  Phone,
  Globe,
  ShieldCheck,
  Heart,
  Scale,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const Footer: React.FC = () => {
  const { isTe, navigateTo } = useApp();

  return (
    <footer className="bg-[#07182C] text-slate-300 border-t border-blue-950 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          {/* Col 1: Brand & State Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-700 text-amber-300 flex items-center justify-center font-bold border border-amber-400/40">
                <Building className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white font-serif tracking-tight">
                Praja<span className="text-amber-400">Mitra</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed">
              {isTe
                ? "ఆంధ్రప్రదేశ్ ప్రభుత్వ అధికారిక పౌర సేవల వేదిక. రెవెన్యూ రికార్డులు, ఆస్తి రిజిస్ట్రేషన్లు, పంచాయతీ రాజ్ సేవలు మరియు సంక్షేమ పథకాల ఏకీకృత డిజిటల్ పోర్టల్."
                : "Official Citizen Services Gateway of Andhra Pradesh. Unified platform for Webland records, Property Registrations, Panchayat Raj services, and flagship welfare schemes."}
            </p>

            <div className="pt-1 text-[11px] text-amber-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                {isTe
                  ? "ఆంధ్రప్రదేశ్ పౌర సేవల హక్కుల చట్టం"
                  : "Protected under AP Citizen Charter Act"}
              </span>
            </div>
          </div>

          {/* Col 2: Official Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-serif">
              {isTe ? "అధికారిక ప్రభుత్వ పోర్టల్స్" : "Official State Portals"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://meebhoomi.ap.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                  <span>Meebhoomi (మీభూమి పోర్టల్)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://registration.ap.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                  <span>IGRS AP (రిజిస్ట్రేషన్ & స్టాంపులు)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://gramawardsachivalayam.ap.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                  <span>Grama & Ward Sachivalayam (GSWS)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://spandana.ap.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                  <span>Spandana 1902 Grievance Portal</span>
                </a>
              </li>
              <li>
                <a
                  href="https://ccla.ap.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                  <span>CCLA AP (భూమి పరిపాలన కమిషనరేట్)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-serif">
              {isTe ? "ముఖ్యమైన విభాగాలు" : "Quick Citizen Links"}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo("services")}
                  className="hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-blue-400" />
                  <span>{isTe ? "అన్ని పౌర సేవలు" : "Citizen Services (MeeSeva)"}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("schemes")}
                  className="hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-blue-400" />
                  <span>{isTe ? "సంక్షేమ పథకాలు (2026)" : "Flagship Schemes 2026"}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("land_tools")}
                  className="hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-blue-400" />
                  <span>{isTe ? "భూమి కొలతల కాలిక్యులేటర్" : "Land Measurement Tools"}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("ror_appeal")}
                  className="hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-blue-400" />
                  <span>{isTe ? "ROR అప్పీల్ & చట్టాలు" : "ROR Act & Legal Guides"}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("tracking")}
                  className="hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-blue-400" />
                  <span>{isTe ? "దరఖాస్తు స్థితి ట్రాకింగ్" : "Application Status Tracking"}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: 24x7 Helplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-serif">
              {isTe ? "24x7 హెల్ప్‌లైన్లు & అత్యవసరం" : "Emergency & Helplines"}
            </h4>

            <div className="space-y-2 bg-[#0E2A4D] p-4 rounded-2xl border border-blue-900">
              <div className="flex items-center justify-between border-b border-blue-900 pb-2">
                <span className="text-slate-300">
                  {isTe ? "స్పందన పౌర గ్రీవెన్స్:" : "Spandana Grievance:"}
                </span>
                <span className="font-bold text-amber-400 font-mono text-sm">1902</span>
              </div>

              <div className="flex items-center justify-between border-b border-blue-900 pb-2">
                <span className="text-slate-300">
                  {isTe ? "మీభూమి భూ రికార్డులు:" : "Meebhoomi Support:"}
                </span>
                <span className="font-bold text-amber-400 font-mono text-xs">1800-425-4440</span>
              </div>

              <div className="flex items-center justify-between border-b border-blue-900 pb-2">
                <span className="text-slate-300">
                  {isTe ? "దిశ మహిళా భద్రత:" : "Disha Women SOS:"}
                </span>
                <span className="font-bold text-amber-400 font-mono text-sm">181 / 112</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">
                  {isTe ? "ఆరోగ్యశ్రీ హెల్ప్ డెస్క్:" : "Aarogyasri Health:"}
                </span>
                <span className="font-bold text-amber-400 font-mono text-sm">104</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-blue-950/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © 2026 PrajaMitra • Government of Andhra Pradesh. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              {isTe ? "నిర్వహణ: ప్రజా సేవల విభాగం" : "Maintained by AP Citizen Portal"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
