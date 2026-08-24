import React, { useState } from "react";
import { useApp, AppProvider } from "./context/AppContext";
import { Header } from "./components/Header";
import { NavigationTabs } from "./components/NavigationTabs";
import { CategoryChips } from "./components/CategoryChips";
import { ServiceCard } from "./components/ServiceCard";
import { ServiceDetailModal } from "./components/ServiceDetailModal";
import { ApplyModal } from "./components/ApplyModal";
import { TrackingView } from "./components/TrackingView";
import { ProblemsModule } from "./components/ProblemsModule";
import { SchemesDashboard } from "./components/SchemesDashboard";
import { LandToolsView } from "./components/LandToolsView";
import { AIAssistantView } from "./components/AIAssistantView";
import {
  RorAppealGuide,
  RtiGuidanceScreen,
  ComplaintGuidanceScreen,
  AdministrativeDirectoryView,
} from "./components/GuidanceScreens";
import { BookmarksView } from "./components/BookmarksView";
import { ProfileView } from "./components/ProfileView";
import { AuthView } from "./components/AuthModals";
import { Footer } from "./components/Footer";
import { GOVERNMENT_SERVICES } from "./data/governmentServices";
import { GovernmentService } from "./types";
import {
  Search,
  FileSearch,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building,
  HeartHandshake,
  HelpCircle,
  Calculator,
  Scale,
  Users,
  Compass,
  FileCheck2,
  Phone,
} from "lucide-react";

export function AppContent() {
  const {
    isTe,
    currentScreen,
    navigateTo,
    selectedService,
    setSelectedService,
    applyingService,
    setApplyingService,
    applyForService,
    setTrackApplicationId,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter services based on category & search query
  const filteredServices = GOVERNMENT_SERVICES.filter((svc) => {
    const matchesCategory =
      selectedCategory === "all" || svc.categoryId === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      svc.nameTe.toLowerCase().includes(q) ||
      svc.nameEn.toLowerCase().includes(q) ||
      svc.departmentNameTe.toLowerCase().includes(q) ||
      svc.departmentNameEn.toLowerCase().includes(q) ||
      svc.serviceRef.toLowerCase().includes(q) ||
      svc.overviewTe.toLowerCase().includes(q) ||
      svc.overviewEn.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const handleApplySuccess = (appId: string) => {
    setTrackApplicationId(appId);
    navigateTo("tracking");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 selection:bg-amber-400 selection:text-slate-950">
      {/* Official Government Blue Header */}
      <Header />

      {/* Navigation Bar */}
      <NavigationTabs />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {/* ========================================================================= */}
        {/* 1. HOME SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "home" && (
          <div className="space-y-10 animate-in fade-in">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#07182C] via-[#0B2545] to-[#133B68] rounded-3xl p-6 sm:p-10 text-white border border-blue-900/80 shadow-xl relative overflow-hidden">
              {/* Background decorative watermark */}
              <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                  <Building className="w-3.5 h-3.5" />
                  <span>
                    {isTe
                      ? "ఆంధ్రప్రదేశ్ ప్రజామిత్ర • ఏకీకృత పౌర సేవల వేదిక"
                      : "Government of Andhra Pradesh • Official Citizen Services"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-serif leading-tight tracking-tight">
                  {isTe ? (
                    <>
                      ప్రజా సేవలకు ఒకే వేదిక,{" "}
                      <span className="text-amber-400">సులభమైన పరిష్కారం.</span>
                    </>
                  ) : (
                    <>
                      Empowering Citizens,{" "}
                      <span className="text-amber-400">Streamlining Governance.</span>
                    </>
                  )}
                </h1>

                <p className="text-xs sm:text-base text-blue-100/90 leading-relaxed font-normal max-w-2xl">
                  {isTe
                    ? "రెవెన్యూ & వెబ్‌ల్యాండ్ రికార్డులు, ఆస్తి రిజిస్ట్రేషన్ (ఈసీ), పంచాయతీ రాజ్ పన్నులు, సంక్షేమ పథకాలు మరియు చట్టబద్ధమైన అప్పీల్ మార్గదర్శకాలు."
                    : "Access authenticated land records, property encumbrance certificates (EC), house taxes, flagship welfare schemes, and ROR appeal procedures."}
                </p>

                {/* Hero Search Box */}
                <div className="pt-2">
                  <div className="relative max-w-2xl">
                    <Search className="w-5 h-5 text-blue-300 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        isTe
                          ? "అడంగల్, 1-B, ఈసీ, మ్యుటేషన్, తల్లికి వందనం, ఇంటి పన్ను శోధించండి..."
                          : "Search Adangal, 1-B, EC, Mutation, Thalliki Vandanam, House Tax..."
                      }
                      className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <button
                      onClick={() => navigateTo("services")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 sm:py-2.5 rounded-xl bg-[#0B2545] hover:bg-blue-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      {isTe ? "శోధించు" : "Search"}
                    </button>
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  <div className="bg-white/10 backdrop-blur-xs border border-white/10 p-3 rounded-2xl">
                    <span className="text-lg sm:text-xl font-extrabold text-amber-300 font-mono block">
                      50+
                    </span>
                    <span className="text-[11px] text-blue-100 font-medium">
                      {isTe ? "అధికారిక పౌర సేవలు" : "Verified Services"}
                    </span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xs border border-white/10 p-3 rounded-2xl">
                    <span className="text-lg sm:text-xl font-extrabold text-amber-300 font-mono block">
                      26
                    </span>
                    <span className="text-[11px] text-blue-100 font-medium">
                      {isTe ? "ఆంధ్రప్రదేశ్ జిల్లాలు" : "AP Districts Covered"}
                    </span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xs border border-white/10 p-3 rounded-2xl">
                    <span className="text-lg sm:text-xl font-extrabold text-amber-300 font-mono block">
                      100%
                    </span>
                    <span className="text-[11px] text-blue-100 font-medium">
                      {isTe ? "డిజిటల్ ధృవీకరణ" : "Online Tracking"}
                    </span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xs border border-white/10 p-3 rounded-2xl">
                    <span className="text-lg sm:text-xl font-extrabold text-amber-300 font-mono block">
                      15 Days
                    </span>
                    <span className="text-[11px] text-blue-100 font-medium">
                      {isTe ? "SLA గరిష్ట గడువు" : "Maximum SLA Delivery"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Portals Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => navigateTo("services")}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all text-left flex items-start gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 font-bold group-hover:scale-105 transition-transform">
                  <Building className="w-5 h-5 text-blue-800" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {isTe ? "పౌర సేవలు" : "Citizen Services"}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {isTe ? "మీసేవ & రెవెన్యూ" : "MeeSeva & Revenue"}
                  </p>
                </div>
              </button>

              <button
                onClick={() => navigateTo("schemes")}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all text-left flex items-start gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center shrink-0 font-bold group-hover:scale-105 transition-transform">
                  <HeartHandshake className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {isTe ? "సంక్షేమ పథకాలు" : "AP Schemes"}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {isTe ? "తల్లికి వందనం & పింఛన్లు" : "Flagship Programs"}
                  </p>
                </div>
              </button>

              <button
                onClick={() => navigateTo("land_tools")}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all text-left flex items-start gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0 font-bold group-hover:scale-105 transition-transform">
                  <Calculator className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {isTe ? "భూ కొలతలు" : "Land Area Tools"}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {isTe ? "ఎకరాలు, సెంట్లు, గజాలు" : "Converter & 22-A"}
                  </p>
                </div>
              </button>

              <button
                onClick={() => navigateTo("tracking")}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 shadow-xs hover:shadow-md transition-all text-left flex items-start gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0 font-bold group-hover:scale-105 transition-transform">
                  <FileSearch className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {isTe ? "దరఖాస్తు ట్రాకింగ్" : "Track Status"}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {isTe ? "రియల్ టైమ్ స్థితి" : "Audit History"}
                  </p>
                </div>
              </button>
            </div>

            {/* Department Category Chips */}
            <CategoryChips
              selectedCategory={selectedCategory}
              onSelectCategory={(id) => setSelectedCategory(id)}
            />

            {/* Services Grid Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                    {isTe ? "ప్రజా సేవలు & దరఖాస్తులు" : "Citizen Services Directory"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {filteredServices.length} {isTe ? "సేవలు అందుబాటులో ఉన్నాయి" : "Services available"}
                  </p>
                </div>

                <button
                  onClick={() => navigateTo("services")}
                  className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>{isTe ? "అన్నీ చూడండి" : "View All"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Service Cards (Show top 6 on home) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredServices.slice(0, 6).map((svc) => (
                  <ServiceCard
                    key={svc.id}
                    service={svc}
                    onViewDetails={(s) => setSelectedService(s)}
                    onApply={(s) => applyForService(s)}
                  />
                ))}
              </div>
            </div>

            {/* Flagship Schemes Feature Spotlight */}
            <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    {isTe ? "రాష్ట్ర ప్రభుత్వ సంక్షేమ కార్యక్రమాలు" : "State Welfare Initiatives"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-serif">
                    {isTe ? "ఆంధ్రప్రదేశ్ ప్రధాన సంక్షేమ పథకాలు (2026)" : "AP Flagship Citizen Welfare Schemes"}
                  </h3>
                </div>

                <button
                  onClick={() => navigateTo("schemes")}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  <span>{isTe ? "పథకాల వివరాలు చూడండి" : "Explore All Schemes"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-blue-900/60 border border-blue-700/60 space-y-2">
                  <span className="text-amber-300 font-bold block text-sm">
                    తల్లికి వందనం (Thalliki Vandanam)
                  </span>
                  <p className="text-blue-200 text-[11px] leading-relaxed">
                    పాఠశాలకు వెళ్లే ప్రతి బిడ్డకు వార్షిక ₹15,000 ఆర్థిక సాయం నేరుగా తల్లి బ్యాంక్ ఖాతాలో జమ.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-900/60 border border-blue-700/60 space-y-2">
                  <span className="text-amber-300 font-bold block text-sm">
                    అన్నదాత సుఖీభవ (Rythu Bharosa)
                  </span>
                  <p className="text-blue-200 text-[11px] leading-relaxed">
                    రైతు మరియు కౌలు రైతు కుటుంబాలకు ఏడాదికి ₹20,000 వ్యవసాయ పెట్టుబడి సహాయం.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-900/60 border border-blue-700/60 space-y-2">
                  <span className="text-amber-300 font-bold block text-sm">
                    దీపం 2.0 (Deepam Free LPG)
                  </span>
                  <p className="text-blue-200 text-[11px] leading-relaxed">
                    పేద కుటుంబాలకు ఏడాదికి 3 ఉచిత వంట గ్యాస్ సిలిండర్ల పూర్తి సబ్సిడీ రీఫండ్.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. CITIZEN SERVICES CATALOG SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "services" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                  <Building className="w-3.5 h-3.5" />
                  <span>{isTe ? "అధికారిక పౌర సేవల డైరెక్టరీ" : "AP Citizen Services Directory"}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                  {isTe ? "ఆంధ్రప్రదేశ్ ప్రభుత్వ అన్ని పౌర సేవలు" : "Andhra Pradesh Citizen Services (MeeSeva)"}
                </h1>

                <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                  {isTe
                    ? "రెవెన్యూ, రిజిస్ట్రేషన్, పంచాయతీ రాజ్, పౌర సరఫరాలు, విద్య, ఆరోగ్యం, రవాణా శాఖల అధికారిక సేవలు, నిబంధనలు, ఫీజులు మరియు ఆన్‌లైన్ దరఖాస్తులు."
                    : "Complete authenticated catalogue of government services across all state departments with statutory timelines and online submission forms."}
                </p>

                {/* Search Bar */}
                <div className="relative max-w-lg pt-2">
                  <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isTe
                        ? "సేవ పేరు, శాఖ లేదా సర్వీస్ కోడ్ శోధించండి..."
                        : "Search service name, department, or code..."
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#133B68] text-white placeholder-blue-200 text-xs sm:text-sm border border-blue-400/30 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Department Category Chips */}
            <CategoryChips
              selectedCategory={selectedCategory}
              onSelectCategory={(id) => setSelectedCategory(id)}
            />

            {/* Services Count and Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                <span>
                  {isTe ? "మొత్తం ఫలితాలు: " : "Showing: "}
                  <strong className="text-slate-800 font-bold">{filteredServices.length}</strong> {isTe ? "సేవలు" : "services"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredServices.map((svc) => (
                  <ServiceCard
                    key={svc.id}
                    service={svc}
                    onViewDetails={(s) => setSelectedService(s)}
                    onApply={(s) => applyForService(s)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. SCHEMES SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "schemes" && <SchemesDashboard />}

        {/* ========================================================================= */}
        {/* 4. PROBLEMS & GUIDES SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "problems" && <ProblemsModule />}

        {/* ========================================================================= */}
        {/* 5. LAND TOOLS & CONVERTER SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "land_tools" && <LandToolsView />}

        {/* ========================================================================= */}
        {/* 6. TRACK APPLICATION SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "tracking" && <TrackingView />}

        {/* ========================================================================= */}
        {/* 7. AI ASSISTANT SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "ai_assistant" && <AIAssistantView />}

        {/* ========================================================================= */}
        {/* 8. ROR APPEAL LEGAL GUIDE SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "ror_appeal" && <RorAppealGuide />}

        {/* ========================================================================= */}
        {/* 9. RTI GUIDANCE SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "rti_guidance" && <RtiGuidanceScreen />}

        {/* ========================================================================= */}
        {/* 10. SPANDANA 1902 GRIEVANCE SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "complaint_guidance" && <ComplaintGuidanceScreen />}

        {/* ========================================================================= */}
        {/* 11. ADMINISTRATIVE DIRECTORY SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "administrative_directory" && <AdministrativeDirectoryView />}

        {/* ========================================================================= */}
        {/* 12. BOOKMARKS SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "bookmarks" && <BookmarksView />}

        {/* ========================================================================= */}
        {/* 13. CITIZEN PROFILE SCREEN */}
        {/* ========================================================================= */}
        {currentScreen === "profile" && <ProfileView />}

        {/* ========================================================================= */}
        {/* 14. AUTH / LOGIN / SIGNUP SCREEN */}
        {/* ========================================================================= */}
        {(currentScreen === "login" || currentScreen === "signup") && (
          <AuthView isSignUpDefault={currentScreen === "signup"} />
        )}
      </main>

      {/* ========================================================================= */}
      {/* SERVICE DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onApply={(svc) => applyForService(svc)}
        />
      )}

      {/* ========================================================================= */}
      {/* CITIZEN APPLICATION MODAL (3-STEP FORM) */}
      {/* ========================================================================= */}
      {applyingService && (
        <ApplyModal
          service={applyingService}
          onClose={() => setApplyingService(null)}
          onSuccessTrack={handleApplySuccess}
        />
      )}

      {/* Official State Portal Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
