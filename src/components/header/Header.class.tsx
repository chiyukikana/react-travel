import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { RouteComponentProps, withRouter } from '../../helpers/withRouter'
import store from '../../redux/store'
import { LanguageState } from '../../redux/languageReducer'

interface State extends LanguageState {}

class HeaderComponent extends React.Component<RouteComponentProps, State> {
  constructor(props) {
    super(props)
    const storeState = store.getState()
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList,
    }
    store.subscribe(this.handleStoreChange)
  }

  handleStoreChange = () => {
    const storeState = store.getState()
    this.setState({
      language: storeState.language,
      languageList: storeState.languageList,
    })
  }

  menuClickHandler = e => {
    if (e.key === 'new') {
      // 处理新语言添加action
      const action = {
        type: 'add_language',
        payload: {
          code: 'new_lang',
          name: '新语言',
        },
      }
      store.dispatch(action)
    } else {
      const action = {
        type: 'change_language',
        payload: e.key,
      }
      store.dispatch(action)
    }
  }

  render() {
    const { navigate } = this.props
    return (
      <div className={styles.appHeader}>
        <div className={styles.topHeader}>
          <div>
            <Typography.Text>让旅游更幸福</Typography.Text>
            <Dropdown.Button
              style={{
                marginLeft: 15,
              }}
              overlay={
                <Menu
                  onClick={this.menuClickHandler}
                  items={[
                    ...this.state.languageList.map(l => {
                      return {
                        key: l.code,
                        label: l.name,
                      }
                    }),
                    {
                      key: 'new',
                      label: '添加新语言',
                    },
                  ]}
                />
              }
              icon={<GlobalOutlined />}
            >
              {this.state.language === 'zh' ? '中文' : 'English'}
            </Dropdown.Button>
          </div>
          <Button.Group>
            <Button onClick={() => navigate('/register')}>注册</Button>
            <Button onClick={() => navigate('/signin')}>登录</Button>
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
              React 旅游网
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
            { key: '1', label: '旅游首页' },
            { key: '2', label: '周末游' },
            { key: '3', label: '跟团游' },
            { key: '4', label: '自由行' },
            { key: '5', label: '私家团' },
            { key: '6', label: '邮轮' },
            { key: '7', label: '酒店+景点' },
            { key: '8', label: '当地玩乐' },
            { key: '9', label: '主题游' },
            { key: '10', label: '定制游' },
            { key: '11', label: '游学' },
            { key: '12', label: '签证' },
            { key: '13', label: '企业游' },
            { key: '14', label: '高端游' },
            { key: '15', label: '爱玩户外' },
            { key: '16', label: '保险' },
          ]}
        ></Menu>
      </div>
    )
  }
}

export const Header = withRouter(HeaderComponent)
