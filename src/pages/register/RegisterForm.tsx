import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'
import styles from './RegisterForm.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    try {
      console.log('Success:', values)
      await axios.post('http://123.56.149.216:8080/auth/register', {
        email: values.username,
        password: values.password,
        confirmPassword: values.confirm,
      })
      navigate('/signin')
    } catch (error) {
      alert('注册失败')
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      className={styles.registerForm}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
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
        label="确认密码"
        name="confirm"
        hasFeedback
        rules={[
          { required: true, message: '请确认密码！' },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject('密码确认不一致！')
            },
          }),
        ]}
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
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}
