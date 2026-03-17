import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { renderWithProviders } from '~/tests/test-utils'

describe('AppContentSwitcher', () => {
  const onChangeMock = vi.fn()

  const defaultProps = {
    active: true,
    onChange: onChangeMock,
    switchOptions: {
      left: {
        text: 'Left option',
        tooltip: 'Left tooltip'
      },
      right: {
        text: 'Right option',
        tooltip: 'Right tooltip'
      }
    },
    typographyVariant: 'body1'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with the correct props', () => {
    renderWithProviders(<AppContentSwitcher {...defaultProps} />)

    const leftText = screen.getByText('Left option')
    const rightText = screen.getByText('Right option')
    const switchElement = screen.getByRole('checkbox')

    expect(leftText).toBeInTheDocument()
    expect(rightText).toBeInTheDocument()
    expect(switchElement).toBeInTheDocument()
    expect(switchElement).toBeChecked()
  })

  it('should call the onChange function when the switch is clicked', async () => {
    const user = userEvent.setup()

    renderWithProviders(<AppContentSwitcher {...defaultProps} />)

    const switchElement = screen.getByRole('checkbox')

    await user.click(switchElement)

    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

  it('should render tooltips when tooltip props are provided', async () => {
    const user = userEvent.setup()

    renderWithProviders(<AppContentSwitcher {...defaultProps} />)

    const leftText = screen.getByText('Left option')
    const rightText = screen.getByText('Right option')

    await user.hover(leftText)

    expect(await screen.findByText('Left tooltip')).toBeInTheDocument()

    await user.unhover(leftText)

    await waitFor(() => {
      expect(screen.queryByText('Left tooltip')).not.toBeInTheDocument()
    })

    await user.hover(rightText)

    expect(await screen.findByText('Right tooltip')).toBeInTheDocument()
  })
})
