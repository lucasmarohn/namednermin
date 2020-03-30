import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import eye from '../img/icons/eye.gif'

export default () => {

  const data = useStaticQuery(
    graphql`
      query {
        wordpressSiteMetadata {
          name
          url
        }
        wordpressMenusMenusItems(slug: { eq: "navigation" }) {
          id
          slug
          items {
            title
            classes
            url
            slug
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
          className="no-zoom"
          alt='' />
        </Link>
        <div id='navigation' className='wrapper'>
          <ul id='menu-header-menu'>
            {data.wordpressMenusMenusItems.items.map(
               ({ title, slug, url, classes }, index) => {
                 console.log('slug', slug, 'url', url)
                 if(!slug && url) {
                   return (
                    <li className={`menu-item page__item ${classes}`} key={index}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                      </a>
                   </li>
                   )
                 }
                 return (
                   <li className={`menu-item page_item ${classes}`} key={index}>
                     <Link to={`/${slug === 'n.emergence.design' ? '' : slug}`}>
                       {title}
                     </Link>
                   </li>
                 )}
             )}
          </ul>
        </div>
      </div>
    </header>
  )
}
