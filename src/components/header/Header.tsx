import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'

import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from '../../redux/hooks'
import { languageSlice } from '../../redux/language/slice'

import jwtDecode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode'
import { userSlice } from '../../redux/user/slice'

interface JwtPayload extends DefaultJwtPayload {
  username: string
}

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const language = useSelector(state => state.language.lng)

  const languageList = useSelector(state => state.language.lngList)
  const dispatch = useDispatch()
  const jwt = useSelector(state => state.user.token)
  const [username, setUsername] = useState('')
  const shoppingCartItems = useSelector(state => state.shoppingCart.items)
  const shoppingCartLoading = useSelector(state => state.shoppingCart.loading)

  useEffect(() => {
    if (jwt !== null) {
      const token = jwtDecode<JwtPayload>(jwt)
      setUsername(token.username)
    }
  }, [jwt])

  const menuClickHandler = e => {
    if (e.key === 'add_new_language') {
      dispatch(
        languageSlice.actions.addLanguage({
          name: '新语言',
          code: 'new_language',
        })
      )
    } else {
      dispatch(languageSlice.actions.changeLanguage(e.key))
    }
  }

  const onLogout = () => {
    dispatch(userSlice.actions.logout())
    navigate('/')
  }

  return (
    <div className={styles.appHeader}>
      <div className={styles.topHeader}>
        <div>
          <Typography.Text>{t('header.slogan')}</Typography.Text>
          <Dropdown.Button
            style={{
              marginLeft: 15,
            }}
            overlay={
              <Menu
                onClick={menuClickHandler}
                items={[
                  ...languageList.map(l => {
                    return {
                      key: l.code,
                      label: l.name,
                    }
                  }),
                  {
                    key: 'add_new_language',
                    label: t('header.add_new_language'),
                  },
                ]}
              />
            }
            icon={<GlobalOutlined />}
          >
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
        </div>
        {jwt ? (
          <Button.Group
            style={{
              alignItems: 'center',
            }}
          >
            <span
              style={{
                marginRight: 10,
              }}
            >
              {t('header.welcome')}
              <Typography.Text strong>{username}</Typography.Text>
            </span>
            <Button
              onClick={() => navigate('/shoppingCart')}
              loading={shoppingCartLoading}
            >
              {t('header.shoppingCart')}({shoppingCartItems.length})
            </Button>
            <Button onClick={onLogout}>{t('header.signOut')}</Button>
          </Button.Group>
        ) : (
          <Button.Group>
            <Button onClick={() => navigate('/register')}>
              {t('header.register')}
            </Button>
            <Button onClick={() => navigate('/signin')}>
              {t('header.signin')}
            </Button>
          </Button.Group>
        )}
      </div>
      <Layout.Header className={styles.mainHeader}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => navigate('/')}
        >
          <img className={styles.appLogo} src={logo} alt="logo" />
          <Typography.Title level={3} className={styles.title}>
            {t('header.title')}
          </Typography.Title>
        </span>
        <Input.Search
          className={styles.searchInput}
          placeholder="请输入旅游目的地、主题、或关键字"
          onSearch={keyword => navigate(`/search/${keyword}`)}
        />
      </Layout.Header>
      <Menu
        className={styles.mainMenu}
        mode={'horizontal'}
        items={[
          { key: '1', label: t('header.home_page') },
          { key: '2', label: t('header.weekend') },
          { key: '3', label: t('header.group') },
          { key: '4', label: t('header.backpack') },
          { key: '5', label: t('header.private') },
          { key: '6', label: t('header.cruise') },
          { key: '7', label: t('header.hotel') },
          { key: '8', label: t('header.local') },
          { key: '9', label: t('header.theme') },
          { key: '10', label: t('header.custom') },
          { key: '11', label: t('header.study') },
          { key: '12', label: t('header.visa') },
          { key: '13', label: t('header.enterprise') },
          { key: '14', label: t('header.high_end') },
          { key: '15', label: t('header.outdoor') },
          { key: '16', label: t('header.insurance') },
        ]}
      ></Menu>
    </div>
  )
}
