export const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
    minWidth: 0
  },

  input: {
    width: '100%',
    maxWidth: '100%'
  },

  loginButton: {
    width: '100%',
    py: '6px',
    mt: '14px',
    mb: '14px'
  },

  forgotPass: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'primary.900',
    '&:hover': {
      textDecoration: 'underline'
    },
    '&:focus': {
      outline: '2px solid',
      borderRadius: '2px'
    },
    mb: '2px',
    mt: '0px',
    alignSelf: 'end',
    fontSize: '11px',
    lineHeight: '14px'
  }
}
