import sys
import re

def analyze_braces(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    depth = 0
    in_function = False
    current_func = ""
    
    for i, line in enumerate(lines):
        open_c = line.count('{')
        close_c = line.count('}')
        
        # Simple string literal removal (very basic)
        clean_line = re.sub(r'".*?"', '', line)
        clean_line = re.sub(r"'.*?'", '', clean_line)
        clean_line = re.sub(r"`.*?`", '', clean_line) # single line templates
        
        if 'function render' in clean_line:
            if depth > 0:
                print(f"Warning: Depth is {depth} before starting {clean_line.strip()} at line {i+1}")
            current_func = clean_line.strip().split('(')[0]
            print(f"Started {current_func} at line {i+1} with depth {depth}")
            
        depth += (open_c - close_c)
        
    print(f"Final depth: {depth}")

analyze_braces('js/app.js')
