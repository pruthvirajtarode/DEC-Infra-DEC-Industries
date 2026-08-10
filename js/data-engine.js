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
        // Base generators for synthetic DEC data
        const vendors = ["DEC BuildCorp", "DEC Steel", "Alpha Cement", "Omega Machining", "Vendor_Unknown"];
        const projects = ["Metro Line A", "Highway 42", "Factory Unit B", "DEC HQ Renovation"];
        
        let row = { id: `REC-${1000 + index}`, date: this._randomDate() };

        if (type === 'procurement') {
            const qty = Math.floor(Math.random() * 500) + 10;
            const price = Math.floor(Math.random() * 5000) + 100;
            row.vendor = vendors[Math.floor(Math.random() * vendors.length)];
            row.project = projects[Math.floor(Math.random() * projects.length)];
            row.item = "Construction Material";
            row.quantity = qty;
            row.unitPrice = price;
            // Introduce intentional error 5% of time
            if(Math.random() < 0.05) {
                row.totalAmount = (qty * price) + 10000; // Anomaly
                row.notes = "Calculation Error Injected";
            } else {
                row.totalAmount = qty * price;
                row.notes = "Standard";
            }
        }
        return row;
    },

    _randomDate() {
        const start = new Date(2025, 0, 1);
        const end = new Date(2025, 11, 31);
        const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return d.toISOString().split('T')[0];
    },

    toCSV(dataset) {
        if (!dataset || !dataset.length) return "";
        const headers = Object.keys(dataset[0]);
        const csvRows = [headers.join(",")];
        for (const row of dataset) {
            const values = headers.map(h => {
                const val = row[h];
                return typeof val === 'string' ? `"${val}"` : val;
            });
            csvRows.push(values.join(","));
        }
        return csvRows.join("\n");
    }
};

window.DataEngine = DataEngine;
