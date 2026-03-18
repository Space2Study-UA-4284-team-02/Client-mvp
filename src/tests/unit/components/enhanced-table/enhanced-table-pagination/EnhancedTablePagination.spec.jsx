import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'

const mocks = vi.hoisted(() => ({
  t: vi.fn((key) => key)
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mocks.t
  })
}))

vi.mock('@mui/material/Box', () => ({
  default: ({ children, ...props }) => <div {...props}>{children}</div>
}))

vi.mock('@mui/material/Typography', () => ({
  default: ({ children, ...props }) => <div {...props}>{children}</div>
}))

vi.mock('@mui/material/Button', () => ({
  default: ({ children, onClick, ...props }) => (
    <button onClick={onClick} type='button' {...props}>
      {children}
    </button>
  )
}))

vi.mock('@mui/material/TextField', () => ({
  default: ({ inputProps, value, onChange, ...props }) => (
    <input onChange={onChange} value={value} {...inputProps} {...props} />
  )
}))

vi.mock('@mui/material/Pagination', () => ({
  default: ({ count, page, onChange }) => (
    <div data-testid='pagination'>
      {Array.from({ length: count }, (_, index) => {
        const pageNumber = index + 1

        return (
          <button
            aria-current={pageNumber === page ? 'page' : undefined}
            key={pageNumber}
            onClick={(event) => onChange(event, pageNumber)}
            type='button'
          >
            {pageNumber}
          </button>
        )
      })}
    </div>
  )
}))

vi.mock('@mui/material/TablePagination', () => ({
  default: ({
    count,
    page,
    rowsPerPage,
    labelRowsPerPage,
    labelDisplayedRows,
    ActionsComponent
  }) => {
    const from = count === 0 ? 0 : page * rowsPerPage + 1
    const to = Math.min(count, (page + 1) * rowsPerPage)

    return (
      <div data-testid='table-pagination'>
        <div>{labelRowsPerPage}</div>
        <div>{labelDisplayedRows({ from, to, count })}</div>
        <div>{ActionsComponent ? <ActionsComponent /> : null}</div>
      </div>
    )
  }
}))

describe('EnhancedTablePagination', () => {
  const handleChangePageMock = vi.fn()
  const handleChangeRowsPerPageMock = vi.fn()
  const handleChangePageInputMock = vi.fn()
  const handlePageSubmitMock = vi.fn()

  const createPaginationProps = (overrides = {}) => ({
    page: 1,
    pageInput: 1,
    rowsPerPage: 5,
    pageCount: 3,
    itemsCount: 13,
    handleChangePage: handleChangePageMock,
    handleChangeRowsPerPage: handleChangeRowsPerPageMock,
    handleChangePageInput: handleChangePageInputMock,
    handlePageSubmit: handlePageSubmitMock,
    ...overrides
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render first page', () => {
    const pagination = createPaginationProps()

    render(<EnhancedTablePagination pagination={pagination} />)

    expect(screen.getByText('table.numberOfRows')).toBeInTheDocument()
    expect(screen.getByText('1-5 table.of 13')).toBeInTheDocument()
    expect(screen.getByText('table.goToPage')).toBeInTheDocument()
    expect(screen.getByTestId('pagination-page-input')).toHaveValue(1)
    expect(screen.getByRole('button', { name: 'table.go' })).toBeInTheDocument()

    const firstPageButton = screen.getByRole('button', { name: '1' })

    expect(firstPageButton).toHaveAttribute('aria-current', 'page')
  })

  it('should change page from 1 to 2', async () => {
    const user = userEvent.setup()
    const pagination = createPaginationProps()

    render(<EnhancedTablePagination pagination={pagination} />)

    const secondPageButton = screen.getByRole('button', { name: '2' })

    await user.click(secondPageButton)

    expect(handleChangePageMock).toHaveBeenCalledTimes(1)
    expect(handleChangePageMock).toHaveBeenCalledWith(expect.any(Object), 2)
  })
})
