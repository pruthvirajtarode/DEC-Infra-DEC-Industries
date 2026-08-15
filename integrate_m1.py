import os
import re
import traceback

def extract_body(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()
    except Exception as e:
        # Fallback to cp1252 if utf-8 fails
        with open(filepath, 'r', encoding='cp1252') as f:
            html = f.read()

    # Try to grab what's inside <div class="prompt-module"> or <div class="excel-module"> or similar
    module_content = re.search(r'<div class="[^"]+-module[^"]*">([\s\S]*?)</div>\s*<script', html)
    if module_content:
        return module_content.group(0).split('<script')[0].strip()
    
    # Or interactive-guide
    guide_content = re.search(r'<div class="interactive-guide">([\s\S]*?)</div>\s*<script', html)
    if guide_content:
        return guide_content.group(0).split('<script')[0].strip()

    # Fallback: grab body content
    body = re.search(r'<body[^>]*>([\s\S]*?)</body>', html, re.IGNORECASE)
    if body:
        # Strip script and style tags
        b = body.group(1)
        b = re.sub(r'<script.*?</script>', '', b, flags=re.IGNORECASE|re.DOTALL)
        b = re.sub(r'<style.*?</style>', '', b, flags=re.IGNORECASE|re.DOTALL)
        return b.strip()

    return html

m1a_html = extract_body('extracted_modules/Module1A/Module 1A/module_1a_prompt_engineering.html')
m1b_html = extract_body('extracted_modules/Module1B/Module 1B/module_1b_excel_analysis.html')
m1c_html = extract_body('extracted_modules/Module1C/Module 1C/module_1c_pdf_analysis.html')
m1d_html = extract_body('extracted_modules/Module1D/Module 1D/Module_1D_Interactive_Guide.html')

# Clean up colors and classes
def cleanup(html_str):
    html_str = html_str.replace('var(--surface-2)', 'var(--bg-card)')
    html_str = html_str.replace('var(--surface-1)', 'var(--bg-card)')
    html_str = html_str.replace('var(--border)', 'var(--border-color)')
    html_str = html_str.replace('var(--text-primary)', 'var(--text-main)')
    html_str = html_str.replace('var(--text-secondary)', 'var(--text-muted)')
    html_str = html_str.replace('var(--bg-accent)', 'var(--info-bg)')
    html_str = html_str.replace('var(--text-accent)', 'var(--info)')
    html_str = html_str.replace('var(--text-danger)', 'var(--danger)')
    html_str = html_str.replace('var(--text-success)', 'var(--success)')
    html_str = html_str.replace('background: #fcebeb;', 'background: var(--danger-bg);')
    html_str = html_str.replace('background: #eaf3de;', 'background: var(--success-bg);')
    html_str = html_str.replace('background: #e3f2fd;', 'background: var(--info-bg);')
    html_str = html_str.replace('background: #f5f5f5;', 'background: var(--bg-card);')
    return html_str

m1a_html = cleanup(m1a_html)
m1b_html = cleanup(m1b_html)
m1c_html = cleanup(m1c_html)
m1d_html = cleanup(m1d_html)

# Read app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Grab the existing Agenda section (the card mb-8)
agenda_match = re.search(r'<!-- NEW: Agenda Section -->\s*(<div class="card mb-8".*?<!-- M1 End -->)', app_js, re.DOTALL)
if agenda_match:
    agenda_html = agenda_match.group(1).replace('<!-- M1 End -->', '').strip()
else:
    # Fallback to hardcoded if regex fails
    agenda_match = re.search(r'<!-- NEW: Agenda Section -->([\s\S]*?)function renderModule2', app_js)
    agenda_html = agenda_match.group(1).strip()[:-2] if agenda_match else "<p>Agenda here</p>"

new_render_module1 = f"""
function renderModule1(container) {{
    let activeSubTab = 'agenda';

    function drawModule1View() {{
        let contentHtml = '';
        if (activeSubTab === 'agenda') {{
            contentHtml = `{agenda_html}`;
        }} else if (activeSubTab === '1a') {{
            contentHtml = `{m1a_html}`;
        }} else if (activeSubTab === '1b') {{
            contentHtml = `{m1b_html}`;
        }} else if (activeSubTab === '1c') {{
            contentHtml = `{m1c_html}`;
        }} else if (activeSubTab === '1d') {{
            contentHtml = `{m1d_html}`;
        }}

        container.innerHTML = `
        <div class="mb-4" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
                <span class="badge badge-warning">Session 1</span>
                <h2 class="mt-4" style="background: -webkit-linear-gradient(45deg, #F8FAFC, #A78BFA); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Module 1: Prompting & Document Intelligence</h2>
                <p class="text-muted">Turn AI from a simple question-answering tool into a structured work assistant.</p>
            </div>
            <img src="3d-doc.png" class="float-3d" style="width: 140px; height: auto;" alt="3D Document">
        </div>

        <div class="flex gap-2 mb-6" style="display: flex; flex-wrap: wrap; gap: 0.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 2rem;">
            <button class="btn sub-tab-btn ${{activeSubTab === 'agenda' ? 'btn-primary' : 'btn-secondary'}}" data-subtab="agenda" style="border-radius: var(--radius-sm);">📋 Agenda</button>
            <button class="btn sub-tab-btn ${{activeSubTab === '1a' ? 'btn-primary' : 'btn-secondary'}}" data-subtab="1a" style="border-radius: var(--radius-sm);">📝 1A: Prompting</button>
            <button class="btn sub-tab-btn ${{activeSubTab === '1b' ? 'btn-primary' : 'btn-secondary'}}" data-subtab="1b" style="border-radius: var(--radius-sm);">📊 1B: Excel</button>
            <button class="btn sub-tab-btn ${{activeSubTab === '1c' ? 'btn-primary' : 'btn-secondary'}}" data-subtab="1c" style="border-radius: var(--radius-sm);">📄 1C: PDF</button>
            <button class="btn sub-tab-btn ${{activeSubTab === '1d' ? 'btn-primary' : 'btn-secondary'}}" data-subtab="1d" style="border-radius: var(--radius-sm);">🎮 1D: Interactive</button>
        </div>

        <div class="module1-content-wrapper">
            ${{contentHtml}}
        </div>
        `;

        // Add event listeners for sub-tabs
        const tabBtns = container.querySelectorAll('.sub-tab-btn');
        tabBtns.forEach(btn => {{
            btn.addEventListener('click', (e) => {{
                activeSubTab = e.target.getAttribute('data-subtab');
                drawModule1View();
            }});
        }});
    }}

    drawModule1View();
}}
"""

mod1_start = app_js.find('function renderModule1(container) {')
mod1_end = app_js.find('function renderModule2(container) {')
if mod1_start != -1 and mod1_end != -1:
    old_mod1 = app_js[mod1_start:mod1_end]
    new_app_js = app_js.replace(old_mod1, new_render_module1 + "\n\n")
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(new_app_js)
    print("Module 1 integrated!")
else:
    print("Could not find renderModule1 boundaries")
