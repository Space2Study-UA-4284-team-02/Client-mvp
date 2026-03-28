import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import SearchInput from './SearchInput'

describe('SearchInput', () => {
  test('it should render text correctly', () => {
    render(<SearchInput search='' setSearch={() => {}} />)

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  test('it should call setSearch when search icon is clicked', () => {
    const setSearch = vi.fn()

    render(<SearchInput search='' setSearch={setSearch} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    const searchIcon = screen.getByTestId('search-icon')
    fireEvent.click(searchIcon)

    expect(setSearch).toHaveBeenCalledWith('test')
    expect(setSearch).toHaveBeenCalledTimes(1)
  })

  test('it should call setState with empty string when delete icon is clicked', () => {
    const setSearch = vi.fn()

    render(<SearchInput search='test' setSearch={setSearch} />)

    const deleteIcon = screen.getByTestId('delete-icon')
    fireEvent.click(deleteIcon)

    expect(setSearch).toHaveBeenCalledWith('')
    expect(setSearch).toHaveBeenCalledTimes(1)
  })

  test('it should call setSearch when enter is pressed', () => {
    const setSearch = vi.fn()

    render(<SearchInput search='' setSearch={setSearch} />)

    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(setSearch).toHaveBeenCalledWith('test')
    expect(setSearch).toHaveBeenCalledTimes(1)
  })

  test('it should have hidden class if search is empty', () => {
    render(<SearchInput search='' setSearch={() => {}} />)

    const deleteIcon = screen.getByTestId('delete-icon')

    expect(deleteIcon).toHaveClass('hidden')
    expect(deleteIcon).not.toHaveClass('visible')
  })

  test('it should have visible class if search is not empty', () => {
    render(<SearchInput search='test' setSearch={() => {}} />)

    const deleteIcon = screen.getByTestId('delete-icon')

    expect(deleteIcon).toHaveClass('visible')
    expect(deleteIcon).not.toHaveClass('hidden')
  })
})
