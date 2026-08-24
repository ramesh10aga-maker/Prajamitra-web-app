import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ApplicationRecord,
  BookmarkItem,
  GovernmentService,
  NavigationScreen,
  ProblemServiceItem,
  SchemeItem,
  UserProfile,
} from "../types";
import { ApiService } from "../api/apiService";
import { AuthService } from "../api/authService";

interface AppContextType {
  isTe: boolean;
  toggleLanguage: () => void;
  setLanguage: (isTelugu: boolean) => void;
  currentScreen: NavigationScreen;
  navigateTo: (screen: NavigationScreen) => void;
  user: UserProfile;
  login: (email: string, pass: string, name?: string) => Promise<boolean>;
  signup: (name: string, email: string, mobile: string, pass: string) => Promise<boolean>;
  logout: () => void;
  bookmarks: BookmarkItem[];
  toggleBookmark: (item: BookmarkItem) => void;
  isBookmarked: (itemId: string | number) => boolean;
  selectedService: GovernmentService | null;
  setSelectedService: (svc: GovernmentService | null) => void;
  selectedProblem: ProblemServiceItem | null;
  setSelectedProblem: (prob: ProblemServiceItem | null) => void;
  selectedScheme: SchemeItem | null;
  setSelectedScheme: (scheme: SchemeItem | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  speakText: (text: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
  // Applications workflow & tracking
  applications: ApplicationRecord[];
  applyForService: (service: GovernmentService) => void;
  submitApplication: (record: {
    serviceId: number;
    applicantName: string;
    applicantPhone: string;
    applicantEmail?: string;
    aadhaarMasked?: string;
    district?: string;
    mandal?: string;
    village?: string;
    details?: string;
  }) => Promise<ApplicationRecord>;
  trackApplicationId: string;
  setTrackApplicationId: (id: string) => void;
  applyingService: GovernmentService | null;
  setApplyingService: (svc: GovernmentService | null) => void;
  refreshApplications: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/** Only non-sensitive UI preferences may use localStorage (e.g. language). */
const STORAGE_KEYS = {
  LANGUAGE: "prajamitra_is_telugu",
};

const EMPTY_USER: UserProfile = {
  name: "",
  email: "",
  mobile: "",
  district: "",
  mandal: "",
  village: "",
  isLoggedIn: false,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTe, setIsTe] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [currentScreen, setCurrentScreen] = useState<NavigationScreen>("home");
  const [selectedService, setSelectedService] = useState<GovernmentService | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<ProblemServiceItem | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<SchemeItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [trackApplicationId, setTrackApplicationId] = useState<string>("");
  const [applyingService, setApplyingService] = useState<GovernmentService | null>(null);

  // Initial state: logged out and empty — backend is source of truth
  const [user, setUser] = useState<UserProfile>(EMPTY_USER);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  // Verify active JWT session with backend (no localStorage for profile)
  useEffect(() => {
    AuthService.getCurrentUser()
      .then((profile) => {
        if (profile) {
          setUser({
            name: profile.name || "",
            email: profile.email || "",
            mobile: profile.phone || "",
            district: profile.district || "",
            mandal: profile.mandal || "",
            village: profile.village || "",
            isLoggedIn: true,
          });
        }
      })
      .catch(() => {});
  }, []);

  const refreshApplications = async () => {
    try {
      const liveApps = await ApiService.getMyApplications();
      setApplications(liveApps && liveApps.length > 0 ? liveApps : []);
    } catch {
      setApplications([]);
    }
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      refreshApplications();
      ApiService.getBookmarks()
        .then((b) => setBookmarks(b || []))
        .catch(() => setBookmarks([]));
    } else {
      setApplications([]);
      setBookmarks([]);
    }
  }, [user.isLoggedIn]);

  // Persist language preference only
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, JSON.stringify(isTe));
  }, [isTe]);

  const toggleLanguage = () => setIsTe((prev) => !prev);
  const setLanguage = (val: boolean) => setIsTe(val);

  const navigateTo = (screen: NavigationScreen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const applyForService = (service: GovernmentService) => {
    setApplyingService(service);
    setSelectedService(null);
  };

  const submitApplication = async (appData: {
    serviceId: number;
    applicantName: string;
    applicantPhone: string;
    applicantEmail?: string;
    aadhaarMasked?: string;
    district?: string;
    mandal?: string;
    village?: string;
    details?: string;
  }): Promise<ApplicationRecord> => {
    const submittedRecord = await ApiService.submitApplication(appData);
    setApplications((prev) => [submittedRecord, ...prev.filter(a => a.id !== submittedRecord.id)]);
    setTrackApplicationId(submittedRecord.id);
    return submittedRecord;
  };

  const login = async (email: string, pass: string, name?: string): Promise<boolean> => {
    try {
      const res = await AuthService.login(email, pass);
      if (res?.user) {
        const newUser: UserProfile = {
          name: res.user.name || name || email.split("@")[0] || "",
          email: res.user.email || email,
          mobile: res.user.phone || "",
          district: res.user.district || "",
          mandal: res.user.mandal || "",
          village: res.user.village || "",
          isLoggedIn: true,
        };
        setUser(newUser);
        return true;
      }
    } catch (err) {
      console.warn("Backend auth call failed:", err);
    }
    return false;
  };

  const signup = async (name: string, email: string, mobile: string, pass: string): Promise<boolean> => {
    try {
      const res = await AuthService.register({
        name,
        email,
        phone: mobile,
        password: pass,
        district: "",
        mandal: "",
        village: "",
      });
      if (res?.user) {
        const newUser: UserProfile = {
          name: res.user.name || name,
          email: res.user.email || email,
          mobile: res.user.phone || mobile,
          district: res.user.district || "",
          mandal: res.user.mandal || "",
          village: res.user.village || "",
          isLoggedIn: true,
        };
        setUser(newUser);
        return true;
      }
    } catch (err) {
      console.warn("Backend signup call failed:", err);
    }
    return false;
  };

  const logout = () => {
    AuthService.logout();
    setUser(EMPTY_USER);
    setApplications([]);
    setBookmarks([]);
  };

  const toggleBookmark = (item: BookmarkItem) => {
    const serviceId = typeof item.itemId === 'number' ? item.itemId : parseInt(String(item.itemId), 10);
    setBookmarks((prev) => {
      const exists = prev.some((b) => String(b.itemId) === String(item.itemId));
      if (exists) {
        if (!isNaN(serviceId)) {
          ApiService.removeBookmark(serviceId).catch(() => {});
        }
        return prev.filter((b) => String(b.itemId) !== String(item.itemId));
      } else {
        if (!isNaN(serviceId)) {
          ApiService.addBookmark(serviceId).catch(() => {});
        }
        return [item, ...prev];
      }
    });
  };

  const isBookmarked = (itemId: string | number): boolean => {
    return bookmarks.some((b) => String(b.itemId) === String(itemId));
  };

  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    if (!text.trim()) return;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isTe ? "te-IN" : "en-IN";
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <AppContext.Provider
      value={{
        isTe,
        toggleLanguage,
        setLanguage,
        currentScreen,
        navigateTo,
        user,
        login,
        signup,
        logout,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        selectedService,
        setSelectedService,
        selectedProblem,
        setSelectedProblem,
        selectedScheme,
        setSelectedScheme,
        searchQuery,
        setSearchQuery,
        speakText,
        isSpeaking,
        stopSpeaking,
        applications,
        applyForService,
        submitApplication,
        trackApplicationId,
        setTrackApplicationId,
        applyingService,
        setApplyingService,
        refreshApplications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
