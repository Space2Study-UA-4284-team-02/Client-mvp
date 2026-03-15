import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import AppRange from './AppRange'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: () => ''
  })
}))

vi.mock('../../hooks/use-debounce', () => ({
  useDebounce: (fn: (...args: unknown[]) => void) => fn
}))

describe('AppRange', () => {
  test('it should renders correctly', () => {
    render(<AppRange max={100} min={0} onChange={() => {}} value={[10, 90]} />)

    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(2)
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
})
