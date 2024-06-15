import { FC, useContext, useEffect } from 'react'
import AuthContext from '../../contexts/auth-context.tsx'
import { Navigate } from 'react-router-dom'

export const RequireAuth: FC<{ children: JSX.Element }> = ({ children }) => {
  const { username } = useContext(AuthContext)

  useEffect(() => {
    console.log(localStorage.getItem('username'))
  }, [])

  if (!username) {
    return <Navigate to="/login" replace />
  }

  return children
}
