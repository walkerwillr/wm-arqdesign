const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Metadados dos projetos (títulos NEUTROS/anonimizados, descrições reescritas).
// As imagens são lidas automaticamente de src/assets/projects/<slug>/*.jpg
// (ordem alfabética: 01.jpg é a capa). Textos em 3ª pessoa, sem nomes de
// clientes, valores ou terceiros.
// ---------------------------------------------------------------------------

const meta = {
  "residencia-granja-viana": {
    order: 1,
    featured: false,
    title: "Residência Granja Viana",
    category: "Residencial",
    location: "Granja Viana · SP",
    tags: ["Suíte", "Cozinha", "Banheiro", "Dormitório"],
    summary:
      "Projeto residencial de ambientes integrados para uma casa de generosas proporções, desenvolvido em etapas.",
    description:
      "Um projeto residencial completo para uma casa de generosas proporções na Granja Viana, desenvolvido em diferentes etapas. O trabalho abrangeu a suíte do casal, a cozinha, o banheiro e o dormitório – sempre com marcenaria planejada, iluminação indireta e uma paleta quente de madeiras naturais em contraste com superfícies em mármore. Cada ambiente foi concebido para equilibrar conforto, funcionalidade e uma estética atemporal, respeitando a rotina e a identidade dos moradores.",
  },

  "apartamento-industrial-taboao": {
    order: 2,
    featured: true,
    title: "Apartamento Industrial – Taboão da Serra",
    category: "Residencial",
    location: "Taboão da Serra · SP",
    tags: ["Industrial", "Integração", "Reforma"],
    summary:
      "Reforma de apartamento com linguagem industrial moderna e atemporal, entre o cinza, o bege e acentos em verde e preto.",
    description:
      "Reforma de apartamento com linguagem industrial moderna e atemporal. A paleta predominante em tons de cinza e bege ganha contraste com detalhes em verde e preto, enquanto estruturas metálicas vazadas e a madeira setorizam os ambientes sem fechá-los. Os setores social e íntimo foram mantidos distintos, favorecendo confraternizações e a fluidez do dia a dia. As imagens finais foram refinadas com apoio de ferramentas de inteligência artificial, preservando a fidelidade ao projeto executivo.",
  },

  "apartamento-integrado": {
    order: 3,
    featured: true,
    title: "Apartamento Integrado – Living & Cozinha",
    category: "Residencial",
    location: "São Paulo · SP",
    tags: ["Integração", "Ripado", "Obra executada"],
    summary:
      "Integração entre living e cozinha marcada por um painel ripado em madeira – do render à obra concluída.",
    description:
      "Projeto de integração entre living e cozinha marcado por um painel ripado em madeira que percorre o ambiente e organiza a marcenaria em tons escuros. A combinação de preto, madeira natural e iluminação embutida cria profundidade e sofisticação, valorizada pela vista urbana. O projeto foi acompanhado até a execução – a galeria reúne render e obra concluída.",
  },

  "espaco-clinico-recepcao": {
    order: 4,
    featured: true,
    title: "Espaço Clínico Infantil – Recepção & Espera",
    category: "Comercial",
    location: "São Paulo · SP",
    tags: ["Comercial", "Infantil", "Recepção"],
    summary:
      "Projeto comercial para a recepção e sala de espera de uma clínica pediátrica, com foco no acolhimento.",
    description:
      "Projeto comercial para a recepção e a sala de espera de uma clínica voltada ao público infantil. A marcenaria em tons neutros, o painel verde natural e uma curadoria de plantas suavizam o ambiente, enquanto a circulação ampla e a iluminação planejada acolhem famílias e crianças desde a entrada.",
  },

  "apartamento-jovem-florada": {
    order: 5,
    featured: true,
    title: "Apartamento Jovem – Florada",
    category: "Residencial",
    location: "São Paulo · SP",
    tags: ["Compacto", "Casal", "Home office"],
    summary:
      "Apartamento compacto para um jovem casal, onde cada metro quadrado trabalha a favor do estilo de vida dos moradores.",
    description:
      "Apartamento compacto pensado para um jovem casal, no qual cada metro quadrado trabalha a favor do estilo de vida dos moradores. Cozinha em verde e madeira, home office integrado com parede de tijolinho e vista da cidade, dormitório com marcenaria sob medida e um banheiro de acabamentos marcantes. Um projeto que prova que planejamento inteligente cabe em qualquer metragem.",
  },

  "apartamento-industrial-morumbi": {
    order: 6,
    featured: true,
    title: "Apartamento Industrial – Morumbi",
    category: "Residencial",
    location: "Morumbi · São Paulo",
    tags: ["Industrial", "Concreto", "Adega"],
    summary:
      "Apartamento industrial no Morumbi que combina textura de concreto, marcenaria preta e uma adega de destaque no living.",
    description:
      "Um apartamento no Morumbi construído sobre a linguagem industrial: textura bruta de concreto, marcenaria preta fosca e uma adega climatizada que se torna o ponto focal do living. Iluminação embutida, cozinha integrada e um banheiro em tons esverdeados completam um projeto contemporâneo pensado para quem valoriza materialidade e caráter.",
  },

  "studio-compacto-rj": {
    order: 7,
    featured: true,
    title: "Studio Compacto – Rio de Janeiro",
    category: "Residencial",
    location: "Rio de Janeiro · RJ",
    tags: ["Studio", "Vista para o mar", "Obra executada"],
    summary:
      "Studio compacto no Rio de Janeiro com vista para o mar, do render à obra – parede terracota e marcenaria em madeira.",
    description:
      "Studio compacto no Rio de Janeiro que aproveita a vista para o mar como protagonista do projeto. Uma parede em terracota marca o dormitório, enquanto uma estante vazada separa os ambientes sem fechar a vista. O banheiro em mármore e a cozinha integrada completam um projeto enxuto e sofisticado, aqui mostrado do render à obra concluída.",
  },

  "hall-social-zona-norte": {
    order: 8,
    featured: false,
    title: "Hall Social – Edifício Zona Norte",
    category: "Comercial",
    location: "Zona Norte · São Paulo",
    tags: ["Coworking", "Hall", "Convivência"],
    summary:
      "Hall social e halls de circulação de um edifício pensados como espaço de convivência e coworking.",
    description:
      "Concepção do hall social e das áreas de circulação de um edifício na zona norte de São Paulo, pensados como um espaço de convivência e coworking. A proposta mantém a circulação ampla e aposta em uma paleta voltada ao conforto, com marcenaria ripada, verde natural e estações de trabalho integradas ao living, complementadas pelos corredores e halls de elevador do prédio.",
  },

  "dormitorio-infantil-planejado": {
    order: 9,
    featured: false,
    title: "Dormitório Infantil Planejado",
    category: "Residencial",
    location: "São Paulo · SP",
    tags: ["Dormitório infantil", "Provençal", "Planejado"],
    summary:
      "Dormitório infantil com penteadeira iluminada de inspiração provençal e marcenaria clara sob medida.",
    description:
      "Dormitório infantil planejado com penteadeira iluminada de inspiração provençal e marcenaria clara sob medida. Os detalhes delicados e a iluminação suave criam um ambiente lúdico e acolhedor, pensado para acompanhar o crescimento da criança.",
  },

  "escritorio-interior-sp": {
    order: 10,
    featured: false,
    title: "Escritório – Interior de SP",
    category: "Residencial",
    location: "Interior de São Paulo",
    tags: ["Home office", "Marcenaria", "Iluminação"],
    summary:
      "Home office planejado no interior de São Paulo, com estante iluminada e marcenaria sob medida.",
    description:
      "Home office planejado no interior de São Paulo, com estante iluminada em LED, marcenaria sob medida e um balcão de trabalho amplo. Nichos e prateleiras organizam objetos pessoais e coleções, criando um ambiente funcional e com identidade própria.",
  },

  "cozinhas-executadas": {
    order: 11,
    featured: false,
    title: "Cozinhas Executadas",
    category: "Cozinhas",
    location: "São Paulo e região",
    tags: ["Cozinha", "Obra executada", "Marcenaria"],
    summary:
      "Uma seleção de cozinhas levadas do projeto à obra – do verde provençal às composições em madeira e mármore preto.",
    description:
      "Uma seleção de cozinhas levadas do projeto à obra. Do verde provençal a composições em madeira e mármore preto, cada ambiente revela o cuidado com proporções, iluminação e acabamentos que caracteriza o trabalho executado do escritório. Registros de projetos concluídos e entregues.",
  },

  "paisagismo-residencial": {
    order: 12,
    featured: false,
    title: "Paisagismo Residencial – Condomínio",
    category: "Paisagismo",
    location: "Condomínio · interior de SP",
    tags: ["Paisagismo", "Área externa", "Piscina"],
    summary:
      "Paisagismo para uma residência em condomínio, integrando piscina, estar externo e gramados ao relevo do terreno.",
    description:
      "Projeto de paisagismo para uma residência em condomínio, integrando piscina, área de estar externa e amplos gramados ao relevo natural do terreno. Caminhos de pedra, vegetação de baixa manutenção e um desenho pensado em harmonia com a arquitetura moderna da casa e com a paisagem ao redor.",
  },

  "estudos-volumetricos-maquetes": {
    order: 13,
    featured: false,
    title: "Estudos Volumétricos – Maquetes",
    category: "Maquetes",
    location: "–",
    tags: ["Maquete", "Volumetria", "Estudo"],
    summary:
      "Coleção de maquetes físicas – de estudos de implantação residencial a equipamentos institucionais.",
    description:
      "Coleção de maquetes físicas produzidas ao longo da formação e da prática do escritório. Dos estudos de implantação de edifícios residenciais a equipamentos institucionais, as maquetes revelam o pensamento espacial, a relação com o entorno e o rigor construtivo que fundamentam cada projeto.",
  },

  "studio-sig-leblon": {
    order: 14,
    featured: false,
    title: "Studio Sig – Leblon",
    category: "Maquetes",
    location: "Leblon · Rio de Janeiro",
    tags: ["Studio", "Compacto", "Home office"],
    summary:
      "Studio compacto no Leblon com living, dormitório, home office e cozinha integrados em poucos metros quadrados.",
    description:
      "Um studio compacto no Leblon que organiza living, dormitório, home office e cozinha em uma planta enxuta. Estante vazada, marcenaria em madeira clara e um nicho de trabalho iluminado mostram como o planejamento certo multiplica a sensação de espaço em metragens reduzidas.",
  },

  "apartamento-petroleo-morumbi": {
    order: 15,
    featured: false,
    title: "Apartamento Petróleo & Branco – Morumbi",
    category: "Residencial",
    location: "Morumbi · São Paulo",
    tags: ["Azul petróleo", "Cozinha", "Varanda verde"],
    summary:
      "Apartamento no Morumbi com cozinha em azul petróleo e branco, e uma varanda transformada em cantinho verde.",
    description:
      "Projeto residencial no Morumbi que aposta no azul petróleo como cor de destaque da cozinha, equilibrado por marcenaria branca e bancada em mármore. Os dormitórios seguem a mesma paleta serena, enquanto a varanda ganha vida com uma curadoria de plantas que aproxima o apartamento da natureza.",
  },

  "loja-conveniencia-tatuape": {
    order: 16,
    featured: false,
    title: "Loja de Conveniência – Tatuapé",
    category: "Comercial",
    location: "Tatuapé · São Paulo",
    tags: ["Varejo", "Iluminação cênica", "Obra executada"],
    summary:
      "Projeto comercial para uma loja de conveniência no Tatuapé, do projeto executivo à obra concluída.",
    description:
      "Projeto comercial completo para uma loja de conveniência no Tatuapé – da concepção em render à obra executada. Prateleiras em madeira e preto fosco, iluminação cênica em LED verde e um balcão de atendimento amplo criam uma experiência de compra contemporânea, reforçada por elementos de identidade visual integrados à arquitetura.",
  },

  "apartamento-nogueira-morumbi": {
    order: 17,
    featured: false,
    title: "Apartamento Nogueira & Grafite – Morumbi",
    category: "Residencial",
    location: "Morumbi · São Paulo",
    tags: ["Nogueira", "Espinha-de-peixe", "Home office"],
    summary:
      "Apartamento no Morumbi com marcenaria em nogueira e grafite, piso em espinha-de-peixe e home office com parede verde.",
    description:
      "Um apartamento no Morumbi que investe na riqueza da madeira nogueira combinada a tons de grafite, com o piso em espinha-de-peixe como um dos elementos de assinatura, presente da lavanderia ao closet. O projeto inclui um home office com parede verde e estantes vazadas, um closet completo e ambientes sociais integrados que valorizam a luz natural e o conforto no dia a dia.",
  },

  "apartamento-tijolinho-morumbi": {
    order: 18,
    featured: false,
    title: "Apartamento Tijolinho & Madeira – Morumbi",
    category: "Residencial",
    location: "Morumbi · São Paulo",
    tags: ["Tijolinho aparente", "Madeira", "Home office"],
    summary:
      "Apartamento no Morumbi que combina parede de tijolinho aparente com marcenaria em madeira clara.",
    description:
      "Projeto residencial no Morumbi que usa a parede de tijolinho aparente como pano de fundo para a marcenaria em madeira clara e bancadas em preto fosco. Cozinha, dormitório, home office e living seguem a mesma linguagem, criando um apartamento coeso, aconchegante e com identidade própria.",
  },

  "bar-pub-pirituba": {
    order: 19,
    featured: false,
    title: "Bar & Pub – Pirituba",
    category: "Comercial",
    location: "Pirituba · São Paulo",
    tags: ["Gastronomia", "Iluminação cênica", "Identidade visual"],
    summary:
      "Projeto comercial para um bar e pub em Pirituba, com marcenaria em madeira, verde profundo e detalhes em amarelo.",
    description:
      "Projeto comercial para um bar e pub em Pirituba, com uma linguagem que combina madeira, verde profundo e detalhes em amarelo para criar uma atmosfera acolhedora e vibrante. O balcão central, o palco para apresentações e o salão de mesas foram planejados para o fluxo de um ambiente de gastronomia e entretenimento, incluindo banheiros com identidade visual marcante.",
  },

  "area-gourmet-antes-depois": {
    order: 20,
    featured: false,
    title: "Área Gourmet – Antes & Depois",
    category: "Cozinhas",
    location: "Campo Limpo · São Paulo",
    tags: ["Antes e depois", "Área gourmet", "Marcenaria"],
    summary:
      "A transformação de um espaço bruto em uma área gourmet completa, com marcenaria em grafite e bancada em mármore.",
    description:
      "Um retrato direto do trabalho da WM: de um espaço bruto, ainda em obra, a uma área gourmet completa, com marcenaria em grafite, bancada em mármore e refrigerador integrado. Um exemplo de como o projeto certo transforma um cômodo vazio em um ambiente pronto para receber e reunir pessoas.",
  },

  "otica-campo-limpo": {
    order: 21,
    featured: false,
    title: "Ótica – Campo Limpo",
    category: "Comercial",
    location: "Campo Limpo · São Paulo",
    tags: ["Varejo", "Vitrine", "Marcenaria em madeira"],
    summary:
      "Projeto comercial para uma ótica no Campo Limpo, com vitrines em madeira e mármore.",
    description:
      "Projeto comercial para uma loja de óticas no Campo Limpo, com vitrines em madeira que valorizam a exposição dos produtos, complementadas por acabamentos em mármore e iluminação direcionada. Um espaço de atendimento planejado para transmitir confiança e cuidado com o cliente desde a entrada.",
  },

  "studio-nautico-morumbi": {
    order: 22,
    featured: false,
    title: "Studio Náutico – Morumbi",
    category: "Residencial",
    location: "Morumbi · São Paulo",
    tags: ["Studio", "Tema náutico", "Compacto"],
    summary:
      "Studio compacto no Morumbi com decoração de inspiração náutica e ambientes multifuncionais.",
    description:
      "Studio compacto no Morumbi planejado para aproveitar cada metro quadrado, com decoração de inspiração náutica que traz identidade ao espaço. Cozinha integrada, dormitório com marcenaria sob medida e banheiro completo mostram como um apartamento pequeno pode ser ao mesmo tempo funcional e cheio de personalidade.",
  },

  banheiros: {
    order: 23,
    featured: false,
    title: "Banheiros Executados",
    category: "Banheiros",
    location: "São Paulo e região",
    tags: ["Banheiro", "Obra executada", "Acabamentos"],
    summary:
      "Uma seleção de banheiros entregues pela WM, do mármore ao cobre, do industrial ao clássico.",
    description:
      "Uma seleção de banheiros levados à execução, reunindo diferentes repertórios: mármore com detalhes em cobre, tijolo aparente, pedra natural e composições em tons escuros. Cada projeto explora iluminação, metais e revestimentos para transformar um ambiente funcional em um espaço de conforto e identidade.",
  },

  "salas-copacabana": {
    order: 24,
    featured: false,
    title: "Salas Integradas – Copacabana",
    category: "Salas",
    location: "Copacabana · RJ",
    tags: ["Living", "Sala de jantar", "Integração"],
    summary:
      "Living e sala de jantar integrados em um apartamento em Copacabana, com marcenaria em madeira e vista para a cidade.",
    description:
      "Projeto de living e sala de jantar integrados para um apartamento em Copacabana. A marcenaria em madeira organiza a estante e o buffet, enquanto a iluminação em LED e um painel decorativo emolduram um espaço de convívio que une praticidade e personalidade a poucos passos da orla.",
  },

  "apartamento-arpoador-rj": {
    order: 25,
    featured: false,
    title: "Apartamento Arpoador – RJ",
    category: "Residencial",
    location: "Arpoador · Rio de Janeiro",
    tags: ["Dormitório", "Marcenaria", "Estudo conceitual"],
    summary:
      "Estudo conceitual para um dormitório no Arpoador, com marcenaria em madeira e paleta terracota.",
    description:
      "Estudo conceitual para o dormitório de um apartamento no Arpoador, explorando marcenaria em madeira, um painel de TV integrado ao closet e uma paleta em terracota que aquece o ambiente. As imagens foram desenvolvidas com apoio de inteligência artificial para apresentar variações de composição antes da definição do projeto executivo.",
  },

  "ccl-centro-cultura-lazer": {
    order: 26,
    featured: false,
    title: "CCL – Centro de Cultura e Lazer",
    category: "Comercial",
    location: "Vila Lobos · São Paulo",
    tags: ["Institucional", "Espaço público", "Arquitetura"],
    summary:
      "Estudo arquitetônico para um centro de cultura e lazer, com cobertura curva integrada à paisagem.",
    description:
      "Estudo arquitetônico para um centro de cultura e lazer, pensado como um marco na paisagem urbana. A cobertura curva em estrutura metálica abriga espaços de convivência e atividades ao ar livre, integrando arquitetura, paisagismo e infraestrutura de lazer em um único projeto institucional.",
  },

  "consultorio-odontologico": {
    order: 27,
    featured: false,
    title: "Consultório Odontológico",
    category: "Comercial",
    location: "São Paulo · SP",
    tags: ["Consultório", "Comercial", "Recepção"],
    summary:
      "Sala de atendimento odontológico com marcenaria geométrica e iluminação planejada para acolher pacientes.",
    description:
      "Projeto de uma sala de atendimento odontológico, com marcenaria em tons neutros e um revestimento geométrico que traz identidade visual ao espaço. A disposição do balcão de recepção e a iluminação planejada foram pensadas para transmitir confiança e conforto desde a chegada do paciente.",
  },
};

module.exports = () => {
  const baseDir = path.join(__dirname, "..", "assets", "projects");

  const projects = Object.entries(meta).map(([slug, m]) => {
    const dir = path.join(baseDir, slug);
    let files = [];
    try {
      files = fs
        .readdirSync(dir)
        .filter((f) => /\.jpe?g$/i.test(f))
        .sort();
    } catch (e) {
      console.warn(`[projects] sem imagens para ${slug}`);
    }

    const images = files.map((f, i) => ({
      // caminho de entrada para o shortcode {% image %} (relativo à raiz do projeto)
      input: `src/assets/projects/${slug}/${f}`,
      alt: `${m.title} – ${m.category.toLowerCase()}, imagem ${i + 1}`,
    }));

    return {
      slug,
      url: `/projeto/${slug}/`,
      ...m,
      images,
      cover: images[0] || null,
      imageCount: images.length,
    };
  });

  projects.sort((a, b) => (a.order || 99) - (b.order || 99));
  return projects;
};
