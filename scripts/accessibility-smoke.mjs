import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const html = read("index.html");
const app = read("assets/app.js");
const vercel = JSON.parse(read("vercel.json"));

const checks = [
  ["skip link targets main content", html.includes('class="skip-link" href="#main-content"')],
  ["page uses header landmark", /<header\b/.test(html)],
  ["primary navigation has an accessible name", /<nav\b[^>]*aria-label="Primary navigation"/.test(html)],
  ["main landmark is present", /<main\b[^>]*id="main-content"/.test(html)],
  ["footer landmark remains present", /<footer\b[^>]*class="final-cta"/.test(html)],
  ["global focus-visible style is defined", /:focus-visible/.test(html)],
  ["reduced-motion preference is respected", /prefers-reduced-motion:reduce/.test(html)],
  ["coarse pointers do not get the custom cursor", /@media\(pointer:coarse\)/.test(html)],
  ["copy buttons expose aria-label", app.includes('aria-label="Copy snippet"')],
  ["copy action announces a live status", app.includes('id = "copy-status"') && app.includes('aria-live')],
  ["form controls are repaired with labels", app.includes("labelFormControls") && app.includes("hasProgrammaticLabel")],
  ["runtime promotes section headings", app.includes("repairSectionSemantics") && app.includes('replaceElementTag(titleNode, "h2")')],
  ["runtime removes h4 card headings", app.includes("querySelectorAll(\".has-copy h4")],
  ["scrollable code samples are keyboard reachable", app.includes('querySelectorAll(".has-copy code")') && app.includes("scrollable code sample")],
  ["native dialog snippets are generated", app.includes("<dialog open") && app.includes("aria-labelledby")],
  ["data table snippets use real tables", app.includes("<table") && app.includes('scope="col"') && app.includes('scope="row"')],
  ["loader snippets expose status semantics", app.includes('role", "status"') || app.includes('role="status"')],
  ["snippets are normalized before copy", app.includes("normalizeSnippetMarkup") && app.includes('data-normalized="true"')],
  ["radio groups are wrapped with fieldset and legend", app.includes("ensureRadioGroupSemantics") && app.includes("document.createElement(\"fieldset\")") && app.includes("document.createElement(\"legend\")")],
  ["switch snippets remain keyboard-operable", app.includes("createAccessibleSwitchMarkup") && app.includes('role="switch"')],
  ["progress snippets expose progressbar semantics", app.includes("ensureProgressSemantics") && app.includes('role", "progressbar"')],
  ["search and load-more snippets expose controlled regions", app.includes("ensureSearchRelationships") && app.includes("ensureLoadMoreRelationships") && app.includes("aria-controls")],
  ["no-JS fallback is present", html.includes("<noscript>") && html.includes("UI IP Toolkit is usable without JavaScript")],
  ["analytics is loaded from external deferred code", !/<script type="module">\s*import \{ inject \}/.test(html) && app.includes("initVercelObservability")],
  ["section menu remains generated from catalogSections", app.includes("buildSectionMenu(activeSections)")],
  ["Vercel CSP avoids inline script hashes", JSON.stringify(vercel).includes("script-src 'self'") && !JSON.stringify(vercel).includes("sha256-")],
];

const failures = checks.filter(([, passed]) => !passed);

if (failures.length) {
  console.error("Accessibility smoke check failed:");
  failures.forEach(([name]) => console.error(`- ${name}`));
  process.exit(1);
}

console.log(`Accessibility smoke check passed (${checks.length} checks).`);
