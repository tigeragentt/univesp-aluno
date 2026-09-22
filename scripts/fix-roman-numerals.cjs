const fs = require('fs');
const path = require('path');

const TO_ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

function altUsesRoman(alternativas) {
  const text = Object.values(alternativas).join(' ');
  return /\b(I{1,3}|IV|VI{0,3}|IX)\b/.test(text);
}

function convertArabicToRoman(text) {
  return text.replace(/(\s)(\d+)(\.\s)/g, (_, space, num, dot) => {
    const n = parseInt(num, 10);
    return space + (TO_ROMAN[n] || num) + dot;
  });
}

const files = [
  path.join(__dirname, '../src/questions/let110.json'),
  path.join(__dirname, '../src/questions/soc100.json'),
];

let totalFixed = 0;

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  let fixed = 0;

  for (const q of data.questoes) {
    const hasArabic = /\s\d+\.\s/.test(q.enunciado);
    if (hasArabic && altUsesRoman(q.alternativas)) {
      const before = q.enunciado;
      q.enunciado = convertArabicToRoman(q.enunciado);
      if (q.enunciado !== before) {
        fixed++;
        console.log(`  id=${q.id} (${path.basename(file)}): converted`);
      }
    }
  }

  if (fixed > 0) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`${path.basename(file)}: ${fixed} questões corrigidas`);
  } else {
    console.log(`${path.basename(file)}: nenhuma correção necessária`);
  }
  totalFixed += fixed;
}

console.log(`\nTotal corrigido: ${totalFixed}`);
