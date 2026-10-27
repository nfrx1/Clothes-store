```markdown
# NFRX — Modern E-Commerce Store

<div align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="DaisyUI" />
  <img src="https://img.shields.io/badge/Zustand-State_Management-orange?style=for-the-badge" alt="Zustand" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

<br />

**NFRX** is a modern, minimalist e-commerce web application built with **React**, **Tailwind CSS**, and **DaisyUI**. Designed with an editorial aesthetic, it features a scalable feature-based architecture, responsive mobile-first layouts, real-time filtering, and centralized state management using **Zustand**.

---

## ✨ Features

- **Editorial & Minimalist UI:** Clean typography, glassmorphic sticky navigation, and an interactive promotional announcement bar.
- **Responsive Product Grid:** Mobile-optimized 2-column product layout scaling smoothly up to 4 columns on desktop screens, complete with custom skeleton loaders.
- **Instant Search & Category Filtering:** Zero-layout-shift inline navbar search combined with quick category pills and a responsive dropdown filter powered by Zustand.
- **Authentication Flow:** Native HTML5 `<dialog>` modal system for user login and registration, integrated with Fake Store API and persisted securely in `sessionStorage`.
- **Feature-Based Architecture:** Modular folder structure separating domain logic (`auth`, `products`) from shared UI components and layouts.

---

## 🛠️ Tech Stack

- **Frontend Framework:** [React](https://react.dev/) (Vite)
- **Styling & UI Components:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (with `sessionStorage` persistence)
- **Icons:** [Lucide React](https://lucide.dev/)
- **API:** [Fake Store API](https://fakestoreapi.com/)

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── NavBar.jsx
│   └── Footer.jsx
├── layouts/
│   └── MainLayout.jsx
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   └── AuthModal.jsx
│   │   └── hooks/
│   │       └── useAuth.js
│   └── products/
│       ├── components/
│       │   ├── ProductCard.jsx
│       │   ├── ProductFilter.jsx
│       │   └── ProductsGrid.jsx
│       └── hooks/
│           ├── useFilter.js
│           └── useProducts.js
├── App.jsx
└── main.jsx

```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** (v18+ recommended) and **npm** installed on your machine.

### Installation

1. **Clone the repository:**
```bash
git clone [https://github.com/nfrx1/Clothes-store.git](https://github.com/nfrx1/Clothes-store.git)
cd Clothes-store

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run the development server:**
```bash
npm run dev

```


4. **Build for production:**
```bash
npm run build

```



---

## 🔐 Demo Credentials (Fake Store API)

To test the **Log In** functionality with an existing account from Fake Store API, you can use:

* **Username:** `mor_2314`
* **Password:** `83r5^_`

---

## 👤 Author

**Dawood Ali (NFRX)**

* GitHub: [@nfrx1](https://github.com/nfrx1)

---

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```

```
