import React from 'react'
import { graphql } from 'gatsby'
import HeaderFooter from '../containers/HeaderFooter'
import { Helmet } from 'react-helmet'

import Gallery from '../components/gallery'

import '../sass/index.sass'

export default ({ data }) => {
  return (
    <HeaderFooter>
      <Helmet>
        <title>
          Home
        </title>
        <meta name='description' content='Web Design and Development Agency for Growing Brands'></meta>
      </Helmet>
      <Gallery />
    </HeaderFooter>
  )
}
