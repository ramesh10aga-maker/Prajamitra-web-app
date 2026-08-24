import { SchemeItem } from "../types";

export const AP_GOVERNMENT_SCHEMES: SchemeItem[] = [
  {
    id: "thalliki_vandanam",
    nameTe: "తల్లికి వందనం పథకం",
    nameEn: "Thalliki Vandanam Scheme",
    taglineTe: "పాఠశాలకు వెళ్లే ప్రతి బిడ్డకు వార్షిక ₹15,000 ఆర్థిక సాయం",
    taglineEn: "Annual financial assistance of ₹15,000 for each school-going child",
    departmentTe: "పాఠశాల విద్యా శాఖ",
    departmentEn: "School Education Department",
    benefitAmountTe: "ఏడాదికి ₹15,000 నేరుగా తల్లి బ్యాంక్ ఖాతాలో జమ",
    benefitAmountEn: "₹15,000 per child per year direct bank transfer to mother",
    eligibilityTe: [
      "1 నుండి 12వ తరగతి వరకు గుర్తింపు పొందిన పాఠశాల/కళాశాలలో చదువుతున్న విద్యార్థులు.",
      "కనీసం 75% పాఠశాల హాజరు నమోదు కావాలి.",
      "కుటుంబ వార్షిక ఆదాయం నిర్దేశిత పరిమితికి లోబడి ఉండాలి.",
      "తల్లి ఆధార్ కార్డుతో బ్యాంక్ ఖాతా ఎన్‌పీసీఐ (NPCI) లింక్ అయి ఉండాలి."
    ],
    eligibilityEn: [
      "Students studying from Classes 1 to 12 in recognized schools/junior colleges in AP.",
      "Minimum 75% student attendance required during the academic year.",
      "Family annual income within prescribed white ration card limits.",
      "Mother's active Aadhaar-seeded NPCI bank account."
    ],
    requiredDocsTe: [
      "విద్యార్థి ఆధార్ కార్డు మరియు ఫోటో",
      "తల్లి ఆధార్ కార్డు",
      "తెల్ల రేషన్ కార్డు / రైస్ కార్డు",
      "పాఠశాల బోనఫైడ్ సర్టిఫికేట్ / స్టూడెంట్ ఐడీ",
      "బ్యాంక్ పాస్‌బుక్ మొదటి పేజీ స్కాన్"
    ],
    requiredDocsEn: [
      "Student Aadhaar Card & Photograph",
      "Mother's Aadhaar Card",
      "White Ration Card / Rice Card",
      "School Bonafide / Student UID",
      "Active Bank Passbook copy"
    ],
    officialUrl: "https://jnanabhumi.ap.gov.in",
    category: "education",
    badge: "Flagship Education"
  },
  {
    id: "annadata_sukhibhava",
    nameTe: "రైతు భరోసా - అన్నదాత సుఖీభవ",
    nameEn: "Annadata Sukhibhava / Rythu Bharosa",
    taglineTe: "రాష్ట్రంలోని ప్రతి రైతు కుటుంబానికి వార్షిక ₹20,000 పెట్టుబడి సాయం",
    taglineEn: "Annual input assistance of ₹20,000 per eligible farming family",
    departmentTe: "వ్యవసాయ & సహకార శాఖ",
    departmentEn: "Agriculture Department",
    benefitAmountTe: "ఏడాదికి ₹20,000 (రాష్ట్ర ప్రభుత్వం ₹14,000 + PM-కిసాన్ ₹6,000)",
    benefitAmountEn: "₹20,000 per year (State ₹14,000 + PM-Kisan ₹6,000 in 3 installments)",
    eligibilityTe: [
      "ఆంధ్రప్రదేశ్‌లో సొంత వ్యవసాయ భూమి కలిగిన పట్టాదారు రైతులు.",
      "అర్హత కలిగిన కౌలు రైతులు (CCRC కార్డుదారులు).",
      "వెబ్‌ల్యాండ్ రికార్డుల్లో భూమి వివరాలు ధృవీకరించబడాలి.",
      "ఈ-క్రాప్ (e-Crop) ద్వారా పంట నమోదు తప్పనిసరి."
    ],
    eligibilityEn: [
      "Land-owning farmers with valid Webland Pattadar records.",
      "Eligible tenant farmers holding CCRC cards (Crop Cultivator Rights).",
      "Mandatory e-Crop booking for active agricultural seasons.",
      "Aadhaar-enabled bank account verification."
    ],
    requiredDocsTe: [
      "పట్టాదారు పాస్‌బుక్ / ఖాతా సంఖ్య",
      "రైతు ఆధార్ కార్డు",
      "రైస్ కార్డు / తెల్ల రేషన్ కార్డు",
      "ఈ-క్రాప్ నమోదు రసీదు",
      "కౌలు రైతులకు CCRC కార్డ్"
    ],
    requiredDocsEn: [
      "Pattadar Passbook / Khata Number",
      "Farmer Aadhaar Card",
      "Rice Card / Family Ration Card",
      "e-Crop booking receipt",
      "CCRC card for tenant cultivators"
    ],
    officialUrl: "https://karshak.ap.gov.in",
    category: "farmers",
    badge: "Agriculture Support"
  },
  {
    id: "deepam_scheme",
    nameTe: "దీపం 2.0 ఉచిత గ్యాస్ సిలిండర్ల పథకం",
    nameEn: "Deepam 2.0 Free LPG Cylinders",
    taglineTe: "అర్హులైన పేద కుటుంబాలకు ఏడాదికి 3 ఉచిత ఎల్‌పీజీ వంట గ్యాస్ సిలిండర్లు",
    taglineEn: "3 Free LPG cooking gas cylinders per year for eligible households",
    departmentTe: "పౌర సరఫరాల శాఖ",
    departmentEn: "Civil Supplies Department",
    benefitAmountTe: "ఏడాదికి 3 సిలిండర్ల సబ్సిడీ మొత్తం నేరుగా బ్యాంక్ ఖాతాలో రీఫండ్",
    benefitAmountEn: "Full cylinder subsidy credited back to citizen account upon delivery",
    eligibilityTe: [
      "ఆంధ్రప్రదేశ్ తెల్ల రేషన్ కార్డు / రైస్ కార్డు కలిగిన కుటుంబాలు.",
      "యాక్టివ్ డొమెస్టిక్ ఎల్‌పీజీ కనెక్షన్ (HP, Indane, Bharat Gas).",
      "ఆధార్ కార్డుతో గ్యాస్ కనెక్షన్ మరియు బ్యాంక్ అకౌంట్ లింక్ అయి ఉండాలి."
    ],
    eligibilityEn: [
      "Valid White Ration Card / Rice Card holders in Andhra Pradesh.",
      "Active domestic LPG connection with HPCL, IOCL, or BPCL.",
      "Aadhaar-seeded LPG consumer ID & bank account."
    ],
    requiredDocsTe: [
      "రైస్ కార్డు నంబర్",
      "గ్యాస్ కనెక్షన్ వినియోగదారు నంబర్ (Consumer No / SV)",
      "లబ్ధిదారుని ఆధార్ కార్డు",
      "బ్యాంక్ పాస్‌బుక్"
    ],
    requiredDocsEn: [
      "Rice Card / Ration Card Number",
      "LPG Consumer Number & Agency Details",
      "Beneficiary Aadhaar Card",
      "Active Bank Passbook"
    ],
    officialUrl: "https://epdsap.ap.gov.in",
    category: "women",
    badge: "Welfare & Clean Energy"
  },
  {
    id: "ntr_bharosa_pension",
    nameTe: "NTR భరోసా సామాజిక భద్రతా పింఛన్లు",
    nameEn: "NTR Bharosa Social Security Pension",
    taglineTe: "వృద్ధులు, వితంతువులు, దివ్యాంగులకు గౌరవప్రదమైన నెలవారీ పింఛన్",
    taglineEn: "Monthly enhanced dignity pension for senior citizens, widows & disabled",
    departmentTe: "గ్రామీణాభివృద్ధి & సెర్ప్ (SERP)",
    departmentEn: "Panchayat Raj & Rural Development (SERP)",
    benefitAmountTe: "వృద్ధులు/వితంతువులకు నెలకు ₹4,000; దివ్యాంగులకు నెలకు ₹6,000 నుండి ₹15,000",
    benefitAmountEn: "₹4,000/month for Old Age & Widows; ₹6,000-₹15,000/month for Differently-abled",
    eligibilityTe: [
      "వృద్ధాప్య పింఛను కొరకు 50 ఏళ్లు పైబడిన వారు.",
      "వితంతువులు (మరణ ధృవీకరణ పత్రం తప్పనిసరి).",
      "సదరం (SADAREM) సర్టిఫికేట్ కలిగిన దివ్యాంగులు (కనీసం 40% వైకల్యం).",
      "ఆంధ్రప్రదేశ్ తెల్ల రేషన్ కార్డు కలిగి ఉండాలి."
    ],
    eligibilityEn: [
      "Senior citizens aged 50+ (prescribed categories) / 60+ general.",
      "Widows with death certificate of spouse.",
      "Differently-abled citizens with SADAREM disability certificate (40%+).",
      "State resident with valid Rice Card."
    ],
    requiredDocsTe: [
      "ఆధార్ కార్డు",
      "రైస్ కార్డు",
      "వయస్సు ధృవీకరణ పత్రం (ఓటర్ ఐడీ / బర్త్ సర్టిఫికేట్)",
      "సదరం సర్టిఫికేట్ (దివ్యాంగులకు)",
      "పాస్‌పోర్ట్ సైజ్ ఫోటోలు"
    ],
    requiredDocsEn: [
      "Aadhaar Card",
      "Rice Card",
      "Age proof document (Voter ID / Birth certificate)",
      "SADAREM Certificate for PwD",
      "Passport size photos"
    ],
    officialUrl: "https://sspensions.ap.gov.in",
    category: "pension",
    badge: "Social Security"
  },
  {
    id: "aarogyasri_health",
    nameTe: "డాక్టర్ వైఎస్సార్ ఆరోగ్యశ్రీ / ఆయుష్మాన్ భారత్",
    nameEn: "Dr. YSR Aarogyasri Health Scheme",
    taglineTe: "పేద మరియు మధ్యతరగతి కుటుంబాలకు ₹25 లక్షల వరకు ఉచిత కార్పొరేట్ వైద్యం",
    taglineEn: "Cashless quality healthcare & surgeries up to ₹25 Lakhs per family per year",
    departmentTe: "వైద్య ఆరోగ్య మరియు కుటుంబ సంక్షేమ శాఖ",
    departmentEn: "Health, Medical & Family Welfare Department",
    benefitAmountTe: "నెట్‌వర్క్ ఆసుపత్రుల్లో ₹25 లక్షల వరకు సంపూర్ణ ఉచిత చికిత్స & మందులు",
    benefitAmountEn: "Up to ₹25 Lakhs comprehensive coverage across 3,250+ medical procedures",
    eligibilityTe: [
      "ఆంధ్రప్రదేశ్ నివాసితులు మరియు చెల్లుబాటు అయ్యే ఆరోగ్యశ్రీ కార్డు / రైస్ కార్డు కలిగిన వారు.",
      "వార్షిక ఆదాయం ₹5 లక్షల లోపు ఉన్న కుటుంబాలు.",
      "నెట్‌వర్క్ ఆసుపత్రుల్లో ఆరోగ్య మిత్ర ద్వారా నమోదు."
    ],
    eligibilityEn: [
      "Andhra Pradesh residents holding Aarogyasri Card or Rice Card.",
      "Family annual income up to ₹5.00 Lakhs.",
      "Direct registration via Aarogya Mithra at network hospitals."
    ],
    requiredDocsTe: [
      "ఆరోగ్యశ్రీ హెల్త్ కార్డ్ / రైస్ కార్డ్",
      "కుటుంబ సభ్యులందరి ఆధార్ కార్డులు",
      "డాక్టర్ ప్రిస్క్రిప్షన్ మరియు రోగ నిర్ధారణ రిపోర్టులు"
    ],
    requiredDocsEn: [
      "Aarogyasri Health Card / Rice Card",
      "Aadhaar Cards of patient & family members",
      "Referral / Medical prescription & Diagnostic reports"
    ],
    officialUrl: "https://aarogyasri.ap.gov.in",
    category: "health",
    badge: "Universal Healthcare"
  },
  {
    id: "vidya_deevena",
    nameTe: "జగనన్న విద్యా దీవెన & వసతి దీవెన",
    nameEn: "Vidya Deevena & Vasathi Deevena",
    taglineTe: "ఐటీఐ, పాలిటెక్నిక్, డిగ్రీ, ఇంజనీరింగ్ విద్యార్థులకు పూర్తి ఫీజు రీయింబర్స్‌మెంట్",
    taglineEn: "Full tuition fee reimbursement + annual boarding/hostel assistance",
    departmentTe: "ఉన్నత విద్యా శాఖ",
    departmentEn: "Higher Education Department",
    benefitAmountTe: "పూర్తి కళాశాల ఫీజు + వసతి కొరకు ఏడాదికి ₹20,000 వరకు",
    benefitAmountEn: "100% Tuition Fee + ₹10,000 to ₹20,000/yr hostel assistance in two terms",
    eligibilityTe: [
      "రాష్ట్రంలోని ప్రభుత్వ / ప్రైవేట్ ఎయిడెడ్ / అన్‌ఎయిడెడ్ గుర్తింపు పొందిన కళాశాలల విద్యార్థులు.",
      "కన్వీనర్ కోటా ద్వారా అడ్మిషన్ పొంది ఉండాలి.",
      "కుటుంబ వార్షిక ఆదాయం ₹2.5 లక్షల లోపు ఉండాలి.",
      "విద్యార్థి హాజరు 75% తప్పనిసరి."
    ],
    eligibilityEn: [
      "Students admitted through Convener Quota (EAPCET/ICET/ECET/PGCET).",
      "Pursuing ITI, Polytechnic, Degree, Engineering, Medicine, PG.",
      "Family annual income under ₹2.5 Lakhs.",
      "75% minimum semester attendance."
    ],
    requiredDocsTe: [
      "కళాశాల అలాట్‌మెంట్ ఆర్డర్",
      "10వ, ఇంటర్ మార్కుల జాబితా",
      "ఆదాయ ధృవీకరణ పత్రం / రైస్ కార్డు",
      "విద్యార్థి మరియు తల్లి ఆధార్ కార్డులు",
      "తల్లి బ్యాంక్ పాస్‌బుక్ (NPCI లింక్)"
    ],
    requiredDocsEn: [
      "CET Allotment Order & Fee Challan",
      "Previous Academic Marksheets",
      "Income Certificate / White Ration Card",
      "Student & Mother Aadhaar Cards",
      "Mother's Aadhaar-seeded Bank Account"
    ],
    officialUrl: "https://jnanabhumi.ap.gov.in",
    category: "education",
    badge: "Higher Education"
  }
];
