const r = await fetch("http://localhost:4321/components/navigation-menu/");
const h = await r.text();

// Find bp-nav-menu__content elements
const contentRegex = /data-reka-navigation-menu[^>]*/g;
let m;
while ((m = contentRegex.exec(h)) !== null) {
  const idx = m.index;
  console.log("---", h.substring(Math.max(0, idx - 30), Math.min(idx + 250, h.length)));
}

// Also search for data-state
const stateRegex = /data-state="[^"]*"/g;
const states = new Set();
while ((m = stateRegex.exec(h)) !== null) states.add(m[0]);
console.log("\ndata-state values found:", [...states]);

// Search for data-orientation
const orientRegex = /data-orientation="[^"]*"/g;
const orientations = new Set();
while ((m = orientRegex.exec(h)) !== null) orientations.add(m[0]);
console.log("data-orientation values:", [...orientizations]);
