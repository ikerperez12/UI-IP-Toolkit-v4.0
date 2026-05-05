import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home passes automated accessibility scan for serious issues", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .disableRules([
      // The catalog intentionally contains hundreds of visual examples. Full
      // page region heuristics can over-report inside decorative preview cards,
      // so semantic structure is asserted separately below.
      "region",
    ])
    .analyze();

  const blockingViolations = results.violations.filter((violation) =>
    ["critical", "serious"].includes(violation.impact || ""),
  );

  expect(blockingViolations).toEqual([]);
});

test("rendered catalog keeps accessible structure", async ({ page }) => {
  await page.goto("/");
  await page.waitForFunction(() => document.querySelectorAll(".has-copy[data-normalized='true']").length > 700);

  const metrics = await page.evaluate(() => {
    const controls = [...document.querySelectorAll("input, select, textarea")];
    const unlabeled = controls.filter((element) => {
      if (element.type === "hidden") return false;
      if (element.getAttribute("aria-label") || element.getAttribute("aria-labelledby")) return false;
      if (element.closest("label")) return false;
      if (element.id && document.querySelector(`label[for="${CSS.escape(element.id)}"]`)) return false;
      return true;
    });

    const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

    return {
      sections: document.querySelectorAll("main section[id]").length,
      h1: document.querySelectorAll("h1").length,
      h4: document.querySelectorAll("h4").length,
      unlabeledControls: unlabeled.length,
      duplicateIds: new Set(duplicateIds).size,
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      tableSnippets: [...document.querySelectorAll('[data-kind="table"]')].filter((card) => card.dataset.html?.includes("<table")).length,
      dialogSnippets: [...document.querySelectorAll('[data-kind="modal"]')].filter((card) => card.dataset.html?.includes("<dialog")).length,
      normalizedSnippets: document.querySelectorAll(".has-copy[data-normalized='true']").length,
      switchSnippets: [...document.querySelectorAll(".has-copy[data-html]")].filter((card) => card.dataset.html?.includes('role="switch"')).length,
      radioFieldsets: [...document.querySelectorAll(".has-copy[data-html]")].filter((card) => card.dataset.html?.includes("<fieldset") && card.dataset.html?.includes("<legend")).length,
      progressbarSnippets: [...document.querySelectorAll(".has-copy[data-html]")].filter((card) => card.dataset.html?.includes('role="progressbar"')).length,
      searchControls: [...document.querySelectorAll(".has-copy[data-html]")].filter((card) => card.dataset.html?.includes('aria-controls') && card.dataset.html?.includes('role="search"')).length,
      cardLandmarks: document.querySelectorAll(".has-copy :is(header, footer, main, nav, aside, section, article)").length,
      sectionMenuLinks: document.querySelectorAll(".section-menu-links a").length,
    };
  });

  expect(metrics.sections).toBe(64);
  expect(metrics.h1).toBe(1);
  expect(metrics.h4).toBe(0);
  expect(metrics.unlabeledControls).toBe(0);
  expect(metrics.duplicateIds).toBe(0);
  expect(metrics.horizontalOverflow).toBe(0);
  expect(metrics.tableSnippets).toBeGreaterThan(0);
  expect(metrics.dialogSnippets).toBeGreaterThan(0);
  expect(metrics.normalizedSnippets).toBeGreaterThan(700);
  expect(metrics.switchSnippets).toBeGreaterThan(0);
  expect(metrics.radioFieldsets).toBeGreaterThan(0);
  expect(metrics.progressbarSnippets).toBeGreaterThan(0);
  expect(metrics.searchControls).toBeGreaterThan(0);
  expect(metrics.cardLandmarks).toBe(0);
  expect(metrics.sectionMenuLinks).toBe(64);
});

test("catalog remains useful without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "UI IP Toolkit is usable without JavaScript" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open the GitHub repository" })).toHaveAttribute(
    "href",
    "https://github.com/ikerperez12/UI-IP-Toolkit-v4.0",
  );
  await expect(page.getByRole("link", { name: "Open the XML sitemap" })).toHaveAttribute("href", "/sitemap.xml");

  await context.close();
});
