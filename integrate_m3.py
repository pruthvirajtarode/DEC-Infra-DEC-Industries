import os
import re

# Read M3 HTML
with open('M3_ Safe AI — DEC AI Foundations.html', 'r', encoding='utf-8') as f:
    m3_html = f.read()

# Extract content inside <div class="container">
match = re.search(r'<div class="container">([\s\S]*?)</div>\s*<script>', m3_html)
if not match:
    print("Could not find M3 content")
    exit(1)

content = match.group(1)

# Basic cleanup: remove hardcoded colors and let our CSS take over
content = content.replace('style="border-top:3px solid #FF5252"', 'style="border-top:3px solid var(--danger); background: var(--bg-card);"')
content = content.replace('style="border-top:3px solid #FF9800"', 'style="border-top:3px solid var(--warning); background: var(--bg-card);"')
content = content.replace('style="border-top:3px solid #9C27B0"', 'style="border-top:3px solid var(--accent); background: var(--bg-card);"')
content = content.replace('style="border-top:3px solid #2196F3"', 'style="border-top:3px solid var(--info); background: var(--bg-card);"')
content = content.replace('style="border-top:3px solid #4CAF50"', 'style="border-top:3px solid var(--success); background: var(--bg-card);"')

content = content.replace('color:#FF5252', 'color:var(--danger)')
content = content.replace('color:#FF9800', 'color:var(--warning)')
content = content.replace('color:#CE93D8', 'color:var(--accent)')
content = content.replace('color:#64B5F6', 'color:var(--info)')
content = content.replace('color:#4CAF50', 'color:var(--success)')
content = content.replace('color:#2196F3', 'color:var(--info)')

# Read app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Find renderModule3 function block
mod3_start = app_js.find('function renderModule3(container) {')
mod3_end = app_js.find('function renderModule4(container) {')

if mod3_start == -1 or mod3_end == -1:
    print("Could not find renderModule3 in app.js")
    exit(1)

old_mod3 = app_js[mod3_start:mod3_end]

# Create new renderModule3
new_mod3_html = f"""
        <div class="mb-4" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
                <span class="badge badge-success">Session 3</span>
                <h2 class="mt-4" style="background: -webkit-linear-gradient(45deg, #F8FAFC, #10B981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Module 3: Safe AI Usage & Responsible Adoption</h2>
                <p class="text-muted">Data classification, identifying hallucinations, and human-in-the-loop verification.</p>
            </div>
            <img src="3d-shield.png" class="float-3d" style="width: 140px; height: auto;" alt="3D Shield">
        </div>
        
        <div class="m3-content-wrapper mt-8">
{content}
        </div>
"""

new_mod3 = f"""function renderModule3(container) {{
    container.innerHTML = `{new_mod3_html}`;
    
    // Auto-scroll to top
    setTimeout(() => {{
        window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}, 100);
}}

"""

# Replace in app.js
new_app_js = app_js.replace(old_mod3, new_mod3)

# Add global functions for M3
global_funcs = """
// --- M3 Global Functions ---
window.toggle = function(el){el.parentElement.classList.toggle('open')}
window.toggleCS = function(el){if(el.classList.contains('case-study'))el.classList.toggle('cs-open')}
window.copyPrompt = function(btn){const t=btn.parentElement.textContent.replace('📋 Copy','').trim();navigator.clipboard.writeText(t).then(()=>{btn.textContent='✓ Copied!';setTimeout(()=>btn.textContent='📋 Copy',2000)});event.stopPropagation()}
"""
new_app_js += global_funcs

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(new_app_js)

print("Module 3 integrated into app.js!")
