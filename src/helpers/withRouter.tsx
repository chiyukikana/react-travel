import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

export interface RouteComponentProps {
  navigate: NavigateFunction
}

export const withRouter = Component => {
  // 返回一个函数式组件
  return props => {
    const navigate = useNavigate()
    return <Component navigate={navigate} {...props} />
  }
}
