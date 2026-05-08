import { Shield, Zap, BookOpen, Bug, BarChart3, FileText, Sparkles, AlertTriangle } from "lucide-react";

export default function ReviewPanel({ reviewResult, loading, theme }) {
  const isDark = theme === "dark";

  // Loading state
  if (loading) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDark ? "bg-[#181825]" : "bg-white"}`}>
        <div className="text-center px-8">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-blue-400" />
          </div>
          <p className={`text-lg font-semibold ${isDark ? "text-[#cdd6f4]" : "text-gray-700"}`}>AI is analyzing your code...</p>
          <p className={`text-sm mt-1.5 ${isDark ? "text-[#585b70]" : "text-gray-400"}`}>Checking syntax, security, performance & more</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!reviewResult) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDark ? "bg-[#181825]" : "bg-white"}`}>
        <div className="text-center px-10 max-w-sm">
          <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-5 ${isDark ? "bg-gradient-to-br from-[#313244] to-[#1e1e2e] border border-[#45475a]" : "bg-gradient-to-br from-gray-100 to-white border border-gray-200 shadow-lg"
            }`}>
            <FileText className={`w-12 h-12 ${isDark ? "text-[#89b4fa]" : "text-blue-500"}`} />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isDark ? "text-[#cdd6f4]" : "text-gray-800"}`}>AI Code Review</h2>
          <p className={`text-sm leading-relaxed ${isDark ? "text-[#a6adc8]" : "text-gray-500"}`}>
            Click <span className="font-semibold text-blue-400">"Review Code"</span> to analyze your code for bugs, security issues, and performance improvements.
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (reviewResult.error) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDark ? "bg-[#181825]" : "bg-white"}`}>
        <div className="text-center px-8 max-w-md">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${isDark ? "bg-red-400/10" : "bg-red-50"}`}>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-red-400 font-medium mb-2">Analysis Failed</p>
          <p className={`text-sm ${isDark ? "text-[#a6adc8]" : "text-gray-500"}`}>{reviewResult.error}</p>
        </div>
      </div>
    );
  }

  const { overview, syntaxErrors, securityIssues, performance, codeQuality, documentation } = reviewResult;

  return (
    <div className={`flex-1 overflow-y-auto ${isDark ? "bg-[#181825]" : "bg-white"}`}>
      <div className={`sticky top-0 z-10 px-5 py-3 border-b backdrop-blur-sm ${isDark ? "bg-[#181825]/95 border-[#313244]" : "bg-white/95 border-gray-200"
        }`}>
        <h2 className={`text-base font-bold flex items-center gap-2 ${isDark ? "text-[#cdd6f4]" : "text-gray-800"}`}>
          <Sparkles className="w-5 h-5 text-blue-400" /> AI Review Results
        </h2>
      </div>

      <div className="p-5 space-y-4">
        {overview && (
          <Section icon={<BookOpen className="w-4 h-4" />} title="Overview" color="text-blue-400" isDark={isDark}>
            <p className="text-sm leading-relaxed">{overview}</p>
          </Section>
        )}

        {codeQuality?.score && (
          <Section icon={<BarChart3 className="w-4 h-4" />} title="Code Quality Score" color="text-green-400" isDark={isDark}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`text-4xl font-bold ${codeQuality.score >= 7 ? "text-green-400" : codeQuality.score >= 4 ? "text-yellow-400" : "text-red-400"
                }`}>
                {codeQuality.score}<span className="text-lg opacity-50">/10</span>
              </div>
              <div className={`flex-1 h-2.5 rounded-full ${isDark ? "bg-[#313244]" : "bg-gray-200"}`}>
                <div className={`h-full rounded-full transition-all duration-700 ${codeQuality.score >= 7 ? "bg-gradient-to-r from-green-400 to-green-500" :
                    codeQuality.score >= 4 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" :
                      "bg-gradient-to-r from-red-400 to-red-500"
                  }`} style={{ width: `${codeQuality.score * 10}%` }}></div>
              </div>
            </div>
            {codeQuality.strengths?.length > 0 && <ListSection icon="✅" title="Strengths" items={codeQuality.strengths} isDark={isDark} color="text-green-400" />}
            {codeQuality.improvements?.length > 0 && <ListSection icon="🔧" title="Areas to Improve" items={codeQuality.improvements} isDark={isDark} color="text-yellow-400" />}
            {codeQuality.bestPractices?.length > 0 && <ListSection icon="💡" title="Best Practices" items={codeQuality.bestPractices} isDark={isDark} color="text-blue-400" />}
          </Section>
        )}

        {syntaxErrors?.length > 0 && (
          <Section icon={<Bug className="w-4 h-4" />} title={`Syntax Issues (${syntaxErrors.length})`} color="text-red-400" isDark={isDark}>
            {syntaxErrors.map((err, i) => <IssueCard key={i} issue={err} type="syntax" isDark={isDark} />)}
          </Section>
        )}

        {securityIssues?.length > 0 && (
          <Section icon={<Shield className="w-4 h-4" />} title={`Security Vulnerabilities (${securityIssues.length})`} color="text-yellow-400" isDark={isDark}>
            {securityIssues.map((sec, i) => <IssueCard key={i} issue={sec} type="security" isDark={isDark} />)}
          </Section>
        )}

        {performance && (
          <Section icon={<Zap className="w-4 h-4" />} title="Performance Analysis" color="text-yellow-400" isDark={isDark}>
            <div className={`flex gap-6 mb-3 p-3 rounded-lg ${isDark ? "bg-[#11111b]" : "bg-gray-50"}`}>
              <div>
                <span className="text-xs opacity-70">Time Complexity</span>
                <p className="text-lg font-mono font-bold">{performance.timeComplexity}</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Space Complexity</span>
                <p className="text-lg font-mono font-bold">{performance.spaceComplexity}</p>
              </div>
            </div>
            {performance.bottlenecks?.length > 0 && <ListSection icon="⚠️" title="Bottlenecks" items={performance.bottlenecks} isDark={isDark} color="text-red-400" />}
            {performance.optimizations?.length > 0 && <ListSection icon="🚀" title="Optimizations" items={performance.optimizations} isDark={isDark} color="text-green-400" />}
          </Section>
        )}

        {documentation && (
          <Section icon={<BookOpen className="w-4 h-4" />} title="Beginner-Friendly Explanation" color="text-blue-400" isDark={isDark}>
            <p className="text-sm leading-relaxed">{documentation.summary}</p>
            {documentation.suggestedComments?.length > 0 && <ListSection icon="💬" title="Suggested Comments" items={documentation.suggestedComments} isDark={isDark} color="text-blue-400" />}
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ icon, title, color, isDark, children }) {
  return (
    <div className={`rounded-xl border overflow-hidden ${isDark ? "bg-[#11111b] border-[#313244] hover:border-[#45475a]" : "bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm"
      }`}>
      <div className={`flex items-center gap-2 px-4 py-3 border-b ${isDark ? "border-[#313244]" : "border-gray-200"}`}>
        <span className={color}>{icon}</span>
        <h3 className={`text-sm font-semibold ${color}`}>{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function ListSection({ icon, title, items, isDark, color }) {
  return (
    <div className="mt-3">
      <p className={`text-xs font-semibold mb-2 ${color}`}>{icon} {title}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className={`text-sm flex items-start gap-2 ${isDark ? "text-[#a6adc8]" : "text-gray-600"}`}>
            <span className="mt-1 w-1 h-1 rounded-full bg-current opacity-40 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function IssueCard({ issue, type, isDark }) {
  const severityConfig = {
    error: { bg: isDark ? "bg-red-400/10" : "bg-red-50", text: "text-red-400", border: "border-red-400/20", badge: "ERROR" },
    warning: { bg: isDark ? "bg-yellow-400/10" : "bg-yellow-50", text: "text-yellow-400", border: "border-yellow-400/20", badge: "WARN" },
    critical: { bg: isDark ? "bg-red-400/10" : "bg-red-50", text: "text-red-400", border: "border-red-400/20", badge: "CRITICAL" },
    high: { bg: isDark ? "bg-orange-400/10" : "bg-orange-50", text: "text-orange-400", border: "border-orange-400/20", badge: "HIGH" },
    medium: { bg: isDark ? "bg-yellow-400/10" : "bg-yellow-50", text: "text-yellow-400", border: "border-yellow-400/20", badge: "MEDIUM" },
    low: { bg: isDark ? "bg-green-400/10" : "bg-green-50", text: "text-green-400", border: "border-green-400/20", badge: "LOW" },
  };

  const config = severityConfig[issue.severity] || { bg: isDark ? "bg-[#313244]/20" : "bg-gray-50", text: "text-gray-400", border: "border-gray-400/20", badge: "INFO" };

  return (
    <div className={`p-3 rounded-lg border mb-2 ${config.bg} ${config.border}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${config.text} ${isDark ? "bg-black/20" : "bg-black/5"}`}>
          {config.badge}
        </span>
        {issue.line && <span className={`text-[10px] font-mono ${isDark ? "text-[#585b70]" : "text-gray-400"}`}>Line {issue.line}</span>}
      </div>
      <p className={`font-medium text-sm ${config.text}`}>
        {type === "security" ? issue.vulnerability : issue.message}
      </p>
      {issue.description && <p className="text-xs mt-1 opacity-80">{issue.description}</p>}
      {(issue.suggestion || issue.fix) && (
        <div className={`mt-2 p-2 rounded-md text-xs font-mono ${isDark ? "bg-black/20 text-[#a6e3a1]" : "bg-black/5 text-green-600"}`}>
          💡 {issue.suggestion || issue.fix}
        </div>
      )}
    </div>
  );
}