// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import "./main.scss"
import router from './routes.tsx'
// import App from './App.tsx'

import { UserProvider } from './context/userContext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  // </StrictMode>,
)
