import re

# Read M2 HTML
with open('M2_ Data Analysis — DEC AI Foundations.html', 'r', encoding='utf-8') as f:
    m2_html = f.read()

# Extract content inside <div class="container">
match = re.search(r'<div class="container">([\s\S]*?)</div>\s*<script>', m2_html)
if not match:
    print("Could not find M2 content")
    exit(1)

content = match.group(1)

# Clean up colors
content = content.replace('color:#FF5252', 'color:var(--danger)')
content = content.replace('color:#FF9800', 'color:var(--warning)')
content = content.replace('color:#CE93D8', 'color:var(--accent)')
content = content.replace('color:#64B5F6', 'color:var(--info)')
content = content.replace('color:#4CAF50', 'color:var(--success)')
content = content.replace('color:#2196F3', 'color:var(--info)')

# Read app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Find renderModule2 function block
mod2_start = app_js.find('function renderModule2(container) {')
mod2_end = app_js.find('function renderModule3(container) {')

if mod2_start == -1 or mod2_end == -1:
    print("Could not find renderModule2 in app.js")
    exit(1)

old_mod2 = app_js[mod2_start:mod2_end]

# Create new renderModule2
new_mod2_html = f"""
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
                <style>@keyframes barAnim{{0%,100%{{transform:scaleY(1)}}50%{{transform:scaleY(0.4)}}}} @keyframes modSpinRev{{to{{transform:rotate(-360deg)}}}}</style>
            </div>
        </div>
        
        <div class="m2-content-wrapper mt-8">
{content}
        </div>
"""

new_mod2 = f"""function renderModule2(container) {{
    container.innerHTML = `{new_mod2_html}`;
    
    // Auto-scroll to top
    setTimeout(() => {{
        window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}, 100);
}}

"""

# Replace in app.js
new_app_js = app_js.replace(old_mod2, new_mod2)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(new_app_js)

print("Module 2 integrated into app.js!")
