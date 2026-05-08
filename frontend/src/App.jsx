import { useState } from "react";
import Header from "./components/Header";
import EditorPanel from "./components/EditorPanel";
import ReviewPanel from "./components/ReviewPanel";

function App() {
  const [code, setCode] = useState(`// 👋 Welcome to CodeMind AI!\n// Write or paste your code below\n\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));`);
  const [language, setLanguage] = useState("javascript");
  const [reviewResult, setReviewResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${theme === "dark" ? "bg-[#0f0f1a]" : "bg-gray-100"}`}>
      <Header language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />

      <main className="flex-1 flex flex-row overflow-hidden">
        <div className="w-[55%] h-full flex flex-col">
          <EditorPanel
            code={code}
            setCode={setCode}
            language={language}
            setReviewResult={setReviewResult}
            setLoading={setLoading}
            loading={loading}
            theme={theme}
          />
        </div>

        <div className={`w-[2px] h-full ${theme === "dark" ? "bg-gradient-to-b from-[#313244] via-[#89b4fa] to-[#313244]" : "bg-gradient-to-b from-gray-200 via-blue-400 to-gray-200"}`} />

        <div className="w-[45%] h-full flex flex-col">
          <ReviewPanel reviewResult={reviewResult} loading={loading} theme={theme} />
        </div>
      </main>
    </div>
  );
}

export default App;