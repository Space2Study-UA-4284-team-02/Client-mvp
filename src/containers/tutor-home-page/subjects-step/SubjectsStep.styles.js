export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '20px',

    '@media (min-width: 768px)': {
      paddingTop: '24px',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingBottom: '24px'
    },

    '@media (min-width: 1200px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '72px',
      maxWidth: '1120px',
      margin: '0 auto',
      paddingTop: '32px',
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0
    }
  },

  leftBoxDesktop: {
    display: 'none',

    '@media (min-width: 1200px)': {
      display: 'flex',
      width: '48%',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },

  leftBoxMobile: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '24px',
    marginBottom: '20px',

    '@media (min-width: 1200px)': {
      display: 'none'
    }
  },

  image: {
    width: '100%',
    maxWidth: '200px',
    height: 'auto',
    objectFit: 'contain',

    '@media (min-width: 768px)': {
      maxWidth: '280px'
    },

    '@media (min-width: 1200px)': {
      maxWidth: '420px'
    }
  },

  rightBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

    '@media (min-width: 1200px)': {
      width: '52%',
      maxWidth: '540px',
      minHeight: '560px'
    }
  },

  topBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '@media (min-width: 1200px)': {
      gap: '22px'
    }
  },

  description: {
    maxWidth: '100%',
    fontSize: '11.3px',
    lineHeight: '22px',
    fontWeight: 500,
    color: '#000000',
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '0',
    marginBottom: '4px',

    '@media (min-width: 1200px)': {
      maxWidth: '460px',
      marginBottom: 0,
      fontSize: '14px',
      lineHeight: '22px'
    }
  },

  select: {
    '& .MuiOutlinedInput-root': {
      height: '48px',
      backgroundColor: '#f8fafb',
      borderRadius: '4px',

      '@media (min-width: 1200px)': {
        height: '54px'
      },

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
      color: '#8a9ba8',
      transform: 'translate(14px, 13px) scale(1)',
      transition: 'transform 0.2s ease, color 0.2s ease',

      '@media (min-width: 1200px)': {
        transform: 'translate(14px, 16px) scale(1)'
      }
    },

    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)'
    },

    '& .MuiInputLabel-root.Mui-focused': {
      color: '#8a9ba8'
    },

    '& .MuiInputBase-input': {
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      color: '#263238'
    },

    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      color: '#263238'
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
    gap: '8px',
    minHeight: '44px',

    '@media (min-width: 1200px)': {
      gap: '10px',
      minHeight: '52px'
    }
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
    height: '50px',
    backgroundColor: '#e7ecef',
    color: '#404040',
    fontWeight: 600,
    fontSize: '14px',
    textTransform: 'none',
    borderRadius: '4px',
    boxShadow: 'none',
    marginTop: '6px',

    '&:hover': {
      backgroundColor: '#dfe6ea',
      boxShadow: 'none'
    },

    '&.Mui-disabled': {
      backgroundColor: '#edf1f4',
      color: '#404040'
    },

    '@media (min-width: 1200px)': {
      height: '44px',
      marginTop: '2px'
    }
  },

  chipsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    minHeight: '40px',
    marginTop: '8px',

    '@media (min-width: 1200px)': {
      gap: '8px',
      marginTop: '4px'
    }
  },

  chip: {
    height: '48px',
    backgroundColor: '#e9eef1',
    borderRadius: '14px',
    color: '#4e6070',
    fontSize: '12px',
    fontWeight: 550,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',

    '@media (min-width: 1200px)': {
      height: '36px',
      borderRadius: '10px'
    },

    '& .MuiChip-label': {
      paddingLeft: '16px',
      paddingRight: '12px',
      lineHeight: '48px',

      '@media (min-width: 1200px)': {
        paddingLeft: '10px',
        paddingRight: '15px',
        lineHeight: '28px'
      }
    },

    '& .MuiChip-deleteIcon': {
      margin: '0 12px 0 0',
      color: '#5b5b5b',
      fontSize: '22px',

      '&:hover': {
        color: '#5F7381'
      },

      '@media (min-width: 1200px)': {
        margin: '0 8px 0 0',
        fontSize: '17px'
      }
    }
  },

  moreChip: {
    height: '48px',
    backgroundColor: '#e9eef1',
    borderRadius: '14px',
    color: '#4e6070',
    fontSize: '12px',
    fontWeight: 550,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',

    '@media (min-width: 1200px)': {
      height: '36px',
      borderRadius: '10px'
    },

    '& .MuiChip-label': {
      paddingLeft: '18px',
      paddingRight: '18px',
      lineHeight: '48px',

      '@media (min-width: 1200px)': {
        paddingLeft: '12px',
        paddingRight: '12px',
        lineHeight: '28px'
      }
    }
  },

  buttonsBox: {
    marginTop: '8px',

    '@media (min-width: 1200px)': {
      marginTop: 'auto',
      paddingTop: '72px'
    },

    '& > div': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px'
    },

    '& .MuiButton-root': {
      minWidth: '0',
      height: '52px',
      padding: '0 18px',
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
