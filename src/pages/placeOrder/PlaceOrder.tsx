import React from 'react'
import styles from './PlaceOrder.module.css'
import { CheckOutCard, PaymentForm } from '../../components'
import { MainLayout } from '../../layouts/mainLayout'
import { Row, Col } from 'antd'

export const PlaceOrderPage: React.FC = () => {
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>{/* <CheckOutCard /> */}</Col>
      </Row>
    </MainLayout>
  )
}
