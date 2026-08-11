/**
 * DEC AI Foundations - Data Engine
 * Generates synthetic datasets for training.
 */

const DataEngine = {
    generateDataset(type, rowCount = 100) {
        const data = [];
        for(let i=0; i<rowCount; i++) {
            data.push(this._generateRow(type, i));
        }
        return data;
    },

    convertToCSV(data) {
        if (!data || !data.length) return "";
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(",")];
        for (const row of data) {
            const values = headers.map(header => {
                const escaped = ('' + (row[header] ?? '')).replace(/"/g, '""');
                if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('"')) {
                    return `"${escaped}"`;
                }
                return escaped;
            });
            csvRows.push(values.join(","));
        }
        return csvRows.join("\n");
    },

    _generateRow(type, index) {
        const vendors = ["DEC BuildCorp", "DEC Steel Pvt Ltd", "Alpha Cement Works", "Omega Heavy Machineries", "Siddhivinayak Quarry", "SuperBuild Bricks", "Unknown_Vendor"];
        const projects = ["Metro Line Line-3", "Highway NH-48 Expansion", "Bridge Overpass Site-A", "Warehouse Wing-C", "Corporate HQ Renovation"];
        const items = ["OPC 53 Cement Bags", "Structural TMT Steel Rebars", "Crushed Aggregates 20mm", "River Sand", "Ready Mix Concrete (M30)", "Flyash Bricks"];
        const accounts = ["Acc-Payables-Vendors", "Acc-Receivables-Clients", "Site Petty Cash Account", "Equipment Capital Outflow", "GST Input Pool Account"];
        const materials = ["Cement", "Steel", "Aggregates", "Sand", "Concrete", "Bricks"];
        
        let row = { id: `${type.substring(0,3).toUpperCase()}-${1000 + index}`, date: this._randomDate() };

        // 1. Procurement Role Datasets
        if (type === 'procurement_quotes') {
            row = {
                quotationId: `QTN-2026-${100 + index}`,
                vendorName: vendors[index % vendors.length],
                materialItem: items[index % items.length],
                quantityQuoted: (index * 200 + 150),
                unitRateINR: (250 + (index % 5) * 85),
                deliveryLeadTimeDays: 3 + (index % 10),
                complianceStatus: (index === 3 || index === 8) ? "Non-Compliant" : "Compliant",
                notes: (index === 3) ? "Rate exceeds standard card by 24%" : (index === 8 ? "Missing lead time assurance" : "Standard bid approved")
            };
        } else if (type === 'procurement_pos') {
            row = {
                poNumber: `PO-2026-${500 + index}`,
                date: this._randomDate(),
                vendorName: vendors[index % vendors.length],
                projectName: projects[index % projects.length],
                poValueINR: 150000 + (index * 42000),
                approvedBy: (index % 3 === 0) ? "Vipul Sonawane" : "Pruthviraj Tarode",
                budgetCode: `BGT-DEC-${200 + index}`,
                status: (index % 7 === 0) ? "Pending Audit" : "Approved"
            };
        } else if (type === 'procurement_delivery') {
            const expected = 100 + (index * 50);
            const received = (index % 9 === 0) ? expected - 15 : expected;
            row = {
                challanNumber: `CHL-90${100 + index}`,
                poRef: `PO-2026-${500 + index}`,
                date: this._randomDate(),
                itemSupplied: items[index % items.length],
                challanQty: expected,
                receivedQty: received,
                mismatchFound: (expected !== received) ? "YES" : "NO",
                gateEntryNo: `GT-2026-${1000 + index}`
            };
        } else if (type === 'procurement_rates') {
            const approved = 450 + (index % 4) * 120;
            const invoiced = (index % 6 === 0) ? approved + 80 : approved;
            row = {
                itemCode: `DEC-MAT-${10 + index}`,
                itemName: materials[index % materials.length],
                approvedRateINR: approved,
                invoicedRateINR: invoiced,
                vendorName: vendors[index % vendors.length],
                overchargeFlag: (invoiced > approved) ? "FLAGGED" : "OK",
                auditedBy: "Finance Auditor"
            };
        }
        
        // 2. Finance Role Datasets
        else if (type === 'finance_ledger') {
            row = {
                transactionId: `TXN-${10000 + index}`,
                date: this._randomDate(),
                accountName: accounts[index % accounts.length],
                referenceNo: `INV-${3000 + index}`,
                vendorName: vendors[index % vendors.length],
                debitINR: (index % 2 === 0) ? 25000 + index * 1250 : 0,
                creditINR: (index % 2 !== 0) ? 25000 + index * 1250 : 0,
                remarks: (index % 12 === 0) ? "Unreconciled - Missing Invoice Attachment" : "Standard transaction matched"
            };
        } else if (type === 'finance_bank') {
            row = {
                bankTxnId: `BANK-${90000 + index}`,
                date: this._randomDate(),
                txnDescription: (index % 2 === 0) ? `RTGS Transfer to ${vendors[index % vendors.length]}` : `NEFT Payment Received - Client ${index}`,
                debitINR: (index % 2 === 0) ? 50000 + index * 2000 : 0,
                creditINR: (index % 2 !== 0) ? 100000 + index * 5000 : 0,
                reconciliationStatus: (index === 5 || index === 11) ? "Unmatched" : "Reconciled",
                matchReference: (index === 5 || index === 11) ? "N/A" : `INV-${3000 + index}`
            };
        } else if (type === 'finance_gst') {
            const billValue = 100000 + index * 8000;
            const calculatedGst = Math.round(billValue * 0.18);
            const portalGst = (index % 8 === 0) ? calculatedGst - 2500 : calculatedGst;
            row = {
                invoiceNumber: `INV-GST-2026-${100 + index}`,
                vendorName: vendors[index % vendors.length],
                vendorGSTIN: `27AAACD${2000 + index}A1Z${index % 9}`,
                taxableValueINR: billValue,
                gstCalculatedINR: calculatedGst,
                gstOnPortalINR: portalGst,
                itcEligibility: (calculatedGst !== portalGst) ? "Blocked / Review" : "Eligible",
                mismatchDelta: calculatedGst - portalGst
            };
        } else if (type === 'finance_petty') {
            row = {
                voucherId: `SITE-PV-${200 + index}`,
                date: this._randomDate(),
                spentDescription: (index % 3 === 0) ? "Local Conveyance - Site Engineer" : (index % 3 === 1 ? "Emergency Pipe Repair Parts" : "Refreshments for Audit Team"),
                amountINR: 450 + (index * 135),
                cashierName: `Supervisor ${index % 4}`,
                approvedStatus: (index % 10 === 0) ? "Rejected - Missing Bill Receipt" : "Approved"
            };
        }
        
        // 3. Planning Role Datasets
        else if (type === 'planning_progress') {
            const target = 150 + index * 10;
            const actual = (index % 7 === 0) ? target - 45 : target + 5;
            row = {
                date: this._randomDate(),
                projectName: projects[index % projects.length],
                constructionActivity: (index % 3 === 0) ? "Foundation Concrete Pouring" : (index % 3 === 1 ? "TMT Rebars Fixing" : "Excavation and Backfill"),
                targetQuantityM3: target,
                actualQuantityM3: actual,
                manpowerCount: 15 + (index % 5) * 6,
                progressVariancePct: Math.round(((actual - target) / target) * 100),
                notes: (actual < target) ? "Delayed due to concrete mix arrival delay" : "Target completed ahead of schedule"
            };
        } else if (type === 'planning_equipment') {
            const fuel = 50 + (index % 8) * 22;
            const hours = 4 + (index % 8) * 1.5;
            row = {
                equipmentId: `EQP-EXCAVATOR-${101 + index}`,
                operatorName: `Operator ${index % 5}`,
                operatingHours: hours,
                fuelConsumedLiters: fuel,
                fuelRatioLHr: parseFloat((fuel / hours).toFixed(2)),
                anomalyAlert: (fuel / hours > 25) ? "HIGH FUEL CONSUMPTION ALERT" : "Normal",
                maintenanceDue: (index % 9 === 0) ? "IMMEDIATE MAINTENANCE DUE" : "Good"
            };
        } else if (type === 'planning_manpower') {
            row = {
                date: this._randomDate(),
                contractorAgency: `Agency ${index % 3 + 1}`,
                unskilledHelperCount: 20 + (index % 4) * 8,
                skilledMasonCount: 8 + (index % 3) * 4,
                supervisorCount: 2,
                dailyBillingINR: 18000 + index * 1150,
                headcountMismatch: (index % 11 === 0) ? "YES" : "NO",
                siteGateEntryCount: (index % 11 === 0) ? 28 : 30 + (index % 4) * 8 + (index % 3) * 4
            };
        } else if (type === 'planning_qa') {
            const strength = 22 + (index % 5) * 3.5;
            row = {
                cubeId: `QA-CUBE-${1000 + index}`,
                concreteGrade: (index % 2 === 0) ? "M25" : "M30",
                castingDate: this._randomDate(),
                testAgeDays: 28,
                loadAtFailureKN: 500 + index * 30,
                compressiveStrengthNmm2: strength,
                qaStatus: (strength < 25) ? "FAIL - REJECT LAB RUN" : "PASS"
            };
        }
        
        // 4. HR Role Datasets
        else if (type === 'hr_attendance') {
            const hrs = 8 + (index % 5);
            row = {
                employeeId: `EMP-${1000 + index}`,
                employeeName: `Employee ${index % 12}`,
                department: (index % 3 === 0) ? "Planning" : (index % 3 === 1 ? "Procurement" : "Accounts"),
                hoursWorked: hrs,
                overtimeHours: Math.max(0, hrs - 8),
                overtimeAuthorized: (hrs > 8 && index % 2 === 0) ? "YES" : (hrs > 8 ? "NO" : "N/A"),
                attendanceStatus: "Present"
            };
        } else if (type === 'hr_candidates') {
            const score = 55 + (index % 5) * 9;
            row = {
                candidateId: `CAN-2026-${300 + index}`,
                candidateName: `Applicant Name ${index}`,
                roleApplied: (index % 3 === 0) ? "Assistant Site Manager" : (index % 3 === 1 ? "Purchase Officer" : "Senior Accountant"),
                experienceYears: 2 + (index % 4) * 2,
                scorecardRating: `${score}/100`,
                interviewOutcome: (score >= 70) ? "Shortlisted for Round 2" : "Rejected",
                hrRemarks: (score >= 70) ? "Strong technical baseline" : "Experience doesn't match JD core criteria"
            };
        } else if (type === 'hr_incidents') {
            row = {
                incidentReportId: `INC-2026-${50 + index}`,
                date: this._randomDate(),
                siteLocation: projects[index % projects.length],
                severityLevel: (index % 5 === 0) ? "Medium" : (index % 8 === 0 ? "High" : "Low"),
                incidentType: (index % 3 === 0) ? "Slip/Trip" : (index % 3 === 1 ? "Equipment Collision" : "Material Fall"),
                daysLostFromWork: (index % 8 === 0) ? 4 : 0,
                incidentAuditStatus: (index % 6 === 0) ? "Open - Investigation Pending" : "Resolved"
            };
        } else if (type === 'hr_training') {
            const daysOffset = (index % 5 === 0) ? -20 : 150;
            const expDate = new Date();
            expDate.setDate(expDate.getDate() + daysOffset);
            row = {
                employeeId: `EMP-${1000 + index}`,
                fullName: `Staff Member ${index}`,
                safetyCourseName: (index % 2 === 0) ? "Heights & Scaffolding Induction" : "Confined Spaces Safety",
                completionDate: this._randomDate(),
                certificationExpiry: expDate.toISOString().split('T')[0],
                status: (daysOffset < 0) ? "EXPIRED" : "ACTIVE"
            };
        }
        
        return row;
    },

    _randomDate() {
        const start = new Date(2026, 0, 1);
        const end = new Date(2026, 5, 30);
        const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return d.toISOString().split('T')[0];
    }
};

window.DataEngine = DataEngine;