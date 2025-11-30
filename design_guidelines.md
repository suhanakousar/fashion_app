# Fashion Designer Web Application - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from premium fashion e-commerce platforms like Net-a-Porter, SSENSE, and Shopify's boutique themes, combined with modern SaaS admin interfaces like Linear and Notion for the dashboard.

**Core Principles**:
- Boutique elegance with breathing room
- Image-first storytelling
- Professional admin efficiency
- Mobile-optimized touch interactions

---

## Typography

**Font System** (Google Fonts via CDN):
- **Primary**: Playfair Display (serif) - For headlines, design titles, elegant accents
- **Secondary**: Inter (sans-serif) - For body text, UI elements, admin interface

**Hierarchy**:
- Hero Headlines: Playfair Display, 3xl to 6xl responsive scale, normal weight
- Section Titles: Playfair Display, 2xl to 4xl, medium weight
- Design Titles: Playfair Display, xl to 2xl, semibold
- Body Text: Inter, base to lg, regular weight
- UI Labels: Inter, sm to base, medium weight
- Captions/Metadata: Inter, xs to sm, regular weight, subtle treatment
- Admin Headers: Inter, lg to xl, semibold
- Data/Numbers: Inter, tabular-nums for alignment

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistency
- Micro spacing (between elements): 2, 4
- Component internal spacing: 4, 6, 8
- Section padding: 12, 16, 20, 24
- Large breakpoints: 32, 40, 48

**Container Strategy**:
- Public pages: max-w-7xl for full layouts, max-w-4xl for focused content
- Admin interface: Full-width layouts with proper sidebar constraints
- Gallery grids: Full-width with internal gutters (gap-6 to gap-8)

---

## Component Library

### PUBLIC-FACING COMPONENTS

**Navigation**:
- Fixed top navigation with logo left, minimal menu items right
- Sticky on scroll with subtle background blur
- Mobile: Hamburger menu expanding to full-screen overlay
- CTA button prominently placed ("Book a Design" or contact)

**Homepage Hero**:
- Full-bleed hero image (80vh) showcasing featured design/collection
- Centered typography overlay with blur-backdrop buttons
- Headline + subheadline + primary CTA
- Subtle scroll indicator at bottom

**Design Gallery Grid**:
- Masonry or equal-height card grid (2 columns mobile, 3-4 desktop)
- Each card: Large image, design title, category tag, price
- Hover state: Subtle scale and overlay revealing "View Details"
- Category filter pills above grid
- Search bar (simple, elegant)

**Design Detail Page**:
- Large image carousel (swipeable on mobile, arrow navigation desktop)
- Thumbnail strip below main image
- Right sidebar (desktop) or below (mobile): Title, price, description, category
- Fixed "Book This Design" CTA button (always visible)
- Additional images in grid format below fold

**Booking Form**:
- Multi-step feel with clear progress (Contact → Measurements → Details → Confirm)
- Large form fields with proper labels and placeholders
- File upload zone with drag-and-drop visual feedback
- Measurement inputs grouped logically with helper text
- Date picker with calendar interface
- Prominent submit button
- Confirmation page with order summary card and WhatsApp CTA button

**Footer**:
- Contact information, social links
- Newsletter signup (email input + button)
- Business hours, location if applicable
- Copyright and minimal legal links

### ADMIN DASHBOARD COMPONENTS

**Dashboard Layout**:
- Left sidebar navigation (collapsible on mobile)
- Top bar with search, notifications icon, user profile
- Main content area with padding
- Breadcrumb navigation below top bar

**Dashboard Cards**:
- Summary metrics in 2x2 or 3-grid layout
- Large numbers with labels ("12 New Requests", "$2,450 Outstanding")
- Icon + metric + trend indicator
- Clickable cards leading to filtered views

**Data Tables**:
- Clean borders, alternating row subtle background
- Sortable column headers with icons
- Status badges (pill-shaped, semantic coloring scheme)
- Action buttons (icons) in last column
- Pagination with page size selector
- Bulk actions toolbar when items selected

**Client Profile Page**:
- Header card: Name, contact details, WhatsApp quick-link button
- Tab navigation: Overview, Orders, Measurements, Billing
- Order history list with expand/collapse per order
- Measurement form with labeled inputs and add/edit modes
- Billing ledger table with running total footer
- Export buttons (CSV, PDF) as outlined secondary buttons

**Order Detail Page**:
- Status stepper showing current stage (visual timeline)
- Design preview card linking to design
- Client info card with contact shortcuts
- Uploaded files gallery with download options
- Billing entries section with add line-item form
- Payment recording interface
- Status update dropdown with save button
- Generate invoice button (primary, prominent)

**Design Management**:
- Create/Edit form with large image upload zone
- Multi-image upload with drag-to-reorder thumbnails
- Rich text editor for description
- Category dropdown, price input (numeric)
- Publish toggle switch
- Preview button to see public view

**Forms & Inputs**:
- Input fields with floating labels or top labels (consistent choice)
- Clear focus states with border emphasis
- Error messages below fields (small, descriptive)
- Success states with checkmark icons
- Dropdown selects styled consistently
- Date pickers with calendar popup
- File upload with progress indicators

**Buttons**:
- Primary: Solid fill, medium weight, rounded corners
- Secondary: Outlined, same border radius
- Danger: Semantic treatment for destructive actions
- Icon buttons: Square or circular, hover background
- Button groups for related actions
- Size variants: sm, base, lg

**Notifications**:
- Notification panel sliding from right
- List of recent notifications with icons, timestamps
- Badge counter on bell icon
- Mark as read functionality
- Empty state with illustration

**Modals & Overlays**:
- Centered modal with backdrop blur
- Clear header with close button
- Content area with scrolling if needed
- Action buttons at bottom (right-aligned)
- Confirmation modals for destructive actions

---

## Images

### Public Site Images

**Hero Section**:
- Single stunning fashion photograph (full-bleed, 80vh)
- High-quality lifestyle shot or signature design piece
- Portrait or landscape orientation based on brand aesthetic
- Blurred background treatment for text overlay readability

**Design Gallery**:
- Each design card: Professional product photography
- Consistent aspect ratio across gallery (1:1 or 4:5 portrait)
- High-resolution images optimized for web
- Lifestyle shots showing designs worn/in-context preferred

**Design Detail Pages**:
- Multiple angles: Front, back, detail shots, styling options
- Minimum 3-5 images per design
- Mix of flat-lay and model shots where applicable

**About/Footer Sections**:
- Designer portrait or studio photograph for credibility
- Workshop/atelier imagery to build trust and authenticity

### Admin Interface Images

- Design thumbnails in tables and cards
- Client uploaded reference images (gallery display)
- Placeholder avatars for clients without photos
- Empty state illustrations for zero-data screens

**Technical Specifications**:
- Use Supabase Storage CDN URLs
- Lazy loading for gallery images
- Image optimization: WebP format with JPEG fallback
- Responsive image sizing with srcset
- Alt text for all images (accessibility)

---

## Responsive Breakpoints

- Mobile: base (default)
- Tablet: md: (768px)
- Desktop: lg: (1024px)
- Wide: xl: (1280px)

**Mobile-First Adjustments**:
- Stack all multi-column layouts to single column
- Enlarge touch targets (minimum 44x44px)
- Simplify navigation to hamburger menu
- Full-width forms and cards
- Reduce padding/spacing proportionally

---

This design system balances boutique elegance for the public-facing portfolio with professional efficiency for the admin dashboard, ensuring a cohesive yet contextually appropriate experience across both user roles.