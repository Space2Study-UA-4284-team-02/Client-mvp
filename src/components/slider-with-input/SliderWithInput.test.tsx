import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SliderWithInput from './SliderWithInput'

vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: (callback: (value: number) => void) => callback
}))

vi.mock('~/utils/range-filter', async () => {
  const actual = await vi.importActual<typeof import('~/utils/range-filter')>(
    '~/utils/range-filter'
  )

  return {
    ...actual,
    createMarks: vi.fn(() => []),
    checkNumberIsInRange: vi.fn(
      ({
        inputValue,
        min,
        max
      }: {
        inputValue: number | null
        min: number
        max: number
      }) => {
        if (inputValue === null || Number.isNaN(inputValue)) return min
        if (inputValue < min) return min
        if (inputValue > max) return max

        return inputValue
      }
    )
  }
})

vi.mock('@mui/material/Slider', () => ({
  default: ({
    value,
    min,
    max,
    onChange
  }: {
    value: number
    min: number
    max: number
    onChange: (_event: Event, value: number) => void
  }) => (
    <input
      aria-label='slider'
      max={max}
      min={min}
      onChange={(event) =>
        onChange(event as unknown as Event, Number(event.target.value))
      }
      type='range'
      value={value}
    />
  )
}))

describe('SliderWithInput', () => {
  const defaultProps = {
    defaultValue: 100,
    title: 'Price',
    min: 50,
    max: 500,
    onChange: vi.fn()
  }

  const renderComponent = (props = {}) => {
    const onChange = vi.fn()

    render(<SliderWithInput {...defaultProps} {...props} onChange={onChange} />)

    return {
      onChange,
      slider: screen.getByLabelText('slider'),
      input: screen.getByRole('textbox')
    }
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should renders correctly', () => {
    const { slider, input } = renderComponent()

    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(slider).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(input).toHaveDisplayValue('100')
  })

  it('should call onChange when slider is moved', () => {
    const { slider, onChange } = renderComponent()

    fireEvent.change(slider, { target: { value: '200' } })

    expect(onChange).toHaveBeenCalledWith(200)
  })

  it('should update inputValue correctly when input value is empty', async () => {
    const user = userEvent.setup()
    const { input, onChange } = renderComponent()

    await user.clear(input)

    expect(input).toHaveDisplayValue('')
    expect(onChange).toHaveBeenCalledWith(50)
  })

  it('should not update prices when input is blurred and value in input has not changed', async () => {
    const user = userEvent.setup()
    const { input, onChange } = renderComponent()

    await user.clear(input)
    await user.type(input, '100')

    onChange.mockClear()
    fireEvent.blur(input)

    expect(onChange).not.toHaveBeenCalled()
    expect(input).toHaveDisplayValue('100')
  })

  it('should update prices when input is blurred and input is greater than max value', async () => {
    const user = userEvent.setup()
    const { input } = renderComponent()

    await user.clear(input)
    await user.type(input, '999')
    fireEvent.blur(input)

    expect(input).toHaveDisplayValue('500')
  })
})
