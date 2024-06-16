import { FC, useContext } from 'react'
// @ts-ignore
import RosatomLogo from '@assets/rosatom_logo.svg'
import {
  ActionIcon,
  Button,
  Title,
  useComputedColorScheme,
  useMantineColorScheme
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import authContext from '../../contexts/auth-context.tsx'
import { IconMoon, IconSun } from '@tabler/icons-react'
import cx from 'clsx'
import styles from './app-header.module.pcss'

export const AppHeader: FC = () => {
  const navigate = useNavigate()
  const { logout } = useContext(authContext)
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true })
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true
  })

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <img src={RosatomLogo} width={42} height={42} />
        <div>
          <Title order={4} ta={'center'}>
            Чат
          </Title>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
            }
            variant="default"
            size="md"
            aria-label="Toggle color scheme"
          >
            <IconSun className={cx(styles.icon, styles.light)} stroke={1.5} />
            <IconMoon className={cx(styles.icon, styles.dark)} stroke={1.5} />
          </ActionIcon>
          <Button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            variant="transparent"
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
