// PrajaMitra Spring Security + JWT Authentication Service

const TOKEN_KEY = 'prajamitra_jwt_token';
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export interface UserAuthProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  district?: string;
  mandal?: string;
  village?: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  user: UserAuthProfile;
}

export type AuthTokenProvider = () => Promise<string | null>;
let dynamicTokenProvider: AuthTokenProvider | null = null;

/**
 * Configure optional dynamic token provider callback.
 */
export const setAuthTokenProvider = (provider: AuthTokenProvider | null) => {
  dynamicTokenProvider = provider;
};

/**
 * Retrieves the current verified Bearer token from dynamic provider or localStorage.
 */
export const getAuthBearerToken = async (): Promise<string | null> => {
  if (dynamicTokenProvider) {
    try {
      const dynToken = await dynamicTokenProvider();
      if (dynToken) return dynToken;
    } catch {
      // fallback to stored token
    }
  }
  return localStorage.getItem(TOKEN_KEY) || null;
};

/**
 * Stores the JWT token in localStorage.
 */
export const setStoredToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Clears the stored JWT authentication token.
 */
export const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const AuthService = {
  async register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    district?: string;
    mandal?: string;
    village?: string;
  }): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Registration failed');
    }

    const authData: AuthResponse = json.data;
    if (authData?.token) {
      setStoredToken(authData.token);
    }
    return authData;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Invalid email or password');
    }

    const authData: AuthResponse = json.data;
    if (authData?.token) {
      setStoredToken(authData.token);
    }
    return authData;
  },

  async getCurrentUser(): Promise<UserAuthProfile | null> {
    const token = await getAuthBearerToken();
    if (!token) return null;

    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          clearStoredToken();
        }
        return null;
      }

      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  },

  logout() {
    clearStoredToken();
    if (dynamicTokenProvider) {
      dynamicTokenProvider = null;
    }
  },
};
