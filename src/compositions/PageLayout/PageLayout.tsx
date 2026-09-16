'use client'

import React from 'react'

import { GlobalModalsRegistrar } from 'compositions/modals'

import { Content, Footer } from './components'


const PageLayout: React.CFC = (props) => {
  let { children } = props

  return (
    <>
      <Content>{children}</Content>
      <Footer />
      <GlobalModalsRegistrar />
      <div id="modals" />
    </>
  )
}

export default PageLayout
