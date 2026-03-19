/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { ComponentProps, KeyboardEvent, ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchFilterInput from './SearchFilterInput'

type SearchFilterInputProps = ComponentProps<typeof SearchFilterInput>

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: ({
    children,
    onClick
  }: {
    children: ReactNode
    onClick?: () => void
  }) => <button onClick={onClick}>{children}</button>
}))

vi.mock('~/components/input-with-icon/InputWithIcon', () => ({
  default: ({
    value,
    onChange,
    onClear,
    onKeyPress,
    placeholder
  }: {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onClear: () => void
    onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void
    placeholder?: string
  }) => (
    <div>
      <input
        aria-label='search-input'
        onChange={onChange}
        onKeyPress={onKeyPress as never}
        placeholder={placeholder}
        value={value}
      />
      <button aria-label='clear-search' onClick={onClear}>
        clear
      </button>
    </div>
  )
}))

describe('SearchFilterInput', () => {
  const renderComponent = (props: Partial<SearchFilterInputProps> = {}) => {
    const updateFilter = vi.fn()

    render(
      <SearchFilterInput
        textFieldProps={{ placeholder: 'Search' }}
        updateFilter={updateFilter}
        {...props}
      />
    )

    return { updateFilter }
  }

  afterEach(() => {
    vi.clearAllMocks()
    window.history.pushState({}, '', '/')
  })

  it('should render component with input', () => {
    renderComponent()

    expect(screen.getByLabelText('search-input')).toBeTruthy()
  })

  it('should render search value from query params', () => {
    window.history.pushState({}, '', '/?search=react')

    renderComponent()

    expect(screen.getByLabelText('search-input')).toHaveValue('react')
  })

  it('should render typed text correctly', async () => {
    const user = userEvent.setup()
    renderComponent()

    const input = screen.getByLabelText('search-input')

    await user.type(input, 'frontend')

    expect(input).toHaveValue('frontend')
  })

  it('should delete typed text when clear button is clicked', async () => {
    const user = userEvent.setup()
    const { updateFilter } = renderComponent()

    const input = screen.getByLabelText('search-input')
    const clearButton = screen.getByLabelText('clear-search')

    await user.type(input, 'frontend')
    await user.click(clearButton)

    expect(input).toHaveValue('')
    expect(updateFilter).toHaveBeenCalledWith('')
  })

  it('should call updateFilter function on search button click', async () => {
    const user = userEvent.setup()
    const { updateFilter } = renderComponent()

    const input = screen.getByLabelText('search-input')
    const searchButton = screen.getByRole('button', { name: 'common.search' })

    await user.type(input, 'frontend')
    await user.click(searchButton)

    expect(updateFilter).toHaveBeenCalledWith('frontend')
  })

  it('should call updateFilter function when enter is pressed', async () => {
    const user = userEvent.setup()
    const { updateFilter } = renderComponent()

    const input = screen.getByLabelText('search-input')

    await user.type(input, 'frontend')
    await user.keyboard('{Enter}')

    expect(updateFilter).toHaveBeenCalledWith('frontend')
  })
})
