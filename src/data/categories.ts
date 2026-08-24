import { ServiceCategory } from "../types";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "all",
    nameTe: "అన్ని సేవలు (All)",
    nameEn: "All Services",
    iconName: "LayoutGrid",
    color: "#1E40AF",
    descriptionTe: "ఆంధ్రప్రదేశ్ ప్రభుత్వ అన్ని శాఖల పౌర సేవలు",
    descriptionEn: "All Andhra Pradesh citizen services"
  },
  {
    id: "revenue_land",
    nameTe: "రెవెన్యూ & భూమి",
    nameEn: "Revenue & Land Records",
    iconName: "Landmark",
    color: "#0F2E59",
    descriptionTe: "అడంగల్, 1-B, మ్యుటేషన్, కుల/ఆదాయ ధృవీకరణ, F-లైన్ సర్వే",
    descriptionEn: "Adangal, 1-B, mutation, caste/income certificates, land survey"
  },
  {
    id: "registration_stamps",
    nameTe: "రిజిస్ట్రేషన్ & స్టాంపులు",
    nameEn: "Registration & Stamps",
    iconName: "FileCheck",
    color: "#0D9488",
    descriptionTe: "ఆస్తి నమోదు, ఈసీ (EC), మార్కెట్ విలువ, స్లాట్ బుకింగ్",
    descriptionEn: "Property registration, EC, market value, slot booking"
  },
  {
    id: "panchayat_raj",
    nameTe: "పంచాయతీ రాజ్ & గ్రామీణ",
    nameEn: "Panchayat Raj & Rural",
    iconName: "Home",
    color: "#D97706",
    descriptionTe: "ఇంటి పన్ను, PTIN, లేఅవుట్ అనుమతులు, జనన/మరణ రికార్డులు",
    descriptionEn: "House tax, PTIN, layout sanctions, birth/death certificates"
  },
  {
    id: "civil_supplies",
    nameTe: "పౌర సరఫరాలు (రేషన్)",
    nameEn: "Civil Supplies & Ration",
    iconName: "ShoppingBag",
    color: "#4338CA",
    descriptionTe: "రైస్ కార్డు, సభ్యుల చేర్పు/తొలగింపు, రేషన్ డీలర్ సేవలు",
    descriptionEn: "Rice cards, member additions/splits, PDS grain distribution"
  },
  {
    id: "social_welfare",
    nameTe: "సంక్షేమ పథకాలు",
    nameEn: "Welfare & Pensions",
    iconName: "HeartHandshake",
    color: "#BE123C",
    descriptionTe: "NTR భరోసా పింఛన్లు, చేయూత, కళ్యాణమస్తు, ఉపకారవేతనాలు",
    descriptionEn: "NTR Bharosa pensions, financial empowerment & social safety"
  },
  {
    id: "school_education",
    nameTe: "పాఠశాల విద్య",
    nameEn: "School Education",
    iconName: "GraduationCap",
    color: "#0284C7",
    descriptionTe: "తల్లికి వందనం, బడి ప్రవేశాలు, విద్యార్థి గుర్తింపు",
    descriptionEn: "Thalliki Vandanam, admissions, student scholarships"
  },
  {
    id: "higher_education",
    nameTe: "ఉన్నత విద్య",
    nameEn: "Higher Education",
    iconName: "BookOpen",
    color: "#4F46E5",
    descriptionTe: "విద్యా దీవెన, వసతి దీవెన, ప్రవేశ పరీక్షలు (EAPCET)",
    descriptionEn: "Vidya Deevena, Vasathi Deevena, CETs & admissions"
  },
  {
    id: "police",
    nameTe: "పోలీస్ & సిటిజన్ సేవలు",
    nameEn: "Police & Safety",
    iconName: "ShieldCheck",
    color: "#B91C1C",
    descriptionTe: "క్యారెక్టర్ వెరిఫికేషన్, ఎఫ్ఐఆర్ స్థితి, దిశ హెల్ప్‌లైన్, ఎన్ఓసీ",
    descriptionEn: "CVC character verification, FIR status, Disha SOS, NOC"
  },
  {
    id: "agriculture",
    nameTe: "వ్యవసాయం & రైతులు",
    nameEn: "Agriculture & Farmers",
    iconName: "Wheat",
    color: "#15803D",
    descriptionTe: "రైతు భరోసా, అన్నదాత సుఖీభవ, ఈ-క్రాప్ నమోదు, సబ్సిడీ విత్తనాలు",
    descriptionEn: "Annadata Sukhibhava, e-crop booking, PM-Kisan, subsidized seeds"
  },
  {
    id: "municipal_admin",
    nameTe: "పురపాలక సేవలు (CDMA)",
    nameEn: "Municipal Administration",
    iconName: "Building2",
    color: "#0891B2",
    descriptionTe: "పట్టణ ఆస్తి పన్ను, నీటి కనెక్షన్, వ్యాపార లైసెన్స్, భవన నిర్మాణ అనుమతులు",
    descriptionEn: "Urban property tax, water connection, trade license, building plan"
  },
  {
    id: "energy",
    nameTe: "విద్యుత్ సేవలు (Discoms)",
    nameEn: "Energy & Electricity",
    iconName: "Zap",
    color: "#C2410C",
    descriptionTe: "కొత్త కనెక్షన్, మీటర్ మార్పు, బిల్లు చెల్లింపు, లోడ్ పెంపు",
    descriptionEn: "New power connection, meter change, tariff rebate, billing dispute"
  },
  {
    id: "transport",
    nameTe: "రవాణా శాఖ (RTA)",
    nameEn: "Transport (RTA)",
    iconName: "Car",
    color: "#6D28D9",
    descriptionTe: "డ్రైవింగ్ లైసెన్స్ (LLR/DL), వాహన రిజిస్ట్రేషన్ (RC), ఫిట్‌నెస్ సర్టిఫికేట్",
    descriptionEn: "Driving license, vehicle registration, RC transfer, fitness"
  }
];
