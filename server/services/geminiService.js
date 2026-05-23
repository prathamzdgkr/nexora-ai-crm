const { GoogleGenAI } = require("@google/genai");

// Initialize using the new SDK syntax
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const analyzeLeadQuality = async (lead) => {
    try {
        const prompt = `
        You are an elite AI Sales Strategist using this AI CRM platfrom. 
        Your role is to assist the sales professional using this CRM by analyzing their specific prospect and providing tactical advice to help them win the deal.

        LEAD DATA:
        - Lead Name: ${lead.name || 'Valued Prospect'}
        - Company: ${lead.company || 'Unknown Company'}
        - Current Status: ${lead.status || 'New'}

        ANALYSIS RULES:
        1. "leadScore" (1-100): Base this on the company's presumed market size and their current status. 'Qualified' and 'Contacted' leads should score higher than 'New' leads.
        2. "probability": Estimate a realistic win-percentage based heavily on the Current Status (e.g., 'New' = 10-20%, 'Qualified' = 60-80%).
        3. "suggestedAction": Provide one highly tactical, specific next step the user should take to move this prospect to the next pipeline stage.
        4. "followUpMessage": Write a concise, professional 2-paragraph email draft for the user to send to the prospect, tailored to their status.

        Return EXACTLY this JSON structure:
        {
            "leadScore": 0,
            "probability": "0%",
            "suggestedAction": "string",
            "followUpMessage": "string"
        }
        `;

        // New SDK generation method
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        
        // Clean the response just in case Gemini adds markdown codeblocks
        const text = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return { 
            leadScore: "N/A", 
            probability: "N/A", 
            suggestedAction: "AI analysis temporarily unavailable due to server error.",
            followUpMessage: ""
        };
    }
};

module.exports = { analyzeLeadQuality };