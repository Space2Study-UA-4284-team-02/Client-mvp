import Box from '@mui/material/Box'

interface InterestsStepProps {
  btnsBox?: React.ReactNode
}

const InterestsStep = ({ btnsBox }: InterestsStepProps) => {
  return (
    <Box>
      Interests step
      {btnsBox}
    </Box>
  )
}

export default InterestsStep
