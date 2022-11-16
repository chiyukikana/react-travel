import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReactReduxProvider } from 'react-redux'
import store from './redux/store'
import App from './App'
import 'antd/dist/antd.min.css'
import './index.css'
import './i18n/configs'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ReactReduxProvider store={store}>
      <App />
    </ReactReduxProvider>
  </React.StrictMode>
)
