import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import EnhancedTableRow from './EnhancedTableRow'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: () => ''
  })
}))

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}))

const openMenuMock = vi.fn()
const closeMenuMock = vi.fn()

vi.mock('~/hooks/use-menu', () => ({
  default: () => ({
    openMenu: openMenuMock,
    closeMenu: closeMenuMock,
    renderMenu: (items) => <div data-testid='menu'>{items}</div>
  })
}))

const baseProps = {
  columns: [{ field: 'name', label: 'Name' }],
  item: { _id: '1', name: 'Test row' },
  selectedRows: [],
  select: {
    isSelected: () => false,
    handleSelectClick: vi.fn()
  },
  rowActions: [{ label: 'Edit', func: vi.fn() }],
  refetchData: vi.fn()
}

describe('EnhancedTableRow', () => {
  test('it should render table row with correct data', () => {
    render(<EnhancedTableRow {...baseProps} />)

    expect(screen.getByText('Test row')).toBeInTheDocument()
  })

  test('it should call handleSelectClick when checkbox is clicked', () => {
    const handleSelectClick = vi.fn()

    render(
      <EnhancedTableRow
        {...baseProps}
        isSelection
        select={{
          isSelected: () => false,
          handleSelectClick
        }}
      />
    )

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    expect(handleSelectClick).toHaveBeenCalled()
  })

  test('it should render action menu when menu icon is clicked', () => {
    render(<EnhancedTableRow {...baseProps} />)

    const button = screen.getByTestId('menu-icon')

    fireEvent.click(button)

    expect(openMenuMock).toHaveBeenCalled()
  })

  test('it should call onAction function when clicking on menu item', async () => {
    const actionMock = vi.fn()

    render(
      <EnhancedTableRow
        {...baseProps}
        rowActions={[{ label: 'Edit', func: actionMock }]}
      />
    )

    const menuItem = screen.getByText('Edit')

    fireEvent.click(menuItem)

    expect(actionMock).toHaveBeenCalledWith('1')
  })

  test('it should close menu when escape is pressed', () => {
    render(<EnhancedTableRow {...baseProps} />)

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(closeMenuMock).toHaveBeenCalled()
  })
})
