import type { LocaleContent } from "./content";

export const content: LocaleContent = {
  ui: {
    kicker: "Um guia simples, em linguagem natural",
    title: "Como funciona o algoritmo “For You” do X",
    intro:
      "Já parou para pensar por que o X te mostrou aquele post? Tem uma cadeia de 8 passos por trás. Aqui está — em 5 minutos, em português simples.",
    readTime: "Leitura de 5 min · 8 passos",
    startReading: "Começar a ler",
    tldrTitle: "A versão de 30 segundos",
    diagramTitle: "O fluxo em um olhar",
    diagramNodes: [
      "Pedido",
      "Buscar candidatos",
      "Filtrar",
      "Pontuar com ML",
      "Seu feed",
    ],
    stagesTitle: "Passo a passo",
    bigIdeaTitle: "A grande ideia por trás da pontuação",
    bigIdeaBody: [
      "O modelo não devolve um único número de “relevância”. Ele prevê a probabilidade de várias reações diferentes que você pode ter — curtir, responder, repostar, compartilhar, clicar, ficar olhando, bloquear, silenciar, denunciar. Cada ação tem um peso: reações boas somam pontos, reações ruins tiram. O feed é ordenado pela soma ponderada.",
      "Por isso “engajamento” não conta a história inteira. Posts que fazem as pessoas bloquearem ou denunciarem não são recompensados — esses sinais derrubam a pontuação.",
    ],
    shareCtaTitle: "Conhece alguém que ia curtir isso?",
    shareCtaBody:
      "Se isso te ajudou a entender o feed um pouco melhor, manda para uma pessoa que ia gostar.",
    footerSource:
      "Feito a partir do algoritmo open-source do feed For You do X.",
    viewSource: "Ver no GitHub",
    stepLabel: "Passo",
    createdBy: "Feito por",
    underTheHood: "Por dentro:",
    readMore: "Ler este passo",
    previous: "Passo anterior",
    next: "Próximo passo",
    backToOverview: "Voltar para a visão geral",
    share: "Compartilhar esta página",
    copied: "Link copiado",
    localeName: "Português",
    switchToOther: "English",
    detailsTitle: "Um pouco mais a fundo",
    notFoundTitle: "Página não encontrada",
    notFoundBody:
      "Essa URL não corresponde a nada neste site. Volte para a visão geral para começar do início.",
  },
  stages: [
    {
      slug: "request-arrives",
      number: 1,
      title: "O pedido chega",
      summary: "Um pedido entra no sistema.",
      plain:
        "Você abre o app e puxa para atualizar. Isso envia um pedido a um serviço chamado Home Mixer, que é o maestro de tudo o que acontece a seguir.",
      analogy:
        "Pense no Home Mixer como o balcão de passagem de uma cozinha de restaurante: todo prato passa por ali, e é ele que decide o que chega à sua mesa e em que ordem.",
      underTheHood:
        "O Home Mixer expõe um endpoint gRPC que devolve posts ranqueados para um usuário.",
      file: "home-mixer/scored_posts_server.rs",
      details: [
        "O Home Mixer não gera os posts sozinho. Ele orquestra um pipeline: pede candidatos a outros serviços, enriquece com dados, filtra, pontua e, no final, devolve uma lista ordenada.",
        "Separar a orquestração da geração é o que torna o sistema flexível. Novas fontes de candidatos ou novos filtros podem ser plugados sem mexer no resto.",
      ],
    },
    {
      slug: "who-are-you",
      number: 2,
      title: "Quem é você, agora?",
      summary: "O sistema reúne tudo o que sabe sobre você.",
      plain:
        "Antes de buscar qualquer post, o sistema monta um retrato fresco de você: quem você segue, o que você curtiu, respondeu, compartilhou, os tópicos que você acompanha, até o que foi exibido recentemente.",
      analogy:
        "Como uma barista que, antes de preparar seu café, dá uma olhada no seu pedido de costume, no humor que você parece estar e no que você experimentou na semana passada.",
      underTheHood:
        "São os “query hydrators” — pequenos pedaços de código que buscam, cada um, uma fatia do contexto em paralelo.",
      file: "home-mixer/query_hydrators/",
      details: [
        "Cada hydrator busca uma peça do contexto: tópicos seguidos, starter packs, bloom filters de impressão (para o mesmo post não te perseguir), grafo de seguidores mútuos, histórico do que já foi entregue.",
        "A grande virada é que não existem mais “features” feitas à mão aqui. O modelo recebe sua sequência bruta de engajamentos e aprende relevância direto dali.",
      ],
    },
    {
      slug: "two-sources",
      number: 3,
      title: "Duas fontes de posts",
      summary: "Ele junta candidatos — de quem você segue e de desconhecidos.",
      plain:
        "Agora ele reúne candidatos de dois lugares, ao mesmo tempo. Posts de contas que você segue (“in-network”, servidos pelo Thunder) e posts de gente que você não segue mas que pode te interessar (“out-of-network”, encontrados pelo Phoenix).",
      analogy:
        "Dois batedores saem em campo: um vasculha o que o seu círculo de confiança postou, o outro varre o mundo inteiro atrás de coisas que tenham a sua cara.",
      underTheHood:
        "O Thunder é um armazenamento em memória escrito em Rust, alimentado por Kafka, com buscas em menos de um milissegundo. O Phoenix retrieval usa um modelo de duas torres: uma torre transforma você num vetor, outra transforma os posts em vetores, e os mais próximos vencem.",
      file: "thunder/ · phoenix/recsys_retrieval_model.py",
      details: [
        "O Thunder ingere eventos de criação e remoção de posts pelo Kafka e mantém posts recentes em memória, organizados por usuário. Ele responde “o que as pessoas que sigo acabaram de postar?” em menos de um milissegundo.",
        "O Phoenix retrieval é a mágica do feed “For You”: ele consegue mostrar posts de gente que você nunca ouviu falar. A torre do usuário codifica seu gosto, a torre dos candidatos codifica cada post, e uma busca por similaridade escolhe os melhores.",
      ],
    },
    {
      slug: "enrichment",
      number: 4,
      title: "Preenchendo as lacunas",
      summary: "Cada post recebe mais dados em volta.",
      plain:
        "Para cada candidato, mais dados são puxados: o texto em si, mídia, dados do autor, contagens de engajamento, idioma, sinais de brand safety, se é um quote post, e por aí vai.",
      analogy:
        "Cada prato candidato volta com a ficha completa: ingredientes, alérgenos, de onde veio.",
      underTheHood:
        "São hydrators — eles enriquecem os candidatos em paralelo, antes de qualquer decisão de ranqueamento.",
      file: "home-mixer/candidate_hydrators/",
      details: [
        "Neste ponto, um candidato ainda é só um ID. Os hydrators colam o texto, a mídia, os metadados do autor, contagens de engajamento, códigos de idioma e sinais de segurança.",
        "Rodar tudo em paralelo mantém o pedido rápido. Um hydrator lento pode ser marcado como opcional para o pedido não travar nele.",
      ],
    },
    {
      slug: "cheap-filters",
      number: 5,
      title: "Filtros baratos primeiro",
      summary: "Ele descarta o lixo óbvio.",
      plain:
        "Antes de pagar o custo de rodar ML, vêm as remoções óbvias: duplicatas, posts velhos demais, seus próprios posts, posts de gente que você bloqueou ou silenciou, posts com palavras que você silenciou e posts que você já viu.",
      analogy:
        "A primeira passada do segurança na porta — quem claramente não entra hoje à noite é dispensado antes do show começar.",
      underTheHood:
        "Cada filtro é um pedaço pequeno de código com um único trabalho. Componível e barato de rodar.",
      file: "home-mixer/filters/",
      details: [
        "A ordem importa. Os filtros baratos rodam primeiro porque diminuem a pilha de posts que vai passar pela etapa cara de ML.",
        "É também aqui que os controles pessoais (silenciar, bloquear, palavras silenciadas) efetivamente entram em ação.",
      ],
    },
    {
      slug: "scoring",
      number: 6,
      title: "A pontuação (o algoritmo em si)",
      summary: "Um modelo de ML prevê como você vai reagir a cada post.",
      plain:
        "Cada post restante é pontuado por um modelo de ML chamado Phoenix, um transformer baseado no Grok. Para cada post, ele prevê a probabilidade de você: curtir, responder, repostar, citar, clicar, expandir a foto, assistir ao vídeo, ficar olhando, compartilhar, seguir o autor… e também as negativas: marcar como “não tenho interesse”, bloquear, silenciar, denunciar.",
      analogy:
        "Imagine um amigo olhando para um post e apostando baixinho: “Tem 14% de chance de você curtir, 2% de chance de responder, 0,3% de chance de bloquear essa pessoa.” Depois ele soma tudo com pesos.",
      underTheHood:
        "Cada probabilidade prevista tem um peso. Ações positivas somam, ações negativas subtraem. Em seguida rodam duas passadas de correção: a diversidade de autores atenua posts quando um autor está dominando o feed, e o OON scorer reequilibra o conteúdo out-of-network.",
      file: "phoenix/recsys_model.py · home-mixer/scorers/",
      details: [
        "O Phoenix é um transformer. Ele lê seu histórico de engajamento como uma sequência e, para cada candidato, prevê um vetor de probabilidades — uma por tipo de ação.",
        "Um truque inteligente chamado “isolamento de candidatos” proíbe os candidatos de prestarem atenção uns nos outros durante a pontuação. Resultado: a nota de cada post depende só do seu contexto, ou seja, é independente e cacheável.",
      ],
    },
    {
      slug: "selection",
      number: 7,
      title: "Escolher os melhores",
      summary: "Ele ordena pela nota e fica com os do topo.",
      plain:
        "Ordena pela nota final. Pega os K melhores. Esses são os posts que vão ser entregues a você, nessa ordem.",
      analogy:
        "Todos os pratos têm uma nota final. O balcão manda os melhores, do melhor para o pior.",
      underTheHood: "O selector só ordena e corta.",
      file: "home-mixer/selectors/",
      details: [
        "K é pequeno — geralmente algumas dezenas de posts — porque a maioria dos usuários só rola alguns antes de puxar de novo.",
        "A nota define a ordem, mas o sistema também pode encaixar coisas como anúncios ou sugestões de “quem seguir” em posições específicas depois deste passo.",
      ],
    },
    {
      slug: "safety-pass",
      number: 8,
      title: "Uma última passagem de segurança",
      summary: "Uma última verificação e o feed é devolvido.",
      plain:
        "Logo antes de mandar o feed de volta para você, mais uma verificação: o que foi apagado, marcado como spam, violento, gore etc. é removido. Threads de conversa são colapsadas para você não ver cinco galhos da mesma discussão.",
      analogy:
        "O expedidor dá uma última olhada no prato antes de ele sair da cozinha.",
      underTheHood:
        "Filtros pós-seleção — a mesma ideia do passo 5, mas aplicada depois do ranqueamento, sobre o pequeno conjunto final.",
      file: "home-mixer/filters/",
      details: [
        "Existem duas passagens de filtros por um motivo. Os filtros pré-pontuação são baratos e descartam o óbvio antes do ML. Os filtros pós-seleção pegam problemas que dependem do conjunto final escolhido — por exemplo, deduplicar galhos de conversa.",
        "Verificações de visibilidade também rodam aqui: um post que foi apagado ou marcado como violador entre a busca e agora é removido antes de chegar até você.",
      ],
    },
  ],
};
