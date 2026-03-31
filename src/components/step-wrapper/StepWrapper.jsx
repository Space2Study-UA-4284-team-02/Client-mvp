import { cloneElement } from 'react'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import AppButton from '~/components/app-button/AppButton'
import useSteps from '~/hooks/use-steps'
import { styles } from '~/components/step-wrapper/StepWrapper.styles'
import { useStepContext } from '~/context/step-context'
import { requiredFieldSteps } from '~/components/user-steps-wrapper/constants'

const StepWrapper = ({ children, steps, flow, user }) => {
  const { activeStep, stepErrors, isLastStep, loading, stepOperation } =
    useSteps({
      steps
    })
  const { next, back, setActiveStep, handleSubmit } = stepOperation
  const { t } = useTranslation()
  const { stepData } = useStepContext()

  const isStepValid = (stepName, data, errors, flow) => {
    const getFields = requiredFieldSteps[stepName]
    const requiredFields = Array.isArray(getFields)
      ? getFields
      : typeof getFields === 'function'
        ? getFields(flow)
        : []

    const hasEmptyRequired = requiredFields.some((field) => {
      const value = data?.[field]
      if (typeof value === 'boolean') return !value
      if (Array.isArray(value)) return value.length === 0

      return value === '' || value === null || value === undefined
    })

    const hasErrors = Object.values(errors || {}).some(Boolean)

    return !hasEmptyRequired && !hasErrors
  }

  const currentStepName = steps[activeStep]
  const currentStepState = stepData?.[currentStepName]
  const currentStepData =
    currentStepState &&
    typeof currentStepState === 'object' &&
    'data' in currentStepState
      ? currentStepState.data
      : { [currentStepName]: currentStepState }
  const currentStepErrors =
    currentStepState &&
    typeof currentStepState === 'object' &&
    'errors' in currentStepState
      ? currentStepState.errors
      : {}

  const isDisabled = !isStepValid(
    currentStepName,
    currentStepData,
    currentStepErrors,
    flow
  )

  const stepLabels = steps.map((step, index) => (
    <Box
      color={stepErrors[index] ? 'error.500' : 'primary.500'}
      key={step}
      onClick={() => setActiveStep(index)}
      sx={[styles.defaultTab, index === activeStep && styles.activeTab]}
      typography='caption'
    >
      {t(`step.stepLabels.${step}`)}
    </Box>
  ))

  const nextButton = isLastStep ? (
    <AppButton
      loading={loading}
      onClick={handleSubmit}
      size='small'
      sx={styles.finishBtn}
      variant='contained'
    >
      {t('common.finish')}
    </AppButton>
  ) : (
    <AppButton
      disabled={isDisabled}
      onClick={next}
      size='small'
      sx={styles.btn}
      variant='contained'
    >
      {t('common.next')}
      <EastIcon fontSize='small' />
    </AppButton>
  )

  const btnsBox = (
    <Box sx={styles.btnWrapper}>
      <AppButton
        disabled={activeStep === 0}
        onClick={back}
        size='small'
        sx={styles.btn}
        variant='outlined'
      >
        <WestIcon fontSize='small' />
        {t('common.back')}
      </AppButton>
      {nextButton}
    </Box>
  )

  return (
    <Container sx={styles.root}>
      <Box sx={styles.steps}>{stepLabels}</Box>
      <Box sx={styles.stepContent}>
        {cloneElement(children[activeStep], {
          btnsBox,
          stepLabel: steps[activeStep],
          flow,
          user
        })}
      </Box>
    </Container>
  )
}

export default StepWrapper
