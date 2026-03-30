import { fadeAnimation } from '~/styles/app-theme/custom-animations'

const btnStyle = {
  padding: '10px 20px',
  display: 'flex',
  columnGap: 1
}

export const styles = {
  root: {
    display: { xs: 'flex' },
    flexDirection: { xs: 'column' },
    height: { xs: '100vh', sm: 'auto' },
    p: { lg: '50px 90px', sm: '40px 50px', xs: '40px 15px' }
  },

  defaultTab: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: { xs: 'center', sm: 'flex-start' },
    borderBottom: { sm: '1px solid' },
    borderColor: { sm: 'primary.500' },
    cursor: 'pointer',
    p: { xs: '6px 8px', sm: '0 0 14px 0' }
  },

  activeTab: {
    color: 'text',
    fontWeight: 600,
    borderBottom: { sm: '3px solid' },
    borderColor: { sm: 'primary.500' },
    p: { xs: '6px 8px', sm: '0 0 14px 0' },
    backgroundColor: { xs: 'basic.grey', sm: 'transparent' },
    borderRadius: { xs: '5px', sm: '0' },
    ...fadeAnimation
  },

  steps: {
    minWidth: '491px',
    alignSelf: 'flex-end',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    columnGap: 0
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
