import os

with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

global_functions = """
window.switchTab = function(e, tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => t.classList.remove('active'));
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(b => b.classList.remove('active'));
    
    const targetTab = document.getElementById(tabName);
    if(targetTab) targetTab.classList.add('active');
    
    if (e && e.target) {
        e.target.classList.add('active');
    }
};

window.showTab = function(event, tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(c => c.classList.remove('active'));
    
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(b => b.classList.remove('active'));
    
    const targetTab = document.getElementById(tabName);
    if(targetTab) targetTab.classList.add('active');
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
};

window.openTab = function(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    const targetTab = document.getElementById(tabName);
    if(targetTab) targetTab.classList.add('active');
    
    if(evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    } else if(evt && evt.target) {
        evt.target.classList.add('active');
    }
};

window.selectOption = function(option) {
    const options = {
        'A': 'Image & Photo Analysis',
        'B': 'Email & Report Automation',
        'C': 'Schedule & Resource Optimization',
        'D': 'Cost Estimation & Budgeting',
        'E': 'Compliance & Documentation',
        'F': 'Change Order & Claims Management',
        'G': 'Sustainability & Green Building',
        'H': 'Predictive Analytics'
    };
    const message = `I want Module 1D Option ${option}: ${options[option]}`;
    alert(message + '\\n\\nCopy this and reply to confirm your selection!');
    window.copyToClipboard(message);
};

window.copyToClipboard = function(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Selection copied! Paste it in your reply to confirm.');
        }).catch(() => { fallbackCopy(text); });
    } else {
        fallbackCopy(text);
    }
    
    function fallbackCopy(txt) {
        const textarea = document.createElement('textarea');
        textarea.value = txt;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            alert('Selection copied! Paste it in your reply to confirm.');
        } catch(e) {
            console.error(e);
        }
        document.body.removeChild(textarea);
    }
};
"""

# Insert these functions right after window.switchRoleTab
insert_marker = "window.switchRoleTab = function(tabId) {"
if insert_marker in app_js:
    # find the end of switchRoleTab
    app_js = app_js.replace(insert_marker, global_functions + "\n" + insert_marker)
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
    print("Global tab functions injected successfully!")
else:
    print("Could not find insert marker.")
