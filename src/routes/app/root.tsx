import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { AppHeader } from '@components/app-header'

export const AppRoot: FC = () => {
  return (
    <div>
      <AppShell header={{ height: 56 }}>
        <AppShell.Header>
          <AppHeader />
        </AppShell.Header>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </div>
  )
}

export default AppRoot
