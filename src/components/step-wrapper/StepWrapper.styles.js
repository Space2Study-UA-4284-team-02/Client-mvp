import { fadeAnimation } from '~/styles/app-theme/custom-animations'

const btnStyle = {
  padding: '10px 20px',
  display: 'flex',
  columnGap: 1
}

export const styles = {
  root: {
    maxWidth: '100%',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    display: { xs: 'flex' },
    flexDirection: { xs: 'column' },
    minHeight: { xs: '100vh', sm: 'auto' },
    p: { lg: '50px 90px', sm: '40px 50px', xs: '14px 12px' }
  },
  arrowButton: {
    display: { xs: 'flex', sm: 'none' },
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    color: '#111111',
    flexShrink: 0,
    cursor: 'pointer',

    transform: 'translateY(-3px)'
  },

  arrowDisabled: {
    opacity: 0.3,
    pointerEvents: 'none'
  },

  defaultTab: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: { xs: 'center', sm: 'flex-start' },
    borderBottom: { sm: '1px solid' },
    borderColor: { sm: 'primary.500' },
    cursor: 'pointer',
    p: { xs: '4px 6px', sm: '0 0 14px 0' },
    fontSize: { xs: '11px', sm: '16px' },
    fontWeight: 400,
    color: '#6f8492',
    whiteSpace: 'nowrap'
  },

  activeTab: {
    color: '#263238',
    fontWeight: 600,
    borderBottom: { sm: '3px solid' },
    borderColor: { sm: 'primary.500' },
    p: { xs: '4px 8px', sm: '0 0 14px 0' },
    backgroundColor: '#e9eef1',
    borderRadius: { xs: '6px', sm: '0' },
    fontSize: { xs: '11px', sm: '16px' },
    whiteSpace: 'nowrap',
    minHeight: { xs: '15px', sm: 'auto' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...fadeAnimation
  },

  stepsWrapper: {
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4px',
    mb: '10px',
    overflow: 'hidden'
  },

  steps: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
    marginBottom: '8px',
    flexWrap: 'nowrap',
    gap: '4px',

    '@media (min-width: 600px)': {
      minWidth: '491px',
      alignSelf: 'flex-end',
      gap: 0
    }
  },

  stepContent: {
    display: { xs: 'flex', sm: 'block' },
    justifyContent: 'center',
    flex: 1,
    mt: 0
  },

  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: '10px'
  },

  btn: btnStyle,

  finishBtn: {
    ...btnStyle,
    minWidth: '96px'
  }
}
