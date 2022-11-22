import styles from './MainLayout.module.css'
import React, { PropsWithChildren } from 'react'
import { Header, Footer } from '../../components'

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.pageContent}>{children}</div>
      <Footer />
    </>
  )
}
