with open('src/app/help/page.tsx', 'r') as f:
    text = f.read()

text = text.replace('const requestRef = useRef<number>();', 'const requestRef = useRef<number>(0);')

with open('src/app/help/page.tsx', 'w') as f:
    f.write(text)
