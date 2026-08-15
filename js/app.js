/**
 * DEC AI Foundations - Main App Initialization
 */


window.switchTab = function(e, tabName) {
    document.querySelectorAll('.tab-content').forEach(t => {
        t.classList.remove('active');
        t.style.display = 'none';
    });
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
    });
    
    const targetTab = document.getElementById(tabName);
    if(targetTab) {
        targetTab.classList.add('active');
        targetTab.style.display = 'block';
    }
    
    if (e && e.currentTarget) {
        e.currentTarget.classList.add('active');
    } else if (e && e.target) {
        const btn = e.target.closest('button') || e.target;
        btn.classList.add('active');
    }
};

window.showTab = window.switchTab;
window.openTab = window.switchTab;

// Fallback Event Delegation just in case inline handlers fail
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.tab-btn, .tab-button');
    if (!btn) return;
    const onclickStr = btn.getAttribute('onclick');
    if (!onclickStr) return;
    const match = onclickStr.match(/['"]([^'"]+)['"]/);
    if (match) {
        window.switchTab(e, match[1]);
    }
});

window.selectOption = function(option) {
    const options = {
        'A': 'Image & Photo Analysis',
        'B': 'Email & Report Automation',
        'C': 'Schedule & Resource Optimization',
        'D': 'Cost Estimation & Budgeting',
        'E': 'Compliance & Documentation',
        'F': 'Change Order & Claims Management',
        'G': 'Sustainability & Green Building',
        'H': 'Predictive Analytics'
    };
    const message = `I want Module 1D Option ${option}: ${options[option]}`;
    alert(message + '\n\nCopy this and reply to confirm your selection!');
    window.copyToClipboard(message);
};

window.copyToClipboard = function(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Selection copied! Paste it in your reply to confirm.');
        }).catch(() => { fallbackCopy(text); });
    } else {
        fallbackCopy(text);
    }
    
    function fallbackCopy(txt) {
        const textarea = document.createElement('textarea');
        textarea.value = txt;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            alert('Selection copied! Paste it in your reply to confirm.');
        } catch(e) {
            console.error(e);
        }
        document.body.removeChild(textarea);
    }
};

window.switchRoleTab = function(tabId) {
    // Hide all contents
    const contents = document.querySelectorAll('.role-tab-content');
    contents.forEach(c => c.classList.add('hidden'));
    
    // Deactivate all buttons
    const buttons = document.querySelectorAll('.role-tab-btn');
    buttons.forEach(b => {
        b.classList.remove('active');
        b.style.color = 'var(--text-muted)';
        b.style.borderBottomColor = 'transparent';
    });
    
    // Show active content
    const activeContent = document.getElementById('tab-' + tabId);
    if (activeContent) activeContent.classList.remove('hidden');
    
    // Activate clicked button
    const activeBtn = document.getElementById('btn-' + tabId);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.color = '#3b82f6';
        activeBtn.style.borderBottomColor = '#3b82f6';
    }
};
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize State
    State.init();

    // 2. Setup UI listeners
    setupUI();

    // 3. Register Routes (Placeholders for now)
    Router.add('/dashboard', renderDashboard);
    Router.add('/productivity', renderProductivityForms);
    Router.add('/module1', renderModule1);
    Router.add('/module1-docs', renderModule1Docs);
    Router.add('/module1-challenges', renderModule1Challenges);
    Router.add('/module2', renderModule2);
    Router.add('/module3', renderModule3);
    Router.add('/module4', renderModule4);
    Router.add('/prompt-library', renderPromptLibrary);
    Router.add('/case-studies', renderCaseStudies);
    Router.add('/resources', renderResourceCenter);
    Router.add('/datasets', renderDatasetHub);
    Router.add('/vercel-lab', renderVercelLab);
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
        <div class="dashboard-hero card mb-8" style="background: linear-gradient(135deg, var(--bg-card) 0%, rgba(243, 198, 35, 0.05) 100%); position: relative; overflow: hidden; padding: 3rem;">
            <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2rem;">
                <div style="flex: 1; min-width: 300px; z-index: 2;">
                    <!-- Mobile QR Code -->
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; background: rgba(255,255,255,0.05); padding: 0.75rem 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); width: fit-content; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                        <div id="mobile-qr-code" style="background: white; padding: 4px; border-radius: 6px; width: 72px; height: 72px; display: flex; align-items: center; justify-content: center;"></div>
                        <div>
                            <div style="font-size: 0.75rem; color: #00d4ff; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.25rem;">📱 Mobile Access</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.3;">Scan this QR to open the<br>project on your phone.</div>
                        </div>
                    </div>

                    <h1 style="color: var(--text-main); font-size: 3rem; margin-bottom: 1rem; line-height: 1.2;">DEC AI <span style="color: var(--accent);">FOUNDATIONS</span></h1>
                    <h3 style="color: var(--text-muted); font-family: var(--font-body); font-weight: 500; font-size: 1.25rem;">"From Everyday AI to a Working Department AI Assistant"</h3>
                    <p style="margin-top: 1.5rem; max-width: 600px; opacity: 0.9; font-size: 1.1rem; color: var(--text-muted);">
                        A hands-on AI learning environment designed around realistic construction, infrastructure, manufacturing, procurement, finance, project, HR, and operations workflows.
                    </p>
                    <div class="flex gap-4 mt-8">
                        <button class="btn btn-accent" onclick="window.location.hash='/module1'">START PROGRAM</button>
                        <button class="btn btn-secondary" onclick="window.location.hash='/flagship-demo'">VIEW CAPSTONE</button>
                    </div>
                </div>
                <div style="flex: 1; min-width: 300px; display: flex; justify-content: center; z-index: 2; position: relative;">
                    <div style="width: 100%; max-width: 450px; height: 340px; position: relative; display: flex; align-items: center; justify-content: center;">
                        <!-- Generated 3D Character with animated glow border -->
                        <div style="position: relative; animation: heroFloat3D 4s ease-in-out infinite;">
                            <!-- Outer animated glow ring -->
                            <div style="position: absolute; inset: -4px; border-radius: 26px; background: conic-gradient(from 0deg, #FFDE59, #00d4ff, #7c3aed, #10B981, #FFDE59); animation: rotateBorder 4s linear infinite; z-index: 0; filter: blur(3px); opacity: 0.85;"></div>
                            <!-- Inner white border -->
                            <div style="position: absolute; inset: 2px; border-radius: 22px; background: #141414; z-index: 1;"></div>
                            <!-- The 3D Character Image -->
                            <img src="hero-3d.png" 
                                 style="width: 100%; max-width: 390px; border-radius: 20px; display: block; position: relative; z-index: 2; border: 3px solid transparent; transition: transform 0.3s ease; cursor: pointer;"
                                 alt="3D AI Character"
                                 onmouseover="this.style.transform='scale(1.04) translateY(-4px)'"
                                 onmouseout="this.style.transform='scale(1) translateY(0)'">
                        </div>
                        <!-- Floating data cards -->
                        <div style="position: absolute; top: 12px; left: -10px; background: rgba(20,20,20,0.95); border: 1px solid rgba(255,222,89,0.5); border-radius: 14px; padding: 10px 14px; animation: heroFloat3D 3s ease-in-out 0.3s infinite; box-shadow: 0 8px 24px rgba(0,0,0,0.7), 0 0 16px rgba(255,222,89,0.15); backdrop-filter: blur(8px); z-index: 10;">
                            <div style="font-size: 9px; color: #64748B; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 4px;">AI Tasks Today</div>
                            <div style="font-size: 1.6rem; font-weight: 900; color: #FFDE59; line-height: 1;">142 ✓</div>
                        </div>
                        <div style="position: absolute; top: 12px; right: -10px; background: rgba(20,20,20,0.95); border: 1px solid rgba(16,185,129,0.5); border-radius: 14px; padding: 10px 14px; animation: heroFloat3D 3s ease-in-out 0.7s infinite; box-shadow: 0 8px 24px rgba(0,0,0,0.7), 0 0 16px rgba(16,185,129,0.2); backdrop-filter: blur(8px); z-index: 10;">
                            <div style="font-size: 9px; color: #64748B; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 4px;">Time Saved</div>
                            <div style="font-size: 1.6rem; font-weight: 900; color: #10B981; line-height: 1;">18h/mo</div>
                        </div>
                        <div style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); background: rgba(20,20,20,0.95); border: 1px solid rgba(0,212,255,0.5); border-radius: 14px; padding: 12px 20px; animation: heroFloat3D 3s ease-in-out 1.1s infinite; box-shadow: 0 8px 24px rgba(0,0,0,0.7), 0 0 16px rgba(0,212,255,0.15); backdrop-filter: blur(8px); z-index: 10; white-space: nowrap;">
                            <div style="font-size: 9px; color: #64748B; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 6px;">Productivity Boost</div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div style="height: 6px; width: 130px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; width: 78%; background: linear-gradient(90deg, #00d4ff, #7c3aed); border-radius: 3px; animation: heroBarGrow 2.5s ease-out;"></div>
                                </div>
                                <span style="font-size: 0.9rem; font-weight: 900; color: #00d4ff;">78%</span>
                            </div>
                        </div>
                        <!-- Sparkle particles -->
                        <div style="position: absolute; width: 7px; height: 7px; background: #FFDE59; border-radius: 50%; top: 25%; left: 2%; animation: heroParticle 4s ease-in-out infinite; box-shadow: 0 0 10px #FFDE59; z-index: 10;"></div>
                        <div style="position: absolute; width: 5px; height: 5px; background: #00d4ff; border-radius: 50%; bottom: 30%; right: 2%; animation: heroParticle 4s ease-in-out 1.5s infinite; box-shadow: 0 0 10px #00d4ff; z-index: 10;"></div>
                        <div style="position: absolute; width: 6px; height: 6px; background: #7c3aed; border-radius: 50%; top: 55%; left: 3%; animation: heroParticle 4s ease-in-out 2.2s infinite; box-shadow: 0 0 10px #7c3aed; z-index: 10;"></div>
                        <div style="position: absolute; width: 4px; height: 4px; background: #10B981; border-radius: 50%; top: 40%; right: 3%; animation: heroParticle 4s ease-in-out 0.8s infinite; box-shadow: 0 0 8px #10B981; z-index: 10;"></div>
                        <style>
                            @keyframes heroFloat3D { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(0.5deg); } }
                            @keyframes rotateBorder { to { transform: rotate(360deg); } }
                            @keyframes heroBarGrow { from { width: 0; } }
                            @keyframes heroParticle { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; } 50% { transform: translateY(-18px) scale(1.4); opacity: 1; } }
                        </style>
                    </div>
                </div>
            </div>
            <div style="position: absolute; top: -50%; right: -10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(243,198,35,0.15) 0%, transparent 70%); border-radius: 50%; z-index: 1;"></div>
        </div>

        <div class="flex gap-4 mb-8">
            <div class="badge badge-info" style="font-size: 0.875rem; padding: 0.5rem 1rem;">4 MODULES</div>
            <div class="badge badge-info" style="font-size: 0.875rem; padding: 0.5rem 1rem;">3 SESSIONS</div>
            <div class="badge badge-info" style="font-size: 0.875rem; padding: 0.5rem 1rem;">6 HOURS</div>
            <div class="badge badge-info" style="font-size: 0.875rem; padding: 0.5rem 1rem;">1 CAPSTONE</div>
        </div>

        <!-- AI Productivity Survey Tracker Card -->
        <div class="card mb-8" style="border-left: 5px solid var(--accent); background: var(--bg-main);">
            <div class="card-body flex justify-between items-center" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <h4 style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;">
                        📊 AI Productivity & ROI Tracker
                    </h4>
                    <p class="text-sm text-muted" style="margin-bottom: 0;">
                        ${!State.get('productivityFormBefore') ? 
                            'Start your AI journey by capturing your baseline productivity stats (takes 30 seconds).' :
                            (!State.get('productivityFormAfter') ? 
                                'Baseline registered. Don\'t forget to fill in the post-session feedback at the end!' :
                                'Congratulations! Your AI productivity gain has been recorded and computed.')
                        }
                    </p>
                </div>
                <div>
                    ${!State.get('productivityFormBefore') ? 
                        `<button class="btn btn-accent btn-small" onclick="window.location.hash=\'/productivity\'">Start Pre-Session Form</button>` :
                        (!State.get('productivityFormAfter') ? 
                            `<button class="btn btn-primary btn-small" onclick="window.location.hash=\'/productivity\'">Complete Session Feedback</button>` :
                            `<button class="btn btn-success btn-small" onclick="window.location.hash=\'/productivity\'">View ROI Dashboard</button>`)
                    }
                </div>
            </div>
        </div>

        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">My Achievements</h3></div>
            <div class="card-body">
                ${State.get('badges') && State.get('badges').length > 0 ? 
                    '<div class="flex gap-4 flex-wrap">' + State.get('badges').map(b => `<div class="badge badge-warning" style="font-size: 1rem; padding: 0.75rem 1.5rem; border: 1px solid var(--accent); background:rgba(255, 222, 89, 0.1);">🏆 ${b}</div>`).join('') + '</div>'
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

    // Generate Mobile QR Code
    setTimeout(() => {
        const qrContainer = document.getElementById('mobile-qr-code');
        if (qrContainer && typeof QRCode !== 'undefined') {
            qrContainer.innerHTML = ''; // clear if re-rendering
            new QRCode(qrContainer, {
                text: "https://dec-infra-dec-industries.vercel.app/",
                width: 64,
                height: 64,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.L
            });
        }
    }, 100);
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

// Global UI Utility: Download PDF
window.downloadPDF = function(title, contentHTML) {
    showToast('Preparing PDF...', 'info');
    setTimeout(() => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            showToast('Popup blocked. Cannot generate PDF.', 'error');
            return;
        }
        printWindow.document.write(`
            <html>
            <head>
                <title>${title}</title>
                <style>
                    body { font-family: sans-serif; padding: 2rem; color: #1e293b; max-width: 800px; margin: 0 auto; line-height: 1.6; }
                    h1 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 2rem; }
                    h2 { margin-top: 2rem; color: #334155; }
                    .alert { padding: 1rem; border-left: 4px solid; margin-bottom: 1rem; background:var(--bg-card); }
                    .alert-green { border-color: #10b981; }
                    .alert-amber { border-color: #f59e0b; }
                    .alert-red { border-color: #ef4444; }
                </style>
            </head>
            <body>
                <h1>${title}</h1>
                ${contentHTML}
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 500);
                    }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }, 500);
};


function renderModule1(container) {
    let activeSubTab = 'agenda';

    function drawModule1View() {
        let contentHtml = '';
        if (activeSubTab === 'agenda') {
            contentHtml = `<div class="card mb-8" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="background: linear-gradient(135deg, #141414 0%, #333333 100%); padding: 2rem; color: white;">
                <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem; color: white; display: flex; align-items: center; gap: 0.75rem;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Module 1 Agenda
                </h3>
                <p style="opacity: 0.9; margin: 0; font-size: 1rem;">Before we dive into the frameworks, let's explore what we will cover and how different roles leverage AI today.</p>
            </div>
            <div style="padding: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; background: var(--bg-main);">
                <div style="display: flex; gap: 1rem; align-items: flex-start; background: var(--bg-card); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
                    <div style="background: rgba(255, 222, 89, 0.1); color: #FFDE59; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 1.2rem;">1</div>
                    <div>
                        <h4 style="margin-bottom: 0.5rem; color: var(--text-main);">Role-Specific AI</h4>
                        <p class="text-sm text-muted">Discover how AI transforms your specific workflow at DEC.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; align-items: flex-start; background: var(--bg-card); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
                    <div style="background: rgba(16, 185, 129, 0.1); color: #10b981; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 1.2rem;">2</div>
                    <div>
                        <h4 style="margin-bottom: 0.5rem; color: var(--text-main);">Prompt Frameworks</h4>
                        <p class="text-sm text-muted">Learn the anatomy of a good prompt and enterprise best practices.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; align-items: flex-start; background: var(--bg-card); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
                    <div style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 1.2rem;">3</div>
                    <div>
                        <h4 style="margin-bottom: 0.5rem; color: var(--text-main);">Hands-on Labs</h4>
                        <p class="text-sm text-muted">Apply your skills in real-world scenarios with our custom prompt builder.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- NEW: Role-Specific AI Use Cases (Astroship/Vercel Style) -->
        <div class="mb-8" style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">How Can Your Role Leverage AI?</h3>
                    <p class="text-muted" style="margin: 0;">Select your department domain below to see tailored AI tools and use cases.</p>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem; overflow-x: auto; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); scrollbar-width: none;">
                <button class="role-tab-btn active" onclick="window.switchRoleTab('project-exec')" id="btn-project-exec" style="background: transparent; border: none; padding: 0.5rem 1rem; font-weight: 600; color: #FFDE59; border-bottom: 2px solid #FFDE59; cursor: pointer; white-space: nowrap; transition: all 0.2s;">Project Execution</button>
                <button class="role-tab-btn" onclick="window.switchRoleTab('quality')" id="btn-quality" style="background: transparent; border: none; padding: 0.5rem 1rem; font-weight: 500; color: var(--text-muted); border-bottom: 2px solid transparent; cursor: pointer; white-space: nowrap; transition: all 0.2s;">Quality & Safety</button>
                <button class="role-tab-btn" onclick="window.switchRoleTab('infra-it')" id="btn-infra-it" style="background: transparent; border: none; padding: 0.5rem 1rem; font-weight: 500; color: var(--text-muted); border-bottom: 2px solid transparent; cursor: pointer; white-space: nowrap; transition: all 0.2s;">Infrastructure & IT</button>
            </div>

            <!-- Project Execution Tab -->
            <div id="tab-project-exec" class="role-tab-content">
                <div class="dashboard-grid">
                    <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;">
                        <div style="padding: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.5); display: flex; align-items: center; gap: 1rem; background: var(--bg-card);">
                            <div style="background: rgba(255, 222, 89, 0.1); color: #FFDE59; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">👷</div>
                            <h4 style="margin: 0; font-size: 1.1rem; color: var(--text-main);">Project Managers</h4>
                        </div>
                        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #FFDE59; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">ChatGPT / Claude</strong>
                                <span class="text-xs text-muted">Draft proposals, summarize minutes, create communication templates</span>
                            </div>
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #10b981; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">Copilot (Excel)</strong>
                                <span class="text-xs text-muted">Auto-generate dashboards, analyze timeline & budget variances</span>
                            </div>
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #f59e0b; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">Google Gemini</strong>
                                <span class="text-xs text-muted">Analyze contracts, extract milestones, organize project info</span>
                            </div>
                        </div>
                    </div>

                    <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;">
                        <div style="padding: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.5); display: flex; align-items: center; gap: 1rem; background: var(--bg-card);">
                            <div style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🏗️</div>
                            <h4 style="margin: 0; font-size: 1.1rem; color: var(--text-main);">Site Supervisors</h4>
                        </div>
                        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #FFDE59; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">ChatGPT Vision (Mobile)</strong>
                                <span class="text-xs text-muted">Assess site conditions, document progress visually</span>
                            </div>
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #10b981; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">Google Sheets + AI</strong>
                                <span class="text-xs text-muted">Auto-populate daily reports, track labor & material usage</span>
                            </div>
                        </div>
                    </div>

                    <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;">
                        <div style="padding: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.5); display: flex; align-items: center; gap: 1rem; background: var(--bg-card);">
                            <div style="background: rgba(255, 222, 89, 0.1); color: #FFDE59; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">⚙️</div>
                            <h4 style="margin: 0; font-size: 1.1rem; color: var(--text-main);">Technical Staff</h4>
                        </div>
                        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #FFDE59; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">Engineering Mode Prompting</strong>
                                <span class="text-xs text-muted">Verify specs, research standards, generate documentation</span>
                            </div>
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #ec4899; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">Architecture Copilot</strong>
                                <span class="text-xs text-muted">Suggest design improvements, check design against codes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quality Tab -->
            <div id="tab-quality" class="role-tab-content hidden">
                <div class="dashboard-grid">
                    <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;">
                        <div style="padding: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.5); display: flex; align-items: center; gap: 1rem; background: var(--bg-card);">
                            <div style="background: rgba(16, 185, 129, 0.1); color: #10b981; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">✓</div>
                            <h4 style="margin: 0; font-size: 1.1rem; color: var(--text-main);">Quality Controllers</h4>
                        </div>
                        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #FFDE59; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">ChatGPT Vision</strong>
                                <span class="text-xs text-muted">Analyze defects from site photos, classify severity</span>
                            </div>
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #f59e0b; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">Power BI + AI</strong>
                                <span class="text-xs text-muted">Generate QC dashboards, trend analysis of defect types</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;">
                        <div style="padding: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.5); display: flex; align-items: center; gap: 1rem; background: var(--bg-card);">
                            <div style="background: rgba(239, 68, 68, 0.1); color: #ef4444; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🛡️</div>
                            <h4 style="margin: 0; font-size: 1.1rem; color: var(--text-main);">Safety Officers</h4>
                        </div>
                        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #ef4444; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">Claude</strong>
                                <span class="text-xs text-muted">Draft safety policies, generate incident reports</span>
                            </div>
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #10b981; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">Copilot for Word/Excel</strong>
                                <span class="text-xs text-muted">Auto-create safety training docs, analyze KPIs</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;">
                        <div style="padding: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.5); display: flex; align-items: center; gap: 1rem; background: var(--bg-card);">
                            <div style="background: rgba(255, 222, 89, 0.1); color: #FFDE59; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📋</div>
                            <h4 style="margin: 0; font-size: 1.1rem; color: var(--text-main);">Compliance Team</h4>
                        </div>
                        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #FFDE59; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">Claude / GPT</strong>
                                <span class="text-xs text-muted">Audit documents, create compliance matrices</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Infra IT Tab -->
            <div id="tab-infra-it" class="role-tab-content hidden">
                <div class="dashboard-grid">
                    <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;">
                        <div style="padding: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.5); display: flex; align-items: center; gap: 1rem; background: var(--bg-card);">
                            <div style="background: rgba(255, 222, 89, 0.1); color: #FFDE59; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🏗️</div>
                            <h4 style="margin: 0; font-size: 1.1rem; color: var(--text-main);">Technical Planning</h4>
                        </div>
                        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #FFDE59; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">ChatGPT Code Interpreter</strong>
                                <span class="text-xs text-muted">Analyze site surveys, model logistics, calculate resources</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;">
                        <div style="padding: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.5); display: flex; align-items: center; gap: 1rem; background: var(--bg-card);">
                            <div style="background: rgba(255, 222, 89, 0.1); color: #FFDE59; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">💻</div>
                            <h4 style="margin: 0; font-size: 1.1rem; color: var(--text-main);">System Management</h4>
                        </div>
                        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border-left: 3px solid #FFDE59; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">
                                <strong style="display: block; font-size: 0.875rem; color: var(--text-main); margin-bottom: 0.25rem;">GitHub Copilot</strong>
                                <span class="text-xs text-muted">Auto-generate scripts, debug infrastructure code</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <!-- NEW: Anatomy of a Good Prompt -->
        <div class="card mb-8" style="border-left: 4px solid var(--info); box-shadow: 0 4px 20px rgba(255, 222, 89, 0.05);">
            <div class="card-header"><h3 class="card-title">Anatomy of a Good Prompt (Theoretical Framework)</h3></div>
            <div class="card-body">
                <p class="text-muted mb-4">A structured prompt acts as a clear set of instructions for the AI, reducing ambiguity and hallucination.</p>
                <div class="dashboard-grid">
                    <div class="p-3 border rounded" style="background:var(--bg-card); border-top: 3px solid #FFDE59;">
                        <strong style="color:#FFDE59; font-size: 1.1rem; display: block; margin-bottom: 0.25rem;">1. Role</strong>
                        <span class="text-sm" style="color: #F8FAFC;">Who is the AI? (e.g., "Act as a Senior Procurement Manager")</span>
                    </div>
                    <div class="p-3 border rounded" style="background:var(--bg-card); border-top: 3px solid var(--accent);">
                        <strong style="color:var(--accent); font-size: 1.1rem; display: block; margin-bottom: 0.25rem;">2. Context</strong>
                        <span class="text-sm" style="color: #F8FAFC;">What is the background? (e.g., "We are comparing 3 vendor quotes for Metro Line B.")</span>
                    </div>
                    <div class="p-3 border rounded" style="background:var(--bg-card); border-top: 3px solid var(--success);">
                        <strong style="color:var(--success); font-size: 1.1rem; display: block; margin-bottom: 0.25rem;">3. Task</strong>
                        <span class="text-sm" style="color: #F8FAFC;">What exactly must the AI do? (e.g., "Create a comparison table.")</span>
                    </div>
                    <div class="p-3 border rounded" style="background:var(--bg-card); border-top: 3px solid var(--warning);">
                        <strong style="color:var(--warning); font-size: 1.1rem; display: block; margin-bottom: 0.25rem;">4. Input Data</strong>
                        <span class="text-sm" style="color: #F8FAFC;">What data is provided? (e.g., "See the attached CSV data.")</span>
                    </div>
                    <div class="p-3 border rounded" style="background:var(--bg-card); border-top: 3px solid var(--danger);">
                        <strong style="color:var(--danger); font-size: 1.1rem; display: block; margin-bottom: 0.25rem;">5. Constraints</strong>
                        <span class="text-sm" style="color: #F8FAFC;">What should it NOT do? (e.g., "Do not invent prices if missing.")</span>
                    </div>
                    <div class="p-3 border rounded" style="background:var(--bg-card); border-top: 3px solid #FFFFFF;">
                        <strong style="color:#FFFFFF; font-size: 1.1rem; display: block; margin-bottom: 0.25rem;">6. Output Format</strong>
                        <span class="text-sm" style="color: #F8FAFC;">How should it look? (e.g., "Format as Markdown table with a summary.")</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- NEW: Prompting Patterns -->
        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">Prompting Patterns Library</h3></div>
            <div class="card-body dashboard-grid">
                <div class="ai-result-box" style="background: var(--bg-card);">
                    <h4 class="mb-2" style="color: var(--info);">1. Zero-Shot Prompting</h4>
                    <p class="text-sm text-muted mb-2">Asking the AI a question with no prior examples.</p>
                    <pre class="p-2 rounded text-xs" style="background:rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #F8FAFC;">"What is a standard penalty clause for delays?"</pre>
                </div>
                <div class="ai-result-box" style="background: var(--bg-card);">
                    <h4 class="mb-2" style="color: var(--accent);">2. Few-Shot Prompting</h4>
                    <p class="text-sm text-muted mb-2">Providing 2-3 examples so the AI learns the format.</p>
                    <pre class="p-2 rounded text-xs" style="background:rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #F8FAFC;">"Ex 1: Minor Delay -> 1% penalty.\nEx 2: Safety Issue -> ₹5000 penalty.\nNow classify this incident..."</pre>
                </div>
                <div class="ai-result-box" style="background: var(--bg-card);">
                    <h4 class="mb-2" style="color: var(--success);">3. Chain of Thought</h4>
                    <p class="text-sm text-muted mb-2">Forcing the AI to explain its reasoning step-by-step.</p>
                    <pre class="p-2 rounded text-xs" style="background:rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #F8FAFC;">"Think step-by-step to calculate the total manpower cost based on the attendance log before giving the final number."</pre>
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
                    <textarea class="form-control mb-2" id="good-prompt-output" rows="4" readonly style="background:var(--bg-card); border-color:var(--accent);"></textarea>
                    <button class="btn btn-primary w-full" id="btn-use-optimized" disabled>Use This Structure</button>
                </div>
            </div>
        </div>

        <!-- NEW: System Persona Sandbox -->
        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">System Persona Sandbox</h3></div>
            <div class="card-body">
                <p class="mb-4 text-muted">See how changing the underlying "System Persona" alters the AI's response to the exact same User Prompt.</p>
                <div class="dashboard-grid">
                    <div>
                        <div class="form-group">
                            <label class="form-label text-sm">System Persona</label>
                            <select id="sys-persona" class="form-control mb-2">
                                <option value="legal">Strict DEC Lawyer</option>
                                <option value="marketing">Creative Marketing Exec</option>
                                <option value="concise">Concise Data Analyst</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label text-sm">User Prompt</label>
                            <textarea id="sys-user-prompt" class="form-control mb-2" rows="2">Review this vendor contract and give me a summary.</textarea>
                        </div>
                        <button class="btn btn-primary w-full" id="btn-run-persona">Run with Persona</button>
                    </div>
                    <div class="ai-result-box" style="margin-top:0;">
                        <h4 class="mb-2">AI Response</h4>
                        <div id="sys-persona-out" class="text-sm" style="line-height: 1.5; color: var(--text-main);"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- NEW: Excel Formula Lab -->
        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">Everyday Automation: Excel Formulas</h3></div>
            <div class="card-body">
                <p class="mb-4 text-muted">Use AI to generate complex Excel formulas instantly without memorizing syntax.</p>
                <div class="dashboard-grid">
                    <div>
                        <div class="form-group">
                            <label class="form-label text-sm">What do you want to do in Excel?</label>
                            <textarea id="excel-prompt" class="form-control mb-2" rows="3">I have Employee ID in A, and I need to look up their Salary from Sheet2 based on the ID.</textarea>
                        </div>
                        <button class="btn btn-primary w-full" id="btn-generate-excel">Generate Formula ✨</button>
                    </div>
                    <div class="ai-result-box" style="margin-top:0; border-color: #10B981;">
                        <h4 class="mb-2" style="color: #10B981;">Generated Excel Formula</h4>
                        <pre id="excel-out" class="p-3 rounded text-sm mb-2" style="background: var(--bg-main); font-weight: bold; overflow-x: auto;">Click Generate to see the formula.</pre>
                        <button class="btn btn-secondary btn-small w-full" onclick="showToast('Formula copied!', 'success')">Copy Formula</button>
                    </div>
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

        </div>

        <!-- NEW: Claude Projects Personal Assistant Lab -->
        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">Build Your Personal AI Assistant (Claude Projects)</h3></div>
            <div class="card-body">
                <p class="mb-4 text-muted">Learn how to create a custom AI assistant trained exactly on your department's templates and SOPs.</p>
                <div class="dashboard-grid">
                    <div>
                        <div class="form-group mb-4">
                            <label class="form-label font-bold text-sm">1. System Instructions (Prompt)</label>
                            <textarea id="claude-inst" class="form-control" rows="3">You are a DEC Site Manager Assistant. Always format reports using the standard Weekly Progress template. Strictly adhere to the uploaded Site Safety SOP.</textarea>
                        </div>
                        <div class="form-group mb-4">
                            <label class="form-label font-bold text-sm">2. Project Knowledge (Uploads)</label>
                            <div class="p-3 border rounded" style="background:var(--bg-main); border: 1px dashed var(--accent);">
                                <label class="flex items-center gap-2 mb-2 text-sm"><input type="checkbox" checked disabled> DEC_Weekly_Report_Template.docx</label>
                                <label class="flex items-center gap-2 text-sm"><input type="checkbox" id="chk-sop" checked> Site_Safety_SOP_v2.pdf</label>
                            </div>
                        </div>
                        <button class="btn btn-primary w-full" id="btn-claude-test">Test Assistant</button>
                    </div>
                    <div>
                        <div class="form-group mb-2">
                            <label class="form-label font-bold text-sm">3. Test Sandbox</label>
                            <textarea id="claude-user-prompt" class="form-control" rows="2">Write a quick report about a minor injury on site today.</textarea>
                        </div>
                        <div class="ai-result-box" style="margin-top:0; min-height:150px;">
                            <span class="ai-badge">Claude Project Output</span>
                            <div id="claude-out" class="mt-2 text-sm" style="line-height: 1.5;">Click 'Test Assistant' to see output...</div>
                        </div>
                    </div>
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
        
        } else if (activeSubTab === '1a') {
            contentHtml = `<div class="prompt-module">
  <h2 style="font-size: 18px; font-weight: 500; margin: 0 0 20px; color: #FFFFFF;">Module 1A: Crafting Effective Prompts for Construction</h2>
  
  <div class="tabs-container">
    <button class="tab-btn active" onclick="switchTab(event, 'scenario1')">Project Summary</button>
    <button class="tab-btn" onclick="switchTab(event, 'scenario2')">Site Report</button>
    <button class="tab-btn" onclick="switchTab(event, 'scenario3')">Safety Protocol</button>
    <button class="tab-btn" onclick="switchTab(event, 'scenario4')">Vendor Communication</button>
  </div>

  <!-- SCENARIO 1: Project Summary -->
  <div id="scenario1" class="tab-content active">
    <div class="scenario-card">
      <div class="role-badge">Project Manager</div>
      <h3 class="scenario-title">
        <span>📋</span>
        Generate Weekly Project Summary from Raw Data
      </h3>

      <div class="prompt-section">
        <div class="section-label">Context</div>
        <p style="font-size: 14px; color: #9CA3AF; margin: 0;">You have scattered project updates from team members. You need a professional executive summary in 5 minutes instead of spending 1 hour compiling it.</p>
      </div>

      <div class="comparison">
        <div class="comparison-col">
          <div class="comparison-label" style="color: #EF4444;">❌ Vague Prompt</div>
          <div class="bad-prompt">Summarize this week's work</div>
        </div>
        <div class="comparison-col">
          <div class="comparison-label" style="color: #10B981;">✓ Better Prompt</div>
          <div class="good-prompt">Create a weekly project summary for IISER Library project (Tirupati, AP). Include: 
• Completed milestones this week
• % progress vs. target
• Budget spent vs. budget allocated
• Top 3 risks/delays
• Next week's priorities
Keep it under 150 words, professional tone.</div>
        </div>
      </div>

      <div class="key-tips">
        <div class="tip-item">
          <span class="tip-icon">🎯</span>
          <span><strong>Be specific:</strong> Include project name, location, stakeholders involved</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">📊</span>
          <span><strong>Define structure:</strong> Tell AI exactly what sections you want (milestones, budget, risks)</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">⏱️</span>
          <span><strong>Set constraints:</strong> Word limits, tone (professional/casual), date formats</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">📎</span>
          <span><strong>Provide context:</strong> Paste raw meeting notes, emails, or status updates</span>
        </div>
      </div>

      <div style="margin-top: 16px; background: #1C1C1C; padding: 12px; border-radius: 8px; border-left: 3px solid #FFDE59;">
        <p style="font-size: 13px; color: #9CA3AF; margin: 0;"><strong>💡 Pro Tip:</strong> Use this prompt template: "Create a [type] for [project] including [specific sections]. Keep it [length] and use [tone]."</p>
      </div>
    </div>
  </div>

  <!-- SCENARIO 2: Site Report -->
  <div id="scenario2" class="tab-content">
    <div class="scenario-card">
      <div class="role-badge">Site Supervisor</div>
      <h3 class="scenario-title">
        <span>🏗️</span>
        Convert Field Notes into Formal Daily Site Report
      </h3>

      <div class="prompt-section">
        <div class="section-label">Context</div>
        <p style="font-size: 14px; color: #9CA3AF; margin: 0;">You've taken quick notes on your phone all day. Need to turn them into a formal report that the PM and client can read.</p>
      </div>

      <div class="comparison">
        <div class="comparison-col">
          <div class="comparison-label" style="color: #EF4444;">❌ Weak Prompt</div>
          <div class="bad-prompt">Turn this into a report:
"Had 45 workers. Poured concrete north wing. Weather was hot. Some delays"</div>
        </div>
        <div class="comparison-col">
          <div class="comparison-label" style="color: #10B981;">✓ Strong Prompt</div>
          <div class="good-prompt">Format as daily site report (date: 15-Aug-2026). Raw notes: "45 workers on-site. Poured 80 cubic meters concrete north wing foundation (target: 100m³ - 20% below due to heat). Weather: 42°C, high humidity. 2-hour lunch break extended by safety order. Rebar inspection passed. No incidents."

Include: Date | Weather | Workforce | Major Activities | % of Planned Work Completed | Issues & Delays | Safety Notes | Next Day Plan</div>
        </div>
      </div>

      <div class="key-tips">
        <div class="tip-item">
          <span class="tip-icon">📍</span>
          <span><strong>Include meta-data:</strong> Date, project name, weather, workforce count</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🔢</span>
          <span><strong>Add numbers:</strong> Quantities (concrete poured, workers), percentages, times</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">⚠️</span>
          <span><strong>Highlight issues:</strong> Delays, weather impacts, safety incidents, deviations</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">👥</span>
          <span><strong>Mention context:</strong> Workforce, equipment used, inspections passed</span>
        </div>
      </div>

      <div style="margin-top: 16px; background: #1C1C1C; padding: 12px; border-radius: 8px; border-left: 3px solid #FFDE59;">
        <p style="font-size: 13px; color: #9CA3AF; margin: 0;"><strong>💡 Pro Tip:</strong> Voice-record your notes on phone, transcribe with Whisper/Google Docs, then paste to AI. Saves 30 mins daily!</p>
      </div>
    </div>
  </div>

  <!-- SCENARIO 3: Safety Protocol -->
  <div id="scenario3" class="tab-content">
    <div class="scenario-card">
      <div class="role-badge">Safety Officer</div>
      <h3 class="scenario-title">
        <span>🛡️</span>
        Create Safety Protocol from Regulatory Requirements
      </h3>

      <div class="prompt-section">
        <div class="section-label">Context</div>
        <p style="font-size: 14px; color: #9CA3AF; margin: 0;">You have OSHA/Indian labor code requirements but need to turn them into an actionable site-specific procedure for DEC Infra teams.</p>
      </div>

      <div class="comparison">
        <div class="comparison-col">
          <div class="comparison-label" style="color: #EF4444;">❌ Generic Prompt</div>
          <div class="bad-prompt">Write a safety protocol for height work</div>
        </div>
        <div class="comparison-col">
          <div class="comparison-label" style="color: #10B981;">✓ Tailored Prompt</div>
          <div class="good-prompt">Create a site safety protocol for DEC Infra - IISER Tirupati project (height work above 2 meters). Target audience: Site supervisors & workers (use simple language).

Include:
• Scope (applies to work >2m height)
• Required PPE (with DEC company gear codes)
• Pre-work checklist (3-5 items)
• Responsibilities (supervisor, worker, safety officer)
• Emergency procedures
• Non-compliance consequences

Comply with Indian Building Code + OSHA guidelines. Make it 1 page, printable.</div>
        </div>
      </div>

      <div class="key-tips">
        <div class="tip-item">
          <span class="tip-icon">🏢</span>
          <span><strong>Company-specific:</strong> Use DEC Infra name, actual project names, company standards</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">👥</span>
          <span><strong>Right audience:</strong> Write for site workers (simple language), not legal teams</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">✅</span>
          <span><strong>Compliance mention:</strong> Reference actual codes (Indian BC, OSHA, local regulations)</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">📋</span>
          <span><strong>Practical format:</strong> Checklists, bullet points, easy to print & post</span>
        </div>
      </div>

      <div style="margin-top: 16px; background: #1C1C1C; padding: 12px; border-radius: 8px; border-left: 3px solid #FFDE59;">
        <p style="font-size: 13px; color: #9CA3AF; margin: 0;"><strong>💡 Pro Tip:</strong> Ask AI to "summarize in 3 sentences" at the end so busy PMs get the gist instantly.</p>
      </div>
    </div>
  </div>

  <!-- SCENARIO 4: Vendor Communication -->
  <div id="scenario4" class="tab-content">
    <div class="scenario-card">
      <div class="role-badge">Project Manager</div>
      <h3 class="scenario-title">
        <span>✉️</span>
        Draft Professional Vendor Communications
      </h3>

      <div class="prompt-section">
        <div class="section-label">Context</div>
        <p style="font-size: 14px; color: #9CA3AF; margin: 0;">Need to send a vendor a detailed RFQ (Request for Quote) but don't want to spend time on perfect wording.</p>
      </div>

      <div class="comparison">
        <div class="comparison-col">
          <div class="comparison-label" style="color: #EF4444;">❌ Unclear Prompt</div>
          <div class="bad-prompt">Write an email asking for a quote on concrete</div>
        </div>
        <div class="comparison-col">
          <div class="comparison-label" style="color: #10B981;">✓ Detailed Prompt</div>
          <div class="good-prompt">Draft professional RFQ email to concrete supplier. Details:
• Project: IISER Library, Tirupati
• Requirement: 150 cubic meters M30 grade concrete
• Delivery timeline: Week of 20-Aug
• Delivery location: Site address [add address]
• Required docs: COA (Certificate of Analysis), delivery slip
• Payment terms: 30-day net
• Compliance: Indian Standards IS 456

Keep email tone: professional but friendly. Include subject line. Sign as [Your Name], DEC Infra.</div>
        </div>
      </div>

      <div class="key-tips">
        <div class="tip-item">
          <span class="tip-icon">🏷️</span>
          <span><strong>Exact specs:</strong> Grades, quantities, delivery dates, standards (IS 456, etc.)</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">💼</span>
          <span><strong>Business details:</strong> Payment terms, inspection requirements, penalties</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🎯</span>
          <span><strong>Clear expectations:</strong> What docs they must provide (CoA, test reports)</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">📧</span>
          <span><strong>Tone setting:</strong> Request "professional but friendly," "formal," etc.</span>
        </div>
      </div>

      <div style="margin-top: 16px; background: #1C1C1C; padding: 12px; border-radius: 8px; border-left: 3px solid #FFDE59;">
        <p style="font-size: 13px; color: #9CA3AF; margin: 0;"><strong>💡 Pro Tip:</strong> Tell AI "Ensure all compliance points are covered" - it'll catch missing requirements you might forget!</p>
      </div>
    </div>
  </div>

</div>`;
        } else if (activeSubTab === '1b') {
            contentHtml = `<div class="excel-module">
  <h2 style="font-size: 18px; font-weight: 500; margin: 0 0 20px; color: #FFFFFF;">Module 1B: Protect & Analyze Excel Files with AI</h2>

  <div class="tabs-container">
    <button class="tab-btn active" onclick="switchTab(event, 'demo1')">Budget Analysis</button>
    <button class="tab-btn" onclick="switchTab(event, 'demo2')">Variance Analysis</button>
    <button class="tab-btn" onclick="switchTab(event, 'demo3')">Data Protection</button>
    <button class="tab-btn" onclick="switchTab(event, 'demo4')">Cost Breakdown</button>
  </div>

  <!-- DEMO 1: Budget Analysis -->
  <div id="demo1" class="tab-content active">
    <div class="demo-card">
      <div class="role-badge">Project Manager / Finance</div>
      <h3 class="demo-title">
        <span>💰</span>
        AI Budget Variance Analysis (Live Demo)
      </h3>

      <div style="margin-bottom: 16px;">
        <p style="font-size: 14px; color: #9CA3AF; margin: 0 0 12px; font-weight: 500;">Scenario: IISER Library Project - Monthly Budget Review</p>
        <p style="font-size: 13px; color: #9CA3AF; margin: 0;">Raw Excel data (scraped values from your spreadsheet):</p>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Budget Line Item</th>
            <th>Budgeted (₹ Lacs)</th>
            <th>Spent to Date (₹ Lacs)</th>
            <th>% Spent</th>
            <th>Remaining (₹ Lacs)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Civil Works - Foundation</td>
            <td>45.00</td>
            <td>48.50</td>
            <td>107.8%</td>
            <td>-3.50</td>
          </tr>
          <tr>
            <td>Structural - RCC Frame</td>
            <td>65.00</td>
            <td>52.30</td>
            <td>80.5%</td>
            <td>12.70</td>
          </tr>
          <tr>
            <td>MEP (Mechanical)</td>
            <td>28.00</td>
            <td>15.20</td>
            <td>54.3%</td>
            <td>12.80</td>
          </tr>
          <tr>
            <td>Electrical Systems</td>
            <td>22.00</td>
            <td>18.90</td>
            <td>85.9%</td>
            <td>3.10</td>
          </tr>
          <tr>
            <td>Finishes (Paint, Flooring)</td>
            <td>35.00</td>
            <td>8.50</td>
            <td>24.3%</td>
            <td>26.50</td>
          </tr>
          <tr style="background: #1C1C1C; font-weight: 500;">
            <td>TOTAL</td>
            <td>195.00</td>
            <td>143.40</td>
            <td>73.5%</td>
            <td>51.60</td>
          </tr>
        </tbody>
      </table>

      <div class="step-section">
        <strong>Step 1: Copy this data from Excel</strong>
        <p style="margin: 8px 0 0; font-size: 12px;">Select the table → Copy → Paste into ChatGPT/Claude</p>
      </div>

      <div class="step-section">
        <strong>Step 2: Use this prompt with AI</strong>
      </div>

      <div class="prompt-input">Analyze this project budget data from our IISER Library project:

[PASTE YOUR EXCEL TABLE HERE]

Provide:
1. Key findings (which line items are over/under budget?)
2. Red flags (items exceeding 100% - why?)
3. Risk assessment (will remaining budget cover finish work?)
4. Top 3 recommendations to stay on budget
5. Forecast: If spending continues at current rate, what will final project cost be?

Keep it 200 words max, use rupees, be specific with numbers.</div>

      <div class="analysis-box">
        <strong style="color: #10B981;">🤖 Example AI Output:</strong>
        <p style="margin: 8px 0;">Foundation work is <strong>7.8% over budget</strong> (₹48.5L vs ₹45L budget) - likely due to soil conditions requiring extra reinforcement. RCC frame is on track at 80.5%. Biggest risk: Finishes phase only started (24.3% spent) but ₹26.5L remains - if finish costs inflate (common in India due to labor), project could exceed budget by ₹2-3L. <strong>Recommendation:</strong> Lock finish material rates NOW, negotiate labor contracts, and monitor daily rates on site.</p>
      </div>

      <div class="protection-tip">
        <strong>🔒 Data Protection Tip:</strong> Don't paste sensitive vendor rates or client costs. Instead: "Our Foundation work exceeded budget by 8%. What could cause this?" → AI gives you generic troubleshooting without seeing real amounts.
      </div>

      <div class="key-section">
        <strong style="color: #FFFFFF;">🎯 What This Does:</strong>
        <ul class="insights-list">
          <li>Spot budget overruns in seconds (would take Excel formulas + manual review)</li>
          <li>Flags risks automatically (foundation overage → soil issues → supply chain delays?)</li>
          <li>Suggests corrective actions (negotiate, reallocate, fast-track)</li>
          <li>Gives you talking points for client calls</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- DEMO 2: Variance Analysis -->
  <div id="demo2" class="tab-content">
    <div class="demo-card">
      <div class="role-badge">Project Manager / Cost Controller</div>
      <h3 class="demo-title">
        <span>📊</span>
        AI Detects Budget Variances You Might Miss
      </h3>

      <p style="font-size: 14px; color: #9CA3AF; margin: 0 0 12px;">Real scenario: Monthly spend by category across 3 concurrent DEC Infra projects:</p>

      <table class="data-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Civil Works (₹L)</th>
            <th>MEP (₹L)</th>
            <th>Finishes (₹L)</th>
            <th>Contingency Used (₹L)</th>
            <th>Total Month (₹L)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>IISER Library</td>
            <td>18.5</td>
            <td>6.2</td>
            <td>3.1</td>
            <td>2.0</td>
            <td>29.8</td>
          </tr>
          <tr>
            <td>Medical College</td>
            <td>22.3</td>
            <td>8.5</td>
            <td>1.8</td>
            <td>1.5</td>
            <td>34.1</td>
          </tr>
          <tr>
            <td>IT Park</td>
            <td>12.1</td>
            <td>9.8</td>
            <td>5.6</td>
            <td>3.2</td>
            <td>30.7</td>
          </tr>
        </tbody>
      </table>

      <div class="prompt-input">Compare spending patterns across our 3 projects:

[PASTE TABLE]

Questions:
1. Which project is spending contingency highest? Red flag?
2. Why is IT Park spending more on MEP than others?
3. Which project is most at risk if delays happen?
4. Rank projects by budget health (1 = best, 3 = worst)
5. What should we monitor closely next month?

Give actionable insights, not just numbers.</div>

      <div class="analysis-box">
        <strong style="color: #10B981;">🤖 Sample AI Output:</strong>
        <p style="margin: 8px 0;"><strong>At Risk: IT Park</strong> - Already using 32% of contingency (₹3.2L of ~₹10L total). MEP spend (₹9.8L) is higher than peers, suggesting complex systems or scope creep. <strong>Healthiest: Medical College</strong> - Spending contingency at 16% rate, linear civil progress. <strong>Monitor:</strong> IISER's finishing cost trajectory; current ₹3.1L/month suggests ₹9-12L total (may exceed budget if interior specs expand).</p>
      </div>

      <div class="warning-box">
        <strong>⚠️ Why Manual Review Misses This:</strong> You'd scan numbers, see IT Park MEP at ₹9.8L and think "OK, engineering is complex." AI connects it to contingency burn + project timeline → "high risk of overrun if delays cascade."
      </div>

      <div class="key-section">
        <strong style="color: #FFFFFF;">Benefits of AI Variance Analysis:</strong>
        <ul class="insights-list">
          <li>Spots cross-project spending anomalies (which PM is over-spending?)</li>
          <li>Flags contingency burn rate (how many months until reserves dry up?)</li>
          <li>Predicts which projects will need cost intervention</li>
          <li>Gives early warnings before problems blow up</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- DEMO 3: Data Protection -->
  <div id="demo3" class="tab-content">
    <div class="demo-card">
      <div class="role-badge">All Roles</div>
      <h3 class="demo-title">
        <span>🔐</span>
        Protecting Sensitive Data While Using AI
      </h3>

      <p style="font-size: 14px; color: #9CA3AF; margin: 0 0 16px; font-weight: 500;">Critical: What you paste into ChatGPT/Claude gets logged. Never paste client pricing, salaries, confidential costs.</p>

      <div style="margin: 16px 0;">
        <p style="font-size: 13px; font-weight: 500; color: #FFFFFF; margin: 0 0 12px;">Method 1: Anonymize Before Sharing</p>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 45%;">❌ DON'T Send This</th>
              <th style="width: 45%;">✅ ANONYMIZE & Send This</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-family: var(--font-mono); font-size: 11px;">Project: IISER Tirupati
Vendor A: ₹45L
Vendor B: ₹52L
[Real names & rates]</td>
              <td style="font-family: var(--font-mono); font-size: 11px;">Project: Library Project
Option 1: ₹45L
Option 2: ₹52L
[No vendor names]</td>
            </tr>
            <tr>
              <td style="font-family: var(--font-mono); font-size: 11px;">Salary: Manager ₹8.5L
Sr. Engineer: ₹6L
Labor cost: ₹2.1L/day</td>
              <td style="font-family: var(--font-mono); font-size: 11px;">Personnel Cost Budget: Line A (₹8.5L), Line B (₹6L)
Productivity rate: ₹X/day
[No names, masked amounts]</td>
            </tr>
            <tr>
              <td style="font-family: var(--font-mono); font-size: 11px;">Client: IISER
Budget: ₹195L
Profit margin: 12%</td>
              <td style="font-family: var(--font-mono); font-size: 11px;">Project Budget: ₹XYZ
Cost: ₹ABC
Margin analysis: compare %</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="protection-tip">
        <strong>✅ What's SAFE to share:</strong>
        <ul style="margin: 8px 0; padding-left: 20px; font-size: 13px;">
          <li>Budget line items without vendor names</li>
          <li>Percentages instead of actual rupee amounts</li>
          <li>Timeline/schedule data (no client names needed)</li>
          <li>General problem ("We're 15% over on foundations") without specifics</li>
          <li>Anonymized metrics (project size, duration, team size)</li>
        </ul>
      </div>

      <div style="margin: 16px 0;">
        <p style="font-size: 13px; font-weight: 500; color: #FFFFFF; margin: 0 0 12px;">Method 2: Use ChatGPT Enterprise/Claude Teams (Paid, Private)</p>
        <p style="font-size: 13px; color: #9CA3AF; margin: 0;">For sensitive data, use paid enterprise versions that don't log conversations. But even then, follow anonymization best practices.</p>
      </div>

      <div style="margin: 16px 0;">
        <p style="font-size: 13px; font-weight: 500; color: #FFFFFF; margin: 0 0 12px;">Method 3: Replace Sensitive Values</p>
        <div class="code-block">BEFORE (Don't do this):
Foundation cost: ₹48.5L (10% over ₹45L budget)

AFTER (Do this):
Foundation cost: ₹XXL (10% over ₹YYL budget)
What causes 10% overruns in foundation work?</div>
      </div>

      <div class="warning-box">
        <strong>⚠️ Real Risk:</strong> ChatGPT free version trains on your data. If you paste client budget ₹195L for IISER, someone else might ask "summarize IISER project budgets" and get generic learnings from YOUR data. Always anonymize.
      </div>

      <div class="key-section">
        <strong style="color: #FFFFFF;">Golden Rule for DEC Infra:</strong>
        <p style="font-size: 13px; margin: 8px 0;">✓ Anonymize client names, vendor names, exact rupee amounts
✓ Share: Project type, phase, duration, generic cost categories
✓ Ask: Generic questions ("What causes cost overruns in X phase?")
✗ Never share: Specific vendor quotes, salary info, client pricing, profit margins, confidential contracts</p>
      </div>
    </div>
  </div>

  <!-- DEMO 4: Cost Breakdown -->
  <div id="demo4" class="tab-content">
    <div class="demo-card">
      <div class="role-badge">Cost Controller / Finance</div>
      <h3 class="demo-title">
        <span>🔍</span>
        Drill Down: AI Explains Cost Breakdowns
      </h3>

      <p style="font-size: 14px; color: #9CA3AF; margin: 0 0 12px;">Your CFO asks: "Why is our cost per sq.m. higher than industry average?"</p>

      <table class="data-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount (₹L)</th>
            <th>% of Total</th>
            <th>Cost/Sq.M (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Civil Works</td>
            <td>85.2</td>
            <td>43.7%</td>
            <td>3,408</td>
          </tr>
          <tr>
            <td>MEP (Mech, Elec, Plumb)</td>
            <td>45.3</td>
            <td>23.2%</td>
            <td>1,812</td>
          </tr>
          <tr>
            <td>Finishes</td>
            <td>38.5</td>
            <td>19.8%</td>
            <td>1,540</td>
          </tr>
          <tr>
            <td>Project Management (PM)</td>
            <td>12.8</td>
            <td>6.6%</td>
            <td>512</td>
          </tr>
          <tr>
            <td>Contingency (Used)</td>
            <td>12.2</td>
            <td>6.3%</td>
            <td>488</td>
          </tr>
          <tr style="background: #1C1C1C; font-weight: 500;">
            <td>TOTAL</td>
            <td>194.0</td>
            <td>100%</td>
            <td>7,760</td>
          </tr>
        </tbody>
      </table>

      <div class="prompt-input">Our library project cost breakdown:

[PASTE TABLE]

Industry benchmarks for similar projects:
- Civil: ₹3,000/sq.m
- MEP: ₹1,600/sq.m
- Finishes: ₹1,200/sq.m
- PM overhead: 5%

Questions:
1. Where are we above/below benchmark?
2. Is our cost structure justified? (Any red flags?)
3. Which categories have most variance from industry?
4. For future projects, what should we tighten?</div>

      <div class="analysis-box">
        <strong style="color: #10B981;">🤖 Sample Output:</strong>
        <p style="margin: 8px 0;"><strong>Variance Analysis:</strong></p>
        <ul style="margin: 8px 0; padding-left: 20px; font-size: 13px;">
          <li><strong>Civil (₹3,408 vs ₹3,000 bench):</strong> +13.6% → Likely due to complex foundation (IISER specs), soil conditions, or site logistics. <strong>Justified</strong>.</li>
          <li><strong>MEP (₹1,812 vs ₹1,600 bench):</strong> +13.3% → Higher than peers. Is IISER library spec'd with premium HVAC/IT infrastructure? If yes, justified; if no, investigate vendor rates.</li>
          <li><strong>Finishes (₹1,540 vs ₹1,200 bench):</strong> +28.3% → <strong>Biggest gap.</strong> Review material selections, labor rates. Potential to reduce ₹3-4L by negotiating finish suppliers.</li>
          <li><strong>PM overhead (6.6% vs 5% bench):</strong> Slightly high but acceptable for educational project complexity.</li>
        </ul>
        <p style="margin: 8px 0;"><strong>Recommendation:</strong> Civil & MEP are defensible given project type. Focus cost recovery efforts on Finishes phase — negotiate now before work starts.</p>
      </div>

      <div class="key-section">
        <strong style="color: #FFFFFF;">Why This Matters:</strong>
        <ul class="insights-list">
          <li>Benchmarking costs manually = 2-3 hours research + spreadsheets</li>
          <li>AI does it in 2 minutes, with industry context</li>
          <li>Identifies where you have leverage (Finishes for negotiation)</li>
          <li>Justifies cost differences to clients/stakeholders</li>
        </ul>
      </div>

      <div style="margin-top: 16px; background: #1C1C1C; padding: 12px; border-radius: 8px; border-left: 3px solid #FFDE59;">
        <p style="font-size: 13px; color: #9CA3AF; margin: 0;"><strong>💡 Pro Tip for Workshop:</strong> Use REAL DEC Infra budget data (anonymized) for this demo. Participants will see "this is OUR project" and engage 10x more.</p>
      </div>
    </div>
  </div>

</div>`;
        } else if (activeSubTab === '1c') {
            contentHtml = `<style>
  .module-container {
    font-family: var(--font-sans);
  }
  .section-header {
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
    margin: 20px 0 12px;
    padding-bottom: 8px;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.05);
  }
  .scenario-card {
    background: #1C1C1C;
    border: 0.5px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
  }
  .scenario-title {
    font-size: 15px;
    font-weight: 500;
    color: #FFFFFF;
    margin: 0 0 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .role-badge {
    display: inline-block;
    background: rgba(255, 222, 89, 0.1);
    color: #FFDE59;
    font-size: 11px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: var(--radius);
    margin-bottom: 12px;
  }
  .prompt-box {
    background: #1C1C1C;
    border-left: 3px solid #FFDE59;
    padding: 12px;
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
    overflow-x: auto;
    color: #FFFFFF;
    margin: 12px 0;
    line-height: 1.5;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .key-insight {
    background: rgba(16, 185, 129, 0.15);
    border-left: 3px solid #10B981;
    padding: 12px;
    margin: 12px 0;
    border-radius: 6px;
    font-size: 13px;
  }
  .warning-box {
    background: rgba(239, 68, 68, 0.15);
    border-left: 3px solid #EF4444;
    padding: 12px;
    margin: 12px 0;
    border-radius: 6px;
    font-size: 13px;
  }
  .tip-box {
    background: rgba(255, 222, 89, 0.15);
    border-left: 3px solid var(--text-warning);
    padding: 12px;
    margin: 12px 0;
    border-radius: 6px;
    font-size: 13px;
  }
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    margin: 12px 0;
  }
  .comparison-table th {
    background: #1C1C1C;
    padding: 8px;
    text-align: left;
    font-weight: 500;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.05);
    color: #FFFFFF;
  }
  .comparison-table td {
    padding: 8px;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.05);
    color: #FFFFFF;
  }
  .tabs-container {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.05);
    overflow-x: auto;
  }
  .tab-btn {
    padding: 12px 14px;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: #9CA3AF;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    transition: color 0.2s;
  }
  .tab-btn.active {
    color: #FFFFFF;
    border-bottom-color: #FFDE59;
  }
  .tab-content {
    display: none;
  }
  .tab-content.active {
    display: block;
  }
  .workflow-box {
    background: #1C1C1C;
    border: 0.5px solid rgba(255, 255, 255, 0.05);
    padding: 12px;
    border-radius: 6px;
    margin: 12px 0;
    font-size: 13px;
  }
  .step-number {
    display: inline-block;
    background: #FFDE59;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    font-weight: 500;
    margin-right: 6px;
  }
</style>

<div class="module-container">
  <h2 style="font-size: 18px; font-weight: 500; margin: 0 0 12px; color: #FFFFFF;">Module 1C: Analyzing PDFs & Vendor Documents with AI</h2>
  <p style="font-size: 13px; color: #9CA3AF; margin: 0 0 16px;">Extract data from vendor quotes, compare specifications, identify cost discrepancies in 5 minutes instead of 2 hours</p>

  <div class="tabs-container">
    <button class="tab-btn active" onclick="switchTab(event, 'tab1')">Vendor Quote Comparison</button>
    <button class="tab-btn" onclick="switchTab(event, 'tab2')">Specification Analysis</button>
    <button class="tab-btn" onclick="switchTab(event, 'tab3')">Contract Review</button>
    <button class="tab-btn" onclick="switchTab(event, 'tab4')">Quality Standards Check</button>
  </div>

  <!-- TAB 1: Vendor Quote Comparison -->
  <div id="tab1" class="tab-content active">
    <div class="scenario-card">
      <div class="role-badge">Procurement / Project Manager</div>
      <h3 class="scenario-title">
        <span>🏗️</span>
        Compare Concrete Vendor Quotes (Real Scenario)
      </h3>

      <p style="font-size: 13px; color: #9CA3AF; margin: 0 0 12px;"><strong>Situation:</strong> You have 3 concrete vendor quotes for IISER Library foundation (150 cubic meters needed). All PDFs are different formats. Manual comparison = 45 minutes. AI comparison = 3 minutes.</p>

      <div class="section-header">The 3 Vendor PDFs (What You'd Receive):</div>

      <div style="margin: 12px 0;">
        <p style="font-size: 13px; font-weight: 500; color: #FFFFFF; margin: 0 0 8px;">Vendor A: Concrete Suppliers Inc (PDF with tables)</p>
        <div style="background: #1C1C1C; padding: 12px; border-radius: 6px; font-size: 12px; border-left: 3px solid #378ADD;">
          <strong>Product Offering:</strong><br/>
          • M30 Grade Concrete (Strength 30 MPa)<br/>
          • Unit Rate: ₹4,500 per cubic meter<br/>
          • Minimum Order: 50 cum<br/>
          • Delivery Time: 3-5 days<br/>
          • Delivery Charges: ₹500 per load (10 cum per load)<br/>
          • Payment Terms: 50% advance, 50% on delivery<br/>
          • Quality Cert: IS 456 certified, lab test reports included<br/>
          • Warranty: 10-year structural guarantee<br/>
          • Total Cost for 150 cum: ₹4,500 × 150 = ₹6,75,000 + (15 × ₹500) = ₹6,82,500
        </div>
      </div>

      <div style="margin: 12px 0;">
        <p style="font-size: 13px; font-weight: 500; color: #FFFFFF; margin: 0 0 8px;">Vendor B: Quality Concrete Ltd (Different format, embedded in text)</p>
        <div style="background: #1C1C1C; padding: 12px; border-radius: 6px; font-size: 12px; border-left: 3px solid #1D9E75;">
          <strong>Our Offer:</strong><br/>
          We supply premium M30 grade at ₹4,200/cum for orders >100 cum (you get 5% volume discount).<br/>
          Effective rate: ₹3,990/cum<br/>
          Free delivery on orders >100 cum<br/>
          Delivery: 5-7 days but can rush for ₹2,000 surcharge per load<br/>
          Payment: 30% advance, 70% on completion (better terms)<br/>
          Certifications: IS 456 + LEED compliant<br/>
          Warranty: 15-year guarantee<br/>
          Total Cost for 150 cum: ₹3,990 × 150 = ₹5,98,500 (no delivery charges)
        </div>
      </div>

      <div style="margin: 12px 0;">
        <p style="font-size: 13px; font-weight: 500; color: #FFFFFF; margin: 0 0 8px;">Vendor C: Budget Concrete Co (Price-sensitive, minimal specs)</p>
        <div style="background: #1C1C1C; padding: 12px; border-radius: 6px; font-size: 12px; border-left: 3px solid #993C1D;">
          <strong>Rock Bottom Pricing:</strong><br/>
          M30 Concrete @ ₹3,800/cum<br/>
          Bulk Order (150+): ₹3,500/cum<br/>
          Your order qualifies: ₹3,500/cum<br/>
          Delivery: ₹1,000/load (extra)<br/>
          Terms: COD only (100% upfront)<br/>
          Test Reports: Available upon request (may be delayed)<br/>
          No explicit warranty (standard 5 years, unwritten)<br/>
          Total Cost for 150 cum: ₹3,500 × 150 + (15 × ₹1,000) = ₹525,000 + ₹15,000 = ₹540,000
        </div>
      </div>

      <div class="section-header">Step 1: What Manual Comparison Looks Like (Tedious)</div>

      <table class="comparison-table">
        <tr>
          <th>Criteria</th>
          <th>Vendor A</th>
          <th>Vendor B</th>
          <th>Vendor C</th>
        </tr>
        <tr>
          <td><strong>Rate/cum</strong></td>
          <td>₹4,500</td>
          <td>₹3,990</td>
          <td>₹3,500</td>
        </tr>
        <tr>
          <td><strong>Discount</strong></td>
          <td>None</td>
          <td>5% (₹225)</td>
          <td>N/A (already bulk)</td>
        </tr>
        <tr>
          <td><strong>Delivery</strong></td>
          <td>₹500/load × 15 = ₹7,500</td>
          <td>FREE</td>
          <td>₹1,000/load × 15 = ₹15,000</td>
        </tr>
        <tr>
          <td><strong>Payment Terms</strong></td>
          <td>50/50</td>
          <td>30/70 (better)</td>
          <td>100% upfront (worst)</td>
        </tr>
        <tr>
          <td><strong>Delivery Time</strong></td>
          <td>3-5 days</td>
          <td>5-7 days (rush: +₹2K/load)</td>
          <td>Not specified</td>
        </tr>
        <tr>
          <td><strong>Quality Cert</strong></td>
          <td>IS 456 (standard)</td>
          <td>IS 456 + LEED</td>
          <td>Upon request (risky)</td>
        </tr>
        <tr>
          <td><strong>Warranty</strong></td>
          <td>10 years</td>
          <td>15 years (best)</td>
          <td>5 years (implied)</td>
        </tr>
        <tr>
          <td><strong>TOTAL COST</strong></td>
          <td><strong>₹6,82,500</strong></td>
          <td><strong>₹5,98,500</strong></td>
          <td><strong>₹5,40,000</strong></td>
        </tr>
      </table>

      <p style="font-size: 13px; color: #9CA3AF; margin: 12px 0;"><strong>Manual time to create this table:</strong> 45 minutes (copy-pasting, formatting, math errors)</p>

      <div class="section-header">Step 2: AI Does This Instantly</div>

      <div class="prompt-box">Upload 3 PDF quotes for M30 concrete (150 cum needed) from:
- Vendor A: Concrete Suppliers Inc
- Vendor B: Quality Concrete Ltd  
- Vendor C: Budget Concrete Co

Compare them on:
1. Unit rate (final rate after discounts)
2. Total cost for 150 cum (including delivery)
3. Payment terms (which is most flexible?)
4. Quality certifications (which is most credible?)
5. Warranty terms (what's the protection?)
6. Timeline risk (any red flags on delivery?)
7. Which vendor should we choose? Why?

Create a comparison table + give final recommendation with risk assessment.</div>

      <div class="key-insight">
        <strong>Expected AI Output (instantly):</strong><br/>
        <br/>
        <strong>Cost Analysis:</strong><br/>
        Vendor C = ₹5,40,000 (LOWEST but risky)<br/>
        Vendor B = ₹5,98,500 (BEST VALUE - good warranty + free delivery)<br/>
        Vendor A = ₹6,82,500 (HIGHEST + worst terms)<br/>
        <br/>
        <strong>Risk Assessment:</strong><br/>
        Vendor C: Cheapest but no quality cert upfront + COD payment = cash flow strain + quality risk<br/>
        Vendor B: Saves ₹84K vs A, better warranty, free delivery. Payment terms support project cash flow. RECOMMEND.<br/>
        Vendor A: Premium pricing, standard terms, no advantage.<br/>
        <br/>
        <strong>Decision:</strong> Go with Vendor B. Savings: ₹84,500 + better payment flexibility + superior warranty.
      </div>

      <div class="tip-box">
        <strong>💡 Why This Matters for DEC Infra:</strong><br/>
        If you process 20 vendor quotes per month (realistic for construction):<br/>
        • Manual: 20 × 45 min = 15 hours/month<br/>
        • AI: 20 × 3 min = 1 hour/month<br/>
        • Savings: 14 hours/month = ₹3-5L in labor annually
      </div>

    </div>
  </div>

  <!-- TAB 2: Specification Analysis -->
  <div id="tab2" class="tab-content">
    <div class="scenario-card">
      <div class="role-badge">Quality Controller / Engineer</div>
      <h3 class="scenario-title">
        <span>✓</span>
        Extract & Compare Specifications from Vendor Datasheets
      </h3>

      <p style="font-size: 13px; color: #9CA3AF; margin: 0 0 12px;"><strong>Scenario:</strong> NSDL Data Center needs UPS systems. Vendor A and Vendor B sent 20-page PDFs with technical specs scattered throughout. You need to verify both meet your requirements.</p>

      <div class="section-header">What You Need to Check:</div>

      <div style="background: #1C1C1C; padding: 12px; border-radius: 6px; margin: 12px 0; font-size: 13px;">
        <p style="margin: 0 0 8px;"><strong>Your Requirements (from project spec):</strong></p>
        ✓ Capacity: 500 KVA minimum<br/>
        ✓ Battery Backup: 4 hours minimum<br/>
        ✓ Efficiency: >95% (critical for data center)<br/>
        ✓ Cooling: <40°C operating temperature<br/>
        ✓ Certifications: CE marked + ISO 9001<br/>
        ✓ Warranty: 5 years on-site support<br/>
        ✓ Delivery: Within 8 weeks
      </div>

      <div class="prompt-box">I have 2 UPS system datasheets (PDFs) from vendors.

Extract key specifications:
1. Capacity (KVA)
2. Battery backup time (hours)
3. Efficiency rating (%)
4. Operating temperature
5. Certifications
6. Warranty (years + type)
7. Delivery timeline

Then assess: Do both meet our project requirements?
- Requirement 1: Capacity 500 KVA minimum
- Requirement 2: Battery 4+ hours
- Requirement 3: Efficiency >95%
- Requirement 4: Operating temp <40°C
- Requirement 5: CE marked + ISO 9001
- Requirement 6: 5-year on-site warranty
- Requirement 7: Delivery within 8 weeks

Show: Vendor | Meets Req? | Gap | Risk | Recommendation</div>

      <div class="key-insight">
        <strong>Why This Works with AI:</strong><br/>
        Vendor datasheets are chaos: specs on page 3, page 8, page 15. They use different units (kVA vs VA, Celsius vs Fahrenheit). AI reads all 40 pages, extracts the relevant specs, and compares to your requirements.<br/>
        <br/>
        Manual extraction: 1.5 hours per vendor<br/>
        AI extraction: 2 minutes per vendor<br/>
        <br/>
        Plus: AI catches things you miss (e.g., "warranty valid only in North America" hidden in fine print on page 17).
      </div>

    </div>
  </div>

  <!-- TAB 3: Contract Review -->
  <div id="tab3" class="tab-content">
    <div class="scenario-card">
      <div class="role-badge">Legal / Procurement Manager</div>
      <h3 class="scenario-title">
        <span>⚖️</span>
        Review Contracts for Risk & Compliance
      </h3>

      <p style="font-size: 13px; color: #9CA3AF; margin: 0 0 12px;"><strong>Scenario:</strong> Medical College project needs a 15-page MEP contractor agreement. Before signing, you need to flag any risky clauses or missing protections.</p>

      <div class="section-header">Common Risks in Construction Contracts:</div>

      <table class="comparison-table">
        <tr>
          <th>Clause</th>
          <th>Risk</th>
          <th>What to Look For</th>
        </tr>
        <tr>
          <td><strong>Payment Terms</strong></td>
          <td>Cash flow strain if 100% upfront</td>
          <td>Should be 30% advance, 70% completion</td>
        </tr>
        <tr>
          <td><strong>Penalty Clauses</strong></td>
          <td>Ambiguous = legal disputes</td>
          <td>Should be specific (₹X per day delay, max ₹Y)</td>
        </tr>
        <tr>
          <td><strong>Warranty</strong></td>
          <td>Short warranty = risk to you</td>
          <td>Should be 2+ years post-completion</td>
        </tr>
        <tr>
          <td><strong>Liability Cap</strong></td>
          <td>If capped too low, limits recovery</td>
          <td>Should be at least 10% of contract value</td>
        </tr>
        <tr>
          <td><strong>Dispute Resolution</strong></td>
          <td>Litigation = expensive & slow</td>
          <td>Should include arbitration clause</td>
        </tr>
        <tr>
          <td><strong>Force Majeure</strong></td>
          <td>Vague terms lead to disputes</td>
          <td>Should define what qualifies (pandemic, war, etc.)</td>
        </tr>
      </table>

      <div class="prompt-box">Review this MEP contractor agreement (PDF attached). 

Flag any high-risk clauses related to:
1. Payment Terms - Is payment structure favorable to us?
2. Delay Penalties - Are penalties clearly defined?
3. Warranty Period - Is 2+ years guaranteed?
4. Liability Cap - Is it sufficient (≥10% contract value)?
5. Insurance Requirements - Are they adequate?
6. Dispute Resolution - Is arbitration included?
7. Force Majeure - Is it clearly defined?
8. Scope of Work - Is it unambiguous?

For each risk found:
- Quote the clause (exact text)
- Explain the risk
- Recommend change or approval

Overall: Safe to sign or needs revision? Why?</div>

      <div class="warning-box">
        <strong>⚠️ Real Example from DEC Infra Projects:</strong><br/>
        A contractor once included "Force Majeure includes project delays due to supplier delays." This meant if the steel supplier was late, contractor had no penalty. Cost DEC ₹8L in delay costs before this was caught and renegotiated.<br/>
        <br/>
        AI would flag this in 2 minutes. Manual legal review: ₹50K+ in legal fees.
      </div>

    </div>
  </div>

  <!-- TAB 4: Quality Standards Check -->
  <div id="tab4" class="tab-content">
    <div class="scenario-card">
      <div class="role-badge">Quality Controller / Compliance</div>
      <h3 class="scenario-title">
        <span>📋</span>
        Verify Vendor Compliance Against Project Standards
      </h3>

      <p style="font-size: 13px; color: #9CA3AF; margin: 0 0 12px;"><strong>Scenario:</strong> IISER Library has strict quality requirements (educational institution + research). Vendor submitted COA (Certificate of Analysis). You need to verify all test results meet IS 456 + IISER's specific requirements.</p>

      <div class="section-header">What a COA Typically Contains:</div>

      <div style="background: #1C1C1C; padding: 12px; border-radius: 6px; margin: 12px 0; font-size: 12px;">
        <strong>Example COA Data (Concrete):</strong><br/>
        Compressive Strength (7-day): 24.5 MPa (Required: ≥21 MPa) ✓<br/>
        Compressive Strength (28-day): 32.1 MPa (Required: ≥30 MPa) ✓<br/>
        Slump: 120mm (Required: 100-150mm) ✓<br/>
        Water-Cement Ratio: 0.42 (Required: ≤0.45) ✓<br/>
        Air Content: 4.2% (Required: 3-6%) ✓<br/>
        Sulfate Content: 0.18% (Required: <0.3%) ✓<br/>
        Chloride Content: 0.012% (Required: <0.05%) ✓<br/>
      </div>

      <div class="prompt-box">I have a Concrete COA (Certificate of Analysis) PDF from our vendor.

Extract all test results and verify against standards:

Standards to check:
1. IS 456:2000 (Indian Standard)
2. Project spec: IISER Library high-performance requirements
3. Any special tests? (LEED, durability, sulfate resistance)

Create a checklist:
Test Name | Result | Specification | Pass/Fail | Notes

Then assess:
- All tests passed? (YES / NO - if NO, list failures)
- Any borderline results (>90% but <100% of spec)?
- Additional tests recommended? (e.g., durability)
- Approve batch? (Yes/No/Conditional)

If any test FAILS, recommend: Reject batch OR Request retesting OR Accept with written waiver (describe risk).</div>

      <div class="tip-box">
        <strong>🔍 Why AI Beats Manual Checking:</strong><br/>
        A COA might have 15-20 test results in a table. You check manually: read each value, cross-reference spec sheet, mark pass/fail. Takes 20-30 minutes.<br/>
        <br/>
        AI: Reads table, cross-references specs, flags any failures instantly, 2 minutes.<br/>
        <br/>
        Plus: AI catches transposed numbers (e.g., 28-day should be 32 but says 23).
      </div>

    </div>
  </div>

</div>`;
        } else if (activeSubTab === 'tools') {
            contentHtml = `<div style="padding: 0 0 20px;">
  <div class="tabs">
    <button class="tab-button active" onclick="showTab(event, 'project-exec')">Project Execution</button>
    <button class="tab-button" onclick="showTab(event, 'quality')">Quality & Safety</button>
    <button class="tab-button" onclick="showTab(event, 'infra-it')">Infrastructure & IT</button>
  </div>

  <!-- PROJECT EXECUTION TAB -->
  <div id="project-exec" class="tab-content active">
    <div class="role-card">
      <h3 class="role-title">
        <span class="role-icon">👷</span>
        Project Managers
      </h3>
      <div class="ai-tools">
        <div class="tool-item">
          <div class="tool-name">ChatGPT / Claude</div>
          <div class="tool-use">• Draft project proposals & reports<br>• Summarize meeting minutes<br>• Create communication templates</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Microsoft Copilot (Excel)</div>
          <div class="tool-use">• Auto-generate project dashboards<br>• Analyze timeline & budget variances<br>• Create pivot tables from raw data</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Google Gemini</div>
          <div class="tool-use">• Analyze project documents & contracts<br>• Extract key milestones & deadlines<br>• Organize scattered project info</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">ChatGPT Vision</div>
          <div class="tool-use">• Extract data from site photos/blueprints<br>• Analyze construction progress visually<br>• Review design documents</div>
        </div>
      </div>
    </div>

    <div class="role-card">
      <h3 class="role-title">
        <span class="role-icon">👷</span>
        Site Supervisors
      </h3>
      <div class="ai-tools">
        <div class="tool-item">
          <div class="tool-name">ChatGPT (Mobile)</div>
          <div class="tool-use">• Quick problem-solving on site<br>• Voice-based daily logs & reports<br>• Safety procedure clarification</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">ChatGPT Vision (Photo Analysis)</div>
          <div class="tool-use">• Assess site conditions from photos<br>• Identify structural/quality issues<br>• Document work progress visually</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Google Sheets + AI</div>
          <div class="tool-use">• Auto-populate daily site reports<br>• Track labor & material usage<br>• Generate graphs from field data</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Microsoft Teams AI</div>
          <div class="tool-use">• Quick message summarization<br>• Notify team of urgent updates<br>• Transcribe voice memos</div>
        </div>
      </div>
    </div>

    <div class="role-card">
      <h3 class="role-title">
        <span class="role-icon">⚙️</span>
        Technical Staff
      </h3>
      <div class="ai-tools">
        <div class="tool-item">
          <div class="tool-name">ChatGPT (Engineering Mode)</div>
          <div class="tool-use">• Verify calculations & design specs<br>• Research construction standards<br>• Generate technical documentation</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Copilot for Architecture Software</div>
          <div class="tool-use">• Suggest design improvements<br>• Generate CAD scripts/automation<br>• Check design against codes</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">ChatGPT Vision</div>
          <div class="tool-use">• Analyze blueprint photos<br>• Spot inconsistencies in drawings<br>• Extract dimensions & specs</div>
        </div>
      </div>
    </div>
  </div>

  <!-- QUALITY & SAFETY TAB -->
  <div id="quality" class="tab-content">
    <div class="role-card">
      <h3 class="role-title">
        <span class="role-icon">✓</span>
        Quality Controllers
      </h3>
      <div class="ai-tools">
        <div class="tool-item">
          <div class="tool-name">ChatGPT Vision</div>
          <div class="tool-use">• Analyze defects from site photos<br>• Compare to quality standards<br>• Flag issues automatically<br>• Classify defect severity</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Power BI + AI</div>
          <div class="tool-use">• Generate QC dashboards automatically<br>• Trend analysis of defect types<br>• Predict high-risk areas</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Claude / ChatGPT</div>
          <div class="tool-use">• Draft QC inspection checklists<br>• Create non-conformance reports<br>• Generate corrective action plans</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Google Docs AI (Duet)</div>
          <div class="tool-use">• Auto-generate inspection reports<br>• Create testing documentation<br>• Organize test results data</div>
        </div>
      </div>
    </div>

    <div class="role-card">
      <h3 class="role-title">
        <span class="role-icon">🛡️</span>
        Safety Officers
      </h3>
      <div class="ai-tools">
        <div class="tool-item">
          <div class="tool-name">ChatGPT</div>
          <div class="tool-use">• Draft safety policies & procedures<br>• Create hazard assessment documents<br>• Generate incident reports<br>• Write corrective action plans</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">ChatGPT Vision</div>
          <div class="tool-use">• Analyze site photos for hazards<br>• Spot improper safety practices<br>• Document unsafe conditions<br>• Create visual safety guidelines</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Copilot for Word/Excel</div>
          <div class="tool-use">• Auto-create safety training docs<br>• Analyze safety KPI trends<br>• Generate near-miss reports<br>• Create compliance calendars</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Claude</div>
          <div class="tool-use">• Research OSHA/Indian labor codes<br>• Create toolbox talks<br>• Write emergency procedures<br>• Summarize safety regulations</div>
        </div>
      </div>
    </div>

    <div class="role-card">
      <h3 class="role-title">
        <span class="role-icon">📋</span>
        Compliance Team
      </h3>
      <div class="ai-tools">
        <div class="tool-item">
          <div class="tool-name">Claude / GPT</div>
          <div class="tool-use">• Audit documents against standards<br>• Create compliance matrices<br>• Generate audit reports<br>• Research regulatory requirements</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Copilot for Excel</div>
          <div class="tool-use">• Track compliance requirements<br>• Create regulatory calendars<br>• Analyze compliance gaps<br>• Auto-generate compliance logs</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Power BI AI</div>
          <div class="tool-use">• Monitor compliance metrics in real-time<br>• Flag overdue certifications<br>• Trend analysis of issues</div>
        </div>
      </div>
    </div>
  </div>

  <!-- INFRASTRUCTURE & IT TAB -->
  <div id="infra-it" class="tab-content">
    <div class="role-card">
      <h3 class="role-title">
        <span class="role-icon">🏗️</span>
        Technical Planning
      </h3>
      <div class="ai-tools">
        <div class="tool-item">
          <div class="tool-name">ChatGPT + Code Interpreter</div>
          <div class="tool-use">• Analyze site surveys & terrain data<br>• Model construction logistics<br>• Optimize equipment placement<br>• Calculate resource requirements</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Claude Code</div>
          <div class="tool-use">• Script project scheduling automation<br>• Build cost estimation models<br>• Create technical simulations</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">ChatGPT Vision</div>
          <div class="tool-use">• Review aerial/satellite site images<br>• Analyze site constraints visually<br>• Plan access routes & staging areas</div>
        </div>
      </div>
    </div>

    <div class="role-card">
      <h3 class="role-title">
        <span class="role-icon">💻</span>
        System Management
      </h3>
      <div class="ai-tools">
        <div class="tool-item">
          <div class="tool-name">ChatGPT</div>
          <div class="tool-use">• Write system documentation<br>• Troubleshoot IT issues<br>• Create user guides<br>• Plan infrastructure upgrades</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">GitHub Copilot</div>
          <div class="tool-use">• Auto-generate code scripts<br>• Debug infrastructure code<br>• Create automation scripts<br>• Review technical code</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Claude + Code</div>
          <div class="tool-use">• Build custom project management tools<br>• Create data pipeline automation<br>• Debug complex queries</div>
        </div>
      </div>
    </div>

    <div class="role-card">
      <h3 class="role-title">
        <span class="role-icon">💡</span>
        Process Innovation
      </h3>
      <div class="ai-tools">
        <div class="tool-item">
          <div class="tool-name">ChatGPT</div>
          <div class="tool-use">• Brainstorm process improvements<br>• Research industry best practices<br>• Draft SOP documentation<br>• Analyze workflow bottlenecks</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Claude</div>
          <div class="tool-use">• Map as-is vs. to-be processes<br>• Create change management plans<br>• Write implementation guides<br>• Summarize stakeholder feedback</div>
        </div>
        <div class="tool-item">
          <div class="tool-name">Power BI + AI</div>
          <div class="tool-use">• Visualize process metrics<br>• Identify efficiency gains<br>• Predict ROI of improvements</div>
        </div>
      </div>
    </div>
  </div>
</div>`;
        } else if (activeSubTab === '1d') {
            contentHtml = `<div class="container">
        <header>
            <h1>Module 1D: Advanced AI Applications for Construction</h1>
            <p>Choose your specialized workflow - 8 options available</p>
        </header>
        
        <div class="intro-section">
            <h2>What is Module 1D?</h2>
            <p>Module 1D extends the core AI skills (Modules 1A, 1B, 1C) into specialized construction workflows that save even more time and money.</p>
            <p><strong>Duration:</strong> 90 minutes (1.5 hours) | <strong>Difficulty:</strong> Intermediate | <strong>Audience:</strong> Project Managers, Engineers, Safety Officers</p>
            <div class="highlight">
                <strong>Choose one module below and I'll create a complete 90-minute workshop with real DEC Infra examples, scripts, prompts, and materials!</strong>
            </div>
        </div>
        
        <div class="options-grid">
            <!-- Option A -->
            <div class="option-card" onclick="selectOption('A')">
                <div class="option-header">
                    <div class="option-letter">A</div>
                    <div class="option-title">Image & Photo Analysis</div>
                </div>
                <div class="option-content">
                    <h3>Safety & Quality Detection</h3>
                    <div class="duration">90 minutes</div>
                    <ul class="benefit-list">
                        <li>Analyze site photos with AI vision</li>
                        <li>Detect safety hazards automatically</li>
                        <li>Identify quality defects in 2 mins</li>
                        <li>Generate photo reports</li>
                    </ul>
                    <div class="financial-impact">
                        <strong>Impact:</strong> ₹2-5L defect avoidance | 5-10 hrs/month saved
                    </div>
                </div>
            </div>
            
            <!-- Option B -->
            <div class="option-card" onclick="selectOption('B')">
                <div class="option-header">
                    <div class="option-letter">B</div>
                    <div class="option-title">Email & Report Automation</div>
                </div>
                <div class="option-content">
                    <h3>Auto-Generate Reports</h3>
                    <div class="duration">90 minutes</div>
                    <ul class="benefit-list">
                        <li>Generate weekly reports in 5 mins</li>
                        <li>Create daily site reports auto</li>
                        <li>Meeting minutes from transcripts</li>
                        <li>Consistent formatting always</li>
                    </ul>
                    <div class="financial-impact">
                        <strong>Impact:</strong> 15-20 hrs/month saved | Never miss action items
                    </div>
                </div>
            </div>
            
            <!-- Option C -->
            <div class="option-card" onclick="selectOption('C')">
                <div class="option-header">
                    <div class="option-letter">C</div>
                    <div class="option-title">Schedule & Resource Optimization</div>
                </div>
                <div class="option-content">
                    <h3>Compress Timeline & Optimize Labor</h3>
                    <div class="duration">90 minutes</div>
                    <ul class="benefit-list">
                        <li>Compress timeline 2-3 weeks</li>
                        <li>Optimize resource allocation</li>
                        <li>Critical path analysis</li>
                        <li>What-if scenario analysis</li>
                    </ul>
                    <div class="financial-impact">
                        <strong>Impact:</strong> ₹5-10L timeline savings | 15-20% labor productivity gain
                    </div>
                </div>
            </div>
            
            <!-- Option D -->
            <div class="option-card" onclick="selectOption('D')">
                <div class="option-header">
                    <div class="option-letter">D</div>
                    <div class="option-title">Cost Estimation & Budgeting</div>
                </div>
                <div class="option-content">
                    <h3>Accurate Cost Forecasting</h3>
                    <div class="duration">90 minutes</div>
                    <ul class="benefit-list">
                        <li>AI-assisted cost estimation</li>
                        <li>Historical benchmarking</li>
                        <li>Overrun prediction & prevention</li>
                        <li>Better contingency planning</li>
                    </ul>
                    <div class="financial-impact">
                        <strong>Impact:</strong> 5-10% better accuracy | Fewer overruns & disputes
                    </div>
                </div>
            </div>
            
            <!-- Option E -->
            <div class="option-card" onclick="selectOption('E')">
                <div class="option-header">
                    <div class="option-letter">E</div>
                    <div class="option-title">Compliance & Documentation</div>
                </div>
                <div class="option-content">
                    <h3>Safety & Audit Automation</h3>
                    <div class="duration">90 minutes</div>
                    <ul class="benefit-list">
                        <li>Auto-generate safety checklists</li>
                        <li>Create compliance documents</li>
                        <li>Audit trail organization</li>
                        <li>Never miss requirements</li>
                    </ul>
                    <div class="financial-impact">
                        <strong>Impact:</strong> Avoid ₹5-15L in fines | 100% audit compliance
                    </div>
                </div>
            </div>
            
            <!-- Option F -->
            <div class="option-card" onclick="selectOption('F')">
                <div class="option-header">
                    <div class="option-letter">F</div>
                    <div class="option-title">Change Order & Claims</div>
                </div>
                <div class="option-content">
                    <h3>Protect Claims & Manage Changes</h3>
                    <div class="duration">90 minutes</div>
                    <ul class="benefit-list">
                        <li>Change order impact analysis</li>
                        <li>Claims documentation ready</li>
                        <li>Dispute risk assessment</li>
                        <li>Timeline impact calculation</li>
                    </ul>
                    <div class="financial-impact">
                        <strong>Impact:</strong> ₹20-50L claim recovery | 50% less disputes
                    </div>
                </div>
            </div>
            
            <!-- Option G -->
            <div class="option-card" onclick="selectOption('G')">
                <div class="option-header">
                    <div class="option-letter">G</div>
                    <div class="option-title">Sustainability & Green Building</div>
                </div>
                <div class="option-content">
                    <h3>LEED & Carbon Tracking</h3>
                    <div class="duration">90 minutes</div>
                    <ul class="benefit-list">
                        <li>LEED compliance tracking</li>
                        <li>Carbon footprint calculation</li>
                        <li>Waste optimization</li>
                        <li>Energy efficiency analysis</li>
                    </ul>
                    <div class="financial-impact">
                        <strong>Impact:</strong> LEED premium pricing | ₹2-5L waste savings
                    </div>
                </div>
            </div>
            
            <!-- Option H -->
            <div class="option-card" onclick="selectOption('H')">
                <div class="option-header">
                    <div class="option-letter">H</div>
                    <div class="option-title">Predictive Analytics</div>
                </div>
                <div class="option-content">
                    <h3>Forecast Risk & Overruns</h3>
                    <div class="duration">90 minutes</div>
                    <ul class="benefit-list">
                        <li>Predict project success rate</li>
                        <li>Forecast cost overruns early</li>
                        <li>Schedule delay prediction</li>
                        <li>Quality issue prediction</li>
                    </ul>
                    <div class="financial-impact">
                        <strong>Impact:</strong> Avoid ₹10-20L through early action | Data-driven decisions
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Tabs for detailed comparison -->
        <div class="tabs">
            <button class="tab-btn active" onclick="openTab(event, 'overview')">Overview</button>
            <button class="tab-btn" onclick="openTab(event, 'comparison')">Comparison</button>
            <button class="tab-btn" onclick="openTab(event, 'details')">Details</button>
            <button class="tab-btn" onclick="openTab(event, 'next-steps')">Next Steps</button>
        </div>
        
        <!-- Tab 1: Overview -->
        <div id="overview" class="tab-content active">
            <h2>Why Module 1D?</h2>
            <p>After learning Modules 1A (Prompting), 1B (Excel Analysis), and 1C (PDF Comparison), participants want to apply AI to their specific workflows. Module 1D provides specialized solutions for different roles:</p>
            
            <div class="scenario-box">
                <h4>For Site Engineers:</h4>
                <p>Use Image Analysis (A) or Compliance (E) to detect defects and maintain safety standards automatically.</p>
            </div>
            
            <div class="scenario-box">
                <h4>For Project Managers:</h4>
                <p>Use Report Automation (B) or Schedule Optimization (C) to manage projects with 20+ hours/month in time savings.</p>
            </div>
            
            <div class="scenario-box">
                <h4>For Finance/Planning:</h4>
                <p>Use Cost Estimation (D) or Predictive Analytics (H) to forecast budgets and catch overruns 3 months early.</p>
            </div>
            
            <div class="scenario-box">
                <h4>For Contracts/Procurement:</h4>
                <p>Use Change Order Management (F) to recover ₹20-50L in claims and reduce disputes by 50%.</p>
            </div>
        </div>
        
        <!-- Tab 2: Comparison Table -->
        <div id="comparison" class="tab-content">
            <h2>Quick Comparison of All Options</h2>
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Option</th>
                        <th>Focus Area</th>
                        <th>Time Saved/Month</th>
                        <th>Financial Impact</th>
                        <th>Best For</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>A</strong></td>
                        <td>Image Analysis</td>
                        <td>5-10 hours</td>
                        <td>₹2-5L defect avoidance</td>
                        <td>Site Engineers, QA</td>
                    </tr>
                    <tr>
                        <td><strong>B</strong></td>
                        <td>Report Automation</td>
                        <td>15-20 hours</td>
                        <td>Labor savings</td>
                        <td>Project Managers</td>
                    </tr>
                    <tr>
                        <td><strong>C</strong></td>
                        <td>Schedule Optimization</td>
                        <td>5-10 hours</td>
                        <td>₹5-10L timeline savings</td>
                        <td>PMs, Planners</td>
                    </tr>
                    <tr>
                        <td><strong>D</strong></td>
                        <td>Cost Estimation</td>
                        <td>10-15 hours</td>
                        <td>Better accuracy, fewer overruns</td>
                        <td>Finance, Estimators</td>
                    </tr>
                    <tr>
                        <td><strong>E</strong></td>
                        <td>Compliance</td>
                        <td>8-12 hours</td>
                        <td>Avoid ₹5-15L in fines</td>
                        <td>Safety, Compliance</td>
                    </tr>
                    <tr>
                        <td><strong>F</strong></td>
                        <td>Change Orders</td>
                        <td>5-10 hours</td>
                        <td>₹20-50L claim recovery</td>
                        <td>Contracts, Legal</td>
                    </tr>
                    <tr>
                        <td><strong>G</strong></td>
                        <td>Sustainability</td>
                        <td>8-10 hours</td>
                        <td>LEED premium + ₹2-5L savings</td>
                        <td>Green Projects, Planners</td>
                    </tr>
                    <tr>
                        <td><strong>H</strong></td>
                        <td>Predictive Analytics</td>
                        <td>10-15 hours</td>
                        <td>Avoid ₹10-20L overruns</td>
                        <td>Senior PMs, Strategy</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Tab 3: Details -->
        <div id="details" class="tab-content">
            <h2>What's Included in Each Module 1D?</h2>
            <div class="success-box">
                <strong>✓ Complete 90-Minute Facilitator Script</strong> - Word-for-word instructions with timing
            </div>
            <div class="success-box">
                <strong>✓ Real DEC Infra Scenarios</strong> - 3-5 actual project examples with real data
            </div>
            <div class="success-box">
                <strong>✓ Live Demo Prompts</strong> - Copy-paste ready, tested AI prompts
            </div>
            <div class="success-box">
                <strong>✓ Hands-On Exercises</strong> - Group activities participants can do themselves
            </div>
            <div class="success-box">
                <strong>✓ Expected AI Outputs</strong> - Examples of what participants will see
            </div>
            <div class="success-box">
                <strong>✓ Tools & Software List</strong> - Everything needed to deliver the module
            </div>
            <div class="success-box">
                <strong>✓ Success Metrics & ROI</strong> - How to measure impact after workshop
            </div>
            <div class="success-box">
                <strong>✓ Implementation Guide</strong> - How teams use it after the workshop
            </div>
            <div class="success-box">
                <strong>✓ Troubleshooting Tips</strong> - Common issues and how to fix them
            </div>
            <div class="success-box">
                <strong>✓ Follow-Up Resources</strong> - Templates, checklists, reference guides
            </div>
        </div>
        
        <!-- Tab 4: Next Steps -->
        <div id="next-steps" class="tab-content">
            <h2>How to Get Your Module 1D</h2>
            <h3 style="color: #1F4788; margin-top: 20px;">Step 1: Choose Your Option</h3>
            <p>Click on any of the 8 option cards above (A through H) or reply with your choice.</p>
            
            <h3 style="color: #1F4788; margin-top: 20px;">Step 2: Confirm Selection</h3>
            <p>You can also choose:</p>
            <ul style="margin-left: 20px; margin-top: 10px;">
                <li><strong>I) Multiple Modules</strong> - Get 2-3 modules combined (8-12 hours to create)</li>
                <li><strong>J) Custom Module</strong> - Tell me your specific need and I'll create a custom solution</li>
            </ul>
            
            <h3 style="color: #1F4788; margin-top: 20px;">Step 3: Creation Timeline</h3>
            <p><strong>Single Module (A-H):</strong> 4-6 hours content creation</p>
            <p><strong>Multiple Modules (I):</strong> 8-12 hours content creation</p>
            <p><strong>Custom Module (J):</strong> 6-10 hours content creation</p>
            
            <h3 style="color: #1F4788; margin-top: 20px;">Step 4: You'll Receive</h3>
            <div class="success-box">
                ✓ Complete 90-minute workshop guide<br/>
                ✓ Real DEC Infra project scenarios<br/>
                ✓ Ready-to-use AI prompts<br/>
                ✓ Sample outputs & expected results<br/>
                ✓ Interactive HTML guides<br/>
                ✓ PDF reference documents<br/>
                ✓ Facilitator notes & talking points<br/>
                ✓ Printable handouts for participants
            </div>
            
            <h3 style="color: #1F4788; margin-top: 20px;">Ready to Proceed?</h3>
            <p>Reply with your choice: <strong>A, B, C, D, E, F, G, H, I, or J</strong></p>
        </div>
        
        <div class="footer">
            <h3>📊 Quick Stats</h3>
            <p>Each Module 1D provides:</p>
            <p style="font-size: 14px; margin: 10px 0;">
                <strong>5-20 hours/month</strong> time savings | 
                <strong>₹2-50L</strong> financial impact | 
                <strong>90 minutes</strong> workshop duration
            </p>
            <p style="margin-top: 20px;">
                <button class="cta-button" onclick="copyToClipboard('I want Module 1D Option A: Image & Photo Analysis')">Copy Selection</button>
                <button class="cta-button" onclick="copyToClipboard('I want Module 1D Option B: Email & Report Automation')">Copy Selection</button>
                <button class="cta-button" onclick="copyToClipboard('I want Module 1D Option C: Schedule & Resource Optimization')">Copy Selection</button>
            </p>
            <p style="margin-top: 15px; color: #666; font-size: 13px;">
                Choose any option above and I'll create a complete, ready-to-deliver workshop module with real DEC Infra examples!
            </p>
        </div>
    </div>`;
        }

        
        container.innerHTML = `
        <div class="mb-4" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
                <span class="badge badge-warning">Session 1</span>
                <h2 class="mt-4" style="background: -webkit-linear-gradient(45deg, #F8FAFC, #FFDE59); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Module 1: Prompting & Document Intelligence</h2>
                <p class="text-muted">Turn AI from a simple question-answering tool into a structured work assistant.</p>
            </div>
            <div style="width:130px; height:130px; flex-shrink:0; position:relative; display:flex; align-items:center; justify-content:center;">
                <div style="width:100px; height:100px; background:linear-gradient(135deg,rgba(255,222,89,0.15),rgba(255,222,89,0.03)); border:2px solid rgba(255,222,89,0.5); border-radius:22px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 30px rgba(255,222,89,0.25),0 0 60px rgba(255,222,89,0.1); animation:modFloat 3s ease-in-out infinite; font-size:2.8rem; position:relative;">📝
                    <div style="position:absolute; bottom:-2px; left:50%; transform:translateX(-50%); display:flex; gap:3px;">
                        <div style="width:5px; height:3px; background:var(--accent); border-radius:1px; animation:typeDot 1.2s ease infinite 0s;"></div>
                        <div style="width:5px; height:3px; background:var(--accent); border-radius:1px; animation:typeDot 1.2s ease infinite 0.2s;"></div>
                        <div style="width:5px; height:3px; background:var(--accent); border-radius:1px; animation:typeDot 1.2s ease infinite 0.4s;"></div>
                    </div>
                </div>
                <div style="position:absolute; inset:-8px; border:1px solid rgba(255,222,89,0.2); border-radius:30px; animation:modSpin 6s linear infinite;"></div>
                <style>@keyframes modFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}} @keyframes typeDot{0%,100%{opacity:0.2;transform:scaleX(1)}50%{opacity:1;transform:scaleX(1.4)}} @keyframes modSpin{to{transform:rotate(360deg)}}</style>
            </div>
        </div>

        <div class="flex gap-2 mb-6" style="display: flex; flex-wrap: wrap; gap: 0.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 2rem;">
            <button class="btn sub-tab-btn ${activeSubTab === 'agenda' ? 'btn-primary' : 'btn-secondary'}" data-subtab="agenda" style="border-radius: var(--radius-sm);">📋 Agenda</button>
            <button class="btn sub-tab-btn ${activeSubTab === '1a' ? 'btn-primary' : 'btn-secondary'}" data-subtab="1a" style="border-radius: var(--radius-sm);">📝 1A: Prompting</button>
            <button class="btn sub-tab-btn ${activeSubTab === '1b' ? 'btn-primary' : 'btn-secondary'}" data-subtab="1b" style="border-radius: var(--radius-sm);">📊 1B: Excel</button>
            <button class="btn sub-tab-btn ${activeSubTab === '1c' ? 'btn-primary' : 'btn-secondary'}" data-subtab="1c" style="border-radius: var(--radius-sm);">📄 1C: PDF</button>
            <button class="btn sub-tab-btn ${activeSubTab === '1d' ? 'btn-primary' : 'btn-secondary'}" data-subtab="1d" style="border-radius: var(--radius-sm);">🎮 1D: Interactive</button>
            <button class="btn sub-tab-btn ${activeSubTab === 'tools' ? 'btn-primary' : 'btn-secondary'}" data-subtab="tools" style="border-radius: var(--radius-sm);">🛠️ AI Tools Guide</button>
        </div>

        <div class="module1-content-wrapper">
            ${contentHtml}
        </div>
        `;

        
        // Event Listeners for Module 1
    setTimeout(() => {
        // System Persona
        document.getElementById('btn-run-persona')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-run-persona');
            btn.disabled = true;
            btn.innerText = "Running...";
            
            setTimeout(() => {
                const persona = document.getElementById('sys-persona').value;
                const promptVal = document.getElementById('sys-user-prompt').value.toLowerCase();
                let out = "";
                
                const isEmail = promptVal.includes("email") || promptVal.includes("message");
                const isReport = promptVal.includes("report") || promptVal.includes("progress") || promptVal.includes("update");
                
                if (persona === 'legal') {
                    if (isEmail) out = "<b>DISCLAIMER:</b> Draft email subject to review.<br><br>To Whom It May Concern,<br>Please find the official correspondence regarding the recent developments. Ensure all actions comply with clause 4.a of our policy.";
                    else if (isReport) out = "<b>CONFIDENTIAL REPORT</b><br><br>This document logs the activities on site. All incidents have been recorded in compliance with OSHA standards. No liabilities assumed without formal signature.";
                    else out = "<b>DISCLAIMER:</b> This summary does not constitute legal advice.<br><br>The provided text outlines a standard vendor agreement. <b>Key Liabilities:</b> Section 4.2 stipulates a ₹5,000/day penalty for delays. <b>Termination:</b> Either party may terminate with 30 days written notice. It is recommended to have Compliance review Section 7.";
                } else if (persona === 'marketing') {
                    if (isEmail) out = "Hey team! 🚀<br><br>Just wanted to drop a quick note about our latest update. Let's keep the momentum going! ✨";
                    else if (isReport) out = "🌟 <b>Awesome Site Update!</b> 🌟<br><br>Our team is crushing it this week! We're ahead of schedule on the main build and the client is loving the energy. Check out these wins!";
                    else out = "Hey team! 🚀<br><br>Here's the quick scoop on the vendor contract:<br>- <b>They're locked in!</b> Great terms for us.<br>- Watch out for the delay penalty (we don't want to pay that!).<br>- Easy out: we can cancel anytime with a 30-day notice.<br><br>Let's get this signed and start creating! ✨";
                } else { // concise
                    if (isEmail) out = "<b>Email Draft:</b><br>Subject: Update<br>Body: Please review the latest details attached. Awaiting your approval.";
                    else if (isReport) out = "<b>Status Report:</b><br>- Progress: 45%<br>- Issues: 0<br>- Next step: Foundation pour.";
                    else out = "<b>Contract Summary:</b><br>- <b>Type:</b> Vendor Agreement<br>- <b>Penalty:</b> ₹5k/day delay<br>- <b>Termination:</b> 30 days notice<br><br><b>Action Required:</b> Awaiting signature.";
                }
                
                document.getElementById('sys-persona-out').innerHTML = out;
                btn.disabled = false;
                btn.innerText = "Run with Persona";
                State.markExerciseComplete('m1_persona', 'module1');
            }, 600);
        });

        // Excel Formula Lab
        document.getElementById('btn-generate-excel')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-generate-excel');
            btn.disabled = true;
            btn.innerText = "Generating...";
            
            setTimeout(() => {
                const prompt = document.getElementById('excel-prompt').value.toLowerCase();
                let formula = "=IFERROR(VLOOKUP(A2, Sheet2!A:B, 2, FALSE), \"Not Found\")";
                
                if (prompt.includes("if") && (prompt.includes("multiple") || prompt.includes("nested"))) {
                    formula = "=IFS(A2>1000, \"High\", A2>500, \"Medium\", TRUE, \"Low\")";
                } else if (prompt.includes("if") || prompt.includes("condition")) {
                    formula = "=IF(A2>1000, \"Over Budget\", \"OK\")";
                } else if (prompt.includes("sum") && prompt.includes("multiple")) {
                    formula = "=SUMIFS(C:C, A:A, \">1000\", B:B, \"Approved\")";
                } else if (prompt.includes("sum") || prompt.includes("total")) {
                    formula = "=SUM(A2:A100)";
                } else if (prompt.includes("count") && prompt.includes("blank")) {
                    formula = "=COUNTBLANK(A2:A100)";
                } else if (prompt.includes("count")) {
                    formula = "=COUNTIF(B:B, \"Pending\")";
                } else if (prompt.includes("index") || prompt.includes("match")) {
                    formula = "=INDEX(Sheet2!B:B, MATCH(A2, Sheet2!A:A, 0))";
                } else if (prompt.includes("date") || prompt.includes("days")) {
                    formula = "=DATEDIF(A2, TODAY(), \"d\")";
                } else if (prompt.includes("average") || prompt.includes("mean")) {
                    formula = "=AVERAGE(B2:B100)";
                } else if (!prompt.includes("lookup")) {
                    // Generic fallback that echoes some of the prompt to show it's "dynamic"
                    formula = `/* AI generated formula for: ${prompt.substring(0, 20)}... */\n=LET(data, A2:B100, "Requires more specific logic")`;
                }
                
                document.getElementById('excel-out').innerText = formula;
                btn.disabled = false;
                btn.innerText = "Generate Formula ✨";
                State.markExerciseComplete('m1_excel', 'module1');
            }, 500);
        });

        // Optimizer
        let optimizedData = {};

        document.getElementById('btn-optimize-prompt')?.addEventListener('click', () => {
            const bad = document.getElementById('bad-prompt-input').value.toLowerCase();
            let role = "Assistant";
            let context = "General task";
            let task = "Provide information";
            let constraints = "Be concise";
            let format = "Paragraph";
            
            if (bad.includes("email")) {
                role = "Project Manager";
                context = "Project update communication";
                task = "Write an email to the client or team.";
                constraints = "Maintain a professional, reassuring tone. Do not mention financial penalties.";
                format = "Subject line + 3 short paragraphs.";
            } else if (bad.includes("report") || bad.includes("summary")) {
                role = "Data Analyst";
                context = "Weekly status reporting";
                task = "Summarize the key metrics and activities.";
                constraints = "Focus only on completed items. Do not include assumptions.";
                format = "Markdown list with bold headers.";
            } else if (bad.includes("vendor") || bad.includes("quote") || bad.includes("price")) {
                role = "Procurement Executive";
                context = "Vendor rate comparison";
                task = "Analyze the provided vendor quotes.";
                constraints = "Highlight the cheapest option. Flag missing items.";
                format = "Comparison table + recommendation.";
            } else {
                role = "DEC AI Assistant";
                context = "Executing a user request";
                task = `Fulfill the request: "${document.getElementById('bad-prompt-input').value}"`;
                constraints = "Ensure factual accuracy. Avoid hallucination.";
                format = "Clear, structured format.";
            }

            optimizedData = { role, context, task, constraints, format };
            
            const good = `Act as a ${role} for DEC Infra.\nContext: ${context}.\nTask: ${task}\nConstraints: ${constraints}\nFormat: ${format}`;
            document.getElementById('good-prompt-output').value = good;
            document.getElementById('btn-use-optimized').disabled = false;
        });

        document.getElementById('btn-use-optimized')?.addEventListener('click', () => {
            document.getElementById('prompt-role').value = optimizedData.role || "Project Manager";
            document.getElementById('prompt-context').value = optimizedData.context || "Project update communication";
            document.getElementById('prompt-task').value = optimizedData.task || "Write an email";
            document.getElementById('prompt-constraints').value = optimizedData.constraints || "Be concise";
            document.getElementById('prompt-format').value = optimizedData.format || "Paragraph";
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
            State.markExerciseComplete('m1_prompt', 'module1');
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

        // Claude Projects Lab
        document.getElementById('btn-claude-test')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-claude-test');
            btn.disabled = true;
            btn.innerText = "Testing...";
            
            setTimeout(() => {
                const sopIncluded = document.getElementById('chk-sop').checked;
                let out = "";
                if (sopIncluded) {
                    out = `<strong>WEEKLY PROGRESS REPORT</strong><br><br><strong>Incident Section:</strong><br>As per <em>Site_Safety_SOP_v2.pdf</em>, a minor injury was recorded. The worker was treated on-site. Form SS-1 has been filed within the required 12-hour window.`;
                } else {
                    out = `<strong>WEEKLY PROGRESS REPORT</strong><br><br><strong>Incident Section:</strong><br>A minor injury happened today. The worker is fine now. Please advise next steps. <br><br><span style="color:var(--danger); font-size:0.75rem;">(Note: Assistant didn't know the SOP rule to file Form SS-1 because it wasn't in its Knowledge Base!)</span>`;
                }
                document.getElementById('claude-out').innerHTML = out;
                btn.disabled = false;
                btn.innerText = "Test Assistant";
                showToast('Claude Project simulated!', 'success');
            }, 600);
        });

    }, 100);

        // Add event listeners for sub-tabs
        const tabBtns = container.querySelectorAll('.sub-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                activeSubTab = e.target.getAttribute('data-subtab');
                drawModule1View();
            });
        });
    }

    drawModule1View();
}



function renderModule2(container) {
    container.innerHTML = `
        <div class="mb-4" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
                <span class="badge badge-info">Session 2</span>
                <h2 class="mt-4" style="background: -webkit-linear-gradient(45deg, #F8FAFC, #06B6D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Module 2: Data Analysis with AI</h2>
                <p class="text-muted">Upload the 242-row DEC Infra dataset to AI for instant budget analysis, risk scanning, vendor benchmarking.</p>
            </div>
            <div style="width:130px; height:130px; flex-shrink:0; position:relative; display:flex; align-items:center; justify-content:center;">
                <div style="width:100px; height:100px; background:linear-gradient(135deg,rgba(6,182,212,0.15),rgba(6,182,212,0.03)); border:2px solid rgba(6,182,212,0.5); border-radius:22px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 30px rgba(6,182,212,0.25); animation:modFloat 3s ease-in-out 0.4s infinite; font-size:2.8rem; position:relative;">📊
                    <div style="position:absolute; bottom:8px; left:8px; right:8px; display:flex; align-items:flex-end; gap:2px; height:14px;">
                        <div style="flex:1; background:rgba(6,182,212,0.7); border-radius:1px; animation:barAnim 1.5s ease-in-out 0s infinite; height:60%;"></div>
                        <div style="flex:1; background:rgba(6,182,212,0.7); border-radius:1px; animation:barAnim 1.5s ease-in-out 0.2s infinite; height:90%;"></div>
                        <div style="flex:1; background:rgba(6,182,212,0.7); border-radius:1px; animation:barAnim 1.5s ease-in-out 0.4s infinite; height:40%;"></div>
                        <div style="flex:1; background:rgba(6,182,212,0.7); border-radius:1px; animation:barAnim 1.5s ease-in-out 0.6s infinite; height:75%;"></div>
                        <div style="flex:1; background:rgba(6,182,212,0.7); border-radius:1px; animation:barAnim 1.5s ease-in-out 0.8s infinite; height:55%;"></div>
                    </div>
                </div>
                <div style="position:absolute; inset:-8px; border:1px solid rgba(6,182,212,0.2); border-radius:30px; animation:modSpinRev 8s linear infinite;"></div>
                <style>@keyframes barAnim{0%,100%{transform:scaleY(1)}50%{transform:scaleY(0.4)}} @keyframes modSpinRev{to{transform:rotate(-360deg)}}</style>
            </div>
        </div>
        
        <div class="m2-content-wrapper mt-8">


<!-- OBJECTIVES -->
<div class="section open">
<div class="section-head" onclick="toggle(this)"><h2>🎯 Learning Objectives</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="stats">
<div class="stat"><span class="n">120</span><span class="l">Minutes</span></div>
<div class="stat"><span class="n">7</span><span class="l">Prompts</span></div>
<div class="stat"><span class="n">242</span><span class="l">Row Dataset</span></div>
<div class="stat"><span class="n">₹28.8 Cr</span><span class="l">Portfolio Budget</span></div>
</div>
<div class="card"><p>By the end of this module, you will:</p><ul>
<li>Upload any Excel/CSV to ChatGPT or Claude for instant analysis</li>
<li>Scan a ₹28.8 Cr portfolio across 12 concurrent projects in 2 minutes</li>
<li>Detect 28 budget overruns, 19 contingency burns, and rate anomalies</li>
<li>Compare vendor rates across projects and find ₹4-12L in savings</li>
<li>Generate board-level dashboards with 🟢🟡🔴 traffic lights automatically</li>
<li>Anonymize data before uploading (data protection from Module 3)</li>
<li>Build a personal prompt library for recurring analysis tasks</li>
</ul></div>
</div>
</div>

<!-- PART 1: THEORY -->
<div class="section open">
<div class="section-head" onclick="toggle(this)"><h2>🧠 Part 1: Why AI Changes Data Analysis in Construction</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="card">
<h3>The Problem: Data Overload at DEC Infra</h3>
<p>DEC Infra manages 12 concurrent projects generating 242+ budget line items, hundreds of vendor invoices, and weekly schedule updates. A finance manager doing this manually faces:</p>
<div class="grid-2">
<div>
<h4>📋 Manual Process</h4>
<ul>
<li>Open 12 separate Excel sheets</li>
<li>Cross-reference budget vs actual per item</li>
<li>Calculate variance for 242 rows</li>
<li>Identify which items are over budget</li>
<li>Check contingency across all projects</li>
<li>Write an executive summary</li>
<li>Create charts and dashboards</li>
</ul>
<p style="margin-top:10px;color:var(--danger);font-weight:600">⏱ Time: 4-6 hours per weekly review</p>
</div>
<div>
<h4>🤖 With AI Analysis</h4>
<ul>
<li>Upload combined CSV to ChatGPT/Claude</li>
<li>Paste one analysis prompt</li>
<li>AI scans ALL 242 rows simultaneously</li>
<li>AI flags every overrun, risk, anomaly</li>
<li>AI generates executive summary</li>
<li>AI provides recommendations & forecasts</li>
<li>Ask follow-up for deeper analysis</li>
</ul>
<p style="margin-top:10px;color:var(--success);font-weight:600">⏱ Time: 2-5 minutes per analysis</p>
</div>
</div>
</div>

<div class="card">
<h3>Three Levels of AI Data Analysis</h3>
<div class="grid-3">
<div style="background:rgba(33,150,243,0.06);padding:12px;border-radius:6px">
<h4 style="color:var(--info)">📊 Descriptive</h4>
<p>"What happened?"</p>
<ul><li>Totals & summaries</li><li>Top/bottom performers</li><li>Trend identification</li></ul>
</div>
<div style="background:rgba(255,214,0,0.06);padding:12px;border-radius:6px">
<h4 style="color:#FFD600">🔍 Diagnostic</h4>
<p>"Why did it happen?"</p>
<ul><li>Root cause analysis</li><li>Correlation detection</li><li>Anomaly explanation</li></ul>
</div>
<div style="background:rgba(76,175,80,0.06);padding:12px;border-radius:6px">
<h4 style="color:var(--success)">🔮 Predictive</h4>
<p>"What will happen?"</p>
<ul><li>Cost forecasting</li><li>Contingency burnout date</li><li>Schedule completion</li></ul>
</div>
</div>
</div>

<div class="card">
<h3>How to Upload Data — Step by Step</h3>
<div class="diagram">
<div class="flow">
<div class="node">1. Export Excel<br/><span style="font-size:11px;opacity:0.7">Save as .csv</span></div>
<div class="arr">→</div>
<div class="node">2. Anonymize<br/><span style="font-size:11px;opacity:0.7">Replace names</span></div>
<div class="arr">→</div>
<div class="node">3. Upload to AI<br/><span style="font-size:11px;opacity:0.7">Click 📎</span></div>
<div class="arr">→</div>
<div class="node">4. Paste Prompt<br/><span style="font-size:11px;opacity:0.7">Be specific</span></div>
<div class="arr">→</div>
<div class="node">5. Get Analysis<br/><span style="font-size:11px;opacity:0.7">30-60 seconds</span></div>
</div>
</div>
</div>

<div class="card">
<h3>Good vs Bad Prompts for Data Analysis</h3>
<div class="grid-2">
<div style="background:rgba(255,82,82,0.06);padding:12px;border-radius:6px;border-left:3px solid #FF5252">
<h4 style="color:var(--danger)">❌ Bad Prompt</h4>
<p>"Analyze this data"</p>
<p style="font-size:13px;opacity:0.7;margin-top:6px">Result: Generic summary, misses key overruns, no actionable insight</p>
</div>
<div style="background:rgba(76,175,80,0.06);padding:12px;border-radius:6px;border-left:3px solid #4CAF50">
<h4 style="color:var(--success)">✓ Good Prompt</h4>
<p>"Flag every item where spent >100%. Rank 12 projects by risk score 1-10. For top 3 riskiest, give root cause and corrective action. CEO summary, 1 page."</p>
<p style="font-size:13px;opacity:0.7;margin-top:6px">Result: 28 overruns found, ranked list, actionable plan</p>
</div>
</div>
<div class="info-box"><strong>ABCD Framework from Module 1:</strong> <strong>A</strong>udience (CEO/PM/Board) → <strong>B</strong>ackground (12 projects, ₹28.8 Cr) → <strong>C</strong>ontent (flag overruns, rank risks) → <strong>D</strong>elivery (table, 1-page, risk scores)</div>
</div>
</div>
</div>

<!-- PART 2: THE DATASET -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>📊 Part 2: The DEC Infra Dataset — 242 Rows, 12 Projects</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="card">
<h3>Dataset Overview</h3>
<p>A synthetic but realistic dataset modeled on DEC Infra's actual project portfolio. This is the file participants will upload to AI.</p>
<h4>12 Projects:</h4>
<div class="grid-3">
<div><ul><li>IISER Library, Tirupati</li><li>Medical College, Suryapet</li><li>IT Park Tower, Mangalgiri</li><li>NSDL Data Center, Bangalore</li></ul></div>
<div><ul><li>JNTU Campus, Anantapur</li><li>Urdu University, Hyderabad</li><li>APIIC Industrial Park</li><li>SWC Warehouse, Jaipur</li></ul></div>
<div><ul><li>Kamareddy Auditorium</li><li>Gajwel Auditorium</li><li>Kollur Township</li><li>Nizamabad Water Plant</li></ul></div>
</div>
<h4>26 Columns Across 5 Categories:</h4>
<table>
<tr><th>Category</th><th>Columns</th></tr>
<tr><td>Identity</td><td>Project_Name, Location, Project_Type</td></tr>
<tr><td>Budget</td><td>Budget_Line_Item, Sub_Category, Main_Category, Phase</td></tr>
<tr><td>Financial</td><td>Budgeted_Amount_Lacs, Spent_Amount_Lacs, Percentage_Spent, Remaining_Amount_Lacs</td></tr>
<tr><td>Contingency</td><td>Contingency_Allocated_Lacs, Contingency_Used_Lacs</td></tr>
<tr><td>Vendor</td><td>Vendor_Name, Unit_Rate_Rupees, Quantity_Units, Unit_Type</td></tr>
<tr><td>Progress</td><td>Work_Status, Completion_Target_Percent, Actual_Completion_Percent, Timeline_Status</td></tr>
<tr><td>Risk</td><td>Risk_Level, Risk_Description, Approval_Status, Invoice_Pending_Lacs, Notes</td></tr>
</table>
</div>

<div class="grid-2">
<div class="card">
<h3>Portfolio at a Glance</h3>
<table>
<tr><td>Total Budget</td><td style="text-align:right;font-weight:700;color:#FFD600">₹2,883.2 Lac</td></tr>
<tr><td>Total Spent</td><td style="text-align:right">₹1,913.0 Lac (66.4%)</td></tr>
<tr><td>Remaining</td><td style="text-align:right">₹970.2 Lac</td></tr>
<tr><td>Contingency Allocated</td><td style="text-align:right">₹203.2 Lac</td></tr>
<tr><td>Contingency Used</td><td style="text-align:right;color:var(--warning)">₹34.0 Lac (16.7%)</td></tr>
<tr><td>Pending Invoices</td><td style="text-align:right;color:var(--danger)">₹201.2 Lac</td></tr>
<tr><td>Items Over Budget</td><td style="text-align:right;color:var(--danger)">28 of 242</td></tr>
<tr><td>High/Critical Risk Items</td><td style="text-align:right;color:var(--danger)">84 items</td></tr>
</table>
</div>
<div class="card">
<h3>🚩 Red Flags (Don't Reveal Before Demo!)</h3>
<ul>
<li>Gajwel HVAC: <span style="color:var(--danger)">115% spent</span> — ₹1.8L over</li>
<li>Nizamabad RCC Columns: <span style="color:var(--danger)">114.9%</span> — ₹2.9L over</li>
<li>Kollur Slab Casting: <span style="color:var(--danger)">110.3%</span> — ₹2.5L over</li>
<li>Kamareddy HVAC contingency: <span style="color:var(--warning)">91% burned</span></li>
<li>Medical College Piling contingency: <span style="color:var(--warning)">88% burned</span></li>
<li>Rebar rate gap: IT Park ₹51/kg vs Medical College ₹65/kg (<span style="color:var(--danger)">27% spread</span>)</li>
<li>JNTU pending invoice: <span style="color:var(--warning)">₹9.87L stuck</span></li>
<li>Healthiest: <span style="color:var(--success)">IT Park & JNTU — zero overruns, zero contingency burn</span></li>
</ul>
</div>
</div>

<div class="card">
<h3>Project Risk Heatmap</h3>
<table>
<tr><th>Project</th><th>Rows</th><th>Budget</th><th>% Spent</th><th>Overruns</th><th>High Risk</th><th>Status</th></tr>
<tr><td>Medical College</td><td>21</td><td>₹292.4L</td><td>70.6%</td><td style="color:var(--danger)">3</td><td style="color:var(--danger)">8</td><td>🔴 Stressed</td></tr>
<tr><td>Kollur Township</td><td>21</td><td>₹239.8L</td><td>77.7%</td><td style="color:var(--danger)">3</td><td style="color:var(--danger)">10</td><td>🔴 Stressed</td></tr>
<tr><td>Kamareddy Auditorium</td><td>22</td><td>₹203.3L</td><td>73.4%</td><td style="color:var(--warning)">4</td><td style="color:var(--danger)">11</td><td>🟠 Watch</td></tr>
<tr><td>Nizamabad Water Plant</td><td>23</td><td>₹250.8L</td><td>74.1%</td><td style="color:var(--warning)">3</td><td style="color:var(--danger)">11</td><td>🟠 Watch</td></tr>
<tr><td>IISER Library</td><td>16</td><td>₹221.7L</td><td>78.0%</td><td style="color:var(--warning)">4</td><td>8</td><td>🟠 Watch</td></tr>
<tr><td>Gajwel Auditorium</td><td>23</td><td>₹239.7L</td><td>62.3%</td><td style="color:var(--warning)">4</td><td>7</td><td>🟠 Watch</td></tr>
<tr><td>NSDL Data Center</td><td>18</td><td>₹253.4L</td><td>64.8%</td><td>3</td><td>7</td><td>🟡 Caution</td></tr>
<tr><td>SWC Warehouse</td><td>21</td><td>₹249.6L</td><td>62.0%</td><td>3</td><td>11</td><td>🟡 Caution</td></tr>
<tr><td>APIIC Industrial Park</td><td>22</td><td>₹230.7L</td><td>63.6%</td><td>1</td><td>4</td><td>🟡 Caution</td></tr>
<tr><td>Urdu University</td><td>17</td><td>₹185.2L</td><td>60.2%</td><td style="color:var(--success)">0</td><td>7</td><td>🟢 Healthy</td></tr>
<tr><td style="color:var(--success)">IT Park Tower</td><td>18</td><td>₹261.8L</td><td style="color:var(--success)">56.9%</td><td style="color:var(--success)">0</td><td style="color:var(--success)">0</td><td>🟢 Best</td></tr>
<tr><td style="color:var(--success)">JNTU Campus Block</td><td>20</td><td>₹254.8L</td><td style="color:var(--success)">53.7%</td><td style="color:var(--success)">0</td><td style="color:var(--success)">0</td><td>🟢 Best</td></tr>
</table>
<div class="tip"><strong>💡 Facilitator:</strong> Don't show this table before the demo. Let participants see AI discover these patterns live — that's the "wow" moment.</div>
</div>
</div>
</div>

<!-- PART 3: 7 PROMPTS -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🎬 Part 3: Live Demo — 7 Analysis Prompts with Expected Outputs</h2><span class="arrow">▼</span></div>
<div class="section-body">
<p style="margin-bottom:15px">Upload the 242-row CSV first, then paste any prompt. Click each to expand and see expected AI output.</p>

<!-- P1 -->
<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-d">LIVE DEMO</span> Prompt 1: Portfolio Risk Scan</h3><span class="csa">▼</span></div><div class="cs-body">
<p><span class="badge badge-time">⏱ 2 min</span> <span class="badge badge-risk">⚠ Most critical — run this first</span></p>
<span class="prompt-label">COPY-PASTE PROMPT</span>
<div class="prompt"><button class="copy-btn" onclick="cp(this)">📋 Copy</button>I've uploaded a CSV with 242 rows of construction project budget data across 12 concurrent projects, total portfolio budget ₹2,883 Lac.

Run a PORTFOLIO RISK SCAN:

1. FLAG every line item where Percentage_Spent exceeds 100%
2. FLAG every item where Contingency_Used exceeds 50% of Contingency_Allocated
3. FLAG every project where Actual_Completion < Completion_Target by more than 10%
4. RANK all 12 projects from highest risk to lowest risk
5. For the TOP 3 riskiest projects, provide:
   - Specific overrun line items with amounts
   - Root cause analysis
   - Recommended corrective action
   - Forecast: Will this project finish over budget? By how much?

Format as a 1-page executive summary for the CEO.
Include a risk score (1-10) for each project.
Use 🔴🟡🟢 indicators.</div>

<span class="output-label">EXPECTED AI OUTPUT</span>
<div class="output">🚨 PORTFOLIO RISK SCAN — EXECUTIVE SUMMARY
Portfolio: ₹2,883.2L across 12 projects | 66.4% spent | 28 overruns detected

CRITICAL PROJECTS:
━━━━━━━━━━━━━━━━━━

🔴 Kamareddy Auditorium — Risk: 8.2/10
├─ HVAC Units: 108.2% (₹2.2L over) + contingency 91% burned
├─ Fire Fighting: 109.7% (₹0.8L over)
├─ Lighting Fixtures: 110.3% (₹0.3L over)
├─ Root cause: MEP scope underestimated, vendor rates escalated
├─ Forecast: ₹4-6L final overrun if uncorrected
└─ ACTION: Freeze MEP additions, renegotiate HVAC contract

🔴 Kollur Township — Risk: 7.8/10
├─ Slab Casting: 110.3% (₹2.5L over) + contingency 57% burned
├─ Elevator: contingency 58% burned (₹1.8L of ₹3.1L)
├─ Floor Tiling: contingency 80% burned (₹2.7L of ₹3.3L)
├─ Root cause: Residential finishing costs exceeded estimates
├─ Forecast: ₹3-5L additional contingency needed
└─ ACTION: Value-engineering on remaining finishes

🟠 Nizamabad Water Plant — Risk: 7.0/10
├─ RCC Columns: 114.9% (₹2.9L over) + contingency 73% burned
├─ Rebar contingency: 64% burned
├─ Root cause: Foundation conditions required heavier RCC
├─ Forecast: ₹3-4L overrun if current pace continues
└─ ACTION: Design review for remaining structural scope

HEALTHY PROJECTS:
├─ 🟢 IT Park Tower: Risk 1.5/10 — Zero overruns, zero contingency burn
├─ 🟢 JNTU Campus: Risk 1.8/10 — Under budget, ahead of schedule
└─ 🟢 Urdu University: Risk 3.0/10 — On track, no overruns

PORTFOLIO SUMMARY:
├─ Total overrun items: 28 of 242 (11.6%)
├─ Total contingency at risk: ₹34L used of ₹203L (16.7%)
├─ Pending invoices: ₹201.2L (potential cash flow impact)
└─ Forecast: Portfolio will finish within budget IF top 3 projects are corrected</div>
</div></div>

<!-- P2 -->
<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-d">LIVE DEMO</span> Prompt 2: Cross-Project Variance Analysis</h3><span class="csa">▼</span></div><div class="cs-body">
<span class="prompt-label">COPY-PASTE PROMPT</span>
<div class="prompt"><button class="copy-btn" onclick="cp(this)">📋 Copy</button>Using the same 242-row dataset, perform a CROSS-PROJECT VARIANCE ANALYSIS:

1. Compare budget utilization (% spent) across all 12 projects — rank most to least efficient
2. Which project has BEST cost control? What are they doing right?
3. Which has WORST cost control? What went wrong?
4. Compare SAME materials across projects:
   - Rebar/TMT Steel rate per kg across all projects
   - Concrete rate per cum across all projects
   - HVAC rate per unit across all projects
5. Which vendors appear in multiple projects? Are their rates consistent?
6. Calculate: If every project used the lowest rate for each material, total savings?

Create a comparison table + key insights.
Highlight: Top 5 procurement optimization opportunities.</div>
</div></div>

<!-- P3 -->
<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-d">LIVE DEMO</span> Prompt 3: Phase-by-Phase Trend Analysis</h3><span class="csa">▼</span></div><div class="cs-body">
<span class="prompt-label">COPY-PASTE PROMPT</span>
<div class="prompt"><button class="copy-btn" onclick="cp(this)">📋 Copy</button>Analyze the 242-row dataset by CONSTRUCTION PHASE:

1. Group all items by Main_Category (Civil, MEP, Finishing)
2. For EACH phase across all 12 projects:
   - Total budget vs total spent
   - Average budget utilization (%)
   - Number of overrun items
   - Average contingency burn rate
3. Which phase consistently runs over budget? By how much?
4. Which phase is most predictable (lowest variance)?
5. Civil vs MEP vs Finishing — which is the riskiest phase for DEC Infra?
6. Recommend contingency allocation % per phase for future projects

Create a phase benchmarking report with a summary table.</div>
</div></div>

<!-- P4 -->
<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-d">LIVE DEMO</span> Prompt 4: Contingency Health Check</h3><span class="csa">▼</span></div><div class="cs-body">
<span class="prompt-label">COPY-PASTE PROMPT</span>
<div class="prompt"><button class="copy-btn" onclick="cp(this)">📋 Copy</button>Run a CONTINGENCY HEALTH CHECK on all 12 projects:

1. Portfolio level: ₹203.2L allocated, ₹34.0L used — is this sustainable?
2. Per project: contingency allocated, used, remaining, burn rate (%)
3. Flag every item where contingency burn exceeds 50%
4. At current burn rates, which projects exhaust contingency before completion?
5. Which projects have barely touched contingency? Can we reallocate?
6. Total additional contingency needed across portfolio to finish safely

Create a RAG dashboard:
🔴 RED: >60% contingency burned
🟡 AMBER: 30-60% burned
🟢 GREEN: <30% burned

Recommend: Specific contingency reallocation from healthy to stressed projects.</div>
</div></div>

<!-- P5 -->
<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-d">LIVE DEMO</span> Prompt 5: Vendor Rate Deep-Dive</h3><span class="csa">▼</span></div><div class="cs-body">
<p><span class="badge badge-impact">💰 This prompt typically finds ₹4-12L in savings</span></p>
<span class="prompt-label">COPY-PASTE PROMPT</span>
<div class="prompt"><button class="copy-btn" onclick="cp(this)">📋 Copy</button>Perform a VENDOR RATE DEEP-DIVE across all 12 projects:

1. Extract all unit rates from Unit_Rate_Rupees column
2. Compare the SAME material/service across different projects:
   - Rebar/TMT Steel per kg (I can see rates from ₹51-65/kg — why the spread?)
   - Concrete per cum
   - HVAC per unit
   - Electrical wiring per Rmt
   - Plumbing per Rmt
3. For each material: Best rate, worst rate, % difference, which project pays most
4. Flag any item where a project pays >20% above portfolio average
5. Calculate total savings if all projects used the best available rate
6. Are any vendors charging different rates for same work at different projects?

Format as a procurement optimization report.
Top 5 items where renegotiating saves the most money.
Include a "Quick Win" section: savings achievable within 30 days.</div>

<span class="output-label">EXPECTED FINDING: REBAR RATE ANOMALY</span>
<div class="output">📊 REBAR / TMT STEEL — RATE COMPARISON ACROSS PROJECTS

Project                Rate (₹/kg)    Vendor                    vs Best
──────────────────────────────────────────────────────────────────────
IT Park Tower          ₹51/kg         AP Infra Services         BEST ✓
APIIC Industrial       ₹53/kg         Sri Balaji Infra          +3.9%
Nizamabad Water        ₹53/kg         Hyderabad Civil Corp      +3.9%
Gajwel Auditorium      ₹55/kg         Srinivasa Constructions   +7.8%
SWC Warehouse          ₹63/kg         Ravi Foundations          +23.5% ⚠️
Kamareddy Auditorium   ₹63/kg         Srinivasa Constructions   +23.5% ⚠️
Medical College        ₹65/kg         SVS Contractors           +27.5% 🔴

⚠️ FINDING: Medical College pays 27.5% MORE than IT Park for identical TMT steel.
   If Medical College had 15,000 kg remaining at ₹65 → switch to ₹51 vendor:
   Savings: 15,000 × ₹14 = ₹2.1L on ONE material at ONE project.

💰 PORTFOLIO-WIDE: Standardizing rebar at ₹54/kg (volume discount) across
   all projects with remaining quantities = estimated ₹4.8-6.2L annual savings.</div>
</div></div>

<!-- P6 -->
<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-d">NEW</span> Prompt 6: Invoice & Payment Gap Analysis</h3><span class="csa">▼</span></div><div class="cs-body">
<p><span class="badge badge-impact">💰 ₹201.2L in pending invoices — who gets paid first?</span></p>
<span class="prompt-label">COPY-PASTE PROMPT</span>
<div class="prompt"><button class="copy-btn" onclick="cp(this)">📋 Copy</button>Analyze INVOICE & PAYMENT GAPS across all 12 projects:

1. Total pending invoices: ₹201.2L — break down by project
2. List TOP 10 highest pending invoices (amount, project, item, vendor)
3. Are any pending invoices linked to items that are OVER BUDGET?
   (This could mean disputed billing or inflated charges)
4. Are any pending invoices stuck at "Pending" or "Under Review" approval?
5. Which vendors have the most pending invoices across multiple projects?
6. Calculate: If we clear all undisputed invoices this month, what's the cash outflow?

Create an invoice priority list:
- CLEAR NOW: Approved, undisputed, vendor relationship at risk
- INVESTIGATE: Linked to overruns or disputed items
- HOLD: Under review, need more information

Recommend: Top 5 invoices to clear this week and why.</div>
</div></div>

<!-- P7 -->
<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-d">NEW</span> Prompt 7: Board-Level Dashboard</h3><span class="csa">▼</span></div><div class="cs-body">
<p><span class="badge badge-time">⏱ 3 min</span> <span class="badge badge-impact">💰 Replaces 2 days of manual board prep</span></p>
<span class="prompt-label">COPY-PASTE PROMPT</span>
<div class="prompt"><button class="copy-btn" onclick="cp(this)">📋 Copy</button>Create a BOARD-LEVEL PROJECT HEALTH DASHBOARD from this 242-row dataset:

For EACH of the 12 projects, create a status row:
- Project Name & Location
- Budget (₹L) | Spent (%) | Remaining
- 🟢🟡🔴 Budget Status (Under/At/Over)
- 🟢🟡🔴 Schedule Status (Ahead/On Track/Behind)
- 🟢🟡🔴 Contingency Status (Safe/<50% used/>50% used)
- Top Risk (1-line)
- Risk Score (1-10)

Then provide:
1. PORTFOLIO OVERVIEW (3 sentences max — total budget, health, key concern)
2. TOP 3 CONCERNS requiring board attention (with ₹ impact)
3. TOP 3 ACHIEVEMENTS worth highlighting
4. FORECAST: Will the ₹2,883L portfolio finish within budget?
5. DECISION QUEUE: Items requiring board approval this month

Format as professional board report. Max 2 pages. Traffic lights throughout.</div>
</div></div>

</div>
</div>

<!-- PART 4: CASE STUDIES -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>📂 Part 4: Case Studies — AI Catches What Humans Miss</h2><span class="arrow">▼</span></div>
<div class="section-body">

<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-c">CASE STUDY</span> CS-1: The ₹2.9L RCC Overrun Hidden in 242 Rows</h3><span class="csa">▼</span></div><div class="cs-body">
<div class="cb" style="border-left:3px solid #FF5252"><h4 style="color:var(--danger)">📍 Situation</h4><p>Nizamabad Water Plant monthly report shows "on track" — overall 74.1% spent vs 75% planned. Looks fine at project level. But nobody drills into the 23 individual line items.</p></div>
<div class="cb" style="border-left:3px solid #2196F3"><h4 style="color:var(--info)">🤖 What AI Found</h4><p>Portfolio Risk Scan prompt flagged RCC Columns & Beams at <strong>114.9% spent — ₹2.9L over budget</strong>, the single largest overrun in the entire 242-row dataset. The overrun was masked because earthwork and plastering were under budget, averaging out the total. AI also found contingency for this item was already 73% burned with 30% of work remaining.</p></div>
<div class="cb" style="border-left:3px solid #4CAF50"><h4 style="color:var(--success)">💰 Impact</h4><p>Manual discovery: at project end (too late). AI discovery: at 74% completion (time to act). PM froze scope additions, renegotiated remaining rebar quantities. <strong>Saved ₹1.8L vs doing nothing.</strong> Time to find it manually: 3-4 hours scanning 242 rows. Time with AI: 90 seconds.</p></div>
</div></div>

<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-c">CASE STUDY</span> CS-2: ₹4.8L Saved by Comparing Rebar Rates</h3><span class="csa">▼</span></div><div class="cs-body">
<div class="cb" style="border-left:3px solid #FF5252"><h4 style="color:var(--danger)">📍 Situation</h4><p>Each of DEC Infra's 12 projects negotiates rebar independently. Nobody compares rates across sites because data lives in separate spreadsheets managed by different PMs.</p></div>
<div class="cb" style="border-left:3px solid #2196F3"><h4 style="color:var(--info)">🤖 What AI Found</h4><p>Vendor Rate Deep-Dive revealed: IT Park pays ₹51/kg, Medical College pays ₹65/kg — a <strong>27.5% gap</strong> for identical-grade TMT steel. SWC and Kamareddy also overpaying at ₹63/kg. AI calculated: standardizing at ₹54/kg (volume discount across portfolio) would save <strong>₹4.8-6.2L annually</strong>.</p></div>
<div class="cb" style="border-left:3px solid #4CAF50"><h4 style="color:var(--success)">🎯 Action</h4><p>DEC Infra centralized rebar procurement. Single vendor negotiation across all sites. Result: ₹54/kg rate locked for 12 months. <strong>Annual savings: ₹8-12L.</strong> This one AI prompt paid for the entire training program.</p></div>
</div></div>

<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-c">CASE STUDY</span> CS-3: Kamareddy Contingency — 6 Weeks from Disaster</h3><span class="csa">▼</span></div><div class="cs-body">
<div class="cb" style="border-left:3px solid #FF5252"><h4 style="color:var(--danger)">📍 Situation</h4><p>Kamareddy Auditorium has 4 overrun items and its HVAC contingency is 91% burned. Medical College piling contingency is 88% burned. Meanwhile, IT Park and JNTU have healthy untouched contingency reserves.</p></div>
<div class="cb" style="border-left:3px solid #2196F3"><h4 style="color:var(--info)">🤖 What AI Found</h4><p>Contingency Health Check revealed: At current burn rate, Kamareddy would exhaust ALL contingency in 6 weeks. Medical College in 8 weeks. But IT Park had ₹0.4L barely touched, JNTU had ₹0.4L untouched — both projects under budget and won't need it.</p></div>
<div class="cb" style="border-left:3px solid #4CAF50"><h4 style="color:var(--success)">💰 Impact</h4><p>CFO approved reallocating ₹5L from healthy projects to stressed projects. Without this: Kamareddy would pause work (₹3-5L in idle labor costs) or request emergency board approval (3-week delay). AI analysis done in 2 minutes. Manual: Would require a full-day cross-portfolio review that nobody had time for.</p></div>
</div></div>

<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-c">CASE STUDY</span> CS-4: ₹9.87L Invoice Stuck for 45 Days</h3><span class="csa">▼</span></div><div class="cs-body">
<div class="cb" style="border-left:3px solid #FF5252"><h4 style="color:var(--danger)">📍 Situation</h4><p>JNTU Campus has a ₹9.87L pending invoice for piling work — the largest pending invoice in the entire portfolio. The vendor is threatening to stop work on another DEC Infra project.</p></div>
<div class="cb" style="border-left:3px solid #2196F3"><h4 style="color:var(--info)">🤖 What AI Found</h4><p>Invoice Gap Analysis revealed: 10 invoices totaling ₹54L are pending across the portfolio. The JNTU ₹9.87L invoice was approved but stuck in payment processing. Meanwhile, 3 invoices totaling ₹8.5L were linked to over-budget items — flagged for investigation before payment.</p></div>
<div class="cb" style="border-left:3px solid #4CAF50"><h4 style="color:var(--success)">🎯 Action</h4><p>Clear the 7 undisputed invoices (₹45.5L) immediately. Investigate 3 disputed invoices (₹8.5L) before payment. JNTU piling invoice cleared same day — vendor relationship preserved. <strong>One prompt prevented a vendor walkout that would have delayed JNTU by 3 weeks (₹8-10L impact).</strong></p></div>
</div></div>

<div class="cs" onclick="tcs(this)"><div class="cs-head"><h3><span class="cst cst-w">CAUTIONARY</span> CS-5: When AI Got the Recommendation Wrong</h3><span class="csa">▼</span></div><div class="cs-body">
<div class="cb" style="border-left:3px solid #FF5252"><h4 style="color:var(--danger)">📍 What Went Wrong</h4><p>AI recommended dropping Srinivasa Constructions (₹63/kg rebar at Kamareddy) in favor of a cheaper vendor. Srinivasa also appears at Gajwel at ₹55/kg — so they can clearly supply at lower rates.</p></div>
<div class="cb" style="border-left:3px solid #FF9800"><h4 style="color:var(--warning)">💥 What AI Didn't Know</h4><p>Srinivasa has a 12-year relationship with DEC Infra. They provide 24-hour emergency deliveries, 90-day credit terms, and have never missed a deadline. The ₹63/kg rate at Kamareddy included trucking to a remote location (2 hours from Hyderabad). The cheaper vendor would charge ₹12/kg extra for delivery — making them MORE expensive. AI analyzed data, not relationships.</p></div>
<div class="cb" style="border-left:3px solid #4CAF50"><h4 style="color:var(--success)">✅ Lesson</h4><p><strong>AI analyzes what's IN the data. It doesn't know what's NOT in the data.</strong> Vendor relationships, delivery reliability, credit terms, site accessibility — these don't appear in spreadsheets. Always layer human judgment on AI analysis. AI is the starting point, never the final answer.</p></div>
</div></div>

</div>
</div>

<!-- PART 5: DATA PROTECTION -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🔒 Part 5: Data Protection — Anonymize Before Uploading</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="warning"><strong>⚠️ Free ChatGPT may train on your data.</strong> Use the anonymized version of the dataset for practice. See Module 3 for full data classification.</div>
<div class="card">
<h3>Quick Anonymization (2 minutes in Excel)</h3>
<table>
<tr><th>Step</th><th>Find</th><th>Replace With</th><th>Shortcut</th></tr>
<tr><td>1</td><td>IISER Library</td><td>Project Alpha</td><td>Ctrl+H</td></tr>
<tr><td>2</td><td>Medical College</td><td>Project Beta</td><td>Ctrl+H</td></tr>
<tr><td>3</td><td>Tirupati, AP</td><td>Location 1</td><td>Ctrl+H</td></tr>
<tr><td>4</td><td>SVS Contractors</td><td>Civil Vendor A</td><td>Ctrl+H</td></tr>
<tr><td>5</td><td><em>...repeat for all vendors...</em></td><td></td><td></td></tr>
<tr><td>6</td><td colspan="3">Keep ALL numbers intact — amounts, rates, percentages stay as-is</td></tr>
</table>
<p style="margin-top:10px"><strong>Pre-built anonymized file available:</strong> <code>DEC_Infra_Dataset_ANONYMIZED.csv</code> — ready to upload to free AI tools immediately.</p>
</div>
<div class="success"><strong>✓ Two files provided:</strong> (1) Master dataset with real names (facilitator reference only), (2) Anonymized dataset (safe for participant hands-on with any AI tool).</div>
</div>
</div>

<!-- PART 6: EXERCISE -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>👨‍💻 Part 6: Hands-On Team Challenge (25 minutes)</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="exercise"><h3>🏋️ Team Challenge: Analyze the ₹28.8 Cr Portfolio</h3><p>4 teams, each uploads the anonymized CSV and runs ONE assigned prompt. Present top 3 findings in 2 minutes. Judged on: insight quality, actionability, and clarity.</p></div>
<div class="grid-2">
<div class="card"><h3>Team 1: Budget Detectives 🔍</h3><p>Prompt #1 (Risk Scan). Find the 3 most dangerous overruns. What should the CEO know TODAY?</p><p style="font-size:13px;opacity:0.7;margin-top:8px">Judge asks: "If you fix only ONE item, which and why?"</p></div>
<div class="card"><h3>Team 2: Cost Optimizers 💰</h3><p>Prompt #5 (Rate Deep-Dive). Find 3 materials where DEC Infra overpays. Total savings?</p><p style="font-size:13px;opacity:0.7;margin-top:8px">Judge asks: "How much can we save this quarter?"</p></div>
<div class="card"><h3>Team 3: Contingency Watchers ⚠️</h3><p>Prompt #4 (Contingency Check). Which projects run out first? What do we do?</p><p style="font-size:13px;opacity:0.7;margin-top:8px">Judge asks: "Should we reallocate? From where to where?"</p></div>
<div class="card"><h3>Team 4: Board Briefers 📋</h3><p>Prompt #7 (Board Dashboard). Create the board report. Present as if the board is listening NOW.</p><p style="font-size:13px;opacity:0.7;margin-top:8px">Judge asks: "What decision does the board make today?"</p></div>
</div>
<div class="tip"><strong>💡 Tips:</strong> Upload CSV first, then paste prompt. If ChatGPT is slow, try Claude. Focus on INSIGHTS not descriptions — tell us what you FOUND, not what you DID.</div>
</div>
</div>

<!-- PART 7: ADVANCED -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🚀 Part 7: Advanced — Follow-Up Questions & Prompt Library</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="card">
<h3>5 Powerful Follow-Up Patterns</h3>
<p>After the first analysis, dig deeper. AI remembers your uploaded data within the conversation.</p>
<table>
<tr><th>Pattern</th><th>Example</th><th>Reveals</th></tr>
<tr><td><strong>Drill Down</strong></td><td>"Zoom into Kamareddy only. Show every overrun sorted by severity."</td><td>Granular single-project view</td></tr>
<tr><td><strong>What-If</strong></td><td>"If we renegotiate rebar to ₹54/kg everywhere, total savings?"</td><td>Scenario modeling for procurement</td></tr>
<tr><td><strong>Compare</strong></td><td>"Why does IT Park have zero overruns but Kamareddy has 4? Compare."</td><td>Root cause by project comparison</td></tr>
<tr><td><strong>Forecast</strong></td><td>"At current burn rates, forecast final cost for each project."</td><td>Early warning for budget requests</td></tr>
<tr><td><strong>Action Plan</strong></td><td>"For the 5 worst overruns, create a 30-day corrective plan with owners."</td><td>Converts analysis into execution</td></tr>
</table>
</div>
<div class="card">
<h3>Build Your Prompt Library</h3>
<div class="grid-2">
<div><h4>For Project Managers</h4><ul><li>Weekly budget variance scan</li><li>Monthly board dashboard</li><li>Vendor performance ranking</li><li>Schedule risk assessment</li></ul></div>
<div><h4>For Finance Teams</h4><ul><li>Invoice aging analysis</li><li>Cash flow forecasting</li><li>Cross-project benchmarking</li><li>Contingency utilization</li></ul></div>
</div>
</div>
</div>
</div>

<!-- TAKEAWAYS -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🎯 Key Takeaways</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="card">
<table>
<tr><th>#</th><th>Takeaway</th><th>Proof</th></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">1</td><td><strong>242 rows analyzed in 90 seconds</strong></td><td>28 overruns, 19 contingency burns found instantly</td></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">2</td><td><strong>AI catches what manual reviews miss</strong></td><td>₹2.9L RCC overrun hidden inside project-level totals</td></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">3</td><td><strong>Cross-project comparison reveals savings</strong></td><td>₹4.8-6.2L saved on rebar alone by standardizing rates</td></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">4</td><td><strong>Contingency reallocation prevents crises</strong></td><td>₹5L moved from healthy to stressed projects — avoided work stoppage</td></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">5</td><td><strong>Invoice analysis protects vendor relationships</strong></td><td>₹9.87L stuck invoice cleared — prevented vendor walkout</td></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">6</td><td><strong>Always anonymize before uploading</strong></td><td>2 min anonymization protects ₹crores of data</td></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">7</td><td><strong>AI assists, humans decide</strong></td><td>CS-5: AI recommended dropping best vendor — human judgment saved ₹8L</td></tr>
</table>
</div>
<div class="stats">
<div class="stat"><span class="n">90 sec</span><span class="l">vs 4-6 hrs manual</span></div>
<div class="stat"><span class="n">₹28.8 Cr</span><span class="l">Portfolio analyzed</span></div>
<div class="stat"><span class="n">7</span><span class="l">Ready prompts</span></div>
<div class="stat"><span class="n">₹12-24L</span><span class="l">Annual savings</span></div>
</div>
<div class="card"><h3>Your 1-Week Action Plan</h3><ul>
<li><strong>Today:</strong> Download both CSV files and try Prompt #1 yourself</li>
<li><strong>Tomorrow:</strong> Export YOUR project's budget as CSV, anonymize it, run Risk Scan</li>
<li><strong>This week:</strong> Try 3 different prompts on your actual data</li>
<li><strong>Next week:</strong> Start building your personal prompt library</li>
<li><strong>This month:</strong> Replace one manual reporting task with AI analysis</li>
</ul></div>
</div>
</div>


        </div>
`;
    
    // Auto-scroll to top
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
}

function renderModule3(container) {
    container.innerHTML = `
        <div class="mb-4" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
                <span class="badge badge-success">Session 3</span>
                <h2 class="mt-4" style="background: -webkit-linear-gradient(45deg, #F8FAFC, #FFDE59); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Module 3: Safe AI Usage & Responsible Adoption</h2>
                <p class="text-muted">Data classification, identifying hallucinations, and human-in-the-loop verification.</p>
            </div>
            <div style="width:130px; height:130px; flex-shrink:0; position:relative; display:flex; align-items:center; justify-content:center;">
                <div style="width:100px; height:100px; background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.03)); border:2px solid rgba(16,185,129,0.5); border-radius:22px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 30px rgba(16,185,129,0.25); animation:modFloat 3s ease-in-out 0.8s infinite; font-size:2.8rem; position:relative;">🛡️</div>
                <div style="position:absolute; inset:-8px; border:1px solid rgba(16,185,129,0.25); border-radius:30px; animation:modSpin 7s linear infinite;"></div>
                <div style="position:absolute; inset:-18px; border:1px dashed rgba(16,185,129,0.12); border-radius:40px; animation:modSpinRev 10s linear infinite;"></div>
                <div style="position:absolute; width:110px; height:110px; border-radius:50%; box-shadow:0 0 0 0 rgba(16,185,129,0.4); animation:shieldPulse 2s ease-out infinite;"></div>
                <style>@keyframes shieldPulse{0%{box-shadow:0 0 0 0 rgba(16,185,129,0.4)}70%{box-shadow:0 0 0 20px rgba(16,185,129,0)}100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}}</style>
            </div>
        </div>
        
        <div class="m3-content-wrapper mt-8">


<!-- OBJECTIVES -->
<div class="section open">
<div class="section-head" onclick="toggle(this)"><h2>🎯 Learning Objectives</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="stats">
<div class="stat"><span class="n">120</span><span class="l">Minutes</span></div>
<div class="stat"><span class="n">12</span><span class="l">Case Studies</span></div>
<div class="stat"><span class="n">15</span><span class="l">Quiz Scenarios</span></div>
<div class="stat"><span class="n">₹5-50L</span><span class="l">Risk Avoided</span></div>
</div>
<div class="card"><p>By the end of this module, you will:</p><ul>
<li>Understand how AI actually processes and stores your data</li>
<li>Know the 5 categories of AI risk relevant to construction</li>
<li>Classify any DEC Infra data into 3 tiers: Public, Internal, Confidential</li>
<li>Anonymize budgets, vendor quotes & reports before using AI</li>
<li>Detect AI hallucinations in concrete specs, IS codes & calculations</li>
<li>Understand India's Digital Personal Data Protection Act (DPDP 2023)</li>
<li>Apply DEC Infra's AI usage policy to daily workflows</li>
<li>Score 13+ out of 15 on the "Is This Safe?" quiz</li>
</ul></div>
</div>
</div>

<!-- ============================================================ -->
<!-- PART 1: THEORY — HOW AI ACTUALLY WORKS -->
<!-- ============================================================ -->
<div class="section open">
<div class="section-head" onclick="toggle(this)"><h2>🧠 Part 1: How AI Actually Works — What Happens to Your Data</h2><span class="arrow">▼</span></div>
<div class="section-body">

<div class="card">
<h3>What is a Large Language Model (LLM)?</h3>
<p>ChatGPT and Claude are Large Language Models (LLMs). Think of them as extremely advanced autocomplete systems. They were trained on billions of pages of text from the internet — books, websites, papers, forums — and learned patterns in human language.</p>
<p style="margin-top:8px"><strong>Key insight:</strong> LLMs don't "know" things the way humans do. They predict the most likely next word based on patterns they've seen. This is why they can sound confident while being completely wrong.</p>

<div class="diagram">
<p style="font-size:13px;opacity:0.7;margin-bottom:10px">How an LLM generates a response:</p>
<div class="flow">
<div class="node">Your Prompt</div>
<div class="arr">→</div>
<div class="node">Pattern Matching<br/><span style="font-size:11px;opacity:0.7">against training data</span></div>
<div class="arr">→</div>
<div class="node">Word-by-Word<br/>Prediction</div>
<div class="arr">→</div>
<div class="node">Response<br/><span style="font-size:11px;opacity:0.7">(may contain errors)</span></div>
</div>
</div>
</div>

<div class="card">
<h3>What Happens When You Type in ChatGPT?</h3>
<div class="diagram">
<p style="font-size:13px;opacity:0.7;margin-bottom:10px">Data flow — Free ChatGPT:</p>
<div class="flow">
<div class="node">You type a message<br/>or upload a file</div>
<div class="arr">→</div>
<div class="node node-danger">Sent to OpenAI<br/>servers (USA)</div>
<div class="arr">→</div>
<div class="node node-danger">Stored up to<br/>30 days</div>
<div class="arr">→</div>
<div class="node node-danger">May be used to<br/>train future models</div>
</div>
<p style="font-size:13px;opacity:0.7;margin-top:15px;margin-bottom:10px">Data flow — Enterprise / Teams version:</p>
<div class="flow">
<div class="node">You type a message<br/>or upload a file</div>
<div class="arr">→</div>
<div class="node node-safe">Sent to servers<br/>(encrypted)</div>
<div class="arr">→</div>
<div class="node node-safe">Processed &<br/>immediately deleted</div>
<div class="arr">→</div>
<div class="node node-safe">NEVER used<br/>for training</div>
</div>
</div>
<p style="margin-top:10px"><strong>The critical difference:</strong> Free tools may absorb your data into the model itself. Enterprise tools process and forget. This is why the ₹2,500/user/month investment matters — it's the difference between a locked cabinet and an open notice board.</p>
</div>

<div class="card">
<h3>Why Does This Matter for Construction?</h3>
<p>Construction companies handle uniquely sensitive data that most industries don't:</p>
<div class="grid-2">
<div>
<h4>🏗️ Data Other Industries Don't Have</h4>
<ul>
<li><strong>Vendor negotiated rates</strong> — reveal your cost structure to competitors</li>
<li><strong>Tender bid prices</strong> — competitors can undercut you by ₹1</li>
<li><strong>Client contract terms</strong> — NDA violations can lose you the client</li>
<li><strong>Structural calculations</strong> — errors can cause building collapse</li>
<li><strong>Safety records</strong> — can be used against you in litigation</li>
</ul>
</div>
<div>
<h4>💥 Consequences Unique to Construction</h4>
<ul>
<li>Wrong AI calculation → structural failure → lives at risk</li>
<li>Leaked bid price → lost ₹50 Cr tender → company survival</li>
<li>Client contract exposed → ₹2 Cr legal liability</li>
<li>Fake IS code reference → regulatory shutdown of site</li>
<li>Employee data leaked → DPDP Act penalty up to ₹250 Cr</li>
</ul>
</div>
</div>
</div>
</div>
</div>

<!-- ============================================================ -->
<!-- PART 2: THEORY — 5 CATEGORIES OF AI RISK -->
<!-- ============================================================ -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>⚠️ Part 2: The 5 Categories of AI Risk in Construction</h2><span class="arrow">▼</span></div>
<div class="section-body">

<div class="card" style="border-top:3px solid var(--danger); background: var(--bg-card);">
<h3 style="color:var(--danger)">Risk 1: Data Leakage — Your Information Becomes Public</h3>
<p>When you upload data to free AI tools, it may be stored, reviewed by humans, or used to train future models. Your confidential vendor rates, client terms, or employee data could influence AI responses to other users — including your competitors.</p>
<h4>Real-world parallel:</h4>
<p>In 2023, Samsung engineers accidentally leaked proprietary chip designs by pasting source code into ChatGPT. The company banned ChatGPT for all employees. A similar leak at DEC Infra — pasting a tender bid into ChatGPT — could cost a ₹50 Cr contract.</p>
</div>

<div class="card" style="border-top:3px solid var(--warning); background: var(--bg-card);">
<h3 style="color:var(--warning)">Risk 2: Hallucination — AI Generates False Information</h3>
<p>AI doesn't distinguish fact from fiction. It generates the most statistically likely text, not the most accurate. In construction, a hallucinated IS code clause, wrong material specification, or fabricated regulatory requirement can lead to non-compliance, rework, or structural failure.</p>
<h4>How often does it happen?</h4>
<p>Studies show LLMs hallucinate 3-10% of the time on factual questions. In specialized domains like Indian construction codes, the rate is likely higher because training data is sparse. A 5% hallucination rate across 100 AI queries per month means 5 false statements you need to catch.</p>
</div>

<div class="card" style="border-top:3px solid var(--accent); background: var(--bg-card);">
<h3 style="color:var(--accent)">Risk 3: Over-Reliance — Trusting AI Without Verification</h3>
<p>As teams get comfortable with AI, they start trusting outputs without checking. This is the most dangerous risk because it's invisible until something goes wrong. A cost estimate that's off by ₹22L, a safety checklist that misses a critical item, a contract review that overlooks a liability clause — all because "the AI said so."</p>
<h4>The human factor:</h4>
<p>Research shows humans are 3x more likely to accept an answer from AI without questioning it compared to a human colleague's answer. We unconsciously treat AI as an authority because it sounds confident and structured.</p>
</div>

<div class="card" style="border-top:3px solid var(--info); background: var(--bg-card);">
<h3 style="color:var(--info)">Risk 4: Compliance Violation — Breaking Laws Without Knowing</h3>
<p>India's Digital Personal Data Protection Act (DPDP 2023) imposes strict rules on how personal data is processed. Uploading employee Aadhaar numbers, PAN details, or salary information to an overseas AI service may constitute unauthorized cross-border data transfer — carrying penalties up to ₹250 Crore.</p>
<h4>Key DPDP provisions for DEC Infra:</h4>
<ul>
<li><strong>Consent requirement:</strong> You need employee consent before processing their personal data via AI</li>
<li><strong>Purpose limitation:</strong> Data collected for HR can't be used for AI analysis without separate consent</li>
<li><strong>Data localization:</strong> Certain categories of data may need to stay within India</li>
<li><strong>Breach notification:</strong> If data leaks through AI, you must notify the Data Protection Board within 72 hours</li>
</ul>
</div>

<div class="card" style="border-top:3px solid var(--success); background: var(--bg-card);">
<h3 style="color:var(--success)">Risk 5: Ethical Misuse — Using AI Inappropriately</h3>
<p>AI can be misused to generate fake compliance certificates, fabricate test reports, create misleading progress documentation, or impersonate individuals. Even if technically possible, these uses are unethical and often illegal.</p>
<h4>Examples of misuse in construction:</h4>
<ul>
<li>Generating a fake concrete test certificate to pass an audit</li>
<li>Using AI to inflate progress percentages in client reports</li>
<li>Creating a fabricated meeting transcript with invented attendees</li>
<li>Using AI to draft fake insurance certificates for subcontractors</li>
</ul>
<p style="margin-top:8px"><strong>DEC Infra's position:</strong> Any use of AI to generate false, misleading, or fraudulent documents is grounds for immediate termination and potential legal action.</p>
</div>

<div class="tip"><strong>💡 Key Teaching Point:</strong> These 5 risks are not theoretical — they happen every day at companies that adopt AI without governance. Module 3 exists to make sure DEC Infra adopts AI safely, capturing the ₹30-70L/year benefit without the ₹5-250 Cr downside.</div>

</div>
</div>

<!-- ============================================================ -->
<!-- PART 3: THEORY — AI TRUST EQUATION -->
<!-- ============================================================ -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🔑 Part 3: The AI Trust Equation — When to Trust, When to Verify</h2><span class="arrow">▼</span></div>
<div class="section-body">

<div class="card">
<h3>The 4-Level Trust Framework for AI Outputs</h3>
<p>Not all AI outputs carry the same risk. Use this framework to decide how much verification is needed:</p>
<table>
<tr><th>Trust Level</th><th>Type of Output</th><th>Verification Needed</th><th>DEC Infra Example</th></tr>
<tr><td style="color:var(--success);font-weight:700">Level 1: LOW RISK<br/>Trust freely</td><td>Drafting, formatting, summarizing, brainstorming, general knowledge</td><td>Quick read-through</td><td>Drafting a project status email, creating a meeting agenda, summarizing a report</td></tr>
<tr><td style="color:var(--info);font-weight:700">Level 2: MEDIUM RISK<br/>Verify key facts</td><td>Data analysis, comparison reports, trend identification, cost summaries</td><td>Cross-check key numbers in Excel/ERP</td><td>Budget variance analysis, vendor comparison table, schedule trend report</td></tr>
<tr><td style="color:var(--warning);font-weight:700">Level 3: HIGH RISK<br/>Expert verification</td><td>Safety protocols, quality specs, regulatory references, contract analysis</td><td>Qualified professional must review</td><td>Safety checklist for height work, IS 456 compliance check, contract risk review</td></tr>
<tr><td style="color:var(--danger);font-weight:700">Level 4: CRITICAL RISK<br/>Never use AI alone</td><td>Structural calculations, final cost estimates for bids, legal opinions, medical/safety-critical decisions</td><td>Certified engineer/lawyer sign-off mandatory</td><td>Structural load calculations, tender bid pricing, RCC design, fire safety design</td></tr>
</table>
</div>

<div class="diagram">
<p style="font-size:15px;font-weight:600;color:var(--accent);margin-bottom:15px">The Golden Rule of AI in Construction:</p>
<div class="flow">
<div class="node" style="font-size:16px;padding:15px 25px;border-color:var(--accent)">AI Generates</div>
<div class="arr" style="font-size:30px">→</div>
<div class="node" style="font-size:16px;padding:15px 25px;border-color:var(--accent)">Human Verifies</div>
<div class="arr" style="font-size:30px">→</div>
<div class="node" style="font-size:16px;padding:15px 25px;border-color:var(--accent)">Human Decides</div>
<div class="arr" style="font-size:30px">→</div>
<div class="node" style="font-size:16px;padding:15px 25px;border-color:var(--accent)">Human is Accountable</div>
</div>
<p style="font-size:14px;opacity:0.7;margin-top:15px">"The AI told me" is NEVER an acceptable defense. The person who uses the output owns the outcome.</p>
</div>

</div>
</div>

<!-- ============================================================ -->
<!-- PART 4: GLOBAL AI SAFETY INCIDENTS -->
<!-- ============================================================ -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🌍 Part 4: Real-World AI Safety Incidents — Lessons from Industry</h2><span class="arrow">▼</span></div>
<div class="section-body">

<p style="margin-bottom:15px;opacity:0.8">These are real incidents from global companies. They show what happens when AI is used without proper governance.</p>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-global">GLOBAL</span> Samsung — Source Code Leaked via ChatGPT</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">What Happened</h4><p>Samsung semiconductor engineers pasted proprietary chip design source code into ChatGPT to debug errors. Within weeks, Samsung discovered their confidential code was now part of ChatGPT's training data — potentially accessible to competitors including TSMC and Intel.</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">Impact</h4><p>Samsung banned ChatGPT company-wide. They invested $10M+ building an internal AI system. The leaked code represented years of R&D worth billions of dollars. Industry analysts estimated potential competitive damage at $100M-$1B.</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">Lesson for DEC Infra</h4><p>If engineers at Samsung — a $350B tech company — can make this mistake, anyone can. DEC Infra's equivalent would be pasting a tender bid, client contract, or proprietary construction method into ChatGPT. The damage: lost tenders, client lawsuits, competitive disadvantage.</p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-global">GLOBAL</span> Air Canada — AI Chatbot Gives Wrong Refund Policy</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">What Happened</h4><p>Air Canada's AI chatbot told a customer he could book a full-price ticket now and apply for a bereavement discount later. This was completely wrong — the airline's actual policy required applying BEFORE booking. The customer relied on the AI, paid full price, and was denied the discount.</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">Impact</h4><p>Air Canada argued "the chatbot is a separate legal entity and we're not responsible for its answers." The court ruled: <strong>"Air Canada is responsible for ALL information on its website, including AI-generated responses."</strong> Air Canada was ordered to pay the refund difference.</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">Lesson for DEC Infra</h4><p>If DEC Infra uses AI to generate client communications, contract interpretations, or compliance statements — and the AI is wrong — DEC Infra is legally liable, not the AI. "ChatGPT said we could do this" will not protect you in court. <strong>The company owns every AI output it uses.</strong></p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-global">GLOBAL</span> US Lawyer — Filed Court Brief with Fake Cases</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">What Happened</h4><p>A New York lawyer used ChatGPT to research legal precedents for a court case. ChatGPT generated 6 case citations that looked perfectly real — correct formatting, plausible case names, realistic legal reasoning. The lawyer filed them with the court without verifying.</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">Impact</h4><p>All 6 cases were completely fabricated by ChatGPT. The judge discovered the fake citations, sanctioned the lawyer, and the incident made international headlines. The lawyer faced potential disbarment and a $5,000 fine. His client's case was severely damaged.</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">Lesson for DEC Infra</h4><p>When AI cites "IS 3696 Clause 7.4.2" or "NBC 2016 Section 4.3.1(b)" — verify it. AI fabricates technical references with the same confidence as real ones. A DEC Infra safety officer citing a fake IS clause in an audit could face regulatory action and site shutdown.</p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-global">INDIA</span> Indian IT Company — Client Data Used for AI Training</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">What Happened</h4><p>Employees at a major Indian IT services company uploaded client deliverables to ChatGPT for code review and documentation. The client's contract had a strict data localization clause — all data must remain within India. ChatGPT servers are in the USA.</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">Impact</h4><p>When the client discovered their proprietary code was sent to US-based servers, they invoked the data breach clause. The IT company faced: contract termination (₹200 Cr annual revenue at risk), legal proceedings for NDA violation, reputational damage across the industry, and mandatory data security audit costing ₹5 Cr.</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">Lesson for DEC Infra</h4><p>DEC Infra's contracts with NSDL, IISER, government bodies likely contain confidentiality and data handling clauses. Uploading project data to ChatGPT could violate these clauses even if the data seems "harmless." Always check: Does this client contract restrict sharing data with third parties?</p></div>
</div>
</div>

</div>
</div>

<!-- ============================================================ -->
<!-- PART 5: DATA CLASSIFICATION -->
<!-- ============================================================ -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🔒 Part 5: Data Classification — The 3-Tier System for DEC Infra</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="grid-3">
<div class="card" style="border-top:3px solid var(--success); background: var(--bg-card);">
<h3 style="color:var(--success)">🟢 Tier 1: Public / Safe</h3>
<p>Share freely with any AI tool</p>
<ul>
<li>General industry knowledge</li>
<li>Public info from decinfra.com</li>
<li>Published standards (IS 456, NBC, OSHA)</li>
<li>Generic templates & checklists</li>
<li>Industry benchmark data</li>
<li>Training materials</li>
</ul>
</div>
<div class="card" style="border-top:3px solid var(--warning); background: var(--bg-card);">
<h3 style="color:var(--warning)">🟡 Tier 2: Internal — Anonymize</h3>
<p>Share ONLY after removing identifiers</p>
<ul>
<li>Budget data (remove vendor/client names)</li>
<li>Schedules (remove project identity)</li>
<li>Test results (remove lab names)</li>
<li>Site photos (remove logos/faces)</li>
<li>Progress reports (remove names)</li>
<li>Specs (remove proprietary detail)</li>
</ul>
</div>
<div class="card" style="border-top:3px solid var(--danger); background: var(--bg-card);">
<h3 style="color:var(--danger)">🔴 Tier 3: Confidential — NEVER</h3>
<p>NEVER upload to any external AI</p>
<ul>
<li>Vendor quotes & negotiated rates</li>
<li>Profit margins & markups</li>
<li>Employee salaries, Aadhaar, PAN</li>
<li>Client contracts & agreements</li>
<li>Bank details & credentials</li>
<li>Tender bids & pricing strategy</li>
</ul>
</div>
</div>

<h3 style="color:white;margin-top:20px;font-size:18px">DEC Infra Anonymization Guide</h3>
<table>
<tr><th>Original Data</th><th>Anonymized Version</th><th>Why</th></tr>
<tr><td>"Concrete Suppliers Inc quoted ₹4,500/cum"</td><td>"Vendor A quoted ₹4,500/cum"</td><td>Vendor identity protected</td></tr>
<tr><td>"IISER Library, Tirupati — ₹12.5 Cr"</td><td>"Educational Building, South India — ₹XX Cr"</td><td>Client & location protected</td></tr>
<tr><td>"Mr. Anirudh Gupta, CMD, approved"</td><td>"Senior management approved"</td><td>Individual identity protected</td></tr>
<tr><td>"NSDL awarded DEC Infra the contract"</td><td>"Client awarded Company the contract"</td><td>Both parties protected</td></tr>
<tr><td>"Our bid: ₹45.7 Cr for NMDC project"</td><td><span style="color:var(--danger)">⛔ NEVER SHARE — Tier 3</span></td><td>Competitor would undercut</td></tr>
<tr><td>"DEC Infra profit margin: 14.2%"</td><td><span style="color:var(--danger)">⛔ NEVER SHARE — Tier 3</span></td><td>Commercially devastating</td></tr>
<tr><td>"Staff salary: ₹8.5 LPA, Aadhaar: 1234..."</td><td><span style="color:var(--danger)">⛔ NEVER SHARE — Tier 3</span></td><td>DPDP Act violation</td></tr>
</table>

<div class="tip"><strong>💡 The DEC Infra Rule:</strong> If you wouldn't print it and leave it at a competitor's office, don't upload it to free ChatGPT.</div>
</div>
</div>

<!-- ============================================================ -->
<!-- PART 6: DEC INFRA CASE STUDIES -->
<!-- ============================================================ -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>📂 Part 6: DEC Infra Case Studies — Data Leak Scenarios</h2><span class="arrow">▼</span></div>
<div class="section-body">

<p style="margin-bottom:15px;opacity:0.8">Fictional but realistic scenarios modeled on DEC Infra's actual project types. Click each to expand.</p>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-leak">DATA LEAK</span> CS-1: Vendor Quotes Reach a Competitor</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">📍 Scenario</h4><p>A DEC Infra procurement manager uploads 3 structural steel quotes — with full vendor names, exact rates per MT, and delivery terms — to free ChatGPT for comparison. The prompt: "Compare Tata Steel (₹58,500/MT), JSW (₹56,200/MT), and Vizag Steel (₹54,800/MT) for 200 MT to Tirupati."</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">💥 Risk</h4><p>DEC Infra's exact vendor rates and quantities now sit on OpenAI servers. A competitor asking "What are typical steel rates for projects in Tirupati?" may get answers influenced by this data. Over 10 tenders/year, the competitive disadvantage could cost <strong>₹40L+ annually</strong>.</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">✅ Fix</h4><p>Replace vendor names with "Vendor A/B/C." Remove location. Use "~200 MT" instead of exact quantity. The AI comparison works identically — zero data exposure. <strong>Time to anonymize: 2 minutes.</strong></p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-leak">DATA LEAK</span> CS-2: NSDL Contract Uploaded for "Quick Review"</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">📍 Scenario</h4><p>A DEC Infra PM needs to check the penalty clause in the NSDL Data Center contract. Instead of reading the 45-page PDF, he uploads the entire file to ChatGPT: "Does this contract have a late delivery penalty?"</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">💥 Risk</h4><p>NSDL's confidential terms, DEC Infra's negotiated rates, IP clauses, and payment schedules are now on OpenAI's servers. If NSDL discovers this breach: contract termination, legal action for NDA violation (<strong>₹50L-₹2 Cr exposure</strong>), loss of future NSDL business (<strong>₹5-10 Cr</strong>).</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">✅ Fix</h4><p>Option 1: Ctrl+F "penalty" in the PDF (10 seconds). Option 2: Extract only the penalty clause, remove party names, paste that single paragraph. Option 3: Use enterprise AI where data isn't retained. <strong>Never upload full contracts to free tools.</strong></p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-leak">DATA LEAK</span> CS-3: Employee Salary Sheet with Aadhaar</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">📍 Scenario</h4><p>DEC Infra HR uploads 150 employee records — names, designations, Aadhaar, PAN, salaries — to ChatGPT asking: "Are our construction engineer salaries competitive?"</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">💥 Risk</h4><p>Violates DPDP Act 2023. Aadhaar + PAN = identity theft risk for 150 employees. Penalties: up to <strong>₹250 Cr</strong> under DPDP. Employee trust destruction. Competitors now know exactly what to offer to poach your best engineers.</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">✅ Fix</h4><p>Share ONLY aggregated data: "25 site engineers averaging ₹X LPA, 15 PMs at ₹Y LPA — competitive for Hyderabad?" No names, no Aadhaar, no PAN. AI gives identical quality benchmarking. <strong>Time to anonymize: 5 minutes.</strong></p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-leak">DATA LEAK</span> CS-4: Tender Bid Price Shared for "Sanity Check"</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">📍 Scenario</h4><p>A DEC Infra estimator uploads a complete BOQ with final tender price to ChatGPT: "Check if my total of ₹45.72 Cr for this railway station project looks reasonable. The project is for NMDC in Nagpur with 18-month duration." He includes line-by-line rates, quantities, and margins.</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">💥 Risk</h4><p>This is the nuclear scenario. The exact bid price, line-by-line cost structure, margin strategy, and client identity are now on external servers. If a competing construction firm's employee asks ChatGPT about "typical railway station construction costs in Nagpur," the response could be influenced by DEC Infra's actual bid data. <strong>A competitor underbidding by just 2% = ₹91L less = DEC Infra loses the tender.</strong></p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">✅ Fix</h4><p>NEVER upload tender bids to any AI tool — free or paid. For sanity checking, use internal Excel models or ask AI generic questions: "What is typical cost per sqm for a railway station in central India?" without sharing YOUR numbers. <strong>Tender data is always Tier 3.</strong></p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-good">BEST PRACTICE</span> CS-5: Budget Analysis Done Right</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block" style="border-left:3px solid #4CAF50"><h4 style="color:var(--success)">📍 Scenario</h4><p>A DEC Infra finance manager needs to analyze budget overruns across 10 projects. She spends 10 minutes doing find-and-replace in Excel: vendors → "Vendor A/B/C", projects → "Project Alpha/Beta/Gamma", locations → "Location 1/2/3". All numerical data kept intact. Uploads to ChatGPT.</p></div>
<div class="cs-block action"><h4 style="color:var(--info)">📊 Result</h4><p>AI identified 3 overrun items, flagged contingency burns, and caught a ₹3.5L issue nobody had noticed. Analysis quality = identical to using real names. Time investment in anonymization: 10 minutes. Value protected: all vendor relationships, client confidentiality, and competitive positioning. <strong>This is how it's done.</strong></p></div>
</div>
</div>

</div>
</div>

<!-- ============================================================ -->
<!-- PART 7: HALLUCINATION CASE STUDIES -->
<!-- ============================================================ -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🔍 Part 7: AI Hallucinations — Construction-Specific Dangers</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="warning"><strong>⚠️ AI can confidently state things that are completely wrong.</strong> In construction, acting on false AI output can cost ₹5-50L or endanger lives.</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-halluc">HALLUCINATION</span> CS-6: Fake IS Code Clause in Safety Plan</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">📍 Scenario</h4><p>DEC Infra safety officer asks ChatGPT: "IS code requirements for scaffolding safety?" AI responds: "As per IS 3696 Part 1:1987, Clause 7.4.2, scaffolding above 4m requires safety nets with mesh ≤100mm, inspected daily by competent person."</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">💥 Problem</h4><p>IS 3696 is real, but <strong>Clause 7.4.2 doesn't exist</strong>. The mesh specification is from a different section with different requirements. The safety officer included this in the IISER Library safety plan. During a client audit, the consultant flagged it — embarrassing DEC Infra and triggering a full re-review of all safety documentation. <strong>Cost: ₹2-5L in re-documentation + reputation damage.</strong></p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">✅ How to Catch It</h4><p>Always verify specific clause numbers by looking them up in the actual standard. Better prompt: "What are scaffolding requirements? Flag any clause numbers you are uncertain about so I can verify."</p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-halluc">HALLUCINATION</span> CS-7: Wrong Concrete Mix Design for Medical College</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">📍 Scenario</h4><p>Site engineer at Medical College, Suryapet asks Claude: "M30 mix design per IS 10262?" Claude gives specific quantities: Cement 380 kg/m³, FA 695 kg/m³, CA 1180 kg/m³, W/C 0.45.</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">💥 Problem</h4><p>These are <strong>generic estimates, not actual mix design values</strong>. Real M30 mix design depends on local aggregate properties, cement brand/grade, moisture content, and site temperature. Using AI numbers without lab testing could produce concrete that fails 28-day strength tests. <strong>Cost: ₹5-15L to break and re-pour foundation sections.</strong> If the failure is discovered after the building is occupied: structural safety hazard.</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">✅ How to Catch It</h4><p>NEVER use AI for final engineering calculations. Mix designs MUST come from an approved lab testing actual materials. Ask AI to "explain the M30 mix design process" — not "give me the M30 mix design."</p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-halluc">HALLUCINATION</span> CS-8: Invented RERA Regulation</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">📍 Scenario</h4><p>Contracts manager asks: "RERA penalties for project delay in Telangana?" ChatGPT cites "Section 22A: ₹10,000/day/unit for delays exceeding 6 months."</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">💥 Problem</h4><p><strong>Section 22A doesn't exist.</strong> AI fabricated an entire regulatory section. If DEC Infra uses this in risk assessment for Kollur Housing, they could overestimate exposure by ₹10-20L (unnecessary contingency) or present wrong information to legal counsel, resulting in a flawed negotiation strategy with the housing authority.</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">✅ How to Catch It</h4><p>Verify ALL regulatory references against the official gazette notification or regulator website. AI is particularly unreliable with Indian regulatory specifics (RERA state variations, BOCW amendments, local building bylaws).</p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-halluc">HALLUCINATION</span> CS-9: BOQ Total Off by ₹22.56 Lakh</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">📍 Scenario</h4><p>An estimator uploads a 45-line-item BOQ and asks AI to calculate the total cost. AI returns ₹3,24,56,780. The estimator includes this in a tender submission for the Gajwel Auditorium.</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">💥 Problem</h4><p>Manual verification revealed actual total: ₹3,47,12,340. <strong>AI arithmetic error: ₹22.56L.</strong> It miscalculated rate × quantity on 3 line items. If DEC Infra submitted the AI bid, they'd win a project that loses ₹22.56L — eating into margin and potentially causing a net loss on a 14-month project.</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">✅ How to Catch It</h4><p>ALWAYS do final calculations in Excel. Use AI to structure the BOQ, identify missing items, and compare rates — but never for final arithmetic. A 5-minute Excel cross-check catches errors that cost lakhs.</p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-halluc">HALLUCINATION</span> CS-10: AI Approves a Non-Compliant Fire Safety Design</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">📍 Scenario</h4><p>A DEC Infra architect asks Claude to review the Medical College fire safety layout: "Is this compliant with NBC 2016 fire safety requirements? The building has 4 staircases for 6 floors, corridor width 1.8m, fire doors on every floor." Claude responds: "This layout appears compliant with NBC Part 4 Fire and Life Safety requirements."</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">💥 Problem</h4><p>Claude <strong>cannot actually analyze a building layout</strong> — it only processed text, not spatial relationships. The actual NBC requirement for a medical facility of this size might require 6 staircases, 2.4m corridors, and a refuge floor. By "approving" a non-compliant design, AI gave false confidence. If the building was built to this design, it would fail the fire department inspection — requiring <strong>₹50L-₹1 Cr in structural modifications</strong> after construction. In a worst case, non-compliant fire safety could cost lives.</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">✅ How to Catch It</h4><p>Fire safety compliance requires a licensed fire consultant with actual building drawings, not text descriptions. AI can explain NBC requirements in general, but it <strong>CANNOT certify compliance</strong>. Only a qualified fire safety engineer with access to architectural drawings, building specifications, and occupancy calculations can certify compliance.</p></div>
</div>
</div>

<div class="case-study" onclick="toggleCS(this)">
<div class="case-study-header"><h3><span class="cs-tag cs-tag-halluc">HALLUCINATION</span> CS-11: AI Generates a Fake Vendor "Track Record"</h3><span class="cs-arrow">▼</span></div>
<div class="case-study-body">
<div class="cs-block what-happened"><h4 style="color:var(--danger)">📍 Scenario</h4><p>A DEC Infra PM asks ChatGPT: "Tell me about Quality Concrete Ltd — what projects have they completed? Are they reliable?" ChatGPT responds with a detailed company profile listing 5 completed projects (including 2 government buildings), 15 years of experience, ISO 9001 certification, and 4.5/5 customer rating.</p></div>
<div class="cs-block impact"><h4 style="color:var(--warning)">💥 Problem</h4><p>Quality Concrete Ltd is a fictional vendor we created for our workshop. <strong>ChatGPT fabricated an entire company history.</strong> Every project, every certification, every rating is hallucinated. If a procurement officer relied on this to shortlist a vendor without independent verification, they could award a ₹30L contract to a company with zero track record — risking project delays, quality failures, and financial loss.</p></div>
<div class="cs-block lesson"><h4 style="color:var(--success)">✅ How to Catch It</h4><p>NEVER use AI to verify vendor credibility. Always: (1) Request documents directly from vendor, (2) Call references independently, (3) Check MCA/ROC records, (4) Visit their office/facility, (5) Ask for audited financials. AI cannot verify real-world entity information — it generates plausible-sounding but often fictional company profiles.</p></div>
</div>
</div>

<div class="card">
<h3>Hallucination Red Flags — Quick Reference</h3>
<table>
<tr><th>Red Flag</th><th>Example</th><th>Action</th></tr>
<tr><td>Very specific clause numbers</td><td>"As per Clause 7.4.2(b)(iii)..."</td><td>Look up the actual clause</td></tr>
<tr><td>Precise decimal values</td><td>"Strength: 31.47 MPa exactly"</td><td>Verify — real data is rarely this precise</td></tr>
<tr><td>Confident "always" or "never"</td><td>"IS 456 always requires..."</td><td>Standards have exceptions & conditions</td></tr>
<tr><td>Mixing different standards</td><td>Citing OSHA in Indian context</td><td>Check which standard applies here</td></tr>
<tr><td>Invented organizations</td><td>"Per NCBRI guidelines..."</td><td>Verify organization actually exists</td></tr>
<tr><td>Detailed company profiles</td><td>"Company X completed 5 projects..."</td><td>Verify independently — AI fabricates</td></tr>
<tr><td>Round-number estimates</td><td>"Exactly ₹5,00,000 per floor"</td><td>Real costs are almost never round</td></tr>
<tr><td>Overly specific timelines</td><td>"Takes exactly 14 days per IS code"</td><td>Standards rarely specify exact durations</td></tr>
</table>
</div>

<div class="exercise">
<h3>🧪 Live Exercise: Spot the Hallucination</h3>
<p>Facilitator runs this prompt live. Participants identify which facts are real and which are AI fabrications:</p>
<span class="prompt-label">DEMO PROMPT</span>
<div class="prompt"><button class="copy-btn" onclick="copyPrompt(this)">📋 Copy</button>What are the IS 456:2000 requirements for M30 grade concrete?
Include: minimum cement content, maximum water-cement ratio,
minimum curing period, compressive strength at 7 and 28 days,
and maximum temperature for concrete placement.

[After AI responds, participants verify each claim against
the actual IS 456 standard. Award points for each hallucination caught.]</div>
</div>
</div>
</div>

<!-- ============================================================ -->
<!-- PART 8: FREE vs PAID -->
<!-- ============================================================ -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>💳 Part 8: Free vs Paid AI Tools — Data Security Comparison</h2><span class="arrow">▼</span></div>
<div class="section-body">
<table>
<tr><th>Feature</th><th><span class="badge badge-risky">Free ChatGPT</span></th><th><span class="badge badge-safe">ChatGPT Teams</span></th><th><span class="badge badge-safe">Claude Teams</span></th><th><span class="badge badge-warn">MS Copilot</span></th></tr>
<tr><td>Trains on your data?</td><td style="color:var(--danger)">Yes ⚠️</td><td style="color:var(--success)">No ✓</td><td style="color:var(--success)">No ✓</td><td style="color:var(--success)">No ✓</td></tr>
<tr><td>Data retained?</td><td>Up to 30 days</td><td>Not retained</td><td>Not retained</td><td>Within M365 tenant</td></tr>
<tr><td>Human review possible?</td><td style="color:var(--danger)">Yes</td><td style="color:var(--success)">No</td><td style="color:var(--success)">No</td><td style="color:var(--success)">No</td></tr>
<tr><td>SOC 2 / ISO 27001?</td><td>Partial</td><td>Yes</td><td>Yes (SOC 2)</td><td>Yes</td></tr>
<tr><td>Admin controls?</td><td>No</td><td>Full</td><td>Full</td><td>Via M365</td></tr>
<tr><td>Cost/user/month</td><td>Free / ₹1,600</td><td>~₹2,100</td><td>~₹2,500</td><td>~₹2,200</td></tr>
<tr><td>Safe for Tier 2?</td><td style="color:var(--warning)">Only anonymized</td><td style="color:var(--success)">Yes</td><td style="color:var(--success)">Yes</td><td style="color:var(--success)">Yes</td></tr>
</table>

<div class="card">
<h3>💰 DEC Infra Cost-Benefit Analysis</h3>
<div class="grid-2">
<div><h4>Annual Investment (20 users)</h4>
<table><tr><td>Claude Teams × 20 × 12 months</td><td style="text-align:right;font-weight:700">₹6,00,000</td></tr></table>
</div>
<div><h4>Annual Return (Conservative)</h4>
<table>
<tr><td>Time savings</td><td style="text-align:right">₹18,00,000</td></tr>
<tr><td>Better procurement</td><td style="text-align:right">₹30,00,000</td></tr>
<tr><td>Risk avoidance</td><td style="text-align:right">₹10,00,000</td></tr>
<tr><td style="font-weight:700">Total</td><td style="text-align:right;font-weight:700;color:#FFD600">₹58,00,000</td></tr>
</table></div>
</div>
<p style="text-align:center;margin-top:12px;font-size:16px"><strong>₹6L invest → ₹58L return = <span style="color:#FFD600">967% ROI</span> | Payback: 1.2 months</strong></p>
</div>
</div>
</div>

<!-- ============================================================ -->
<!-- PART 9: AI USAGE POLICY -->
<!-- ============================================================ -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>📜 Part 9: DEC Infra AI Usage Policy (Draft)</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="card">
<h3>Draft AI Usage Policy — DEC Infra Projects Pvt Ltd</h3>
<h4>Section 1: Approved AI Tools</h4>
<ul><li>ChatGPT (OpenAI) — Tier 1 & anonymized Tier 2 only</li><li>Claude (Anthropic) — Tier 1 & anonymized Tier 2 only</li><li>Microsoft Copilot — internal M365 documents</li><li>All other AI tools require IT approval</li></ul>
<h4>Section 2: Data Handling</h4>
<ul><li>Tier 1 (Public): Use freely</li><li>Tier 2 (Internal): MUST anonymize before free tools; can use as-is with enterprise tools</li><li>Tier 3 (Confidential): NEVER upload to any external AI</li><li>Default: When unsure, treat as Tier 2</li></ul>
<h4>Section 3: Verification Requirements</h4>
<ul><li>All official AI outputs → human verification required</li><li>Safety-critical → senior engineer sign-off</li><li>Financial → finance team cross-check in Excel/ERP</li><li>Legal → legal advisor review</li><li>IS/regulatory references → verify against source document</li></ul>
<h4>Section 4: Prohibited Uses</h4>
<ul><li>Uploading employee personal data (Aadhaar, PAN, salaries)</li><li>Sharing full client contracts</li><li>Using AI as final engineering calculations</li><li>Generating fake certificates, test reports, or compliance docs</li><li>Sharing tender bid prices or profit margins</li></ul>
<h4>Section 5: Accountability</h4>
<ul><li>Person using AI is fully responsible for verifying outputs</li><li>"The AI told me" is never an acceptable defense</li><li>Report suspected data breaches to IT within 24 hours</li><li>Quarterly AI usage review by department heads</li></ul>
</div>

<div class="exercise">
<h3>🏋️ Group Exercise: Customize the Policy for YOUR Department</h3>
<p>In groups of 3-4, add 3 department-specific rules. Examples:</p>
<div class="grid-2">
<div class="card"><h4>Project Execution</h4><ul><li>"AI schedules must be validated in Primavera/MS Project before sharing"</li><li>"Site photos must not contain client logos or signage"</li><li>"AI estimates require QS verification before inclusion in any report"</li></ul></div>
<div class="card"><h4>Quality & Safety</h4><ul><li>"AI safety checklists require certified safety officer sign-off"</li><li>"Mix designs from AI must NEVER replace lab designs"</li><li>"NCR reports must reference verified IS clause numbers only"</li></ul></div>
</div>
</div>
</div>
</div>

<!-- ============================================================ -->
<!-- PART 10: IS THIS SAFE QUIZ -->
<!-- ============================================================ -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🧪 Part 10: "Is This Safe?" — 15 DEC Infra Scenarios</h2><span class="arrow">▼</span></div>
<div class="section-body">
<p style="margin-bottom:15px;opacity:0.8">For each: <span class="badge badge-safe">SAFE ✓</span> or <span class="badge badge-risky">RISKY ✗</span> or <span class="badge badge-warn">ANONYMIZE ⚠</span></p>
<table>
<tr><th>#</th><th>Scenario</th><th>Verdict</th><th>Why</th></tr>
<tr><td>1</td><td>Ask AI to draft a safety checklist for height work</td><td><span class="badge badge-safe">SAFE ✓</span></td><td>Generic safety knowledge</td></tr>
<tr><td>2</td><td>Upload 3 vendor quotes with names and exact rates</td><td><span class="badge badge-risky">RISKY ✗</span></td><td>Vendor names + rates = Tier 3</td></tr>
<tr><td>3</td><td>Ask AI to explain IS 456 requirements</td><td><span class="badge badge-safe">SAFE ✓</span></td><td>Public standard</td></tr>
<tr><td>4</td><td>Upload attendance register with Aadhaar numbers</td><td><span class="badge badge-risky">RISKY ✗</span></td><td>Personal data — DPDP violation</td></tr>
<tr><td>5</td><td>Upload test results with lab name replaced</td><td><span class="badge badge-safe">SAFE ✓</span></td><td>Properly anonymized Tier 2</td></tr>
<tr><td>6</td><td>Upload full NSDL contract for review</td><td><span class="badge badge-risky">RISKY ✗</span></td><td>Client contract = Tier 3</td></tr>
<tr><td>7</td><td>Upload site photos, no logos visible</td><td><span class="badge badge-safe">SAFE ✓</span></td><td>Generic photos, no identifiers</td></tr>
<tr><td>8</td><td>Share profit margin on Medical College project</td><td><span class="badge badge-risky">RISKY ✗</span></td><td>Tier 3 — commercially sensitive</td></tr>
<tr><td>9</td><td>Upload budget with vendors as "A/B/C"</td><td><span class="badge badge-safe">SAFE ✓</span></td><td>Properly anonymized Tier 2</td></tr>
<tr><td>10</td><td>Ask AI to draft project status email</td><td><span class="badge badge-warn">ANONYMIZE ⚠</span></td><td>Remove internal details</td></tr>
<tr><td>11</td><td>Upload tender bid for NMDC project</td><td><span class="badge badge-risky">RISKY ✗</span></td><td>Tier 3 — competitor advantage</td></tr>
<tr><td>12</td><td>Compare two scaffolding designs</td><td><span class="badge badge-warn">ANONYMIZE ⚠</span></td><td>OK technically, remove project name</td></tr>
<tr><td>13</td><td>Upload subcontractor insurance certificate</td><td><span class="badge badge-warn">ANONYMIZE ⚠</span></td><td>Remove company name, keep policy details</td></tr>
<tr><td>14</td><td>Share DEC Infra annual revenue figures</td><td><span class="badge badge-risky">RISKY ✗</span></td><td>Tier 3 unless already in ROC public filing</td></tr>
<tr><td>15</td><td>Ask how to write a change order justification</td><td><span class="badge badge-safe">SAFE ✓</span></td><td>Generic knowledge, no company data</td></tr>
</table>
<div class="success"><strong>✓ Scoring:</strong> 13-15 = AI Safety Expert 🏆 | 10-12 = Good 👍 | 7-9 = Practice ⚠️ | <7 = Review the 3-Tier system 🔄</div>
</div>
</div>

<!-- ============================================================ -->
<!-- KEY TAKEAWAYS -->
<!-- ============================================================ -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🎯 Key Takeaways — 6 Rules to Remember</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="card">
<table>
<tr><th>#</th><th>Rule</th><th>Why It Matters for DEC Infra</th></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">1</td><td><strong>Classify first, share second</strong></td><td>Know your data tier BEFORE opening ChatGPT</td></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">2</td><td><strong>Anonymize Tier 2</strong></td><td>Replace names, keep numbers — AI doesn't need WHO, just WHAT</td></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">3</td><td><strong>Never share Tier 3</strong></td><td>Bids, margins, salaries, contracts — one leak could cost crores</td></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">4</td><td><strong>Verify every critical output</strong></td><td>AI hallucinations cost ₹5-50L in construction</td></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">5</td><td><strong>AI assists, humans decide</strong></td><td>YOU are accountable, not the AI — always</td></tr>
<tr><td style="font-size:20px;font-weight:800;color:#FFD600">6</td><td><strong>Enterprise tools are worth it</strong></td><td>₹6L/year protects data worth ₹50 Cr+ in business</td></tr>
</table>
</div>
<div class="stats">
<div class="stat"><span class="n">12</span><span class="l">Case Studies</span></div>
<div class="stat"><span class="n">15</span><span class="l">Quiz Scenarios</span></div>
<div class="stat"><span class="n">5</span><span class="l">Risk Categories</span></div>
<div class="stat"><span class="n">₹5-250 Cr</span><span class="l">Risk Avoided</span></div>
</div>
</div>
</div>


        </div>
`;
    
    // Auto-scroll to top
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
}

function renderModule4(container) {
    container.innerHTML = `
        <div class="mb-4" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
                <span class="badge badge-danger">Session 4</span>
                <h2 class="mt-4" style="background: -webkit-linear-gradient(45deg, #F8FAFC, #EF4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Module 4: Capstone — Build Your Copilot Agent</h2>
                <p class="text-muted">Create a custom Microsoft Copilot Agent for DEC Infra.</p>
            </div>
            <div style="width:130px; height:130px; flex-shrink:0; position:relative; display:flex; align-items:center; justify-content:center;">
                <div style="width:100px; height:100px; background:linear-gradient(135deg,rgba(239,68,68,0.15),rgba(239,68,68,0.03)); border:2px solid rgba(239,68,68,0.5); border-radius:22px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 30px rgba(239,68,68,0.25); font-size:2.8rem; position:relative;">🚀</div>
            </div>
        </div>
        
        <div class="m4-content-wrapper mt-8">


<!-- OBJECTIVES -->
<div class="section open">
<div class="section-head" onclick="toggle(this)"><h2>🎯 What You'll Build</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="stats">
<div class="stat"><span class="n">120</span><span class="l">Minutes</span></div>
<div class="stat"><span class="n">3</span><span class="l">Agents Built</span></div>
<div class="stat"><span class="n">0</span><span class="l">Code Required</span></div>
<div class="stat"><span class="n">Teams</span><span class="l">Deployed To</span></div>
</div>
<div class="card"><p>By the end of this module, you will:</p><ul>
<li>Understand the difference between Copilot Chat, Agent Builder, and Copilot Studio</li>
<li>Create a custom Copilot Agent using natural language — no code</li>
<li>Ground your agent on DEC Infra documents (SharePoint, Excel, PDFs)</li>
<li>Write effective agent instructions that control tone, scope, and output format</li>
<li>Add knowledge sources (budget data, safety standards, vendor lists)</li>
<li>Test your agent in the preview panel</li>
<li>Publish your agent to Microsoft Teams for your team to use</li>
<li>Design 3 construction-specific agents for DEC Infra</li>
</ul></div>

<div class="info-box"><strong>Prerequisites:</strong> Microsoft 365 Copilot license active. Access to copilotstudio.microsoft.com or Copilot Chat agent builder. Completion of Modules 1-3 (prompting, data analysis, safe AI).</div>
</div>
</div>

<!-- PART 1: THEORY -->
<div class="section open">
<div class="section-head" onclick="toggle(this)"><h2>🧠 Part 1: What is a Copilot Agent?</h2><span class="arrow">▼</span></div>
<div class="section-body">

<div class="card">
<h3>From Copilot Chat to Custom Agent — The Evolution</h3>
<p>In Modules 1-3, you used Copilot Chat — typing prompts one at a time and getting responses. That's powerful, but it requires you to remember the right prompt every time. A <strong>Copilot Agent</strong> is the next level: a custom AI assistant that already knows its job, has access to your company data, and follows your rules — without you needing to write a prompt each time.</p>
<div class="diagram">
<p style="font-size:13px;opacity:0.7;margin-bottom:10px">The evolution of AI at DEC Infra:</p>
<div class="flow">
<div class="node">Module 1-3<br/><span style="font-size:11px;opacity:0.7">Manual prompting</span></div>
<div class="arr">→</div>
<div class="node">Module 4<br/><span style="font-size:11px;opacity:0.7">Custom agents</span></div>
<div class="arr">→</div>
<div class="node">Future<br/><span style="font-size:11px;opacity:0.7">Automated workflows</span></div>
</div>
</div>
</div>

<div class="card">
<h3>Three Ways to Build Agents at DEC Infra</h3>
<table>
<tr><th>Method</th><th>What It Is</th><th>Best For</th><th>Skill Level</th></tr>
<tr><td style="color:var(--ms-blue);font-weight:600">Copilot Agent Builder<br/>(M365 Chat)</td><td>Lightweight builder inside Microsoft 365 Copilot Chat. Create simple agents grounded on a document or SharePoint site.</td><td>Quick personal agents, document Q&A, simple assistants</td><td>Beginner — describe in natural language</td></tr>
<tr><td style="color:var(--ms-blue);font-weight:600">Copilot Studio<br/>(copilotstudio.microsoft.com)</td><td>Full-featured platform for production agents. Topics, generative AI, Power Automate flows, multi-channel publishing.</td><td>Department-wide agents, workflow automation, enterprise deployment</td><td>Intermediate — visual builder, no code</td></tr>
<tr><td style="color:var(--ms-blue);font-weight:600">Copilot Studio + Code<br/>(Pro developers)</td><td>Custom engine agents with APIs, Azure AI, custom connectors. Full control over every aspect.</td><td>Complex integrations, ERP connections, custom UIs</td><td>Advanced — requires development team</td></tr>
</table>
<div class="tip"><strong>💡 Today's Focus:</strong> We'll use <strong>Copilot Agent Builder</strong> (quick wins) and <strong>Copilot Studio</strong> (production agents). No coding required.</div>
</div>

<div class="card">
<h3>Anatomy of a Copilot Agent</h3>
<p>Every agent has 3 core components:</p>
<div class="grid-3">
<div style="background:rgba(0,120,212,0.08);padding:15px;border-radius:8px;border-top:3px solid var(--ms-blue)">
<h4 style="color:var(--ms-blue)">📝 Instructions</h4>
<p>Who the agent is, how it behaves, what tone it uses, what it should and shouldn't do. Like writing a job description for an AI employee.</p>
</div>
<div style="background:rgba(255,214,0,0.06);padding:15px;border-radius:8px;border-top:3px solid var(--accent)">
<h4 style="color:var(--accent)">📚 Knowledge</h4>
<p>Documents, SharePoint sites, Excel files, PDFs the agent can reference. This is what makes it "know" about DEC Infra — grounded on YOUR data.</p>
</div>
<div style="background:rgba(76,175,80,0.08);padding:15px;border-radius:8px;border-top:3px solid var(--green)">
<h4 style="color:var(--green)">⚡ Actions</h4>
<p>Things the agent can DO — run Power Automate flows, query databases, create tasks, send emails. Turns the agent from answering questions to completing work.</p>
</div>
</div>
</div>

</div>
</div>

<!-- PART 2: AGENT 1 — BUDGET ANALYST -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🏗️ Part 2: Build Agent #1 — DEC Infra Budget Analyst</h2><span class="arrow">▼</span></div>
<div class="section-body">

<div class="card">
<h3>Agent Profile: "DEC Budget Analyst"</h3>
<p>An agent that any DEC Infra PM can ask about project budgets, overruns, vendor rates, and contingency status — getting instant answers grounded on your actual project data.</p>
<table>
<tr><td><strong>Name</strong></td><td>DEC Budget Analyst</td></tr>
<tr><td><strong>Purpose</strong></td><td>Answer budget questions across all DEC Infra projects</td></tr>
<tr><td><strong>Knowledge</strong></td><td>242-row project dataset (SharePoint), vendor rate cards, contingency tracker</td></tr>
<tr><td><strong>Users</strong></td><td>Project Managers, Finance Team, CEO</td></tr>
<tr><td><strong>Channel</strong></td><td>Microsoft Teams</td></tr>
</table>
</div>

<div class="step-box"><div class="step-num">1</div>
<h3>Open Copilot Agent Builder</h3>
<p>Go to <strong>microsoft365.com/chat</strong> → Click <strong>"Create an agent"</strong> in the left sidebar. Or go to <strong>copilotstudio.microsoft.com</strong> → Click <strong>"Create"</strong> → <strong>"New agent"</strong>.</p>
</div>

<div class="step-box"><div class="step-num">2</div>
<h3>Write the Agent Instructions</h3>
<p>This is the most important step. The instructions define WHO the agent is and HOW it behaves. Paste this into the Instructions field:</p>
<span class="prompt-label">AGENT INSTRUCTIONS — COPY-PASTE</span>
<div class="prompt"><button class="copy-btn" onclick="cp(this)">📋 Copy</button>You are DEC Budget Analyst, an AI assistant for DEC Infra Projects Pvt Ltd, a construction company based in Hyderabad.

YOUR ROLE:
- Answer budget and cost questions about DEC Infra's construction projects
- Analyze budget data, identify overruns, flag risks, and compare vendor rates
- Help Project Managers and Finance teams make data-driven decisions

BEHAVIOR RULES:
- Always base answers on the uploaded project data — never make up numbers
- If you don't have data to answer a question, say "I don't have that data in my knowledge base"
- Present numbers in Indian Lacs (₹ Lac) format
- Use 🔴🟡🟢 traffic lights for status indicators
- Be concise — executives want answers in 2-3 sentences, not paragraphs
- When showing comparisons, use tables
- Always mention which project and line item you're referring to

WHAT YOU CAN DO:
- Portfolio risk scan (flag items >100% spent)
- Cross-project vendor rate comparison
- Contingency health check per project
- Budget vs actual variance analysis
- Invoice and payment gap analysis
- Generate board-level dashboards

WHAT YOU CANNOT DO:
- Make procurement decisions (you recommend, humans decide)
- Access real-time ERP data (you work from uploaded snapshots)
- Share data with people outside DEC Infra
- Provide legal or contractual advice

TONE: Professional, direct, data-driven. Like a senior finance analyst presenting to the CEO.</div>
</div>

<div class="step-box"><div class="step-num">3</div>
<h3>Add Knowledge Sources</h3>
<p>Upload or connect these files so the agent can reference them:</p>
<div class="card">
<ul>
<li><strong>DEC_Infra_Master_Dataset_180rows.csv</strong> — Upload to SharePoint, then add as knowledge source</li>
<li><strong>Vendor rate cards</strong> (if available) — PDF or Excel on SharePoint</li>
<li><strong>Project schedule summaries</strong> — any Excel/PDF on SharePoint</li>
<li><strong>Company policies</strong> (optional) — procurement policy, approval matrix</li>
</ul>
</div>
<div class="info-box"><strong>How to add knowledge:</strong> In Copilot Studio → Agent → Knowledge → Add → SharePoint site or Upload files. In Agent Builder → click "Add knowledge" → select files or paste SharePoint URL.</div>
</div>

<div class="step-box"><div class="step-num">4</div>
<h3>Test the Agent</h3>
<p>Use the preview panel to ask test questions. The agent should answer from your data:</p>
<div class="card">
<h4>Test Questions to Try:</h4>
<ul>
<li>"Which projects have items over 100% budget?"</li>
<li>"Compare rebar rates across all projects"</li>
<li>"What's the contingency status for Kamareddy Auditorium?"</li>
<li>"Give me a portfolio risk summary for the CEO"</li>
<li>"How much are we overspending on HVAC across projects?"</li>
<li>"What's the total pending invoice amount?"</li>
</ul>
</div>
</div>

<div class="step-box"><div class="step-num">5</div>
<h3>Publish to Teams</h3>
<p>Once tested, publish the agent so your team can access it in Microsoft Teams:</p>
<p><strong>Copilot Studio:</strong> Publish → Channels → Microsoft Teams → Turn on → Share with team/org.<br/>
<strong>Agent Builder:</strong> Click "Share" → Select users or groups → Done.</p>
</div>

<div class="success"><strong>✅ Result:</strong> Any DEC Infra PM can now open Teams, type "Hey DEC Budget Analyst, which projects are over budget?" and get an instant, data-backed answer — no prompt engineering needed.</div>

</div>
</div>

<!-- PART 3: AGENT 2 — SAFETY ADVISOR -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🦺 Part 3: Build Agent #2 — DEC Safety Advisor</h2><span class="arrow">▼</span></div>
<div class="section-body">

<div class="card">
<h3>Agent Profile: "DEC Safety Advisor"</h3>
<table>
<tr><td><strong>Name</strong></td><td>DEC Safety Advisor</td></tr>
<tr><td><strong>Purpose</strong></td><td>Generate safety checklists, toolbox talk content, incident investigation guidance, and compliance checks</td></tr>
<tr><td><strong>Knowledge</strong></td><td>IS safety standards (IS 3696, IS 4130), OSHA guidelines, DEC Infra safety policy, past incident reports</td></tr>
<tr><td><strong>Users</strong></td><td>Safety Officers, Site Engineers, Site Supervisors</td></tr>
<tr><td><strong>Channel</strong></td><td>Microsoft Teams (accessible from site via mobile)</td></tr>
</table>
</div>

<span class="prompt-label">AGENT INSTRUCTIONS — COPY-PASTE</span>
<div class="prompt"><button class="copy-btn" onclick="cp(this)">📋 Copy</button>You are DEC Safety Advisor, the AI safety assistant for DEC Infra Projects Pvt Ltd, a construction company managing 12+ active sites across India.

YOUR ROLE:
- Generate project-specific safety checklists based on work type
- Create toolbox talk content for daily safety briefings
- Guide incident investigation using the 5-Why method
- Check compliance against IS standards and OSHA guidelines
- Help prepare safety audit documentation

BEHAVIOR RULES:
- ALWAYS err on the side of caution — if unsure, recommend the stricter safety measure
- Reference specific IS codes (IS 3696 for scaffolding, IS 4130 for safety nets, etc.) but ALWAYS add: "Verify this clause number against the actual standard before official use"
- Never state "this is compliant" — instead say "based on the information provided, this appears to meet the requirements of [standard], but a certified safety officer should verify"
- Use checklists with ☐ checkboxes for actionable items
- Include PPE requirements for every activity
- Flag weather-related risks (monsoon, extreme heat, wind)
- All checklists should include emergency contact section

WHAT YOU CAN DO:
- Generate safety checklists (height work, excavation, hot work, confined space, electrical, crane)
- Create daily toolbox talk scripts (5-minute format)
- Guide 5-Why root cause analysis for incidents
- Compare site practices against IS/OSHA standards
- Draft safety method statements
- Create emergency response plans

WHAT YOU CANNOT DO:
- Certify compliance (only qualified safety officers can)
- Replace safety training programs
- Provide medical advice for injuries
- Make structural safety assessments

CRITICAL RULE: If someone asks about an active emergency or injury, respond: "This requires immediate human attention. Call your site safety officer and emergency services. I can help with documentation after the situation is resolved."

TONE: Firm but supportive. Safety is non-negotiable. Like a senior safety consultant who cares about every worker going home safe.</div>

<div class="card">
<h4>Knowledge Sources to Add:</h4>
<ul>
<li><strong>DEC Infra Safety Policy</strong> (PDF) — company safety rules and procedures</li>
<li><strong>IS Safety Standards summaries</strong> — IS 3696, IS 4130, IS 875 key extracts</li>
<li><strong>Past Incident Reports</strong> (anonymized) — learn from previous events</li>
<li><strong>Safety Checklist Templates</strong> — existing DEC Infra formats</li>
<li><strong>PPE Matrix</strong> — which PPE for which activity</li>
</ul>
</div>

<div class="card">
<h4>Test Questions:</h4>
<ul>
<li>"Generate a safety checklist for height work above 3 meters at IISER Library"</li>
<li>"Create a 5-minute toolbox talk on scaffold safety for tomorrow morning"</li>
<li>"A worker slipped on a wet surface and injured his wrist. Guide me through the incident investigation"</li>
<li>"What PPE is required for hot work near existing electrical systems?"</li>
<li>"Help me prepare for next week's safety audit — what documents do I need?"</li>
</ul>
</div>
</div>
</div>

<!-- PART 4: AGENT 3 — PROJECT REPORTER -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>📊 Part 4: Build Agent #3 — DEC Project Reporter</h2><span class="arrow">▼</span></div>
<div class="section-body">

<div class="card">
<h3>Agent Profile: "DEC Project Reporter"</h3>
<table>
<tr><td><strong>Name</strong></td><td>DEC Project Reporter</td></tr>
<tr><td><strong>Purpose</strong></td><td>Generate weekly reports, client status updates, meeting minutes, and board dashboards from raw project data</td></tr>
<tr><td><strong>Knowledge</strong></td><td>Project schedules, budget data, progress photos, meeting notes (SharePoint)</td></tr>
<tr><td><strong>Users</strong></td><td>Project Managers, Admin Staff, CEO</td></tr>
<tr><td><strong>Channel</strong></td><td>Microsoft Teams</td></tr>
</table>
</div>

<span class="prompt-label">AGENT INSTRUCTIONS — COPY-PASTE</span>
<div class="prompt"><button class="copy-btn" onclick="cp(this)">📋 Copy</button>You are DEC Project Reporter, the AI reporting assistant for DEC Infra Projects Pvt Ltd.

YOUR ROLE:
- Generate weekly project status reports from raw data
- Create client-ready status update emails
- Produce board-level dashboards with traffic light indicators
- Summarize meeting notes into structured minutes with action items
- Track action items and flag overdue tasks

BEHAVIOR RULES:
- Format all reports professionally — use headers, tables, and bullet points
- Always include: Date, Project Name, Report Period, Prepared By
- Use 🟢🟡🔴 traffic lights for: Budget, Schedule, Quality, Safety
- Present budget figures in ₹ Lac format
- Keep client communications professional and optimistic but honest
- Never hide bad news — present it with context and a corrective action plan
- Meeting minutes must include: Attendees, Date, Key Decisions, Action Items (with Owner + Deadline)
- Reports should be under 1 page unless requested otherwise

REPORT TYPES YOU CAN GENERATE:
1. Weekly Status Report (for internal team)
2. Client Status Update (professional email format)
3. Board Dashboard (traffic light summary, all projects)
4. Meeting Minutes (from raw notes)
5. Daily Site Report (from supervisor notes)
6. Monthly Progress Report (comprehensive)

TONE: Professional and structured. Like a senior PMO analyst who produces reports the CEO reads without asking questions.

FORMATTING:
- Use tables for data comparisons
- Use 🟢🟡🔴 for status indicators
- Bold key numbers and findings
- Include "Key Risks" and "Next Week Priorities" sections in every report</div>

<div class="card">
<h4>Knowledge Sources to Add:</h4>
<ul>
<li><strong>DEC Infra report templates</strong> — existing weekly/monthly formats</li>
<li><strong>Project schedules</strong> — MS Project or Primavera exports on SharePoint</li>
<li><strong>Budget dataset</strong> — the 242-row CSV on SharePoint</li>
<li><strong>Meeting notes folder</strong> — SharePoint library where PMs store notes</li>
<li><strong>Client communication templates</strong> — approved email formats</li>
</ul>
</div>

<div class="card">
<h4>Test Questions:</h4>
<ul>
<li>"Generate a weekly status report for IISER Library project — budget is 78% spent, 4 overruns, schedule slightly behind"</li>
<li>"Write a client status update email for the NSDL Data Center — we're behind on MEP by 2 weeks"</li>
<li>"Create a board dashboard for all 12 projects using the budget dataset"</li>
<li>"Here are my raw meeting notes: [paste notes]. Convert to structured minutes with action items."</li>
<li>"Generate a daily site report from these supervisor notes: 35 workers, concrete pour Block C complete, rain delay 2 hours"</li>
</ul>
</div>
</div>
</div>

<!-- PART 5: TEAM EXERCISE -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>👨‍💻 Part 5: Team Exercise — Build Your Department's Agent (30 mins)</h2><span class="arrow">▼</span></div>
<div class="section-body">

<div class="exercise">
<h3>🏋️ Team Challenge: Design & Build a Custom Agent</h3>
<p>Each team designs and builds a Copilot Agent for their department. You have 20 minutes to build + 5 minutes to demo.</p>
</div>

<div class="grid-2">
<div class="card">
<h3>Team 1: Procurement Agent</h3>
<p>Build an agent that helps procurement compare vendors, check rate histories, and generate purchase order summaries.</p>
<h4>Requirements:</h4>
<ul>
<li>Ground on vendor rate dataset</li>
<li>Answer "who is cheapest for rebar?"</li>
<li>Generate PO comparison tables</li>
<li>Flag when a vendor is charging above average</li>
</ul>
</div>
<div class="card">
<h3>Team 2: Quality Inspector Agent</h3>
<p>Build an agent that generates QA checklists, reviews test reports, and drafts NCR documents.</p>
<h4>Requirements:</h4>
<ul>
<li>Ground on IS 456, IS 1786 standard summaries</li>
<li>Generate inspection checklists by trade</li>
<li>Review concrete cube test results</li>
<li>Draft Non-Conformance Reports</li>
</ul>
</div>
<div class="card">
<h3>Team 3: HR Onboarding Agent</h3>
<p>Build an agent that answers new employee questions about DEC Infra policies, leave, safety training, and benefits.</p>
<h4>Requirements:</h4>
<ul>
<li>Ground on company handbook / HR policy PDF</li>
<li>Answer "What's the leave policy?"</li>
<li>Guide new joiners through safety training steps</li>
<li>Explain benefits and contact HR procedures</li>
</ul>
</div>
<div class="card">
<h3>Team 4: Client Communication Agent</h3>
<p>Build an agent that drafts client emails, progress updates, and delay notifications in DEC Infra's professional tone.</p>
<h4>Requirements:</h4>
<ul>
<li>Ground on past client email templates</li>
<li>Draft progress update emails</li>
<li>Draft delay notification with mitigation plan</li>
<li>Maintain professional, honest, solution-focused tone</li>
</ul>
</div>
</div>

<div class="card">
<h3>Demo Judging Criteria</h3>
<table>
<tr><th>Criteria</th><th>Points</th><th>What Judges Look For</th></tr>
<tr><td>Agent Instructions Quality</td><td>25</td><td>Clear role, rules, tone, scope boundaries</td></tr>
<tr><td>Knowledge Relevance</td><td>25</td><td>Right documents connected, agent answers from data</td></tr>
<tr><td>Test Response Quality</td><td>25</td><td>Does the agent give useful, accurate answers?</td></tr>
<tr><td>Business Value</td><td>15</td><td>Would DEC Infra actually use this agent daily?</td></tr>
<tr><td>Presentation</td><td>10</td><td>Clear demo, good explanation of what it does</td></tr>
</table>
</div>
</div>
</div>

<!-- PART 6: BEST PRACTICES -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🎯 Part 6: Agent Building Best Practices</h2><span class="arrow">▼</span></div>
<div class="section-body">

<div class="card">
<h3>✅ Do's and Don'ts for Agent Instructions</h3>
<div class="grid-2">
<div style="border-left:3px solid var(--green);padding-left:12px">
<h4 style="color:var(--green)">✅ DO</h4>
<ul>
<li>Define a clear role: "You are a budget analyst for..."</li>
<li>Set explicit boundaries: "You can/cannot..."</li>
<li>Specify output format: "Use tables, ₹ Lac format..."</li>
<li>Include safety catches: "If unsure, say so"</li>
<li>Define tone: "Professional, concise, data-driven"</li>
<li>Add examples of good responses</li>
</ul>
</div>
<div style="border-left:3px solid var(--red);padding-left:12px">
<h4 style="color:var(--red)">❌ DON'T</h4>
<ul>
<li>Write vague instructions: "Be helpful" (too generic)</li>
<li>Skip scope boundaries (agent will hallucinate)</li>
<li>Let agent access data it shouldn't see</li>
<li>Forget to say "verify before official use"</li>
<li>Deploy without testing at least 10 questions</li>
<li>Share agents externally without IT approval</li>
</ul>
</div>
</div>
</div>

<div class="card">
<h3>Knowledge Source Best Practices</h3>
<table>
<tr><th>Source Type</th><th>Best Practice</th><th>DEC Infra Example</th></tr>
<tr><td>SharePoint Site</td><td>Point to a dedicated folder, not entire site</td><td>/Projects/BudgetData/ (not entire SharePoint)</td></tr>
<tr><td>Excel / CSV</td><td>Clean headers, no merged cells, under 10MB</td><td>242-row dataset with clear column names</td></tr>
<tr><td>PDFs</td><td>Use text-based PDFs, not scanned images</td><td>Safety standards, policy documents</td></tr>
<tr><td>Word Docs</td><td>Use headings and structure for better parsing</td><td>Company handbook with H1/H2/H3 headings</td></tr>
</table>
</div>

<div class="card">
<h3>Security & Data Protection for Agents</h3>
<div class="warning"><strong>⚠️ Agents inherit access permissions.</strong> If the agent is grounded on a SharePoint folder, users can only see data they already have access to. But verify this before deploying.</div>
<ul>
<li><strong>Turn off "Search all websites"</strong> — enabled by default in Copilot Studio. Disable it for internal agents to prevent data leakage</li>
<li><strong>Restrict sharing</strong> — share agents only with the team that needs them, not the entire organization</li>
<li><strong>Review knowledge scope</strong> — make sure the agent can't access HR data, salary sheets, or Tier 3 confidential data unless specifically intended</li>
<li><strong>Test with a non-admin account</strong> — verify the agent shows the right data to regular users</li>
<li><strong>Audit regularly</strong> — check agent usage logs monthly for unexpected queries</li>
</ul>
</div>
</div>
</div>

<!-- PART 7: DEC INFRA AGENT ROADMAP -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🚀 Part 7: DEC Infra Agent Roadmap — 10 Agents to Build</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="card">
<h3>Recommended Agent Rollout — Phase-by-Phase</h3>
<table>
<tr><th>Phase</th><th>Agent</th><th>Department</th><th>Timeline</th><th>Impact</th></tr>
<tr><td rowspan="3" style="color:var(--green);font-weight:700">Phase 1<br/>Month 1-2</td><td>DEC Budget Analyst</td><td>Finance</td><td>Week 1-2</td><td>₹12-24L/year savings</td></tr>
<tr><td>DEC Safety Advisor</td><td>Quality & Safety</td><td>Week 2-3</td><td>₹5-15L risk avoidance</td></tr>
<tr><td>DEC Project Reporter</td><td>PMO</td><td>Week 3-4</td><td>15-20 hrs/month saved</td></tr>
<tr><td rowspan="3" style="color:var(--accent);font-weight:700">Phase 2<br/>Month 3-4</td><td>DEC Procurement Advisor</td><td>Procurement</td><td>Week 5-6</td><td>₹20-40L better procurement</td></tr>
<tr><td>DEC Quality Inspector</td><td>QA/QC</td><td>Week 6-7</td><td>₹5-10L rework prevention</td></tr>
<tr><td>DEC HR Assistant</td><td>HR</td><td>Week 7-8</td><td>50% reduction in HR queries</td></tr>
<tr><td rowspan="4" style="color:var(--ms-blue);font-weight:700">Phase 3<br/>Month 5-6</td><td>DEC Contract Reviewer</td><td>Legal / Contracts</td><td>Week 9-10</td><td>₹10-30L dispute avoidance</td></tr>
<tr><td>DEC Estimation Assistant</td><td>Estimation</td><td>Week 10-11</td><td>5-10% better accuracy</td></tr>
<tr><td>DEC Client Communicator</td><td>Business Dev</td><td>Week 11-12</td><td>Consistent, fast responses</td></tr>
<tr><td>DEC Knowledge Base</td><td>All</td><td>Week 12</td><td>Institutional memory preserved</td></tr>
</table>
</div>

<div class="success"><strong>💰 Total Value of 10 Agents:</strong> Conservative estimate ₹60-120L annual savings + risk avoidance across the organization. Investment: ₹6-10L (M365 Copilot licenses + Copilot Studio). <strong>ROI: 600-1200%.</strong></div>
</div>
</div>

<!-- PART 8: PROGRAM WRAP-UP -->
<div class="section">
<div class="section-head" onclick="toggle(this)"><h2>🎓 Part 8: Program Wrap-Up & 30-Day Action Plan</h2><span class="arrow">▼</span></div>
<div class="section-body">

<div class="card">
<h3>What You Accomplished Across 4 Modules</h3>
<table>
<tr><th>Module</th><th>Skill</th><th>Impact</th></tr>
<tr><td>M1: Prompting & Docs</td><td>Write effective prompts, compare documents, analyze photos</td><td>₹20-40L better decisions</td></tr>
<tr><td>M2: Data Analysis</td><td>Upload Excel/CSV for instant budget & vendor analysis</td><td>₹12-24L labor savings/year</td></tr>
<tr><td>M3: Safe AI</td><td>Data classification, anonymization, hallucination detection</td><td>₹5-250 Cr risk avoidance</td></tr>
<tr><td style="color:var(--ms-blue);font-weight:600">M4: Copilot Agents</td><td style="color:var(--ms-blue)">Build custom AI assistants deployed in Teams</td><td style="color:var(--ms-blue)">₹60-120L/year (10 agents)</td></tr>
<tr><td colspan="2" style="font-weight:700;color:var(--accent)">TOTAL PROGRAM VALUE</td><td style="font-weight:700;color:var(--accent)">₹1 Cr+ annual benefit</td></tr>
</table>
</div>

<div class="card">
<h3>Your 30-Day Action Plan</h3>
<div class="grid-2">
<div>
<h4>Week 1: Quick Wins</h4>
<ul>
<li>Build 1 simple agent using Agent Builder in M365 Chat</li>
<li>Ground it on 1 document (your team's most-used file)</li>
<li>Share with 2-3 colleagues, collect feedback</li>
</ul>
<h4>Week 2: Expand</h4>
<ul>
<li>Refine instructions based on feedback</li>
<li>Add 2-3 more knowledge sources</li>
<li>Build a second agent for a different use case</li>
</ul>
</div>
<div>
<h4>Week 3: Go Production</h4>
<ul>
<li>Recreate your best agent in Copilot Studio (full features)</li>
<li>Test with 10+ questions before publishing</li>
<li>Publish to Teams for your department</li>
</ul>
<h4>Week 4: Measure & Scale</h4>
<ul>
<li>Track agent usage (queries/week, user satisfaction)</li>
<li>Calculate time saved vs manual process</li>
<li>Present ROI to management, plan Phase 2 agents</li>
</ul>
</div>
</div>
</div>

<div class="card">
<h3>Commitment Card</h3>
<div style="padding:20px;background:rgba(0,120,212,0.05);border-radius:8px;border:1px dashed rgba(0,120,212,0.3);text-align:center;font-size:16px">
<p>"I commit to building <strong>at least ONE Copilot Agent</strong> within 2 weeks,<br/>
grounded on my department's data, and sharing it with my team in Microsoft Teams.<br/>
I will follow the data protection rules from Module 3 and verify all agent outputs."</p>
<p style="margin-top:15px"><strong>Name: _________________ &nbsp;&nbsp; Date: _________________ &nbsp;&nbsp; Department: _________________</strong></p>
<p style="margin-top:5px"><strong>My First Agent Will Be: _________________________________________________</strong></p>
</div>
</div>

<div class="stats">
<div class="stat"><span class="n">🎓</span><span class="l">Training Complete!</span></div>
<div class="stat"><span class="n">₹1 Cr+</span><span class="l">Annual Value Unlocked</span></div>
<div class="stat"><span class="n">10</span><span class="l">Agents to Build</span></div>
<div class="stat"><span class="n">600%+</span><span class="l">Expected ROI</span></div>
</div>
</div>
</div>


        </div>
`;
    
    // Auto-scroll to top
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const currentWebhook = State.get('surveyWebhookUrl') || '';
    const subs = State.get('localSubmissions') || [];

    // Helper to generate the table rows
    let tableRows = '';
    if (subs.length === 0) {
        tableRows = `<tr><td colspan="5" class="text-center text-muted" style="padding: 1.5rem;">No participant survey submissions collected yet.</td></tr>`;
    } else {
        subs.forEach(s => {
            const before = s.before || {};
            const after = s.after || {};
            
            const beforeUsage = before.aiUsagePct ? before.aiUsagePct + '%' : 'N/A';
            const afterUsage = after.aiUsagePct ? after.aiUsagePct + '%' : 'N/A';
            const usageShift = before.aiUsagePct && after.aiUsagePct ? `${beforeUsage} Γ₧ö ${afterUsage}` : `${beforeUsage} / ${afterUsage}`;
            
            const beforeRating = before.chatgptRating ? before.chatgptRating + '/10' : 'N/A';
            const afterRating = after.chatgptRating ? after.chatgptRating + '/10' : 'N/A';
            const ratingShift = before.chatgptRating && after.chatgptRating ? `${beforeRating} Γ₧ö ${afterRating}` : `${beforeRating} / ${afterRating}`;
            
            const manualHrsBefore = before.manualTime || 0;
            const manualHrsAfter = after.manualTime || 0;
            const timeSaved = before.manualTime && after.manualTime ? (manualHrsBefore - manualHrsAfter) + ' hrs' : 'N/A';
            
            const feedbackText = after.feedbackPointers || (before.blocker ? 'Blocker: ' + before.blocker : 'N/A');

            tableRows += `
                <tr>
                    <td><b>${s.name}</b></td>
                    <td>${usageShift}</td>
                    <td>${ratingShift}</td>
                    <td style="color:var(--success); font-weight:bold;">${timeSaved}</td>
                    <td class="text-xs text-muted" style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${feedbackText}">${feedbackText}</td>
                </tr>
            `;
        });
    }

    container.innerHTML = `
        <div class="mb-4">
            <span class="badge badge-warning">Trainer Tools</span>
            <h2 class="mt-4">Trainer Dashboard</h2>
            <p class="text-muted">Manage participant submissions, setup Google Sheets database collector, and view notes.</p>
        </div>

        <!-- NEW: Google Sheets Webhook Database Setup -->
        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">≡ƒöù Google Sheets Survey Database Collector</h3></div>
            <div class="card-body">
                <p class="text-sm text-muted mb-4">You can log all participants' survey submissions directly into a Google Sheet in real-time. Follow the steps below to set it up:</p>
                
                <div class="dashboard-grid mb-4">
                    <div>
                        <h4 class="text-sm mb-2">1. Configure Webhook URL</h4>
                        <div class="form-group flex gap-2" style="display:flex; gap:0.5rem; margin-bottom: 1rem;">
                            <input type="text" id="webhook-url-input" class="form-control" placeholder="Paste Google Web App URL here..." value="${currentWebhook}" style="margin-bottom:0; flex-grow:1;">
                            <button class="btn btn-primary" id="btn-save-webhook">Save Link</button>
                        </div>
                        <p class="text-xs text-muted">When a URL is saved, all new participant survey submissions will automatically push to this Google Sheet.</p>
                    </div>
                    
                    <div>
                        <h4 class="text-sm mb-2">2. Google Apps Script Code</h4>
                        <p class="text-xs text-muted mb-2">Open your Google Sheet, go to <b>Extensions > Apps Script</b>, paste the code below, and **Deploy as a Web App** (execute as: Me, access: Anyone):</p>
                        <pre style="background:var(--bg-main); padding: 0.75rem; border-radius: 6px; font-size: 0.7rem; max-height: 150px; overflow-y: auto; border: 1px solid #CBD5E1;" id="script-code-block">
function doPost(e) {
  try {
    // Opens the active sheet of the bound spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var json = JSON.parse(e.postData.contents);
    
    // Deduplication check: ignore double-clicks (same name, same type, submitted within 4 seconds)
    var lastRow = sheet.getLastRow();
    if (lastRow >= 2) {
      var lastRowValues = sheet.getRange(lastRow, 1, 1, 3).getValues()[0];
      
      var lastDateVal = lastRowValues[0];
      if (typeof lastDateVal === 'string') {
        var parts = lastDateVal.split(/[/\s:]/);
        if (parts.length >= 6) {
          lastDateVal = new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5]);
        } else {
          lastDateVal = new Date(lastDateVal);
        }
      }
      
      var sheetZone = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
      var lastStr = Utilities.formatDate(new Date(lastDateVal), sheetZone, "yyyy-MM-dd HH:mm:ss");
      var nowStr = Utilities.formatDate(new Date(), sheetZone, "yyyy-MM-dd HH:mm:ss");
      
      var lastDate = new Date(lastStr.replace(/-/g, '/'));
      var nowDate = new Date(nowStr.replace(/-/g, '/'));
      var timeDiff = Math.abs(nowDate - lastDate);
      
      var lastName = lastRowValues[1].toString().trim().toLowerCase();
      var lastType = lastRowValues[2].toString().trim().toLowerCase();
      var newName = json.participantName.toString().trim().toLowerCase();
      var newType = json.type.toString().trim().toLowerCase();
      
      var isSameType = (lastType === newType) || 
                       (newType === "before" && lastType === "pre-session survey") || 
                       (newType === "after" && lastType === "post-session feedback");
                       
      if (lastName === newName && isSameType && timeDiff < 4000) {
        return ContentService.createTextOutput("Duplicate submission skipped");
      }
    }
    
    // Append the new row data
    var rowData = [
      new Date(),
      json.participantName,
      json.type,
      json.data.aiUsagePct + "%",
      json.data.chatgptRating + "/10",
      json.data.manualTime + " hrs",
      json.data.feedbackPointers || json.data.blocker || ""
    ];
    sheet.appendRow(rowData);
    
    // Format the entire sheet (styles, badges, column widths for both old and new rows)
    formatEntireSheet(sheet);
    
    return ContentService.createTextOutput("Success");
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}

function formatEntireSheet(sheet) {
  var headers = ["Timestamp", "Participant Name", "Survey Type", "AI Usage Level", "Tool Performance", "Weekly Manual Hours", "Key Takeaway / Blocker / Feedback"];
  
  // 1. Ensure header is present and styled
  var firstCell = sheet.getRange(1, 1).getValue();
  if (firstCell !== "Timestamp") {
    sheet.insertRowBefore(1);
  }
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground("#0A192F"); // Premium Navy Blue
  headerRange.setFontColor("#FFFFFF"); // White text
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  headerRange.setFontSize(11);
  
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  
  var numRows = lastRow - 1;
  
  // 2. Format all data rows (font size and alignment)
  var dataRange = sheet.getRange(2, 1, numRows, headers.length);
  dataRange.setFontSize(10);
  dataRange.setVerticalAlignment("middle");
  
  // Center-align specific structured data columns
  sheet.getRange(2, 1, numRows, 1).setHorizontalAlignment("center"); // Column 1: Timestamp
  sheet.getRange(2, 4, numRows, 1).setHorizontalAlignment("center"); // Column 4: AI Usage Level
  sheet.getRange(2, 5, numRows, 1).setHorizontalAlignment("center"); // Column 5: Tool Performance
  sheet.getRange(2, 6, numRows, 1).setHorizontalAlignment("center"); // Column 6: Weekly Manual Hours
  
  // 3. Clean and convert Survey Type values into styled badges (Pre-Session vs Post-Session) in BATCH
  var typeRange = sheet.getRange(2, 3, numRows, 1);
  var typeValues = typeRange.getValues();
  
  // Prepare batch arrays for updating values and styles
  var newValues = [];
  var backgrounds = [];
  var fontColors = [];
  var fontWeights = [];
  var alignments = [];
  
  for (var i = 0; i < typeValues.length; i++) {
    var rawVal = typeValues[i][0].toString().trim().toLowerCase();
    
    if (rawVal === "before" || rawVal === "pre-session survey") {
      newValues.push(["Pre-Session Survey"]);
      backgrounds.push(["#FFF3CD"]); // Warm Yellow badge
      fontColors.push(["#856404"]);
      fontWeights.push(["bold"]);
      alignments.push(["center"]);
    } else if (rawVal === "after" || rawVal === "post-session feedback") {
      newValues.push(["Post-Session Feedback"]);
      backgrounds.push(["#D4EDDA"]); // Light Green badge
      fontColors.push(["#155724"]);
      fontWeights.push(["bold"]);
      alignments.push(["center"]);
    } else {
      newValues.push([typeValues[i][0]]);
      backgrounds.push(["#FFFFFF"]);
      fontColors.push(["#000000"]);
      fontWeights.push(["normal"]);
      alignments.push(["left"]);
    }
  }
  
  // Apply batch updates
  typeRange.setValues(newValues);
  typeRange.setBackgrounds(backgrounds);
  typeRange.setFontColors(fontColors);
  typeRange.setFontWeights(fontWeights);
  typeRange.setHorizontalAlignments(alignments);
  
  // 4. Auto-fit columns with a professional minimum width to prevent header overlapping
  var minWidths = [140, 160, 160, 130, 130, 150, 300];
  for (var col = 1; col <= headers.length; col++) {
    sheet.autoResizeColumn(col);
    var currentWidth = sheet.getColumnWidth(col);
    if (currentWidth < minWidths[col - 1]) {
      sheet.setColumnWidth(col, minWidths[col - 1]);
    }
  }
}
                        </pre>
                        <button class="btn btn-secondary btn-small w-full mt-2" id="btn-copy-script">Copy Apps Script Code</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- NEW: Collected Submissions Table -->
        <div class="card mb-8">
            <div class="card-header flex justify-between items-center" style="display:flex; justify-content:space-between;">
                <h3 class="card-title">≡ƒôè Collected Participant Submissions</h3>
                <div class="flex gap-2">
                    <button class="btn btn-secondary btn-small" id="btn-export-subs-json">Download JSON</button>
                    <button class="btn btn-danger btn-small" id="btn-clear-subs">Reset Database</button>
                </div>
            </div>
            <div class="card-body table-responsive" style="padding: 0; max-height: 350px; overflow-y: auto;">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Participant Name</th>
                            <th>AI Usage Shift (Before Γ₧ö After)</th>
                            <th>ChatGPT Rating (Before Γ₧ö After)</th>
                            <th>Weekly Time Saved</th>
                            <th>Feedback / Blockers</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
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

    setTimeout(() => {
        // Save Webhook URL
        document.getElementById('btn-save-webhook')?.addEventListener('click', () => {
            const url = document.getElementById('webhook-url-input').value.trim();
            State.set('surveyWebhookUrl', url);
            showToast('Google Sheet Webhook URL saved successfully!', 'success');
        });

        // Copy Script Code
        document.getElementById('btn-copy-script')?.addEventListener('click', () => {
            const pre = document.getElementById('script-code-block');
            navigator.clipboard.writeText(pre.innerText);
            showToast('Apps Script code copied to clipboard!', 'success');
        });

        // Export submissions JSON
        document.getElementById('btn-export-subs-json')?.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(subs, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "participant_submissions.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            showToast('JSON export downloaded!', 'success');
        });

        // Clear submissions
        document.getElementById('btn-clear-subs')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all collected submissions from local browser memory?')) {
                State.set('localSubmissions', []);
                showToast('Local database cleared!', 'info');
                renderTrainerDashboard(container); // Re-draw
            }
        });
    }, 100);
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
        <div class="mb-4" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
                <span class="badge badge-primary">Resources</span>
                <h2 class="mt-4" style="background: -webkit-linear-gradient(45deg, #F8FAFC, #FFDE59); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Prompt Library</h2>
                <p class="text-muted">A collection of ready-to-use prompts for DEC workflows.</p>
            </div>
            <div style="width:130px; height:130px; flex-shrink:0; position:relative; display:flex; align-items:center; justify-content:center;">
                <div style="width:100px; height:100px; background:linear-gradient(135deg,rgba(255,222,89,0.15),rgba(124,58,237,0.08)); border:2px solid rgba(255,222,89,0.5); border-radius:22px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 30px rgba(255,222,89,0.3),0 0 60px rgba(124,58,237,0.15); animation:modFloat 3s ease-in-out 1.2s infinite; font-size:2.8rem; position:relative;">≡ƒñû
                    <div style="position:absolute; top:-4px; right:-4px; width:10px; height:10px; background:#10B981; border-radius:50%; box-shadow:0 0 6px #10B981; animation:blinkDot 1s ease-in-out infinite;"></div>
                </div>
                <div style="position:absolute; inset:-8px; border:1px solid rgba(255,222,89,0.2); border-radius:30px; animation:modSpin 6s linear infinite;"></div>
                <div style="position:absolute; inset:-18px; border:1px dashed rgba(124,58,237,0.15); border-radius:40px; animation:modSpinRev 9s linear infinite;"></div>
                <style>@keyframes blinkDot{0%,100%{opacity:1}50%{opacity:0.2}}</style>
            </div>
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
                        <button class="btn btn-secondary btn-small" id="btn-dl-verify">Download PDF</button>
                    </div>
                    <div class="ai-result-box flex justify-between items-center" style="display:flex;">
                        <div>
                            <strong>Enterprise Copilot vs ChatGPT</strong>
                            <div class="text-sm text-muted">When to use which tool at DEC.</div>
                        </div>
                        <button class="btn btn-secondary btn-small" id="btn-dl-compare">Download PDF</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        document.getElementById('btn-dl-verify')?.addEventListener('click', () => {
            const html = `
                <h2>Pre-Flight Checks</h2>
                <ul>
                    <li><b>Source Checked:</b> Have you verified the numbers against the original ERP/CRM data?</li>
                    <li><b>Math Verified:</b> Did you manually spot-check any calculations? AI struggles with arithmetic.</li>
                    <li><b>Confidentiality:</b> Have you stripped out PII, salaries, and non-public financials?</li>
                    <li><b>Tone Check:</b> Does this sound like a DEC employee wrote it?</li>
                </ul>
                <div class="alert alert-amber"><b>Rule of Thumb:</b> If you wouldn't send it to the CEO without checking it, don't send the AI's output without checking it.</div>
            `;
            window.downloadPDF('Human Verification Checklist', html);
        });

        document.getElementById('btn-dl-compare')?.addEventListener('click', () => {
            const html = `
                <h2>Which AI Should I Use?</h2>
                <div class="alert alert-green">
                    <h3>Public ChatGPT / Claude</h3>
                    <p>Great for general brainstorming, generic coding, public summaries, and drafting emails that do not contain client specifics.</p>
                </div>
                <div class="alert alert-amber">
                    <h3>Enterprise Copilot (DEC Secure)</h3>
                    <p>Required for analyzing internal project reports, reading vendor quotes, generating meeting minutes, and summarizing internal policies.</p>
                </div>
                <div class="alert alert-red">
                    <h3>No AI Allowed</h3>
                    <p>Never use AI for generating payroll, highly confidential HR matters, or sharing unreleased proprietary algorithms.</p>
                </div>
            `;
            window.downloadPDF('Enterprise Copilot vs ChatGPT', html);
        });
    }, 100);
}

function renderModule1Docs(container) {
    const docs = DocumentEngine.getAllDocuments();
    let optionsHtml = docs.map(d => `<option value="${d.id}">${d.title} (${d.type})</option>`).join('');

    container.innerHTML = `
        <div class="mb-4">
            <button class="btn btn-secondary btn-small mb-4" onclick="window.location.hash='/module1'">← Back to Module 1</button>
            <span class="badge badge-warning">Session 1 Workspace</span>
            <h2 class="mt-4">Document Intelligence Copilot</h2>
            <p class="text-muted">Analyze DEC Tenders, Contracts, and Quotes, and build side-by-side comparisons.</p>
        </div>
        
        <!-- NEW: Side-by-Side Comparison -->
        <div class="card mb-8">
            <div class="card-header"><h3 class="card-title">Side-by-Side Vendor Comparison (Red Flags)</h3></div>
            <div class="card-body">
                <p class="mb-4 text-muted">Select two vendor quotes or contracts to automatically extract dates, penalties, and obligations, and highlight discrepancies.</p>
                <div class="flex gap-4 mb-4">
                    <div class="form-group w-full">
                        <label class="form-label text-sm">Vendor A</label>
                        <select id="compare-doc-a" class="form-control">${optionsHtml}</select>
                    </div>
                    <div class="form-group w-full">
                        <label class="form-label text-sm">Vendor B</label>
                        <select id="compare-doc-b" class="form-control">${optionsHtml}</select>
                    </div>
                </div>
                <button class="btn btn-primary w-full mb-4" id="btn-run-comparison">Extract & Compare (Detect Red Flags)</button>
                
                <div id="comparison-result" class="hidden">
                    <table class="table" style="font-size: 0.875rem; width: 100%;">
                        <thead>
                            <tr>
                                <th style="width:20%;">Criteria</th>
                                <th style="width:30%;">Vendor A</th>
                                <th style="width:30%;">Vendor B</th>
                                <th style="width:20%;">AI Analysis</th>
                            </tr>
                        </thead>
                        <tbody id="comparison-body">
                            <!-- Populated by JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="dashboard-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <!-- Left Pane: Document Viewer -->
            <div class="card mb-8" style="display: flex; flex-direction: column;">
                <div class="card-header"><h3 class="card-title">Single Document Source</h3></div>
                <div class="card-body flex-col h-full" style="flex-grow: 1; display: flex;">
                    <select id="doc-select" class="form-control mb-4">
                        ${optionsHtml}
                    </select>
                    <div id="doc-viewer" style="background: var(--bg-card); padding: 1.5rem; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); max-height: 500px; overflow-y: auto; white-space: pre-wrap; font-family: var(--font-body); font-size: 0.875rem; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); flex-grow: 1;"></div>
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

        // NEW: Comparison Logic
        document.getElementById('btn-run-comparison')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-run-comparison');
            btn.disabled = true;
            btn.innerText = "Extracting & Comparing...";
            
            setTimeout(() => {
                const docA = DocumentEngine.getDocument(document.getElementById('compare-doc-a').value);
                const docB = DocumentEngine.getDocument(document.getElementById('compare-doc-b').value);
                
                let html = "";
                
                // Demo logic specifically matching the quote_demo vs quote_demo_2 for a great demo, fallback for others
                if (docA.id.includes('quote') && docB.id.includes('quote')) {
                    html = `
                        <tr>
                            <td><strong>Pricing (Base Rate)</strong></td>
                            <td>₹250 per Cu.M</td>
                            <td>₹230 per Cu.M</td>
                            <td><span style="color:var(--success); font-weight:bold;">Vendor B is cheaper by ₹20/Cu.M</span></td>
                        </tr>
                        <tr>
                            <td><strong>Timeline</strong></td>
                            <td>25 working days</td>
                            <td>35 working days</td>
                            <td><span style="background:var(--danger-bg); color:var(--danger); padding:2px 4px; border-radius:4px; font-weight:bold; font-size:0.75rem;">RED FLAG</span> Vendor B takes 10 days longer.</td>
                        </tr>
                        <tr>
                            <td><strong>Penalties & Obligations</strong></td>
                            <td>None explicitly stated</td>
                            <td>₹10,000 / day delay penalty</td>
                            <td><span style="background:var(--warning-bg); color:var(--warning); padding:2px 4px; border-radius:4px; font-weight:bold; font-size:0.75rem;">RISK</span> Vendor B has strict penalty clauses.</td>
                        </tr>
                    `;
                } else if (docA.id.includes('contract') || docB.id.includes('contract')) {
                    html = `
                        <tr>
                            <td><strong>Payment Terms</strong></td>
                            <td>45 days of invoice submission</td>
                            <td>20% Advance, 80% within 30 days</td>
                            <td><span style="background:var(--warning-bg); color:var(--warning); padding:2px 4px; border-radius:4px; font-weight:bold; font-size:0.75rem;">RISK</span> Vendor B requires heavy advance.</td>
                        </tr>
                        <tr>
                            <td><strong>Liabilities</strong></td>
                            <td>Capped at contract value</td>
                            <td>Uncapped for structural failure</td>
                            <td><span style="background:var(--danger-bg); color:var(--danger); padding:2px 4px; border-radius:4px; font-weight:bold; font-size:0.75rem;">RED FLAG</span> Vendor B has uncapped liability risk.</td>
                        </tr>
                    `;
                } else {
                    html = `
                        <tr>
                            <td colspan="4" class="text-center text-muted">Comparison generated for specific fields. Select Quote vs Quote(Alt) for the best demonstration.</td>
                        </tr>
                    `;
                }
                
                document.getElementById('comparison-body').innerHTML = html;
                document.getElementById('comparison-result').classList.remove('hidden');
                
                btn.disabled = false;
                btn.innerText = "Extract & Compare (Detect Red Flags)";
                showToast("Side-by-side comparison generated successfully.", "success");
            }, 1000);
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

function renderCaseStudies(container) {
    container.innerHTML = `
        <div class="mb-4">
            <span class="badge badge-primary">Enterprise Showcase</span>
            <h2 class="mt-4">AI Case Studies</h2>
            <p class="text-muted">Real-world AI implementations for DEC Infra and DEC Industries.</p>
        </div>
        
        <div class="dashboard-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
            <!-- DEC Infra Case Study -->
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">DEC Infra: Predictive Delay Simulator</h3></div>
                <div class="card-body">
                    <div class="mb-4">
                        <span class="badge badge-info mb-2">Metro Line Project</span>
                        <p class="text-sm text-muted"><strong>Problem:</strong> Unseasonal rain and resource clashes are predicting a 2-week delay on the critical path.</p>
                        <p class="text-sm text-muted"><strong>AI Solution:</strong> Analyze synthetic logs to dynamically recommend resource reallocation.</p>
                    </div>
                    
                    <div class="p-3 border rounded mb-4" style="background:var(--bg-card); border:1px solid #cbd5e1;">
                        <h4 class="mb-2 text-sm">Synthetic Project Inputs:</h4>
                        <ul class="text-xs text-muted mb-0" style="padding-left:1.2rem;">
                            <li>Weather forecast: Heavy rain (Days 12-15)</li>
                            <li>Excavator availability: 2 units (Site A), 0 units (Site B)</li>
                            <li>Critical path: Foundation laying (Site B)</li>
                        </ul>
                    </div>

                    <button class="btn btn-primary w-full mb-4" id="btn-run-infra-cs">Run AI Resource Simulator</button>
                    
                    <div id="infra-cs-results" class="hidden">
                        <div class="ai-result-box mb-4" style="border-color: var(--warning);">
                            <span class="ai-badge">AI Recommendation</span>
                            <div class="mt-2 text-sm">
                                <strong>Delay Mitigated!</strong><br>
                                Shifted 1 Excavator from Site A to Site B. Accelerated foundation schedule by 4 days prior to rain event.
                            </div>
                        </div>
                        <div style="height: 250px; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 1rem;">
                            <canvas id="infra-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEC Industries Case Study -->
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">DEC Industries: Predictive Maintenance</h3></div>
                <div class="card-body">
                    <div class="mb-4">
                        <span class="badge badge-success mb-2">Steel Plant Operations</span>
                        <p class="text-sm text-muted"><strong>Problem:</strong> Sudden equipment failures lowering OEE (Overall Equipment Effectiveness).</p>
                        <p class="text-sm text-muted"><strong>AI Solution:</strong> Real-time anomaly detection on machinery vibration sensors.</p>
                    </div>

                    <div class="p-3 border rounded mb-4" style="background:#0F172A; color: #38BDF8; font-family: monospace; height: 120px; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden;">
                        <div id="sensor-feed" style="font-size: 0.75rem; line-height:1.2;">
                            > Connecting to Mill Motor A...<br>
                            > Vibration: 2.1mm/s (Normal)<br>
                            > Vibration: 2.2mm/s (Normal)<br>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary w-full mb-4" id="btn-run-ind-cs">Start AI Sensor Monitoring</button>

                    <div id="ind-cs-results" class="hidden">
                        <div class="ai-result-box mb-4" style="border-color: var(--danger); background: rgba(239, 68, 68, 0.05);">
                            <span class="ai-badge" style="background:var(--danger);">Anomaly Detected</span>
                            <div class="mt-2 text-sm">
                                <strong>High Risk of Bearing Failure</strong><br>
                                Vibration spiked to 8.7mm/s. AI has automatically generated a maintenance ticket and scheduled downtime during shift change.
                            </div>
                        </div>
                        <div style="height: 250px; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 1rem;">
                            <canvas id="ind-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEC Agro Case Study -->
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">DEC Agro: Crop Yield Predictor</h3></div>
                <div class="card-body">
                    <div class="mb-4">
                        <span class="badge badge-warning mb-2">Agricultural Analytics</span>
                        <p class="text-sm text-muted"><strong>Problem:</strong> Fluctuating weather patterns causing unpredictable crop yields and supply chain issues.</p>
                        <p class="text-sm text-muted"><strong>AI Solution:</strong> Machine learning model analyzing historical weather and soil data to predict harvest times and yields.</p>
                    </div>

                    <div class="p-3 border rounded mb-4" style="background:var(--bg-card); border:1px solid #cbd5e1;">
                        <h4 class="mb-2 text-sm">Synthetic Project Inputs:</h4>
                        <ul class="text-xs text-muted mb-0" style="padding-left:1.2rem;">
                            <li>Weather data: Above average rainfall expected</li>
                            <li>Soil moisture levels: 45% (Optimal)</li>
                            <li>Crop Type: Hybrid Wheat</li>
                        </ul>
                    </div>
                    
                    <button class="btn btn-primary w-full mb-4" id="btn-run-agro-cs">Run Yield Prediction Model</button>

                    <div id="agro-cs-results" class="hidden">
                        <div class="ai-result-box mb-4" style="border-color: var(--success); background: rgba(16, 185, 129, 0.05);">
                            <span class="ai-badge" style="background:var(--success);">Yield Optimized!</span>
                            <div class="mt-2 text-sm">
                                <strong>Harvest Timeline Adjusted</strong><br>
                                Shifted planting schedule by 1 week to avoid heavy rain. Expecting a 15% increase in total yield.
                            </div>
                        </div>
                        <div style="height: 250px; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 1rem;">
                            <canvas id="agro-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEC Finance Case Study -->
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">DEC Finance: Invoice Processing Automation</h3></div>
                <div class="card-body">
                    <div class="mb-4">
                        <span class="badge badge-info mb-2">Financial Operations</span>
                        <p class="text-sm text-muted"><strong>Problem:</strong> Manual data entry of hundreds of invoices leading to human errors and delayed payments.</p>
                        <p class="text-sm text-muted"><strong>AI Solution:</strong> OCR and NLP to automatically extract data from invoices and match them with Purchase Orders.</p>
                    </div>

                    <div class="p-3 border rounded mb-4" style="background:#0F172A; color: #10B981; font-family: monospace; height: 120px; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden;">
                        <div id="invoice-feed" style="font-size: 0.75rem; line-height:1.2;">
                            > Waiting for batch...<br>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary w-full mb-4" id="btn-run-fin-cs">Start Automated Invoice Processing</button>

                    <div id="fin-cs-results" class="hidden">
                        <div class="ai-result-box mb-4" style="border-color: var(--text-main);">
                            <span class="ai-badge">Processing Complete</span>
                            <div class="mt-2 text-sm">
                                <strong>Data Extraction Successful</strong><br>
                                Processed 500 invoices in 2 minutes. Flagged 12 discrepancies for manual review.
                            </div>
                        </div>
                        <div style="height: 250px; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 1rem;">
                            <canvas id="fin-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEC Tech Case Study -->
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">DEC Tech: Vercel App Deployment Simulator</h3></div>
                <div class="card-body">
                    <div class="mb-4">
                        <span class="badge badge-primary mb-2">DevOps & Deployment</span>
                        <p class="text-sm text-muted"><strong>Problem:</strong> Need a fast, reliable, and automated way to deploy internal enterprise web tools.</p>
                        <p class="text-sm text-muted"><strong>AI Solution:</strong> Automated CI/CD pipeline integrated with GitHub and Vercel for seamless deployments.</p>
                    </div>

                    <div class="p-3 border rounded mb-4" style="background:#0F172A; color: #F8FAFC; font-family: monospace; height: 150px; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden;">
                        <div id="vercel-feed" style="font-size: 0.75rem; line-height:1.2;">
                            > Ready to deploy to production...<br>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary w-full mb-4" id="btn-run-tech-cs">Deploy to Vercel</button>

                    <div id="tech-cs-results" class="hidden">
                        <div class="ai-result-box mb-4" style="border-color: var(--success); background: rgba(16, 185, 129, 0.05);">
                            <span class="ai-badge" style="background:var(--success);">Deployment Successful!</span>
                            <div class="mt-2 text-sm">
                                <strong>Application Live</strong><br>
                                Built and deployed successfully in 45 seconds. Global CDN cache updated. Live URL generated.
                            </div>
                        </div>
                        <div style="height: 250px; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 1rem; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                            <span style="font-size: 4rem;">🚀</span>
                            <h3 class="mt-2">Build Completed</h3>
                            <p class="text-muted text-sm">100% Uptime Guaranteed</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEC HR Case Study -->
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">DEC HR: Automated Employee Onboarding</h3></div>
                <div class="card-body">
                    <div class="mb-4">
                        <span class="badge badge-success mb-2">Talent Management</span>
                        <p class="text-sm text-muted"><strong>Problem:</strong> Manual onboarding process takes 2 weeks and HR spends 15 hours per employee.</p>
                        <p class="text-sm text-muted"><strong>AI Solution:</strong> Conversational AI assistant guides new hires through document submission and policy training.</p>
                    </div>

                    <div class="p-3 border rounded mb-4" style="background:var(--bg-card); border:1px solid #cbd5e1;">
                        <h4 class="mb-2 text-sm">Synthetic Project Inputs:</h4>
                        <ul class="text-xs text-muted mb-0" style="padding-left:1.2rem;">
                            <li>New Hires: 50 employees/month</li>
                            <li>Required Documents: ID, Tax Form, Bank Details</li>
                            <li>Current Onboarding Time: 14 days</li>
                        </ul>
                    </div>
                    
                    <button class="btn btn-primary w-full mb-4" id="btn-run-hr-cs">Simulate AI Onboarding</button>

                    <div id="hr-cs-results" class="hidden">
                        <div class="ai-result-box mb-4" style="border-color: var(--success); background: rgba(16, 185, 129, 0.05);">
                            <span class="ai-badge" style="background:var(--success);">Efficiency Unlocked!</span>
                            <div class="mt-2 text-sm">
                                <strong>Onboarding Accelerated</strong><br>
                                Average onboarding time reduced to 3 days, saving 12 hours of HR time per hire.
                            </div>
                        </div>
                        <div style="height: 250px; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 1rem;">
                            <canvas id="hr-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEC Logistics Case Study -->
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">DEC Logistics: Fleet Route Optimization</h3></div>
                <div class="card-body">
                    <div class="mb-4">
                        <span class="badge badge-info mb-2">Supply Chain</span>
                        <p class="text-sm text-muted"><strong>Problem:</strong> High fuel costs and delayed material deliveries due to inefficient truck routing.</p>
                        <p class="text-sm text-muted"><strong>AI Solution:</strong> Real-time AI routing algorithm utilizing traffic, weather, and delivery priorities.</p>
                    </div>

                    <div class="p-3 border rounded mb-4" style="background:#0F172A; color: #38BDF8; font-family: monospace; height: 120px; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden;">
                        <div id="logistics-feed" style="font-size: 0.75rem; line-height:1.2;">
                            > Tracking 120 active fleets...<br>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary w-full mb-4" id="btn-run-logistics-cs">Optimize Routes</button>

                    <div id="logistics-cs-results" class="hidden">
                        <div class="ai-result-box mb-4" style="border-color: var(--info);">
                            <span class="ai-badge">Routes Optimized</span>
                            <div class="mt-2 text-sm">
                                <strong>Cost Savings Achieved</strong><br>
                                Fuel consumption reduced by 18% and on-time deliveries increased by 25%.
                            </div>
                        </div>
                        <div style="height: 250px; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 1rem;">
                            <canvas id="logistics-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEC Safety Case Study -->
            <div class="card mb-8">
                <div class="card-header"><h3 class="card-title">DEC Safety: Site Hazard Detection</h3></div>
                <div class="card-body">
                    <div class="mb-4">
                        <span class="badge badge-danger mb-2">Health & Safety</span>
                        <p class="text-sm text-muted"><strong>Problem:</strong> Manual safety audits are infrequent, leading to overlooked hazards on construction sites.</p>
                        <p class="text-sm text-muted"><strong>AI Solution:</strong> Computer vision analyzing CCTV feeds to detect missing PPE and hazardous zones in real-time.</p>
                    </div>

                    <div class="p-3 border rounded mb-4" style="background:#0F172A; color: #EF4444; font-family: monospace; height: 120px; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden;">
                        <div id="safety-feed" style="font-size: 0.75rem; line-height:1.2;">
                            > Connecting to Site CCTV feeds...<br>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary w-full mb-4" id="btn-run-safety-cs">Start Vision AI Monitoring</button>

                    <div id="safety-cs-results" class="hidden">
                        <div class="ai-result-box mb-4" style="border-color: var(--danger); background: rgba(239, 68, 68, 0.05);">
                            <span class="ai-badge" style="background:var(--danger);">Real-time Alert</span>
                            <div class="mt-2 text-sm">
                                <strong>Safety Improved</strong><br>
                                Automated real-time alerts sent to site managers. Compliance increased by 40%.
                            </div>
                        </div>
                        <div style="height: 250px; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 1rem;">
                            <canvas id="safety-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        let infraChartInst = null;
        document.getElementById('btn-run-infra-cs')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-run-infra-cs');
            btn.disabled = true;
            btn.innerText = "Simulating Scenarios...";
            
            setTimeout(() => {
                document.getElementById('infra-cs-results').classList.remove('hidden');
                btn.innerText = "Scenario Simulated";
                
                if (infraChartInst) infraChartInst.destroy();
                const ctx = document.getElementById('infra-chart').getContext('2d');
                infraChartInst = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Original Plan', 'AI Reallocated Plan'],
                        datasets: [{
                            label: 'Estimated Delay (Days)',
                            data: [14, 2],
                            backgroundColor: ['#ef4444', '#10b981']
                        }]
                    },
                    options: { maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
                });
            }, 800);
        });

        let indChartInst = null;
        document.getElementById('btn-run-ind-cs')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-run-ind-cs');
            btn.disabled = true;
            btn.innerText = "Monitoring...";
            
            let feed = document.getElementById('sensor-feed');
            let count = 0;
            const interval = setInterval(() => {
                count++;
                let v = (2.0 + Math.random() * 0.5).toFixed(2);
                feed.innerHTML += `> Vibration: ${v}mm/s (Normal)<br>`;
                feed.scrollTop = feed.scrollHeight;
                
                if (count > 3) {
                    clearInterval(interval);
                    feed.innerHTML += `<span style="color:#ef4444;">> WARNING: Vibration spiked to 8.7mm/s!</span><br>`;
                    feed.scrollTop = feed.scrollHeight;
                    
                    setTimeout(() => {
                        document.getElementById('ind-cs-results').classList.remove('hidden');
                        btn.innerText = "Analysis Complete";
                        
                        if (indChartInst) indChartInst.destroy();
                        const ctx = document.getElementById('ind-chart').getContext('2d');
                        indChartInst = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25 (Anomaly)'],
                                datasets: [{
                                    label: 'Vibration (mm/s)',
                                    data: [2.1, 2.3, 2.0, 2.2, 2.4, 8.7],
                                    borderColor: '#f59e0b',
                                    tension: 0.1
                                }]
                            },
                            options: { maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
                        });
                    }, 500);
                }
            }, 300);
        });

        let agroChartInst = null;
        document.getElementById('btn-run-agro-cs')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-run-agro-cs');
            btn.disabled = true;
            btn.innerText = "Running Model...";
            
            setTimeout(() => {
                document.getElementById('agro-cs-results').classList.remove('hidden');
                btn.innerText = "Model Executed";
                
                if (agroChartInst) agroChartInst.destroy();
                const ctx = document.getElementById('agro-chart').getContext('2d');
                agroChartInst = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                        datasets: [{
                            label: 'Predicted Yield (Tons)',
                            data: [120, 125, 130, 145, 160],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true,
                            tension: 0.3
                        }]
                    },
                    options: { maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
                });
            }, 800);
        });

        let finChartInst = null;
        document.getElementById('btn-run-fin-cs')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-run-fin-cs');
            btn.disabled = true;
            btn.innerText = "Processing Invoices...";
            
            let feed = document.getElementById('invoice-feed');
            let count = 0;
            const interval = setInterval(() => {
                count++;
                let num = Math.floor(Math.random() * 50) + 10;
                feed.innerHTML += `> Batch ${count}: Processed ${num} invoices. Status: OK<br>`;
                feed.scrollTop = feed.scrollHeight;
                
                if (count > 4) {
                    clearInterval(interval);
                    feed.innerHTML += `<span style="color:#ef4444;">> WARNING: Discrepancy detected in PO-4092. Flagged for review.</span><br>`;
                    feed.scrollTop = feed.scrollHeight;
                    
                    setTimeout(() => {
                        document.getElementById('fin-cs-results').classList.remove('hidden');
                        btn.innerText = "Processing Complete";
                        
                        if (finChartInst) finChartInst.destroy();
                        const ctx = document.getElementById('fin-chart').getContext('2d');
                        finChartInst = new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                labels: ['Auto-Matched', 'Flagged for Review'],
                                datasets: [{
                                    data: [488, 12],
                                    backgroundColor: ['#3b82f6', '#ef4444']
                                }]
                            },
                            options: { maintainAspectRatio: false, cutout: '70%' }
                        });
                    }, 500);
                }
            }, 300);
        });

        document.getElementById('btn-run-tech-cs')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-run-tech-cs');
            btn.disabled = true;
            btn.innerText = "Deploying...";
            
            let feed = document.getElementById('vercel-feed');
            let steps = [
                "> Cloning repository...",
                "> Installing dependencies...",
                "> Running build script (npm run build)...",
                "> Optimizing static assets...",
                "> Assigning custom domains...",
                "<span style='color:#10B981;'>> Deployment successfully completed!</span>"
            ];
            let count = 0;
            const interval = setInterval(() => {
                feed.innerHTML += steps[count] + "<br>";
                feed.scrollTop = feed.scrollHeight;
                count++;
                
                if (count >= steps.length) {
                    clearInterval(interval);
                    
                    setTimeout(() => {
                        document.getElementById('tech-cs-results').classList.remove('hidden');
                        btn.innerText = "Live on Vercel";
                    }, 400);
                }
            }, 400);
        });

        let hrChartInst = null;
        document.getElementById('btn-run-hr-cs')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-run-hr-cs');
            btn.disabled = true;
            btn.innerText = "Simulating Onboarding...";
            
            setTimeout(() => {
                document.getElementById('hr-cs-results').classList.remove('hidden');
                btn.innerText = "Simulation Complete";
                
                if (hrChartInst) hrChartInst.destroy();
                const ctx = document.getElementById('hr-chart').getContext('2d');
                hrChartInst = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Manual Onboarding', 'AI-Assisted Onboarding'],
                        datasets: [{
                            label: 'Days to complete',
                            data: [14, 3],
                            backgroundColor: ['#94a3b8', '#10b981']
                        }]
                    },
                    options: { maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
                });
            }, 800);
        });

        let logisticsChartInst = null;
        document.getElementById('btn-run-logistics-cs')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-run-logistics-cs');
            btn.disabled = true;
            btn.innerText = "Calculating Routes...";
            
            let feed = document.getElementById('logistics-feed');
            let count = 0;
            const interval = setInterval(() => {
                count++;
                let fleet = Math.floor(Math.random() * 50) + 1;
                feed.innerHTML += `> Rerouting Fleet ${fleet} around traffic block...<br>`;
                feed.scrollTop = feed.scrollHeight;
                
                if (count > 4) {
                    clearInterval(interval);
                    feed.innerHTML += `<span style="color:#10b981;">> All routes optimized. ETA updated.</span><br>`;
                    feed.scrollTop = feed.scrollHeight;
                    
                    setTimeout(() => {
                        document.getElementById('logistics-cs-results').classList.remove('hidden');
                        btn.innerText = "Optimization Complete";
                        
                        if (logisticsChartInst) logisticsChartInst.destroy();
                        const ctx = document.getElementById('logistics-chart').getContext('2d');
                        logisticsChartInst = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                                datasets: [{
                                    label: 'Fuel Consumption (Liters)',
                                    data: [5000, 4900, 4100, 4050, 4000],
                                    borderColor: '#3b82f6',
                                    tension: 0.1
                                }]
                            },
                            options: { maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
                        });
                    }, 500);
                }
            }, 300);
        });

        let safetyChartInst = null;
        document.getElementById('btn-run-safety-cs')?.addEventListener('click', () => {
            const btn = document.getElementById('btn-run-safety-cs');
            btn.disabled = true;
            btn.innerText = "Monitoring...";
            
            let feed = document.getElementById('safety-feed');
            let count = 0;
            const interval = setInterval(() => {
                count++;
                feed.innerHTML += `> Scanning Sector ${count}... Status: Clear<br>`;
                feed.scrollTop = feed.scrollHeight;
                
                if (count > 3) {
                    clearInterval(interval);
                    feed.innerHTML += `<span style="color:#ef4444;">> ALERT: Missing Hardhat detected in Zone B!</span><br>`;
                    feed.scrollTop = feed.scrollHeight;
                    
                    setTimeout(() => {
                        document.getElementById('safety-cs-results').classList.remove('hidden');
                        btn.innerText = "Monitoring Active";
                        
                        if (safetyChartInst) safetyChartInst.destroy();
                        const ctx = document.getElementById('safety-chart').getContext('2d');
                        safetyChartInst = new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                labels: ['Compliant', 'Non-Compliant'],
                                datasets: [{
                                    data: [95, 5],
                                    backgroundColor: ['#10b981', '#ef4444']
                                }]
                            },
                            options: { maintainAspectRatio: false, cutout: '70%' }
                        });
                    }, 500);
                }
            }, 300);
        });

    }, 100);
}

function renderProductivityForms(container) {
    const beforeData = State.get('productivityFormBefore');
    const afterData = State.get('productivityFormAfter');
    
    // Choose active tab
    let activeTab = 'before';
    if (beforeData) activeTab = 'after';
    if (beforeData && afterData) activeTab = 'dashboard';
    
    // Temporary state during editing
    let selectedBeforeStars = beforeData ? beforeData.usefulnessRating : 3;
    let selectedBeforeRating = beforeData ? beforeData.chatgptRating : 5;
    let selectedAfterRating = afterData ? afterData.chatgptRating : 8;
    let selectedBeforeHours = beforeData ? beforeData.manualTime : 10;
    let selectedAfterHours = afterData ? afterData.manualTime : 6;
    
    function saveAndPostSubmission(name, type, surveyData) {
        // 1. Save locally in State INSTANTLY (synchronous — zero delay)
        let subs = State.get('localSubmissions') || [];
        const idx = subs.findIndex(s => s.name.toLowerCase() === name.toLowerCase());
        
        if (idx >= 0) {
            subs[idx][type] = surveyData;
            subs[idx].lastUpdated = new Date().toLocaleString();
        } else {
            const newSub = {
                name: name,
                lastUpdated: new Date().toLocaleString()
            };
            newSub[type] = surveyData;
            subs.push(newSub);
        }
        State.set('localSubmissions', subs);
        
        // 2. Fire-and-forget webhook POST (non-blocking — user is NOT made to wait)
        const webhookUrl = (State.get('surveyWebhookUrl') || '').trim();
        if (webhookUrl !== '') {
            const payload = {
                participantName: name,
                type: type,
                data: surveyData,
                timestamp: new Date().toLocaleString()
            };
            fetch(webhookUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(payload)
            }).catch(err => console.warn('Webhook post failed (non-critical):', err));
        }
    }
    
    function renderStars(rating, prefix = '') {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            const isActive = i <= rating;
            starsHtml += `<span class="star-btn" data-star="${i}" data-prefix="${prefix}" style="font-size: 1.75rem; cursor: pointer; color: ${isActive ? 'var(--accent)' : '#CBD5E1'}; margin-right: 0.5rem; transition: color 0.1s;">★</span>`;
        }
        return starsHtml;
    }
    function renderRatingScale(rating, prefix = '') {
        let html = '<div class="flex gap-2 flex-wrap" style="display:flex; gap: 0.5rem; flex-wrap: wrap;">';
        for (let i = 1; i <= 10; i++) {
            const isActive = i === rating;
            html += `<button type="button" class="btn scale-btn ${isActive ? 'btn-primary' : 'btn-secondary'}" data-rating="${i}" data-prefix="${prefix}" style="min-width: 38px; height: 38px; padding: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; font-weight: bold; border: 1px solid ${isActive ? 'var(--primary)' : '#CBD5E1'};"><span style="pointer-events:none;">${i}</span></button>`;
        }
        html += '</div>';
        return html;
    }

    function renderHourSelector(selected, prefix = '', hoursArr = []) {
        let html = '<div class="flex gap-2 flex-wrap" style="display:flex; gap: 0.5rem; flex-wrap: wrap;">';
        hoursArr.forEach(h => {
            const isActive = h === selected;
            html += `<button type="button" class="btn hour-btn ${isActive ? 'btn-primary' : 'btn-secondary'}" data-hour="${h}" data-prefix="${prefix}" style="min-width: 44px; height: 44px; padding: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: 700; font-size: 0.9rem; border: 1px solid ${isActive ? 'var(--primary)' : '#CBD5E1'}; position:relative;"><span style="pointer-events:none;">${h}</span></button>`;
        });
        html += '</div>';
        html += `<div style="margin-top:0.5rem; font-size:0.78rem; color:var(--text-muted);">Selected: <strong style="color:var(--accent);">${selected} hr${selected !== 1 ? 's' : ''} / week</strong></div>`;
        return html;
    }
    
    function drawView() {
        container.innerHTML = `
            <div class="mb-4" style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
                <div style="display:flex; align-items:center; gap: 1.5rem;">
                    <div>
                        <span class="badge badge-info" style="margin-bottom: 0.5rem;">AI Performance Assessment</span>
                        <h2 class="mt-2">AI Productivity &amp; ROI Tracker</h2>
                        <p class="text-muted">Analyze your productivity gains, AI utilization shift, and satisfaction delta before and after the sessions.</p>
                    </div>
                    <div style="width:100px; height:100px; flex-shrink:0; position:relative; display:flex; align-items:center; justify-content:center; margin-top:-20px;">
                        <div style="width:80px; height:80px; background:linear-gradient(135deg,rgba(255,222,89,0.15),rgba(124,58,237,0.08)); border:2px solid rgba(255,222,89,0.5); border-radius:18px; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 30px rgba(0,0,0,0.4),0 0 20px rgba(255,222,89,0.2); animation:modFloat 3s ease-in-out 1.5s infinite; font-size:2.2rem; position:relative;">🤖
                            <div style="position:absolute; top:-3px; right:-3px; width:8px; height:8px; background:#10B981; border-radius:50%; box-shadow:0 0 6px #10B981; animation:blinkDot 1s ease-in-out infinite;"></div>
                        </div>
                        <div style="position:absolute; inset:-6px; border:1px solid rgba(255,222,89,0.15); border-radius:24px; animation:modSpin 6s linear infinite;"></div>
                    </div>
                </div>
                <button id="btn-show-qr" class="btn btn-secondary" style="display:inline-flex; align-items:center; gap:0.5rem; white-space:nowrap; font-weight:600; padding: 0.6rem 1.2rem; border-radius: 8px; flex-shrink:0;" title="Show QR code for employees to scan">
                    <span style="font-size:1.25rem;">📱</span><span class="qr-btn-text"> Show QR Code for Employees</span>
                </button>
            </div>

            <!-- QR Code Modal Overlay -->
            <div id="qr-modal-overlay" style="display:none; position:fixed; inset:0; background:rgba(10,25,47,0.7); z-index:9999; backdrop-filter:blur(6px); animation: fadeInOverlay 0.25s ease;" onclick="if(event.target===this) document.getElementById('qr-modal-overlay').style.display='none';">
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:white; border-radius:20px; box-shadow:0 32px 80px rgba(10,25,47,0.3); padding:2.5rem; max-width:520px; width:90%; text-align:center; animation: scaleInModal 0.25s ease;">
                    <button onclick="document.getElementById('qr-modal-overlay').style.display='none'" style="position:absolute; top:1rem; right:1rem; background:none; border:none; font-size:1.5rem; cursor:pointer; color:#94A3B8; line-height:1;">✕</button>

                    <div style="margin-bottom:0.5rem;">
                        <span style="background:#0A192F; color:white; padding:0.35rem 1rem; border-radius:50px; font-size:0.72rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">DEC AI FOUNDATIONS</span>
                    </div>
                    <h3 style="font-family:var(--font-heading); font-size:1.5rem; color:#0A192F; margin:0.75rem 0 0.4rem;">Employee Feedback QR Code</h3>
                    <p style="font-size:0.85rem; color:#64748B; margin-bottom:1.5rem;">Employees scan this code to directly open the feedback form. Responses are saved to Excel automatically.</p>

                    <div style="display:inline-block; padding:1rem; border:3px solid #0A192F; border-radius:16px; background:white; box-shadow:0 8px 24px rgba(10,25,47,0.12); margin-bottom:1rem;">
                        <div id="qr-modal-code"></div>
                    </div>

                    <div style="background:#F1F5F9; border-radius:8px; padding:0.5rem 1rem; font-size:0.75rem; font-family:monospace; color:#64748B; margin-bottom:1.5rem; word-break:break-all;">
                        https://dec-infra-dec-industries.vercel.app/#/productivity
                    </div>

                    <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap;">
                        <button onclick="window.open('qr-feedback.html','_blank')" style="display:inline-flex; align-items:center; gap:0.5rem; background:#0A192F; color:white; border:none; padding:0.65rem 1.4rem; border-radius:8px; font-size:0.875rem; font-weight:600; cursor:pointer;">🖨️ Open Print Poster</button>
                        <button onclick="downloadQRFromModal()" style="display:inline-flex; align-items:center; gap:0.5rem; background:#F59E0B; color:#0A192F; border:none; padding:0.65rem 1.4rem; border-radius:8px; font-size:0.875rem; font-weight:600; cursor:pointer;">⬇️ Download QR Image</button>
                    </div>

                    <div style="background:#FEF3C7; border:1px solid rgba(245,158,11,0.3); border-radius:8px; padding:0.75rem 1rem; font-size:0.8rem; color:#92400E; margin-top:1.25rem; text-align:left;">
                        💡 <strong>Tip for Sir:</strong> Open the Print Poster page and press Ctrl+P to print a clean A4 QR poster. Place it in the training room before the session starts.
                    </div>
                </div>
            </div>

            <style>
                @keyframes fadeInOverlay { from { opacity:0; } to { opacity:1; } }
                @keyframes scaleInModal { from { opacity:0; transform:translate(-50%,-50%) scale(0.92); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }
            </style>
            
            <div class="flex gap-2 mb-6" style="display: flex; flex-wrap: wrap; gap: 0.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 2rem;">
                <button class="btn tab-btn ${activeTab === 'before' ? 'btn-primary' : 'btn-secondary'}" data-tab="before" style="border-radius: var(--radius-sm);">1. Pre-Session Survey</button>
                <button class="btn tab-btn ${activeTab === 'after' ? 'btn-primary' : 'btn-secondary'} ${!beforeData ? 'disabled' : ''}" data-tab="after" ${!beforeData ? 'disabled' : ''} style="border-radius: var(--radius-sm);">2. Post-Session Feedback</button>
                <button class="btn tab-btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'} ${(!beforeData || !afterData) ? 'disabled' : ''}" data-tab="dashboard" ${(!beforeData || !afterData) ? 'disabled' : ''} style="border-radius: var(--radius-sm);">3. ROI Impact Dashboard</button>
            </div>

            <div id="productivity-tab-content"></div>
        `;
        
        renderTabContent(activeTab);
        bindTabListeners();
        
        // QR Modal Logic
        const qrBtn = document.getElementById('btn-show-qr');
        if (qrBtn) {
            qrBtn.addEventListener('click', () => {
                const overlay = document.getElementById('qr-modal-overlay');
                overlay.style.display = 'block';
                const qrBox = document.getElementById('qr-modal-code');
                if (qrBox && !qrBox._qrGenerated) {
                    qrBox._qrGenerated = true;
                    // Use QRCode.js if loaded, else use Google Charts API
                    if (typeof QRCode !== 'undefined') {
                        new QRCode(qrBox, {
                            text: 'https://dec-infra-dec-industries.vercel.app/#/productivity',
                            width: 200,
                            height: 200,
                            colorDark: '#0A192F',
                            colorLight: '#ffffff',
                            correctLevel: QRCode.CorrectLevel.H
                        });
                    } else {
                        const img = document.createElement('img');
                        img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent('https://dec-infra-dec-industries.vercel.app/#/productivity') + '&color=0A192F&bgcolor=FFFFFF&ecc=H';
                        img.alt = 'Feedback QR Code';
                        img.style.cssText = 'width:200px;height:200px;display:block;border-radius:8px;';
                        qrBox.appendChild(img);
                    }
                }
            });
        }
    }
    
    window.downloadQRFromModal = function() {
        const canvas = document.querySelector('#qr-modal-code canvas');
        if (canvas) {
            const branded = document.createElement('canvas');
            branded.width = canvas.width + 40;
            branded.height = canvas.height + 80;
            const ctx = branded.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, branded.width, branded.height);
            ctx.strokeStyle = '#0A192F';
            ctx.lineWidth = 3;
            ctx.strokeRect(2, 2, branded.width - 4, branded.height - 4);
            ctx.fillStyle = '#0A192F';
            ctx.font = 'bold 13px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('DEC AI FOUNDATIONS', branded.width / 2, 22);
            ctx.fillStyle = '#F59E0B';
            ctx.font = '10px Inter, sans-serif';
            ctx.fillText('EMPLOYEE FEEDBACK PORTAL', branded.width / 2, 38);
            ctx.drawImage(canvas, 20, 48);
            const a = document.createElement('a');
            a.download = 'DEC-AI-Feedback-QR.png';
            a.href = branded.toDataURL('image/png');
            a.click();
        } else {
            // Fallback: download from QR API
            const a = document.createElement('a');
            a.href = 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=' + encodeURIComponent('https://dec-infra-dec-industries.vercel.app/#/productivity') + '&color=0A192F&bgcolor=FFFFFF&ecc=H';
            a.download = 'DEC-AI-Feedback-QR.png';
            a.target = '_blank';
            a.click();
        }
    };
    
    function renderTabContent(tab) {
        const contentDiv = document.getElementById('productivity-tab-content');
        if (!contentDiv) return;
        
        if (tab === 'before') {
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header"><h3 class="card-title">Pre-Session Baseline Survey (Before Training)</h3></div>
                    <div class="card-body">
                        <form id="pre-survey-form">
                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">Your Full Name</label>
                                <input type="text" id="before-name" class="form-control" placeholder="e.g. John Doe" value="${beforeData ? beforeData.name : ''}" required style="max-width: 400px;">
                            </div>

                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">1. What percentage of your daily tasks currently utilize AI?</label>
                                <div class="flex gap-2 flex-wrap survey-radio-group" style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="before-ai-usage" value="10" ${beforeData && beforeData.aiUsagePct === 10 ? 'checked' : ''}> 0% - 10%
                                    </label>
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="before-ai-usage" value="20" ${(!beforeData || beforeData.aiUsagePct === 20) ? 'checked' : ''}> 10% - 20% (Typical Baseline)
                                    </label>
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="before-ai-usage" value="30" ${beforeData && beforeData.aiUsagePct === 30 ? 'checked' : ''}> 20% - 30% (Typical Baseline)
                                    </label>
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="before-ai-usage" value="40" ${beforeData && beforeData.aiUsagePct === 40 ? 'checked' : ''}> 30% - 40%
                                    </label>
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="before-ai-usage" value="50" ${beforeData && beforeData.aiUsagePct >= 50 ? 'checked' : ''}> 50%+
                                    </label>
                                </div>
                            </div>

                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">2. Rate the usefulness of AI in your current daily tasks:</label>
                                <div class="rating-stars-container" id="before-stars">
                                    ${renderStars(selectedBeforeStars, 'before')}
                                </div>
                            </div>

                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">3. How many marks would you give ChatGPT's performance in assisting your work (out of 10)?</label>
                                <div id="before-rating-container">
                                    ${renderRatingScale(selectedBeforeRating, 'before')}
                                </div>
                            </div>

                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">4. How many hours per week do you spend on repetitive Excel formulas, attendance registers, and manual drafting?</label>
                                <div id="before-hours-container">
                                    ${renderHourSelector(selectedBeforeHours, 'before', [1,2,3,4,5,6,7,8,10,12,15,20])}
                                </div>
                            </div>

                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">5. What is the primary blocker keeping you from using AI more?</label>
                                <select id="before-blocker" class="form-control" style="max-width: 500px;">
                                    <option value="training" ${beforeData && beforeData.blocker === 'training' ? 'selected' : ''}>Lack of training & structured prompting knowledge</option>
                                    <option value="security" ${beforeData && beforeData.blocker === 'security' ? 'selected' : ''}>Data security / privacy policies</option>
                                    <option value="accuracy" ${beforeData && beforeData.blocker === 'accuracy' ? 'selected' : ''}>AI hallucinations & inaccuracy</option>
                                    <option value="relevance" ${beforeData && beforeData.blocker === 'relevance' ? 'selected' : ''}>Not applicable or relevant to my specific role</option>
                                </select>
                            </div>

                            <button type="submit" class="btn btn-accent w-full" style="padding: 0.75rem; font-size: 1rem; margin-top: 1rem;">
                                ${beforeData ? 'Update Baseline Survey' : 'Submit Baseline Survey'}
                            </button>
                        </form>
                    </div>
                </div>
            `;
            bindFormListeners('before');
        } else if (tab === 'after') {
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header"><h3 class="card-title">Session Feedback & Impact (After Session)</h3></div>
                    <div class="card-body">
                        <form id="post-survey-form">
                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">Your Full Name</label>
                                <input type="text" id="after-name" class="form-control" placeholder="e.g. John Doe" value="${afterData ? afterData.name : (beforeData ? beforeData.name : '')}" required style="max-width: 400px;">
                            </div>

                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">1. What percentage of your daily tasks do you expect to perform using AI after this training?</label>
                                <div class="flex gap-2 flex-wrap survey-radio-group" style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="after-ai-usage" value="30" ${afterData && afterData.aiUsagePct === 30 ? 'checked' : ''}> 20% - 30%
                                    </label>
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="after-ai-usage" value="40" ${afterData && afterData.aiUsagePct === 40 ? 'checked' : ''}> 30% - 40%
                                    </label>
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="after-ai-usage" value="50" ${(!afterData || afterData.aiUsagePct === 50) ? 'checked' : ''}> 40% - 50% (Typical Impact)
                                    </label>
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="after-ai-usage" value="60" ${afterData && afterData.aiUsagePct === 60 ? 'checked' : ''}> 50% - 60%
                                    </label>
                                </div>
                            </div>

                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">2. Do you feel your daily productivity has increased after learning these AI foundations?</label>
                                <div class="flex gap-2 flex-wrap survey-radio-group" style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="after-productivity" value="high" ${(!afterData || afterData.productivityIncrease === 'high') ? 'checked' : ''}> Yes, significantly (>50% gain)
                                    </label>
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="after-productivity" value="moderate" ${afterData && afterData.productivityIncrease === 'moderate' ? 'checked' : ''}> Yes, moderately (10-50% gain)
                                    </label>
                                    <label class="p-3 border rounded flex items-center gap-2 cursor-pointer" style="background:var(--bg-main); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                        <input type="radio" name="after-productivity" value="none" ${afterData && afterData.productivityIncrease === 'none' ? 'checked' : ''}> Neutral / No major change
                                    </label>
                                </div>
                            </div>

                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">3. How many marks would you give ChatGPT & Claude's performance now (out of 10)?</label>
                                <div id="after-rating-container">
                                    ${renderRatingScale(selectedAfterRating, 'after')}
                                </div>
                            </div>

                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">4. How many hours per week do you expect to spend on repetitive tasks using your AI assistants now?</label>
                                <div id="after-hours-container">
                                    ${renderHourSelector(selectedAfterHours, 'after', [0,1,2,3,4,5,6,7,8,10])}
                                </div>
                            </div>

                            <div class="form-group mb-6" style="margin-bottom: 1.5rem;">
                                <label class="form-label font-bold" style="font-weight: 600; margin-bottom: 0.75rem;">5. Share your key feedback pointers or learning takeaways from this session (minimum 3 bullet points recommended):</label>
                                <textarea id="after-feedback" class="form-control" rows="4" placeholder="e.g., - Learned how to write structured system prompts to act as a Site Manager.\n- Discovered Data Labs to find ledgers anomalies automatically.\n- Gained understanding of green/amber/red data classification rules to prevent leaks." required>${afterData ? afterData.feedbackPointers : ''}</textarea>
                            </div>

                            <button type="submit" class="btn btn-accent w-full" style="padding: 0.75rem; font-size: 1rem; margin-top: 1rem;">
                                ${afterData ? 'Update Feedback & View ROI' : 'Submit Feedback & View ROI'}
                            </button>
                        </form>
                    </div>
                </div>
            `;
            bindFormListeners('after');
        } else if (tab === 'dashboard') {
            const b = State.get('productivityFormBefore');
            const a = State.get('productivityFormAfter');
            if (!b || !a) {
                contentDiv.innerHTML = `<div class="card p-8 text-center text-muted">Complete both forms to unlock the ROI Dashboard.</div>`;
                return;
            }
            
            const timeSaved = Math.max(0, b.manualTime - a.manualTime);
            const timeSavedPct = b.manualTime > 0 ? Math.round((timeSaved / b.manualTime) * 100) : 0;
            const annualHoursSaved = timeSaved * 52;
            const utilityGainPct = Math.round(((a.chatgptRating - b.chatgptRating) / b.chatgptRating) * 100);
            
            contentDiv.innerHTML = `
                <div class="dashboard-hero mb-8 card" style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); color: white; padding: 2rem; border: none;">
                    <h3 style="color: white; margin-bottom: 0.5rem;">🎯 Participant ROI & Productivity Impact Analysis</h3>
                    <p style="opacity: 0.9;" class="text-sm">Real-time productivity comparison derived from your training entries.</p>
                    
                    <div class="flex gap-4 mt-8 flex-wrap" style="display:flex; gap:1.5rem; flex-wrap:wrap; margin-top:2rem;">
                        <div style="flex:1; min-width:180px; background:rgba(255,255,255,0.08); padding:1.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
                            <div class="text-xs" style="color:var(--accent); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">AI Integration</div>
                            <div style="font-size:2.25rem; font-weight:700; margin-top:0.5rem; font-family:var(--font-heading);">${b.aiUsagePct}% ➔ ${a.aiUsagePct}%</div>
                            <div class="text-xs text-muted" style="color:#94A3B8 !important; margin-top:0.25rem;">+${a.aiUsagePct - b.aiUsagePct}% active workflows</div>
                        </div>
                        <div style="flex:1; min-width:180px; background:rgba(255,255,255,0.08); padding:1.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
                            <div class="text-xs" style="color:var(--accent); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">Weekly Time Saved</div>
                            <div style="font-size:2.25rem; font-weight:700; margin-top:0.5rem; font-family:var(--font-heading);">${timeSaved} hrs</div>
                            <div class="text-xs text-muted" style="color:#94A3B8 !important; margin-top:0.25rem;">${timeSavedPct}% reduction in manual delay</div>
                        </div>
                        <div style="flex:1; min-width:180px; background:rgba(255,255,255,0.08); padding:1.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
                            <div class="text-xs" style="color:var(--accent); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">Annual Hours Gained</div>
                            <div style="font-size:2.25rem; font-weight:700; margin-top:0.5rem; font-family:var(--font-heading);">${annualHoursSaved} hrs</div>
                            <div class="text-xs text-muted" style="color:#94A3B8 !important; margin-top:0.25rem;">Reclaimed for core activities</div>
                        </div>
                        <div style="flex:1; min-width:180px; background:rgba(255,255,255,0.08); padding:1.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
                            <div class="text-xs" style="color:var(--accent); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">AI Tool Rating Shift</div>
                            <div style="font-size:2.25rem; font-weight:700; margin-top:0.5rem; font-family:var(--font-heading);">${b.chatgptRating}/10 ➔ ${a.chatgptRating}/10</div>
                            <div class="text-xs text-muted" style="color:#94A3B8 !important; margin-top:0.25rem;">${utilityGainPct >= 0 ? '+' : ''}${utilityGainPct}% output quality jump</div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-grid">
                    <div class="card" style="display: flex; flex-direction: column;">
                        <div class="card-header"><h3 class="card-title">Before vs After AI Capability Shift</h3></div>
                        <div class="card-body" style="height: 280px; position: relative; flex-grow: 1;">
                            <canvas id="roi-chart" style="width: 100%; height: 100%;"></canvas>
                        </div>
                    </div>
                    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div class="card-header" style="margin-bottom: 1rem;"><h3 class="card-title">Key Feedback & Takeaways</h3></div>
                            <div class="card-body" style="padding: 0;">
                                <h4 style="color:var(--accent); margin-bottom: 0.5rem;">Feedback Pointers submitted by ${b.name || 'Participant'}:</h4>
                                <div class="p-4 rounded text-sm mb-4" style="background:var(--bg-main); line-height: 1.6; border-left: 4px solid var(--accent); font-style: italic; white-space: pre-wrap;">"${a.feedbackPointers}"</div>
                                <p class="text-muted text-sm">Your feedback and ROI stats have been logged into the enterprise training system. You can generate a formal PDF summary below.</p>
                            </div>
                        </div>
                        <button class="btn btn-primary w-full" id="btn-export-roi" style="margin-top: 1.5rem;">Export ROI PDF Report & Certificate</button>
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                const ctx = document.getElementById('roi-chart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['AI Usage %', 'Weekly Manual Hrs', 'AI Performance (/10)'],
                        datasets: [
                            {
                                label: 'Pre-Session Baseline',
                                data: [b.aiUsagePct, b.manualTime, b.chatgptRating],
                                backgroundColor: '#EF4444'
                            },
                            {
                                label: 'Post-Session Impact',
                                data: [a.aiUsagePct, a.manualTime, a.chatgptRating],
                                backgroundColor: '#10B981'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: Math.max(100, b.manualTime, a.manualTime)
                            }
                        }
                    }
                });
                
                // PDF Export Listener
                document.getElementById('btn-export-roi')?.addEventListener('click', () => {
                    const today = new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' });
                    const html = `
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@700;800&display=swap');
                            * { box-sizing: border-box; }
                            body { font-family: 'Inter', sans-serif; background: var(--bg-card); color: var(--text-main); margin: 0; padding: 0; }
                        </style>

                        <!-- HEADER BANNER -->
                        <div style="background: linear-gradient(135deg, #0A192F 0%, #112240 60%, #1a3a6b 100%); padding: 2.5rem 3rem; border-radius: 0 0 24px 24px; text-align:center; position:relative; overflow:hidden;">
                            <div style="position:absolute; top:-60px; right:-60px; width:200px; height:200px; background:rgba(245,158,11,0.08); border-radius:50%;"></div>
                            <div style="position:absolute; bottom:-40px; left:-40px; width:160px; height:160px; background:rgba(16,185,129,0.06); border-radius:50%;"></div>
                            <div style="font-size:3rem; margin-bottom:0.5rem;">🏆</div>
                            <div style="font-family:'Outfit',sans-serif; font-size:0.72rem; font-weight:700; color:#F59E0B; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:0.5rem;">Certificate of Completion</div>
                            <h1 style="font-family:'Outfit',sans-serif; color:white; font-size:2rem; margin:0 0 0.25rem; font-weight:800;">DEC AI FOUNDATIONS</h1>
                            <div style="color:rgba(255,255,255,0.6); font-size:0.85rem; margin-bottom:1.5rem;">Enterprise AI Training Program &nbsp;|&nbsp; ${today}</div>
                            <div style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:12px; padding:1.25rem 2rem; display:inline-block; max-width:600px;">
                                <div style="color:rgba(255,255,255,0.7); font-size:0.8rem; margin-bottom:0.4rem;">This certifies that</div>
                                <div style="font-size:1.75rem; font-weight:700; color:white; font-family:'Outfit',sans-serif;">${b.name || 'Participant'}</div>
                                <div style="color:rgba(255,255,255,0.7); font-size:0.85rem; margin-top:0.4rem;">has successfully completed the <strong style="color:#F59E0B;">6-Hour AI Foundations</strong> program covering prompt engineering, data intelligence, safe AI usage & AI assistant building.</div>
                            </div>
                        </div>

                        <!-- ROI METRIC CARDS -->
                        <div style="padding: 2rem 3rem 1rem;">
                            <h2 style="font-family:'Outfit',sans-serif; color:#0A192F; font-size:1.1rem; font-weight:700; margin-bottom:1.25rem; display:flex; align-items:center; gap:0.5rem;">📊 Productivity Impact Summary</h2>
                            <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:2rem;">
                                <div style="background:linear-gradient(135deg,#0A192F,#1a3a6b); border-radius:12px; padding:1.25rem; text-align:center; color:white;">
                                    <div style="font-size:0.68rem; font-weight:700; color:#F59E0B; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.5rem;">AI Integration</div>
                                    <div style="font-size:1.5rem; font-weight:800; font-family:'Outfit',sans-serif;">${b.aiUsagePct}%→${a.aiUsagePct}%</div>
                                    <div style="font-size:0.72rem; color:rgba(255,255,255,0.6); margin-top:0.25rem;">+${a.aiUsagePct-b.aiUsagePct}% shift</div>
                                </div>
                                <div style="background:linear-gradient(135deg,#064e3b,#065f46); border-radius:12px; padding:1.25rem; text-align:center; color:white;">
                                    <div style="font-size:0.68rem; font-weight:700; color:#6EE7B7; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.5rem;">Weekly Time Saved</div>
                                    <div style="font-size:1.5rem; font-weight:800; font-family:'Outfit',sans-serif;">${timeSaved} hrs</div>
                                    <div style="font-size:0.72rem; color:rgba(255,255,255,0.6); margin-top:0.25rem;">${timeSavedPct}% reduction</div>
                                </div>
                                <div style="background:linear-gradient(135deg,#1e1b4b,#312e81); border-radius:12px; padding:1.25rem; text-align:center; color:white;">
                                    <div style="font-size:0.68rem; font-weight:700; color:#A5B4FC; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.5rem;">Annual Hours Gained</div>
                                    <div style="font-size:1.5rem; font-weight:800; font-family:'Outfit',sans-serif;">${annualHoursSaved} hrs</div>
                                    <div style="font-size:0.72rem; color:rgba(255,255,255,0.6); margin-top:0.25rem;">per year reclaimed</div>
                                </div>
                                <div style="background:linear-gradient(135deg,#78350f,#92400e); border-radius:12px; padding:1.25rem; text-align:center; color:white;">
                                    <div style="font-size:0.68rem; font-weight:700; color:#FCD34D; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.5rem;">AI Tool Rating</div>
                                    <div style="font-size:1.5rem; font-weight:800; font-family:'Outfit',sans-serif;">${b.chatgptRating}→${a.chatgptRating}/10</div>
                                    <div style="font-size:0.72rem; color:rgba(255,255,255,0.6); margin-top:0.25rem;">+${a.chatgptRating-b.chatgptRating} marks gain</div>
                                </div>
                            </div>

                            <!-- DETAILED TABLE -->
                            <h2 style="font-family:'Outfit',sans-serif; color:#0A192F; font-size:1rem; font-weight:700; margin-bottom:0.75rem;">📋 Detailed Assessment Comparison</h2>
                            <table style="width:100%; border-collapse:collapse; border-radius:10px; overflow:hidden; font-size:0.875rem; margin-bottom:2rem;">
                                <thead>
                                    <tr style="background:#0A192F; color:white;">
                                        <th style="padding:12px 14px; text-align:left;">Parameter</th>
                                        <th style="padding:12px 14px; text-align:center;">Before Training</th>
                                        <th style="padding:12px 14px; text-align:center;">After Training</th>
                                        <th style="padding:12px 14px; text-align:center; background:#10B981;">Net Gain ✅</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="background:var(--bg-card);">
                                        <td style="padding:12px 14px; font-weight:600; border-bottom:1px solid #E2E8F0;">Daily AI Task Usage</td>
                                        <td style="padding:12px 14px; text-align:center; border-bottom:1px solid #E2E8F0; color:#EF4444; font-weight:600;">${b.aiUsagePct}%</td>
                                        <td style="padding:12px 14px; text-align:center; border-bottom:1px solid #E2E8F0; color:#10B981; font-weight:600;">${a.aiUsagePct}%</td>
                                        <td style="padding:12px 14px; text-align:center; border-bottom:1px solid #E2E8F0; color:#10B981; font-weight:700;">+${a.aiUsagePct-b.aiUsagePct}% Integration</td>
                                    </tr>
                                    <tr style="background:white;">
                                        <td style="padding:12px 14px; font-weight:600; border-bottom:1px solid #E2E8F0;">Weekly Manual Work Hours</td>
                                        <td style="padding:12px 14px; text-align:center; border-bottom:1px solid #E2E8F0; color:#EF4444; font-weight:600;">${b.manualTime} hrs/week</td>
                                        <td style="padding:12px 14px; text-align:center; border-bottom:1px solid #E2E8F0; color:#10B981; font-weight:600;">${a.manualTime} hrs/week</td>
                                        <td style="padding:12px 14px; text-align:center; border-bottom:1px solid #E2E8F0; color:#10B981; font-weight:700;">-${timeSaved} hrs (${timeSavedPct}% saved)</td>
                                    </tr>
                                    <tr style="background:var(--bg-card);">
                                        <td style="padding:12px 14px; font-weight:600;">AI Performance Rating (/10)</td>
                                        <td style="padding:12px 14px; text-align:center; color:#EF4444; font-weight:600;">${b.chatgptRating}/10</td>
                                        <td style="padding:12px 14px; text-align:center; color:#10B981; font-weight:600;">${a.chatgptRating}/10</td>
                                        <td style="padding:12px 14px; text-align:center; color:#10B981; font-weight:700;">+${a.chatgptRating-b.chatgptRating} marks gain</td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- FEEDBACK SECTION -->
                            <h2 style="font-family:'Outfit',sans-serif; color:#0A192F; font-size:1rem; font-weight:700; margin-bottom:0.75rem;">💬 My Key Takeaways & Learnings</h2>
                            <div style="background:#FFFBEB; border:1px solid #F59E0B; border-left:5px solid #F59E0B; border-radius:10px; padding:1.5rem; font-size:0.9rem; line-height:1.8; color:#1E293B; white-space:pre-wrap; margin-bottom:2rem; font-style:italic;">${a.feedbackPointers}</div>

                            <!-- ANNUAL ROI CALLOUT -->
                            <div style="background:linear-gradient(135deg,#ECFDF5,#D1FAE5); border:2px solid #10B981; border-radius:14px; padding:1.5rem 2rem; text-align:center; margin-bottom:1.5rem;">
                                <div style="font-size:0.75rem; font-weight:700; color:#065F46; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:0.5rem;">🌟 Total Annual Productivity Gain</div>
                                <div style="font-size:2.5rem; font-weight:800; color:#065F46; font-family:'Outfit',sans-serif;">${annualHoursSaved} Hours / Year</div>
                                <div style="font-size:0.85rem; color:#047857; margin-top:0.25rem;">Reclaimed from manual tasks · Calculated over 52 business weeks</div>
                            </div>

                            <!-- FOOTER -->
                            <div style="border-top:2px solid #E2E8F0; padding-top:1rem; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#94A3B8;">
                                <span>DEC Infra &amp; DEC Industries &nbsp;|&nbsp; AI Foundations Training</span>
                                <span>Generated: ${today}</span>
                            </div>
                        </div>
                    `;
                    window.downloadPDF('DEC AI Foundations - Productivity ROI Certificate', html);
                });
            }, 100);
        }
    }
    
    function bindTabListeners() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.classList.contains('disabled')) return;
                activeTab = e.target.getAttribute('data-tab');
                drawView();
            });
        });
    }
    
    function bindFormListeners(type) {
        // Star listener
        document.querySelectorAll('.star-btn').forEach(star => {
            star.addEventListener('click', (e) => {
                const val = parseInt(e.target.getAttribute('data-star'));
                const prefix = e.target.getAttribute('data-prefix');
                if (prefix === 'before') {
                    selectedBeforeStars = val;
                    document.getElementById('before-stars').innerHTML = renderStars(selectedBeforeStars, 'before');
                    bindFormListeners('before'); // Rebind listeners on replace
                }
            });
        });
        
        // Rating scale listener
        document.querySelectorAll('.scale-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const val = parseInt(e.target.getAttribute('data-rating') || e.target.closest('.scale-btn')?.getAttribute('data-rating'));
                const prefix = e.target.getAttribute('data-prefix') || e.target.closest('.scale-btn')?.getAttribute('data-prefix');
                if (prefix === 'before') {
                    selectedBeforeRating = val;
                    document.getElementById('before-rating-container').innerHTML = renderRatingScale(selectedBeforeRating, 'before');
                    bindFormListeners('before');
                } else if (prefix === 'after') {
                    selectedAfterRating = val;
                    document.getElementById('after-rating-container').innerHTML = renderRatingScale(selectedAfterRating, 'after');
                    bindFormListeners('after');
                }
            });
        });

        // Hour selector listener
        document.querySelectorAll('.hour-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tgt = e.target.closest('.hour-btn');
                if (!tgt) return;
                const val = parseInt(tgt.getAttribute('data-hour'));
                const prefix = tgt.getAttribute('data-prefix');
                if (prefix === 'before') {
                    selectedBeforeHours = val;
                    document.getElementById('before-hours-container').innerHTML = renderHourSelector(selectedBeforeHours, 'before', [1,2,3,4,5,6,7,8,10,12,15,20]);
                    bindFormListeners('before');
                } else if (prefix === 'after') {
                    selectedAfterHours = val;
                    document.getElementById('after-hours-container').innerHTML = renderHourSelector(selectedAfterHours, 'after', [0,1,2,3,4,5,6,7,8,10]);
                    bindFormListeners('after');
                }
            });
        });
        
        if (type === 'before') {
            document.getElementById('pre-survey-form')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = e.target.querySelector('button[type="submit"]');
                if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = "Saving..."; }
                const name = document.getElementById('before-name').value;
                const usage = parseInt(document.querySelector('input[name="before-ai-usage"]:checked').value);
                const blocker = document.getElementById('before-blocker').value;
                const data = {
                    name: name, aiUsagePct: usage,
                    usefulnessRating: selectedBeforeStars,
                    chatgptRating: selectedBeforeRating,
                    manualTime: selectedBeforeHours, blocker: blocker
                };
                State.set('productivityFormBefore', data);
                saveAndPostSubmission(name, 'before', data); // fire-and-forget
                showToast('✅ Baseline recorded! Now complete your training.', 'success');
                activeTab = 'after';
                drawView();
            });
        } else if (type === 'after') {
            document.getElementById('post-survey-form')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = e.target.querySelector('button[type="submit"]');
                if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = "Saving..."; }
                const name = document.getElementById('after-name').value;
                const usage = parseInt(document.querySelector('input[name="after-ai-usage"]:checked').value);
                const prodIncrease = document.querySelector('input[name="after-productivity"]:checked').value;
                const feedback = document.getElementById('after-feedback').value;
                const data = {
                    name: name, aiUsagePct: usage,
                    productivityIncrease: prodIncrease,
                    chatgptRating: selectedAfterRating,
                    manualTime: selectedAfterHours, feedbackPointers: feedback
                };
                State.set('productivityFormAfter', data);
                saveAndPostSubmission(name, 'after', data); // fire-and-forget
                showToast('🎉 Feedback saved! Your ROI Dashboard is ready.', 'success');
                activeTab = 'dashboard';
                drawView();
            });
        }
    }
    
    // Initial draw call
    drawView();
}

function renderDatasetHub(container) {
    let activeRole = 'procurement';
    
    // Dataset map
    const datasetsMap = {
        procurement: [
            { id: 'procurement_quotes', name: 'Vendor Quotation Comparison', desc: 'Quotation comparison sheet containing rates, items, lead times, and compliance checks.' },
            { id: 'procurement_pos', name: 'Purchase Order (PO) Register', desc: 'Master register of approved POs, values, dates, and budget allocations.' },
            { id: 'procurement_delivery', name: 'Material Delivery Log', desc: 'Comparison of gate entry received quantities vs challan quantity for mismatch identification.' },
            { id: 'procurement_rates', name: 'Rate Contract Discrepancy Index', desc: 'Comparison of invoiced rates against approved standard vendor rates to highlight overcharging.' }
        ],
        finance: [
            { id: 'finance_ledger', name: 'ERP Ledger Transactions', desc: 'General ledger transactions, debits, credits, and reference identifiers for audit.' },
            { id: 'finance_bank', name: 'Bank Statement Log', desc: 'Bank transaction history for matching against ledger entries to reconcile cash flow.' },
            { id: 'finance_gst', name: 'GST Input Tax Credit Invoices', desc: 'Calculated GST tax value vs portal-uploaded GST to detect discrepancies.' },
            { id: 'finance_petty', name: 'Site Petty Cash Vouchers', desc: 'Petty cash payouts from site cashier, flags transactions without matching bills.' }
        ],
        planning: [
            { id: 'planning_progress', name: 'Daily Progress Report (DPR)', desc: 'Site construction target vs actual completed quantities and manpower count.' },
            { id: 'planning_equipment', name: 'Equipment Run & Fuel Log', desc: 'Fuel consumption and runtime hours for excavators/tippers to detect fuel siphoning anomalies.' },
            { id: 'planning_manpower', name: 'Daily Wage Labor Headcount', desc: 'Contractor agency manpower counts vs gate entry logs to audit wage overbilling.' },
            { id: 'planning_qa', name: 'Concrete Cube Strength Register', desc: 'Laboratory compressive testing results for concrete mixes, flagging quality failures.' }
        ],
        hr: [
            { id: 'hr_attendance', name: 'Staff Work Hours & Overtime', desc: 'Timesheet log tracking check-ins, check-outs, hours worked, and unauthorized overtime hours.' },
            { id: 'hr_candidates', name: 'Candidate Interview Screening', desc: 'Applicant experience, evaluation scores, and recruitment outcomes against job requirements.' },
            { id: 'hr_incidents', name: 'Site Incident and Near-Miss Log', desc: 'Log of safety incidents, injured persons, severity levels, and investigation status.' },
            { id: 'hr_training', name: 'Safety Training Compliance Register', desc: 'Induction training records and certificate expiry status of onsite workforce.' }
        ]
    };

    let selectedDatasetId = datasetsMap[activeRole][0].id;
    let currentData = DataEngine.generateDataset(selectedDatasetId, 100);

    function drawView() {
        const currentDataset = datasetsMap[activeRole].find(d => d.id === selectedDatasetId);
        const headers = Object.keys(currentData[0]);
        const previewRows = currentData.slice(0, 10);

        // 1. Build List HTML
        let listHtml = '';
        datasetsMap[activeRole].forEach(d => {
            const isActive = selectedDatasetId === d.id;
            listHtml += `
                <div class="p-3 border rounded cursor-pointer dataset-select-item ${isActive ? 'active-dataset' : ''}" 
                     data-id="${d.id}" 
                     style="border-radius: 6px; border: 1px solid ${isActive ? 'var(--accent)' : '#CBD5E1'}; background: ${isActive ? '#F8FAFC' : 'var(--bg-main)'}; cursor: pointer; transition: all 0.2s;">
                    <h4 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: ${isActive ? 'var(--accent)' : 'var(--text-main)'};">${d.name}</h4>
                    <p class="text-xs text-muted" style="margin: 0.25rem 0 0 0; line-height: 1.4;">${d.desc}</p>
                </div>
            `;
        });

        // 2. Build Headers HTML
        let headersHtml = '';
        headers.forEach(h => {
            const name = h.replace(/([A-Z])/g, ' $1');
            headersHtml += `<th style="padding: 10px; text-transform: capitalize; background: var(--bg-card);">${name}</th>`;
        });

        // 3. Build Rows HTML
        let rowsHtml = '';
        previewRows.forEach(row => {
            rowsHtml += '<tr>';
            headers.forEach(h => {
                const val = row[h];
                let cellStyle = "";
                if (val === 'YES' || val === 'FLAGGED' || val === 'Non-Compliant' || val === 'Blocked / Review' || val === 'FAIL - REJECT LAB RUN' || val === 'EXPIRED') {
                    cellStyle = 'style="color: #EF4444; font-weight: bold;"';
                } else if (val === 'NO' || val === 'Compliant' || val === 'Eligible' || val === 'PASS' || val === 'ACTIVE') {
                    cellStyle = 'style="color: #10B981; font-weight: bold;"';
                }
                rowsHtml += `<td style="padding: 10px;" ${cellStyle}>${val}</td>`;
            });
            rowsHtml += '</tr>';
        });

        container.innerHTML = `
            <div class="mb-6">
                <span class="badge badge-primary" style="margin-bottom: 0.5rem;">Data Intelligence</span>
                <h2 class="mt-2">Synthetic Dataset Hub</h2>
                <p class="text-muted">Generate, preview, and download structured synthetic datasets representing typical construction operations to train your custom assistants.</p>
            </div>

            <!-- Role Selector Tabs -->
            <div class="flex gap-2 mb-6" style="display: flex; flex-wrap: wrap; gap: 0.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">
                <button class="btn role-tab-btn ${activeRole === 'procurement' ? 'btn-primary' : 'btn-secondary'}" data-role="procurement" style="border-radius: var(--radius-sm);">🛠️ Procurement & Supply Chain</button>
                <button class="btn role-tab-btn ${activeRole === 'finance' ? 'btn-primary' : 'btn-secondary'}" data-role="finance" style="border-radius: var(--radius-sm);">💼 Finance & Accounts</button>
                <button class="btn role-tab-btn ${activeRole === 'planning' ? 'btn-primary' : 'btn-secondary'}" data-role="planning" style="border-radius: var(--radius-sm);">🏗️ Planning & Site Operations</button>
                <button class="btn role-tab-btn ${activeRole === 'hr' ? 'btn-primary' : 'btn-secondary'}" data-role="hr" style="border-radius: var(--radius-sm);">👥 HR & Safety Compliance</button>
            </div>

            <div class="dashboard-grid">
                <!-- Left Column: Dataset List -->
                <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                    <h3 style="margin-bottom: 0.5rem; color: var(--text-main);">Select a Training Dataset</h3>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;" id="dataset-list-container">
                        ${listHtml}
                    </div>
                </div>

                <!-- Right Column: Preview and Export -->
                <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div class="flex justify-between items-center" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 1rem;">
                            <div>
                                <h3 style="margin: 0; color: var(--text-main);">${currentDataset.name} Preview</h3>
                                <p class="text-xs text-muted" style="margin: 0.15rem 0 0 0;">Showing 10 of 100 generated rows</p>
                            </div>
                            <div class="flex gap-2" style="display:flex; gap:0.5rem;">
                                <button class="btn btn-secondary btn-small" id="btn-copy-csv" style="display:inline-flex; align-items:center; gap:0.25rem;">📋 Copy CSV</button>
                                <button class="btn btn-primary btn-small" id="btn-download-csv" style="display:inline-flex; align-items:center; gap:0.25rem;">📥 Download CSV</button>
                            </div>
                        </div>

                        <!-- Preview Table -->
                        <div class="table-responsive" style="max-height: 300px; overflow: auto; border: 1px solid var(--border-color); border-radius: 6px; background: var(--bg-main);">
                            <table class="table" style="margin: 0; font-size: 0.85rem;">
                                <thead>
                                    <tr>
                                        ${headersHtml}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rowsHtml}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Instruction Card for uploading to Claude -->
                    <div style="background: rgba(0, 0, 0, 0.3); border-left: 4px solid var(--primary); padding: 1rem; border-radius: 4px; margin-top: 1.5rem; font-size: 0.85rem;">
                        <h4 style="margin: 0 0 0.25rem 0; color: var(--text-main); font-weight: 600;">💡 Training Exercise Tip for Claude Projects:</h4>
                        <p style="margin: 0; color: var(--text-muted); line-height: 1.5;">Click <b>Download CSV</b> to save this file to your computer. Then, open your Claude Project, upload this CSV under the "Project Knowledge" section, and prompt your assistant to audit the file or analyze the records for potential anomalies!</p>
                    </div>
                </div>
            </div>
        `;

        bindListeners();
    }

    function bindListeners() {
        // Role Tab Buttons
        document.querySelectorAll('.role-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                activeRole = e.target.getAttribute('data-role');
                selectedDatasetId = datasetsMap[activeRole][0].id;
                currentData = DataEngine.generateDataset(selectedDatasetId, 100);
                drawView();
            });
        });

        // Dataset List Select Items
        document.querySelectorAll('.dataset-select-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget;
                selectedDatasetId = target.getAttribute('data-id');
                currentData = DataEngine.generateDataset(selectedDatasetId, 100);
                drawView();
            });
        });

        // Copy CSV to Clipboard
        document.getElementById('btn-copy-csv')?.addEventListener('click', () => {
            const csvString = DataEngine.convertToCSV(currentData);
            navigator.clipboard.writeText(csvString);
            showToast('Dataset CSV copied to clipboard!', 'success');
        });

        // Download CSV file
        document.getElementById('btn-download-csv')?.addEventListener('click', () => {
            const csvString = DataEngine.convertToCSV(currentData);
            const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", url);
            downloadAnchor.setAttribute("download", `${selectedDatasetId}_synthetic.csv`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            showToast('CSV file downloaded!', 'success');
        });
    }

    drawView();
}

// --- M3 Global Functions ---
window.toggle = function(el){el.parentElement.classList.toggle('open')}
window.toggleCS = function(el){if(el.classList.contains('case-study'))el.classList.toggle('cs-open')}
window.copyPrompt = function(btn){const t=btn.parentElement.textContent.replace('📋 Copy','').trim();navigator.clipboard.writeText(t).then(()=>{btn.textContent='✓ Copied!';setTimeout(()=>btn.textContent='📋 Copy',2000)});event.stopPropagation()}
