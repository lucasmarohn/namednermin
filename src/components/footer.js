import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import { OutboundLink } from 'gatsby-plugin-google-analytics'

export default () => {
  const { wordpressSiteMetadata } = useStaticQuery(graphql`
    query {
      wordpressSiteMetadata {
        name
        description
      }
    }
  `)
  return (
    <footer className='footer wrapper' role='contentinfo'>
      <p className='copyright'>
        © 2020
        {" "}
        {wordpressSiteMetadata.name}
      </p>
      <p>
        <Link to='/'> Home
        </Link>
        {" "}
        <OutboundLink href='https://instagram.com/namednermin' target='_blank' rel='noopener noreferrer'>
          Instagram
        </OutboundLink>
        {" "}
        <OutboundLink href='https://twitter.com/namednermin' target='_blank' rel='noopener noreferrer'>
          Twitter
        </OutboundLink>
      </p>
      <p style={{opacity: .5}}>
        web app by
        {" "}
        <OutboundLink href='https://emergence.design' target='_blank' rel='noopener noreferrer'>
          emergence
        </OutboundLink>
      </p>
    </footer>
  )
}
