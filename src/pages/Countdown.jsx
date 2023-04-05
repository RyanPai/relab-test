import { useState, useEffect, useRef } from 'react';
import {Box} from '@chakra-ui/react';
import dayjs from 'dayjs';
import duration from  'dayjs/plugin/duration';
dayjs.extend(duration);

const Countdown = () => {
  const currentSec = 10;
  const avg = 100 / currentSec;
  const [current, setCurrent] = useState('front')
  const [countdownTimestamp, setCountdownTimestamp] = useState(0);

  const countdownRef = useRef(null);
  const initialCountdown = (sec) => {
    let timestamp = sec * 1000;

    setCountdownTimestamp(timestamp);
    setCurrent((prev) => prev == 'front' ? 'back' : 'front')
    clearInterval(countdownRef.current);

    countdownRef.current = setInterval(() => {
      timestamp = timestamp <= 1000 ? 0 : timestamp - 1000;
      if (!timestamp) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
        
      }
      setCountdownTimestamp(timestamp);
    }, 1000);
  }

  const onCountdownClick = () => {
    if(!countdownRef.current) {
      initialCountdown(currentSec);
    }
  }

  useEffect(() => {
    return () => {
      clearInterval(countdownRef.current);
    }
  }, [])

  return (
    <Box position="relative" height="100%" onClick={onCountdownClick}> 
      <Box 
        sx={{
          transition: 'all 1s linear',
          position: 'absolute',
          mask:  current == 'back'  ? `linear-gradient(#000 100%, transparent 0%)` : 'none',  
          maskRepeat: 'no-repeat' ,
          maskSize: `100% ${ current == 'back' ? 100 - (dayjs.duration(countdownTimestamp).seconds() * avg) : 0 }%`,
          zIndex: current == 'back' ? 1 : 0
        }}
         display="flex" width="100%" height="100%" flexDirection="column" justifyContent="center" alignItems="center" bgColor="#80077c" color="#fff">
        <Box fontSize={72} fontWeight="bold">{ dayjs.duration(countdownTimestamp).seconds().toString().padStart(2,0)}</Box>
        <Box fontSize={40}>sec</Box>
      </Box>
      <Box
        sx={{
          transition: 'all 1s linear',
          position: 'absolute',
          mask: current == 'front' ? `linear-gradient(#000 100%, transparent 0%)` : 'none',  
          maskRepeat: 'no-repeat' ,
          maskSize: `100% ${current == 'front' ? 100 - ( dayjs.duration(countdownTimestamp).seconds()  * avg) : 0}%`,
          zIndex: current == 'front' ? 1 : 0
        }}
        display="flex" width="100%" height="100%" flexDirection="column" justifyContent="center" alignItems="center" bgColor="#fff" color="#80077c">
        <Box fontSize={72} fontWeight="bold">{ dayjs.duration(countdownTimestamp).seconds().toString().padStart(2,0)}</Box>
        <Box fontSize={40}>sec</Box>
      </Box>
    </Box>
  )
}

export default Countdown