-- Add categories required by government_services.json.
-- Existing categories are preserved.

INSERT INTO service_categories (name, name_te, description)
SELECT 'higher_education', 'ఉన్నత విద్య', 'ఉన్నత విద్యకు సంబంధించిన ప్రభుత్వ సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'higher_education'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'municipal_admin', 'పురపాలక పరిపాలన', 'పురపాలక ఆస్తి పన్ను మరియు ఇతర సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'municipal_admin'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'horticulture', 'ఉద్యానవనం', 'ఉద్యాన పంటలు మరియు సంబంధిత సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'horticulture'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'animal_husbandry', 'పశుసంవర్ధక శాఖ', 'పశువైద్యం, పశుసంవర్ధక మరియు పశు సంక్షేమ సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'animal_husbandry'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'fisheries', 'మత్స్య శాఖ', 'మత్స్యకారులు మరియు మత్స్య వనరులకు సంబంధించిన సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'fisheries'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'commercial_taxes', 'వాణిజ్య పన్నులు', 'GST మరియు ఇతర వాణిజ్య పన్నుల సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'commercial_taxes'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'labour', 'కార్మిక శాఖ', 'కార్మికులు మరియు కార్మిక సంక్షేమ సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'labour'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'women_child_welfare', 'మహిళా మరియు శిశు సంక్షేమం', 'మహిళలు మరియు పిల్లలకు సంబంధించిన సంక్షేమ సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'women_child_welfare'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'bc_welfare', 'బీసీ సంక్షేమం', 'బీసీ సంక్షేమానికి సంబంధించిన సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'bc_welfare'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'sc_welfare', 'ఎస్సీ సంక్షేమం', 'ఎస్సీ సంక్షేమానికి సంబంధించిన సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'sc_welfare'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'st_welfare', 'ఎస్టీ సంక్షేమం', 'ఎస్టీ సంక్షేమానికి సంబంధించిన సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'st_welfare'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'minority_welfare', 'మైనారిటీ సంక్షేమం', 'మైనారిటీ సంక్షేమానికి సంబంధించిన సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'minority_welfare'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'housing', 'గృహ నిర్మాణం', 'ప్రభుత్వ గృహ నిర్మాణ మరియు గృహ సంక్షేమ సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'housing'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'water_resources', 'జల వనరులు', 'కాలువలు, నీటి వనరులు మరియు నీటి నిర్వహణ సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'water_resources'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'forest', 'అటవీ శాఖ', 'అటవీ వనరులు మరియు అటవీ సంబంధిత సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'forest'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'tourism', 'పర్యాటకం', 'పర్యాటక శాఖకు సంబంధించిన సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'tourism'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'disaster_management', 'విపత్తుల నిర్వహణ', 'విపత్తు సహాయం మరియు నష్టపరిహార సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'disaster_management'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'employment_skill', 'ఉపాధి మరియు నైపుణ్య అభివృద్ధి', 'ఉపాధి, శిక్షణ మరియు నైపుణ్య అభివృద్ధి సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'employment_skill'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'industries', 'పరిశ్రమలు', 'పరిశ్రమలు మరియు పారిశ్రామిక అనుమతులకు సంబంధించిన సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'industries'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'public_grievances', 'ప్రజా ఫిర్యాదులు', 'ప్రజా ఫిర్యాదుల నమోదు మరియు పరిష్కార సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'public_grievances'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'certificates', 'ధృవీకరణ పత్రాలు', 'వివిధ ప్రభుత్వ ధృవీకరణ పత్రాల సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'certificates'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'utility_payments', 'యుటిలిటీ చెల్లింపులు', 'విద్యుత్ మరియు ఇతర యుటిలిటీ బిల్లుల చెల్లింపు సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'utility_payments'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'pensions', 'పింఛన్లు', 'ప్రభుత్వ పింఛను మరియు సామాజిక భద్రతా సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'pensions'
);

INSERT INTO service_categories (name, name_te, description)
SELECT 'welfare', 'సంక్షేమం', 'ప్రభుత్వ సంక్షేమ పథకాలకు సంబంధించిన సేవలు'
WHERE NOT EXISTS (
    SELECT 1 FROM service_categories WHERE name = 'welfare'
);
