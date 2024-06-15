import { FC, useContext } from 'react'
// @ts-ignore
import RosatomLogo from '@assets/rosatom_logo.svg?react'
import styles from '@components/login-header/login-header.module.pcss'
import { Button, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import authContext from '../../contexts/auth-context.tsx'

export const AppHeader: FC = () => {
  const navigate = useNavigate()
  const { logout } = useContext(authContext)

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <RosatomLogo width={42} height={42} />
        <div>
          <Title order={4} ta={'center'}>
            Чат
          </Title>
        </div>
        <div>
          <Button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            variant="white"
            color="red"
          >
            Выйти
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
