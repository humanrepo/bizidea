/**
 * Test Enhanced Color Palette for WCAG Compliance
 */

import { testColorPair } from "../src/utils/color-contrast-audit";

console.log("🎨 Testing Enhanced Color Palette for WCAG Compliance\n");

// Test the enhanced color combinations
const ENHANCED_PALETTE_PAIRS = [
  // Primary colors on white (using higher contrast variants)
  { fg: "#2563eb", bg: "#FFFFFF", desc: "Primary-600 on White (Enhanced)" },
  { fg: "#1d4ed8", bg: "#FFFFFF", desc: "Primary-700 on White (Enhanced)" },

  // Primary colors on light gray
  { fg: "#2563eb", bg: "#f3f4f6", desc: "Primary-600 on Gray-100 (Enhanced)" },
  { fg: "#1d4ed8", bg: "#f3f4f6", desc: "Primary-700 on Gray-100 (Enhanced)" },

  // Enhanced success colors
  { fg: "#22c55e", bg: "#FFFFFF", desc: "Success-500 on White (Enhanced)" },
  { fg: "#16a34a", bg: "#FFFFFF", desc: "Success-600 on White (Enhanced)" },
  { fg: "#22c55e", bg: "#f0fdf4", desc: "Success-500 on Success-50" },

  // Enhanced error colors
  { fg: "#dc2626", bg: "#FFFFFF", desc: "Error-600 on White (Enhanced)" },
  { fg: "#dc2626", bg: "#fef2f2", desc: "Error-600 on Error-50" },

  // Button states with enhanced contrast
  {
    fg: "#FFFFFF",
    bg: "#2563eb",
    desc: "White on Primary-600 (Button Enhanced)",
  },
  {
    fg: "#FFFFFF",
    bg: "#1d4ed8",
    desc: "White on Primary-700 (Button Hover Enhanced)",
  },

  // Text colors (should remain compliant)
  { fg: "#111827", bg: "#FFFFFF", desc: "Gray-900 on White (Text)" },
  { fg: "#374151", bg: "#FFFFFF", desc: "Gray-700 on White (Secondary Text)" },
  { fg: "#6b7280", bg: "#FFFFFF", desc: "Gray-500 on White (Muted Text)" },

  // Dark mode
  { fg: "#FFFFFF", bg: "#111827", desc: "White on Gray-900 (Dark Text)" },
  { fg: "#E5E7EB", bg: "#1F2937", desc: "Gray-200 on Gray-800" },

  // Ensure we didn't break existing compliant pairs
  {
    fg: "#3b82f6",
    bg: "#FFFFFF",
    desc: "Primary-500 on White (Base - for large text)",
  },
];

console.log("🔍 Testing Enhanced Color Combinations:\n");
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

ENHANCED_PALETTE_PAIRS.forEach(({ fg, bg, desc }) => {
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

console.log("\n📊 Enhanced Palette Audit Summary:");
console.log(`- Total Combinations Tested: ${total}`);
console.log(`- WCAG AA Compliant: ${compliantCount}`);
console.log(`- Non-Compliant: ${nonCompliantCount}`);
console.log(`- Compliance Rate: ${complianceRate}%`);

if (nonCompliantCount > 0) {
  console.log("\n⚠️  Non-Compliant Color Pairs (to be used carefully):");
  nonCompliantPairs.forEach((pair) => {
    console.log(
      `   - ${pair.fg} on ${pair.bg} (${pair.ratio}:1) - ${pair.desc}`
    );
    console.log(
      `     💡 Recommendation: Use for large text (18pt+ or bold 14pt+) only`
    );
  });
} else {
  console.log(
    "\n✅ Excellent! All enhanced color pairs meet WCAG AA requirements."
  );
}

console.log("\n🎯 Usage Guidelines:");
console.log(
  "1. Use Primary-600 (#2563eb) for normal text on light backgrounds"
);
console.log("2. Use Primary-700 (#1d4ed8) for better contrast where needed");
console.log(
  "3. Use Success-600 (#16a34a) for success states requiring good contrast"
);
console.log(
  "4. Use Error-600 (#dc2626) for error states requiring good contrast"
);
console.log(
  "5. Primary-500 (#3b82f6) can be used for large text or bold elements"
);

console.log("\n📋 Next Steps:");
console.log("1. Update components to use enhanced color variants");
console.log("2. Test with real content and user interfaces");
console.log("3. Run comprehensive accessibility testing");
console.log("4. Document color usage guidelines for the team");

export const enhancedPaletteResults = {
  compliantCount,
  nonCompliantCount,
  total,
  complianceRate,
  nonCompliantPairs,
};
