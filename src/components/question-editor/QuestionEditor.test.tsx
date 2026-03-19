/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { ChangeEvent, ComponentProps, ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import QuestionEditor from './QuestionEditor'

type QuestionEditorProps = ComponentProps<typeof QuestionEditor>

const openMenuMock = vi.fn()
const closeMenuMock = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

vi.mock('~/hooks/use-menu', () => ({
  default: () => ({
    openMenu: openMenuMock,
    closeMenu: closeMenuMock,
    renderMenu: (content: ReactNode) => <div>{content}</div>
  })
}))

vi.mock('~/components/app-text-field/AppTextField', () => ({
  default: ({
    label,
    value,
    onChange
  }: {
    label: string
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
  }) => <input aria-label={label} onChange={onChange} value={value} />
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: ({
    children,
    onClick,
    disabled
  }: {
    children: ReactNode
    onClick?: () => void
    disabled?: boolean
  }) => (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}))

vi.mock('~/components/app-select/AppSelect', () => ({
  default: ({
    value,
    setValue,
    fields
  }: {
    value: string
    setValue: (value: string) => void
    fields: Array<{ title: string; value: string }>
  }) => (
    <select
      aria-label='question-type'
      onChange={(e) => setValue(e.target.value)}
      value={value}
    >
      {fields.map((field) => (
        <option key={field.value} value={field.value}>
          {field.title}
        </option>
      ))}
    </select>
  )
}))

vi.mock('~/components/question-editor/QuestionEditor.constants', () => ({
  questionType: (type: string) => ({
    isMultipleChoice: type === 'multiple',
    isOpenAnswer: type === 'open',
    isSingleChoice: type === 'single'
  }),
  sortQuestions: [
    { title: 'open', value: 'open', icon: null },
    { title: 'single', value: 'single', icon: null },
    { title: 'multiple', value: 'multiple', icon: null }
  ]
}))

vi.mock('~/components/question-editor/QuestionEditor.styles', () => ({
  styles: {
    answer: {},
    inputItem: {},
    editIconWrapper: {},
    editIcon: {},
    editorBlock: {},
    header: {},
    options: {},
    iconWrapper: {},
    selectContainer: {},
    moreIcon: {},
    editorDivider: {},
    group: {},
    addRadio: () => ({}),
    addIcon: () => ({}),
    buttonsDivider: {},
    buttons: {},
    saveButton: {}
  }
}))

vi.mock('~/types', () => ({
  SizeEnum: { Small: 'small', Medium: 'medium' },
  TextFieldVariantEnum: { Outlined: 'outlined' },
  ButtonVariantEnum: { Tonal: 'tonal' }
}))

const mockData = {
  type: 'open',
  text: 'Initial question',
  openAnswer: 'Initial answer',
  answers: [{ id: 0, text: 'Option 1', isCorrect: false }]
} as unknown as QuestionEditorProps['data']

const createHandleInputChange = (
  expectedKey: string,
  changeHandler: (...args: unknown[]) => void
) =>
  vi.fn((key: string) => {
    if (key === expectedKey) return changeHandler
    return vi.fn()
  })

describe('QuestionEditor', () => {
  const renderComponent = (props: Partial<QuestionEditorProps> = {}) => {
    const handleInputChange = vi.fn(() => () => {})
    const handleNonInputValueChange = vi.fn()
    const onEdit = vi.fn()
    const onCancel = vi.fn()
    const onSave = vi.fn()

    render(
      <QuestionEditor
        data={mockData}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
        onCancel={onCancel}
        onEdit={onEdit}
        onSave={onSave}
        {...props}
      />
    )

    return { handleInputChange, handleNonInputValueChange, onEdit }
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render question input field', () => {
    renderComponent()

    expect(screen.getByLabelText('questionPage.question')).toBeTruthy()
  })

  it('should render open answer field', () => {
    renderComponent()

    expect(screen.getByLabelText('questionPage.answer')).toBeTruthy()
  })

  it('should change question type', async () => {
    const user = userEvent.setup()
    const { handleNonInputValueChange } = renderComponent()

    await user.selectOptions(screen.getByLabelText('question-type'), 'single')

    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it.each([
    {
      field: 'text',
      label: 'questionPage.question',
      value: 'New question'
    },
    {
      field: 'openAnswer',
      label: 'questionPage.answer',
      value: 'New answer'
    }
  ])('should change $field input field', async ({ field, label, value }) => {
    const user = userEvent.setup()
    const changeHandler = vi.fn()
    const handleInputChange = createHandleInputChange(field, changeHandler)

    render(
      <QuestionEditor
        data={mockData}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={vi.fn()}
      />
    )

    const input = screen.getByLabelText(label)

    await user.type(input, value)

    expect(handleInputChange).toHaveBeenCalledWith(field)
    expect(changeHandler).toHaveBeenCalled()
  })

  it('should click on edit title and category', async () => {
    const user = userEvent.setup()
    const { onEdit } = renderComponent({ isQuizQuestion: true })

    const editButton = screen.getByText(
      'myResourcesPage.questions.titleWithCategory'
    )

    await user.click(editButton)

    expect(closeMenuMock).toHaveBeenCalled()
    expect(onEdit).toHaveBeenCalled()
  })
})
