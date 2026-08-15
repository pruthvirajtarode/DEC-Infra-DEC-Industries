import os
import re

def extract_body(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()
    except Exception as e:
        with open(filepath, 'r', encoding='cp1252') as f:
            html = f.read()

    module_content = re.search(r'<div class="[^"]+-module[^"]*">([\s\S]*?)</div>\s*<script', html)
    if module_content:
        return module_content.group(0).split('<script')[0].strip()
    
    body = re.search(r'<body[^>]*>([\s\S]*?)</body>', html, re.IGNORECASE)
    if body:
        b = body.group(1)
        b = re.sub(r'<script.*?</script>', '', b, flags=re.IGNORECASE|re.DOTALL)
        b = re.sub(r'<style.*?</style>', '', b, flags=re.IGNORECASE|re.DOTALL)
        return b.strip()
    return html

m1a_html = extract_body('extracted_modules/Module1A/Module 1A/module_1a_prompt_engineering.html')
m1b_html = extract_body('extracted_modules/Module1B/Module 1B/module_1b_excel_analysis.html')
m1c_html = extract_body('extracted_modules/Module1C/Module 1C/module_1c_pdf_analysis.html')

def cleanup(html_str):
    # FutureTech theme mappings
    html_str = html_str.replace('var(--surface-2)', '#1C1C1C')
    html_str = html_str.replace('var(--surface-1)', '#1C1C1C')
    html_str = html_str.replace('var(--border)', 'rgba(255, 255, 255, 0.05)')
    html_str = html_str.replace('var(--text-primary)', '#FFFFFF')
    html_str = html_str.replace('var(--text-secondary)', '#9CA3AF')
    html_str = html_str.replace('var(--bg-accent)', 'rgba(255, 222, 89, 0.1)')
    html_str = html_str.replace('var(--text-accent)', '#FFDE59')
    html_str = html_str.replace('var(--text-danger)', '#EF4444')
    html_str = html_str.replace('var(--text-success)', '#10B981')
    html_str = html_str.replace('background: #fcebeb;', 'background: rgba(239, 68, 68, 0.15);')
    html_str = html_str.replace('background: #eaf3de;', 'background: rgba(16, 185, 129, 0.15);')
    html_str = html_str.replace('background: #e3f2fd;', 'background: rgba(255, 222, 89, 0.1);')
    html_str = html_str.replace('background: #f5f5f5;', 'background: #1C1C1C;')
    html_str = html_str.replace('#3b82f6', '#FFDE59')
    return html_str

m1a_html = cleanup(m1a_html)
m1b_html = cleanup(m1b_html)
m1c_html = cleanup(m1c_html)

new_blocks = f"""
        }} else if (activeSubTab === '1a') {{
            contentHtml = `{m1a_html}`;
        }} else if (activeSubTab === '1b') {{
            contentHtml = `{m1b_html}`;
        }} else if (activeSubTab === '1c') {{
            contentHtml = `{m1c_html}`;
"""

with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Insert before } else if (activeSubTab === 'tools') {
target = "} else if (activeSubTab === 'tools') {"
if target in app_js:
    # Remove the starting brace from new_blocks because target already has it
    new_blocks = new_blocks.replace("        } else if (activeSubTab === '1a') {", "        } else if (activeSubTab === '1a') {")
    
    app_js = app_js.replace(target, new_blocks + "        " + target)
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
    print("Tabs 1A, 1B, 1C restored successfully!")
else:
    print("Could not find the target line to inject tabs.")
