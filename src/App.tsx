import React, { PropsWithChildren } from 'react'
import styles from './App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
} from './pages'
import { Navigate } from 'react-router-dom'
import { useSelector } from './redux/hooks'
import i18next from 'i18next'

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const jwt = useSelector(state => state.user.token)
  return jwt ? <>{children}</> : <Navigate to="/signin" />
}

function App() {
  const lng = useSelector(state => state.language.lng)
  i18next.changeLanguage(lng)
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:keywords" element={<SearchPage />} />
          <Route
            path="/shoppingCart"
            element={
              <PrivateRoute>
                <ShoppingCartPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>404 Not Found.</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
