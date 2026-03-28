export const styles = {
  linesBox: {
    margin: '10px 0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:after, &:before': {
      content: '""',
      width: '100%',
      height: '2px',
      backgroundColor: 'primary.100'
    }
  },
  continue: {
    whiteSpace: 'nowrap',
    margin: '0 6px',
    fontSize: '10px',
    lineHeight: '12px'
  },
  underlineText: {
    fontWeight: '500',
    color: 'primary.900',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '10px',
    lineHeight: '12px'
  },
  haveAccount: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    color: 'primary.700',
    mt: '6px',
    mb: 0,
    gap: '3px',
    whiteSpace: 'nowrap',
    fontSize: '11px',
    lineHeight: '14px'
  }
}
