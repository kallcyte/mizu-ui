import fs from "fs";
let c = fs.readFileSync("D:/codes/mizu-ui/.agents/plans/PLAN.md", "utf8");

// Find the exact text for Form Validation section
const oldText = `### Form Validation (Future)

Validation will be demonstrated through the sample pages rather than baked into \`MizuInput\`. The component stays a controlled primitive (\`v-model\` + \`error\` + \`helperText\` props) and consumers plug in their own validation layer.

Candidate approaches to evaluate when implementing the Login page:
- Hand-rolled composables using \`ref\` + \`computed\` (no dependency)
- VeeValidate + \`@vee-validate/zod\` (popular Vue form library with schema support)
- Zod schemas wrapped in a thin \`useMizuField\` composable

A "Validation patterns" section may also be added to the Input demo showing required / email format / min length / password match examples without a library.`;

console.log("Found:", c.includes(oldText));
if (!c.includes(oldText)) {
  // Try to find the start
  const idx = c.indexOf("### Form Validation (Future)");
  console.log("Index:", idx);
  if (idx > 0) {
    console.log("Excerpt:", JSON.stringify(c.slice(idx, idx + 200)));
  }
}
