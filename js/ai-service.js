/**
 * DEC AI Foundations - AI Service Engine
 * Simulates AI responses for the demo without needing actual API keys.
 * Prepared for LIVE_MODE injection if needed.
 */

const AIService = {
    mode: 'DEMO_MODE', // 'DEMO_MODE' | 'LIVE_MODE'
    delayMs: 1500, // Simulated network delay

    async generate(promptText, options = {}) {
        return this._simulateDelay(() => {
            return `[AI Draft]: Based on your prompt, here is a generated response. \n\nNote: This is simulated output for training purposes. In LIVE_MODE, this would hit the LLM API. \n\nReceived context length: ${promptText.length} characters.`;
        });
    },

    async analyzeData(dataset, query) {
        return this._simulateDelay(() => {
            return `[AI Data Analyst]: I have analyzed the dataset (${dataset.length || 0} rows). \n\nFinding: There are potential anomalies based on your query: "${query}". \n\nAction: Human verification recommended before publishing MIS.`;
        });
    },

    async extractFromDocument(documentText, extractionGoal) {
        return this._simulateDelay(() => {
            return `[AI Extractor]: \n- Finding 1: Related to "${extractionGoal}"\n- Source Context: Document segment analyzed.\n\nConfidence: 85% (Requires Verification)`;
        });
    },
    
    async verifyContent(content) {
        return this._simulateDelay(() => {
            return {
                safe: true,
                flags: [],
                message: "Content passed basic training safety checks."
            };
        });
    },

    _simulateDelay(callback) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(callback());
            }, this.delayMs);
        });
    }
};

window.AIService = AIService;
