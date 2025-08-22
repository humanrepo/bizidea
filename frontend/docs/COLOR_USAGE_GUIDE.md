# HumanOS BizIdea - Color Usage Guide

## 🎨 WCAG 2.1 AA Compliant Color System

### Overview

This guide provides comprehensive instructions for using the HumanOS BizIdea color system while maintaining WCAG 2.1 AA accessibility standards (minimum 4.5:1 contrast ratio for normal text).

---

## 📊 Color Palette Summary

### Primary Colors

- **Primary-500** (`#3b82f6`) - Base brand color (use for large text/bold)
- **Primary-600** (`#2563eb`) - Enhanced contrast (recommended for normal text)
- **Primary-700** (`#1d4ed8`) - Maximum contrast (use where highest contrast needed)

### Semantic Colors

- **Success-600** (`#16a34a`) - For success states (meets contrast requirements)
- **Error-600** (`#dc2626`) - For error states (meets contrast requirements)
- **Warning-500** (`#f59e0b`) - For warning states
- **Info-500** (`#06b6d4`) - For informational states

### Neutral Colors

- **Gray-900** (`#111827`) - Primary text
- **Gray-700** (`#374151`) - Secondary text
- **Gray-500** (`#6b7280`) - Muted/disabled text
- **Gray-100** (`#f3f4f6`) - Light backgrounds
- **Gray-50** (`#f9fafb`) - Lightest backgrounds

---

## ✅ Approved Color Combinations

### Text on Light Backgrounds (Recommended)

| Text Color    | Background | Ratio   | Usage                    |
| ------------- | ---------- | ------- | ------------------------ |
| `gray-900`    | `white`    | 17.74:1 | Primary text             |
| `gray-700`    | `white`    | 10.31:1 | Secondary text           |
| `gray-600`    | `white`    | 7.17:1  | Tertiary text            |
| `primary-600` | `white`    | 5.17:1  | Primary brand text       |
| `primary-700` | `white`    | 6.7:1   | High contrast brand text |
| `error-600`   | `white`    | 4.83:1  | Error text               |

### Text on Dark Backgrounds

| Text Color | Background | Ratio   | Usage                      |
| ---------- | ---------- | ------- | -------------------------- |
| `white`    | `gray-900` | 17.74:1 | Primary text (dark mode)   |
| `gray-200` | `gray-800` | 11.86:1 | Secondary text (dark mode) |
| `gray-300` | `gray-700` | 6.76:1  | Tertiary text (dark mode)  |

### Buttons & Interactive Elements

| Text Color    | Background    | Ratio  | Usage             |
| ------------- | ------------- | ------ | ----------------- |
| `white`       | `primary-600` | 5.17:1 | Primary buttons   |
| `white`       | `primary-700` | 6.7:1  | Hover states      |
| `primary-600` | `primary-100` | 4.7:1  | Secondary buttons |

---

## ⚠️ Usage with Caution

These combinations require careful usage (large text only - 18pt+ or bold 14pt+):

| Combination               | Ratio  | Usage Guidance                 |
| ------------------------- | ------ | ------------------------------ |
| `primary-500` on `white`  | 3.68:1 | Large headings, bold text only |
| `success-500` on `white`  | 2.28:1 | Large success indicators only  |
| `success-600` on `white`  | 3.3:1  | Large success text only        |
| `error-600` on `error-50` | 4.41:1 | Large error alerts only        |

---

## 🎯 Best Practices

### 1. Text Contrast

- Use `primary-600` instead of `primary-500` for normal text
- For body text, always use at least 4.5:1 contrast ratio
- Use semantic colors at their 600 level for better contrast

### 2. Button Design

- Primary buttons: `bg-primary-600` with `text-white`
- Hover states: `bg-primary-700`
- Secondary buttons: `text-primary-600` with `bg-primary-100`

### 3. Success/Error States

- Use `success-600` for success messages
- Use `error-600` for error messages
- Avoid using lighter variants for critical information

### 4. Dark Mode Considerations

- Test all color combinations in both light and dark modes
- Use semantic CSS variables for automatic theme switching

---

## 🔧 Implementation Examples

### Tailwind Classes

```jsx
// Good contrast - recommended
<div className="text-primary-600 bg-white">Normal text</div>
<button className="bg-primary-600 text-white hover:bg-primary-700">Button</button>

// Use with caution - large text only
<div className="text-primary-500 text-lg font-bold">Large heading</div>
```

### CSS Variables

```css
/* Use semantic variables from design-system-enhanced.css */
.button-primary {
  background-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
}

.button-primary:hover {
  background-color: var(--color-interactive-hover);
}
```

---

## 🧪 Testing & Validation

### Automated Testing

Run the color contrast audit:

```bash
cd frontend
npx tsx scripts/test-enhanced-colors.ts
```

### Manual Testing

- Use browser developer tools to check contrast ratios
- Test with screen readers and keyboard navigation
- Validate across different devices and browsers

---

## 📋 Compliance Checklist

- [ ] All normal text meets 4.5:1 contrast ratio
- [ ] Large text (18pt+) meets 3:1 contrast ratio
- [ ] Interactive elements have clear focus states
- [ ] Color is not the only means of conveying information
- [ ] Tested with actual user content samples

---

## 🚀 Next Steps

1. Update existing components to use enhanced color variants
2. Create component-specific usage examples
3. Conduct comprehensive accessibility testing
4. Document component-level color guidelines
5. Train team members on proper color usage

---

## 📞 Support

For questions about color usage or accessibility:

- Consult this guide first
- Use the color contrast audit tools
- Reach out to the design system team
- Reference WCAG 2.1 AA guidelines
