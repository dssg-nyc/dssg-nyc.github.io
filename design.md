# DSSG NYC — Design System

Portable design spec. Drop into another React or React Native (TypeScript) app to reproduce visual language. Source of truth: [src/App.css](src/App.css).

---

## 1. Brand Identity

| Role | Hex | Usage |
|------|-----|-------|
| Primary Blue | `#002D72` | Headings, links, primary CTAs, dark sections |
| Secondary Blue | `#0056B3` | Hover states, gradient pair with primary blue |
| Primary Orange | `#F47E2D` | Accent, secondary CTAs, list bullets, highlights |
| Secondary Orange | `#FF6B35` | Hover states, gradient pair with primary orange |

Visual mood: professional consulting firm. Clean white surfaces, deep blue authority, orange energy accent. Lots of whitespace. Display serif headings + clean sans body.

---

## 2. Design Tokens

### 2.1 Colors

```ts
export const colors = {
  primary: {
    blue: '#002D72',
    orange: '#F47E2D',
  },
  secondary: {
    blue: '#0056B3',
    orange: '#FF6B35',
  },
  gray: {
    50:  '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  white: '#ffffff',
  black: '#000000',
} as const;
```

### 2.2 Gradients

```ts
export const gradients = {
  primary:   'linear-gradient(135deg, #002D72 0%, #0056B3 100%)',
  secondary: 'linear-gradient(135deg, #F47E2D 0%, #FF6B35 100%)',
  hero:      'linear-gradient(135deg, rgba(0, 45, 114, 0.9) 0%, rgba(0, 86, 179, 0.8) 100%)',
  // Subtle section background
  subtle:    'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
};
```

React Native: use `expo-linear-gradient` or `react-native-linear-gradient`. Convert `135deg` → `start={{x:0,y:0}} end={{x:1,y:1}}`.

### 2.3 Spacing

8-point scale, fluid where helpful.

```ts
export const spacing = {
  xs:  '0.5rem',  //  8px
  sm:  '1rem',    // 16px
  md:  '1.5rem',  // 24px
  lg:  '2rem',    // 32px
  xl:  '3rem',    // 48px
  '2xl': '4rem',  // 64px
  '3xl': '6rem',  // 96px
} as const;
```

RN: drop `rem`, use numeric px values (`8, 16, 24, 32, 48, 64, 96`).

### 2.4 Typography

```ts
export const fonts = {
  primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  display: "'Playfair Display', Georgia, serif",
};

export const fontWeights = {
  light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, black: 800,
};
```

Web import:
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap");
```

RN: `expo-font` or bundled fonts. Load `Inter-{Regular,Medium,SemiBold,Bold}` and `PlayfairDisplay-{Regular,SemiBold,Bold}`.

#### Type scale (fluid)

| Token | Value | Family | Weight | Use |
|-------|-------|--------|--------|-----|
| `hero` | `clamp(3rem, 8vw, 5rem)` | display | 700 | Hero title |
| `h1` | `clamp(2.5rem, 5vw, 4rem)` | display | 700 | Page H1 |
| `h2` | `clamp(1.5rem, 3vw, 2.5rem)` | display | 600 | Section H2 |
| `h3` | `clamp(1.25rem, 2vw, 1.5rem)` | primary | 600 | Card title |
| `h4` | `1.125rem` | primary | 600 | Subhead |
| `lead` | `1.5rem` | primary | 400 | Lead paragraph |
| `body-lg` | `1.25rem` | primary | 400 | Large body |
| `body` | `1.125rem` | primary | 400 | Default body |
| `small` | `0.875rem` | primary | 400 | Captions |

Letter-spacing: `-0.02em` on hero/h1, `-0.01em` on h2. Line-height: 1.1 hero, 1.2 h2, 1.3 h3, 1.6 body, 1.7 lead.

RN: replace `clamp()` with `PixelRatio.getFontScale()` * baseline. Default to mid value (e.g. hero → 64).

### 2.5 Shadows

```ts
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};
```

RN equivalents:

```ts
export const shadowsRN = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.10, shadowRadius: 6, elevation: 3 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.10, shadowRadius: 15, elevation: 6 },
  xl: { shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.10, shadowRadius: 25, elevation: 12 },
};
```

### 2.6 Radii

```ts
export const radii = {
  sm: '0.375rem', // 6px
  md: '0.5rem',   // 8px
  lg: '0.75rem',  // 12px
  xl: '1rem',     // 16px
  pill: '50px',
  full: '9999px',
};
```

### 2.7 Motion

```ts
export const motion = {
  durationFast: '150ms',
  durationNormal: '300ms',
  durationSlow: '600ms',
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'ease-out',
};
```

Standard transition: `all 0.3s ease`. Hover lift: `translateY(-2px)` to `translateY(-6px)` depending on element weight.

### 2.8 Breakpoints

| Token | Value |
|-------|-------|
| `mobile-sm` | 480px |
| `mobile` | 640px |
| `tablet` | 768px |
| `desktop` | 1024px |
| `wide` | 1200px |
| `xwide` | 1400px |

Container max-widths: `800` (sm), `1200` (default), `1400` (lg).

---

## 3. Section System

Five reusable section variants. Each section: `padding: var(--space-3xl) var(--space-lg)`, full-width, centered content.

| Variant | Background | Text | Use |
|---------|-----------|------|-----|
| `hero` | `gradient.hero` over image | white | Above-fold hero |
| `light` | `gray.50` | `gray.800` | Default content section |
| `white` | `white` | `gray.800` | Alternating section |
| `dark` | `gradient.primary` | white | CTA/banner |
| `primary` | `primary.blue` | white | Solid brand block |

Mobile (`<768px`): collapse padding to `space-2xl space-md`.

---

## 4. Component Patterns

### 4.1 Button

States: default, secondary, outline, pill. Hover lifts `-2px` + bumps shadow.

```ts
type ButtonProps = { variant?: 'primary' | 'secondary' | 'outline' | 'pill' };
```

Specs:
- Padding: `space-sm space-lg`
- Min-width: 140px
- Radius: `radii.md` (default) or `radii.pill` (for prominent CTAs like "Data Diplomats" / "Events")
- Font: `primary`, weight 600, size `1rem`
- Box-shadow: `shadows.md` → `shadows.xl` on hover
- Transition: `all 0.3s ease`

Pill variant uses tinted shadow: `0 4px 15px rgba(0, 45, 114, 0.3)` (blue) or `rgba(244, 126, 45, 0.3)` (orange).

```tsx
<Button>Primary</Button>
<Button variant="secondary">Outline blue</Button>
<Button variant="pill">Bold CTA</Button>
```

### 4.2 Card

Base white card, shadow lift on hover.

- Background: white
- Radius: `radii.xl`
- Shadow: `shadows.md` → `shadows.xl` on hover
- Border: `1px solid gray.200` (or `rgba(255,255,255,0.2)` for floating cards)
- Padding: `space-xl` (desktop), `space-lg` (tablet), `space-md` (mobile)
- Hover: `translateY(-4px)`, image-zoom child `scale(1.05)`

Variant — **involvement card** (Projects): top accent stripe via `::before`, 4px tall, gradient fill (blue or orange).

Variant — **stat card** (Projects bottom): center-aligned, big display number + label.

Variant — **value card** (About): smaller padding `space-lg`, lighter shadow `shadows.sm`.

### 4.3 Header / Nav

- Fixed top, full-width, z-index 1000
- Background: `rgba(255,255,255,0.95)` + `backdrop-filter: blur(10px)`
- Border-bottom: `1px solid gray.200`
- Height: 80px desktop, 70px mobile
- On scroll: bump opacity to 0.98 + add `shadows.md`

Nav links:
- Default: `gray.700`, weight 500
- Hover: `primary.blue` text, `gray.100` background pill
- CTA link (button-nav): `gradient.secondary`, white, `radii.md`, lifts on hover

Mobile (`<640px`): nav menu collapses (hamburger pattern — implement separately).

### 4.4 Hero

- `min-height: 100vh`
- `gradient.hero` overlay over background image
- Centered content, max-width 900px
- Title: `display`, weight 700, `clamp(3rem,8vw,5rem)`, white, text-shadow `0 4px 12px rgba(0,0,0,0.6)`
- Subtitle: `display` weight 400, `clamp(1.25rem,3vw,1.75rem)`
- Description: `clamp(1rem,2vw,1.25rem)`, `rgba(255,255,255,0.9)`, max-width 700px
- Button row: `gap: space-md`, flex-wrap, stacks on mobile

Optional scroll-arrow indicator at bottom (animated chevron, 3-stack).

### 4.5 Footer

- Background: `gradient.primary`
- Padding: `space-3xl 0 space-xl`
- Layout: 2-col grid (`1fr 2fr`) collapsing to single col below 1024px
- Link groups: 3-col grid → 2-col @ 1024 → 1-col @ 768
- Social links: 40×40 circle, `rgba(255,255,255,0.1)` bg, hover → `primary.orange`
- Bottom row: thin border-top, copyright + attribution split

### 4.6 Stat Block

Big display number + label.

- Number: `display`, weight 700, 2.5rem–3rem, `primary.blue` (light bg) or white (dark bg)
- Label: 0.95rem–1.125rem, `gray.600` or `rgba(255,255,255,0.8)`
- Wrap in card for shadow lift, or place on dark background unboxed

### 4.7 List Items

#### Bullet list (Events, service-list)
- No default bullets
- Custom marker: `•` (orange) or `→` (orange) absolute-positioned
- Padding-left: `space-md`

#### Benefit row
- `display: flex`, gap `space-sm`
- Background: `gray.50`, hover `gray.100`
- Radius: `radii.md`
- Hover: `translateX(4px)`
- Leading icon (1.25rem) + label (weight 500)

### 4.8 Tag / Pill

```ts
type TagProps = { variant?: 'gradient' | 'subtle' };
```

- Padding: `space-xs space-sm`
- Radius: `radii.sm`
- Font-size: 0.875rem, weight 500
- Gradient variant: `gradient.primary` bg + white text
- Subtle variant: `gray.100` bg + `gray.700` text

### 4.9 Avatar / Founder Image

- Circle, 100–150px depending on viewport
- 4px solid `primary.blue` ring
- `object-fit: cover`
- Drop within centered card with `shadows.lg`

### 4.10 Form Input

- Padding: 12px
- Background: white
- Border: `1px solid #e3e3e3`
- Focus: border `secondary.blue`, no outline, `transition: border-color ease 300ms`
- Box-sizing: border-box (always)

---

## 5. Layout Primitives

### Container

```css
.container     { max-width: 1200px; margin: 0 auto; padding: 0 var(--space-lg); }
.container-sm  { max-width: 800px;  }
.container-lg  { max-width: 1400px; }
```

### Grid

```css
.grid    { display: grid; gap: var(--space-lg); }
.grid-2  { grid-template-columns: repeat(2, 1fr); }
.grid-3  { grid-template-columns: repeat(3, 1fr); }
/* All collapse to 1fr below 768px */
```

### Flex utilities

`flex`, `flex-col`, `items-center`, `justify-center`, `justify-between`, `text-center`, `gap-{sm|md|lg|xl}`.

---

## 6. Animation Primitives

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-in-up { animation: fadeInUp 0.6s ease-out; }
```

Hover patterns (apply to interactive surfaces):
- Cards: `translateY(-4px)` + shadow bump
- Buttons: `translateY(-2px)` + shadow bump
- Nav links: bg pill fade-in
- List items: `translateX(4px)` slide
- Image inside card: `scale(1.05)`

RN: `Animated.spring` with `useNativeDriver: true`, animate `translateY` / `scale`. Use `Pressable` `style={({pressed}) => ...}` for press states.

---

## 7. TypeScript Theme Object (drop-in)

```ts
// theme.ts — single source of truth
export const theme = {
  colors,
  gradients,
  spacing,
  fonts,
  fontWeights,
  shadows,
  shadowsRN,
  radii,
  motion,
  breakpoints: {
    mobileSm: 480, mobile: 640, tablet: 768, desktop: 1024, wide: 1200, xwide: 1400,
  },
} as const;

export type Theme = typeof theme;
```

Consume via Context (RN/Web), styled-components `ThemeProvider`, or direct import.

---

## 8. Platform Mapping (Web ↔ React Native)

| Web | React Native equivalent |
|-----|-------------------------|
| `<section>` / `<div>` | `<View>` |
| `<p>` / `<h1>` | `<Text>` |
| `background: linear-gradient` | `<LinearGradient>` from `expo-linear-gradient` |
| `box-shadow` | `shadowColor/Offset/Opacity/Radius` (iOS) + `elevation` (Android) — see `shadowsRN` |
| `backdrop-filter: blur()` | `<BlurView>` from `expo-blur` |
| `clamp(min, vw, max)` | Manual scale via `Dimensions.get('window').width` |
| `rem` units | numeric pixels |
| `:hover` | `Pressable` `pressed` state, or `onHoverIn/Out` (web/macOS) |
| `transition` | `Animated` / `react-native-reanimated` |
| `@media (max-width: 768px)` | `useWindowDimensions()` + ternary |
| `position: fixed` header | `<View>` + parent ScrollView with sticky header |
| Google Fonts `@import` | `expo-font` `useFonts({...})` |

---

## 9. Accessibility Checklist

- Color contrast: all primary/secondary text combos pass WCAG AA on intended backgrounds (`primary.blue` on white = AAA, white on `primary.blue` = AAA, `gray.600` on white = AA).
- Focus rings: never remove without replacing. Inputs use `border-color` swap; buttons should add `outline: 2px solid var(--secondary-blue)` on `:focus-visible`.
- Reduce motion: wrap animations in `@media (prefers-reduced-motion: reduce)` → set `animation: none` and `transition: none`.
- Touch targets: 40×40 minimum (already met by social links, nav button).

---

## 10. Migration Checklist (port to new app)

1. **Install fonts** — Web: add Google Fonts `@import` in root CSS. RN: bundle Inter + Playfair Display via `expo-font`.
2. **Drop in `theme.ts`** — copy section 7 + sections 2.1–2.7. Single source.
3. **Add CSS custom properties** (Web only) — copy `:root` block from section 11 below.
4. **Apply globals** — body font, background, smooth scroll, `box-sizing: border-box` reset.
5. **Build primitives in this order**: Container → Button → Card → Section variants → Header → Hero → Footer.
6. **Wire feature components** as needed (Stat, ValueCard, BenefitItem, Tag, FounderCard).
7. **Verify breakpoints** at 480 / 768 / 1024 / 1200.
8. **Run a11y audit** (axe DevTools web; `react-native-a11y` for RN).

---

## 11. Drop-in `:root` Block (Web)

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap");

:root {
  /* Brand */
  --primary-orange:   #F47E2D;
  --primary-blue:     #002D72;
  --secondary-orange: #FF6B35;
  --secondary-blue:   #0056B3;

  /* Gradients */
  --gradient-primary:   linear-gradient(135deg, #002D72 0%, #0056B3 100%);
  --gradient-secondary: linear-gradient(135deg, #F47E2D 0%, #FF6B35 100%);
  --gradient-hero:      linear-gradient(135deg, rgba(0,45,114,0.9) 0%, rgba(0,86,179,0.8) 100%);

  /* Grays */
  --gray-50:  #f8fafc; --gray-100: #f1f5f9; --gray-200: #e2e8f0;
  --gray-300: #cbd5e1; --gray-400: #94a3b8; --gray-500: #64748b;
  --gray-600: #475569; --gray-700: #334155; --gray-800: #1e293b; --gray-900: #0f172a;

  /* Spacing */
  --space-xs: 0.5rem; --space-sm: 1rem;  --space-md: 1.5rem; --space-lg: 2rem;
  --space-xl: 3rem;   --space-2xl: 4rem; --space-3xl: 6rem;

  /* Typography */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-display: 'Playfair Display', Georgia, serif;

  /* Shadow */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* Radius */
  --radius-sm: 0.375rem; --radius-md: 0.5rem; --radius-lg: 0.75rem; --radius-xl: 1rem;
}

* { box-sizing: border-box; }

html, body {
  margin: 0; padding: 0; height: 100%;
  font-family: var(--font-primary);
  line-height: 1.6; color: var(--gray-800);
  scroll-behavior: smooth;
}
```

---

## 12. Don'ts

- Don't ship hardcoded hex outside `theme`. Always reference token.
- Don't animate layout properties (width/height/margin). Stick to `transform` + `opacity`.
- Don't skip `box-sizing: border-box` reset.
- Don't use more than 2 font families.
- Don't apply shadow directly to text — use `text-shadow` only on hero overlays.
- Don't break the 3xl section padding rhythm without reason.
