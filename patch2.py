with open('src/app/help/page.tsx', 'r') as f:
    text = f.read()

text = text.replace('const getScore = (name) =>', 'const getScore = (name: string) =>')
text = text.replace('const max = (a, b) =>', 'const max = (a: number, b: number) =>')

with open('src/app/help/page.tsx', 'w') as f:
    f.write(text)

