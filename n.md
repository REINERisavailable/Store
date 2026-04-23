


Here is a comprehensive and structured **Product Requirements Document (PRD)** based on your description. You can hand this document directly to a developer or use it as a blueprint for your own development.

---

# 📄 Product Requirements Document (PRD)
**Project Name:** AlRahma.Store 
**Target Market:** Morocco (Local E-commerce / Cash on Delivery model)
**Primary Language:** Arabic & English (Admin)
**Currency:** Moroccan Dirham (MAD)

## 1. Executive Summary
The goal is to build an ultra-fast, SEO-optimized e-commerce platform specifically designed for building high-converting, single-product landing pages. It allows store admins to easily add physical products by simply snapping a photo. The system uses AI to reverse-search the image, gather product details, suggest pricing based on costs, automatically categorize the product, and generate a modular landing page. The frontend emphasizes quick conversions with tiered pricing ("buy more, save more"), sticky CTAs, and a simplified checkout form.

## 2. Tech Stack & Architecture
*   **Framework:** Next.js (App Router for maximum SEO & performance)
*   **Database & Auth:** Supabase (PostgreSQL)
*   **Storage:** Supabase Storage (for images and GIFs)
*   **Deployment:** Vercel (Highly recommended for Next.js) or Render
*   **AI Integration:** 
    *   Google Lens API / SerpApi (for reverse image search)
    *   groq api (for extracting product details, generating copy, and auto-categorizing)
*   **Styling:** Tailwind CSS + Framer Motion (for Confetti & animations)
*   **Brand Identity:** Green and White primary colors, cohesive rounded-corner styling, subtle patterned background.

---

## 3. Core Admin Features (Dashboard)

### 3.1 AI-Powered Product Creation
*   **Image Capture/Upload:** Admin clicks "Add New Product" and uploads a photo or screenshot of the physical product.
*   **Reverse Search & Auto-Fill:** System queries the image to automatically fetch:
    *   Product Name.
    *   Features & Benefits.
    *   addmin can take photos high-quality images from the admin dashboard.
*   **Automatic Categorization:** The system uses AI to map the product to a dynamic, multi-level category tree (e.g., Level 1: Accessories > Level 2: Audio > Level 3: Headphones) based on alrady existing tree (optimized in complexity).
    *   Admin can manually override, create, or edit categories if needed. 

### 3.2 Automated Smart Pricing Calculator
Admin inputs the **Base Product Cost**. The system automatically calculates suggested selling prices for 3 pricing tiers.
*   **Constants:** Average Shipping = 30 MAD, Average Ads = 5 MAD, Minimum Profit = 10 MAD.
*   **Pack 1 (1 Item):** `Cost + 30 + 5 + 10 (Min)` -> Admin can adjust upwards.
*   **Pack 2 (2 Items):** Auto-calculates a bulk discount to incentivize upselling.
*   **Pack 3 (3 Items):** Auto-calculates the highest value discount.
*   *Note: Friday/wenesday free shipping is a marketing angle; the 30 MAD is baked into the base price so shipping is effectively covered.*

### 3.3 Landing Page Component Builder (Modular Template)
The admin can organize the generated landing page using editable, drag-and-drop components:
*   **Text/Features Box:** Accepts 8-point bullet lists with Emojis. Stylized with a clean layout text pasted from groq ai api llm.
*   **Image/GIF Box:** Uploads directly to Supabase storage. Automatically styled with rounded corners and fits the green/white theme.
*   **Pricing Packs Box:** Visually distinct section showing Pack 1, Pack 2, and Pack 3.
*   **title and subtitle:** title is main title and subtitle is subtitle.
*   *Admin can edit text, swap images, and reorder components freely before publishing.*

---
- Add to admin interface for easy search of product prices in his store.
- When he gets asked for a product, he can take his phone and go to the admin page.
- He can take a photo and get the exact price and landing page for the product in the image.

## 4. End-User/Customer Features (The Landing Page)

### 4.1 UI/UX & Layout
*   **Theming:** Green and white branding, subtle pattern in the background. Unified rounded corners on all cards and images.
*   **Sticky CTAs:** A highly visible sticky bar at the bottom (or top) of the screen containing:
    *   WhatsApp contact button.
    *   "Buy Now" button (In Arabic: **"اشتري الآن"** or **"اطلب الآن"**).
*   **Tiered Pricing Selection:** A clear, interactive "Buy More to Save More" UI where users easily select between Pack 1, Pack 2, or Pack 3.

### 4.2 Frictionless Checkout Flow
*   **Bottom-of-Page Form:** No complex cart systems. A simple form at the bottom of the landing page.
*   **Fields required:**
    1.  Full Name
    2.  Phone Number **OR** Email Address (Only one is required).
    3.  Delivery Address.
*   **Post-Purchase Delight:** When the user clicks the final Arabic "Buy" submit button, a full-screen **Confetti animation** triggers, followed by a Thank You message.

---

## 5. SEO & AI Readiness

*   **Programmatic SEO:** When a product is created, Next.js dynamically generates a statically optimized page (SSG/ISR).
*   **Metadata Generation:** AI automatically generates SEO titles, meta descriptions, and alt tags for images.
*   **Semantic HTML:** Strict adherence to semantic HTML (`<article>`, `<section>`, `<h1>`-`<h3>`) and JSON-LD structured data for E-commerce products to ensure high ranking on Google.
*   **AI Readability:** The DOM structure should be clean, with clear class names and IDs, making it easy for future AI scraping bots (or LLM shopping assistants) to read the product details and prices.

---

## 6. Implementation 

*   Set up Next.js app, Supabase Auth (for Admin), and Supabase PostgreSQL.
*   Design the Database schema (`Products`, `Categories`, `Orders`, `Media`).
*   Set up Supabase Storage buckets for product images and GIFs.

*   Integrate Image upload functionality.
*   Connect groq ai api llm to analyze the image, output JSON with generated title, bullet points, and categories.
*   Build the pricing calculator logic (Cost + Shipping + Ads + Margin).

- We need to suggest for each landing page the best matching product from our store to add it to the bucket.
- It should be like, uh, incentivize sales.
- So we need to promote in each landing page the most like two or three related products to add to the bucket to add to the price, I mean, don't over-engineer, never over-engineer. 

We want orders to be saved into a Google Sheet. You want a Google Sheet. So, we need to connect the Google API, the Google Sheet API. I have the API. I just need to make sure it works. So, be very, very careful on testing this one, like test filling the Google Sheets. I already connected one time, it didn't work. When I go to Google Sheets, it's empty. You need to make sure you write tests to write an order into the Google Sheet so I can see if it's filled or not. Add one or two orders, and so I can see if it works or not. Do not over-engineer all of this app, but make sure the MVP works.

*   Build the modular React components (Features Box, Media Box, Pricing Tier Selector).
*   Create the Admin UI to reorder and edit these components.

*   Implement the Green/White theme, rounded corners, and background patterns.
*   Add the Sticky WhatsApp/Buy bar 0603323334.
*   Build the simplified checkout form and connect it to Supabase (inserting into `Orders` table).
*   Implement `framer-motion` or `canvas-confetti` for the post-checkout animation.

*   Implement Next.js Metadata API and JSON-LD.
*   Deploy to Vercel. Test Core Web Vitals to ensure top speeds.

---

1.  **Don't Over-engineer :** Keep the category database structure a simple Adjacency List (e.g., a `Category` table with `id`, `name`, `parent_id`). The AI should pass a string like "Accessories > Audio > Headphones" based on cuureent categoy tree and a utility function should parse/create this on the backend.
2.  **Focus on Speed:** Since these are landing pages, image optimization (Next/Image) is critical. Gifs should be optimized or converted to looping mp4s where possible.
3.  **Local Market Nuance:** The checkout flow assumes a Cash on Delivery (COD) model, which is why Stripe/Payment gateways are intentionally left out of the PRD in favor of a simple lead-gen form.



MOOBILE FIRST OPTIMIZED LANDING PAGE ONLY , MAKE SURE TO KNOW TO OPTIMIZE AND MAKE LANDING PAGES FIT MOBILE FIRST 