// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/routes'
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

// Css
import "./main.scss"


axios.defaults.withCredentials = true;

// Antd Theme
const componentsTheme = {
  "Select": {
    "activeBorderColor": "#7065ef",
    "activeOutlineColor": "rgba(112,101,239,0.1)",
    "hoverBorderColor": "rgb(112,101,239)",
    "optionSelectedBg": "rgba(112,101,239,0.11)",
    "controlHeight": 36,
    "colorPrimary": "rgb(112,101,239)"
  },
  "Input": {
    "inputFontSize": 13,
    "paddingBlock": 7
  },
  "Spin": {
    //   "colorPrimary": "rgb(255,255,255)"
    "colorPrimary": "rgb(112,101,239)"
  },
  "Modal": {
    "titleColor": "rgb(112,101,239)",
    "titleFontSize": 20,
    "lineHeight": 1.3
  },
  "Button": {
    "colorPrimary": "rgb(112,101,239)",
    "colorPrimaryHover": "rgb(81,68,230)",
    "colorPrimaryTextActive": "rgb(112,101,239)",
    "colorPrimaryActive": "rgb(112,101,239)",
    "colorPrimaryTextHover": "rgb(112,101,239)",
    "colorPrimaryBorder": "rgba(112,101,239,0.67)",
    "colorPrimaryBgHover": "rgba(112,101,239,0.54)",
    "colorPrimaryBg": "rgba(112,101,239,0.62)",
    "colorLinkHover": "rgba(112,101,239,0.61)",
    "colorLinkActive": "rgb(81,68,230)",
    "colorLink": "rgb(112,101,239)",
    "groupBorderColor": "rgba(112,101,239,0.68)",
    "defaultHoverColor": "rgb(112,101,239)",
    "defaultHoverBorderColor": "rgb(112,101,239)",
    "defaultActiveBorderColor": "rgb(75,65,193)",
    "defaultActiveColor": "rgb(89,77,217)",
    "paddingInline": 20,
    "paddingBlock": 6
  },
  "Slider": {
    "handleActiveColor": "rgb(112,101,239)",
    "dotActiveBorderColor": "rgba(112,101,239,0.8)",
    "handleColor": "rgb(112,101,239)",
    "trackBg": "rgba(112,101,239,0.82)",
    "trackHoverBg": "rgb(112,101,239)",
    "colorPrimaryBorderHover": "rgb(112,101,239)",
    "handleActiveOutlineColor": "rgba(112,101,239,0.18)"
  },
  "Empty": {
    "colorTextDescription": "rgb(141 147 157)",
    "fontSize": 13,
    "controlHeightLG": 44
  }
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ConfigProvider 
      theme={{
        components: componentsTheme,
        token: {
          "colorPrimary": "#7065ef",
          "colorInfo": "#7065ef",
          "borderRadius": 3
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  // </StrictMode>,
)
