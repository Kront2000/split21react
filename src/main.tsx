import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/src/assets/css/normalizer.css'
import '@/src/assets/css/index.css'
import Home from '@/src/pages/Home/Home'
import HomeLayout from '@/src/pages/HomeLayout/HomeLayout'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Rules from './pages/Rules/Rules'
import AiGame from './pages/Game/AIGame'
import PVPGame from './pages/Game/PVPGame'
import Register from './pages/Register/Register'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Toast from '@/src/components/shared/Toast/Toast'
import Loggin from './pages/Login/Login'


const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/leader-board",
        element: <Leaderboard />
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rules",
        element: <Rules />
      },
      {
        path: "/login",
        element: <Loggin />
      }
    ]
  },
  {
    path: "/game/ai",
    element: <AiGame />
  },
  {
    path: "/game/pvp",
    element: <PVPGame />
  }


]);

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Toast />
      <RouterProvider router={router} />,
    </StrictMode>,
  )
}

