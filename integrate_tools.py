import os
import re

fp = 'extracted_modules/Module1A/Module 1A/dec_infra_ai_tools_guide.html'

with open(fp, 'r', encoding='utf-8') as f:
    html = f.read()

# Extract styles
styles = re.findall(r'<style>([\s\S]*?)</style>', html)
css_content = "\n\n/* --- Injected Tools CSS --- */\n"
for style in styles:
    css_content += style + "\n"

css_content = css_content.replace('var(--surface-2)', 'var(--bg-card)')
css_content = css_content.replace('var(--surface-1)', 'var(--bg-card)')
css_content = css_content.replace('var(--border)', 'var(--border-color)')
css_content = css_content.replace('var(--text-primary)', 'var(--text-main)')
css_content = css_content.replace('var(--text-secondary)', 'var(--text-muted)')
css_content = css_content.replace('var(--bg-accent)', 'var(--info-bg)')
css_content = css_content.replace('var(--text-accent)', 'var(--info)')

with open('css/components.css', 'a', encoding='utf-8') as f:
    f.write(css_content)

# Extract body (everything after </style>)
body = html.split('</style>')[1].strip()
body = body.replace('`', r'\`') # Escape backticks for JS template literal

with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Inject into drawModule1View logic
target_if = "} else if (activeSubTab === '1d') {"
new_if = f"}} else if (activeSubTab === 'tools') {{\n            contentHtml = `{body}`;\n        {target_if}"
app_js = app_js.replace(target_if, new_if)

# Inject button
target_btn = '<button class="btn sub-tab-btn ${activeSubTab === \'1d\' ? \'btn-primary\' : \'btn-secondary\'}" data-subtab="1d" style="border-radius: var(--radius-sm);">🎮 1D: Interactive</button>'
new_btn = target_btn + '\n            <button class="btn sub-tab-btn ${activeSubTab === \'tools\' ? \'btn-primary\' : \'btn-secondary\'}" data-subtab="tools" style="border-radius: var(--radius-sm);">🛠️ AI Tools Guide</button>'
app_js = app_js.replace(target_btn, new_btn)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

print("Tools guide integrated!")
