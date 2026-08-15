import re
import os

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to extract the parts of renderModule1 to rebuild it correctly.
# 1. Extract the raw HTML of the Agenda section (from <div class="card mb-8" to the end of the HTML before the event listeners).
# 2. Extract the event listeners block.
# 3. Rebuild renderModule1.

mod1_start = content.find('function renderModule1(container) {')
mod2_start = content.find('function renderModule2(container) {')
mod1_code = content[mod1_start:mod2_start]

# Extract agenda HTML
# It starts around line 289: `contentHtml = `<div class="card mb-8"`
# and ends right before `// Event Listeners for Module 1` (around line 727)
agenda_html_match = re.search(r"if \(activeSubTab === 'agenda'\) {\s*contentHtml = `([\s\S]*?)`;\s*// Event Listeners", mod1_code)

if agenda_html_match:
    agenda_html = agenda_html_match.group(1).strip()
    # It might contain an errant `});` if the regex failed, but looking at the file it seems it has ``;` at line 727.
    # Wait, the original `agenda_html` actually had a backtick at line 727. Let's look at the raw mod1_code.

print("Extracted Agenda HTML:", agenda_html_match is not None)

# It's safer to just split by known markers.
parts = mod1_code.split("} else if (activeSubTab === 'tools') {")
if len(parts) == 2:
    # Everything before the 'tools' if block
    part1 = parts[0]
    
    # Let's find where the HTML for agenda ends and JS begins inside part1
    agenda_html_end = part1.find('`;\n\n    // Event Listeners for Module 1')
    if agenda_html_end == -1:
        agenda_html_end = part1.find('`;\n    // Event Listeners')
        
    if agenda_html_end != -1:
        agenda_html = part1[part1.find('contentHtml = `') + 15 : agenda_html_end]
        
        js_listeners_start = part1.find('// Event Listeners', agenda_html_end)
        js_listeners_end = part1.rfind('`;\n        } else if (activeSubTab === \'1a\') {')
        
        js_listeners = part1[js_listeners_start : js_listeners_end]
        # Remove trailing }, 100);`;
        js_listeners = re.sub(r'}, 100\);\s*`;$', '}, 100);', js_listeners.strip())

        # Now extract the rest of the if/else blocks and the innerHTML assignment
        # The 'tools' and '1a', '1b', '1c', '1d' branches
        rest_of_blocks = "} else if (activeSubTab === 'tools') {" + parts[1]
        
        # We need to extract the innerHTML part, which is after the if/else blocks
        inner_html_start = rest_of_blocks.find('container.innerHTML = `')
        if_else_blocks = rest_of_blocks[:inner_html_start]
        
        inner_html_part = rest_of_blocks[inner_html_start:]
        
        # Reconstruct drawModule1View
        new_mod1 = f"""function renderModule1(container) {{
    let activeSubTab = 'agenda';

    function drawModule1View() {{
        let contentHtml = '';
        if (activeSubTab === 'agenda') {{
            contentHtml = `{agenda_html}`;
        }}
        {if_else_blocks}
        {inner_html_part}
"""
        # wait, inner_html_part contains the `drawModule1View();` call and closing brace of `renderModule1`.
        # We need to insert the event listeners inside `drawModule1View`, right after `container.innerHTML = ...`
        
        # Let's find where `container.innerHTML` block ends.
        # It ends before `// Add event listeners for sub-tabs`
        tab_listeners_start = inner_html_part.find('// Add event listeners for sub-tabs')
        if tab_listeners_start != -1:
            partA = inner_html_part[:tab_listeners_start]
            partB = inner_html_part[tab_listeners_start:]
            
            # partB contains the sub-tab listeners, then the end of drawModule1View, then drawModule1View() call.
            # We want to put `js_listeners` after `container.innerHTML` assignment, either before or after `partB`.
            
            # Let's insert js_listeners right after the container.innerHTML assignment.
            new_inner_html = partA + "\n        " + js_listeners + "\n\n        " + partB
            
            new_mod1 = f"""function renderModule1(container) {{
    let activeSubTab = 'agenda';

    function drawModule1View() {{
        let contentHtml = '';
        if (activeSubTab === 'agenda') {{
            contentHtml = `{agenda_html}`;
        }}
        {if_else_blocks}
        {new_inner_html}
"""
            
            # Now replace in file
            new_content = content[:mod1_start] + new_mod1 + content[mod2_start:]
            with open('js/app.js', 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Successfully fixed app.js syntax")
        else:
            print("Could not find tab listeners")
    else:
        print("Could not find agenda html end")
else:
    print("Could not split by 'tools'")
