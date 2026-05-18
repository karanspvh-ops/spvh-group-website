This is a complete, pixel-perfect technical build specification for the website cloning system.

## 1. Site Info

SITE_TYPE: Corporate (Private Holding / Wealth Management)
HTML_LANG: en

## 2. Color Token Mapping

---DESIGN_MD_START---
## Visual Theme
A modern, corporate wealth management site featuring a sophisticated mix of dark navy backgrounds, crisp white surfaces, and professional blue/teal accents to project trust and longevity.

## Colors
- background: hsl(0 0% 100%)
- foreground: hsl(223 25% 14%)
- muted-foreground: hsl(215 16% 47%)
- border: hsl(214 32% 91%)
- surface: hsl(210 33% 98%)
- primary: hsl(220 41% 48%)
- primary-foreground: hsl(0 0% 100%)
- primary-hover: hsl(220 41% 38%)
- secondary: hsl(168 41% 47%)
- secondary-foreground: hsl(0 0% 100%)
- secondary-hover: hsl(168 41% 37%)
- dark: hsl(223 25% 14%)
- dark-foreground: hsl(0 0% 100%)
- dark-muted: hsl(216 18% 65%)
- dark-border: hsl(223 25% 20%)
- accent: hsl(220 41% 48%)

## Page Background
solid hsl(0 0% 100%)

## Typography
- Headlines: Inter — 700
- Body: Inter — 400

## Components
- Buttons: Solid primary buttons feature slight rounding (rounded-sm) with generous padding (px-10 py-4). Form submit buttons use the secondary teal color with rounded-xl corners. The main nav CTA uses a full pill shape (rounded-full).
- Cards: Cards on dark sections use a semi-transparent white background (bg-white/5) with subtle white borders and rounded-2xl corners. Cards on light sections use solid white with shadow-sm.
---DESIGN_MD_END---

## 3. Navigation Spec

NAV_FULL_WIDTH: false
NAV_WIDTH: 1280px (The builder should structure this as: `fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1280px]`)
NAV_BACKGROUND: rgba(255, 255, 255, 0.8)
NAV_BORDER_RADIUS: 9999px
NAV_POSITION: fixed
NAV_SHADOW: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 10px 30px 0px
SCROLL_BEHAVIOR: none (but must include `backdrop-filter: blur(16px)` given the opacity)

Link style:
- fontSize: 14px
- fontWeight: 600
- textTransform: uppercase
- color: rgb(72, 106, 173) (text-primary)
- activeColor: text-primary

Logo:
- Size: h-[40px] w-[114px]
- Position: inside-nav
- Badge: false (Render the logo as a plain image directly inside the nav layout flex container, vertically centered).

Dropdowns: None

CTA button: The last link ("Contact") is a SOLID button. Shape: Pill (rounded-full). Colors: bg-primary text-white. Padding: px-6 py-2.

## 4. Section Plan

[Hero] id="hero"
  theme: DARK
  background: bg-transparent
  text: text-white
  heading color: text-white
  heading size: text-[72px] font-bold leading-tight
  body size: text-[24px] font-normal
  layout: flex flex-col justify-center items-center text-center max-w-4xl mx-auto
  padding: pt-48 pb-32 min-h-[90vh]
  content: Centered headings ("Building Enterprise with “infinite legacy”") with subtext below. At the very bottom of the content block, display a row of 4 small circular dots (carousel indicators - one filled, three outlined).
  backgroundImage: url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')
  overlay: rgba(0,0,0,0.5)
  buttons: none
  images: none

[About SPVH Group] id="about"
  theme: LIGHT
  background: bg-background
  text: text-foreground
  heading color: text-foreground
  heading size: text-[42px] font-bold
  body size: text-[18px] leading-relaxed
  layout: grid grid-cols-1 md:grid-cols-2 gap-[64px] max-w-[1280px] mx-auto
  padding: py-[96px]
  content: Left column contains the heading, two paragraphs of body text, and a button. Right column contains a large placeholder graphic/image.
  backgroundImage: none
  overlay: none
  buttons: Solid button 'KNOW MORE' — bg-primary text-primary-foreground rounded-sm px-[40px] py-[16px] text-[14px] font-bold uppercase
  images: displayWidth 606 x displayHeight 606, objectFit contain, place in right column.

[Highlights] id="highlights"
  theme: LIGHT
  background: bg-background
  text: text-foreground
  heading color: text-foreground
  heading size: text-[42px] font-bold
  body size: text-[16px] text-muted-foreground
  layout: flex flex-col items-center gap-16 max-w-[1280px] mx-auto
  padding: py-[96px]
  content: Top is a centered header block with title "Key Group Highlights: Our Achievements" and a subtitle paragraph. Below is a 4-column grid (grid-cols-4). Each column contains an outlined icon (text-primary color), a large statistic number (text-5xl font-bold), and a small tracking label (uppercase, text-xs, font-bold).
  backgroundImage: none
  overlay: none
  buttons: none

[Business Verticals] id="verticals"
  theme: DARK
  background: bg-dark
  text: text-dark-muted
  heading color: text-white
  heading size: text-[48px] font-bold
  body size: text-[20px]
  layout: grid grid-cols-1 md:grid-cols-3 gap-[24px] max-w-[1280px] mx-auto
  padding: py-[128px]
  content: IMPORTANT: This section should have `rounded-t-[48px]` applied to the top corners of the section itself to create a curved transition from the white section above. Top of section contains center-aligned heading and subtitle paragraph (spanning ~60% width). Below is a grid of 6 cards. Cards should be styled with: `bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors cursor-pointer flex flex-col justify-between min-h-[220px]`. Card titles are white text-[20px] font-bold with a chevron right icon next to them.
  backgroundImage: none
  overlay: none
  buttons: none

[Institutional Governance] id="governance"
  theme: DARK
  background: bg-dark
  text: text-dark-muted
  heading color: text-white
  heading size: text-[42px] font-bold
  body size: text-[15px]
  layout: grid grid-cols-1 md:grid-cols-2 gap-[64px] max-w-[1280px] mx-auto
  padding: py-[96px]
  content: Left column: Huge title at top. Below, a vertical stack of 4 items. Each item is a flex row: left side is a circular icon container (border border-white/20 rounded-full p-3), right side is title (text-white font-bold text-[18px]) and description text. Right column: Large dark illustrative placeholder (e.g., a faint circle with a chevron down icon).
  backgroundImage: none
  overlay: none
  buttons: none

[Strategic Capital] id="strategic"
  theme: LIGHT
  background: bg-surface
  text: text-muted-foreground
  heading color: text-foreground
  heading size: text-[42px] font-bold
  body size: text-[18px]
  layout: flex flex-col gap-16 max-w-[1280px] mx-auto
  padding: py-[96px]
  content: Top block contains heading and paragraph (constrained to max-w-3xl). Bottom block is a grid of 4 columns (grid-cols-1 md:grid-cols-4 gap-8). Each of the 4 items is a white card (`bg-white rounded-xl shadow-sm p-8 border border-border/50`). Inside card: Title (text-foreground font-bold text-[20px]) and description text.
  backgroundImage: none
  overlay: none
  buttons: none

[Get in Touch] id="contact"
  theme: DARK
  background: bg-dark
  text: text-dark-muted
  heading color: text-white
  heading size: text-[48px] font-bold
  body size: text-[18px]
  layout: grid grid-cols-1 md:grid-cols-2 gap-16 max-w-[1280px] mx-auto items-center
  padding: py-[96px]
  content: Left column: Subtitle "INQUIRIES" (uppercase, text-xs, tracked). Heading "Get in Touch.". Paragraph of text. Below, two lines for contact info: Email and Location, each prefixed with a small outline icon. Right column: A contact form embedded in a dark card. Form Card Style: `bg-[#222836] rounded-2xl p-8`. Form has 4 fields (Name, Email, Subject, Message). Inputs should have transparent backgrounds with subtle borders (border-white/20).
  backgroundImage: none
  overlay: none
  buttons: Solid button 'SEND MESSAGE' — bg-secondary text-white rounded-xl py-4 w-full text-[14px] font-bold uppercase hover:bg-secondary-hover transition-colors.

## 5. Favicon

https://cdn.pagesmith.app/347b1a00/images/favicon-fcf9a964.svg

## 6. Footer

Style: bg-dark
Text color: text-dark-muted
Columns: 12-column grid structure (grid-cols-12 max-w-[1280px] mx-auto).
Link Groups:
- Left Column (col-span-12 md:col-span-4): Logo image, followed by a company description paragraph below it.
- Center Column (col-span-6 md:col-span-2 md:col-start-7): "Platform" heading (uppercase, text-[12px] font-bold). Links: Home, About, Businesses.
- Right Column (col-span-6 md:col-span-2 md:col-start-10): "Connect" heading (uppercase, text-[12px] font-bold). Links: Contact Us, LinkedIn.
Social Icons: Add a bottom full-width border (`border-t border-white/10 mt-16 pt-8 pb-12`). Inside this bottom bar, place copyright text on the left, and the phrase "INSTITUTIONAL GRADE ASSET MANAGEMENT" (uppercase, text-xs, tracked) on the right. 

## 7. Files

MODIFY: src/components/layout/Navigation.astro, src/components/layout/Footer.astro, src/config/site.ts, src/styles/global.css
CREATE: 
- src/components/home/Hero.astro
- src/components/home/About.astro
- src/components/home/Highlights.astro
- src/components/home/Verticals.astro
- src/components/home/Governance.astro
- src/components/home/Strategic.astro
- src/components/home/Contact.astro