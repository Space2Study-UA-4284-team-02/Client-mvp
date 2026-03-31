import { fadeAnimation } from '~/styles/app-theme/custom-animations'
export const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    padding: '16px',
    gap: '140px',
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    maxHeight: { xs: '200px', sm: '400px' }
  },
  img: {
    maxHeight: '100%',
    maxWidth: '100%',
    height: { xs: '200px', sm: '400px' }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '0',
    padding: '0'
  },
  nameContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '10px'
  },
  locationContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '30px'
  },
  mobileFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },
  mobileLocationFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  }
}
