import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.jsx'
import InterestsStep from '~/containers/student-home-page/interests-step/InterestsStep'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

import {
  tutorStepLabels,
  studentStepLabels,
  initialValues
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'

interface UserStepsWrapperProps {
  userRole: string
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const user = useAppSelector((state) => state.appMain)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const isStudent = userRole === student

  const stepLabels = isStudent ? studentStepLabels : tutorStepLabels

  const childrenArr = isStudent
    ? [
        <GeneralInfoStep
          btnsBox={undefined}
          flow={isStudent}
          key='generalInfo'
          stepLabel={undefined}
          user={user}
        />,
        <InterestsStep btnsBox={undefined} key='interests' />,
        <LanguageStep btnsBox={undefined} key='language' />,
        <AddPhotoStep btnsBox={undefined} key='photo' />
      ]
    : [
        <GeneralInfoStep
          btnsBox={undefined}
          flow={!isStudent}
          key='generalInfo'
          stepLabel={undefined}
          user={user}
        />,
        <SubjectsStep btnsBox={undefined} key='subjects' />,
        <LanguageStep btnsBox={undefined} key='language' />,
        <AddPhotoStep btnsBox={undefined} key='photo' />
      ]

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <StepWrapper
        flow={isStudent ? 'student' : 'tutor'}
        steps={stepLabels}
        user={user}
      >
        {childrenArr}
      </StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
