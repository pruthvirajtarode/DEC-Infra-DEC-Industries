/**
 * DEC AI Foundations - Document Engine
 * Manages synthetic corporate documents for Module 1.
 */

const DocumentEngine = {
    documents: {
        'tender_demo': {
            title: 'Tender Notice - Metro Line Expansion',
            type: 'Tender',
            content: `
SYNTHETIC TRAINING DOCUMENT — NOT ACTUAL DEC DATA

TENDER REF: DEC-INF-2025-044
PROJECT: Metro Line A Phase 2 Expansion

1. ELIGIBILITY
Bidders must have completed at least 3 similar infrastructure projects in the last 5 years.
Minimum average annual turnover: ₹50 Crores.

2. IMPORTANT DATES
Issue Date: 15-Jan-2026
Pre-bid Meeting: 25-Jan-2026
Submission Deadline: 10-Feb-2026

3. PENALTIES
Delay in project execution will attract a penalty of 0.5% of contract value per week, capped at 10%.

4. COMMERCIAL CONDITIONS
Prices must remain firm for 180 days.
Payment terms: 10% advance, 80% against milestones, 10% retention.
            `
        },
        'contract_demo': {
            title: 'Vendor Contract - Steel Supply',
            type: 'Contract',
            content: `
SYNTHETIC TRAINING DOCUMENT — NOT ACTUAL DEC DATA

CONTRACT NO: CTR-2025-8912
PARTIES: DEC Infra (Buyer) and Omega Machining (Supplier)

1. DELIVERABLES
Supplier shall deliver 5000 MT of TMT Rebars as per specifications.

2. PAYMENT TERMS
Payment within 45 days of invoice submission and GRN approval.
*Anomaly: Section 2.1 conflicts with Section 2 (says 60 days).*

3. LIABILITIES
Total liability is capped at the contract value.
            `
        }
    },

    getDocument(id) {
        return this.documents[id];
    },

    getAllDocuments() {
        return Object.keys(this.documents).map(key => ({
            id: key,
            title: this.documents[key].title,
            type: this.documents[key].type
        }));
    }
};

window.DocumentEngine = DocumentEngine;
