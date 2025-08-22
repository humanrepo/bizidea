/**
 * Color Contrast Audit Tool for WCAG 2.1 AA Compliance
 *
 * This utility helps audit color contrast ratios to ensure accessibility compliance.
 * WCAG AA requires a minimum contrast ratio of 4.5:1 for normal text.
 */

interface ColorPair {
  foreground: string;
  background: string;
  ratio: number;
  compliant: boolean;
  location: string;
}

interface ContrastResult {
  compliant: ColorPair[];
  nonCompliant: ColorPair[];
  total: number;
  complianceRate: number;
}

/**
 * Calculate luminance of a hex color
 */
function getLuminance(hex: string): number {
  const rgb = parseInt(hex.substring(1), 16);
  const r = ((rgb >> 16) & 0xff) / 255;
  const g = ((rgb >> 8) & 0xff) / 255;
  const b = ((rgb >> 0) & 0xff) / 255;

  const rs = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gs = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bs = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(foreground: string, background: string): number {
  const lum1 = getLuminance(foreground);
  const lum2 = getLuminance(background);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA requirements
 */
function isWCAGCompliant(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Extract color pairs from CSS content
 */
function extractColorPairs(cssContent: string): ColorPair[] {
  const colorPairs: ColorPair[] = [];
  const colorRegex = /#([a-f0-9]{6}|[a-f0-9]{3})\b/gi;

  // This is a simplified example - in a real implementation, you'd parse
  // the actual CSS to find foreground/background combinations
  const matches = cssContent.match(colorRegex) || [];
  const uniqueColors = [...new Set(matches)];

  // Test all combinations (simplified for demo)
  for (let i = 0; i < uniqueColors.length; i++) {
    for (let j = i + 1; j < uniqueColors.length; j++) {
      const ratio = getContrastRatio(uniqueColors[i], uniqueColors[j]);
      colorPairs.push({
        foreground: uniqueColors[i],
        background: uniqueColors[j],
        ratio: Math.round(ratio * 100) / 100,
        compliant: isWCAGCompliant(ratio),
        location: "Global",
      });
    }
  }

  return colorPairs;
}

/**
 * Main audit function
 */
export function auditColorContrast(cssContent: string): ContrastResult {
  const colorPairs = extractColorPairs(cssContent);
  const compliant = colorPairs.filter((pair) => pair.compliant);
  const nonCompliant = colorPairs.filter((pair) => !pair.compliant);
  const complianceRate = (compliant.length / colorPairs.length) * 100;

  return {
    compliant,
    nonCompliant,
    total: colorPairs.length,
    complianceRate: Math.round(complianceRate * 100) / 100,
  };
}

/**
 * Generate a comprehensive contrast report
 */
export function generateContrastReport(result: ContrastResult): string {
  let report = `# Color Contrast Audit Report\n\n`;
  report += `## Summary\n`;
  report += `- Total Color Pairs Tested: ${result.total}\n`;
  report += `- WCAG AA Compliant: ${result.compliant.length}\n`;
  report += `- Non-Compliant: ${result.nonCompliant.length}\n`;
  report += `- Compliance Rate: ${result.complianceRate}%\n\n`;

  if (result.nonCompliant.length > 0) {
    report += `## Non-Compliant Color Pairs\n\n`;
    report += `| Foreground | Background | Ratio | Required | Status |\n`;
    report += `|------------|------------|-------|----------|--------|\n`;

    result.nonCompliant.forEach((pair) => {
      const status = pair.compliant ? "✅ PASS" : "❌ FAIL";
      const required = pair.ratio < 4.5 ? "≥4.5:1" : "≥3:1";
      report += `| ${pair.foreground} | ${pair.background} | ${pair.ratio}:1 | ${required} | ${status} |\n`;
    });

    report += `\n## Recommendations\n\n`;
    report += `1. Increase contrast for non-compliant pairs\n`;
    report += `2. Consider using semantic color variables\n`;
    report += `3. Test with real user content\n`;
    report += `4. Use automated testing tools for ongoing monitoring\n`;
  }

  return report;
}

// Utility function to test specific color pairs
export function testColorPair(
  foreground: string,
  background: string
): ColorPair {
  const ratio = getContrastRatio(foreground, background);
  return {
    foreground,
    background,
    ratio: Math.round(ratio * 100) / 100,
    compliant: isWCAGCompliant(ratio),
    location: "Manual Test",
  };
}

// Common color combinations to test
export const COMMON_COLOR_PAIRS = [
  // Primary text on backgrounds
  { fg: "#000000", bg: "#FFFFFF", desc: "Black on White" },
  { fg: "#333333", bg: "#FFFFFF", desc: "Dark Gray on White" },
  { fg: "#666666", bg: "#FFFFFF", desc: "Medium Gray on White" },

  // Your current palette
  { fg: "#3b82f6", bg: "#FFFFFF", desc: "Primary-500 on White" },
  { fg: "#2563eb", bg: "#FFFFFF", desc: "Primary-600 on White" },
  { fg: "#1d4ed8", bg: "#FFFFFF", desc: "Primary-700 on White" },

  // Dark mode
  { fg: "#FFFFFF", bg: "#111827", desc: "White on Gray-900" },
  { fg: "#E5E7EB", bg: "#1F2937", desc: "Gray-200 on Gray-800" },

  // Success/Error states
  { fg: "#10b981", bg: "#FFFFFF", desc: "Success on White" },
  { fg: "#ef4444", bg: "#FFFFFF", desc: "Error on White" },
];
