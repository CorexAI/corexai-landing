This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Updating Content

- **Testimonials:** Edit the testimonials section in `src/app/page.tsx`.
- **Pricing/Subscription:** Update the pricing details and PayPal integration in `src/app/pricing/page.tsx`.
- **App Store/Play Store Links:** Update the button links in the hero section of `src/app/page.tsx` when your app is live.
- **Social Media Links:** Update the social icons section in `src/app/page.tsx` with your actual URLs.
- **Logo:** Replace `/public/next.svg` with your logo file and update the `src/app/layout.tsx` if needed.

## Connecting Your Domain (corexai.app) on Vercel

1. Deploy your site to Vercel (https://vercel.com/).
2. In your Vercel dashboard, go to your project settings > Domains.
3. Add `corexai.app` as a custom domain.
4. Follow Vercel's instructions to update your DNS records (usually at your domain registrar).
5. Once DNS propagates, your site will be live at `https://corexai.app`.

## Project Structure Overview

- `src/app/layout.tsx`: Global layout, navbar, and footer.
- `src/app/page.tsx`: Home page (hero, features, testimonials, social icons).
- `src/app/pricing/page.tsx`: Pricing and payment form.
- `src/app/terms/page.tsx`: Terms of Service.
- `src/app/privacy/page.tsx`: Privacy Policy.
- `public/`: Static assets (logo, icons, etc.).

---

For further customization, edit the respective files in the `src/app/` directory. If you need help, just ask!
