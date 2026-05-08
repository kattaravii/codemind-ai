import { Code2, Moon, Sun, Sparkles } from "lucide-react";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
];

export default function Header({ language, setLanguage, theme, setTheme }) {
  const isDark = theme === "dark";

  return (
    <header
      className={`flex items-center justify-between px-5 py-3 border-b backdrop-blur-sm transition-all ${isDark
          ? "bg-[#11111b]/95 border-[#313244]"
          : "bg-white/95 border-gray-200 shadow-sm"
        }`}
    >
      <div className="flex items-center gap-2.5">
        <div className={`p-1.5 rounded-lg ${isDark ? "bg-blue-500/10" : "bg-blue-50"}`}>
          <Code2 className={`w-6 h-6 ${isDark ? "text-[#89b4fa]" : "text-blue-600"}`} />
        </div>
        <div className="flex flex-col">
          <h1 className={`text-lg font-bold leading-tight ${isDark ? "text-[#cdd6f4]" : "text-gray-800"}`}>
            CodeMind
          </h1>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span className="text-[11px] font-semibold text-blue-400 tracking-wide">AI</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`appearance-none px-4 py-2 pr-8 rounded-lg border outline-none cursor-pointer text-sm font-medium transition-all ${isDark
                ? "bg-[#1e1e2e] text-[#cdd6f4] border-[#45475a] hover:border-[#89b4fa] focus:border-[#89b4fa]"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 focus:border-blue-400"
              }`}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <svg className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-[#a6adc8]" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`p-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${isDark
              ? "bg-[#1e1e2e] hover:bg-[#313244] text-[#f9e2af] border border-[#45475a]"
              : "bg-gray-100 hover:bg-gray-200 text-amber-500 border border-gray-200"
            }`}
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>
      </div>
    </header>
  );
}