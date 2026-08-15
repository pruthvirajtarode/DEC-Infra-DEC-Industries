import os
import re

# 1. Update css/main.css
with open('css/main.css', 'r', encoding='utf-8') as f:
    main_css = f.read()

# Replace variables
replacements_main = {
    '--primary: #05050A; /* Ultra deep space */': '--primary: #0A0A0A; /* FutureTech Black */',
    '--primary-light: #0D0E15; /* Sidebar / Deep elements */': '--primary-light: #121212; /* FutureTech Sidebar */',
    '--primary-lighter: #1E1F2E; /* Borders/Hover */': '--primary-lighter: #222222; /* Hover */',
    '--secondary: #0A0A0F; /* Secondary background */': '--secondary: #000000; /* Secondary */',
    '--bg-main: #020617; /* App background (slate-950) */': '--bg-main: #141414; /* FutureTech Main */',
    '--bg-card: rgba(15, 23, 42, 0.5); /* Glassmorphic card */': '--bg-card: #1C1C1C; /* FutureTech Card */',
    '--border-color: rgba(255, 255, 255, 0.08); /* Subtle crisp borders */': '--border-color: rgba(255, 255, 255, 0.05); /* Subtle crisp borders */',
    '--accent: #8B5CF6; /* Cyber Purple / Indigo for gamified accent */': '--accent: #FFDE59; /* FutureTech Yellow */',
    '--accent-hover: #A78BFA; /* Lighter hover */': '--accent-hover: #FFC107; /* Lighter hover */',
    '--shadow-glow-accent: 0 0 25px rgba(139, 92, 246, 0.3);': '--shadow-glow-accent: 0 0 25px rgba(255, 222, 89, 0.2);',
    '--info: #06B6D4; /* Cyan */': '--info: #FFDE59; /* FutureTech Info (Yellow) */',
    '--info-bg: rgba(6, 182, 212, 0.15);': '--info-bg: rgba(255, 222, 89, 0.1);'
}

for old, new in replacements_main.items():
    main_css = main_css.replace(old, new)

with open('css/main.css', 'w', encoding='utf-8') as f:
    f.write(main_css)


# 2. Update js/app.js gradients and hardcoded colors
with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

replacements_app = {
    'linear-gradient(135deg, #0f172a 0%, #3b82f6 100%)': 'linear-gradient(135deg, #141414 0%, #333333 100%)',
    '-webkit-linear-gradient(45deg, #F8FAFC, #A78BFA)': '-webkit-linear-gradient(45deg, #F8FAFC, #FFDE59)',
    '-webkit-linear-gradient(45deg, #F8FAFC, #38BDF8)': '-webkit-linear-gradient(45deg, #F8FAFC, #FFDE59)',
    '-webkit-linear-gradient(45deg, #F8FAFC, #EF4444)': '-webkit-linear-gradient(45deg, #F8FAFC, #FFDE59)',
    '-webkit-linear-gradient(45deg, #F8FAFC, #10B981)': '-webkit-linear-gradient(45deg, #F8FAFC, #FFDE59)',
    'border-top: 3px solid #38BDF8;': 'border-top: 3px solid #FFDE59;',
    'color:#38BDF8;': 'color:#FFDE59;',
    'border-top: 3px solid #E879F9;': 'border-top: 3px solid #FFFFFF;',
    'color:#E879F9;': 'color:#FFFFFF;',
    'rgba(6, 182, 212, 0.1)': 'rgba(255, 222, 89, 0.05)',
    'background: rgba(59, 130, 246, 0.1); color: #3b82f6;': 'background: rgba(255, 222, 89, 0.1); color: #FFDE59;',
    'color: #3b82f6; border-bottom: 2px solid #3b82f6;': 'color: #FFDE59; border-bottom: 2px solid #FFDE59;',
    'border-left: 3px solid #3b82f6;': 'border-left: 3px solid #FFDE59;',
    'border-left: 3px solid #8b5cf6;': 'border-left: 3px solid #FFDE59;',
    'background: rgba(139, 92, 246, 0.1); color: #8b5cf6;': 'background: rgba(255, 222, 89, 0.1); color: #FFDE59;',
    'border-left: 3px solid #6366f1;': 'border-left: 3px solid #FFDE59;',
    'background: rgba(99, 102, 241, 0.1); color: #6366f1;': 'background: rgba(255, 222, 89, 0.1); color: #FFDE59;'
}

for old, new in replacements_app.items():
    app_js = app_js.replace(old, new)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

print("FutureTech theme applied successfully!")
