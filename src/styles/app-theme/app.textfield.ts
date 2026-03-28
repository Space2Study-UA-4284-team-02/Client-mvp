import palette from './app.pallete'
import { textfieldScrollbar } from '~/styles/app-theme/custom-scrollbar'

export const textField = {
  styleOverrides: {
    root: {
      ...textfieldScrollbar,
      '& .MuiInputLabel-root': {
        color: palette.primary[500],
        lineHeight: 1.2,
        fontSize: '13px',
        transform: 'translate(12px, 8px) scale(1)',
        '&.Mui-focused': {
          color: palette.primary[900]
        },
        '&.Mui-error': {
          color: palette.error[500]
        }
      },
      '& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled':
        {
          transform: 'translate(12px, -6px) scale(0.85)'
        },
      '& .MuiOutlinedInput-root': {
        borderRadius: '3px',
        backgroundColor: palette.basic.white,
        '& .MuiOutlinedInput-input': {
          padding: '8px 12px',
          fontSize: '13px',
          lineHeight: '18px'
        },
        '& .MuiOutlinedInput-input.MuiInputBase-inputMultiline': {
          padding: 0
        },
        '& fieldset': {
          borderColor: palette.primary[500],
          borderWidth: '1px'
        },
        '&:hover fieldset': {
          borderColor: palette.primary[900]
        },
        '&.Mui-focused fieldset': {
          borderColor: palette.primary[900],
          borderWidth: '1px'
        },
        '&.Mui-error fieldset': {
          borderColor: palette.error[500]
        },
        '&.Mui-focused.Mui-error fieldset': {
          borderColor: palette.error[500]
        }
      },
      '& .MuiAutocomplete-inputRoot.MuiOutlinedInput-root': {
        padding: '5px'
      },
      '& .MuiInput-root:before': {
        borderColor: palette.primary[500]
      }
    }
  }
}
