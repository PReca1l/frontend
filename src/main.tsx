import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import './index.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'

import router from './router.tsx'
import { AuthProvider } from './contexts/auth-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={{
      fontFamily: 'Montserrat, system-ui, Avenir, Helvetica, Arial, sans-serif'
    }}>
      <Notifications />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
)
