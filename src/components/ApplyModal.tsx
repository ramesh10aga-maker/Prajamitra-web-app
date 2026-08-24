import React, { useState } from "react";
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  MapPin,
  UploadCloud,
  FileCheck2,
  Printer,
  ChevronRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import { GovernmentService, ApplicationRecord } from "../types";
import { useApp } from "../context/AppContext";
import { AP_DISTRICTS } from "../data/administrativeData";

interface ApplyModalProps {
  service: GovernmentService;
  onClose: () => void;
  onSuccessTrack: (appId: string) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  service,
  onClose,
  onSuccessTrack,
}) => {
  const { isTe, user, submitApplication } = useApp();

  const [step, setStep] = useState<number>(1);
  const [applicantName, setApplicantName] = useState<string>(user.name || "");
  const [aadhaarNumber, setAadhaarNumber] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>(user.mobile || "");
  const [emailAddress, setEmailAddress] = useState<string>(user.email || "");
  const [gender, setGender] = useState<string>("");

  const [selectedDistrict, setSelectedDistrict] = useState<string>(user.district || "");
  const [selectedMandal, setSelectedMandal] = useState<string>(user.mandal || "");
  const [selectedVillage, setSelectedVillage] = useState<string>(user.village || "");
  const [specificDetails, setSpecificDetails] = useState<string>("");
  const [purposeRemarks, setPurposeRemarks] = useState<string>("");

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    "Aadhaar_Card_Proof.pdf",
    "Pattadar_Passbook_Copy.pdf",
  ]);
  const [isAgreed, setIsAgreed] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedAppId, setGeneratedAppId] = useState<string | null>(null);

  // Mandals for selected district
  const currentDistrictObj = AP_DISTRICTS.find(
    (d) => d.nameEn.toLowerCase() === selectedDistrict.toLowerCase()
  ) || AP_DISTRICTS[0];

  const currentMandalObj = currentDistrictObj.mandals.find(
    (m) => m.nameEn.toLowerCase() === selectedMandal.toLowerCase()
  ) || currentDistrictObj.mandals[0];

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDistrictChange = (distName: string) => {
    setSelectedDistrict(distName);
    const distObj = AP_DISTRICTS.find((d) => d.nameEn === distName) || AP_DISTRICTS[0];
    if (distObj.mandals.length > 0) {
      setSelectedMandal(distObj.mandals[0].nameEn);
      if (distObj.mandals[0].villages.length > 0) {
        setSelectedVillage(distObj.mandals[0].villages[0].nameEn);
      }
    }
  };

  const handleMandalChange = (manName: string) => {
    setSelectedMandal(manName);
    const manObj = currentDistrictObj.mandals.find((m) => m.nameEn === manName);
    if (manObj && manObj.villages.length > 0) {
      setSelectedVillage(manObj.villages[0].nameEn);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !mobileNumber.trim()) {
      alert(isTe ? "దయచేసి అన్ని వివరాలు పూర్తి చేయండి" : "Please fill in all mandatory fields");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const record = await submitApplication({
        serviceId: service.id,
        applicantName: applicantName.trim(),
        applicantPhone: mobileNumber.trim(),
        applicantEmail: emailAddress.trim() || undefined,
        aadhaarMasked: aadhaarNumber.trim() ? "XXXX-XXXX-" + aadhaarNumber.replace(/\s+/g, "").slice(-4) : undefined,
        district: selectedDistrict,
        mandal: selectedMandal,
        village: selectedVillage,
        details: `${purposeRemarks} | Ref: ${specificDetails}`,
      });
      setGeneratedAppId(record.id);
    } catch (err: any) {
      setErrorMessage(err.message || (isTe ? "దరఖాస్తు సమర్పణ విఫలమైంది." : "Application submission failed."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div
        id="apply-modal-container"
        className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#0B2545] text-white border-b border-blue-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-800 text-amber-300 flex items-center justify-center border border-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {isTe ? "పౌర సేవల దరఖాస్తు ఫారం" : "Citizen Service Application"}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                {isTe ? service.nameTe : service.nameEn}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm bg-slate-50/40">
          {/* ========================================================================= */}
          {/* SUCCESS SCREEN UPON APPLICATION SUBMISSION */}
          {/* ========================================================================= */}
          {generatedAppId ? (
            <div className="space-y-6 text-center py-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                  {isTe ? "దరఖాస్తు విజయవంతంగా సమర్పించబడింది!" : "Application Submitted Successfully!"}
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  {isTe
                    ? "మీ దరఖాస్తు సంబంధిత గ్రామ/వార్డు సచివాలయం మరియు మండల కార్యాలయ పరిశీలనకు పంపబడింది."
                    : "Your application has been registered in the official AP Citizen Charter queue."}
                </p>
              </div>

              {/* Application ID Highlight Box */}
              <div className="bg-blue-50/80 border-2 border-dashed border-blue-300 rounded-2xl p-5 max-w-md mx-auto">
                <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
                  {isTe ? "మీ అధికారిక అప్లికేషన్ నంబర్ (Application ID)" : "Official Application ID"}
                </p>
                <div className="font-mono text-2xl font-black text-blue-950 tracking-wider select-all">
                  {generatedAppId}
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200/80 grid grid-cols-2 text-xs text-left">
                  <div>
                    <span className="text-slate-500 font-medium">
                      {isTe ? "దరఖాస్తుదారు: " : "Applicant: "}
                    </span>
                    <strong className="text-slate-800 block">{applicantName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">
                      {isTe ? "గడువు తేదీ: " : "SLA Target: "}
                    </span>
                    <strong className="text-amber-800 block">10 {isTe ? "పని దినాలు" : "Working Days"}</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onSuccessTrack(generatedAppId);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B2545] hover:bg-blue-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{isTe ? "ఇప్పుడే స్థితిని ట్రాక్ చేయండి" : "Track Application Now"}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>{isTe ? "రసీదు ప్రింట్ / సేవ్" : "Print Acknowledgment"}</span>
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* STEP-BY-STEP MULTI-SECTION APPLICATION FORM */
            /* ========================================================================= */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Stepper Indicator */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === 1
                        ? "bg-blue-900 text-white"
                        : "bg-emerald-600 text-white"
                    }`}
                  >
                    1
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {isTe ? "వ్యక్తిగత వివరాలు" : "Applicant Profile"}
                  </span>
                </div>
                <span className="text-slate-300">→</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === 2
                        ? "bg-blue-900 text-white"
                        : step > 2
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    2
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {isTe ? "స్థల/సేవ వివరాలు" : "Service Specifics"}
                  </span>
                </div>
                <span className="text-slate-300">→</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === 3
                        ? "bg-blue-900 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    3
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {isTe ? "పత్రాలు & సమర్పణ" : "Docs & Submit"}
                  </span>
                </div>
              </div>

              {/* STEP 1: APPLICANT DETAILS */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTe ? "పూర్తి పేరు (Full Name) *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Imampuram Ramesh"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-blue-700 text-slate-900 text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTe ? "మొబైల్ సంఖ్య (Mobile Number) *" : "Mobile Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="10-digit mobile"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-blue-700 text-slate-900 text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTe ? "ఆధార్ సంఖ్య (Aadhaar UID) *" : "Aadhaar Card Number *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        placeholder="XXXX XXXX 8942"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-blue-700 text-slate-900 text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTe ? "లింగం (Gender)" : "Gender"}
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-blue-700 text-slate-900 text-sm font-medium"
                      >
                        <option value="Male">{isTe ? "పురుషుడు (Male)" : "Male"}</option>
                        <option value="Female">{isTe ? "స్త్రీ (Female)" : "Female"}</option>
                        <option value="Other">{isTe ? "ఇతర (Other)" : "Other"}</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTe ? "ఈమెయిల్ చిరునామా (Email Address)" : "Email Address"}
                      </label>
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="citizen@ap.gov.in"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-blue-700 text-slate-900 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                    >
                      <span>{isTe ? "తదుపరి: స్థల వివరాలు" : "Next: Location Details"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: LOCATION & SERVICE PARTICULARS */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTe ? "జిల్లా (District) *" : "District *"}
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-700"
                      >
                        {AP_DISTRICTS.map((d) => (
                          <option key={d.code} value={d.nameEn}>
                            {d.nameEn} ({d.nameTe})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTe ? "మండలం (Mandal) *" : "Mandal *"}
                      </label>
                      <select
                        value={selectedMandal}
                        onChange={(e) => handleMandalChange(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-700"
                      >
                        {currentDistrictObj.mandals.map((m) => (
                          <option key={m.nameEn} value={m.nameEn}>
                            {m.nameEn} ({m.nameTe})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTe ? "గ్రామం / సచివాలయం *" : "Village / Ward *"}
                      </label>
                      <select
                        value={selectedVillage}
                        onChange={(e) => setSelectedVillage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-700"
                      >
                        {currentMandalObj.villages.map((v) => (
                          <option key={v.nameEn} value={v.nameEn}>
                            {v.nameEn} ({v.nameTe})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isTe
                        ? "ఖాతా / సర్వే సంఖ్య / డోర్ నంబర్ (Khata / Survey No / PTIN)"
                        : "Khata Number / Survey No / PTIN / Assessment No"}
                    </label>
                    <input
                      type="text"
                      value={specificDetails}
                      onChange={(e) => setSpecificDetails(e.target.value)}
                      placeholder="e.g. Khata No: 412, Survey: 88/2B"
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-blue-700 text-slate-900 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isTe
                        ? "దరఖాస్తు ముఖ్య ఉద్దేశం / వివరాలు (Purpose & Grievance description)"
                        : "Purpose of Request & Specific Details"}
                    </label>
                    <textarea
                      rows={3}
                      value={purposeRemarks}
                      onChange={(e) => setPurposeRemarks(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-blue-700 text-slate-900 text-sm font-medium"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      {isTe ? "వెనుకకు" : "Back"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                    >
                      <span>{isTe ? "తదుపరి: పత్రాలు" : "Next: Documents"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: DOCUMENTS & FINAL SUBMIT */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isTe
                        ? "సహాయక పత్రాలు జతచేయండి (Attach Required Documents)"
                        : "Attach Supporting Documents (PDF/JPG)"}
                    </label>

                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center bg-slate-50/50 hover:bg-blue-50/50 transition-colors">
                      <UploadCloud className="w-8 h-8 text-blue-700 mx-auto mb-2" />
                      <p className="text-xs text-slate-700 font-semibold mb-1">
                        {isTe
                          ? "పత్రాలను ఇక్కడ డ్రాగ్ చేయండి లేదా క్లిక్ చేసి అప్‌లోడ్ చేయండి"
                          : "Drag & drop your files or click to browse"}
                      </p>
                      <p className="text-[11px] text-slate-500 mb-3">
                        {isTe
                          ? "ఆధార్, పట్టాదారు పాస్‌బుక్, సేల్ డీడ్ లేదా సంబంధిత ఆధారాలు (Max 5MB)"
                          : "Aadhaar card, Passbook, Sale deed or relevant documents (Max 5MB)"}
                      </p>

                      <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold cursor-pointer hover:bg-blue-800 transition-colors">
                        <FileCheck2 className="w-4 h-4 text-amber-300" />
                        <span>{isTe ? "ఫైల్స్ ఎంచుకోండి" : "Select Files"}</span>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUploadSim}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Attached list */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        <p className="text-[11px] font-bold text-slate-600">
                          {isTe ? "జతచేసిన పత్రాలు:" : "Attached Documents:"}
                        </p>
                        {uploadedFiles.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                          >
                            <span className="font-medium text-slate-800 truncate">
                              📄 {file}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setUploadedFiles((prev) =>
                                  prev.filter((_, i) => i !== idx)
                                )
                              }
                              className="text-red-500 hover:text-red-700 font-bold ml-2"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Declaration Checkbox */}
                  <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="citizen-declaration-check"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-blue-900 focus:ring-blue-800"
                    />
                    <label
                      htmlFor="citizen-declaration-check"
                      className="text-xs text-slate-700 leading-snug cursor-pointer select-none"
                    >
                      {isTe
                        ? "నేను సమర్పించిన సమాచారం మరియు పత్రాలు వాస్తవమైనవని, ఎటువంటి తప్పుడు సమాచారం అందించలేదని ప్రమాణపూర్వకంగా ధృవీకరిస్తున్నాను."
                        : "I solemnly declare that the information provided and attached documents are true and authentic to the best of my knowledge under the AP Citizen Services Act."}
                    </label>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      {isTe ? "వెనుకకు" : "Back"}
                    </button>

                    <button
                      type="submit"
                      disabled={!isAgreed || isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
                    >
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>
                        {isSubmitting
                          ? isTe
                            ? "సమర్పించబడుతోంది..."
                            : "Submitting..."
                          : isTe
                          ? "దరఖాస్తును సమర్పించండి"
                          : "Submit Application"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
