import { FC, useEffect } from 'react'
import { useAppDispatch } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import InterestsStep from '~/containers/student-home-page/interests-step/InterestsStep'

import {
  tutorStepLabels,
  initialValues
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'

interface UserStepsWrapperProps {
  userRole: string
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const childrenArr =
  userRole === student
    ? [<InterestsStep key='1' btnsBox={null} />]
    : [
        <GeneralInfoStep key='1' btnsBox={null} />,
        <SubjectsStep key='2' btnsBox={null} />,
        <LanguageStep key='3' btnsBox={null} />,
        <AddPhotoStep key='4' btnsBox={null} />
      ]

const stepLabels =
  userRole === student ? ['interests'] : tutorStepLabels

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
