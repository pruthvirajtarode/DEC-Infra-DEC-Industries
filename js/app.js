/**
 * DEC AI Foundations - Main App Initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize State
    State.init();

    // 2. Setup UI listeners
    setupUI();

    // 3. Register Routes (Placeholders for now)
    Router.add('/dashboard', renderDashboard);
    Router.add('/module1', renderModule1);
    Router.add('/module2', renderModule2);
    Router.add('/module3', renderModule3);
    Router.add('/module4', renderModule4);
    Router.add('/prompt-library', (container) => container.innerHTML = '<h2>Prompt Library - Coming Soon</h2>');
    Router.add('/resources', (container) => container.innerHTML = '<h2>Resource Center - Coming Soon</h2>');
    Router.add('/trainer', renderTrainerDashboard);
    Router.add('/flagship-demo', renderFlagshipDemo);

    // 4. Start Router
    Router.init();
});

function setupUI() {
    // Mobile Sidebar Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const toggleBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    const toggleFn = () => sidebar.classList.toggle('open');
    if (mobileBtn) mobileBtn.addEventListener('click', toggleFn);
    if (toggleBtn) toggleBtn.addEventListener('click', toggleFn);

    // Trainer Mode Toggle
    const trainerBtn = document.getElementById('btn-trainer-mode');
    if (trainerBtn) {
        trainerBtn.addEventListener('click', () => {
            State.toggleTrainerMode();
            showToast('Trainer Mode ' + (State.get('trainerMode') ? 'Enabled' : 'Disabled'), 'info');
        });
    }
}

function renderDashboard(container) {
    container.innerHTML = `
        <div class="dashboard-hero card mb-8" style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-lighter) 100%); color: white;">
            <h1 style="color: white; font-size: 2.5rem; margin-bottom: 1rem;">DEC AI FOUNDATIONS</h1>
            <h3 style="color: var(--accent); font-family: var(--font-body); font-weight: 500; font-size: 1.25rem;">"From Everyday AI to a Working Department AI Assistant"</h3>
            <p style="margin-top: 1.5rem; max-width: 800px; opacity: 0.9; font-size: 1.1rem;">
                A hands-on AI learning environment designed around realistic construction, infrastructure, manufacturing, procurement, finance, project, HR, and operations workflows.
            </p>
            <div class="flex gap-4 mt-8">
                <button class="btn btn-accent" onclick="window.location.hash='/module1'">START PROGRAM</button>
                <button class="btn btn-secondary" style="border-color: rgba(255,255,255,0.5); color: white;" onclick="window.location.hash='/flagship-demo'">VIEW CAPSTONE</button>
            </div>
        </div>

        <div class="flex gap-4 mb-8">
            <div class="badge badge-info" style="font-size: 0.875rem; padding: 0.5rem 1rem;">4 MODULES</div>
            <div class="badge badge-info" style="font-size: 0.875rem; padding: 0.5rem 1rem;">3 SESSIONS</div>
            <div class="badge badge-info" style="font-size: 0.875rem; padding: 0.5rem 1rem;">6 HOURS</div>
            <div class="badge badge-info" style="font-size: 0.875rem; padding: 0.5rem 1rem;">1 CAPSTONE</div>
        </div>

        <div class="dashboard-grid">
            <div class="card module-card">
                <div class="card-header">
                    <h3 class="card-title">MODULE 1</h3>
                    <span class="badge badge-warning">Session 1</span>
                </div>
                <div class="card-body">
                    <h4>Prompting & Document Intelligence</h4>
                    <p class="mt-4 text-muted">Learn how to turn AI from a simple question-answering tool into a structured work assistant using DEC's documents.</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-small" onclick="window.location.hash='/module1'">Open Module</button>
                </div>
            </div>

            <div class="card module-card">
                <div class="card-header">
                    <h3 class="card-title">MODULE 2</h3>
                    <span class="badge badge-info">Session 2</span>
                </div>
                <div class="card-body">
                    <h4>AI-Powered Data Analysis</h4>
                    <p class="mt-4 text-muted">From manual Excel to AI analysis. Work with synthetic procurement, project, and finance data to find anomalies and generate MIS.</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-small" onclick="window.location.hash='/module2'">Open Module</button>
                </div>
            </div>

            <div class="card module-card">
                <div class="card-header">
                    <h3 class="card-title">MODULE 3</h3>
                    <span class="badge badge-success">Session 3</span>
                </div>
                <div class="card-body">
                    <h4>Safe & Responsible AI</h4>
                    <p class="mt-4 text-muted">Data classification, identifying hallucinations, human-in-the-loop verification, and knowing when NOT to use AI.</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-small" onclick="window.location.hash='/module3'">Open Module</button>
                </div>
            </div>

            <div class="card module-card">
                <div class="card-header">
                    <h3 class="card-title">MODULE 4</h3>
                    <span class="badge badge-danger">Session 3</span>
                </div>
                <div class="card-body">
                    <h4>Department AI Assistant</h4>
                    <p class="mt-4 text-muted">Capstone project: Build, test, and present a working AI assistant tailored for your specific DEC department.</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-small" onclick="window.location.hash='/module4'">Open Module</button>
                </div>
            </div>
        </div>
    `;
}

// Global UI Utility: Toasts
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Icon based on type
    let icon = 'ℹ️';
    if(type === 'success') icon = '✅';
    if(type === 'warning') icon = '⚠️';
    if(type === 'error') icon = '❌';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
window.showToast = showToast;

function renderModule1(container) {
    container.innerHTML = `
        <div class="mb-4">
            <span class="badge badge-warning">Session 1</span>
            <h2 class="mt-4">Module 1: Prompting & Document Intelligence</h2>
            <p class="text-muted">Turn AI from a simple question-answering tool into a structured work assistant.</p>
        </div>
        
        <div class="card mb-8">
            <div class="card-header">
                <h3 class="card-title">Prompt Builder</h3>
            </div>
            <div class="card-body dashboard-grid">
                <div>
                    <div class="form-group">
                        <label class="form-label">ROLE</label>
                        <input type="text" id="prompt-role" class="form-control" placeholder="e.g., Procurement Analyst" value="Procurement Analyst">
                    </div>
                    <div class="form-group">
                        <label class="form-label">CONTEXT</label>
                        <input type="text" id="prompt-context" class="form-control" placeholder="e.g., DEC-style procurement workflow" value="DEC-style procurement workflow">
                    </div>
                    <div class="form-group">
                        <label class="form-label">TASK</label>
                        <textarea id="prompt-task" class="form-control">Compare vendor quotations</textarea>
                    </div>
                </div>
                <div>
                    <div class="form-group">
                        <label class="form-label">INPUT DATA</label>
                        <textarea id="prompt-input" class="form-control">Vendor quotation dataset</textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">CONSTRAINTS</label>
                        <input type="text" id="prompt-constraints" class="form-control" placeholder="e.g., Do not invent missing information" value="Do not invent missing information">
                    </div>
                    <div class="form-group">
                        <label class="form-label">OUTPUT FORMAT</label>
                        <input type="text" id="prompt-format" class="form-control" placeholder="e.g., Comparison table + risks" value="Comparison table + risks + recommendation">
                    </div>
                </div>
            </div>
            <div class="card-footer" style="padding: 1.5rem; border-top: 1px solid #E2E8F0; display: flex; gap: 1rem;">
                <button class="btn btn-primary" id="btn-generate-prompt">Generate Final Prompt</button>
            </div>
        </div>
        
        <div class="card mb-8 hidden" id="prompt-result-card">
            <div class="card-header">
                <h3 class="card-title">Generated Prompt & Analysis</h3>
            </div>
            <div class="card-body">
                <div class="dashboard-grid">
                    <div>
                        <h4 class="mb-4">Final Structured Prompt</h4>
                        <pre id="final-prompt-text" style="background: var(--bg-main); padding: 1rem; border-radius: var(--radius-sm); white-space: pre-wrap;"></pre>
                        <div class="flex gap-4 mt-4">
                            <button class="btn btn-secondary btn-small" id="btn-copy-prompt">Copy Prompt</button>
                            <button class="btn btn-accent btn-small" id="btn-run-prompt-demo">Run Demo</button>
                        </div>
                    </div>
                    <div>
                        <h4 class="mb-4">Quality Check</h4>
                        <div id="prompt-feedback"></div>
                    </div>
                </div>
                <div id="prompt-demo-output" class="ai-result-box hidden mt-4">
                    <span class="ai-badge">AI Assistant</span>
                    <div id="prompt-demo-text"></div>
                </div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="card module-card">
                <div class="card-header"><h3 class="card-title">Interactive Challenges</h3></div>
                <div class="card-body">
                    <p>Practice writing structured prompts for real DEC scenarios.</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-secondary w-full">Open Challenges</button>
                </div>
            </div>
            <div class="card module-card">
                <div class="card-header"><h3 class="card-title">Document Intelligence</h3></div>
                <div class="card-body">
                    <p>Analyze Tenders, Contracts, and Quotes using AI.</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-secondary w-full" onclick="window.location.hash='/module1-docs'">Open Workspace</button>
                </div>
            </div>
        </div>
    `;

    // Event Listeners for Module 1
    setTimeout(() => {
        document.getElementById('btn-generate-prompt')?.addEventListener('click', () => {
            const role = document.getElementById('prompt-role').value;
            const context = document.getElementById('prompt-context').value;
            const task = document.getElementById('prompt-task').value;
            const input = document.getElementById('prompt-input').value;
            const constraints = document.getElementById('prompt-constraints').value;
            const format = document.getElementById('prompt-format').value;
            
            const finalPrompt = PromptEngine.buildPrompt(role, context, task, input, constraints, format);
            document.getElementById('final-prompt-text').innerText = finalPrompt;
            
            const evalResult = PromptEngine.evaluatePrompt(finalPrompt);
            const feedbackContainer = document.getElementById('prompt-feedback');
            feedbackContainer.innerHTML = evalResult.feedback.map(f => `<p class="mb-2">${f}</p>`).join('');
            
            document.getElementById('prompt-result-card').classList.remove('hidden');
            document.getElementById('prompt-demo-output').classList.add('hidden');
        });

        document.getElementById('btn-copy-prompt')?.addEventListener('click', () => {
            navigator.clipboard.writeText(document.getElementById('final-prompt-text').innerText);
            showToast('Prompt copied to clipboard', 'success');
        });

        document.getElementById('btn-run-prompt-demo')?.addEventListener('click', async () => {
            const btn = document.getElementById('btn-run-prompt-demo');
            btn.innerText = 'Running...';
            btn.disabled = true;
            
            const promptText = document.getElementById('final-prompt-text').innerText;
            const response = await AIService.generate(promptText);
            
            document.getElementById('prompt-demo-text').innerText = response;
            document.getElementById('prompt-demo-output').classList.remove('hidden');
            
            btn.innerText = 'Run Demo';
            btn.disabled = false;
        });
    }, 100);
}

function renderModule2(container) {
    container.innerHTML = `
        <div class="mb-4">
            <span class="badge badge-info">Session 2</span>
            <h2 class="mt-4">Module 2: AI-Powered Data Analysis</h2>
            <p class="text-muted">From manual Excel to AI analysis. Work with synthetic procurement data.</p>
        </div>
        
        <div class="card mb-8">
            <div class="card-header">
                <h3 class="card-title">Data Lab - Synthetic Procurement Dataset</h3>
                <button class="btn btn-secondary btn-small" id="btn-generate-data">Generate 100 Rows</button>
            </div>
            <div class="card-body table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table" id="data-lab-table">
                    <thead>
                        <tr>
                            <th>ID</th><th>Date</th><th>Vendor</th><th>Project</th><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th>
                        </tr>
                    </thead>
                    <tbody id="data-lab-body">
                        <tr><td colspan="8" class="text-muted text-center" style="padding: 2rem;">No dataset selected. Click Generate.</td></tr>
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
                        <h4 class="mb-4">Spend by Vendor</h4>
                        <div style="height: 250px;">
                            <canvas id="vendor-spend-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        let currentData = [];
        document.getElementById('btn-generate-data')?.addEventListener('click', () => {
            currentData = DataEngine.generateDataset('procurement', 20);
            const tbody = document.getElementById('data-lab-body');
            tbody.innerHTML = currentData.map(row => 
                `<tr class="${row.notes !== 'Standard' ? 'danger-bg' : ''}">
                    <td>${row.id}</td>
                    <td>${row.date}</td>
                    <td>${row.vendor}</td>
                    <td>${row.project}</td>
                    <td>${row.item}</td>
                    <td>${row.quantity}</td>
                    <td>₹${row.unitPrice}</td>
                    <td>₹${row.totalAmount} ${row.notes !== 'Standard' ? '⚠️' : ''}</td>
                </tr>`
            ).join('');
            
            document.getElementById('btn-analyze-data').disabled = false;
            showToast('Generated 20 rows of synthetic procurement data.', 'success');
        });

        document.getElementById('btn-analyze-data')?.addEventListener('click', async () => {
            const resultCard = document.getElementById('data-analysis-result');
            resultCard.classList.remove('hidden');
            
            const response = await AIService.analyzeData(currentData, "Find invoice amount anomalies");
            document.getElementById('ai-data-text').innerHTML = `<p>${response.replace(/\n/g, '<br>')}</p>`;
            
            // Generate Chart data
            const vendorTotals = {};
            currentData.forEach(r => {
                vendorTotals[r.vendor] = (vendorTotals[r.vendor] || 0) + r.totalAmount;
            });
            
            AnalysisEngine.renderChart('vendor-spend-chart', 'bar', 'Spend (₹)', Object.keys(vendorTotals), Object.values(vendorTotals));
        });
    }, 100);
}

function renderModule3(container) {
    container.innerHTML = `
        <div class="mb-4">
            <span class="badge badge-success">Session 3</span>
            <h2 class="mt-4">Module 3: Safe AI Usage & Responsible Adoption</h2>
            <p class="text-muted">Data classification, identifying hallucinations, and human-in-the-loop verification.</p>
        </div>
        
        <div class="card mb-8">
            <div class="card-header">
                <h3 class="card-title">Can I Upload This?</h3>
            </div>
            <div class="card-body">
                <p class="mb-4 text-muted">Test your knowledge on what is safe to upload to a public/enterprise LLM.</p>
                <div class="dashboard-grid" id="safety-grid">
                    <!-- Populated by JS -->
                </div>
            </div>
        </div>
        
        <div class="card mb-8">
            <div class="card-header">
                <h3 class="card-title">Human Verification Checklist</h3>
            </div>
            <div class="card-body">
                <ul style="list-style: none; padding: 0;">
                    <li class="mb-2"><label><input type="checkbox"> Source Checked</label></li>
                    <li class="mb-2"><label><input type="checkbox"> Numbers/Formulas Verified</label></li>
                    <li class="mb-2"><label><input type="checkbox"> Dates & Deadlines Verified</label></li>
                    <li class="mb-2"><label><input type="checkbox"> Sensitive Data Removed</label></li>
                    <li class="mb-2"><label><input type="checkbox"> Business Logic Validated</label></li>
                </ul>
            </div>
        </div>
    `;

    setTimeout(() => {
        const grid = document.getElementById('safety-grid');
        if(!grid) return;
        
        SafetyEngine.scenarios.forEach(scen => {
            const el = document.createElement('div');
            el.className = 'card';
            el.innerHTML = `
                <div class="card-body">
                    <h4 class="mb-4">\${scen.text}</h4>
                    <div class="flex gap-2 mb-4">
                        <button class="btn btn-success btn-small safety-btn" data-id="\${scen.id}" data-choice="GREEN">GREEN (Safe)</button>
                        <button class="btn btn-warning btn-small safety-btn" data-id="\${scen.id}" data-choice="AMBER">AMBER (Caution)</button>
                        <button class="btn btn-danger btn-small safety-btn" data-id="\${scen.id}" data-choice="RED">RED (Do Not Upload)</button>
                    </div>
                    <div class="safety-result hidden mt-4 text-sm" id="res-\${scen.id}"></div>
                </div>
            `;
            grid.appendChild(el);
        });

        document.querySelectorAll('.safety-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const choice = e.target.getAttribute('data-choice');
                const result = SafetyEngine.checkClassification(id, choice);
                
                const resEl = document.getElementById(\`res-\${id}\`);
                resEl.classList.remove('hidden');
                
                if(result.isCorrect) {
                    resEl.innerHTML = \`<span style="color: var(--success); font-weight: bold;">Correct!</span> \${result.reason}\`;
                } else {
                    resEl.innerHTML = \`<span style="color: var(--danger); font-weight: bold;">Incorrect. It is \${result.correctAnswer}.</span> \${result.reason}\`;
                }
            });
        });
    }, 100);
}

function renderModule4(container) {
    container.innerHTML = \`
        <div class="mb-4">
            <span class="badge badge-danger">Session 3</span>
            <h2 class="mt-4">Module 4: Capstone - Build Your Department Assistant</h2>
            <p class="text-muted">Combine everything to create a working, structured AI assistant for your department.</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Assistant Wizard</h3></div>
                <div class="card-body flex-col gap-4">
                    <div class="form-group">
                        <label class="form-label">Department</label>
                        <select id="cap-dept" class="form-control">
                            <option>Procurement</option><option>Projects</option><option>Finance</option><option>HR</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Assistant Role</label>
                        <input type="text" id="cap-role" class="form-control" value="Procurement Executive">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Core Task / Context</label>
                        <textarea id="cap-context" class="form-control">Compare vendor quotes and flag missing items.</textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Allowed Inputs</label>
                        <input type="text" id="cap-inputs" class="form-control" value="Synthetic Quotes CSV, Tender Specs">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Output Standard</label>
                        <input type="text" id="cap-outputs" class="form-control" value="Comparison Table, Markdown">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Custom Safety Rules</label>
                        <input type="text" id="cap-rules" class="form-control" value="Do not automatically select the cheapest vendor.">
                    </div>
                    <button class="btn btn-primary w-full" id="btn-build-capstone">Generate System Prompt & Build</button>
                </div>
            </div>
            
            <div class="card mb-8 hidden" id="capstone-result">
                <div class="card-header"><h3 class="card-title">Your AI Assistant</h3></div>
                <div class="card-body">
                    <h4>System Prompt Generated</h4>
                    <pre id="cap-sys-prompt" style="background: var(--bg-main); padding: 1rem; border-radius: var(--radius-sm); white-space: pre-wrap; font-size: 0.875rem;" class="mb-4"></pre>
                    
                    <div class="ai-result-box mb-4">
                        <h4 class="mb-2">Scorecard</h4>
                        <div id="cap-scorecard"></div>
                    </div>
                    
                    <button class="btn btn-accent w-full" id="btn-capstone-report">Generate Capstone Report (PDF)</button>
                </div>
            </div>
        </div>
    \`;

    setTimeout(() => {
        document.getElementById('btn-build-capstone')?.addEventListener('click', () => {
            const config = {
                department: document.getElementById('cap-dept').value,
                role: document.getElementById('cap-role').value,
                context: document.getElementById('cap-context').value,
                inputs: document.getElementById('cap-inputs').value,
                outputs: document.getElementById('cap-outputs').value,
                customRules: document.getElementById('cap-rules').value
            };
            
            const prompt = CapstoneEngine.generateSystemPrompt(config);
            document.getElementById('cap-sys-prompt').innerText = prompt;
            
            const evalRes = CapstoneEngine.evaluateAssistant(prompt);
            document.getElementById('cap-scorecard').innerHTML = \`
                <div class="flex justify-between mb-2"><span>Assistant Design & Safety:</span> <strong>\${evalRes.score}/\${evalRes.total}</strong></div>
                <div class="flex justify-between"><span>Readiness Label:</span> <span class="badge badge-success">\${evalRes.label}</span></div>
            \`;
            
            document.getElementById('capstone-result').classList.remove('hidden');
            showToast('Assistant configuration compiled!', 'success');
        });

        document.getElementById('btn-capstone-report')?.addEventListener('click', () => {
            showToast('Generating Capstone Report for Download...', 'info');
        });
    }, 100);
}

function renderTrainerDashboard(container) {
    if (!State.get('trainerMode')) {
        container.innerHTML = `
            <div class="card mb-8">
                <div class="card-body text-center">
                    <h3 class="mb-4">Trainer Mode Required</h3>
                    <p class="text-muted">You must enable trainer mode in the sidebar to view this dashboard.</p>
                </div>
            </div>`;
        return;
    }

    container.innerHTML = `
        <div class="mb-4">
            <span class="badge badge-warning">Trainer Tools</span>
            <h2 class="mt-4">Trainer Dashboard</h2>
            <p class="text-muted">Presentation controls and teaching notes.</p>
        </div>

        <div class="dashboard-grid">
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Module 1 Notes</h3></div>
                <div class="card-body">
                    <ul class="text-muted">
                        \${TrainerEngine.getNotes('module1').map(n => \`<li class="mb-2">\${n}</li>\`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Module 2 Notes</h3></div>
                <div class="card-body">
                    <ul class="text-muted">
                        \${TrainerEngine.getNotes('module2').map(n => \`<li class="mb-2">\${n}</li>\`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function renderFlagshipDemo(container) {
    container.innerHTML = `
        <div class="mb-4 text-center">
            <h2 class="mt-4" style="color: var(--accent);">DEC AI WORKFLOW SIMULATOR</h2>
            <p class="text-muted">End-to-End Executive Demonstration</p>
        </div>

        <div class="card mb-8 mx-auto" style="max-width: 700px;">
            <div class="card-header text-center" style="display: block;">
                <button class="btn btn-primary" id="btn-run-demo" style="font-size: 1.1rem; padding: 1rem 3rem;">RUN EXECUTIVE DEMO</button>
            </div>
            <div class="card-body" id="demo-log" style="min-height: 300px; background: #0F172A; color: #38BDF8; padding: 2rem; border-radius: var(--radius-sm); font-family: monospace; font-size: 0.9rem;">
                > Ready to initialize DEC Corporate Demo Sequence...
            </div>
        </div>
    `;

    setTimeout(() => {
        document.getElementById('btn-run-demo')?.addEventListener('click', async () => {
            const btn = document.getElementById('btn-run-demo');
            const log = document.getElementById('demo-log');
            btn.disabled = true;
            btn.innerText = "DEMO RUNNING...";
            
            const stages = TrainerEngine.startFlagshipDemo();
            log.innerHTML = "> Demo Sequence Started...<br><br>";
            
            for(let i = 0; i < stages.length; i++) {
                await new Promise(r => setTimeout(r, 1200));
                log.innerHTML += `\n[STEP \${stages[i].id}] \${stages[i].text}<br>`;
                
                if (i === 3) {
                    // Show chart generation simulate
                    log.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;-> Chart Rendered: Procurement vs Finance matches.<br>`;
                }
            }
            
            await new Promise(r => setTimeout(r, 1500));
            log.innerHTML += `<br>> <span style="color: #10B981;">DEMO SEQUENCE COMPLETED SUCCESSFULLY.</span><br>`;
            log.innerHTML += `> Ready for Client Q&A.`;
            
            btn.disabled = false;
            btn.innerText = "RUN AGAIN";
            showToast('Flagship Demo execution finished.', 'success');
        });
    }, 100);
}
