import React from "react";
import { SERVICE_CATEGORIES } from "../data/categories";
import { useApp } from "../context/AppContext";
import {
  LayoutGrid,
  Landmark,
  FileCheck,
  Home,
  ShoppingBag,
  HeartHandshake,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Wheat,
  Building2,
  Zap,
  Car,
} from "lucide-react";

interface CategoryChipsProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutGrid,
  Landmark,
  FileCheck,
  Home,
  ShoppingBag,
  HeartHandshake,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Wheat,
  Building2,
  Zap,
  Car,
};

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { isTe } = useApp();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900">
          {isTe ? "శాఖల వారీగా సేవలు (Filter by Category)" : "Service Departments"}
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          {SERVICE_CATEGORIES.length - 1} {isTe ? "ప్రధాన విభాగాలు" : "Departments"}
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SERVICE_CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || LayoutGrid;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              id={`cat-chip-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                isSelected
                  ? "bg-[#0B2545] text-white border-amber-400 shadow-md ring-2 ring-blue-700/20"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-blue-50/60 hover:border-blue-300 hover:text-blue-900"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isSelected ? "text-amber-300" : "text-blue-700"
                }`}
              />
              <span>{isTe ? cat.nameTe : cat.nameEn}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
