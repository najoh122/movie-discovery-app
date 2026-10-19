# ReelBox – Movie Discovery Web App

A MovieBox-inspired movie and TV show discovery website built with React.

## Features
- Home page with Trending, Popular Movies, Action Movies, Popular TV Shows and Top Rated rows
- Movies and TV Shows pages with genre filter, sorting and pagination
- Search for movies and TV shows by title
- Details page with poster, overview, release date, rating and genres
- My Watchlist saved in the browser using localStorage
- Responsive design with a mobile menu
- Loading, error, empty-result and missing-poster handling

## Technologies
React (Vite), Material UI, React Router, Fetch API, localStorage

## API
Data comes from the TMDB API (https://www.themoviedb.org/).
This product uses the TMDB API but is not endorsed or certified by TMDB.

## How to run locally
1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and put your TMDB API key in it:
   VITE_TMDB_KEY=your_key_here
4. Run `npm run dev`
5. Open http://localhost:5173

## Author
Jenifer David Timon