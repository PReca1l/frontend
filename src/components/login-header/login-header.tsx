import { FC } from 'react'
import RosatomLogo from '@assets/rosatom_logo.svg'
import styles from './login-header.module.pcss'
import { Title } from '@mantine/core'

export const LoginHeader: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <img src={RosatomLogo} width={42} height={42} />
        <div>
          <Title order={4} ta={'center'}>
            Вход
          </Title>
        </div>
        <div />
      </div>
    </div>
  )
}

export default LoginHeader
