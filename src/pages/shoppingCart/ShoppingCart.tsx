import React from 'react'
import styles from './ShoppingCart.module.css'
import { MainLayout } from '../../layouts/mainLayout'
import { Row, Col, Affix } from 'antd'
import { ProductList, PaymentCard } from '../../components'
import { useSelector, useDispatch } from '../../redux/hooks'
import { clearShoppingCartItem, checkout } from '../../redux/shoppingCart/slice'
import { useNavigate } from 'react-router-dom'

export const ShoppingCartPage: React.FC = () => {
  const shoppingCartLoading = useSelector(state => state.shoppingCart.loading)
  const shoppingCartItems = useSelector(state => state.shoppingCart.items)
  const jwt = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles.productListContainer}>
            <ProductList data={shoppingCartItems.map(s => s.touristRoute)} />
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles.paymentCardContainer}>
              <PaymentCard
                loading={shoppingCartLoading}
                originalPrice={shoppingCartItems
                  .map(s => s.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartItems
                  .map(
                    s =>
                      s.originalPrice *
                      (s.discountPresent ? s.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => {
                  if (shoppingCartItems.length <= 0 || !jwt) return
                  dispatch(checkout(jwt))
                  navigate('/placeOrder')
                }}
                onShoppingCartClear={() => {
                  if (jwt) {
                    dispatch(
                      clearShoppingCartItem({
                        jwt,
                        itemIds: shoppingCartItems.map(s => s.id),
                      })
                    )
                  }
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  )
}
