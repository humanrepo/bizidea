/**
 * Component-Level Color System Test
 *
 * Tests the enhanced color system across key application components
 */

import { testColorPair } from "../src/utils/color-contrast-audit";

console.log("🧪 Testing Enhanced Color System Across Components\n");

// Test key component color combinations
const COMPONENT_COLOR_TESTS = [
  // Button components
  {
    fg: "#FFFFFF",
    bg: "#2563eb",
    desc: "Primary Button Text",
    component: "Button",
  },
  {
    fg: "#FFFFFF",
    bg: "#1d4ed8",
    desc: "Primary Button Hover",
    component: "Button",
  },
  {
    fg: "#2563eb",
    bg: "#dbeafe",
    desc: "Secondary Button",
    component: "Button",
  },

  // Form components
  { fg: "#111827", bg: "#FFFFFF", desc: "Input Text", component: "Input" },
  { fg: "#374151", bg: "#FFFFFF", desc: "Input Label", component: "Input" },
  {
    fg: "#6b7280",
    bg: "#FFFFFF",
    desc: "Input Placeholder",
    component: "Input",
  },
  { fg: "#dc2626", bg: "#FFFFFF", desc: "Error Message", component: "Form" },
  { fg: "#16a34a", bg: "#FFFFFF", desc: "Success Message", component: "Form" },

  // Card components
  { fg: "#111827", bg: "#FFFFFF", desc: "Card Text", component: "Card" },
  {
    fg: "#374151",
    bg: "#f9fafb",
    desc: "Card Secondary Text",
    component: "Card",
  },

  // Navigation
  { fg: "#111827", bg: "#FFFFFF", desc: "Navbar Text", component: "Navbar" },
  {
    fg: "#2563eb",
    bg: "#FFFFFF",
    desc: "Active Nav Item",
    component: "Navbar",
  },

  // Footer
  { fg: "#6b7280", bg: "#f9fafb", desc: "Footer Text", component: "Footer" },

  // Dark mode variants
  { fg: "#FFFFFF", bg: "#111827", desc: "Dark Mode Text", component: "Theme" },
  {
    fg: "#E5E7EB",
    bg: "#1F2937",
    desc: "Dark Mode Secondary",
    component: "Theme",
  },
];

console.log("🔍 Testing Component Color Combinations:\n");
console.log("| Component | Colors | Ratio | WCAG AA | Description |");
console.log("|-----------|--------|-------|---------|-------------|");

let compliantCount = 0;
let nonCompliantCount = 0;
const resultsByComponent: Record<string, { compliant: number; total: number }> =
  {};

COMPONENT_COLOR_TESTS.forEach(({ fg, bg, desc, component }) => {
  const result = testColorPair(fg, bg);
  const status = result.compliant ? "✅ PASS" : "❌ FAIL";
  console.log(
    `| ${component} | ${fg} on ${bg} | ${result.ratio}:1 | ${status} | ${desc} |`
  );

  if (result.compliant) {
    compliantCount++;
  } else {
    nonCompliantCount++;
  }

  // Track by component
  if (!resultsByComponent[component]) {
    resultsByComponent[component] = { compliant: 0, total: 0 };
  }
  resultsByComponent[component].total++;
  if (result.compliant) {
    resultsByComponent[component].compliant++;
  }
});

const total = compliantCount + nonCompliantCount;
const complianceRate = Math.round((compliantCount / total) * 100);

console.log("\n📊 Component-Level Results:");
console.log(`- Total Combinations Tested: ${total}`);
console.log(`- WCAG AA Compliant: ${compliantCount}`);
console.log(`- Non-Compliant: ${nonCompliantCount}`);
console.log(`- Compliance Rate: ${complianceRate}%`);

console.log("\n📈 Component Breakdown:");
Object.entries(resultsByComponent).forEach(([component, stats]) => {
  const componentRate = Math.round((stats.compliant / stats.total) * 100);
  console.log(
    `- ${component}: ${stats.compliant}/${stats.total} (${componentRate}%)`
  );
});

if (nonCompliantCount > 0) {
  console.log("\n⚠️  Components Needing Attention:");
  COMPONENT_COLOR_TESTS.forEach(({ fg, bg, desc, component }) => {
    const result = testColorPair(fg, bg);
    if (!result.compliant) {
      console.log(
        `   - ${component}: ${desc} (${fg} on ${bg}, ${result.ratio}:1)`
      );
    }
  });
} else {
  console.log(
    "\n✅ Excellent! All component color combinations meet WCAG AA requirements."
  );
}

console.log("\n🎯 Implementation Recommendations:");
console.log("1. Use primary-600 (#2563eb) for interactive elements");
console.log("2. Use primary-700 (#1d4ed8) for hover states");
console.log("3. Ensure error/success messages use enhanced contrast variants");
console.log("4. Test dark mode compatibility for all components");

console.log("\n🔧 Next Steps:");
console.log("1. Update component styles to use enhanced color variables");
console.log("2. Test with real user content and interactions");
console.log("3. Conduct comprehensive accessibility testing");
console.log("4. Monitor contrast ratios during development");

export const componentTestResults = {
  compliantCount,
  nonCompliantCount,
  total,
  complianceRate,
  resultsByComponent,
};
