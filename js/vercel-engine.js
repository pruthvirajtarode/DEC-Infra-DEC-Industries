/**
 * DEC AI Foundations - Vercel Deployment Lab
 * A step-by-step guided classroom experience to build & deploy a live AI app.
 * Students follow 5 steps and finish with a real live URL on the internet.
 */

function renderVercelLab(container) {
    const systemPrompt = State.get('capstoneSystemPrompt');
    const hasPrompt = !!systemPrompt;
    const savedLiveUrl = State.get('vercelLiveUrl') || '';
    const stepsCompleted = State.get('vercelStepsCompleted') || {};

    container.innerHTML = `
        <!-- PAGE HEADER -->
        <div style="background: linear-gradient(135deg, #0A192F 0%, #112240 100%); border-radius: 16px; padding: 2rem 2.5rem; margin-bottom: 2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div>
                <span style="background:#F59E0B; color:#0A192F; padding:0.3rem 0.9rem; border-radius:50px; font-size:0.72rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase;">Final Capstone Step</span>
                <h2 style="color:white; margin: 0.6rem 0 0.3rem; font-size:1.75rem; font-family:var(--font-heading);">🚀 Build & Deploy Your AI App</h2>
                <p style="color:rgba(255,255,255,0.65); font-size:0.9rem; margin:0;">Follow the 5 steps below to take your AI assistant from idea → live web app on the internet.</p>
            </div>
            <div style="text-align:center; background:rgba(255,255,255,0.07); border-radius:12px; padding:1rem 1.5rem; min-width:140px;">
                <div id="vl-step-counter" style="font-size:2rem; font-weight:800; color:#F59E0B; font-family:var(--font-heading);">${Object.keys(stepsCompleted).length}/5</div>
                <div style="font-size:0.72rem; color:rgba(255,255,255,0.55); text-transform:uppercase; font-weight:600; letter-spacing:0.08em;">Steps Done</div>
                <div style="margin-top:0.5rem; background:rgba(255,255,255,0.1); border-radius:4px; height:6px; overflow:hidden;">
                    <div style="height:100%; background:#F59E0B; width:${(Object.keys(stepsCompleted).length/5)*100}%; transition:width 0.4s;"></div>
                </div>
            </div>
        </div>

        ${!hasPrompt ? `
        <!-- BLOCKER: No Capstone Prompt -->
        <div class="card" style="border-left: 4px solid var(--warning); margin-bottom:1.5rem;">
            <div class="card-body">
                <h3 style="color:var(--warning); display:flex; align-items:center; gap:0.5rem;">⚠️ Complete Module 4 First!</h3>
                <p style="margin-top:0.5rem;">Sir will teach this step after you finish building your Capstone System Prompt in Module 4.</p>
                <ol style="margin: 1rem 0 1rem 1.5rem; line-height:2;">
                    <li>Go to <strong>M4: Capstone</strong> in the sidebar.</li>
                    <li>Switch to the <strong>🛠️ Department Assistant Builder</strong> tab.</li>
                    <li>Fill out your AI role, context, and rules.</li>
                    <li>Click <strong>"Generate System Prompt & Build"</strong>.</li>
                    <li>Come back here once it's generated!</li>
                </ol>
                <button class="btn btn-primary" onclick="window.location.hash='/module4'" style="margin-top:0.5rem;">
                    Go to Module 4 →
                </button>
            </div>
        </div>
        ` : ''}

        <!-- STEP 1: What is Cloud Deployment? -->
        ${makeStep(1, '☁️', 'What is Cloud Deployment?', 'Theory — Sir Explains', stepsCompleted['1'], `
            <p style="margin-bottom:1rem; line-height:1.7;">Right now your AI assistant exists only as instructions on this screen. <strong>Cloud Deployment</strong> means you package it into a real website and host it on a server that anyone in the world can open from their browser — 24/7, on any device.</p>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); gap:1rem; margin-bottom:1.5rem;">
                <div style="background:linear-gradient(135deg,#0A192F,#1a3a6b); border-radius:12px; padding:1.25rem; text-align:center; color:white;">
                    <div style="font-size:2rem; margin-bottom:0.5rem;">💻</div>
                    <div style="font-weight:700; font-size:0.9rem;">Your Computer</div>
                    <div style="font-size:0.75rem; color:rgba(255,255,255,0.6); margin-top:0.25rem;">Works only locally</div>
                </div>
                <div style="display:flex; align-items:center; justify-content:center; font-size:2rem; color:var(--accent);">→</div>
                <div style="background:linear-gradient(135deg,#064e3b,#065f46); border-radius:12px; padding:1.25rem; text-align:center; color:white;">
                    <div style="font-size:2rem; margin-bottom:0.5rem;">☁️</div>
                    <div style="font-weight:700; font-size:0.9rem;">Vercel Cloud</div>
                    <div style="font-size:0.75rem; color:rgba(255,255,255,0.6); margin-top:0.25rem;">Runs for the whole world</div>
                </div>
                <div style="display:flex; align-items:center; justify-content:center; font-size:2rem; color:var(--accent);">→</div>
                <div style="background:linear-gradient(135deg,#1e1b4b,#312e81); border-radius:12px; padding:1.25rem; text-align:center; color:white;">
                    <div style="font-size:2rem; margin-bottom:0.5rem;">🌐</div>
                    <div style="font-weight:700; font-size:0.9rem;">Your Live URL</div>
                    <div style="font-size:0.75rem; color:rgba(255,255,255,0.6); margin-top:0.25rem;">yourname.vercel.app</div>
                </div>
            </div>

            <div style="background:#FEF3C7; border:1px solid rgba(245,158,11,0.4); border-radius:10px; padding:1rem 1.25rem; font-size:0.85rem; color:#92400E; margin-bottom:1.25rem;">
                💡 <strong>Vercel</strong> is a free cloud platform used by companies like Meta, HashiCorp, and GitHub. It makes deployment as easy as dragging a file. No coding needed!
            </div>

            <div style="background:#ECFDF5; border:1px solid #A7F3D0; border-radius:10px; padding:1rem 1.25rem; font-size:0.85rem; color:#065F46;">
                ✅ <strong>What you will have at the end of this lab:</strong> A real live URL (e.g., <code>dec-myname-ai.vercel.app</code>) that opens your custom AI assistant. You can share it with anyone!
            </div>
        `, 'I understand Cloud Deployment!')}

        <!-- STEP 2: Preview Your AI App -->
        ${makeStep(2, '👁️', 'Preview Your AI Assistant App', 'See what you\'re about to deploy', stepsCompleted['2'], `
            <p style="margin-bottom:1.25rem; line-height:1.7;">Before downloading, let's preview exactly what your deployed app will look like. This is the app that will go live on the internet — a chat interface with <strong>your custom AI assistant</strong> built into it.</p>

            <div style="background:var(--bg-card); border-radius:10px; padding:1.25rem; margin-bottom:1.25rem; border:1px solid #CBD5E1;">
                <h4 style="margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem; color:var(--accent);">📦 What's inside your app file:</h4>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:0.75rem;">
                    <div style="background:rgba(255, 255, 255, 0.05); border-radius:8px; padding:0.9rem; display:flex; align-items:flex-start; gap:0.75rem;">
                        <span style="font-size:1.5rem;">💬</span>
                        <div><div style="font-weight:600; font-size:0.875rem;">Chat Interface</div><div style="font-size:0.78rem; color:#64748B; margin-top:0.2rem;">A full chat UI where users can ask your AI questions</div></div>
                    </div>
                    <div style="background:rgba(255, 255, 255, 0.05); border-radius:8px; padding:0.9rem; display:flex; align-items:flex-start; gap:0.75rem;">
                        <span style="font-size:1.5rem;">🤖</span>
                        <div><div style="font-weight:600; font-size:0.875rem;">Your System Prompt</div><div style="font-size:0.78rem; color:#64748B; margin-top:0.2rem;">Your exact Capstone prompt is embedded inside</div></div>
                    </div>
                    <div style="background:rgba(255, 255, 255, 0.05); border-radius:8px; padding:0.9rem; display:flex; align-items:flex-start; gap:0.75rem;">
                        <span style="font-size:1.5rem;">🌐</span>
                        <div><div style="font-weight:600; font-size:0.875rem;">Single HTML File</div><div style="font-size:0.78rem; color:#64748B; margin-top:0.2rem;">Everything in one file — no server needed to run it</div></div>
                    </div>
                    <div style="background:rgba(255, 255, 255, 0.05); border-radius:8px; padding:0.9rem; display:flex; align-items:flex-start; gap:0.75rem;">
                        <span style="font-size:1.5rem;">📱</span>
                        <div><div style="font-weight:600; font-size:0.875rem;">Mobile Responsive</div><div style="font-size:0.78rem; color:#64748B; margin-top:0.2rem;">Works on phones, tablets, and computers</div></div>
                    </div>
                </div>
            </div>

            ${hasPrompt ? `
            <div style="background:#0F172A; border-radius:12px; padding:1rem 1.25rem; margin-bottom:1rem;">
                <div style="color:#38BDF8; font-size:0.75rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.5rem;">Your System Prompt Preview</div>
                <div style="color:#CBD5E1; font-size:0.8rem; line-height:1.6; font-family:monospace; max-height:120px; overflow-y:auto; white-space:pre-wrap;">${systemPrompt.substring(0, 400)}${systemPrompt.length > 400 ? '...' : ''}</div>
            </div>` : ''}

            <div style="background:#DBEAFE; border:1px solid #93C5FD; border-radius:10px; padding:1rem 1.25rem; font-size:0.85rem; color:#1E40AF;">
                ℹ️ <strong>Note for Sir:</strong> The app uses simulated AI responses. To connect to a real Claude or ChatGPT API, students paste their system prompt into Claude.ai Projects or use an API key — covered in future sessions.
            </div>
        `, 'Understood — Let\'s Download!')}

        <!-- STEP 3: Download Your App -->
        ${makeStep(3, '⬇️', 'Download Your AI App', 'Get the file ready on your computer', stepsCompleted['3'], `
            <p style="margin-bottom:1.25rem; line-height:1.7;">Click the button below to download your AI assistant as a single HTML file. This is the file you will upload to Vercel in the next step.</p>

            <div style="background:var(--bg-card); border:2px dashed #CBD5E1; border-radius:12px; padding:2rem; text-align:center; margin-bottom:1.5rem;">
                <div style="font-size:3rem; margin-bottom:0.75rem;">📄</div>
                <div style="font-weight:700; color:var(--accent); font-size:1.1rem; margin-bottom:0.25rem;">my-ai-assistant.html</div>
                <div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1.5rem;">Single file · HTML · ~15KB · Ready to deploy</div>
                ${hasPrompt ? `
                <button class="btn btn-accent" id="btn-download-app" style="font-size:1rem; padding:0.85rem 2.5rem; border-radius:10px; font-weight:700; box-shadow:0 4px 14px rgba(245,158,11,0.3);">
                    ⬇️ Download My AI App
                </button>` : `
                <div style="color:#EF4444; font-size:0.9rem; font-weight:600;">⚠️ Complete Module 4 first to enable download.</div>`}
            </div>

            <div style="background:#FEF3C7; border-radius:10px; padding:1rem 1.25rem; font-size:0.85rem; color:#92400E; margin-bottom:1rem;">
                <strong>📁 After downloading:</strong>
                <ul style="margin: 0.5rem 0 0 1.25rem; line-height:1.9;">
                    <li>Find the file in your <strong>Downloads</strong> folder.</li>
                    <li>You can also open it in your browser to test it locally first.</li>
                    <li>Keep it ready — you'll drag it into Vercel in Step 4.</li>
                </ul>
            </div>

            <div style="background:#ECFDF5; border:1px solid #A7F3D0; border-radius:10px; padding:1rem 1.25rem; font-size:0.85rem; color:#065F46;">
                💡 <strong>Tip:</strong> Rename the file to something memorable like <code>dec-pruthvi-ai.html</code> — Vercel will use this name as part of your URL!
            </div>
        `, 'I Downloaded the File!')}

        <!-- STEP 4: Deploy to Vercel -->
        ${makeStep(4, '🚀', 'Deploy to Vercel (Go Live!)', 'Your app goes on the internet', stepsCompleted['4'], `
            <p style="margin-bottom:1.5rem; line-height:1.7;">Now we deploy! Follow these exact steps — Sir will show this on the projector. By the end, you'll have a <strong>real live URL</strong>.</p>

            <div style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem;">

                <div style="display:flex; gap:1rem; align-items:flex-start; background:rgba(255, 255, 255, 0.05); border:1px solid #E2E8F0; border-radius:12px; padding:1.1rem 1.25rem;">
                    <div style="background:#0A192F; color:white; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.9rem; flex-shrink:0;">1</div>
                    <div>
                        <div style="font-weight:700; color:var(--accent); margin-bottom:0.25rem;">Open Vercel.com</div>
                        <div style="font-size:0.85rem; color:#64748B; line-height:1.6;">Go to <a href="https://vercel.com/signup" target="_blank" style="color:#3B82F6; font-weight:600;">vercel.com/signup</a> → Sign up with <strong>GitHub</strong> or your Email. It's 100% free. No credit card needed.</div>
                    </div>
                </div>

                <div style="display:flex; gap:1rem; align-items:flex-start; background:rgba(255, 255, 255, 0.05); border:1px solid #E2E8F0; border-radius:12px; padding:1.1rem 1.25rem;">
                    <div style="background:#0A192F; color:white; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.9rem; flex-shrink:0;">2</div>
                    <div>
                        <div style="font-weight:700; color:var(--accent); margin-bottom:0.25rem;">Click "Add New Project"</div>
                        <div style="font-size:0.85rem; color:#64748B; line-height:1.6;">On your Vercel dashboard, find the <strong>"Add New"</strong> or <strong>"Deploy"</strong> button. Look for an option that says <strong>"Browse" or drag a file</strong> (not GitHub import).</div>
                    </div>
                </div>

                <div style="display:flex; gap:1rem; align-items:flex-start; background:#FFFBEB; border:1px solid #F59E0B; border-radius:12px; padding:1.1rem 1.25rem;">
                    <div style="background:#F59E0B; color:white; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.9rem; flex-shrink:0;">3</div>
                    <div>
                        <div style="font-weight:700; color:#92400E; margin-bottom:0.25rem;">⭐ Drag & Drop Your File</div>
                        <div style="font-size:0.85rem; color:#92400E; line-height:1.6;">Drag your <strong>my-ai-assistant.html</strong> file from Downloads and <strong>drop it into the Vercel upload zone</strong>. Vercel detects it automatically!</div>
                    </div>
                </div>

                <div style="display:flex; gap:1rem; align-items:flex-start; background:rgba(255, 255, 255, 0.05); border:1px solid #E2E8F0; border-radius:12px; padding:1.1rem 1.25rem;">
                    <div style="background:#0A192F; color:white; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.9rem; flex-shrink:0;">4</div>
                    <div>
                        <div style="font-weight:700; color:var(--accent); margin-bottom:0.25rem;">Click "Deploy" and Wait 30 Seconds</div>
                        <div style="font-size:0.85rem; color:#64748B; line-height:1.6;">Vercel builds your app in the cloud. You'll see a progress bar. In about 30 seconds, you'll see a <strong>🎉 success screen with confetti</strong>!</div>
                    </div>
                </div>

                <div style="display:flex; gap:1rem; align-items:flex-start; background:#ECFDF5; border:1px solid #A7F3D0; border-radius:12px; padding:1.1rem 1.25rem;">
                    <div style="background:#10B981; color:white; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.9rem; flex-shrink:0;">5</div>
                    <div>
                        <div style="font-weight:700; color:#065F46; margin-bottom:0.25rem;">Copy Your Live URL 🎉</div>
                        <div style="font-size:0.85rem; color:#065F46; line-height:1.6;">Vercel gives you a live URL like <code style="background:#D1FAE5; padding:0.1rem 0.4rem; border-radius:4px;">dec-pruthvi-ai.vercel.app</code>. Click it to confirm your app is live — then copy the URL and enter it in Step 5!</div>
                    </div>
                </div>
            </div>

            <div style="background:#0F172A; border-radius:12px; padding:1.25rem; display:flex; align-items:center; gap:1rem; flex-wrap:wrap;">
                <span style="font-size:2rem;">📹</span>
                <div>
                    <div style="color:white; font-weight:700; font-size:0.9rem;">Need help? Watch the 2-min demo</div>
                    <a href="https://vercel.com/docs/deployments/overview" target="_blank" style="color:#38BDF8; font-size:0.82rem; text-decoration:none;">→ vercel.com/docs/deployments</a>
                </div>
            </div>
        `, 'My App is Live on Vercel! 🚀')}

        <!-- STEP 5: Share Your Live URL -->
        ${makeStep(5, '🌐', 'Share Your Live App URL', 'You\'re officially a developer!', stepsCompleted['5'], `
            <p style="margin-bottom:1.25rem; line-height:1.7;">Congratulations! Paste your live Vercel URL below and share it with Sir and your colleagues. This is your proof that you built and deployed a real AI web application!</p>

            <div style="background:rgba(255, 255, 255, 0.05); border:2px solid #E2E8F0; border-radius:12px; padding:1.25rem; margin-bottom:1.25rem;">
                <label style="font-weight:700; font-size:0.9rem; color:var(--accent); display:block; margin-bottom:0.75rem;">🔗 Paste Your Live Vercel URL:</label>
                <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                    <input type="url" id="vl-live-url" class="form-control" placeholder="https://your-app-name.vercel.app" value="${savedLiveUrl}" style="flex:1; min-width:200px;">
                    <button class="btn btn-primary" id="btn-save-url" style="white-space:nowrap;">Save & Open →</button>
                </div>
                ${savedLiveUrl ? `
                <div style="margin-top:0.75rem; padding:0.6rem 1rem; background:#ECFDF5; border-radius:8px; display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; color:#065F46;">
                    ✅ <strong>Your app is live at:</strong>
                    <a href="${savedLiveUrl}" target="_blank" style="color:#059669; font-weight:700; word-break:break-all;">${savedLiveUrl}</a>
                </div>` : ''}
            </div>

            <div style="background:linear-gradient(135deg,#0A192F,#112240); border-radius:14px; padding:2rem; text-align:center; margin-bottom:1.25rem;">
                <div style="font-size:3rem; margin-bottom:0.5rem;">🏆</div>
                <div style="color:#F59E0B; font-size:0.72rem; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:0.5rem;">Achievement Unlocked</div>
                <div style="color:white; font-size:1.4rem; font-weight:800; font-family:var(--font-heading); margin-bottom:0.5rem;">AI App Developer</div>
                <div style="color:rgba(255,255,255,0.65); font-size:0.85rem; max-width:380px; margin:0 auto;">You have designed, built, and deployed a custom AI assistant to the cloud. You are now officially a developer!</div>
            </div>

            <div style="background:#FEF3C7; border:1px solid rgba(245,158,11,0.35); border-radius:10px; padding:1rem 1.25rem; font-size:0.85rem; color:#92400E;">
                <strong>📣 Share it!</strong>
                <ul style="margin: 0.5rem 0 0 1.25rem; line-height:1.9;">
                    <li>Send the link to <strong>Vipul Sir</strong> on WhatsApp to complete the session.</li>
                    <li>Share it with your colleagues — they can test your AI assistant!</li>
                    <li>Add it to your <strong>LinkedIn profile</strong> as a project!</li>
                </ul>
            </div>
        `, '🎉 I Shared My Live App!')}

        <!-- COMPLETION BANNER (shows when all done) -->
        <div id="vl-completion-banner" style="display:${Object.keys(stepsCompleted).length === 5 ? 'block' : 'none'}; margin-top:1.5rem;">
            <div style="background:linear-gradient(135deg,#064e3b,#065f46); border-radius:16px; padding:2rem; text-align:center;">
                <div style="font-size:3rem; margin-bottom:0.75rem;">🎊</div>
                <h3 style="color:white; margin-bottom:0.5rem; font-size:1.5rem;">All Steps Complete — Mission Accomplished!</h3>
                <p style="color:rgba(255,255,255,0.75); font-size:0.9rem; max-width:480px; margin:0 auto 1.5rem;">You've gone from learning AI prompting to deploying a real web application. That's the full journey — from trainee to developer!</p>
                ${savedLiveUrl ? `<a href="${savedLiveUrl}" target="_blank" class="btn" style="background:#F59E0B; color:#0A192F; font-weight:800; padding:0.8rem 2rem; border-radius:10px; font-size:1rem; text-decoration:none;">Open My Live App 🚀</a>` : ''}
            </div>
        </div>
    `;

    // Bind step complete buttons
    container.querySelectorAll('.vl-complete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const step = btn.getAttribute('data-step');
            const completed = State.get('vercelStepsCompleted') || {};
            completed[step] = true;
            State.set('vercelStepsCompleted', completed);
            showToast(`✅ Step ${step} marked complete!`, 'success');
            renderVercelLab(container);
        });
    });

    // Collapse/expand steps
    container.querySelectorAll('.vl-step-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const body = toggle.closest('.vl-step-card').querySelector('.vl-step-body');
            const icon = toggle.querySelector('.vl-chevron');
            const isOpen = body.style.display !== 'none';
            body.style.display = isOpen ? 'none' : 'block';
            if (icon) icon.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0deg)';
        });
    });

    // Download button
    if (hasPrompt) {
        document.getElementById('btn-download-app')?.addEventListener('click', () => {
            generateAndDownloadApp(systemPrompt);
        });
    }

    // Save URL button
    document.getElementById('btn-save-url')?.addEventListener('click', () => {
        const url = document.getElementById('vl-live-url').value.trim();
        if (!url) { showToast('Please paste your Vercel URL first.', 'error'); return; }
        if (!url.startsWith('http')) { showToast('Please enter a valid URL starting with https://', 'error'); return; }
        State.set('vercelLiveUrl', url);
        window.open(url, '_blank');
        showToast('🎉 Live URL saved! Opening your app...', 'success');
        renderVercelLab(container);
    });
}

// Helper: build a single collapsible step card
function makeStep(num, icon, title, subtitle, isCompleted, bodyHtml, completeBtnLabel) {
    const borderColor = isCompleted ? '#10B981' : 'var(--border-color)';
    const headerBg = isCompleted ? '#ECFDF5' : 'white';
    const isOpen = !isCompleted; // Open if not yet completed

    return `
    <div class="vl-step-card" style="border:2px solid ${borderColor}; border-radius:14px; margin-bottom:1rem; overflow:hidden; transition:border-color 0.3s;">
        <!-- Step Header (clickable toggle) -->
        <div class="vl-step-toggle" style="background:${headerBg}; padding:1rem 1.25rem; cursor:pointer; display:flex; align-items:center; gap:1rem; user-select:none;">
            <div style="width:44px; height:44px; border-radius:50%; background:${isCompleted ? '#10B981' : '#0A192F'}; color:white; display:flex; align-items:center; justify-content:center; font-size:${isCompleted ? '1.2rem' : '0.9rem'}; font-weight:800; flex-shrink:0;">
                ${isCompleted ? '✓' : num}
            </div>
            <div style="flex:1;">
                <div style="font-weight:700; font-size:0.95rem; color:${isCompleted ? '#065F46' : 'var(--primary)'};">
                    ${icon} Step ${num}: ${title}
                </div>
                <div style="font-size:0.78rem; color:${isCompleted ? '#059669' : 'var(--text-muted)'}; margin-top:0.15rem;">
                    ${isCompleted ? '✅ Completed' : subtitle}
                </div>
            </div>
            <div class="vl-chevron" style="font-size:1.2rem; color:var(--text-muted); transition:transform 0.2s; transform:rotate(${isOpen ? '0' : '-90'}deg);">⌄</div>
        </div>

        <!-- Step Body -->
        <div class="vl-step-body" style="display:${isOpen ? 'block' : 'none'}; padding:1.5rem; border-top:1px solid ${borderColor}; background:var(--bg-main);">
            ${bodyHtml}

            ${!isCompleted ? `
            <div style="margin-top:1.5rem; padding-top:1.25rem; border-top:1px solid var(--border-color);">
                <button class="btn btn-success vl-complete-btn" data-step="${num}" style="font-weight:700; padding:0.7rem 1.75rem; border-radius:8px; display:inline-flex; align-items:center; gap:0.5rem;">
                    ✓ ${completeBtnLabel}
                </button>
            </div>` : `
            <div style="margin-top:1rem; padding:0.75rem 1rem; background:#ECFDF5; border-radius:8px; color:#065F46; font-size:0.85rem; font-weight:600;">
                ✅ Step ${num} completed!
            </div>`}
        </div>
    </div>`;
}

function generateAndDownloadApp(systemPrompt) {
    const escapedPrompt = systemPrompt.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    const displayPrompt = systemPrompt
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My DEC AI Assistant</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
    <style>
        :root { --navy: #0A192F; --accent: #F59E0B; --blue: #3B82F6; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #0A192F 0%, #0f2a4a 50%, #0A192F 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.5rem 1rem;
        }
        .app-wrapper { width: 100%; max-width: 780px; }

        /* Header */
        .header {
            background: var(--navy);
            border-radius: 16px 16px 0 0;
            padding: 1.25rem 1.75rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px solid var(--accent);
        }
        .header-brand { display: flex; align-items: center; gap: 0.75rem; }
        .header-avatar {
            width: 42px; height: 42px;
            background: linear-gradient(135deg, var(--accent), #d97706);
            border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.3rem;
        }
        .header h1 { font-family: 'Outfit', sans-serif; font-size: 1.1rem; color: white; font-weight: 700; }
        .header p { font-size: 0.75rem; color: rgba(255,255,255,0.55); margin-top: 0.1rem; }
        .badge { background: rgba(245,158,11,0.2); color: var(--accent); padding: 0.3rem 0.85rem; border-radius: 99px; font-size: 0.72rem; font-weight: 700; border: 1px solid rgba(245,158,11,0.3); letter-spacing: 0.05em; }

        /* Tabs */
        .tabs { display: flex; background: #0d1f35; gap: 1px; }
        .tab-btn {
            flex: 1; padding: 0.85rem; border: none; cursor: pointer;
            background: #0d1f35; color: rgba(255,255,255,0.45); font-size: 0.875rem; font-weight: 500;
            border-bottom: 3px solid transparent; transition: all 0.2s; font-family: 'Inter', sans-serif;
        }
        .tab-btn:hover { color: rgba(255,255,255,0.8); }
        .tab-btn.active { color: white; border-bottom-color: var(--accent); background: #0A192F; }

        /* Chat */
        .tab-content { background:var(--bg-card); border-radius: 0 0 16px 16px; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,0.4); }
        .chat-area { height: 60vh; display: flex; flex-direction: column; }
        .messages {
            flex-grow: 1; padding: 1.25rem; overflow-y: auto;
            display: flex; flex-direction: column; gap: 0.9rem;
            background:rgba(255, 255, 255, 0.05);
        }
        .message {
            max-width: 82%; padding: 0.85rem 1.1rem;
            border-radius: 14px; line-height: 1.6; font-size: 0.88rem;
            animation: fadeUp 0.2s ease;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
        .message.bot { background:var(--bg-card); color: #334155; align-self: flex-start; border-bottom-left-radius: 4px; }
        .message.bot .bot-label { font-size: 0.68rem; font-weight: 700; color: var(--accent); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.35rem; display: block; }
        .message.user { background: linear-gradient(135deg, #0A192F, #1a3a6b); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
        .typing-indicator { display: flex; align-items: center; gap: 4px; padding: 0.75rem 1rem; background:var(--bg-card); border-radius: 14px; border-bottom-left-radius: 4px; align-self: flex-start; }
        .typing-indicator span { width: 7px; height: 7px; background: #94A3B8; border-radius: 50%; animation: bounce 1.4s infinite both; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.16s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.32s; }
        @keyframes bounce { 0%,80%,100% { transform:scale(0.6); } 40% { transform:scale(1); } }

        .input-area {
            padding: 1rem 1.25rem; background:rgba(255, 255, 255, 0.05);
            border-top: 1px solid #E2E8F0; display: flex; gap: 0.5rem;
        }
        input[type=text] {
            flex-grow: 1; padding: 0.75rem 1rem; border: 2px solid #E2E8F0;
            border-radius: 10px; outline: none; font-size: 0.9rem; font-family: 'Inter', sans-serif;
            transition: border-color 0.2s;
        }
        input[type=text]:focus { border-color: var(--accent); }
        .send-btn {
            background: linear-gradient(135deg, var(--accent), #d97706);
            color: white; border: none;
            padding: 0.75rem 1.4rem; border-radius: 10px;
            cursor: pointer; font-weight: 700; font-size: 0.9rem;
            transition: all 0.2s; font-family: 'Inter', sans-serif;
        }
        .send-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(245,158,11,0.35); }
        .send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* Prompt Panel */
        .prompt-panel { padding: 1.5rem; display: none; background:rgba(255, 255, 255, 0.05); }
        .prompt-panel.active { display: block; }
        .prompt-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem; }
        .info-box {
            background: #ECFDF5; border: 1px solid #A7F3D0;
            border-radius: 10px; padding: 0.9rem 1.1rem; margin-bottom: 1rem;
            font-size: 0.85rem; color: #065F46; display: flex; align-items: flex-start; gap: 0.5rem;
        }
        .prompt-box {
            background: #0F172A; color: #38BDF8;
            font-family: 'Courier New', monospace; font-size: 0.8rem;
            padding: 1.5rem; border-radius: 10px; white-space: pre-wrap;
            line-height: 1.7; max-height: 50vh; overflow-y: auto;
            border: 1px solid #1E3A5F;
        }
        .copy-btn {
            background: #1E293B; color: white; border: none;
            padding: 0.5rem 1.1rem; border-radius: 8px; cursor: pointer;
            font-size: 0.8rem; font-family: 'Inter', sans-serif; font-weight: 600;
            transition: background 0.2s;
        }
        .copy-btn:hover { background: #334155; }

        /* Suggested Prompts */
        .suggestions { padding: 0.75rem 1.25rem; background:var(--bg-card); border-top: 1px solid #E2E8F0; display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .suggest-btn {
            background:rgba(255, 255, 255, 0.05); border: 1px solid #CBD5E1; border-radius: 20px;
            padding: 0.4rem 0.9rem; font-size: 0.78rem; color: #475569;
            cursor: pointer; transition: all 0.15s; font-family: 'Inter', sans-serif;
        }
        .suggest-btn:hover { background: var(--navy); color: white; border-color: var(--navy); }

        /* Footer */
        .footer { text-align: center; color: rgba(255,255,255,0.3); font-size: 0.72rem; margin-top: 1rem; }
        .footer a { color: rgba(255,255,255,0.5); text-decoration: none; }
        .footer a:hover { color: var(--accent); }
    </style>
</head>
<body>

<div class="app-wrapper">
    <div class="header">
        <div class="header-brand">
            <div class="header-avatar">🤖</div>
            <div>
                <h1>My DEC AI Assistant</h1>
                <p>Powered by DEC AI Foundations Training</p>
            </div>
        </div>
        <span class="badge">AI-POWERED</span>
    </div>

    <div class="tabs">
        <button class="tab-btn active" onclick="switchTab('chat')">💬 Chat</button>
        <button class="tab-btn" onclick="switchTab('prompt')">📄 View System Prompt</button>
    </div>

    <div class="tab-content">
        <div class="chat-area" id="chat-panel">
            <div class="messages" id="chat-messages">
                <div class="message bot">
                    <span class="bot-label">🤖 AI Assistant</span>
                    <strong>Hello! I'm your custom AI Assistant.</strong><br><br>
                    I was built during the <strong>DEC AI Foundations</strong> training program. My behavior and expertise are defined by a <strong>custom System Prompt</strong> — tap the "📄 View System Prompt" tab to see it.<br><br>
                    How can I assist you today?
                </div>
            </div>
            <div class="suggestions" id="suggestions-bar">
                <button class="suggest-btn" onclick="sendSuggestion('What can you help me with?')">What can you help me with?</button>
                <button class="suggest-btn" onclick="sendSuggestion('Tell me about your capabilities')">Your capabilities</button>
                <button class="suggest-btn" onclick="sendSuggestion('Give me a quick summary of your role')">Your role</button>
            </div>
            <div class="input-area">
                <input type="text" id="chat-input" placeholder="Ask your AI assistant anything..." autocomplete="off">
                <button class="send-btn" id="send-btn">Send ➤</button>
            </div>
        </div>

        <div class="prompt-panel" id="prompt-panel">
            <div class="prompt-header">
                <h3 style="color:#0A192F; font-family:'Outfit',sans-serif;">Your Custom System Prompt</h3>
                <button class="copy-btn" onclick="copyPrompt()">📋 Copy to Clipboard</button>
            </div>
            <div class="info-box">
                ✅ <div><strong>This is your active System Prompt.</strong> Copy it into <a href="https://claude.ai" target="_blank" style="color:#059669;">Claude.ai Projects</a> → Custom Instructions to connect a real AI model to this interface!</div>
            </div>
            <div class="prompt-box" id="prompt-display">${displayPrompt}</div>
        </div>
    </div>
</div>

<div class="footer">Built with ❤️ at DEC AI Foundations &nbsp;·&nbsp; <a href="https://dec-infra-dec-industries.vercel.app" target="_blank">DEC Training Platform</a> &nbsp;·&nbsp; Deployed via Vercel</div>

<script>
    const SYSTEM_PROMPT = \`${escapedPrompt}\`;

    const responses = [
        "Based on my training as your AI assistant, I can help with queries related to my configured role. Could you provide more specific details so I can give you a precise answer?",
        "That's a great question! According to my system configuration, I'm designed to assist with tasks related to my department's workflow. Let me think through this for you...",
        "I'm analyzing your request. My guidelines specify that I should provide structured, accurate information based on the data and context I've been given. Here's what I can tell you:",
        "Excellent point! My role is to provide insights and support based on the information in my system prompt. For this type of query, I would recommend reviewing the relevant data first.",
        "Thank you for your question. As an AI assistant configured for this department, I'll do my best to guide you. For the most accurate answer, please also verify with your team lead.",
    ];
    let msgCount = 0;

    const messagesDiv = document.getElementById('chat-messages');
    const input = document.getElementById('chat-input');
    const btn = document.getElementById('send-btn');

    function switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach((b, i) => {
            b.classList.toggle('active', (tab === 'chat' && i === 0) || (tab === 'prompt' && i === 1));
        });
        document.getElementById('chat-panel').style.display = tab === 'chat' ? 'flex' : 'none';
        document.getElementById('prompt-panel').classList.toggle('active', tab === 'prompt');
    }

    function addMessage(text, isUser) {
        const div = document.createElement('div');
        div.className = 'message ' + (isUser ? 'user' : 'bot');
        div.innerHTML = isUser ? text : '<span class="bot-label">🤖 AI Assistant</span>' + text;
        messagesDiv.appendChild(div);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        document.getElementById('suggestions-bar').style.display = 'none';
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = 'typing-indicator';
        div.innerHTML = '<span></span><span></span><span></span>';
        messagesDiv.appendChild(div);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function removeTyping() {
        document.getElementById('typing-indicator')?.remove();
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, true);
        input.value = '';
        btn.disabled = true;
        showTyping();
        setTimeout(() => {
            removeTyping();
            const reply = responses[msgCount % responses.length];
            msgCount++;
            addMessage(reply + '<br><br><em style="font-size:0.78rem; color:#94A3B8;">💡 Connect a real Claude API key to get live AI responses!</em>', false);
            btn.disabled = false;
            input.focus();
        }, 1000 + Math.random() * 800);
    }

    function sendSuggestion(text) {
        input.value = text;
        handleSend();
    }

    function copyPrompt() {
        navigator.clipboard.writeText(SYSTEM_PROMPT).then(() => {
            const btn = document.querySelector('.copy-btn');
            btn.textContent = '✅ Copied!';
            setTimeout(() => btn.textContent = '📋 Copy to Clipboard', 2000);
        });
    }

    btn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
</script>

</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-ai-assistant.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('✅ App downloaded! Open the file to preview it, then drag it to Vercel.', 'success');
}

window.renderVercelLab = renderVercelLab;
