import Editor from "@monaco-editor/react";
import { Sparkles, Loader2, Copy, Trash2 } from "lucide-react";
import axios from "axios";

export default function EditorPanel({ code, setCode, language, setReviewResult, setLoading, loading, theme }) {
  const isDark = theme === "dark";

  const handleReview = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setReviewResult(null);

    try {
      const { data } = await axios.post("http://localhost:5000/api/review", {
        code,
        language,
      });
      setReviewResult(data);
    } catch (error) {
      console.error("Review error:", error);
      const errorMsg = error.response?.data?.error || "Failed to analyze code. Check your backend.";
      setReviewResult({ error: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode("// Start typing your code here...\n");
    setReviewResult(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className={`flex items-center justify-between px-4 py-2.5 border-b ${isDark ? "bg-[#181825] border-[#313244]" : "bg-white border-gray-200"
          }`}
      >
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${isDark ? "bg-[#11111b]" : "bg-gray-100"}`}>
            <span className={`w-2 h-2 rounded-full ${language === "javascript" ? "bg-yellow-400" :
                language === "python" ? "bg-blue-400" :
                  language === "java" ? "bg-red-400" :
                    language === "cpp" ? "bg-purple-400" :
                      "bg-gray-400"
              }`} />
            <span className={`text-xs font-medium ${isDark ? "text-[#a6adc8]" : "text-gray-500"}`}>
              {language.toUpperCase()}
            </span>
          </div>
          <span className={`text-xs ${isDark ? "text-[#585b70]" : "text-gray-400"}`}>
            {code.split("\n").length} lines
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className={`p-1.5 rounded-md transition-all hover:scale-105 ${isDark ? "hover:bg-[#313244] text-[#a6adc8]" : "hover:bg-gray-100 text-gray-500"}`} title="Copy code">
            <Copy className="w-4 h-4" />
          </button>
          <button onClick={handleClear} className={`p-1.5 rounded-md transition-all hover:scale-105 ${isDark ? "hover:bg-[#313244] text-[#a6adc8]" : "hover:bg-gray-100 text-gray-500"}`} title="Clear editor">
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleReview}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 active:scale-95"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Review Code</>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme={isDark ? "vs-dark" : "vs"}
          options={{
            fontSize: 15,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 20, bottom: 20 },
            lineNumbers: "on",
            renderLineHighlight: "line",
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            bracketPairColorization: { enabled: true },
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            lineHeight: 1.6,
            fontLigatures: true,
          }}
        />
      </div>
    </div>
  );
}