import { Button, Checkbox, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import styles from './SignInForm.module.css'
import { signIn } from '../../redux/user/slice'
import { useDispatch, useSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'

export const SignInForm: React.FC = () => {
  const loading = useSelector(state => state.user.loading)
  const jwt = useSelector(state => state.user.token)
  const error = useSelector(state => state.user.error)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (jwt !== null) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt])
  const onFinish = (values: any) => {
    console.log('Success:', values)
    dispatch(
      signIn({
        email: values.username,
        password: values.password,
      })
    )
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  if (error) {
    return <div>网站出错: {error}</div>
  }
  return (
    <>
      <span>chiyukikana23333@gmail.com</span>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.signInForm}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
