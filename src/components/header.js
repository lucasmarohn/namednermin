import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

import eye from '../img/icons/eye.gif'

export default () => {

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        wordpressMenusMenusItems(slug: { eq: "navigation" }) {
          id
          slug
          items {
            title
            slug
            classes
            url
          }
        }
      }
    `
  )
  return (
    <header className='header clear'>
      <div className='wrapper'>
        <Link to='/' className='logo'>
        <img
          src={eye}
          width='50'
          height='50'
          style={{display: 'block', margin: '0 auto 5rem auto'}}
          alt='' />
        </Link>
        <div id='navigation' className='wrapper'>
          <ul id='menu-header-menu'>
            {data.wordpressMenusMenusItems.items.map(
               ({ title, url, classes }, index) => {
                 console.log(url)
                 return (
                   <li className={`menu-item page_item ${classes}`} key={index}>
                     <a href={url}>
                       {title}
                     </a>
                   </li>
                 )}
             )}
          </ul>
        </div>
      </div>
    </header>
  )
}
