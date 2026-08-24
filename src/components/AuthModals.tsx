import React, { useState } from "react";
import {
  User,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Building,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const AuthView: React.FC<{ isSignUpDefault?: boolean }> = ({
  isSignUpDefault = false,
}) => {
  const { isTe, login, signup, navigateTo } = useApp();

  const [isSignUp, setIsSignUp] = useState<boolean>(isSignUpDefault);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(name, email, mobile, password);
      } else {
        await login(email, password, name);
      }
      navigateTo("profile");
    } catch (err: any) {
      setErrorMessage(err?.message || (isTe ? "ప్రామాణీకరణ విఫలమైంది. దయచేసి వివరాలు సరిచూసుకోండి." : "Authentication failed. Please check your credentials."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0B2545] to-blue-900 text-amber-300 flex items-center justify-center mx-auto shadow-md border border-amber-400/30">
            <Building className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 font-serif">
            {isSignUp
              ? isTe
                ? "కొత్త పౌర ఖాతా సృష్టించండి"
                : "Create Citizen Account"
              : isTe
              ? "ప్రజామిత్ర సిటిజన్ లాగిన్"
              : "Citizen Portal Login"}
          </h2>

          <p className="text-xs text-slate-500">
            {isTe
              ? "ఆంధ్రప్రదేశ్ ప్రభుత్వ పౌర సేవలు మరియు దరఖాస్తుల నిర్వహణ"
              : "Access online applications, certificate requests, and status alerts"}
          </p>
        </div>

        {errorMessage && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isSignUp && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isTe ? "పూర్తి పేరు (Full Name) *" : "Full Name *"}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-700"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isTe ? "ఈమెయిల్ చిరునామా *" : "Email Address *"}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="citizen@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-700"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isTe ? "మొబైల్ సంఖ్య *" : "Mobile Number *"}
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-700"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isTe ? "పాస్‌వర్డ్ *" : "Password *"}
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0B2545] hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
            ) : (
              <>
                <span>
                  {isSignUp
                    ? isTe
                      ? "ఖాతా నమోదు చేయండి"
                      : "Register Account"
                    : isTe
                    ? "లాగిన్ అవ్వండి"
                    : "Sign In"}
                </span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </>
            )}
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="pt-2 text-center text-xs text-slate-600 border-t border-slate-100">
          <span>
            {isSignUp
              ? isTe
                ? "ఇప్పటికే ఖాతా ఉందా? "
                : "Already have an account? "
              : isTe
              ? "కొత్త వినియోగదారులా? "
              : "New to PrajaMitra? "}
          </span>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage(null);
            }}
            className="font-bold text-blue-800 hover:text-blue-950 underline ml-1 cursor-pointer"
          >
            {isSignUp
              ? isTe
                ? "లాగిన్ అవ్వండి"
                : "Sign In"
              : isTe
              ? "ఇక్కడ నమోదు చేసుకోండి"
              : "Register here"}
          </button>
        </div>
      </div>
    </div>
  );
};
