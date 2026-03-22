/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { vi } from 'vitest'

import QuestionEditor from './QuestionEditor'

type QuestionEditorProps = ComponentProps<typeof QuestionEditor>

export type InputChangeCase = {
  field: 'text' | 'openAnswer'
  label: 'questionPage.question' | 'questionPage.answer'
  value: string
}

export const mockData = {
  type: 'open',
  text: 'Initial question',
  openAnswer: 'Initial answer',
  answers: [{ id: 0, text: 'Option 1', isCorrect: false }]
} as unknown as QuestionEditorProps['data']

export const choiceQuestionData = {
  type: 'single',
  text: 'Initial question',
  openAnswer: '',
  answers: [
    { id: 0, text: 'Option 1', isCorrect: false },
    { id: 1, text: 'Option 2', isCorrect: false }
  ]
} as unknown as QuestionEditorProps['data']

export const dataWithEmptyLastAnswer = {
  type: 'single',
  text: 'Initial question',
  openAnswer: '',
  answers: [
    { id: 0, text: 'Option 1', isCorrect: false },
    { id: 1, text: '', isCorrect: false }
  ]
} as unknown as QuestionEditorProps['data']

export const inputChangeCases: InputChangeCase[] = [
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
]

export const createHandleInputChange = (expectedKey: string) => {
  const changeHandler = vi.fn()
  const handleInputChange = vi.fn((key: string) => {
    if (key === expectedKey) return changeHandler
    return () => {}
  })

  return { handleInputChange, changeHandler }
}

export const renderComponent = (props: Partial<QuestionEditorProps> = {}) => {
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
