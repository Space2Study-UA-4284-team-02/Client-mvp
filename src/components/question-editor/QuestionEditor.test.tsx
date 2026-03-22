/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { ChangeEvent, ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import QuestionEditor from './QuestionEditor'
import {
  choiceQuestionData,
  createHandleInputChange,
  dataWithEmptyLastAnswer,
  inputChangeCases,
  mockData,
  renderComponent
} from './QuestionEditor.test.helpers'
import type { InputChangeCase } from './QuestionEditor.test.helpers'

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

vi.mock('@mui/material/IconButton', () => ({
  default: ({
    children,
    onClick
  }: {
    children?: ReactNode
    onClick?: () => void
  }) => <button onClick={onClick}>{children}</button>
}))

vi.mock('@mui/material/InputBase', () => ({
  default: ({
    value,
    onChange,
    placeholder
  }: {
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
  }) => (
    <input
      aria-label={placeholder ?? 'answer-input'}
      onChange={onChange}
      value={value}
    />
  )
}))

vi.mock('@mui/material/FormControlLabel', () => ({
  default: ({ label }: { label: ReactNode }) => <div>{label}</div>
}))

vi.mock('@mui/material/RadioGroup', () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>
}))

vi.mock('@mui/material/FormGroup', () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>
}))

vi.mock('@mui/material/Checkbox', () => ({
  default: () => <input type='checkbox' />
}))

vi.mock('@mui/material/Radio', () => ({
  default: () => <input type='radio' />
}))

vi.mock('@mui/icons-material/DeleteOutlineOutlined', () => ({
  default: () => <span>delete-icon</span>
}))

vi.mock('@mui/icons-material/MoreVert', () => ({
  default: () => <span>more-icon</span>
}))

vi.mock('@mui/icons-material/Add', () => ({
  default: () => <span>add-icon</span>
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

afterEach(() => {
  vi.clearAllMocks()
})

describe('QuestionEditor - basic functionality', () => {
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

  it.each(inputChangeCases)(
    'should change $field input field',
    async ({ field, label, value }: InputChangeCase) => {
      const user = userEvent.setup()
      const { handleInputChange, changeHandler } =
        createHandleInputChange(field)

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
    }
  )

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

describe('QuestionEditor - answers', () => {
  it('should render answers for single choice question', () => {
    renderComponent({ data: choiceQuestionData })

    expect(screen.getByDisplayValue('Option 1')).toBeTruthy()
    expect(screen.getByDisplayValue('Option 2')).toBeTruthy()
  })

  it('should add new answer when add answer button is clicked', async () => {
    const user = userEvent.setup()
    const { handleNonInputValueChange } = renderComponent({
      data: choiceQuestionData,
      onCancel: undefined,
      onSave: undefined,
      onEdit: undefined
    })

    const addAnswerButton = screen.getByText('questionPage.addNewOne')

    await user.click(addAnswerButton)

    expect(handleNonInputValueChange).toHaveBeenCalledWith('answers', [
      { id: 0, text: 'Option 1', isCorrect: false },
      { id: 1, text: 'Option 2', isCorrect: false },
      { id: 2, text: '', isCorrect: false }
    ])
  })

  it('should delete answer when delete button is clicked', async () => {
    const user = userEvent.setup()
    const handleNonInputValueChange = vi.fn()

    render(
      <QuestionEditor
        data={choiceQuestionData}
        handleInputChange={vi.fn(() => () => {})}
        handleNonInputValueChange={handleNonInputValueChange}
      />
    )

    const buttons = screen.getAllByRole('button')
    const deleteButton = buttons[0]

    await user.click(deleteButton)

    expect(handleNonInputValueChange).toHaveBeenCalledWith('answers', [
      { id: 1, text: 'Option 2', isCorrect: false }
    ])
  })

  it('should not add new answer if last answer is empty', async () => {
    const user = userEvent.setup()
    const handleNonInputValueChange = vi.fn()

    render(
      <QuestionEditor
        data={dataWithEmptyLastAnswer}
        handleInputChange={vi.fn(() => () => {})}
        handleNonInputValueChange={handleNonInputValueChange}
      />
    )

    const addAnswerButton = screen.getByText('questionPage.addNewOne')

    await user.click(addAnswerButton)

    expect(handleNonInputValueChange).not.toHaveBeenCalled()
  })
})
