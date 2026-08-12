/**
 * DEC AI Foundations - Vercel Deployment Engine
 * Allows students to export their Capstone AI as a working web app and deploy it.
 */

function renderVercelLab(container) {
    const systemPrompt = State.get('capstoneSystemPrompt');
    const hasPrompt = !!systemPrompt;
    
    container.innerHTML = `
        <div class="mb-6 flex justify-between items-center">
            <div>
                <span class="badge badge-primary">Final Step</span>
                <h2 class="mt-2">Vercel Deployment Lab</h2>
                <p class="text-muted">Turn your Capstone System Prompt into a live web application.</p>
            </div>
            <span style="font-size: 3rem;">🚀</span>
        </div>

        ${!hasPrompt ? `
        <div class="card mb-8" style="border-left: 4px solid var(--warning);">
            <div class="card-body">
                <h3 style="color: var(--warning);">⚠️ No Capstone Prompt Found</h3>
                <p>You haven't generated your Capstone System Prompt yet!</p>
                <ol style="margin-left: 1.5rem; margin-top: 1rem; margin-bottom: 1rem;">
                    <li>Click the <strong>Go to Capstone</strong> button below.</li>
                    <li>Switch to the <strong>🛠️ Department Assistant Builder</strong> tab.</li>
                    <li>Fill out your AI requirements.</li>
                    <li>Click <strong>Generate System Prompt & Build</strong>.</li>
                </ol>
                <p>Once you generate the prompt, return here to deploy it to Vercel!</p>
                <button class="btn btn-primary mt-4" onclick="sessionStorage.setItem('openCapstoneBuilder', 'true'); window.location.hash='/module4'">Go to Capstone</button>
            </div>
        </div>
        ` : `
        <div class="dashboard-grid" style="grid-template-columns: 1fr; gap: 2rem;">
            <!-- Step 1: Export -->
            <div class="card">
                <div class="card-header"><h3 class="card-title">Step 1: Download Your Web App</h3></div>
                <div class="card-body">
                    <p class="mb-4">We've automatically bundled your Capstone System Prompt into a standalone, ready-to-deploy HTML application.</p>
                    <div class="p-3 border rounded mb-4" style="background:#F8FAFC; border:1px solid #cbd5e1;">
                        <h4 class="text-sm mb-2">Included in your App:</h4>
                        <ul class="text-sm text-muted mb-0" style="padding-left:1.2rem;">
                            <li>Clean, responsive Chat UI with 2 tabs (Chat + View System Prompt)</li>
                            <li>Your actual System Prompt displayed in the "View System Prompt" tab</li>
                            <li>Simulated API connection ready for real Claude API keys</li>
                        </ul>
                    </div>
                    <button class="btn btn-success w-full" id="btn-download-app" style="font-size: 1.1rem; padding: 1rem;">⬇️ Download my-ai-assistant.html</button>
                </div>
            </div>

            <!-- Step 2: Vercel Setup -->
            <div class="card">
                <div class="card-header"><h3 class="card-title">Step 2: Create a Vercel Account</h3></div>
                <div class="card-body">
                    <p class="mb-4">Vercel is a premium hosting platform that makes deploying web applications incredibly fast and easy.</p>
                    <ol class="text-sm mb-4" style="padding-left: 1.2rem; line-height: 1.8;">
                        <li>Go to <a href="https://vercel.com/signup" target="_blank">vercel.com/signup</a>.</li>
                        <li>Sign up using your GitHub account or Email.</li>
                        <li>Verify your phone number if prompted.</li>
                        <li>Once logged in, go to your dashboard.</li>
                    </ol>
                </div>
            </div>

            <!-- Step 3: Deploy -->
            <div class="card">
                <div class="card-header"><h3 class="card-title">Step 3: Drag, Drop, and Deploy!</h3></div>
                <div class="card-body">
                    <p class="mb-4">You don't even need to use GitHub for this basic app. You can deploy it directly from your computer!</p>
                    
                    <div style="background: #0F172A; padding: 1.5rem; border-radius: 8px; text-align: center; color: white; margin-bottom: 1.5rem; border: 2px dashed #38BDF8;">
                        <h3 style="color: #38BDF8; margin-bottom: 0.5rem;">Vercel Direct Upload</h3>
                        <p class="text-sm" style="color: #94A3B8;">On your Vercel Dashboard, look for the "Add New Project" button.</p>
                        <p class="text-sm mt-2" style="color: #F8FAFC;">Simply drag the <strong>my-ai-assistant.html</strong> file you downloaded in Step 1 directly into the Vercel upload zone!</p>
                    </div>

                    <h4 class="text-sm mb-2">Final Checklist:</h4>
                    <ul class="text-sm text-muted mb-0" style="padding-left:1.2rem;">
                        <li>Wait 30 seconds for Vercel to build your app.</li>
                        <li>Click the magical confetti screen! 🎉</li>
                        <li>Copy your new <code>.vercel.app</code> live URL.</li>
                        <li>Share it with your colleagues and Vipul Sir!</li>
                    </ul>
                </div>
            </div>
        </div>
        `}
    `;

    if (hasPrompt) {
        document.getElementById('btn-download-app')?.addEventListener('click', () => {
            generateAndDownloadApp(systemPrompt);
        });
    }
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
    <style>
        :root { --primary: #0A192F; --accent: #3B82F6; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0F172A, #1E3A5F);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem 1rem;
        }
        .app-wrapper { width: 100%; max-width: 760px; }
        .header {
            background: var(--primary);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 12px 12px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px solid var(--accent);
        }
        .header h1 { font-size: 1.25rem; color: white; }
        .header p { font-size: 0.8rem; opacity: 0.7; margin-top: 0.25rem; }
        .badge { background: var(--accent); color: white; padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.75rem; font-weight: 600; }
        .tabs { display: flex; background: #1E293B; }
        .tab-btn {
            flex: 1; padding: 0.75rem; border: none; cursor: pointer;
            background: #1E293B; color: #94A3B8; font-size: 0.9rem;
            border-bottom: 2px solid transparent; transition: all 0.2s;
        }
        .tab-btn.active { color: white; border-bottom-color: var(--accent); background: #0F172A; }
        .tab-content { background: white; border-radius: 0 0 12px 12px; overflow: hidden; }
        .chat-area { height: 55vh; display: flex; flex-direction: column; }
        .messages {
            flex-grow: 1; padding: 1.5rem; overflow-y: auto;
            display: flex; flex-direction: column; gap: 1rem;
        }
        .message {
            max-width: 80%; padding: 0.9rem 1.1rem;
            border-radius: 12px; line-height: 1.6; font-size: 0.9rem;
        }
        .message.bot { background: #F1F5F9; color: #334155; align-self: flex-start; border-bottom-left-radius: 0; }
        .message.user { background: var(--accent); color: white; align-self: flex-end; border-bottom-right-radius: 0; }
        .input-area {
            padding: 1rem 1.5rem; background: white;
            border-top: 1px solid #E2E8F0; display: flex; gap: 0.5rem;
        }
        input[type=text] {
            flex-grow: 1; padding: 0.75rem 1rem; border: 1px solid #CBD5E1;
            border-radius: 8px; outline: none; font-size: 0.95rem;
        }
        input[type=text]:focus { border-color: var(--accent); }
        .send-btn {
            background: var(--accent); color: white; border: none;
            padding: 0.75rem 1.5rem; border-radius: 8px;
            cursor: pointer; font-weight: 600; font-size: 0.95rem;
        }
        .send-btn:hover { background: #2563EB; }
        .prompt-panel { padding: 1.5rem; display: none; height: 55vh; overflow-y: auto; }
        .prompt-panel.active { display: block; }
        .prompt-box {
            background: #0F172A; color: #38BDF8;
            font-family: 'Courier New', monospace; font-size: 0.82rem;
            padding: 1.5rem; border-radius: 8px; white-space: pre-wrap;
            line-height: 1.6; border: 1px solid #1E3A5F;
        }
        .info-box {
            background: #ECFDF5; border: 1px solid #A7F3D0;
            border-radius: 8px; padding: 1rem; margin-bottom: 1rem;
            font-size: 0.88rem; color: #065F46;
        }
        .footer { text-align: center; color: #64748B; font-size: 0.75rem; margin-top: 1rem; }
    </style>
</head>
<body>

<div class="app-wrapper">
    <div class="header">
        <div>
            <h1>🤖 My DEC AI Assistant</h1>
            <p>Built with DEC AI Foundations Training Program</p>
        </div>
        <span class="badge">AI-Powered</span>
    </div>
    
    <div class="tabs">
        <button class="tab-btn active" onclick="switchTab('chat')">💬 Chat</button>
        <button class="tab-btn" onclick="switchTab('prompt')">📄 View System Prompt</button>
    </div>
    
    <div class="tab-content">
        <div class="chat-area" id="chat-panel">
            <div class="messages" id="chat-messages">
                <div class="message bot">
                    <strong>Hello! 👋</strong><br><br>
                    I am your custom AI Assistant built during the <strong>DEC AI Foundations</strong> training.<br><br>
                    My instructions are configured via a <strong>custom System Prompt</strong>. Click the <em>"📄 View System Prompt"</em> tab above to see it!<br><br>
                    How can I help you today?
                </div>
            </div>
            <div class="input-area">
                <input type="text" id="chat-input" placeholder="Ask your AI assistant a question..." autocomplete="off">
                <button class="send-btn" id="send-btn">Send</button>
            </div>
        </div>

        <div class="prompt-panel" id="prompt-panel">
            <div class="info-box">
                ✅ <strong>Your Custom System Prompt is shown below.</strong> Copy this into Claude.ai Projects → Custom Instructions to activate your real AI assistant!
            </div>
            <div class="prompt-box">${displayPrompt}</div>
        </div>
    </div>
</div>

<div class="footer">Built with ❤️ during DEC AI Foundations | Deployed via Vercel</div>

<script>
    const SYSTEM_PROMPT = \`${escapedPrompt}\`;
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
        div.innerHTML = text;
        messagesDiv.appendChild(div);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    
    function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, true);
        input.value = '';
        btn.disabled = true;
        setTimeout(() => {
            addMessage("✅ <strong>Simulated Response</strong><br><br>Your system prompt is active and embedded in this app! To connect to a real AI, replace this block with a fetch() call to the Claude or OpenAI API, passing <code>SYSTEM_PROMPT</code> as the system instruction.", false);
            btn.disabled = false;
        }, 800);
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
    
    showToast('✅ Web App downloaded! Open it to see your prompt, then deploy to Vercel!', 'success');
}

window.renderVercelLab = renderVercelLab;
