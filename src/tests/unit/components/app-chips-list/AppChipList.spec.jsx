import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import AppChipList from '~/components/app-chips-list/AppChipList'

vi.mock('~/components/app-chip/AppChip', () => ({
  default: ({ children, handleDelete, icon }) => (
    <div data-testid='app-chip'>
      {icon ? <span data-testid='chip-icon'>icon</span> : null}
      <span>{children}</span>

      {handleDelete ? (
        <button
          aria-label={`delete-${children}`}
          onClick={handleDelete}
          type='button'
        >
          delete
        </button>
      ) : null}
    </div>
  )
}))

vi.mock('~/components/app-popover/AppPopover', () => ({
  default: ({ initialItems, showMoreElem, children }) => (
    <div data-testid='app-popover'>
      <div data-testid='initial-items'>{initialItems}</div>
      <div data-testid='show-more'>{showMoreElem}</div>
      <div data-testid='popover-content'>{children}</div>
    </div>
  )
}))

describe('AppChipList component', () => {
  it('should show chips', () => {
    const items = ['React', 'TypeScript', 'MUI']

    render(<AppChipList defaultQuantity={7} items={items} />)

    const popoverContent = screen.getByTestId('popover-content')

    items.forEach((item) => {
      expect(within(popoverContent).getByText(item)).toBeInTheDocument()
    })
  })

  it('should show chip with +3', () => {
    const items = [
      'React',
      'TypeScript',
      'MUI',
      'Redux',
      'RTK Query',
      'Vitest',
      'i18n',
      'Router',
      'Formik',
      'Zod'
    ]

    render(<AppChipList defaultQuantity={7} items={items} />)

    expect(screen.getByTestId('amount-of-chips')).toHaveTextContent('+3')
  })

  it('should show only 7 chips in initial items', () => {
    const items = [
      'React',
      'TypeScript',
      'MUI',
      'Redux',
      'RTK Query',
      'Vitest',
      'i18n',
      'Router',
      'Formik',
      'Zod'
    ]

    render(<AppChipList defaultQuantity={7} items={items} />)

    const initialItems = screen.getByTestId('initial-items')
    const visibleChips = within(initialItems).getAllByTestId('app-chip')

    expect(visibleChips).toHaveLength(7)
  })

  it('should show only 10 chips in initial items', () => {
    const items = [
      'React',
      'TypeScript',
      'MUI',
      'Redux',
      'RTK Query',
      'Vitest',
      'i18n',
      'Router',
      'Formik',
      'Zod',
      'Next.js',
      'Jest'
    ]

    render(<AppChipList defaultQuantity={10} items={items} />)

    const initialItems = screen.getByTestId('initial-items')
    const visibleChips = within(initialItems).getAllByTestId('app-chip')

    expect(visibleChips).toHaveLength(10)
    expect(screen.getByTestId('amount-of-chips')).toHaveTextContent('+2')
  })

  it('should delete 1 chip', async () => {
    const user = userEvent.setup()
    const handleChipDelete = vi.fn()
    const items = ['React', 'TypeScript', 'MUI']

    render(
      <AppChipList
        defaultQuantity={7}
        handleChipDelete={handleChipDelete}
        items={items}
      />
    )

    const initialItems = screen.getByTestId('initial-items')
    const deleteButton = within(initialItems).getByRole('button', {
      name: 'delete-React'
    })

    await user.click(deleteButton)

    expect(handleChipDelete).toHaveBeenCalledTimes(1)
    expect(handleChipDelete).toHaveBeenCalledWith('React')
  })
})
