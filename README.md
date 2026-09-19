# Tabernacle Of Mercy Parish — Church Website

A professional church website for The Redeemed Christian Church of God, Tabernacle Of Mercy Parish,
built in the style of a premium WordPress/ThemeForest church theme.

## Running the site

```bash
npm install     # first time only
npm run dev     # development server
npm run build   # production build into dist/
npm run preview # preview the production build
```

## Editing your content

**Almost everything you will want to change lives in one file: `src/data/site.js`.**

That file holds the church name, address, phone, email, WhatsApp number, social links,
service times, ministries, events, sermons, testimonies, leadership team, core values,
giving categories and bank account details. Edit the values there and every page updates.

### Replacing the photographs

All photos currently use placeholder images from Unsplash. To use your own parish photos:

1. Put your images in the `public/` folder (e.g. `public/images/choir.jpg`).
2. In `src/data/site.js`, replace the `image:` URL with `/images/choir.jpg`.

The hero, page banners and welcome-section portrait are set directly in their page files:

| Image | File |
|---|---|
| Homepage hero | `src/pages/Home.jsx` (`HERO_IMAGE`) |
| Pastor portrait | `src/pages/Home.jsx` (`WelcomeSection`) |
| Page banners | the `<PageBanner image="..." />` at the top of each page |

### Changing the map

Set `mapEmbed` in `src/data/site.js` to a Google Maps embed URL for your address.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | Church history, vision, mission, core values, leadership |
| `/ministries` | Six ministry profiles and how to join |
| `/events` | Event listings, month calendar, registration form |
| `/sermons` | Featured message with audio player, filterable archive |
| `/give` | Giving categories, online giving form, bank transfer |
| `/prayer-request` | Prayer request form |
| `/contact` | Contact details, form, map, WhatsApp |

## Connecting the forms and payments

The forms and the giving flow are **front-end only** — they show a confirmation message
but do not yet send anything anywhere. Before going live you will need to connect:

- **Contact, prayer request, registration and newsletter forms** — point them at your
  email service or form backend (Formspree, Web3Forms, EmailJS or your own API).
- **Online giving** — wire the "Proceed to Secure Payment" button to the Paystack or
  Flutterwave checkout using your live merchant keys. Never put secret keys in this
  front-end code; use a small server endpoint to initialise each transaction.
- **Sermon audio** — set the `src` on the `<audio>` element in `src/pages/Sermons.jsx`
  and the download links to your hosted MP3 and notes files.

## Design

- **Colours** — Primary Blue `#0057D9`, Deep Blue `#003D99`, White, Light Gray `#F5F5F5`
- **Type** — Poppins for headings, Open Sans for body text
- **Tokens** — defined in `tailwind.config.js`; shared button and section styles in `src/index.css`

Built with React, Vite, React Router and Tailwind CSS.
