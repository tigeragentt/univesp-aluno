const fs = require('fs');

const mdPath = 'C:/Users/solan/.openclaw/media/inbound/SOC100_-_Atividades_Avaliativas_2026---ffe5d37c-dcf5-445a-8a23-12abd76235e7.md';
const outPath = 'C:/OC/projects/univesp-aluno/src/questions/soc100.json';

const SECTION_NAMES = {
  '1': 'Ética e moral',
  '2': 'Cidadania e direitos',
  '3': 'Sociedade e cultura',
  '4': 'Política e democracia',
  '5': 'Ética profissional',
  '6': 'Direitos humanos e diversidade',
  '7': 'Ética na pesquisa e sustentabilidade',
};

function clean(s) {
  return s
    .replace(/\\\s*/g, '')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^\s+|\s+$/g, '');
}

const text = fs.readFileSync(mdPath, 'utf-8');
const lines = text.split('\n');

const questoes = [];
let qId = 0;
let currentSec = null;
// state: idle | enunciado | alt | resposta | explicacao
let state = 'idle';
let q = null;
let currentAltKey = null;
let altBuf = [];
let enuncBuf = [];
// For gabarito extraction from resposta block
let respostaBuf = [];
let explicacaoBuf = [];
let inClaudeBlock = false;
let inErrada = false;

function finalizeAlt() {
  if (currentAltKey && altBuf.length > 0) {
    q.alternativas[currentAltKey] = clean(altBuf.join(' '));
    currentAltKey = null;
    altBuf = [];
  }
}

function finalizeQ() {
  if (!q) return;
  finalizeAlt();
  if (q.enunciado && Object.keys(q.alternativas).length >= 2) {
    // Try to extract gabarito from respostaBuf if not set
    if (!q.gabarito && respostaBuf.length > 0) {
      for (const rb of respostaBuf) {
        const m = rb.match(/^([A-E])[.\s]/);
        if (m) { q.gabarito = m[1]; break; }
        const m2 = rb.match(/\*\*([A-E])\*\*/);
        if (m2) { q.gabarito = m2[1]; break; }
        const m3 = rb.match(/Alternativa\s+([A-E])/i);
        if (m3) { q.gabarito = m3[1]; break; }
      }
    }
    if (explicacaoBuf.length > 0 && !q.explicacao) {
      q.explicacao = clean(explicacaoBuf.slice(0, 5).join(' '));
    }
    questoes.push({ ...q });
  }
  q = null;
  currentAltKey = null;
  altBuf = [];
  enuncBuf = [];
  respostaBuf = [];
  explicacaoBuf = [];
  inClaudeBlock = false;
  inErrada = false;
}

function startQ(secId) {
  finalizeQ();
  qId++;
  q = {
    id: qId,
    secao: secId,
    source: 'modulo',
    enunciado: '',
    alternativas: {},
    gabarito: '',
    explicacao: '',
  };
  state = 'enunciado';
  enuncBuf = [];
}

for (let i = 0; i < lines.length; i++) {
  const raw = lines[i];
  const line = raw.trim();

  // Section header
  const secMatch = line.match(/^#\s+S(\d+)\s+\\?-\s+Atividade/);
  if (secMatch) {
    finalizeQ();
    currentSec = `S${secMatch[1]}`;
    state = 'idle';
    continue;
  }

  // Question headers: ## 1 / ## 2 / ## Questão 1 / # 10 / # 11
  const qHeadMatch = line.match(/^(#{1,2})\s+(?:Questão\s+)?(\d+)\s*$/);
  if (qHeadMatch && currentSec) {
    startQ(currentSec);
    continue;
  }

  if (!q) continue;

  // Sub-headers that signal transitions
  // "### Resposta" / "### Resposta D" / "#### Resposta **A**"
  const respHeaderMatch = line.match(/^#{3,4}\s+Resposta\s*(?:\*\*)?([A-E])?(?:\*\*)?\s*$/);
  if (respHeaderMatch && !line.match(/Resposta\s+(Claude|Gemini|IA|GPT|Copilot|Meta|Google)/i)) {
    finalizeAlt();
    if (state === 'enunciado') { q.enunciado = clean(enuncBuf.join(' ')); enuncBuf = []; }
    state = 'resposta';
    inErrada = false;
    if (respHeaderMatch[1] && !q.gabarito) { q.gabarito = respHeaderMatch[1]; }
    continue;
  }
  if (line.match(/^#{3,4}\s+Resposta\s+(Claude|Gemini|IA|GPT|Copilot|Meta|Google|Claude\s*\d*)\s*$/i)) {
    // Transition to explicacao from any state (some sections skip ### Resposta)
    if (state === 'alt') finalizeAlt();
    if (state === 'enunciado') { q.enunciado = clean(enuncBuf.join(' ')); enuncBuf = []; }
    state = 'explicacao';
    inClaudeBlock = true;
    explicacaoBuf = [];
    continue;
  }
  if (line.match(/^#{4,5}\s+(Claude|Gemini|GPT|Copilot|Meta|Google|Claude\s*\d*)\s*$/i)) {
    if (state === 'explicacao') {
      if (!inClaudeBlock) {
        inClaudeBlock = true;
        explicacaoBuf = [];
      }
    }
    continue;
  }
  // Sub-section headers ending current question's data
  if (line.match(/^#{3,5}\s+/) && (state === 'resposta' || state === 'explicacao')) {
    // Another header block, keep going (might be another AI)
    continue;
  }

  // Alternativa markers: A.  B.  C.  D.  E.
  // Formats: "A.  " / "A. " / "A.\- " / "A.. " / "A. \- text"
  const altMatch = line.match(/^([A-E])\.\s*(?:\\?\-?\s*)?(.*)$/);
  if (altMatch && (state === 'enunciado' || state === 'alt')) {
    // Finalize previous alt or flush enunciado
    if (state === 'enunciado') {
      q.enunciado = clean(enuncBuf.join(' '));
      enuncBuf = [];
    }
    finalizeAlt();
    currentAltKey = altMatch[1];
    altBuf = altMatch[2] ? [altMatch[2]] : [];
    state = 'alt';
    continue;
  }

  // Handle "A.. " double-dot (e.g. "A.. I e III, apenas.")
  const altMatch2 = line.match(/^([A-E])\.\.\s+(.*)$/);
  if (altMatch2 && (state === 'enunciado' || state === 'alt')) {
    if (state === 'enunciado') { q.enunciado = clean(enuncBuf.join(' ')); enuncBuf = []; }
    finalizeAlt();
    currentAltKey = altMatch2[1];
    altBuf = altMatch2[2] ? [altMatch2[2]] : [];
    state = 'alt';
    continue;
  }

  // Content based on state
  // "Questão N Resposta **X**" or "Questão N Resposta X"
  const questaoRespMatch = line.match(/^Questão\s+\d+\s+Resposta\s+(?:\*\*)?([A-E])(?:\*\*)?\s*$/i);
  if (questaoRespMatch) {
    if (!q.gabarito) q.gabarito = questaoRespMatch[1];
    // Only transition to resposta state if alternativas already collected
    if (Object.keys(q.alternativas).length > 0 || state === 'alt') {
      if (state === 'alt') finalizeAlt();
      state = 'resposta';
    }
    // else: gabarito is set but stay in enunciado state (alternativas come after)
    continue;
  }
  // "Questão N Resposta" without letter — platform label, skip it
  if (line.match(/^Questão\s+\d+\s+Resposta\s*$/i)) {
    // Don't change state — it's just a label before or between content
    continue;
  }

  if (state === 'enunciado') {
    // Skip platform artifacts like "Questão 1Resposta" or "Questão NResposta"
    if (line.match(/^Questão\s+\d+Resposta/)) continue;
    // "Resposta X" inline (S1 Q5 style)
    const inlineResp = line.match(/^Resposta\s+([A-E])\s*$/i);
    if (inlineResp) {
      q.enunciado = clean(enuncBuf.join(' '));
      enuncBuf = [];
      if (!q.gabarito) q.gabarito = inlineResp[1];
      state = 'resposta';
      continue;
    }
    if (line && !line.startsWith('#') && !line.startsWith('!') &&
        !line.startsWith('Questão') && !line.startsWith('Resposta')) {
      enuncBuf.push(line);
    }
  } else if (state === 'alt') {
    // "Resposta X" inline after alternativas (fallback)
    const inlineResp2 = line.match(/^Resposta\s+([A-E])\s*$/i);
    if (inlineResp2) {
      finalizeAlt();
      if (!q.gabarito) q.gabarito = inlineResp2[1];
      state = 'resposta';
      continue;
    }
    if (line && !line.startsWith('#')) {
      altBuf.push(line);
    }
  } else if (state === 'resposta') {
    if (!line) continue;
    // Skip ERRADA lines for gabarito, but collect them
    if (line.startsWith('ERRADA')) {
      inErrada = true;
      continue;
    }
    if (!q.gabarito) {
      const gm = line.match(/^([A-E])[.\s]/);
      if (gm) { q.gabarito = gm[1]; continue; }
      const gm2 = line.match(/^([A-E])\.$/) ;
      if (gm2) { q.gabarito = gm2[1]; continue; }
      respostaBuf.push(line);
    }
    // Collect for fallback
    respostaBuf.push(line);
  } else if (state === 'explicacao') {
    if (inClaudeBlock && line && !line.startsWith('#') && !line.startsWith('[')) {
      // Extract gabarito from cleaned line (backslash escapes removed)
      if (!q.gabarito) {
        const cl2 = clean(line);
        // "alternativa correta é a B." — careful: 'a' is Portuguese article, match uppercase only
        const gm1 = cl2.match(/[Aa]lternativa correta[^A-E]*\b([A-E])\b/);
        if (gm1 && gm1[1] !== gm1[1].toLowerCase()) { q.gabarito = gm1[1]; }
        // "é a B." — require uppercase letter
        const gm2 = cl2.match(/\bé a ([A-E])[.\s,;)—]/);
        if (!q.gabarito && gm2) { q.gabarito = gm2[1]; }
        // "Alternativa X" at start (cleaned)
        const gm3 = cl2.match(/^Alternativa\s+([A-E])[.\s,;)—]/);
        if (!q.gabarito && gm3) { q.gabarito = gm3[1]; }
        // "opção A"
        const gm5 = cl2.match(/opção\s+([A-E])[.\s,;)—]/);
        if (!q.gabarito && gm5) { q.gabarito = gm5[1]; }
        // Plain "Resposta A" on its own line
        const gm7 = line.match(/^Resposta\s+([A-E])\s*$/);
        if (!q.gabarito && gm7) { q.gabarito = gm7[1]; }
      }
      explicacaoBuf.push(clean(line));
    }
  }
}

finalizeQ();

// Manual corrections for ambiguous/ERRADA cases
// S1 Q5: "Resposta E" is misleading; correct answer = C (I-B;II-D;III-A;IV-C;V-E)
// S6 Q2: submitted E marked ERRADA; AI consensus = C
// S6 Q12: submitted B marked ERRADA; Claude analysis = D
const corrections = { 5: 'C', 42: 'C', 52: 'D' };
questoes.forEach(q => { if (corrections[q.id]) q.gabarito = corrections[q.id]; });

// Normalize all gabaritos to uppercase
questoes.forEach(q => { if (q.gabarito) q.gabarito = q.gabarito.toUpperCase(); });

// Build sections list
const secoes = Object.entries(SECTION_NAMES).map(([n, nome]) => ({
  id: `S${n}`,
  nome,
}));

const output = {
  materia: 'SOC100',
  nome: 'Ética, Cidadania e Sociedade',
  secoes,
  questoes,
};

fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
console.log(`Generated ${questoes.length} questions across ${new Set(questoes.map(q => q.secao)).size} sections`);

// Debug: show questions with missing gabarito
const missing = questoes.filter(q => !q.gabarito);
if (missing.length > 0) {
  console.log('\nMissing gabarito:');
  missing.forEach(q => console.log(`  id=${q.id} secao=${q.secao} enunciado="${q.enunciado.slice(0,60)}..."`));
}

// Show summary per section
const bySec = {};
questoes.forEach(q => { bySec[q.secao] = (bySec[q.secao] || 0) + 1; });
console.log('\nQuestions per section:', bySec);
