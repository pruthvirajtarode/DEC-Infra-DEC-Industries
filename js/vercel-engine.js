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
                <p>You haven't generated your Capstone System Prompt yet! Please go back to <strong>M4: Capstone</strong> and complete the wizard before deploying your app.</p>
                <button class="btn btn-primary mt-4" onclick="window.location.hash='/module4'">Go to Capstone</button>
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
                            <li>Clean, responsive Chat UI (HTML/CSS)</li>
                            <li>Your custom System Prompt baked into the logic</li>
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
    // Generate a standalone HTML file that contains a simple chat interface
    // and embeds the user's system prompt.
    
    // Escape the prompt for embedding in JS string
    const escapedPrompt = systemPrompt.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My AI Assistant</title>
    <style>
        :root {
            --primary: #0A192F;
            --secondary: #F8FAFC;
            --accent: #3B82F6;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f1f5f9;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .chat-container {
            width: 100%;
            max-width: 600px;
            background: white;
            height: 80vh;
            border-radius: 12px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .header {
            background: var(--primary);
            color: white;
            padding: 1.5rem;
            text-align: center;
        }
        .header h1 { margin: 0; font-size: 1.25rem; }
        .header p { margin: 0.5rem 0 0 0; font-size: 0.85rem; opacity: 0.8; }
        .messages {
            flex-grow: 1;
            padding: 1.5rem;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .message {
            max-width: 80%;
            padding: 1rem;
            border-radius: 8px;
            line-height: 1.5;
            font-size: 0.95rem;
        }
        .message.bot {
            background: #f1f5f9;
            color: #334155;
            align-self: flex-start;
            border-bottom-left-radius: 0;
        }
        .message.user {
            background: var(--accent);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 0;
        }
        .input-area {
            padding: 1.5rem;
            background: white;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 0.5rem;
        }
        input {
            flex-grow: 1;
            padding: 0.75rem 1rem;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            outline: none;
            font-size: 1rem;
        }
        input:focus { border-color: var(--accent); }
        button {
            background: var(--accent);
            color: white;
            border: none;
            padding: 0 1.5rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.2s;
        }
        button:hover { background: #2563eb; }
    </style>
</head>
<body>

<div class="chat-container">
    <div class="header">
        <h1>DEC Custom AI Assistant</h1>
        <p>Built with DEC AI Foundations</p>
    </div>
    
    <div class="messages" id="chat-messages">
        <div class="message bot">
            Hello! I am your custom AI Assistant. I have been configured with the following instructions:<br><br>
            <em style="font-size: 0.8rem; opacity: 0.8;">"SYSTEM PROMPT LOADED SUCCESSFULLY"</em><br><br>
            How can I help you today?
        </div>
    </div>
    
    <div class="input-area">
        <input type="text" id="chat-input" placeholder="Type your message..." autocomplete="off">
        <button id="send-btn">Send</button>
    </div>
</div>

<script>
    const SYSTEM_PROMPT = \`${escapedPrompt}\`;
    
    const messagesDiv = document.getElementById('chat-messages');
    const input = document.getElementById('chat-input');
    const btn = document.getElementById('send-btn');
    
    function addMessage(text, isUser) {
        const div = document.createElement('div');
        div.className = 'message ' + (isUser ? 'user' : 'bot');
        div.innerHTML = text.replace(/\\n/g, '<br>');
        messagesDiv.appendChild(div);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    
    function handleSend() {
        const text = input.value.trim();
        if(!text) return;
        
        addMessage(text, true);
        input.value = '';
        
        // Simulate API delay
        setTimeout(() => {
            addMessage("This is a simulated response. To make this app real, you will need to replace this JavaScript logic with an API call to Claude or OpenAI, passing the SYSTEM_PROMPT defined in the code!", false);
        }, 1000);
    }
    
    btn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleSend();
    });
</script>

</body>
</html>`;

    // Trigger download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-ai-assistant.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Web App downloaded successfully! Proceed to Step 2.', 'success');
}

window.renderVercelLab = renderVercelLab;
