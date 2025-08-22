/**
 * Simple Color Contrast Audit Script
 *
 * Runs WCAG 2.1 AA compliance audit on the current color palette
 */

import { testColorPair } from "../src/utils/color-contrast-audit";

console.log("🎨 Running Color Contrast Audit for HumanOS BizIdea\n");

// Test common color pairs from your current palette
const CURRENT_PALETTE_PAIRS = [
  // Primary colors on white
  { fg: "#3b82f6", bg: "#FFFFFF", desc: "Primary-500 on White" },
  { fg: "#2563eb", bg: "#FFFFFF", desc: "Primary-600 on White" },
  { fg: "#1d4ed8", bg: "#FFFFFF", desc: "Primary-700 on White" },

  // Primary colors on light gray
  { fg: "#3b82f6", bg: "#f3f4f6", desc: "Primary-500 on Gray-100" },
  { fg: "#2563eb", bg: "#f3f4f6", desc: "Primary-600 on Gray-100" },

  // Text colors
  { fg: "#111827", bg: "#FFFFFF", desc: "Gray-900 on White (Text)" },
  { fg: "#374151", bg: "#FFFFFF", desc: "Gray-700 on White (Secondary Text)" },
  { fg: "#6b7280", bg: "#FFFFFF", desc: "Gray-500 on White (Muted Text)" },

  // Dark mode
  { fg: "#FFFFFF", bg: "#111827", desc: "White on Gray-900 (Dark Text)" },
  { fg: "#E5E7EB", bg: "#1F2937", desc: "Gray-200 on Gray-800" },
  { fg: "#9CA3AF", bg: "#374151", desc: "Gray-400 on Gray-700" },

  // Success/Error states
  { fg: "#10b981", bg: "#FFFFFF", desc: "Success on White" },
  { fg: "#ef4444", bg: "#FFFFFF", desc: "Error on White" },
  { fg: "#10b981", bg: "#f0fdf4", desc: "Success on Success-50" },
  { fg: "#ef4444", bg: "#fef2f2", desc: "Error on Error-50" },

  // Button states
  { fg: "#FFFFFF", bg: "#3b82f6", desc: "White on Primary-500 (Button)" },
  { fg: "#FFFFFF", bg: "#2563eb", desc: "White on Primary-600 (Button Hover)" },
  {
    fg: "#3b82f6",
    bg: "#e0f2fe",
    desc: "Primary-500 on Primary-100 (Ghost Button)",
  },
];

console.log("🔍 Testing Current Color Palette Combinations:\n");
console.log("| Colors | Ratio | WCAG AA | Description |");
console.log("|--------|-------|---------|-------------|");

let compliantCount = 0;
let nonCompliantCount = 0;
const nonCompliantPairs: Array<{
  fg: string;
  bg: string;
  ratio: number;
  desc: string;
}> = [];

CURRENT_PALETTE_PAIRS.forEach(({ fg, bg, desc }) => {
  const result = testColorPair(fg, bg);
  const status = result.compliant ? "✅ PASS" : "❌ FAIL";
  console.log(`| ${fg} on ${bg} | ${result.ratio}:1 | ${status} | ${desc} |`);

  if (result.compliant) {
    compliantCount++;
  } else {
    nonCompliantCount++;
    nonCompliantPairs.push({ fg, bg, ratio: result.ratio, desc });
  }
});

const total = compliantCount + nonCompliantCount;
const complianceRate = Math.round((compliantCount / total) * 100);

console.log("\n📊 Audit Summary:");
console.log(`- Total Combinations Tested: ${total}`);
console.log(`- WCAG AA Compliant: ${compliantCount}`);
console.log(`- Non-Compliant: ${nonCompliantCount}`);
console.log(`- Compliance Rate: ${complianceRate}%`);

if (nonCompliantCount > 0) {
  console.log("\n🚨 Non-Compliant Color Pairs:");
  nonCompliantPairs.forEach((pair) => {
    console.log(
      `   - ${pair.fg} on ${pair.bg} (${pair.ratio}:1) - ${pair.desc}`
    );
  });

  console.log("\n💡 Recommendations:");
  console.log("1. Increase contrast for non-compliant pairs:");
  console.log("   - Darken text colors or lighten backgrounds");
  console.log("   - Use higher contrast color variants");
  console.log("   - Avoid using low-contrast combinations for text");

  console.log("\n2. Focus on these critical improvements:");
  nonCompliantPairs.slice(0, 3).forEach((pair) => {
    console.log(`   - Fix: ${pair.desc}`);
  });
} else {
  console.log(
    "\n✅ Excellent! All tested color pairs meet WCAG AA requirements."
  );
}

console.log("\n🎯 Next Steps:");
console.log("1. Update Tailwind config with WCAG-compliant colors");
console.log("2. Test with real component examples");
console.log("3. Run automated accessibility tests");
console.log("4. Conduct user testing with diverse users");

// Export for potential use in other scripts
export const auditResults = {
  compliantCount,
  nonCompliantCount,
  total,
  complianceRate,
  nonCompliantPairs,
};
