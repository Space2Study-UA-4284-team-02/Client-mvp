import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi, afterEach } from 'vitest'
import AppRange from './AppRange'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: () => ''
  })
}))

vi.mock('../../hooks/use-debounce', () => ({
  useDebounce: (fn: (...args: unknown[]) => void) => fn
}))

vi.mock('@mui/material/Slider', () => ({
  default: ({
    value,
    onChange
  }: {
    value: number[]
    onChange: (event: Event, value: number[]) => void
  }) => (
    <input
      data-testid='range-slider'
      onChange={(e) =>
        onChange(e as unknown as Event, [
          Number((e.target as HTMLInputElement).value),
          value[1]
        ])
      }
      type='range'
      value={value[0]}
    />
  )
}))

afterEach(() => {
  vi.clearAllMocks()
})

describe('AppRange', () => {
  test('it should renders correctly', () => {
    render(<AppRange max={100} min={0} onChange={() => {}} value={[10, 90]} />)

    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(2)
  })

  test('it should call onChange when slider is moved', () => {
    const onChange = vi.fn()

    render(<AppRange max={100} min={0} onChange={onChange} value={[10, 90]} />)

    const slider = screen.getByTestId('range-slider')

    fireEvent.change(slider, {
      target: { value: '20' }
    })

    expect(onChange).toHaveBeenCalled()
  })

  test('it should call onChange when input is changed', () => {
    const onChange = vi.fn()

    render(<AppRange max={100} min={0} onChange={onChange} value={[10, 90]} />)

    const inputs = screen.getAllByRole('textbox')

    fireEvent.change(inputs[0], {
      target: { id: '0', value: '20' }
    })

    expect(onChange).toHaveBeenCalled()
  })

  test('it should not call onChange when input is changed with not a number', () => {
    const onChange = vi.fn()

    render(<AppRange max={100} min={0} onChange={onChange} value={[10, 90]} />)

    const inputs = screen.getAllByRole('textbox')

    fireEvent.change(inputs[0], {
      target: { id: '0', value: 'abc' }
    })

    expect(onChange).not.toHaveBeenCalled()
  })

  test('it should call onChange with min number if input is empty', () => {
    const onChange = vi.fn()

    render(<AppRange max={100} min={0} onChange={onChange} value={[10, 90]} />)

    const inputs = screen.getAllByRole('textbox')

    fireEvent.change(inputs[0], {
      target: { id: '0', value: '' }
    })

    expect(onChange).toHaveBeenCalledWith([0, 90])
  })

  test('it should update prices when input is blurred and input is greater than max value', () => {
    render(<AppRange max={100} min={0} onChange={() => {}} value={[10, 90]} />)

    const inputs = screen.getAllByRole('textbox')
    const secondInput = inputs[1] as HTMLInputElement

    fireEvent.change(secondInput, {
      target: { id: '1', value: '150' }
    })
    fireEvent.blur(secondInput, {
      target: { id: '1' }
    })

    expect(secondInput.value).toBe('100')
  })

  test('it should not update prices when input is blurred and value in input has not changed', () => {
    render(<AppRange max={100} min={0} onChange={() => {}} value={[10, 90]} />)

    const inputs = screen.getAllByRole('textbox')
    const firstInput = inputs[0] as HTMLInputElement

    fireEvent.blur(firstInput, {
      target: { id: '0' }
    })

    expect(firstInput.value).toBe('10')
  })
})
