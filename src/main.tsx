import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import type { AxiosError } from 'axios'

const router = createRouter({routeTree})

declare module '@tanstack/react-router'{
  interface Register{
    router: typeof router,
    defaultError: AxiosError
  }
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
