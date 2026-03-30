export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '72px',
    maxWidth: '1120px',
    margin: '0 auto',
    paddingTop: '32px'
  },

  leftBox: {
    width: '48%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    width: '100%',
    maxWidth: '420px',
    height: 'auto',
    objectFit: 'contain'
  },

  rightBox: {
    width: '52%',
    maxWidth: '540px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '560px'
  },

  topBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '22px'
  },

  description: {
    maxWidth: '460px',
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 400,
    color: '#000000',
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '0'
  },

  select: {
    '& .MuiOutlinedInput-root': {
      height: '54px',
      backgroundColor: '#f8fafb',
      borderRadius: '4px',

      '& fieldset': {
        borderColor: '#bcc9d3'
      },

      '&:hover fieldset': {
        borderColor: '#aebdc8'
      },

      '&.Mui-focused fieldset': {
        borderColor: '#9fb2bf'
      }
    },

    '& .MuiInputLabel-root': {
      fontSize: '14px',
      color: '#8a9ba8'
    },

    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center'
    }
  },

  autocomplete: {
    '& .MuiAutocomplete-popupIndicator': {
      color: '#7f909c'
    },

    '& .MuiAutocomplete-clearIndicator': {
      display: 'none'
    }
  },

  optionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minHeight: '52px'
  },

  optionTitle: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#263238',
    fontFamily: 'Inter, sans-serif'
  },

  optionCategory: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#7b93a3',
    fontFamily: 'Inter, sans-serif'
  },

  addButton: {
    height: '44px',
    backgroundColor: '#e7ecef',
    color: '#2f3b45',
    fontWeight: 600,
    fontSize: '14px',
    textTransform: 'none',
    borderRadius: '4px',
    boxShadow: 'none',

    '&:hover': {
      backgroundColor: '#dfe6ea',
      boxShadow: 'none'
    },

    '&.Mui-disabled': {
      backgroundColor: '#edf1f4',
      color: '#9aa9b5'
    }
  },

  chipsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    minHeight: '40px',
    marginTop: '4px'
  },

  chip: {
    height: '36px',
    backgroundColor: '#E9EEF1',
    borderRadius: '10px',
    color: '#586065',
    fontSize: '12px',
    fontWeight: 550,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',

    '& .MuiChip-label': {
      paddingLeft: '10px',
      paddingRight: '15px',
      lineHeight: '28px'
    },

    '& .MuiChip-deleteIcon': {
      margin: '0 8px 0 0',
      color: '#5b5b5b',
      fontSize: '17px',

      '&:hover': {
        color: '#5F7381'
      }
    }
  },

  moreChip: {
    height: '36px',
    backgroundColor: '#E9EEF1',
    borderRadius: '10px',
    color: '#586065',
    fontSize: '12px',
    fontWeight: 550,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',

    '& .MuiChip-label': {
      paddingLeft: '12px',
      paddingRight: '12px',
      lineHeight: '28px'
    }
  },

  buttonsBox: {
    marginTop: 'auto',
    paddingTop: '72px',

    '& > div': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '24px'
    },

    '& .MuiButton-root': {
      minWidth: '110px',
      height: '50px',
      padding: '0 22px',
      borderRadius: '4px',
      fontSize: '13px',
      fontWeight: 450,
      textTransform: 'none',
      boxShadow: 'none'
    },

    '& .MuiButton-outlined': {
      border: '1px solid #aebdc8',
      color: '#7f95a3',
      backgroundColor: '#ffffff',

      '&:hover': {
        border: '1px solid #9fb2bf',
        backgroundColor: '#ffffff',
        boxShadow: 'none'
      }
    },

    '& .MuiButton-contained': {
      backgroundColor: '#26343d',
      color: '#ffffff',

      '&:hover': {
        backgroundColor: '#1f2b33',
        boxShadow: 'none'
      }
    }
  }
}
