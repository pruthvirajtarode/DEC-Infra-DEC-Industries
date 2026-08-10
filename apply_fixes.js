const fs = require('fs');

// 1. Update css/main.css for desktop sidebar collapse
let css = fs.readFileSync('css/main.css', 'utf8');
if (!css.includes('.sidebar.collapsed')) {
    css += `\n/* Desktop Sidebar Collapse */\n@media (min-width: 769px) {\n    .sidebar.collapsed {\n        margin-left: calc(-1 * var(--sidebar-width));\n    }\n}\n`;
    fs.writeFileSync('css/main.css', css);
}

// 2. Update js/state.js to make progress calculation more achievable for the demo
let stateJs = fs.readFileSync('js/state.js', 'utf8');
stateJs = stateJs.replace('count / 5', 'count / 1'); // 1 exercise per module gets 100%
fs.writeFileSync('js/state.js', stateJs);

// 3. Update js/data-engine.js to include all Curriculum datasets
const dataEngineCode = `/**
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
        
        let row = { id: \`\${type.substring(0,3).toUpperCase()}-\${1000 + index}\`, date: this._randomDate() };

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
            row.reference = \`INV-\${5000+index}\`;
            row.vendor = vendors[Math.floor(Math.random() * vendors.length)];
            row.debit = Math.floor(Math.random() * 100000);
            row.credit = 0;
            row.notes = (Math.random() < 0.05) ? "Missing Ref" : "Standard";
        } else if (type === 'attendance') {
            row.employeeId = \`EMP-\${Math.floor(Math.random() * 50) + 100}\`;
            row.checkIn = "08:00 AM";
            row.checkOut = "06:00 PM";
            row.hoursWorked = 10;
            if(Math.random() < 0.05) { row.hoursWorked = 24; row.notes = "Anomaly"; } else { row.notes = "Standard"; }
        } else if (type === 'fuel') {
            row.machineryId = \`EXC-\${Math.floor(Math.random()*10)+1}\`;
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

window.DataEngine = DataEngine;`;
fs.writeFileSync('js/data-engine.js', dataEngineCode);

// 4. Update js/app.js to fix toggle, add progress triggers, and expand Module 2 & 4
let appJs = fs.readFileSync('js/app.js', 'utf8');

// Fix toggle
appJs = appJs.replace(
    `const toggleFn = () => sidebar.classList.toggle('open');`,
    `const toggleFn = () => { if(window.innerWidth <= 768) { sidebar.classList.toggle('open'); } else { sidebar.classList.toggle('collapsed'); } };`
);

// Add progress tracking to Mod 1
appJs = appJs.replace(
    `const finalPrompt = PromptEngine.buildPrompt(role, context, task, input, constraints, format);`,
    `const finalPrompt = PromptEngine.buildPrompt(role, context, task, input, constraints, format);\n            State.markExerciseComplete('m1', 'module1');`
);

// Rewrite renderModule2 to include dataset dropdown and mini-tools
const mod2New = `function renderModule2(container) {
    container.innerHTML = \`
        <div class="mb-4">
            <span class="badge badge-info">Session 2</span>
            <h2 class="mt-4">Module 2: AI-Powered Data Analysis</h2>
            <p class="text-muted">From manual Excel to AI analysis. Work with DEC synthetic data.</p>
        </div>
        
        <div class="card mb-8">
            <div class="card-header flex justify-between items-center" style="display:flex;">
                <h3 class="card-title">Data Lab</h3>
                <div class="flex gap-2">
                    <select id="data-type-select" class="form-control" style="width: auto; padding: 0.25rem; margin-bottom: 0;">
                        <option value="procurement">Procurement (Extropeak)</option>
                        <option value="ledger">Ledger (Focus)</option>
                        <option value="attendance">Attendance (True-In)</option>
                        <option value="fuel">Fuel Logs (Tabi)</option>
                    </select>
                    <button class="btn btn-secondary btn-small" id="btn-generate-data">Generate 100 Rows</button>
                </div>
            </div>
            <div class="card-body table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table" id="data-lab-table">
                    <thead id="data-lab-head">
                        <tr><th>Waiting for data generation...</th></tr>
                    </thead>
                    <tbody id="data-lab-body">
                        <tr><td class="text-muted text-center" style="padding: 2rem;">No dataset selected. Click Generate.</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer" style="padding: 1.5rem; border-top: 1px solid #E2E8F0;">
                <button class="btn btn-primary" id="btn-analyze-data" disabled>AI Analysis & Anomaly Check</button>
            </div>
        </div>

        <div class="card mb-8 hidden" id="data-analysis-result">
            <div class="card-header">
                <h3 class="card-title">AI Analyst Report</h3>
            </div>
            <div class="card-body">
                <div class="dashboard-grid">
                    <div>
                        <div id="ai-data-insights" class="ai-result-box">
                            <span class="ai-badge verification-required">Verification Required</span>
                            <div id="ai-data-text"></div>
                        </div>
                    </div>
                    <div>
                        <h4 class="mb-4">Data Visualization</h4>
                        <div style="height: 250px;">
                            <canvas id="vendor-spend-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">Working Mini-Tools (No-Code)</h3></div>
            <div class="card-body dashboard-grid">
                <div class="ai-result-box">
                    <h4 class="mb-2">Material Rate Comparator</h4>
                    <p class="text-muted text-sm mb-4">Paste multiple vendor quotes to automatically output a comparison table.</p>
                    <button class="btn btn-secondary btn-small w-full">Open Tool</button>
                </div>
                <div class="ai-result-box">
                    <h4 class="mb-2">Manpower Cost Calculator</h4>
                    <p class="text-muted text-sm mb-4">Calculate site manpower costs based on True-In attendance logs.</p>
                    <button class="btn btn-secondary btn-small w-full">Open Tool</button>
                </div>
            </div>
        </div>
    \`;

    setTimeout(() => {
        let currentData = [];
        document.getElementById('btn-generate-data')?.addEventListener('click', () => {
            const type = document.getElementById('data-type-select').value;
            currentData = DataEngine.generateDataset(type, 100);
            
            if(currentData.length > 0) {
                const keys = Object.keys(currentData[0]);
                document.getElementById('data-lab-head').innerHTML = '<tr>' + keys.map(k => \`<th>\${k.toUpperCase()}</th>\`).join('') + '</tr>';
                document.getElementById('data-lab-body').innerHTML = currentData.map(row => 
                    \`<tr class="\${row.notes && row.notes !== 'Standard' ? 'danger-bg' : ''}">
                        \${keys.map(k => \`<td>\${row[k]}</td>\`).join('')}
                    </tr>\`
                ).join('');
            }
            
            document.getElementById('btn-analyze-data').disabled = false;
            showToast(\`Generated 100 rows of synthetic \${type} data.\`, 'success');
        });

        document.getElementById('btn-analyze-data')?.addEventListener('click', async () => {
            const resultCard = document.getElementById('data-analysis-result');
            resultCard.classList.remove('hidden');
            
            const response = await AIService.analyzeData(currentData, "Find anomalies");
            document.getElementById('ai-data-text').innerHTML = \`<p>\${response.replace(/\\n/g, '<br>')}</p>\`;
            
            // Mark progress
            State.markExerciseComplete('m2', 'module2');
            
            // Generate basic chart
            const labels = currentData.slice(0,5).map(r => r.id);
            const dataArr = currentData.slice(0,5).map(r => r.totalAmount || r.debit || r.hoursWorked || r.fuelConsumedLiters || 1);
            AnalysisEngine.renderChart('vendor-spend-chart', 'bar', 'Sample Values', labels, dataArr);
        });
    }, 100);
}`;
appJs = appJs.replace(/function renderModule2[\s\S]*?function renderModule3/, mod2New + '\n\nfunction renderModule3');

// Update Module 4 Capstone departments
appJs = appJs.replace(
    `<option>Procurement</option><option>Projects</option><option>Finance</option><option>HR</option>`,
    `<option>HR (Recruitment)</option><option>Accounts (Reconciliation)</option><option>Sales (Proposal)</option><option>Procurement (Quotes)</option><option>Planning/Sites (Reporting)</option><option>Admin/IT (SOP)</option>`
);
// Mark Mod 4 progress
appJs = appJs.replace(
    `showToast('Assistant configuration compiled!', 'success');`,
    `showToast('Assistant configuration compiled!', 'success');\n            State.markExerciseComplete('m4', 'module4');`
);

fs.writeFileSync('js/app.js', appJs);
console.log('Update script completed successfully.');
