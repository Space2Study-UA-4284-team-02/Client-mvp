import PropTypes from 'prop-types'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { renderWithProviders } from '~tests/test-utils'

function ClearIconMock() {
  return <span>ClearIcon</span>
}

function SearchIconMock() {
  return <span>SearchIcon</span>
}

function IconButtonMock({ children, onClick }) {
  const handleClick = () => {
    onClick()
  }

  return (
    <button data-testid='clear-button' onClick={handleClick} type='button'>
      {children}
    </button>
  )
}

IconButtonMock.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
}

function AutocompleteOption({ option, onChange }) {
  const handleOptionClick = () => {
    onChange({}, option)
  }

  return (
    <li>
      <button onClick={handleOptionClick} type='button'>
        {option}
      </button>
    </li>
  )
}

AutocompleteOption.propTypes = {
  option: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

function AppAutoCompleteMock({
  options,
  inputValue,
  onInputChange,
  onChange,
  filterOptions,
  textFieldProps
}) {
  const filteredOptions = filterOptions
    ? filterOptions(options, {
        inputValue,
        getOptionLabel: (option) => option
      })
    : options

  const handleInputChange = (event) => {
    onInputChange(event, event.target.value)
  }

  const handleKeyDown = (event) => {
    if (textFieldProps.onKeyDown) {
      textFieldProps.onKeyDown(event)
    }
  }

  return (
    <div>
      <input
        aria-label='search-input'
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />

      <ul>
        {filteredOptions.map((option) => (
          <AutocompleteOption
            key={option}
            onChange={onChange}
            option={option}
          />
        ))}
      </ul>
    </div>
  )
}

AppAutoCompleteMock.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  filterOptions: PropTypes.func,
  textFieldProps: PropTypes.shape({
    onKeyDown: PropTypes.func
  })
}

AppAutoCompleteMock.defaultProps = {
  options: [],
  inputValue: '',
  filterOptions: undefined,
  textFieldProps: {}
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => (key === 'common.search' ? 'Search' : key)
  })
}))

vi.mock('~/hooks/use-breakpoints', () => ({
  default: () => ({
    isMobile: false
  })
}))

vi.mock('@mui/icons-material/Clear', () => ({
  default: ClearIconMock
}))

vi.mock('@mui/icons-material/Search', () => ({
  default: SearchIconMock
}))

vi.mock('@mui/material/IconButton', () => ({
  default: IconButtonMock
}))

vi.mock('~/components/app-auto-complete/AppAutoComplete', () => ({
  default: AppAutoCompleteMock
}))

describe('SearchAutocomplete', () => {
  const setSearch = vi.fn()
  const onSearchChange = vi.fn()

  const defaultProps = {
    search: '',
    setSearch,
    onSearchChange,
    textFieldProps: {},
    options: ['Apple', 'Apricot', 'Banana', 'Orange', 'Grape', 'Pineapple']
  }

  const renderComponent = (props = {}) =>
    renderWithProviders(<SearchAutocomplete {...defaultProps} {...props} />)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render autocomplete with search input', () => {
    renderComponent()

    expect(
      screen.getByRole('textbox', { name: 'search-input' })
    ).toBeInTheDocument()
  })

  it('should update search input on typing', async () => {
    const user = userEvent.setup()

    renderComponent()

    const input = screen.getByRole('textbox', { name: 'search-input' })

    await user.type(input, 'App')

    expect(input).toHaveValue('App')
  })

  it('should filter options on typing', async () => {
    const user = userEvent.setup()

    renderComponent()

    const input = screen.getByRole('textbox', { name: 'search-input' })

    await user.type(input, 'Ap')

    expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apricot' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Banana' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Orange' })
    ).not.toBeInTheDocument()
  })

  it('should select an option on click', async () => {
    const user = userEvent.setup()

    renderComponent()

    await user.click(screen.getByRole('button', { name: 'Apple' }))

    expect(onSearchChange).toHaveBeenCalledTimes(1)
    expect(setSearch).toHaveBeenCalledWith('Apple')
  })

  it('should clear search input on clear icon click', async () => {
    const user = userEvent.setup()

    renderComponent({ search: 'Apple' })

    const input = screen.getByRole('textbox', { name: 'search-input' })

    expect(input).toHaveValue('Apple')

    await user.click(screen.getByTestId('clear-button'))

    expect(input).toHaveValue('')
    expect(onSearchChange).toHaveBeenCalledTimes(1)
    expect(setSearch).toHaveBeenCalledWith('')
  })

  it('should trigger search on search button click', async () => {
    const user = userEvent.setup()

    renderComponent()

    const input = screen.getByRole('textbox', { name: 'search-input' })

    await user.type(input, 'Banana')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(onSearchChange).toHaveBeenCalledTimes(1)
    expect(setSearch).toHaveBeenCalledWith('Banana')
  })
})
