import {
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import {
  ActionIcon,
  Box,
  Container,
  FileButton,
  Paper,
  ScrollArea,
  Image,
  TextInput,
  rem
} from '@mantine/core'
import styles from './chat.module.pcss'
import { IconCheck, IconSend2, IconUpload, IconX } from '@tabler/icons-react'
import useWebSocket from 'react-use-websocket'
import AuthContext from '../../../contexts/auth-context.tsx'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { notifications } from '@mantine/notifications'

type MessageType = {
  id: string
  message: string
  user_id: string
  attachment_url?: string
  timestamp?: string
}

const compose_message = (
  id: string,
  message: string,
  user_id: string,
  attachment?: File
): MessageType => {
  return {
    id,
    message,
    user_id,
    attachment_url: URL.createObjectURL(attachment!)
  }
}

export const Chat: FC = () => {
  const viewport = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [file, setFile] = useState<File | null>(null)
  const { username } = useContext(AuthContext)
  const { sendJsonMessage, lastJsonMessage, readyState, getWebSocket } =
    useWebSocket('ws://37.140.241.11:8000/ws/' + username, {
      shouldReconnect: (_) => true,
      reconnectAttempts: 10
    })
  const [text, setText] = useState<string>('')

  useEffect(() => {
    if (readyState === 0) {
      notifications.show({
        id: 'connecting',
        color: 'teal',
        title: 'Пытаемся подключиться к серверу',
        message: 'Скоро всё должно получиться!',
        loading: true,
        withCloseButton: false,
        autoClose: false
      })
    } else if (readyState === 1) {
      notifications.update({
        id: 'connecting',
        color: 'teal',
        title: 'Подключено!',
        message: 'Теперь можно пользоваться приложением',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 2000
      })
      notifications.update({
        id: 'reconnecting',
        color: 'teal',
        title: 'Подключение восстановлено!',
        message: 'Можете продолжать пользоваться приложением',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 2000
      })
    } else if (readyState === 3) {
      notifications.show({
        id: 'reconnecting',
        color: 'teal',
        title: 'Пытаемся переподключиться к серверу',
        message: 'Скоро всё должно получиться!',
        loading: true,
        withCloseButton: false,
        autoClose: false
      })
    }
  }, [readyState])

  useEffect(() => {
    console.log(messages)
  }, [messages])

  useEffect(() => {
    return getWebSocket()?.close()
  }, [])

  useEffect(() => {
    axios
      .get('http://37.140.241.11:8000/history/' + username)
      .then((r) => console.log(r))
  }, [])

  useEffect(() => {
    console.log(lastJsonMessage)
    if (lastJsonMessage) {
      let parsed_data = lastJsonMessage
      console.log(parsed_data)
      setMessages((prev) => [
        ...prev,
        {
          // @ts-ignore
          id: parsed_data.id,
          // @ts-ignore
          message: parsed_data.text,
          // @ts-ignore
          user_id: parsed_data.username,
          // @ts-ignore
          attachment_url: parsed_data.previewImage
        }
      ])

      viewport.current!.scrollTo({
        top: viewport.current!.scrollHeight,
        behavior: 'smooth'
      })
      notifications.update({
        id: 'loading_data',
        color: 'teal',
        title: 'Data was loaded',
        message:
          'Notification will close in 2 seconds, you can close this notification now',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 2000
      })
    }
  }, [lastJsonMessage])

  useEffect(() => {
    console.log(file)
  }, [file])

  useLayoutEffect(() => {
    console.log(viewport.current!.scrollHeight)
    viewport.current!.scrollTo({
      top: viewport.current!.scrollHeight,
      behavior: 'smooth'
    })
  }, [])

  return (
    <Container
      mih={'calc(100vh - calc(var(--app-shell-header-offset) + 32px))'}
      my={16}
    >
      <Paper withBorder shadow="md" className={styles.wrapper}>
        <ScrollArea
          viewportRef={viewport}
          className={styles.chatbox}
          styles={{
            viewport: { marginTop: 'auto', paddingBottom: file ? 100 : 0 }
          }}
          scrollbars="y"
        >
          {messages.map((message, index) => (
            <Message message={message} key={index} />
          ))}
        </ScrollArea>
        <Box className={styles.writebar}>
          {file && (
            <Box className={styles['attachment-panel']}>
              <Image
                radius="md"
                h={80}
                w="auto"
                fit="contain"
                src={URL.createObjectURL(file)}
              />
            </Box>
          )}
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) => (
              <ActionIcon size={32} variant={'light'} {...props}>
                <IconUpload size={16} />
              </ActionIcon>
            )}
          </FileButton>
          <TextInput
            flex={1}
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <ActionIcon
            disabled={file == null || text === ''}
            size={32}
            variant={'light'}
            onClick={() => {
              notifications.show({
                id: 'loading_data',
                loading: true,
                title: 'Выполняется обработка изображения',
                message: 'Пожалуйста, подождите',
                autoClose: false,
                withCloseButton: false
              })

              const message_uuid = uuidv4()
              const msg = {
                id: message_uuid,
                text,
                username
              }

              const formData = new FormData()
              formData.append('file', file!)
              formData.append('id', message_uuid)
              formData.append('username', username!)

              axios
                .post('http://37.140.241.11:8000/upload', formData)
                .then((r) => {
                  console.log(msg, r)
                  sendJsonMessage(msg)
                })
                .catch(() =>
                  notifications.update({
                    id: 'loading_data',
                    color: 'red',
                    title: 'Ошибка!',
                    message:
                      'Произошла ошибка при попытке обработки данных. Попробуйте позднее',
                    icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
                    loading: false,
                    autoClose: 2000
                  })
                )
              setMessages((prev) => [
                ...prev,
                compose_message(message_uuid, text, username!, file!)
              ])
              viewport.current!.scrollTo({
                top: viewport.current!.scrollHeight,
                behavior: 'smooth'
              })
              setText('')
              setFile(null)
            }}
          >
            <IconSend2 size={16} />
          </ActionIcon>
        </Box>
      </Paper>
    </Container>
  )
}

export default Chat

const Message: FC<{
  message: MessageType
}> = ({ message }) => {
  return (
    <div
      className={`${styles['message-container']} ${message.user_id === 'server' ? styles['message-container_in'] : styles['message-container_out']}`}
    >
      <div className={styles['message-wrapper']}>
        <Paper radius={'md'} className={styles.message}>
          {message.attachment_url && (
            <div className={styles['message--attachment']}>
              <Image
                src={message.attachment_url}
                alt={'Response Image'}
                radius="md"
                w={400}
                h="auto"
                fit="contain"
              />
            </div>
          )}
          <div className={styles['message--text']}>{message.message}</div>
        </Paper>
      </div>
    </div>
  )
}
