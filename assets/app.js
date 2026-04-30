const backgroundAudioState = {
  audio: null,
  toggle: null,
  hasUserPaused: false,
  unlockAttached: false,
};

const catalogPaginationState = {
  instances: [],
  frame: 0,
  resizeObserver: null,
};

const GRID_ROWS = {
  dense: { wide: 3, desktop: 3, tablet: 3, mobile: 4 },
  standard: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
  compact: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
  section: { wide: 2, desktop: 2, tablet: 1, mobile: 2 },
};

function createPageConfig(selector, minWidth, gap, rows, wide, desktop = wide, tablet = wide, mobile = 0, minPageSize = 1) {
  return {
    selector,
    minWidth,
    gap,
    rows,
    reserveHeight: { wide, desktop, tablet, mobile },
    minPageSize,
  };
}

const catalogSections = [
  { id: "neu", eyebrow: "Neumorphism", titleHtml: 'Soft <span>UI Kit</span>', description: "Modern Neumorphic elements with deep and surface shadows.", family: "foundation", priority: "core", navLabel: "Neu", active: true, page: createPageConfig("#neu .neu-g", 220, 16, GRID_ROWS.standard, 372, 372, 472) },
  { id: "borders", eyebrow: "Animated Borders", titleHtml: 'Rotating <span>Edges</span>', description: "Inspired by ReactBits - CSS-only conic gradient border animations.", family: "foundation", priority: "core", active: true, page: createPageConfig("#borders .abd-g", 280, 18, GRID_ROWS.standard, 410, 410, 560) },
  { id: "textreveal", eyebrow: "Text Reveal", titleHtml: 'Kinetic <span>Typography</span>', description: "Hero-grade reveal treatments and marquee-style motion typography.", family: "motion", priority: "support", active: true },
  { id: "colors", eyebrow: "Colors", titleHtml: 'Color <span>System</span>', description: "Curated palette - click any swatch to copy standalone HTML.", family: "foundation", priority: "core", navLabel: "Colors", active: true, page: createPageConfig("#colors .pal-g", 130, 10, GRID_ROWS.dense, 372, 372, 472) },
  { id: "gradients", eyebrow: "Gradients", titleHtml: 'Gradient <span>Library</span>', description: "Launch-ready gradients for hero backgrounds, dashboards and premium surfaces.", family: "foundation", priority: "core", active: true, page: createPageConfig("#gradients .gr-g", 260, 16, GRID_ROWS.standard, 336, 336, 520) },
  { id: "animations", eyebrow: "Animations", titleHtml: 'Keyframe <span>Animations</span>', description: "Reusable motion primitives for loaders, reveals and status states.", family: "motion", priority: "core", active: true, page: createPageConfig("#animations .an-g", 155, 14, GRID_ROWS.dense, 556, 556, 620) },
  { id: "typography", eyebrow: "Typography", titleHtml: 'Font <span>Collection</span>', description: "Expressive type families for product UI, launch pages and editorial surfaces.", family: "foundation", priority: "support", active: true, page: createPageConfig("#typography .fn-r", 220, 16, GRID_ROWS.standard, 540, 540, 760) },
  { id: "buttons", eyebrow: "Buttons Kit", titleHtml: 'Button <span>Variants</span>', description: "High-contrast actions, pills and CTA treatments that stay readable in dark product shells.", family: "controls", priority: "core", navLabel: "Buttons", active: true, page: createPageConfig("#buttons .btn-g", 250, 18, GRID_ROWS.standard, 536, 536, 690) },
  { id: "inputs", eyebrow: "Input Kit", titleHtml: 'Form <span>Elements</span>', description: "Filters, segmented controls and payment inputs tuned for app-grade forms.", family: "controls", priority: "core", active: true, page: createPageConfig("#inputs .inp-g", 260, 18, GRID_ROWS.standard, 578, 578, 740) },
  { id: "loading", eyebrow: "Loading States", titleHtml: 'Loading <span>Patterns</span>', description: "Progress, skeleton and waiting states for async-heavy interfaces.", family: "feedback", priority: "core", active: true, page: createPageConfig("#loading .load-g", 220, 18, GRID_ROWS.standard, 518, 518, 690) },
  { id: "textfx", eyebrow: "Text Effects", titleHtml: 'Text <span>Styles</span>', description: "Headline and annotation effects for launch pages, badges and product narratives.", family: "foundation", priority: "support", active: true, page: createPageConfig("#textfx .tx-g", 300, 18, GRID_ROWS.standard, 474, 474, 620) },
  { id: "shadows", eyebrow: "Shadows", titleHtml: 'Shadow <span>Collection</span>', description: "Ambient elevation recipes for panels, modals and premium cards.", family: "foundation", priority: "support", active: true, page: createPageConfig("#shadows .sh-g", 200, 16, GRID_ROWS.standard, 422, 422, 568) },
  { id: "hover", eyebrow: "Hover FX", titleHtml: 'Hover <span>Effects</span>', description: "Strong but readable hover patterns for cards, buttons and promo tiles.", family: "motion", priority: "support", active: true, page: createPageConfig("#hover .hf-g", 260, 18, GRID_ROWS.standard, 612, 612, 760) },
  { id: "glass", eyebrow: "Glassmorphism", titleHtml: 'Glass <span>Components</span>', description: "Frosted shells, overlays and slabs with enough contrast to stay useful.", family: "surface", priority: "support", active: true, page: createPageConfig("#glass .gl-g", 280, 20, GRID_ROWS.standard, 650, 650, 810) },
  { id: "utils", eyebrow: "CSS Utils", titleHtml: 'Interactive <span>Utilities</span>', description: "Small production helpers for states, legends, rails and shell chrome.", family: "utility", priority: "support", active: true, page: createPageConfig("#utils .ut-g", 220, 14, GRID_ROWS.standard, 510, 510, 680) },
  { id: "neutral", eyebrow: "Neutral Toolkit", titleHtml: 'Core <span>Components</span>', description: "Baseline components with no brand lock-in, useful across product categories.", family: "components", priority: "core", active: true, page: createPageConfig("#neutral .cp-g", 260, 18, GRID_ROWS.standard, 552, 552, 720) },
  { id: "components", eyebrow: "Components", titleHtml: 'UI <span>Components</span>', description: "Generic building blocks after duplicate product-oriented patterns are pulled into dedicated sections.", family: "components", priority: "core", navLabel: "Components", active: true, page: createPageConfig("#components .cp-g", 260, 18, GRID_ROWS.standard, 552, 552, 720) },
  { id: "layouts", eyebrow: "Layouts", titleHtml: 'Layout <span>Blueprints</span>', description: "Only spatial blueprints and shell compositions that read clearly without hover.", family: "layouts", priority: "core", navLabel: "Layouts", active: true, page: createPageConfig("#layouts .ly-g", 260, 18, GRID_ROWS.standard, 540, 540, 720) },
  { id: "dialogs-overlays", eyebrow: "Dialogs & Overlays", titleHtml: 'Dialogs & <span>Overlays</span>', description: "Modals, drawers, command layers and stacked alerts tuned for production product flows.", family: "product-ui", priority: "core", navLabel: "Dialogs", active: true, page: createPageConfig("#dialogs-overlays .cp-g", 280, 18, GRID_ROWS.standard, 648, 648, 820) },
  { id: "tables-data", eyebrow: "Tables & Data Views", titleHtml: 'Tables & <span>Data Views</span>', description: "Dense admin tables, KPI grids and list-detail compositions that still read cleanly at a glance.", family: "product-ui", priority: "core", navLabel: "Tables", active: true, page: createPageConfig("#tables-data .cp-g", 300, 20, GRID_ROWS.standard, 682, 682, 860) },
  { id: "empty-states", eyebrow: "Empty States & Feedback", titleHtml: 'Empty States & <span>Feedback</span>', description: "Zero states, inline success and failure messaging, and onboarding prompts with stronger product presence.", family: "product-ui", priority: "core", active: true, page: createPageConfig("#empty-states .cp-g", 280, 18, GRID_ROWS.standard, 640, 640, 820) },
  { id: "panels-settings", eyebrow: "Panels & Settings", titleHtml: 'Panels & <span>Settings</span>', description: "Inspector rails, settings slabs and split-pane shells for account, security and workspace management.", family: "product-ui", priority: "core", active: true, page: createPageConfig("#panels-settings .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "navigation-patterns", eyebrow: "Navigation Patterns", titleHtml: 'Navigation <span>Patterns</span>', description: "Native navigation systems inspired by current gallery taxonomies: sticky bars, mega menus, sidebars and search-first flows.", family: "inspiration", priority: "core", navLabel: "Nav", active: true, page: createPageConfig("#navigation-patterns .cp-g", 290, 18, GRID_ROWS.standard, 654, 654, 824) },
  { id: "hero-headlines", eyebrow: "Hero Headlines", titleHtml: 'Hero <span>Headlines</span>', description: "Headline systems for SaaS, editorial and launch pages, built as native HTML snippets instead of copied gallery assets.", family: "inspiration", priority: "core", navLabel: "H1", active: true, page: createPageConfig("#hero-headlines .cp-g", 320, 20, GRID_ROWS.standard, 704, 704, 880) },
  { id: "cta-blocks", eyebrow: "CTA Blocks", titleHtml: 'CTA <span>Blocks</span>', description: "Conversion blocks for pricing, downloads, newsletters and modal actions with readable preview stages.", family: "inspiration", priority: "core", navLabel: "CTA", active: true, page: createPageConfig("#cta-blocks .cp-g", 290, 18, GRID_ROWS.standard, 654, 654, 824) },
  { id: "error-pages", eyebrow: "404 & Error Pages", titleHtml: '404 & <span>Error Pages</span>', description: "Recovery states with clear hierarchy, fallback actions and enough personality to avoid dead-end product moments.", family: "inspiration", priority: "core", active: true, page: createPageConfig("#error-pages .cp-g", 290, 18, GRID_ROWS.standard, 654, 654, 824) },
  { id: "footer-systems", eyebrow: "Footer Systems", titleHtml: 'Footer <span>Systems</span>', description: "Typographic, sitemap, newsletter and app-footers built as reusable closing systems.", family: "inspiration", priority: "core", active: true, page: createPageConfig("#footer-systems .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "bento-systems", eyebrow: "Bento Systems", titleHtml: 'Bento <span>Systems</span>', description: "Feature, dashboard, stats and media bento layouts generated as responsive native snippets.", family: "inspiration", priority: "core", navLabel: "Bento", active: true, page: createPageConfig("#bento-systems .cp-g", 320, 20, GRID_ROWS.standard, 706, 706, 880) },
  { id: "pricing-sections", eyebrow: "Pricing Sections", titleHtml: 'Pricing <span>Sections</span>', description: "Plan cards, comparison bands and upgrade prompts generated as native pricing UI.", family: "inspiration", priority: "core", active: true, page: createPageConfig("#pricing-sections .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "form-patterns", eyebrow: "Form Patterns", titleHtml: 'Form <span>Patterns</span>', description: "Lead forms, onboarding forms, checkout forms and search inputs with strong preview anatomy.", family: "inspiration", priority: "core", active: true, page: createPageConfig("#form-patterns .cp-g", 290, 18, GRID_ROWS.standard, 654, 654, 824) },
  { id: "feature-sections", eyebrow: "Feature Sections", titleHtml: 'Feature <span>Sections</span>', description: "Feature rows, process strips and comparison sections built as reusable landing-page blocks.", family: "inspiration", priority: "core", navLabel: "Features", active: true, page: createPageConfig("#feature-sections .cp-g", 310, 20, GRID_ROWS.standard, 686, 686, 860) },
  { id: "social-proof", eyebrow: "Social Proof", titleHtml: 'Social <span>Proof</span>', description: "Testimonials, logo clouds, review blocks and trust bands separated from generic CTA content.", family: "inspiration", priority: "core", active: true, page: createPageConfig("#social-proof .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "nav-static-sticky", eyebrow: "Navbar Static & Sticky", titleHtml: 'Static & <span>Sticky Nav</span>', description: "Fixed headers, compact product bars and sticky navigation treatments generated as native snippets.", family: "inspiration", catalogSource: "navbar-gallery-taxonomy", sourcePillar: "navbar", qaStatus: "keep", priority: "core", navLabel: "Nav+", active: true, page: createPageConfig("#nav-static-sticky .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "nav-dropdown-mega", eyebrow: "Navbar Dropdown & Mega", titleHtml: 'Dropdown & <span>Mega Menus</span>', description: "Flyouts, grouped mega menus and nested navigation structures inspired by navigation taxonomies.", family: "inspiration", catalogSource: "navbar-gallery-taxonomy", sourcePillar: "navbar", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#nav-dropdown-mega .cp-g", 310, 20, GRID_ROWS.standard, 686, 686, 860) },
  { id: "nav-sidebar-search", eyebrow: "Navbar Sidebar & Search", titleHtml: 'Sidebar & <span>Search Nav</span>', description: "Vertical menus, command-forward headers and search-first navigation layouts for dense products.", family: "inspiration", catalogSource: "navbar-gallery-taxonomy", sourcePillar: "navbar", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#nav-sidebar-search .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "nav-announcement-breadcrumb", eyebrow: "Navbar Announcement & Breadcrumb", titleHtml: 'Announcement & <span>Breadcrumbs</span>', description: "Announcement bars, secondary paths and progress navigation states for product and docs surfaces.", family: "inspiration", catalogSource: "navbar-gallery-taxonomy", sourcePillar: "navbar", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#nav-announcement-breadcrumb .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "h1-ai-saas", eyebrow: "H1 AI & SaaS", titleHtml: 'AI & <span>SaaS Headlines</span>', description: "Original headline systems for AI tools, cloud platforms, analytics and B2B workflow products.", family: "inspiration", catalogSource: "h1-gallery-taxonomy", sourcePillar: "h1", qaStatus: "keep", priority: "core", navLabel: "H1+", active: true, page: createPageConfig("#h1-ai-saas .cp-g", 320, 20, GRID_ROWS.standard, 704, 704, 880) },
  { id: "h1-commerce-creator", eyebrow: "H1 Commerce & Creator", titleHtml: 'Commerce & <span>Creator Headlines</span>', description: "Original marketing headlines for commerce, creator tools, memberships and download-led products.", family: "inspiration", catalogSource: "h1-gallery-taxonomy", sourcePillar: "h1", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#h1-commerce-creator .cp-g", 320, 20, GRID_ROWS.standard, 704, 704, 880) },
  { id: "h1-editorial-portfolio", eyebrow: "H1 Editorial & Portfolio", titleHtml: 'Editorial & <span>Portfolio Headlines</span>', description: "Large-type headline compositions for studios, editorial surfaces and personal portfolio pages.", family: "inspiration", catalogSource: "h1-gallery-taxonomy", sourcePillar: "h1", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#h1-editorial-portfolio .cp-g", 320, 20, GRID_ROWS.standard, 704, 704, 880) },
  { id: "cta-purchase-subscription", eyebrow: "CTA Purchase & Subscription", titleHtml: 'Purchase & <span>Subscription CTAs</span>', description: "Buy, upgrade, pricing and subscription prompts built as reusable conversion blocks.", family: "inspiration", catalogSource: "cta-gallery-taxonomy", sourcePillar: "cta", qaStatus: "keep", priority: "core", navLabel: "CTA+", active: true, page: createPageConfig("#cta-purchase-subscription .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "cta-download-template", eyebrow: "CTA Download & Template", titleHtml: 'Download & <span>Template CTAs</span>', description: "Download, starter kit, free resource and template CTAs with clear payload framing.", family: "inspiration", catalogSource: "cta-gallery-taxonomy", sourcePillar: "cta", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#cta-download-template .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "cta-form-newsletter-popup", eyebrow: "CTA Form, Newsletter & Popup", titleHtml: 'Forms, Newsletter & <span>Popups</span>', description: "Lead capture, newsletter, modal and navigation CTAs kept separate from generic button patterns.", family: "inspiration", catalogSource: "cta-gallery-taxonomy", sourcePillar: "cta", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#cta-form-newsletter-popup .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "error-style-studies", eyebrow: "404 Style Studies", titleHtml: '404 <span>Style Studies</span>', description: "Minimal, bold, typographic, playful and visual error-page styles built as original native blocks.", family: "inspiration", catalogSource: "404s-design-taxonomy", sourcePillar: "404", qaStatus: "keep", priority: "core", navLabel: "404+", active: true, page: createPageConfig("#error-style-studies .cp-g", 310, 20, GRID_ROWS.standard, 686, 686, 860) },
  { id: "error-recovery-flows", eyebrow: "404 Recovery Flows", titleHtml: 'Error <span>Recovery Flows</span>', description: "Search, support, retry, route-switch and permission recovery states for real product failures.", family: "inspiration", catalogSource: "404s-design-taxonomy", sourcePillar: "404", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#error-recovery-flows .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "error-industry-pages", eyebrow: "404 Industry Pages", titleHtml: 'Industry <span>Error Pages</span>', description: "Original 404 systems tailored for SaaS, commerce, media, finance, nonprofit and portfolio contexts.", family: "inspiration", catalogSource: "404s-design-taxonomy", sourcePillar: "404", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#error-industry-pages .cp-g", 310, 20, GRID_ROWS.standard, 686, 686, 860) },
  { id: "footer-type-systems", eyebrow: "Footer Type Systems", titleHtml: 'Footer <span>Type Systems</span>', description: "Large type, small type, typographic and bold footers generated as reusable closing systems.", family: "inspiration", catalogSource: "footer-design-taxonomy", sourcePillar: "footer", qaStatus: "keep", priority: "core", navLabel: "Footer", active: true, page: createPageConfig("#footer-type-systems .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "footer-grid-cards", eyebrow: "Footer Grid & Cards", titleHtml: 'Grid & <span>Card Footers</span>', description: "Sitemaps, newsletter panels, product cards and app-footers with structured link architecture.", family: "inspiration", catalogSource: "footer-design-taxonomy", sourcePillar: "footer", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#footer-grid-cards .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "footer-style-modes", eyebrow: "Footer Style Modes", titleHtml: 'Footer <span>Style Modes</span>', description: "Bright, dark, flat, animated and illustrative footer treatments generated without external assets.", family: "inspiration", catalogSource: "footer-design-taxonomy", sourcePillar: "footer", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#footer-style-modes .cp-g", 300, 20, GRID_ROWS.standard, 676, 676, 840) },
  { id: "bento-feature-landing", eyebrow: "Bento Feature Landing", titleHtml: 'Feature <span>Landing Bentos</span>', description: "Landing-page bento grids for feature storytelling, product proof and modular value props.", family: "inspiration", catalogSource: "bentogrids-taxonomy", sourcePillar: "bento", qaStatus: "keep", priority: "core", navLabel: "Bento+", active: true, page: createPageConfig("#bento-feature-landing .cp-g", 320, 20, GRID_ROWS.standard, 706, 706, 880) },
  { id: "bento-dashboard-grids", eyebrow: "Bento Dashboard Grids", titleHtml: 'Dashboard <span>Bento Grids</span>', description: "Dashboard, metrics, automation and operations bento layouts with reusable native surfaces.", family: "inspiration", catalogSource: "bentogrids-taxonomy", sourcePillar: "bento", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#bento-dashboard-grids .cp-g", 320, 20, GRID_ROWS.standard, 706, 706, 880) },
  { id: "bento-media-portfolio", eyebrow: "Bento Media & Portfolio", titleHtml: 'Media & <span>Portfolio Bentos</span>', description: "Portfolio, creator, media and case-study bento compositions with mobile-safe geometry.", family: "inspiration", catalogSource: "bentogrids-taxonomy", sourcePillar: "bento", qaStatus: "keep", priority: "core", active: true, page: createPageConfig("#bento-media-portfolio .cp-g", 320, 20, GRID_ROWS.standard, 706, 706, 880) },
  { id: "tokens", eyebrow: "Design Tokens", titleHtml: 'Token <span>System</span>', description: "Semantic variables and system primitives for spacing, motion, surfaces and containers.", family: "systems", priority: "support", navLabel: "Tokens", active: true, page: createPageConfig("#tokens .ut-g", 220, 14, GRID_ROWS.standard, 474, 474, 628) },
  { id: "easing", eyebrow: "Easing Curves", titleHtml: 'Motion <span>Easings</span>', description: "Always-on easing demos that read as motion curves, not just labels.", family: "systems", priority: "support", active: true, page: createPageConfig("#easing .ez-g", 260, 18, GRID_ROWS.standard, 420, 420, 560) },
  { id: "styles", eyebrow: "Style Catalog", titleHtml: 'UI Style <span>Archetypes</span>', description: "Visual archetypes. Copy any palette as CSS variables.", family: "systems", priority: "support", active: true, page: createPageConfig("#styles .sty-g", 250, 18, GRID_ROWS.standard, 520, 520, 710) },
  { id: "palettes", eyebrow: "Industry Palettes", titleHtml: 'Product <span>Color Kits</span>', description: "Industry-specific color kits with usable contrast and clear role labels.", family: "systems", priority: "support", active: true, page: createPageConfig("#palettes .ip-g", 220, 16, GRID_ROWS.standard, 428, 428, 580) },
  { id: "spacing", eyebrow: "Spacing Scale", titleHtml: 'Spacing <span>Visualization</span>', description: "Spacing tokens visualized as product-friendly rhythm steps.", family: "systems", priority: "support", active: true, page: createPageConfig("#spacing .sp-g", 220, 16, GRID_ROWS.standard, 424, 424, 580) },
  { id: "radius", eyebrow: "Border Radius", titleHtml: 'Radius <span>System</span>', description: "Corner scale reference for shells, controls and cards.", family: "systems", priority: "support", active: true },
  { id: "material-ui", eyebrow: "Material UI", titleHtml: 'Google <span>Material</span>', description: "Material Design patterns like ripple buttons and floating labels.", family: "marketplace", priority: "support", active: true, page: createPageConfig("#material-ui .mui-g", 280, 18, GRID_ROWS.standard, 552, 552, 720) },
  { id: "chakra-ui", eyebrow: "Chakra UI", titleHtml: 'Accessible <span>Components</span>', description: "Chakra-inspired alerts, stats and tags kept as reference patterns.", family: "marketplace", priority: "support", active: true, page: createPageConfig("#chakra-ui .cha-g", 260, 18, GRID_ROWS.standard, 552, 552, 720) },
  { id: "tailwind-ui", eyebrow: "Tailwind UI", titleHtml: 'Utility <span>Patterns</span>', description: "Utility-driven cards, placeholders and settings blocks with stronger previews.", family: "marketplace", priority: "support", active: true, page: createPageConfig("#tailwind-ui .tw-g", 300, 20, GRID_ROWS.standard, 628, 628, 790) },
  { id: "cards3d", eyebrow: "3D Hover Cards", titleHtml: 'Interactive <span>Cards</span>', description: "Depth-based promo cards and shells for richer marketing or showcase moments.", family: "showcase", priority: "support", navLabel: "3D", active: true, page: createPageConfig("#cards3d .tw-g", 300, 20, GRID_ROWS.standard, 706, 706, 870) },
  { id: "sera-navigation", eyebrow: "Sera Navigation", titleHtml: 'Menus, tabs and <span>navigation flows</span>', description: "Recovered Sera UI navigation patterns separated from generic components so they stop getting buried in the main grid.", family: "sera", priority: "support", active: true, page: createPageConfig("#sera-navigation .cp-g", 260, 18, GRID_ROWS.standard, 552, 552, 720) },
  { id: "sera-cards", eyebrow: "Sera Cards", titleHtml: 'Structured forms and <span>card surfaces</span>', description: "Higher-density Sera UI cards, auth blocks and spotlight panels grouped in one place for easier scanning.", family: "sera", priority: "support", active: true, page: createPageConfig("#sera-cards .cp-g", 280, 18, GRID_ROWS.standard, 626, 626, 790) },
  { id: "sera-sections", eyebrow: "Sera Sections", titleHtml: 'Hero blocks and <span>section-level composition</span>', description: "Dedicated landing-page and header compositions, separated from utility cards so full-width ideas are easier to find.", family: "sera", priority: "support", active: true, page: createPageConfig("#sera-sections .cp-g", 320, 20, GRID_ROWS.section, 666, 666, 412) },
];

const catalogSectionConfig = Object.fromEntries(
  catalogSections
    .filter((section) => section.active !== false && section.page?.selector)
    .map((section) => [
      section.page.selector,
      {
        minWidth: section.page.minWidth,
        gap: section.page.gap,
        rows: section.page.rows,
        reserveHeight: section.page.reserveHeight,
        minPageSize: section.page.minPageSize,
      },
    ]),
);

async function copySnippet(btn) {
  const card = btn.closest("[data-snippet]") || btn.closest(".has-copy");
  if (!card) return;

  const type = card.dataset.snippet;
  let code = "";

  if (card.dataset.html) {
    code = card.dataset.html;
  } else if (type === "color") {
    const color = card.dataset.color;
    const name = card.dataset.name;
    code = `<div style="background:${color};width:100px;height:100px"></div>\n<!-- ${name} - ${color} -->`;
  } else if (type === "gradient") {
    const css = card.dataset.css;
    code = `<div style="background:${css};width:100px;height:100px"></div>\n<!-- ${css} -->`;
  } else if (type === "anim") {
    const keyframe = card.dataset.keyframe || "";
    const usage = card.dataset.usage || "";
    code = `<style>${keyframe}</style>\n<div style="${usage}">Animation</div>`;
  } else if (type === "font") {
    code = `font-family: ${card.dataset.font};`;
  } else {
    code = card.innerHTML;
  }

  try {
    await navigator.clipboard.writeText(code);
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = code;
    fallback.setAttribute("readonly", "");
    fallback.style.position = "absolute";
    fallback.style.left = "-9999px";
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
  }

  const original = btn.innerHTML;
  btn.innerHTML = "Copied";
  btn.classList.add("ok");
  window.setTimeout(() => {
    btn.innerHTML = original;
    btn.classList.remove("ok");
  }, 1600);
}

function setBackgroundAudioState(state) {
  const { toggle } = backgroundAudioState;
  if (!toggle) return;

  const label = toggle.querySelector(".sound-label");
  const isPlaying = state === "playing";
  const isBlocked = state === "blocked";
  const text = isPlaying ? "Sound on" : isBlocked ? "Tap for sound" : "Sound off";

  toggle.dataset.state = state;
  toggle.setAttribute("aria-pressed", String(isPlaying));
  toggle.setAttribute("aria-label", isPlaying ? "Turn background music off" : "Turn background music on");
  toggle.title = text;

  if (label) {
    label.textContent = text;
  }
}

async function playBackgroundAudio() {
  const { audio } = backgroundAudioState;
  if (!audio) return false;

  try {
    if (!audio.dataset.loaded) {
      audio.src = audio.dataset.src;
      audio.load();
      audio.dataset.loaded = "true";
    }
    audio.muted = false;
    await audio.play();
    setBackgroundAudioState("playing");
    return true;
  } catch {
    setBackgroundAudioState("blocked");
    return false;
  }
}

function attachBackgroundAudioUnlock() {
  if (backgroundAudioState.unlockAttached) return;

  backgroundAudioState.unlockAttached = true;
  const events = ["pointerdown", "keydown", "touchstart", "wheel"];
  const unlock = async () => {
    if (backgroundAudioState.hasUserPaused) return;

    const started = await playBackgroundAudio();
    if (started) {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, unlock);
      });
    }
  };

  events.forEach((eventName) => {
    window.addEventListener(eventName, unlock, { passive: true });
  });
}

function scheduleBackgroundAudioAutoplay() {
  const tryAutoplay = () => {
    if (!backgroundAudioState.hasUserPaused) {
      playBackgroundAudio();
    }
  };

  tryAutoplay();
  window.addEventListener("load", tryAutoplay, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      tryAutoplay();
    }
  });
}

function initCursor() {
  const cur = document.getElementById("cur");
  const trl = document.getElementById("trl");
  if (!cur || !trl) return;

  window.addEventListener("mousemove", (event) => {
    cur.style.transform = `translate3d(${event.clientX - 8}px, ${event.clientY - 8}px, 0)`;
    window.setTimeout(() => {
      trl.style.transform = `translate3d(${event.clientX - 2}px, ${event.clientY - 2}px, 0)`;
    }, 50);
  });

  document.addEventListener("mousedown", () => cur.classList.add("ck"));
  document.addEventListener("mouseup", () => cur.classList.remove("ck"));

  const attachHovers = () => {
    document.querySelectorAll("a, button, .has-copy, .cpb").forEach((element) => {
      if (element.dataset.hoverAttached) return;

      element.addEventListener("mouseenter", () => cur.classList.add("h"));
      element.addEventListener("mouseleave", () => cur.classList.remove("h"));
      element.dataset.hoverAttached = "true";
    });
  };

  attachHovers();
  const observer = new MutationObserver(attachHovers);
  observer.observe(document.body, { childList: true, subtree: true });
}

function initCopyButtons() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".cpb");
    if (!button) return;

    event.preventDefault();
    copySnippet(button);
  });
}

function initScrollEffects() {
  const revealItems = document.querySelectorAll(".rv, .sg > *");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("v");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -50px 0px" },
  );

  revealItems.forEach((element) => observer.observe(element));

  window.addEventListener("scroll", () => {
    const progress = document.getElementById("prg");
    if (progress) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progress.style.width = `${(winScroll / height) * 100}%`;
    }

    const nav = document.getElementById("nav");
    if (nav) {
      nav.classList.toggle("sc", window.scrollY > 50);
    }
  });
}

function getPaginationItems(grid) {
  return Array.from(grid.children).filter(
    (child) => child.nodeType === 1 && !child.classList.contains("pagination-controls"),
  );
}

function getGridColumnCount(grid) {
  const template = window.getComputedStyle(grid).gridTemplateColumns;
  if (!template || template === "none") return 0;
  return template.split(" ").filter(Boolean).length;
}

function getWrappedColumnCount(items) {
  if (!items.length) return 1;

  items.forEach((item) => {
    item.hidden = false;
  });

  const firstTop = Math.round(items[0].getBoundingClientRect().top);
  let columns = 0;

  for (const item of items) {
    const top = Math.round(item.getBoundingClientRect().top);
    if (Math.abs(top - firstTop) <= 4) {
      columns += 1;
      continue;
    }

    break;
  }

  return Math.max(columns, 1);
}

function getViewportTier() {
  if (window.innerWidth >= 1280) return "wide";
  if (window.innerWidth >= 1024) return "desktop";
  if (window.innerWidth >= 768) return "tablet";
  return "mobile";
}

function getResponsiveConfigValue(value, tier) {
  if (value == null || typeof value === "number") return value;
  return value[tier] ?? value.desktop ?? value.wide ?? Object.values(value)[0];
}

function getSectionConfig(grid) {
  return catalogSectionConfig[grid.dataset.catalogKey] || {};
}

function getGridGap(grid) {
  const config = getSectionConfig(grid);
  return Number(grid.dataset.gridGap || config.gap || 16);
}

function getGridMinWidth(grid) {
  const config = getSectionConfig(grid);
  return Number(grid.dataset.minCardWidth || config.minWidth || 220);
}

function applyGridStability(grid, items, minHeightOverride = null) {
  const config = getSectionConfig(grid);
  const tier = getViewportTier();
  const minWidth = getGridMinWidth(grid);
  const gap = getGridGap(grid);
  const reserveHeight =
    minHeightOverride == null
      ? Number(getResponsiveConfigValue(config.reserveHeight, tier) || 0)
      : Number(minHeightOverride || 0);

  grid.classList.add("catalog-grid");
  grid.dataset.tier = tier;
  grid.style.display = "grid";
  grid.style.gap = `${gap}px`;
  grid.style.alignItems = "stretch";
  grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(min(${minWidth}px, 100%), 1fr))`;
  grid.style.setProperty("--catalog-min-card-width", `${minWidth}px`);
  grid.style.setProperty("--catalog-grid-gap", `${gap}px`);

  if (reserveHeight > 0 && items.length > 1) {
    grid.style.minHeight = `${reserveHeight}px`;
  } else {
    grid.style.removeProperty("min-height");
  }
}

function getTargetRowCount(grid) {
  const config = getSectionConfig(grid);
  const tier = getViewportTier();
  return Number(getResponsiveConfigValue(config.rows, tier) || 2);
}

function measureColumns(grid, items) {
  const minWidth = getGridMinWidth(grid);
  const gap = getGridGap(grid);
  const gridWidth = Math.max(grid.clientWidth, grid.parentElement?.clientWidth || 0, 0);

  if (gridWidth > 0) {
    return Math.max(1, Math.min(items.length, Math.floor((gridWidth + gap) / (minWidth + gap))));
  }

  return Math.max(1, Math.min(items.length, getGridColumnCount(grid) || 1));
}

function measureGridProfile(instance) {
  const { grid, items } = instance;
  const tier = getViewportTier();
  const width = Math.round(Math.max(grid.clientWidth, grid.parentElement?.clientWidth || 0, 0));
  const signature = `${tier}:${width}`;

  if (instance.measurementSignature === signature && instance.cardProfile) {
    return instance.cardProfile;
  }

  const columns = measureColumns(grid, items);
  const rows = getTargetRowCount(grid);
  const gap = getGridGap(grid);
  const reserveHeight = Number(getResponsiveConfigValue(getSectionConfig(grid).reserveHeight, tier) || 0);

  instance.measurementSignature = signature;
  instance.cardProfile = {
    columns,
    rows,
    gap,
    reserveHeight,
  };

  return instance.cardProfile;
}

function measurePageSize(grid, items, profile) {
  if (!items.length) return 1;

  const columns = profile?.columns || measureColumns(grid, items);
  const rows = profile?.rows || getTargetRowCount(grid);
  const minimum = Number(grid.dataset.minPageSize || 1);
  const pageSize = columns * rows;

  return Math.min(items.length, Math.max(minimum, pageSize));
}

function createPaginationControls(grid) {
  let controls = grid.parentElement.querySelector(".pagination-controls");
  if (controls) {
    return controls;
  }

  controls = document.createElement("div");
  controls.className = "pagination-controls";
  controls.innerHTML = `
    <button type="button" class="btn-outline prev-btn">Previous set</button>
    <span class="pagination-status" aria-live="polite"></span>
    <button type="button" class="btn-outline next-btn">Next set</button>
  `;
  grid.parentElement.appendChild(controls);
  return controls;
}

function setPaginationItemVisibility(item, visible) {
  item.hidden = !visible;
  item.classList.toggle("hidden", !visible);
  item.style.opacity = visible ? "1" : "0";
  item.style.transform = visible ? "translateY(0)" : "translateY(8px)";
  item.style.pointerEvents = visible ? "" : "none";
  item.setAttribute("aria-hidden", String(!visible));
  item.inert = !visible;
}

function updatePaginationInstance(instance) {
  const { grid, items, controls, prevButton, nextButton, status } = instance;

  const previousPage = instance.currentPage || 1;
  const profile = measureGridProfile(instance);
  applyGridStability(grid, items, profile.reserveHeight);
  instance.columns = profile.columns;
  instance.pageSize = measurePageSize(grid, items, profile);
  instance.maxPage = Math.max(1, Math.ceil(items.length / instance.pageSize));
  instance.currentPage = Math.min(previousPage, instance.maxPage);

  if (items.length <= instance.pageSize) {
    grid.style.removeProperty("min-height");
    items.forEach((item) => {
      setPaginationItemVisibility(item, true);
      item.style.transform = "";
    });
    controls.hidden = true;
    prevButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  controls.hidden = false;

  items.forEach((item, index) => {
    const visible =
      index >= (instance.currentPage - 1) * instance.pageSize &&
      index < instance.currentPage * instance.pageSize;

    setPaginationItemVisibility(item, visible);
  });

  const firstVisible = (instance.currentPage - 1) * instance.pageSize + 1;
  const lastVisible = Math.min(instance.currentPage * instance.pageSize, items.length);
  status.textContent = `Items ${firstVisible}-${lastVisible} of ${items.length} - Page ${instance.currentPage} / ${instance.maxPage}`;
  prevButton.disabled = instance.currentPage === 1;
  nextButton.disabled = instance.currentPage === instance.maxPage;
}

function encodeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function copyButtonMarkup() {
  return `<button class="cpb" type="button" aria-label="Copy snippet"><svg aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copy</button>`;
}

function createCardSource(item) {
  return item.source ? `<div class="kit-source">${item.source}</div>` : "";
}

function getActiveCatalogSections() {
  return catalogSections.filter((section) => section.active !== false);
}

function normalizeCatalogItems(items, defaults = {}) {
  return items
    .map((item, index) => {
      const resolved = { ...defaults, ...item };
      return {
        ...resolved,
        family: resolved.family || "general",
        qaStatus: resolved.qaStatus || "keep",
        priority: resolved.priority ?? 50,
        catalogSource: resolved.catalogSource || (resolved.source ? resolved.source.toLowerCase().replace(/\s+/g, "-") : "native"),
        _catalogOrder: index,
      };
    })
    .filter((item) => item.qaStatus !== "remove")
    .sort((a, b) => (a.priority ?? 50) - (b.priority ?? 50) || a._catalogOrder - b._catalogOrder);
}

function buildCardMetaAttributes(item) {
  return [
    ["data-title", item.title],
    ["data-family", item.family],
    ["data-catalog-source", item.catalogSource],
    ["data-source-pillar", item.sourcePillar],
    ["data-preview-mode", item.previewMode || "default"],
    ["data-qa-status", item.qaStatus || "keep"],
    ["data-priority", String(item.priority ?? 50)],
  ]
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([name, value]) => `${name}="${encodeAttribute(value)}"`)
    .join(" ");
}

function syncCatalogStructure() {
  const activeSections = getActiveCatalogSections();
  const nav = document.querySelector(".nav-r");

  activeSections.forEach((section, index) => {
    const sectionNode = document.getElementById(section.id);
    if (!sectionNode) return;

    const number = String(index + 1).padStart(2, "0");
    const kicker = sectionNode.querySelector(".sl");
    const title = sectionNode.querySelector(".st");
    let description = sectionNode.querySelector(".sdesc");
    const pageSelector = section.page?.selector;
    const grid = pageSelector ? document.querySelector(pageSelector) : null;

    sectionNode.dataset.catalogId = section.id;
    sectionNode.dataset.catalogFamily = section.family || "general";
    sectionNode.dataset.catalogPriority = section.priority || "support";
    sectionNode.dataset.catalogSource = section.catalogSource || "native";
    if (section.sourcePillar) sectionNode.dataset.sourcePillar = section.sourcePillar;
    if (section.qaStatus) sectionNode.dataset.qaStatus = section.qaStatus;
    sectionNode.dataset.catalogActive = "true";

    if (kicker) {
      kicker.textContent = `${number} - ${section.eyebrow}`;
    }

    if (title && section.titleHtml) {
      title.innerHTML = section.titleHtml;
    }

    if (section.description) {
      if (!description) {
        description = document.createElement("div");
        description.className = "sdesc rv d2";
        title?.insertAdjacentElement("afterend", description);
      }
      description.textContent = section.description;
    } else if (description) {
      description.remove();
    }

    if (grid) {
      grid.classList.add("catalog-grid");
      grid.dataset.catalogSectionId = section.id;
    }
  });

  if (nav) {
    nav.innerHTML = buildSectionMenu(activeSections);
  }
}

function getSectionMenuGroup(section) {
  if (section.sourcePillar === "navbar") return "Navbar";
  if (section.sourcePillar === "h1") return "Headlines";
  if (section.sourcePillar === "cta") return "CTAs";
  if (section.sourcePillar === "404") return "404 / Error";
  if (section.sourcePillar === "footer") return "Footers";
  if (section.sourcePillar === "bento") return "Bentos";
  if (section.family === "foundation") return "Foundations";
  if (section.family === "motion") return "Motion";
  if (section.family === "controls") return "Controls";
  if (section.family === "feedback") return "Feedback";
  if (["surface", "utility", "components", "layouts"].includes(section.family)) return "Components & Layout";
  if (section.family === "product-ui") return "Product UI";
  if (section.family === "inspiration") return "Gallery Core";
  if (section.family === "systems") return "Systems";
  if (["marketplace", "showcase"].includes(section.family)) return "Frameworks";
  if (section.family === "sera") return "Sera UI";
  return "Other";
}

function buildSectionMenu(activeSections) {
  const groupOrder = [
    "Foundations",
    "Motion",
    "Controls",
    "Feedback",
    "Components & Layout",
    "Product UI",
    "Gallery Core",
    "Navbar",
    "Headlines",
    "CTAs",
    "404 / Error",
    "Footers",
    "Bentos",
    "Systems",
    "Frameworks",
    "Sera UI",
    "Other",
  ];
  const grouped = new Map(groupOrder.map((group) => [group, []]));

  activeSections.forEach((section, index) => {
    const group = getSectionMenuGroup(section);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push({ ...section, number: String(index + 1).padStart(2, "0") });
  });

  const groups = Array.from(grouped.entries())
    .filter(([, sections]) => sections.length)
    .map(([group, sections]) => {
      const links = sections
        .map((section) => `<a href="#${section.id}" data-number="${section.number}">${encodeAttribute(section.eyebrow || section.navLabel || section.id)}</a>`)
        .join("");

      return `<div class="section-menu-group"><div class="section-menu-title">${encodeAttribute(group)}</div><div class="section-menu-links">${links}</div></div>`;
    })
    .join("");

  return `
    ${githubRepoLinkMarkup()}
    <details class="section-menu">
      <summary><span class="section-menu-trigger">Sections</span></summary>
      <div class="section-menu-panel">
        <div class="section-menu-grid">${groups}</div>
      </div>
    </details>
  `;
}

function githubRepoLinkMarkup() {
  return `
    <a class="repo-link" href="https://github.com/ikerperez12/UI-IP-Toolkit-v4.0" target="_blank" rel="noopener noreferrer" aria-label="Open UI IP Toolkit repository on GitHub">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.14c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
      </svg>
      <span>GitHub</span>
    </a>
  `;
}

function initSectionMenu() {
  document.addEventListener("click", (event) => {
    const menu = document.querySelector(".section-menu");
    if (!menu?.open) return;

    if (event.target.closest(".section-menu-links a")) {
      menu.open = false;
      return;
    }

    if (!event.target.closest(".section-menu")) {
      menu.open = false;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const menu = document.querySelector(".section-menu");
    if (menu) menu.open = false;
  });
}

function syncCatalogFooter() {
  const footerCopy = document.querySelector("footer.final-cta p");
  if (!footerCopy) return;

  const sectionCount = getActiveCatalogSections().length;
  const itemCount = document.querySelectorAll("section .cpb").length;
  footerCopy.textContent = `UI IP Toolkit v4 - ${sectionCount} sections - ${itemCount} copyable elements - Background soundtrack - Zero dependencies`;
}

function createToolkitCard(item, className = "ut-c") {
  const previewClass = ["mini-preview", item.previewMode || "", item.previewClass || ""].filter(Boolean).join(" ");
  const cardMeta = buildCardMetaAttributes(item);

  return `
    <div class="${className} has-copy page-item" data-snippet="btn" data-html="${encodeAttribute(item.html)}" ${cardMeta}>
      <div class="${previewClass}">${item.preview}</div>
      <div class="kit-copy-meta">
        ${createCardSource(item)}
        <div class="ut-n">${item.title}</div>
        <div class="kit-meta">${item.description}</div>
      </div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function addToolkitCards(selector, items, className = "ut-c", defaults = {}) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  const normalizedItems = normalizeCatalogItems(items, defaults);
  grid.insertAdjacentHTML("beforeend", normalizedItems.map((item) => createToolkitCard(item, className)).join(""));
  grid.classList.add("paginated");
  grid.dataset.minPageSize = grid.dataset.minPageSize || "8";
}

function createComponentCard(item) {
  const previewClass = ["cp-p", item.previewMode || "", item.previewClass || ""].filter(Boolean).join(" ");
  const cardMeta = buildCardMetaAttributes(item);

  return `
    <div class="cp-c has-copy page-item" data-snippet="btn" data-html="${encodeAttribute(item.html)}" ${cardMeta}>
      <div class="${previewClass}">${item.preview}</div>
      <div class="cp-i">
        ${createCardSource(item)}
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function addComponentCards(selector, items, defaults = {}) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  const normalizedItems = normalizeCatalogItems(items, defaults);
  grid.insertAdjacentHTML("beforeend", normalizedItems.map((item) => createComponentCard(item)).join(""));
  grid.classList.add("paginated");
  grid.dataset.minPageSize = grid.dataset.minPageSize || "8";
}

function repairDemoAccessibility() {
  document.querySelectorAll(".cpb").forEach((button) => {
    button.type = "button";
    if (!button.getAttribute("aria-label")) {
      button.setAttribute("aria-label", "Copy snippet");
    }
    button.querySelectorAll("svg").forEach((icon) => icon.setAttribute("aria-hidden", "true"));
  });

  document.querySelectorAll("input:not([aria-label]):not([aria-labelledby])").forEach((input, index) => {
    const cardTitle =
      input.closest(".has-copy")?.querySelector(".ut-n, .cp-i h3, .cp-i h4, h3, h4")?.textContent?.trim() ||
      input.getAttribute("placeholder")?.trim() ||
      input.getAttribute("type") ||
      `field ${index + 1}`;

    input.setAttribute("aria-label", `${cardTitle} demo input`);
  });

  document.querySelectorAll(".has-copy h4, .ly-c h4, .hf-i h4, .gl-p h4, .cha-t-content h4, .ck-body h4").forEach((heading) => {
    const replacement = document.createElement("h3");
    Array.from(heading.attributes).forEach((attribute) => {
      replacement.setAttribute(attribute.name, attribute.value);
    });
    replacement.innerHTML = heading.innerHTML;
    heading.replaceWith(replacement);
  });
}

function removeCardsByTitle(selector, matcher) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  Array.from(grid.children).forEach((card) => {
    const title =
      card.querySelector(".ut-n, .ln, .tx-label, .sn, .hf-i h3, .hf-i h4, .cp-i h3, .cp-i h4, h3, h4, .gl-p h3, .gl-p h4, .gl-p, .an, .gl, .cn")?.textContent?.trim() || "";

    if (title && matcher(title)) {
      card.remove();
    }
  });
}

function promoteCards(selector, matcher) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  const cards = Array.from(grid.children).filter((card) => matcher(card));
  cards.reverse().forEach((card) => {
    grid.insertAdjacentElement("afterbegin", card);
  });
}

function normalizeButtonShelves() {
  document.querySelectorAll("#buttons .bw").forEach((shelf) => {
    if (shelf.dataset.shelfReady) return;

    const copyButton = shelf.querySelector(".cpb");
    const previewButton = Array.from(shelf.querySelectorAll("button")).find((button) => button !== copyButton);
    if (!previewButton) return;

    shelf.dataset.shelfReady = "true";
    shelf.classList.add("page-item", "btn-shelf");

    if (!shelf.querySelector(".btn-shelf-stage")) {
      const stage = document.createElement("div");
      stage.className = "btn-shelf-stage";
      previewButton.replaceWith(stage);
      stage.appendChild(previewButton);
    }

    if (!shelf.querySelector(".btn-shelf-meta")) {
      const meta = document.createElement("div");
      meta.className = "btn-shelf-meta";

      const title = document.createElement("div");
      title.className = "btn-shelf-title";
      title.textContent = previewButton.textContent.replace(/\s+/g, " ").trim();

      const note = document.createElement("div");
      note.className = "btn-shelf-note";
      note.textContent = "Classic example";

      meta.append(title, note);
      shelf.appendChild(meta);
    }
  });
}

function setGridPageConfig(selector, config) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  grid.classList.add("paginated");
  grid.dataset.catalogKey = selector;
  grid.dataset.minPageSize = String(config.minPageSize || 1);
  grid.dataset.minCardWidth = String(config.minWidth || 220);
  grid.dataset.gridGap = String(config.gap || 16);
  delete grid.dataset.pageSize;
}

function createColorCard(item) {
  return `
    <div class="cc has-copy page-item" data-snippet="color" data-color="${item.hex}" data-name="${item.name}">
      <div class="csw" style="background:${item.hex}"></div>
      <div class="ci"><div class="cn">${item.name}</div><div class="ch">${item.hex}</div></div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function createGradientCard(item) {
  return `
    <div class="gc has-copy page-item" style="background:${item.css}" data-snippet="gradient" data-css="${encodeAttribute(item.css)}">
      <span class="gl">${item.name}</span>
      ${copyButtonMarkup()}
    </div>
  `;
}

function createFontCard(item) {
  const weights = item.weights.map((weight) => `<span class="wt">${weight}</span>`).join("");
  const sample = item.sample.replaceAll("\n", "<br>");

  return `
    <div class="fc has-copy page-item" data-snippet="font" data-font="'${item.family}', ${item.fallback || "sans-serif"}">
      <div>
        <div class="fn-n">${item.label}</div>
        <div class="fn-s" style="font-family:'${item.family}',${item.fallback || "sans-serif"}">${sample}</div>
      </div>
      <div class="fn-w">${weights}</div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function createAnimationCard(item) {
  return `
    <div class="ac has-copy page-item" data-snippet="btn" data-html="${encodeAttribute(item.html)}">
      <div class="db" style="${item.previewStyle}">${item.previewInner || ""}</div>
      <div class="an">${item.name}</div>
      <div class="ad">${item.description}</div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function createStyleCard(item) {
  const vars = Object.entries(item.colors)
    .map(([name, value]) => `--${name}:${value};`)
    .join("");
  const swatches = Object.values(item.colors)
    .map((color) => `<div class="sty-s" style="background:${color}"></div>`)
    .join("");
  const tags = item.tags.map((tag) => `<span>${tag}</span>`).join("");

  return `
    <div class="sty-c has-copy page-item" data-snippet="btn" data-html="${encodeAttribute(`<style>:root{${vars}}</style>`)}">
      <div class="sty-h"><div class="sty-n">${item.name}</div><span class="sty-t">${item.group}</span></div>
      <div class="sty-p">${swatches}</div>
      <div class="sty-d">${item.description}</div>
      <div class="sty-k">${tags}</div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function createPaletteCard(item) {
  const vars = Object.entries(item.colors)
    .map(([name, value]) => `--${name}:${value};`)
    .join("");
  const swatches = Object.values(item.colors)
    .map((color) => `<div style="background:${color}" title="${color}"></div>`)
    .join("");
  const labels = item.labels.map((label) => `<span>${label}</span>`).join("");

  return `
    <div class="ip-c has-copy page-item" data-snippet="btn" data-html="${encodeAttribute(`<style>:root{${vars}}</style>`)}">
      <div class="ip-n">${item.name}</div>
      <div class="ip-s">${swatches}</div>
      <div class="ip-l">${labels}</div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function addStyleAndPaletteCards() {
  const styleGrid = document.querySelector("#styles .sty-g");
  if (styleGrid) {
    const styles = [
      { name: "Linear Editorial", group: "SAAS", description: "Strict monochrome surfaces with one kinetic violet action.", tags: ["Docs", "SaaS", "Launch"], colors: { primary: "#0A0A0B", secondary: "#F4F1EA", accent: "#8B5CF6", bg: "#111113" } },
      { name: "Clay Console", group: "PRODUCT", description: "Warm off-white panels, thick controls, and friendly command UI.", tags: ["Forms", "AI", "Tools"], colors: { primary: "#2F2A24", secondary: "#F3E7D3", accent: "#E07A5F", bg: "#FFF8ED" } },
      { name: "Signal Noir", group: "DATA", description: "Dark telemetry language with green signals and amber warnings.", tags: ["Metrics", "Dashboards", "Ops"], colors: { primary: "#050608", secondary: "#111827", accent: "#22C55E", warning: "#F59E0B" } },
      { name: "Liquid Chrome", group: "FUTURE", description: "Iridescent product cards for AI, music, and premium tooling.", tags: ["Hero", "Cards", "Brand"], colors: { primary: "#E5E7EB", secondary: "#0F172A", accent: "#67E8F9", glow: "#F0ABFC" } },
      { name: "Arcade OS", group: "RETRO", description: "Bold block contrast, candy accents, and pressed-state controls.", tags: ["Games", "Badges", "Buttons"], colors: { primary: "#111827", secondary: "#FEF3C7", accent: "#F97316", cyan: "#22D3EE" } },
      { name: "Calm Finance", group: "FINTECH", description: "Trust-first surfaces with clean green deltas and readable numbers.", tags: ["Finance", "Tables", "Cards"], colors: { primary: "#0F172A", secondary: "#E2E8F0", accent: "#10B981", info: "#38BDF8" } },
    ];
    styleGrid.insertAdjacentHTML("beforeend", styles.map(createStyleCard).join(""));
    styleGrid.classList.add("paginated");
    styleGrid.dataset.minPageSize = "8";
  }

  const paletteGrid = document.querySelector("#palettes .ip-g");
  if (paletteGrid) {
    const palettes = [
      { name: "AI Studio", labels: ["Violet brain", "Mint success", "Ink UI"], colors: { primary: "#7C3AED", secondary: "#14B8A6", cta: "#F472B6", bg: "#09090B", text: "#F8FAFC" } },
      { name: "Creator Economy", labels: ["Warm social", "Lemon CTA", "Graphite"], colors: { primary: "#FB7185", secondary: "#F97316", cta: "#FACC15", bg: "#18181B", text: "#FFF7ED" } },
      { name: "Cloud Infra", labels: ["Blue control", "Slate shell", "Cyan edge"], colors: { primary: "#2563EB", secondary: "#0F172A", cta: "#06B6D4", bg: "#020617", text: "#E0F2FE" } },
      { name: "Health Tech", labels: ["Calm teal", "Safe blue", "Soft paper"], colors: { primary: "#0D9488", secondary: "#0284C7", cta: "#84CC16", bg: "#F8FAFC", text: "#134E4A" } },
      { name: "Music Product", labels: ["Bass black", "Hot magenta", "Stage amber"], colors: { primary: "#050505", secondary: "#DB2777", cta: "#F59E0B", bg: "#111827", text: "#FDF2F8" } },
      { name: "Legal SaaS", labels: ["Ink", "Ivory", "Gold proof"], colors: { primary: "#111827", secondary: "#FAF7ED", cta: "#B45309", bg: "#F5F5F4", text: "#1F2937" } },
    ];
    paletteGrid.insertAdjacentHTML("beforeend", palettes.map(createPaletteCard).join(""));
    paletteGrid.classList.add("paginated");
    paletteGrid.dataset.minPageSize = "8";
  }
}

function enhanceCatalog() {
  addStyleAndPaletteCards();

  addToolkitCards("#buttons .btn-g", [
    { title: "Spotlight CTA", description: "Cursor-friendly hero action with a glow ring.", preview: `<button style="padding:13px 24px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.28),transparent 35%),linear-gradient(135deg,#c2a4ff,#fb8dff);color:#060507;font-weight:800">Start build</button>`, html: `<button style="padding:13px 24px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.28),transparent 35%),linear-gradient(135deg,#c2a4ff,#fb8dff);color:#060507;font-weight:800">Start build</button>` },
    { title: "Command Button", description: "Keyboard-first action with shortcut affordance.", preview: `<button style="display:flex;gap:14px;align-items:center;padding:12px 16px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:#0f0f13;color:#fff">Search <kbd style="padding:3px 7px;border-radius:6px;background:#24242b;color:#c2a4ff">Ctrl K</kbd></button>`, html: `<button style="display:flex;gap:14px;align-items:center;padding:12px 16px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:#0f0f13;color:#fff">Search <kbd style="padding:3px 7px;border-radius:6px;background:#24242b;color:#c2a4ff">Ctrl K</kbd></button>` },
    { title: "Magnetic Pill", description: "Soft glass pill for pricing and hero sections.", preview: `<button style="padding:12px 22px;border-radius:999px;border:1px solid rgba(194,164,255,.35);background:rgba(194,164,255,.08);color:#eae5ec;box-shadow:inset 0 1px rgba(255,255,255,.12),0 12px 40px rgba(194,164,255,.12)">Join waitlist</button>`, html: `<button style="padding:12px 22px;border-radius:999px;border:1px solid rgba(194,164,255,.35);background:rgba(194,164,255,.08);color:#eae5ec;box-shadow:inset 0 1px rgba(255,255,255,.12),0 12px 40px rgba(194,164,255,.12)">Join waitlist</button>` },
    { title: "Split Action", description: "Primary action plus compact dropdown segment.", preview: `<div style="display:inline-flex;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.12)"><button style="padding:12px 18px;background:#fff;color:#09090b;border:0;font-weight:800">Deploy</button><button style="padding:12px 13px;background:#e5e7eb;color:#09090b;border:0">...</button></div>`, html: `<div style="display:inline-flex;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.12)"><button style="padding:12px 18px;background:#fff;color:#09090b;border:0;font-weight:800">Deploy</button><button style="padding:12px 13px;background:#e5e7eb;color:#09090b;border:0">...</button></div>` },
    { title: "Danger Confirm", description: "Destructive action with calm red treatment.", preview: `<button style="padding:12px 20px;border-radius:12px;border:1px solid rgba(244,63,94,.38);background:rgba(244,63,94,.12);color:#fecdd3;font-weight:700">Delete project</button>`, html: `<button style="padding:12px 20px;border-radius:12px;border:1px solid rgba(244,63,94,.38);background:rgba(244,63,94,.12);color:#fecdd3;font-weight:700">Delete project</button>` },
    { title: "Stripe Sheen", description: "Animated CSS sheen for checkout or upgrade CTAs.", preview: `<button style="position:relative;overflow:hidden;padding:13px 26px;border-radius:12px;border:0;background:#635bff;color:white;font-weight:800">Upgrade Pro</button>`, html: `<style>@keyframes sheen{to{transform:translateX(220%) rotate(12deg)}}</style><button style="position:relative;overflow:hidden;padding:13px 26px;border-radius:12px;border:0;background:#635bff;color:white;font-weight:800">Upgrade Pro<span style="position:absolute;inset:-20px auto -20px -60px;width:32px;background:rgba(255,255,255,.35);transform:rotate(12deg);animation:sheen 2.8s infinite"></span></button>` },
  ]);

  addToolkitCards("#inputs .inp-g", [
    { title: "Command Palette", description: "Search field with grouped actions and shortcut chips.", previewMode: "stack", preview: `<div style="display:flex;justify-content:space-between;gap:10px;padding:10px;border-radius:12px;background:#0f1117;border:1px solid rgba(255,255,255,.08)"><span style="color:#9ca3af">Search actions...</span><kbd style="color:#c2a4ff">CMD K</kbd></div><div class="kit-row"><span class="kit-pill">Open</span><span class="kit-pill">Create</span><span class="kit-pill">Invite</span></div>`, html: `<div style="padding:12px;border-radius:16px;background:#0f1117;border:1px solid rgba(255,255,255,.08);color:#fff"><div style="display:flex;justify-content:space-between"><span>Search actions...</span><kbd>CMD K</kbd></div><hr style="border-color:rgba(255,255,255,.08)"><button style="display:block;width:100%;text-align:left;background:transparent;border:0;color:#fff;padding:8px">Open command center</button></div>` },
    { title: "Card Checkout", description: "Compact payment form with grouped card metadata.", previewMode: "stack", preview: `<div style="height:34px;border-radius:10px;background:#111827;border:1px solid rgba(255,255,255,.12)"></div><div class="kit-row"><div style="height:28px;flex:1;border-radius:8px;background:#111827"></div><div style="height:28px;width:62px;border-radius:8px;background:#111827"></div></div>`, html: `<form style="display:grid;gap:10px;padding:16px;border-radius:18px;background:#0b0b10;color:#fff"><input placeholder="Card number" style="padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#111827;color:#fff"><div style="display:grid;grid-template-columns:1fr 88px;gap:10px"><input placeholder="MM / YY" style="padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#111827;color:#fff"><input placeholder="CVC" style="padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#111827;color:#fff"></div></form>` },
    { title: "Invite Row", description: "Team invite input with role selector and action.", preview: `<div style="display:flex;gap:8px;width:100%"><div style="flex:1;height:38px;border-radius:999px;background:#111827;border:1px solid rgba(255,255,255,.08)"></div><button style="border:0;border-radius:999px;background:#c2a4ff;color:#060507;padding:0 14px;font-weight:800">Invite</button></div>`, html: `<div style="display:flex;gap:8px"><input placeholder="teammate@company.com" style="flex:1;padding:12px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:#111827;color:#fff"><select style="border-radius:999px;background:#111827;color:#fff;border:1px solid rgba(255,255,255,.1)"><option>Editor</option><option>Viewer</option></select><button style="border:0;border-radius:999px;background:#c2a4ff;color:#060507;padding:0 16px;font-weight:800">Invite</button></div>` },
    { title: "Search Filter Bar", description: "Dense filter surface for dashboards and tables.", preview: `<div style="display:grid;grid-template-columns:1fr 70px;gap:8px;width:100%"><div style="height:36px;border-radius:10px;background:#111827"></div><div style="height:36px;border-radius:10px;background:rgba(194,164,255,.18)"></div></div>`, html: `<div style="display:grid;grid-template-columns:1fr auto;gap:8px"><input placeholder="Filter deployments..." style="padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.1);background:#111827;color:#fff"><button style="padding:0 16px;border-radius:10px;border:1px solid rgba(194,164,255,.2);background:rgba(194,164,255,.12);color:#c2a4ff">Filters</button></div>` },
    { title: "Segmented Control", description: "Three-state switch for billing or views.", preview: `<div style="display:flex;padding:4px;border-radius:999px;background:#101018;border:1px solid rgba(255,255,255,.08)"><span style="padding:7px 12px;border-radius:999px;background:#fff;color:#000">Day</span><span style="padding:7px 12px">Week</span><span style="padding:7px 12px">Month</span></div>`, html: `<div role="tablist" style="display:inline-flex;padding:4px;border-radius:999px;background:#101018;border:1px solid rgba(255,255,255,.08);color:#fff"><button style="padding:8px 14px;border:0;border-radius:999px;background:#fff;color:#000">Day</button><button style="padding:8px 14px;border:0;background:transparent;color:#aaa">Week</button><button style="padding:8px 14px;border:0;background:transparent;color:#aaa">Month</button></div>` },
    { title: "Inline Validation", description: "Input with status copy and success accent.", previewMode: "stack", preview: `<div style="height:38px;border-radius:10px;border:1px solid rgba(74,222,128,.45);background:rgba(74,222,128,.08)"></div><span style="font-size:11px;color:#4ade80">Available username</span>`, html: `<label style="display:grid;gap:6px;color:#fff">Username<input value="ui-toolkit" style="padding:12px;border-radius:10px;border:1px solid rgba(74,222,128,.45);background:rgba(74,222,128,.08);color:#fff"><span style="font-size:12px;color:#4ade80">Available username</span></label>` },
  ]);

  addToolkitCards("#components .cp-g", [
    { title: "Command Menu", description: "Copy-paste shell for app launchers.", previewMode: "stack", preview: `<div style="height:28px;border-radius:8px;background:#111827"></div><div style="display:grid;gap:6px"><span class="kit-pill">Create project</span><span class="kit-pill">Open settings</span></div>`, html: `<div style="max-width:360px;border-radius:18px;background:#09090b;border:1px solid rgba(255,255,255,.1);padding:12px;color:#fff"><input placeholder="Type a command..." style="width:100%;box-sizing:border-box;padding:12px;border-radius:12px;background:#111827;border:0;color:#fff"><button style="width:100%;text-align:left;margin-top:8px;padding:10px;background:transparent;border:0;color:#fff">Create project</button></div>` },
    { title: "Activity Timeline", description: "Status history for deployments or audits.", previewMode: "stack", preview: `<div class="kit-row"><span style="width:8px;height:8px;border-radius:50%;background:#4ade80"></span><span style="height:10px;flex:1;background:#1f2937;border-radius:4px"></span></div><div class="kit-row"><span style="width:8px;height:8px;border-radius:50%;background:#c2a4ff"></span><span style="height:10px;flex:1;background:#1f2937;border-radius:4px"></span></div>`, html: `<ol style="display:grid;gap:12px;margin:0;padding:0;list-style:none;color:#fff"><li><span style="color:#4ade80">*</span> Build passed</li><li><span style="color:#c2a4ff">*</span> Preview deployed</li><li><span style="color:#f59e0b">*</span> Domain pending</li></ol>` },
    { title: "Pricing Mini", description: "Compact plan card for landing pages.", previewMode: "stack", preview: `<strong style="font-size:18px;color:#fff">$19/mo</strong><button style="border:0;border-radius:10px;background:#c2a4ff;padding:9px;color:#060507;font-weight:800">Choose</button>`, html: `<div style="padding:20px;border-radius:20px;background:#0f1117;border:1px solid rgba(255,255,255,.1);color:#fff"><p style="margin:0;color:#c2a4ff">Pro</p><h3 style="margin:6px 0;font-size:32px">$19/mo</h3><button style="width:100%;border:0;border-radius:12px;background:#c2a4ff;padding:12px;color:#060507;font-weight:800">Choose plan</button></div>` },
    { title: "Empty State", description: "Friendly zero-state for dashboards.", previewMode: "stack", preview: `<div style="width:44px;height:44px;border-radius:14px;background:rgba(194,164,255,.16)"></div><strong>No projects yet</strong><span style="font-size:11px;color:#9ca3af">Create your first workspace.</span>`, html: `<div style="text-align:center;padding:28px;border-radius:20px;border:1px dashed rgba(255,255,255,.18);color:#fff"><div style="width:48px;height:48px;margin:auto;border-radius:14px;background:rgba(194,164,255,.16)"></div><h3>No projects yet</h3><p>Create your first workspace to start shipping.</p></div>` },
    { title: "Metric Delta", description: "Single KPI tile with trend line.", previewMode: "stack", preview: `<span style="color:#9ca3af">Revenue</span><strong style="font-size:24px;color:#fff">$71.8k</strong><span style="color:#4ade80">+12.4%</span>`, html: `<div style="padding:18px;border-radius:18px;background:#0f1117;color:#fff;border:1px solid rgba(255,255,255,.08)"><span style="color:#9ca3af">Revenue</span><h3 style="font-size:32px;margin:4px 0">$71.8k</h3><span style="color:#4ade80">+12.4% this month</span></div>` },
    { title: "Notification Stack", description: "Layered alerts for product feedback.", previewMode: "stack", preview: `<div style="height:28px;border-radius:10px;background:rgba(74,222,128,.14)"></div><div style="height:28px;border-radius:10px;background:rgba(194,164,255,.14)"></div>`, html: `<div style="display:grid;gap:8px"><div style="padding:12px;border-radius:12px;background:rgba(74,222,128,.14);color:#bbf7d0">Saved successfully</div><div style="padding:12px;border-radius:12px;background:rgba(194,164,255,.14);color:#ddd6fe">Preview deployed</div></div>` },
  ]);

  addToolkitCards("#layouts .ly-g", [
    { title: "SaaS Shell", description: "Sidebar, toolbar, and content grid in one snippet.", preview: `<div style="display:grid;grid-template-columns:36px 1fr;gap:8px;width:100%;height:88px"><div style="border-radius:10px;background:#111827"></div><div style="display:grid;grid-template-rows:18px 1fr;gap:8px"><div style="border-radius:8px;background:#1f2937"></div><div style="border-radius:12px;background:rgba(194,164,255,.08)"></div></div></div>`, html: `<div style="display:grid;grid-template-columns:240px 1fr;gap:16px;min-height:480px"><aside style="border-radius:20px;background:#111827"></aside><main style="display:grid;grid-template-rows:72px 1fr;gap:16px"><header style="border-radius:20px;background:#1f2937"></header><section style="border-radius:20px;background:rgba(194,164,255,.08)"></section></main></div>` },
    { title: "Feature Bento", description: "Asymmetric marketing block for product pages.", preview: `<div style="display:grid;grid-template-columns:1.4fr .8fr;grid-template-rows:1fr 1fr;gap:8px;width:100%;height:88px"><div style="grid-row:span 2;border-radius:12px;background:rgba(194,164,255,.16)"></div><div style="border-radius:12px;background:#111827"></div><div style="border-radius:12px;background:#1f2937"></div></div>`, html: `<div style="display:grid;grid-template-columns:1.4fr .8fr;grid-template-rows:1fr 1fr;gap:16px"><article style="grid-row:span 2;min-height:280px;border-radius:28px;background:rgba(194,164,255,.16)"></article><article style="border-radius:28px;background:#111827"></article><article style="border-radius:28px;background:#1f2937"></article></div>` },
    { title: "Docs Article", description: "Reader-friendly article rail with aside navigation.", preview: `<div style="display:grid;grid-template-columns:42px 1fr 32px;gap:8px;width:100%;height:88px"><div></div><div style="border-radius:12px;background:#111827"></div><div style="border-radius:10px;background:#1f2937"></div></div>`, html: `<div style="display:grid;grid-template-columns:1fr minmax(0,760px) 220px;gap:28px"><div></div><article style="min-height:520px;border-radius:22px;background:#111827"></article><aside style="border-radius:18px;background:#1f2937"></aside></div>` },
    { title: "Mobile Stack", description: "App screen composition with sticky bottom actions.", preview: `<div style="width:70px;height:104px;border-radius:18px;background:#111827;display:grid;grid-template-rows:20px 1fr 18px;gap:6px;padding:8px"><span style="border-radius:8px;background:#1f2937"></span><span style="border-radius:10px;background:rgba(194,164,255,.15)"></span><span style="border-radius:8px;background:#c2a4ff"></span></div>`, html: `<main style="max-width:390px;min-height:720px;border-radius:32px;background:#09090b;padding:18px;display:grid;grid-template-rows:56px 1fr 64px;gap:16px"><header style="border-radius:18px;background:#111827"></header><section style="border-radius:22px;background:rgba(194,164,255,.12)"></section><nav style="border-radius:22px;background:#c2a4ff"></nav></main>` },
  ]);

  addToolkitCards("#loading .load-g", [
    { title: "AI Thinking", description: "Three pulses for generated content states.", preview: `<div class="kit-row"><span style="width:10px;height:10px;border-radius:50%;background:#c2a4ff"></span><span style="width:10px;height:10px;border-radius:50%;background:#fb8dff"></span><span style="width:10px;height:10px;border-radius:50%;background:#4ade80"></span></div>`, html: `<style>@keyframes think{50%{transform:translateY(-6px);opacity:.5}}</style><div style="display:flex;gap:8px"><span style="width:10px;height:10px;border-radius:50%;background:#c2a4ff;animation:think .9s infinite"></span><span style="width:10px;height:10px;border-radius:50%;background:#fb8dff;animation:think .9s .15s infinite"></span><span style="width:10px;height:10px;border-radius:50%;background:#4ade80;animation:think .9s .3s infinite"></span></div>` },
    { title: "Upload Ring", description: "Circular progress treatment for file flows.", preview: `<div style="width:58px;height:58px;border-radius:50%;background:conic-gradient(#c2a4ff 72%,rgba(255,255,255,.08) 0);display:grid;place-items:center"><span style="width:42px;height:42px;border-radius:50%;background:#09090b"></span></div>`, html: `<div style="width:64px;height:64px;border-radius:50%;background:conic-gradient(#c2a4ff 72%,rgba(255,255,255,.08) 0);display:grid;place-items:center"><span style="width:46px;height:46px;border-radius:50%;background:#09090b"></span></div>` },
    { title: "Skeleton Article", description: "Article placeholder with staggered lines.", previewMode: "stack", preview: `<div style="height:18px;width:75%;border-radius:999px;background:#1f2937"></div><div style="height:12px;border-radius:999px;background:#111827"></div><div style="height:12px;width:60%;border-radius:999px;background:#111827"></div>`, html: `<div style="display:grid;gap:10px"><div style="height:20px;width:75%;border-radius:999px;background:#1f2937"></div><div style="height:12px;border-radius:999px;background:#111827"></div><div style="height:12px;width:60%;border-radius:999px;background:#111827"></div></div>` },
    { title: "Terminal Loader", description: "CLI-style loading strip for developer tools.", preview: `<div style="font-family:monospace;color:#4ade80;background:#020617;border-radius:10px;padding:12px;width:100%">build: pending_</div>`, html: `<div style="font-family:monospace;color:#4ade80;background:#020617;border-radius:10px;padding:12px">build: pending<span style="animation:blink 1s infinite">_</span></div>` },
  ]);

  addToolkitCards("#textfx .tx-g", [
    { title: "Gradient Headline", description: "Large text fill for hero statements.", preview: `<strong style="font-size:32px;letter-spacing:-.08em;background:linear-gradient(90deg,#fff,#c2a4ff,#fb8dff);-webkit-background-clip:text;color:transparent">Launch fast</strong>`, html: `<h1 style="font-size:72px;letter-spacing:-.08em;background:linear-gradient(90deg,#fff,#c2a4ff,#fb8dff);-webkit-background-clip:text;color:transparent">Launch fast</h1>` },
    { title: "Outlined Label", description: "Editorial stroke treatment for category headers.", preview: `<strong style="font-size:34px;color:transparent;-webkit-text-stroke:1px #c2a4ff">SYSTEM</strong>`, html: `<span style="font-size:48px;font-weight:900;color:transparent;-webkit-text-stroke:1px #c2a4ff">SYSTEM</span>` },
    { title: "Ticker Text", description: "Scrolling marquee strip for launch notes.", preview: `<div style="white-space:nowrap;color:#c2a4ff">NEW COMPONENTS - READY -</div>`, html: `<marquee style="color:#c2a4ff;letter-spacing:.18em">NEW COMPONENTS - READY TO COPY -</marquee>` },
    { title: "Soft Highlight", description: "Inline marker for documentation and docs pages.", preview: `<p>Use <mark style="background:rgba(194,164,255,.22);color:#fff;border-radius:6px;padding:2px 6px">copy-safe</mark> assets.</p>`, html: `<p>Use <mark style="background:rgba(194,164,255,.22);color:#fff;border-radius:6px;padding:2px 6px">copy-safe</mark> assets.</p>` },
  ]);

  addToolkitCards("#glass .gl-g", [
    { title: "Glass Dock", description: "Floating navigation dock with blurred surface.", preview: `<div style="display:flex;gap:8px;padding:8px;border-radius:999px;background:rgba(255,255,255,.08);backdrop-filter:blur(16px)"><span class="kit-pill">Home</span><span class="kit-pill">Docs</span><span class="kit-pill">Build</span></div>`, html: `<nav style="display:flex;gap:8px;padding:8px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(16px)"><a style="padding:8px 12px;color:#fff">Home</a><a style="padding:8px 12px;color:#fff">Docs</a><a style="padding:8px 12px;color:#fff">Build</a></nav>` },
    { title: "Frosted Modal", description: "Premium overlay panel for confirmations.", preview: `<div style="width:100%;padding:16px;border-radius:18px;background:rgba(255,255,255,.08);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.16)">Confirm action</div>`, html: `<div style="padding:24px;border-radius:24px;background:rgba(255,255,255,.08);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.16);color:#fff">Confirm action</div>` },
    { title: "Orb Status", description: "Glass status badge with glow dot.", preview: `<div style="display:flex;gap:8px;align-items:center;padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.08)"><span style="width:8px;height:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 14px #4ade80"></span>Live</div>`, html: `<div style="display:inline-flex;gap:8px;align-items:center;padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:#fff"><span style="width:8px;height:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 14px #4ade80"></span>Live</div>` },
    { title: "Blurred Card Stack", description: "Layered product cards for hero art.", preview: `<div style="position:relative;width:120px;height:78px"><span style="position:absolute;inset:16px 0 0 20px;border-radius:16px;background:rgba(194,164,255,.14)"></span><span style="position:absolute;inset:0 20px 16px 0;border-radius:16px;background:rgba(255,255,255,.08);backdrop-filter:blur(12px)"></span></div>`, html: `<div style="position:relative;width:240px;height:150px"><span style="position:absolute;inset:34px 0 0 44px;border-radius:24px;background:rgba(194,164,255,.14)"></span><span style="position:absolute;inset:0 44px 34px 0;border-radius:24px;background:rgba(255,255,255,.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.14)"></span></div>` },
  ]);

  const note = document.createElement("p");
  note.className = "catalog-source-note";
  note.textContent = "Expanded with original patterns inspired by current copy-paste UI ecosystems: Sera UI, shadcn/ui blocks, Magic UI, Aceternity UI, ReactBits, Flowbite, DaisyUI, CodePen, and GitHub component galleries.";
  document.querySelector("footer.final-cta")?.before(note);
}

function addMarketplaceDepth() {
  addToolkitCards("#neu .neu-g", [
    { title: "Inset Panel", description: "Soft dashboard surface with pressed interior depth.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#e0e5ec;box-shadow:inset 8px 8px 16px rgba(163,177,198,.55),inset -8px -8px 16px rgba(255,255,255,.75)"></div>`, html: `<div style="padding:24px;border-radius:22px;background:#e0e5ec;box-shadow:inset 8px 8px 16px rgba(163,177,198,.55),inset -8px -8px 16px rgba(255,255,255,.75);color:#3f4654">Inset panel</div>` },
    { title: "Raised Avatar", description: "Tactile user avatar for profile rows.", preview: `<div style="width:64px;height:64px;border-radius:50%;background:#e0e5ec;box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px #fff;display:grid;place-items:center;color:#444;font-weight:900">UI</div>`, html: `<div style="width:64px;height:64px;border-radius:50%;background:#e0e5ec;box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px #fff;display:grid;place-items:center;color:#444;font-weight:900">UI</div>` },
    { title: "Soft Slider", description: "Neumorphic range control visual.", preview: `<div style="width:100%;height:16px;border-radius:999px;background:#e0e5ec;box-shadow:inset 5px 5px 10px rgba(163,177,198,.55),inset -5px -5px 10px #fff"><div style="width:58%;height:100%;border-radius:999px;background:#c2a4ff"></div></div>`, html: `<div style="height:16px;border-radius:999px;background:#e0e5ec;box-shadow:inset 5px 5px 10px rgba(163,177,198,.55),inset -5px -5px 10px #fff"><div style="width:58%;height:100%;border-radius:999px;background:#c2a4ff"></div></div>` },
    { title: "Soft Toggle", description: "Raised toggle switch for settings UI.", preview: `<div style="width:72px;height:36px;border-radius:999px;background:#e0e5ec;box-shadow:6px 6px 12px rgba(163,177,198,.55),-6px -6px 12px #fff;padding:4px"><div style="margin-left:auto;width:28px;height:28px;border-radius:50%;background:#c2a4ff"></div></div>`, html: `<div style="width:72px;height:36px;border-radius:999px;background:#e0e5ec;box-shadow:6px 6px 12px rgba(163,177,198,.55),-6px -6px 12px #fff;padding:4px"><div style="margin-left:auto;width:28px;height:28px;border-radius:50%;background:#c2a4ff"></div></div>` },
  ]);

  addToolkitCards("#borders .abd-g", [
    { title: "Aurora Edge", description: "Multi-color conic border for premium cards.", preview: `<div style="padding:2px;border-radius:18px;background:conic-gradient(from 90deg,#c2a4ff,#fb8dff,#4ade80,#c2a4ff);width:100%"><div style="height:76px;border-radius:16px;background:#060507"></div></div>`, html: `<div style="padding:2px;border-radius:18px;background:conic-gradient(from 90deg,#c2a4ff,#fb8dff,#4ade80,#c2a4ff)"><div style="padding:24px;border-radius:16px;background:#060507;color:#fff">Aurora edge</div></div>` },
    { title: "Dashed Motion", description: "Copy-paste dashed border with moving offset.", preview: `<div style="width:100%;height:78px;border-radius:16px;border:2px dashed #c2a4ff;display:grid;place-items:center;color:#c2a4ff">Dashed</div>`, html: `<style>@keyframes dashOffset{to{outline-offset:8px}}</style><div style="padding:24px;border-radius:16px;border:2px dashed #c2a4ff;color:#c2a4ff;animation:dashOffset 1.2s ease-in-out infinite alternate">Dashed motion</div>` },
    { title: "Corner Rails", description: "Minimal corner accents without a full box.", preview: `<div style="position:relative;width:100%;height:78px"><span style="position:absolute;inset:0;border-radius:16px;background:#09090b"></span><span style="position:absolute;left:0;top:0;width:34px;height:34px;border-left:2px solid #c2a4ff;border-top:2px solid #c2a4ff"></span><span style="position:absolute;right:0;bottom:0;width:34px;height:34px;border-right:2px solid #fb8dff;border-bottom:2px solid #fb8dff"></span></div>`, html: `<div style="position:relative;padding:24px;border-radius:16px;background:#09090b;color:#fff"><span style="position:absolute;left:0;top:0;width:34px;height:34px;border-left:2px solid #c2a4ff;border-top:2px solid #c2a4ff"></span><span style="position:absolute;right:0;bottom:0;width:34px;height:34px;border-right:2px solid #fb8dff;border-bottom:2px solid #fb8dff"></span>Corner rails</div>` },
    { title: "Glow Frame", description: "Static frame for hero cards and modals.", preview: `<div style="width:100%;height:78px;border-radius:18px;border:1px solid rgba(194,164,255,.42);box-shadow:0 0 30px rgba(194,164,255,.18),inset 0 0 24px rgba(194,164,255,.08)"></div>`, html: `<div style="padding:24px;border-radius:18px;border:1px solid rgba(194,164,255,.42);box-shadow:0 0 30px rgba(194,164,255,.18),inset 0 0 24px rgba(194,164,255,.08);color:#fff">Glow frame</div>` },
  ]);

  addToolkitCards("#hover .hf-g", [
    { title: "Tilt Card", description: "Lightweight transform hover for product tiles.", preview: `<div style="width:96px;height:68px;border-radius:16px;background:linear-gradient(135deg,#111827,#3b0764);transform:rotate(-4deg);box-shadow:0 18px 45px rgba(0,0,0,.32)"></div>`, html: `<div style="width:180px;height:120px;border-radius:18px;background:linear-gradient(135deg,#111827,#3b0764);transition:transform .25s" onmouseover="this.style.transform='rotate(-4deg) scale(1.04)'" onmouseout="this.style.transform='none'"></div>` },
    { title: "Image Lift", description: "Gallery card hover with lift and shadow.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:linear-gradient(135deg,#c2a4ff,#fb8dff);box-shadow:0 18px 45px rgba(194,164,255,.2)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:linear-gradient(135deg,#c2a4ff,#fb8dff);transition:transform .25s,box-shadow .25s" onmouseover="this.style.transform='translateY(-8px)';this.style.boxShadow='0 24px 70px rgba(194,164,255,.28)'" onmouseout="this.style.transform='none';this.style.boxShadow='none'"></div>` },
    { title: "Underline Trail", description: "Navigation hover with delayed underline.", preview: `<span style="position:relative;color:#fff;border-bottom:2px solid #c2a4ff;padding-bottom:5px">Docs</span>`, html: `<a style="position:relative;color:#fff;text-decoration:none;padding-bottom:5px;border-bottom:2px solid #c2a4ff">Docs</a>` },
    { title: "Depth Press", description: "Button hover that becomes a physical press.", preview: `<button style="padding:12px 18px;border:2px solid #000;background:#facc15;color:#000;box-shadow:5px 5px 0 #000;font-weight:900">Press</button>`, html: `<button style="padding:12px 18px;border:2px solid #000;background:#facc15;color:#000;box-shadow:5px 5px 0 #000;font-weight:900;transition:.12s" onmousedown="this.style.transform='translate(5px,5px)';this.style.boxShadow='0 0 0 #000'" onmouseup="this.style.transform='none';this.style.boxShadow='5px 5px 0 #000'">Press</button>` },
  ]);

  addToolkitCards("#utils .ut-g", [
    { title: "Toast Shelf", description: "Bottom-right stack for product notifications.", previewMode: "stack", preview: `<div style="height:30px;border-radius:10px;background:rgba(74,222,128,.14)"></div><div style="height:30px;border-radius:10px;background:rgba(251,141,255,.12)"></div>`, html: `<div style="position:fixed;right:18px;bottom:18px;display:grid;gap:8px"><div style="padding:12px 14px;border-radius:12px;background:#111827;color:#fff">Saved</div><div style="padding:12px 14px;border-radius:12px;background:#111827;color:#fff">Deployed</div></div>` },
    { title: "Breadcrumb Path", description: "Compact hierarchy path for dashboards.", preview: `<div style="display:flex;gap:8px;color:#9ca3af"><span>Home</span><span>/</span><span style="color:#fff">Library</span></div>`, html: `<nav style="display:flex;gap:8px;color:#9ca3af"><a>Home</a><span>/</span><a>Projects</a><span>/</span><strong style="color:#fff">Toolkit</strong></nav>` },
    { title: "Step Indicator", description: "Three-step progress marker for onboarding.", preview: `<div style="display:flex;gap:8px;align-items:center"><span class="kit-pill">1</span><span style="height:2px;width:34px;background:#c2a4ff"></span><span class="kit-pill">2</span><span style="height:2px;width:34px;background:#333"></span><span class="kit-pill">3</span></div>`, html: `<div style="display:flex;gap:8px;align-items:center"><span>1</span><span style="height:2px;width:48px;background:#c2a4ff"></span><span>2</span><span style="height:2px;width:48px;background:#333"></span><span>3</span></div>` },
    { title: "KBD Strip", description: "Shortcut row for docs and command menus.", preview: `<div class="kit-row"><kbd class="kit-pill">Ctrl</kbd><kbd class="kit-pill">Shift</kbd><kbd class="kit-pill">P</kbd></div>`, html: `<div style="display:flex;gap:6px"><kbd style="padding:5px 9px;border-radius:7px;background:#111827;color:#c2a4ff">Ctrl</kbd><kbd style="padding:5px 9px;border-radius:7px;background:#111827;color:#c2a4ff">Shift</kbd><kbd style="padding:5px 9px;border-radius:7px;background:#111827;color:#c2a4ff">P</kbd></div>` },
  ]);

  addToolkitCards("#neutral .cp-g", [
    { title: "Review Card", description: "Social proof block for landing pages.", previewMode: "stack", preview: `<div class="kit-row"><span style="width:28px;height:28px;border-radius:50%;background:#c2a4ff"></span><strong>Maria</strong></div><span style="color:#facc15">*****</span><p style="margin:0;color:#9ca3af">Clean and fast.</p>`, html: `<figure style="padding:20px;border-radius:18px;background:#111827;color:#fff"><div style="display:flex;gap:10px;align-items:center"><span style="width:32px;height:32px;border-radius:50%;background:#c2a4ff"></span><strong>Maria</strong></div><p>Clean and fast.</p></figure>` },
    { title: "Coupon Card", description: "Promo block for commerce sections.", previewMode: "stack", preview: `<strong style="font-size:22px;color:#fff">SAVE20</strong><span style="color:#9ca3af">20% off today</span>`, html: `<div style="padding:18px;border:1px dashed #c2a4ff;border-radius:18px;color:#fff"><strong style="font-size:24px">SAVE20</strong><p>20% off today</p></div>` },
    { title: "Feature List", description: "Compact feature checklist.", previewMode: "stack", preview: `<span>+ Fast deploy</span><span>+ Secure headers</span><span>+ Local audio</span>`, html: `<ul style="display:grid;gap:8px;color:#fff;list-style:none;padding:0"><li>+ Fast deploy</li><li>+ Secure headers</li><li>+ Local audio</li></ul>` },
    { title: "Stats Trio", description: "Three compact numbers for hero support.", preview: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%"><strong>280+</strong><strong>29</strong><strong>0</strong></div>`, html: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;color:#fff"><div><strong>280+</strong><p>Assets</p></div><div><strong>29</strong><p>Sections</p></div><div><strong>0</strong><p>Deps</p></div></div>` },
  ]);

  addToolkitCards("#tw-g, .tw-g", [
    { title: "Hero Banner", description: "Tailwind-style marketing strip with CTA.", previewMode: "stack", preview: `<strong style="color:#fff">Ship faster</strong><button style="border:0;border-radius:8px;background:#4f46e5;color:#fff;padding:8px">Start</button>`, html: `<section style="padding:32px;border-radius:24px;background:#111827;color:#fff"><h2>Ship faster</h2><p>Copy-ready UI patterns for launch pages.</p><button style="border:0;border-radius:8px;background:#4f46e5;color:#fff;padding:10px 16px">Start</button></section>` },
    { title: "Table Row", description: "Admin row with status pill and action.", preview: `<div style="display:grid;grid-template-columns:1fr auto;gap:10px;width:100%;color:#fff"><span>Deployment</span><span class="kit-pill">Ready</span></div>`, html: `<div style="display:grid;grid-template-columns:1fr auto auto;gap:12px;padding:12px;border-bottom:1px solid #1f2937;color:#fff"><span>Deployment</span><span style="color:#4ade80">Ready</span><button>View</button></div>` },
    { title: "FAQ Item", description: "Expandable-looking support block.", previewMode: "stack", preview: `<strong style="color:#fff">Can I copy it?</strong><span style="color:#9ca3af">Yes, every card ships snippet data.</span>`, html: `<details style="padding:16px;border-radius:14px;background:#111827;color:#fff"><summary>Can I copy it?</summary><p>Yes, every card ships snippet data.</p></details>` },
    { title: "Profile Header", description: "User header with avatar and CTA.", preview: `<div style="display:flex;gap:10px;align-items:center;width:100%"><span style="width:36px;height:36px;border-radius:50%;background:#818cf8"></span><div style="flex:1;height:12px;border-radius:6px;background:#1f2937"></div><button style="border:0;border-radius:8px;background:#4f46e5;color:#fff;padding:7px">Follow</button></div>`, html: `<div style="display:flex;gap:12px;align-items:center;color:#fff"><span style="width:44px;height:44px;border-radius:50%;background:#818cf8"></span><div style="flex:1"><strong>UI Toolkit</strong><p>@frontend</p></div><button style="border:0;border-radius:8px;background:#4f46e5;color:#fff;padding:8px 12px">Follow</button></div>` },
  ]);

  addToolkitCards("#shadows .sh-g", [
    { title: "Floating Panel", description: "Soft ambient panel shadow for modals.", preview: `<div style="width:90px;height:62px;border-radius:16px;background:#111827;box-shadow:0 28px 80px rgba(0,0,0,.45)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#111827;box-shadow:0 28px 80px rgba(0,0,0,.45);color:#fff">Floating panel</div>` },
    { title: "Colored Elevation", description: "Brand-colored ambient shadow.", preview: `<div style="width:90px;height:62px;border-radius:16px;background:#2b174f;box-shadow:0 20px 60px rgba(194,164,255,.35)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#2b174f;box-shadow:0 20px 60px rgba(194,164,255,.35);color:#fff">Colored elevation</div>` },
    { title: "Inset Well", description: "Inner shadow well for dashboards.", preview: `<div style="width:90px;height:62px;border-radius:16px;background:#0b0b10;box-shadow:inset 0 0 28px rgba(255,255,255,.08)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#0b0b10;box-shadow:inset 0 0 28px rgba(255,255,255,.08);color:#fff">Inset well</div>` },
    { title: "Hard Offset", description: "Neobrutalist card shadow.", preview: `<div style="width:90px;height:62px;border-radius:8px;background:#facc15;box-shadow:8px 8px 0 #000"></div>`, html: `<div style="padding:24px;border:2px solid #000;border-radius:8px;background:#facc15;box-shadow:8px 8px 0 #000;color:#000;font-weight:900">Hard offset</div>` },
  ]);

  addToolkitCards("#tokens .ut-g", [
    { title: "Color Semantic Tokens", description: "Success, warning, danger, and info variables.", previewMode: "stack", preview: `<span class="kit-pill">success</span><span class="kit-pill">warning</span><span class="kit-pill">danger</span>`, html: `<style>:root{--success:#22c55e;--warning:#f59e0b;--danger:#f43f5e;--info:#38bdf8}</style>` },
    { title: "Container Tokens", description: "Readable max-width variables for layouts.", previewMode: "stack", preview: `<span>--container-sm: 640px</span><span>--container-lg: 1120px</span>`, html: `<style>:root{--container-sm:640px;--container-md:880px;--container-lg:1120px;--container-xl:1360px}</style>` },
    { title: "Motion Duration Tokens", description: "Shared timing scale for interactions.", previewMode: "stack", preview: `<span>fast 120ms</span><span>normal 220ms</span><span>slow 420ms</span>`, html: `<style>:root{--duration-fast:120ms;--duration-normal:220ms;--duration-slow:420ms}</style>` },
    { title: "Surface Tokens", description: "Layered backgrounds for card systems.", previewMode: "stack", preview: `<span style="height:18px;border-radius:8px;background:#09090b"></span><span style="height:18px;border-radius:8px;background:#111827"></span>`, html: `<style>:root{--surface-base:#060507;--surface-card:#111827;--surface-raised:#1f2937;--surface-glass:rgba(255,255,255,.08)}</style>` },
  ]);

  addToolkitCards("#animations .an-g", [
    { title: "Reveal Up", description: "Scroll reveal keyframe for cards.", preview: `<div style="width:70px;height:46px;border-radius:12px;background:#c2a4ff;animation:revUp 1.2s ease infinite alternate"></div><style>@keyframes revUp{from{transform:translateY(12px);opacity:.3}to{transform:none;opacity:1}}</style>`, html: `<style>@keyframes revealUp{from{transform:translateY(14px);opacity:0}to{transform:none;opacity:1}}</style><div style="animation:revealUp .5s ease both">Reveal up</div>` },
    { title: "Blur In", description: "Soft focus entrance animation.", preview: `<div style="color:#fff;animation:blurIn 1.2s ease infinite alternate">Focus</div><style>@keyframes blurIn{from{filter:blur(8px);opacity:.2}to{filter:blur(0);opacity:1}}</style>`, html: `<style>@keyframes blurIn{from{filter:blur(8px);opacity:0}to{filter:blur(0);opacity:1}}</style><div style="animation:blurIn .6s ease both">Focus</div>` },
    { title: "Orbit Dot", description: "Tiny orbital loader for async states.", preview: `<div style="width:48px;height:48px;border:1px solid #333;border-radius:50%;position:relative;animation:orbit 1s linear infinite"><span style="position:absolute;top:-4px;left:20px;width:8px;height:8px;border-radius:50%;background:#c2a4ff"></span></div><style>@keyframes orbit{to{transform:rotate(360deg)}}</style>`, html: `<style>@keyframes orbit{to{transform:rotate(360deg)}}</style><div style="width:48px;height:48px;border:1px solid #333;border-radius:50%;position:relative;animation:orbit 1s linear infinite"><span style="position:absolute;top:-4px;left:20px;width:8px;height:8px;border-radius:50%;background:#c2a4ff"></span></div>` },
    { title: "Elastic Pop", description: "Button and badge attention animation.", preview: `<div style="padding:10px 14px;border-radius:999px;background:#c2a4ff;color:#000;font-weight:900;animation:pop .9s ease infinite alternate">Pop</div><style>@keyframes pop{to{transform:scale(1.08)}}</style>`, html: `<style>@keyframes elasticPop{50%{transform:scale(1.12)}100%{transform:scale(1)}}</style><button style="animation:elasticPop .6s ease">Pop</button>` },
  ]);

  addToolkitCards("#gradients .gr-g", [
    { title: "Mesh Glow", description: "Layered radial gradient background.", preview: `<div style="width:100%;height:78px;border-radius:16px;background:radial-gradient(circle at 20% 20%,#c2a4ff,transparent 30%),radial-gradient(circle at 80% 30%,#fb8dff,transparent 32%),#060507"></div>`, html: `<div style="min-height:220px;background:radial-gradient(circle at 20% 20%,#c2a4ff,transparent 30%),radial-gradient(circle at 80% 30%,#fb8dff,transparent 32%),#060507"></div>` },
    { title: "Commerce Warmth", description: "Warm landing gradient for shops.", preview: `<div style="width:100%;height:78px;border-radius:16px;background:linear-gradient(135deg,#fff7ed,#fb923c,#be123c)"></div>`, html: `<div style="background:linear-gradient(135deg,#fff7ed,#fb923c,#be123c);min-height:220px"></div>` },
    { title: "Data Night", description: "Dashboard gradient for dark panels.", preview: `<div style="width:100%;height:78px;border-radius:16px;background:linear-gradient(135deg,#020617,#0f766e,#0ea5e9)"></div>`, html: `<div style="background:linear-gradient(135deg,#020617,#0f766e,#0ea5e9);min-height:220px"></div>` },
    { title: "Luxury Ink", description: "Editorial luxury palette gradient.", preview: `<div style="width:100%;height:78px;border-radius:16px;background:linear-gradient(135deg,#09090b,#78350f,#f5f5f4)"></div>`, html: `<div style="background:linear-gradient(135deg,#09090b,#78350f,#f5f5f4);min-height:220px"></div>` },
  ]);
}

function rebuildTypographyLibrary() {
  const grid = document.querySelector("#typography .fn-r");
  if (!grid) return;

  const fonts = [
    { label: "Space Grotesk", family: "Space Grotesk", sample: "Spatial\nInterface", weights: ["400", "500", "700"] },
    { label: "Sora", family: "Sora", sample: "Future\nSignal", weights: ["300", "400", "600"] },
    { label: "Manrope", family: "Manrope", sample: "Quiet\nProduct", weights: ["400", "600", "800"] },
    { label: "Outfit", family: "Outfit", sample: "Launch\nKit", weights: ["300", "500", "700"] },
    { label: "Plus Jakarta Sans", family: "Plus Jakarta Sans", sample: "Clear\nDashboard", weights: ["400", "600", "800"] },
    { label: "DM Sans", family: "DM Sans", sample: "Editorial\nSystem", weights: ["400", "500", "700"] },
    { label: "Syne", family: "Syne", sample: "Bold\nPoster", weights: ["400", "500", "700"] },
    { label: "Fraunces", family: "Fraunces", sample: "Luxury\nNotes", fallback: "serif", weights: ["300", "400", "600"] },
    { label: "IBM Plex Sans", family: "IBM Plex Sans", sample: "Utility\nForms", weights: ["400", "500", "700"] },
    { label: "Archivo", family: "Archivo", sample: "Sport\nMetrics", weights: ["400", "600", "700"] },
    { label: "Urbanist", family: "Urbanist", sample: "Fluid\nInterface", weights: ["300", "500", "700"] },
    { label: "Instrument Serif", family: "Instrument Serif", fallback: "serif", sample: "Cinematic\nStory", weights: ["400", "500", "700"] },
    { label: "Onest", family: "Onest", sample: "Sharp\nProduct", weights: ["400", "600", "700"] },
    { label: "Rajdhani", family: "Rajdhani", sample: "Motion\nSystem", weights: ["400", "500", "700"] },
    { label: "System Serif", family: "Fraunces", fallback: "serif", sample: "Readable\nStory", weights: ["400", "500", "700"] },
  ];

  grid.innerHTML = fonts.map(createFontCard).join("");
  grid.classList.add("sg", "paginated");
}

function pruneCatalogNoise() {
  removeCardsByTitle("#gradients .gr-g", (title) => /^Dynamic \d+$/i.test(title));
  removeCardsByTitle("#buttons .btn-g", (title) => /^(Brutal|Gradient Btn) \d+$/i.test(title));
  removeCardsByTitle("#loading .load-g", (title) => /^(Spinner|Ping Ring) \d+$/i.test(title));
  removeCardsByTitle("#shadows .sh-g", (title) => /^Shadow \d+$/i.test(title));
}

function uiLines(widths = ["82%", "64%", "46%"], color = "rgba(255,255,255,.12)") {
  return widths
    .map((width) => `<span style="display:block;width:${width};height:8px;border-radius:999px;background:${color}"></span>`)
    .join("");
}

function uiChips(labels = [], accent = "#c2a4ff") {
  return labels
    .map((label, index) => `<span style="display:inline-flex;align-items:center;min-height:24px;padding:5px 9px;border-radius:999px;background:${index === 0 ? accent : "rgba(255,255,255,.08)"};color:${index === 0 ? "#020617" : "#e5e7eb"};font-size:10px;font-weight:800">${label}</span>`)
    .join("");
}

function nativeStage(content, options = {}) {
  const accent = options.accent || "#c2a4ff";
  const bg = options.bg || `radial-gradient(circle at 86% 12%,${accent}32,transparent 34%),linear-gradient(135deg,#07111f,#111827)`;
  const color = options.color || "#fff";
  const minHeight = options.minHeight || "150px";
  return `<div style="width:100%;min-height:${minHeight};padding:16px;border-radius:22px;background:${bg};border:1px solid rgba(255,255,255,.09);color:${color};box-shadow:inset 0 1px 0 rgba(255,255,255,.05);display:flex;flex-direction:column;justify-content:${options.justify || "space-between"};gap:12px;overflow:hidden">${content}</div>`;
}

function renderDeepProductPreview(kind, title, labels = [], accent = "#c2a4ff", variant = 0) {
  if (variant < 3) return "";

  const chips = uiChips(labels.slice(0, 4), accent);
  const bars = uiLines(["82%", "64%", "48%"]);
  const lightBars = uiLines(["82%", "62%"], "#cbd5e1");
  const metric = labels[0] || "Live";
  const secondary = labels[1] || "Route";
  const third = labels[2] || "Next";

  if (kind === "nav") {
    if (variant === 3) {
      return nativeStage(`<div style="display:grid;grid-template-columns:92px 1fr 74px;gap:9px;align-items:center;padding:10px;border-radius:17px;background:#f8fafc;color:#020617"><strong style="font-size:13px">Orbit</strong><span style="height:30px;border-radius:999px;background:#e2e8f0;padding:8px 12px;font-size:10px;color:#64748b">${metric}</span><span style="height:30px;border-radius:999px;background:${accent}"></span></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">${labels.slice(0, 3).map((label, index) => `<span style="min-height:42px;border-radius:14px;background:${index === 1 ? accent : "rgba(255,255,255,.075)"};color:${index === 1 ? "#020617" : "#e5e7eb"};display:grid;place-items:center;font-size:10px;font-weight:900">${label}</span>`).join("")}</div>`, { accent, minHeight: "176px" });
    }
    if (variant === 4) {
      return nativeStage(`<div style="display:grid;grid-template-columns:70px 1fr;gap:10px"><aside style="border-radius:18px;background:${accent};color:#020617;padding:11px;display:grid;align-content:space-between;font-size:10px;font-weight:900"><span>Menu</span><span>${metric}</span></aside><main style="border-radius:18px;background:#f8fafc;color:#020617;padding:12px"><strong style="font-size:14px">${title}</strong><div style="margin-top:11px">${lightBars}</div></main></div><div style="height:30px;border-radius:999px;background:rgba(255,255,255,.075)"></div>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><strong style="font-size:13px">${title}</strong><span style="width:42px;height:42px;border-radius:15px;background:${accent}"></span></div><div style="display:grid;grid-template-columns:1fr 74px;gap:10px"><div style="border-radius:18px;background:rgba(255,255,255,.07);padding:12px">${bars}</div><div style="border-radius:18px;background:#f8fafc;color:#020617;padding:11px;font-size:10px;font-weight:900">${metric}<br>${secondary}</div></div>`, { accent, minHeight: "176px" });
  }

  if (kind === "mega") {
    if (variant === 3) {
      return nativeStage(`<div style="display:grid;grid-template-columns:76px 1fr;gap:10px"><aside style="border-radius:18px;background:${accent};color:#020617;padding:12px;display:grid;gap:8px;font-size:10px;font-weight:900">${labels.slice(0, 3).map((label) => `<span>${label}</span>`).join("")}</aside><main style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${[0, 1, 2, 3].map((index) => `<span style="border-radius:14px;background:${index === 2 ? "#f8fafc" : "rgba(255,255,255,.075)"};min-height:44px"></span>`).join("")}</main></div><div style="display:flex;align-items:center;justify-content:space-between"><strong style="font-size:13px">${title}</strong><span style="height:26px;width:86px;border-radius:999px;background:rgba(255,255,255,.08)"></span></div>`, { accent, minHeight: "186px" });
    }
    if (variant === 4) {
      return nativeStage(`<div style="padding:12px;border-radius:18px;background:#f8fafc;color:#020617"><strong style="font-size:14px">${title}</strong><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px">${labels.slice(0, 3).map((label, index) => `<span style="height:36px;border-radius:12px;background:${index === 0 ? accent : "#e2e8f0"};display:grid;place-items:center;font-size:10px;font-weight:900">${label}</span>`).join("")}</div></div><div style="display:grid;grid-template-columns:1.3fr .7fr;gap:9px"><span style="height:40px;border-radius:14px;background:rgba(255,255,255,.075)"></span><span style="height:40px;border-radius:14px;background:${accent}55"></span></div>`, { accent, minHeight: "186px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:1fr 94px;gap:10px"><div style="border-radius:18px;background:rgba(255,255,255,.07);padding:12px"><strong style="font-size:15px">${title}</strong><div style="margin-top:10px">${bars}</div></div><div style="display:grid;gap:8px">${labels.slice(0, 3).map((label, index) => `<span style="border-radius:13px;background:${index === 1 ? accent : "#f8fafc"};color:#020617;padding:9px;font-size:9px;font-weight:900">${label}</span>`).join("")}</div></div>`, { accent, minHeight: "186px" });
  }

  if (kind === "searchNav" || kind === "command") {
    if (variant === 3) {
      return nativeStage(`<div style="padding:12px;border-radius:18px;background:#f8fafc;color:#020617"><div style="height:34px;border-radius:999px;background:#e2e8f0;padding:10px 14px;font-size:10px;color:#64748b">Search ${metric.toLowerCase()}</div><div style="display:grid;gap:7px;margin-top:11px">${[metric, secondary, third].map((label, index) => `<span style="height:28px;border-radius:10px;background:${index === 0 ? accent : "#e2e8f0"};display:flex;align-items:center;padding:0 10px;font-size:10px;font-weight:900">${label}</span>`).join("")}</div></div>`, { accent, minHeight: "176px" });
    }
    if (variant === 4) {
      return nativeStage(`<div style="display:grid;grid-template-columns:68px 1fr;gap:10px"><aside style="border-radius:18px;background:rgba(255,255,255,.075);padding:10px;display:grid;gap:7px">${labels.slice(0, 4).map((label, index) => `<span style="height:22px;border-radius:999px;background:${index === 0 ? accent : "rgba(255,255,255,.08)"}"></span>`).join("")}</aside><main style="border-radius:18px;background:#f8fafc;color:#020617;padding:12px"><strong style="font-size:13px">${title}</strong><div style="margin-top:10px">${lightBars}</div></main></div>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><strong style="font-size:13px">${title}</strong><span style="padding:6px 8px;border-radius:10px;background:${accent};color:#020617;font-size:10px;font-weight:900">⌘K</span></div><div style="display:grid;gap:8px">${[0, 1, 2].map((index) => `<div style="display:grid;grid-template-columns:28px 1fr 42px;gap:8px;align-items:center;padding:8px;border-radius:13px;background:${index === 1 ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.055)"}"><span style="height:24px;border-radius:8px;background:${index === 0 ? accent : "rgba(255,255,255,.12)"}"></span><span style="height:8px;border-radius:999px;background:rgba(255,255,255,.18)"></span><span style="height:18px;border-radius:999px;background:rgba(255,255,255,.1)"></span></div>`).join("")}</div>`, { accent, minHeight: "176px" });
  }

  if (kind === "announcement") {
    if (variant === 3) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1fr 92px;gap:10px;align-items:center"><div style="height:34px;border-radius:999px;background:${accent};color:#020617;padding:10px 14px;font-size:10px;font-weight:900">${metric} · ${secondary}</div><span style="height:34px;border-radius:999px;background:#f8fafc"></span></div><div style="display:flex;align-items:center;gap:8px;color:#94a3b8;font-size:10px">${labels.slice(0, 4).map((label, index) => `<span style="display:flex;align-items:center;gap:8px">${index ? "<b style='opacity:.38'>/</b>" : ""}${label}</span>`).join("")}</div><strong style="font-size:16px">${title}</strong>`, { accent, minHeight: "166px" });
    }
    if (variant === 4) {
      return nativeStage(`<div style="border-radius:18px;background:#f8fafc;color:#020617;padding:12px"><strong style="font-size:14px">${title}</strong><div style="height:8px;border-radius:999px;background:#e2e8f0;margin-top:12px;overflow:hidden"><span style="display:block;width:62%;height:100%;background:${accent}"></span></div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${labels.slice(0, 3).map((label) => `<span style="height:30px;border-radius:999px;background:rgba(255,255,255,.08);display:grid;place-items:center;font-size:10px;font-weight:800">${label}</span>`).join("")}</div>`, { accent, minHeight: "166px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:58px 1fr;gap:10px;align-items:center"><span style="height:58px;border-radius:18px;background:${accent};color:#020617;display:grid;place-items:center;font-size:11px;font-weight:900">${metric}</span><div><strong style="font-size:16px">${title}</strong><div style="margin-top:8px">${bars}</div></div></div><span style="height:30px;border-radius:999px;background:rgba(255,255,255,.075)"></span>`, { accent, minHeight: "166px" });
  }

  if (kind === "headlineGrid" || kind === "hero") {
    if (variant === 3) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1fr 86px;gap:14px;align-items:end"><div><strong style="display:block;font-size:31px;line-height:.94">${title}</strong><span style="display:block;margin-top:10px;color:#94a3b8;font-size:11px">Proof-led headline with real product context.</span></div><div style="border-radius:20px;background:${accent};color:#020617;padding:12px;display:grid;align-content:space-between;min-height:92px"><strong style="font-size:20px">01</strong><span style="font-size:10px;font-weight:900">${metric}</span></div></div><div style="display:flex;gap:8px">${chips}</div>`, { accent, minHeight: "196px" });
    }
    if (variant === 4) {
      return nativeStage(`<div style="display:grid;grid-template-columns:70px 1fr;gap:14px"><span style="font-size:54px;line-height:.82;color:${accent};font-weight:900">“</span><div><strong style="display:block;font-size:28px;line-height:.96">${title}</strong><div style="margin-top:12px">${bars}</div></div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${labels.slice(0, 3).map((label) => `<span style="height:34px;border-radius:999px;background:rgba(255,255,255,.08);display:grid;place-items:center;font-size:10px;font-weight:800">${label}</span>`).join("")}</div>`, { accent, minHeight: "196px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:1.2fr .8fr;gap:12px;align-items:stretch"><div><span style="font-family:monospace;font-size:10px;color:${accent}">deploy / headline</span><strong style="display:block;margin-top:8px;font-size:27px;line-height:.98">${title}</strong></div><div style="border-radius:18px;background:#f8fafc;color:#020617;padding:12px;display:grid;gap:8px">${lightBars}<span style="height:28px;border-radius:999px;background:${accent}"></span></div></div>`, { accent, minHeight: "196px" });
  }

  if (kind === "buyCta" || kind === "cta") {
    if (variant === 3) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1fr 100px;gap:12px"><div><strong style="display:block;font-size:22px;line-height:1.04">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">Checkout-ready CTA with plan summary and trust route.</span></div><div style="border-radius:20px;background:#f8fafc;color:#020617;padding:12px;text-align:center"><span style="font-size:10px;color:#64748b">${metric}</span><strong style="display:block;font-size:26px">$29</strong></div></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">${["Trial", "Secure", secondary].map((label, index) => `<span style="height:36px;border-radius:999px;background:${index === 0 ? accent : "rgba(255,255,255,.08)"};color:${index === 0 ? "#020617" : "#e5e7eb"};display:grid;place-items:center;font-size:10px;font-weight:900">${label}</span>`).join("")}</div>`, { accent, minHeight: "186px" });
    }
    if (variant === 4) {
      return nativeStage(`<div style="padding:13px;border-radius:18px;background:#f8fafc;color:#020617"><strong style="font-size:16px">${title}</strong><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:12px">${["Free", metric, "Scale"].map((label, index) => `<span style="min-height:48px;border-radius:14px;background:${index === 1 ? accent : "#e2e8f0"};padding:9px;font-size:10px;font-weight:900">${label}<br><small>$${index === 0 ? "0" : index === 1 ? "29" : "99"}</small></span>`).join("")}</div></div>`, { accent, minHeight: "186px" });
    }
    return nativeStage(`<div style="border-radius:20px;background:linear-gradient(135deg,${accent}44,rgba(255,255,255,.07));padding:14px"><strong style="display:block;font-size:22px;line-height:1.05">${title}</strong><div style="margin-top:11px">${bars}</div></div><div style="display:flex;gap:8px;align-items:center"><span style="height:36px;flex:1;border-radius:999px;background:${accent}"></span><span style="height:36px;width:90px;border-radius:999px;background:#f8fafc"></span></div>`, { accent, minHeight: "186px" });
  }

  if (kind === "downloadCta") {
    if (variant === 3) {
      return nativeStage(`<div style="display:grid;grid-template-columns:82px 1fr;gap:12px;align-items:center"><span style="height:82px;border-radius:22px;background:#f8fafc;color:#020617;display:grid;place-items:center;font-size:20px;font-weight:900">ZIP</span><div><strong style="display:block;font-size:21px;line-height:1.05">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">Pack, docs and starter assets in one block.</span></div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${labels.slice(0, 3).map((label) => `<span style="height:32px;border-radius:12px;background:${accent}22;border:1px solid ${accent}55;display:grid;place-items:center;font-size:10px;font-weight:800">${label}</span>`).join("")}</div>`, { accent, minHeight: "186px" });
    }
    if (variant === 4) {
      return nativeStage(`<div style="padding:12px;border-radius:18px;background:#020617;border:1px solid rgba(255,255,255,.1);font-family:monospace"><span style="color:${accent}">$ npm i toolkit</span><span style="display:block;margin-top:8px;color:#94a3b8">download ${metric.toLowerCase()}...</span></div><div><strong style="font-size:20px">${title}</strong><div style="margin-top:9px">${chips}</div></div>`, { accent, minHeight: "186px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div style="border-radius:18px;background:${accent};color:#020617;padding:12px"><strong style="font-size:16px">${metric}</strong><span style="display:block;margin-top:28px;font-size:10px;font-weight:900">Download</span></div><div style="border-radius:18px;background:#f8fafc;color:#020617;padding:12px">${lightBars}<span style="display:block;height:30px;border-radius:999px;background:${accent};margin-top:12px"></span></div></div><strong style="font-size:14px">${title}</strong>`, { accent, minHeight: "186px" });
  }

  if (kind === "newsletterForm" || kind === "modal" || kind === "panel") {
    if (variant === 3) {
      return nativeStage(`<div style="margin:auto;width:92%;padding:15px;border-radius:22px;background:#f8fafc;color:#020617;box-shadow:0 18px 50px rgba(0,0,0,.34)"><strong style="display:block;font-size:18px;line-height:1.05">${title}</strong><div style="display:grid;grid-template-columns:1fr 74px;gap:8px;margin-top:13px"><span style="height:34px;border-radius:999px;background:#e2e8f0"></span><span style="height:34px;border-radius:999px;background:${accent}"></span></div><div style="display:flex;gap:6px;margin-top:10px">${labels.slice(0, 3).map((label) => `<span style="font-size:9px;color:#64748b">${label}</span>`).join("")}</div></div>`, { accent, minHeight: "186px", justify: "center" });
    }
    if (variant === 4) {
      return nativeStage(`<div style="display:grid;grid-template-columns:86px 1fr;gap:10px"><aside style="border-radius:18px;background:${accent};color:#020617;padding:12px;font-size:10px;font-weight:900">${metric}<br>${secondary}</aside><main style="border-radius:18px;background:rgba(255,255,255,.075);padding:12px"><strong style="font-size:16px">${title}</strong><div style="display:grid;gap:7px;margin-top:10px"><span style="height:30px;border-radius:10px;background:#f8fafc"></span><span style="height:30px;border-radius:10px;background:rgba(255,255,255,.1)"></span></div></main></div>`, { accent, minHeight: "186px" });
    }
    return nativeStage(`<div><strong style="display:block;font-size:21px;line-height:1.05">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">Form shell with confirmation-safe hierarchy.</span></div><div style="padding:10px;border-radius:18px;background:#f8fafc;color:#020617;display:grid;gap:8px"><span style="height:30px;border-radius:999px;background:#e2e8f0"></span><span style="height:30px;border-radius:999px;background:${accent}"></span></div>`, { accent, minHeight: "186px" });
  }

  if (kind === "creative404" || kind === "error" || kind === "industryError") {
    if (variant === 3) {
      return nativeStage(`<div style="display:grid;grid-template-columns:96px 1fr;gap:14px;align-items:center"><strong style="font-size:58px;line-height:.82;color:${accent}">404</strong><div><strong style="display:block;font-size:22px;line-height:1.02">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">Recovery routes stay visible.</span></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${["Search", "Support", metric, secondary].map((label, index) => `<span style="height:30px;border-radius:999px;background:${index === 0 ? accent : "rgba(255,255,255,.08)"};color:${index === 0 ? "#020617" : "#e5e7eb"};display:grid;place-items:center;font-size:10px;font-weight:900">${label}</span>`).join("")}</div>`, { accent, minHeight: "196px" });
    }
    if (variant === 4) {
      return nativeStage(`<div style="border-radius:20px;background:#f8fafc;color:#020617;padding:14px"><span style="font-family:monospace;font-size:10px;color:#64748b">route.not_found</span><strong style="display:block;margin-top:8px;font-size:20px">${title}</strong><div style="height:34px;border-radius:999px;background:#e2e8f0;margin-top:12px;padding:10px 13px;font-size:10px;color:#64748b">Search pages...</div></div><div style="height:34px;border-radius:999px;background:${accent}"></div>`, { accent, minHeight: "196px" });
    }
    return nativeStage(`<div style="display:grid;place-items:center;text-align:center;gap:8px"><span style="width:108px;height:70px;border-radius:28px;background:repeating-linear-gradient(135deg,${accent}66 0 12px,rgba(255,255,255,.08) 12px 24px);display:grid;place-items:center;font-size:24px;font-weight:900">404</span><strong style="font-size:19px">${title}</strong></div><div style="display:flex;justify-content:center;gap:8px">${chips}</div>`, { accent, minHeight: "196px", justify: "center" });
  }

  if (kind === "footer" || kind === "typeFooter" || kind === "cardFooter") {
    if (variant === 3) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1.2fr .8fr;gap:14px"><div><strong style="display:block;font-size:30px;line-height:.88">${title}</strong><div style="margin-top:13px">${bars}</div></div><div style="display:grid;gap:8px">${labels.slice(0, 4).map((label) => `<span style="height:25px;border-radius:999px;background:rgba(255,255,255,.075);padding:7px 9px;font-size:9px;color:#94a3b8">${label}</span>`).join("")}</div></div><div style="height:1px;background:${accent}55"></div>`, { accent, minHeight: "186px" });
    }
    if (variant === 4) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">${labels.slice(0, 3).map((label, index) => `<div style="min-height:58px;border-radius:18px;background:${index === 0 ? accent : "rgba(255,255,255,.075)"};color:${index === 0 ? "#020617" : "#e5e7eb"};padding:11px"><strong style="font-size:12px">${label}</strong></div>`).join("")}</div><div style="display:flex;justify-content:space-between;gap:10px;align-items:end"><strong style="font-size:16px">${title}</strong><span style="font-size:10px;color:#94a3b8">2026 / Toolkit</span></div>`, { accent, minHeight: "186px" });
    }
    return nativeStage(`<div style="padding:13px;border-radius:18px;background:#f8fafc;color:#020617"><strong style="font-size:18px">${title}</strong><div style="display:grid;grid-template-columns:1fr 74px;gap:8px;margin-top:12px"><span style="height:34px;border-radius:999px;background:#e2e8f0"></span><span style="height:34px;border-radius:999px;background:${accent}"></span></div></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${[0, 1, 2, 3].map(() => `<span style="height:22px;border-radius:999px;background:rgba(255,255,255,.075)"></span>`).join("")}</div>`, { accent, minHeight: "186px" });
  }

  if (kind === "bento" || kind === "dashboardBento" || kind === "mediaBento") {
    if (variant === 3) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1.25fr .75fr;grid-template-rows:72px 76px;gap:9px"><div style="grid-row:span 2;border-radius:20px;background:linear-gradient(135deg,${accent}55,rgba(255,255,255,.07));padding:13px"><strong style="font-size:17px">${title}</strong><div style="margin-top:12px">${bars}</div></div><span style="border-radius:18px;background:#f8fafc"></span><span style="border-radius:18px;background:${accent}"></span></div>`, { accent, minHeight: "196px" });
    }
    if (variant === 4) {
      return nativeStage(`<div style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:58px 78px;gap:9px"><div style="grid-column:span 2;border-radius:18px;background:#f8fafc;color:#020617;padding:12px"><strong style="font-size:18px">${metric}</strong><span style="display:block;color:#64748b;font-size:10px">${title}</span></div><div style="border-radius:18px;background:${accent}"></div><div style="border-radius:18px;background:rgba(255,255,255,.075)"></div><div style="grid-column:span 2;border-radius:18px;background:linear-gradient(90deg,${accent}55,rgba(255,255,255,.07));padding:12px">${lightBars}</div></div>`, { accent, minHeight: "196px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:76px 1fr;gap:10px"><aside style="border-radius:20px;background:${accent};color:#020617;padding:12px;display:grid;align-content:space-between;font-size:10px;font-weight:900"><span>${metric}</span><span>${secondary}</span></aside><main style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${[0, 1, 2, 3].map((index) => `<span style="border-radius:16px;background:${index === 1 ? "#f8fafc" : "rgba(255,255,255,.075)"};min-height:52px"></span>`).join("")}</main></div><strong style="font-size:14px">${title}</strong>`, { accent, minHeight: "196px" });
  }

  return "";
}

function renderProductPreview(kind, title, labels = [], accent = "#c2a4ff") {
  const rows = uiLines(["86%", "72%", "52%"]);
  const chips = uiChips(labels, accent);
  const row = (a, b, c = accent) => `<div style="display:grid;grid-template-columns:1.3fr .7fr .5fr;gap:8px;align-items:center;padding:9px 10px;border-radius:12px;background:rgba(255,255,255,.055)"><span style="height:8px;border-radius:999px;background:rgba(255,255,255,.16)"></span><span style="height:8px;border-radius:999px;background:rgba(255,255,255,.1)"></span><span style="height:18px;border-radius:999px;background:${c};opacity:.9"></span></div>`;
  const variant = Array.from(title).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 6;
  const deepPreview = renderDeepProductPreview(kind, title, labels, accent, variant);
  if (deepPreview) return deepPreview;

  if (kind === "modal") {
    return nativeStage(`<div style="height:26px;border-radius:12px;background:rgba(255,255,255,.08)"></div><div style="margin:auto;width:82%;padding:16px;border-radius:18px;background:#f8fafc;color:#020617;box-shadow:0 18px 42px rgba(0,0,0,.36)"><strong style="display:block;font-size:15px">${title}</strong><span style="display:block;margin-top:8px;color:#64748b;font-size:11px">Confirm the next step before continuing.</span><div style="display:flex;gap:8px;margin-top:14px"><span style="height:26px;flex:1;border-radius:999px;background:#e2e8f0"></span><span style="height:26px;flex:1;border-radius:999px;background:${accent}"></span></div></div>`, { accent });
  }
  if (kind === "drawer") {
    return nativeStage(`<div style="display:grid;grid-template-columns:1fr 86px;gap:10px;min-height:138px"><div style="border-radius:16px;background:rgba(255,255,255,.05);padding:12px">${rows}</div><aside style="border-radius:16px;background:#f8fafc;color:#020617;padding:12px;display:grid;gap:8px"><strong style="font-size:12px">${title}</strong>${uiLines(["88%", "62%"], "#cbd5e1")}<span style="height:26px;border-radius:999px;background:${accent}"></span></aside></div>`, { accent });
  }
  if (kind === "command") {
    return nativeStage(`<div style="padding:13px;border-radius:18px;background:#f8fafc;color:#020617;box-shadow:0 18px 40px rgba(0,0,0,.3)"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><strong style="font-size:13px">Search actions</strong><span style="padding:4px 7px;border-radius:8px;background:#e2e8f0;color:#334155;font-size:10px">Ctrl K</span></div><div style="display:grid;gap:7px;margin-top:12px"><span style="height:28px;border-radius:10px;background:#e2e8f0"></span><span style="height:28px;border-radius:10px;background:${accent}33"></span><span style="height:28px;border-radius:10px;background:#e2e8f0"></span></div></div>`, { accent });
  }
  if (kind === "table") {
    return nativeStage(`<div style="display:flex;justify-content:space-between;align-items:center"><strong style="font-size:14px">${title}</strong><span style="width:62px;height:24px;border-radius:999px;background:${accent}"></span></div><div style="display:grid;gap:8px">${row()}${row()}${row("#fff", "#fff", "#4ade80")}</div>`, { accent });
  }
  if (kind === "kpi") {
    return nativeStage(`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:9px">${["$71.8k", "12.4%", "982"].map((metric, index) => `<div style="padding:12px;border-radius:16px;background:rgba(255,255,255,.07)"><span style="display:block;font-size:10px;color:#94a3b8">${labels[index] || "Metric"}</span><strong style="display:block;margin-top:6px;font-size:18px">${metric}</strong></div>`).join("")}</div><div style="height:42px;border-radius:16px;background:linear-gradient(90deg,${accent}55,rgba(255,255,255,.06))"></div>`, { accent });
  }
  if (kind === "empty") {
    return nativeStage(`<div style="margin:auto;text-align:center;display:grid;justify-items:center;gap:10px"><span style="width:54px;height:54px;border-radius:18px;background:${accent}24;border:1px solid ${accent}55"></span><strong style="font-size:16px">${title}</strong><span style="max-width:190px;color:#94a3b8;font-size:11px">Add content, retry, or start from a guided template.</span><span style="height:28px;width:118px;border-radius:999px;background:${accent}"></span></div>`, { accent, justify: "center" });
  }
  if (kind === "panel") {
    return nativeStage(`<div style="display:grid;grid-template-columns:92px 1fr;gap:10px;min-height:138px"><aside style="border-radius:16px;background:rgba(255,255,255,.07);padding:10px;display:grid;align-content:start;gap:8px">${uiChips(labels.slice(0, 3), accent)}</aside><div style="border-radius:16px;background:#f8fafc;color:#020617;padding:12px;display:grid;gap:10px"><strong style="font-size:13px">${title}</strong>${uiLines(["86%", "74%", "58%"], "#cbd5e1")}<span style="height:28px;border-radius:999px;background:#020617"></span></div></div>`, { accent });
  }
  if (kind === "nav") {
    return nativeStage(`<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border-radius:16px;background:#f8fafc;color:#020617"><strong style="font-size:13px">Orbit</strong><div style="display:flex;gap:8px">${uiChips(labels.slice(0, 3), accent)}</div></div><div style="display:grid;grid-template-columns:68px 1fr;gap:10px;min-height:70px"><aside style="border-radius:14px;background:rgba(255,255,255,.06)"></aside><main style="border-radius:14px;background:rgba(255,255,255,.04);padding:10px">${uiLines(["70%", "54%"])}</main></div>`, { accent });
  }
  if (kind === "hero") {
    return nativeStage(`<span style="font-size:10px;text-transform:uppercase;letter-spacing:.16em;color:${accent}">Launch system</span><strong style="font-size:28px;line-height:1.02;max-width:260px">${title}</strong><span style="color:#94a3b8;font-size:11px;max-width:230px">A copy-ready headline block with product context and action density.</span><div style="display:flex;gap:8px">${chips}</div>`, { accent, minHeight: "170px" });
  }
  if (kind === "cta") {
    return nativeStage(`<div><strong style="display:block;font-size:21px;line-height:1.05">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">Conversion section with primary and secondary paths.</span></div><div style="display:flex;gap:8px;flex-wrap:wrap"><span style="height:34px;min-width:120px;border-radius:999px;background:${accent}"></span><span style="height:34px;min-width:92px;border-radius:999px;background:rgba(255,255,255,.1)"></span></div>`, { accent });
  }
  if (kind === "error") {
    return nativeStage(`<div style="display:flex;justify-content:space-between;align-items:start;gap:12px"><strong style="font-size:54px;line-height:.9;color:${accent}">404</strong><span style="width:58px;height:58px;border-radius:50%;background:rgba(255,255,255,.08);border:1px dashed ${accent}66"></span></div><div><strong style="font-size:17px">${title}</strong><span style="display:block;margin-top:7px;color:#94a3b8;font-size:11px">Recover with search, support, or a stable route.</span></div><div style="display:flex;gap:8px">${chips}</div>`, { accent });
  }
  if (kind === "footer") {
    return nativeStage(`<div style="display:grid;grid-template-columns:1.2fr repeat(3,.7fr);gap:12px"><div><strong style="font-size:18px">${title}</strong><div style="margin-top:10px">${uiLines(["84%", "58%"])}</div></div>${[0, 1, 2].map(() => `<div style="display:grid;gap:7px">${uiLines(["72%", "58%", "44%"])}</div>`).join("")}</div><div style="height:1px;background:rgba(255,255,255,.1)"></div><div style="display:flex;justify-content:space-between;gap:10px;color:#94a3b8;font-size:10px"><span>2026 Toolkit</span><span>${labels[0] || "Docs"} / ${labels[1] || "Status"}</span></div>`, { accent });
  }
  if (kind === "bento") {
    return nativeStage(`<div style="display:grid;grid-template-columns:1.25fr .75fr;grid-template-rows:82px 64px;gap:10px"><div style="grid-row:span 2;border-radius:18px;background:linear-gradient(135deg,${accent}44,rgba(255,255,255,.07));padding:13px"><strong style="font-size:17px">${title}</strong><div style="margin-top:12px">${uiLines(["76%", "54%"])}</div></div><div style="border-radius:18px;background:rgba(255,255,255,.07);padding:12px">${uiLines(["66%", "42%"])}</div><div style="border-radius:18px;background:#f8fafc;color:#020617;padding:12px"><strong style="font-size:20px">${labels[0] || "98%"}</strong><span style="display:block;color:#64748b;font-size:10px">${labels[1] || "Signal"}</span></div></div>`, { accent, minHeight: "176px" });
  }
  if (kind === "mega") {
    if (variant === 1) {
      return nativeStage(`<div style="display:grid;grid-template-columns:86px 1fr;gap:10px"><aside style="border-radius:16px;background:#f8fafc;color:#020617;padding:11px;display:grid;gap:7px"><strong style="font-size:12px">Menu</strong>${labels.slice(0, 3).map((label) => `<span style="font-size:10px;color:#64748b">${label}</span>`).join("")}</aside><div style="border-radius:18px;background:rgba(255,255,255,.06);padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:9px">${[0, 1, 2, 3].map((index) => `<span style="border-radius:13px;background:${index === 0 ? accent : "rgba(255,255,255,.07)"};min-height:38px"></span>`).join("")}</div></div><strong style="font-size:13px">${title}</strong>`, { accent, minHeight: "176px" });
    }
    if (variant === 2) {
      return nativeStage(`<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:16px;background:#f8fafc;color:#020617"><strong style="font-size:13px">Suite</strong><span style="height:24px;width:80px;border-radius:999px;background:${accent}"></span></div><div style="display:grid;grid-template-columns:1.35fr .65fr;gap:10px"><div style="border-radius:18px;background:rgba(255,255,255,.06);padding:12px">${uiLines(["82%", "66%", "44%"])}</div><div style="border-radius:18px;background:${accent};color:#020617;padding:12px"><strong style="font-size:12px">${labels[0] || "Route"}</strong></div></div>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:16px;background:#f8fafc;color:#020617"><strong style="font-size:13px">Northstar</strong><div style="display:flex;gap:7px">${uiChips(labels.slice(0, 3), accent)}</div></div><div style="display:grid;grid-template-columns:1fr 1fr .85fr;gap:9px;padding:12px;border-radius:18px;background:rgba(255,255,255,.06)">${[0, 1].map((index) => `<div style="display:grid;gap:8px"><strong style="font-size:11px;color:${accent}">${labels[index] || "Group"}</strong>${uiLines(["88%", "66%", "48%"])}</div>`).join("")}<div style="border-radius:14px;background:${accent};color:#020617;padding:11px"><strong style="font-size:12px">${title}</strong><span style="display:block;margin-top:7px;font-size:10px;opacity:.72">Featured route</span></div></div>`, { accent, minHeight: "176px" });
  }
  if (kind === "searchNav") {
    if (variant === 1) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1fr 44px;gap:9px"><div style="height:38px;border-radius:13px;background:#f8fafc;color:#020617;padding:11px 13px;font-size:10px">/${labels[0] || "search"}</div><span style="border-radius:13px;background:${accent}"></span></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:9px">${labels.slice(1, 5).map((label, index) => `<span style="height:35px;border-radius:12px;background:${index === 0 ? accent : "rgba(255,255,255,.07)"};color:${index === 0 ? "#020617" : "#e5e7eb"};display:grid;place-items:center;font-size:10px;font-weight:800">${label}</span>`).join("")}</div>`, { accent, minHeight: "176px" });
    }
    if (variant === 2) {
      return nativeStage(`<div style="display:grid;grid-template-columns:72px 1fr;gap:10px"><aside style="border-radius:18px;background:${accent};color:#020617;padding:10px;display:grid;gap:6px;font-size:10px;font-weight:900">${labels.slice(1, 4).join("<br>")}</aside><main style="border-radius:18px;background:#f8fafc;color:#020617;padding:12px"><strong style="font-size:13px">${title}</strong><div style="margin-top:10px">${uiLines(["84%", "62%"], "#cbd5e1")}</div></main></div><span style="height:32px;border-radius:999px;background:rgba(255,255,255,.08)"></span>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:80px 1fr 54px;gap:9px;align-items:center"><strong style="font-size:13px">Atlas</strong><div style="height:34px;border-radius:999px;background:#f8fafc;color:#020617;padding:9px 13px;font-size:11px;display:flex;align-items:center;gap:8px"><span style="width:9px;height:9px;border:2px solid #64748b;border-radius:50%"></span>${labels[0] || "Search"}</div><span style="height:34px;border-radius:999px;background:${accent}"></span></div><div style="display:grid;grid-template-columns:82px 1fr;gap:10px"><aside style="border-radius:16px;background:rgba(255,255,255,.07);padding:10px;display:grid;gap:7px">${uiChips(labels.slice(1, 4), accent)}</aside><main style="border-radius:16px;background:rgba(255,255,255,.045);padding:12px">${uiLines(["80%", "62%", "42%"])}</main></div>`, { accent, minHeight: "176px" });
  }
  if (kind === "announcement") {
    if (variant === 1) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1fr 78px;gap:10px;align-items:center"><div style="padding:11px 13px;border-radius:16px;background:${accent};color:#020617;font-size:10px;font-weight:900">${labels[0] || "Update"}</div><span style="height:38px;border-radius:16px;background:#f8fafc"></span></div><div style="border-radius:18px;background:rgba(255,255,255,.07);padding:12px"><strong style="font-size:14px">${title}</strong><div style="margin-top:10px">${uiLines(["74%", "52%"])}</div></div>`, { accent, minHeight: "166px" });
    }
    if (variant === 2) {
      return nativeStage(`<div style="height:30px;border-radius:999px;background:rgba(255,255,255,.08);display:flex;align-items:center;padding:0 10px;gap:8px"><span style="width:8px;height:8px;border-radius:50%;background:${accent}"></span><strong style="font-size:10px">${labels[0] || "Live"}</strong></div><div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border-radius:16px;background:#f8fafc;color:#020617"><strong style="font-size:13px">${title}</strong><span style="width:48px;height:24px;border-radius:999px;background:${accent}"></span></div><div style="display:flex;gap:8px">${uiChips(labels.slice(1, 4), accent)}</div>`, { accent, minHeight: "166px" });
    }
    return nativeStage(`<div style="padding:8px 12px;border-radius:999px;background:${accent};color:#020617;font-size:10px;font-weight:900;text-align:center">${labels[0] || "New update"} - ${labels[1] || "Read more"}</div><div style="display:flex;align-items:center;justify-content:space-between;padding:11px 12px;border-radius:16px;background:#f8fafc;color:#020617"><strong style="font-size:13px">Waypoint</strong><div style="display:flex;gap:8px">${uiLines(["46px", "38px", "54px"], "#cbd5e1")}</div><span style="width:58px;height:26px;border-radius:999px;background:#020617"></span></div><div style="display:flex;gap:8px;color:#94a3b8;font-size:10px">${labels.slice(2, 5).map((label) => `<span>${label}</span>`).join("")}</div>`, { accent, minHeight: "166px" });
  }
  if (kind === "headlineGrid") {
    if (variant === 1) {
      return nativeStage(`<div style="display:grid;gap:12px;text-align:center;justify-items:center"><strong style="display:block;font-size:32px;line-height:.94;letter-spacing:0;max-width:300px">${title}</strong><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${uiChips(labels.slice(0, 3), accent)}</div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${["01", "02", "03"].map((step, index) => `<span style="height:42px;border-radius:16px;background:${index === 1 ? accent : "rgba(255,255,255,.075)"};color:${index === 1 ? "#020617" : "#e5e7eb"};display:grid;place-items:center;font-size:11px;font-weight:900">${step}</span>`).join("")}</div>`, { accent, minHeight: "186px" });
    }
    if (variant === 2) {
      return nativeStage(`<div style="display:grid;grid-template-columns:74px 1fr;gap:14px;align-items:start"><span style="font-size:42px;line-height:.9;color:${accent};font-weight:900">H1</span><div><strong style="display:block;font-size:27px;line-height:.98">${title}</strong><span style="display:block;margin-top:9px;color:#94a3b8;font-size:11px">Editorial headline frame with compact proof rail.</span></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><span style="height:36px;border-radius:999px;background:${accent}"></span><span style="height:36px;border-radius:999px;background:rgba(255,255,255,.08)"></span></div>`, { accent, minHeight: "186px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:1.15fr .85fr;gap:14px;align-items:end"><div><strong style="display:block;font-size:30px;line-height:.96;letter-spacing:0;max-width:260px">${title}</strong><span style="display:block;margin-top:10px;color:#94a3b8;font-size:11px;line-height:1.55">Original headline layout with proof, action and category rhythm.</span></div><div style="display:grid;gap:8px">${uiChips(labels.slice(0, 3), accent)}<span style="height:54px;border-radius:18px;background:linear-gradient(135deg,${accent}55,rgba(255,255,255,.08))"></span></div></div>`, { accent, minHeight: "186px" });
  }
  if (kind === "buyCta") {
    if (variant === 1) {
      return nativeStage(`<div style="padding:13px;border-radius:18px;background:#f8fafc;color:#020617;display:flex;align-items:center;justify-content:space-between;gap:12px"><div><strong style="font-size:16px">${title}</strong><span style="display:block;margin-top:5px;color:#64748b;font-size:10px">${labels[0] || "Offer"} included</span></div><strong style="font-size:27px">$49</strong></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">${labels.slice(0, 3).map((label, index) => `<span style="height:42px;border-radius:15px;background:${index === 0 ? accent : "rgba(255,255,255,.075)"};color:${index === 0 ? "#020617" : "#e5e7eb"};display:grid;place-items:center;font-size:10px;font-weight:900">${label}</span>`).join("")}</div>`, { accent, minHeight: "176px" });
    }
    if (variant === 2) {
      return nativeStage(`<div><strong style="display:block;font-size:22px;line-height:1.04">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">Plan selector with highlighted conversion path.</span></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${["Free", labels[0] || "Pro", "Scale"].map((label, index) => `<span style="min-height:58px;border-radius:17px;background:${index === 1 ? accent : "rgba(255,255,255,.075)"};color:${index === 1 ? "#020617" : "#e5e7eb"};padding:10px;display:grid;align-content:space-between;font-size:10px;font-weight:900"><b>${label}</b><small style="opacity:.65">$${index === 0 ? "0" : index === 1 ? "29" : "99"}</small></span>`).join("")}</div>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:1fr 92px;gap:12px;align-items:stretch"><div><strong style="display:block;font-size:22px;line-height:1.04">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">Purchase-ready block with price, proof and secondary route.</span></div><div style="border-radius:18px;background:#f8fafc;color:#020617;padding:12px;display:grid;align-content:center;text-align:center"><span style="font-size:10px;color:#64748b">${labels[0] || "Plan"}</span><strong style="font-size:23px">$29</strong></div></div><div style="display:flex;gap:8px;flex-wrap:wrap"><span style="height:34px;min-width:124px;border-radius:999px;background:${accent}"></span><span style="height:34px;min-width:94px;border-radius:999px;background:rgba(255,255,255,.1)"></span></div>`, { accent, minHeight: "176px" });
  }
  if (kind === "downloadCta") {
    if (variant === 1) {
      return nativeStage(`<div style="display:grid;grid-template-columns:76px 1fr;gap:12px;align-items:center"><span style="height:76px;border-radius:20px;background:${accent};display:grid;place-items:center;color:#020617;font-size:22px;font-weight:900">ZIP</span><div><strong style="display:block;font-size:21px;line-height:1.05">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">Packaged resource with platform and file signals.</span></div></div><div style="display:flex;gap:8px;flex-wrap:wrap">${uiChips(labels.slice(0, 3), accent)}</div>`, { accent, minHeight: "176px" });
    }
    if (variant === 2) {
      return nativeStage(`<div><strong style="display:block;font-size:20px;line-height:1.06">${title}</strong><span style="display:block;margin-top:7px;color:#94a3b8;font-size:11px">Developer-style download block with package rows.</span></div><div style="display:grid;gap:7px">${labels.slice(0, 3).map((label, index) => `<span style="height:28px;border-radius:10px;background:${index === 0 ? accent : "rgba(255,255,255,.075)"};color:${index === 0 ? "#020617" : "#e5e7eb"};display:flex;align-items:center;padding:0 10px;font-family:monospace;font-size:10px;font-weight:800">/${label.toLowerCase()}</span>`).join("")}</div>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div style="display:flex;align-items:center;justify-content:space-between;gap:12px"><div><strong style="display:block;font-size:21px;line-height:1.06">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">${labels[0] || "Template"} package ready for copy.</span></div><span style="width:58px;height:58px;border-radius:18px;background:${accent};box-shadow:0 16px 34px ${accent}33"></span></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${labels.slice(0, 3).map((label) => `<span style="height:32px;border-radius:12px;background:rgba(255,255,255,.075);display:grid;place-items:center;font-size:10px;font-weight:800">${label}</span>`).join("")}</div>`, { accent, minHeight: "176px" });
  }
  if (kind === "newsletterForm") {
    if (variant === 1) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1fr 70px;gap:12px;align-items:center"><div><strong style="display:block;font-size:22px;line-height:1.05">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">Inline capture with compact trust chips.</span></div><span style="height:70px;border-radius:22px;background:linear-gradient(135deg,${accent},rgba(255,255,255,.08))"></span></div><div style="height:38px;border-radius:13px;background:#f8fafc;color:#64748b;padding:12px 14px;font-size:10px">work@company.com</div>`, { accent, minHeight: "176px" });
    }
    if (variant === 2) {
      return nativeStage(`<div style="padding:14px;border-radius:18px;background:#f8fafc;color:#020617"><strong style="display:block;font-size:18px;line-height:1.05">${title}</strong><div style="display:grid;grid-template-columns:1fr 74px;gap:8px;margin-top:12px"><span style="height:34px;border-radius:999px;background:#e2e8f0"></span><span style="height:34px;border-radius:999px;background:${accent}"></span></div></div><div style="display:flex;gap:8px">${uiChips(labels.slice(0, 3), accent)}</div>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div><strong style="display:block;font-size:22px;line-height:1.05">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">Capture form with benefit copy and low-friction submit path.</span></div><div style="display:grid;grid-template-columns:1fr 86px;gap:8px"><span style="height:36px;border-radius:999px;background:#f8fafc;color:#64748b;padding:11px 14px;font-size:10px">email@studio.io</span><span style="height:36px;border-radius:999px;background:${accent}"></span></div><div style="display:flex;gap:8px">${uiChips(labels.slice(0, 3), accent)}</div>`, { accent, minHeight: "176px" });
  }
  if (kind === "creative404") {
    if (variant === 1) {
      return nativeStage(`<div style="display:grid;place-items:center;text-align:center;gap:8px"><span style="width:96px;height:96px;border-radius:50%;border:16px solid ${accent};display:grid;place-items:center;color:#fff;font-size:22px;font-weight:900;box-shadow:0 0 0 12px ${accent}18">404</span><strong style="font-size:18px">${title}</strong></div><div style="display:flex;gap:8px;justify-content:center">${chips}</div>`, { accent, minHeight: "190px", justify: "center" });
    }
    if (variant === 2) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1fr 88px;gap:12px;align-items:stretch"><div><strong style="display:block;font-size:23px;line-height:1">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">Search-led recovery with clear next paths.</span></div><strong style="font-size:46px;color:${accent};line-height:.9;text-align:right">404</strong></div><div style="height:36px;border-radius:999px;background:#f8fafc;color:#64748b;padding:11px 14px;font-size:10px">Search for a page</div>`, { accent, minHeight: "190px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:92px 1fr;gap:14px;align-items:center"><strong style="font-size:62px;line-height:.85;color:${accent}">404</strong><div><strong style="display:block;font-size:20px;line-height:1.05">${title}</strong><span style="display:block;margin-top:8px;color:#94a3b8;font-size:11px">A memorable dead-end with useful next routes.</span></div></div><div style="height:52px;border-radius:18px;background:repeating-linear-gradient(135deg,${accent}55 0 10px,rgba(255,255,255,.06) 10px 20px)"></div><div style="display:flex;gap:8px">${chips}</div>`, { accent, minHeight: "190px" });
  }
  if (kind === "industryError") {
    if (variant === 1) {
      return nativeStage(`<div style="display:grid;grid-template-columns:70px 1fr;gap:12px;align-items:center"><span style="height:70px;border-radius:22px;background:${accent};color:#020617;display:grid;place-items:center;font-size:18px;font-weight:900">${labels[0] || "404"}</span><div><strong style="font-size:20px;line-height:1.05">${title}</strong><span style="display:block;margin-top:7px;color:#94a3b8;font-size:11px">Context-aware recovery surface.</span></div></div><div style="display:flex;gap:8px;flex-wrap:wrap">${uiChips(labels.slice(0, 3), accent)}</div>`, { accent, minHeight: "176px" });
    }
    if (variant === 2) {
      return nativeStage(`<div><span style="font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:${accent}">${labels[0] || "Industry"}</span><strong style="display:block;margin-top:7px;font-size:21px;line-height:1.05">${title}</strong></div><div style="display:grid;gap:7px">${["Go home", "Open support", "Search", "Status"].map((label, index) => `<span style="height:28px;border-radius:999px;background:${index === 0 ? accent : "rgba(255,255,255,.07)"};color:${index === 0 ? "#020617" : "#e5e7eb"};display:flex;align-items:center;padding:0 11px;font-size:10px;font-weight:800">${label}</span>`).join("")}</div>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div style="display:flex;justify-content:space-between;gap:12px;align-items:start"><div><span style="font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:${accent}">${labels[0] || "Industry"}</span><strong style="display:block;margin-top:7px;font-size:20px;line-height:1.05">${title}</strong></div><span style="width:52px;height:52px;border-radius:17px;background:${accent}26;border:1px solid ${accent}55"></span></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${["Primary route", "Support", "Search", "Status"].map((label, index) => `<span style="height:30px;border-radius:12px;background:${index === 0 ? accent : "rgba(255,255,255,.07)"};color:${index === 0 ? "#020617" : "#e5e7eb"};display:grid;place-items:center;font-size:10px;font-weight:800">${label}</span>`).join("")}</div>`, { accent, minHeight: "176px" });
  }
  if (kind === "typeFooter") {
    if (variant === 1) {
      return nativeStage(`<div style="display:flex;align-items:end;justify-content:space-between;gap:14px"><strong style="font-size:38px;line-height:.82;letter-spacing:0">${title}</strong><span style="writing-mode:vertical-rl;color:${accent};font-size:10px;text-transform:uppercase;letter-spacing:.16em">${labels[0] || "Footer"}</span></div><div style="height:1px;background:${accent}55"></div><div style="display:flex;justify-content:space-between;gap:8px;color:#94a3b8;font-size:10px">${labels.slice(0, 4).map((label) => `<span>${label}</span>`).join("")}</div>`, { accent, minHeight: "176px" });
    }
    if (variant === 2) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><div><strong style="font-size:28px;line-height:.9">${title}</strong></div><div style="display:grid;gap:7px">${labels.slice(0, 4).map((label) => `<span style="height:22px;border-radius:999px;background:rgba(255,255,255,.075);padding:6px 9px;font-size:9px;color:#94a3b8">${label}</span>`).join("")}</div></div><div style="height:38px;border-radius:16px;background:linear-gradient(90deg,${accent}55,rgba(255,255,255,.05))"></div>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div><strong style="display:block;font-size:34px;line-height:.88;letter-spacing:0">${title}</strong><div style="margin-top:12px">${uiLines(["86%", "58%"])}</div></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:9px">${labels.slice(0, 4).map((label) => `<span style="font-size:10px;color:#94a3b8">${label}</span>`).join("")}</div><div style="height:1px;background:rgba(255,255,255,.12)"></div>`, { accent, minHeight: "176px" });
  }
  if (kind === "cardFooter") {
    if (variant === 1) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1fr 86px;gap:10px"><div style="border-radius:18px;background:#f8fafc;color:#020617;padding:13px"><strong style="font-size:15px">${title}</strong><span style="display:block;margin-top:18px;font-size:10px;color:#64748b">${labels[0] || "Footer"}</span></div><div style="border-radius:18px;background:${accent};color:#020617;padding:12px;display:grid;place-items:center;font-size:11px;font-weight:900">${labels[1] || "CTA"}</div></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${[0, 1, 2, 3].map(() => `<span style="height:22px;border-radius:999px;background:rgba(255,255,255,.075)"></span>`).join("")}</div>`, { accent, minHeight: "176px" });
    }
    if (variant === 2) {
      return nativeStage(`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${labels.slice(0, 3).map((label, index) => `<div style="min-height:62px;border-radius:18px;background:${index === 0 ? accent : "rgba(255,255,255,.075)"};color:${index === 0 ? "#020617" : "#e5e7eb"};padding:11px"><strong style="font-size:12px">${label}</strong></div>`).join("")}</div><div><strong style="font-size:15px">${title}</strong><div style="margin-top:8px">${uiLines(["80%", "54%"])}</div></div>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">${[0, 1].map((index) => `<div style="border-radius:18px;background:${index === 0 ? accent : "rgba(255,255,255,.075)"};color:${index === 0 ? "#020617" : "#e5e7eb"};padding:13px"><strong style="font-size:14px">${labels[index] || "Card"}</strong><span style="display:block;margin-top:18px;font-size:10px;opacity:.7">Footer action</span></div>`).join("")}</div><div style="display:grid;grid-template-columns:1.2fr repeat(3,.65fr);gap:10px;align-items:end">${[0, 1, 2, 3].map(() => `<div>${uiLines(["82%", "64%"])}</div>`).join("")}</div>`, { accent, minHeight: "176px" });
  }
  if (kind === "dashboardBento") {
    if (variant === 1) {
      return nativeStage(`<div style="display:grid;grid-template-columns:.75fr 1.25fr;grid-template-rows:58px 84px;gap:9px"><div style="border-radius:18px;background:${accent};color:#020617;padding:12px"><strong style="font-size:16px">${labels[0] || "KPI"}</strong></div><div style="border-radius:18px;background:#f8fafc;color:#020617;padding:12px"><strong style="font-size:14px">${title}</strong><span style="display:block;margin-top:7px;color:#64748b;font-size:10px">Overview</span></div><div style="grid-column:span 2;border-radius:18px;background:rgba(255,255,255,.07);padding:12px">${uiLines(["80%", "62%", "44%"])}</div></div>`, { accent, minHeight: "176px" });
    }
    if (variant === 2) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px"><div style="min-height:92px;border-radius:20px;background:linear-gradient(135deg,${accent}55,rgba(255,255,255,.08));padding:13px"><strong style="font-size:15px">${title}</strong></div><div style="display:grid;gap:9px"><span style="border-radius:16px;background:#f8fafc;color:#020617;padding:11px;font-size:18px;font-weight:900">${labels[0] || "98%"}</span><span style="border-radius:16px;background:${accent};color:#020617;padding:11px;font-size:12px;font-weight:900">${labels[1] || "Live"}</span></div></div><div style="height:32px;border-radius:14px;background:rgba(255,255,255,.075)"></div>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:62px 78px;gap:9px"><div style="grid-column:span 2;border-radius:18px;background:#f8fafc;color:#020617;padding:12px"><strong style="font-size:18px">${labels[0] || "82%"}</strong><span style="display:block;color:#64748b;font-size:10px">Live metric</span></div><div style="border-radius:18px;background:${accent};color:#020617;padding:12px"><strong style="font-size:14px">${labels[1] || "Queue"}</strong></div><div style="border-radius:18px;background:rgba(255,255,255,.07);padding:12px">${uiLines(["70%", "44%"])}</div><div style="grid-column:span 2;border-radius:18px;background:linear-gradient(90deg,${accent}55,rgba(255,255,255,.07));padding:12px"><strong style="font-size:13px">${title}</strong></div></div>`, { accent, minHeight: "176px" });
  }
  if (kind === "mediaBento") {
    if (variant === 1) {
      return nativeStage(`<div style="display:grid;grid-template-columns:1.2fr .8fr;gap:10px"><div style="min-height:116px;border-radius:20px;background:linear-gradient(145deg,${accent}66,rgba(255,255,255,.07));padding:14px"><strong style="font-size:17px">${title}</strong><div style="margin-top:12px">${uiLines(["74%", "48%"])}</div></div><div style="display:grid;gap:10px"><span style="border-radius:16px;background:#f8fafc"></span><span style="border-radius:16px;background:${accent}"></span></div></div>`, { accent, minHeight: "176px" });
    }
    if (variant === 2) {
      return nativeStage(`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:9px"><span style="height:70px;border-radius:18px;background:${accent}"></span><span style="height:70px;border-radius:18px;background:#f8fafc"></span><span style="height:70px;border-radius:18px;background:rgba(255,255,255,.075)"></span></div><div><strong style="font-size:18px">${title}</strong><span style="display:block;margin-top:7px;color:#94a3b8;font-size:11px">${labels[0] || "Media"} composition with modular cards.</span></div>`, { accent, minHeight: "176px" });
    }
    return nativeStage(`<div style="display:grid;grid-template-columns:.8fr 1.2fr;grid-template-rows:74px 74px;gap:10px"><div style="grid-row:span 2;border-radius:20px;background:linear-gradient(160deg,${accent},#111827);padding:13px;color:#020617"><strong style="font-size:15px">${labels[0] || "Media"}</strong></div><div style="border-radius:18px;background:rgba(255,255,255,.075);padding:13px"><strong style="font-size:15px">${title}</strong><div style="margin-top:10px">${uiLines(["78%", "54%"])}</div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><span style="border-radius:16px;background:#f8fafc"></span><span style="border-radius:16px;background:${accent}55"></span></div></div>`, { accent, minHeight: "176px" });
  }

  return nativeStage(`<strong style="font-size:18px">${title}</strong><div style="display:grid;gap:8px">${rows}</div><div style="display:flex;gap:8px">${chips}</div>`, { accent });
}

function nativeCard(config, defaults = {}) {
  const resolved = { accent: "#c2a4ff", labels: [], source: "Native", previewMode: "stack", ...defaults, ...config };
  const preview = resolved.preview || renderProductPreview(resolved.kind, resolved.previewTitle || resolved.title, resolved.labels, resolved.accent);
  return {
    ...resolved,
    preview,
    html: resolved.html || preview,
  };
}

function nativeCards(items, defaults = {}) {
  return items.map((item, index) => nativeCard({ priority: 20 + index, ...item }, defaults));
}

function addSeraCatalog() {
  addToolkitCards("#buttons .btn-g", [
    {
      source: "Sera UI",
      title: "Ripple Button",
      description: "Rounded action with inline ripple, icon slots and loading state.",
      preview: `<button style="position:relative;overflow:hidden;padding:12px 18px;border-radius:12px;background:#f8fafc;color:#020617;border:0;font-weight:800;box-shadow:0 10px 24px rgba(15,23,42,.18)">Click me<span style="position:absolute;inset:auto auto -18px -10px;width:44px;height:44px;border-radius:50%;background:rgba(15,23,42,.1)"></span></button>`,
      html: `import Button from "@/components/sera-ui/02-buttons/button/button";\n\n<Button variant="default" iconRight={<ArrowRight />}>Click me</Button>`,
    },
    {
      source: "Sera UI",
      title: "Shimmer Button",
      description: "Primary CTA with sweeping sheen for upgrade and checkout moments.",
      preview: `<button style="position:relative;overflow:hidden;padding:12px 20px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:#0f172a;color:#fff;font-weight:700">Upgrade<span style="position:absolute;inset:-18px auto -18px -40px;width:28px;background:rgba(255,255,255,.32);transform:rotate(14deg)"></span></button>`,
      html: `import ShimmerButton from "@/components/sera-ui/02-buttons/shimmer/shimmer";\n\n<ShimmerButton shimmerColor="#ffffff">Upgrade</ShimmerButton>`,
    },
  ]);

  addToolkitCards("#textfx .tx-g", [
    {
      source: "Sera UI",
      title: "Flip Words",
      description: "Hero copy that flips through stack, framework or role words.",
      previewMode: "stack",
      preview: `<strong style="font-size:28px;color:#fff;line-height:1.1">Build with <span style="display:inline-block;min-width:80px;color:#38bdf8">React</span></strong><div class="kit-row"><span class="kit-pill">Next.js</span><span class="kit-pill">TypeScript</span><span class="kit-pill">Tailwind</span></div>`,
      html: `import FlipWords from "@/components/sera-ui/05-text/flipwords/flipwords";\n\n<FlipWords words={["React", "Next.js", "TypeScript", "Tailwind"]} />`,
    },
    {
      source: "Sera UI",
      title: "Decrypting Text",
      description: "Hacker-style reveal for labels, easter eggs and interactive prompts.",
      previewMode: "stack",
      preview: `<span style="font-family:monospace;font-size:22px;color:#4ade80;letter-spacing:.08em">HELLO_W0RLD</span><span style="font-size:11px;color:#94a3b8">Hover trigger friendly</span>`,
      html: `import DecryptingText from "@/components/sera-ui/05-text/decrypting/decrypting";\n\n<DecryptingText text="HELLO WORLD" onHover />`,
    },
    {
      source: "Sera UI",
      title: "Number Ticker",
      description: "Animated metric counter with prefix, suffix and in-view trigger.",
      previewMode: "stack",
      preview: `<strong style="font-size:32px;color:#fff">$71,897</strong><span style="color:#4ade80;font-size:11px">+12.4% this month</span>`,
      html: `import NumberTicker from "@/components/sera-ui/05-text/ticker/ticker";\n\n<NumberTicker value={71897} prefix="$" suffix=" MRR" />`,
    },
    {
      source: "Sera UI",
      title: "Aurora Text",
      description: "Animated multi-color headline for launch pages and feature banners.",
      preview: `<strong style="font-size:30px;background:linear-gradient(135deg,#ff0080,#7928ca,#0070f3,#00dfd8);background-size:200% 200%;-webkit-background-clip:text;color:transparent">Aurora</strong>`,
      html: `import AuroraText from "@/components/sera-ui/05-text/aurora/aurora";\n\n<AuroraText>Launch faster</AuroraText>`,
    },
  ]);

  addToolkitCards("#loading .load-g", [
    {
      source: "Sera UI",
      title: "Spinner Classic",
      description: "Default SVG spinner for submit, fetch and sync states.",
      preview: `<div style="width:38px;height:38px;border:4px solid rgba(255,255,255,.12);border-top-color:#38bdf8;border-radius:50%"></div>`,
      html: `import { SpinnerClassic } from "@/components/sera-ui/13-tools/loaders/loaders";\n\n<SpinnerClassic size="md" />`,
    },
    {
      source: "Sera UI",
      title: "Spinner Dots",
      description: "Three-dot typing style loader for chat and async panels.",
      preview: `<div style="display:flex;gap:6px"><span style="width:10px;height:10px;border-radius:50%;background:#fff"></span><span style="width:10px;height:10px;border-radius:50%;background:#c2a4ff"></span><span style="width:10px;height:10px;border-radius:50%;background:#fb8dff"></span></div>`,
      html: `import { SpinnerDots } from "@/components/sera-ui/13-tools/loaders/loaders";\n\n<SpinnerDots size="lg" />`,
    },
    {
      source: "Sera UI",
      title: "Spinner Ring",
      description: "Minimal ring loader for dashboards, modals and utility rails.",
      preview: `<div style="width:42px;height:42px;border-radius:50%;border:4px solid rgba(255,255,255,.12);border-top-color:#4ade80"></div>`,
      html: `import { SpinnerRing } from "@/components/sera-ui/13-tools/loaders/loaders";\n\n<SpinnerRing size="md" />`,
    },
    {
      source: "Sera UI",
      title: "Spinner Pulse",
      description: "Single pulse indicator for lightweight background activity.",
      preview: `<div style="width:38px;height:38px;border-radius:50%;background:#c2a4ff;box-shadow:0 0 0 12px rgba(194,164,255,.1)"></div>`,
      html: `import { SpinnerPulse } from "@/components/sera-ui/13-tools/loaders/loaders";\n\n<SpinnerPulse size="md" />`,
    },
  ]);

  addComponentCards("#components .cp-g", [
    {
      source: "Sera UI",
      title: "Status Badge",
      description: "Compact semantic badge with success, warning and destructive variants.",
      previewMode: "stack",
      preview: `<div class="kit-row"><span class="kit-pill">Default</span><span class="kit-pill" style="background:rgba(74,222,128,.14);color:#4ade80">Active</span><span class="kit-pill" style="background:rgba(244,63,94,.14);color:#fb7185">Error</span></div>`,
      html: `import { Badge } from "@/components/sera-ui/03-badges/badge/badge";\n\n<Badge variant="success">Active</Badge>`,
    },
    {
      source: "Sera UI",
      title: "Toast Notification",
      description: "Dismissible top-right alert stack for feedback and async actions.",
      previewMode: "stack",
      preview: `<div style="display:grid;gap:8px;width:100%"><div style="display:flex;gap:10px;align-items:flex-start;padding:12px;border-radius:14px;background:#0f172a;border:1px solid rgba(74,222,128,.18);color:#fff"><span style="width:10px;height:10px;border-radius:50%;background:#4ade80;box-shadow:0 0 0 6px rgba(74,222,128,.12)"></span><div><strong style="display:block;font-size:13px">Saved</strong><span style="font-size:11px;color:#94a3b8">Changes synced</span></div></div><div style="display:flex;gap:10px;align-items:flex-start;padding:12px;border-radius:14px;background:#111827;border:1px solid rgba(56,189,248,.18);color:#fff"><span style="width:10px;height:10px;border-radius:50%;background:#38bdf8"></span><div><strong style="display:block;font-size:13px">Deploying</strong><span style="font-size:11px;color:#94a3b8">Preview in progress</span></div></div></div>`,
      html: `import { Toaster, toast } from "@/components/sera-ui/03-badges/toast/toast";\n\ntoast.success("Saved", "Changes synced");`,
    },
  ]);

  addComponentCards("#sera-navigation .cp-g", [
    {
      source: "Sera UI",
      title: "Dropdown Menu",
      description: "Animated trigger plus compact menu for inline actions and utility panels.",
      previewMode: "stack",
      preview: `<button style="display:inline-flex;align-items:center;gap:8px;padding:11px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:#111827;color:#fff;font-weight:700">Actions <span style="opacity:.6">v</span></button><div style="display:grid;gap:6px;width:100%;padding:10px;border-radius:14px;background:#0f172a;border:1px solid rgba(255,255,255,.08)"><span class="kit-pill" style="justify-content:flex-start">Edit</span><span class="kit-pill" style="justify-content:flex-start">Duplicate</span><span class="kit-pill" style="justify-content:flex-start">Delete</span></div>`,
      html: `import Dropdown from "@/components/sera-ui/02-buttons/dropdown/dropdown";\n\n<Dropdown trigger="Actions" items={[{ label: "Edit" }, { label: "Delete", danger: true }]} />`,
    },
    {
      source: "Sera UI",
      title: "Tabs",
      description: "Animated tab indicator for profile, settings and docs surfaces.",
      previewMode: "stack",
      preview: `<div style="display:flex;gap:6px;width:100%;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.08)"><span class="kit-pill" style="background:#fff;color:#020617">Profile</span><span class="kit-pill">Billing</span><span class="kit-pill">Usage</span></div><div style="width:100%;height:54px;border-radius:14px;background:rgba(255,255,255,.04)"></div>`,
      html: `import Tabs from "@/components/sera-ui/06-navigation/tabs/tabs";\n\n<Tabs tabs={[{ id: "profile", label: "Profile", content: <Profile /> }]} />`,
    },
    {
      source: "Sera UI",
      title: "Accordion",
      description: "Accessible disclosure rows for FAQs, changelogs and settings.",
      previewMode: "stack",
      preview: `<div style="display:grid;gap:8px;width:100%"><div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-radius:14px;background:#0f172a;border:1px solid rgba(255,255,255,.08);color:#fff"><span>What is Sera UI?</span><span>+</span></div><div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-radius:14px;background:#111827;color:#94a3b8"><span>Is it open source?</span><span>+</span></div></div>`,
      html: `import Accordion from "@/components/sera-ui/07-accordions/accordion/accordion";\n\n<Accordion items={[{ id: "q1", title: "What is Sera UI?", content: "A component library." }]} />`,
    },
    {
      title: "Command Overlay",
      description: "Shortcut-first launcher for docs, search and quick navigation.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:14px;border-radius:16px;background:#0b1120;border:1px solid rgba(255,255,255,.08);color:#fff"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span style="font-size:11px;color:#94a3b8">Search docs</span><span class="kit-pill">Ctrl K</span></div><div style="margin-top:10px;height:10px;border-radius:999px;background:rgba(255,255,255,.08)"></div></div>`,
      html: `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border-radius:16px;background:#0b1120;border:1px solid rgba(255,255,255,.08);color:#fff"><span>Search docs</span><kbd style="padding:4px 8px;border-radius:8px;background:#111827;color:#c2a4ff">Ctrl K</kbd></div>`,
    },
    {
      title: "Breadcrumb Rail",
      description: "Compact path indicator for nested dashboards and documentation.",
      preview: `<nav style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;color:#94a3b8;font-size:12px"><span>Docs</span><span>/</span><span>Components</span><span>/</span><strong style="color:#fff">Navigation</strong></nav>`,
      html: `<nav style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;color:#94a3b8"><a>Docs</a><span>/</span><a>Components</a><span>/</span><strong style="color:#fff">Navigation</strong></nav>`,
    },
  ]);

  addComponentCards("#sera-cards .cp-g", [
    {
      source: "Sera UI",
      title: "Basic Card",
      description: "Reusable card shell with header, content and footer slots.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:16px;border-radius:18px;background:#111827;border:1px solid rgba(255,255,255,.08);color:#fff"><span style="font-size:11px;color:#94a3b8">Analytics</span><strong style="display:block;margin-top:6px;font-size:20px">$12.4k</strong><div style="margin-top:12px;height:8px;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:62%;height:100%;border-radius:999px;background:#c2a4ff"></div></div></div>`,
      html: `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/sera-ui/08-cards/card/card";\n\n<Card><CardHeader><CardTitle>Analytics</CardTitle></CardHeader></Card>`,
    },
    {
      source: "Sera UI",
      title: "Magic Card",
      description: "Spotlight card with cursor-reactive radial glow treatment.",
      preview: `<div style="width:100%;padding:18px;border-radius:18px;background:radial-gradient(circle at 24% 20%,rgba(56,189,248,.22),transparent 32%),radial-gradient(circle at 76% 78%,rgba(194,164,255,.18),transparent 28%),#0f172a;border:1px solid rgba(255,255,255,.08);color:#fff"><strong style="display:block;font-size:18px">Magic surface</strong><span style="font-size:11px;color:#94a3b8">Hover spotlight ready</span></div>`,
      html: `import MagicCard from "@/components/sera-ui/08-cards/magic/magic";\n\n<MagicCard className="p-6">Magic surface</MagicCard>`,
    },
    {
      source: "Sera UI",
      title: "Login Form",
      description: "Animated auth card with email, password and visibility toggle affordance.",
      previewMode: "stack",
      preview: `<div style="display:grid;gap:10px;width:100%;padding:14px;border-radius:18px;background:#0f172a;border:1px solid rgba(255,255,255,.08)"><div style="height:38px;border-radius:12px;background:#111827"></div><div style="height:38px;border-radius:12px;background:#111827"></div><button style="padding:11px 14px;border-radius:12px;border:0;background:#fff;color:#020617;font-weight:800">Sign in</button></div>`,
      html: `import LoginForm from "@/components/sera-ui/08-cards/login/login";\n\n<LoginForm onSubmit={handleLogin} />`,
    },
    {
      title: "Pricing Stack",
      description: "Commercial pricing slab with CTA and compact feature summary.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:16px;border-radius:18px;background:#fff;color:#020617"><span style="font-size:11px;color:#64748b">Pro</span><strong style="display:block;margin-top:8px;font-size:28px">$24</strong><div style="margin-top:12px;display:grid;gap:8px"><div style="height:10px;border-radius:999px;background:#e2e8f0"></div><div style="height:10px;width:78%;border-radius:999px;background:#e2e8f0"></div><button style="padding:10px 12px;border-radius:12px;border:0;background:#0f172a;color:#fff;font-weight:800">Start</button></div></div>`,
      html: `<div style="padding:24px;border-radius:20px;background:#fff;color:#020617"><span style="font-size:12px;color:#64748b">Pro</span><strong style="display:block;margin-top:8px;font-size:40px">$24/mo</strong><button style="margin-top:16px;padding:12px 16px;border-radius:12px;border:0;background:#0f172a;color:#fff;font-weight:800">Start</button></div>`,
    },
    {
      title: "Team List Card",
      description: "Member management card with avatar rows and metadata blocks.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:16px;border-radius:18px;background:#111827;border:1px solid rgba(255,255,255,.08);color:#fff"><strong style="display:block;font-size:15px">Team members</strong><div style="margin-top:12px;display:grid;gap:10px"><div style="display:flex;gap:10px;align-items:center"><span style="width:28px;height:28px;border-radius:50%;background:#374151"></span><div style="display:grid;gap:4px;flex:1"><div style="height:8px;border-radius:999px;background:rgba(255,255,255,.12)"></div><div style="height:8px;width:68%;border-radius:999px;background:rgba(255,255,255,.08)"></div></div></div></div></div>`,
      html: `<div style="padding:20px;border-radius:18px;background:#111827;color:#fff"><h3 style="margin:0 0 12px">Team members</h3><div style="display:flex;gap:12px;align-items:center"><span style="width:36px;height:36px;border-radius:50%;background:#374151"></span><div><strong>Jane Doe</strong><div style="color:#94a3b8">jane@example.com</div></div></div></div>`,
    },
  ]);

  addComponentCards("#sera-sections .cp-g", [
    {
      source: "Sera UI",
      title: "Hero Section",
      description: "Full landing hero with badge, headline, subcopy and dual CTAs.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:18px;border-radius:22px;background:radial-gradient(circle at top,#7c3aed22,transparent 44%),#0b1120;border:1px solid rgba(255,255,255,.08);color:#fff"><span class="kit-pill">Animated components</span><strong style="display:block;margin-top:12px;font-size:22px;line-height:1.05">Build interfaces faster</strong><span style="display:block;margin-top:8px;font-size:11px;color:#94a3b8">React + Next.js + Tailwind</span><div class="kit-row" style="margin-top:14px"><span class="kit-pill" style="background:#fff;color:#020617">Get started</span><span class="kit-pill">GitHub</span></div></div>`,
      html: `import HeroSection from "@/components/sera-ui/12-sections/hero/hero";\n\n<HeroSection />`,
    },
    {
      title: "Feature Hero",
      description: "Product hero with launch framing, value bullets and feature chips.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:18px;border-radius:22px;background:linear-gradient(135deg,#0b1120,#15162c);border:1px solid rgba(255,255,255,.08);color:#fff"><span class="kit-pill">Launch</span><strong style="display:block;margin-top:12px;font-size:22px;line-height:1.05">Ship the next release faster</strong><div class="kit-row" style="margin-top:12px"><span class="kit-pill">Metrics</span><span class="kit-pill">Docs</span><span class="kit-pill">Motion</span></div></div>`,
      html: `<section style="padding:48px;border-radius:28px;background:linear-gradient(135deg,#0b1120,#15162c);color:#fff"><h1 style="margin:0;font-size:48px">Ship the next release faster</h1><p style="margin:12px 0 0;color:#94a3b8">Hero section with launch-ready framing.</p></section>`,
    },
    {
      title: "CTA Banner",
      description: "Wide call-to-action strip for docs, pricing and release pages.",
      preview: `<div style="width:100%;padding:18px;border-radius:20px;background:linear-gradient(135deg,#fff,#e2e8f0);color:#020617"><strong style="display:block;font-size:18px">Ready to build?</strong><span style="display:block;margin-top:8px;font-size:11px;color:#475569">Copy a block and launch the next screen.</span></div>`,
      html: `<section style="padding:28px;border-radius:20px;background:linear-gradient(135deg,#fff,#e2e8f0);color:#020617"><strong style="font-size:24px">Ready to build?</strong><p style="margin:8px 0 0;color:#475569">Copy a block and launch the next screen.</p></section>`,
    },
    {
      title: "Stats Header",
      description: "Upper-page metrics band with chips and supporting narrative.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:18px;border-radius:20px;background:#0f172a;border:1px solid rgba(255,255,255,.08);color:#fff"><div class="kit-row"><span class="kit-pill">Revenue</span><span class="kit-pill">Users</span></div><strong style="display:block;margin-top:12px;font-size:26px">$71,897</strong><span style="display:block;margin-top:6px;color:#4ade80;font-size:11px">+18.4% vs last month</span></div>`,
      html: `<section style="padding:24px;border-radius:20px;background:#0f172a;color:#fff"><div style="display:flex;gap:8px"><span style="padding:6px 10px;border-radius:999px;background:rgba(56,189,248,.14);color:#38bdf8">Revenue</span><span style="padding:6px 10px;border-radius:999px;background:rgba(74,222,128,.14);color:#4ade80">Users</span></div><strong style="display:block;margin-top:12px;font-size:34px">$71,897</strong></section>`,
    },
  ]);

  promoteCards("#buttons .btn-g", (card) => card.querySelector(".kit-source")?.textContent?.trim() === "Sera UI");
  promoteCards("#textfx .tx-g", (card) => card.querySelector(".kit-source")?.textContent?.trim() === "Sera UI");
  promoteCards("#loading .load-g", (card) => card.querySelector(".kit-source")?.textContent?.trim() === "Sera UI");
  promoteCards("#components .cp-g", (card) => card.querySelector(".kit-source")?.textContent?.trim() === "Sera UI");
}

function expandSeraCatalog() {
  const seraDefaults = { source: "Sera UI", catalogSource: "sera-ui", family: "sera", qaStatus: "keep" };

  addComponentCards("#sera-navigation .cp-g", nativeCards([
    { title: "Sidebar Rail", description: "Compact vertical app rail with active state and content shell.", kind: "nav", labels: ["Home", "Data", "Team"], accent: "#38bdf8" },
    { title: "Step Tabs", description: "Process navigation for onboarding, checkout and setup flows.", kind: "nav", labels: ["Plan", "Build", "Ship"], accent: "#4ade80" },
    { title: "Topbar Switcher", description: "Workspace switcher with route groups and compact action slot.", kind: "nav", labels: ["Workspace", "Docs", "API"], accent: "#fb7185" },
  ], seraDefaults));

  addComponentCards("#sera-cards .cp-g", nativeCards([
    { title: "Profile Summary Card", description: "Identity card with status, role and compact action row.", kind: "panel", labels: ["Profile", "Role", "Team"], accent: "#38bdf8" },
    { title: "Billing Snapshot", description: "Invoice and plan state panel for account pages.", kind: "kpi", labels: ["MRR", "Seats", "Usage"], accent: "#4ade80" },
    { title: "Activity Feed Card", description: "Recent activity stack with readable metadata and state chips.", kind: "table", labels: ["Event", "User", "State"], accent: "#facc15" },
  ], seraDefaults));

  addComponentCards("#sera-sections .cp-g", nativeCards([
    { title: "Pricing Hero", description: "Plan-focused hero with price anchor and conversion chips.", kind: "hero", labels: ["Start", "Compare"], accent: "#38bdf8" },
    { title: "Launch Header", description: "Announcement header for release pages and changelog launches.", kind: "hero", labels: ["Read", "Demo"], accent: "#fb7185" },
    { title: "Testimonial Strip", description: "Wide social-proof section with quote, metric and CTA.", kind: "cta", labels: ["Stories", "Proof"], accent: "#4ade80" },
    { title: "Content Split Hero", description: "Split hero composition with narrative left and product proof right.", kind: "bento", labels: ["96%", "Proof"], accent: "#c2a4ff" },
  ], seraDefaults));
}

function addProductCatalog() {
  const productDefaults = { source: "Native Product UI", catalogSource: "native-product-ui", family: "product-ui", qaStatus: "keep" };

  addComponentCards("#dialogs-overlays .cp-g", nativeCards([
    { title: "Centered Modal", description: "Focused modal with title, body and dual action footer.", kind: "modal", labels: ["Cancel", "Confirm"], accent: "#c2a4ff" },
    { title: "Command Overlay", description: "Keyboard-first overlay for search, routes and actions.", kind: "command", labels: ["Search", "Run"], accent: "#38bdf8" },
    { title: "Activity Drawer", description: "Right-side drawer for audit trails and compact detail views.", kind: "drawer", labels: ["Activity", "Audit"], accent: "#4ade80" },
    { title: "Confirm Dialog", description: "Destructive confirmation state with clear primary action.", kind: "modal", labels: ["Keep", "Delete"], accent: "#fb7185" },
    { title: "Stacked Alerts", description: "Layered status notifications for async product feedback.", kind: "table", labels: ["Info", "Warn", "Done"], accent: "#facc15" },
    { title: "Profile Popover", description: "Small account overlay with status and quick actions.", kind: "panel", labels: ["Account", "Billing"], accent: "#a7f3d0" },
    { title: "Slide-over Sheet", description: "Tall sheet layout for checkout, filters and settings.", kind: "drawer", labels: ["Filters", "Apply"], accent: "#f0abfc" },
    { title: "Tour Spotlight", description: "Guided overlay card for onboarding highlights.", kind: "modal", labels: ["Skip", "Next"], accent: "#93c5fd" },
  ], productDefaults));

  addComponentCards("#tables-data .cp-g", nativeCards([
    { title: "Dense Admin Table", description: "Compact table shell with visible status column.", kind: "table", labels: ["Name", "Owner", "State"], accent: "#38bdf8" },
    { title: "KPI Summary Grid", description: "Three-metric dashboard band with trend surface.", kind: "kpi", labels: ["MRR", "Churn", "Leads"], accent: "#4ade80" },
    { title: "List Detail Split", description: "List and detail composition for admin workflows.", kind: "panel", labels: ["List", "Detail"], accent: "#c2a4ff" },
    { title: "Audit Log Table", description: "Operational table with actor, action and severity affordance.", kind: "table", labels: ["Actor", "Action", "Level"], accent: "#facc15" },
    { title: "Revenue Breakdown", description: "Compact financial view with row rhythm and summary chip.", kind: "kpi", labels: ["ARR", "ARPA", "NRR"], accent: "#a7f3d0" },
    { title: "Filterable Table Shell", description: "Table scaffold with filter rail and action control.", kind: "table", labels: ["Filter", "Export"], accent: "#fb7185" },
    { title: "Usage Comparison", description: "Comparison grid for plan limits, usage and quotas.", kind: "table", labels: ["Limit", "Used", "Left"], accent: "#93c5fd" },
    { title: "Timeline Data Rail", description: "Timeline-like data rail for incidents and status logs.", kind: "panel", labels: ["Now", "Queued"], accent: "#f0abfc" },
  ], productDefaults));

  addComponentCards("#empty-states .cp-g", nativeCards([
    { title: "Project Empty State", description: "Friendly workspace zero-state with primary creation path.", kind: "empty", labels: ["Create", "Import"], accent: "#c2a4ff" },
    { title: "Search No Results", description: "Search fallback with retry and filter reset actions.", kind: "empty", labels: ["Reset", "Help"], accent: "#38bdf8" },
    { title: "Upload Success", description: "Positive feedback block for completed file workflows.", kind: "empty", labels: ["View", "Share"], accent: "#4ade80" },
    { title: "Error Recovery Block", description: "Inline error state with strong recovery action.", kind: "error", labels: ["Retry", "Support"], accent: "#fb7185" },
    { title: "Onboarding Checklist", description: "Starter checklist for activation and setup flows.", kind: "panel", labels: ["Invite", "Import", "Ship"], accent: "#facc15" },
    { title: "Offline Notice", description: "Connection-loss state with safe retry messaging.", kind: "error", labels: ["Retry", "Status"], accent: "#93c5fd" },
    { title: "Processing Placeholder", description: "In-progress state for generation or upload queues.", kind: "empty", labels: ["Queued", "Syncing"], accent: "#f0abfc" },
    { title: "Upgrade Prompt", description: "Limit reached state with pricing-aware action path.", kind: "cta", labels: ["Upgrade", "Compare"], accent: "#a7f3d0" },
  ], productDefaults));

  addComponentCards("#panels-settings .cp-g", nativeCards([
    { title: "Account Settings Panel", description: "Two-column account settings shell with side rail.", kind: "panel", labels: ["Profile", "Team"], accent: "#c2a4ff" },
    { title: "Security Sessions", description: "Security panel with session rows and status controls.", kind: "table", labels: ["Device", "IP", "State"], accent: "#38bdf8" },
    { title: "Notification Matrix", description: "Preference grid for email, push and digest controls.", kind: "table", labels: ["Email", "Push", "Digest"], accent: "#4ade80" },
    { title: "Inspector Panel", description: "Right rail inspector with properties and action footer.", kind: "drawer", labels: ["Props", "Save"], accent: "#facc15" },
    { title: "Split Pane Editor", description: "Editor shell with navigation, canvas and inspector.", kind: "panel", labels: ["Layers", "Style"], accent: "#fb7185" },
    { title: "Profile Security Block", description: "Profile and security controls grouped for account pages.", kind: "panel", labels: ["User", "2FA"], accent: "#93c5fd" },
    { title: "Billing Preferences", description: "Billing settings view with plan and invoice summaries.", kind: "kpi", labels: ["Plan", "Seats", "Usage"], accent: "#a7f3d0" },
    { title: "API Keys Manager", description: "Developer settings panel with token rows and revoke action.", kind: "table", labels: ["Key", "Scope", "Last used"], accent: "#f0abfc" },
  ], productDefaults));
}

function addInspirationCatalog() {
  const inspiredDefaults = { source: "Gallery-inspired native", catalogSource: "gallery-inspired-native", family: "inspiration", qaStatus: "keep" };

  addComponentCards("#navigation-patterns .cp-g", nativeCards([
    { title: "Sticky Product Navbar", description: "Fixed product nav with logo, links and primary action.", kind: "nav", labels: ["Product", "Pricing", "Docs"], accent: "#c2a4ff" },
    { title: "Mega Menu Preview", description: "Organized flyout with grouped links and feature slot.", kind: "drawer", labels: ["Platform", "Solutions"], accent: "#38bdf8" },
    { title: "Sidebar App Menu", description: "Vertical navigation for admin and app shells.", kind: "nav", labels: ["Home", "Reports", "Team"], accent: "#4ade80" },
    { title: "Search-first Header", description: "Header where search is the main navigation object.", kind: "command", labels: ["Search", "Open"], accent: "#facc15" },
    { title: "Announcement Bar", description: "Slim promo rail paired with a compact navbar.", kind: "cta", labels: ["Update", "Read"], accent: "#fb7185" },
    { title: "Fullscreen Menu", description: "Large-screen menu stage for editorial and portfolio sites.", kind: "hero", labels: ["Work", "About"], accent: "#93c5fd" },
    { title: "Breadcrumb Path", description: "Secondary navigation for docs and deep product pages.", kind: "nav", labels: ["Docs", "UI", "Nav"], accent: "#a7f3d0" },
    { title: "Progress Tabs", description: "Step navigation with readable progress state.", kind: "nav", labels: ["Draft", "Review", "Ship"], accent: "#f0abfc" },
  ], inspiredDefaults));

  addComponentCards("#hero-headlines .cp-g", nativeCards([
    { title: "AI agents handle sensitive data safely", description: "SaaS-style H1 with trust-first claim and action row.", kind: "hero", labels: ["Start", "Docs"], accent: "#38bdf8" },
    { title: "Build and deploy on a calmer cloud", description: "Developer headline with compact product proof.", kind: "hero", labels: ["Deploy", "Preview"], accent: "#c2a4ff" },
    { title: "Capture. Polish. Done.", description: "Short punchy headline for creator tools.", kind: "hero", labels: ["Record", "Share"], accent: "#fb7185" },
    { title: "Talk to your money", description: "Consumer-fintech headline pattern with clear action density.", kind: "hero", labels: ["Ask", "Track"], accent: "#4ade80" },
    { title: "Your day, planned around energy", description: "Wellness/productivity headline with softer support copy.", kind: "hero", labels: ["Plan", "Focus"], accent: "#facc15" },
    { title: "Digital contracts in minutes", description: "Transactional headline with direct value and CTA.", kind: "cta", labels: ["Create", "Send"], accent: "#93c5fd" },
    { title: "The operating layer for private teams", description: "B2B platform headline with product confidence.", kind: "bento", labels: ["98%", "Secure"], accent: "#a7f3d0" },
    { title: "Never miss a competitor move", description: "Monitoring headline with alert-forward framing.", kind: "hero", labels: ["Monitor", "Alert"], accent: "#f0abfc" },
  ], inspiredDefaults));

  addComponentCards("#cta-blocks .cp-g", nativeCards([
    { title: "Primary Button Cluster", description: "Hero CTA group with strong primary and subtle secondary.", kind: "cta", labels: ["Start", "Demo"], accent: "#c2a4ff" },
    { title: "Call-to-Buy Strip", description: "Commercial CTA block for checkout and plan pages.", kind: "cta", labels: ["Buy", "Compare"], accent: "#4ade80" },
    { title: "Download CTA", description: "Download-focused CTA with file and platform signals.", kind: "cta", labels: ["Mac", "Windows"], accent: "#38bdf8" },
    { title: "Newsletter CTA", description: "Email capture block with compact trust copy.", kind: "command", labels: ["Email", "Join"], accent: "#facc15" },
    { title: "Modal CTA", description: "Small pop-up conversion block with clear accept/decline.", kind: "modal", labels: ["No thanks", "Get it"], accent: "#fb7185" },
    { title: "Pricing CTA", description: "Plan-card CTA with price anchor and action footer.", kind: "kpi", labels: ["Pro", "Seats"], accent: "#a7f3d0" },
    { title: "Free Template CTA", description: "Resource CTA for lead magnets and starter kits.", kind: "empty", labels: ["Copy", "Use"], accent: "#93c5fd" },
    { title: "Inline Upgrade CTA", description: "Small app-surface CTA for feature limits.", kind: "cta", labels: ["Upgrade", "Later"], accent: "#f0abfc" },
  ], inspiredDefaults));

  addComponentCards("#error-pages .cp-g", nativeCards([
    { title: "Minimal 404", description: "Large-number page with one primary recovery action.", kind: "error", labels: ["Home", "Search"], accent: "#c2a4ff" },
    { title: "Typographic Error", description: "Text-led 404 with bold hierarchy and compact links.", kind: "error", labels: ["Docs", "Status"], accent: "#facc15" },
    { title: "Playful Recovery", description: "Friendly lost-page state with light product personality.", kind: "empty", labels: ["Back", "Explore"], accent: "#fb7185" },
    { title: "SaaS Route Missing", description: "Product route fallback with workspace-safe options.", kind: "error", labels: ["Dashboard", "Support"], accent: "#38bdf8" },
    { title: "Search Fallback", description: "404 state that makes search the next best action.", kind: "command", labels: ["Search", "Docs"], accent: "#4ade80" },
    { title: "Support Fallback", description: "Error page with support, status and retry routes.", kind: "error", labels: ["Retry", "Contact"], accent: "#93c5fd" },
    { title: "Permission Missing", description: "Access error state for account or org permissions.", kind: "panel", labels: ["Request", "Switch"], accent: "#a7f3d0" },
    { title: "Maintenance Page", description: "Temporary outage page with status and update action.", kind: "error", labels: ["Status", "Notify"], accent: "#f0abfc" },
  ], inspiredDefaults));

  addComponentCards("#footer-systems .cp-g", nativeCards([
    { title: "Typographic Footer", description: "Large-type closing footer with minimal link groups.", kind: "footer", labels: ["Studio", "Work"], accent: "#c2a4ff" },
    { title: "Sitemap Footer", description: "Dense multi-column sitemap for product libraries.", kind: "footer", labels: ["Docs", "API"], accent: "#38bdf8" },
    { title: "Newsletter Footer", description: "Footer with subscription form and navigation links.", kind: "footer", labels: ["Subscribe", "Weekly"], accent: "#facc15" },
    { title: "App Footer", description: "Compact app footer with status, legal and version metadata.", kind: "footer", labels: ["Status", "v4"], accent: "#4ade80" },
    { title: "Social Footer", description: "Brand footer with social/action row and link groups.", kind: "footer", labels: ["X", "GitHub"], accent: "#fb7185" },
    { title: "Grid Footer", description: "Organized grid footer with brand block and columns.", kind: "footer", labels: ["Grid", "Links"], accent: "#93c5fd" },
    { title: "Legal Footer", description: "Compliance-friendly footer with policies and contact.", kind: "footer", labels: ["Privacy", "Terms"], accent: "#a7f3d0" },
    { title: "Product Footer CTA", description: "Closing footer that keeps a conversion path visible.", kind: "cta", labels: ["Start", "Contact"], accent: "#f0abfc" },
  ], inspiredDefaults));

  addComponentCards("#bento-systems .cp-g", nativeCards([
    { title: "Feature Bento", description: "Asymmetric feature grid with primary and secondary cells.", kind: "bento", labels: ["98%", "Uptime"], accent: "#c2a4ff" },
    { title: "Dashboard Bento", description: "Product dashboard bento with metrics and surface hierarchy.", kind: "bento", labels: ["71k", "MRR"], accent: "#38bdf8" },
    { title: "Stats Bento", description: "Metrics-first bento for proof sections and reports.", kind: "bento", labels: ["12%", "Growth"], accent: "#4ade80" },
    { title: "Media Bento", description: "Mixed media/content bento for launches and portfolios.", kind: "bento", labels: ["4K", "Media"], accent: "#fb7185" },
    { title: "Pricing Bento", description: "Plan and comparison cells arranged for conversion.", kind: "bento", labels: ["$24", "Pro"], accent: "#facc15" },
    { title: "Mobile-safe Bento", description: "Bento geometry that collapses cleanly on narrow screens.", kind: "bento", labels: ["1 col", "Safe"], accent: "#93c5fd" },
    { title: "Launch Bento", description: "Release summary grid with feature, proof and action cells.", kind: "bento", labels: ["New", "Ship"], accent: "#a7f3d0" },
    { title: "Comparison Bento", description: "Before/after bento for product positioning sections.", kind: "bento", labels: ["Before", "After"], accent: "#f0abfc" },
  ], inspiredDefaults));
}

function addDeepInspirationCatalog() {
  const inspiredDefaults = { source: "Gallery-inspired native", catalogSource: "gallery-inspired-native", family: "inspiration", qaStatus: "keep", priority: 36 };

  addComponentCards("#navigation-patterns .cp-g", nativeCards([
    { title: "Floating Pill Nav", description: "Centered floating navigation for premium marketing pages.", kind: "nav", labels: ["Features", "Work", "Book"], accent: "#e9d5ff" },
    { title: "Commerce Category Nav", description: "Ecommerce category strip with offer and search affordance.", kind: "nav", labels: ["New", "Women", "Sale"], accent: "#fdba74" },
    { title: "Agency Case Nav", description: "Portfolio nav with project filters and contact action.", kind: "nav", labels: ["Work", "Studio", "Contact"], accent: "#f9a8d4" },
    { title: "Docs Side Index", description: "Documentation side index with active section and action footer.", kind: "panel", labels: ["Intro", "API", "CLI"], accent: "#bfdbfe" },
  ], inspiredDefaults));

  addComponentCards("#hero-headlines .cp-g", nativeCards([
    { title: "Turn scattered calls into a sales system", description: "B2B operations headline for workflow products.", kind: "hero", labels: ["Route", "Close"], accent: "#fdba74" },
    { title: "Design subscriptions people actually read", description: "Creator/newsletter headline with editorial tone.", kind: "hero", labels: ["Write", "Grow"], accent: "#f9a8d4" },
    { title: "Your backlog, ranked by impact", description: "Product management headline with clear job-to-be-done.", kind: "hero", labels: ["Score", "Plan"], accent: "#bfdbfe" },
    { title: "A calmer checkout for complex carts", description: "Commerce headline for transaction-heavy flows.", kind: "hero", labels: ["Review", "Pay"], accent: "#e9d5ff" },
  ], inspiredDefaults));

  addComponentCards("#cta-blocks .cp-g", nativeCards([
    { title: "Early Access CTA", description: "Invite-only signup block with restrained scarcity.", kind: "cta", labels: ["Join waitlist", "Preview"], accent: "#fdba74" },
    { title: "Consultation CTA", description: "Service CTA with calendar and qualification paths.", kind: "cta", labels: ["Book", "Brief"], accent: "#bfdbfe" },
    { title: "Trial Extension CTA", description: "In-app retention CTA for accounts near expiry.", kind: "panel", labels: ["Extend", "Upgrade"], accent: "#f9a8d4" },
    { title: "App Store CTA", description: "Dual-platform CTA for mobile products and downloads.", kind: "cta", labels: ["iOS", "Android"], accent: "#e9d5ff" },
  ], inspiredDefaults));

  addComponentCards("#error-pages .cp-g", nativeCards([
    { title: "Checkout Failed", description: "Payment failure page with retry and billing support.", kind: "error", labels: ["Retry", "Billing"], accent: "#fdba74" },
    { title: "Invite Expired", description: "Team invite error with request-new-link action.", kind: "error", labels: ["Request", "Login"], accent: "#bfdbfe" },
    { title: "Empty Workspace", description: "Workspace-not-found state that routes users safely.", kind: "empty", labels: ["Switch", "Create"], accent: "#e9d5ff" },
    { title: "Rate Limit Page", description: "Developer-friendly limit page with docs and retry state.", kind: "panel", labels: ["Docs", "Retry"], accent: "#f9a8d4" },
  ], inspiredDefaults));

  addComponentCards("#footer-systems .cp-g", nativeCards([
    { title: "Agency Footer", description: "Studio footer with case links, address and inquiry CTA.", kind: "footer", labels: ["Cases", "Inquire"], accent: "#f9a8d4" },
    { title: "Developer Footer", description: "Docs-first footer with SDK, API and changelog groups.", kind: "footer", labels: ["SDK", "API"], accent: "#bfdbfe" },
    { title: "Marketplace Footer", description: "Commerce footer with category groups and promo strip.", kind: "footer", labels: ["Shop", "Returns"], accent: "#fdba74" },
    { title: "Minimal Product Footer", description: "Lean footer for single-product landing pages.", kind: "footer", labels: ["Privacy", "Contact"], accent: "#e9d5ff" },
  ], inspiredDefaults));

  addComponentCards("#bento-systems .cp-g", nativeCards([
    { title: "Founder Story Bento", description: "Narrative bento with quote, proof and product cells.", kind: "bento", labels: ["Story", "Proof"], accent: "#f9a8d4" },
    { title: "AI Workflow Bento", description: "Workflow bento with prompt, output and automation states.", kind: "bento", labels: ["AI", "Flow"], accent: "#bfdbfe" },
    { title: "Commerce Funnel Bento", description: "Funnel bento with cart, revenue and recovery cells.", kind: "bento", labels: ["Cart", "Lift"], accent: "#fdba74" },
    { title: "Security Proof Bento", description: "Trust bento with audit, encryption and access cells.", kind: "bento", labels: ["SOC2", "2FA"], accent: "#e9d5ff" },
  ], inspiredDefaults));
}

function addExpandedCategoryCatalog() {
  const inspiredDefaults = { source: "Gallery-inspired native", catalogSource: "gallery-inspired-native", family: "inspiration", qaStatus: "keep" };

  addComponentCards("#pricing-sections .cp-g", nativeCards([
    { title: "Three Plan Pricing", description: "Classic three-column plan section with highlighted middle tier.", kind: "kpi", labels: ["Basic", "Pro", "Scale"], accent: "#c2a4ff" },
    { title: "Usage Pricing Band", description: "Usage-based pricing block with quota and overage signals.", kind: "table", labels: ["Usage", "Quota", "Overage"], accent: "#38bdf8" },
    { title: "Enterprise Quote CTA", description: "Enterprise pricing card with contact and proof paths.", kind: "cta", labels: ["Contact", "Security"], accent: "#4ade80" },
    { title: "Freemium Upgrade", description: "In-app upgrade block for accounts hitting limits.", kind: "panel", labels: ["Free", "Pro"], accent: "#facc15" },
    { title: "Comparison Pricing", description: "Compact comparison grid for plan decision pages.", kind: "table", labels: ["Starter", "Pro", "Max"], accent: "#fb7185" },
    { title: "Annual Toggle Pricing", description: "Pricing section with monthly/annual toggle anatomy.", kind: "nav", labels: ["Monthly", "Annual"], accent: "#93c5fd" },
    { title: "Seat Calculator", description: "Plan calculator preview with seats, usage and total.", kind: "panel", labels: ["Seats", "Total"], accent: "#a7f3d0" },
    { title: "Launch Offer Strip", description: "Limited offer pricing strip for campaign pages.", kind: "cta", labels: ["Save 30%", "Start"], accent: "#f0abfc" },
    { title: "Creator Pricing", description: "Simple creator plan card with community and analytics tiers.", kind: "kpi", labels: ["Creator", "Studio"], accent: "#fdba74" },
    { title: "API Pricing Table", description: "Developer pricing table with requests, latency and support rows.", kind: "table", labels: ["Requests", "SLA", "Support"], accent: "#bfdbfe" },
    { title: "Nonprofit Pricing", description: "Mission-friendly pricing section with verification action.", kind: "cta", labels: ["Verify", "Apply"], accent: "#e9d5ff" },
    { title: "Agency Retainer Card", description: "Service pricing card for retainers and implementation packages.", kind: "panel", labels: ["Audit", "Build"], accent: "#f9a8d4" },
  ], inspiredDefaults));

  addComponentCards("#form-patterns .cp-g", nativeCards([
    { title: "Lead Capture Form", description: "Short marketing form with email and primary CTA.", kind: "command", labels: ["Email", "Join"], accent: "#c2a4ff" },
    { title: "Checkout Form", description: "Payment-style form with summary and action footer.", kind: "panel", labels: ["Card", "Pay"], accent: "#38bdf8" },
    { title: "Onboarding Form", description: "Multi-step setup form with progress tabs.", kind: "nav", labels: ["Profile", "Team", "Done"], accent: "#4ade80" },
    { title: "Contact Sales Form", description: "B2B inquiry form with company and budget fields.", kind: "panel", labels: ["Company", "Budget"], accent: "#facc15" },
    { title: "Search Form Hero", description: "Hero search block with query input and filters.", kind: "command", labels: ["Search", "Filter"], accent: "#fb7185" },
    { title: "Newsletter Inline Form", description: "Compact inline form for editorial pages.", kind: "cta", labels: ["Email", "Subscribe"], accent: "#93c5fd" },
    { title: "Feedback Form", description: "Lightweight product feedback card with sentiment choices.", kind: "panel", labels: ["Good", "Issue"], accent: "#a7f3d0" },
    { title: "Upload Form", description: "Upload/dropzone form with processing-ready footer.", kind: "empty", labels: ["Drop", "Browse"], accent: "#f0abfc" },
    { title: "Invite Team Form", description: "Team invitation form with role selector preview.", kind: "panel", labels: ["Email", "Role"], accent: "#fdba74" },
    { title: "Waitlist Form", description: "Scarcity-aware waitlist form with referral signal.", kind: "cta", labels: ["Join", "Refer"], accent: "#bfdbfe" },
    { title: "Password Reset Form", description: "Account recovery form with clear safe action.", kind: "modal", labels: ["Send", "Back"], accent: "#e9d5ff" },
    { title: "Survey Form", description: "Multi-choice survey card with progress and submit row.", kind: "table", labels: ["Q1", "Q2", "Submit"], accent: "#f9a8d4" },
  ], inspiredDefaults));

  addComponentCards("#feature-sections .cp-g", nativeCards([
    { title: "Alternating Feature Row", description: "Two-column feature row with text and proof surface.", kind: "bento", labels: ["Feature", "Proof"], accent: "#c2a4ff" },
    { title: "Process Steps Strip", description: "Three-step process section for onboarding and workflows.", kind: "nav", labels: ["Capture", "Refine", "Ship"], accent: "#38bdf8" },
    { title: "Feature Comparison", description: "Before/after feature section with visual contrast.", kind: "bento", labels: ["Before", "After"], accent: "#4ade80" },
    { title: "Integration Feature", description: "Integration-focused feature row with app tiles.", kind: "table", labels: ["Slack", "GitHub", "API"], accent: "#facc15" },
    { title: "Security Feature", description: "Trust feature block with audit and access states.", kind: "panel", labels: ["Audit", "Access"], accent: "#fb7185" },
    { title: "Analytics Feature", description: "Dashboard feature section with KPI and graph preview.", kind: "kpi", labels: ["MRR", "Usage"], accent: "#93c5fd" },
    { title: "Automation Feature", description: "Automation feature row with trigger/action anatomy.", kind: "nav", labels: ["Trigger", "Action", "Done"], accent: "#a7f3d0" },
    { title: "Collaboration Feature", description: "Team feature block with member and activity previews.", kind: "panel", labels: ["Team", "Comments"], accent: "#f0abfc" },
    { title: "Mobile Feature", description: "Mobile-first feature block with app preview framing.", kind: "bento", labels: ["iOS", "Push"], accent: "#fdba74" },
    { title: "AI Feature Section", description: "AI product feature with prompt, output and feedback cells.", kind: "bento", labels: ["Prompt", "Output"], accent: "#bfdbfe" },
    { title: "Compliance Feature", description: "Compliance feature row with policy and approval states.", kind: "table", labels: ["Policy", "Review", "Pass"], accent: "#e9d5ff" },
    { title: "Performance Feature", description: "Speed-focused feature section with metric proof.", kind: "kpi", labels: ["Latency", "Errors"], accent: "#f9a8d4" },
  ], inspiredDefaults));

  addComponentCards("#social-proof .cp-g", nativeCards([
    { title: "Logo Cloud", description: "Dense logo-cloud trust band with product-safe spacing.", kind: "footer", labels: ["Teams", "Trust"], accent: "#c2a4ff" },
    { title: "Single Testimonial", description: "Large testimonial card with quote and attribution anatomy.", kind: "panel", labels: ["Quote", "Role"], accent: "#38bdf8" },
    { title: "Review Grid", description: "Three-review grid for landing and product pages.", kind: "table", labels: ["5.0", "4.9", "5.0"], accent: "#4ade80" },
    { title: "Metric Proof Band", description: "Social proof band with adoption and performance metrics.", kind: "kpi", labels: ["Users", "Teams", "NPS"], accent: "#facc15" },
    { title: "Case Study Strip", description: "Case-study teaser with customer, result and action.", kind: "cta", labels: ["Read", "Result"], accent: "#fb7185" },
    { title: "Founder Quote", description: "Editorial quote block for founder or customer story pages.", kind: "hero", labels: ["Story", "Proof"], accent: "#93c5fd" },
    { title: "Trust Badges", description: "Compliance and security badge row with readable labels.", kind: "nav", labels: ["SOC2", "GDPR", "ISO"], accent: "#a7f3d0" },
    { title: "Community Proof", description: "Community count block with avatars and action path.", kind: "empty", labels: ["Join", "Discuss"], accent: "#f0abfc" },
    { title: "Press Mentions", description: "Press mention footer band with publication columns.", kind: "footer", labels: ["Press", "Awards"], accent: "#fdba74" },
    { title: "Before After Quote", description: "Comparison proof block anchored by a customer quote.", kind: "bento", labels: ["Before", "After"], accent: "#bfdbfe" },
    { title: "Usage Proof", description: "Usage metrics and trend proof for analytics-led pages.", kind: "kpi", labels: ["Runs", "Saved"], accent: "#e9d5ff" },
    { title: "Wall of Love", description: "Compact testimonial wall with mixed quote lengths.", kind: "table", labels: ["A+", "Loved", "Fast"], accent: "#f9a8d4" },
  ], inspiredDefaults));
}

function addSourceDeepCatalog() {
  const sourceSections = [
    {
      selector: "#nav-static-sticky .cp-g",
      defaults: { source: "Navbar taxonomy", catalogSource: "navbar-gallery-taxonomy", sourcePillar: "navbar", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Fixed SaaS Header", "Sticky product header with doc links, plan link and primary action.", "nav", ["Product", "Docs", "Start"], "#c2a4ff"],
        ["Compact Product Bar", "Low-height navigation bar for dense product marketing pages.", "nav", ["Overview", "Use cases", "Demo"], "#38bdf8"],
        ["Sticky Pricing Rail", "Header that keeps pricing and trial paths visible while scrolling.", "announcement", ["Annual offer", "Compare", "Start"], "#4ade80"],
        ["Transparent Launch Nav", "Overlay-style launch nav that works above visual hero content.", "nav", ["Launch", "Roadmap", "Waitlist"], "#facc15"],
        ["Utility Top Nav", "Support, status and account routes separated from primary nav.", "announcement", ["Status live", "Support", "Login"], "#fb7185"],
        ["Split Action Header", "Balanced nav with product links left and conversion actions right.", "nav", ["Platform", "Pricing", "Book"], "#93c5fd"],
        ["Minimal Portfolio Nav", "Sparse sticky portfolio navigation with work, profile and inquiry links.", "nav", ["Work", "Profile", "Inquire"], "#a7f3d0"],
        ["App Shell Header", "In-app header with workspace switcher, command affordance and user action.", "searchNav", ["Search app", "Workspace", "Account"], "#f0abfc"],
        ["Mobile Sticky Bottom Nav", "Bottom-positioned mobile navigation shell with four durable routes.", "nav", ["Home", "Search", "Saved"], "#fdba74"],
        ["Scroll Progress Nav", "Sticky header with progress indicator for long editorial pages.", "announcement", ["Reading", "Progress", "Share"], "#bfdbfe"],
        ["Marketplace Category Bar", "Horizontal category navigation for shops, templates and resource hubs.", "nav", ["New", "Popular", "Sale"], "#e9d5ff"],
        ["Developer Docs Header", "Docs-first header with search, version switch and quickstart route.", "searchNav", ["Search docs", "v4", "API"], "#f9a8d4"],
      ],
    },
    {
      selector: "#nav-dropdown-mega .cp-g",
      defaults: { source: "Navbar taxonomy", catalogSource: "navbar-gallery-taxonomy", sourcePillar: "navbar", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Platform Mega Menu", "Grouped platform menu with featured product route and supporting links.", "mega", ["Platform", "Workflow", "Security"], "#c2a4ff"],
        ["Solutions Flyout", "Role-based flyout for teams, industries and use-case navigation.", "mega", ["Teams", "Industry", "Use cases"], "#38bdf8"],
        ["Resource Dropdown", "Editorial dropdown with guides, docs, webinars and support routes.", "mega", ["Guides", "Docs", "Events"], "#4ade80"],
        ["Product Suite Mega", "Suite navigation for related products with a highlighted active family.", "mega", ["Suite", "Apps", "Integrations"], "#facc15"],
        ["Industry Mega Menu", "Multi-column industry menu for B2B sites with proof route.", "mega", ["Finance", "Commerce", "Health"], "#fb7185"],
        ["Docs Version Flyout", "Versioned docs dropdown with API, CLI and changelog clusters.", "mega", ["API", "CLI", "Changelog"], "#93c5fd"],
        ["Account Switcher Menu", "Workspace/account flyout with profile, billing and team actions.", "mega", ["Team", "Billing", "Switch"], "#a7f3d0"],
        ["Language Dropdown", "Localization menu with language options and region hints.", "mega", ["English", "Spanish", "French"], "#f0abfc"],
        ["Commerce Department Menu", "Commerce mega menu with categories, offers and support routes.", "mega", ["Shop", "Offers", "Support"], "#fdba74"],
        ["Pricing Feature Mega", "Pricing nav flyout that previews plan features before click-through.", "mega", ["Starter", "Pro", "Scale"], "#bfdbfe"],
        ["Integrations Mega Panel", "Integration browser menu with app groups and developer shortcut.", "mega", ["CRM", "Data", "API"], "#e9d5ff"],
        ["Developer API Flyout", "Developer flyout for SDKs, examples, status and API references.", "mega", ["SDKs", "Examples", "Status"], "#f9a8d4"],
      ],
    },
    {
      selector: "#nav-sidebar-search .cp-g",
      defaults: { source: "Navbar taxonomy", catalogSource: "navbar-gallery-taxonomy", sourcePillar: "navbar", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Search-first Header", "Header where search is the primary route for content-heavy products.", "searchNav", ["Search products", "Recent", "Saved"], "#c2a4ff"],
        ["Command Palette Nav", "Keyboard-forward navigation for apps with many actions and routes.", "command", ["Command", "Routes", "Actions"], "#38bdf8"],
        ["Admin Sidebar Search", "Admin sidebar with scoped search and persistent section groups.", "searchNav", ["Search admin", "Users", "Billing"], "#4ade80"],
        ["Docs Search Rail", "Documentation side rail with local search and active topic state.", "searchNav", ["Search docs", "Guide", "API"], "#facc15"],
        ["Filter Sidebar Menu", "Filter-heavy side navigation for marketplaces and catalogs.", "panel", ["Filters", "Sort", "Apply"], "#fb7185"],
        ["Inbox Navigation Shell", "Mail-style sidebar with search, labels and account state.", "searchNav", ["Search inbox", "Labels", "Archive"], "#93c5fd"],
        ["CRM Left Navigation", "CRM sidebar that combines pipelines, search and pinned records.", "panel", ["Deals", "People", "Tasks"], "#a7f3d0"],
        ["Analytics Console Nav", "Analytics sidebar with dashboards, reports and export shortcuts.", "panel", ["Dashboards", "Reports", "Export"], "#f0abfc"],
        ["Knowledge Base Search", "Support knowledge base header with categories and query focus.", "searchNav", ["Search help", "Billing", "Setup"], "#fdba74"],
        ["Mobile Search Overlay", "Mobile search panel that replaces the navigation stack on demand.", "command", ["Search", "Recent", "Cancel"], "#bfdbfe"],
        ["Role-based Sidebar", "Sidebar that changes emphasis by admin, editor or viewer role.", "panel", ["Admin", "Editor", "Viewer"], "#e9d5ff"],
        ["Canvas Tool Navigation", "Tool-style vertical navigation for editors, canvases and builders.", "panel", ["Layers", "Assets", "Export"], "#f9a8d4"],
      ],
    },
    {
      selector: "#nav-announcement-breadcrumb .cp-g",
      defaults: { source: "Navbar taxonomy", catalogSource: "navbar-gallery-taxonomy", sourcePillar: "navbar", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Release Announcement Bar", "Slim release strip paired with a stable product header.", "announcement", ["v4 shipped", "Read notes", "Docs"], "#c2a4ff"],
        ["Promo Countdown Strip", "Campaign announcement bar with deadline and CTA hierarchy.", "announcement", ["48 hours", "Save", "Plans"], "#38bdf8"],
        ["Maintenance Status Bar", "Status strip for scheduled maintenance and incident updates.", "announcement", ["Scheduled", "Status", "Notify"], "#4ade80"],
        ["Beta Invite Banner", "Invite-only beta banner with secondary preview path.", "announcement", ["Private beta", "Request", "Preview"], "#facc15"],
        ["Breadcrumb Docs Path", "Secondary route trail for deeply nested documentation pages.", "nav", ["Docs", "API", "Auth"], "#fb7185"],
        ["Checkout Step Breadcrumb", "Transactional step trail for cart, details, payment and receipt.", "nav", ["Cart", "Details", "Pay"], "#93c5fd"],
        ["Wizard Progress Nav", "Linear progress navigation for onboarding and setup flows.", "nav", ["Profile", "Team", "Launch"], "#a7f3d0"],
        ["Compliance Trail", "Audit-friendly breadcrumb trail for policy and approval workflows.", "announcement", ["Policy", "Review", "Approve"], "#f0abfc"],
        ["Account Path Trail", "Settings breadcrumb for workspace, account and billing pages.", "nav", ["Workspace", "Account", "Billing"], "#fdba74"],
        ["Course Progress Header", "Learning header with current module and progress route.", "announcement", ["Module 3", "Continue", "Quiz"], "#bfdbfe"],
        ["Changelog Notification Bar", "Product changelog strip with release type and details link.", "announcement", ["New release", "Changes", "Roadmap"], "#e9d5ff"],
        ["Survey Progress Bar", "Questionnaire progress header with step and safe exit action.", "announcement", ["Step 4 of 8", "Save", "Exit"], "#f9a8d4"],
      ],
    },
    {
      selector: "#h1-ai-saas .cp-g",
      defaults: { source: "H1 taxonomy", catalogSource: "h1-gallery-taxonomy", sourcePillar: "h1", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Make every workflow auditable", "Trust-first SaaS H1 for regulated operations teams.", "headlineGrid", ["Audit", "Trace"], "#c2a4ff"],
        ["Your AI copilot for regulated teams", "AI platform headline with compliance and control emphasis.", "headlineGrid", ["Control", "Review"], "#38bdf8"],
        ["Automations that explain their work", "Agentic workflow H1 focused on transparency and handoff.", "headlineGrid", ["Explain", "Approve"], "#4ade80"],
        ["Turn support noise into product signal", "Support analytics headline with product feedback framing.", "headlineGrid", ["Triage", "Learn"], "#facc15"],
        ["One dashboard for every launch risk", "Launch operations headline for status and readiness tools.", "headlineGrid", ["Track", "Ship"], "#fb7185"],
        ["Ship internal tools before lunch", "Internal tooling H1 with speed and practicality.", "headlineGrid", ["Build", "Share"], "#93c5fd"],
        ["Secure data rooms without the spreadsheet", "B2B collaboration headline for deal and diligence rooms.", "headlineGrid", ["Share", "Protect"], "#a7f3d0"],
        ["Forecast capacity before it hurts", "Planning SaaS headline with operational consequence.", "headlineGrid", ["Predict", "Plan"], "#f0abfc"],
        ["Cloud previews for serious product teams", "Developer platform headline for branch and preview workflows.", "headlineGrid", ["Preview", "Deploy"], "#fdba74"],
        ["Reports that write themselves overnight", "Analytics headline with async productivity promise.", "headlineGrid", ["Analyze", "Send"], "#bfdbfe"],
        ["Customer context at the moment of reply", "CX platform H1 with timing and relevance focus.", "headlineGrid", ["Context", "Reply"], "#e9d5ff"],
        ["The calm operating layer for growth teams", "B2B operations headline with quiet-control positioning.", "headlineGrid", ["Plan", "Execute"], "#f9a8d4"],
      ],
    },
    {
      selector: "#h1-commerce-creator .cp-g",
      defaults: { source: "H1 taxonomy", catalogSource: "h1-gallery-taxonomy", sourcePillar: "h1", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Sell the drop before it sells out", "Commerce launch headline with urgency and inventory focus.", "headlineGrid", ["Launch", "Sell"], "#c2a4ff"],
        ["Turn one upload into every channel", "Creator distribution headline for multi-platform publishing.", "headlineGrid", ["Upload", "Distribute"], "#38bdf8"],
        ["A checkout that remembers your customer", "Commerce H1 focused on returning buyers and smoother payment.", "headlineGrid", ["Cart", "Repeat"], "#4ade80"],
        ["Memberships that feel worth renewing", "Subscription creator headline with retention as the value prop.", "headlineGrid", ["Join", "Renew"], "#facc15"],
        ["Your catalog, styled in minutes", "Commerce builder headline for fast visual merchandising.", "headlineGrid", ["Style", "Publish"], "#fb7185"],
        ["Download-ready assets for every campaign", "Resource product headline for asset kits and campaign teams.", "headlineGrid", ["Download", "Campaign"], "#93c5fd"],
        ["Launch paid templates without the mess", "Template marketplace headline for creators selling assets.", "headlineGrid", ["Template", "Sell"], "#a7f3d0"],
        ["Book clients from your best ideas", "Service creator headline for inquiry-led portfolio pages.", "headlineGrid", ["Pitch", "Book"], "#f0abfc"],
        ["Create once, bundle everywhere", "Creator tooling H1 for reuse, packaging and publishing.", "headlineGrid", ["Create", "Bundle"], "#fdba74"],
        ["Your studio storefront in one page", "Portfolio commerce headline for small teams and agencies.", "headlineGrid", ["Studio", "Store"], "#bfdbfe"],
        ["Pricing pages for digital products", "Commercial headline for offers, plans and digital downloads.", "headlineGrid", ["Price", "Convert"], "#e9d5ff"],
        ["Turn followers into subscribers", "Audience growth headline for newsletters and communities.", "headlineGrid", ["Audience", "Subscribe"], "#f9a8d4"],
      ],
    },
    {
      selector: "#h1-editorial-portfolio .cp-g",
      defaults: { source: "H1 taxonomy", catalogSource: "h1-gallery-taxonomy", sourcePillar: "h1", family: "inspiration", qaStatus: "keep" },
      items: [
        ["A portfolio that reads like a case study", "Portfolio headline that emphasizes proof and narrative clarity.", "headlineGrid", ["Work", "Proof"], "#c2a4ff"],
        ["Publish essays with product-grade polish", "Editorial tooling headline for longform publishing.", "headlineGrid", ["Write", "Publish"], "#38bdf8"],
        ["Your archive, finally searchable", "Media archive headline with retrieval and organization value.", "headlineGrid", ["Archive", "Find"], "#4ade80"],
        ["Editorial systems for independent studios", "Studio-facing headline for repeatable publishing design.", "headlineGrid", ["Studio", "System"], "#facc15"],
        ["Case studies that move like stories", "Case-study headline with motion and narrative pacing.", "headlineGrid", ["Story", "Result"], "#fb7185"],
        ["A launch page for every idea", "Editorial product headline for lightweight launch pages.", "headlineGrid", ["Idea", "Launch"], "#93c5fd"],
        ["Bring scattered notes into a living index", "Knowledge headline for notes, research and connected writing.", "headlineGrid", ["Notes", "Index"], "#a7f3d0"],
        ["Design work that explains itself", "Portfolio headline focused on context, process and outcomes.", "headlineGrid", ["Process", "Outcome"], "#f0abfc"],
        ["Longform pages for visual teams", "Editorial headline for image-rich teams and studios.", "headlineGrid", ["Visual", "Longform"], "#fdba74"],
        ["Make your studio impossible to skim", "Studio headline with strong large-type presentation.", "headlineGrid", ["Impact", "Depth"], "#bfdbfe"],
        ["A personal site with serious rhythm", "Personal portfolio headline with editorial layout emphasis.", "headlineGrid", ["Personal", "Rhythm"], "#e9d5ff"],
        ["Present research without a slide deck", "Research publishing headline for deep pages and explainers.", "headlineGrid", ["Research", "Explain"], "#f9a8d4"],
      ],
    },
    {
      selector: "#cta-purchase-subscription .cp-g",
      defaults: { source: "CTA taxonomy", catalogSource: "cta-gallery-taxonomy", sourcePillar: "cta", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Start the Pro trial", "Trial CTA with price anchor and secondary comparison route.", "buyCta", ["Pro", "Compare"], "#c2a4ff"],
        ["Upgrade your workspace", "In-app subscription CTA for team limits and premium features.", "buyCta", ["Team", "Upgrade"], "#38bdf8"],
        ["Reserve annual pricing", "Subscription CTA that frames annual savings without noisy urgency.", "buyCta", ["Annual", "Save"], "#4ade80"],
        ["Buy the launch bundle", "Commercial CTA for digital bundles and one-time purchases.", "buyCta", ["Bundle", "Buy"], "#facc15"],
        ["Unlock usage credits", "Usage-based CTA for quota, credits and metered products.", "buyCta", ["Credits", "Usage"], "#fb7185"],
        ["Book implementation", "Service purchase CTA with consultation and scoped package routes.", "buyCta", ["Book", "Scope"], "#93c5fd"],
        ["Add collaborator seats", "Expansion CTA for per-seat billing and team growth.", "buyCta", ["Seats", "Invite"], "#a7f3d0"],
        ["Move to managed scale", "Enterprise upgrade CTA with security and support emphasis.", "buyCta", ["Scale", "Security"], "#f0abfc"],
        ["Renew the membership", "Subscription renewal CTA for communities and paid content.", "buyCta", ["Renew", "Member"], "#fdba74"],
        ["Claim founder pricing", "Early customer CTA with restrained scarcity and clear offer.", "buyCta", ["Founder", "Claim"], "#bfdbfe"],
        ["Switch from free plan", "Freemium upgrade CTA for product-led conversion surfaces.", "buyCta", ["Free", "Pro"], "#e9d5ff"],
        ["Confirm secure checkout", "Checkout CTA with trust, summary and confirmation anatomy.", "buyCta", ["Secure", "Pay"], "#f9a8d4"],
      ],
    },
    {
      selector: "#cta-download-template .cp-g",
      defaults: { source: "CTA taxonomy", catalogSource: "cta-gallery-taxonomy", sourcePillar: "cta", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Download the starter kit", "Resource CTA for onboarding kits and product samples.", "downloadCta", ["HTML", "CSS", "Docs"], "#c2a4ff"],
        ["Get the pricing template", "Template CTA for pricing pages and plan comparisons.", "downloadCta", ["Plans", "Copy", "Grid"], "#38bdf8"],
        ["Save the audit checklist", "Download CTA for compliance, QA and launch checklists.", "panel", ["PDF", "Checklist", "Audit"], "#4ade80"],
        ["Copy the landing blocks", "Free-template CTA for reusable landing page sections.", "downloadCta", ["Hero", "CTA", "Footer"], "#facc15"],
        ["Export the brand pack", "Asset-pack CTA for brand, palette and logo delivery surfaces.", "downloadCta", ["Palette", "Logo", "Fonts"], "#fb7185"],
        ["Install the desktop app", "App download CTA with platform choices and benefit framing.", "cta", ["Mac", "Windows", "Linux"], "#93c5fd"],
        ["Grab the social kit", "Campaign resource CTA for launch assets and social formats.", "downloadCta", ["Posts", "Stories", "Banners"], "#a7f3d0"],
        ["Copy the Figma brief", "Design handoff CTA for brief templates and team workflows.", "downloadCta", ["Brief", "Scope", "Assets"], "#f0abfc"],
        ["Download sample data", "Developer/product CTA for demos, sandboxes and examples.", "command", ["CSV", "JSON", "API"], "#fdba74"],
        ["Use the invoice template", "Commercial template CTA for freelancers and small teams.", "cardFooter", ["Invoice", "Terms", "Brand"], "#bfdbfe"],
        ["Start with a blank canvas", "Builder CTA for empty project templates and quickstarts.", "bento", ["Blank", "Grid", "Start"], "#e9d5ff"],
        ["Export the launch plan", "Project planning CTA for timelines, briefs and release notes.", "downloadCta", ["Plan", "Notes", "Tasks"], "#f9a8d4"],
      ],
    },
    {
      selector: "#cta-form-newsletter-popup .cp-g",
      defaults: { source: "CTA taxonomy", catalogSource: "cta-gallery-taxonomy", sourcePillar: "cta", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Join the weekly signal", "Newsletter CTA with concise benefit and email-first form.", "newsletterForm", ["Weekly", "No spam", "Design"], "#c2a4ff"],
        ["Request early access", "Waitlist form CTA for private products and preview lists.", "newsletterForm", ["Email", "Invite", "Preview"], "#38bdf8"],
        ["Get the buyer guide", "Lead form CTA with gated guide and segmented follow-up.", "newsletterForm", ["Guide", "Compare", "Send"], "#4ade80"],
        ["Save my launch spot", "Event-style signup CTA with queue and confirmation framing.", "newsletterForm", ["Spot", "Queue", "Confirm"], "#facc15"],
        ["Open the offer popup", "Modal CTA with clear accept, skip and offer framing.", "modal", ["Skip", "Claim"], "#fb7185"],
        ["Subscribe from nav", "Navigation CTA for newsletter capture without leaving the header.", "announcement", ["Subscribe", "Weekly", "Archive"], "#93c5fd"],
        ["Send me the demo", "B2B lead capture CTA that routes to a recorded demo.", "newsletterForm", ["Work email", "Demo", "Send"], "#a7f3d0"],
        ["Reserve the workshop", "Workshop CTA with seat count and inquiry path.", "newsletterForm", ["Seats", "Date", "Reserve"], "#f0abfc"],
        ["Start the calculator", "Interactive form CTA for calculators and estimators.", "panel", ["Inputs", "Estimate", "Email"], "#fdba74"],
        ["Ask for migration help", "Support CTA for migration, onboarding and technical setup.", "newsletterForm", ["Stack", "Timeline", "Help"], "#bfdbfe"],
        ["Send the brief", "Agency inquiry CTA with project, budget and timeline signals.", "newsletterForm", ["Brief", "Budget", "Send"], "#e9d5ff"],
        ["Keep me updated", "Lightweight announcement CTA for changelogs and release feeds.", "announcement", ["Updates", "Email", "Notify"], "#f9a8d4"],
      ],
    },
    {
      selector: "#error-style-studies .cp-g",
      defaults: { source: "404 taxonomy", catalogSource: "404s-design-taxonomy", sourcePillar: "404", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Minimal Lost Page", "Clean 404 with one message and one stable action.", "creative404", ["Home", "Search"], "#c2a4ff"],
        ["Bold Type Error", "Large-type error page with strong contrast and compact links.", "creative404", ["Back", "Index"], "#38bdf8"],
        ["Brutal Type 404", "Rigid typographic composition for stark product dead ends.", "creative404", ["Retry", "Routes"], "#4ade80"],
        ["Colorful Recovery", "Bright error page with playful but useful route hierarchy.", "creative404", ["Explore", "Help"], "#facc15"],
        ["Dark Product Error", "Dark SaaS error composition with status and dashboard routes.", "creative404", ["Status", "Dashboard"], "#fb7185"],
        ["Editorial Not Found", "Publication-style 404 with search and archive emphasis.", "creative404", ["Archive", "Search"], "#93c5fd"],
        ["Glitch Interface Error", "Technical error style with code-like visual rhythm.", "creative404", ["Reload", "Logs"], "#a7f3d0"],
        ["Illustrative Placeholder", "Illustration-ready error layout without relying on external images.", "creative404", ["Home", "Guide"], "#f0abfc"],
        ["Large Number Study", "Number-led 404 with supporting action cluster.", "creative404", ["404", "Support"], "#fdba74"],
        ["Light Product 404", "Lightweight product 404 for clean SaaS and docs surfaces.", "industryError", ["SaaS", "Home"], "#bfdbfe"],
        ["Retro Utility Error", "Retro-inspired error treatment using native color blocks.", "creative404", ["Menu", "Back"], "#e9d5ff"],
        ["Typographic Dead End", "Type-forward 404 with strong headline and route recovery.", "creative404", ["Path", "Search"], "#f9a8d4"],
      ],
    },
    {
      selector: "#error-recovery-flows .cp-g",
      defaults: { source: "404 taxonomy", catalogSource: "404s-design-taxonomy", sourcePillar: "404", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Search Recovery Page", "404 that makes search the primary route instead of a dead end.", "searchNav", ["Search site", "Popular", "Docs"], "#c2a4ff"],
        ["Support Recovery Page", "Error page with support, status and contact escalation.", "industryError", ["Support", "Contact"], "#38bdf8"],
        ["Retry Flow Error", "Recoverable error state with retry, status and safe back route.", "industryError", ["Retry", "Status"], "#4ade80"],
        ["Permission Request Error", "Access error with request permission and switch workspace paths.", "panel", ["Request", "Switch"], "#facc15"],
        ["Expired Link Flow", "Invite or token expiration screen with safe renewal path.", "industryError", ["Expired", "Renew"], "#fb7185"],
        ["Payment Failure Flow", "Checkout failure page with retry and billing support actions.", "industryError", ["Payment", "Billing"], "#93c5fd"],
        ["Missing Workspace Flow", "Workspace-not-found state with account switch and create route.", "panel", ["Switch", "Create"], "#a7f3d0"],
        ["Offline Recovery Flow", "Offline page with retry, cached route and status message.", "industryError", ["Offline", "Retry"], "#f0abfc"],
        ["Rate Limit Flow", "Developer-friendly limit page with wait, docs and contact options.", "panel", ["Limit", "Docs"], "#fdba74"],
        ["Maintenance Recovery", "Scheduled outage page with timeline and notification action.", "industryError", ["Maintenance", "Notify"], "#bfdbfe"],
        ["Form Error Recovery", "Form submission error with saved progress and retry action.", "modal", ["Saved", "Retry"], "#e9d5ff"],
        ["Route Suggestion Flow", "404 with suggested paths based on likely destination.", "searchNav", ["Suggested", "Docs", "Pricing"], "#f9a8d4"],
      ],
    },
    {
      selector: "#error-industry-pages .cp-g",
      defaults: { source: "404 taxonomy", catalogSource: "404s-design-taxonomy", sourcePillar: "404", family: "inspiration", qaStatus: "keep" },
      items: [
        ["SaaS Route Missing", "Product SaaS 404 with dashboard, docs and support routes.", "industryError", ["SaaS", "Dashboard"], "#c2a4ff"],
        ["Commerce Item Missing", "Retail 404 for unavailable products and category recovery.", "industryError", ["Commerce", "Shop"], "#38bdf8"],
        ["Media Article Missing", "Publishing 404 with archive, search and latest posts.", "industryError", ["Media", "Archive"], "#4ade80"],
        ["Finance Page Missing", "Finance error page with secure login and support fallbacks.", "industryError", ["Finance", "Secure"], "#facc15"],
        ["Nonprofit Resource Missing", "Mission-led 404 with donation, programs and contact routes.", "industryError", ["Nonprofit", "Programs"], "#fb7185"],
        ["Portfolio Project Missing", "Portfolio 404 with work index, contact and archive links.", "industryError", ["Portfolio", "Work"], "#93c5fd"],
        ["Agency Campaign Missing", "Agency-style missing campaign page with case-study fallback.", "industryError", ["Agency", "Cases"], "#a7f3d0"],
        ["Education Lesson Missing", "Course 404 with module index and continue route.", "industryError", ["Course", "Continue"], "#f0abfc"],
        ["Healthcare Portal Missing", "Care portal route error with safe account and support links.", "industryError", ["Portal", "Support"], "#fdba74"],
        ["Travel Booking Missing", "Booking error with itinerary, search and support paths.", "industryError", ["Booking", "Search"], "#bfdbfe"],
        ["Developer Package Missing", "Package/docs 404 with registry, versions and API fallback.", "industryError", ["Package", "Versions"], "#e9d5ff"],
        ["Community Thread Missing", "Community route error with recent threads and member support.", "industryError", ["Community", "Recent"], "#f9a8d4"],
      ],
    },
    {
      selector: "#footer-type-systems .cp-g",
      defaults: { source: "Footer taxonomy", catalogSource: "footer-design-taxonomy", sourcePillar: "footer", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Large Type Footer", "Oversized closing statement with sparse link architecture.", "typeFooter", ["Work", "About", "Contact", "Legal"], "#c2a4ff"],
        ["Small Type Footer", "Dense small-type footer for products with many utility links.", "typeFooter", ["Docs", "API", "Status", "Terms"], "#38bdf8"],
        ["Typographic Studio Footer", "Studio footer with type-led brand block and inquiry route.", "typeFooter", ["Studio", "Cases", "Careers", "Mail"], "#4ade80"],
        ["Bold Closing Footer", "Strong end-of-page footer with direct conversion action.", "typeFooter", ["Start", "Plans", "Talk", "Docs"], "#facc15"],
        ["Editorial Footer", "Publication footer with archive, topics and subscription routes.", "typeFooter", ["Archive", "Topics", "Subscribe", "RSS"], "#fb7185"],
        ["Product Type Footer", "Product footer with value statement and app-level links.", "typeFooter", ["Product", "Security", "Pricing", "Login"], "#93c5fd"],
        ["Portfolio Type Footer", "Personal portfolio footer with work categories and contact CTA.", "typeFooter", ["Work", "Writing", "Now", "Contact"], "#a7f3d0"],
        ["Utility Legal Footer", "Legal-first footer for privacy, compliance and policies.", "footer", ["Privacy", "Terms"], "#f0abfc"],
        ["Newsletter Type Footer", "Footer that uses type hierarchy to drive email capture.", "typeFooter", ["Letters", "Weekly", "Archive", "Join"], "#fdba74"],
        ["Mono Product Footer", "Developer-style footer with monospace labels and system routes.", "typeFooter", ["CLI", "API", "SDK", "Status"], "#bfdbfe"],
        ["Event Footer", "Event footer with date, venue, speakers and registration paths.", "typeFooter", ["Date", "Venue", "Speakers", "Tickets"], "#e9d5ff"],
        ["Minimal Brand Footer", "Minimal type footer with brand statement and essential links.", "typeFooter", ["Brand", "Help", "Press", "Legal"], "#f9a8d4"],
      ],
    },
    {
      selector: "#footer-grid-cards .cp-g",
      defaults: { source: "Footer taxonomy", catalogSource: "footer-design-taxonomy", sourcePillar: "footer", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Sitemap Grid Footer", "Multi-column sitemap footer for product libraries and docs.", "footer", ["Product", "Company"], "#c2a4ff"],
        ["Card CTA Footer", "Footer with two promoted cards above structured link groups.", "cardFooter", ["Start", "Contact"], "#38bdf8"],
        ["Newsletter Card Footer", "Card-based footer combining email capture and link sitemap.", "newsletterForm", ["Weekly", "Archive", "Join"], "#4ade80"],
        ["App Metadata Footer", "App footer with status, version, legal and support metadata.", "footer", ["Status", "v4"], "#facc15"],
        ["Pricing Card Footer", "Closing footer with pricing card and plan comparison route.", "cardFooter", ["Pro", "Compare"], "#fb7185"],
        ["Docs Card Footer", "Footer card that surfaces docs, API and quickstart links.", "cardFooter", ["Docs", "API"], "#93c5fd"],
        ["Marketplace Footer Grid", "Commerce footer with categories, support and policy groups.", "footer", ["Shop", "Returns"], "#a7f3d0"],
        ["Agency Inquiry Footer", "Agency footer with project inquiry card and case links.", "cardFooter", ["Brief", "Cases"], "#f0abfc"],
        ["Community Footer", "Community footer with events, members and discussion routes.", "footer", ["Events", "Members"], "#fdba74"],
        ["Security Footer Grid", "Trust footer with compliance, status and security links.", "footer", ["SOC2", "Status"], "#bfdbfe"],
        ["Download Footer Card", "Footer with app download card and platform links.", "cardFooter", ["Mac", "Windows"], "#e9d5ff"],
        ["Customer Story Footer", "Footer that promotes stories, proof and contact routes.", "cardFooter", ["Stories", "Contact"], "#f9a8d4"],
      ],
    },
    {
      selector: "#footer-style-modes .cp-g",
      defaults: { source: "Footer taxonomy", catalogSource: "footer-design-taxonomy", sourcePillar: "footer", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Bright Footer Mode", "Light, bright footer treatment with soft link hierarchy.", "footer", ["Light", "Links"], "#c2a4ff"],
        ["Dark Footer Mode", "High-contrast dark footer for product and SaaS pages.", "footer", ["Dark", "Status"], "#38bdf8"],
        ["Flat Footer Mode", "Flat footer with low elevation and clear link columns.", "footer", ["Flat", "Grid"], "#4ade80"],
        ["Animated Footer Cue", "Motion-ready footer with native visual cue and action row.", "typeFooter", ["Motion", "Start", "Docs", "Talk"], "#facc15"],
        ["Illustrative Footer Frame", "Footer layout prepared for illustration slots without external assets.", "cardFooter", ["Frame", "Links"], "#fb7185"],
        ["Carded Footer Mode", "Card-forward footer with compact conversion and support panels.", "cardFooter", ["Support", "Start"], "#93c5fd"],
        ["Bright Social Footer", "Social-forward bright footer with compact network and legal rows.", "footer", ["Social", "Legal"], "#a7f3d0"],
        ["Dark App Footer", "App footer mode for dashboards and signed-in product shells.", "footer", ["App", "Version"], "#f0abfc"],
        ["Editorial Footer Mode", "Magazine-style footer with archive and newsletter emphasis.", "typeFooter", ["Archive", "Issues", "RSS", "Join"], "#fdba74"],
        ["Campaign Footer Mode", "Campaign footer with offer card and closing CTA.", "cardFooter", ["Offer", "Claim"], "#bfdbfe"],
        ["Minimal Legal Mode", "Restrained footer for policies, compliance and contact routes.", "footer", ["Privacy", "Terms"], "#e9d5ff"],
        ["Studio Dark Footer", "Dark studio footer with case links and inquiry path.", "typeFooter", ["Studio", "Cases", "Contact", "Now"], "#f9a8d4"],
      ],
    },
    {
      selector: "#bento-feature-landing .cp-g",
      defaults: { source: "Bento taxonomy", catalogSource: "bentogrids-taxonomy", sourcePillar: "bento", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Feature Spotlight Bento", "Asymmetric bento for primary feature and proof cells.", "bento", ["98%", "Adoption"], "#c2a4ff"],
        ["Product Story Bento", "Narrative bento for problem, workflow and result.", "mediaBento", ["Story", "Flow"], "#38bdf8"],
        ["Benefits Grid Bento", "Landing bento that clusters benefits into readable modules.", "bento", ["Fast", "Clear"], "#4ade80"],
        ["Comparison Landing Bento", "Before-after landing bento for positioning and conversion.", "mediaBento", ["Before", "After"], "#facc15"],
        ["Launch Feature Bento", "Release bento with announcement, feature and CTA cells.", "bento", ["New", "Launch"], "#fb7185"],
        ["Integration Bento", "Integration-led bento with app groups and API cell.", "mediaBento", ["Apps", "API"], "#93c5fd"],
        ["Security Proof Bento", "Trust bento for encryption, audit and policy proof.", "bento", ["SOC2", "2FA"], "#a7f3d0"],
        ["Workflow Bento", "Workflow bento that stages capture, process and ship cells.", "mediaBento", ["Capture", "Ship"], "#f0abfc"],
        ["Mobile Feature Bento", "Mobile-safe landing bento for responsive feature pages.", "bento", ["Mobile", "Push"], "#fdba74"],
        ["AI Prompt Bento", "AI product bento with prompt, output and feedback zones.", "mediaBento", ["Prompt", "Output"], "#bfdbfe"],
        ["Proof First Bento", "Landing bento that foregrounds metrics and customer proof.", "bento", ["12%", "Growth"], "#e9d5ff"],
        ["Pricing Feature Bento", "Bento grid that mixes plan, feature and upgrade cells.", "mediaBento", ["Plan", "Upgrade"], "#f9a8d4"],
      ],
    },
    {
      selector: "#bento-dashboard-grids .cp-g",
      defaults: { source: "Bento taxonomy", catalogSource: "bentogrids-taxonomy", sourcePillar: "bento", family: "inspiration", qaStatus: "keep" },
      items: [
        ["KPI Dashboard Bento", "Metric-heavy bento for executive and product dashboards.", "dashboardBento", ["71k", "MRR"], "#c2a4ff"],
        ["Operations Bento Grid", "Ops dashboard bento with queues, incidents and action cells.", "dashboardBento", ["Queue", "SLA"], "#38bdf8"],
        ["Automation Bento", "Automation dashboard with trigger, action and result modules.", "dashboardBento", ["Trigger", "Done"], "#4ade80"],
        ["Revenue Bento", "Revenue overview bento with trend, plan and segment cells.", "dashboardBento", ["ARR", "NRR"], "#facc15"],
        ["Support Bento", "Support dashboard grid with tickets, sentiment and response time.", "dashboardBento", ["Tickets", "CSAT"], "#fb7185"],
        ["Security Console Bento", "Security console bento for audit, risk and access states.", "dashboardBento", ["Risk", "Access"], "#93c5fd"],
        ["Content Calendar Bento", "Editorial dashboard bento for schedule, queue and assets.", "dashboardBento", ["Calendar", "Queue"], "#a7f3d0"],
        ["Sales Pipeline Bento", "CRM bento with deals, forecast and next actions.", "dashboardBento", ["Pipeline", "Forecast"], "#f0abfc"],
        ["Product Analytics Bento", "Analytics bento for activation, usage and retention.", "dashboardBento", ["Activation", "Usage"], "#fdba74"],
        ["Resource Planning Bento", "Planning dashboard bento for capacity and delivery risk.", "dashboardBento", ["Capacity", "Risk"], "#bfdbfe"],
        ["Data Quality Bento", "Data platform bento for freshness, errors and validation.", "dashboardBento", ["Fresh", "Errors"], "#e9d5ff"],
        ["Release Readiness Bento", "Launch dashboard bento for checks, blockers and approvals.", "dashboardBento", ["Checks", "Approve"], "#f9a8d4"],
      ],
    },
    {
      selector: "#bento-media-portfolio .cp-g",
      defaults: { source: "Bento taxonomy", catalogSource: "bentogrids-taxonomy", sourcePillar: "bento", family: "inspiration", qaStatus: "keep" },
      items: [
        ["Portfolio Case Bento", "Portfolio bento with case study, role and outcome cells.", "mediaBento", ["Case", "Outcome"], "#c2a4ff"],
        ["Creator Media Bento", "Creator page bento for video, links and newsletter capture.", "mediaBento", ["Video", "Join"], "#38bdf8"],
        ["Editorial Issue Bento", "Editorial bento for issue cover, articles and archive paths.", "mediaBento", ["Issue", "Archive"], "#4ade80"],
        ["Studio Services Bento", "Studio page bento with services, proof and inquiry cells.", "mediaBento", ["Services", "Brief"], "#facc15"],
        ["Research Summary Bento", "Research bento for findings, chart slot and next steps.", "mediaBento", ["Finding", "Next"], "#fb7185"],
        ["Event Recap Bento", "Event recap bento with sessions, media and attendee proof.", "mediaBento", ["Sessions", "Recap"], "#93c5fd"],
        ["Personal Links Bento", "Personal page bento for links, work, writing and contact.", "mediaBento", ["Links", "Now"], "#a7f3d0"],
        ["Campaign Media Bento", "Campaign bento with hero asset, CTA and proof modules.", "mediaBento", ["Campaign", "Proof"], "#f0abfc"],
        ["Product Gallery Bento", "Product media bento for screenshots, specs and action cells.", "mediaBento", ["Gallery", "Specs"], "#fdba74"],
        ["Press Kit Bento", "Press kit bento for assets, facts and contact routes.", "mediaBento", ["Press", "Assets"], "#bfdbfe"],
        ["Course Landing Bento", "Course bento with curriculum, proof and enrollment route.", "mediaBento", ["Lessons", "Enroll"], "#e9d5ff"],
        ["Case Archive Bento", "Archive bento for projects, filters and featured outcomes.", "mediaBento", ["Archive", "Featured"], "#f9a8d4"],
      ],
    },
  ];

  sourceSections.forEach(({ selector, defaults, items }) => {
    const cards = items.map(([title, description, kind, labels, accent]) => ({
      title,
      description,
      kind,
      labels,
      accent,
    }));

    addComponentCards(selector, nativeCards(cards, defaults));
  });
}

function stabilizeCatalogComposition() {
  const productDuplicates = new Set(["Pricing Mini", "Empty State", "Metric Delta", "Notification Stack"]);
  removeCardsByTitle("#components .cp-g", (title) => productDuplicates.has(title));

  ["#layouts .ly-g", "#easing .ez-g"].forEach((selector) => {
    const grid = document.querySelector(selector);
    if (!grid) return;
    grid.classList.add("paginated", "catalog-grid");
    Array.from(grid.children).forEach((card) => card.classList.add("page-item"));
  });

  promoteCards("#sera-navigation .cp-g", (card) => card.dataset.catalogSource === "sera-ui");
  promoteCards("#sera-cards .cp-g", (card) => card.dataset.catalogSource === "sera-ui");
  promoteCards("#sera-sections .cp-g", (card) => card.dataset.catalogSource === "sera-ui");
}

function configureCatalogPagination() {
  normalizeButtonShelves();

  Object.entries(catalogSectionConfig).forEach(([selector, config]) => {
    setGridPageConfig(selector, config);
  });
}

function deepenCatalog() {
  const colorGrid = document.querySelector("#colors .pal-g");
  if (colorGrid) {
    colorGrid.insertAdjacentHTML("beforeend", [
      { name: "Graphite", hex: "#1f2937" },
      { name: "Steel", hex: "#334155" },
      { name: "Cloud", hex: "#cbd5e1" },
      { name: "Indigo", hex: "#6366f1" },
      { name: "Skyline", hex: "#38bdf8" },
      { name: "Lagoon", hex: "#14b8a6" },
      { name: "Emerald", hex: "#10b981" },
      { name: "Sunbeam", hex: "#facc15" },
      { name: "Coral", hex: "#fb7185" },
      { name: "Signal Red", hex: "#ef4444" },
      { name: "Amber", hex: "#f59e0b" },
      { name: "Pearl", hex: "#f8fafc" },
    ].map(createColorCard).join(""));
  }

  const gradientGrid = document.querySelector("#gradients .gr-g");
  if (gradientGrid) {
    gradientGrid.insertAdjacentHTML("beforeend", [
      { name: "Signal Bloom", css: "linear-gradient(135deg,#0f172a,#7c3aed,#fb7185)" },
      { name: "Mint Terminal", css: "linear-gradient(135deg,#020617,#0f766e,#4ade80)" },
      { name: "Copper Editorial", css: "linear-gradient(135deg,#1c1917,#b45309,#f5f5f4)" },
      { name: "Cloud Burst", css: "linear-gradient(135deg,#f8fafc,#cbd5e1,#38bdf8)" },
      { name: "Night Mesh", css: "radial-gradient(circle at 20% 20%,#7c3aed,transparent 35%),radial-gradient(circle at 80% 10%,#06b6d4,transparent 25%),#020617" },
      { name: "Launch Flame", css: "linear-gradient(135deg,#111827,#f97316,#facc15)" },
      { name: "Rose Circuit", css: "linear-gradient(135deg,#111827,#db2777,#fb7185)" },
      { name: "Mono Aurora", css: "linear-gradient(135deg,#020617,#475569,#e2e8f0)" },
      { name: "Electric Mint", css: "linear-gradient(135deg,#020617,#0f766e,#5eead4)" },
      { name: "Studio Iris", css: "linear-gradient(135deg,#1e1b4b,#7c3aed,#c4b5fd)" },
      { name: "Solar Bloom", css: "linear-gradient(135deg,#451a03,#fb923c,#fde68a)" },
      { name: "Ocean Depth", css: "radial-gradient(circle at 15% 15%,#38bdf8,transparent 26%),linear-gradient(135deg,#020617,#0f172a,#0f766e)" },
    ].map(createGradientCard).join(""));
  }

  const animationGrid = document.querySelector("#animations .an-g");
  if (animationGrid) {
    animationGrid.insertAdjacentHTML("beforeend", [
      {
        name: "Radar Sweep",
        description: "Rotating sonar line",
        previewStyle: "border-radius:50%;background:conic-gradient(from 90deg,transparent,rgba(194,164,255,.85),transparent);animation:spin 1.6s linear infinite",
        html: "<style>@keyframes radarSweep{to{transform:rotate(360deg)}}</style><div style=\"width:56px;height:56px;border-radius:50%;background:conic-gradient(from 90deg,transparent,rgba(194,164,255,.85),transparent);animation:radarSweep 1.6s linear infinite\"></div>",
      },
      {
        name: "Wave Lift",
        description: "Organic vertical motion",
        previewStyle: "border-radius:12px;background:linear-gradient(135deg,#38bdf8,#c2a4ff);animation:floatUp 1.8s ease-in-out infinite",
        html: "<style>@keyframes waveLift{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style><div style=\"width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#38bdf8,#c2a4ff);animation:waveLift 1.8s ease-in-out infinite\"></div>",
      },
      {
        name: "Hue Orbit",
        description: "Color-cycling badge",
        previewStyle: "border-radius:999px;background:linear-gradient(135deg,#c2a4ff,#fb8dff);animation:glow 1.4s ease-in-out infinite alternate",
        html: "<style>@keyframes hueOrbit{0%{filter:hue-rotate(0)}100%{filter:hue-rotate(120deg)}}</style><div style=\"display:inline-flex;padding:10px 16px;border-radius:999px;background:linear-gradient(135deg,#c2a4ff,#fb8dff);animation:hueOrbit 1.8s linear infinite\">Orbit</div>",
      },
      {
        name: "Scanline",
        description: "Fast horizontal scan",
        previewStyle: "background:linear-gradient(90deg,transparent,#4ade80,transparent);animation:slideIO 1.5s ease-in-out infinite",
        html: "<style>@keyframes scanline{0%,100%{transform:translateX(-110%)}50%{transform:translateX(110%)}}</style><div style=\"overflow:hidden;width:84px;height:10px;border-radius:999px;background:rgba(255,255,255,.08)\"><div style=\"width:60%;height:100%;background:linear-gradient(90deg,transparent,#4ade80,transparent);animation:scanline 1.5s ease-in-out infinite\"></div></div>",
      },
      {
        name: "Pendulum",
        description: "Balanced swing motion",
        previewStyle: "border-radius:12px;background:linear-gradient(135deg,#facc15,#fb7185);transform-origin:top center;animation:swing 1.8s ease-in-out infinite",
        html: "<style>@keyframes pendulum{0%,100%{transform:rotate(0)}25%{transform:rotate(10deg)}75%{transform:rotate(-10deg)}}</style><div style=\"width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#facc15,#fb7185);transform-origin:top center;animation:pendulum 1.8s ease-in-out infinite\"></div>",
      },
      {
        name: "Dial Pop",
        description: "Interface attention pulse",
        previewStyle: "border-radius:50%;background:linear-gradient(135deg,#111827,#6366f1);animation:scaleUp 1.2s ease-in-out infinite alternate",
        html: "<style>@keyframes dialPop{0%{transform:scale(.82)}100%{transform:scale(1.08)}}</style><div style=\"width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#111827,#6366f1);animation:dialPop 1.2s ease-in-out infinite alternate\"></div>",
      },
      {
        name: "Signal Blink",
        description: "Status light with clean pulse",
        previewStyle: "border-radius:50%;background:#4ade80;animation:pulse 1s ease-in-out infinite",
        html: "<style>@keyframes signalBlink{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}</style><div style=\"width:16px;height:16px;border-radius:50%;background:#4ade80;animation:signalBlink 1s ease-in-out infinite\"></div>",
      },
      {
        name: "Ribbon Slide",
        description: "Horizontal ribbon sweep",
        previewStyle: "border-radius:999px;background:linear-gradient(90deg,#38bdf8,#c2a4ff);animation:slideIO 1.1s ease-in-out infinite",
        html: "<style>@keyframes ribbonSlide{0%,100%{transform:translateX(-90%)}50%{transform:translateX(90%)}}</style><div style=\"width:90px;height:10px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.08)\"><div style=\"width:55%;height:100%;border-radius:999px;background:linear-gradient(90deg,#38bdf8,#c2a4ff);animation:ribbonSlide 1.1s ease-in-out infinite\"></div></div>",
      },
      {
        name: "Flip Tile",
        description: "Card flip attention state",
        previewStyle: "border-radius:12px;background:linear-gradient(135deg,#f8fafc,#c2a4ff);animation:spin 1.8s linear infinite",
        html: "<style>@keyframes flipTile{0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg)}}</style><div style=\"width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#f8fafc,#c2a4ff);animation:flipTile 1.6s ease-in-out infinite\"></div>",
      },
      {
        name: "Beacon Rise",
        description: "Equalizer-style beacon pulse",
        previewStyle: "border-radius:10px;background:linear-gradient(180deg,#fb7185,#facc15);animation:bounce 1.1s ease infinite",
        html: "<style>@keyframes beaconRise{0%,100%{transform:scaleY(.6);transform-origin:bottom}50%{transform:scaleY(1)}}</style><div style=\"width:16px;height:44px;border-radius:10px;background:linear-gradient(180deg,#fb7185,#facc15);animation:beaconRise 1.1s ease infinite\"></div>",
      },
    ].map(createAnimationCard).join(""));
  }

  addToolkitCards("#buttons .btn-g", [
    { title: "Corner Cut", description: "Sharp editorial CTA with clipped corners.", preview: `<button style="padding:12px 20px;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);background:#e2e8f0;color:#020617;border:0;font-weight:800">Launch</button>`, html: `<button style="padding:12px 20px;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);background:#e2e8f0;color:#020617;border:0;font-weight:800">Launch</button>` },
    { title: "Glass Rail", description: "Segmented glass action with subtle depth.", preview: `<button style="padding:12px 22px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(14px);color:#fff">Preview</button>`, html: `<button style="padding:12px 22px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(14px);color:#fff">Preview</button>` },
    { title: "Loader CTA", description: "Action button with inline progress cue.", preview: `<button style="display:flex;gap:10px;align-items:center;padding:12px 18px;border-radius:12px;background:#111827;color:#fff;border:1px solid rgba(255,255,255,.1)"><span style="width:10px;height:10px;border-radius:50%;background:#4ade80"></span>Syncing</button>`, html: `<button style="display:flex;gap:10px;align-items:center;padding:12px 18px;border-radius:12px;background:#111827;color:#fff;border:1px solid rgba(255,255,255,.1)"><span style="width:10px;height:10px;border-radius:50%;background:#4ade80"></span>Syncing</button>` },
    { title: "Ticket Stub", description: "Commerce-style button with perforated ends.", preview: `<button style="padding:12px 20px;border-radius:14px;background:linear-gradient(135deg,#facc15,#f97316);color:#111827;border:0;font-weight:900;box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)">Reserve</button>`, html: `<button style="padding:12px 20px;border-radius:14px;background:linear-gradient(135deg,#facc15,#f97316);color:#111827;border:0;font-weight:900;box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)">Reserve</button>` },
    { title: "Signal Underline", description: "Minimal text CTA with strong active line.", preview: `<button style="padding:0 0 6px;background:transparent;border:0;border-bottom:2px solid #38bdf8;color:#fff">Read docs</button>`, html: `<button style="padding:0 0 6px;background:transparent;border:0;border-bottom:2px solid #38bdf8;color:#fff">Read docs</button>` },
    { title: "Inset Key", description: "Keyboard-like keycap for utilities.", preview: `<button style="padding:10px 16px;border-radius:10px;background:#e5e7eb;border:1px solid #cbd5e1;box-shadow:inset 0 -2px 0 rgba(15,23,42,.16);color:#0f172a;font-weight:800">Cmd</button>`, html: `<button style="padding:10px 16px;border-radius:10px;background:#e5e7eb;border:1px solid #cbd5e1;box-shadow:inset 0 -2px 0 rgba(15,23,42,.16);color:#0f172a;font-weight:800">Cmd</button>` },
    { title: "Status Split", description: "Button with secondary state rail and count.", preview: `<button style="display:inline-flex;gap:10px;align-items:center;padding:11px 16px;border-radius:14px;background:#fff;color:#020617;border:0;font-weight:800"><span>Inbox</span><span style="padding:4px 8px;border-radius:999px;background:#e2e8f0">12</span></button>`, html: `<button style="display:inline-flex;gap:10px;align-items:center;padding:11px 16px;border-radius:14px;background:#fff;color:#020617;border:0;font-weight:800"><span>Inbox</span><span style="padding:4px 8px;border-radius:999px;background:#e2e8f0">12</span></button>` },
    { title: "Outline Rail", description: "Industrial outline button with lower depth rail.", preview: `<button style="padding:12px 18px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:#0b1120;color:#fff;box-shadow:inset 0 -3px 0 rgba(56,189,248,.28)">Inspect</button>`, html: `<button style="padding:12px 18px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:#0b1120;color:#fff;box-shadow:inset 0 -3px 0 rgba(56,189,248,.28)">Inspect</button>` },
    { title: "Live Chip", description: "Compact live-state action chip for dashboards.", preview: `<button style="display:inline-flex;gap:8px;align-items:center;padding:9px 14px;border-radius:999px;background:rgba(74,222,128,.14);border:1px solid rgba(74,222,128,.24);color:#4ade80"><span style="width:8px;height:8px;border-radius:50%;background:#4ade80"></span>Live</button>`, html: `<button style="display:inline-flex;gap:8px;align-items:center;padding:9px 14px;border-radius:999px;background:rgba(74,222,128,.14);border:1px solid rgba(74,222,128,.24);color:#4ade80"><span style="width:8px;height:8px;border-radius:50%;background:#4ade80"></span>Live</button>` },
    { title: "Corner Badge CTA", description: "Action with floating beta badge.", preview: `<button style="position:relative;padding:12px 20px;border-radius:14px;background:linear-gradient(135deg,#38bdf8,#6366f1);color:#fff;border:0;font-weight:800">Preview<span style="position:absolute;top:-8px;right:-6px;padding:3px 7px;border-radius:999px;background:#f8fafc;color:#020617;font-size:9px">Beta</span></button>`, html: `<button style="position:relative;padding:12px 20px;border-radius:14px;background:linear-gradient(135deg,#38bdf8,#6366f1);color:#fff;border:0;font-weight:800">Preview<span style="position:absolute;top:-8px;right:-6px;padding:3px 7px;border-radius:999px;background:#f8fafc;color:#020617;font-size:9px">Beta</span></button>` },
  ]);

  addToolkitCards("#loading .load-g", [
    { title: "Square Orbit", description: "Rotating square loader for app shells.", preview: `<div style="width:34px;height:34px;border:3px solid rgba(255,255,255,.15);border-top-color:#c2a4ff;animation:spin .9s linear infinite"></div>`, html: `<style>@keyframes squareOrbit{to{transform:rotate(360deg)}}</style><div style="width:34px;height:34px;border:3px solid rgba(255,255,255,.15);border-top-color:#c2a4ff;animation:squareOrbit .9s linear infinite"></div>` },
    { title: "Typing Rail", description: "Chat-like typing indicator with soft pulse.", preview: `<div style="display:flex;gap:5px"><span style="width:8px;height:8px;border-radius:50%;background:#fff"></span><span style="width:8px;height:8px;border-radius:50%;background:#c2a4ff"></span><span style="width:8px;height:8px;border-radius:50%;background:#fb8dff"></span></div>`, html: `<style>@keyframes typingRail{0%,100%{transform:translateY(0);opacity:.35}50%{transform:translateY(-6px);opacity:1}}</style><div style="display:flex;gap:5px"><span style="width:8px;height:8px;border-radius:50%;background:#fff;animation:typingRail .9s infinite"></span><span style="width:8px;height:8px;border-radius:50%;background:#c2a4ff;animation:typingRail .9s .15s infinite"></span><span style="width:8px;height:8px;border-radius:50%;background:#fb8dff;animation:typingRail .9s .3s infinite"></span></div>` },
    { title: "Split Bar", description: "Dual-lane progress for queued tasks.", preview: `<div style="display:grid;gap:8px;width:100%"><div style="height:6px;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:72%;height:100%;border-radius:999px;background:#c2a4ff"></div></div><div style="height:6px;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:44%;height:100%;border-radius:999px;background:#38bdf8"></div></div></div>`, html: `<div style="display:grid;gap:8px;width:180px"><div style="height:6px;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:72%;height:100%;border-radius:999px;background:#c2a4ff"></div></div><div style="height:6px;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:44%;height:100%;border-radius:999px;background:#38bdf8"></div></div></div>` },
    { title: "Glass Skeleton", description: "Soft loading panel for premium cards.", preview: `<div style="width:100%;height:56px;border-radius:18px;background:linear-gradient(120deg,rgba(255,255,255,.05),rgba(255,255,255,.12),rgba(255,255,255,.05));background-size:220% 100%;animation:shimmer 1.4s ease-in-out infinite"></div>`, html: `<div style="width:220px;height:76px;border-radius:18px;background:linear-gradient(120deg,rgba(255,255,255,.05),rgba(255,255,255,.12),rgba(255,255,255,.05));background-size:220% 100%;animation:shimmer 1.4s ease-in-out infinite"></div>` },
    { title: "Dial Loader", description: "Conic loader with clean center cutout.", preview: `<div style="width:42px;height:42px;border-radius:50%;background:conic-gradient(#38bdf8,#c2a4ff,#38bdf8);display:grid;place-items:center;animation:spin 1.1s linear infinite"><span style="width:26px;height:26px;border-radius:50%;background:#060507"></span></div>`, html: `<style>@keyframes dialLoader{to{transform:rotate(360deg)}}</style><div style="width:42px;height:42px;border-radius:50%;background:conic-gradient(#38bdf8,#c2a4ff,#38bdf8);display:grid;place-items:center;animation:dialLoader 1.1s linear infinite"><span style="width:26px;height:26px;border-radius:50%;background:#060507"></span></div>` },
    { title: "Beacon Grid", description: "Grid pulse for dashboards and maps.", preview: `<div style="display:grid;grid-template-columns:repeat(3,8px);gap:5px"><span style="width:8px;height:8px;border-radius:2px;background:#38bdf8"></span><span style="width:8px;height:8px;border-radius:2px;background:#c2a4ff"></span><span style="width:8px;height:8px;border-radius:2px;background:#4ade80"></span><span style="width:8px;height:8px;border-radius:2px;background:#c2a4ff"></span><span style="width:8px;height:8px;border-radius:2px;background:#fff"></span><span style="width:8px;height:8px;border-radius:2px;background:#fb7185"></span></div>`, html: `<style>@keyframes beaconGrid{0%,100%{opacity:.35}50%{opacity:1}}</style><div style="display:grid;grid-template-columns:repeat(3,10px);gap:6px"><span style="width:10px;height:10px;border-radius:2px;background:#38bdf8;animation:beaconGrid .9s infinite"></span><span style="width:10px;height:10px;border-radius:2px;background:#c2a4ff;animation:beaconGrid .9s .1s infinite"></span><span style="width:10px;height:10px;border-radius:2px;background:#4ade80;animation:beaconGrid .9s .2s infinite"></span><span style="width:10px;height:10px;border-radius:2px;background:#c2a4ff;animation:beaconGrid .9s .3s infinite"></span><span style="width:10px;height:10px;border-radius:2px;background:#fff;animation:beaconGrid .9s .4s infinite"></span><span style="width:10px;height:10px;border-radius:2px;background:#fb7185;animation:beaconGrid .9s .5s infinite"></span></div>` },
    { title: "Progress Nodes", description: "Node chain loader for workflow steps.", preview: `<div style="display:flex;gap:8px;align-items:center"><span style="width:10px;height:10px;border-radius:50%;background:#4ade80"></span><span style="width:28px;height:2px;background:#4ade80"></span><span style="width:10px;height:10px;border-radius:50%;background:#c2a4ff"></span><span style="width:28px;height:2px;background:rgba(255,255,255,.12)"></span><span style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.18)"></span></div>`, html: `<div style="display:flex;gap:8px;align-items:center"><span style="width:10px;height:10px;border-radius:50%;background:#4ade80"></span><span style="width:28px;height:2px;background:#4ade80"></span><span style="width:10px;height:10px;border-radius:50%;background:#c2a4ff"></span><span style="width:28px;height:2px;background:rgba(255,255,255,.12)"></span><span style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.18)"></span></div>` },
    { title: "Thin Scan", description: "Single scanning line for console shells.", preview: `<div style="width:100px;height:12px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:42px;height:100%;border-radius:999px;background:linear-gradient(90deg,transparent,#4ade80,transparent);animation:slideIO 1.2s ease-in-out infinite"></div></div>`, html: `<style>@keyframes thinScan{0%,100%{transform:translateX(-100%)}50%{transform:translateX(100%)}}</style><div style="width:120px;height:12px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:42px;height:100%;border-radius:999px;background:linear-gradient(90deg,transparent,#4ade80,transparent);animation:thinScan 1.2s ease-in-out infinite"></div></div>` },
    { title: "Column Rise", description: "Four-column rise for media and audio screens.", preview: `<div style="display:flex;gap:6px;align-items:flex-end;height:34px"><span style="width:7px;height:14px;background:#38bdf8;border-radius:999px"></span><span style="width:7px;height:22px;background:#c2a4ff;border-radius:999px"></span><span style="width:7px;height:30px;background:#fb7185;border-radius:999px"></span><span style="width:7px;height:18px;background:#facc15;border-radius:999px"></span></div>`, html: `<style>@keyframes columnRise{0%,100%{transform:scaleY(.45);transform-origin:bottom}50%{transform:scaleY(1)}}</style><div style="display:flex;gap:6px;align-items:flex-end;height:38px"><span style="width:7px;height:14px;background:#38bdf8;border-radius:999px;animation:columnRise .9s infinite"></span><span style="width:7px;height:22px;background:#c2a4ff;border-radius:999px;animation:columnRise .9s .1s infinite"></span><span style="width:7px;height:30px;background:#fb7185;border-radius:999px;animation:columnRise .9s .2s infinite"></span><span style="width:7px;height:18px;background:#facc15;border-radius:999px;animation:columnRise .9s .3s infinite"></span></div>` },
    { title: "Data Ladder", description: "Stepped loader for metrics and charts.", preview: `<div style="display:grid;grid-template-columns:repeat(4,10px);gap:6px;align-items:end;height:34px"><span style="height:10px;background:#4ade80;border-radius:3px"></span><span style="height:18px;background:#38bdf8;border-radius:3px"></span><span style="height:26px;background:#c2a4ff;border-radius:3px"></span><span style="height:34px;background:#fb7185;border-radius:3px"></span></div>`, html: `<div style="display:grid;grid-template-columns:repeat(4,10px);gap:6px;align-items:end;height:34px"><span style="height:10px;background:#4ade80;border-radius:3px"></span><span style="height:18px;background:#38bdf8;border-radius:3px"></span><span style="height:26px;background:#c2a4ff;border-radius:3px"></span><span style="height:34px;background:#fb7185;border-radius:3px"></span></div>` },
  ]);

  addToolkitCards("#textfx .tx-g", [
    { title: "Noise Gradient", description: "Hero headline with soft spectral range.", preview: `<strong style="font-size:30px;background:linear-gradient(135deg,#fff,#38bdf8,#c2a4ff);-webkit-background-clip:text;color:transparent">Spectrum</strong>`, html: `<h2 style="font-size:54px;background:linear-gradient(135deg,#fff,#38bdf8,#c2a4ff);-webkit-background-clip:text;color:transparent">Spectrum</h2>` },
    { title: "Stamp Serif", description: "Editorial serif lockup for launch pages.", preview: `<strong style="font-family:'Fraunces',serif;font-size:34px;color:#f8fafc">Editorial</strong>`, html: `<h2 style="font-family:'Fraunces',serif;font-size:56px;color:#f8fafc">Editorial</h2>` },
    { title: "Mono Badge", description: "Compact monospaced annotation label.", preview: `<span style="font-family:monospace;font-size:12px;letter-spacing:.18em;color:#4ade80">BUILD READY</span>`, html: `<span style="font-family:monospace;font-size:12px;letter-spacing:.18em;color:#4ade80">BUILD READY</span>` },
    { title: "Layered Blur", description: "Soft duplicate blur for premium titles.", preview: `<strong style="font-size:32px;color:#fff;text-shadow:0 0 16px rgba(194,164,255,.32),0 0 36px rgba(56,189,248,.18)">Soft Layer</strong>`, html: `<h2 style="font-size:52px;color:#fff;text-shadow:0 0 16px rgba(194,164,255,.32),0 0 36px rgba(56,189,248,.18)">Soft Layer</h2>` },
    { title: "Outline Capsule", description: "Uppercase category chip with border emphasis.", preview: `<span style="padding:7px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.18);font-size:11px;letter-spacing:.18em;color:#fff">TOOLKIT</span>`, html: `<span style="padding:7px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.18);font-size:11px;letter-spacing:.18em;color:#fff">TOOLKIT</span>` },
    { title: "Contrast Stack", description: "Thick black-and-white stack for posters.", preview: `<strong style="font-size:32px;color:#fff;text-shadow:4px 4px 0 #020617">Impact</strong>`, html: `<h2 style="font-size:54px;color:#fff;text-shadow:4px 4px 0 #020617">Impact</h2>` },
    { title: "Signal Outline", description: "Neon-lined uppercase tag for data products.", preview: `<strong style="font-size:24px;color:transparent;-webkit-text-stroke:1px #38bdf8;letter-spacing:.18em">STATUS</strong>`, html: `<span style="font-size:32px;color:transparent;-webkit-text-stroke:1px #38bdf8;letter-spacing:.18em">STATUS</span>` },
    { title: "Soft Serif Note", description: "Small editorial lockup for product notes.", preview: `<strong style="font-family:'Instrument Serif',serif;font-size:30px;color:#f8fafc">Release note</strong>`, html: `<h3 style="font-family:'Instrument Serif',serif;font-size:44px;color:#f8fafc">Release note</h3>` },
  ]);

  addToolkitCards("#shadows .sh-g", [
    { title: "Panel Float", description: "Long diffuse shadow for modals.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#111827;box-shadow:0 24px 80px rgba(2,6,23,.52)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#111827;box-shadow:0 24px 80px rgba(2,6,23,.52)">Panel float</div>` },
    { title: "Soft Canvas", description: "Paper-like shadow for calm interfaces.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#f8fafc;box-shadow:0 14px 40px rgba(15,23,42,.14)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#f8fafc;box-shadow:0 14px 40px rgba(15,23,42,.14)">Soft canvas</div>` },
    { title: "Aqua Glow", description: "Cold luminous edge for charts.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#0f172a;box-shadow:0 0 0 1px rgba(56,189,248,.24),0 0 34px rgba(56,189,248,.28)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#0f172a;box-shadow:0 0 0 1px rgba(56,189,248,.24),0 0 34px rgba(56,189,248,.28)">Aqua glow</div>` },
    { title: "Rose Halo", description: "Warm glow for editorial promos.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#18181b;box-shadow:0 18px 46px rgba(251,113,133,.26)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#18181b;box-shadow:0 18px 46px rgba(251,113,133,.26)">Rose halo</div>` },
    { title: "Double Stack", description: "Two-layer elevation for hero tiles.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#fff;box-shadow:0 8px 20px rgba(15,23,42,.08),0 24px 80px rgba(15,23,42,.12)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#fff;box-shadow:0 8px 20px rgba(15,23,42,.08),0 24px 80px rgba(15,23,42,.12)">Double stack</div>` },
    { title: "Inset Console", description: "Pressed interior for shells and panels.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#0b1120;box-shadow:inset 0 0 24px rgba(148,163,184,.16)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#0b1120;box-shadow:inset 0 0 24px rgba(148,163,184,.16)">Inset console</div>` },
  ]);

  addToolkitCards("#hover .hf-g", [
    { title: "Shear Card", description: "Poster-style shear on hover.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:linear-gradient(135deg,#0f172a,#7c3aed);transform:skewX(-6deg)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:linear-gradient(135deg,#0f172a,#7c3aed);transition:transform .24s" onmouseover="this.style.transform='skewX(-6deg) translateY(-6px)'" onmouseout="this.style.transform='none'"></div>` },
    { title: "Glow Border", description: "Border-only hover with ambient light.", preview: `<div style="width:110px;height:78px;border-radius:18px;border:1px solid rgba(194,164,255,.4);box-shadow:0 0 28px rgba(194,164,255,.18)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;border:1px solid rgba(194,164,255,.4);transition:box-shadow .24s" onmouseover="this.style.boxShadow='0 0 34px rgba(194,164,255,.24)'" onmouseout="this.style.boxShadow='none'"></div>` },
    { title: "Reveal Badge", description: "Badge that brightens on hover.", preview: `<span style="padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.08);color:#fff">Hover me</span>`, html: `<span style="padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.08);color:#fff;transition:all .24s" onmouseover="this.style.background='rgba(194,164,255,.18)';this.style.color='#c2a4ff'" onmouseout="this.style.background='rgba(255,255,255,.08)';this.style.color='#fff'">Hover me</span>` },
    { title: "Press Tile", description: "Tile that sinks with tactile feedback.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:#f8fafc;box-shadow:0 8px 0 #94a3b8"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:#f8fafc;box-shadow:0 8px 0 #94a3b8;transition:.12s" onmousedown="this.style.transform='translateY(8px)';this.style.boxShadow='0 0 0 #94a3b8'" onmouseup="this.style.transform='none';this.style.boxShadow='0 8px 0 #94a3b8'"></div>` },
    { title: "Halo Link", description: "Inline link with glowing underline.", preview: `<span style="padding-bottom:4px;border-bottom:2px solid #38bdf8;color:#fff">Open guide</span>`, html: `<a style="padding-bottom:4px;border-bottom:2px solid #38bdf8;color:#fff;text-decoration:none;transition:text-shadow .24s" onmouseover="this.style.textShadow='0 0 20px rgba(56,189,248,.4)'" onmouseout="this.style.textShadow='none'">Open guide</a>` },
    { title: "Depth Orbit", description: "Circular hover with rotating highlight.", preview: `<div style="width:78px;height:78px;border-radius:50%;background:conic-gradient(from 0deg,#38bdf8,#c2a4ff,#38bdf8)"></div>`, html: `<div style="width:120px;height:120px;border-radius:50%;background:conic-gradient(from 0deg,#38bdf8,#c2a4ff,#38bdf8);transition:transform .3s" onmouseover="this.style.transform='rotate(28deg) scale(1.06)'" onmouseout="this.style.transform='none'"></div>` },
    { title: "Glow Lift", description: "Ambient glow that lifts a solid card.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:#111827;box-shadow:0 0 28px rgba(194,164,255,.18)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:#111827;transition:transform .25s,box-shadow .25s" onmouseover="this.style.transform='translateY(-8px)';this.style.boxShadow='0 0 34px rgba(194,164,255,.24)'" onmouseout="this.style.transform='none';this.style.boxShadow='none'"></div>` },
    { title: "Border Sweep", description: "Card edge accent that travels on hover.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:#0f172a;border:1px solid rgba(255,255,255,.12)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:#0f172a;border:1px solid rgba(255,255,255,.12);position:relative;overflow:hidden" onmouseover="this.lastChild.style.transform='translateX(160px)'" onmouseout="this.lastChild.style.transform='translateX(-160px)'"><span style="position:absolute;left:-160px;top:0;bottom:0;width:80px;background:linear-gradient(90deg,transparent,rgba(194,164,255,.28),transparent);transition:transform .35s"></span></div>` },
    { title: "Soft Zoom", description: "Image-style zoom without hard movement.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:linear-gradient(135deg,#38bdf8,#c2a4ff);transform:scale(1.02)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:linear-gradient(135deg,#38bdf8,#c2a4ff);transition:transform .3s" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'"></div>` },
    { title: "Inset Focus", description: "Hovered panel with an inner focus ring.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:#0b1120;box-shadow:inset 0 0 0 1px rgba(194,164,255,.22)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:#0b1120;transition:box-shadow .25s" onmouseover="this.style.boxShadow='inset 0 0 0 2px rgba(194,164,255,.32)'" onmouseout="this.style.boxShadow='none'"></div>` },
  ]);

  addToolkitCards("#glass .gl-g", [
    { title: "Creator Mode", description: "Glass command chip for creative tools.", preview: `<div style="padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.09);backdrop-filter:blur(18px);color:#fff">Creator mode</div>`, html: `<div style="padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(18px);color:#fff">Creator mode</div>` },
    { title: "Metric Duo", description: "Two-up stat slab with frosted panel.", preview: `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%"><div style="height:52px;border-radius:16px;background:rgba(255,255,255,.08)"></div><div style="height:52px;border-radius:16px;background:rgba(255,255,255,.08)"></div></div>`, html: `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:14px;border-radius:22px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(20px)"><div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.06)">42%</div><div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.06)">89%</div></div>` },
    { title: "Glass Slab", description: "Wide radial glass plate for hero copy.", preview: `<div style="width:100%;height:62px;border-radius:24px;background:radial-gradient(circle at top left,rgba(255,255,255,.16),rgba(255,255,255,.05));backdrop-filter:blur(18px)"></div>`, html: `<div style="padding:24px;border-radius:24px;background:radial-gradient(circle at top left,rgba(255,255,255,.16),rgba(255,255,255,.05));border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(18px)">Glass slab</div>` },
    { title: "Overlay Card", description: "Translucent card with soft gradient orb.", preview: `<div style="position:relative;width:100%;height:70px;border-radius:20px;background:rgba(255,255,255,.08);overflow:hidden"><span style="position:absolute;top:-14px;right:-10px;width:44px;height:44px;border-radius:50%;background:radial-gradient(circle,#fb7185,transparent 70%)"></span></div>`, html: `<div style="position:relative;padding:24px;border-radius:20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(18px);overflow:hidden"><span style="position:absolute;top:-20px;right:-12px;width:68px;height:68px;border-radius:50%;background:radial-gradient(circle,#fb7185,transparent 70%)"></span>Overlay card</div>` },
    { title: "Sidebar Sheet", description: "Frosted side sheet for menus and inspectors.", preview: `<div style="width:100%;height:76px;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.05));border:1px solid rgba(255,255,255,.14)"></div>`, html: `<div style="padding:24px;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.05));border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(18px)">Sidebar sheet</div>` },
    { title: "Badge Cluster", description: "Small frosted chips for filters and modes.", preview: `<div style="display:flex;gap:8px;flex-wrap:wrap"><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09)">AI</span><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09)">3D</span><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09)">CSS</span></div>`, html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14)">AI</span><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14)">3D</span><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14)">CSS</span></div>` },
    { title: "Glass Meter", description: "Frosted progress meter for premium panels.", preview: `<div style="width:100%;padding:12px;border-radius:18px;background:rgba(255,255,255,.08)"><div style="height:8px;border-radius:999px;background:rgba(255,255,255,.12)"><div style="width:64%;height:100%;border-radius:999px;background:#c2a4ff"></div></div></div>`, html: `<div style="padding:12px;border-radius:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(16px)"><div style="height:8px;border-radius:999px;background:rgba(255,255,255,.12)"><div style="width:64%;height:100%;border-radius:999px;background:#c2a4ff"></div></div></div>` },
  ]);

  addToolkitCards("#utils .ut-g", [
    { title: "Status Dock", description: "Dock row for app and deploy states.", preview: `<div style="display:flex;gap:8px"><span class="kit-pill">Live</span><span class="kit-pill">Build</span><span class="kit-pill">DNS</span></div>`, html: `<div style="display:flex;gap:8px"><span style="padding:7px 10px;border-radius:999px;background:rgba(74,222,128,.14);color:#4ade80">Live</span><span style="padding:7px 10px;border-radius:999px;background:rgba(56,189,248,.14);color:#38bdf8">Build</span><span style="padding:7px 10px;border-radius:999px;background:rgba(250,204,21,.14);color:#facc15">DNS</span></div>` },
    { title: "Filter Tokens", description: "Dense token strip for search states.", preview: `<div style="display:flex;gap:6px;flex-wrap:wrap"><span class="kit-pill">CSS</span><span class="kit-pill">React</span><span class="kit-pill">3D</span></div>`, html: `<div style="display:flex;gap:6px;flex-wrap:wrap"><span style="padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.06)">CSS</span><span style="padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.06)">React</span><span style="padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.06)">3D</span></div>` },
    { title: "Metric Chip", description: "Compact KPI badge with delta.", preview: `<div style="padding:10px 12px;border-radius:14px;background:#111827;color:#fff">+18.4%</div>`, html: `<div style="display:inline-flex;gap:8px;align-items:center;padding:10px 12px;border-radius:14px;background:#111827;color:#fff"><strong>+18.4%</strong><span style="color:#4ade80">up</span></div>` },
    { title: "Code Capsule", description: "Inline code shell for docs and tokens.", preview: `<code style="padding:8px 10px;border-radius:10px;background:#0f172a;color:#38bdf8">npm run start</code>`, html: `<code style="padding:8px 10px;border-radius:10px;background:#0f172a;color:#38bdf8">npm run start</code>` },
    { title: "Legend Row", description: "Chart legend utility with compact dots.", preview: `<div style="display:flex;gap:10px"><span style="display:flex;gap:6px;align-items:center"><i style="width:8px;height:8px;border-radius:50%;background:#38bdf8"></i>Traffic</span></div>`, html: `<div style="display:flex;gap:12px;flex-wrap:wrap"><span style="display:flex;gap:6px;align-items:center"><i style="width:8px;height:8px;border-radius:50%;background:#38bdf8"></i>Traffic</span><span style="display:flex;gap:6px;align-items:center"><i style="width:8px;height:8px;border-radius:50%;background:#4ade80"></i>Conversion</span></div>` },
    { title: "Window Rail", description: "Top shell rail for editor mockups.", preview: `<div style="display:flex;gap:8px;padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.05);width:max-content"><span style="width:10px;height:10px;border-radius:50%;background:#ff5f57"></span><span style="width:10px;height:10px;border-radius:50%;background:#febc2e"></span><span style="width:10px;height:10px;border-radius:50%;background:#28c840"></span></div>`, html: `<div style="display:flex;gap:8px;padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.05);width:max-content"><span style="width:10px;height:10px;border-radius:50%;background:#ff5f57"></span><span style="width:10px;height:10px;border-radius:50%;background:#febc2e"></span><span style="width:10px;height:10px;border-radius:50%;background:#28c840"></span></div>` },
    { title: "Command Strip", description: "Shortcut bar with compact actionable keys.", preview: `<div style="display:flex;gap:6px"><span class="kit-pill">Ctrl</span><span class="kit-pill">Shift</span><span class="kit-pill">P</span></div>`, html: `<div style="display:flex;gap:6px"><kbd style="padding:6px 9px;border-radius:8px;background:#111827;color:#c2a4ff">Ctrl</kbd><kbd style="padding:6px 9px;border-radius:8px;background:#111827;color:#c2a4ff">Shift</kbd><kbd style="padding:6px 9px;border-radius:8px;background:#111827;color:#c2a4ff">P</kbd></div>` },
    { title: "Status Pair", description: "Two-state micro summary for headers.", preview: `<div style="display:flex;gap:8px"><span style="padding:7px 10px;border-radius:999px;background:rgba(74,222,128,.14);color:#4ade80">Synced</span><span style="padding:7px 10px;border-radius:999px;background:rgba(56,189,248,.14);color:#38bdf8">Cached</span></div>`, html: `<div style="display:flex;gap:8px"><span style="padding:7px 10px;border-radius:999px;background:rgba(74,222,128,.14);color:#4ade80">Synced</span><span style="padding:7px 10px;border-radius:999px;background:rgba(56,189,248,.14);color:#38bdf8">Cached</span></div>` },
    { title: "Alert Rail", description: "Thin status rail for app-shell notifications.", preview: `<div style="width:100%;height:8px;border-radius:999px;background:linear-gradient(90deg,#fb7185,#facc15,#4ade80)"></div>`, html: `<div style="width:100%;height:8px;border-radius:999px;background:linear-gradient(90deg,#fb7185,#facc15,#4ade80)"></div>` },
    { title: "Breadcrumb Ghost", description: "Soft breadcrumb trail for dense apps.", preview: `<div style="display:flex;gap:8px;color:#94a3b8"><span>Projects</span><span>/</span><span style="color:#fff">Toolkit</span></div>`, html: `<nav style="display:flex;gap:8px;color:#94a3b8"><a>Projects</a><span>/</span><strong style="color:#fff">Toolkit</strong></nav>` },
  ]);
}

function initPagination() {
  const instances = [];
  catalogPaginationState.instances = instances;

  document.querySelectorAll(".paginated").forEach((grid) => {
    const items = getPaginationItems(grid);
    items.forEach((item) => item.classList.add("page-item"));

    if (items.length <= 1) return;

    const controls = createPaginationControls(grid);
    const prevButton = controls.querySelector(".prev-btn");
    const nextButton = controls.querySelector(".next-btn");
    const status = controls.querySelector(".pagination-status");

    const instance = {
      grid,
      items,
      controls,
      prevButton,
      nextButton,
      status,
      currentPage: 1,
      maxPage: 1,
      pageSize: items.length,
    };

    prevButton.addEventListener("click", () => {
      if (instance.currentPage === 1) return;
      instance.currentPage -= 1;
      updatePaginationInstance(instance);
      grid.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    nextButton.addEventListener("click", () => {
      if (instance.currentPage === instance.maxPage) return;
      instance.currentPage += 1;
      updatePaginationInstance(instance);
      grid.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    updatePaginationInstance(instance);
    instances.push(instance);
  });

  const scheduleRefresh = () => {
    window.cancelAnimationFrame(catalogPaginationState.frame);
    catalogPaginationState.frame = window.requestAnimationFrame(() => {
      instances.forEach((instance) => {
        instance.measurementSignature = "";
        updatePaginationInstance(instance);
      });
    });
  };

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(scheduleRefresh, 120);
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      scheduleRefresh();
    }
  });

  catalogPaginationState.resizeObserver?.disconnect();
}

function initBackgroundAudio() {
  backgroundAudioState.audio = document.getElementById("background-audio");
  backgroundAudioState.toggle = document.getElementById("background-audio-toggle");

  const { audio, toggle } = backgroundAudioState;
  if (!audio || !toggle) return;

  audio.autoplay = false;
  audio.loop = true;
  audio.preload = "none";
  audio.muted = false;
  audio.volume = 0.32;
  setBackgroundAudioState("paused");

  audio.addEventListener("play", () => setBackgroundAudioState("playing"));
  audio.addEventListener("pause", () => setBackgroundAudioState("paused"));

  toggle.addEventListener("click", async () => {
    if (audio.paused) {
      backgroundAudioState.hasUserPaused = false;
      await playBackgroundAudio();
      return;
    }

    backgroundAudioState.hasUserPaused = true;
    audio.pause();
    setBackgroundAudioState("paused");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initCopyButtons();
  initScrollEffects();
  syncCatalogStructure();
  initSectionMenu();
  enhanceCatalog();
  addMarketplaceDepth();
  pruneCatalogNoise();
  rebuildTypographyLibrary();
  deepenCatalog();
  addSeraCatalog();
  expandSeraCatalog();
  addProductCatalog();
  addInspirationCatalog();
  addDeepInspirationCatalog();
  addExpandedCategoryCatalog();
  addSourceDeepCatalog();
  stabilizeCatalogComposition();
  syncCatalogFooter();
  repairDemoAccessibility();
  configureCatalogPagination();
  initPagination();
  initBackgroundAudio();
});
