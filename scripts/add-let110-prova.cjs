const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../src/questions/let110.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf-8'));

let nextId = Math.max(...data.questoes.map(q => q.id)) + 1;
const NOTA = 'Resolução Claude — gabarito não oficial';
const SOURCE = 'Prova-2026-09';

const novas = [
  {
    secao: 'S1',
    enunciado: 'A princípio, o conhecimento das civilizações antigas, incluindo a Grécia, era repassado entre as gerações por meio da oralidade. A praça pública era o local das discussões e das trocas de saberes. As gerações passadas eram vistas como fonte de saberes e, por isso, eram valorizadas. Porém, com o tempo, a escrita tomou o lugar da oralidade e objetos culturais como os poemas épicos Ilíada e Odisseia ganharam sua versão escrita.\n\nDefina o objetivo que serviu a escrita de informações que eram passadas oralmente entre as gerações.',
    alternativas: {
      A: 'Estratégia de ampliação do território.',
      B: 'Comércio de bens culturais entre os povos.',
      C: 'Preservação dos saberes e da cultura.',
      D: 'Dominação cultural e política.',
      E: 'Estratégia de sobrevivência militar.',
    },
    gabarito: 'C',
    explicacao: 'A passagem para a escrita, nesse contexto histórico, teve como finalidade registrar de forma duradoura os conhecimentos que antes dependiam da memória e da transmissão oral. A escrita de obras como a Ilíada e a Odisseia funcionou como instrumento de preservação dos saberes e da cultura de um povo, permitindo que gerações futuras tivessem acesso a esse patrimônio cultural.',
  },
  {
    secao: 'S2',
    enunciado: '"Baseando-se nos estudos do psicólogo bielorusso Lev Semyonovich Vygotsky (1896-1934), a linguagem passa a ser entendida como um fator que constitui o homem, tendo função social e comunicativa. É a linguagem que possibilita um contato com o mundo." (GEDOZ; COSTA-HUBES, 2012, p. 129.)\n\nAssinale a alternativa que explica as contribuições de Bakhtin para uma concepção sociointeracionista da linguagem, que se aproxima mais do pressuposto vygotskyano.',
    alternativas: {
      A: 'Bakhtin considera que o estudo da língua não pode ser desvinculado dos enunciados concretos, porque a língua é resultante de um trabalho histórico e coletivo e representa as vozes sociais e as relações dos falantes em contexto.',
      B: 'Bakhtin considerava que a língua era uma estrutura concreta, que poderia ser analisada internamente partindo da ideia de que cada elemento possui um valor determinado pela oposição em relação a outros elementos dele.',
      C: 'Bakhtin considera que existem as funções de locutor e alocutário, que devem se apropriar do código da língua para que o referente possa ser transmitido entre eles através de uma mensagem compreendida por ambos.',
      D: 'Bakhtin traça uma dicotomia entre a fala e a língua, considerando a primeira como manifestação individual que não deve ser estudada pela linguística, sendo a língua, com foco na escrita, o objeto científico de estudo.',
      E: 'Bakhtin define que a fonte de origem das línguas é o psiquismo individual e a manifestação dessa língua se dá por meio de atos de fala individuais que devem ser considerados como expressão do pensamento daquele falante específico.',
    },
    gabarito: 'A',
    explicacao: 'Bakhtin concebe a língua/linguagem como fenômeno social, histórico e dialógico: o sentido só existe em enunciados concretos, produzidos em interação, atravessados por vozes sociais — visão compatível com o sociointeracionismo de Vygotsky. As demais alternativas descrevem visões estruturalistas (B), modelo do código/Jakobson (C), dicotomia rígida língua/fala (D) ou perspectiva subjetivista individual (E).',
  },
  {
    secao: 'S1',
    enunciado: 'A leitura e a escrita, de modo geral, fazem parte dos currículos da educação básica, porém, isso não quer dizer que os estudantes, de fato, aprenderam a ler e a escrever de modo autônomo nas instituições escolares.\n\nSobre a leitura e a escrita, identifique se são Verdadeiras (V) ou Falsas (F) as afirmativas a seguir:\n\nI. Os exames nacionais, como o ENEM, por exemplo, permitem averiguar que as metas de leitura e escrita não foram atingidas.\n\nII. Ensinar a Língua Portuguesa para os próprios falantes da língua não é uma tarefa simples, como, em geral, supõe-se.\n\nIII. Frequentemente, o professor que recém terminou sua formação inicial baseia o seu ensino nos conceitos de gramática.\n\nIV. As escolas costumam investir mais em tarefas de escrita do que em tarefas de fala, apesar de estas serem mais presentes na vida das pessoas.\n\nAssinale a alternativa que apresenta a sequência correta:',
    alternativas: {
      A: 'V, F, V, F.',
      B: 'V, V, F, V.',
      C: 'V, V, V, V.',
      D: 'F, F, F, V.',
      E: 'F, V, V, V.',
    },
    gabarito: 'C',
    explicacao: 'Todas as afirmativas correspondem a diagnósticos amplamente discutidos na literatura sobre ensino de língua materna: (I) os resultados de exames como o ENEM evidenciam déficits de leitura e escrita; (II) ensinar a própria língua materna é reconhecidamente complexo; (III) professores iniciantes tendem a apoiar-se nos conceitos normativos de gramática; (IV) as escolas historicamente priorizam a escrita em detrimento do trabalho sistemático com a oralidade.',
  },
  {
    secao: 'S4',
    enunciado: 'A produção textual com prática e conhecimento está cada vez mais complicada nas escolas, em que os alunos apresentam muitas dificuldades ao transportarem, para o papel, as suas ideias na construção de um texto, principalmente em relação à coesão de elementos e a coerência de ideias.\n\nNesse sentido, assinale abaixo a alternativa que justifica a dificuldade que o aluno tem na escrita de textos.',
    alternativas: {
      A: 'Utilizam elementos de interlocução na produção do texto, sem considerar as etapas de produção.',
      B: 'Os alunos não têm informações suficientes para produzir textos, principalmente em relação à diversidade de assuntos.',
      C: 'A dificuldade está na hierarquização das informações e suas correlações de forma coerente no texto.',
      D: 'Cumprem o objetivo do propósito comunicativo, sem considerar a interligação dos elementos.',
      E: 'A textualidade e a manifestação linguística são utilizadas, mas com coesão aleatória.',
    },
    gabarito: 'C',
    explicacao: 'O enunciado destaca explicitamente que a dificuldade dos alunos está relacionada à coesão de elementos e à coerência de ideias — ou seja, à capacidade de organizar e relacionar logicamente as informações dentro do texto. Isso corresponde diretamente à hierarquização das informações e suas correlações coerentes (alternativa C). As demais alternativas deslocam o problema para falta de repertório, cumprimento do propósito comunicativo ou aleatoriedade da coesão.',
  },
  {
    secao: 'S5',
    enunciado: 'Os termos "texto" e "textualidade" são diferentes, mas se complementam na prática de uma construção textual. Esse sentido, caracterizado pela textualidade, refere-se às ideias apresentadas e à sequência lógica que aparecem no texto.\n\nQuanto aos critérios da textualidade, assinale a alternativa que corresponde a uma apresentação nova ou inesperada pelo receptor.',
    alternativas: {
      A: 'Informatividade.',
      B: 'Intertextualidade.',
      C: 'Coerência.',
      D: 'Situacionalidade.',
      E: 'Coesão.',
    },
    gabarito: 'A',
    explicacao: 'Entre os critérios de textualidade (Beaugrande e Dressler), a Informatividade diz respeito ao grau de previsibilidade/imprevisibilidade (novidade) das informações para o receptor: quanto mais inesperada ou nova a informação, maior a informatividade. A Situacionalidade (D) refere-se à adequação do texto à situação comunicativa (contexto de uso), não ao caráter novo da informação.',
  },
  {
    secao: 'S6',
    enunciado: 'Em qual alternativa encontramos uma definição de discurso em seu sentido amplo e que nos introduz em um campo disciplinar que trata da linguagem em seu funcionamento, segundo Eni Orlandi?',
    alternativas: {
      A: 'Discurso é um texto oral.',
      B: 'Discurso são todos os textos escritos feitos para serem falados.',
      C: 'Discurso é um diálogo.',
      D: 'Discurso é efeito de sentidos entre interlocutores.',
      E: 'Discurso é a mensagem entre emissor e receptor.',
    },
    gabarito: 'D',
    explicacao: 'Eni Orlandi define classicamente o discurso como "efeito de sentidos entre interlocutores" (Análise de Discurso: Princípios e Procedimentos). Essa definição rompe com a ideia de linguagem como simples transmissão de mensagem entre emissor e receptor (alternativa E, modelo informacional/código). As alternativas A, B e C reduzem discurso a formas textuais específicas, o que não corresponde ao sentido amplo da Análise do Discurso.',
  },
  {
    secao: 'S3',
    enunciado: 'A orientação de Trabalhos de Conclusão de Curso (TCCs) na universidade é um processo multifacetado que requer o desenvolvimento de habilidades críticas e reflexivas dos estudantes. Nesse sentido, é preciso fazer a integração entre teoria e prática e a construção de argumentos sólidos.\n\nConsiderando este contexto e o material estudado, analise as asserções a seguir e a relação proposta entre elas:\n\nI. A orientação de TCCs deve priorizar a construção de uma base teórica sólida antes de abordar a aplicação prática, garantindo que os estudantes compreendam profundamente os fundamentos teóricos de seu campo de estudo.\n\nPORQUE\n\nII. Uma abordagem que enfatiza inicialmente a base teórica fortalece a capacidade dos estudantes de aplicar esses conhecimentos em situações práticas, resultando em trabalhos de conclusão mais robustos e bem fundamentados.\n\nA respeito dessas asserções, assinale a alternativa correta:',
    alternativas: {
      A: 'As asserções I e II são verdadeiras, mas a II não é uma justificativa correta da I.',
      B: 'As asserções I e II são falsas.',
      C: 'A asserção I é verdadeira, e a asserção II é falsa.',
      D: 'A asserção I é falsa, e a asserção II é verdadeira.',
      E: 'As asserções I e II são verdadeiras, e a II é uma justificativa correta da I.',
    },
    gabarito: 'B',
    explicacao: 'O enunciado afirma que a orientação de TCC "requer a integração entre teoria e prática", não uma sequência rígida em que a teoria deve ser dominada antes. A literatura pedagógica defende que teoria e prática se retroalimentam simultaneamente ao longo da pesquisa. A asserção I, ao afirmar que se deve "priorizar" a teoria "antes" da prática, contraria essa ideia de integração — sendo falsa; a asserção II reforça a mesma lógica sequencial, também não se sustentando.',
    nota: 'Resolução Claude — gabarito não oficial. Questão de interpretação sobre pedagogia da orientação de TCC; diferentes bancas podem adotar leituras diferentes. Vale conferir o gabarito oficial/material de apoio da disciplina.',
  },
  {
    secao: 'S4',
    enunciado: '"A construção de um texto claro e bem estruturado exige a integração harmoniosa de duas dimensões, com a coerência garantindo a integridade do conteúdo e a coesão assegurando que esse conteúdo seja apresentado de maneira coesa e compreensível." (SILVA, R. C. B., 2017.)\n\nCom relação a este contexto e sobre o conteúdo estudado, avalie as asserções a seguir e a relação proposta entre elas:\n\nI. A coerência, como a estrutura profunda de um texto, organiza ideias de forma lógica e integrada, enquanto a coesão, a estrutura superficial, utiliza mecanismos linguísticos para conectar partes do texto. No entanto, a eficácia da coerência frequentemente depende da aplicação sutil de elementos coesivos que garantem uma continuidade argumentativa fluida.\n\nPORQUE\n\nII. A interação entre coerência e coesão deve ser analisada de forma integrada, pois a eficácia da organização lógica das ideias é frequentemente mediada pelos mecanismos de coesão, que garantem a fluidez e a clareza do texto. Portanto, a compreensão da construção textual exige a consideração da interdependência entre esses dois aspectos.\n\nA respeito dessas asserções, assinale a alternativa correta:',
    alternativas: {
      A: 'A asserção I é uma proposição verdadeira, e a II é uma proposição falsa.',
      B: 'As asserções I e II são proposições verdadeiras, mas a II não é uma justificativa da I.',
      C: 'As asserções I e II são proposições verdadeiras, e a II é uma justificativa da I.',
      D: 'As asserções I e II são falsas.',
      E: 'A asserção I é uma proposição falsa, e a II é uma proposição verdadeira.',
    },
    gabarito: 'C',
    explicacao: 'A asserção I descreve corretamente a distinção entre coerência (estrutura profunda, organização lógica) e coesão (estrutura superficial, mecanismos linguísticos), afirmando que a coerência depende de elementos coesivos para se manifestar. A asserção II generaliza essa interdependência — exatamente a razão pela qual a I é verdadeira, funcionando como sua justificativa. Ambas são verdadeiras e a II justifica a I.',
  },
];

const NOTA_PADRAO = 'Resolução Claude — gabarito não oficial';

for (const q of novas) {
  data.questoes.push({
    id: nextId++,
    secao: q.secao,
    source: SOURCE,
    enunciado: q.enunciado,
    alternativas: q.alternativas,
    gabarito: q.gabarito,
    explicacao: q.explicacao,
    nota: q.nota || NOTA_PADRAO,
  });
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Adicionadas ${novas.length} questões. Total agora: ${data.questoes.length}`);
novas.forEach((q, i) => console.log(`  id=${nextId - novas.length + i} secao=${q.secao} gabarito=${q.gabarito}`));
