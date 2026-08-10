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

    _generateRow(type, index) {
        const vendors = ["DEC BuildCorp", "DEC Steel", "Alpha Cement", "Omega Machining", "Vendor_Unknown"];
        const projects = ["Metro Line A", "Highway 42", "Factory Unit B", "DEC HQ Renovation"];
        
        let row = { id: `${type.substring(0,3).toUpperCase()}-${1000 + index}`, date: this._randomDate() };

        if (type === 'procurement') {
            const qty = Math.floor(Math.random() * 500) + 10;
            const price = Math.floor(Math.random() * 5000) + 100;
            row.vendor = vendors[Math.floor(Math.random() * vendors.length)];
            row.project = projects[Math.floor(Math.random() * projects.length)];
            row.item = "Construction Material";
            row.quantity = qty;
            row.unitPrice = price;
            if(Math.random() < 0.05) {
                row.totalAmount = (qty * price) + 10000;
                row.notes = "Calculation Error Injected";
            } else {
                row.totalAmount = qty * price;
                row.notes = "Standard";
            }
        } else if (type === 'ledger') {
            row.account = "Acc-Payables";
            row.reference = `INV-${5000+index}`;
            row.vendor = vendors[Math.floor(Math.random() * vendors.length)];
            row.debit = Math.floor(Math.random() * 100000);
            row.credit = 0;
            row.notes = (Math.random() < 0.05) ? "Missing Ref" : "Standard";
        } else if (type === 'attendance') {
            row.employeeId = `EMP-${Math.floor(Math.random() * 50) + 100}`;
            row.checkIn = "08:00 AM";
            row.checkOut = "06:00 PM";
            row.hoursWorked = 10;
            if(Math.random() < 0.05) { row.hoursWorked = 24; row.notes = "Anomaly"; } else { row.notes = "Standard"; }
        } else if (type === 'fuel') {
            row.machineryId = `EXC-${Math.floor(Math.random()*10)+1}`;
            row.fuelConsumedLiters = Math.floor(Math.random()*50)+20;
            row.operatingHours = Math.floor(Math.random()*8)+1;
            if(Math.random() < 0.05) { row.fuelConsumedLiters = 500; row.notes = "Anomaly"; } else { row.notes = "Standard"; }
        }
        return row;
    },

    _randomDate() {
        const start = new Date(2025, 0, 1);
        const end = new Date(2025, 11, 31);
        const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return d.toISOString().split('T')[0];
    }
};

window.DataEngine = DataEngine;