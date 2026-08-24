import React, { useState } from "react";
import {
  MapPin,
  Building2,
  Phone,
  Mail,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Shield,
} from "lucide-react";
import { AP_DISTRICTS } from "../data/administrativeData";
import { HELPLINE_CONTACTS, GOVERNMENT_ORDERS } from "../data/contactsAndOrders";
import { useApp } from "../context/AppContext";

export const AdministrativeDirectory: React.FC = () => {
  const { isTe } = useApp();
  const [activeTab, setActiveTab] = useState<"districts" | "helplines" | "orders">("districts");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>("ASR");
  const [selectedMandalName, setSelectedMandalName] = useState<string>("");
  const [searchDistrictQuery, setSearchDistrictQuery] = useState<string>("");

  const filteredDistricts = AP_DISTRICTS.filter((d) => {
    const q = searchDistrictQuery.toLowerCase().trim();
    if (!q) return true;
    return d.nameTe.toLowerCase().includes(q) || d.nameEn.toLowerCase().includes(q) || d.headquarters.toLowerCase().includes(q);
  });

  const activeDistrict = AP_DISTRICTS.find((d) => d.code === selectedDistrictCode) || AP_DISTRICTS[0];
  const activeMandal = activeDistrict.mandals.find((m) => m.nameEn === selectedMandalName) || activeDistrict.mandals[0];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 text-white">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isTe ? "పరిపాలనా డైరెక్టరీ & సంప్రదింపులు" : "AP Administrative Hierarchy & Contacts"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {isTe ? "26 జిల్లాలు, మండలాలు & హెల్ప్‌లైన్లు" : "26 Districts, Mandals & Helplines"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isTe
              ? "ఆంధ్రప్రదేశ్‌లోని 26 జిల్లాల పరిపాలనా సమాచారం, రెవెన్యూ మండలాలు, గ్రామ సచివాలయాలు మరియు అత్యవసర సిటిజన్ కాల్ సెంటర్లు."
              : "Explore district headquarters, mandal structures, villages, official emergency contact numbers and government orders."}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setActiveTab("districts")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "districts"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40"
              : "bg-[#14181F] text-slate-300 hover:bg-[#1C222C] border border-[#242A36]"
          }`}
        >
          {isTe ? "1. 26 జిల్లాల సమాచారం" : "1. 26 Districts Explorer"}
        </button>

        <button
          onClick={() => setActiveTab("helplines")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "helplines"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40"
              : "bg-[#14181F] text-slate-300 hover:bg-[#1C222C] border border-[#242A36]"
          }`}
        >
          {isTe ? "2. అత్యవసర హెల్ప్‌లైన్లు" : "2. Citizen Helplines"}
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === "orders"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40"
              : "bg-[#14181F] text-slate-300 hover:bg-[#1C222C] border border-[#242A36]"
          }`}
        >
          {isTe ? "3. ప్రభుత్వ ఉత్తర్వులు (G.O.Ms)" : "3. Government Orders"}
        </button>
      </div>

      {/* Tab 1: 26 Districts */}
      {activeTab === "districts" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
          {/* Left Column: Districts List */}
          <div className="bg-[#14181F] border border-[#242A36] rounded-3xl p-5 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchDistrictQuery}
                onChange={(e) => setSearchDistrictQuery(e.target.value)}
                placeholder={isTe ? "జిల్లాను శోధించండి..." : "Search district..."}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#0F1318] border border-[#262C37] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredDistricts.map((district) => {
                const isSelected = district.code === activeDistrict.code;
                return (
                  <button
                    key={district.code}
                    id={`district-btn-${district.code}`}
                    onClick={() => {
                      setSelectedDistrictCode(district.code);
                      setSelectedMandalName("");
                    }}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between border ${
                      isSelected
                        ? "bg-emerald-600/20 border-emerald-500 text-white shadow-sm"
                        : "bg-[#181D26] border-transparent text-slate-300 hover:bg-[#1E2430] hover:text-white"
                    }`}
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold">
                        {isTe ? district.nameTe : district.nameEn}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {isTe ? `కేంద్రం: ${district.headquarters}` : `HQ: ${district.headquarters}`} • {district.mandals.length} {isTe ? "మండలాలు" : "Mandals"}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (2 cols): Selected District Hierarchy Details */}
          <div className="lg:col-span-2 space-y-5">
            {/* District Header Card */}
            <div className="bg-[#14181F] border border-[#242A36] rounded-3xl p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                    {isTe ? "జిల్లా పరిపాలన" : "District Administration"}
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">
                    {isTe ? activeDistrict.nameTe : activeDistrict.nameEn}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {isTe ? `జిల్లా కేంద్రం (HQ): ${activeDistrict.headquarters}` : `District Headquarters: ${activeDistrict.headquarters}`}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-300 bg-[#1C222C] px-3 py-1.5 rounded-xl border border-[#282F3C]">
                    {activeDistrict.mandals.length} {isTe ? "మండలాలు" : "Mandals"}
                  </span>
                </div>
              </div>
            </div>

            {/* Mandals Grid & Village Viewer */}
            <div className="bg-[#14181F] border border-[#242A36] rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>{isTe ? "రెవెన్యూ మండలాలు (Select a Mandal)" : "Revenue Mandals"}</span>
              </h3>

              {/* Mandal Pills */}
              <div className="flex flex-wrap gap-2">
                {activeDistrict.mandals.map((mandal) => {
                  const isMandalActive = mandal.nameEn === activeMandal?.nameEn;
                  return (
                    <button
                      key={mandal.nameEn}
                      onClick={() => setSelectedMandalName(mandal.nameEn)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isMandalActive
                          ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                          : "bg-[#181D26] border-[#242A36] text-slate-300 hover:text-white hover:border-[#384150]"
                      }`}
                    >
                      {isTe ? mandal.nameTe : mandal.nameEn}
                    </button>
                  );
                })}
              </div>

              {/* Selected Mandal's Villages & Sachivalayams */}
              {activeMandal && (
                <div className="pt-4 border-t border-[#1F252E] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-emerald-300">
                      {isTe
                        ? `${activeMandal.nameTe} పరిధిలోని గ్రామ సచివాలయాలు / గ్రామాలు`
                        : `Villages & Sachivalayams in ${activeMandal.nameEn}`}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {activeMandal.villages.length} {isTe ? "గ్రామాలు" : "Villages"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {activeMandal.villages.map((village, idx) => (
                      <div
                        key={idx}
                        className="bg-[#181D26] border border-[#242A36] p-2.5 rounded-xl text-xs text-slate-300 font-medium flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span className="truncate">{isTe ? village.nameTe : village.nameEn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Helplines */}
      {activeTab === "helplines" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
          {HELPLINE_CONTACTS.map((contact) => (
            <div
              key={contact.id}
              className="bg-[#14181F] border border-[#242A36] hover:border-emerald-500/40 rounded-3xl p-6 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-emerald-400">
                  {isTe ? contact.designationTe : contact.designationEn}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">
                  {isTe ? contact.officeNameTe : contact.officeNameEn}
                </h3>
                {contact.location && (
                  <p className="text-xs text-slate-400 mb-4">{contact.location}</p>
                )}
              </div>

              <div className="pt-4 border-t border-[#1F252E] flex items-center justify-between gap-3">
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{contact.phone}</span>
                </a>

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1C222C] hover:bg-[#262E3B] text-slate-300 text-xs font-medium transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[120px]">{contact.email}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Government Orders */}
      {activeTab === "orders" && (
        <div className="space-y-4 animate-in fade-in">
          {GOVERNMENT_ORDERS.map((go) => (
            <div
              key={go.id}
              className="bg-[#14181F] border border-[#242A36] rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-800/40">
                    {go.goNumber}
                  </span>
                  <span className="text-xs text-slate-400">
                    {isTe ? go.departmentTe : go.departmentEn} • {go.issueDate}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {isTe ? go.subjectTe : go.subjectEn}
                </h4>
              </div>

              <a
                href={go.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C222C] hover:bg-[#252E3B] text-emerald-400 text-xs font-bold border border-[#2C3442] transition-colors self-start md:self-auto shrink-0"
              >
                <span>{isTe ? "జీవో చూడండి" : "View Order"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
