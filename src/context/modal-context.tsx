import {
  FC,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { PaperProps } from '@mui/material/Paper'

import PopupDialog from '~/components/popup-dialog/PopupDialog'

interface Component {
  component: ReactElement
  paperProps?: PaperProps
}

interface ModalProvideContext {
  openModal: (component: Component, delayToClose?: number) => void
  closeModal: () => void
}

interface ModalProviderProps {
  children: ReactElement
}

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ReactElement | null>(null)
  const [paperProps, setPaperProps] = useState<PaperProps>({})
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
    setTimer(null)
  }, [])

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    ({ component, paperProps }: Component, delayToClose?: number) => {
      setModal(component)

      if (paperProps) {
        setPaperProps(paperProps)
      } else {
        setPaperProps({})
      }

      if (delayToClose) {
        closeModalAfterDelay(delayToClose)
      }
    },
    [closeModalAfterDelay]
  )

  const contextValue = useMemo(
    () => ({ openModal, closeModal }),
    [openModal, closeModal]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <PopupDialog
          closeModal={closeModal}
          closeModalAfterDelay={closeModalAfterDelay}
          content={modal}
          paperProps={paperProps}
          timerId={timer}
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
