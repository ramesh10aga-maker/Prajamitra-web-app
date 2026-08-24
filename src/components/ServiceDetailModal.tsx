import React from "react";
import {
  X,
  ExternalLink,
  Bookmark,
  Volume2,
  FileCheck,
  UserCheck,
  Layers,
  Clock,
  Coins,
  Building,
  Share2,
  CheckCircle2,
  Send,
  HelpCircle,
  FileText,
  Smartphone,
  Landmark,
} from "lucide-react";
import { GovernmentService } from "../types";
import { useApp } from "../context/AppContext";

interface ServiceDetailModalProps {
  service: GovernmentService;
  onClose: () => void;
  onApply: (svc: GovernmentService) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onApply,
}) => {
  const {
    isTe,
    isBookmarked,
    toggleBookmark,
    speakText,
    isSpeaking,
    stopSpeaking,
  } = useApp();

  const bookmarked = isBookmarked(service.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: isTe ? service.nameTe : service.nameEn,
          text: isTe ? service.overviewTe : service.overviewEn,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${isTe ? service.nameTe : service.nameEn}\n${service.officialWebsite}`
      );
      alert(isTe ? "లింక్ కాపీ చేయబడింది!" : "Link copied to clipboard!");
    }
  };

  const handleAudio = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const fullText = isTe
        ? `${service.nameTe}. శాఖ: ${service.departmentNameTe}. వివరణ: ${service.overviewTe}. అర్హత: ${service.eligibilityTe}. అవసరమైన పత్రాలు: ${service.documentsTe}. ఫీజు: ${service.feesTe}. డెలివరీ సమయం: ${service.deliveryTimeTe}.`
        : `${service.nameEn}. Department: ${service.departmentNameEn}. Overview: ${service.overviewEn}. Eligibility: ${service.eligibilityEn}. Documents required: ${service.documentsEn}. Fees: ${service.feesEn}. Processing time: ${service.deliveryTimeEn}.`;
      speakText(fullText);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div
        id="service-detail-modal"
        className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header (Government Blue) */}
        <div className="p-5 sm:p-6 bg-[#0B2545] text-white border-b border-blue-900 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-800 text-amber-300 border border-blue-600">
                {isTe ? service.departmentNameTe : service.departmentNameEn}
              </span>
              <span className="text-xs font-mono text-blue-200 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                {service.serviceRef}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug font-serif">
              {isTe ? service.nameTe : service.nameEn}
            </h2>
            <p className="text-xs text-blue-200 mt-1 font-medium">
              {isTe ? service.nameEn : service.nameTe}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleAudio}
              className={`p-2 rounded-xl border transition-colors ${
                isSpeaking
                  ? "bg-amber-400 text-slate-950 border-amber-300 animate-pulse"
                  : "bg-blue-800/80 text-blue-100 border-blue-700 hover:text-amber-300"
              }`}
              title="Listen Speech"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                toggleBookmark({
                  type: "SERVICE",
                  itemId: service.id,
                  titleTe: service.nameTe,
                  titleEn: service.nameEn,
                  departmentTe: service.departmentNameTe,
                  departmentEn: service.departmentNameEn,
                  timestamp: Date.now(),
                })
              }
              className={`p-2 rounded-xl border transition-colors ${
                bookmarked
                  ? "bg-amber-400 text-slate-950 border-amber-300"
                  : "bg-blue-800/80 text-blue-100 border-blue-700 hover:text-white"
              }`}
              title="Bookmark"
            >
              <Bookmark
                className={`w-4 h-4 ${bookmarked ? "fill-slate-950" : ""}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-blue-800/80 text-blue-100 border border-blue-700 hover:text-white transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-blue-800/80 text-blue-200 hover:text-white border border-blue-700 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm bg-slate-50/50">
          {/* Key Quick Info Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-semibold">
                  {isTe ? "సమయ పరిమితి (SLA)" : "Delivery Timeline"}
                </p>
                <p className="text-xs font-bold text-slate-900">
                  {isTe ? service.deliveryTimeTe : service.deliveryTimeEn}
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 border border-blue-200">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-semibold">
                  {isTe ? "ఫీజు / యూజర్ ఛార్జీలు" : "Service Statutory Fee"}
                </p>
                <p className="text-xs font-bold text-slate-900 truncate">
                  {isTe ? service.feesTe : service.feesEn}
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xs flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-semibold">
                  {isTe ? "సంబంధిత కార్యాలయం" : "Jurisdiction Office"}
                </p>
                <p className="text-xs font-bold text-slate-900 truncate">
                  {isTe ? service.departmentNameTe : service.departmentNameEn}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Overview */}
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-700" />
              <span>{isTe ? "సేవ యొక్క పూర్తి వివరాలు & లక్ష్యం" : "Overview & Objectives"}</span>
            </h4>
            <p className="text-slate-700 leading-relaxed">
              {isTe ? service.overviewTe : service.overviewEn}
            </p>
          </div>

          {/* Section: Eligibility */}
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span>{isTe ? "అర్హత నిబంధనలు (Eligibility Criteria)" : "Eligibility Criteria"}</span>
            </h4>
            <div className="text-slate-700 leading-relaxed whitespace-pre-line">
              {isTe ? service.eligibilityTe : service.eligibilityEn}
            </div>
          </div>

          {/* Section: Required Documents */}
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-700" />
              <span>{isTe ? "అవసరమైన పత్రాలు (Required Documents Checklist)" : "Required Documents Checklist"}</span>
            </h4>
            <div className="text-slate-700 leading-relaxed whitespace-pre-line bg-blue-50/40 p-3 rounded-xl border border-blue-100 font-medium">
              {isTe ? service.documentsTe : service.documentsEn}
            </div>
          </div>

          {/* Section: Step by Step Application Channels */}
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-slate-700" />
              <span>{isTe ? "దరఖాస్తు విధానాలు (Application Process Channels)" : "Application Process Channels"}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
                <p className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-blue-800 text-white flex items-center justify-center text-[10px]">1</span>
                  {isTe ? "ఆన్‌లైన్ పోర్టల్" : "Online Portal"}
                </p>
                <p className="text-slate-600 leading-normal">
                  {service.onlineMethodTe || (isTe ? "అధికారిక వెబ్‌సైట్ ద్వారా దరఖాస్తు చేసుకోవచ్చు." : "Apply directly through the state portal.")}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <p className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-700 text-white flex items-center justify-center text-[10px]">2</span>
                  {isTe ? "గ్రామ/వార్డు సచివాలయం" : "Sachivalayam Counter"}
                </p>
                <p className="text-slate-600 leading-normal">
                  {service.offlineMethodTe || (isTe ? "మీ స్థానిక సచివాలయంలో డిజిటల్ అసిస్టెంట్ / VRO ను సంప్రదించండి." : "Visit your local Village/Ward Secretariat.")}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <p className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">3</span>
                  {isTe ? "మీసేవ కేంద్రం (MeeSeva)" : "MeeSeva Center"}
                </p>
                <p className="text-slate-600 leading-normal">
                  {service.meesevaMethodTe || (isTe ? "సమీప మీసేవ కేంద్రంలో దరఖాస్తు చేసుకోండి." : "Available at any authorized MeeSeva counter.")}
                </p>
              </div>
            </div>
          </div>

          {/* Related G.O.s or FAQs if present */}
          {service.relatedGosTe && (
            <div className="bg-white border border-slate-200 p-4 rounded-2xl text-xs">
              <span className="font-bold text-slate-800">
                {isTe ? "సంబంధిత చట్టాలు & జీవోలు: " : "Related G.O.s & Legislation: "}
              </span>
              <span className="text-slate-600">{service.relatedGosTe}</span>
            </div>
          )}
        </div>

        {/* Modal Footer: Action Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              {isTe
                ? "ఆంధ్రప్రదేశ్ ప్రభుత్వ నిబంధనల ప్రకారం ధృవీకరించబడింది"
                : "Authenticated under AP Citizen Charter"}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {service.officialWebsite && (
              <a
                id="official-portal-link"
                href={service.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-300"
              >
                <span>{isTe ? "అధికారిక వెబ్‌సైట్" : "Official Portal"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              id="apply-from-modal-btn"
              onClick={() => onApply(service)}
              className="flex-1 sm:flex-none py-2.5 px-6 rounded-xl bg-[#0B2545] hover:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-950/20 transition-all"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>{isTe ? "ఆన్‌లైన్ దరఖాస్తు ఫారం" : "Open Application Form"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
