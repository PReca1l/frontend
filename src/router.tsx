import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route
} from 'react-router-dom'
import { AppRoot, Chat, Licenses, Login, LoginRoot } from './routes'
import { RequireAuth } from '@components/require-auth/require-auth.tsx'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        loader={async ({ request }) => {
          if (request.url.split('/').at(-1) === '') {
            return redirect('/chat')
          }
          return 0
        }}
        element={<AppRoot />}
      >
        <Route
          path={'chat'}
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />
        <Route
          path={'licenses'}
          element={
            <RequireAuth>
              <Licenses />
            </RequireAuth>
          }
        />
      </Route>
      <Route element={<LoginRoot />}>
        <Route path={'/login'} element={<Login />} />
      </Route>
    </Route>
  )
)

export default router
