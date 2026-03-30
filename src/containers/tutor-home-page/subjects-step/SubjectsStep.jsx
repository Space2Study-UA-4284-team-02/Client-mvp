import { useMemo, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { useStepContext } from '~/context/step-context'
import subjectsImage from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const categoryOptions = [
  { value: 'mathematics', label: 'Mathematics', category: 'Mathematics' },
  { value: 'marketing', label: 'Marketing Strategy', category: 'Marketing' },
  { value: 'music', label: 'Marimba', category: 'Music' },
  { value: 'design', label: 'Motion Design', category: 'Design' },
  {
    value: 'management',
    label: 'Product Management',
    category: 'Management'
  },
  {
    value: 'higher-mathematics',
    label: 'Higher Mathematics',
    category: 'Mathematics'
  }
]

const subjectOptionsMap = {
  mathematics: [
    'Botany',
    'Biochemistry',
    'Genetics',
    'Anatomy',
    'SAT',
    'Zoology'
  ],
  marketing: ['Marketing Strategy', 'Branding', 'SMM'],
  music: ['Marimba', 'Piano', 'Guitar'],
  design: ['Motion Design', 'UI Design', 'Graphic Design'],
  management: ['Product Management', 'Project Management'],
  'higher-mathematics': ['Algebra', 'Geometry', 'Calculus']
}

const MAX_VISIBLE_SUBJECTS = 6

const SubjectsStep = ({ btnsBox, stepLabel }) => {
  const { stepData, handleStepData } = useStepContext()

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [subject, setSubject] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const subjects = Array.isArray(stepData[stepLabel]) ? stepData[stepLabel] : []

  const subjectOptions = useMemo(() => {
    if (!selectedCategory) return []

    return subjectOptionsMap[selectedCategory.value] || []
  }, [selectedCategory])

  const hiddenSubjectsCount = Math.max(
    subjects.length - MAX_VISIBLE_SUBJECTS,
    0
  )

  const visibleSubjects = isExpanded
    ? subjects
    : subjects.slice(0, MAX_VISIBLE_SUBJECTS)

  const handleCategoryChange = (_, newValue) => {
    setSelectedCategory(newValue)
    setSubject('')
  }

  const handleSubjectChange = (e) => {
    setSubject(e.target.value)
  }

  const handleAddSubject = () => {
    if (!selectedCategory || !subject) return

    if (subjects.includes(subject)) {
      setSubject('')
      return
    }

    handleStepData(stepLabel, [...subjects, subject], {})
    setSubject('')
  }

  const handleDeleteSubject = (item) => {
    const updatedSubjects = subjects.filter((s) => s !== item)

    handleStepData(stepLabel, updatedSubjects, {})

    if (updatedSubjects.length <= MAX_VISIBLE_SUBJECTS) {
      setIsExpanded(false)
    }
  }

  const handleToggleSubjects = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.leftBox}>
        <Box
          alt='Subjects'
          component='img'
          src={subjectsImage}
          sx={styles.image}
        />
      </Box>

      <Box sx={styles.rightBox}>
        <Box sx={styles.topBox}>
          <Typography component='p' sx={styles.description}>
            Velit officia consequat duis enim velit mollit. Other categories you
            can add in your account settings later.
          </Typography>

          <Autocomplete
            fullWidth
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={handleCategoryChange}
            options={categoryOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position='start'>
                        <SearchIcon sx={{ fontSize: '18px' }} />
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  )
                }}
                label='Main Tutoring Category'
                sx={styles.select}
              />
            )}
            renderOption={(props, option) => (
              <Box component='li' {...props} sx={styles.optionItem}>
                <Typography component='span' sx={styles.optionTitle}>
                  {option.label}
                </Typography>
                <Typography component='span' sx={styles.optionCategory}>
                  Category: {option.category}
                </Typography>
              </Box>
            )}
            sx={styles.autocomplete}
            value={selectedCategory}
          />

          <TextField
            disabled={!selectedCategory}
            fullWidth
            label='Subject'
            onChange={handleSubjectChange}
            select
            sx={styles.select}
            value={subject}
          >
            {subjectOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          <Button
            disabled={!selectedCategory || !subject}
            fullWidth
            onClick={handleAddSubject}
            sx={styles.addButton}
            variant='contained'
          >
            Add one more subject
          </Button>

          <Box sx={styles.chipsWrapper}>
            {visibleSubjects.map((item) => (
              <Chip
                deleteIcon={<CloseIcon sx={{ fontSize: '12px' }} />}
                key={item}
                label={item}
                onDelete={() => handleDeleteSubject(item)}
                sx={styles.chip}
              />
            ))}

            {!isExpanded && hiddenSubjectsCount > 0 && (
              <Chip
                label={`+${hiddenSubjectsCount}`}
                onClick={handleToggleSubjects}
                sx={styles.chip}
              />
            )}

            {isExpanded && subjects.length > MAX_VISIBLE_SUBJECTS && (
              <Chip
                label='Hide'
                onClick={handleToggleSubjects}
                sx={styles.chip}
              />
            )}
          </Box>
        </Box>

        <Box sx={styles.buttonsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
