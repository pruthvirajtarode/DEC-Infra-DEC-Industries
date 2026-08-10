/**
 * DEC AI Foundations - Prompt Engine
 * Manages the prompt builder, standard prompt library, and module 1 challenges.
 */

const PromptEngine = {
    challenges: [
        {
            id: 'chal-1',
            title: 'Professional Email',
            instruction: 'Write a prompt for an AI to draft a polite but firm email to Alpha Cement reminding them of a delayed delivery (PO-9921) that was due on 10-Feb.',
            inputContext: 'PO-9921, Vendor: Alpha Cement, Due: 10-Feb, Status: Delayed 3 days',
            expectedResult: 'A prompt specifying role (Procurement), context (Delayed PO), task (Write email), tone (Polite but firm).'
        },
        {
            id: 'chal-2',
            title: 'Meeting Minutes',
            instruction: 'Create a prompt to summarize messy notes from the Metro Line A steering committee into structured meeting minutes.',
            inputContext: 'Messy bullet points discussing budget, timeline, and risk issues.',
            expectedResult: 'A prompt specifying role (Project Admin), output format (Action items, Decisions made, Risks).'
        },
        {
            id: 'chal-3',
            title: 'Vendor Comparison',
            instruction: 'Ask the AI to compare three vendor quotes for 5000MT of steel, taking into account payment terms and delivery time.',
            inputContext: 'Vendor A, B, C quotes.',
            expectedResult: 'A structured prompt explicitly asking for a comparison table and highlighting risks.'
        }
        // Additional challenges would be loaded from a JSON file in a full prod version
    ],

    buildPrompt(role, context, task, input, constraints, format) {
        let prompt = [];
        if (role) prompt.push(`ROLE: ${role}`);
        if (context) prompt.push(`CONTEXT: ${context}`);
        if (task) prompt.push(`TASK: ${task}`);
        if (constraints) prompt.push(`CONSTRAINTS: ${constraints}`);
        if (format) prompt.push(`OUTPUT FORMAT: ${format}`);
        if (input) prompt.push(`\nINPUT DATA:\n${input}`);
        
        return prompt.join('\n\n');
    },

    getChallenge(id) {
        return this.challenges.find(c => c.id === id);
    },

    evaluatePrompt(promptText) {
        // A simple heuristic evaluation for demo purposes
        let score = 0;
        let feedback = [];
        
        const text = promptText.toLowerCase();
        
        if (text.includes('act as') || text.includes('you are') || text.includes('role')) {
            score += 25;
            feedback.push("✅ Good job establishing a Role.");
        } else {
            feedback.push("❌ Missing a Role (e.g., 'Act as a Procurement Manager').");
        }
        
        if (text.includes('context') || text.length > 50) {
            score += 25;
            feedback.push("✅ Sufficient context provided.");
        } else {
            feedback.push("❌ Needs more context. Why are we doing this?");
        }

        if (text.includes('format') || text.includes('table') || text.includes('bullet')) {
            score += 25;
            feedback.push("✅ Output format specified.");
        } else {
            feedback.push("❌ Specify how you want the output (e.g., 'as a table').");
        }
        
        if (text.includes('do not') || text.includes('must') || text.includes('constraints')) {
            score += 25;
            feedback.push("✅ Constraints provided.");
        } else {
            feedback.push("❌ Add constraints to limit hallucinations (e.g., 'Do not invent missing data').");
        }

        return { score, feedback };
    }
};

window.PromptEngine = PromptEngine;
