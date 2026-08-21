# SSR, SSG & ISR in Next.js

## 1. SSR — Server-Side Rendering

**SSR = প্রতিবার request আসলে server HTML তৈরি করে।**

Flow:

```text
Browser
   ↓
GET /products
   ↓
Server
   ↓
Latest data fetch
   ↓
HTML তৈরি
   ↓
Browser
```

Example:

```tsx
export default async function ProductsPage() {
  const res = await fetch("https://api.example.com/products", {
    cache: "no-store",
  });

  const products = await res.json();

  return <div>{products.map(...)}</div>;
}
```

### কখন ব্যবহার করব?

- সবসময় fresh data দরকার হলে
- Dashboard
- Personalized data
- Frequently changing data

### সুবিধা

- Latest data পাওয়া যায়
- User-specific data সহজে দেখানো যায়

### অসুবিধা

- প্রতিটি request-এ server কাজ করে
- তুলনামূলকভাবে বেশি server work

---

## 2. SSG — Static Site Generation

**SSG = Build করার সময় HTML তৈরি হয়ে যায়।**

Flow:

```text
npm run build
      ↓
Next.js
      ↓
Data fetch
      ↓
HTML generate
      ↓
Static HTML
```

এরপর user request করলে আগে থেকে তৈরি HTML serve করা হয়।

```text
Browser
   ↓
GET /blog
   ↓
Already generated HTML
   ↓
Browser
```

### Example use case

ধরো তোমার:

```text
/blog/hello-world
/blog/nextjs
/blog/react
```

এই blog pages-এর data যদি খুব ঘন ঘন change না হয়, তাহলে static generation ভালো।

### কখন ব্যবহার করব?

- Blog
- Documentation
- Portfolio
- Marketing pages
- যেসব page-এর data খুব কম পরিবর্তন হয়

### সুবিধা

- খুব fast
- Server-এর উপর কম pressure
- CDN থেকে serve করা সহজ

### অসুবিধা

Build হওয়ার পর data change হলেও নতুন build না করলে নতুন data পাওয়া যাবে না।

---

## 3. ISR — Incremental Static Regeneration

**ISR = Static page থাকবে, কিন্তু নির্দিষ্ট সময় পর নতুন data দিয়ে page revalidate/regenerate হতে পারবে।**

Example:

```tsx
const res = await fetch("https://api.example.com/products", {
  next: {
    revalidate: 60,
  },
});
```

এখানে `60` মানে 60 seconds-এর revalidation period।

সহজ flow:

```text
Page generated
      ↓
Static/Cached page
      ↓
Revalidation time reached
      ↓
New request
      ↓
New data দিয়ে page update
```

### Important

`revalidate: 60` মানে প্রতি 60 seconds-এ automatically সব page regenerate করবে—এমন না।

বরং cached data/page stale হলে পরবর্তী request-এর সময় revalidation হতে পারে।

### কখন ব্যবহার করব?

- Blog
- News
- Product catalog
- CMS content
- এমন data যা frequently change হয় কিন্তু প্রতি request-এ fresh হওয়া জরুরি নয়

### সুবিধা

- Static page-এর মতো fast
- Periodically updated data
- প্রতি request-এ full rendering দরকার হয় না

---

# SSR vs SSG vs ISR

| Feature           | SSR                          | SSG                   | ISR                   |
| ----------------- | ---------------------------- | --------------------- | --------------------- |
| HTML কখন তৈরি হয়? | Request time                 | Build time            | Static + revalidation |
| Data              | খুব fresh                    | Build-এর সময়কার       | Periodically updated  |
| Speed             | তুলনামূলক কম                 | খুব fast              | খুব fast              |
| Server work       | বেশি                         | কম                    | মাঝারি                |
| Data update       | প্রতি request                | নতুন build দরকার      | Revalidation অনুযায়ী  |
| Best for          | Dashboard, personalized data | Blog, docs, portfolio | News, blog, products  |

---

# সহজে মনে রাখার উপায়

```text
SSR
Request → Render
```

```text
SSG
Build → Render
```

```text
ISR
Build/Static → Revalidate → Update
```

আরও সহজভাবে:

> **SSR = প্রতি request-এ render**

> **SSG = build-এর সময় render**

> **ISR = static + সময় অনুযায়ী revalidate**

---

# Next.js App Router-এর গুরুত্বপূর্ণ connection

Next.js App Router-এ rendering বুঝতে গেলে **fetch caching এবং revalidation**-এর সাথে SSR/SSG/ISR-এর সম্পর্ক বুঝতে হবে।

### Fresh data / Dynamic behavior

```tsx
fetch(url, {
  cache: "no-store",
});
```

এতে cached response ব্যবহার না করে fresh data fetch করা যায়।

### Cached data + Revalidation

```tsx
fetch(url, {
  next: {
    revalidate: 60,
  },
});
```

এতে data cache করা যায় এবং revalidation-এর মাধ্যমে সময় অনুযায়ী update করা যায়।

---

# Interview Answer

যদি interviewer জিজ্ঞেস করে:

**"What is the difference between SSR, SSG and ISR?"**

তাহলে সংক্ষেপে বলতে পারো:

> **SSR renders the page on every request. SSG generates the page at build time and serves it as static HTML. ISR combines the benefits of static generation with periodic revalidation, allowing static pages to be updated without rebuilding the entire application.**

বাংলায়:

> **SSR-এ প্রতিটি request-এর সময় server page render করে। SSG-তে build time-এ page generate হয় এবং static HTML হিসেবে serve হয়। ISR static page serve করে, কিন্তু নির্দিষ্ট সময় পর revalidation-এর মাধ্যমে নতুন data দিয়ে page update করতে পারে।**
