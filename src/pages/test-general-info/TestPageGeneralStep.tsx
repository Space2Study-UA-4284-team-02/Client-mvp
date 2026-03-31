import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

const TestPageGeneralStep = () => {
  return (
    <div style={{ padding: 40 }}>
      <UserStepsWrapper userRole='tutor' />
    </div>
  )
}

export default TestPageGeneralStep
// Delete this page after testing, it is used to check the general info step of the user steps wrapper component
