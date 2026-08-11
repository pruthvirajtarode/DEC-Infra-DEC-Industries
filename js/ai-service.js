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
            const docLower = documentText.toLowerCase();
            
            let extraction = `[AI Extractor]:\nScanning document for your query...\n\n`;
            
            if (docLower.includes("metro line a phase 2")) {
                extraction += `**Extracted Clauses (Tender):**\n- Penalties: 0.5% per week (capped at 10%).\n- Payment: 10% advance, 80% milestones, 10% retention.`;
            } 
            else if (docLower.includes("ctr-2025-8912")) {
                extraction += `**Extracted Clauses (Contract):**\n- Payment: 45 days (⚠️ Anomaly: Sec 2.1 says 60 days).\n- Liability: Capped at contract value.\n- Deliverables: 5000 MT TMT Rebars.`;
            }
            else if (docLower.includes("sub-ew-2026-001")) {
                extraction += `**Extracted Data (Quote):**\n- Base Cost: ₹3,750,000 (15k Cu.M @ ₹250)\n- Transport: ₹500,000\n- Timeline: 25 working days.`;
            }
            else if (docLower.includes("hr-pol-042")) {
                extraction += `**Extracted Rules (HR Policy):**\n- Safety: Level 2 PPE mandatory in active zones.\n- Leave: 24 Annual, 7 Sick, 5 Casual.\n- Reporting: Incident reporting within 12 hours via Form SS-1.`;
            }
            else if (docLower.includes("eng-spec-hvac-99")) {
                extraction += `**Extracted Specs (Engineering):**\n- Chillers: 2x 500 TR, Min COP 6.1.\n- Testing: 1.5x pressure for 24 hours.\n- Insulation: 50mm Nitrile rubber.`;
            } else {
                 extraction += `- Finding: Could not confidently extract specific clauses matching your query.\n- Action: Please refine your prompt.`;
            }

            return `${extraction}\n\nConfidence: 94% (Requires Human Verification)`;
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
