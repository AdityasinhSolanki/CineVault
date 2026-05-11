# CineVault 🎬

CineVault is a responsive movie discovery web app built with React and TMDB API.

Users can search movies, browse trending titles, view movie details, and manage a personal watchlist with persistent local storage.

---

## Features

- Movie search with debounce
- Trending movies feed
- Infinite scrolling
- Movie details page
- Add / remove watchlist
- Persistent watchlist using LocalStorage
- Responsive dark UI
- Skeleton loading cards
- Mobile navigation menu

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- TMDB API

---

## Setup

```bash
git clone <your-repo-url>
cd movie
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root folder:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

---

## Folder Structure

```bash
src/
 ├── components/
 ├── hooks/
 ├── pages/
 ├── redux/
 ├── services/
 └── main.jsx
```

---

## Trade-offs / Assumptions

- Watchlist persistence uses LocalStorage instead of backend authentication.
- Infinite scrolling was implemented for smoother browsing experience.
- TMDB free API is used for movie data and images.

---

## Future Improvements

- Genre filtering
- Framer Motion page transitions
- User authentication
- Personal movie ratings
- Unit testing

---

## API

Powered by TMDB:

https://www.themoviedb.org/
