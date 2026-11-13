import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(root, "public");
const port = Number(process.env.PORT || 3000);
const siteOrigin = "https://www.pontesaojoaoodontologia.com.br";
const whatsappNumber = "5511963181163";
const phoneDisplay = "(11) 96318-1163";
const address = "Av. São João, 627 — Ponte São João, Jundiaí — SP";

const pages = {
  "/": {
    key: "home",
    title: "Ponte São João Odontologia | Jundiaí",
    description: "Odontologia humanizada em Jundiaí para cuidar, prevenir e recuperar seu sorriso. Atendimento particular na Ponte São João.",
    eyebrow: "Cuidado próximo, tecnologia e experiência",
    heading: "Seu sorriso merece um cuidado que olha para você por inteiro.",
    intro: "Na Ponte São João Odontologia, cada atendimento começa com escuta, avaliação cuidadosa e um plano claro para a sua saúde bucal.",
    primaryCta: "Falar com a clínica",
    heroNote: "Atendimento particular · Jundiaí e região",
    heroVisual: "home",
    sections: [
      {
        id: "cuidado",
        kicker: "Uma clínica para acompanhar você",
        heading: "Odontologia completa com jeito humano de cuidar.",
        body: "Reunimos prevenção, diagnóstico e tratamentos odontológicos em um ambiente acolhedor. A tecnologia entra para apoiar decisões mais precisas — e o cuidado aparece em cada conversa.",
        cards: [
          ["01", "Escuta antes de tudo", "Entendemos sua queixa, sua rotina e o que você espera do tratamento."],
          ["02", "Plano sem complicação", "Explicamos possibilidades e próximos passos com clareza."],
          ["03", "Acompanhamento próximo", "Você sabe o que está acontecendo em cada etapa do cuidado."]
        ]
      },
      {
        id: "servicos",
        kicker: "Como podemos ajudar",
        heading: "Da prevenção ao cuidado que não pode esperar.",
        body: "Escolha o atendimento que mais se aproxima do que você precisa agora. Se ainda não souber, nossa equipe orienta você.",
        serviceLinks: [
          ["Clínica Geral", "Avaliação, prevenção, limpeza, restaurações e diagnóstico para manter a saúde bucal em dia.", "/clinica-geral", "Conhecer clínica geral"],
          ["Urgência Odontológica", "Orientação e avaliação para dor, trauma, dente quebrado, sangramento e outras intercorrências.", "/urgencia-odontologica", "Preciso de atendimento"]
        ]
      }
    ]
  },
  "/clinica-geral": {
    key: "general",
    title: "Clínica Geral em Jundiaí | Ponte São João Odontologia",
    description: "Avaliação odontológica, prevenção, limpeza e restaurações em Jundiaí. Agende seu atendimento particular na Ponte São João.",
    eyebrow: "Clínica Geral em Jundiaí",
    heading: "Cuidar da saúde bucal começa com uma boa avaliação.",
    intro: "Na clínica geral, você encontra o cuidado essencial para prevenir problemas, tratar o que já apareceu e acompanhar seu sorriso com mais tranquilidade.",
    primaryCta: "Agendar avaliação",
    heroNote: "Avaliação individual · Atendimento particular",
    heroVisual: "general",
    sections: [
      {
        id: "o-que-inclui",
        kicker: "Um ponto de partida seguro",
        heading: "Um atendimento pensado para entender o que você precisa.",
        body: "A consulta de clínica geral é o momento de olhar para a saúde da boca como um todo. A partir da avaliação, a equipe explica os achados e orienta os próximos passos, incluindo encaminhamentos quando necessário.",
        checkList: [
          "Avaliação clínica e conversa sobre sua saúde bucal",
          "Orientação de prevenção e higiene personalizada",
          "Limpeza e remoção de placa e tártaro quando indicada",
          "Avaliação de cáries, restaurações e sensibilidade",
          "Planejamento de tratamento ou encaminhamento especializado"
        ]
      },
      {
        id: "para-quem",
        kicker: "Para diferentes momentos",
        heading: "Quando marcar uma avaliação de clínica geral?",
        body: "Mesmo sem dor, consultas de acompanhamento ajudam a identificar alterações cedo. Também é um bom caminho para quem percebe sensibilidade, sangramento ao escovar, manchas, mau hálito persistente ou quer retomar o cuidado depois de um tempo.",
        callout: "Não sabe qual atendimento escolher? Conte o que está acontecendo pelo WhatsApp. A equipe orienta o melhor primeiro passo."
      }
    ]
  },
  "/urgencia-odontologica": {
    key: "emergency",
    title: "Urgência Odontológica em Jundiaí | Ponte São João",
    description: "Atendimento odontológico para situações de urgência em Jundiaí. Fale com a Ponte São João para confirmar disponibilidade e orientação.",
    eyebrow: "Urgência Odontológica em Jundiaí",
    heading: "Quando algo acontece, você precisa de orientação clara e um próximo passo.",
    intro: "Dor forte, trauma, dente quebrado ou sangramento merecem atenção. Fale com a Ponte São João para explicar o que aconteceu e confirmar a possibilidade de atendimento.",
    primaryCta: "Falar sobre uma urgência",
    heroNote: "Atendimento particular · Confirme a disponibilidade",
    heroVisual: "emergency",
    sections: [
      {
        id: "situacoes",
        kicker: "Podemos orientar você",
        heading: "Algumas situações que pedem contato rápido.",
        body: "Cada caso precisa ser avaliado individualmente. Ao chamar no WhatsApp, descreva os sintomas, quando começaram e se houve trauma. A equipe poderá orientar o próximo passo e informar a disponibilidade do atendimento.",
        urgencyCards: [
          ["Dor de dente", "Dor intensa, latejante ou que piorou de repente."],
          ["Dente quebrado", "Fratura, perda de parte do dente ou restauração que caiu."],
          ["Trauma", "Batida na boca, queda ou impacto durante esporte."],
          ["Sangramento", "Sangramento persistente após um trauma ou procedimento."],
          ["Inchaço", "Edema, sensibilidade ou dificuldade para abrir a boca."],
          ["Outras intercorrências", "Algo mudou e você não sabe se deve esperar? Converse com a equipe."]
        ]
      },
      {
        id: "como-agir",
        kicker: "Antes de chegar",
        heading: "O que fazer enquanto busca orientação.",
        body: "Mantenha a calma e evite improvisar medicamentos ou colocar substâncias diretamente no local. Em caso de trauma, não descarte fragmentos ou o dente sem antes receber orientação. Se houver sinais de gravidade, como dificuldade para respirar, perda de consciência ou sangramento que não cessa, procure um serviço de emergência médica imediatamente.",
        callout: "A Ponte São João atende de forma particular. Envie uma mensagem antes de se deslocar para confirmar horários e disponibilidade."
      }
    ]
  }
};

function escapeHtml(value = "") {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function whatsappUrl(pageKey, label) {
  const messages = {
    home: "Olá! Gostaria de conhecer a Ponte São João Odontologia e agendar um atendimento.",
    general: "Olá! Gostaria de agendar uma avaliação de clínica geral na Ponte São João.",
    emergency: "Olá! Estou com uma urgência odontológica e gostaria de orientação sobre atendimento."
  };
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messages[pageKey] || messages.home)}&utm_source=site&utm_medium=whatsapp&utm_campaign=${pageKey}`;
}

function icon(name) {
  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.8 9 3l2 5-2 1.5a13.4 13.4 0 0 0 5.5 5.5L16 13l5 2-0.8 2.4a2.5 2.5 0 0 1-2.8 1.6C10 18 6 14 4.9 6.6a2.5 2.5 0 0 1 1.7-2.8Z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>'
  };
  return icons[name] || "";
}

function logo() {
  return `<a class="brand" href="/" aria-label="Ponte São João Odontologia — início"><span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span><span class="brand-name"><strong>Ponte São João</strong><small>odontologia</small></span></a>`;
}

function header(pageKey) {
  const active = (key) => pageKey === key ? " aria-current=\"page\"" : "";
  return `<header class="site-header"><div class="topline"><div class="shell topbar"><span>Atendimento particular em Jundiaí</span><a href="tel:+5511963181163">${phoneDisplay}</a></div></div><div class="shell nav-wrap">${logo()}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menu <span>☰</span></button><nav id="main-nav" class="main-nav" aria-label="Navegação principal"><a href="/"${active("home")}>Início</a><a href="/clinica-geral"${active("general")}>Clínica Geral</a><a href="/urgencia-odontologica"${active("emergency")}>Urgência</a><a class="nav-cta" href="${whatsappUrl(pageKey, "nav")}" target="_blank" rel="noopener">Falar no WhatsApp ${icon("arrow")}</a></nav></div></header>`;
}

function hero(page) {
  const visualText = {
    home: ["Cuidado que acolhe", "Tecnologia que apoia", "Experiência que orienta"],
    general: ["Prevenção", "Diagnóstico", "Acompanhamento"],
    emergency: ["Dor", "Trauma", "Orientação"]
  }[page.heroVisual];
  return `<section class="hero hero-${page.heroVisual}"><div class="shell hero-grid"><div class="hero-copy"><p class="eyebrow">${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.heading)}</h1><p class="hero-intro">${escapeHtml(page.intro)}</p><div class="hero-actions"><a class="button button-primary" href="${whatsappUrl(page.key, "hero")}" target="_blank" rel="noopener">${escapeHtml(page.primaryCta)} ${icon("arrow")}</a><a class="button button-text" href="#conteudo">Ver como podemos ajudar ${icon("arrow")}</a></div><p class="hero-note">${icon(page.key === "emergency" ? "clock" : "check")}${escapeHtml(page.heroNote)}</p></div><div class="hero-art" aria-label="${escapeHtml(page.eyebrow)}"><div class="orb orb-one"></div><div class="orb orb-two"></div><div class="art-card art-card-main"><span class="art-label">Ponte São João</span><strong>${escapeHtml(visualText[0])}</strong><span class="art-line"></span><span class="art-caption">${escapeHtml(visualText[1])}</span></div><div class="art-card art-card-float"><span class="float-kicker">Hoje, o próximo passo é</span><strong>${escapeHtml(visualText[2])}</strong><span class="float-dot"></span></div><div class="art-cross" aria-hidden="true">+</div></div></div></section>`;
}

function sectionMarkup(section, pageKey) {
  let body = `<div class="section-heading"><p class="eyebrow">${escapeHtml(section.kicker)}</p><h2>${escapeHtml(section.heading)}</h2><p>${escapeHtml(section.body)}</p></div>`;
  if (section.cards) {
    body += `<div class="feature-list">${section.cards.map(([number, title, text]) => `<article class="feature-item"><span class="feature-number">${number}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}</div>`;
  }
  if (section.serviceLinks) {
    body += `<div class="service-grid">${section.serviceLinks.map(([title, text, href, cta]) => `<a class="service-card" href="${href}"><span class="service-icon">↗</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p><span class="card-link">${escapeHtml(cta)} ${icon("arrow")}</span></a>`).join("")}</div>`;
  }
  if (section.checkList) {
    body += `<ul class="check-list">${section.checkList.map((item) => `<li>${icon("check")}<span>${escapeHtml(item)}</span></li>`).join("")}</ul>`;
  }
  if (section.urgencyCards) {
    body += `<div class="urgency-grid">${section.urgencyCards.map(([title, text]) => `<article class="urgency-card"><span class="urgency-mark">+</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}</div>`;
  }
  if (section.callout) {
    body += `<div class="callout"><span class="callout-mark">↗</span><p>${escapeHtml(section.callout)}</p><a href="${whatsappUrl(pageKey, "callout")}" target="_blank" rel="noopener">Conversar com a clínica ${icon("arrow")}</a></div>`;
  }
  const layout = section.cards || section.serviceLinks || section.checkList || section.urgencyCards ? " content-section split-section" : " content-section narrow-section";
  return `<section id="${section.id}" class="${layout}"><div class="shell section-grid">${body}</div></section>`;
}

function locationSection(pageKey) {
  return `<section id="localizacao" class="location-section"><div class="shell location-grid"><div class="location-copy"><p class="eyebrow">Onde estamos</p><h2>Um ponto de cuidado na Ponte São João.</h2><p>Estamos em uma localização de fácil acesso em Jundiaí, com atendimento particular e uma equipe pronta para receber você.</p><div class="address-line">${icon("pin")}<div><strong>${address}</strong><span>CEP 13216-000</span></div></div><a class="button button-light" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Av. São João, 627, Ponte São João, Jundiaí - SP")}" target="_blank" rel="noopener">Abrir rota no Google Maps ${icon("arrow")}</a></div><div class="map-frame"><iframe title="Mapa da Ponte São João Odontologia" src="https://www.google.com/maps?q=${encodeURIComponent("Av. São João, 627, Ponte São João, Jundiaí - SP")}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div></section>`;
}

function footer(pageKey) {
  return `<footer class="site-footer"><div class="shell footer-grid"><div>${logo()}<p>Reconstruir sorrisos com recursos modernos, atendimento especializado e cuidado humanizado.</p></div><div><p class="footer-label">Atendimento</p><a href="${whatsappUrl(pageKey, "footer")}" target="_blank" rel="noopener">WhatsApp ${phoneDisplay}</a><a href="tel:+5511963181163">Ligar para a clínica</a></div><div><p class="footer-label">Navegue</p><a href="/clinica-geral">Clínica Geral</a><a href="/urgencia-odontologica">Urgência Odontológica</a><a href="/#localizacao">Como chegar</a></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Ponte São João Odontologia</span><span>Dra. Regina de Almeida Fernandes · CRO-SP 57949</span></div></footer>`;
}

function pageHtml(page, path) {
  const canonical = `${siteOrigin}${path === "/" ? "/" : path}`;
  const isEmergency = page.key === "emergency";
  const robots = path === "/404" ? "noindex, nofollow" : "index, follow";
  return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(page.title)}</title><meta name="description" content="${escapeHtml(page.description)}"><meta name="keywords" content="dentista em Jundiaí, clínica odontológica Jundiaí, clínica geral odontológica, urgência odontológica Jundiaí"><meta name="robots" content="${robots}"><meta name="theme-color" content="#f2eee7"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="Ponte São João Odontologia"><meta property="og:title" content="${escapeHtml(page.title)}"><meta property="og:description" content="${escapeHtml(page.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${siteOrigin}/social-card.svg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(page.title)}"><meta name="twitter:description" content="${escapeHtml(page.description)}"><meta name="twitter:image" content="${siteOrigin}/social-card.svg"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/a11y.css"><link rel="icon" href="/favicon.svg" type="image/svg+xml"></head><body class="page-${page.key}"><a class="skip-link" href="#conteudo">Pular para o conteúdo principal</a>${header(page.key)}<main id="conteudo">${hero(page)}<div>${page.sections.map((section) => sectionMarkup(section, page.key)).join("")}</div>${locationSection(page.key)}<section class="final-cta"><div class="shell final-cta-inner"><div><p class="eyebrow">Vamos conversar?</p><h2>${isEmergency ? "Explique o que aconteceu. A gente orienta você." : "Seu cuidado pode começar com uma conversa."}</h2></div><a class="button button-primary" href="${whatsappUrl(page.key, "final")}" target="_blank" rel="noopener">Falar no WhatsApp ${icon("arrow")}</a></div></section></main>${footer(page.key)}<a class="floating-whatsapp" href="${whatsappUrl(page.key, "floating")}" target="_blank" rel="noopener" aria-label="Falar com a Ponte São João pelo WhatsApp"><span>WhatsApp</span><strong>↗</strong></a><script src="/script.js" defer></script></body></html>`;
}

function contentType(path) {
  return { ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".json": "application/json; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" }[extname(path)] || "application/octet-stream";
}

async function serveStatic(res, pathname) {
  const clean = normalize(pathname).replace(/^\.\.(\/|\\)/, "");
  const filePath = join(publicDir, clean);
  if (!filePath.startsWith(publicDir)) return false;
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType(filePath), "Cache-Control": pathname.endsWith(".html") ? "no-cache" : "public, max-age=3600" });
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  if (pathname === "/sitemap.xml") {
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).map((path) => `<url><loc>${siteOrigin}${path === "/" ? "/" : path}</loc></url>`).join("")}</urlset>`;
    res.writeHead(200, { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-cache" });
    res.end(xml);
    return;
  }
  if (pathname === "/robots.txt") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" });
    res.end(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteOrigin}/sitemap.xml\n`);
    return;
  }
  if (pages[pathname]) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
    res.end(pageHtml(pages[pathname], pathname));
    return;
  }
  if (await serveStatic(res, pathname)) return;
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" });
  res.end(pageHtml({ ...pages["/"], title: "Página não encontrada | Ponte São João Odontologia", description: "A página que você procura não foi encontrada." }, "/404"));
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Ponte São João Odontologia listening on http://0.0.0.0:${port}`);
});
