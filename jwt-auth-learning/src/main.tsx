import { createRoot } from 'react-dom/client'
import './css/index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/route.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
