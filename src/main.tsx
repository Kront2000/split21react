import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/src/assets/css/normalizer.css'
import '@/src/assets/css/index.css'
import Home from '@/src/pages/Home/Home'
import HomeLayout from '@/src/pages/HomeLayout/HomeLayout'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Rules from './pages/Rules/Rules'
import Game from './pages/Game/Game'


const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rules",
        element: <Rules />
      }
    ]
  },
  {
    path: "/game",
    element: <Game />
  }

]);

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />,
    </StrictMode>,
  )
}

