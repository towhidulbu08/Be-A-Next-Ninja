# Next.js Pages Router vs App Router

## 1. Pages Router কী?

Pages Router হলো Next.js-এর পুরোনো routing system, যেখানে `pages/` directory-এর file structure অনুযায়ী route তৈরি হয়।

### Example

```text
pages/
├── index.tsx          → /
├── about.tsx          → /about
└── products/
    └── [id].tsx       → /products/:id
```

### Important Features

- `pages/` directory ব্যবহার করে
- File-based routing
- Dynamic routes support করে
- `getServerSideProps()` ব্যবহার করা যায়
- `getStaticProps()` ব্যবহার করা যায়
- `getStaticPaths()` ব্যবহার করা যায়
- API routes-এর জন্য `pages/api` ব্যবহার করা হয়

### Interview Answer

> Pages Router is the older routing system of Next.js. It uses the `pages` directory for file-based routing and provides features like `getServerSideProps`, `getStaticProps`, and API routes through `pages/api`.

---

# 2. App Router কী?

App Router হলো Next.js-এর modern routing system, যা Next.js 13 থেকে introduced হয়েছে।

এটি `app/` directory ব্যবহার করে এবং React Server Components-এর উপর ভিত্তি করে তৈরি।

### Example

```text
app/
├── page.tsx              → /
├── about/
│   └── page.tsx          → /about
└── products/
    └── [id]/
        └── page.tsx      → /products/:id
```

### Important Features

- `app/` directory ব্যবহার করে
- File-based routing
- React Server Components default
- Client Components-এর জন্য `"use client"`
- Nested layouts
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- Route Handlers
- Modern data fetching
- Streaming এবং Suspense support

### Interview Answer

> App Router is the modern routing system of Next.js. It uses the `app` directory and is built around React Server Components. It also provides nested layouts, loading and error UI, Route Handlers, and modern data-fetching capabilities.

---

# 3. Pages Router vs App Router

| Pages Router                       | App Router                                |
| ---------------------------------- | ----------------------------------------- |
| `pages/` directory                 | `app/` directory                          |
| Older routing architecture         | Modern routing architecture               |
| `getServerSideProps()`             | Server Components-এর মধ্যে `async/await`  |
| `getStaticProps()`                 | Modern data fetching                      |
| `getStaticPaths()`                 | Dynamic routes + modern static generation |
| `pages/api`                        | Route Handlers                            |
| Traditional architecture           | React Server Components architecture      |
| Nested layouts built-in নয়         | Nested layouts built-in                   |
| `loading.tsx` নেই                  | `loading.tsx` আছে                         |
| `error.tsx` নেই                    | `error.tsx` আছে                           |
| Server Components architecture নেই | Server Components default                 |

---

# 4. Main Differences

## 4.1 Directory

### Pages Router

```text
pages/
```

### App Router

```text
app/
```

---

## 4.2 Server Components

App Router-এর সবচেয়ে important featureগুলোর একটি হলো:

> **Server Components are the default.**

Example:

```tsx
export default async function Page() {
  const data = await getData();

  return <div>{data.name}</div>;
}
```

App Router-এ Server Component `async` হতে পারে।

Client-side interactivity প্রয়োজন হলে:

```tsx
"use client";
```

ব্যবহার করে Client Component তৈরি করা হয়।

---

# 5. Data Fetching Difference

## Pages Router

Pages Router-এ সাধারণত:

```tsx
getServerSideProps();
```

এবং

```tsx
getStaticProps();
```

ব্যবহার করা হতো।

Example:

```tsx
export async function getServerSideProps() {
  const res = await fetch("https://api.example.com/products");

  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
```

---

## App Router

App Router-এ Server Component-এর ভিতরেই directly data fetch করা যায়:

```tsx
export default async function Page() {
  const res = await fetch("https://api.example.com/products");

  const products = await res.json();

  return <ProductList products={products} />;
}
```

এখানে `getServerSideProps()` প্রয়োজন নেই।

---

# 6. Layout Difference

App Router-এর একটি বড় সুবিধা হলো built-in nested layouts।

Example:

```text
app/
├── layout.tsx
├── page.tsx
└── dashboard/
    ├── layout.tsx
    ├── page.tsx
    └── settings/
        └── page.tsx
```

এখানে:

```text
Root Layout
    ↓
Dashboard Layout
    ↓
Dashboard / Settings Page
```

Layoutগুলো nested এবং reusable।

---

# 7. API Difference

## Pages Router

API route:

```text
pages/api/users.ts
```

এটি:

```text
/api/users
```

route তৈরি করে।

---

## App Router

App Router-এ Route Handler ব্যবহার করা হয়:

```text
app/api/users/route.ts
```

Example:

```tsx
export async function GET() {
  return Response.json({
    message: "Hello",
  });
}
```

একই `route.ts`-এ বিভিন্ন HTTP method define করা যায়:

```tsx
export async function GET() {}

export async function POST() {}

export async function PUT() {}

export async function PATCH() {}

export async function DELETE() {}
```

---

# 8. App Router-এর Special Files

App Router-এ কিছু special file convention আছে:

```text
app/
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

### `page.tsx`

একটি route তৈরি করে।

```text
app/about/page.tsx → /about
```

### `layout.tsx`

Shared layout তৈরি করে।

### `loading.tsx`

Loading UI দেখায়।

### `error.tsx`

Route-level error UI handle করে।

### `not-found.tsx`

404 UI handle করে।

---

# 9. Which One Should We Use?

নতুন Next.js project-এর ক্ষেত্রে সাধারণত:

> **App Router prefer করা উচিত।**

কারণ এটি Next.js-এর modern architecture এবং React-এর modern features-এর সাথে বেশি integrated।

### Main Advantages

- Server Components
- Client Components
- Nested Layouts
- Streaming
- Suspense
- Loading UI
- Error UI
- Route Handlers
- Modern data fetching

তবে Pages Router এখনও supported এবং existing/older projects-এ ব্যবহার করা হয়।

---

# 10. Interview Questions & Answers

## Q1. What are Pages Router and App Router?

**Answer:**

> Next.js has two routing systems: Pages Router and App Router. Pages Router is the older routing system and uses the `pages` directory. App Router is the modern routing system and uses the `app` directory. App Router provides features like React Server Components, nested layouts, loading and error UI, and Route Handlers.

---

## Q2. What is the main difference between Pages Router and App Router?

**Answer:**

> The main difference is their architecture. Pages Router uses the older `pages`-based architecture, while App Router uses the modern `app`-based architecture with React Server Components, nested layouts, Route Handlers, and modern data fetching.

---

## Q3. Which one is recommended for new projects?

**Answer:**

> I would generally prefer App Router for new projects because it provides the modern Next.js architecture and features like Server Components, nested layouts, streaming, and Route Handlers.

---

## Q4. Can we still use Pages Router?

**Answer:**

> Yes. Pages Router is still supported, especially for existing projects. However, App Router is generally preferred for new projects.

---

## Q5. What is the difference in data fetching?

**Answer:**

> In Pages Router, we commonly use `getServerSideProps`, `getStaticProps`, and `getStaticPaths`. In App Router, we can fetch data directly inside async Server Components using `async/await`.

---

## Q6. What is a Server Component in App Router?

**Answer:**

> A Server Component is a component that runs on the server and does not send its component JavaScript to the browser in the same way as a Client Component. In App Router, components are Server Components by default.

---

## Q7. How do you create a Client Component?

**Answer:**

> We add `"use client"` at the top of the component file.

Example:

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

# 11. 30-Second Interview Answer

যদি interviewer বলে:

> **"Explain Pages Router and App Router."**

তাহলে এই answer-টা দিতে পারো:

> Next.js has two routing systems: Pages Router and App Router. Pages Router is the older routing system and uses the `pages` directory. It provides features like `getServerSideProps`, `getStaticProps`, and API routes through `pages/api`. App Router is the modern routing system, introduced in Next.js 13, and uses the `app` directory. It is built around React Server Components and provides features like nested layouts, loading and error UI, Route Handlers, and modern data fetching. For new projects, I would generally prefer App Router.

---

# 12. Quick Revision

```text
Pages Router
    ↓
pages/
    ↓
Older Architecture
    ↓
getServerSideProps
getStaticProps
pages/api


App Router
    ↓
app/
    ↓
Modern Architecture
    ↓
Server Components
Client Components
Nested Layouts
loading.tsx
error.tsx
not-found.tsx
Route Handlers
Modern Data Fetching
```

## ⭐ Most Important Points to Remember

1. `pages/` → Pages Router
2. `app/` → App Router
3. Pages Router → older architecture
4. App Router → modern architecture
5. App Router → Server Components default
6. `"use client"` → Client Component
7. Pages Router → `getServerSideProps`, `getStaticProps`
8. App Router → async Server Components
9. Pages Router → `pages/api`
10. App Router → Route Handlers
11. App Router → built-in nested layouts
12. New projects → generally prefer App Router

## Link

- [App router vs Page router](https://dev.to/shyam0118/app-router-vs-pages-router-in-nextjs-a-deep-practical-guide-341g)
