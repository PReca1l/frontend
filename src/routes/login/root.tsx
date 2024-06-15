import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { AppShell } from '@mantine/core'

export const LoginRoot: FC = () => {
  return (
    <AppShell>
      <AppShell.Header />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default LoginRoot
