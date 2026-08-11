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
        },
        'quote_demo': {
            title: 'Subcontractor Quote - Earthworks',
            type: 'Quote',
            content: `
SYNTHETIC TRAINING DOCUMENT — NOT ACTUAL DEC DATA

QUOTE REF: SUB-EW-2026-001
CONTRACTOR: TerraFirma Excavations Pvt Ltd

1. SCOPE OF WORK
Excavation and earth removal for Site B foundation. Estimated volume: 15,000 Cubic Meters.

2. PRICING
Base Rate: ₹250 per Cu.M
Total Base Cost: ₹3,750,000
Transportation (Disposal up to 10km): ₹500,000
Taxes: 18% GST Extra

3. TIMELINE & CONDITIONS
Work to commence within 7 days of PO. 
Expected duration: 25 working days.
Validity of Quote: 30 days from submission.
            `
        },
        'quote_demo_2': {
            title: 'Subcontractor Quote - Earthworks (Alt)',
            type: 'Quote',
            content: `
SYNTHETIC TRAINING DOCUMENT — NOT ACTUAL DEC DATA

QUOTE REF: ALT-EW-2026-042
CONTRACTOR: GlobalDiggers Corp

1. SCOPE OF WORK
Excavation and earth removal for Site B foundation. Estimated volume: 15,000 Cubic Meters.

2. PRICING
Base Rate: ₹230 per Cu.M
Total Base Cost: ₹3,450,000
Transportation (Disposal up to 20km): ₹800,000
Taxes: 18% GST Extra

3. TIMELINE & CONDITIONS
Work to commence within 14 days of PO. 
Expected duration: 35 working days.
Penalty: ₹10,000 per day of delay beyond expected duration.
            `
        },
        'contract_demo_2': {
            title: 'Vendor Contract - Cement Supply',
            type: 'Contract',
            content: `
SYNTHETIC TRAINING DOCUMENT — NOT ACTUAL DEC DATA

CONTRACT NO: CTR-2025-9055
PARTIES: DEC Infra (Buyer) and SolidBuild Cement (Supplier)

1. DELIVERABLES
Supplier shall deliver 10,000 MT of OPC 53 Grade Cement.

2. PAYMENT TERMS
Advance payment of 20%, remaining 80% within 30 days of GRN approval.
Red Flag Clause: Failure to pay within 30 days incurs 2% monthly interest.

3. LIABILITIES
Liability is uncapped in case of structural failure due to poor cement quality.
            `
        },
        'policy_demo': {
            title: 'HR Policy - Site Safety & Leave',
            type: 'Policy',
            content: `
SYNTHETIC TRAINING DOCUMENT — NOT ACTUAL DEC DATA

POLICY REF: HR-POL-042
EFFECTIVE DATE: 01-Jan-2026

1. SITE SAFETY COMPLIANCE
All field personnel must wear Level 2 PPE (Hard hat, high-vis vest, steel-toe boots) at all active construction zones.
Failure to comply will result in a formal warning for the first offense, and suspension for repeat offenses.

2. LEAVE ALLOWANCE
Site engineers are entitled to 24 Annual Leaves, 7 Sick Leaves, and 5 Casual Leaves per calendar year.
Leaves exceeding 3 consecutive days require approval from the Project Manager at least 1 week in advance.

3. INCIDENT REPORTING
Any workplace injury, regardless of severity, must be reported to the Site Safety Officer within 12 hours using Form SS-1.
            `
        },
        'specs_demo': {
            title: 'Engineering Specs - HVAC Installation',
            type: 'Specification',
            content: `
SYNTHETIC TRAINING DOCUMENT — NOT ACTUAL DEC DATA

DOCUMENT REF: ENG-SPEC-HVAC-99
SYSTEM: Central Chiller Plant - Tower C

1. EQUIPMENT REQUIREMENTS
Primary Chillers: 2x 500 TR Water-Cooled Centrifugal Chillers.
Efficiency: Minimum COP of 6.1 at full load.
Refrigerant: R-134a or equivalent low-GWP alternative.

2. INSTALLATION STANDARDS
All chilled water piping must be Schedule 40 MS pipe with 50mm Nitrile rubber insulation.
Vibration isolators must be installed on all rotating equipment with a minimum deflection of 25mm.

3. TESTING & COMMISSIONING
System must pass a pressure test at 1.5x working pressure for 24 hours.
Air balancing report must be submitted prior to final handover.
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
