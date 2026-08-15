import re

# Read M4 HTML
with open('M4_ Capstone — Build Your Copilot Agent _ DEC AI Foundations.html', 'r', encoding='utf-8') as f:
    m4_html = f.read()

# Extract content inside <div class="container">
match = re.search(r'<div class="container">([\s\S]*?)</div>\s*<script>', m4_html)
if not match:
    print("Could not find M4 content")
    exit(1)

content = match.group(1)

# Clean up colors
content = content.replace('color:#FF5252', 'color:var(--danger)')
content = content.replace('color:#FF9800', 'color:var(--warning)')
content = content.replace('color:#CE93D8', 'color:var(--accent)')
content = content.replace('color:#64B5F6', 'color:var(--info)')
content = content.replace('color:#4CAF50', 'color:var(--success)')
content = content.replace('color:#2196F3', 'color:var(--info)')
content = content.replace('color:#0078D4', 'color:var(--ms-blue)')

# Read app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Find renderModule4 function block
mod4_start = app_js.find('function renderModule4(container) {')
mod4_end = app_js.find('function renderModule1Docs(container) {')

if mod4_start == -1 or mod4_end == -1:
    print("Could not find renderModule4 in app.js")
    exit(1)

old_mod4 = app_js[mod4_start:mod4_end]

# Create new renderModule4
new_mod4_html = f"""
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
{content}
        </div>
"""

new_mod4 = f"""function renderModule4(container) {{
    container.innerHTML = `{new_mod4_html}`;
    
    // Auto-scroll to top
    setTimeout(() => {{
        window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}, 100);
}}

"""

# Replace in app.js
new_app_js = app_js.replace(old_mod4, new_mod4)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(new_app_js)

print("Module 4 integrated into app.js!")
