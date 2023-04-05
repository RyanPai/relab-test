
import { useNavigate } from "react-router-dom";
import { Button, Stack, Box} from '@chakra-ui/react'

const Basic = () => {
  const navigate = useNavigate()
  return (
    <Box p={3} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Stack direction={'column'} spacing='16px' width="100%">
        <Button width="100%" colorScheme='teal' variant='outline' onClick={() => navigate('/edit')}>Edit</Button>
        <Button  width="100%" colorScheme='teal' variant='outline' onClick={() => navigate('/countdown')}>Countdown</Button>
      </Stack>
    </Box>
    
  )
}

export default Basic