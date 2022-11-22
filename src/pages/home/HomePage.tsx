import React, { useEffect } from 'react'
import {
  Carousel,
  SideMenu,
  ProductCollection,
  BusinessPartners,
} from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import { useTranslation } from 'react-i18next'
import { getRecommendProducts } from '../../redux/recommendProducts/slice'
import { useDispatch, useSelector } from '../../redux/hooks'
import { MainLayout } from '../../layouts/mainLayout'

export const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const loading = useSelector(state => state.recommendProducts.loading)
  const productList = useSelector(state => state.recommendProducts.productList)
  const error = useSelector(state => state.recommendProducts.error)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRecommendProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
        }}
      />
    )
  }
  if (error) {
    return <div>网站出错: {error}</div>
  }
  return (
    <MainLayout>
      <Row style={{ marginTop: 20 }}>
        <Col span={6}>
          <SideMenu />
        </Col>
        <Col span={18}>
          <Carousel />
        </Col>
      </Row>
      <ProductCollection
        title={
          <Typography.Title level={3} type="warning">
            {t('home_page.hot_recommended')}
          </Typography.Title>
        }
        sideImage={sideImage}
        products={productList[0].touristRoutes}
      />
      <ProductCollection
        title={
          <Typography.Title level={3} type="danger">
            {t('home_page.new_arrival')}
          </Typography.Title>
        }
        sideImage={sideImage2}
        products={productList[1].touristRoutes}
      />
      <ProductCollection
        title={
          <Typography.Title level={3} type="success">
            {t('home_page.domestic_travel')}
          </Typography.Title>
        }
        sideImage={sideImage3}
        products={productList[2].touristRoutes}
      />
      <BusinessPartners />
    </MainLayout>
  )
}
