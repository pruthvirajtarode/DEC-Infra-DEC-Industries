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
    Router.add('/module1-docs', renderModule1Docs);
    Router.add('/module1-challenges', renderModule1Challenges);
    Router.add('/module2', renderModule2);
    Router.add('/module3', renderModule3);
    Router.add('/module4', renderModule4);
    Router.add('/prompt-library', renderPromptLibrary);
    Router.add('/resources', renderResourceCenter);
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

    const toggleFn = () => { if(window.innerWidth <= 768) { sidebar.classList.toggle('open'); } else { sidebar.classList.toggle('collapsed'); } };
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

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) {
        const savedTheme = localStorage.getItem('dec_ai_theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

        themeBtn.addEventListener('click', () => {
            let current = document.documentElement.getAttribute('data-theme');
            let next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('dec_ai_theme', next);
            themeBtn.innerText = next === 'dark' ? '☀️' : '🌙';
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

        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">My Achievements</h3></div>
            <div class="card-body">
                ${State.get('badges') && State.get('badges').length > 0 ? 
                    '<div class="flex gap-4 flex-wrap">' + State.get('badges').map(b => `<div class="badge badge-warning" style="font-size: 1rem; padding: 0.75rem 1.5rem; border: 1px solid var(--accent); background: #FFFBEB;">🏆 ${b}</div>`).join('') + '</div>'
                    : '<p class="text-muted">Complete modules to unlock your AI badges.</p>'
                }
            </div>
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
        
        <!-- NEW: Prompting Patterns -->
        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">Prompting Patterns Library</h3></div>
            <div class="card-body dashboard-grid">
                <div class="ai-result-box">
                    <h4 class="mb-2">1. Zero-Shot Prompting</h4>
                    <p class="text-sm text-muted mb-2">Asking the AI a question with no prior examples.</p>
                    <pre class="p-2 rounded text-xs" style="background:var(--bg-main)">"What is a standard penalty clause for delays?"</pre>
                </div>
                <div class="ai-result-box">
                    <h4 class="mb-2">2. Few-Shot Prompting</h4>
                    <p class="text-sm text-muted mb-2">Providing 2-3 examples so the AI learns the format.</p>
                    <pre class="p-2 rounded text-xs" style="background:var(--bg-main)">"Ex 1: Minor Delay -> 1% penalty.\nEx 2: Safety Issue -> ₹5000 penalty.\nNow classify this incident..."</pre>
                </div>
                <div class="ai-result-box">
                    <h4 class="mb-2">3. Chain of Thought</h4>
                    <p class="text-sm text-muted mb-2">Forcing the AI to explain its reasoning step-by-step.</p>
                    <pre class="p-2 rounded text-xs" style="background:var(--bg-main)">"Think step-by-step to calculate the total manpower cost based on the attendance log before giving the final number."</pre>
                </div>
            </div>
        </div>

        <!-- NEW: Prompt Optimizer -->
        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">Prompt Optimizer (Bad vs Good)</h3></div>
            <div class="card-body dashboard-grid">
                <div>
                    <h4 class="mb-2">Vague Prompt</h4>
                    <textarea class="form-control mb-2" id="bad-prompt-input" rows="4">Write an email about the project delay to the client.</textarea>
                    <button class="btn btn-secondary w-full" id="btn-optimize-prompt">Optimize Prompt ✨</button>
                </div>
                <div>
                    <h4 class="mb-2">Optimized Structured Prompt</h4>
                    <textarea class="form-control mb-2" id="good-prompt-output" rows="4" readonly style="background:#F8FAFC; border-color:var(--accent);"></textarea>
                    <button class="btn btn-primary w-full" id="btn-use-optimized" disabled>Use This Structure</button>
                </div>
            </div>
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
                    <p>Practice writing structured prompts for 5 real DEC scenarios.</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-secondary w-full" onclick="window.location.hash='/module1-challenges'">Open Challenges</button>
                </div>
            </div>
            <div class="card module-card">
                <div class="card-header"><h3 class="card-title">Document Intelligence</h3></div>
                <div class="card-body">
                    <p>Analyze Tenders, Contracts, and Quotes in a split-pane Copilot interface.</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-secondary w-full" onclick="window.location.hash='/module1-docs'">Open Workspace</button>
                </div>
            </div>
        </div>
    `;

    // Event Listeners for Module 1
    setTimeout(() => {
        // Optimizer
        document.getElementById('btn-optimize-prompt')?.addEventListener('click', () => {
            const bad = document.getElementById('bad-prompt-input').value;
            const good = `Act as a Project Manager for DEC Infra.\nContext: We are experiencing a 2-week delay due to unseasonal rain.\nTask: Write an update email to the client.\nConstraints: Maintain a professional, reassuring tone. Do not mention financial penalties.\nFormat: Subject line + 3 short paragraphs.`;
            document.getElementById('good-prompt-output').value = good;
            document.getElementById('btn-use-optimized').disabled = false;
        });

        document.getElementById('btn-use-optimized')?.addEventListener('click', () => {
            document.getElementById('prompt-role').value = "Project Manager";
            document.getElementById('prompt-context').value = "We are experiencing a 2-week delay due to unseasonal rain.";
            document.getElementById('prompt-task').value = "Write an update email to the client.";
            document.getElementById('prompt-constraints').value = "Maintain a professional, reassuring tone. Do not mention financial penalties.";
            document.getElementById('prompt-format').value = "Subject line + 3 short paragraphs.";
            showToast('Prompt Builder populated!', 'success');
        });

        document.getElementById('btn-generate-prompt')?.addEventListener('click', () => {
            const role = document.getElementById('prompt-role').value;
            const context = document.getElementById('prompt-context').value;
            const task = document.getElementById('prompt-task').value;
            const input = document.getElementById('prompt-input').value;
            const constraints = document.getElementById('prompt-constraints').value;
            const format = document.getElementById('prompt-format').value;
            
            const finalPrompt = PromptEngine.buildPrompt(role, context, task, input, constraints, format);
            State.markExerciseComplete('m1', 'module1');
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
            <p class="text-muted">From manual Excel to AI analysis. Work with DEC synthetic data.</p>
        </div>
        
        <!-- NEW: Data Cleansing Lab -->
        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">Data Cleansing Lab</h3></div>
            <div class="card-body dashboard-grid">
                <div>
                    <h4 class="mb-2">Messy Data (Raw Extract)</h4>
                    <pre class="p-2 rounded text-xs" style="background:var(--bg-main); height:150px; overflow-y:auto;">ID, VENDOR, AMT, DATE\n101, Omega mach., Rs5000, 12-01-2023\n102, OMEGA MACHINING, 4500, Jan 15 2023\n103, null, 1200, 2023/01/20\n104, Alpha Corp, 8k, 01-22-2023</pre>
                    <button class="btn btn-secondary w-full mt-2" id="btn-cleanse-data">AI Cleanse & Standardize ✨</button>
                </div>
                <div>
                    <h4 class="mb-2">Cleaned Data (Ready for DB)</h4>
                    <div id="cleansed-data-output" class="hidden p-2 rounded text-xs" style="background:rgba(16, 185, 129, 0.1); border: 1px solid var(--success); height:150px; overflow-y:auto;">
                        <table class="table text-xs">
                            <tr><th>ID</th><th>VENDOR</th><th>AMT_INR</th><th>DATE_ISO</th></tr>
                            <tr><td>101</td><td>Omega Machining</td><td>5000</td><td>2023-01-12</td></tr>
                            <tr><td>102</td><td>Omega Machining</td><td>4500</td><td>2023-01-15</td></tr>
                            <tr><td>103</td><td>UNKNOWN</td><td>1200</td><td>2023-01-20</td></tr>
                            <tr><td>104</td><td>Alpha Corp</td><td>8000</td><td>2023-01-22</td></tr>
                        </table>
                    </div>
                </div>
            </div>
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
            <div class="card-footer" style="padding: 1.5rem; border-top: 1px solid #E2E8F0; display:flex; gap:1rem;">
                <button class="btn btn-primary" id="btn-analyze-data" disabled>AI Analysis & Anomaly Check</button>
            </div>
        </div>

        <!-- ENHANCED: Interactive Chart Builder & Insights -->
        <div class="card mb-8 hidden" id="data-analysis-result">
            <div class="card-header">
                <h3 class="card-title">AI Analyst Report & Chart Builder</h3>
            </div>
            <div class="card-body">
                <div class="dashboard-grid">
                    <div>
                        <div id="ai-data-insights" class="ai-result-box mb-4">
                            <span class="ai-badge verification-required">Verification Required</span>
                            <div id="ai-data-text"></div>
                        </div>
                        
                        <!-- NEW: Chart Prompt -->
                        <h4 class="mb-2">Generate Custom Chart</h4>
                        <div class="flex gap-2">
                            <input type="text" class="form-control" id="chart-prompt" placeholder="e.g., Show me spend by vendor as a pie chart">
                            <button class="btn btn-secondary" id="btn-build-chart">Build</button>
                        </div>
                    </div>
                    <div>
                        <h4 class="mb-4">Data Visualization</h4>
                        <div style="height: 300px; display:flex; align-items:center; justify-content:center; border: 1px dashed #cbd5e1; border-radius: 8px;">
                            <canvas id="vendor-spend-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ENHANCED: More Mini Tools -->
        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">Working Mini-Tools (No-Code)</h3></div>
            <div class="card-body dashboard-grid">
                <div class="ai-result-box" id="tool-comparator">
                    <h4 class="mb-2">Material Rate Comparator</h4>
                    <p class="text-muted text-sm mb-4">Paste multiple vendor quotes to automatically output a comparison table.</p>
                    <button class="btn btn-secondary btn-small w-full btn-open-tool" data-target="ui-comparator">Open Tool</button>
                    <div id="ui-comparator" class="hidden mt-4">
                        <textarea class="form-control mb-2" rows="3" placeholder="Paste Vendor A & Vendor B quotes here..."></textarea>
                        <button class="btn btn-primary btn-small w-full mb-2 btn-run-tool" data-tool="comparator">Compare Rates</button>
                        <div class="tool-output hidden p-2 rounded text-sm font-mono" style="background: rgba(16, 185, 129, 0.1); color: var(--success);">Comparison Complete. Omega Machining is 12% cheaper.</div>
                    </div>
                </div>
                
                <div class="ai-result-box" id="tool-calculator">
                    <h4 class="mb-2">Manpower Cost Calculator</h4>
                    <p class="text-muted text-sm mb-4">Calculate site manpower costs based on True-In attendance logs.</p>
                    <button class="btn btn-secondary btn-small w-full btn-open-tool" data-target="ui-calculator">Open Tool</button>
                    <div id="ui-calculator" class="hidden mt-4">
                        <input type="number" class="form-control mb-2" placeholder="Total Hours from True-In">
                        <input type="number" class="form-control mb-2" placeholder="Average Hourly Rate (₹)">
                        <button class="btn btn-primary btn-small w-full mb-2 btn-run-tool" data-tool="calculator">Calculate Total</button>
                        <div class="tool-output hidden p-2 rounded text-sm font-mono" style="background: rgba(16, 185, 129, 0.1); color: var(--success);">Total Cost: ₹...</div>
                    </div>
                </div>
                
                <div class="ai-result-box" id="tool-invoice">
                    <h4 class="mb-2">Invoice Anomaly Detector</h4>
                    <p class="text-muted text-sm mb-4">Scan focus ERP ledger dump for duplicate invoice numbers or suspicious amounts.</p>
                    <button class="btn btn-secondary btn-small w-full btn-open-tool" data-target="ui-invoice">Open Tool</button>
                    <div id="ui-invoice" class="hidden mt-4">
                        <textarea class="form-control mb-2" rows="2" placeholder="Paste CSV/Ledger rows..."></textarea>
                        <button class="btn btn-primary btn-small w-full mb-2 btn-run-tool" data-tool="invoice">Run Scan</button>
                        <div class="tool-output hidden p-2 rounded text-sm font-mono" style="background: rgba(239, 68, 68, 0.1); color: var(--danger);">⚠️ Duplicate Invoice #INV-8822 detected for Vendor X and Y.</div>
                    </div>
                </div>
                
                <div class="ai-result-box" id="tool-risk">
                    <h4 class="mb-2">Project Risk Scorer</h4>
                    <p class="text-muted text-sm mb-4">Analyze weekly progress reports and assign a RAG (Red/Amber/Green) risk score.</p>
                    <button class="btn btn-secondary btn-small w-full btn-open-tool" data-target="ui-risk">Open Tool</button>
                    <div id="ui-risk" class="hidden mt-4">
                        <textarea class="form-control mb-2" rows="2" placeholder="Paste Weekly Progress Report..."></textarea>
                        <button class="btn btn-primary btn-small w-full mb-2 btn-run-tool" data-tool="risk">Score Risk</button>
                        <div class="tool-output hidden p-2 rounded text-sm font-mono" style="background: rgba(245, 158, 11, 0.1); color: var(--warning);">Status: AMBER. 2 critical path items are delayed by >3 days.</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        // Cleansing Lab
        document.getElementById('btn-cleanse-data')?.addEventListener('click', (e) => {
            e.target.innerText = "Cleansing...";
            setTimeout(() => {
                document.getElementById('cleansed-data-output').classList.remove('hidden');
                e.target.innerText = "Data Cleansed";
                e.target.disabled = true;
                showToast('Data standardized successfully!', 'success');
            }, 800);
        });
    
        let currentData = [];
        document.getElementById('btn-generate-data')?.addEventListener('click', () => {
            const type = document.getElementById('data-type-select').value;
            currentData = DataEngine.generateDataset(type, 100);
            
            if(currentData.length > 0) {
                const keys = Object.keys(currentData[0]);
                document.getElementById('data-lab-head').innerHTML = '<tr>' + keys.map(k => `<th>${k.toUpperCase()}</th>`).join('') + '</tr>';
                document.getElementById('data-lab-body').innerHTML = currentData.map(row => 
                    `<tr class="${row.notes && row.notes !== 'Standard' ? 'danger-bg' : ''}">
                        ${keys.map(k => `<td>${row[k]}</td>`).join('')}
                    </tr>`
                ).join('');
            }
            
            document.getElementById('btn-analyze-data').disabled = false;
            showToast(`Generated 100 rows of synthetic ${type} data.`, 'success');
        });

        document.getElementById('btn-analyze-data')?.addEventListener('click', async () => {
            const resultCard = document.getElementById('data-analysis-result');
            resultCard.classList.remove('hidden');
            
            const response = await AIService.analyzeData(currentData, "Find anomalies");
            document.getElementById('ai-data-text').innerHTML = `<p>${response.replace(/\\n/g, '<br>')}</p>`;
            
            // Mark progress
            State.markExerciseComplete('m2', 'module2');
            
            // Generate basic chart
            const labels = currentData.slice(0,5).map(r => r.id);
            const dataArr = currentData.slice(0,5).map(r => r.totalAmount || r.debit || r.hoursWorked || r.fuelConsumedLiters || 1);
            AnalysisEngine.renderChart('vendor-spend-chart', 'bar', 'Sample Values', labels, dataArr);
        });
        
        document.getElementById('btn-build-chart')?.addEventListener('click', () => {
            showToast('AI dynamically interpreting prompt and rendering chart...', 'info');
            // Mocking dynamic chart update
            const labels = currentData.slice(5,10).map(r => r.id || 'N/A');
            const dataArr = currentData.slice(5,10).map(r => r.totalAmount || Math.random()*1000);
            AnalysisEngine.renderChart('vendor-spend-chart', 'pie', 'Custom View', labels, dataArr);
        });

        document.querySelectorAll('.btn-open-tool').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.classList.add('hidden');
                document.getElementById(e.target.getAttribute('data-target')).classList.remove('hidden');
            });
        });
        document.querySelectorAll('.btn-run-tool').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const out = e.target.nextElementSibling;
                out.classList.remove('hidden');
                
                const toolType = e.target.getAttribute('data-tool');
                if (toolType === 'calculator') {
                    const inputs = e.target.parentElement.querySelectorAll('input');
                    const total = (parseFloat(inputs[0].value || 0) * parseFloat(inputs[1].value || 0)).toFixed(2);
                    out.innerText = 'Total Cost: ₹' + total;
                }
            });
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
        
        <div class="dashboard-grid">
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Spot the AI Mistake</h3></div>
                <div class="card-body">
                    <p class="text-sm text-muted mb-4">Review the AI generated site report. Click on the hallucinated fact based on the actual log.</p>
                    <div class="p-3 mb-2 rounded text-sm" style="background: var(--bg-main); border-left: 3px solid var(--info); padding: 0.75rem; margin-bottom: 1rem;">
                        <strong>Actual Log:</strong> "Excavator broke down at 2PM due to hydraulic leak."
                    </div>
                    <div class="p-3 border rounded" style="border: 1px solid #E2E8F0; padding: 0.75rem; border-radius: var(--radius-sm); line-height: 1.8;">
                        <strong>AI Report:</strong> "Site progress was delayed because <span class="mistake-option" style="cursor:pointer; background: #FEF3C7; padding: 0.1rem 0.25rem; border-radius: 4px;" data-correct="false">the weather was rainy</span>, and additionally <span class="mistake-option" style="cursor:pointer; background: #FEF3C7; padding: 0.1rem 0.25rem; border-radius: 4px;" data-correct="true">the excavator ran out of fuel</span> at 2PM."
                    </div>
                    <div id="mistake-feedback" class="mt-4 hidden text-sm font-bold"></div>
                </div>
            </div>
            
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">AI Adoption Decision Tree</h3></div>
                <div class="card-body flex-col gap-2">
                    <p class="text-sm text-muted mb-4">Should you use AI for this task?</p>
                    <div id="decision-q1">
                        <p class="mb-2">Does the task involve highly confidential personal data (e.g., salaries)?</p>
                        <button class="btn btn-secondary btn-small dec-btn" style="margin-right:0.5rem;" data-ans="yes1">Yes</button>
                        <button class="btn btn-secondary btn-small dec-btn" data-ans="no1">No</button>
                    </div>
                    <div id="decision-q2" class="hidden mt-4" style="border-top: 1px solid #E2E8F0; padding-top: 1rem;">
                        <p class="mb-2">Does the output require 100% factual accuracy without human review?</p>
                        <button class="btn btn-secondary btn-small dec-btn" style="margin-right:0.5rem;" data-ans="yes2">Yes</button>
                        <button class="btn btn-secondary btn-small dec-btn" data-ans="no2">No</button>
                    </div>
                    <div id="decision-res" class="hidden mt-4 p-3 rounded text-sm font-bold" style="padding: 0.75rem; border-radius: var(--radius-sm); color: white;"></div>
                </div>
            </div>
        </div>

        <div class="card mb-8">
            <div class="card-header">
                <h3 class="card-title">Human Verification Checklist</h3>
            </div>
            <div class="card-body">
                <ul style="list-style: none; padding: 0;">
                    <li class="mb-2"><label><input type="checkbox" class="chk-verify"> Source Checked</label></li>
                    <li class="mb-2"><label><input type="checkbox" class="chk-verify"> Numbers/Formulas Verified</label></li>
                    <li class="mb-2"><label><input type="checkbox" class="chk-verify"> Dates & Deadlines Verified</label></li>
                    <li class="mb-2"><label><input type="checkbox" class="chk-verify"> Sensitive Data Removed</label></li>
                    <li class="mb-2"><label><input type="checkbox" class="chk-verify"> Business Logic Validated</label></li>
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
                    <h4 class="mb-4">${scen.text}</h4>
                    <div class="flex gap-2 mb-4">
                        <button class="btn btn-success btn-small safety-btn" data-id="${scen.id}" data-choice="GREEN">GREEN (Safe)</button>
                        <button class="btn btn-warning btn-small safety-btn" data-id="${scen.id}" data-choice="AMBER">AMBER (Caution)</button>
                        <button class="btn btn-danger btn-small safety-btn" data-id="${scen.id}" data-choice="RED">RED (Do Not Upload)</button>
                    </div>
                    <div class="safety-result hidden mt-4 text-sm" id="res-${scen.id}"></div>
                </div>
            `;
            grid.appendChild(el);
        });

        document.querySelectorAll('.safety-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const choice = e.target.getAttribute('data-choice');
                const result = SafetyEngine.checkClassification(id, choice);
                
                const resEl = document.getElementById(`res-${id}`);
                resEl.classList.remove('hidden');
                
                if(result.isCorrect) {
                    resEl.innerHTML = `<span style="color: var(--success); font-weight: bold;">Correct!</span> ${result.reason}`;
                } else {
                    resEl.innerHTML = `<span style="color: var(--danger); font-weight: bold;">Incorrect. It is ${result.correctAnswer}.</span> ${result.reason}`;
                }
            });
        });

        // Spot the Mistake Logic
        document.querySelectorAll('.mistake-option').forEach(el => {
            el.addEventListener('click', (e) => {
                const isCorrect = e.target.getAttribute('data-correct') === 'true';
                const fb = document.getElementById('mistake-feedback');
                fb.classList.remove('hidden');
                if (isCorrect) {
                    fb.innerHTML = '<span style="color: var(--success);">Correct! The log mentioned a hydraulic leak, not running out of fuel.</span>';
                    State.markExerciseComplete('m3_mistake', 'module3');
                } else {
                    fb.innerHTML = '<span style="color: var(--danger);">Incorrect. While weather wasn\'t mentioned, that is not the primary hallucination based on the log.</span>';
                }
            });
        });

        // Decision Tree Logic
        document.querySelectorAll('.dec-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ans = e.target.getAttribute('data-ans');
                if (ans === 'yes1') {
                    const res = document.getElementById('decision-res');
                    res.innerHTML = 'STOP. Do not use public AI for highly confidential data.';
                    res.style.backgroundColor = 'var(--danger)';
                    res.classList.remove('hidden');
                    document.getElementById('decision-q2').classList.add('hidden');
                } else if (ans === 'no1') {
                    document.getElementById('decision-q2').classList.remove('hidden');
                    document.getElementById('decision-res').classList.add('hidden');
                } else if (ans === 'yes2') {
                    const res = document.getElementById('decision-res');
                    res.innerHTML = 'CAUTION. AI can hallucinate. You MUST have a human-in-the-loop to verify the output.';
                    res.style.backgroundColor = 'var(--warning)';
                    res.classList.remove('hidden');
                    State.markExerciseComplete('m3_decision', 'module3');
                } else if (ans === 'no2') {
                    const res = document.getElementById('decision-res');
                    res.innerHTML = 'SAFE TO PROCEED. AI is great for drafts, brainstorming, and summaries.';
                    res.style.backgroundColor = 'var(--success)';
                    res.classList.remove('hidden');
                    State.markExerciseComplete('m3_decision', 'module3');
                }
function renderModule4(container) {
    container.innerHTML = `
        <div class="mb-4">
            <span class="badge badge-danger">Session 3</span>
            <h2 class="mt-4">Module 4: Capstone - Build Your Department Assistant</h2>
            <p class="text-muted">Combine everything to create a working, structured AI assistant for your department.</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Assistant Builder Wizard</h3></div>
                <div class="card-body flex-col gap-4">
                    <div class="form-group">
                        <label class="form-label">Department</label>
                        <select id="cap-dept" class="form-control">
                            <option>HR (Recruitment)</option><option>Accounts (Reconciliation)</option><option>Sales (Proposal)</option><option>Procurement (Quotes)</option><option>Planning/Sites (Reporting)</option><option>Admin/IT (SOP)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Assistant Role</label>
                        <input type="text" id="cap-role" class="form-control" value="Procurement Executive">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Core Task / Context</label>
                        <textarea id="cap-context" class="form-control" rows="2">Compare vendor quotes and flag missing items.</textarea>
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
                <div class="card-header"><h3 class="card-title">Your Custom AI Assistant</h3></div>
                <div class="card-body">
                    <h4>1. System Prompt Generated</h4>
                    <pre id="cap-sys-prompt" style="background: var(--bg-main); padding: 1rem; border-radius: var(--radius-sm); white-space: pre-wrap; font-size: 0.875rem;" class="mb-4"></pre>
                    
                    <h4>2. Readiness Scorecard</h4>
                    <div class="ai-result-box mb-4">
                        <div id="cap-scorecard"></div>
                    </div>
                    
                    <!-- NEW: Interactive Test Drive -->
                    <h4 class="mb-2">3. Test Drive Assistant</h4>
                    <div class="p-3 border rounded mb-4" style="background:#F8FAFC; border:1px solid #cbd5e1; height: 200px; display:flex; flex-direction:column;">
                        <div id="cap-chat-log" style="flex-grow:1; overflow-y:auto; font-size:0.875rem; margin-bottom:0.5rem;">
                            <div class="text-muted italic mb-2">Assistant is ready. Ask it a question...</div>
                        </div>
                        <div class="flex gap-2">
                            <input type="text" id="cap-chat-input" class="form-control" placeholder="Test your prompt..." style="margin-bottom:0;">
                            <button class="btn btn-secondary btn-small" id="btn-cap-send">Send</button>
                        </div>
                    </div>
                    
                    <button class="btn btn-accent w-full" id="btn-capstone-report">Generate Capstone Report (PDF)</button>
                </div>
            </div>
        </div>
    `;

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
            document.getElementById('cap-scorecard').innerHTML = `
                <div class="flex justify-between mb-2"><span>Assistant Design & Safety:</span> <strong>${evalRes.score}/${evalRes.total}</strong></div>
                <div class="flex justify-between"><span>Readiness Label:</span> <span class="badge badge-success">${evalRes.label}</span></div>
            `;
            
            document.getElementById('capstone-result').classList.remove('hidden');
            showToast('Assistant configuration compiled!', 'success');
            State.markExerciseComplete('m4', 'module4');
        });

        document.getElementById('btn-cap-send')?.addEventListener('click', () => {
            const inputEl = document.getElementById('cap-chat-input');
            const logEl = document.getElementById('cap-chat-log');
            const msg = inputEl.value;
            if(!msg) return;
            
            // Add user msg
            logEl.innerHTML += `<div class="mb-2 text-right"><span style="background:var(--accent); color:white; padding:4px 8px; border-radius:4px; display:inline-block;">${msg}</span></div>`;
            inputEl.value = '';
            
            // Mock AI response
            setTimeout(() => {
                const response = "As the Custom Assistant, I have processed your request based on my configured constraints. Here is the structured output...";
                logEl.innerHTML += `<div class="mb-2"><span style="background:#e2e8f0; padding:4px 8px; border-radius:4px; display:inline-block;">🤖 ${response}</span></div>`;
                logEl.scrollTop = logEl.scrollHeight;
            }, 500);
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
                        ${TrainerEngine.getNotes('module1').map(n => `<li class="mb-2">${n}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Module 2 Notes</h3></div>
                <div class="card-body">
                    <ul class="text-muted">
                        ${TrainerEngine.getNotes('module2').map(n => `<li class="mb-2">${n}</li>`).join('')}
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
                log.innerHTML += `\n[STEP ${stages[i].id}] ${stages[i].text}<br>`;
                
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


function renderPromptLibrary(container) {
    container.innerHTML = `
        <div class="mb-4">
            <span class="badge badge-primary">Resources</span>
            <h2 class="mt-4">Prompt Library</h2>
            <p class="text-muted">A collection of ready-to-use prompts for DEC workflows.</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="card mb-4">
                <div class="card-header"><h3 class="card-title">Accounts: Reconciliation Copilot</h3></div>
                <div class="card-body">
                    <pre class="p-4 rounded text-sm mb-4" style="background: var(--bg-main); white-space:pre-wrap;">Act as a Senior Accountant at DEC. I will provide two ledger extracts. Identify all mismatches in amounts and dates. Output a clear table showing: 1) Transaction ID, 2) Focus ERP Amount, 3) Vendor Statement Amount, 4) Variance.</pre>
                    <button class="btn btn-secondary btn-small w-full" onclick="showToast('Prompt copied to clipboard!', 'success')">Copy Prompt</button>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-header"><h3 class="card-title">Procurement: Quote Analyst</h3></div>
                <div class="card-body">
                    <pre class="p-4 rounded text-sm mb-4" style="background: var(--bg-main); white-space:pre-wrap;">Act as a Procurement Manager. Review the attached vendor quotes for Metro Line A. Create a side-by-side comparison table of items, unit rates, and totals. Flag any missing items from Vendor B that Vendor A included.</pre>
                    <button class="btn btn-secondary btn-small w-full" onclick="showToast('Prompt copied to clipboard!', 'success')">Copy Prompt</button>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-header"><h3 class="card-title">Planning: Progress Reporter</h3></div>
                <div class="card-body">
                    <pre class="p-4 rounded text-sm mb-4" style="background: var(--bg-main); white-space:pre-wrap;">Act as a Project Planner. Convert these raw daily site notes into a formal Weekly Progress Report for the management team. Highlight blockers in red and summarize achievements in bullet points.</pre>
                    <button class="btn btn-secondary btn-small w-full" onclick="showToast('Prompt copied to clipboard!', 'success')">Copy Prompt</button>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-header"><h3 class="card-title">HR: Screening Assistant</h3></div>
                <div class="card-body">
                    <pre class="p-4 rounded text-sm mb-4" style="background: var(--bg-main); white-space:pre-wrap;">Act as a Technical Recruiter for DEC. I will provide a JD and a candidate resume. Score the candidate out of 10 based on the required skills. List 3 technical screening questions I should ask them.</pre>
                    <button class="btn btn-secondary btn-small w-full" onclick="showToast('Prompt copied to clipboard!', 'success')">Copy Prompt</button>
                </div>
            </div>
        </div>
    `;
}

function renderResourceCenter(container) {
    container.innerHTML = `
        <div class="mb-4">
            <span class="badge badge-primary">Downloads</span>
            <h2 class="mt-4">Resource Center</h2>
            <p class="text-muted">Cheat sheets and policy documents for Safe AI usage at DEC.</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">The Traffic-Light Rule</h3></div>
                <div class="card-body">
                    <ul style="list-style: none; padding: 0;">
                        <li class="mb-4 p-4 rounded" style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--success);">
                            <strong>GREEN:</strong> Public information, generic drafting, formula help.<br>
                            <span class="text-sm">Safe to use with public AI tools.</span>
                        </li>
                        <li class="mb-4 p-4 rounded" style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid var(--warning);">
                            <strong>AMBER:</strong> Internal but non-sensitive material.<br>
                            <span class="text-sm">Anonymize first, or use Enterprise Copilot.</span>
                        </li>
                        <li class="p-4 rounded" style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid var(--danger);">
                            <strong>RED:</strong> Financials, salaries, client contracts, personal data.<br>
                            <span class="text-sm">NEVER enter into public AI tools.</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Checklists</h3></div>
                <div class="card-body flex-col gap-4">
                    <div class="ai-result-box flex justify-between items-center" style="display:flex;">
                        <div>
                            <strong>Human Verification Checklist</strong>
                            <div class="text-sm text-muted">What to check before sending AI output.</div>
                        </div>
                        <button class="btn btn-secondary btn-small" onclick="showToast('Downloading PDF...', 'info')">Download PDF</button>
                    </div>
                    <div class="ai-result-box flex justify-between items-center" style="display:flex;">
                        <div>
                            <strong>Enterprise Copilot vs ChatGPT</strong>
                            <div class="text-sm text-muted">When to use which tool at DEC.</div>
                        </div>
                        <button class="btn btn-secondary btn-small" onclick="showToast('Downloading PDF...', 'info')">Download PDF</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderModule1Docs(container) {
    const docs = DocumentEngine.getAllDocuments();
    let optionsHtml = docs.map(d => `<option value="${d.id}">${d.title} (${d.type})</option>`).join('');

    container.innerHTML = `
        <div class="mb-4">
            <button class="btn btn-secondary btn-small mb-4" onclick="window.location.hash='/module1'">← Back to Module 1</button>
            <span class="badge badge-warning">Session 1 Workspace</span>
            <h2 class="mt-4">Document Intelligence Copilot</h2>
            <p class="text-muted">Analyze DEC Tenders, Contracts, and Quotes in a split-pane Copilot interface.</p>
        </div>
        
        <div class="dashboard-grid" style="grid-template-columns: 1fr 1fr; gap: 2rem;">
            <!-- Left Pane: Document Viewer -->
            <div class="card mb-8" style="display: flex; flex-direction: column;">
                <div class="card-header"><h3 class="card-title">Document Source</h3></div>
                <div class="card-body flex-col h-full" style="flex-grow: 1; display: flex;">
                    <select id="doc-select" class="form-control mb-4">
                        ${optionsHtml}
                    </select>
                    <div id="doc-viewer" style="background: white; padding: 1.5rem; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); max-height: 500px; overflow-y: auto; white-space: pre-wrap; font-family: var(--font-body); font-size: 0.875rem; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); flex-grow: 1;"></div>
                </div>
            </div>
            
            <!-- Right Pane: AI Copilot -->
            <div class="card mb-8" style="border: 1px solid var(--accent); display: flex; flex-direction: column;">
                <div class="card-header" style="background: var(--bg-main);"><h3 class="card-title">AI Copilot Chat</h3></div>
                <div class="card-body flex-col" style="flex-grow: 1; display: flex;">
                    <div class="form-group">
                        <label class="form-label">Extraction Goal / Question</label>
                        <textarea id="doc-prompt" class="form-control" rows="3">Extract all penalty clauses and payment terms. Format as a bulleted list.</textarea>
                    </div>
                    <button class="btn btn-primary w-full mb-4" id="btn-analyze-doc">Analyze Document</button>
                    
                    <div id="doc-analysis-result" class="ai-result-box hidden" style="flex-grow: 1; max-height: 350px; overflow-y: auto;">
                        <span class="ai-badge">Copilot Output</span>
                        <div id="doc-analysis-text" class="mt-2 text-sm" style="line-height: 1.6;"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const docSelect = document.getElementById('doc-select');
        const docViewer = document.getElementById('doc-viewer');
        
        const updateViewer = () => {
            const doc = DocumentEngine.getDocument(docSelect.value);
            if(doc) {
                docViewer.innerText = doc.content;
            }
        };
        
        if(docSelect) {
            docSelect.addEventListener('change', updateViewer);
            updateViewer(); // init
        }
        
        document.getElementById('btn-analyze-doc')?.addEventListener('click', async () => {
            const btn = document.getElementById('btn-analyze-doc');
            btn.disabled = true;
            btn.innerText = "Analyzing...";
            
            const doc = DocumentEngine.getDocument(docSelect.value);
            const goal = document.getElementById('doc-prompt').value;
            
            const response = await AIService.extractFromDocument(doc.content, goal);
            
            document.getElementById('doc-analysis-text').innerHTML = response.replace(/\n/g, '<br>');
            document.getElementById('doc-analysis-result').classList.remove('hidden');
            
            btn.disabled = false;
            btn.innerText = "Analyze Document";
        });
    }, 100);
}

function renderModule1Challenges(container) {
    container.innerHTML = `
        <div class="mb-4">
            <button class="btn btn-secondary btn-small mb-4" onclick="window.location.hash='/module1'">← Back to Module 1</button>
            <span class="badge badge-warning">Session 1 Challenges</span>
            <h2 class="mt-4">Prompting Challenges</h2>
            <p class="text-muted">Test your prompt engineering skills against 5 DEC scenarios.</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Challenge 1: The Vague Manager</h3></div>
                <div class="card-body">
                    <p class="mb-4"><strong>Scenario:</strong> You need to draft a rejection email to a vendor for poor quality. Manager says: <em>"Tell omega they did bad and we won't pay."</em></p>
                    <textarea class="form-control mb-4" rows="4" placeholder="Rewrite using DEC Prompt Framework..."></textarea>
                    <button class="btn btn-primary w-full" onclick="showToast('Great structure! A structured prompt gets better results.', 'success')">Submit Improved Prompt</button>
                </div>
            </div>
            
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Challenge 2: Data Hallucination</h3></div>
                <div class="card-body">
                    <p class="mb-4"><strong>Scenario:</strong> The AI blamed "Weather Conditions" for delays, but the logs only mention "Material Shortages". How to fix?</p>
                    <div class="flex-col gap-2 mb-4">
                        <label class="flex gap-2 items-center"><input type="radio" name="c2" value="1"> Be more creative</label>
                        <label class="flex gap-2 items-center"><input type="radio" name="c2" value="2"> Do not invent information outside the provided text</label>
                    </div>
                    <button class="btn btn-primary w-full" onclick="
                        const checked = document.querySelector('input[name=c2]:checked');
                        if(checked && checked.value === '2') showToast('Correct! Always ground the AI.', 'success');
                        else showToast('Incorrect. Try again.', 'error');
                    ">Submit Answer</button>
                </div>
            </div>

            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Challenge 3: Tone Adjustment</h3></div>
                <div class="card-body">
                    <p class="mb-4"><strong>Scenario:</strong> Write an HR email reminding employees to submit timesheets, but it must be empathetic and positive, not threatening.</p>
                    <textarea class="form-control mb-4" rows="4" placeholder="Your prompt here..."></textarea>
                    <button class="btn btn-primary w-full" onclick="showToast('Submitted! Tone and constraints are key.', 'success')">Submit Prompt</button>
                </div>
            </div>

            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Challenge 4: Output Formatting</h3></div>
                <div class="card-body">
                    <p class="mb-4"><strong>Scenario:</strong> You are feeding a 50-page technical spec to the AI. You only want the material requirements in a markdown table. What constraint do you add?</p>
                    <textarea class="form-control mb-4" rows="3" placeholder="Constraint: ..."></textarea>
                    <button class="btn btn-primary w-full" onclick="showToast('Submitted! Format definitions save hours of re-formatting.', 'success')">Submit Prompt</button>
                </div>
            </div>

            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">Challenge 5: Chain of Thought</h3></div>
                <div class="card-body">
                    <p class="mb-4"><strong>Scenario:</strong> You want the AI to calculate the total budget based on scattered invoice emails. To ensure accuracy, what instruction should you use?</p>
                    <div class="flex-col gap-2 mb-4">
                        <label class="flex gap-2 items-center"><input type="radio" name="c5" value="1"> Give me the final number immediately.</label>
                        <label class="flex gap-2 items-center"><input type="radio" name="c5" value="2"> Think step-by-step and show the calculation before the final sum.</label>
                    </div>
                    <button class="btn btn-primary w-full" onclick="
                        const checked = document.querySelector('input[name=c5]:checked');
                        if(checked && checked.value === '2') showToast('Correct! Chain of Thought improves math accuracy.', 'success');
                        else showToast('Incorrect.', 'error');
                    ">Submit Answer</button>
                </div>
            </div>
        </div>
    `;
}
