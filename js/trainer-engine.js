/**
 * DEC AI Foundations - Trainer & Demo Engine
 */

const TrainerEngine = {
    notes: {
        'module1': [
            "Learning Objective: Shift participants from simple Chat to Structured Prompting.",
            "Common Mistake: Forgetting to give the AI a role.",
            "Rescue Prompt: 'If they get stuck, suggest using the acronym R-C-T-O (Role, Context, Task, Output)'."
        ],
        'module2': [
            "Learning Objective: Demonstrate how AI accelerates Excel analysis.",
            "Demo Instruction: Click Generate Dataset first, then run the AI Analyst.",
            "Talking Point: Highlight that AI spotted the mismatch instantly, but still needs a human to fix it."
        ]
    },

    getNotes(moduleId) {
        return this.notes[moduleId] || ["No specific trainer notes for this module."];
    },

    startFlagshipDemo() {
        // Simulates the 'DEC AI WORKFLOW SIMULATOR' executive demo flow
        const stages = [
            { id: 1, text: "Extracting requirements from Metro Line A Tender..." },
            { id: 2, text: "Generating synthetic procurement data (20 rows)..." },
            { id: 3, text: "AI Data Analyst identifying spend anomalies..." },
            { id: 4, text: "Generating visual Spend by Vendor chart..." },
            { id: 5, text: "Applying Safety Checks (Data Classification)..." },
            { id: 6, text: "Compiling Procurement Assistant System Prompt..." }
        ];
        return stages;
    }
};

window.TrainerEngine = TrainerEngine;
