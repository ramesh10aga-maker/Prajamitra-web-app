import React, { useState, useEffect } from "react";
import {
  Search,
  FileSearch,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Printer,
  Building,
  Calendar,
  FileCheck,
  RotateCcw,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ApplicationStatus, PublicTrackingRecord } from "../types";
import { ApiService, ApiError } from "../api/apiService";

export const TrackingView: React.FC = () => {
  const { isTe, trackApplicationId, setTrackApplicationId, applications } = useApp();

  const [searchId, setSearchId] = useState<string>(trackApplicationId || "");
  const [currentRecord, setCurrentRecord] = useState<PublicTrackingRecord | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (trackApplicationId) {
      setSearchId(trackApplicationId);
      performTracking(trackApplicationId);
    }
  }, [trackApplicationId]);

  const performTracking = async (appId: string) => {
    const trimmed = appId.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setErrorMessage(null);
    setHasSearched(true);

    try {
      // 1. Try public tracking API endpoint from Spring Boot / PostgreSQL
      const data = await ApiService.trackPublicApplication(trimmed);
      setCurrentRecord(data);
    } catch (err: any) {
      // 2. If network error, check if the application is in the user's authenticated list
      const matchedLocal = applications.find(
        (a) => a.id.toUpperCase() === trimmed.toUpperCase()
      );
      if (matchedLocal) {
        setCurrentRecord({
          applicationNumber: matchedLocal.id,
          serviceId: typeof matchedLocal.serviceId === "number" ? matchedLocal.serviceId : undefined,
          serviceCode: matchedLocal.serviceRef,
          serviceName: matchedLocal.serviceNameEn,
          serviceNameTe: matchedLocal.serviceNameTe,
          categoryName: matchedLocal.departmentEn,
          categoryNameTe: matchedLocal.departmentTe,
          status: matchedLocal.status,
          submittedAt: matchedLocal.submittedAt,
          updatedAt: matchedLocal.lastUpdatedAt,
          statusHistory: (matchedLocal.statusHistory || []).map((h) => ({
            status: h.status,
            remarks: h.remarks,
            changedAt: h.timestamp,
            changedBy: h.officerTitle,
          })),
        });
      } else {
        setCurrentRecord(null);
        if (err instanceof ApiError) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage(
            isTe
              ? "దరఖాస్తు సంఖ్య కనుగొనబడలేదు. దయచేసి సరైన సంఖ్యను నమోదు చేయండి."
              : "Application record not found. Please verify the application number."
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchId.trim()) return;
    performTracking(searchId);
  };

  const selectMyApplication = (id: string) => {
    setSearchId(id);
    setTrackApplicationId(id);
    performTracking(id);
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "SUBMITTED":
        return {
          labelTe: "సమర్పించబడింది (SUBMITTED)",
          labelEn: "Submitted",
          bg: "bg-blue-100 text-blue-800 border-blue-300",
          icon: Clock,
        };
      case "UNDER_REVIEW":
        return {
          labelTe: "పరిశీలనలో ఉంది (UNDER REVIEW)",
          labelEn: "Under Review",
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          icon: Clock,
        };
      case "APPROVED":
        return {
          labelTe: "ఆమోదించబడింది (APPROVED)",
          labelEn: "Approved",
          bg: "bg-emerald-100 text-emerald-800 border-emerald-300",
          icon: CheckCircle2,
        };
      case "COMPLETED":
        return {
          labelTe: "పూర్తయింది (COMPLETED)",
          labelEn: "Completed",
          bg: "bg-teal-100 text-teal-900 border-teal-300",
          icon: CheckCircle2,
        };
      case "REJECTED":
        return {
          labelTe: "తిరస్కరించబడింది (REJECTED)",
          labelEn: "Rejected",
          bg: "bg-red-100 text-red-800 border-red-300",
          icon: XCircle,
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto">
      {/* Top Breadcrumb & Page Banner */}
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <FileSearch className="w-3.5 h-3.5" />
            <span>{isTe ? "ఆంధ్రప్రదేశ్ సిటిజన్ ట్రాకింగ్ సిస్టమ్" : "AP Citizen Tracking System"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {isTe ? "మీ దరఖాస్తు స్థితిని తెలుసుకోండి" : "Track Application Status"}
          </h1>

          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            {isTe
              ? "మీ దరఖాస్తు సంఖ్య (Application Number) నమోదు చేసి ప్రస్తుత పరిశీలన స్థితి, అధికారిక దశలు మరియు పురోగతిని తెలుసుకోండి."
              : "Enter your official application number to monitor verification stages and real-time status updates."}
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="pt-2">
            <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                  placeholder={isTe ? "దరఖాస్తు సంఖ్య (ఉదా. PM-20260823-XXXX)" : "Application Number (e.g. PM-20260823-XXXX)"}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
              >
                {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>{isLoading ? (isTe ? "శోధిస్తోంది..." : "Tracking...") : (isTe ? "శోధించండి" : "Track Status")}</span>
              </button>
            </div>
          </form>

          {/* User's recent submitted applications if any */}
          {applications.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-blue-300 font-medium">{isTe ? "మీ దరఖాస్తులు:" : "Your Applications:"}</span>
              {applications.slice(0, 3).map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => selectMyApplication(app.id)}
                  className={`font-mono px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                    searchId === app.id
                      ? "bg-amber-400 text-slate-950 border-amber-300"
                      : "bg-blue-900/80 text-blue-200 border-blue-700 hover:bg-blue-800 hover:text-white"
                  }`}
                >
                  {app.id}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INITIAL STATE: NO APPLICATION SEARCHED YET */}
      {/* ========================================================================= */}
      {!hasSearched && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto border border-blue-200">
            <FileSearch className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {isTe ? "దరఖాస్తు స్థితి శోధన" : "No Application Selected"}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isTe
                ? "దరఖాస్తు స్థితిని తెలుసుకోవడానికి పై శోధన పెట్టెలో మీ దరఖాస్తు నంబర్‌ను నమోదు చేయండి."
                : "Please enter a valid application reference number above to view real-time tracking information."}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEARCH RESULT: APPLICATION RECORD DETAILS */}
      {/* ========================================================================= */}
      {hasSearched && currentRecord && (
        <div className="space-y-6">
          {/* Main Record Header Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="font-mono text-sm font-extrabold text-blue-950 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                    {currentRecord.applicationNumber}
                  </span>
                  {currentRecord.serviceCode && (
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {currentRecord.serviceCode}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                  {isTe ? (currentRecord.serviceNameTe || currentRecord.serviceName) : currentRecord.serviceName}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isTe ? (currentRecord.categoryNameTe || currentRecord.categoryName) : currentRecord.categoryName}
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-3">
                {(() => {
                  const badge = getStatusBadge(currentRecord.status);
                  const Icon = badge.icon;
                  return (
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs sm:text-sm font-bold shadow-xs ${badge.bg}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{isTe ? badge.labelTe : badge.labelEn}</span>
                    </div>
                  );
                })()}

                <button
                  onClick={() => window.print()}
                  className="p-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  title="Print Acknowledgment"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Key Information 3-Card Grid (Non-sensitive public data) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50/80 border border-slate-200/80 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>{isTe ? "సమర్పించిన తేదీ" : "Submission Date"}</span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {currentRecord.submittedAt ? currentRecord.submittedAt.split("T")[0] : "—"}
                </p>
                <p className="text-[11px] text-slate-500">
                  {isTe ? "రిజిస్టర్ చేయబడింది" : "Registered online"}
                </p>
              </div>

              <div className="bg-slate-50/80 border border-slate-200/80 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>{isTe ? "చివరి నవీకరణ" : "Last Updated"}</span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {currentRecord.updatedAt ? currentRecord.updatedAt.split("T")[0] : "—"}
                </p>
                <p className="text-[11px] text-slate-500">
                  {isTe ? "అధికారిక రికార్డు" : "Official Record"}
                </p>
              </div>

              <div className="bg-slate-50/80 border border-slate-200/80 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
                  <Building className="w-4 h-4 text-blue-700" />
                  <span>{isTe ? "ప్రస్తుత స్థితి" : "Current Status"}</span>
                </div>
                <p className="text-sm font-bold text-blue-950 font-mono">
                  {currentRecord.status}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {isTe ? "పౌర సేవల చార్టర్" : "Citizen Charter"}
                </p>
              </div>
            </div>
          </div>

          {/* Status Timeline History Card */}
          {currentRecord.statusHistory && currentRecord.statusHistory.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-800" />
                  <span>{isTe ? "పరిశీలన పురోగతి & ఆడిట్ రికార్డు" : "Status Verification History"}</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {currentRecord.statusHistory.length} {isTe ? "దశలు నమోదు అయ్యాయి" : "Stages Logged"}
                </span>
              </div>

              {/* Vertical Timeline */}
              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
                {currentRecord.statusHistory.map((history, idx) => {
                  const isLatest = idx === currentRecord.statusHistory.length - 1;
                  return (
                    <div key={idx} className="relative group">
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isLatest
                            ? "bg-amber-400 border-amber-600 ring-4 ring-amber-100 text-slate-950"
                            : "bg-blue-800 border-blue-900 text-white"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                            {history.status}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            ⏱️ {history.changedAt ? history.changedAt.replace("T", " ").slice(0, 16) : ""}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900">
                          {history.changedBy || "Officer Desk"}
                        </h4>

                        {history.remarks && (
                          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                            💬 {history.remarks}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* When no record is found */}
      {hasSearched && !currentRecord && !isLoading && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {isTe ? "దరఖాస్తు కనుగొనబడలేదు" : "Application Not Found"}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {errorMessage || (isTe
              ? "మీరు నమోదు చేసిన అప్లికేషన్ ఐడీ డేటాబేస్‌లో సరిపోలలేదు. దయచేసి సంఖ్యను సరిచూసి మళ్లీ ప్రయత్నించండి."
              : "No application matches the specified ID in the database. Please check your reference number.")}
          </p>
        </div>
      )}
    </div>
  );
};
