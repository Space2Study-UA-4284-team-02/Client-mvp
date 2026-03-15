import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

const dispatchMock = vi.fn()
const markFirstLoginCompleteMock = vi.fn(() => ({
  type: 'mock/markFirstLoginComplete'
}))

vi.mock('~/hooks/use-redux', () => ({
  useAppDispatch: () => dispatchMock
}))

vi.mock('~/redux/reducer', () => ({
  markFirstLoginComplete: () => markFirstLoginCompleteMock()
}))

vi.mock('~/constants', () => ({
  student: 'student'
}))

vi.mock('~/components/user-steps-wrapper/constants', () => ({
  tutorStepLabels: ['General Info', 'Subjects', 'Languages', 'Add Photo'],
  initialValues: {}
}))

vi.mock('~/context/step-context', async () => {
  const PropTypesModule = await import('prop-types')

  const StepProvider = ({ children }) => <>{children}</>

  StepProvider.propTypes = {
    children: PropTypesModule.default.node.isRequired
  }

  return {
    StepProvider
  }
})

vi.mock(
  '~/containers/tutor-home-page/general-info-step/GeneralInfoStep',
  () => ({
    default: ({ isUserFetched }) => (
      <div data-testid='general-info-step'>
        General info step. isUserFetched: {String(isUserFetched)}
      </div>
    )
  })
)

vi.mock('~/containers/tutor-home-page/subjects-step/SubjectsStep', () => ({
  default: () => <div data-testid='subjects-step'>Subjects step</div>
}))

vi.mock('~/containers/tutor-home-page/language-step/LanguageStep', () => ({
  default: () => <div data-testid='language-step'>Language step</div>
}))

vi.mock(
  '~/containers/tutor-home-page/add-photo-step/AddPhotoStep',
  async () => {
    const React = await import('react')

    const MockAddPhotoStep = () => {
      const [error, setError] = React.useState('')
      const [preview, setPreview] = React.useState('')

      const handleChange = (event) => {
        const file = event.target.files?.[0]

        if (!file) {
          return
        }

        if (file.size > 1000000) {
          setError('Photo render error')
          setPreview('')
          return
        }

        setError('')
        setPreview(URL.createObjectURL(file))
      }

      return (
        <div data-testid='add-photo-step'>
          <label htmlFor='photo-upload'>Upload photo</label>
          <input
            aria-label='Upload photo'
            id='photo-upload'
            onChange={handleChange}
            type='file'
          />

          {error ? <div>{error}</div> : null}
          {preview ? <img alt='Uploaded preview' src={preview} /> : null}
        </div>
      )
    }

    return {
      default: MockAddPhotoStep
    }
  }
)

vi.mock('~/components/step-wrapper/StepWrapper', async () => {
  const React = await import('react')
  const PropTypesModule = await import('prop-types')

  const MockStepWrapper = ({ steps, children }) => {
    const [activeStep, setActiveStep] = React.useState(0)

    return (
      <div>
        <div role='tablist'>
          {steps.map((step, index) => (
            <button
              aria-selected={activeStep === index}
              key={step}
              onClick={() => setActiveStep(index)}
              role='tab'
              type='button'
            >
              {step}
            </button>
          ))}
        </div>

        <div data-testid='active-step-content'>{children[activeStep]}</div>
      </div>
    )
  }

  MockStepWrapper.propTypes = {
    steps: PropTypesModule.default.arrayOf(PropTypesModule.default.string)
      .isRequired,
    children: PropTypesModule.default.node.isRequired
  }

  return {
    default: MockStepWrapper
  }
})

describe('UserStepsWrapper', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'mock-preview-url')
    })
  })

  it('should render first tab', () => {
    render(<UserStepsWrapper userRole='tutor' />)

    expect(
      screen.getByRole('tab', { name: 'General Info' })
    ).toBeInTheDocument()
    expect(screen.getByTestId('general-info-step')).toBeInTheDocument()
    expect(screen.queryByTestId('subjects-step')).not.toBeInTheDocument()

    expect(markFirstLoginCompleteMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'mock/markFirstLoginComplete'
    })
  })

  it('should render second tab', async () => {
    const user = userEvent.setup()

    render(<UserStepsWrapper userRole='tutor' />)

    await user.click(screen.getByRole('tab', { name: 'Subjects' }))

    expect(screen.getByTestId('subjects-step')).toBeInTheDocument()
    expect(screen.queryByTestId('general-info-step')).not.toBeInTheDocument()
  })

  it('should open photo render error after add wrong file size', async () => {
    const user = userEvent.setup()

    render(<UserStepsWrapper userRole='tutor' />)

    await user.click(screen.getByRole('tab', { name: 'Add Photo' }))

    const input = screen.getByLabelText('Upload photo')
    const bigFile = new File(['a'.repeat(100)], 'big-photo.png', {
      type: 'image/png'
    })

    Object.defineProperty(bigFile, 'size', {
      value: 2000000
    })

    await user.upload(input, bigFile)

    expect(screen.getByText('Photo render error')).toBeInTheDocument()
    expect(screen.queryByAltText('Uploaded preview')).not.toBeInTheDocument()
  })

  it('should resize and show photo after adding photo', async () => {
    const user = userEvent.setup()

    render(<UserStepsWrapper userRole='tutor' />)

    await user.click(screen.getByRole('tab', { name: 'Add Photo' }))

    const input = screen.getByLabelText('Upload photo')
    const validFile = new File(['small-image'], 'photo.png', {
      type: 'image/png'
    })

    Object.defineProperty(validFile, 'size', {
      value: 500000
    })

    await user.upload(input, validFile)

    expect(screen.queryByText('Photo render error')).not.toBeInTheDocument()
    expect(screen.getByAltText('Uploaded preview')).toBeInTheDocument()
    expect(URL.createObjectURL).toHaveBeenCalledWith(validFile)
  })
})
