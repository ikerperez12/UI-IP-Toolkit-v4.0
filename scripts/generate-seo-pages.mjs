import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://ui-ip-toolkit.vercel.app";
const lastmod = "2026-06-14";

const pages = [
  {
    slug: "frontend-asset-library",
    title: "Frontend Asset Library for Copy-Ready UI Patterns",
    h1: "Frontend asset library for fast visual reuse",
    description:
      "Browse copy-ready frontend assets for web developers: UI snippets, CSS utilities, product blocks, buttons, loaders, CTAs, footers and bento grids.",
    keywords: ["frontend asset library", "visual frontend toolkit", "copy-ready UI snippets", "web developer assets"],
    sections: [
      ["Buttons", "../#buttons"],
      ["Loading states", "../#loading"],
      ["CTA blocks", "../#cta-blocks"],
      ["Footer systems", "../#footer-systems"],
      ["Bento systems", "../#bento-systems"],
    ],
    bullets: [
      "Use it as a visual memory layer for reusable frontend work.",
      "Open a category, scan the previews, copy a snippet and adapt it inside your project.",
      "The catalog is static and framework-agnostic, so the examples stay easy to inspect.",
    ],
  },
  {
    slug: "copy-ready-ui-snippets",
    title: "Copy-Ready UI Snippets for HTML, CSS and JavaScript",
    h1: "Copy-ready UI snippets for practical frontend work",
    description:
      "A searchable static route for reusable HTML, CSS and JavaScript UI snippets covering buttons, forms, loaders, cards, CTAs and product interface patterns.",
    keywords: ["copy-ready UI snippets", "HTML CSS JavaScript snippets", "UI pattern library", "frontend snippets"],
    sections: [
      ["Components", "../#components"],
      ["CSS utils", "../#utils"],
      ["Form elements", "../#inputs"],
      ["Cards", "../#sera-cards"],
      ["Layouts", "../#layouts"],
    ],
    bullets: [
      "Each snippet is meant to be a starting point, not a locked design system component.",
      "The preview-first structure helps developers choose by shape and behavior before reading code.",
      "Accessibility normalization keeps copied examples closer to responsible defaults.",
    ],
  },
  {
    slug: "css-button-examples",
    title: "CSS Button Examples and Interaction States",
    h1: "CSS button examples with copy-ready interaction states",
    description:
      "Explore button snippets, command buttons, segmented controls, soft toggles, hover states and CTA actions for frontend prototypes.",
    keywords: ["CSS button examples", "button snippets", "copy-ready buttons", "frontend button states"],
    sections: [
      ["Buttons Kit", "../#buttons"],
      ["Hover effects", "../#hover"],
      ["CTA blocks", "../#cta-blocks"],
      ["Purchase CTAs", "../#cta-purchase-subscription"],
      ["Download CTAs", "../#cta-download-template"],
    ],
    bullets: [
      "Use button examples for hero actions, app controls, command surfaces and pricing flows.",
      "Prefer native button semantics when adapting snippets to production.",
      "Pair visual states with focus, disabled and loading behavior in your final implementation.",
    ],
  },
  {
    slug: "gradient-library",
    title: "CSS Gradient Library for Web UI Backgrounds",
    h1: "CSS gradient library for product interfaces",
    description:
      "Curated gradient snippets and color treatments for landing pages, product cards, glass UI, buttons and visual frontend experiments.",
    keywords: ["CSS gradient library", "website gradients", "gradient snippets", "frontend color system"],
    sections: [
      ["Gradients", "../#gradients"],
      ["Colors", "../#colors"],
      ["Industry palettes", "../#palettes"],
      ["Glass components", "../#glass"],
      ["Style archetypes", "../#styles"],
    ],
    bullets: [
      "Use gradients as accents, surfaces and compositional cues rather than full-page noise.",
      "The catalog separates palettes, gradients and glass surfaces to make selection faster.",
      "Check contrast after adapting any gradient to real text and controls.",
    ],
  },
  {
    slug: "loading-state-examples",
    title: "Loading State Examples, Skeletons and Progress UI",
    h1: "Loading state examples for product interfaces",
    description:
      "Copy-ready loading patterns, skeleton states, progress indicators and animated feedback snippets for frontend products and dashboards.",
    keywords: ["loading state examples", "frontend loader snippets", "skeleton UI examples", "progress UI snippets"],
    sections: [
      ["Loading States", "../#loading"],
      ["Animations", "../#animations"],
      ["Empty states", "../#empty-states"],
      ["Motion easings", "../#easing"],
      ["CSS utils", "../#utils"],
    ],
    bullets: [
      "Loading patterns should communicate status, not only movement.",
      "Use status semantics and reduced-motion support when adapting animated loaders.",
      "Skeletons work best when they match the shape of the content that is loading.",
    ],
  },
  {
    slug: "cta-block-examples",
    title: "CTA Block Examples for Landing Pages and SaaS UI",
    h1: "CTA block examples for conversion-focused frontend sections",
    description:
      "Browse CTA snippets for pricing, downloads, newsletters, subscriptions, modal prompts and product landing pages.",
    keywords: ["CTA block examples", "pricing CTA components", "newsletter CTA", "download CTA snippets"],
    sections: [
      ["CTA Blocks", "../#cta-blocks"],
      ["Purchase and subscription", "../#cta-purchase-subscription"],
      ["Download and template", "../#cta-download-template"],
      ["Newsletter and popup", "../#cta-form-newsletter-popup"],
      ["Pricing sections", "../#pricing-sections"],
    ],
    bullets: [
      "CTA blocks need clear copy hierarchy, one primary action and trustworthy support text.",
      "The catalog separates purchase, download and form CTAs to avoid one-size-fits-all patterns.",
      "Adapt each CTA to the intent of the page rather than copying only the visual surface.",
    ],
  },
  {
    slug: "footer-design-system",
    title: "Footer Design Systems and Sitemap Footer Patterns",
    h1: "Footer design systems for product websites",
    description:
      "Reusable footer patterns for typographic footers, sitemap grids, newsletter panels, card-based footers and compact app endings.",
    keywords: ["footer design examples", "footer systems", "sitemap footer", "newsletter footer"],
    sections: [
      ["Footer Systems", "../#footer-systems"],
      ["Footer type systems", "../#footer-type-systems"],
      ["Footer grid cards", "../#footer-grid-cards"],
      ["Footer style modes", "../#footer-style-modes"],
      ["Navigation patterns", "../#navigation-patterns"],
    ],
    bullets: [
      "A good footer closes navigation, trust and conversion loops.",
      "Use sitemap footers for dense products and compact app footers for tools.",
      "Keep link groups readable and avoid turning the footer into decorative noise.",
    ],
  },
  {
    slug: "bento-grid-layouts",
    title: "Bento Grid Layouts for Features, Dashboards and Portfolios",
    h1: "Bento grid layouts for frontend storytelling",
    description:
      "Copy-ready bento grid examples for feature sections, dashboards, stats, media portfolios and product storytelling.",
    keywords: ["bento grid layouts", "feature bento", "dashboard bento grid", "portfolio bento"],
    sections: [
      ["Bento Systems", "../#bento-systems"],
      ["Feature landing bentos", "../#bento-feature-landing"],
      ["Dashboard bento grids", "../#bento-dashboard-grids"],
      ["Media portfolio bentos", "../#bento-media-portfolio"],
      ["Feature sections", "../#feature-sections"],
    ],
    bullets: [
      "Bento layouts work best when each cell has a distinct job.",
      "Use them for product proof, feature hierarchy, dashboards and portfolio storytelling.",
      "Keep mobile stacking intentional so the layout remains useful below desktop widths.",
    ],
  },
  {
    slug: "navigation-patterns",
    title: "Navigation Pattern Examples for Web Apps and Landing Pages",
    h1: "Navigation patterns for product websites and web apps",
    description:
      "Browse sticky navs, mega menus, sidebars, search-first navigation, breadcrumbs and announcement bars for frontend products.",
    keywords: ["navigation pattern examples", "sticky navbar", "mega menu examples", "sidebar navigation"],
    sections: [
      ["Navigation Patterns", "../#navigation-patterns"],
      ["Static and sticky nav", "../#nav-static-sticky"],
      ["Dropdown and mega menus", "../#nav-dropdown-mega"],
      ["Sidebar and search nav", "../#nav-sidebar-search"],
      ["Announcement and breadcrumbs", "../#nav-announcement-breadcrumb"],
    ],
    bullets: [
      "Navigation should make the information architecture obvious before it becomes decorative.",
      "Search-first navigation helps dense tools, while sticky navs help marketing pages.",
      "Use native links and buttons before adding custom menu behavior.",
    ],
  },
  {
    slug: "form-patterns",
    title: "Form Pattern Examples for Onboarding, Search and Checkout",
    h1: "Form pattern examples with accessible structure",
    description:
      "Reusable form snippets for lead capture, onboarding, checkout, search filters, settings panels and product workflows.",
    keywords: ["form pattern examples", "accessible form snippets", "frontend forms", "checkout form UI"],
    sections: [
      ["Input Kit", "../#inputs"],
      ["Form Patterns", "../#form-patterns"],
      ["Panels and settings", "../#panels-settings"],
      ["Search navigation", "../#nav-sidebar-search"],
      ["Newsletter CTAs", "../#cta-form-newsletter-popup"],
    ],
    bullets: [
      "Forms need labels, hints, error states and predictable focus behavior.",
      "The catalog includes both visual form surfaces and product settings patterns.",
      "Treat each copied form as a UI starting point and keep validation server-side when used in production.",
    ],
  },
  {
    slug: "accessible-ui-snippets",
    title: "Accessible UI Snippets with Semantic HTML Defaults",
    h1: "Accessible UI snippets for safer frontend prototypes",
    description:
      "A static route focused on semantic HTML snippets: labels, fieldsets, dialogs, tables, loaders, progress indicators and keyboard-friendly controls.",
    keywords: ["accessible UI snippets", "semantic HTML components", "WCAG UI patterns", "keyboard friendly snippets"],
    sections: [
      ["Dialogs and overlays", "../#dialogs-overlays"],
      ["Tables and data views", "../#tables-data"],
      ["Form elements", "../#inputs"],
      ["Loading states", "../#loading"],
      ["Accessibility governance", "../docs/accessibility-governance.md"],
    ],
    bullets: [
      "Accessibility is handled as a default constraint, not a decorative afterthought.",
      "Generated snippets are normalized with labels, relationships and state semantics where possible.",
      "Production components still need project-specific testing, but the examples avoid teaching broken defaults.",
    ],
  },
  {
    slug: "data-table-patterns",
    title: "Data Table Patterns and Dashboard Data Views",
    h1: "Data table patterns for dashboards and admin UI",
    description:
      "Copy-ready table, KPI grid, list-detail and dashboard data view snippets with semantic table examples and dense product layouts.",
    keywords: ["data table patterns", "dashboard data views", "admin table UI", "semantic table snippets"],
    sections: [
      ["Tables and data views", "../#tables-data"],
      ["Dashboard bento grids", "../#bento-dashboard-grids"],
      ["Panels and settings", "../#panels-settings"],
      ["Components", "../#components"],
      ["Tailwind UI patterns", "../#tailwind-ui"],
    ],
    bullets: [
      "Data views need structure, captions, row/column relationships and scannable density.",
      "Use tables for real tabular data instead of div grids.",
      "Pair dashboard cards with semantic summaries when data matters.",
    ],
  },
  {
    slug: "dialog-overlay-patterns",
    title: "Dialog and Overlay Pattern Examples",
    h1: "Dialog and overlay patterns for product flows",
    description:
      "Modal, drawer, command layer, alert and recovery overlay snippets for product interfaces, with native dialog examples where possible.",
    keywords: ["dialog overlay patterns", "modal snippets", "drawer UI examples", "native dialog HTML"],
    sections: [
      ["Dialogs and overlays", "../#dialogs-overlays"],
      ["Sera navigation", "../#sera-navigation"],
      ["Panels and settings", "../#panels-settings"],
      ["Error recovery flows", "../#error-recovery-flows"],
      ["Accessible snippets", "./accessible-ui-snippets.html"],
    ],
    bullets: [
      "Overlays should manage focus, closing behavior and background interaction deliberately.",
      "Native dialog snippets are preferred for simple modal flows.",
      "Use drawers and command layers only when they improve the task flow.",
    ],
  },
  {
    slug: "empty-state-examples",
    title: "Empty State and Feedback UI Examples",
    h1: "Empty state examples and product feedback patterns",
    description:
      "Zero-state, success, warning, recovery, onboarding and inline feedback snippets for SaaS and product interfaces.",
    keywords: ["empty state examples", "feedback UI patterns", "success state snippets", "onboarding empty state"],
    sections: [
      ["Empty states and feedback", "../#empty-states"],
      ["404 and error pages", "../#error-pages"],
      ["Error recovery flows", "../#error-recovery-flows"],
      ["CTA blocks", "../#cta-blocks"],
      ["Loading states", "../#loading"],
    ],
    bullets: [
      "Empty states should explain what happened and what the user can do next.",
      "Feedback patterns need useful text, not only an icon or color.",
      "Recovery actions are part of the product journey, not decorative filler.",
    ],
  },
  {
    slug: "pricing-section-examples",
    title: "Pricing Section Examples and Subscription UI Blocks",
    h1: "Pricing section examples for SaaS and subscription pages",
    description:
      "Reusable pricing cards, plan comparisons, upgrade prompts and subscription CTAs for landing pages and product settings.",
    keywords: ["pricing section examples", "subscription UI blocks", "pricing cards", "upgrade CTA"],
    sections: [
      ["Pricing sections", "../#pricing-sections"],
      ["Purchase CTAs", "../#cta-purchase-subscription"],
      ["CTA blocks", "../#cta-blocks"],
      ["Social proof", "../#social-proof"],
      ["Feature sections", "../#feature-sections"],
    ],
    bullets: [
      "Pricing sections need clear plan hierarchy and trustworthy comparison details.",
      "Use social proof and feature context around pricing, not only cards.",
      "Copy snippets as structure, then adapt pricing copy to the real offer.",
    ],
  },
  {
    slug: "hero-headline-examples",
    title: "Hero Headline Examples for SaaS, AI and Portfolio Pages",
    h1: "Hero headline examples for clear first screens",
    description:
      "Copy-ready headline systems for AI tools, SaaS products, commerce projects, creator tools, editorial pages and portfolios.",
    keywords: ["hero headline examples", "SaaS headline snippets", "AI landing page copy", "portfolio hero examples"],
    sections: [
      ["Hero Headlines", "../#hero-headlines"],
      ["AI and SaaS headlines", "../#h1-ai-saas"],
      ["Commerce and creator headlines", "../#h1-commerce-creator"],
      ["Editorial and portfolio headlines", "../#h1-editorial-portfolio"],
      ["Feature sections", "../#feature-sections"],
    ],
    bullets: [
      "A hero headline should explain the offer before it tries to impress.",
      "Different products need different headline structures: SaaS, commerce, editorial and portfolio pages are not the same.",
      "Use supporting chips, proof and CTAs to clarify the first screen.",
    ],
  },
  {
    slug: "error-page-design",
    title: "404 Error Page Design and Recovery Flow Examples",
    h1: "404 error page design with useful recovery paths",
    description:
      "Reusable 404, expired link, permission, search fallback and industry-specific error page snippets for product websites.",
    keywords: ["404 page design examples", "error page UI", "recovery flow snippets", "SaaS 404 page"],
    sections: [
      ["404 and error pages", "../#error-pages"],
      ["404 style studies", "../#error-style-studies"],
      ["Error recovery flows", "../#error-recovery-flows"],
      ["Industry error pages", "../#error-industry-pages"],
      ["Empty states", "../#empty-states"],
    ],
    bullets: [
      "Error pages should reduce dead ends by offering search, navigation or support routes.",
      "Industry-specific tone matters: a portfolio 404 and a finance 404 should not feel identical.",
      "Useful recovery is more important than visual cleverness.",
    ],
  },
  {
    slug: "glassmorphism-components",
    title: "Glassmorphism UI Components and Surface Examples",
    h1: "Glassmorphism UI components with usable contrast",
    description:
      "Glass surface snippets, translucent cards, panels, buttons and layered UI treatments for frontend prototypes.",
    keywords: ["glassmorphism components", "glass UI snippets", "translucent card examples", "CSS glassmorphism"],
    sections: [
      ["Glassmorphism", "../#glass"],
      ["Shadows", "../#shadows"],
      ["Gradients", "../#gradients"],
      ["Panels and settings", "../#panels-settings"],
      ["Style archetypes", "../#styles"],
    ],
    bullets: [
      "Glass effects should support hierarchy and contrast, not reduce readability.",
      "Pair translucent surfaces with clear borders, shadows and readable text.",
      "Always recheck contrast after adapting glass snippets to a new background.",
    ],
  },
  {
    slug: "typography-and-fonts",
    title: "Typography and Font Pairing Examples for Frontend UI",
    h1: "Typography and font examples for product UI",
    description:
      "Explore font treatments, text effects, headline systems, type scales and typographic UI snippets for web projects.",
    keywords: ["typography examples", "frontend font pairings", "text effect snippets", "type scale UI"],
    sections: [
      ["Typography", "../#typography"],
      ["Text effects", "../#textfx"],
      ["Text reveal", "../#textreveal"],
      ["Hero headlines", "../#hero-headlines"],
      ["Design tokens", "../#tokens"],
    ],
    bullets: [
      "Typography is part of product clarity, not only visual personality.",
      "Use type effects sparingly and preserve readable text for important content.",
      "The catalog keeps font examples close to text effects and headline systems for faster comparison.",
    ],
  },
  {
    slug: "hover-effects",
    title: "Hover Effect Snippets and Interactive CSS Utilities",
    h1: "Hover effect snippets for interactive frontend details",
    description:
      "Copy-ready hover effects, interactive CSS utilities, 3D cards, shadow states and small UI motion patterns.",
    keywords: ["hover effect snippets", "interactive CSS utilities", "3D hover cards", "CSS hover examples"],
    sections: [
      ["Hover FX", "../#hover"],
      ["CSS Utils", "../#utils"],
      ["3D Hover Cards", "../#cards3d"],
      ["Animations", "../#animations"],
      ["Motion easings", "../#easing"],
    ],
    bullets: [
      "Hover effects should add clarity or delight without hiding required information.",
      "Always provide keyboard-visible states for interactive elements.",
      "Use 3D and motion effects as accents, not as the only way to understand the UI.",
    ],
  },
];

const spanishPages = [
  {
    lang: "es",
    slug: "es-biblioteca-assets-frontend",
    title: "Biblioteca visual de assets frontend reutilizables",
    h1: "Biblioteca visual de assets frontend para desarrolladores web",
    description:
      "Explora assets frontend reutilizables y snippets copy-ready para botones, gradientes, loaders, CTAs, footers, bento grids y patrones UI.",
    keywords: ["biblioteca assets frontend", "assets frontend reutilizables", "catalogo visual UI", "snippets frontend"],
    sections: [
      ["Botones", "../#buttons"],
      ["Estados de carga", "../#loading"],
      ["CTAs", "../#cta-blocks"],
      ["Footers", "../#footer-systems"],
      ["Bento grids", "../#bento-systems"],
    ],
    bullets: [
      "Usalo como una capa visual de memoria para acelerar prototipos frontend.",
      "Abre una categoria, revisa la preview y copia el snippet que mejor encaje con tu flujo.",
      "El catalogo es estatico y agnostico al framework para que sea facil inspeccionar el HTML, CSS y JavaScript.",
    ],
  },
  {
    lang: "es",
    slug: "es-snippets-ui-listos-para-copiar",
    title: "Snippets UI listos para copiar en HTML, CSS y JavaScript",
    h1: "Snippets UI listos para copiar y adaptar",
    description:
      "Ruta en castellano para encontrar snippets UI copy-ready: componentes, botones, formularios, loaders, cards, CTAs y patrones de producto.",
    keywords: ["snippets UI listos para copiar", "snippets HTML CSS JavaScript", "componentes UI reutilizables", "patrones UI"],
    sections: [
      ["Componentes", "../#components"],
      ["Utilidades CSS", "../#utils"],
      ["Formularios", "../#inputs"],
      ["Cards", "../#sera-cards"],
      ["Layouts", "../#layouts"],
    ],
    bullets: [
      "Los snippets estan pensados como puntos de partida visuales, no como componentes cerrados.",
      "La navegacion por preview ayuda a elegir por forma, jerarquia y comportamiento antes de leer el codigo.",
      "La normalizacion semantica evita copiar ejemplos rotos como base de trabajo.",
    ],
  },
  {
    lang: "es",
    slug: "es-botones-css",
    title: "Botones CSS listos para copiar con estados interactivos",
    h1: "Botones CSS listos para copiar",
    description:
      "Ejemplos de botones CSS, estados hover, botones de comando, controles segmentados y acciones CTA para interfaces frontend.",
    keywords: ["botones CSS", "botones listos para copiar", "estados hover CSS", "botones frontend"],
    sections: [
      ["Buttons Kit", "../#buttons"],
      ["Hover effects", "../#hover"],
      ["CTA blocks", "../#cta-blocks"],
      ["Purchase CTAs", "../#cta-purchase-subscription"],
      ["Download CTAs", "../#cta-download-template"],
    ],
    bullets: [
      "Usa los botones para acciones hero, controles de app, superficies de comando y flujos de pricing.",
      "Mantiene semantica nativa de button al adaptar los ejemplos a produccion.",
      "Acompana cada estilo con foco visible, estado disabled y respuesta de carga cuando aplique.",
    ],
  },
  {
    lang: "es",
    slug: "es-gradientes-css",
    title: "Gradientes CSS para paginas web y UI de producto",
    h1: "Gradientes CSS para interfaces web",
    description:
      "Coleccion visual de gradientes CSS, paletas, superficies glass y tratamientos de color para landing pages y productos digitales.",
    keywords: ["gradientes CSS", "gradientes para paginas web", "paletas frontend", "glassmorphism CSS"],
    sections: [
      ["Gradientes", "../#gradients"],
      ["Colores", "../#colors"],
      ["Paletas", "../#palettes"],
      ["Glass UI", "../#glass"],
      ["Estilos", "../#styles"],
    ],
    bullets: [
      "Usa gradientes como acentos y jerarquia visual, no como ruido permanente.",
      "El catalogo separa paletas, gradientes y superficies glass para comparar mas rapido.",
      "Comprueba siempre contraste cuando adaptes un gradiente a texto real.",
    ],
  },
  {
    lang: "es",
    slug: "es-loaders-skeletons",
    title: "Loaders, skeletons y barras de progreso accesibles",
    h1: "Loaders y skeletons para interfaces frontend",
    description:
      "Patrones de carga, skeleton UI, barras de progreso y feedback animado para productos web y dashboards.",
    keywords: ["loaders frontend", "skeleton UI", "barras de progreso CSS", "estados de carga"],
    sections: [
      ["Loading States", "../#loading"],
      ["Animations", "../#animations"],
      ["Empty states", "../#empty-states"],
      ["Motion easings", "../#easing"],
      ["CSS utils", "../#utils"],
    ],
    bullets: [
      "Un loader debe comunicar estado, no solo moverse.",
      "Los snippets de carga deben respetar reduced motion y exponer significado semantico.",
      "Los skeletons funcionan mejor cuando imitan la forma real del contenido que esta cargando.",
    ],
  },
  {
    lang: "es",
    slug: "es-ctas-landing-pages",
    title: "CTAs para landing pages, pricing y newsletters",
    h1: "CTAs para landing pages y productos SaaS",
    description:
      "Bloques CTA reutilizables para pricing, descargas, newsletters, suscripciones, modales y landing pages de producto.",
    keywords: ["CTAs para landing pages", "bloques CTA", "newsletter CTA", "pricing CTA"],
    sections: [
      ["CTA Blocks", "../#cta-blocks"],
      ["Compra y suscripcion", "../#cta-purchase-subscription"],
      ["Descarga y plantillas", "../#cta-download-template"],
      ["Newsletter y popup", "../#cta-form-newsletter-popup"],
      ["Pricing sections", "../#pricing-sections"],
    ],
    bullets: [
      "Un CTA necesita jerarquia clara, una accion principal y texto de apoyo confiable.",
      "Separar CTAs de compra, descarga y formulario evita patrones genericos.",
      "Adapta cada bloque a la intencion de la pagina antes de copiar solo la estetica.",
    ],
  },
  {
    lang: "es",
    slug: "es-footers-web",
    title: "Footers web, sitemaps y cierres de producto",
    h1: "Footers web reutilizables y sistemas de cierre",
    description:
      "Patrones de footer tipografico, sitemap, newsletter, cards de producto y footer compacto para apps web.",
    keywords: ["footers web", "footer sitemap", "footer newsletter", "footer para landing page"],
    sections: [
      ["Footer Systems", "../#footer-systems"],
      ["Footer type systems", "../#footer-type-systems"],
      ["Footer grid cards", "../#footer-grid-cards"],
      ["Footer style modes", "../#footer-style-modes"],
      ["Navigation patterns", "../#navigation-patterns"],
    ],
    bullets: [
      "Un buen footer cierra navegacion, confianza y conversion.",
      "Los footers sitemap ayudan en productos densos; los compactos encajan mejor en herramientas.",
      "Mantiene grupos de enlaces legibles y evita convertir el footer en decoracion vacia.",
    ],
  },
  {
    lang: "es",
    slug: "es-bento-grids",
    title: "Bento grids para features, dashboards y portfolios",
    h1: "Bento grids para contar productos visualmente",
    description:
      "Ejemplos de bento grids para features, dashboards, estadisticas, portfolios multimedia y storytelling de producto.",
    keywords: ["bento grids", "bento grid CSS", "feature bento", "dashboard bento"],
    sections: [
      ["Bento Systems", "../#bento-systems"],
      ["Feature landing bentos", "../#bento-feature-landing"],
      ["Dashboard bento grids", "../#bento-dashboard-grids"],
      ["Media portfolio bentos", "../#bento-media-portfolio"],
      ["Feature sections", "../#feature-sections"],
    ],
    bullets: [
      "Un bento grid funciona cuando cada celda cumple un proposito distinto.",
      "Sirve para prueba de producto, jerarquia de features, dashboards y portfolios.",
      "En mobile debe apilar de forma intencional para no perder sentido.",
    ],
  },
  {
    lang: "es",
    slug: "es-patrones-navegacion",
    title: "Patrones de navegacion web para apps y landing pages",
    h1: "Patrones de navegacion web claros y reutilizables",
    description:
      "Navegaciones sticky, mega menus, sidebars, buscadores, breadcrumbs y announcement bars para productos frontend.",
    keywords: ["patrones de navegacion web", "navbar sticky", "mega menu", "sidebar navigation"],
    sections: [
      ["Navigation Patterns", "../#navigation-patterns"],
      ["Static and sticky nav", "../#nav-static-sticky"],
      ["Dropdown and mega menus", "../#nav-dropdown-mega"],
      ["Sidebar and search nav", "../#nav-sidebar-search"],
      ["Announcement and breadcrumbs", "../#nav-announcement-breadcrumb"],
    ],
    bullets: [
      "La navegacion debe hacer visible la arquitectura de informacion antes de decorar.",
      "La busqueda encaja en herramientas densas; la navegacion sticky ayuda en paginas largas.",
      "Usa enlaces y botones nativos antes de anadir comportamiento custom.",
    ],
  },
  {
    lang: "es",
    slug: "es-componentes-accesibles",
    title: "Componentes accesibles con HTML semantico y WCAG",
    h1: "Componentes accesibles y snippets semanticos",
    description:
      "Snippets UI orientados a accesibilidad: labels, fieldsets, dialogs nativos, tablas semanticas, loaders, progressbars y controles por teclado.",
    keywords: ["componentes accesibles", "HTML semantico", "snippets WCAG", "UI accesible"],
    sections: [
      ["Dialogs and overlays", "../#dialogs-overlays"],
      ["Tables and data views", "../#tables-data"],
      ["Form elements", "../#inputs"],
      ["Loading states", "../#loading"],
      ["Accessibility governance", "../docs/accessibility-governance.md"],
    ],
    bullets: [
      "La accesibilidad se trata como restriccion por defecto, no como capa final.",
      "Los snippets se normalizan con nombres accesibles, relaciones y estados cuando aplica.",
      "En produccion siempre hay que validar teclado, contraste, lector de pantalla y reduced motion.",
    ],
  },
];

const catalogPages = [...pages, ...spanishPages];
const landingRoutes = catalogPages.map((page) => `/catalog/${page.slug}.html`);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function json(data) {
  return JSON.stringify(data, null, 2).replaceAll("</", "<\\/");
}

function routeUrl(path) {
  return `${siteUrl}${path}`;
}

function pageHtml(page) {
  const isSpanish = page.lang === "es";
  const url = routeUrl(`/catalog/${page.slug}.html`);
  const relatedPages = catalogPages.filter((item) => item.slug !== page.slug && item.lang === page.lang).slice(0, 6);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: page.keywords.map((name) => ({ "@type": "Thing", name })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "UI IP Toolkit", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Catalog", item: `${siteUrl}/catalog/` },
          { "@type": "ListItem", position: 3, name: page.h1, item: url },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${url}#sections`,
        name: `${page.h1} sections`,
        itemListElement: page.sections.map(([name, href], index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          url: new URL(href, url).href,
        })),
      },
    ],
  };

  return `<!doctype html>
<html lang="${page.lang || "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(page.title)} | UI IP Toolkit</title>
<meta name="description" content="${escapeHtml(page.description)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}">
<link rel="icon" href="../favicon.svg">
<meta property="og:type" content="website">
<meta property="og:site_name" content="UI IP Toolkit">
<meta property="og:title" content="${escapeHtml(page.title)}">
<meta property="og:description" content="${escapeHtml(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${siteUrl}/.github/assets/ui-ip-toolkit-hero.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(page.title)}">
<meta name="twitter:description" content="${escapeHtml(page.description)}">
<meta name="twitter:image" content="${siteUrl}/.github/assets/ui-ip-toolkit-hero.png">
<script type="application/ld+json">${json(structuredData)}</script>
<style>
:root{color-scheme:dark;--bg:#060507;--panel:#101018;--text:#f8f4ff;--muted:#d7cede;--soft:#bfb4c9;--line:rgba(255,255,255,.12);--accent:#d7c4ff;--hot:#fb8dff}
*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:radial-gradient(circle at 18% 0,rgba(194,164,255,.16),transparent 34%),var(--bg);color:var(--text);line-height:1.65}a{color:inherit}a:focus-visible{outline:3px solid #fff;outline-offset:4px;border-radius:8px}.wrap{width:min(1120px,calc(100% - 32px));margin:0 auto}.top{display:flex;justify-content:space-between;gap:18px;align-items:center;padding:22px 0;border-bottom:1px solid var(--line)}.brand{font-weight:900;letter-spacing:.02em}.nav{display:flex;gap:14px;flex-wrap:wrap}.nav a,.pill{display:inline-flex;align-items:center;min-height:36px;padding:0 12px;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--muted);background:rgba(255,255,255,.04)}.hero{padding:72px 0 42px}.eyebrow{color:var(--accent);font-weight:800;text-transform:uppercase;font-size:.82rem;letter-spacing:.14em}.hero h1{max-width:820px;margin:.5rem 0 1rem;font-size:clamp(2.3rem,6vw,5rem);line-height:.95;letter-spacing:0}.hero p{max-width:780px;color:var(--muted);font-size:1.12rem}.grid{display:grid;grid-template-columns:1.15fr .85fr;gap:24px;margin:34px 0}.card{border:1px solid var(--line);background:rgba(16,16,24,.82);border-radius:22px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.28)}h2{font-size:1.35rem;margin:0 0 14px}.list{display:grid;gap:12px;margin:0;padding:0;list-style:none}.list a{display:flex;justify-content:space-between;gap:12px;text-decoration:none;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}.list a span{color:var(--soft)}.keywords{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}.copy{color:var(--muted)}.footer{border-top:1px solid var(--line);margin-top:48px;padding:28px 0 44px;color:var(--soft);font-size:.95rem}.routes{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}.routes a{text-decoration:none;color:var(--muted);padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.04)}@media(max-width:760px){.grid{grid-template-columns:1fr}.top{align-items:flex-start;flex-direction:column}.hero{padding-top:42px}}
</style>
</head>
<body>
<header class="wrap top">
  <a class="brand" href="../">UI IP Toolkit</a>
  <nav class="nav" aria-label="${isSpanish ? "Navegacion del catalogo" : "Catalog navigation"}">
    <a href="../">${isSpanish ? "Inicio" : "Home"}</a>
    <a href="./">${isSpanish ? "Rutas del catalogo" : "Catalog routes"}</a>
    <a href="https://github.com/ikerperez12/UI-IP-Toolkit-v4.0" rel="noopener noreferrer">GitHub</a>
  </nav>
</header>
<main class="wrap">
  <section class="hero">
    <div class="eyebrow">${isSpanish ? "Ruta del catalogo UI IP Toolkit" : "UI IP Toolkit catalog route"}</div>
    <h1>${escapeHtml(page.h1)}</h1>
    <p>${escapeHtml(page.description)}</p>
    <div class="keywords">${page.keywords.map((keyword) => `<span class="pill">${escapeHtml(keyword)}</span>`).join("")}</div>
  </section>
  <section class="grid" aria-label="Catalog route details">
    <div class="card">
      <h2>${isSpanish ? "Que te ayuda a encontrar esta ruta" : "What this route helps you find"}</h2>
      <ul class="list">
        ${page.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n        ")}
      </ul>
    </div>
    <div class="card">
      <h2>${isSpanish ? "Abrir secciones relacionadas" : "Open related sections"}</h2>
      <ul class="list">
        ${page.sections.map(([name, href]) => `<li><a href="${href}">${escapeHtml(name)} <span>${isSpanish ? "Abrir" : "Open"}</span></a></li>`).join("\n        ")}
      </ul>
    </div>
  </section>
  <section class="card">
    <h2>${isSpanish ? "Rutas relacionadas del catalogo" : "Related catalog routes"}</h2>
    <div class="routes">
      ${relatedPages.map((item) => `<a href="./${item.slug}.html">${escapeHtml(item.h1)}</a>`).join("\n      ")}
    </div>
  </section>
  <section class="card" style="margin-top:24px">
    <h2>${isSpanish ? "Sobre UI IP Toolkit" : "About UI IP Toolkit"}</h2>
    <p class="copy">${isSpanish ? "UI IP Toolkit es un catalogo estatico de assets frontend para desarrolladores que quieren acceso visual rapido a patrones UI reutilizables. El catalogo interactivo completo contiene 64 secciones y 785 elementos copiables, mientras estas rutas dan a buscadores y lectores entradas tematicas mas claras." : "UI IP Toolkit is a static frontend asset catalog for developers who want quick visual access to reusable UI patterns. The full interactive catalog contains 64 sections and 785 copyable elements, while these catalog routes give search engines and readers clearer topic-specific entry points."}</p>
  </section>
</main>
<footer class="wrap footer">
  <p>UI IP Toolkit v4 - static frontend asset catalog - <a href="../sitemap.xml">Sitemap</a> - <a href="../llms.txt">LLMs.txt</a></p>
</footer>
</body>
</html>
`;
}

function indexHtml() {
  const url = `${siteUrl}/catalog/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: "UI IP Toolkit catalog routes",
    description: "Topic-specific landing pages for the UI IP Toolkit frontend asset catalog.",
    hasPart: catalogPages.map((page) => ({
      "@type": "WebPage",
      name: page.title,
      url: routeUrl(`/catalog/${page.slug}.html`),
    })),
  };

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Catalog Routes for Frontend UI Assets | UI IP Toolkit</title>
<meta name="description" content="Browse topic-specific landing pages for UI IP Toolkit: buttons, gradients, loaders, CTAs, footers, bento grids, navigation, forms and accessible UI snippets.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}">
<link rel="icon" href="../favicon.svg">
<meta property="og:type" content="website">
<meta property="og:site_name" content="UI IP Toolkit">
<meta property="og:title" content="Catalog Routes for Frontend UI Assets">
<meta property="og:description" content="Topic-specific routes for copy-ready frontend snippets and UI patterns.">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${siteUrl}/.github/assets/ui-ip-toolkit-hero.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${json(structuredData)}</script>
<style>
:root{color-scheme:dark;--bg:#060507;--panel:#101018;--text:#f8f4ff;--muted:#d7cede;--line:rgba(255,255,255,.12);--accent:#d7c4ff}*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:radial-gradient(circle at 12% 0,rgba(194,164,255,.16),transparent 36%),var(--bg);color:var(--text);line-height:1.65}.wrap{width:min(1120px,calc(100% - 32px));margin:0 auto}.top{display:flex;justify-content:space-between;gap:18px;align-items:center;padding:22px 0;border-bottom:1px solid var(--line)}a{color:inherit}.brand{font-weight:900;text-decoration:none}.nav{display:flex;gap:12px;flex-wrap:wrap}.nav a{min-height:36px;padding:7px 12px;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--muted)}main{padding:64px 0}.hero h1{font-size:clamp(2.4rem,6vw,5rem);line-height:.95;margin:0 0 18px}.hero p{max-width:820px;color:var(--muted);font-size:1.1rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:34px}.card{display:block;text-decoration:none;padding:18px;border:1px solid var(--line);border-radius:18px;background:rgba(255,255,255,.05)}.card strong{display:block;margin-bottom:6px}.card span{color:var(--muted);font-size:.95rem}.footer{border-top:1px solid var(--line);padding:28px 0 44px;color:var(--muted)}
</style>
</head>
<body>
<header class="wrap top"><a class="brand" href="../">UI IP Toolkit</a><nav class="nav" aria-label="Catalog navigation"><a href="../">Home</a><a href="https://github.com/ikerperez12/UI-IP-Toolkit-v4.0">GitHub</a></nav></header>
<main class="wrap">
  <section class="hero">
    <h1>Catalog routes for frontend UI assets</h1>
    <p>These pages give search engines and humans clearer topic-specific entry points into UI IP Toolkit. Use them to jump directly to buttons, gradients, loaders, CTAs, footers, bento grids, navigation, forms, accessibility and other reusable frontend patterns.</p>
  </section>
  <section class="grid" aria-label="Catalog landing pages">
    ${catalogPages.map((page) => `<a class="card" href="./${page.slug}.html" lang="${page.lang || "en"}"><strong>${escapeHtml(page.h1)}</strong><span>${escapeHtml(page.description)}</span></a>`).join("\n    ")}
  </section>
</main>
<footer class="wrap footer">UI IP Toolkit v4 - <a href="../sitemap.xml">Sitemap</a> - <a href="../">Full visual catalog</a></footer>
</body>
</html>
`;
}

function sitemapXml() {
  const urls = [
    { loc: `${siteUrl}/`, priority: "1.0" },
    { loc: `${siteUrl}/catalog/`, priority: "0.9" },
    ...catalogPages.map((page) => ({ loc: routeUrl(`/catalog/${page.slug}.html`), priority: page.lang === "es" ? "0.7" : "0.8" })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
}

function sitemapTxt() {
  return [`${siteUrl}/`, `${siteUrl}/catalog/`, ...landingRoutes.map(routeUrl)].join("\n") + "\n";
}

function llmsTxt() {
  return `# UI IP Toolkit

UI IP Toolkit is a static frontend asset catalog for web developers. It provides visual access to copy-ready UI snippets, CSS utilities, buttons, gradients, loaders, CTAs, footers, bento grids, navigation patterns, forms, accessibility-oriented snippets and product UI blocks.

Official site: ${siteUrl}/
Repository: https://github.com/ikerperez12/UI-IP-Toolkit-v4.0
README: https://github.com/ikerperez12/UI-IP-Toolkit-v4.0#readme
License: MIT
Author: ikerperez12
Sitemap: ${siteUrl}/sitemap.xml
Image sitemap: ${siteUrl}/sitemap-images.xml
Search vocabulary: ${siteUrl}/search-keywords.txt

Primary catalog routes:
${catalogPages.map((page) => `- ${page.h1}: ${routeUrl(`/catalog/${page.slug}.html`)}`).join("\n")}

Important public assets:
- Hero image: ${siteUrl}/.github/assets/ui-ip-toolkit-hero.png
- Social card: ${siteUrl}/.github/assets/ui-ip-toolkit-social.png
- Bento overview: ${siteUrl}/.github/assets/ui-ip-toolkit-bento.png
- Demo GIF: ${siteUrl}/.github/assets/ui-ip-toolkit-demo.gif

Suggested summary:
UI IP Toolkit is a visual library for developers who want fast, comfortable access to reusable frontend assets. It is built as a public static catalog with copy-ready snippets, topic-specific catalog routes and no backend or runtime framework dependency.
`;
}

function searchKeywordsTxt() {
  const phrases = new Set([
    "frontend asset library",
    "visual frontend toolkit",
    "copy-ready UI snippets",
    "CSS snippets for web developers",
    "reusable frontend assets",
    "static UI toolkit",
    "web developer asset catalog",
    "visual CSS utility catalog",
    "UI pattern library",
    "HTML CSS JavaScript UI toolkit",
    ...catalogPages.flatMap((page) => page.keywords),
    "libreria visual frontend",
    "assets frontend reutilizables",
    "snippets CSS para desarrolladores web",
    "catalogo visual de componentes UI",
    "patrones UI copy-ready",
    "botones CSS listos para copiar",
    "gradientes para paginas web",
    "loaders frontend",
    "CTAs para landing pages",
    "footers para sitios web",
    "bento grids para frontend",
    "patrones de navegacion web",
    "paginas 404 para productos web",
    "utilidades CSS reutilizables",
  ]);

  return `# UI IP Toolkit Search Discovery Vocabulary

This file lists legitimate search phrases that describe UI IP Toolkit. It is designed as a crawlable reference for humans, search engines and AI tools. It is not a hidden keyword dump and should stay aligned with real catalog content.

Primary phrases:
${[...phrases].sort().map((phrase) => `- ${phrase}`).join("\n")}

Catalog route URLs:
${catalogPages.map((page) => `- ${routeUrl(`/catalog/${page.slug}.html`)}`).join("\n")}

Official links:
- Live site: ${siteUrl}/
- GitHub repository: https://github.com/ikerperez12/UI-IP-Toolkit-v4.0
`;
}

function write(path, content) {
  writeFileSync(join(root, path), content, "utf8");
}

mkdirSync(join(root, "catalog"), { recursive: true });
write("catalog/index.html", indexHtml());
for (const page of catalogPages) {
  write(`catalog/${page.slug}.html`, pageHtml(page));
}
write("sitemap.xml", sitemapXml());
write("sitemap.txt", sitemapTxt());
write("llms.txt", llmsTxt());
write("search-keywords.txt", searchKeywordsTxt());

console.log(`Generated ${catalogPages.length + 1} catalog pages and updated sitemap/discovery files.`);
