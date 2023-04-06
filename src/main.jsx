import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
  Outlet
} from "react-router-dom";
import { ChakraProvider, extendTheme, defineStyle, defineStyleConfig } from '@chakra-ui/react';
import Home from '@/pages/Home'
import Edit from '@/pages/Edit'
import Countdown from '@/pages/Countdown'

const solid = defineStyle({
  backgroundColor: '#000',
  color: '#fff'
})

const buttonTheme = defineStyleConfig({
  variants: { solid }
})

const theme = extendTheme({
  components: {
    Button: {
     
      baseStyle: {
        borderRadius: 28
      },
      ...buttonTheme
    }
  },
  styles: {
    global: {
      'html ,body': {
        height: '100%',
        lineHeight: 'initial'
      },
      '#root': {
        width: '100%',
        height: '100%'
      },
      'input[type="file"]': {
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        width: '100%',
        height: '100%',
      }
    }
  }
})

const router = createHashRouter([
  {
    path: "/",
    element: <Outlet/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "edit",
        element: <Edit/>
      },
      {
        path: "countdown",
        element: <Countdown/>
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router}><App /></RouterProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
