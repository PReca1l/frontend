import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { LoginHeader } from '@components/login-header'

export const LoginRoot: FC = () => {
  return (
    <AppShell header={{height: 56}}>
      <AppShell.Header>
        <LoginHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default LoginRoot
