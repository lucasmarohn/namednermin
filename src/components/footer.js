import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

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
        <a href='https://instagram.com/namednermin' target='_blank' rel='noopener noreferrer'>Instagram</a>
        {" "}
        <a href='https://twitter.com/namednermin' target='_blank' rel='noopener noreferrer'>Twitter</a>
      </p>
      <p style={{opacity: .5}}>
        web app by
        {" "}
        <a href='https://emergence.design' target='_blank' rel='noopener noreferrer'>emergence</a>
      </p>
    </footer>
  )
}
