# 🎬 Movies Frontend App

Frontend movie application built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**.

Deployed on **Netlify**, consuming an API hosted on **Render**.

---

## 🚀 Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Netlify](https://www.netlify.com/) (frontend hosting)
- [Render](https://render.com/) (backend hosting)
- [CypressL](https://www.cypress.io)(Test)

---

## 📂 Project Structure

```
movies-frontend/
├── components/             # Reusable UI components
│   ├── Header.tsx          # Header section
│   ├── HeroBanner.tsx      # Banner section
│   └── LoadingScreen.tsx   # Loading screen
│   └── MovieCarousel.tsx   # Carousel section
│   └── MovieModal.tsx      # Modal
├── pages/                  # App pages
│   ├── movies/[id].tsx     # Movie detail page
│   ├── _app.tsx            # App page
│   ├── index.tsx           # Home page
│   └── search.tsx          # Search and genre filter page
├── styles/                 # CSS global styles
├── lib/                    # API and types
│   ├── api.ts              # API calls
│   └── types.ts            # Type definitions
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the project

```bash
git clone https://github.com/MatheusOliveiraMendes/movies-frontend.git
cd movies-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## 🌐 Deployment

- **Frontend**: [Netlify](https://www.netlify.com/)
- **Backend API**: [Render](https://render.com/)
- **Database**: [Neon PostgreSQL](https://neon.tech/)
- **Cypress**: [CypressL](https://www.cypress.io)


---

## 🔗 API Integration

Render API: backend

TMDb API: Banner background

---

## ✅ Features

- Banner for featured movie
- Movie carousel
- Movie detail page with TMDb backdrop integration
- Search and genre filtering
- Modal when no search results found
- Loading screen for initial fetch

---

## 🧾 License

MIT © [Matheus Mendes]


# Link Site: https://moviesfront.netlify.app
