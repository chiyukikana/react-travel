import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider as ReactReduxProvider } from 'react-redux'
import store from './redux/store'

import App from './App'
import './index.css'
import 'antd/dist/antd.min.css'

import './i18n/configs'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ReactReduxProvider store={store}>
      <App />
    </ReactReduxProvider>
  </React.StrictMode>
)
