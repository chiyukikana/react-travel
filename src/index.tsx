import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import store from './redux/store'
import App from './App'
import 'antd/dist/antd.min.css'
import './index.css'
import './i18n/configs'
import axios from 'axios'

axios.defaults.headers['x-icode'] = 'unknown-unknown-unknown'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
)
