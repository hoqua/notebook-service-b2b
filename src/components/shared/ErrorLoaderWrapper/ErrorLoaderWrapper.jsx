import React from 'react'
import { Loading } from '../Loading/Loading'
import { EmptyResult } from '../EmptyResult/EmptyResult'

export const ErrorLoaderWrapper = ({ isLoading, isError, isEmpty, children }) => {
  if (isLoading) return <Loading />
  if (isError) return <Loading />
  if (isEmpty) return <EmptyResult />

  return children
}
