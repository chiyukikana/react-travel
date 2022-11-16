import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

import { RouteComponentProps, withRouter } from '../../helpers/withRouter'

import { Dispatch } from 'redux'
import { RootState } from '../../redux/store'
import { connect as withConnect } from 'react-redux'
import {
  changeLanguageActionCreator,
  addLanguageActionCreator,
} from '../../redux/language/languageActions'

import { withTranslation, WithTranslation } from 'react-i18next'

type IProps = RouteComponentProps & // react-router 映射类型
  WithTranslation & // i18n 映射类型
  ReturnType<typeof mapStateToProps> & // redux store 映射类型
  ReturnType<typeof mapDispatchToProps> // redux 映射类型

// 映射state到组件的props
const mapStateToProps = (state: RootState) => {
  return {
    language: state.language,
    languageList: state.languageList,
  }
}

// 映射dispatch到组件的props
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: 'zh' | 'en') => {
      const action = changeLanguageActionCreator(code)
      dispatch(action)
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code)
      dispatch(action)
    },
  }
}

class HeaderComponent extends React.Component<IProps> {
  menuClickHandler = e => {
    if (e.key === 'new') {
      // 处理新语言添加action
      this.props.addLanguage('新语言', 'add_language')
    } else {
      this.props.changeLanguage(e.key)
    }
  }

  render() {
    const { navigate, t } = this.props
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
                <Menu onClick={this.menuClickHandler}>
                  {this.props.languageList.map(l => {
                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                  })}
                  <Menu.Item key={'new'}>
                    {t('header.add_new_language')}
                  </Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.props.language === 'zh' ? '中文' : 'English'}
            </Dropdown.Button>
          </div>
          <Button.Group>
            <Button onClick={() => navigate('/register')}>
              {t('header.register')}
            </Button>
            <Button onClick={() => navigate('/signin')}>
              {t('header.signin')}
            </Button>
          </Button.Group>
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
        />
      </div>
    )
  }
}

export const Header = withConnect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withRouter(HeaderComponent)))
