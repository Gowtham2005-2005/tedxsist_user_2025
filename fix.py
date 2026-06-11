import os, re

directory = r'd:\PROJECTS\webstromprojects\tedxsist\components'
for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Use negative lookahead to avoid double casting
            new_content = re.sub(r'(ease:\s*"[a-zA-Z]+"\s*)(?!\s*as\s*const)', r'\1 as const', content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Fixed {path}')
