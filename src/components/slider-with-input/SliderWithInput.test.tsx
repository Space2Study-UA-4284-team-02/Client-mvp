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
    createMarks: vi.fn(() => [])
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
        onChange(event as unknown as Event, Number(event.currentTarget.value))
      }
      type='range'
      value={value}
    />
  )
}))

type SliderWithInputProps = {
  defaultValue: number
  title: string
  min: number
  max: number
  onChange: (value: number) => void
}

type RenderComponentResult = {
  onChange: ReturnType<typeof vi.fn>
  slider: HTMLInputElement
  input: HTMLInputElement
}

describe('SliderWithInput', () => {
  const defaultProps: SliderWithInputProps = {
    defaultValue: 100,
    title: 'Price',
    min: 50,
    max: 500,
    onChange: vi.fn()
  }

  const renderComponent = (
    props: Partial<SliderWithInputProps> = {}
  ): RenderComponentResult => {
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

  it('should render correctly', () => {
    const { slider, input } = renderComponent()

    expect(screen.getByText('Price')).toBeTruthy()
    expect(slider).toBeTruthy()
    expect(input).toBeTruthy()
    expect(input.value).toBe('100')
  })

  it('should call onChange when slider value changes', () => {
    const { slider, onChange } = renderComponent()

    fireEvent.change(slider, { target: { value: '200' } })

    expect(onChange).toHaveBeenCalledWith(200)
  })

  it('should set min value when input is empty', async () => {
    const user = userEvent.setup()
    const { input, onChange } = renderComponent()

    await user.clear(input)

    expect(input.value).toBe('')
    expect(onChange).toHaveBeenCalledWith(50)
  })

  it('should not call onChange on blur if value was not changed', async () => {
    const user = userEvent.setup()
    const { input, onChange } = renderComponent()

    await user.clear(input)
    await user.type(input, '100')

    onChange.mockClear()
    fireEvent.blur(input)

    expect(onChange).not.toHaveBeenCalled()
    expect(input.value).toBe('100')
  })

  it('should set max value on blur if input value is greater than max', async () => {
    const user = userEvent.setup()
    const { input } = renderComponent()

    await user.clear(input)
    await user.type(input, '999')
    fireEvent.blur(input)

    expect(input.value).toBe('500')
  })
})
