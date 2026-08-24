import React, { useState } from "react";
import {
  HeartHandshake,
  Search,
  ExternalLink,
  Bookmark,
  Volume2,
  CheckCircle2,
  FileCheck,
  Coins,
  Send,
  Building,
  GraduationCap,
  Wheat,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { AP_GOVERNMENT_SCHEMES } from "../data/schemesData";
import { SchemeItem } from "../types";

export const SchemesDashboard: React.FC = () => {
  const {
    isTe,
    isBookmarked,
    toggleBookmark,
    speakText,
    isSpeaking,
    stopSpeaking,
    applyForService,
  } = useApp();

  const [schemeCategory, setSchemeCategory] = useState<string>("all");
  const [searchScheme, setSearchScheme] = useState<string>("");

  const categories = [
    { id: "all", labelTe: "అన్ని పథకాలు (All)", labelEn: "All Schemes" },
    { id: "education", labelTe: "విద్య (Education)", labelEn: "Education" },
    { id: "farmers", labelTe: "రైతులు & వ్యవసాయం", labelEn: "Farmers & Agri" },
    { id: "women", labelTe: "మహిళా & పేదరిక నిర్మూలన", labelEn: "Women Welfare" },
    { id: "pension", labelTe: "సామాజిక భద్రతా పింఛన్లు", labelEn: "Pensions" },
    { id: "health", labelTe: "వైద్య & ఆరోగ్యం", labelEn: "Healthcare" },
  ];

  const filteredSchemes = AP_GOVERNMENT_SCHEMES.filter((sc) => {
    const matchesCategory =
      schemeCategory === "all" || sc.category === schemeCategory;
    const q = searchScheme.toLowerCase().trim();
    const matchesSearch =
      !q ||
      sc.nameTe.toLowerCase().includes(q) ||
      sc.nameEn.toLowerCase().includes(q) ||
      sc.departmentTe.toLowerCase().includes(q) ||
      sc.departmentEn.toLowerCase().includes(q) ||
      sc.benefitAmountTe.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleAudio = (e: React.MouseEvent, scheme: SchemeItem) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const txt = isTe
        ? `${scheme.nameTe}. ${scheme.taglineTe}. లబ్ధి మొత్తం: ${scheme.benefitAmountTe}. శాఖ: ${scheme.departmentTe}.`
        : `${scheme.nameEn}. ${scheme.taglineEn}. Benefit: ${scheme.benefitAmountEn}. Department: ${scheme.departmentEn}.`;
      speakText(txt);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{isTe ? "ఆంధ్రప్రదేశ్ ప్రభుత్వ సంక్షేమ పథకాలు" : "AP Flagship Welfare Schemes"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {isTe ? "నవరత్నాలు & ప్రధాన ప్రజా సంక్షేమ పథకాలు" : "Citizen Welfare & Empowerment Schemes"}
          </h1>

          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            {isTe
              ? "తల్లికి వందనం, అన్నదాత సుఖీభవ, దీపం 2.0 ఉచిత సిలిండర్లు, ఎన్టీఆర్ భరోసా పింఛన్లు, ఆరోగ్యశ్రీ సమగ్ర నిబంధనలు మరియు అర్హతల వివరాలు."
              : "Detailed guidelines, eligibility criteria, required documents, and benefit disbursals for all flagship state government programs."}
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg pt-2">
            <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchScheme}
              onChange={(e) => setSearchScheme(e.target.value)}
              placeholder={
                isTe
                  ? "పథకం పేరు, శాఖ లేదా ప్రయోజనం శోధించండి..."
                  : "Search schemes, amounts, or department..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#133B68] text-white placeholder-blue-200 text-xs sm:text-sm border border-blue-400/30 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = schemeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSchemeCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                isSelected
                  ? "bg-[#0B2545] text-white border-amber-400 shadow-md ring-2 ring-blue-700/20"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-300"
              }`}
            >
              {isTe ? cat.labelTe : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => {
          const bookmarked = isBookmarked(scheme.id);

          return (
            <div
              key={scheme.id}
              id={`scheme-card-${scheme.id}`}
              className="bg-white border border-slate-200/80 hover:border-blue-500 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group space-y-5"
            >
              <div className="space-y-3">
                {/* Badge & Actions */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200">
                      {isTe ? scheme.departmentTe : scheme.departmentEn}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      {scheme.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleAudio(e, scheme)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      title="Audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        toggleBookmark({
                          type: "SCHEME",
                          itemId: scheme.id,
                          titleTe: scheme.nameTe,
                          titleEn: scheme.nameEn,
                          departmentTe: scheme.departmentTe,
                          departmentEn: scheme.departmentEn,
                          timestamp: Date.now(),
                        })
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                      title="Bookmark"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          bookmarked ? "fill-amber-500 text-amber-500" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Scheme Title */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-800 transition-colors leading-snug font-serif">
                    {isTe ? scheme.nameTe : scheme.nameEn}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    {isTe ? scheme.taglineTe : scheme.taglineEn}
                  </p>
                </div>

                {/* Benefit Amount Callout Box */}
                <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs font-bold text-lg">
                    ₹
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-900 tracking-wider block">
                      {isTe ? "ఆర్థిక లబ్ధి / సహాయం:" : "Financial Assistance:"}
                    </span>
                    <strong className="text-xs sm:text-sm font-extrabold text-amber-950 leading-tight block">
                      {isTe ? scheme.benefitAmountTe : scheme.benefitAmountEn}
                    </strong>
                  </div>
                </div>

                {/* Eligibility Criteria */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                    <span>{isTe ? "అర్హత నిబంధనలు:" : "Eligibility:"}</span>
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc">
                    {(isTe ? scheme.eligibilityTe : scheme.eligibilityEn).map(
                      (item, i) => (
                        <li key={i} className="leading-relaxed">
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Required Documents */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-blue-700" />
                    <span>{isTe ? "అవసరమైన పత్రాలు:" : "Required Documents:"}</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(isTe ? scheme.requiredDocsTe : scheme.requiredDocsEn).map(
                      (doc, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          📄 {doc}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-200"
                >
                  <span>{isTe ? "అధికారిక పోర్టల్" : "Official Portal"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    applyForService({
                      id: 990 + filteredSchemes.indexOf(scheme),
                      nameTe: scheme.nameTe,
                      nameEn: scheme.nameEn,
                      serviceRef: `AP-SCH-${scheme.id.toUpperCase()}`,
                      categoryId: "social_welfare",
                      departmentNameTe: scheme.departmentTe,
                      departmentNameEn: scheme.departmentEn,
                      overviewTe: scheme.taglineTe,
                      overviewEn: scheme.taglineEn,
                      eligibilityTe: scheme.eligibilityTe.join("\n"),
                      eligibilityEn: scheme.eligibilityEn.join("\n"),
                      documentsTe: scheme.requiredDocsTe.join("\n"),
                      documentsEn: scheme.requiredDocsEn.join("\n"),
                      deliveryTimeTe: "15 పని దినాలు",
                      deliveryTimeEn: "15 Working Days",
                      feesTe: "ఉచితం (Free)",
                      feesEn: "Nil (Free Citizen Service)",
                      onlineMethodTe: `అధికారిక వెబ్‌సైట్: ${scheme.officialUrl}`,
                      onlineMethodEn: `State Portal: ${scheme.officialUrl}`,
                      offlineMethodTe: "గ్రామ/వార్డు సచివాలయంలో సంక్షేమ సహాయకుడిని సంప్రదించండి.",
                      offlineMethodEn: "Visit local Village Secretariat Welfare Assistant.",
                      meesevaMethodTe: "మీసేవ పోర్టల్ ద్వారా దరఖాస్తు చేసుకోవచ్చు.",
                      meesevaMethodEn: "Available via MeeSeva & Citizen counter.",
                      officialWebsite: scheme.officialUrl,
                    });
                  }}
                  className="py-2 px-4 rounded-xl bg-[#0B2545] hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isTe ? "దరఖాస్తు ప్రారంభించండి" : "Apply Online"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
