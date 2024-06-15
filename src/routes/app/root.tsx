import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const AppRoot: FC = () => {
  return (
    <div>
      AppRoot
      <Outlet />
    </div>
  )
}

export default AppRoot
