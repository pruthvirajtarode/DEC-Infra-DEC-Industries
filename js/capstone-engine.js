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

    evaluateAssistant(config) {
        const breakdown = {
            role: 5,
            context: 5,
            inputs: 5,
            outputs: 5,
            safety: 5
        };

        // Role Score (out of 5)
        if (!config.role || config.role.trim().length === 0) breakdown.role = 0;
        else if (config.role.trim().length < 8) breakdown.role = 3;
        else if (config.role.trim().length < 15) breakdown.role = 4;

        // Task & Context Score (out of 5)
        if (!config.context || config.context.trim().length === 0) breakdown.context = 0;
        else if (config.context.trim().length < 15) breakdown.context = 3;
        else if (config.context.trim().length < 35) breakdown.context = 4;

        // Inputs Score (out of 5)
        if (!config.inputs || config.inputs.trim().length === 0) breakdown.inputs = 0;
        else if (config.inputs.trim().length < 10) breakdown.inputs = 3;
        else if (config.inputs.trim().length < 25) breakdown.inputs = 4;

        // Outputs Score (out of 5)
        if (!config.outputs || config.outputs.trim().length === 0) breakdown.outputs = 0;
        else if (config.outputs.trim().length < 10) breakdown.outputs = 3;
        else if (config.outputs.trim().length < 25) breakdown.outputs = 4;

        // Safety Score (out of 5)
        if (!config.customRules || config.customRules.trim().length === 0) breakdown.safety = 0;
        else if (config.customRules.trim().length < 15) breakdown.safety = 3;
        else if (config.customRules.trim().length < 30) breakdown.safety = 4;

        const score = breakdown.role + breakdown.context + breakdown.inputs + breakdown.outputs + breakdown.safety;
        
        let label = "Excellent (Production Ready)";
        if (score < 20) label = "Good (Ready with minor edits)";
        if (score < 15) label = "Needs Improvement (Vague prompts)";

        return { score, total: 25, breakdown, label };
    }
};

window.CapstoneEngine = CapstoneEngine;
