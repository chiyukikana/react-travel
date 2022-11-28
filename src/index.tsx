import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import rootStore from './redux/store'
import App from './App'
import 'antd/dist/antd.min.css'
import './index.css'
import './i18n/configs'
import axios from 'axios'
import { PersistGate } from 'redux-persist/integration/react'

axios.defaults.headers['x-icode'] = process.env.REACT_APP_API_SECRET!

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ReduxProvider store={rootStore.store}>
      <PersistGate loading={<h1>加载中</h1>} persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
)
