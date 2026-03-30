import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { SnackBarProvider } from '~/context/snackbar-context'
// import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

import { theme } from './styles/app-theme/custom-mui.styles'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <Outlet />
            {/* <UserStepsWrapper userRole='tutor' /> */}
          </ModalProvider>
        </ConfirmationDialogProvider>
      </SnackBarProvider>
    </ThemeProvider>
  )
}

export default App
