import sys

def check(file):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    stack = []
    line_num = 1
    
    in_string = False
    string_char = ''
    in_template = False
    
    i = 0
    while i < len(text):
        c = text[i]
        
        if c == '\n':
            line_num += 1
            
        if in_string:
            if c == '\\':
                i += 1
                if i < len(text) and text[i] == '\n':
                    line_num += 1
            elif c == string_char:
                in_string = False
        elif in_template:
            if c == '\\':
                i += 1
                if i < len(text) and text[i] == '\n':
                    line_num += 1
            elif c == '`':
                in_template = False
            elif c == '$' and i + 1 < len(text) and text[i+1] == '{':
                stack.append(('${', line_num))
                i += 1
        else:
            if c in ['\"', '\'']:
                in_string = True
                string_char = c
            elif c == '`':
                in_template = True
            elif c in ['{', '(', '[']:
                stack.append((c, line_num))
            elif c in ['}', ')', ']']:
                if not stack:
                    print(f'Unmatched closing {c} at line {line_num}')
                else:
                    top, start_line = stack.pop()
                    if (top == '{' and c != '}') or (top == '${' and c != '}') or \
                       (top == '(' and c != ')') or \
                       (top == '[' and c != ']'):
                        print(f'Mismatched closing {c} at line {line_num}, expected match for {top} from line {start_line}')
        
        i += 1

    if in_template:
        print(f'Unclosed template string at end of file, started at line {stack[-1][1] if stack else "unknown"}')
    if in_string:
        print(f'Unclosed string at end of file')
    if stack:
        print(f'Unclosed blocks/parentheses at end of file: {stack}')
        
check('js/app.js')
