import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Col,
  DatePicker,
  Divider,
  Row,
  Spin,
  Typography,
  Anchor,
  Menu,
} from 'antd'
import { Footer, Header, ProductComments, ProductIntro } from '../../components'
import styles from './DetailPage.module.css'
import { commentMockData } from './mockup'
import { getProductDetail } from '../../redux/productDetail/slice'
import { useAppDispatch, useSelector } from '../../redux/hooks'

type MatchParams = {
  touristRouteId: string
}

const { RangePicker } = DatePicker

export const DetailPage: React.FC = () => {
  const { touristRouteId } = useParams<MatchParams>()

  const loading = useSelector(state => state.productDetail.loading)
  const product = useSelector(state => state.productDetail.data)
  const error = useSelector(state => state.productDetail.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      if (touristRouteId) {
        dispatch(getProductDetail(touristRouteId))
      }
    }
    fetchData()
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
    <>
      <Header />
      <div className={styles.pageContent}>
        {/* 产品简介与日期选择 */}
        <div className={styles.productIntroContainer}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map(p => p.url)}
              />
            </Col>
            <Col span={11}>
              <RangePicker
                open
                style={{
                  marginTop: 20,
                }}
              />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <Anchor className={styles.productDetailAnchor}>
          <Menu
            mode="horizontal"
            items={[
              {
                key: 1,
                label: <Anchor.Link href="#feature" title="产品特色" />,
              },
              {
                key: 2,
                label: <Anchor.Link href="#fees" title="费用" />,
              },
              { key: 3, label: <Anchor.Link href="#notes" title="预定须知" /> },
              {
                key: 4,
                label: <Anchor.Link href="#comments" title="产品评价" />,
              },
            ]}
          />
        </Anchor>
        {/* 产品特色 */}
        <div id="feature" className={styles.productDetailContainer}>
          <Divider orientation="center">
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 费用 */}
        <div id="fees" className={styles.productDetailContainer}>
          <Divider orientation="center">
            <Typography.Title level={3}>费用</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 预定须知 */}
        <div id="notes" className={styles.productDetailContainer}>
          <Divider orientation="center">
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 产品评价 */}
        <div id="comments" className={styles.productDetailContainer}>
          <Divider orientation="center">
            <Typography.Title level={3}>用户评价</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
