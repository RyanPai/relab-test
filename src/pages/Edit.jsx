import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useState } from 'react';
import { MdAdd } from "react-icons/md";
import { ChromePicker } from 'react-color';

const drawImage = (image, rotate = 1) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let { width, height } = image;

  let dw = width > 480 ? 480 : width;
  let dh = (height * dw) / width;

  canvas.width = rotate > 4 ? dh : dw;
  canvas.height = rotate > 4 ? dw : dh;

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  ctx.translate(x, y);
  switch (rotate) {
    case 2:
    case 4:
    case 5:
    case 7:
      ctx.scale(-1, 1);
      break;
  }
  // rotate
  switch (rotate) {
    case 3:
    case 4:
      ctx.rotate(180 * (Math.PI / 180));
      break;
    case 5:
    case 6:
      ctx.rotate(90 * (Math.PI / 180));
      break;
    case 7:
    case 8:
      ctx.rotate(-90 * (Math.PI / 180));
      break;
  }
  if (rotate > 4) {
    [x, y] = [y, x];
  }
  ctx.fillStyle = '#FFF';
  ctx.fillRect(-x, -y, dw, dh);
  ctx.drawImage(image, -x, -y, dw, dh);

  return canvas;
};

const loadFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
};

const canvasToBase64 = (canvas, mime = 'image/jpeg') => {
  return canvas.toDataURL(mime, 1);
};

const InputFileButton = (props) => {
  const { onChange } = props;
  
  const fileChange = async(evt) => {
    const file = evt.target.files[0];
    if (!file) {
      return;
    }

    if (!/png|jpeg|jpg/i.test(file.type)) {
      console.log('請上傳副檔名為 jpg、jpeg、png 的圖片。')
      return;
    }

    try {
      const src = await loadFile(file);
      const image = await loadImage(src);
      const exif = 1;
      const canvas = drawImage(image, exif);
      const base64 = canvasToBase64(canvas);
      return {
        base64,
        name: file.name
      }
    } catch (error) {
      console.log(error)
      console.log('發生錯誤，請重新上傳')
    }
  }
  return (
    <Button leftIcon={<MdAdd />} variant="outline" >選擇圖片 <input onChange={async(e) => {
      const file = await fileChange(e);
      if(typeof onChange === 'function') {
        onChange(file)
      }
    }} type='file' accept=".png,.jpg,.svg,.jpeg,="/></Button>
  )
}


const LogoModal = (props) => {
  const { onComplete } = props;
  const [file, setFile] = useState({})
  return (
    <ModalContent>
      <ModalHeader>
        <Box display="flex">Logo <Box color="#92918F" fontSize={13}>*必填</Box></Box>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box mb={3}>建議為寬高 2:1 圖片，寬度至少 360px</Box>
        {
          file.name && <Box>{file.name}</Box>
        }
        <InputFileButton onChange={(file) => {
          setFile(file)
        }}/>
      </ModalBody>

      <ModalFooter justifyContent="center">
        <Button variant='solid' onClick={() => {
          if(typeof onComplete === 'function') {
            onComplete(file)
          }
        }}>完成</Button>
      </ModalFooter>
    </ModalContent>
  )
}

const KVModal = (props) => {
  const { onComplete } = props;
  const [file, setFile] = useState({})
  return (
    <ModalContent>
      <ModalHeader>
        <Box display="flex">測驗視覺 <Box color="#92918F" fontSize={13}>*必填</Box></Box>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box mb={3}>建議為寬高 2:1 圖片，寬度至少 360px</Box>
        {
          file.name && <Box>{file.name}</Box>
        }
        <InputFileButton onChange={(file) => {
          setFile(file)
        }}/>
      </ModalBody>

      <ModalFooter justifyContent="center">
        <Button variant='solid' onClick={() => {
          if(typeof onComplete === 'function') {
            onComplete(file)
          }
        }}>完成</Button>
      </ModalFooter>
    </ModalContent>
  )
}

const TitleModal = (props) => {
  const { onComplete, title } = props;
  const [value, setValue] = useState(title)

  return (
    <ModalContent>
      <ModalHeader>
        <Box display="flex">輸入測驗名稱 <Box color="#92918F" fontSize={13}>*必填</Box></Box>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <input style={{fontSize: 20, color: '#161616'}} placeholder='Title Text Input' value={value}  type="text" onChange={(e) => {
      setValue(e.target.value)
    }}/>
      </ModalBody>

      <ModalFooter justifyContent="center">
        <Button variant='solid' onClick={() => {
          if(typeof onComplete === 'function') {
            onComplete(value)
          }
        }}>完成</Button>
      </ModalFooter>
    </ModalContent>
  )
}

const ButtonModal = (props) => {
  const { onComplete, text } = props;
  const [value, setValue] = useState(text)

  return (
    <ModalContent>
      <ModalHeader>
        <Box display="flex">設定按鈕 <Box color="#92918F" fontSize={13}>*必填</Box></Box>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <input style={{fontSize: 20, color: '#161616'}} placeholder='Button Text Input' value={value}  type="text" onChange={(e) => {
      setValue(e.target.value)
    }}/>
      </ModalBody>

      <ModalFooter justifyContent="center">
        <Button variant='solid' onClick={() => {
          if(typeof onComplete === 'function') {
            onComplete(value)
          }
        }}>完成</Button>
      </ModalFooter>
    </ModalContent>
  )
}

const SketchColor = (props) => {
  const { onChangeComplete, color } = props;
  const [display, setDisplay] = useState(false)
  const [hexColor, setColor] = useState(color);

  const closeColorPicker = () => {
    setDisplay(false)
  }
  return (
    <Box position="relative">
   
      <Box display="flex" alignItems="center" onClick={() => setDisplay((prev) => !prev)}>
        <Box width="32px" height="32px" bgColor={color} mr={1} border="1px solid gray" borderRadius={8}></Box>
        <Box border="1px solid" borderRadius={8} overflow="hidden" py={1} px={2} minW="100px">{color}</Box>
      </Box>
      {
        display ?
        <Box position="absolute" zIndex={2} >
        <Box position="fixed" left={0} top={0} right={0} bottom={0} onClick={ closeColorPicker}/>
          <Box>
            <ChromePicker
              color={hexColor}
              onChange={(e) => {
                setColor(e.hex)
              }}
              onChangeComplete={(e) => {
                if(typeof onChangeComplete === 'function') {
                  onChangeComplete(e.hex)
                }
              }}
            
            />
          </Box>
          
        </Box> : null
      }
    </Box>
   
  )
}

const ColorPickerModal = (props) => {
  const { onComplete, color } = props;
  const [hexColor,setHexColor] = useState(color)

  return (
    <ModalContent>
      <ModalHeader>
        <Box display="flex">背景設定</Box>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box>背景色彩 </Box>
        <SketchColor color={color} onChangeComplete={(value) => {
          setHexColor(value)
        }}/>
      </ModalBody>

      <ModalFooter justifyContent="center">
        <Button variant='solid' onClick={() => {
          if(typeof onComplete === 'function') {
            onComplete(hexColor)
          }
        }}>完成</Button>
      </ModalFooter>
    </ModalContent>
  )
}



const Edit = () => {
  const [modalSettings, setModalSettings] = useState({
    visible: false,
    Content: null
  })
  const [logoFile, setLogoFile] = useState({})
  const [kvFile, setKVFile] = useState({})
  const [title, setTitle] = useState('')
  const [buttonText, setButtonText] = useState('');
  const [bgColor, setBgColor] = useState('#fff')


  return (
    <Box p={3} height="100%" >
      <Box  maxWidth={375} width="100%" m="auto" display="flex" flexDirection="column" height="100%">
        <Box
          flex={1}
          display="flex"
          flexDirection="column" 
          sx={{
          '& > *': {
            margin: '16px 0'
          }
        }} px={3}  borderRadius={28} border="1px dashed #161616" height="100%" bgColor={bgColor}>
          <Box h={'72px'} bgImage={logoFile.base64} backgroundSize="cover" backgroundRepeat="no-repeat" backgroundPosition="center" p={3} borderRadius={28} border="1px dashed #161616" textAlign="center"
            onClick={() => {
              setModalSettings({
                visible: true,
                Content: <LogoModal onComplete={(file) => {
                  setLogoFile(file);
                  setModalSettings({visible: false, Content: null})
                }}/>
              })
              
            }} 
          >
            {
              !logoFile.base64 && <Button leftIcon={<MdAdd />} variant="outline" >上傳測驗 Logo</Button>
            }
            
          </Box>
          <Box
           onClick={() => {
              setModalSettings({
                visible: true,
                Content: <KVModal onComplete={(file) => {
                  setKVFile(file);
                  setModalSettings({visible: false, Content: null})
                }}/>
              })
              
            }} 
            bgImage={kvFile.base64} backgroundSize="cover" backgroundRepeat="no-repeat" backgroundPosition="center"
           display="flex" flex={1} justifyContent="center" alignItems="center" p={3} borderRadius={28} border="1px dashed #161616" textAlign="center">
            {
              !kvFile.base64 && <Button leftIcon={<MdAdd />} variant="outline" >上傳測驗視覺</Button>
            }
            
          </Box>
          <Box onClick={() => {
              setModalSettings({
                visible: true,
                Content: <TitleModal title={title} onComplete={(text) => {
                  setTitle(text);
                  setModalSettings({visible: false, Content: null})
                }}/>
              })
              
            }}  p={3} borderRadius={28} border="1px dashed #161616" textAlign="center">
            {title || '輸入測驗名稱'}
          </Box>
          <Box
          onClick={() => {
              setModalSettings({
                visible: true,
                Content: <ButtonModal text={buttonText} onComplete={(text) => {
                  setButtonText(text);
                  setModalSettings({visible: false, Content: null})
                }}/>
              })
              
            }}
           p={3} borderRadius={28} border="1px dashed #161616" textAlign="center">
            <Button variant='solid' >{ buttonText || '設定按鈕'}</Button>
          </Box>
          <Box textAlign="right">
            <Button
            onClick={() => {
              setModalSettings({
                visible: true,
                Content: <ColorPickerModal color={bgColor} onComplete={(hex) => {
                  setBgColor(hex)
                  setModalSettings({visible: false, Content: null})
                }}/>
              })
              
            }}
             variant="outline" >背景設定</Button>
          </Box>
          
        </Box>
       
      </Box>
      <Modal isOpen={modalSettings.visible} onClose={() => {
        setModalSettings({
          visible: false,
          Component: null
        })
      }}>
        <ModalOverlay />
        {
          modalSettings.Content
        }
        
      </Modal>
      
    </Box>
  )
}

export default Edit