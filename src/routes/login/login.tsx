import { FC, useContext } from 'react'
import { Button, Container, Paper, TextInput, Title } from '@mantine/core'

import styles from './login.module.pcss'
import { useForm } from '@mantine/form'
import authContext from '../../contexts/auth-context.tsx'
import { useNavigate } from 'react-router-dom'

export const Login: FC = () => {
  const { setUsername } = useContext(authContext)
  const navigate = useNavigate()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: ''
    },

    validate: {
      username: (value) =>
        value.length > 3 && value.length < 16 && /^[a-zA-Z]\w*$/.test(value)
          ? null
          : 'Invalid username'
    }
  })

  const onSubmit = (values: { username: string }) => {
    localStorage.setItem('username', values.username)
    setUsername(values.username)
    navigate('/chat')
  }

  return (
    <Container size={420} my={90}>
      <Title ta="center" className={styles.title}>
        Добро пожаловать!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={16} radius="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Имя пользователя"
            placeholder="myusername228"
            required
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <Button fullWidth mt="xl" type={'submit'}>
            Авторизоваться
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
