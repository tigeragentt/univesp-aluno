const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../src/questions/soc100.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf-8'));

let nextId = Math.max(...data.questoes.map(q => q.id)) + 1;

const novas = [
  {
    secao: 'S1',
    enunciado: 'O conceito de livre arbítrio refere-se à capacidade do ser humano de tomar decisões de maneira independente, sem ser determinado por forças externas ou internas. Filosoficamente, ele é visto como a essência da autonomia humana, permitindo que as pessoas escolham suas ações e moldem seu destino. No entanto, há críticas que questionam essa autonomia, apontando limitações impostas à vontade humana por fatores diversos.\n\nConsidere essas críticas e escolha a alternativa correta que reflete uma visão de limitação interna do livre arbítrio:',
    alternativas: {
      A: 'A crença no livre arbítrio ignora as influências das estruturas sociais e culturais que moldam o comportamento humano, sugerindo que a autonomia plena é um ideal, mas não uma realidade prática.',
      B: 'O livre arbítrio pressupõe que todas as decisões humanas são tomadas de forma totalmente consciente e livre de influências emocionais ou contextuais, ignorando as limitações da racionalidade humana.',
      C: 'O conceito de livre arbítrio, embora valorizado pela filosofia, muitas vezes não leva em conta as limitações impostas por fatores psicológicos e biológicos que condicionam as decisões humanas.',
      D: 'A ideia de que a vontade humana é totalmente livre contrasta com perspectivas que apontam que, sem apoio social ou moral, a liberdade individual é insuficiente para escolhas éticas sólidas.',
      E: 'A ideia de que o ser humano possui liberdade plena para tomar decisões ignora que, sem suporte externo, a vontade pode ser vista como limitada, questionando a eficácia do livre arbítrio em promover escolhas moralmente corretas.',
    },
    gabarito: 'C',
    explicacao: 'A questão pede especificamente uma visão de limitação INTERNA. As alternativas A, D e E falam de limitações externas (estruturas sociais/culturais, apoio social/moral, suporte externo). A alternativa B mistura fatores emocionais com contextuais (externos). Apenas a alternativa C aponta fatores psicológicos e biológicos, que são de natureza interna ao indivíduo.',
  },
  {
    secao: 'S1',
    enunciado: 'A psicologia complementa a compreensão sociológica da ética. Há um coletivo que passa valores e define o que é bom e mau. Porém, existe também o indivíduo, que é responsável por suas ações e vive seu próprio espaço de crescimento, aprendendo nas situações concretas o que é certo ou errado. Nessa visão psicológica, a ética é uma construção pessoal. É uma dinâmica individual de integração no grupo e de preservação de seu espaço para sobreviver (Teles, 2010).\n\nConsiderando essa contextualização, analise as afirmativas a seguir:\n\nI. A perspectiva de Teles sobre a ética assume que a moralidade é um fenômeno puramente individual, desconsiderando a influência das normas e valores grupais e sugerindo que o desenvolvimento ético não é afetado pelo contexto sociocultural.\n\nII. O texto de Teles pressupõe que a ética é uma construção dinâmica onde a psicologia oferece uma visão do desenvolvimento moral individual e a sociologia fornece um contexto para entender como normas e valores são transmitidos e moldados socialmente.\n\nIII. De acordo com a visão de Teles, a ética se desenvolve exclusivamente a partir de um processo coletivo de construção moral, ignorando as dimensões psicológicas e individuais que afetam a percepção do que é certo ou errado.\n\nIV. A análise de Teles sugere que a ética, na interseção entre psicologia e sociologia, é uma prática que envolve tanto a aprendizagem individual de valores quanto a influência das estruturas sociais na formação do caráter moral.\n\nEstá correto o que se afirma em:',
    alternativas: {
      A: 'III, apenas.',
      B: 'II e IV, apenas.',
      C: 'I, apenas.',
      D: 'II, apenas.',
      E: 'IV, apenas.',
    },
    gabarito: 'B',
    explicacao: 'O texto apresenta ética como combinação de dimensão coletiva/social (normas transmitidas pelo grupo) e individual/psicológica (aprendizagem nas situações concretas). A afirmativa II descreve corretamente essa combinação. A afirmativa IV também está correta, pois resume a interseção entre aprendizagem individual e influência das estruturas sociais. As afirmativas I e III estão erradas por afirmarem cada uma um extremo (só individual ou só coletivo), contrariando o texto.',
  },
  {
    secao: 'S1',
    enunciado: 'A distinção entre autonomia e heteronomia é central para compreender a visão de Kant sobre a moralidade e a liberdade. Para Kant, a autonomia é a capacidade de autogovernar-se pela razão, enquanto a heteronomia reflete uma dependência de fatores externos. A autonomia moral é, para ele, um dos pilares de uma sociedade verdadeiramente livre e ética.\n\nCom base na filosofia moral de Kant, assinale a alternativa que expressa a importância da autonomia.',
    alternativas: {
      A: 'A autonomia moral, segundo Kant, é um conceito teórico, sem implicações práticas para a moralidade e a sociedade, sendo aplicada somente na filosofia abstrata.',
      B: 'A heteronomia, ao contrário da autonomia, é uma forma válida de moralidade para Kant, pois permite que as leis externas guiem a ação individual de maneira ética.',
      C: 'A autonomia é uma habilidade que os seres humanos podem exercer sem necessidade de desenvolvimento moral, desde que estejam livres de influências externas.',
      D: 'Para Kant, a autonomia é essencial para a moral, pois permite aos indivíduos agir pela razão, enquanto a heteronomia compromete a liberdade ao depender de fatores externos.',
      E: 'Kant considera que a heteronomia é mais importante que a autonomia, pois os indivíduos devem seguir regras estabelecidas por autoridades externas para alcançar a moralidade.',
    },
    gabarito: 'D',
    explicacao: 'A alternativa D reproduz exatamente o núcleo da ética kantiana: a autonomia (autogovernar-se pela razão) é o pilar da moralidade, enquanto a heteronomia (dependência de fatores externos) compromete a liberdade. As demais alternativas invertem ou distorcem essa relação, valorizando a heteronomia ou negando implicações práticas à autonomia.',
  },
  {
    secao: 'S2',
    enunciado: 'Os direitos fundamentais são pilares da sociedade moderna, garantindo proteção contra abusos e promovendo a dignidade humana. As características de historicidade, universalidade, inalienabilidade, imprescritibilidade e irrenunciabilidade desses direitos enfatizam sua importância e permanência ao longo do tempo, independentemente de fronteiras nacionais.\n\nDada a compreensão das características fundamentais dos direitos humanos, assinale a alternativa que exemplifica corretamente a aplicação dessas características na proteção dos direitos humanos em um contexto prático:',
    alternativas: {
      A: 'A universalidade dos direitos fundamentais significa que todas as nações aplicam esses direitos de maneira idêntica, sem variações culturais ou legais.',
      B: 'A irrenunciabilidade dos direitos fundamentais significa que os indivíduos podem escolher quais direitos desejam aplicar a si próprios, dependendo da situação.',
      C: 'A universalidade garante que os direitos humanos são válidos apenas em contextos onde a Declaração Universal dos Direitos Humanos foi formalmente adotada.',
      D: 'A imprescritibilidade dos direitos fundamentais permite que crimes contra a humanidade sejam julgados a qualquer momento, independentemente de quando foram cometidos.',
      E: 'A inalienabilidade sugere que os direitos fundamentais podem ser negociados entre países, dependendo das circunstâncias econômicas ou políticas.',
    },
    gabarito: 'D',
    explicacao: 'A imprescritibilidade é a característica segundo a qual os direitos fundamentais não se extinguem pelo decurso do tempo — por isso crimes contra a humanidade podem ser julgados a qualquer momento. As demais alternativas distorcem os conceitos: universalidade não significa aplicação idêntica; irrenunciabilidade não é escolha individual; inalienabilidade significa que os direitos NÃO podem ser negociados.',
  },
  {
    secao: 'S5',
    enunciado: 'A ética desempenha um papel crucial como reguladora das condutas e comportamentos no ambiente de trabalho. A ética profissional é um campo de estudo e prática que busca regular e orientar o relacionamento entre o profissional e sua clientela, sempre com o objetivo de preservar [preencher 1] e promover [preencher 2] no contexto sociocultural em que o profissional atua.\n\nOs termos [preencher 1] e [preencher 2] são corretamente substituídos por:',
    alternativas: {
      A: '1 - a dignidade humana; 2 - o bem-estar.',
      B: '1 - a justiça social; 2 - a igualdade de gênero.',
      C: '1 - os valores éticos; 2 - a inclusão social.',
      D: '1 - a equidade de direitos; 2 - a paz social.',
      E: '1 - o respeito mútuo; 2 - a solidariedade.',
    },
    gabarito: 'A',
    explicacao: 'A formulação clássica da ética profissional envolve preservar a dignidade humana (algo básico e universal ligado à pessoa) e promover o bem-estar (relacionado à qualidade de vida no contexto sociocultural). Os demais pares são menos coerentes com a ideia de "preservar" algo essencial e "promover" um resultado amplo no contexto sociocultural.',
  },
  {
    secao: 'S6',
    enunciado: 'A história das sociedades contemporâneas ocidentais é marcada por processos de colonização e escravização que marginalizaram determinados grupos sociais, como os negros de origem africana e os povos indígenas das Américas. As ideologias racistas que emergiram durante esses períodos ainda influenciam a exclusão social desses grupos. Diante desse contexto histórico, as políticas de inclusão social são fundamentais para corrigir desigualdades e garantir direitos.\n\nQual o objetivo das políticas de inclusão social nesse contexto?',
    alternativas: {
      A: 'Promover a igualdade de oportunidades e a integração plena de todos os grupos marginalizados.',
      B: 'Manter as estruturas sociais tradicionais que deram origem às desigualdades dentro do contexto histórico.',
      C: 'Valorizar somente os aspectos culturais dos grupos marginalizados sem oferecer suporte legal ou econômico.',
      D: 'Restringir o reconhecimento e os direitos apenas aos grupos que são historicamente privilegiados.',
      E: 'Focar exclusivamente no desenvolvimento econômico, ignorando as questões de integração social.',
    },
    gabarito: 'A',
    explicacao: 'As políticas de inclusão social têm o objetivo de corrigir desigualdades históricas promovendo igualdade de oportunidades e integração plena dos grupos marginalizados, conforme afirmado no próprio enunciado. As demais alternativas descrevem o oposto desse objetivo.',
  },
  {
    secao: 'S7',
    enunciado: 'Os conceitos de sustentabilidade, ecologia, preservação e qualidade de vida são questões éticas fundamentais. Estes temas estão interligados à ética, pois envolvem uma abordagem racional que visa o bem-estar global.\n\nAnalise as seguintes afirmativas sobre a relação entre sustentabilidade, ecologia, preservação, qualidade de vida e ética:\n\nI. A sustentabilidade e a preservação ambiental estão conectadas à ética porque promovem a justiça intergeracional, assegurando que as futuras gerações possam usufruir dos mesmos recursos e condições ambientais que temos hoje.\n\nII. A qualidade de vida se limita ao bem-estar físico e material das populações, e sua consideração ética não envolve aspectos emocionais ou sociais mais amplos.\n\nIII. A ecologia, sendo um campo de estudo focado em processos naturais, não se sobrepõe à ética, já que examina unicamente as interações biológicas, sem tratar diretamente da conduta humana em relação ao meio ambiente.\n\nIV. A ética, ao lidar com temas como sustentabilidade e qualidade de vida, busca racionalmente equilibrar as necessidades humanas e ambientais, promovendo um bem-estar global sustentável.\n\nEstá correto o que se afirma em:',
    alternativas: {
      A: 'I e IV, apenas.',
      B: 'II e IV, apenas.',
      C: 'II e III, apenas.',
      D: 'I e III, apenas.',
      E: 'I e II, apenas.',
    },
    gabarito: 'A',
    explicacao: 'A afirmativa I está correta: sustentabilidade e preservação se ligam à ética pela ideia de justiça intergeracional. A afirmativa IV também está correta, resumindo o papel da ética em equilibrar necessidades humanas e ambientais. A afirmativa II está errada, pois restringe qualidade de vida apenas ao bem-estar físico/material. A afirmativa III está errada, pois nega que a ecologia se relacione com a conduta humana.',
  },
  {
    secao: 'S2',
    enunciado: 'A história da cidadania é uma narrativa de lutas, conquistas e transformações. Cada época trouxe consigo desafios e ideologias que moldaram de forma única o entendimento e a prática da cidadania. Desde as primeiras noções de participação cívica na Grécia Antiga, passando pelos direitos civis garantidos pela Magna Carta, até os movimentos de direitos civis do século XX e as atuais discussões sobre cidadania digital e global, a evolução da cidadania reflete uma interação contínua entre as demandas sociais e os contextos políticos e econômicos.\n\nSelecione a opção que sintetiza os principais marcos desta evolução.',
    alternativas: {
      A: 'A evolução da cidadania foi uniforme em todas as culturas e sociedades, sem variações significativas ou influências ideológicas distintas.',
      B: 'A cidadania foi uma invenção moderna, sem precedentes históricos ou influências ideológicas anteriores ao século XIX.',
      C: 'O conceito de cidadania expandiu-se de direitos políticos para incluir direitos civis, sociais e, mais recentemente, digitais, refletindo as mudanças ideológicas e tecnológicas.',
      D: 'As ideologias políticas tiveram um impacto mínimo na definição e na prática da cidadania ao longo da história.',
      E: 'A cidadania sempre esteve ligada exclusivamente aos direitos políticos, sem influência das mudanças sociais ou econômicas.',
    },
    gabarito: 'C',
    explicacao: 'Essa alternativa sintetiza corretamente a evolução histórica descrita no enunciado: da participação cívica antiga aos direitos civis, sociais e digitais, sempre em interação com mudanças ideológicas e tecnológicas. As demais alternativas negam essa evolução (uniformidade, ausência de precedentes, impacto mínimo das ideologias, exclusividade dos direitos políticos).',
  },
];

for (const q of novas) {
  data.questoes.push({
    id: nextId++,
    secao: q.secao,
    source: 'prova',
    enunciado: q.enunciado,
    alternativas: q.alternativas,
    gabarito: q.gabarito,
    explicacao: q.explicacao,
  });
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Adicionadas ${novas.length} questões. Total agora: ${data.questoes.length}`);
novas.forEach((q, i) => console.log(`  id=${nextId - novas.length + i} secao=${q.secao} gabarito=${q.gabarito}`));
