// Configurações globais do site — TROQUE OS PLACEHOLDERS ANTES DE PUBLICAR.
// Placeholders visíveis começam com "<<" para facilitar a busca.

const domain = "https://wmarqdesign.com.br";

module.exports = {
  // Marca
  name: "WM Arquitetura & Design",
  shortName: "WM ArqDesign",
  slogan: "Design que integra arquitetura a você.",
  founder: "Wesley Martins",
  founderFull: "Wesley Martins Dias da Silva",
  registryNumber: "CAU A171170-9", // fonte: CV do profissional (registro SICCAU)

  // Domínio / SEO
  url: domain,
  lang: "pt-BR",
  locale: "pt_BR",
  description:
    "Escritório de arquitetura e design de interiores em São Paulo e Rio de Janeiro. Projetos residenciais, comerciais, cozinhas e paisagismo com foco em conforto, funcionalidade e estética atemporal.",

  // Atuação
  regions: ["São Paulo e região", "Rio de Janeiro"],
  regionsLabel: "São Paulo e região · Rio de Janeiro",

  // Contato
  whatsapp: {
    // Apenas dígitos (DDI+DDD+número) para o link wa.me
    number: "5511967451840",
    display: "+55 (11) 96745-1840",
    // Mensagem pré-preenchida do botão flutuante
    message: "Olá! Vim pelo site e gostaria de conversar sobre um projeto.",
  },
  phone: {
    tel: "+5511967451840",
    display: "+55 (11) 96745-1840",
  },
  email: "wm.arquitetura.urb@gmail.com",
  instagram: {
    handle: "@wm.arqdesign",
    url: "https://www.instagram.com/wm.arqdesign",
  },

  // Redes sociais adicionais — deixe vazio ("") para o ícone ficar oculto.
  // Preencha com a URL completa assim que tiver os endereços reais.
  social: {
    facebook: "https://www.facebook.com/share/1DDXU4QYiJ/",
    linkedin: "",
    behance: "",
  },

  // Formulário (Web3Forms — serviço gratuito compatível com sites estáticos).
  // Crie uma chave grátis em https://web3forms.com (informe o e-mail acima)
  // e cole aqui. Enquanto for placeholder, o formulário exibe aviso de configuração.
  form: {
    provider: "web3forms",
    accessKey: "18e1d989-c8e9-4c84-8897-9745df46b545",
    endpoint: "https://api.web3forms.com/submit",
    // Opcional: Cloudflare Turnstile (anti-spam). Deixe vazio para usar só honeypot.
    turnstileSiteKey: "",
  },

  // Repositório / deploy
  repo: "https://github.com/walkerwillr/wm-arqdesign", // << confirme usuário/nome do repo

  // Cores de tema (usadas em manifest e meta theme-color)
  themeColor: "#1c1b19",

  // Ano corrente (rodapé)
  get year() {
    return new Date().getFullYear();
  },
};
