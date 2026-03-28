import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

const style = {
  root: {
    width: '100%',
    maxWidth: { xs: '100%', sm: '420px', md: '760px', lg: '860px' },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: { xs: 'center', md: 'center' },
    gap: { xs: 0, md: '32px', lg: '48px' },
    minHeight: { xs: '100vh', md: '520px', lg: '560px' },
    mx: 'auto'
  },

  imgContainer: {
    width: { md: '320px', lg: '360px' },
    maxWidth: { md: '45%', lg: '45%' },
    display: { xs: 'none', md: 'flex' },
    justifyContent: 'center',
    alignItems: 'center',
    pl: { md: '12px', lg: '20px' }
  },

  img: {
    display: 'block',
    objectFit: 'contain',
    width: '100%',
    maxWidth: { md: '280px', lg: '320px' },
    maxHeight: { md: '380px', lg: '430px' }
  },

  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: { xs: 'center', md: 'center' },
    width: '100%',
    maxWidth: { md: '360px', lg: '380px' },
    boxSizing: 'border-box',
    minHeight: { xs: '100vh', md: 'auto' },
    pt: { xs: '0px', sm: '40px', md: '0px' },
    pb: { xs: '0px', sm: '8px', md: '0px' },
    px: { xs: '18px', sm: '56px', md: '0px', lg: '0px' }
  },

  title: {
    width: { xs: '252px', md: '100%' },
    maxWidth: { xs: '100%', md: '340px' },
    mx: { xs: 'auto', md: 0 },
    pl: { xs: '6px', md: 0 },
    fontSize: { xs: '26px', sm: '32px', md: '34px', lg: '40px' },
    mb: { xs: '20px', md: '18px' },
    lineHeight: { xs: '28px', sm: '44px', md: '40px', lg: '48px' },
    fontWeight: 600,
    textAlign: 'left'
  },

  form: {
    width: { xs: '252px', md: '340px' },
    maxWidth: '100%',
    mx: { xs: 'auto', md: 0 },
    overflow: 'visible',
    ...scrollbar
  }
}

export default style
