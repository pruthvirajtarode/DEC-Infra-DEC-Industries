/**
 * DEC AI Foundations - Capstone Engine (Module 4)
 */

const CapstoneEngine = {
    generateSystemPrompt(config) {
        return `You are a ${config.role} Assistant for the ${config.department} department at DEC.
Context: ${config.context}
Allowed Inputs: ${config.inputs}
Output Standard: ${config.outputs}

RULES:
1. Use only the provided information. Never invent missing values.
2. Clearly distinguish facts from assumptions.
3. ${config.customRules}
4. For numerical analysis, use the supplied dataset. Flag uncertainty.
5. Never make final decisions. Recommendations require human review.`;
    },

    evaluateAssistant(prompt) {
        let score = 25; // Default good score out of 30 for demo
        if (prompt.length < 50) score = 10;
        
        let label = "Excellent";
        if (score < 20) label = "Good";
        if (score < 15) label = "Needs Improvement";

        return { score, total: 30, label };
    }
};

window.CapstoneEngine = CapstoneEngine;
