-- Generated from government_services.json

-- Flyway migration for the PrajaMitra government service catalog.



INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'revenue_land'),
    'AP-REV-LD-001',
    'Webland Adangal and Pahani Record Viewing',
    'వెబ్‌ల్యాండ్ అడంగల్ మరియు పహాణీ రికార్డు పరిశీలన',
    'Online facility to view land details, ownership, crop pattern and land classification in Andhra Pradesh.',
    'ఆంధ్రప్రదేశ్ భూ రికార్డుల సమాచారాన్ని (అడంగల్/పహాణీ) వెబ్‌ల్యాండ్ ఆన్‌లైన్ ద్వారా తెలుసుకొనే సౌకర్యం.',
    'Any landowner who possesses agricultural or other land holdings in AP.',
    'Pattadar Aadhaar number, Khata number, or Survey number.',
    'Select District, Mandal, Village on Meebhoomi portal, enter Survey or Khata number to view/download Adangal.',
    'Online viewing is Free. Certified printed copy at MeeSeva is ₹25.',
    'Instantaneous (Online).',
    'https://meebhoomi.ap.gov.in/',
    'CCLA Andhra Pradesh Portal',
    TRUE,
    '2026-02-15'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-REV-LD-001'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'registration_stamps'),
    'AP-REG-002',
    'Encumbrance Certificate (EC) Issuance',
    'విక్రయ విక్రయేతర ఆస్తి ధృవీకరణ పత్రం (EC)',
    'Check previous transaction history and claims on a property.',
    'ఆస్తిపై ఎటువంటి లోన్లు లేదా మునుపటి రిజిస్ట్రేషన్లు ఉన్నాయో తెలుసుకోవడానికి ఈసీ అత్యవసరం.',
    'Property buyers or owners in AP.',
    'Property document number, registration year, owner name.',
    'Submit property bounds, survey number or registration doc number.',
    '₹200 Statutory Fee + User Charges',
    '1 working day (Online).',
    'https://registration.ap.gov.in/',
    'IGRS Andhra Pradesh',
    TRUE,
    '2026-03-01'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-REG-002'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'police'),
    'AP-POL-003',
    'Character Verification Certificate (CVC)',
    'పోలీస్ ప్రవర్తనా ధృవీకరణ పత్రం (క్యారెక్టర్ వెరిఫికేషన్)',
    'Police verification certificate for employment, passport, or visa purposes.',
    'ఉద్యోగ నియామకాలు, పాస్‌పోర్ట్ మరియు విదేశీ ప్రయాణాల కొరకు పోలీస్ వెరిఫికేషన్ సర్టిఫికేట్.',
    'Any citizen residing in AP.',
    'Aadhaar Card, Photograph, Address Proof, Self-declaration.',
    'Submit application on Citizen portal. Local PS will verify records.',
    '₹1000 for private entities, Free for Govt jobs',
    '15 working days',
    'https://slprb.ap.gov.in/',
    'AP Police Portal',
    TRUE,
    '2026-01-20'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-POL-003'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'school_education'),
    'AP-SCH-2026-TV',
    'Thalliki Vandanam Scheme',
    'తల్లికి వందనం పథకం',
    'Thalliki Vandanam is a flagship scheme of the Government of Andhra Pradesh. Under this scheme, financial assistance of Rs. 15,000 per annum is directly credited to the bank accounts of eligible mothers who send their children to school (from Class 1 to Intermediate). The main objective is to promote education, minimize school dropout rates, and support poor families.',
    'ఆంధ్రప్రదేశ్ ప్రభుత్వం ప్రవేశపెట్టిన ప్రతిష్టాత్మక పథకం ''తల్లికి వందనం''. దీని ద్వారా ఒకటో తరగతి నుండి ఇంటర్మీడియట్ వరకు చదువుతున్న పేద విద్యార్థుల తల్లులకు వార్షిక ఆర్థిక సాయంగా రూ. 15,000 నేరుగా వారి బ్యాంక్ ఖాతాల్లో జమ చేయబడుతుంది. పిల్లలను పాఠశాలలకు పంపేలా ప్రోత్సహించడం మరియు బడి మానేసే వారి సంఖ్యను తగ్గించడమే ఈ పథకం యొక్క ముఖ్య ఉద్దేశ్యం.',
    '1. The mother or guardian must be a resident of Andhra Pradesh.
2. The student must be studying in a Government, Aided, or recognized Private school/Junior College (Class 1 to 12).
3. The student must maintain a minimum of 75% attendance.
4. The family must possess a valid BPL White Ration Card.',
    '1. Aadhaar Card of both mother and student
2. White Ration Card (Rice Card)
3. Student''s School ID Card or Study Certificate
4. Active Bank Account Passbook of the mother (linked with Aadhaar)
5. Attendance verification certificate from the school',
    'School Headmasters register student and mother details on the official education portal. After field verification by ward/grama sachivalayam staff, the eligible list is finalized and the financial benefit is directly disbursed via DBT.',
    'Free',
    '30 to 45 Days',
    'https://bm-sgsw.ap.gov.in/',
    'School Education Department, Government of Andhra Pradesh',
    TRUE,
    '2026-07-05'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-SCH-2026-TV'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'higher_education'),
    'AP-HEDU-006',
    'NTR Vidya Deevena (RTF)',
    'ఎన్టీఆర్ విద్యా దీవెన (పూర్తి ఫీజు రీయింబర్స్మెంట్)',
    'Complete tuition fee reimbursement for poor students pursuing professional higher education courses.',
    'ఐటీఐ, పాలిటెక్నిక్, డిగ్రీ, బీటెక్, పీజీ చదివే పేద విద్యార్థులకు పూర్తి ఫీజు రీయింబర్స్మెంట్ అందించే పథకం.',
    'Students from households with annual income below ₹2.5 Lakhs pursuing post-matric studies.',
    'Caste and Income certificate, College admission letter, Mother & student Aadhaar, College fee details.',
    'Biometric verification is done at college during admission and linked via Jnanabhumi portal.',
    'Free',
    'Quarterly release cycles',
    'https://jnanabhumi.ap.gov.in/',
    'Social Welfare Department AP',
    TRUE,
    '2026-03-10'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-HEDU-006'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'municipal_admin'),
    'AP-MUN-007',
    'Property Tax Online Assessment and Payment',
    'ఆస్తి పన్ను అసెస్‌మెంట్ మరియు ఆన్‌లైన్ చెల్లింపుల గైడ్',
    'Evaluate and clear outstanding property tax and vacancy tax dues online.',
    'పట్టణ మరియు నగరపాలక సంస్థల పరిధిలో గృహాలు, ఖాళీ స్థలాల ఆస్తి పన్ను అసెస్‌మెంట్ మరియు తక్షణ ఆన్‌లైన్ చెల్లింపుల విధానం.',
    'Any property owner under municipal corporations in AP.',
    'PTIN (Assessment Number), Door Number, District, and Municipality.',
    'Enter PTIN on CDMA portal, verify owner details, and pay outstanding tax.',
    'Variable based on property valuation and rates',
    'Instant receipt generation (Online)',
    'https://cdma.ap.gov.in',
    'MA&UD Department AP',
    TRUE,
    '2026-02-18'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-MUN-007'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'panchayat_raj'),
    'AP-PRRD-008',
    'MGNREGS Job Card Issuance',
    'మహాత్మా గాంధీ జాతీయ గ్రామీణ ఉపాధి హామీ పథకం (MGNREGS) జాబ్ కార్డ్',
    'Welfare scheme providing 100 days of guaranteed wage employment per year to rural households.',
    'గ్రామీణ ప్రాంతాలలోని అకుశల కార్మికులకు సంవత్సరానికి 100 రోజులు పని కల్పించే ఉపాధి హామీ జాబ్ కార్డ్ జారీ సేవ.',
    'Adult members of rural households willing to do unskilled manual work.',
    'Aadhaar Card, family group photo, bank account details, and address proof.',
    'Submit application to Panchayath Secretary or Field Assistant at local Grama Sachivalayam.',
    'Completely Free',
    '15 working days',
    'https://nrega.dord.gov.in/MGNREGA_new/Nrega_home.aspx',
    'Panchayat Raj AP',
    TRUE,
    '2026-04-05'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-PRRD-008'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'civil_supplies'),
    'AP-CIV-009',
    'New Rice Card Application & Corrections',
    'నూతన రైస్ కార్డ్ దరఖాస్తు మరియు సభ్యుల చేర్పులు',
    'Apply for a new subsidized food security Rice Card or perform corrections like member addition/deletion.',
    'రాష్ట్రంలోని పేద కుటుంబాలకు చౌక ధరల దుకాణాల ద్వారా సరుకులు మరియు ఆరోగ్య పథకాల లబ్ధి పొందేందుకు రైస్ కార్డ్ జారీ.',
    'Families with monthly income below ₹10,000 (rural) and ₹12,000 (urban).',
    'Aadhaar cards of all members, Proof of residence, income certificate, and photographs.',
    'Submit application to Digital Assistant. After physical verification by VRO/RI, card is generated.',
    '₹45 application service fee',
    '15 working days',
    'https://civilsupplies.ap.gov.in/',
    'Civil Supplies Department AP',
    TRUE,
    '2026-01-25'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-CIV-009'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'horticulture'),
    'AP-HORT-011',
    'Micro Irrigation Drip & Sprinkler Subsidy',
    'డ్రిప్ మరియు స్ప్రింక్లర్ మైక్రో ఇరిగేషన్ సబ్సిడీ (APMIP)',
    'Provision of drip and sprinkler irrigation units with up to 90% subsidy for small & marginal farmers.',
    'నీటి సంరక్షణ కోసం డ్రిప్ మరియు స్ప్రింక్లర్ పరికరాలపై చిన్న మరియు సన్నకారు రైతులకు గరిష్టంగా 90% సబ్సిడీ సేవ.',
    'Farmers possessing at least 1 acre of cultivable land and a verified water source.',
    'Pattadar Passbook, Aadhaar Card, Survey map, Soil test report, Water source proof.',
    'Apply online at APMIP, pay farmer''s contribution share, and obtain work order.',
    'Application fee ₹100 + Farmer contribution percentage',
    '30 working days',
    'https://horticulturedept.ap.gov.in',
    'Horticulture Department AP',
    TRUE,
    '2026-03-25'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-HORT-011'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'animal_husbandry'),
    'AP-AH-012',
    'Livestock Free Healthcare & Cattle Insurance',
    'పశువుల ఉచిత ఆరోగ్య రక్షణ మరియు పశుబీమా పథకం',
    'Subsidized livestock insurance and free veterinary healthcare services across AP villages.',
    'రైతుల పశుసంపద సంరక్షణ కొరకు ఉచిత పశువైద్య సేవలు, కృత్రిమ గర్భధారణ సేవలు మరియు పశువులకు అత్యంత తక్కువ ప్రీమియంతో బీమా సేవ.',
    'All dairy farmers and livestock owners in AP.',
    'Owner Aadhaar, Rice Card, Cattle Ear-tag ID, Cattle photograph.',
    'Submit Cattle Ear Tag and photos with insurance request at local veterinary clinic.',
    'Veterinary treatment is Free. Insurance premium has 50%-75% subsidy.',
    '7 days for insurance policy',
    'https://ahd.aptonline.in/AHMS/Views/Home.aspx',
    'Animal Husbandry AP',
    TRUE,
    '2026-02-10'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-AH-012'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'fisheries'),
    'AP-FSH-013',
    'Chandranna Matsyakara Bharosa Scheme',
    'చంద్రన్న మత్స్యకార భరోసా సామాజిక భద్రతా పథకం',
    'Financial relief of ₹10,000 to marine fishermen families during the marine fishing ban period.',
    'సముద్రపు వేట నిషేధ కాలంలో మత్స్యకారుల కుటుంబాలను ఆదుకునేందుకు ₹10,000 ఆర్ధిక సహాయం అందించే పథకం.',
    'Active marine fishermen families affected by the seasonal marine fishing ban.',
    'Fishermen ID Card, Boat License copy, Aadhaar, Bank passbook.',
    'Department field staff registers fishermen and issues ban-relief compensation.',
    'Completely Free',
    'Direct credit during ban period',
    'https://fisheries.ap.gov.in',
    'Fisheries Department AP',
    TRUE,
    '2026-03-30'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-FSH-013'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'transport'),
    'AP-TRN-014',
    'Learner''s License (LLR) Application & Test Slot',
    'లెర్నర్స్ డ్రైవింగ్ లైసెన్స్ (LLR) ఆన్‌లైన్ స్లాట్ మరియు దరఖాస్తు',
    'Apply online, pay fee and reserve test slot for Learner''s License (LLR) in AP.',
    'డ్రైవింగ్ నేర్చుకునే వారి కొరకు రవాణా శాఖ జారీ చేసే అధికారిక లెర్నర్స్ లైసెన్స్ ఆన్‌లైన్ దరఖాస్తు సేవ.',
    'Any resident citizen of age 18 years or above.',
    'Age Proof (SSC/Birth certificate), Aadhaar Card, Address Proof, and Photo.',
    'Fill LLR request on ePragati, pay test fees, and select slot for computer test.',
    '₹260 Official Transport Fee',
    'Issued on the day of LLR test success',
    'https://parivahan.gov.in/',
    'ePragati AP Transport',
    TRUE,
    '2026-04-01'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-TRN-014'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'commercial_taxes'),
    'AP-CT-015',
    'AP GST New Registration & Amendment',
    'ఏపీ జీఎస్‌టీ (GST) నూతన రిజిస్ట్రేషన్ మరియు దిద్దుబాట్లు',
    'Apply for State GST registration, file amendments, and pay professional taxes.',
    'రాష్ట్రంలోని వ్యాపారాల కొరకు అధికారికంగా సరుకులు మరియు సేవల పన్ను (GSTIN) నూతన రిజిస్ట్రేషన్ సేవ.',
    'Business owners with annual turnover exceeding threshold limits in AP.',
    'PAN Card, Business Address proof (Rent deed/Electricity bill), Bank passbook, Promoter Aadhaar.',
    'Submit PAN, Bank and Address records on GST portal. Authorized officers will approve online.',
    'Free of cost',
    '7 working days',
    'https://apct.gov.in',
    'Commercial Taxes AP',
    TRUE,
    '2026-05-01'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-CT-015'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'labour'),
    'AP-LAB-016',
    'AP Labour Board BOCW Worker Registration',
    'ఏపీ కార్మిక సంక్షేమ బోర్డు భవన నిర్మాణ కార్మికుల రిజిస్ట్రేషన్',
    'Enrolling construction workers in AP Labour Welfare Board to provide security benefits, accident insurance, and family support.',
    'భవన మరియు ఇతర నిర్మాణ కార్మికులకు సామాజిక భద్రత, ప్రమాద బీమా మరియు ప్రసూతి సహాయాలు అందించే కార్మిక కార్డ్ రిజిస్ట్రేషన్.',
    'Unorganized construction workers aged 18 to 60 years in AP.',
    'Aadhaar Card, Bank account copy, Employment/Wage certificate from employer, Photo.',
    'Submit employee details online. Local Labour Inspector verifies and approves the card.',
    'Registration fee ₹50 + Annual subscription ₹10',
    '15 working days',
    'https://labour.ap.gov.in',
    'Labour Department AP',
    TRUE,
    '2026-03-12'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-LAB-016'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'women_child_welfare'),
    'AP-WCW-017',
    'Chandranna Pelli Kanuka',
    'చంద్రన్న పెళ్లి కానుక వివాహ సహాయ పథకం',
    'Financial marriage assistance up to ₹1.5 Lakhs for daughters from poor and marginalized families.',
    'పేద కుటుంబాలలోని ఆడపిల్లల వివాహాలకు నిశ్చితార్థ సాయంగా ₹1.5 లక్షల వరకు ఆర్థిక సహాయం అందించే సంక్షేమ పథకం.',
    'Poor families belonging to SC/ST/BC/Minority/Disabled communities. Bride must pass Class 10.',
    'Bride & Groom Aadhaar, Wedding card, Birth certificates, Caste, Income certificate, Marriage photo.',
    'Submit application on GSWS NBM portal within 60 days of marriage. Local Welfare Assistant verifies.',
    'Completely Free',
    '30 working days',
    'https://ap.gov.in/',
    'GSWS NBM AP',
    TRUE,
    '2026-04-15'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-WCW-017'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'social_welfare'),
    'AP-SW-018',
    'Post-Matric Scholarship & Vasathi Deevena',
    'పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ మరియు వసతి దీవెన (MTF) గైడ్',
    'Annual hostel and mess charges support up to ₹20,000 for post-matric students in professional courses.',
    'పేద వర్గాల విద్యార్థుల భోజన, వసతి ఖర్చుల కొరకు సంవత్సరానికి ₹20,000 వరకు ఆర్థిక సహాయం అందించే పథకం.',
    'Eligible SC/ST/BC post-matric students of recognized professional colleges.',
    'Caste, Income certificates, College ID, Aadhaar (mother & student), bank account details.',
    'Submit application online on Jnanabhumi. Approved amounts are directly credited to mother''s account.',
    'Free',
    'Installment-based release',
    'https://jnanabhumi.ap.gov.in/',
    'Social Welfare AP',
    TRUE,
    '2026-03-18'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-SW-018'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'bc_welfare'),
    'AP-BCW-019',
    'Adarana Hand-tools & Equipment Subsidy',
    'ఆదరణ చేతివృత్తుల పరికరాల సబ్సిడీ పథకం',
    'Provision of modern technical hand-tools and machinery on up to 70% subsidy to traditional artisans from BC communities.',
    'బీసీ వర్గాలకు చెందిన చేతివృత్తుల మరియు సాంప్రదాయ కుల వృత్తుల వారికి ఆధునిక పరికరాలను 70% సబ్సిడీతో జారీ చేసే పథకం.',
    'Permanent residents of AP belonging to BC categories, active in traditional professions.',
    'Aadhaar Card, BC Caste certificate, Income certificate, Trade/Profession certificate, Bank passbook.',
    'Submit application to BC Welfare Assistant. Recommended beneficiaries will be awarded machinery.',
    'Application is Free. 30% contribution required from beneficiary.',
    '45 working days',
    'https://apobmms.apcfss.in',
    'BC Welfare Department AP',
    TRUE,
    '2026-03-22'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-BCW-019'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'sc_welfare'),
    'AP-SCW-020',
    'Ambedkar Overseas Vidya Nidhi Scheme',
    'డాక్టర్ బి.ఆర్. అంబేద్కర్ విదేశీ విద్యా నిధి సహాయం',
    'Financial aid up to ₹15 Lakhs for eligible Scheduled Caste students pursuing postgraduate courses abroad.',
    'షెడ్యూల్డ్ కులాల విద్యార్థులు విదేశీ విశ్వవిద్యాలయాలలో ఉన్నత విద్యను అభ్యసించేందుకు ₹15 లక్షల వరకు గ్రాంట్ సహాయం.',
    'Post-graduate SC students with family annual income under ₹6 Lakhs.',
    'Passport copy, TOEFL/IELTS/GRE score cards, foreign university admission letter, Caste/Income certificates.',
    'Submit online application with foreign university admit letter. Selection committee reviews.',
    'Completely Free Scheme',
    '30 working days',
    'https://socialwelfare.apcfss.in',
    'Social Welfare Commission AP',
    TRUE,
    '2026-02-28'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-SCW-020'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'st_welfare'),
    'AP-STW-021',
    'Forest Rights Act (FRA) Land Pattas',
    'గిరిజన సాగు హక్కుల పట్టాల పంపిణీ (FRA)',
    'Allotment of official cultivable land rights (Pattas) to forest-dwelling Scheduled Tribes under FRA.',
    'అడవులలో సాగు చేసుకుంటున్న గిరిజనులకు ఫారెస్ట్ రైట్స్ యాక్ట్ (FRA) కింద అధికారిక సాగు హక్కు పట్టాల మంజూరు సేవ.',
    'Forest Dwelling Scheduled Tribes and Traditional Forest Dwellers residing inside reserve forests.',
    'Aadhaar Card, tribal certificate, proof of self-cultivation since generations, sketch of forest land.',
    'Initiated via local Forest Rights Committee (Grama Sabha) and approved by District Level Committee.',
    'Free',
    '60 working days',
    'https://apobmms.apcfss.in',
    'Tribal Welfare Department AP',
    TRUE,
    '2026-01-15'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-STW-021'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'minority_welfare'),
    'AP-MW-022',
    'Chandranna Pelli Kanuka (Minority Marriage Aid)',
    'చంద్రన్న పెళ్లి కానుక (మైనారిటీ వివాహ సహాయం)',
    'Welfare scheme providing marriage assistance of ₹1 Lakh to young girls belonging to minority communities.',
    'రాష్ట్రంలోని మైనారిటీ వర్గాల ఆడపిల్లల వివాహ వేడుకల నిమిత్తం ₹1 లక్ష వరకు ఆర్థిక ప్రోత్సాహకం అందించే పథకం.',
    'Permanent resident minority families of AP with family annual income below ₹2.5 Lakhs.',
    'Bride & Groom Aadhaar, Nikah Nama/Marriage Certificate, Income/Minority certificate, photo.',
    'Apply online via GSWS NBM portal within 60 days of wedding. Welfare Assistant verifies.',
    'Completely Free',
    '30 working days',
    'https://gsws-nbm.ap.gov.in',
    'Minority Welfare Commission AP',
    TRUE,
    '2026-03-30'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-MW-022'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'housing'),
    'AP-HSG-023',
    'PMAY - NTR Housing Scheme',
    'పీఎంఏవై - ఎన్టీఆర్ గృహనిర్మాణ పథకం',
    'Allotment of free house sites (pattas) and financial aid for constructing eco-friendly houses to BPL families.',
    'రాష్ట్రంలోని నిరుపేద కుటుంబాలకు ఉచితంగా ఇళ్ల పట్టాలు మంజూరు చేసి, ఇళ్ల నిర్మాణానికి సబ్సిడీ మరియు మెటీరియల్స్ అందించే సేవా గైడ్.',
    'Homeless BPL families registered under housing surveys.',
    'Aadhaar Card, Rice Card, Income certificate, Self-declaration of not owning any brick house.',
    'Submit registration form to Ward Housing Assistant. Land patta is allocated after physical survey.',
    'Registration fee is ₹1. Construction fund is subsidized.',
    '90 working days',
    'https://housing.ap.gov.in/',
    'AP Housing Corporation',
    TRUE,
    '2026-02-15'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-HSG-023'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'energy'),
    'AP-ENG-024',
    'Free Electricity Scheme for Agricultural Pumpsets',
    'వ్యవసాయ బోర్ బావులకు ఉచిత నాణ్యమైన విద్యుత్ సరఫరా',
    'Provision of free, reliable 9-hour daytime three-phase electricity to agricultural pumpsets.',
    'రైతులకు సాగు నీటి కొరకు వ్యవసాయ బోర్ బావులకు రోజుకు 9 గంటల పాటు ఉచిత మరియు నాణ్యమైన త్రీ-ఫేస్ విద్యుత్ సరఫరా సేవ.',
    'All small and marginal farmers with functional borewells.',
    'Pattadar Passbook, Aadhaar Card, agricultural land survey number, pumpset rating details.',
    'Submit application at DISCOM office or RBK counter. Field engineer will verify installation.',
    'Absolutely Free. 100% subsidy on agricultural power consumption.',
    '30 working days for energization',
    'https://www.apspdcl.in',
    'AP Energy DISCOMs',
    TRUE,
    '2026-03-10'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-ENG-024'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'water_resources'),
    'AP-WTR-025',
    'Neeru-Chettu Desiltation & Canal Repair',
    'నీరు-చెట్టు సామాజిక చెరువుల పూడికతీత మరియు కాలువల మరమ్మతులు',
    'Registration of community desiltation, field channel repairs and community-based irrigation works.',
    'గ్రామాల్లోని సాగునీటి చెరువులు, కాలువల పూడికతీత పనుల నమోదు మరియు రైతుల సహకార సంఘాల అనుమతుల సేవ.',
    'Recognized farmer water-user associations (WUAs) in villages.',
    'Farmer Association resolution copy, Gram Panchayat recommendation, land survey bounds.',
    'Submit community resolution sheet to Assistant Executive Engineer of Water Resources department.',
    'Free of cost (Community funded/Govt project)',
    '30 working days',
    'https://waterresources.ap.gov.in/',
    'Water Resources Dept AP',
    TRUE,
    '2026-03-15'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-WTR-025'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'forest'),
    'AP-FOR-026',
    'Timber and Forest Produce Transit Permit',
    'సాంప్రదాయ కలప మరియు అటవీ ఉత్పత్తుల రవాణా అనుమతి పత్రం (Transit Permit)',
    'Legal transit permit required to cut and transport timber or forest produce outside local limits.',
    'సొంత భూములలో పెంచిన కలప లేదా అడవుల నుండి సేకరించిన సాంప్రదాయ ఉత్పత్తుల రవాణా కొరకు అధికారిక లైసెన్స్/పర్మిట్ సేవ.',
    'Farming communities growing commercial wood or authorized forest dwellers.',
    'Land ownership proof, Forest Officer field survey report, timber quantity detail, vehicle registration.',
    'Submit application online on forest portal. Forest Range Officer will inspect and issue TP.',
    'Permit fees of ₹100 to ₹500 per tonne depending on wood class',
    '15 working days',
    'https://forests.ap.gov.in',
    'Forest Department AP',
    TRUE,
    '2026-04-12'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-FOR-026'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'tourism'),
    'AP-TUR-027',
    'APTDC Official Hotel & Package Tour Booking',
    'ఏపీ టూరిజం APTDC హోటల్ మరియు ప్యాకేజీ టూర్ బుకింగ్స్',
    'Direct online booking interface for State Haritha Hotels, Resorts, Temple tours and APTDC packages.',
    'ఆంధ్రప్రదేశ్‌లోని హరిత హోటళ్లు, పర్యాటక ప్రదేశాల ప్రవేశ టిక్కెట్లు మరియు ప్యాకేజీ టూర్‌లను సులభంగా బుక్ చేసుకొనే గైడ్ సేవ.',
    'Any tourist visiting Andhra Pradesh.',
    'Aadhaar Card or valid Government Photo ID of the tourist.',
    'Select destination, dates and room type on APTDC portal and pay online to secure booking.',
    'Varies based on rooms/packages chosen',
    'Instant booking confirmation',
    'https://tourism.ap.gov.in',
    'APTDC Tourism Portal',
    TRUE,
    '2026-03-01'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-TUR-027'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'disaster_management'),
    'AP-DIS-028',
    'Disaster Relief Crop & Property Loss Input Subsidy',
    'తుఫాను/వరద పంట మరియు ఆస్తి నష్టపరిహార సహాయం (Input Subsidy)',
    'Financial compensation and input subsidy for crops/houses damaged by natural calamities.',
    'ప్రకృతి వైపరీత్యాల వలన (తుఫానులు, కరువు, వరదలు) సంభవించిన పంట నష్టానికి లేదా గృహ నష్టానికి ప్రభుత్వ నష్టపరిహారం (ఇన్‌పుట్ సబ్సిడీ) పొందే సేవ.',
    'Impacted farmers or households in declared disaster-affected mandals.',
    'e-Crop registration copy, VRO damage evaluation report, bank account details, Aadhaar.',
    'Disaster enumeration team visits fields. Compensation is credited directly based on survey logs.',
    'Completely Free',
    'Direct transfer within 30 days of fund release',
    'https://apsdma.ap.gov.in/',
    'AP State Disaster Management Authority',
    TRUE,
    '2026-05-10'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-DIS-028'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'employment_skill'),
    'AP-EMP-029',
    'APSSDC Free Skill Training & Job Registrations',
    'ఏపీ నైపుణ్యాభివృద్ధి సంస్థ (APSSDC) ఉచిత శిక్షణ మరియు ఉపాధి',
    'Register for free skill training courses, job mela schedules, and employment exchange listings in AP.',
    'రాష్ట్రంలోని నిరుద్యోగ యువతకు సాంకేతిక నైపుణ్యాలలో ఉచిత శిక్షణ ఇచ్చి, ప్రైవేట్ రంగంలో ఉద్యోగాలు కల్పించే ఉపాధి రిజిస్ట్రేషన్.',
    'Unemployed youth of AP aged between 18 and 35 years.',
    'Educational qualification certificates (Mark sheets), Aadhaar Card, Resume, and Photo.',
    'Create profile on APSSDC portal, apply for verified training programs or upcoming job melas.',
    'Completely Free training and placement',
    'Instant registration. 15 days for training batch allotment',
    'https://naipunyam.ap.gov.in',
    'AP State Skill Development Corporation',
    TRUE,
    '2026-04-10'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-EMP-029'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'industries'),
    'AP-IND-030',
    'AP Single Desk Portal for New Industries',
    'నూతన పరిశ్రమల అనుమతుల సింగిల్ డెస్క్ సిస్టమ్ (AP Single Desk)',
    'Single window clearance system for industrial licenses, pollution board consents, water allocation and fire NOCs.',
    'నూతన పరిశ్రమలు లేదా ఎంఎస్ఎమ్ఈ స్థాపనకు కావలసిన అన్ని రకాల లైసెన్సులు, కరెక్షన్లు మరియు పర్యావరణ అనుమతులను ఒకే చోట పొందే విధానం.',
    'Entrepreneurs launching MSMEs or large-scale industries in AP.',
    'Detailed Project Report (DPR), Identity of promoters, land registration/lease deeds, layout designs.',
    'Fill Common Application Form (CAF) online. Approvals are pushed through within 21 days.',
    'Statutory fees based on industry type, size and investment category',
    '21 working days (Guaranteed Deemed Approval)',
    'https://www.apindustries.gov.in/APIndus/Default.aspx',
    'Industries Department AP',
    TRUE,
    '2026-03-20'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-IND-030'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'public_grievances'),
    'AP-GRI-031',
    'Spandana Grievance Registration & Tracking',
    'స్పందన (Spandana) ప్రజా సమస్యల పరిష్కార వేదిక',
    'Official platform to register complaints against non-responsive public services or officials.',
    'ఏ ప్రభుత్వ సేవ అందకపోయినా, సమస్యలున్నా నేరుగా జిల్లా కలెక్టర్ లేదా సీఎం కార్యాలయానికి ఫిర్యాదు సమర్పించి పరిష్కారం పొందే అధికారిక వేదిక.',
    'Any resident citizen of Andhra Pradesh.',
    'Aadhaar Card, written grievance application, supporting proof (images/documents).',
    'Submit grievance online or visit Collectorate on Mondays. Grievance receives a trackable ID.',
    'Completely Free',
    '15 working days resolution SLA',
    'https://pgrs.ap.gov.in',
    'Chief Minister Office AP',
    TRUE,
    '2026-05-15'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-GRI-031'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'certificates'),
    'AP-REV-032',
    'Integrated Caste, Nativity & Date of Birth Certificate',
    'సమన్వయ కుల మరియు నివాస ధృవీకరణ పత్రం (Integrated Certificate)',
    'Combined certificate issued by Tahsildar verifying caste classification, nativity, and official date of birth.',
    'విద్యార్థుల అడ్మిషన్ల కొరకు, ఉద్యోగ నియామకాల కొరకు కులం మరియు నివాస వివరాలను ధృవీకరించే సమగ్ర పత్రం.',
    'All permanent residents belonging to communities recognized in AP.',
    'Aadhaar Card, school leaving certificate/study details, family caste proof, and community details.',
    'Submit application online or at MeeSeva. Tahsildar approves after VRO/RI report.',
    '₹45 Service Charge',
    '15 working days',
    'https://ap.meeseva.gov.in/IMeeSeva2/IMeesevaHome.aspx',
    'AP Revenue Administration',
    TRUE,
    '2026-02-10'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-REV-032'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'utility_payments'),
    'AP-UTL-033',
    'AP Electricity and Utility Bills Instant Payment',
    'ఏపీ విద్యుత్ మరియు మున్సిపల్ బిల్లుల ఆన్‌లైన్ సులువైన చెల్లింపు',
    'Instant online payment of home electricity bills, municipal water bills, and land line utilities across AP.',
    'గృహ విద్యుత్ బిల్లులు (APCPDCL/APEPDCL) మరియు మున్సిపల్ బిల్లులను తక్షణమే ఆన్‌లైన్ ద్వారా ఎక్కడి నుండైనా సురక్షితంగా చెల్లించే సేవ.',
    'Any electricity or water consumer in Andhra Pradesh.',
    'Service Connection Number (Unique consumer ID), linked mobile number.',
    'Submit consumer number on APMeeSeva or local DISCOM, view bill, and clear outstanding balance.',
    'Variable bill amount. Payment gateway charges may apply',
    'Instant online confirmation & receipt',
    'https://ap.meeseva.gov.in/IMeeSeva2/IMeesevaHome.aspx',
    'AP MeeSeva DISCOMs',
    TRUE,
    '2026-04-01'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-UTL-033'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'pensions'),
    'AP-SCH-2026-NTRB',
    'NTR Bharosa Pension Scheme',
    'ఎన్టీఆర్ భరోసా పింఛను పథకం',
    'The NTR Bharosa Pension Scheme is designed to provide financial security to the vulnerable sections of society, including senior citizens, widows, disabled persons, and other marginalized groups. The scheme provides a monthly pension of Rs. 4,000 for old age/widows and up to Rs. 6,000 for disabled individuals.',
    'సమాజంలోని బలహీన వర్గాలైన వృద్ధులు, వితంతువులు, వికలాంగులు మరియు ఇతర లబ్ధిదారులకు ఆర్థిక భరోసా కల్పించడం కోసం ఏపీ ప్రభుత్వం ఈ పథకాన్ని ప్రవేశపెట్టింది. వృద్ధులు మరియు వితంతువులకు నెలకు రూ. 4,000, వికలాంగులకు రూ. 6,000 వరకు పెన్షన్ అందజేయబడుతుంది.',
    '1. Applicant must be a permanent resident of Andhra Pradesh.
2. For Old Age Pension, the minimum age is 60 years.
3. For Disability Pension, the applicant must have a minimum of 40% permanent disability certificate.
4. Household income must fall within the prescribed BPL limits.',
    '1. Aadhaar Card
2. Age Proof document
3. SADAREM Disability Certificate (for Disabled category)
4. Death Certificate of spouse (for Widow pension category)
5. Ration Card and Bank Account details',
    'Applicants can apply at their local Grama/Ward Sachivalayam. The Welfare and Education Assistant conducts field verification, and once approved, the monthly pension is delivered directly to the beneficiary''s doorstep on the 1st of every month.',
    'Free (At Sachivalayams)',
    '15 to 30 Days',
    'https://sspensions.ap.gov.in/SSP',
    'Society for Elimination of Rural Poverty (SERP), Andhra Pradesh',
    TRUE,
    '2026-07-05'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-SCH-2026-NTRB'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'welfare'),
    'AP-SCH-2026-DP',
    'Deepam 2.0 Scheme (Free Gas Cylinders)',
    'దీపం 2.0 పథకం (ఉచిత గ్యాస్ సిలిండర్ల పథకం)',
    'Deepam 2.0 is a welfare initiative by the Government of Andhra Pradesh aimed at supporting household women. Under this scheme, the government provides 3 LPG domestic cooking gas cylinders absolutely free of cost per year to eligible families.',
    'మహిళల సంక్షేమం మరియు వారి ఆరోగ్యాన్ని రక్షించే లక్ష్యంతో ఆంధ్రప్రదేశ్ ప్రభుత్వం ప్రవేశపెట్టిన పథకమే ''దీపం 2.0''. ఈ పథకం కింద అర్హత కలిగిన ప్రతి లబ్ధిదారు కుటుంబానికి సంవత్సరానికి 3 ఎల్పీజీ (LPG) వంట గ్యాస్ సిలిండర్లను ఉచితంగా అందజేస్తారు.',
    '1. The applicant must be a resident woman of Andhra Pradesh.
2. The family must have an active domestic LPG connection (with HP, Indane, or Bharat Gas).
3. The family must possess a valid BPL White Ration Card (Rice Card).
4. The LPG connection must be linked with the beneficiary''s Aadhaar.',
    '1. Aadhaar Card of the female head of the family
2. White Ration Card (Rice Card)
3. LPG Gas Connection Passbook with consumer ID
4. Registered Mobile Number linked to gas connection
5. Bank account passbook linked to Aadhaar',
    'Beneficiaries book the gas cylinder through their respective gas agency. Upon paying the standard amount during delivery, the cost of the cylinder is credited back directly to their Aadhaar-seeded bank account under Direct Benefit Transfer (DBT).',
    'Free',
    '7 to 10 Days (For Registration)',
    'https://civilsupplies.ap.gov.in/',
    'Civil Supplies Department, Andhra Pradesh',
    TRUE,
    '2026-07-05'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-SCH-2026-DP'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'welfare'),
    'AP-SCH-2026-AC',
    'Anna Canteen Scheme',
    'అన్న క్యాంటీన్ పథకం',
    'The Anna Canteen Scheme is a public welfare initiative providing highly subsidized, clean, and nutritious meals (Breakfast, Lunch, and Dinner) at just Rs. 5 per meal. It is designed to aid daily-wage laborers, poor students, beggars, and migrants in municipal areas.',
    'పేద ప్రజలు, కూలీలు, యాచకులు మరియు వలస కార్మికులకు కేవలం రూ. 5 లకే నాణ్యమైన, రుచికరమైన మరియు పరిశుభ్రమైన ఆహారాన్ని (ఉదయం టిఫిన్, మధ్యాహ్నం మరియు రాత్రి భోజనం) అందించేందుకు ప్రవేశపెట్టిన పథకమే ''అన్న క్యాంటీన్''. పట్టణ మరియు నగర ప్రాంతాల్లో ఆకలి రహిత సమాజం దిశగా ఈ క్యాంటీన్లు పనిచేస్తాయి.',
    'This is a universal scheme open to all citizens. No specific cards, documentation, or income proof are required. Anyone can walk in and purchase a meal.',
    'No documents are mandatory. (Optional Aadhaar card verification can be done for streamlined token issuance at some high-volume locations).',
    'Beneficiaries can directly visit the nearest Anna Canteen outlet during service hours, pay Rs. 5 at the counter to get a token, and redeem it for breakfast or a meal.',
    'Rs. 5 per meal / breakfast',
    'Instantaneous (Queue wait time only)',
    'https://annacanteenstrust.ap.gov.in/#/home',
    'Municipal Administration Department, Andhra Pradesh',
    TRUE,
    '2026-07-05'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-SCH-2026-AC'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'welfare'),
    'AP-SCH-2026-FBT',
    'Free Bus Travel Scheme for Women',
    'మహిళలకు ఉచిత బస్సు ప్రయాణ పథకం',
    'The Free Bus Travel Scheme allows all women residing in Andhra Pradesh to travel free of charge in APSRTC Palle Velugu and Express stage carriages within the state. The initiative aims to support women''s mobility, economic independence, and safety.',
    'ఆంధ్రప్రదేశ్ రాష్ట్రవ్యాప్తంగా మహిళలందరికీ ఏపీఎస్‌ఆర్‌టీసీ (APSRTC) పల్లె వెలుగు మరియు ఎక్స్‌ప్రెస్ బస్సులలో ఉచిత ప్రయాణ సౌకర్యాన్ని కల్పించే పథకం ఇది. మహిళల ఆర్థిక స్వావలంబన, ఉపాధి మరియు సురక్షిత ప్రయాణాన్ని ప్రోత్సహించడమే దీని ప్రధాన లక్ష్యం.',
    '1. The commuter must be a female or transgender person.
2. Must be a resident of Andhra Pradesh.
3. The benefit is applicable only in APSRTC Palle Velugu and Express buses.',
    'Any valid government-issued original ID proof containing the resident address must be shown during travel:
1. Aadhaar Card
2. Voter ID Card
3. Driving License
4. Resident Proof Card',
    'Women passengers must board the designated bus and show their original Aadhaar Card or any authorized government ID to the conductor. The conductor will verify the residency and issue a ''Zero Fare'' physical ticket.',
    'Free',
    'Instantaneous (On Boarding)',
    'https://apsrtc.ap.gov.in/',
    'Andhra Pradesh State Road Transport Corporation (APSRTC)',
    TRUE,
    '2026-07-05'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-SCH-2026-FBT'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'welfare'),
    'AP-SCH-2026-YG',
    'Yuva Galam Unemployment Allowance Scheme',
    'యువగళం నిరుద్యోగ భృతి పథకం',
    'The Yuva Galam Unemployment Allowance Scheme is designed to support the educated unemployed youth of Andhra Pradesh. The scheme provides a monthly financial allowance of Rs. 3,000, along with access to free skill development training and placement assistance.',
    'రాష్ట్రంలోని చదువుకున్న నిరుద్యోగ యువతకు ఆర్థిక తోడ్పాటు అందించడానికి మరియు వారి నైపుణ్యాలను పెంపొందించడానికి ఏపీ ప్రభుత్వం ఈ పథకాన్ని ప్రారంభించింది. దీని కింద అర్హులైన ప్రతి నిరుద్యోగికి నెలకు రూ. 3,000 నిరుద్యోగ భృతి అందించడమే కాకుండా ఉచిత నైపుణ్య శిక్షణ మరియు ప్లేస్‌మెంట్ అవకాశాలను కల్పిస్తారు.',
    '1. The applicant must be a resident of Andhra Pradesh.
2. The minimum educational qualification is a Diploma or a Graduate Degree.
3. The applicant''s age must be between 21 and 35 years.
4. The applicant must not be currently employed in public or private sectors.',
    '1. Aadhaar Card and Residence proof
2. Educational certificates (Degree/Diploma marksheets)
3. Employment exchange registration card (if any)
4. BPL Ration Card and Aadhaar-seeded Bank Account details
5. Self-declaration affidavit of unemployment',
    'Candidates must register online on the official Yuva Galam portal. Following authentication and background checks of academic/employment databases, selected candidates will receive the allowance in their bank accounts every month.',
    'Free',
    '30 Days',
    'https://ap.gov.in/',
    'Skill Development and Training Department, Andhra Pradesh',
    TRUE,
    '2026-07-05'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-SCH-2026-YG'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'agriculture'),
    'AP-SCH-2026-AS',
    'Annadata Sukhibhava Scheme',
    'అన్నదాత సుఖీభవ పథకం',
    'Annadata Sukhibhava is an investment support scheme introduced to assist farmers in meeting crop-cultivation expenses. Under this scheme, eligible farmer households receive annual financial assistance of Rs. 20,000, disbursed in seasonal installments directly to their bank accounts.',
    'రైతులకు సాగు ఖర్చుల కోసం పెట్టుబడి సహాయాన్ని అందించి, వ్యవసాయాన్ని లాభసాటిగా మార్చడానికి ఉద్దేశించిన పథకమే ''అన్నదాత సుఖీభవ''. దీని కింద అర్హులైన ప్రతి రైతు కుటుంబానికి సంవత్సరానికి రూ. 20,000 ఆర్థిక సాయాన్ని విడతల వారీగా నేరుగా ల్యాండ్ హోల్డర్స్ ఖాతాల్లోకి జమ చేస్తారు.',
    '1. The applicant must be a resident of Andhra Pradesh and own cultivable land.
2. Must possess a valid Pattadar Passbook.
3. In the case of tenant farmers, a valid CCRC (Crop Cultivator Rights Card) is mandatory.
4. The farmer must have completed the e-KYC validation process.',
    '1. Aadhaar Card
2. Pattadar Passbook or Webland land revenue records
3. Aadhaar-seeded active Bank Account details
4. Crop Cultivator Rights Card (CCRC) for tenant farmers
5. e-Panta (crop booking) registration copy',
    'The Agriculture Department gathers farmer databases via Rythu Bharosa Kendras (RBKs). Based on Webland revenue data and e-Panta records, eligible beneficiaries are selected, and funds are credited in installments.',
    'Free',
    '15 to 25 Days',
    'https://annadathasukhibhava.ap.gov.in/',
    'Department of Agriculture, Government of Andhra Pradesh',
    TRUE,
    '2026-07-05'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-SCH-2026-AS'
);

INSERT INTO services (
    category_id,
    service_code,
    name,
    name_te,
    description,
    description_te,
    eligibility,
    documents,
    process,
    fees,
    timeline,
    official_url,
    source,
    verified,
    last_verified_at
)
SELECT
    (SELECT id FROM service_categories WHERE name = 'health'),
    'AP-SCH-2026-ASRI',
    'Dr. NTR Aarogyasri Health Scheme',
    'డాక్టర్ ఎన్టీఆర్ ఆరోగ్యశ్రీ హెల్త్ స్కీమ్',
    'Dr. NTR Aarogyasri is a pioneering health insurance scheme providing cash-free high-end tertiary medical care to low and middle-income families in Andhra Pradesh. Beneficiaries can avail of free medical and surgical treatments up to Rs. 25 Lakhs per family per annum at listed network hospitals.',
    'పేద, మధ్యతరగతి కుటుంబాలకు అధునాతన కార్పొరేట్ వైద్య సేవలను ఉచితంగా అందించే పథకం ఇది. ఈ పథకం ద్వారా లబ్ధిదారులకు గరిష్టంగా ఏడాదికి రూ. 25 లక్షల వరకు ఉచిత క్యాష్‌లెస్ వైద్య చికిత్సలు మరియు శస్త్రచికిత్సలు అందజేయబడతాయి. ఆంధ్రప్రదేశ్‌లోని నెట్‌వర్క్ ఆసుపత్రులన్నింటిలో ఈ చికిత్స అందుబాటులో ఉంటుంది.',
    '1. The family must reside in Andhra Pradesh.
2. Must hold an active Aarogyasri Card or a valid White Ration Card.
3. Annual family income must be below Rs. 5 Lakhs.
4. Land holding must be less than 12 acres of wet or 35 acres of dry land.',
    '1. Aarogyasri Health Card or Rice Card
2. Aadhaar Cards of all family members
3. Resident Proof Certificate
4. Income Certificate',
    'Patients can approach the ''Aarogyamithra'' desk at any network hospital with their card. The hospital staff registers the patient, raises a pre-authorization request, and provides cashless treatment after approval.',
    'Free',
    '7 to 15 Days (For Card Generation)',
    'https://drntrvaidyaseva.ap.gov.in/',
    'Dr. NTR Aarogyasri Health Care Trust, Andhra Pradesh',
    TRUE,
    '2026-07-05'
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE service_code = 'AP-SCH-2026-ASRI'
);
