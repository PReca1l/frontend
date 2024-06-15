import { createContext, FC, ReactNode, useState } from 'react'

export const AuthContext = createContext<{
  username: string | null
  setUsername: (username: string) => void
  logout: () => void
}>({
  username: null,
  setUsername: () => 0,
  logout: () => 0
})

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username')
  )

  const logout = () => {
    setUsername(null)
    localStorage.removeItem('username')
  }

  return (
    <AuthContext.Provider value={{ username, setUsername, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
