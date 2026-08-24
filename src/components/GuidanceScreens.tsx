import React, { useState } from "react";
import {
  Scale,
  FileText,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Building,
  Phone,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Search,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { AP_DISTRICTS } from "../data/administrativeData";

export const RorAppealGuide: React.FC = () => {
  const { isTe } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto">
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <Scale className="w-3.5 h-3.5" />
            <span>{isTe ? "చట్టబద్ధమైన రెవెన్యూ అప్పీల్ మార్గదర్శకం" : "AP ROR Act 1971 Statutory Appeal Guide"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {isTe ? "భూ రికార్డుల హక్కుల చట్టం (ROR) & అప్పీల్ విధానం" : "Record of Rights (ROR) Appeal & Revision Guide"}
          </h1>

          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            {isTe
              ? "తహసీల్దార్ జారీ చేసిన మ్యుటేషన్, 1-B రికార్డుల సవరణ లేదా పాస్‌బుక్ ఉత్తర్వులపై అసంతృప్తి ఉంటే RDO మరియు జాయింట్ కలెక్టర్ వద్ద అప్పీల్ దాఖలు చేసే చట్టబద్ధమైన ప్రక్రియ."
              : "Comprehensive statutory framework for filing Section 5(5) appeals before the Revenue Divisional Officer (RDO) and Section 9 revision petitions before the Joint Collector."}
          </p>
        </div>
      </div>

      {/* 3-Tier Hierarchy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-sm border border-blue-200">
            Tier 1
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isTe ? "తహసీల్దార్ కోర్టు (ప్రాథమిక అధికారి)" : "Tahsildar (Original Authority)"}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isTe
              ? "మ్యుటేషన్, వెబ్‌ల్యాండ్ రికార్డుల్లో పేర్ల మార్పు, పట్టాదారు పాస్‌బుక్ జారీ చేసే ప్రాథమిక రెవెన్యూ అధికారి (సెక్షన్ 5)."
              : "Empowered under Section 5 of AP ROR Act to issue mutations, digital passbooks, and initial record corrections."}
          </p>
        </div>

        <div className="bg-white border border-amber-300 p-5 rounded-3xl shadow-xs space-y-3 ring-1 ring-amber-200">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm border border-amber-300">
            Tier 2
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isTe ? "RDO అప్పీల్ (సెక్షన్ 5(5))" : "RDO Appellate Court (Sec 5(5))"}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isTe
              ? "తహసీల్దార్ ఉత్తర్వు వెలువడిన 60 రోజుల్లోపు రెవెన్యూ డివిజనల్ అధికారి (RDO) వద్ద మొదటి అప్పీల్ దాఖలు చేయవచ్చు."
              : "Appellate authority under Section 5(5). Any aggrieved citizen can file an appeal within 60 days from the Tahsildar's order."}
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center font-bold text-sm border border-purple-200">
            Tier 3
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isTe ? "జాయింట్ కలెక్టర్ రివిజన్ (సెక్షన్ 9)" : "Joint Collector Revision (Sec 9)"}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isTe
              ? "RDO అప్పీల్ ఉత్తర్వులపై అసంతృప్తి ఉంటే జిల్లా జాయింట్ కలెక్టర్ (JC-Revenue) కోర్టులో రివిజన్ పిటిషన్ దాఖలు చేయవచ్చు."
              : "Revisional jurisdiction under Section 9 of ROR Act. Final administrative appellate authority in the revenue hierarchy."}
          </p>
        </div>
      </div>

      {/* Step by step procedure */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-4 text-xs">
        <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider">
          {isTe ? "అప్పీల్ దాఖలు చేసే విధానం & అవసరమైన పత్రాలు" : "Step-by-Step ROR Appeal Checklist"}
        </h3>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold shrink-0">1</span>
            <div>
              <strong className="text-slate-900 block text-xs mb-0.5">
                {isTe ? "తహసీల్దార్ అధికారిక ఉత్తర్వు కాపీ పొందడం" : "Obtain Certified Copy of Tahsildar Order"}
              </strong>
              <p className="text-slate-600">
                {isTe
                  ? "మీ దరఖాస్తును తిరస్కరిస్తూ లేదా ప్రత్యర్థికి అనుకూలంగా తహసీల్దార్ ఇచ్చిన లిఖితపూర్వక ఎండార్స్‌మెంట్/ప్రొసీడింగ్స్ కాపీని మీసేవ ద్వారా పొందాలి."
                  : "Apply for and secure the official certified speaking order/proceedings of the Tahsildar with dispatch reference."}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold shrink-0">2</span>
            <div>
              <strong className="text-slate-900 block text-xs mb-0.5">
                {isTe ? "అప్పీల్ పిటిషన్ ముసాయిదా (Drafting Grounds of Appeal)" : "Draft Grounds of Appeal Petition"}
              </strong>
              <p className="text-slate-600">
                {isTe
                  ? "మీ టైటిల్ డీడ్స్ (రిజిస్టర్డ్ డాక్యుమెంట్లు), లింక్ డాక్యుమెంట్లు, 1954 RSR రికార్డులు మరియు నోటీసు ఇవ్వకుండా ఉత్తర్వులు ఇచ్చిన కారణాలను పేర్కొంటూ పిటిషన్ సిద్ధం చేయాలి."
                  : "Detail how the original order violated principles of natural justice, statutory notice requirements, or ignored valid registered title deeds."}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold shrink-0">3</span>
            <div>
              <strong className="text-slate-900 block text-xs mb-0.5">
                {isTe ? "RDO కోర్టులో దాఖలు మరియు స్టే పిటిషన్" : "Filing Before RDO with Interim Stay"}
              </strong>
              <p className="text-slate-600">
                {isTe
                  ? "కోర్టు ఫీజు స్టాంపులు అంటించి RDO కార్యాలయ కోర్టు సెక్షన్‌లో దాఖలు చేసి, వెబ్‌ల్యాండ్‌లో రికార్డు మారకుండా తాత్కాలిక స్టే (Interim Stay) కోరవచ్చు."
                  : "Submit in RDO registry with court fee stamps along with an interlocutory petition for interim stay against record changes in Webland."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RtiGuidanceScreen: React.FC = () => {
  const { isTe } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto">
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>{isTe ? "సమాచార హక్కు చట్టం 2005" : "Right to Information (RTI) Act 2005"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {isTe ? "RTI దరఖాస్తు & మొదటి అప్పీల్ మార్గదర్శకం" : "Citizen RTI Application & First Appeal Framework"}
          </h1>

          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            {isTe
              ? "ఏదైనా ప్రభుత్వ శాఖ నుంచి రికార్డులు, జీవోలు, విచారణ నివేదికలు మరియు ఫైల్ నోటింగులు పొందే చట్టబద్ధమైన అధికారం."
              : "Complete statutory guidance on drafting Section 6(1) RTI applications, prescribed court fee exemptions for BPL citizens, and Section 19(1) appellate mechanisms."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs space-y-2">
          <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-700" />
            <span>{isTe ? "RTI దరఖాస్తు ఫీజు నిబంధనలు" : "RTI Statutory Fees"}</span>
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {isTe
              ? "దరఖాస్తు ఫీజు ₹10/- (కోర్టు ఫీజు స్టాంప్ లేదా డిమాండ్ డ్రాఫ్ట్). దారిద్య్రరేఖకు దిగువన (BPL/తెల్ల రేషన్ కార్డు) ఉన్న పౌరులకు ఫీజు పూర్తిగా ఉచితం."
              : "Standard application fee is ₹10 (via Court Fee Stamp, IPO, or DD). Free for Below Poverty Line (White Ration Card) citizens."}
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs space-y-2">
          <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-700" />
            <span>{isTe ? "సమాధానం ఇచ్చే సమయ పరిమితి (SLA)" : "Mandatory RTI SLA Timelines"}</span>
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {isTe
              ? "సాధారణ సమాచారం: 30 రోజులు. ప్రాణ లేదా వ్యక్తిగత స్వేచ్ఛకు సంబంధించిన సమాచారం: 48 గంటల లోపు అందించాలి."
              : "Standard information: 30 days. Life or personal liberty matters: Mandatory response within 48 hours."}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ComplaintGuidanceScreen: React.FC = () => {
  const { isTe } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto">
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <Phone className="w-3.5 h-3.5" />
            <span>{isTe ? "స్పందన & పౌర ఫిర్యాదుల పరిష్కారం" : "Spandana Grievance Redressal (1902)"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {isTe ? "స్పందన 1902 పౌర సమస్యల పరిష్కార వేదిక" : "AP State Grievance Redressal (1902)"}
          </h1>

          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            {isTe
              ? "ప్రతి సోమవారం కలెక్టరేట్ మరియు మండల స్థాయిల్లో జరిగే స్పందన కార్యక్రమం, 1902 టోల్‌ఫ్రీ కాల్ సెంటర్ మరియు ఆన్‌లైన్ గ్రీవెన్స్ పోర్టల్ ద్వారా ఫిర్యాదు చేసే విధానం."
              : "Direct citizen grievance escalation to District Collectors, Mandal Tahsildars, and District Police Chiefs with unique grievance tracking tokens."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            📞
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isTe ? "1902 టోల్‌ఫ్రీ కాల్ సెంటర్" : "1902 Toll-Free Helpline"}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {isTe
              ? "24x7 పనిచేసే కాల్ సెంటర్ ద్వారా మీ సమస్యను వివరించి రిఫరెన్స్ టోకెన్ సంఖ్యను వెంటనే SMS ద్వారా పొందవచ్చు."
              : "Dial 1902 from any mobile to register your grievance directly with instant SMS tracking token generation."}
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            🏢
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isTe ? "సోమవారం స్పందన దినోత్సవం" : "Monday Spandana Sessions"}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {isTe
              ? "ప్రతి సోమవారం ఉదయం 10:00 గంటలకు జిల్లా కలెక్టరేట్ లేదా తహసీల్దార్ కార్యాలయంలో నేరుగా అర్జీ సమర్పించవచ్చు."
              : "Every Monday 10:00 AM onwards at District Collectorates and Mandal Tahsildar offices for in-person petitions."}
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            🌐
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isTe ? "ఆన్‌లైన్ స్పందన పోర్టల్" : "Online Spandana Portal"}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {isTe
              ? "స్పందన అధికారిక వెబ్‌సైట్ ద్వారా మీ ఆధార్‌తో లాగిన్ అయి దరఖాస్తును సమర్పించి స్థితిని ట్రాక్ చేయవచ్చు."
              : "File online through the official Spandana portal and track SLA progress directly."}
          </p>
        </div>
      </div>
    </div>
  );
};

export const AdministrativeDirectoryView: React.FC = () => {
  const { isTe } = useApp();
  const [distSearch, setDistSearch] = useState<string>("");

  const filteredDistricts = AP_DISTRICTS.filter(
    (d) =>
      d.nameEn.toLowerCase().includes(distSearch.toLowerCase()) ||
      d.nameTe.toLowerCase().includes(distSearch.toLowerCase()) ||
      d.headquarters.toLowerCase().includes(distSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in max-w-6xl mx-auto">
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-blue-900 shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <Building className="w-3.5 h-3.5" />
            <span>{isTe ? "ఆంధ్రప్రదేశ్ 26 జిల్లాల డైరెక్టరీ" : "AP 26 Districts Directory"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            {isTe ? "ఆంధ్రప్రదేశ్ పరిపాలనా డైరెక్టరీ & సచివాలయాలు" : "Administrative Hierarchy & Secretariat Directory"}
          </h1>

          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            {isTe
              ? "రాష్ట్రంలోని 26 జిల్లాలు, రెవెన్యూ డివిజన్లు, మండలాలు మరియు గ్రామ/వార్డు సచివాలయాల పూర్తి సమగ్ర సమాచారం."
              : "Official administrative master database covering 26 districts, headquarters, revenue divisions, mandals, and secretariat clusters."}
          </p>

          <div className="relative max-w-lg pt-2">
            <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={distSearch}
              onChange={(e) => setDistSearch(e.target.value)}
              placeholder={isTe ? "జిల్లా లేదా కేంద్రం పేరు శోధించండి..." : "Search district or headquarters..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#133B68] text-white placeholder-blue-200 text-xs sm:text-sm border border-blue-400/30 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* 26 Districts Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredDistricts.map((dist) => (
          <div
            key={dist.code}
            className="bg-white border border-slate-200 hover:border-blue-400 p-5 rounded-2xl shadow-xs transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                {dist.code}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                {dist.mandals.length} {isTe ? "మండలాలు" : "Mandals"}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {isTe ? dist.nameTe : dist.nameEn}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isTe ? "జిల్లా కేంద్రం: " : "Headquarters: "}
                <strong className="text-slate-700">{dist.headquarters}</strong>
              </p>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
              <span className="font-bold text-slate-700 block text-[11px]">
                {isTe ? "ప్రధాన మండలాలు:" : "Sample Mandals:"}
              </span>
              <div className="flex flex-wrap gap-1">
                {dist.mandals.map((m) => (
                  <span
                    key={m.nameEn}
                    className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700"
                  >
                    {isTe ? m.nameTe : m.nameEn}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
