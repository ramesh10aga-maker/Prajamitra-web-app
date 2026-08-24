import React from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  FileSearch,
  CheckCircle2,
  Clock,
  LogOut,
  ShieldCheck,
  Building,
  ChevronRight,
  Printer,
  Bookmark,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const ProfileView: React.FC = () => {
  const {
    isTe,
    user,
    logout,
    applications,
    setTrackApplicationId,
    navigateTo,
    bookmarks,
  } = useApp();

  const handleTrackClick = (appId: string) => {
    setTrackApplicationId(appId);
    navigateTo("tracking");
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl mx-auto">
      {/* Profile Banner */}
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg border-2 border-white/20">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold font-serif">
                {user.name}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                {isTe ? "ఆధార్ ధృవీకరించబడింది" : "Aadhaar e-KYC Verified"}
              </span>
            </div>

            <p className="text-xs text-blue-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {user.village}, {user.mandal}, {user.district} District
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-200 border border-red-400/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isTe ? "లాగౌట్" : "Sign Out"}</span>
        </button>
      </div>

      {/* Account Info 3-Card Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <Phone className="w-4 h-4 text-blue-700" />
            <span>{isTe ? "మొబైల్ సంఖ్య" : "Registered Mobile"}</span>
          </div>
          <p className="text-sm font-bold text-slate-900 font-mono">
            +91 {user.mobile || "—"}
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <Mail className="w-4 h-4 text-emerald-700" />
            <span>{isTe ? "ఈమెయిల్ చిరునామా" : "Citizen Email"}</span>
          </div>
          <p className="text-sm font-bold text-slate-900 truncate">
            {user.email || "—"}
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <Bookmark className="w-4 h-4 text-amber-700" />
            <span>{isTe ? "భద్రపరిచిన సేవలు" : "Saved Bookmarks"}</span>
          </div>
          <p className="text-sm font-bold text-slate-900">
            {bookmarks.length} {isTe ? "అంశాలు" : "Saved Items"}
          </p>
        </div>
      </div>

      {/* Submitted Applications List */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-blue-800" />
              <span>{isTe ? "నా దరఖాస్తులు (My Submitted Applications)" : "My Submitted Applications"}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {isTe ? "ఆంధ్రప్రదేశ్ పోర్టల్ ద్వారా సమర్పించిన దరఖాస్తుల స్థితి" : "Live status tracking of your service requests"}
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
            {applications.length} {isTe ? "దరఖాస్తులు" : "Applications"}
          </span>
        </div>

        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-2xl border border-slate-200/90 hover:border-blue-400 bg-slate-50/40 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-950 bg-blue-100/80 px-2 py-0.5 rounded border border-blue-200">
                    {app.id}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {app.submittedAt.split(" ")[0]}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 font-serif">
                  {isTe ? app.serviceNameTe : app.serviceNameEn}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-1">
                  {app.purpose}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${
                    app.status === "APPROVED" || app.status === "COMPLETED"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : app.status === "UNDER_REVIEW"
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-blue-50 text-blue-800 border-blue-200"
                  }`}
                >
                  {app.status}
                </span>

                <button
                  onClick={() => handleTrackClick(app.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#0B2545] hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{isTe ? "ట్రాక్" : "Track"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
