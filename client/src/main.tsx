// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/routes'
import { ConfigProvider } from 'antd';
import "./main.scss"

// AntD Theme
const componentsTheme = {
  "Select": {
    "activeBorderColor": "#7065ef",
    "activeOutlineColor": "rgba(112,101,239,0.1)",
    "hoverBorderColor": "rgb(112,101,239)",
    "optionSelectedBg": "rgba(112,101,239,0.11)",
    "colorPrimary": "rgb(112,101,239)"
  },
  "Input": {
    "inputFontSize": 13,
    "paddingBlock": 7
  },
  "Spin": {
    "colorPrimary": "rgb(255,255,255)"
  }
}

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
      <RouterProvider router={router} />
    </ConfigProvider>
  // </StrictMode>,
)
