const fs = require('fs');
const content = fs.readFileSync('src/app/help/page.tsx', 'utf8');

// We can just use an HTML parser or regex counting
let divs = 0;
let motions = 0;

const lines = content.split('\n');
let openedDivs = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Count matching tags
  const openDiv = (line.match(/<div(\s|>)/g) || []).length;
  const closeDiv = (line.match(/<\/div>/g) || []).length;
  
  const openMotion = (line.match(/<motion\.div(\s|>)/g) || []).length;
  const closeMotion = (line.match(/<\/motion\.div>/g) || []).length;
  
  divs += openDiv - closeDiv;
  motions += openMotion - closeMotion;
}

console.log('Unclosed divs:', divs);
console.log('Unclosed motions:', motions);
