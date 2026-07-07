// Deeper verification - check content visibility too
import { chromium } from "playwright";

const PORT = 4321;
const COLLAPSIBLE_URL = `http://localhost:${PORT}/components/element/collapsible`;
const TAG_URL = `http://localhost:${PORT}/components/element/tag`;

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error" || msg.type() === "warning") {
    errors.push(`[${msg.type()}] ${msg.text()}`);
  }
});
page.on("pageerror", (err) => errors.push(`[pageerror] ${err.message}`));

try {
  // -------- Collapsible --------
  console.log(`Opening ${COLLAPSIBLE_URL}`);
  await page.goto(COLLAPSIBLE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);

  const containers = await page.locator(".mizu-collapsible").all();
  console.log(`Total .mizu-collapsible containers: ${containers.length}`);

  // Detailed test: for each container, check trigger button data-state AND content visibility
  for (let i = 0; i < containers.length; i++) {
    const container = containers[i];

    // Check if disabled
    const disabledRoot = container.locator("[data-disabled]");
    if ((await disabledRoot.count()) > 0) {
      console.log(`\nContainer ${i}: DISABLED`);
      continue;
    }

    // Find trigger button (with data-state)
    const triggerBtn = container.locator("button[data-state]").first();
    if ((await triggerBtn.count()) === 0) {
      console.log(`\nContainer ${i}: No button with data-state`);
      continue;
    }

    const btnText = (await triggerBtn.textContent()).trim();
    const stateBefore = await triggerBtn.getAttribute("data-state");

    // Check content visibility
    const content = container.locator(".mizu-collapsible__content");
    const contentStateBefore = await content.getAttribute("data-state");
    const contentVisibleBefore = await content.isVisible().catch(() => "error");

    console.log(`\nContainer ${i}: "${btnText}"`);
    console.log(`  Trigger data-state: ${stateBefore}`);
    console.log(`  Content data-state: ${contentStateBefore}, visible: ${contentVisibleBefore}`);

    // Click
    await triggerBtn.click();
    await page.waitForTimeout(800);

    const stateAfter = await triggerBtn.getAttribute("data-state");
    const contentStateAfter = await content.getAttribute("data-state");
    const contentVisibleAfter = await content.isVisible().catch(() => "error");
    const changed = stateBefore !== stateAfter;

    console.log(`  --- After click ---`);
    console.log(`  Trigger data-state: ${stateAfter}`);
    console.log(`  Content data-state: ${contentStateAfter}, visible: ${contentVisibleAfter}`);
    console.log(`  Changed: ${changed}`);

    // Stop after first 4 non-disabled containers to keep output manageable
    if (i >= 4) {
      console.log(`\n  (stopping detailed check after 5 containers)`);
      break;
    }
  }

  // -------- Tag --------
  console.log(`\n\n========== TAG ==========`);
  console.log(`Opening ${TAG_URL}`);
  await page.goto(TAG_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  const interactiveSection = page
    .locator(".tag-examples .example-section")
    .filter({ hasText: "Interactive" })
    .first();
  const tagRow = interactiveSection.locator(".tag-row").first();
  const tagCount = await tagRow.locator(".mizu-tag").count();
  console.log(`Initial tags: ${tagCount}`);

  const addButton = interactiveSection
    .locator("button.mizu-button")
    .filter({ hasText: "Add" })
    .first();
  await addButton.click();
  await page.waitForTimeout(500);
  const afterCount = await tagRow.locator(".mizu-tag").count();
  console.log(`After Add: ${afterCount} (delta: ${afterCount - tagCount})`);
} catch (err) {
  errors.push(`[fatal] ${err.message}`);
  console.error("Fatal error:", err);
} finally {
  await browser.close();
}

console.log(`\n\n========== CONSOLE ERRORS/WARNINGS ==========`);
console.log(JSON.stringify(errors, null, 2));
