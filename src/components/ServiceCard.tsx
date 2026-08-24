import React from "react";
import {
  Clock,
  Coins,
  Bookmark,
  ChevronRight,
  Send,
  Volume2,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { GovernmentService } from "../types";
import { useApp } from "../context/AppContext";

interface ServiceCardProps {
  service: GovernmentService;
  onViewDetails: (svc: GovernmentService) => void;
  onApply: (svc: GovernmentService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onViewDetails,
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

  const handleSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const summary = isTe
        ? `${service.nameTe}. శాఖ: ${service.departmentNameTe}. ఫీజు: ${service.feesTe}. సమయం: ${service.deliveryTimeTe}. ${service.overviewTe}`
        : `${service.nameEn}. Department: ${service.departmentNameEn}. Fees: ${service.feesEn}. Timeline: ${service.deliveryTimeEn}. ${service.overviewEn}`;
      speakText(summary);
    }
  };

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark({
      type: "SERVICE",
      itemId: service.id,
      titleTe: service.nameTe,
      titleEn: service.nameEn,
      departmentTe: service.departmentNameTe,
      departmentEn: service.departmentNameEn,
      timestamp: Date.now(),
    });
  };

  return (
    <div
      id={`service-card-${service.id}`}
      className="bg-white border border-slate-200/80 hover:border-blue-500 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Top Department Badge & Ref Number */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200">
              {isTe ? service.departmentNameTe : service.departmentNameEn}
            </span>
            <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              {service.serviceRef}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleSpeech}
              title="Voice Reader"
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleBookmarkToggle}
              title="Bookmark Service"
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  bookmarked ? "fill-amber-500 text-amber-500" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Service Title */}
        <h3
          onClick={() => onViewDetails(service)}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-800 transition-colors cursor-pointer leading-snug mb-1.5"
        >
          {isTe ? service.nameTe : service.nameEn}
        </h3>

        {/* Secondary Title in other language for clarity */}
        <p className="text-xs text-slate-500 font-medium line-clamp-1 mb-2">
          {isTe ? service.nameEn : service.nameTe}
        </p>

        {/* Short Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {isTe ? service.overviewTe : service.overviewEn}
        </p>
      </div>

      {/* Meta Pills (Delivery Time & Fees) & Action Buttons */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate font-semibold">
              {isTe ? service.deliveryTimeTe : service.deliveryTimeEn}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 text-slate-700">
            <Coins className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span className="truncate font-semibold">
              {isTe ? service.feesTe : service.feesEn}
            </span>
          </div>
        </div>

        {/* Action Buttons: View Details & Apply */}
        <div className="flex items-center gap-2">
          <button
            id={`btn-view-${service.id}`}
            onClick={() => onViewDetails(service)}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <span>{isTe ? "వివరాలు" : "Details"}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            id={`btn-apply-${service.id}`}
            onClick={() => onApply(service)}
            className="flex-1 py-2 px-3 rounded-xl bg-[#0B2545] hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-amber-300" />
            <span>{isTe ? "దరఖాస్తు చేయండి" : "Apply Now"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
