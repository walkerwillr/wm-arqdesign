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
    featured: true,
    title: "Residência Granja Viana",
    category: "Residencial",
    location: "Granja Viana · SP",
    tags: ["Suíte", "Cozinha", "Banheiro", "Dormitório"],
    summary:
      "Projeto residencial de ambientes integrados para uma casa de generosas proporções, desenvolvido em etapas.",
    description:
      "Um projeto residencial completo para uma casa de generosas proporções na Granja Viana, desenvolvido em diferentes etapas. O trabalho abrangeu a suíte do casal, a cozinha, o banheiro e o dormitório — sempre com marcenaria planejada, iluminação indireta e uma paleta quente de madeiras naturais em contraste com superfícies em mármore. Cada ambiente foi concebido para equilibrar conforto, funcionalidade e uma estética atemporal, respeitando a rotina e a identidade dos moradores.",
  },

  "apartamento-industrial-taboao": {
    order: 2,
    featured: true,
    title: "Apartamento Industrial — Taboão da Serra",
    category: "Residencial",
    location: "Taboão da Serra · SP",
    tags: ["Industrial", "Integração", "Reforma"],
    summary:
      "Reforma de apartamento com linguagem industrial moderna e atemporal, entre o cinza, o bege e acentos em verde e preto.",
    description:
      "Reforma de apartamento com linguagem industrial moderna e atemporal. A paleta predominante em tons de cinza e bege ganha contraste com detalhes em verde e preto, enquanto estruturas metálicas vazadas e a madeira setorizam os ambientes sem fechá-los. Os setores social e íntimo foram mantidos distintos, favorecendo confraternizações e a fluidez do dia a dia. As imagens finais foram refinadas com apoio de ferramentas de inteligência artificial, preservando a fidelidade ao projeto executivo.",
  },

  "cozinha-azul-freijo": {
    order: 3,
    featured: true,
    title: "Cozinha Azul & Freijó",
    category: "Cozinhas",
    location: "São Paulo · SP",
    tags: ["Cozinha", "Azul", "Freijó"],
    summary:
      "Cozinha sem armários superiores que aposta na leveza visual, com azul profundo, madeira freijó e vista da cidade.",
    description:
      "Um estudo de cozinha sem armários superiores, que aposta na leveza visual e na vista da cidade como pano de fundo. Os armários inferiores em azul profundo dialogam com a madeira freijó e com a bancada em mármore, enquanto a parede em tijolinho aparente traz textura e aconchego. Uma composição contemporânea em que funcionalidade e caráter caminham juntos.",
  },

  "apartamento-integrado": {
    order: 4,
    featured: true,
    title: "Apartamento Integrado — Living & Cozinha",
    category: "Residencial",
    location: "São Paulo · SP",
    tags: ["Integração", "Ripado", "Obra executada"],
    summary:
      "Integração entre living e cozinha marcada por um painel ripado em madeira — do render à obra concluída.",
    description:
      "Projeto de integração entre living e cozinha marcado por um painel ripado em madeira que percorre o ambiente e organiza a marcenaria em tons escuros. A combinação de preto, madeira natural e iluminação embutida cria profundidade e sofisticação, valorizada pela vista urbana. O projeto foi acompanhado até a execução — a galeria reúne render e obra concluída.",
  },

  "espaco-clinico-recepcao": {
    order: 5,
    featured: true,
    title: "Espaço Clínico — Recepção & Espera",
    category: "Comercial",
    location: "São Paulo · SP",
    tags: ["Comercial", "Recepção", "Corporativo"],
    summary:
      "Projeto comercial para um espaço clínico, com foco no acolhimento: marcenaria neutra, painel verde e curadoria de plantas.",
    description:
      "Projeto comercial para um espaço clínico, com foco na experiência de acolhimento. A recepção e a sala de espera combinam marcenaria em tons neutros, painel verde natural e uma curadoria de plantas que suaviza o ambiente. A circulação ampla e a iluminação planejada transmitem conforto e profissionalismo desde a entrada, reforçando a identidade do espaço.",
  },

  "apartamento-jovem-florada": {
    order: 6,
    featured: true,
    title: "Apartamento Jovem — Florada",
    category: "Residencial",
    location: "São Paulo · SP",
    tags: ["Compacto", "Casal", "Home office"],
    summary:
      "Apartamento compacto para um jovem casal, onde cada metro quadrado trabalha a favor do estilo de vida dos moradores.",
    description:
      "Apartamento compacto pensado para um jovem casal, no qual cada metro quadrado trabalha a favor do estilo de vida dos moradores. Cozinha em verde e madeira, home office integrado com parede de tijolinho e vista da cidade, dormitório com marcenaria sob medida e um banheiro de acabamentos marcantes. Um projeto que prova que planejamento inteligente cabe em qualquer metragem.",
  },

  "hall-social-zona-norte": {
    order: 7,
    featured: false,
    title: "Hall Social — Edifício Zona Norte",
    category: "Comercial",
    location: "Zona Norte · São Paulo",
    tags: ["Coworking", "Hall", "Convivência"],
    summary:
      "Hall social de um edifício pensado como espaço de convivência e coworking, com circulação ampla e paleta acolhedora.",
    description:
      "Concepção do hall social de um edifício na zona norte de São Paulo, pensado como um espaço de convivência e coworking. A proposta mantém a circulação ampla e aposta em uma paleta voltada ao conforto e à energia dos encontros, com marcenaria ripada, verde natural e estações de trabalho integradas ao living. Projeto desenvolvido em fase de estudo e apresentado em render.",
  },

  "studio-compacto": {
    order: 8,
    featured: false,
    title: "Studio Compacto — Vista Urbana",
    category: "Residencial",
    location: "São Paulo · SP",
    tags: ["Studio", "Compacto", "Urbano"],
    summary:
      "Studio contemporâneo que reúne cozinha, dormitório, home office e banheiro em uma planta enxuta e fluida.",
    description:
      "Studio contemporâneo que reúne cozinha, dormitório, home office e banheiro em uma planta enxuta e fluida. A parede de acento azul e a vista para a cidade dão personalidade ao espaço, enquanto a marcenaria sob medida garante organização sem excessos. Um projeto de linhas limpas para a vida urbana.",
  },

  "quarto-infantil-planejado": {
    order: 9,
    featured: false,
    title: "Quarto Infantil Planejado",
    category: "Residencial",
    location: "São Paulo · SP",
    tags: ["Infantil", "Provençal", "Planejado"],
    summary:
      "Quarto infantil com painéis sob medida, penteadeira iluminada de inspiração provençal e nichos lúdicos.",
    description:
      "Quarto infantil planejado com painéis sob medida, penteadeira iluminada de inspiração provençal e nichos que organizam livros, brinquedos e memórias. A marcenaria clara e os detalhes delicados criam um ambiente lúdico e acolhedor, pensado para acompanhar o crescimento da criança.",
  },

  "cozinha-painel-verde": {
    order: 10,
    featured: false,
    title: "Cozinha Integrada com Painel Verde",
    category: "Cozinhas",
    location: "São Paulo · SP",
    tags: ["Cozinha", "Integração", "Painel verde"],
    summary:
      "Cozinha integrada à copa e à lavanderia, com painel de folhagem natural preservada e acentos em amarelo.",
    description:
      "Cozinha integrada à área de refeições e à lavanderia, com destaque para o painel de folhagem natural preservada que traz frescor ao ambiente. Marcenaria em azul e madeira, detalhes em amarelo e iluminação pendente de inspiração industrial compõem um espaço jovem e cheio de personalidade.",
  },

  "cozinhas-executadas": {
    order: 11,
    featured: false,
    title: "Cozinhas Executadas",
    category: "Cozinhas",
    location: "São Paulo e região",
    tags: ["Cozinha", "Obra executada", "Marcenaria"],
    summary:
      "Uma seleção de cozinhas levadas do projeto à obra — do verde provençal às composições em madeira e mármore preto.",
    description:
      "Uma seleção de cozinhas levadas do projeto à obra. Do verde provençal a composições em madeira e mármore preto, cada ambiente revela o cuidado com proporções, iluminação e acabamentos que caracteriza o trabalho executado do escritório. Registros de projetos concluídos e entregues.",
  },

  "paisagismo-residencial": {
    order: 12,
    featured: false,
    title: "Paisagismo Residencial — Condomínio",
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
    title: "Estudos Volumétricos — Maquetes",
    category: "Maquetes",
    location: "—",
    tags: ["Maquete", "Volumetria", "Estudo"],
    summary:
      "Coleção de maquetes físicas — de estudos de implantação residencial a equipamentos institucionais.",
    description:
      "Coleção de maquetes físicas produzidas ao longo da formação e da prática do escritório. Dos estudos de implantação de edifícios residenciais a equipamentos institucionais, as maquetes revelam o pensamento espacial, a relação com o entorno e o rigor construtivo que fundamentam cada projeto.",
  },

  "apartamento-concreto-morumbi": {
    order: 14,
    featured: true,
    title: "Apartamento Concreto & Preto — Morumbi",
    category: "Residencial",
    location: "Morumbi · São Paulo",
    tags: ["Concreto", "Marcenaria preta", "Home office"],
    summary:
      "Apartamento sofisticado no Morumbi que combina textura de concreto e marcenaria preta em todos os ambientes.",
    description:
      "Um apartamento no Morumbi construído sobre o contraste entre a textura bruta do concreto e a marcenaria preta fosca, do living ao home office. Iluminação embutida, varanda integrada e um banheiro em tons esverdeados completam um projeto contemporâneo e sóbrio, pensado para quem valoriza materialidade e silêncio visual.",
  },

  "apartamento-petroleo-morumbi": {
    order: 15,
    featured: false,
    title: "Apartamento Petróleo & Branco — Morumbi",
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
    title: "Loja de Conveniência — Tatuapé",
    category: "Comercial",
    location: "Tatuapé · São Paulo",
    tags: ["Varejo", "Iluminação cênica", "Obra executada"],
    summary:
      "Projeto comercial para uma loja de conveniência no Tatuapé, do projeto executivo à obra concluída.",
    description:
      "Projeto comercial completo para uma loja de conveniência no Tatuapé — da concepção em render à obra executada. Prateleiras em madeira e preto fosco, iluminação cênica em LED verde e um balcão de atendimento amplo criam uma experiência de compra contemporânea, reforçada por elementos de identidade visual integrados à arquitetura.",
  },

  "apartamento-cantinho-tematico": {
    order: 17,
    featured: false,
    title: "Apartamento com Cantinho Temático — Pirituba",
    category: "Residencial",
    location: "Pirituba · São Paulo",
    tags: ["Cantinho temático", "Tons azuis", "Família"],
    summary:
      "Apartamento familiar em Pirituba com um cantinho de leitura temático e dormitório em tons de azul.",
    description:
      "Projeto residencial em Pirituba que reserva um canto especial da casa para um espaço de leitura e estudo temático, com mapa-múndi e detalhes que estimulam a curiosidade. O restante do apartamento segue uma paleta de azuis e madeira clara, unindo praticidade para o dia a dia da família e ambientes de estar aconchegantes.",
  },

  "apartamento-nogueira-morumbi": {
    order: 18,
    featured: false,
    title: "Apartamento Nogueira & Grafite — Morumbi",
    category: "Residencial",
    location: "Morumbi · São Paulo",
    tags: ["Nogueira", "Home office", "Closet"],
    summary:
      "Apartamento no Morumbi com marcenaria em nogueira e grafite, closet completo e home office com estantes vazadas.",
    description:
      "Um apartamento no Morumbi que investe na riqueza da madeira nogueira combinada a tons de grafite. O projeto inclui um closet completo, um home office com estantes vazadas e nichos para plantas, e ambientes sociais integrados que valorizam a luz natural e o conforto no dia a dia.",
  },

  "apartamento-espinha-peixe": {
    order: 19,
    featured: false,
    title: "Apartamento Espinha-de-Peixe — Morumbi",
    category: "Residencial",
    location: "Morumbi · São Paulo",
    tags: ["Piso espinha-de-peixe", "Home office", "Sala de jantar"],
    summary:
      "Apartamento no Morumbi com piso em espinha-de-peixe e um home office com parede verde de destaque.",
    description:
      "Projeto residencial no Morumbi que tem no piso em espinha-de-peixe um dos elementos de assinatura, presente da lavanderia ao closet. Um home office com parede verde e mesa-espelho traz personalidade ao ambiente de trabalho, enquanto a sala de jantar e o living reforçam a proposta contemporânea do apartamento.",
  },

  "studio-compacto-rj": {
    order: 20,
    featured: true,
    title: "Studio Compacto — Rio de Janeiro",
    category: "Residencial",
    location: "Rio de Janeiro · RJ",
    tags: ["Studio", "Vista para o mar", "Obra executada"],
    summary:
      "Studio compacto no Rio de Janeiro com vista para o mar, do render à obra — parede terracota e marcenaria em madeira.",
    description:
      "Studio compacto no Rio de Janeiro que aproveita a vista para o mar como protagonista do projeto. Uma parede em terracota marca o dormitório, enquanto uma estante vazada separa os ambientes sem fechar a vista. O banheiro em mármore e a cozinha integrada completam um projeto enxuto e sofisticado, aqui mostrado do render à obra concluída.",
  },

  "apartamento-tijolinho-morumbi": {
    order: 21,
    featured: false,
    title: "Apartamento Tijolinho & Madeira — Morumbi",
    category: "Residencial",
    location: "Morumbi · São Paulo",
    tags: ["Tijolinho aparente", "Madeira", "Home office"],
    summary:
      "Apartamento no Morumbi que combina parede de tijolinho aparente com marcenaria em madeira clara.",
    description:
      "Projeto residencial no Morumbi que usa a parede de tijolinho aparente como pano de fundo para a marcenaria em madeira clara e bancadas em preto fosco. Cozinha, dormitório, home office e living seguem a mesma linguagem, criando um apartamento coeso, aconchegante e com identidade própria.",
  },

  "bar-pub-pirituba": {
    order: 22,
    featured: false,
    title: "Bar & Pub — Pirituba",
    category: "Comercial",
    location: "Pirituba · São Paulo",
    tags: ["Gastronomia", "Iluminação cênica", "Identidade visual"],
    summary:
      "Projeto comercial para um bar e pub em Pirituba, com marcenaria em madeira, verde profundo e detalhes em amarelo.",
    description:
      "Projeto comercial para um bar e pub em Pirituba, com uma linguagem que combina madeira, verde profundo e detalhes em amarelo para criar uma atmosfera acolhedora e vibrante. O balcão central, o palco para apresentações e o salão de mesas foram planejados para o fluxo de um ambiente de gastronomia e entretenimento, incluindo banheiros com identidade visual marcante.",
  },

  "area-gourmet-antes-depois": {
    order: 23,
    featured: false,
    title: "Área Gourmet — Antes & Depois",
    category: "Cozinhas",
    location: "Campo Limpo · São Paulo",
    tags: ["Antes e depois", "Área gourmet", "Marcenaria"],
    summary:
      "A transformação de um espaço bruto em uma área gourmet completa, com marcenaria em grafite e bancada em mármore.",
    description:
      "Um retrato direto do trabalho da WM: de um espaço bruto, ainda em obra, a uma área gourmet completa, com marcenaria em grafite, bancada em mármore e refrigerador integrado. Um exemplo de como o projeto certo transforma um cômodo vazio em um ambiente pronto para receber e reunir pessoas.",
  },

  "otica-campo-limpo": {
    order: 24,
    featured: false,
    title: "Ótica — Campo Limpo",
    category: "Comercial",
    location: "Campo Limpo · São Paulo",
    tags: ["Varejo", "Vitrine", "Marcenaria em madeira"],
    summary:
      "Projeto comercial para uma ótica no Campo Limpo, com vitrines em madeira e mármore.",
    description:
      "Projeto comercial para uma loja de óticas no Campo Limpo, com vitrines em madeira que valorizam a exposição dos produtos, complementadas por acabamentos em mármore e iluminação direcionada. Um espaço de atendimento planejado para transmitir confiança e cuidado com o cliente desde a entrada.",
  },

  "studio-nautico-morumbi": {
    order: 25,
    featured: false,
    title: "Studio Náutico — Morumbi",
    category: "Residencial",
    location: "Morumbi · São Paulo",
    tags: ["Studio", "Tema náutico", "Compacto"],
    summary:
      "Studio compacto no Morumbi com decoração de inspiração náutica e ambientes multifuncionais.",
    description:
      "Studio compacto no Morumbi planejado para aproveitar cada metro quadrado, com decoração de inspiração náutica que traz identidade ao espaço. Cozinha integrada, dormitório com marcenaria sob medida e banheiro completo mostram como um apartamento pequeno pode ser ao mesmo tempo funcional e cheio de personalidade.",
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
      alt: `${m.title} — ${m.category.toLowerCase()}, imagem ${i + 1}`,
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
