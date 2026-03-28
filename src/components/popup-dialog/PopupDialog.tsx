import { FC } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { PaperProps } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: PaperProps
  timerId: NodeJS.Timeout | null
  closeModalAfterDelay: (delay?: number) => void
  closeModal: () => void
}

const PopupDialog: FC<PopupDialogProps> = ({
  closeModal,
  closeModalAfterDelay,
  content,
  paperProps,
  timerId
}) => {
  const { isMobile } = useBreakpoints()

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()

  return (
    <Dialog
      PaperProps={{
        ...paperProps,
        sx: {
          backgroundColor: '#fff',
          width: '100%',
          maxWidth: '100%',
          height: '100%',
          minHeight: '100%',
          borderRadius: 0,
          overflowX: 'hidden',
          ...(paperProps?.sx || {})
        }
      }}
      fullScreen={isMobile}
      maxWidth={false}
      open
      sx={{
        '& .MuiDialog-container': {
          height: '100%',
          margin: 0,
          padding: 0
        },
        '& .MuiPaper-root': {
          margin: 0
        }
      }}
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        <IconButton onClick={closeModal} size='small' sx={styles.icon}>
          <CloseIcon fontSize='small' />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
      </Box>
    </Dialog>
  )
}

export default PopupDialog
