export interface LandUnitDefinition {
  id: string;
  nameTe: string;
  nameEn: string;
  symbol: string;
  sqFeetPerUnit: number; // base conversion unit in Sq Feet
  descriptionTe: string;
  descriptionEn: string;
  region?: string;
}

export const LAND_UNITS: LandUnitDefinition[] = [
  {
    id: "acres",
    nameTe: "ఎకరాలు (Acres)",
    nameEn: "Acres",
    symbol: "Ac",
    sqFeetPerUnit: 43560,
    descriptionTe: "1 ఎకరం = 100 సెంట్లు = 40 గుంటలు = 4,840 గజాలు",
    descriptionEn: "1 Acre = 100 Cents = 40 Gunthas = 4,840 Sq Yards"
  },
  {
    id: "cents",
    nameTe: "సెంట్లు (Cents)",
    nameEn: "Cents",
    symbol: "Ct",
    sqFeetPerUnit: 435.6,
    descriptionTe: "1 సెంటు = 48.4 చదరపు గజాలు = 435.6 చదరపు అడుగులు",
    descriptionEn: "1 Cent = 48.4 Sq Yards = 435.6 Sq Feet (1/100 Acre)"
  },
  {
    id: "guntas",
    nameTe: "గుంటలు (Gunthas / Guntas)",
    nameEn: "Gunthas / Guntas",
    symbol: "Gnt",
    sqFeetPerUnit: 1089,
    descriptionTe: "1 గుంట = 121 చదరపు గజాలు = 2.5 సెంట్లు (1/40 ఎకరం)",
    descriptionEn: "1 Guntha = 121 Sq Yards = 2.5 Cents = 1,089 Sq Feet"
  },
  {
    id: "sq_yards",
    nameTe: "గజాలు / చదరపు గజాలు (Sq. Yards / Gajalu)",
    nameEn: "Square Yards / Gajalu",
    symbol: "Sq.Yd",
    sqFeetPerUnit: 9,
    descriptionTe: "1 గజం (చదరపు గజం) = 9 చదరపు అడుగులు (ఇళ్ల స్థలాల కొలత)",
    descriptionEn: "1 Square Yard (Gajam) = 9 Square Feet (Standard Plot Unit)"
  },
  {
    id: "ankanams",
    nameTe: "అంకణాలు (Ankanams - నెల్లూరు / రాయలసీమ)",
    nameEn: "Ankanams (Nellore & Rayalaseema)",
    symbol: "Ank",
    sqFeetPerUnit: 72,
    descriptionTe: "1 అంకణం = 8 చదరపు గజాలు = 72 చదరపు అడుగులు",
    descriptionEn: "1 Ankanam = 8 Sq Yards = 72 Sq Feet (Traditional AP measure)"
  },
  {
    id: "sq_feet",
    nameTe: "చదరపు అడుగులు (Square Feet)",
    nameEn: "Square Feet",
    symbol: "Sq.Ft",
    sqFeetPerUnit: 1,
    descriptionTe: "భవన నిర్మాణం, ఫ్లాట్ విస్తీర్ణం మరియు ప్లాట్ల కొలత",
    descriptionEn: "Standard international unit for constructed plinth & area"
  },
  {
    id: "sq_meters",
    nameTe: "చదరపు మీటర్లు (Square Meters)",
    nameEn: "Square Meters",
    symbol: "Sq.M",
    sqFeetPerUnit: 10.7639,
    descriptionTe: "1 చదరపు మీటరు = 1.196 చదరపు గజాలు = 10.764 చదరపు అడుగులు",
    descriptionEn: "1 Square Meter = 1.196 Sq Yards = 10.764 Sq Feet"
  },
  {
    id: "hectares",
    nameTe: "హెక్టార్లు (Hectares)",
    nameEn: "Hectares",
    symbol: "Ha",
    sqFeetPerUnit: 107639.104,
    descriptionTe: "1 హెక్టార్ = 2.471 ఎకరాలు = 10,000 చదరపు మీటర్లు",
    descriptionEn: "1 Hectare = 2.47105 Acres = 10,000 Square Meters"
  },
  {
    id: "bigha",
    nameTe: "బిఘా (Bigha)",
    nameEn: "Bigha",
    symbol: "Bgh",
    sqFeetPerUnit: 27225,
    descriptionTe: "1 బిఘా = 0.625 ఎకరం = 62.5 సెంట్లు",
    descriptionEn: "1 Standard Bigha = 0.625 Acre = 62.5 Cents"
  }
];

export function convertLandArea(value: number, fromUnitId: string, toUnitId: string): number {
  if (isNaN(value) || value < 0) return 0;
  const fromUnit = LAND_UNITS.find((u) => u.id === fromUnitId);
  const toUnit = LAND_UNITS.find((u) => u.id === toUnitId);
  if (!fromUnit || !toUnit) return value;

  const inSqFeet = value * fromUnit.sqFeetPerUnit;
  const converted = inSqFeet / toUnit.sqFeetPerUnit;
  return Number(converted.toFixed(4));
}

export function getAllLandConversions(value: number, fromUnitId: string): Record<string, number> {
  const results: Record<string, number> = {};
  if (isNaN(value) || value < 0) return results;
  const fromUnit = LAND_UNITS.find((u) => u.id === fromUnitId);
  if (!fromUnit) return results;

  const inSqFeet = value * fromUnit.sqFeetPerUnit;
  LAND_UNITS.forEach((unit) => {
    results[unit.id] = Number((inSqFeet / unit.sqFeetPerUnit).toFixed(4));
  });
  return results;
}
