import os
import re

def increase_font(match):
    size_str = match.group(1)
    unit = match.group(2)
    
    try:
        size = float(size_str)
        if unit == 'px':
            if size <= 15:
                size += 4
            return f"font-size: {int(size) if size.is_integer() else size}px"
        elif unit == 'rem':
            if size <= 0.95:
                size += 0.25
            return f"font-size: {round(size, 3)}rem"
    except ValueError:
        pass
    
    return match.group(0)

def process_file(filepath):
    encodings = ['utf-8', 'utf-16', 'utf-8-sig', 'windows-1252']
    content = None
    used_encoding = None

    for enc in encodings:
        try:
            with open(filepath, 'r', encoding=enc) as f:
                content = f.read()
            used_encoding = enc
            break
        except UnicodeDecodeError:
            continue

    if content is None:
        print(f"Skipping {filepath}: unable to decode")
        return

    # match font-size: 12px or font-size:12px or font-size: 1.2rem
    new_content = re.sub(r'font-size:\s*([\d\.]+)(px|rem)', increase_font, content, flags=re.IGNORECASE)

    if new_content != content:
        with open(filepath, 'w', encoding=used_encoding) as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    workspace = r"c:\Users\pruth\OneDrive\Desktop\DEC Infra & DEC Industries"
    for root, dirs, files in os.walk(workspace):
        if '.git' in root or 'node_modules' in root:
            continue
        for file in files:
            if file.endswith('.html') or file.endswith('.js') or file.endswith('.css'):
                process_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
