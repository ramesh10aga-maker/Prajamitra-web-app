export interface GovernmentService {
  id: number;
  serviceRef: string;
  nameTe: string;
  nameEn: string;
  departmentNameTe: string;
  departmentNameEn: string;
  departmentCategory?: string;
  categoryId: string;
  overviewTe: string;
  overviewEn: string;
  eligibilityTe: string;
  eligibilityEn: string;
  documentsTe: string;
  documentsEn: string;
  processTe?: string;
  processEn?: string;
  onlineMethodTe?: string;
  onlineMethodEn?: string;
  offlineMethodTe?: string;
  offlineMethodEn?: string;
  meesevaMethodTe?: string;
  meesevaMethodEn?: string;
  feesTe: string;
  feesEn: string;
  deliveryTimeTe: string;
  deliveryTimeEn: string;
  officialWebsite: string;
  officialSource?: string;
  relatedGosTe?: string;
  faqsTe?: string;
  isPopular?: boolean;
  aliases?: string;
}

export interface ServiceCategory {
  id: string;
  nameTe: string;
  nameEn: string;
  iconName: string;
  color: string;
  descriptionTe?: string;
  descriptionEn?: string;
}

export interface ProblemServiceItem {
  id: string;
  module: string;
  category: string;
  serviceName: string;
  serviceCode: string;
  description: string;
  objective?: string;
  department: string;
  serviceType: string;
  mode: string[];
  eligibility: string[];
  requiredDocuments: string[];
  applicationProcess: string[];
  processingTime: string;
  fees: string;
  benefits?: string[];
  commonProblems: { problem: string; solution: string }[];
  rejectionReasons?: string[];
  citizenTips?: string[];
  faqs?: { question: string; answer: string }[];
  importantNotes?: string[];
  helpline?: { department: string; website: string; phone?: string };
  status?: string;
  version?: string;
  lastUpdated?: string;
}

export type DepartmentType = "revenue" | "registration" | "panchayat_raj";

export interface DepartmentMeta {
  key: DepartmentType;
  titleTe: string;
  titleEn: string;
  subTitleTe: string;
  subTitleEn: string;
  badgeColorHex: string;
  icon: string;
}

export type ApplicationStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED";

export interface ApplicationStatusHistory {
  status: ApplicationStatus;
  timestamp: string;
  officerTitle: string;
  remarks: string;
  location?: string;
}

export interface ApplicationRecord {
  id: string; // e.g. "AP-2026-REV-84910"
  serviceId: number | string;
  serviceNameTe: string;
  serviceNameEn: string;
  serviceRef: string;
  departmentTe: string;
  departmentEn: string;
  applicantName: string;
  aadhaarLastFour: string;
  mobile: string;
  email: string;
  gender: string;
  district: string;
  mandal: string;
  village: string;
  purpose: string;
  khataOrSurveyNo?: string;
  ptinOrDoorNo?: string;
  attachedDocuments: string[];
  status: ApplicationStatus;
  submittedAt: string;
  lastUpdatedAt: string;
  estimatedCompletion: string;
  assignedOfficer: string;
  statusHistory: ApplicationStatusHistory[];
}

export interface SchemeItem {
  id: string;
  nameTe: string;
  nameEn: string;
  taglineTe: string;
  taglineEn: string;
  departmentTe: string;
  departmentEn: string;
  benefitAmountTe: string;
  benefitAmountEn: string;
  eligibilityTe: string[];
  eligibilityEn: string[];
  requiredDocsTe: string[];
  requiredDocsEn: string[];
  officialUrl: string;
  category: "farmers" | "women" | "education" | "pension" | "health";
  badge: string;
}

export interface DistrictInfo {
  code: string;
  nameEn: string;
  nameTe: string;
  headquarters: string;
  mandals: MandalInfo[];
}

export interface MandalInfo {
  nameEn: string;
  nameTe: string;
  villages: VillageInfo[];
}

export interface VillageInfo {
  nameEn: string;
  nameTe: string;
}

export interface BookmarkItem {
  type: "SERVICE" | "PROBLEM" | "GUIDE" | "SCHEME";
  itemId: string | number;
  titleTe: string;
  titleEn: string;
  departmentTe?: string;
  departmentEn?: string;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  district?: string;
  mandal?: string;
  village?: string;
  avatarUrl?: string;
  isLoggedIn: boolean;
}

export interface AIChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  suggestedActions?: { labelTe: string; labelEn: string; action: () => void }[];
}

export interface ContactItem {
  id: string;
  officeNameTe: string;
  officeNameEn: string;
  designationTe: string;
  designationEn: string;
  phone: string;
  email: string;
  location: string;
}

export interface GovernmentOrder {
  id: string;
  goNumber: string;
  departmentTe: string;
  departmentEn: string;
  issueDate: string;
  subjectTe: string;
  subjectEn: string;
  downloadUrl: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PublicTrackingRecord {
  applicationNumber: string;
  serviceId?: number;
  serviceCode?: string;
  serviceName?: string;
  serviceNameTe?: string;
  categoryName?: string;
  categoryNameTe?: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  statusHistory: {
    id?: number;
    status: ApplicationStatus;
    remarks: string;
    changedAt: string;
    changedBy: string;
  }[];
}

export type NavigationScreen =
  | "home"
  | "services"
  | "problems"
  | "schemes"
  | "land_tools"
  | "tracking"
  | "ai_assistant"
  | "ror_appeal"
  | "complaint_guidance"
  | "rti_guidance"
  | "appeal_guidance"
  | "administrative_directory"
  | "bookmarks"
  | "profile"
  | "login"
  | "signup";
