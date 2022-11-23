import styles from './SearchPage.module.css'
import React, { useEffect } from 'react'
import { Spin } from 'antd'
import { FilterArea, ProductList } from '../../components'
import { useLocation, useParams } from 'react-router-dom'
import { getSearchContent } from '../../redux/productSearch/slice'
import { useSelector, useDispatch } from '../../redux/hooks'
import { MainLayout } from '../../layouts/mainLayout'

type MatchParams = {
  keywords: string
}

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>()
  const loading = useSelector(state => state.productSearch.loading)
  const productList = useSelector(state => state.productSearch.data)
  const pagination = useSelector(state => state.productSearch.pagination)
  const error = useSelector(state => state.productSearch.error)
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch(
      getSearchContent({
        nextPage: 1,
        pageSize: 10,
        keywords: keywords ? keywords : '',
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  const onPageChange = (nextPage, pageSize) => {
    dispatch(
      getSearchContent({
        nextPage,
        pageSize,
        keywords: keywords ? keywords : '',
      })
    )
  }
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
      {/* 分类过滤器 */}
      <div className={styles.productListContainer}>
        <FilterArea />
      </div>
      {/* 产品列表 */}
      <div className={styles.productListContainer}>
        <ProductList
          data={productList}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </MainLayout>
  )
}
