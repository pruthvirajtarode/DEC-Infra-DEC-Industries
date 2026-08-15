import os
import re

files = [
    'extracted_modules/Module1A/Module 1A/module_1a_prompt_engineering.html',
    'extracted_modules/Module1B/Module 1B/module_1b_excel_analysis.html',
    'extracted_modules/Module1C/Module 1C/module_1c_pdf_analysis.html',
    'extracted_modules/Module1D/Module 1D/Module_1D_Interactive_Guide.html',
    'M3_ Safe AI — DEC AI Foundations.html'
]

css_content = "\n\n/* --- Injected Module CSS --- */\n"

for fp in files:
    try:
        with open(fp, 'r', encoding='utf-8') as f:
            html = f.read()
    except:
        with open(fp, 'r', encoding='cp1252') as f:
            html = f.read()
            
    styles = re.findall(r'<style>([\s\S]*?)</style>', html)
    for style in styles:
        css_content += style + "\n"

# Clean up CSS - remove body, *, :root selectors that conflict
css_content = re.sub(r'body\s*{[^}]+}', '', css_content)
css_content = re.sub(r'\*\s*{[^}]+}', '', css_content)
css_content = re.sub(r':root\s*{[^}]+}', '', css_content)

# Optional: replace some hardcoded colors
css_content = css_content.replace('var(--surface-2)', 'var(--bg-card)')
css_content = css_content.replace('var(--surface-1)', 'var(--bg-card)')
css_content = css_content.replace('var(--border)', 'var(--border-color)')
css_content = css_content.replace('var(--text-primary)', 'var(--text-main)')
css_content = css_content.replace('var(--text-secondary)', 'var(--text-muted)')
css_content = css_content.replace('var(--bg-accent)', 'var(--info-bg)')
css_content = css_content.replace('var(--text-accent)', 'var(--info)')
css_content = css_content.replace('#fcebeb', 'var(--danger-bg)')
css_content = css_content.replace('#eaf3de', 'var(--success-bg)')
css_content = css_content.replace('#1e1e2e', 'var(--primary-lighter)')

with open('css/components.css', 'a', encoding='utf-8') as f:
    f.write(css_content)

print("CSS extracted and appended to components.css!")
