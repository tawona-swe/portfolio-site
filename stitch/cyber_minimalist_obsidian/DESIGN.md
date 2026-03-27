```markdown
# Design System Document: The Kinetic Luminalist

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Luminalist."** 

This system moves away from the static, "boxed-in" nature of traditional portfolios. Instead of a rigid grid of white boxes, we treat the UI as a dark, expansive digital vacuum where content is revealed through light, depth, and motion. We balance the cold precision of software engineering with the organic warmth of human creativity. 

By leveraging **intentional asymmetry**, **overlapping glass layers**, and **high-contrast typography scales**, we ensure the portfolio feels like a high-end editorial piece rather than a generic template. We use depth—not lines—to define our world.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the deep space of `#060e20`, utilizing high-frequency accents to guide the eye.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined solely through background color shifts. For example, a "Work Experience" section using `surface-container-low` should sit directly against a `surface` background. The transition of color is the boundary.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the following hierarchy to create "nested" depth:
- **Base Layer:** `surface` (#060e20)
- **Sectioning:** `surface-container-low` (#091328) for large background blocks.
- **Floating Components:** `surface-container-high` (#141f38) or `highest` (#192540).

### The "Glass & Gradient" Rule
Standard flat colors lack "soul." 
- **Glassmorphism:** For floating cards (Project Cards, Modals), use `surface-variant` (#192540) at 60% opacity with a `backdrop-filter: blur(12px)`.
- **Signature Textures:** Main CTAs and Hero accents must use a linear gradient from `primary` (#a1faff) to `primary-container` (#00f4fe) at a 135-degree angle.

---

## 3. Typography
We utilize a high-contrast pairing to signify technical authority and modern flair.

*   **Headings (Space Grotesk):** A characterful, wide-set sans-serif that feels engineered yet expressive.
    *   **Display-LG (3.5rem):** Reserved for hero names or massive impact statements. Use -2% letter spacing.
    *   **Headline-MD (1.75rem):** Use for section titles, always in `secondary` (#69f6b8) to signify a "new chapter."
*   **Body & Labels (Inter):** The workhorse. Clean, neutral, and highly legible.
    *   **Body-LG (1rem):** Primary reading font. Use `on-surface` (#dee5ff) at 90% opacity for maximum comfort.
    *   **Label-MD (0.75rem):** Used for metadata, tech stacks, and timestamps. Use `on-surface-variant` (#a3aac4).

---

## 4. Elevation & Depth
In this system, elevation is a product of **Tonal Layering** and **Luminescence**, not drop shadows.

### The Layering Principle
Depth is achieved by "stacking" the surface-container tiers. 
- *Example:* Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural "recessed" look.

### Ambient Shadows & Neon Glows
Standard shadows are forbidden. When a "floating" effect is required:
- **Shadows:** Must be extra-diffused. `blur: 40px`, `opacity: 8%`. The shadow color must be a tinted version of `primary` or `secondary`, never pure black.
- **Neon Glows:** To signify "active" states or high-priority items, use a 2px outer glow (`box-shadow`) using the `primary_dim` (#00e5ee) token at 30% opacity.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use the **Ghost Border**: The `outline-variant` (#40485d) token at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Project Cards (The Glass Hero)
- **Structure:** `surface-variant` with 40% opacity and `xl` (0.75rem) roundedness.
- **Visuals:** Use a `primary` neon glow on hover.
- **Content:** Forbid divider lines. Use **Spacing Scale 6** (2rem) to separate the image from the description.

### Skill Bars (The Data Stream)
- **Track:** `surface-container-highest` (#192540).
- **Fill:** A gradient from `secondary` (#69f6b8) to `secondary_dim` (#58e7ab).
- **Detail:** No rounded ends on the fill; use `none` or `sm` for a more "precise/coded" look.

### Experience Timeline (The Pulse)
- **The Path:** Instead of a solid line, use a vertical dashed path using `outline-variant` at 20% opacity.
- **The Node:** A 12px circle using `tertiary` (#70aaff) with a `primary` pulse animation.
- **Layout:** Asymmetric. Dates on the left, Content on the right, using `Spacing 10` (3.5rem) as the gutter.

### Interactive Elements
- **Primary Button:** `primary` background, `on-primary` text. No border. `lg` (0.5rem) rounding.
- **Input Fields:** `surface-container-lowest` background. Ghost Border (15% opacity). On focus, transition border to 50% opacity `primary`.
- **Chips:** `surface-container-high` background. No border. Use `Label-MD` for text.

---

## 6. Do's and Don'ts

### Do:
- **Embrace Negative Space:** Use `Spacing 20` and `24` between major sections to let the typography breathe.
- **Layer with Intent:** Ensure that overlapping glass elements always have a backdrop blur to maintain readability.
- **Use "On-Surface" Sparingly:** Not all text needs to be pure white. Use `on-surface-variant` for secondary information to create a visual hierarchy.

### Don't:
- **Don't use 1px Borders:** Never use a solid line to separate the header from the hero or cards from each other.
- **Don't use Standard Shadows:** Avoid the "fuzzy grey" look. If it doesn't glow or layer, it doesn't belong.
- **Don't Over-Animate:** Movement should be "Kinetic"—snappy and purposeful (e.g., 200ms easing), not slow or "bouncy."
- **Don't Use Pure Black:** Always use `surface` (#060e20) as the darkest point to maintain the "Midnight Blue" tech aesthetic.

---

## 7. Spacing & Rhythm
Consistency is maintained through a strictly mathematical spacing scale. 
- **Section Padding:** `Spacing 20` (7rem).
- **Component Gaps:** `Spacing 4` (1.4rem).
- **Micro-adjustments:** `Spacing 1.5` (0.5rem).

*By following these rules, the portfolio will transcend the "template" feel, appearing as a bespoke, high-end digital experience that mirrors the sophistication of the developer's code.*```