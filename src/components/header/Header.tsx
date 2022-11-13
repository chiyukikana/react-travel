import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const Header: React.FC = () => {
  const navigate = useNavigate()
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
                items={[
                  { key: 1, label: '中文' },
                  { key: 2, label: 'English' },
                ]}
              />
            }
            icon={<GlobalOutlined />}
          >
            语言
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
