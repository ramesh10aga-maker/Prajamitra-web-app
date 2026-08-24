import React, { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  User,
  CheckCircle2,
  FileSearch,
  Scale,
  Building,
  RotateCcw,
} from "lucide-react";
import { useApp } from "../context/AppContext";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  textTe: string;
  textEn: string;
  timestamp: string;
  quickActions?: {
    labelTe: string;
    labelEn: string;
    screen: string;
  }[];
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    sender: "bot",
    textTe:
      "నమస్కారం! నేను మీ ప్రజామిత్ర AI సిటిజన్ అసిస్టెంట్‌ని. ఆంధ్రప్రదేశ్ ప్రభుత్వ రెవెన్యూ, భూమి రికార్డులు (వెబ్‌ల్యాండ్/1-B), ఆస్తి రిజిస్ట్రేషన్ (ఈసీ), పంచాయతీ సేవలు లేదా సంక్షేమ పథకాల గురించి మీ సందేహాలను అడగండి.",
    textEn:
      "Welcome to PrajaMitra AP Citizen AI Assistant! I can guide you through Andhra Pradesh government services, Webland Adangal corrections, Property Registration (EC), Panchayat Raj house taxes, ROR appeals, and flagship welfare schemes.",
    timestamp: "Just now",
    quickActions: [
      {
        labelTe: "అడంగల్ ఎలా డౌన్‌లోడ్ చేయాలి?",
        labelEn: "How to download Adangal?",
        screen: "services",
      },
      {
        labelTe: "ఈసీ (EC) పొందే విధానం",
        labelEn: "How to get Encumbrance Certificate?",
        screen: "services",
      },
      {
        labelTe: "తల్లికి వందనం అర్హతలు ఏమిటి?",
        labelEn: "Thalliki Vandanam Scheme rules?",
        screen: "schemes",
      },
      {
        labelTe: "22-A నిషేధిత భూముల వివరాలు",
        labelEn: "Section 22-A Prohibited Land guide",
        screen: "land_tools",
      },
    ],
  },
];

export const AIAssistantView: React.FC = () => {
  const { isTe, speakText, isSpeaking, stopSpeaking, navigateTo } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      textTe: query,
      textEn: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyTe = "";
      let replyEn = "";

      if (lower.includes("adangal") || lower.includes("అడంగల్") || lower.includes("pahani") || lower.includes("పహాణీ")) {
        replyTe =
          "అడంగల్ / పహాణీ కొరకు మీభూమి పోర్టల్ (meebhoomi.ap.gov.in) లో 'మీ అడంగల్' ఎంచుకొని జిల్లా, మండలం, గ్రామం మరియు మీ సర్వే లేదా ఖాతా నంబరును నమోదు చేసి ఉచితంగా డౌన్‌లోడ్ చేసుకోవచ్చు. ఏదైనా మార్పుల కొరకు మీ గ్రామ సచివాలయంలో VRO ను సంప్రదించండి.";
        replyEn =
          "To view or download your Adangal/Pahani, visit meebhoomi.ap.gov.in, select 'Your Adangal', choose your District, Mandal, Village, and provide your Survey or Khata Number. For corrections, submit an application via your Village Secretariat.";
      } else if (lower.includes("ec") || lower.includes("ఈసీ") || lower.includes("encumbrance") || lower.includes("రిజిస్ట్రేషన్")) {
        replyTe =
          "విక్రయ విక్రయేతర ధృవీకరణ పత్రం (EC) కోసం రిజిస్ట్రేషన్ శాఖ పోర్టల్ (registration.ap.gov.in) లేదా గ్రామ సచివాలయంలో దరఖాస్తు చేసుకోవచ్చు. 1983 నుంచి నేటి వరకు కంప్యూటరీకరించిన ఈసీని వెంటనే డౌన్‌లోడ్ చేసుకోవచ్చు. ఫీజు ₹200.";
        replyEn =
          "Encumbrance Certificate (EC) from 1983 to date can be downloaded online via registration.ap.gov.in or from your Village/Ward Secretariat. Official fee is ₹200.";
      } else if (lower.includes("thalliki") || lower.includes("తల్లికి") || lower.includes("vandanam") || lower.includes("scheme") || lower.includes("పథకం")) {
        replyTe =
          "తల్లికి వందనం పథకం ద్వారా 1 నుంచి 12వ తరగతి చదువుతున్న ప్రతి విద్యార్థి తల్లి ఖాతాలో ఏడాదికి ₹15,000 జమ చేయబడుతుంది. తెల్ల రేషన్ కార్డు, పాఠశాలలో 75% హాజరు మరియు NPCI లింక్ అయిన ఆధార్ బ్యాంక్ ఖాతా అవసరం.";
        replyEn =
          "Thalliki Vandanam provides ₹15,000 per year per school-going child (Classes 1 to 12) directly to the mother's bank account. Key requirements: 75% school attendance, White Ration Card, and Aadhaar-seeded NPCI bank account.";
      } else if (lower.includes("22-a") || lower.includes("prohibited") || lower.includes("నిషేధిత")) {
        replyTe =
          "సెక్షన్ 22-A కింద ప్రభుత్వ, దేవాదాయ, వక్ఫ్ మరియు సీలింగ్ భూముల రిజిస్ట్రేషన్ నిషేధించబడింది. మీరు కొనుగోలు చేసే భూమి 22-A లో లేదని రిజిస్ట్రార్ కార్యాలయంలో లేదా మీభూమిలో సరిచూసుకోండి. తప్పుగా నమోదైతే జిల్లా కలెక్టర్‌కు డీ-నోటిఫికేషన్ అప్పీల్ చేయవచ్చు.";
        replyEn =
          "Under Section 22-A, Government, Endowments, Waqf, and Ceiling lands are prohibited from registration. If private Patta land is wrongly listed, apply for De-notification before the District Level Committee chaired by the District Collector.";
      } else if (lower.includes("ror") || lower.includes("appeal") || lower.includes("అప్పీల్") || lower.includes("tahsildar")) {
        replyTe =
          "తహసీల్దార్ జారీ చేసిన మ్యుటేషన్ లేదా పాస్‌బుక్ ఉత్తర్వులపై అసంతృప్తి ఉంటే, 60 రోజుల్లోపు రెవెన్యూ డివిజనల్ అధికారి (RDO) వద్ద ఆర్డీవో అప్పీల్ (Section 5(5)) దాఖలు చేయవచ్చు. తదుపరి రివిజన్ జాయింట్ కలెక్టర్‌కు చేయవచ్చు.";
        replyEn =
          "Under Section 5(5) of the AP ROR Act 1971, you can file an Appeal before the Revenue Divisional Officer (RDO) within 60 days against orders of the Tahsildar. Further Revision lies with the Joint Collector under Section 9.";
      } else {
        replyTe = `మీ ప్రశ్నకు ధన్యవాదాలు. ఆంధ్రప్రదేశ్ పౌర సేవల నిబంధనల ప్రకారం మీ దరఖాస్తును సంబంధిత గ్రామ/వార్డు సచివాలయంలో సమర్పించవచ్చు. మరింత సమాచారం కోసం 1902 టోల్‌ఫ్రీ నంబర్‌ను సంప్రదించండి.`;
        replyEn = `Thank you for your query. For official service execution and verification, you can submit an application online or visit your local Grama/Ward Sachivalayam. For grievance escalation, dial tollfree 1902.`;
      }

      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: "bot",
        textTe: replyTe,
        textEn: replyEn,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleAudio = (msg: ChatMessage) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(isTe ? msg.textTe : msg.textEn);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#0B2545] rounded-3xl p-6 text-white border border-blue-900 shadow-md flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isTe ? "AI పౌర సేవా సహాయకుడు" : "AP Citizen AI Assistant"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif">
            {isTe ? "ప్రజామిత్ర AI సహాయక కేంద్రం" : "PrajaMitra AI Advisory"}
          </h1>
          <p className="text-xs text-blue-200">
            {isTe
              ? "ప్రభుత్వ నిబంధనలు, భూ రికార్డుల సవరణ, రిజిస్ట్రేషన్ నియమాలు మరియు పథకాల వివరాలు తెలుసుకోండి"
              : "Instant guidance on AP government citizen workflows, Webland records, and scheme eligibility"}
          </p>
        </div>

        <button
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="p-2.5 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-blue-200 hover:text-white border border-blue-700 transition-colors text-xs font-bold flex items-center gap-1.5 shrink-0"
          title="Reset Chat"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isTe ? "చాట్ రీసెట్" : "Reset"}</span>
        </button>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs min-h-[420px] max-h-[560px] flex flex-col justify-between overflow-hidden">
        {/* Messages List */}
        <div className="space-y-4 overflow-y-auto pr-1 flex-1 pb-4">
          {messages.map((msg) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  isBot ? "justify-start" : "justify-end flex-row-reverse"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    isBot
                      ? "bg-[#0B2545] text-amber-300 border border-blue-800"
                      : "bg-blue-800 text-white"
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm space-y-2 ${
                    isBot
                      ? "bg-slate-50 border border-slate-200/80 text-slate-800"
                      : "bg-[#0B2545] text-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200/40 pb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                      {isBot ? "PrajaMitra Assistant" : "Citizen"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-60 font-mono">
                        {msg.timestamp}
                      </span>
                      {isBot && (
                        <button
                          onClick={() => handleAudio(msg)}
                          className="hover:text-amber-500 transition-colors"
                          title="Read aloud"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="leading-relaxed whitespace-pre-line font-normal">
                    {isTe ? msg.textTe : msg.textEn}
                  </p>

                  {/* Quick Action Chips if attached */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        {isTe ? "తరచుగా అడిగే ప్రశ్నలు:" : "Quick Questions:"}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.quickActions.map((qa, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() =>
                              handleSendMessage(isTe ? qa.labelTe : qa.labelEn)
                            }
                            className="text-left px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-900 hover:bg-blue-50 text-[11px] font-semibold transition-colors"
                          >
                            💡 {isTe ? qa.labelTe : qa.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-500 text-xs pl-11">
              <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:0.4s]"></div>
              <span className="font-medium text-slate-400">
                {isTe ? "సమాధానం విశ్లేషిస్తోంది..." : "Generating citizen advisory..."}
              </span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="pt-3 border-t border-slate-200"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isTe
                  ? "మీ సందేహాన్ని ఇక్కడ టైప్ చేయండి (e.g. అడంగల్, 1-B, ఈసీ, తల్లికి వందనం)..."
                  : "Ask about Webland, EC, ROR Appeal, Schemes, or Land Survey..."
              }
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-700 focus:bg-white transition-colors"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-3 rounded-2xl bg-[#0B2545] hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">{isTe ? "పంపండి" : "Send"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
