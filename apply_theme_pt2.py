import os

# Update css/components.css
with open('css/components.css', 'r', encoding='utf-8') as f:
    comp = f.read()

comp = comp.replace('#8B5CF6', '#FFDE59')
comp = comp.replace('#0f172a', '#141414')
comp = comp.replace('#3b82f6', '#FFDE59')
comp = comp.replace('#1e1e2e', '#222222')
comp = comp.replace('var(--primary-lighter)', '#222222')

with open('css/components.css', 'w', encoding='utf-8') as f:
    f.write(comp)

# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

idx = idx.replace('color: #38BDF8;', 'color: var(--accent);')
idx = idx.replace('border-left-color: #38BDF8;', 'border-left-color: var(--accent);')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx)

print("Theme Part 2 Applied!")
