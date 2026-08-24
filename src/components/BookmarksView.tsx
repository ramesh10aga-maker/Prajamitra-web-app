import React from "react";
import {
  Bookmark,
  Trash2,
  ExternalLink,
  ChevronRight,
  Send,
  Layers,
  HeartHandshake,
  HelpCircle,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { GOVERNMENT_SERVICES } from "../data/governmentServices";

export const BookmarksView: React.FC = () => {
  const { isTe, bookmarks, toggleBookmark, setSelectedService, navigateTo } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isTe ? "మీరు భద్రపరిచిన సమాచారం" : "Saved Citizen Bookmarks"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {isTe ? "భద్రపరిచిన సేవలు & పథకాలు" : "Bookmarked Services & Guides"}
          </h1>

          <p className="text-xs sm:text-sm text-blue-200">
            {isTe
              ? "మీరు భద్రపరిచిన ప్రభుత్వ సేవలు, పథకాలు మరియు సమస్యల పరిష్కార గైడ్‌లను ఇక్కడ సులభంగా వీక్షించవచ్చు."
              : "Quick access to your pinned state services, flagship schemes, and statutory guidelines."}
          </p>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            {isTe ? "ఎలాంటి బుక్‌మార్క్‌లు లేవు" : "No Saved Bookmarks Yet"}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {isTe
              ? "ఏదైనా సేవ లేదా పథకం కార్డుపై ఉన్న బుక్‌మార్క్ ఐకాన్‌ను క్లిక్ చేసి ఇక్కడ భద్రపరుచుకోవచ్చు."
              : "Click the bookmark icon on any service, scheme, or problem guide card to save it for quick offline access."}
          </p>
          <button
            onClick={() => navigateTo("services")}
            className="px-5 py-2.5 rounded-xl bg-[#0B2545] text-white font-bold text-xs"
          >
            {isTe ? "సేవలను అన్వేషించండి" : "Explore Services"}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((b) => {
            return (
              <div
                key={`${b.type}-${b.itemId}`}
                className="bg-white border border-slate-200/80 hover:border-blue-400 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      b.type === "SERVICE"
                        ? "bg-blue-100 text-blue-900"
                        : b.type === "SCHEME"
                        ? "bg-amber-100 text-amber-900"
                        : "bg-emerald-100 text-emerald-900"
                    }`}
                  >
                    {b.type === "SERVICE" ? (
                      <Layers className="w-5 h-5" />
                    ) : b.type === "SCHEME" ? (
                      <HeartHandshake className="w-5 h-5" />
                    ) : (
                      <HelpCircle className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                        {b.type}
                      </span>
                      <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
                        {isTe ? b.departmentTe : b.departmentEn}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                      {isTe ? b.titleTe : b.titleEn}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (b.type === "SERVICE") {
                        const s = GOVERNMENT_SERVICES.find((g) => g.id === Number(b.itemId));
                        if (s) {
                          setSelectedService(s);
                        } else {
                          navigateTo("services");
                        }
                      } else if (b.type === "SCHEME") {
                        navigateTo("schemes");
                      } else {
                        navigateTo("problems");
                      }
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>{isTe ? "చూడండి" : "View"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => toggleBookmark(b)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
