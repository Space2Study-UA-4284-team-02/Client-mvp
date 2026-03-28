import palette from './app.pallete'

declare module '@mui/material/styles' {
  interface ButtonVariants {
    tonal: React.CSSProperties
    containedLight: React.CSSProperties
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    extraLarge: true
  }
  interface ButtonPropsVariantOverrides {
    tonal: true
    containedLight: true
  }
}

const button = {
  styleOverrides: {
    root: {
      lineHeight: '16px',
      fontSize: '12px',
      opacity: '1',
      borderRadius: '3px',
      textTransform: 'none',
      boxShadow: 'none',
      minHeight: '36px'
    },
    sizeSmall: {
      fontSize: '12px',
      padding: '6px 16px'
    },
    sizeMedium: {
      padding: '8px 20px'
    },
    sizeLarge: {
      padding: '6px 18px',
      fontSize: '13px'
    },
    sizeExtraLarge: {
      padding: '10px 24px',
      fontSize: '14px'
    },
    contained: {
      backgroundColor: palette.primary[900],
      color: palette.primary[50],
      '&:hover': {
        backgroundColor: palette.primary[900],
        boxShadow: 'none'
      },
      '&.Mui-disabled': {
        backgroundColor: palette.primary[900],
        color: palette.primary[50],
        opacity: 1
      }
    },
    containedLight: {
      backgroundColor: palette.primary[500],
      color: palette.basic.white,
      '&:hover': {
        backgroundColor: palette.primary[400]
      }
    },
    outlined: {
      color: palette.primary[900]
    },
    text: {
      color: palette.primary[900]
    },
    tonal: {
      backgroundColor: palette.primary[50]
    }
  }
}

export default button
