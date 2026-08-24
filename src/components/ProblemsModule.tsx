import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Globe,
  FileCheck,
  Bookmark,
  Volume2,
  Layers,
  ArrowRight,
  ShieldAlert,
  Send,
  Building,
  Landmark,
  Home,
  Scale,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { DEPARTMENT_METAS, PROBLEMS_DATA } from "../data/problemsData";
import { ProblemServiceItem, DepartmentType } from "../types";

export const ProblemsModule: React.FC = () => {
  const {
    isTe,
    isBookmarked,
    toggleBookmark,
    speakText,
    isSpeaking,
    stopSpeaking,
    navigateTo,
    applyForService,
  } = useApp();

  const [activeDept, setActiveDept] = useState<DepartmentType>("revenue");
  const [problemSearch, setProblemSearch] = useState<string>("");
  const [expandedProblemId, setExpandedProblemId] = useState<string | null>(null);

  const currentProblems = PROBLEMS_DATA[activeDept] || [];

  const filteredProblems = currentProblems.filter((item) => {
    if (!problemSearch.trim()) return true;
    const q = problemSearch.toLowerCase().trim();
    return (
      item.serviceName.toLowerCase().includes(q) ||
      item.serviceCode.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.commonProblems.some(
        (cp) =>
          cp.problem.toLowerCase().includes(q) ||
          cp.solution.toLowerCase().includes(q)
      )
    );
  });

  const toggleExpand = (id: string) => {
    setExpandedProblemId((prev) => (prev === id ? null : id));
  };

  const handleAudio = (e: React.MouseEvent, item: ProblemServiceItem) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const text = `${item.serviceName}. విభాగం: ${item.department}. వివరణ: ${item.description}. సాధారణ సమస్య: ${
        item.commonProblems[0]?.problem || ""
      }. పరిష్కారం: ${item.commonProblems[0]?.solution || ""}`;
      speakText(text);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isTe ? "సమస్యల పరిష్కార వేదిక" : "Citizen Guidance & Solutions"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {isTe ? "శాఖల వారీగా సమస్యలు & పరిష్కారాలు" : "Problems & Step-by-Step Solutions"}
          </h1>

          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            {isTe
              ? "రెవెన్యూ, రిజిస్ట్రేషన్ మరియు పంచాయతీ రాజ్ శాఖల్లో పౌరులు తరచుగా ఎదుర్కొనే సమస్యలు, తిరస్కరణ కారణాలు మరియు చట్టబద్ధమైన పరిష్కార మార్గాలు."
              : "Comprehensive citizen guidance for revenue records, property registration bottlenecks, and panchayat raj services with official resolution steps."}
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg pt-2">
            <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={problemSearch}
              onChange={(e) => setProblemSearch(e.target.value)}
              placeholder={
                isTe
                  ? "సమస్య పేరు, సర్వీస్ కోడ్ లేదా పరిష్కారం శోధించండి..."
                  : "Search problems, service code, or keywords..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#133B68] text-white placeholder-blue-200 text-xs sm:text-sm border border-blue-400/30 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* DEPARTMENT TABS (Revenue / Registration / Panchayat Raj) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {DEPARTMENT_METAS.map((dept) => {
          const isActive = activeDept === dept.key;
          const count = (PROBLEMS_DATA[dept.key] || []).length;

          return (
            <button
              key={dept.key}
              id={`dept-tab-${dept.key}`}
              onClick={() => {
                setActiveDept(dept.key);
                setExpandedProblemId(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                isActive
                  ? "bg-[#0B2545] text-white border-amber-400 shadow-md ring-2 ring-blue-700/20"
                  : "bg-white text-slate-800 border-slate-200 hover:bg-blue-50/50 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isActive
                      ? "bg-amber-400 text-slate-950"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {dept.key === "revenue" ? (
                    <Landmark className="w-5 h-5" />
                  ) : dept.key === "registration" ? (
                    <FileCheck className="w-5 h-5" />
                  ) : (
                    <Home className="w-5 h-5" />
                  )}
                </div>

                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    isActive
                      ? "bg-blue-800 text-amber-300"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count} {isTe ? "సేవలు" : "Guides"}
                </span>
              </div>

              <h3 className="text-sm font-bold leading-tight mb-1">
                {isTe ? dept.titleTe : dept.titleEn}
              </h3>
              <p
                className={`text-[11px] line-clamp-2 leading-relaxed ${
                  isActive ? "text-blue-200" : "text-slate-500"
                }`}
              >
                {isTe ? dept.subTitleTe : dept.subTitleEn}
              </p>
            </button>
          );
        })}
      </div>

      {/* Quick Jump Links to Legal Guidance Pages */}
      <div className="bg-slate-100 border border-slate-200/80 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-bold text-slate-700">
          {isTe ? "త్వరిత మార్గదర్శకాలు:" : "Quick Citizen Guides:"}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigateTo("ror_appeal")}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-blue-900 font-bold hover:bg-blue-50 transition-colors"
          >
            ⚖️ {isTe ? "ROR అప్పీల్ మార్గదర్శకం" : "ROR Appeal Guide"}
          </button>
          <button
            onClick={() => navigateTo("rti_guidance")}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-blue-900 font-bold hover:bg-blue-50 transition-colors"
          >
            📜 {isTe ? "RTI చట్టం దరఖాస్తు" : "RTI Act 2005"}
          </button>
          <button
            onClick={() => navigateTo("complaint_guidance")}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-blue-900 font-bold hover:bg-blue-50 transition-colors"
          >
            📢 {isTe ? "స్పందన 1902 గ్రీవెన్స్" : "Spandana 1902"}
          </button>
          <button
            onClick={() => navigateTo("land_tools")}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-blue-900 font-bold hover:bg-blue-50 transition-colors"
          >
            📐 {isTe ? "భూమి కొలతల కాలిక్యులేటర్" : "Land Area Calculator"}
          </button>
        </div>
      </div>

      {/* List of Problems / Services */}
      <div className="space-y-4">
        {filteredProblems.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-2">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">
              {isTe ? "సమస్యలు కనుగొనబడలేదు" : "No guidance items found"}
            </h3>
            <p className="text-xs text-slate-500">
              {isTe ? "వేరొక పదం ద్వారా శోధించండి" : "Try searching with different keywords"}
            </p>
          </div>
        ) : (
          filteredProblems.map((item) => {
            const isExpanded = expandedProblemId === item.id;
            const bookmarked = isBookmarked(item.id);

            return (
              <div
                key={item.id}
                id={`problem-card-${item.id}`}
                className="bg-white border border-slate-200/80 hover:border-blue-400 rounded-2xl overflow-hidden shadow-xs transition-all"
              >
                {/* Collapsible Header */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer select-none bg-slate-50/40 hover:bg-blue-50/30 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                        {item.serviceCode}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        • {item.department}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                      {item.serviceName}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 pt-1">
                    <button
                      onClick={(e) => handleAudio(e, item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-100 transition-colors"
                      title="Audio TTS"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark({
                          type: "PROBLEM",
                          itemId: item.id,
                          titleTe: item.serviceName,
                          titleEn: item.serviceName,
                          departmentTe: item.department,
                          departmentEn: item.department,
                          timestamp: Date.now(),
                        });
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                      title="Bookmark Guide"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          bookmarked ? "fill-amber-500 text-amber-500" : ""
                        }`}
                      />
                    </button>

                    <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-blue-800" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 border-t border-slate-200 bg-white space-y-6 text-xs text-slate-700 animate-in fade-in">
                    {/* Common Problems & Solutions Accordion / Cards */}
                    {item.commonProblems && item.commonProblems.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>{isTe ? "తరచుగా వచ్చే సమస్యలు & పరిష్కారాలు" : "Common Problems & Exact Solutions"}</span>
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {item.commonProblems.map((cp, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200 space-y-1.5"
                            >
                              <p className="font-bold text-amber-950 flex items-start gap-1.5">
                                <span className="text-amber-700 shrink-0 font-mono">Q{idx + 1}:</span>
                                <span>{cp.problem}</span>
                              </p>
                              <p className="text-slate-700 pl-4 border-l-2 border-amber-400 leading-relaxed font-medium">
                                <strong className="text-emerald-800 mr-1">
                                  {isTe ? "పరిష్కారం: " : "Solution: "}
                                </strong>
                                {cp.solution}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Eligibility & Required Documents Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.eligibility && item.eligibility.length > 0 && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <h4 className="font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-blue-700" />
                            <span>{isTe ? "అర్హతలు (Eligibility)" : "Eligibility"}</span>
                          </h4>
                          <ul className="space-y-1 list-disc list-inside text-slate-600">
                            {item.eligibility.map((el, i) => (
                              <li key={i} className="leading-relaxed">
                                {el}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.requiredDocuments && item.requiredDocuments.length > 0 && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <h4 className="font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                            <FileCheck className="w-4 h-4 text-blue-700" />
                            <span>{isTe ? "అవసరమైన పత్రాలు (Documents)" : "Required Documents"}</span>
                          </h4>
                          <ul className="space-y-1 list-disc list-inside text-slate-600">
                            {item.requiredDocuments.map((doc, i) => (
                              <li key={i} className="leading-relaxed">
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Rejection Reasons & Citizen Tips */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.rejectionReasons && item.rejectionReasons.length > 0 && (
                        <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 space-y-2">
                          <h4 className="font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
                            <ShieldAlert className="w-4 h-4 text-red-600" />
                            <span>{isTe ? "తిరస్కరణకు కారణాలు" : "Reasons for Rejection"}</span>
                          </h4>
                          <ul className="space-y-1 list-disc list-inside text-red-900/80">
                            {item.rejectionReasons.map((rr, i) => (
                              <li key={i}>{rr}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.citizenTips && item.citizenTips.length > 0 && (
                        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                          <h4 className="font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>{isTe ? "పౌరులకు ముఖ్యమైన సూచనలు" : "Citizen Tips"}</span>
                          </h4>
                          <ul className="space-y-1 list-disc list-inside text-emerald-900/80">
                            {item.citizenTips.map((tip, i) => (
                              <li key={i}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Helpline & Action */}
                    {item.helpline && (
                      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-blue-800" />
                          <div>
                            <span className="font-bold text-blue-950">
                              {item.helpline.department}
                            </span>
                            {item.helpline.phone && (
                              <span className="text-amber-800 font-bold ml-2">
                                📞 {item.helpline.phone}
                              </span>
                            )}
                          </div>
                        </div>

                        {item.helpline.website && (
                          <a
                            href={item.helpline.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-800 hover:text-blue-950 font-bold underline"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>{item.helpline.website}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
