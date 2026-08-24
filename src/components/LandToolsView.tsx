import React, { useState } from "react";
import {
  Calculator,
  Compass,
  FileSearch,
  ShieldAlert,
  ArrowRightLeft,
  CheckCircle2,
  ExternalLink,
  Layers,
  BookOpen,
  Info,
  MapPin,
  FileCheck2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { LAND_UNITS, convertLandArea, getAllLandConversions } from "../data/landUnits";

export const LandToolsView: React.FC = () => {
  const { isTe } = useApp();

  const [inputVal, setInputVal] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("acres");
  const [toUnit, setToUnit] = useState<string>("cents");

  const numericInput = parseFloat(inputVal) || 0;
  const singleResult = convertLandArea(numericInput, fromUnit, toUnit);
  const allResults = getAllLandConversions(numericInput, fromUnit);

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isTe ? "ఆంధ్రప్రదేశ్ భూమి కొలతలు & మార్గదర్శకాలు" : "AP Land Area & Webland Tools"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {isTe ? "భూ విస్తీర్ణ కాలిక్యులేటర్ & ల్యాండ్ రికార్డ్స్ గైడ్" : "Land Measurement Converter & Meebhoomi Guide"}
          </h1>

          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            {isTe
              ? "ఎకరాలు, సెంట్లు, గుంటలు, గజాలు, అంకణాలు (నెల్లూరు/రాయలసీమ) మరియు చదరపు అడుగుల ఖచ్చితమైన మార్పిడి కాలిక్యులేటర్ మరియు 22-A నిషేధిత భూముల పరిశీలన గైడ్."
              : "Instant conversion across AP regional land measurements (Acres, Cents, Gunthas, Gajalu, Ankanams) along with official Meebhoomi Land Records & Section 22-A guidelines."}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. INTERACTIVE REAL-TIME LAND CONVERTER */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                {isTe ? "భూ విస్తీర్ణ మార్పిడి కాలిక్యులేటర్ (Land Area Converter)" : "AP Land Area Measurement Converter"}
              </h2>
              <p className="text-xs text-slate-500">
                {isTe ? "ఆంధ్రప్రదేశ్ అన్ని ప్రాంతీయ కొలతల ప్రామాణిక మార్పిడి" : "Standard AP revenue unit converter"}
              </p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
          {/* Value Input */}
          <div className="md:col-span-2 space-y-1">
            <label className="block text-xs font-bold text-slate-700">
              {isTe ? "విస్తీర్ణం సంఖ్య (Value)" : "Area Value"}
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl bg-slate-50 border border-slate-300 font-mono text-lg font-bold text-slate-900 focus:outline-none focus:border-blue-700"
              placeholder="1"
            />
          </div>

          {/* From Unit */}
          <div className="md:col-span-2 space-y-1">
            <label className="block text-xs font-bold text-slate-700">
              {isTe ? "నుండి (From Unit)" : "From Unit"}
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl bg-white border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-700"
            >
              {LAND_UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {isTe ? u.nameTe : u.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center pt-5">
            <button
              onClick={swapUnits}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 transition-colors border border-slate-200"
              title="Swap Units"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* To Unit */}
          <div className="md:col-span-2 space-y-1">
            <label className="block text-xs font-bold text-slate-700">
              {isTe ? "వరకు (To Unit)" : "To Unit"}
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl bg-white border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-700"
            >
              {LAND_UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {isTe ? u.nameTe : u.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Highlight Result Callout */}
        <div className="bg-gradient-to-r from-blue-900 to-[#0B2545] text-white p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1">
              {isTe ? "ఖచ్చితమైన మార్పిడి ఫలితం (Conversion Result):" : "Calculated Output:"}
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-white">
              {numericInput || 0}{" "}
              <span className="text-lg font-normal text-blue-200">
                {LAND_UNITS.find((u) => u.id === fromUnit)?.symbol}
              </span>{" "}
              ={" "}
              <span className="text-amber-300">
                {singleResult.toLocaleString()}
              </span>{" "}
              <span className="text-lg font-normal text-blue-200">
                {LAND_UNITS.find((u) => u.id === toUnit)?.symbol}
              </span>
            </div>
          </div>

          <div className="text-xs text-blue-200 text-right">
            <p className="font-semibold text-white">
              {LAND_UNITS.find((u) => u.id === fromUnit)?.descriptionTe}
            </p>
          </div>
        </div>

        {/* All Units Real-Time Equivalent Grid */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {isTe
              ? `సమానమైన అన్ని కొలతల పట్టిక (${numericInput} ${LAND_UNITS.find((u) => u.id === fromUnit)?.nameEn}):`
              : `All Regional Unit Equivalents for ${numericInput} ${LAND_UNITS.find((u) => u.id === fromUnit)?.nameEn}:`}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {LAND_UNITS.map((u) => {
              const val = allResults[u.id] || 0;
              const isCurrent = u.id === fromUnit;

              return (
                <div
                  key={u.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? "bg-blue-50/80 border-blue-400 ring-1 ring-blue-300"
                      : "bg-slate-50/70 border-slate-200 hover:bg-white"
                  }`}
                >
                  <p className="text-[11px] font-bold text-slate-600 truncate">
                    {isTe ? u.nameTe : u.nameEn}
                  </p>
                  <p className="text-base font-mono font-extrabold text-slate-900 mt-0.5 truncate">
                    {val.toLocaleString()} <span className="text-xs text-slate-500 font-normal">{u.symbol}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MEEBHOOMI LAND RECORDS CHECKING GUIDE */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
              {isTe ? "మీభూమి (Meebhoomi) ల్యాండ్ రికార్డ్స్ పరిశీలన గైడ్" : "Meebhoomi Land Records Step-by-Step Guide"}
            </h2>
            <p className="text-xs text-slate-500">
              {isTe ? "అడంగల్, 1-B, గ్రామ పటం (FMB), ఆధార్ లింకింగ్ అధికారిక విధానం" : "Adangal, 1-B ROR, FMB village maps, and Aadhaar seeding guide"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
            <h4 className="font-bold text-blue-950 flex items-center gap-1.5 text-sm">
              <span className="w-5 h-5 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs">1</span>
              {isTe ? "మీ అడంగల్ / పహాణీ" : "Adangal / Pahani"}
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {isTe
                ? "మీ సర్వే సంఖ్య, ఖాతా సంఖ్య లేదా ఆధార్ సంఖ్య ద్వారా మీ భూమి విస్తీర్ణం, సాగుదారు, నీటి వనరు మరియు పంట రికార్డులను తనిఖీ చేయవచ్చు."
                : "Verify Pattadar name, total extent, soil classification, water source, and current cultivator details for your survey number."}
            </p>
            <a
              href="https://meebhoomi.ap.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-800 font-bold hover:underline pt-1"
            >
              <span>Meebhoomi Adangal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
            <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-sm">
              <span className="w-5 h-5 rounded-full bg-amber-700 text-white flex items-center justify-center text-xs">2</span>
              {isTe ? "1-B గ్రామ ఖాతా రికార్డు" : "1-B Record of Rights (ROR)"}
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {isTe
                ? "ఒక పట్టాదారుని పేరిట ఆ గ్రామంలో ఉన్న మొత్తం భూమి వివరాలు, ఖాతా సంఖ్య, పూర్వీకుల హక్కుల క్రమం మరియు డిజిటల్ పాస్‌బుక్ స్థితిని తెలియజేస్తుంది."
                : "Comprehensive record of total landholdings of a Pattadar within a village under the AP ROR Act."}
            </p>
            <a
              href="https://meebhoomi.ap.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-900 font-bold hover:underline pt-1"
            >
              <span>Meebhoomi 1-B</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
            <h4 className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">3</span>
              {isTe ? "గ్రామ పటం (FMB / Survey Map)" : "FMB / Village Cadastral Map"}
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {isTe
                ? "సర్వే నంబర్ల హద్దులు, సబ్-డివిజన్ కొలతలు మరియు గ్రామ పటాలను డౌన్‌లోడ్ చేసుకొని సరిహద్దు తగాదాలను నివారించవచ్చు."
                : "Field Measurement Book (FMB) sketches showing exact surveyed boundary lines, tie lines, and sub-division offsets."}
            </p>
            <a
              href="https://meebhoomi.ap.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-900 font-bold hover:underline pt-1"
            >
              <span>Download FMB Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION 22-A PROHIBITED PROPERTIES CHECKLIST */}
      {/* ========================================================================= */}
      <div className="bg-white border border-red-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 border-b border-red-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-800 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-red-950 font-serif">
              {isTe ? "సెక్షన్ 22-A నిషేధిత ఆస్తుల చట్టం & కొనుగోలు జాగ్రత్తలు" : "Section 22-A Prohibited Properties Legal Checklist"}
            </h2>
            <p className="text-xs text-red-800">
              {isTe ? "ఆస్తి కొనుగోలుకు ముందు రిజిస్ట్రేషన్ శాఖ నిషేధిత జాబితా పరిశీలన" : "Mandatory verification before purchasing any land in Andhra Pradesh"}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <p className="text-slate-700 leading-relaxed">
            {isTe
              ? "ఆంధ్రప్రదేశ్ రిజిస్ట్రేషన్ చట్టం 1908 లోని సెక్షన్ 22-A ప్రకారం క్రింది కేటగిరీల భూముల రిజిస్ట్రేషన్ చేయడం చట్టరీత్యా నిషేధించబడింది:"
              : "Under Section 22-A of the Registration Act 1908, Sub-Registrars are legally barred from registering the following property categories in AP:"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-200">
              <span className="font-bold text-red-900 block mb-1">
                22-A(1)(a) • {isTe ? "ప్రభుత్వ లేదా అసైన్డ్ భూములు" : "Government / Assigned Lands"}
              </span>
              <p className="text-slate-600 leading-relaxed">
                {isTe
                  ? "రాష్ట్ర లేదా కేంద్ర ప్రభుత్వ యాజమాన్యంలో ఉన్న భూములు మరియు పేదలకు పంపిణీ చేసిన అసైన్డ్ (POT Act) భూములు."
                  : "State/Central Government properties, Poramboke, Vagu, and POT Act non-alienable assigned parcels."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-200">
              <span className="font-bold text-red-900 block mb-1">
                22-A(1)(b) • {isTe ? "దేవాదాయ & వక్ఫ్ బోర్డు భూములు" : "Endowments & Waqf Properties"}
              </span>
              <p className="text-slate-600 leading-relaxed">
                {isTe
                  ? "ఆంధ్రప్రదేశ్ దేవాదాయ ధర్మాదాయ శాఖ లేదా వక్ఫ్ బోర్డు కింద నమోదైన ఆలయ, ధర్మసత్ర మరియు మసీదు భూములు."
                  : "Lands owned or endowed by temples, charitable trusts, or the AP State Waqf Board."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-200">
              <span className="font-bold text-red-900 block mb-1">
                22-A(1)(c) • {isTe ? "సీలింగ్ & భూపరిమితి మిగులు భూములు" : "Urban / Agriculture Ceiling Lands"}
              </span>
              <p className="text-slate-600 leading-relaxed">
                {isTe
                  ? "అగ్రికల్చరల్ లేదా అర్బన్ ల్యాండ్ సీలింగ్ చట్టాల కింద ప్రభుత్వానికి అప్పగించబడిన మిగులు భూములు."
                  : "Surplus lands declared and taken over by government under land ceiling enactments."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-200">
              <span className="font-bold text-red-900 block mb-1">
                22-A(1)(e) • {isTe ? "కోర్టు వివాదాలు & జప్తు భూములు" : "Court Injunctions & Attached Lands"}
              </span>
              <p className="text-slate-600 leading-relaxed">
                {isTe
                  ? "సివిల్ కోర్టుల ద్వారా ఇంజంక్షన్ ఆర్డర్లు, అటాచ్‌మెంట్ లేదా సీబీఐ/ఈడీ విచారణల్లో ఉన్న వివాదాస్పద ఆస్తులు."
                  : "Properties covered by judicial attachment, status-quo orders, or statutory recovery proceedings."}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 font-medium space-y-1">
            <strong className="block text-xs uppercase font-bold text-amber-900">
              💡 {isTe ? "నిషేధిత జాబితా నుంచి తొలగింపు (De-notification) ప్రక్రియ:" : "De-notification Procedure from 22-A Register:"}
            </strong>
            <p className="leading-relaxed">
              {isTe
                ? "మీ పట్టా భూమి పొరపాటున 22-A లో నమోదైతే, మీసేవ / గ్రామ సచివాలయంలో '22-A De-notification' దరఖాస్తు చేసుకోవాలి. జిల్లా కలెక్టర్ అధ్యక్షతన ఉండే జిల్లా స్థాయి కమిటీ (DLC) విచారణ జరిపి క్లియరెన్స్ ఉత్తర్వులు జారీ చేస్తుంది."
                : "If your private Patta land is mistakenly tagged under 22-A, apply for De-notification at MeeSeva with registered title deeds from 1954 RSR. The District Level Committee (DLC) chaired by the District Collector examines and issues de-notification orders."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
