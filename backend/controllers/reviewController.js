const ai = require("../config/gemini");
const Review = require("../models/Review");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const callGemini = async (prompt) => {
  const models = [
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash-lite",
    "gemini-flash-lite-latest",
  ];

  for (const model of models) {
    try {
      console.log(`🔄 Trying: ${model}...`);
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });
      const text = response.text;
      if (text && text.trim()) {
        console.log(`✅ Success: ${model}`);
        return text;
      }
    } catch (error) {
      const msg = error.message || "";
      if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
        console.log(`⏭️ ${model} quota full`);
        continue;
      }
      console.log(`⚠️ ${model}: ${msg.substring(0, 80)}`);
    }
    await sleep(500);
  }
  throw new Error("All models failed");
};

const reviewCode = async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required." });
  }

  const prompt = `Review this ${language} code. Return ONLY JSON, no markdown:
{
  "overview": "summary",
  "syntaxErrors": [],
  "securityIssues": [],
  "performance": {"timeComplexity": "O(1)", "spaceComplexity": "O(1)", "bottlenecks": [], "optimizations": []},
  "codeQuality": {"score": 5, "strengths": [], "improvements": [], "bestPractices": []},
  "documentation": {"summary": "", "suggestedComments": []}
}
Code:
${code}`;

  try {
    const rawText = await callGemini(prompt);

    let cleaned = rawText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/gi, "")
      .trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}") + 1;

    if (start === -1 || end <= start) {
      return res.status(500).json({ error: "Invalid response format" });
    }

    cleaned = cleaned.substring(start, end);
    const result = JSON.parse(cleaned);

    try {
      await new Review({ language, code, reviewResult: result }).save();
    } catch (e) { }

    res.json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "All AI models busy. Try again in a minute." });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await Review.find().sort({ createdAt: -1 }).limit(20);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history." });
  }
};

module.exports = { reviewCode, getHistory };