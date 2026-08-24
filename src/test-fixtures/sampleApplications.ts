import { ApplicationRecord } from "../types";

export const SAMPLE_APPLICATIONS: ApplicationRecord[] = [
  {
    id: "AP-2026-REV-84910",
    serviceId: 1,
    serviceNameTe: "వెబ్‌ల్యాండ్ అడంగల్ మరియు పహాణీ రికార్డు పరిశీలన & సవరణ",
    serviceNameEn: "Webland Adangal and Pahani Record Correction",
    serviceRef: "AP-REV-LD-001",
    departmentTe: "భూమి పరిపాలన కమిషనరేట్, రెవెన్యూ శాఖ",
    departmentEn: "Revenue Department (CCLA)",
    applicantName: "Imampuram Ramesh",
    aadhaarLastFour: "8942",
    mobile: "9876543210",
    email: "test.user@example.com",
    gender: "Male",
    district: "Guntur (గుంటూరు)",
    mandal: "Tenali (తెనాలి)",
    village: "Angalakuduru (అంగలకుదురు)",
    purpose: "Correction of surname spelling in 1-B Webland Record & issuance of digital passbook",
    khataOrSurveyNo: "Khata No: 412, Survey No: 88/2B (1.45 Acres)",
    attachedDocuments: [
      "Pattadar_Passbook_Old_Scan.pdf",
      "Aadhaar_Card_Verified.pdf",
      "Registered_SaleDeed_Doc_1420.pdf",
      "VRO_Field_Endorsement.pdf"
    ],
    status: "UNDER_REVIEW",
    submittedAt: "2026-08-15 10:30 AM",
    lastUpdatedAt: "2026-08-20 02:45 PM",
    estimatedCompletion: "2026-08-30",
    assignedOfficer: "Mandal Revenue Inspector (MRI), Tenali Tahsildar Office",
    statusHistory: [
      {
        status: "SUBMITTED",
        timestamp: "2026-08-15 10:30 AM",
        officerTitle: "Grama Sachivalayam Digital Assistant",
        remarks: "Online application received with initial token generation and statutory document receipt.",
        location: "Angalakuduru Village Secretariate #02"
      },
      {
        status: "UNDER_REVIEW",
        timestamp: "2026-08-18 11:15 AM",
        officerTitle: "Village Revenue Officer (VRO)",
        remarks: "Field physical verification conducted on Survey No: 88/2B. Found physical boundary tallies with original 1984 RSR register.",
        location: "Tenali Mandal Field Unit"
      },
      {
        status: "UNDER_REVIEW",
        timestamp: "2026-08-20 02:45 PM",
        officerTitle: "Mandal Revenue Inspector (MRI)",
        remarks: "Verification report forwarded to Tahsildar with recommendation for Webland database digital entry update.",
        location: "Tahsildar Office, Tenali"
      }
    ]
  },
  {
    id: "AP-2026-REG-29104",
    serviceId: 2,
    serviceNameTe: "విక్రయ విక్రయేతర ఆస్తి ధృవీకరణ పత్రం (EC)",
    serviceNameEn: "Encumbrance Certificate (EC) Issuance",
    serviceRef: "AP-REG-002",
    departmentTe: "రిజిస్ట్రేషన్ మరియు స్టాంపుల శాఖ",
    departmentEn: "Registration & Stamps Department",
    applicantName: "P. Lakshmi Devi",
    aadhaarLastFour: "3310",
    mobile: "9440123456",
    email: "lakshmi.devi@gmail.com",
    gender: "Female",
    district: "Krishna (కృష్ణా)",
    mandal: "Machilipatnam (మచిలీపట్నం)",
    village: "Chilakalapudi (చిలకలపూడి)",
    purpose: "30 Years Encumbrance Certificate (1995 to 2026) for Bank Housing Loan verification",
    khataOrSurveyNo: "Assessment #20491, Plot #12, Sy #142/3",
    attachedDocuments: [
      "Title_Deed_Copy.pdf",
      "Property_Tax_Receipt_2025_26.pdf",
      "Aadhaar_ID.pdf"
    ],
    status: "APPROVED",
    submittedAt: "2026-08-19 09:15 AM",
    lastUpdatedAt: "2026-08-21 04:00 PM",
    estimatedCompletion: "2026-08-22",
    assignedOfficer: "Sub-Registrar, Machilipatnam SRO",
    statusHistory: [
      {
        status: "SUBMITTED",
        timestamp: "2026-08-19 09:15 AM",
        officerTitle: "Citizen Online Portal (IGRS AP)",
        remarks: "Statutory online fee of ₹200 paid successfully via AP Payment Gateway.",
        location: "Registration & Stamps Online Portal"
      },
      {
        status: "UNDER_REVIEW",
        timestamp: "2026-08-20 11:30 AM",
        officerTitle: "Senior Assistant, SRO",
        remarks: "Archival search from 1995 to 2026 completed across Card database.",
        location: "Sub-Registrar Office, Machilipatnam"
      },
      {
        status: "APPROVED",
        timestamp: "2026-08-21 04:00 PM",
        officerTitle: "Joint Sub-Registrar (Class-1)",
        remarks: "Digitally signed nil-encumbrance certificate generated and made available for citizen download.",
        location: "SRO Machilipatnam"
      }
    ]
  },
  {
    id: "AP-2026-PR-71829",
    serviceId: 10,
    serviceNameTe: "ఇంటి పన్ను కొత్త అసెస్‌మెంట్ & PTIN జారీ",
    serviceNameEn: "New House Tax Assessment & PTIN Generation",
    serviceRef: "AP-PR-001",
    departmentTe: "పంచాయతీ రాజ్ మరియు గ్రామీణాభివృద్ధి శాఖ",
    departmentEn: "Panchayat Raj & Rural Development",
    applicantName: "K. Venkateswara Rao",
    aadhaarLastFour: "7128",
    mobile: "9848011223",
    email: "k.venkat@outlook.com",
    gender: "Male",
    district: "NTR District (ఎన్టీఆర్ జిల్లా)",
    mandal: "Vijayawada Rural (విజయవాడ రూరల్)",
    village: "Nunna (నూన్న)",
    purpose: "Assessment of new RCC residential building (Door No: 4-122) and PTIN creation",
    ptinOrDoorNo: "Door No: 4-122, Plot No: 18, Sri Rama Nagar",
    attachedDocuments: [
      "Gram_Panchayat_Layout_Permission.pdf",
      "Approved_Building_Plan_Blueprint.pdf",
      "Electricity_Meter_Sanction_Copy.pdf",
      "Registered_Sale_Deed.pdf"
    ],
    status: "COMPLETED",
    submittedAt: "2026-08-02 03:20 PM",
    lastUpdatedAt: "2026-08-12 11:00 AM",
    estimatedCompletion: "2026-08-12",
    assignedOfficer: "Panchayat Secretary (Grade-1), Nunna Gram Panchayat",
    statusHistory: [
      {
        status: "SUBMITTED",
        timestamp: "2026-08-02 03:20 PM",
        officerTitle: "Grama Sachivalayam Counter",
        remarks: "New House Tax assessment application registered with building plan copies.",
        location: "Nunna Secretariat-1"
      },
      {
        status: "UNDER_REVIEW",
        timestamp: "2026-08-05 10:00 AM",
        officerTitle: "Panchayat Engineering Assistant",
        remarks: "Site inspection done. Plinth area measured at 1,450 sq ft RCC residential.",
        location: "Nunna Gram Panchayat"
      },
      {
        status: "APPROVED",
        timestamp: "2026-08-09 02:00 PM",
        officerTitle: "Extension Officer PR&RD (EOPRD)",
        remarks: "Annual tax assessed at ₹1,850/year in line with standard rural slab rates.",
        location: "Vijayawada Rural Mandal Office"
      },
      {
        status: "COMPLETED",
        timestamp: "2026-08-12 11:00 AM",
        officerTitle: "Panchayat Secretary",
        remarks: "PTIN #PR-NUN-2026-4491 issued. Permanent Door Number plate sanctioned.",
        location: "Nunna Gram Panchayat"
      }
    ]
  },
  {
    id: "AP-2026-REV-10492",
    serviceId: 7,
    serviceNameTe: "సమీకృత కుల మరియు ఆదాయ ధృవీకరణ పత్రం",
    serviceNameEn: "Integrated Caste, Nativity and Date of Birth Certificate",
    serviceRef: "AP-REV-002",
    departmentTe: "రెవెన్యూ శాఖ",
    departmentEn: "Revenue Department",
    applicantName: "B. Ananya",
    aadhaarLastFour: "9012",
    mobile: "9123456780",
    email: "ananya.b@student.ap.gov.in",
    gender: "Female",
    district: "Visakhapatnam (విశాఖపట్నం)",
    mandal: "Anandapuram (ఆనందపురం)",
    village: "Vemulavalasa (వేములవలస)",
    purpose: "BC-B Community Certificate for Engineering AP EAPCET Convener Quota counseling",
    attachedDocuments: [
      "SSC_Marks_Memo_School_TC.pdf",
      "Parents_Caste_Certificate_1998.pdf",
      "White_Ration_Card.pdf",
      "Self_Declaration_Affidavit.pdf"
    ],
    status: "APPROVED",
    submittedAt: "2026-08-17 11:00 AM",
    lastUpdatedAt: "2026-08-22 09:30 AM",
    estimatedCompletion: "2026-08-24",
    assignedOfficer: "Tahsildar, Anandapuram Mandal",
    statusHistory: [
      {
        status: "SUBMITTED",
        timestamp: "2026-08-17 11:00 AM",
        officerTitle: "Village Secretariat Digital Assistant",
        remarks: "Application received and transferred for VRO inquiry.",
        location: "Vemulavalasa Sachivalayam"
      },
      {
        status: "UNDER_REVIEW",
        timestamp: "2026-08-19 03:00 PM",
        officerTitle: "Village Revenue Officer (VRO)",
        remarks: "Local inquiries confirm applicant belongs to traditional Weaver (Padmashali - BC-B) category.",
        location: "Anandapuram Mandal"
      },
      {
        status: "APPROVED",
        timestamp: "2026-08-22 09:30 AM",
        officerTitle: "Tahsildar & Executive Magistrate",
        remarks: "Digitally signed integrated certificate issued under MeeSeva AP seal.",
        location: "Tahsildar Office Anandapuram"
      }
    ]
  },
  {
    id: "AP-2026-ED-55201",
    serviceId: 4,
    serviceNameTe: "తల్లికి వందనం పథకం దరఖాస్తు",
    serviceNameEn: "Thalliki Vandanam Scheme Application",
    serviceRef: "AP-SCH-TV-001",
    departmentTe: "పాఠశాల విద్యా శాఖ",
    departmentEn: "School Education Department",
    applicantName: "S. Hymavathi (Mother)",
    aadhaarLastFour: "4490",
    mobile: "9701239876",
    email: "hyma.s@ap.gov.in",
    gender: "Female",
    district: "Tirupati (తిరుపతి)",
    mandal: "Chandragiri (చంద్రగిరి)",
    village: "Panakam (పానకం)",
    purpose: "Annual financial benefit for 2 children in ZPH School (Classes 8th and 10th)",
    attachedDocuments: [
      "Mother_Aadhaar_NPCI_Passbook.pdf",
      "Student1_UID_Bonafide.pdf",
      "Student2_UID_Bonafide.pdf",
      "Rice_Card_Copy.pdf"
    ],
    status: "SUBMITTED",
    submittedAt: "2026-08-22 02:15 PM",
    lastUpdatedAt: "2026-08-22 02:15 PM",
    estimatedCompletion: "2026-09-05",
    assignedOfficer: "Welfare & Education Assistant (WEA), Chandragiri",
    statusHistory: [
      {
        status: "SUBMITTED",
        timestamp: "2026-08-22 02:15 PM",
        officerTitle: "Welfare & Education Assistant (WEA)",
        remarks: "Application authenticated with biometric authentication & NPCI bank status verification.",
        location: "Panakam Village Secretariat"
      }
    ]
  }
];

const LOCAL_STORAGE_APPS_KEY = "prajamitra_applications_store";

export function loadAllApplications(): ApplicationRecord[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_APPS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load saved applications:", e);
  }
  // Initialize with samples
  localStorage.setItem(LOCAL_STORAGE_APPS_KEY, JSON.stringify(SAMPLE_APPLICATIONS));
  return SAMPLE_APPLICATIONS;
}

export function getApplicationById(id: string): ApplicationRecord | undefined {
  const apps = loadAllApplications();
  const cleanId = id.trim().toUpperCase();
  return apps.find((a) => a.id.toUpperCase() === cleanId);
}

export function saveNewApplication(app: ApplicationRecord): ApplicationRecord {
  const current = loadAllApplications();
  const exists = current.some((a) => a.id === app.id);
  const updated = exists ? current.map((a) => (a.id === app.id ? app : a)) : [app, ...current];
  try {
    localStorage.setItem(LOCAL_STORAGE_APPS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save application to storage:", e);
  }
  return app;
}
