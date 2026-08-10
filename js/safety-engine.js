/**
 * DEC AI Foundations - Safety Engine (Module 3)
 */

const SafetyEngine = {
    scenarios: [
        {
            id: 'safe-1',
            text: 'Employee Salary Spreadsheet',
            classification: 'RED',
            reason: 'Contains highly sensitive personal financial information. Never upload.'
        },
        {
            id: 'safe-2',
            text: 'Public Tender Document',
            classification: 'GREEN',
            reason: 'Publicly available information. Safe to upload for summarization.'
        },
        {
            id: 'safe-3',
            text: 'Internal Blank Procurement Template',
            classification: 'AMBER',
            reason: 'Internal format, but no sensitive data filled in. Use with caution or sanitize first.'
        }
    ],

    checkClassification(id, userChoice) {
        const scenario = this.scenarios.find(s => s.id === id);
        if(!scenario) return null;

        const isCorrect = scenario.classification === userChoice;
        return {
            isCorrect,
            correctAnswer: scenario.classification,
            reason: scenario.reason
        };
    }
};

window.SafetyEngine = SafetyEngine;
