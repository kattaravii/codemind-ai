const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "AIzaSyAL4-ShMNHwAxz8SLCuFb43nl07sevRqTE" });

module.exports = ai;