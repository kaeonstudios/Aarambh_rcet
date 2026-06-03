**Build a full-stack startup platform website (AarambhX) using Next.js (App Router).**

**GOAL:**

**A high-conversion website + application system for a startup conclave where founders apply and admins review applications.**

**TECH STACK:**

**\- Next.js (App Router)**

**\- Tailwind CSS (styling)**

**\- API Routes (backend)**

**\- Database: PostgreSQL (via Prisma or Supabase)**

**\- Auth (admin only): simple credential-based (no OAuth)**

**\-----------------------------------**

**FRONTEND (WEBSITE)**

**\-----------------------------------**

**PAGES / SECTIONS:**

**\- Hero (video background, strong CTA)**

**\- Hosting (institution credibility)**

**\- Conclave (video + poster carousel)**

**\- Workflow (5-step pipeline)**

**\- Backbone (mentors/investors)**

**\- Footer (CTA + contact)**

**GLOBAL:**

**\- Mobile-first responsive**

**\- Dark premium theme (black + gold accents)**

**\- Smooth animations (lightweight)**

**\- Sticky navbar with CTA**

**CTA FLOW:**

**\- "Apply to Pitch" opens multi-step modal**

**\- 4-step form:**

**1\. Startup basics**

**2\. Team details**

**3\. Description + stage**

**4\. Pitch video (link or upload)**

**FORM FEATURES:**

**\- Validation (Zod)**

**\- Step-based progression**

**\- Progress bar**

**\- File upload (video max 100MB)**

**\- Success screen after submission**

**\-----------------------------------**

**BACKEND (API ROUTES)**

**\-----------------------------------**

**Create API routes:**

**POST /api/applications**

**\- Save form data to DB**

**\- Fields:**

**startup_name**

**team_head**

**phone**

**member_count**

**members (JSON)**

**description**

**stage**

**linkedin_url**

**website_url**

**pitch_video_url**

**pitch_video_path**

**created_at**

**GET /api/applications**

**\- Admin only**

**\- Return all applications sorted by newest**

**\-----------------------------------**

**DATABASE**

**\-----------------------------------**

**Table: applications**

**\- id (uuid)**

**\- startup_name**

**\- team_head**

**\- phone**

**\- member_count**

**\- members (JSON)**

**\- description**

**\- stage**

**\- linkedin_url**

**\- website_url**

**\- pitch_video_url**

**\- pitch_video_path**

**\- created_at**

**\-----------------------------------**

**ADMIN PANEL**

**\-----------------------------------**

**ROUTE:**

**\- /admin**

**AUTH SYSTEM (SIMPLE INTERNAL):**

**\- Hardcoded credentials (multiple users)**

**Example:**

**admin1 / password1**

**admin2 / password2**

**\- Store in env file or config**

**\- Use session (cookies or JWT)**

**FEATURES:**

**1\. Login Page**

**\- Username + Password**

**\- Simple validation**

**2\. Dashboard**

**\- List of applications**

**\- Table view:**

**\- Startup name**

**\- Founder**

**\- Stage**

**\- Date**

**3\. Application Detail View**

**\- Full data view**

**\- Video link or file preview**

**4\. Basic Analytics (IMPORTANT):**

**\- Total applications**

**\- Applications per stage**

**\- Recent submissions (last 7 days)**

**\-----------------------------------**

**GOOGLE FORM INTEGRATION**

**\-----------------------------------**

**GOAL:**

**Unify Google Form + Website Form**

**METHOD:**

**Option 1 (Recommended):**

**\- Use Google Apps Script Webhook**

**\- When Google Form submits:**

**→ send POST request to /api/applications**

**Option 2:**

**\- Use Google Sheets API**

**\- Sync sheet data into DB**

**IMPORTANT:**

**\- Ensure same fields as website form**

**\- Normalize data before saving**

**\-----------------------------------**

**SEO (CRITICAL)**

**\-----------------------------------**

**\- Use Next.js Metadata API**

**\- Add:**

**title, description, keywords**

**\- OpenGraph tags (for sharing)**

**\- Structured data (Organization + Event)**

**PAGES:**

**\- Semantic HTML (section, article, header)**

**\- Proper heading hierarchy**

**PERFORMANCE:**

**\- Optimize video (compressed)**

**\- Lazy load images**

**\- Use next/image where possible**

**\-----------------------------------**

**SECURITY (BASIC BUT NECESSARY)**

**\-----------------------------------**

**\- Rate limit form submissions**

**\- Validate all inputs (Zod backend)**

**\- Restrict admin routes**

**\- Sanitize user input**

**\-----------------------------------**

**DEPLOYMENT**

**\-----------------------------------**

**\- Frontend + API → Vercel**

**\- Database → Supabase / Neon**

**\- Storage → Supabase Storage / Cloudinary**

**\-----------------------------------**

**OUTPUT REQUIREMENTS**

**\-----------------------------------**

**\- Complete Next.js project structure**

**\- App Router based**

**\- API routes included**

**\- Admin panel included**

**\- Clean, production-ready code**

**\- No broken imports**

**\- Proper folder structure**

**\-----------------------------------**

**FOCUS:**

**\- High conversion UX**

**\- Clean architecture**

**\- Scalable base (not over-engineered)  
<br/>The each sections are described also improvise the UI UX if needed.It should be SEO friendly.Sample assets will be provided.**

**Hero Section**

Create a premium, high-impact hero section for a startup incubation platform website called "AarambhX".

GOAL:

Position AarambhX as India's elite founder hub where early-stage ideas connect directly with investors. The hero must feel exclusive, high-value, and conversion-focused - not like a typical college or event page.

LAYOUT:

\- Full viewport height (100svh), centered content

\- Background: autoplay muted looping video of a college/startup environment (campus/infrastructure feel)

\- Video should have:

\- 40-60% opacity

\- dark gradient overlays for readability

\- subtle grid and gradient texture layers for depth

VISUAL STYLE:

\- Premium dark theme (black/charcoal base)

\- Gold accents (for trust, exclusivity)

\- Subtle electric/neon highlights (for modern tech feel)

\- Glassmorphism UI elements

\- Soft floating blurred orbs (ambient motion)

CONTENT STRUCTURE:

1\. Eyebrow Badge (Top)

\- Small pill-style glass container

\- Text:

"AarambhX Hub · Conclave 2K26 · Limited Slots"

\- Include a pulsing dot indicator

2\. Headline (Primary Focus)

\- Large, bold, high contrast typography

\- Text:

"India's founder hub where ideas meet capital."

\- Highlight "founder hub" with gradient gold styling

\- Break into 2 lines for readability

3\. Supporting Paragraph

\- Short, clear positioning:

AarambhX is a startup ecosystem that takes founders from idea to funding

\- Mention flagship conclave as investor-founder interaction platform

4\. Clarity Line (Important)

\- Small uppercase mono text

\- Message:

"Not a competition · A live investment platform"

\- This removes ambiguity and increases perceived seriousness

5\. CTA Section (Conversion Layer)

\- Primary button:

"Apply to Pitch" (gold, prominent, slightly glowing)

\- Secondary button:

"Inside the Conclave" (glass style)

\- Buttons must be responsive (stack on mobile)

6\. Trust Strip (Credibility)

\- Small horizontal row:

\- Hosted at RCET, Thrissur

\- Live investor panel

\- Post-event accelerator

\- Minimal separators

7\. Scroll Indicator

\- Bottom center

\- Minimal line + "Scroll" text

\- Only visible on desktop

INTERACTIONS:

\- Background video plays only when in viewport

\- Floating orbs move slowly (subtle animation)

\- CTA hover: slight scale + arrow shift

\- Smooth fade/slide-in for text on load

PERFORMANCE RULES:

\- Use optimized video (MP4, compressed)

\- preload="auto", playsInline, muted, loop

\- Lazy load if below fold

\- Avoid heavy JS animation libraries

ACCESSIBILITY:

\- Ensure text contrast over video

\- aria-hidden for background video

\- Semantic section structure

OUTPUT:

\- Fully structured Hero component

\- No broken imports

\- Proper asset handling (relative or alias-safe)

**Institution**

Create a mobile-first, premium "Institutional Hosting Section" for a startup platform website called "AarambhX".

GOAL:

Position the hosting institution (RCET, Thrissur) as a credible, high-quality foundation for a serious investor-facing startup ecosystem - not just a college venue.

APPROACH:

Design mobile-first, then scale to tablet and desktop.

LAYOUT (Mobile First):

\- Vertical stacking layout

\- Section padding: py-20 (mobile), py-28+ (desktop)

\- Content first → Video second

\- Maintain strong readability and spacing on small screens

CONTENT STRUCTURE:

1\. Eyebrow Label

\- Small uppercase mono text

\- Gold color

\- Text: "Institutional Partner"

2\. Headline

\- Large but responsive typography

\- Break into multiple lines for mobile readability

\- Text:

"Hosted at Royal College of Engineering & Technology, Thrissur"

\- Highlight "Royal College" using gold gradient or italic styling

3\. Supporting Text

\- Short, sharp positioning:

Emphasize credibility and environment for serious founders

\- Avoid generic phrases like "premier institution" - make it feel outcome-driven

4\. Video Container (Core Visual Element)

\- Full width responsive container

\- Rounded corners (rounded-2xl mobile, rounded-3xl desktop)

\- Aspect ratio:

\- Mobile: taller (approx 4:5 feel)

\- Desktop: cinematic (16:9 feel)

\- Video behavior:

\- autoplay, muted, loop, playsInline

\- preload="metadata"

\- object-cover

\- Add gradient overlay (bottom-heavy for text readability)

5\. Overlay Content (Inside Video)

\- Bottom-aligned content block

\- Left: Institution name + location

\- Right: Status pill (Live · Feb 2026)

6\. Status Indicator

\- Glassmorphism pill

\- Small glowing/pulsing dot

\- Text: "Live · Feb 2026"

INTERACTIONS:

\- Video should only autoplay when in viewport

\- Subtle hover scale on desktop (group hover)

\- Smooth fade-in when section enters viewport

VISUAL STYLE:

\- Dark premium theme

\- Gold accent for authority

\- Electric accent for modern tech feel

\- Glassmorphism UI for overlays

\- Soft shadows and subtle borders (border-white/10)

PERFORMANCE:

\- Optimize video size (compressed MP4)

\- Avoid unnecessary re-renders

\- Use lazy loading if below fold

ACCESSIBILITY:

\- Use aria-label for video

\- Ensure text contrast over video

\- Avoid important info inside only visual layers

OUTPUT:

\- Fully responsive Hosting Section component

\- No broken imports

\- Proper asset handling

\- Works smoothly across mobile, tablet, desktop

**Conclave**

Create a mobile-first Conclave Section for a premium startup platform (AarambhX).

STRICT LAYOUT (DO NOT CHANGE):

\- Top: Header (eyebrow, heading, paragraph)

\- Below: Media section with 2 columns

→ LEFT: Landscape video (primary)

→ RIGHT: Vertical poster carousel (secondary)

\- On mobile:

→ Stack vertically

→ Video FIRST

→ Posters BELOW

MOBILE-FIRST:

\- Build single column first

\- Then scale to md:grid-cols-12

\- Use:

\- Video: md:col-span-8

\- Posters: md:col-span-4

\- No horizontal overflow

VIDEO (LEFT):

\- Landscape (aspect-video)

\- Rounded corners (rounded-2xl mobile, rounded-3xl desktop)

\- object-cover

\- Controls enabled (NO fullscreen, NO download)

\- Autoplay only when in viewport (IntersectionObserver)

\- Pause when out of view

\- Maintain smooth playback reset on change

POSTER CAROUSEL (RIGHT):

\- Vertical layout (aspect-\[3/4\])

\- Only ONE poster visible at a time

\- Smooth crossfade transition

\- Auto-rotate every 5 seconds

\- Pause on hover

\- Navigation:

→ Only dots (no arrows)

→ Active dot wider (w-8), inactive small (w-1.5)

BACKGROUND (IMPORTANT DIFFERENTIATION):

\- Add subtle variation from previous section:

→ Use faint gradient OR low-opacity radial glow

→ Optional: very light grid texture

\- Keep dark premium theme

\- DO NOT overpower content

HEADER:

\- Eyebrow: small uppercase mono, gold

\- Heading:

"A serious room. Serious capital."

→ Highlight second line in gold gradient

\- Paragraph:

Focus on funding outcome (no generic wording)

INTERACTIONS:

\- Video plays ONLY when visible (≥50%)

\- Posters auto-cycle unless hovered

\- Subtle hover effect on media containers (scale or brightness)

\- Smooth fade-in on scroll

PERFORMANCE:

\- Optimized video (MP4)

\- preload="metadata"

\- Lazy load posters

\- No layout shift

ACCESSIBILITY:

\- aria-label for video

\- Maintain text contrast

OUTPUT:

\- React + Tailwind component

\- Same structure as reference

\- Mobile-first responsive

\- Left video, right poster ALWAYS on desktop

**  
<br/>Workflow.**

Create a mobile-first "Workflow Section" for a premium startup platform (AarambhX).

STRICT RULES:

\- DO NOT change layout structure

\- Keep exact format:

→ Top: header (eyebrow, heading, paragraph)

→ Below: 5-phase workflow pipeline

\- All phases must be visible at once (NO carousel, NO scroll snapping)

MOBILE-FIRST DESIGN:

\- Start with vertical timeline layout

\- Each phase stacked vertically

\- Include a vertical connecting line on the left

\- Node (icon circle) aligned to the line

\- Content to the right of node

\- Proper spacing (gap-5 or more)

DESKTOP SCALING:

\- Convert to horizontal 5-column layout (lg:grid-cols-5)

\- Center align each phase

\- Add animated horizontal connecting line across nodes

\- Maintain equal spacing between phases

VISUAL STRUCTURE:

1\. Header:

\- Eyebrow:

small uppercase mono, gold color

\- Heading:

"From idea to institution."

→ Highlight "institution" with gradient gold

\- Paragraph:

Emphasize structured execution, not vague growth

2\. Pipeline:

Each phase must include:

\- Circular node:

\- Icon inside (minimal stroke SVG)

\- Subtle hover interaction (scale + glow)

\- Step number badge:

small, positioned top-right of node

\- Title:

bold, clean

\- Description:

short, outcome-focused (not generic startup jargon)

PHASES (STRICT ORDER):

1\. Ideation

2\. Validation

3\. Prototype

4\. Trial Run

5\. Scale

INTERACTIONS:

\- Subtle staggered fade-in animation (each phase delayed slightly)

\- Hover effects:

\- Node glow (gold)

\- Slight scale

\- Title color shift

\- Smooth transitions (no heavy animation libraries)

CONNECTING LINES:

\- Mobile:

vertical line (left side)

\- Desktop:

horizontal animated line (center aligned through nodes)

with subtle flowing gradient animation

BACKGROUND (IMPORTANT DIFFERENTIATION):

\- Use a slightly different background from other sections:

→ bg-surface OR slightly lighter dark tone

→ Optional: very subtle gradient or noise texture

\- Keep consistent dark premium theme

PERFORMANCE:

\- Lightweight animations (CSS only)

\- No layout shift

\- Avoid unnecessary re-renders

ACCESSIBILITY:

\- Maintain contrast

\- Semantic structure (section, headings)

OUTPUT:

\- Mobile-first responsive

\- Same structure as reference

\- All phases visible without interaction

**Backbone**

Create a mobile-first "Backbone Section" for a premium startup platform (AarambhX).

STRICT RULES:

\- DO NOT change layout structure

\- Keep exact format:

→ Top: header (left heading + right supporting text)

→ Below: 3-card grid (people)

\- Maintain card layout and proportions

MOBILE-FIRST DESIGN:

\- Stack everything vertically

\- Header:

→ Heading first

→ Supporting paragraph below

\- Cards:

→ Single column on mobile

→ Proper spacing (gap-5 or more)

\- Ensure:

→ No overflow

→ Readable typography

→ Comfortable spacing

DESKTOP SCALING:

\- Header becomes split:

→ Left: heading

→ Right: supporting text

\- Cards:

→ md:grid-cols-3

→ Equal height cards

→ Consistent spacing

HEADER:

1\. Eyebrow:

\- Small uppercase mono

\- Gold color

\- Text: "The Backbone"

2\. Heading:

\- Large, bold

\- Text:

"Backed by the people who matter."

\- Highlight "who matter" with gradient gold

3\. Supporting Text:

\- Short, sharp

\- Focus on credibility:

operators, investors, decision-makers

\- Avoid generic phrases

CARDS (CRITICAL):

Each card must include:

1\. Image:

\- Aspect ratio: 4:5 (portrait)

\- Object-cover

\- Subtle zoom on hover

\- Dark gradient overlay for readability

2\. Badge:

\- Top-left overlay

\- Glassmorphism pill

\- Text: Principal / Investor / Mentor

3\. Name:

\- Prominent typography

4\. Role:

\- Small uppercase mono

\- Gold color

5\. Quote:

\- Italic display text

\- Keep it tight (no long paragraphs)

\- Must feel like insight, not fluff

INTERACTIONS:

\- Hover:

→ slight lift (translateY)

→ image scale (1.03-1.05)

\- Smooth transitions (300-700ms)

\- No heavy animations

BACKGROUND (IMPORTANT DIFFERENTIATION):

\- Slight variation from other sections:

→ Use bg-surface-elevated or subtle gradient

→ Optional faint noise texture

\- Keep consistent dark premium theme

PERFORMANCE:

\- Lazy load images

\- No layout shift

\- Optimized assets

ACCESSIBILITY:

\- Proper alt text (name + role)

\- Maintain contrast

OUTPUT:

\- Mobile-first responsive

\- Same structure as reference

\- Clean, production-ready

**Footer**

Update an existing Footer component (React + Tailwind) for AarambhX.

STRICT RULES:

\- DO NOT change layout, spacing, or grid structure

\- Keep same UI, same classes, same alignment

\- Only replace specific content in the left section

CHANGE REQUIRED:

-

A brand block that includes:

\- AarambhX LOGO (image or SVG)

\- AarambhX TYPOGRAPHY next to it

STRUCTURE:

\- Horizontal alignment (logo + name side by side)

\- Use flex items-center gap-3

\- Logo size:

→ h-10 w-10 (mobile)

→ slightly larger on desktop if needed

\- Typography:

→ font-display

→ text-3xl sm:text-4xl

→ include gradient-text-gold styling on "X" or part of name

2\. KEEP the CTA button BELOW the logo block:

\- "Apply to Pitch" button remains unchanged

\- Same spacing (mt-6)

3\. KEEP ALL OTHER SECTIONS UNCHANGED:

\- Navigation column (middle)

\- Contact column (right)

\- Social icons

\- Grid layout (md:grid-cols-12)

4\. BOTTOM BAR (IMPORTANT - ENSURE PRESENT):

Keep this EXACT structure:

LEFT:

© {currentYear} AarambhX. All rights reserved.

RIGHT:

"Designed & Engineered by Avenir Studios"

\- "Avenir Studios" must be:

→ clickable link

→ opens in new tab

→ href: <https://avenirstudios.vercel.app>

→ styled with hover underline + gold hover color

5\. MOBILE-FIRST:

\- Stack columns vertically on mobile

\- Maintain spacing and readability

\- Ensure logo + text does not overflow

6\. STYLE CONSISTENCY:

\- Maintain dark premium theme

\- Keep borders, spacing, and typography identical

\- No redesign, only content replacement

OUTPUT:

\- Full updated Footer component code

\- No broken imports

\- Same UI, only improved brand presence in left section

**Nav Bar**

Update an existing Navbar component (React + Tailwind) for AarambhX.

STRICT RULES:

\- DO NOT change layout structure

\- DO NOT change spacing, alignment, or visual hierarchy

\- Keep same UI and behavior

\- Only refine responsiveness, clarity, and interaction reliability

MOBILE-FIRST:

\- Design for mobile first

\- Then scale to md and above

\- Ensure:

→ No overflow

→ Proper tap targets (min h-10 w-10)

→ Clean spacing inside dropdown menu

NAVBAR STRUCTURE (KEEP EXACT):

LEFT:

\- Logo (circle with "A" inside gradient)

\- Brand text: AarambhX (X highlighted in gold)

CENTER (desktop only):

\- Navigation links:

Conclave

AarambhX

Backbone

Contact (button trigger)

RIGHT:

\- CTA button:

"Apply to Pitch"

\- Mobile menu toggle (hamburger)

SCROLL BEHAVIOR:

\- When scrolled:

→ Add glass background

→ Reduce padding (py-4 → py-2)

\- Smooth transition (duration-500)

MOBILE MENU:

\- Toggle using state (open/close)

\- Dropdown:

→ glass background

→ rounded-2xl

→ vertical list

\- Clicking any item:

→ closes menu

→ triggers action if needed

INTERACTIONS:

\- Smooth hover transitions on links

\- Hamburger transforms into "X" on open

\- CTA button:

→ slight opacity change on hover

→ shadow maintained

ACCESSIBILITY:

\- aria-label for menu button

\- Proper button roles

\- Keyboard accessible

PERFORMANCE:

\- Passive scroll listener

\- No unnecessary re-renders

OPTIONAL MICRO-IMPROVEMENT (DO NOT BREAK UI):

\- Slight active link highlight when section is in viewport

\- Keep subtle (no heavy underline or color shift)

OUTPUT:

\- Same UI preserved

\- Mobile-first optimized

\- Fully functional dropdown + scroll behavior

**Contact Popup**

Update an existing Contact Modal component (React + Tailwind) for AarambhX.

STRICT RULES:

\- DO NOT change layout structure

\- DO NOT change spacing, alignment, or visual hierarchy

\- Keep same UI design (glass, rounded, dark theme)

\- Only refine clarity, mobile behavior, and interaction quality

MOBILE-FIRST:

\- Ensure modal fits perfectly on small screens

\- Use:

→ max-w-md

→ padding p-6 (mobile) and p-8 (desktop)

\- Prevent overflow:

→ content must scroll if height exceeds viewport

\- Maintain touch lock (no background scroll)

MODAL BEHAVIOR:

\- Open:

→ disable body scroll (overflow hidden)

→ disable touch scrolling

\- Close:

→ restore previous body styles

\- Close triggers:

→ backdrop click

→ close button

→ Escape key

STRUCTURE (KEEP EXACT):

1\. BACKDROP:

\- Full screen overlay

\- bg-background/80 + backdrop-blur

\- Clicking closes modal

2\. MODAL CARD:

\- Centered

\- rounded-3xl

\- border + shadow

\- subtle top gradient line (gold)

3\. HEADER:

\- Eyebrow:

"Get in touch"

→ small uppercase mono, gold

\- Title:

"Contact AarambhX"

→ gradient gold highlight on "AarambhX"

\- Close button (top-right, glass style)

4\. CONTACT ITEMS:

\- Email (clickable mailto)

\- Phone (clickable tel)

\- Address (text)

\- Hours (text)

Each item:

\- Label:

small uppercase mono

\- Value:

readable text

hover color shift (gold for links)

5\. SOCIAL ICONS:

\- Circular glass buttons

\- Instagram, LinkedIn, X

\- Hover: subtle background change

INTERACTIONS:

\- Smooth fade/scale-in modal animation

\- Hover transitions (200-300ms)

\- No heavy animation libraries

PERFORMANCE:

\- No unnecessary re-renders

\- Clean useEffect cleanup

\- Lightweight logic

ACCESSIBILITY:

\- role="dialog"

\- aria-modal="true"

\- aria-labelledby

\- Focus remains inside modal (basic focus handling)

OUTPUT:

\- Same UI preserved

\- Mobile-first optimized

\- Fully functional open/close behavior

**Registration form**

Update an existing multi-step Registration Modal (React + Tailwind) for AarambhX.

STRICT RULES:

\- DO NOT change layout structure

\- DO NOT change step flow (4 steps)

\- DO NOT change UI design (glass, dark theme, spacing)

\- Keep same component structure and logic

\- Only refine behavior, clarity, and conversion effectiveness

MOBILE-FIRST:

\- Modal must work perfectly on mobile

\- Use:

→ full height on mobile

→ max-h-screen with internal scroll

\- Sticky header + sticky footer must remain

\- No overflow or layout break

FLOW STRUCTURE (KEEP EXACT):

Step 1 → Startup basics

Step 2 → Team

Step 3 → Vision

Step 4 → Pitch

PROGRESS SYSTEM:

\- Keep progress bar (top)

\- Smooth width transition

\- Reflect step progression accurately

FORM LOGIC (KEEP):

\- Zod validation

\- Step-wise validation before next

\- Auto-fill member 1 with team head

\- Dynamic team member inputs

\- File upload + link option

CRITICAL UX IMPROVEMENTS (WITHOUT CHANGING UI):

1\. MICRO COPY UPGRADE:

\- Replace vague hints with outcome-driven clarity:

→ "Describe your startup" → "What problem are you solving and for whom?"

→ "Current Stage" → "Select your current traction stage"

2\. STEP INTENT CLARITY:

Add a short line at top of each step:

\- Step 1:

"Basic details to identify your startup"

\- Step 2:

"Who is building this with you?"

\- Step 3:

"Help us understand your business"

\- Step 4:

"Show us your pitch (this matters most)"

3\. VIDEO STEP (IMPORTANT):

\- Add hint:

"Applications with clear pitch videos are prioritized"

\- This increases submission quality

4\. ERROR HANDLING:

\- Keep inline error message

\- Ensure it appears clearly above buttons

\- No silent failures

5\. SUBMISSION FEEDBACK:

\- Keep success screen

\- Ensure strong confirmation:

→ "Application received"

→ "Reviewed within 7 days"

PERFORMANCE:

\- Keep Supabase upload logic unchanged

\- Ensure file size validation (100MB max)

\- No unnecessary re-renders

ACCESSIBILITY:

\- Maintain dialog roles

\- Escape to close

\- Backdrop click closes modal

OUTPUT:

\- Same component structure

\- Same UI preserved

\- Improved clarity + conversion-focused microcopy