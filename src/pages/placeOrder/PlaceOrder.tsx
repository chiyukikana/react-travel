import React from 'react'
import { CheckOutCard, PaymentForm } from '../../components'
import { MainLayout } from '../../layouts/mainLayout'
import { Row, Col } from 'antd'
import { useSelector, useDispatch } from '../../redux/hooks'
import { placeOrder } from '../../redux/order/slice'

export const PlaceOrderPage: React.FC = () => {
  const jwt = useSelector(state => state.user.token)
  const loading = useSelector(state => state.order.loading)
  const order = useSelector(state => state.order.currentOrder)
  const dispatch = useDispatch()

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              if (jwt) {
                dispatch(
                  placeOrder({
                    jwt,
                    orderId: order.id,
                  })
                )
              }
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  )
}
