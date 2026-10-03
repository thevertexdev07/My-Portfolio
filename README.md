# BUILTBYRAHULX — Personal Portfolio

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animated-FF0080?logo=framer)

## 🌐 Live Website
[**View the live portfolio here**](https://builtbyrahulX-portfolio.vercel.app/)

---

## 👨‍💻 About The Project
This is the personal developer portfolio of **Rahul Jangra (BUILTBYRAHULX)**, a 2nd Year BCA student specializing in **Artificial Intelligence & Machine Learning** at St. Agnes College, Mangaluru. 

The website serves as a digital resume and project showcase, highlighting a unique background that blends the computational rigor of neural networks (like GNN-LSTM models) with the leadership and discipline gained from active Cadet Corps training.

It features a sleek, modern, dark-themed design with premium glassmorphism effects, neon emerald/cyan accents, and butter-smooth scrolling animations to create a highly engaging user experience.

## ✨ Key Features
- **Hero Section**: High-impact introduction with animated floating background shapes and a dynamic neon gradient headline.
- **About Me**: A clean narrative blending AI engineering focus with disciplined leadership.
- **Dynamic GitHub Project Sync**: Automatically fetches and showcases any newly uploaded repositories from GitHub in real time with interactive categories, search, live stars/forks, demo links, and glowing tech cards.
- **Skills Showcase**: Categorized technology stacks with smoothly animated, percentage-based progress bars.
- **Interactive Timeline**: A vertical, animated timeline tracking educational milestones from Army Public School, Chennai to St. Agnes College.
- **Functional Contact Form**: A fully working contact form integrated with Formspree, delivering messages directly to email.

## 🛠️ Built With (Tech Stack)
This portfolio was built from scratch focusing on modern web development practices, high performance, and aesthetic excellence.

* **[Next.js (App Router)](https://nextjs.org/)** — React framework for server-side rendering, API route caching, and static optimization.
* **[Tailwind CSS (v4)](https://tailwindcss.com/)** — Utility-first CSS framework for rapid UI styling, customized with a bespoke dark theme and neon glow effects.
* **[GitHub REST API](https://docs.github.com/en/rest)** — Automated live synchronization of personal repositories, topic tags, stars, and deployment URLs.
* **[Framer Motion](https://www.framer.com/motion/)** — Production-ready motion library for React, powering scroll-triggered reveals and interactive filter animations.
* **[Lucide React](https://lucide.dev/)** — Beautiful & consistent iconography.
* **[Formspree](https://formspree.io/)** — Form backend to handle contact submissions without needing a custom server.
* **[Vercel](https://vercel.com/)** — Hosting and continuous deployment.

## 🚀 How Dynamic Projects Work
Whenever you push a new repository to [github.com/builtbyrahulX](https://github.com/builtbyrahulX):
1. The `/api/github-projects` endpoint dynamically pulls your latest public repositories.
2. It enriches the repo with language badges, tech icons, tags, live stars, and formatted timestamps.
3. If you set a **Homepage / Website URL** in your GitHub repo settings (like `https://your-demo.vercel.app`), a **Demo** button appears automatically next to the **Code** button!
4. Built-in 5-minute caching ensures blazing-fast page loads and zero rate limiting.

