import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Autocomplete,
  TextField
} from '@mui/material'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import useForm from '~/hooks/use-form'
import { useStepContext } from '~/context/step-context'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'

import { getLocation } from '~/services/location-service'
import {
  initialValues,
  validations
} from '~/components/user-steps-wrapper/constants'

import generalStepImg from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { styles } from './GeneralInfoStep.styles'

const MAX_LENGTH = 200

const GeneralInfoStep = ({ btnsBox, stepLabel, flow, user }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  // eslint-disable-next-line no-unused-vars
  const { stepData, handleStepData } = useStepContext()

  const {
    data,
    errors,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    handleSubmit
  } = useForm({
    initialValues: {
      ...initialValues,
      firstName: user?.firstName || '',
      lastName: user?.lastName || ''
    },
    validations
  })

  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])

  // LOAD COUNTRIES ONLY ONCE
  useEffect(() => {
    const load = async () => {
      const res = await getLocation.getCountries()
      setCountries(res)
    }
    load()
  }, [])

  // LOAD CITIES WHEN COUNTRY CHANGES
  useEffect(() => {
    const load = async () => {
      if (!data.country) return
      const res = await getLocation.getCities(data.country)
      setCities(res)
    }
    load()
  }, [data.country])

  const syncToContext = () => {
    handleStepData(stepLabel, data, errors)
  }

  return (
    <Box sx={styles.container}>
      {!isMobile && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={generalStepImg} sx={styles.img} />
        </Box>
      )}

      <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
        <Typography mb='20px'>{t('becomeTutor.generalInfo.title')}</Typography>
        {isMobile && (
          <Box sx={styles.imgContainer}>
            <Box component='img' src={generalStepImg} sx={styles.img} />
          </Box>
        )}
        <Box
          mt='20px'
          sx={isMobile ? styles.mobileFields : styles.nameContainer}
        >
          {/* First Name */}
          <AppTextField
            autoFocus
            errorMsg={errors.firstName ? t(errors.firstName) : ''}
            label={t('common.labels.firstName') + ' *'}
            onBlur={(e) => {
              handleBlur('firstName')(e)
              syncToContext()
            }}
            onChange={handleInputChange('firstName')}
            sx={{ width: '100%' }}
            value={data.firstName}
          />

          {/* Last Name */}
          <AppTextField
            errorMsg={errors.lastName ? t(errors.lastName) : ''}
            label={t('common.labels.lastName') + ' *'}
            onBlur={(e) => {
              handleBlur('lastName')(e)
              syncToContext()
            }}
            onChange={handleInputChange('lastName')}
            sx={{ width: '100%' }}
            value={data.lastName}
          />
        </Box>

        <Box
          sx={isMobile ? styles.mobileLocationFields : styles.locationContainer}
        >
          {/* COUNTRY */}
          <Autocomplete
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            onChange={(e, value) => {
              handleNonInputValueChange('country', value?.value || '')
              handleNonInputValueChange('city', '')
              setCities([])
              syncToContext()
            }}
            options={countries}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(errors.country)}
                helperText={errors.country ? t(errors.country) : ''}
                label={t('common.labels.country')}
              />
            )}
            sx={{ width: '100%' }}
            value={countries.find((c) => c.value === data.country) || null}
          />

          {/* CITY */}
          <Autocomplete
            disabled={!data.country}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            onChange={(e, value) => {
              handleNonInputValueChange('city', value?.value || '')
              syncToContext()
            }}
            options={cities}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(errors.city)}
                helperText={errors.city ? t(errors.city) : ''}
                label={t('common.labels.city')}
              />
            )}
            sx={{ width: '100%' }}
            value={cities.find((c) => c.value === data.city) || null}
          />
        </Box>

        {/* SUMMARY */}
        <AppTextArea
          errorMsg={
            errors.professionalSummary ? t(errors.professionalSummary) : ''
          }
          fullWidth
          label={t('becomeTutor.generalInfo.textFieldLabel')}
          maxLength={MAX_LENGTH}
          onBlur={(e) => {
            handleBlur('professionalSummary')(e)
            syncToContext()
          }}
          onChange={(e) => {
            handleInputChange('professionalSummary')(e)
            syncToContext()
          }}
          value={data.professionalSummary}
        />

        {/* CHECKBOX */}
        {flow === 'student' && (
          <FormControl error={Boolean(errors.confirmAge)}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.confirmAge}
                  onChange={(e) => {
                    handleNonInputValueChange('confirmAge', e.target.checked)
                    syncToContext()
                  }}
                />
              }
              label={t('becomeTutor.generalInfo.confirmAge')}
            />
            {errors.confirmAge && (
              <FormHelperText>{t(errors.confirmAge)}</FormHelperText>
            )}
          </FormControl>
        )}
        <Typography sx={styles.helperText} variant='caption'>
          {t('becomeTutor.generalInfo.helperText')}
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
