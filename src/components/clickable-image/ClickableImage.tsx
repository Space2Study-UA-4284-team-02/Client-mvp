import { FC, ReactNode } from 'react'
import Box, { BoxProps } from '@mui/material/Box'

import AppButton from '../app-button/AppButton'

import { ButtonVariantEnum, ComponentEnum } from '../../types/common/enums/common.enums'
import { styles } from './ClickableImage.styles'

type ClickableImageMedia = {
  name: string
  path: string
}

interface ClickableImageProps extends Omit<BoxProps, 'onClick'> {
  onClick?: (image: ClickableImageMedia) => void
  image: ClickableImageMedia
  children?: ReactNode
}

const ClickableImage: FC<ClickableImageProps> = ({
  onClick,
  image,
  children,
  ...props
}) => {
  return (
    <AppButton
      onClick={() => onClick?.(image)}
      sx={styles.imageButton}
      variant={ButtonVariantEnum.Text}
    >
      <Box
        alt={image.name}
        component={ComponentEnum.Img}
        src={image.path}
        sx={styles.image}
        {...props}
      />
      {children}
    </AppButton>
  )
}

export default ClickableImage
