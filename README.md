# Split21React (Project under development)

A lightweight React + TypeScript client for the Split21 (21-point) card game with an AI opponent. It provides the UI, routing, and client-side state for playing the game and viewing leaderboards; it is intended to run together with a separate [server](https://github.com/Kront2000/split21nodeServer) that handles game logic. 

## stack
- Language(s): TypeScript (primary), CSS, HTML, small JavaScript
- Framework / runtime: React (v19) + Vite
- Notable libraries: react-router (routing), zustand (toast store), groq-sdk (CMS/GROQ integration), @vitejs/plugin-react

## How it's organized
```
.env                      # environment variables (VITE_SERVER_URL)
index.html                # app HTML template
package.json              # npm scripts and dependencies
vite.config.js            # Vite config
tsconfig.json             # TypeScript config
public/                   # static assets
src/
  assets/
    css/
      normalizer.css
      index.css
    (images etc.)
  main.tsx                # app entry: Router, Toast and root render
  vite-env.d.ts           # Vite environment types
  components/
    form/                 # login/register form components
    game/                 # game UI: cards, hand, table, controls
    icons/                # SVG/icon components
    leaderBoard/          # leaderboard UI components
    shared/               # shared components (Toast, buttons, etc.)
  pages/
    Home/                 # home page
    HomeLayout/           # layout wrapper used by main routes
    Game/                 # game page (separate route)
    Leaderboard/          # leaderboard page
    Login/ Register/ Rules/# auth and info pages
  stores/
    toast.ts              # zustand store for toast notifications
  utils/                  # helper functions and network utilities
README.md
```

## Launch

1. Install and start the server. Instructions on how to start the server can be found in the repository: [server](https://github.com/Kront2000/split21nodeServer).
2. Clone the repository
```
git clone https://github.com/Kront2000/split21react
cd split21react
```
3. install dependencies
 ```
 npm install
 ```
4. Set environment variables
```
VITE_SERVER_URL=http://localhost:8080
```
VITE_SERVER_URL - The address where you launched the server

4. Run
```
npm run dev
```


