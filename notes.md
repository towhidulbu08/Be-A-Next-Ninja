# 27-02: How React Js Solved Traditional Web Development

# AJAX ও React: কেন দরকার হলো?

## ভূমিকা

Traditional web development-এর সমস্যাটা বুঝতে হলে আগে বুঝতে হবে সেটা আসলে কীভাবে কাজ করত।

---

## ১. Traditional (Pre-AJAX) Web Development

তুমি একটা form submit করলে বা লিংকে ক্লিক করলে, browser পুরো একটা নতুন HTTP request পাঠাত server-এ। Server পুরো একটা নতুন HTML page বানিয়ে পাঠাত। আর browser পুরো page **reload** করে ফেলত — মানে পুরো DOM নতুন করে তৈরি হতো, পুরো page সাদা হয়ে গিয়ে আবার লোড হতো।

### Traditional Development-এর সমস্যাগুলো

**১. পুরো page reload — অপচয়**
তুমি যদি শুধু একটা comment submit করো, বা একটা like বাটনে ক্লিক করো, তাহলেও পুরো page (header, footer, sidebar, নেভিগেশন — সব) আবার নতুন করে download ও render হতো। অথচ শুধু ঐ ছোট্ট অংশটাই তো change দরকার ছিল।

**২. Bandwidth ও server load বেশি**
প্রতিবার পুরো HTML পাঠাতে হতো (কয়েক KB থেকে কয়েক MB), যদিও আসল দরকার ছিল হয়তো কয়েক বাইট data (যেমন "like count: 45")। এতে server-এও বেশি load পড়ত, user-এরও বেশি data খরচ হতো।

**৩. খারাপ User Experience**
পুরো page flash/blink করে reload হতো, scroll position হারিয়ে যেত, form-এ টাইপ করা অন্য data (যদি একসাথে অনেক field থাকত) হারিয়ে যাওয়ার ভয় থাকত। মনে হতো যেন app না, শুধু static document।

**৪. Real-time বা live feature অসম্ভব ছিল**
Notification, live chat, live score আপডেট — এগুলো করতে হলে user-কে বারবার manually page reload করতে হতো, বা পুরো page auto-refresh (`<meta http-equiv="refresh">`) করাতে হতো, যেটা আরও বাজে experience।

**৫. State হারিয়ে যাওয়া**
Video চলছিল, বা কোনো animation চলছিল, বা scroll position ছিল — পুরো page reload হলে সবকিছু reset হয়ে যেত।

---

## ২. AJAX এই সমস্যার সমাধান দিল

AJAX (Asynchronous JavaScript and XML) দিয়ে JavaScript background-এ (asynchronously) server-এ ছোট একটা request পাঠাতে পারে, আর response হিসেবে শুধু দরকারি data (JSON/XML/text) নিয়ে আসতে পারে — **পুরো page reload ছাড়াই**। তারপর JS দিয়ে সেই data দিয়ে শুধু DOM-এর প্রয়োজনীয় অংশটুকু update করা যায়।

> **উদাহরণ:** Facebook-এ like বাটনে ক্লিক করলে শুধু like count বদলায়, পুরো page reload হয় না — এটাই AJAX-এর কারিশমা।

### সংক্ষেপে টেবিল আকারে

| সমস্যা (Traditional)     | AJAX সমাধান                     |
| ------------------------ | ------------------------------- |
| পুরো page reload         | শুধু প্রয়োজনীয় অংশ update     |
| বেশি bandwidth/data      | ছোট JSON/text data transfer     |
| Flicker/blink experience | Smooth, app-like UX             |
| Real-time impossible     | Background polling/update সম্ভব |
| Scroll/state হারানো      | State ঠিক থাকে                  |

এইজন্যই AJAX আসার পর web app গুলো "document" থেকে "application"-এর মতো behave করা শুরু করল — Gmail, Facebook, Twitter-এর মতো SPA (Single Page Application) এই concept-এর উপরেই দাঁড়িয়ে।

---

## ৩. AJAX থাকার পরেও কেন React দরকার হলো

AJAX সমাধান করেছিল "server থেকে data আনার" সমস্যা, কিন্তু আরেকটা বড় সমস্যা রয়েই গিয়েছিল — **সেই data দিয়ে DOM manually manage করার সমস্যা**। AJAX শুধু data আনতে সাহায্য করে, কিন্তু সেই data দিয়ে UI কীভাবে সাজাবে, update করবে — সেটা নিজে হাতে vanilla JS/jQuery দিয়ে handle করতে হতো। এখানেই React-এর দরকার পড়ল।

### AJAX যুগের (jQuery Era) আসল সমস্যাগুলো

**১. Manual DOM manipulation — অগোছালো ও error-prone**

AJAX দিয়ে data আনার পর নিজে হাতে বলতে হতো _কোন element_ বদলাবে, _কীভাবে_ বদলাবে। যেমন:

```javascript
$.ajax({
  url: "/api/likes",
  success: function (data) {
    $("#like-count").text(data.count);
    $("#like-btn").addClass("liked");
    $(".comment-list").append("<li>" + data.newComment + "</li>");
    // আরও ১০টা জায়গায় manually change করতে হতো
  },
});
```

Page যত বড় হতো, এরকম manual `$(...)` selector আর DOM update-এর সংখ্যা তত বাড়ত।

**২. State আর UI sync রাখা কঠিন**
Data (state) আর তার UI representation — এই দুটো আলাদা রাখতে হতো, আর manually sync করতে হতো। একটা জায়গায় data change করলে UI-এর ৫টা জায়গায় manually update দিতে ভুলে গেলে bug হতো। বড় app-এ এটা track করা প্রায় অসম্ভব হয়ে যেত ("spaghetti code")।

**৩. Code reusability কম**
একই ধরনের UI component (যেমন button, card, modal) বারবার আলাদা আলাদা জায়গায় লিখতে হতো, কারণ কোনো structured "component" concept ছিল না।

**৪. Large-scale app maintain করা কঠিন**
Facebook-এর মতো বড় app-এ হাজার হাজার jQuery selector আর callback একসাথে চালানো, আর কোন change কোথায় প্রভাব ফেলছে সেটা track করা রীতিমতো দুঃস্বপ্ন হয়ে যেত। এই সমস্যার কারণেই Facebook নিজেরাই React বানিয়েছিল (২০১৩)।

**৫. Predictability ও debugging সমস্যা**
Multiple callback, event, ও AJAX response একসাথে DOM বদলালে "race condition" বা "কোন জায়গা থেকে কে DOM বদলাল" বোঝা কঠিন হয়ে যেত।

### React কী সমাধান দিল

| সমস্যা (jQuery + AJAX Era)  | React সমাধান                                                    |
| --------------------------- | --------------------------------------------------------------- |
| Manual DOM manipulation     | Virtual DOM — শুধু "data দেখাও কী" বলবে, React নিজে DOM বদলাবে  |
| State আর UI আলাদা রাখা কঠিন | State change হলে UI automatically re-render হয় (declarative)   |
| Code repeat হওয়া           | Component-based architecture — বারবার reuse করা যায়            |
| বড় app maintain করা কঠিন   | Component tree দিয়ে organized, predictable structure           |
| Debug করা কঠিন              | One-way data flow — কোথা থেকে কী বদলাচ্ছে সহজে ট্র্যাক করা যায় |

---

## ৪. সংক্ষিপ্ত সারসংক্ষেপ

- **AJAX সমাধান দিল:** "server থেকে data আনতে পুরো page reload লাগবে না"
- **React সমাধান দিল:** "সেই data দিয়ে UI বানাতে/আপডেট করতে হাজারটা manual DOM operation লিখতে হবে না"

তাই AJAX আর React আসলে **একই সমস্যার দুই ভিন্ন স্তরের সমাধান** — একটা network layer-এর সমস্যা মেটায়, আরেকটা UI-rendering layer-এর সমস্যা মেটায়। এজন্যই আজও React app-এ AJAX/fetch পুরোপুরি ব্যবহার হয় — React data আনার কাজটা করে না, শুধু সেই data দিয়ে UI ম্যানেজ করাটা সহজ করে দেয়।

---

## ৫. Traditional Web Development কীভাবে কাজ করে

একে বলে **Server-Side Rendering (SSR)** বা **Multi-Page Application (MPA)** approach। এর flow টা এমন:

1. User browser-এ URL টাইপ করে বা লিংকে ক্লিক করে
2. Browser একটা **full HTTP request** পাঠায় server-এ
3. Server database থেকে data নেয়, একটা **সম্পূর্ণ নতুন HTML page** বানায় (server-এ HTML generate হয়)
4. Server সেই পুরো HTML page browser-এ পাঠায়
5. Browser পুরো page **reload** করে — DOM থেকে শুরু করে CSS, JS সব নতুন করে লোড হয়

> **উদাহরণ:** পুরনো দিনের PHP/JSP website — form submit করলে বা পরের page-এ গেলে, পুরো browser window সাদা হয়ে গিয়ে আবার নতুন page লোড হতো।

### Traditional Web Development-এর সমস্যাগুলো (সংক্ষেপে)

- পুরো page reload — অপচয়
- বেশি bandwidth ও server load
- খারাপ User Experience (flicker, scroll/state হারানো)
- Real-time feature অসম্ভব
- Video/animation/UI state reload হলে reset হয়ে যাওয়া

_(বিস্তারিত উপরে ১নং সেকশনে দেওয়া আছে)_

---

## ৬. Modern Web Development কীভাবে আলাদা

Modern approach-কে বলে **Client-Side Rendering (CSR)** বা **Single Page Application (SPA)**। এখানে:

1. Browser প্রথমবার একটা basic HTML shell + JS bundle লোড করে
2. এরপর থেকে data লাগলে **AJAX/fetch** দিয়ে শুধু data (JSON) আনা হয়, পুরো page না
3. React/Vue/Angular-এর মতো library দিয়ে JS নিজেই DOM update করে — শুধু যেটুকু change দরকার সেটুকুই
4. পুরো page reload হয় না — user-এর কাছে মনে হয় সে একটা "app" ব্যবহার করছে, শুধু "document" না

### Traditional vs Modern — Comparison Table

| বিষয়                  | Traditional (SSR/MPA)               | Modern (CSR/SPA)                                                               |
| ---------------------- | ----------------------------------- | ------------------------------------------------------------------------------ |
| Page load              | প্রতি action-এ পুরো page reload     | শুধু data update, reload নেই                                                   |
| Rendering              | Server-এ HTML তৈরি হয়              | Browser-এ JS দিয়ে HTML তৈরি হয়                                               |
| Speed (initial)        | তুলনামূলক দ্রুত (HTML রেডি আসে)     | একটু ধীর (JS load+run করতে হয়)                                                |
| Speed (navigation)     | ধীর (প্রতিবার নতুন request)         | দ্রুত (শুধু data fetch হয়)                                                    |
| SEO                    | ভালো (HTML আগে থেকেই রেডি)          | চ্যালেঞ্জিং (JS চালিয়ে content আসে, তবে Next.js-এর মতো tool দিয়ে সমাধান হয়) |
| Real-time feature      | কঠিন                                | সহজ (AJAX/WebSocket দিয়ে)                                                     |
| Development complexity | সহজ, কম tooling লাগে                | জটিল, build tools/framework লাগে                                               |
| উদাহরণ                 | পুরনো PHP site, WordPress (default) | Gmail, Facebook, Twitter, React apps                                           |

### মূল কথা (মনে রাখার মতো লাইন)

> Traditional web development-এ **"server generates the page, browser just displays it"** — প্রতিবার নতুন request, নতুন page।
>
> Modern web development-এ **"server sends data, browser (JS) builds the page"** — একবার শুধু shell লোড হয়, তারপর AJAX দিয়ে data আসে, JS/React দিয়ে UI update হয়।

---

## ৭. Interview Preparation: গুরুত্বপূর্ণ প্রশ্ন ও উত্তর

### প্রশ্ন ১: AJAX কী, এবং এটা কী সমস্যা সমাধান করে?

**উত্তর:** AJAX (Asynchronous JavaScript and XML) হলো এমন একটা technique যেটা দিয়ে JavaScript background-এ (asynchronously) server-এ request পাঠাতে পারে এবং response হিসেবে শুধু দরকারি data (JSON/XML) নিয়ে আসতে পারে — পুরো page reload ছাড়াই। Traditional web development-এ যেকোনো ছোট action করলেও পুরো page reload হতো, যেটা bandwidth নষ্ট করত, UX খারাপ করত, আর real-time feature অসম্ভব করে তুলত। AJAX শুধু প্রয়োজনীয় অংশটুকু update করে এই সমস্যা সমাধান করল।

### প্রশ্ন ২: AJAX থাকা সত্ত্বেও কেন React develop করতে হলো?

**উত্তর:** AJAX শুধু "data আনার" সমস্যা সমাধান করেছিল, কিন্তু সেই data দিয়ে UI manually update করার সমস্যা রয়েই গিয়েছিল। jQuery era-তে প্রতিটা DOM change manually করতে হতো, আর data (state) আর UI আলাদাভাবে sync রাখতে হতো — যেটা বড় app-এ "spaghetti code"-এ পরিণত হতো। React এই সমস্যা সমাধান করল Virtual DOM আর component-based, declarative architecture দিয়ে।

### প্রশ্ন ৩: Virtual DOM কী, এবং এটা কীভাবে কাজ করে?

**উত্তর:** Virtual DOM হলো real DOM-এর একটা lightweight, in-memory copy (JavaScript object আকারে)। যখন state change হয়, React আগে নতুন Virtual DOM তৈরি করে, তারপর সেটাকে আগের Virtual DOM-এর সাথে compare করে (diffing), আর শুধু যেটুকু পরিবর্তন হয়েছে সেটুকুই real DOM-এ update করে (reconciliation)। এতে পুরো DOM বারবার touch করা লাগে না, performance ভালো থাকে।

### প্রশ্ন ৪: AJAX আর React কি একই কাজ করে, না কি আলাদা?

**উত্তর:** সম্পূর্ণ আলাদা layer-এর জিনিস। AJAX হলো data fetching technique — server থেকে data আনার উপায়। React হলো UI-building library — সেই data দিয়ে UI কীভাবে render/update হবে সেটা manage করে। React নিজে data fetch করে না, বরং React app-এর ভিতরেও AJAX/fetch() ব্যবহার হয় (সাধারণত useEffect hook-এর ভিতরে) — মানে দুটো একসাথে কাজ করে, একটা আরেকটার replacement না।

### প্রশ্ন ৫: Client-side rendering (CSR) করতে কি AJAX বাধ্যতামূলক?

**উত্তর:** না। CSR মানে হলো browser-এ JavaScript দিয়ে DOM তৈরি/update করে content দেখানো। Data যদি আগে থেকেই JS ফাইলে embedded থাকে, বা local array/localStorage-এ থাকে, তাহলে কোনো AJAX call ছাড়াই vanilla JS দিয়ে dynamic UI বানানো যায়। AJAX শুধু তখনই লাগে যখন fresh data server থেকে আনতে হয়, page reload ছাড়াই।

---

## ৮. আরও যেসব প্রশ্ন আসতে পারে (Extra Prep)

**Basic Conceptual:**

- Client-side rendering vs Server-side rendering — পার্থক্য কী?
- Synchronous vs Asynchronous request-এর মধ্যে পার্থক্য কী?

**AJAX Deep-dive:**

- AJAX-এর পিছনে কোন browser object কাজ করে? (`XMLHttpRequest`)
- `XMLHttpRequest` আর `fetch()`-এর মধ্যে পার্থক্য কী?
- CORS কী, AJAX call-এ CORS error কেন হয়?
- Callback hell কী?

**React Core:**

- Declarative vs Imperative programming — React কোনটা follow করে?
- One-way data flow / unidirectional data flow কী?
- `useEffect` দিয়ে কীভাবে API call করা হয়?

**Trick Questions:**

- SPA (Single Page Application) কী, এটার সাথে AJAX-এর সম্পর্ক কী?
- Virtual DOM কি সবসময় real DOM-এর চেয়ে ভালো পারফর্ম করে? (উত্তর: না, ছোট app-এ vanilla JS দ্রুত হতে পারে)
