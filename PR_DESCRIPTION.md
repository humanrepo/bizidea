# 🎨 Améliorations Frontend : Navbar + Dark Mode + A11y

## Description
Cette PR ajoute plusieurs améliorations majeures au frontend :

### 🔍 Optimisation SEO
- Méta-tags optimisés (description, OG, Twitter Cards)
- Structure sémantique HTML5 (header, nav, main, section, footer)
- Hiérarchie des titres logique (h1 > h2 > h3)

### 🌙 Dark Mode
- Toggle accessible avec état persistant (localStorage)
- Respect des préférences système (prefers-color-scheme)
- Classes Tailwind dark: avec contrastes WCAG
- Transition fluide entre les modes

### ♿️ Accessibilité
- Skip link "Aller au contenu principal"
- ARIA landmarks et labels sur les sections principales
- Focus trap dans le menu mobile
- États ARIA pour le menu et le dark mode
- Navigation au clavier améliorée

### 📱 Responsive Design
- Menu hamburger accessible sur mobile
- Grid responsive pour les features
- Espacements et typographie adaptatifs

## Screenshots

### Desktop - Light Mode
[Insérer screenshot]

### Desktop - Dark Mode
[Insérer screenshot]

### Mobile - Menu fermé
[Insérer screenshot]

### Mobile - Menu ouvert
[Insérer screenshot]

## Tests effectués
- [x] Navigation au clavier (Tab, Shift+Tab, Escape)
- [x] Menu mobile (ouverture/fermeture/focus trap)
- [x] Dark mode (toggle et persistance)
- [x] Responsive (mobile, tablette, desktop)
- [x] Contrastes WCAG (light/dark)
- [x] Performance Lighthouse

## Breaking Changes
Aucun. Cette mise à jour est purement additive.

## Notes pour la review
@Mayele Concentre-toi particulièrement sur :
- La gestion du focus dans le menu mobile
- Les contrastes en mode sombre
- La structure sémantique HTML
