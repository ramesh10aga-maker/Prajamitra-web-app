// PrajaMitra REST API Service for Spring Boot 3 + PostgreSQL Backend

import {
  GovernmentService,
  SchemeItem,
  ApplicationRecord,
  PagedResponse,
  PublicTrackingRecord,
  BookmarkItem,
} from '../types';
import { AP_DISTRICTS } from '../data/administrativeData';
import { getAuthBearerToken, setAuthTokenProvider } from './authService';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export const ApiService = {
  // Configures dynamic token provider for Bearer authentication
  setTokenProvider(provider: (() => Promise<string | null>) | null) {
    setAuthTokenProvider(provider);
  },

  async getHeaders(isProtected: boolean = false, extraHeaders: Record<string, string> = {}): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...extraHeaders,
    };
    
    if (isProtected) {
      const token = await getAuthBearerToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    return headers;
  },

  // 1. Government Services (from PostgreSQL)
  async getServices(params?: {
    category?: string;
    search?: string;
    page?: number;
    size?: number;
  }): Promise<PagedResponse<GovernmentService>> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'all') query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.page !== undefined) query.append('page', String(params.page));
    if (params?.size !== undefined) query.append('size', String(params.size));

    const url = `${API_BASE}/services${query.toString() ? `?${query.toString()}` : ''}`;
    const headers = await this.getHeaders(false);
    const res = await fetch(url, { headers });
    
    if (!res.ok) {
      const errText = await res.text();
      throw new ApiError(res.status, `Failed to load government services: ${res.statusText}`, errText);
    }

    const json: ApiResponse<PagedResponse<any>> = await res.json();
    const paged = json.data;

    // Transform backend DTOs into frontend GovernmentService structures
    const mappedContent: GovernmentService[] = (paged?.content || []).map((s: any) => ({
      id: s.id,
      serviceRef: s.serviceCode || `AP-SVC-${s.id}`,
      nameTe: s.nameTe,
      nameEn: s.name,
      departmentNameTe: s.categoryNameTe || 'ప్రభుత్వ శాఖ',
      departmentNameEn: s.categoryName || 'Government Department',
      categoryId: s.categoryName ? s.categoryName.toLowerCase().replace(/\s+/g, '_') : 'general',
      overviewTe: s.descriptionTe || s.description || '',
      overviewEn: s.description || '',
      eligibilityTe: s.eligibility || 'అర్హులైన ఆంధ్రప్రదేశ్ పౌరులందరూ',
      eligibilityEn: s.eligibility || 'All eligible citizens of Andhra Pradesh',
      documentsTe: s.requiredDocuments || 'ఆధార్ కార్డు, నివాస ధృవీకరణ',
      documentsEn: s.requiredDocuments || 'Aadhaar Card, Residence Proof',
      feesTe: s.fees || 'ఉచితం / నామమాత్రపు రుసుము',
      feesEn: s.fees || 'Free / Nominal Fee',
      deliveryTimeTe: s.timeline || '15 పని దినాలు',
      deliveryTimeEn: s.timeline || '15 Working Days',
      officialWebsite: s.onlineUrl || 'https://www.ap.gov.in',
      isPopular: s.isPopular || false,
    }));

    return {
      content: mappedContent,
      page: paged?.page || 0,
      size: paged?.size || 50,
      totalElements: paged?.totalElements || mappedContent.length,
      totalPages: paged?.totalPages || 1,
      last: paged?.last ?? true,
    };
  },

  async getServiceById(id: number): Promise<GovernmentService> {
    const headers = await this.getHeaders(false);
    const res = await fetch(`${API_BASE}/services/${id}`, { headers });
    if (!res.ok) {
      throw new ApiError(res.status, `Government service with ID ${id} not found`);
    }
    const json: ApiResponse<any> = await res.json();
    const s = json.data;
    return {
      id: s.id,
      serviceRef: s.serviceCode || `AP-SVC-${s.id}`,
      nameTe: s.nameTe,
      nameEn: s.name,
      departmentNameTe: s.categoryNameTe || 'ప్రభుత్వ శాఖ',
      departmentNameEn: s.categoryName || 'Government Department',
      categoryId: s.categoryName ? s.categoryName.toLowerCase().replace(/\s+/g, '_') : 'general',
      overviewTe: s.descriptionTe || s.description || '',
      overviewEn: s.description || '',
      eligibilityTe: s.eligibility || 'అర్హులైన ఆంధ్రప్రదేశ్ పౌరులందరూ',
      eligibilityEn: s.eligibility || 'All eligible citizens of Andhra Pradesh',
      documentsTe: s.requiredDocuments || 'ఆధార్ కార్డు, నివాస ధృవీకరణ',
      documentsEn: s.requiredDocuments || 'Aadhaar Card, Residence Proof',
      feesTe: s.fees || 'ఉచితం / నామమాత్రపు రుసుము',
      feesEn: s.fees || 'Free / Nominal Fee',
      deliveryTimeTe: s.timeline || '15 పని దినాలు',
      deliveryTimeEn: s.timeline || '15 Working Days',
      officialWebsite: s.onlineUrl || 'https://www.ap.gov.in',
      isPopular: s.isPopular || false,
    };
  },

  // 2. Flagship Schemes
  async getSchemes(category?: string): Promise<SchemeItem[]> {
    const url = category ? `${API_BASE}/schemes?category=${encodeURIComponent(category)}` : `${API_BASE}/schemes`;
    const headers = await this.getHeaders(false);
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new ApiError(res.status, `Failed to load schemes: ${res.statusText}`);
    }
    const json: ApiResponse<SchemeItem[]> = await res.json();
    return json.data || [];
  },

  // 3. Administrative Districts
  async getDistricts(): Promise<typeof AP_DISTRICTS> {
    const headers = await this.getHeaders(false);
    const res = await fetch(`${API_BASE}/districts`, { headers });
    if (!res.ok) {
      throw new ApiError(res.status, `Failed to load districts: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data || [];
  },

  // 4. Citizen Applications (PostgreSQL Backend with Authentication)
  async submitApplication(appData: {
    serviceId: number;
    applicantName: string;
    applicantPhone: string;
    applicantEmail?: string;
    aadhaarMasked?: string;
    district?: string;
    mandal?: string;
    village?: string;
    details?: string;
  }): Promise<ApplicationRecord> {
    const headers = await this.getHeaders(true);
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers,
      body: JSON.stringify(appData),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new ApiError(res.status, errBody.message || `Application submission failed (${res.status})`, errBody);
    }

    const json: ApiResponse<any> = await res.json();
    const data = json.data;

    return {
      id: data.applicationNumber,
      serviceId: data.serviceId,
      serviceRef: data.serviceCode || `AP-SVC-${data.serviceId}`,
      serviceNameTe: data.serviceNameTe || 'పౌర సేవ',
      serviceNameEn: data.serviceName || 'Citizen Service',
      departmentTe: data.categoryName || 'ప్రభుత్వ శాఖ',
      departmentEn: data.categoryName || 'Government Department',
      applicantName: data.applicantName,
      aadhaarLastFour: data.aadhaarMasked ? data.aadhaarMasked.slice(-4) : 'XXXX',
      mobile: data.applicantPhone,
      email: data.applicantEmail || '',
      gender: 'Citizen',
      district: data.district || '',
      mandal: data.mandal || '',
      village: data.village || '',
      purpose: data.details || 'Official Application',
      attachedDocuments: ['Submitted Online Application'],
      status: data.status || 'SUBMITTED',
      submittedAt: data.submittedAt || new Date().toISOString(),
      lastUpdatedAt: data.updatedAt || new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      assignedOfficer: 'Sachivalayam Desk / Tahsildar',
      statusHistory: (data.statusHistory || []).map((h: any) => ({
        status: h.status,
        timestamp: h.changedAt,
        officerTitle: h.changedBy || 'Intake Desk',
        remarks: h.remarks,
      })),
    };
  },

  // 5. Public Non-Sensitive Tracking
  async trackPublicApplication(applicationNumber: string): Promise<PublicTrackingRecord> {
    const headers = await this.getHeaders(false);
    const res = await fetch(`${API_BASE}/applications/track/${encodeURIComponent(applicationNumber.trim())}`, {
      headers,
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new ApiError(res.status, errBody.message || `Application ${applicationNumber} not found`, errBody);
    }

    const json: ApiResponse<PublicTrackingRecord> = await res.json();
    return json.data;
  },

  // 6. Authenticated Full Application Details
  async getApplicationDetails(applicationNumber: string): Promise<ApplicationRecord> {
    const headers = await this.getHeaders(true);
    const res = await fetch(`${API_BASE}/applications/${encodeURIComponent(applicationNumber.trim())}`, {
      headers,
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new ApiError(res.status, errBody.message || `Could not fetch application details (${res.status})`, errBody);
    }

    const json: ApiResponse<any> = await res.json();
    const data = json.data;

    return {
      id: data.applicationNumber,
      serviceId: data.serviceId,
      serviceRef: data.serviceCode || `AP-SVC-${data.serviceId}`,
      serviceNameTe: data.serviceNameTe || 'పౌర సేవ',
      serviceNameEn: data.serviceName || 'Citizen Service',
      departmentTe: data.categoryName || 'ప్రభుత్వ శాఖ',
      departmentEn: data.categoryName || 'Government Department',
      applicantName: data.applicantName,
      aadhaarLastFour: data.aadhaarMasked ? data.aadhaarMasked.slice(-4) : 'XXXX',
      mobile: data.applicantPhone,
      email: data.applicantEmail || '',
      gender: 'Citizen',
      district: data.district || '',
      mandal: data.mandal || '',
      village: data.village || '',
      purpose: data.details || 'Official Application',
      attachedDocuments: ['Submitted Online Application'],
      status: data.status || 'SUBMITTED',
      submittedAt: data.submittedAt || new Date().toISOString(),
      lastUpdatedAt: data.updatedAt || new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      assignedOfficer: 'Sachivalayam Desk / Tahsildar',
      statusHistory: (data.statusHistory || []).map((h: any) => ({
        status: h.status,
        timestamp: h.changedAt,
        officerTitle: h.changedBy || 'Intake Desk',
        remarks: h.remarks,
      })),
    };
  },

  // 7. My Applications (Authenticated Citizen)
  async getMyApplications(): Promise<ApplicationRecord[]> {
    const headers = await this.getHeaders(true);
    const res = await fetch(`${API_BASE}/applications/my`, {
      headers,
    });

    if (!res.ok) {
      if (res.status === 401) {
        return [];
      }
      throw new ApiError(res.status, `Failed to load applications: ${res.statusText}`);
    }

    const json: ApiResponse<any[]> = await res.json();
    return (json.data || []).map((data) => ({
      id: data.applicationNumber,
      serviceId: data.serviceId,
      serviceRef: data.serviceCode || `AP-SVC-${data.serviceId}`,
      serviceNameTe: data.serviceNameTe || 'పౌర సేవ',
      serviceNameEn: data.serviceName || 'Citizen Service',
      departmentTe: data.categoryName || 'ప్రభుత్వ శాఖ',
      departmentEn: data.categoryName || 'Government Department',
      applicantName: data.applicantName,
      aadhaarLastFour: data.aadhaarMasked ? data.aadhaarMasked.slice(-4) : 'XXXX',
      mobile: data.applicantPhone,
      email: data.applicantEmail || '',
      gender: 'Citizen',
      district: data.district || '',
      mandal: data.mandal || '',
      village: data.village || '',
      purpose: data.details || 'Official Application',
      attachedDocuments: ['Submitted Online Application'],
      status: data.status || 'SUBMITTED',
      submittedAt: data.submittedAt || new Date().toISOString(),
      lastUpdatedAt: data.updatedAt || new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      assignedOfficer: 'Sachivalayam Desk / Tahsildar',
      statusHistory: (data.statusHistory || []).map((h: any) => ({
        status: h.status,
        timestamp: h.changedAt,
        officerTitle: h.changedBy || 'Intake Desk',
        remarks: h.remarks,
      })),
    }));
  },

  // 8. Land Tools API
  async convertLandUnits(value: number, fromUnit: string) {
    const headers = await this.getHeaders(false);
    const res = await fetch(`${API_BASE}/land/convert`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ value, fromUnit }),
    });
    if (!res.ok) {
      throw new ApiError(res.status, `Failed to calculate land unit conversion`);
    }
    const json = await res.json();
    return json.data;
  },

  // 9. User Bookmarks (Authenticated)
  async getBookmarks(): Promise<BookmarkItem[]> {
    const headers = await this.getHeaders(true);
    const res = await fetch(`${API_BASE}/bookmarks`, {
      headers,
    });
    if (!res.ok) {
      if (res.status === 401) return [];
      throw new ApiError(res.status, `Failed to load bookmarks`);
    }
    const json: ApiResponse<any[]> = await res.json();
    return (json.data || []).map((b) => ({
      type: 'SERVICE',
      itemId: b.serviceId,
      titleTe: b.serviceNameTe || b.serviceName,
      titleEn: b.serviceName,
      departmentTe: b.categoryNameTe || 'ప్రభుత్వ శాఖ',
      departmentEn: b.categoryName || 'Government Department',
      timestamp: b.createdAt ? new Date(b.createdAt).getTime() : Date.now(),
    }));
  },

  async addBookmark(serviceId: number): Promise<void> {
    const headers = await this.getHeaders(true);
    const res = await fetch(`${API_BASE}/bookmarks/${serviceId}`, {
      method: 'POST',
      headers,
    });
    if (!res.ok && res.status !== 401) {
      throw new ApiError(res.status, `Failed to save bookmark`);
    }
  },

  async removeBookmark(serviceId: number): Promise<void> {
    const headers = await this.getHeaders(true);
    const res = await fetch(`${API_BASE}/bookmarks/${serviceId}`, {
      method: 'DELETE',
      headers,
    });
    if (!res.ok && res.status !== 401) {
      throw new ApiError(res.status, `Failed to delete bookmark`);
    }
  },
};
