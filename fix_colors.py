import os

with open('css/components.css', 'r', encoding='utf-8') as f:
    css = f.read()

replacements = {
    'background: #faeeda;': 'background: rgba(255, 222, 89, 0.1);',
    'background: #f8f9fa;': 'background: var(--bg-card);',
    'background: #E3F2FD;': 'background: rgba(255, 222, 89, 0.1);',
    'background: #F0F7FF;': 'background: var(--bg-card);',
    'background: #FFF3CD;': 'background: rgba(255, 222, 89, 0.15);',
    'color: #555;': 'color: var(--text-muted);',
    'color: #155724;': 'color: var(--success);'
}

for old, new in replacements.items():
    css = css.replace(old, new)

with open('css/components.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Fixed hardcoded colors in CSS!")
