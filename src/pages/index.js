import React from 'react'
import { graphql } from 'gatsby'
import HeaderFooter from '../containers/HeaderFooter'
import { Helmet } from 'react-helmet'

import '../sass/index.sass'

export default ({ data }) => {

  const masonryOptions = {
    transitionDuration: 0,
    gutter: 30
  }

  const imagesLoadedOptions = { background: '.my-bg-image-el' }

  const lightboxOptions = {
    overlayColor: 'rgba(255,255,255,.75)',
    buttonsBackgroundColor: 'rgba(255,255,255,1)',
    buttonsIconColor: 'black'
  }

  return (
    <HeaderFooter>
      <Helmet>
        <title>
          Home
        </title>
        <meta name='description' content='Web Design and Development Agency for Growing Brands'></meta>
      </Helmet>
      <div class='masonry-gallery'>
        {data.wordpressAcfPages.acf.grid.map(item => {
           if (item.media_details.fileformat === 'mp4') {
             return <div className='masonry-video-container' style={{'--aspect-ratio': `${item.media_details.height / item.media_details.width * 100}%`}}>
                      <div class='video-container'>
                        <video
                          controls='true'
                          muted='true'
                          autoplay='true'
                          src={item.source_url}></video>
                      </div>
                    </div>
           } else if (! item.localFile.childImageSharp) return false
           return (
             <div className='masonry-image-container'>
               <a href={item.source_url} data-attribute='SRL'><img src={item.localFile.childImageSharp.src} srcset={item.localFile.childImageSharp.fluid.srcSet} alt='' /></a>
             </div>
           )
         })}
      </div>
    </HeaderFooter>
  )
}

export const query = graphql`
query {
  wordpressAcfPages(wordpress_id: {eq: 8}) {
    acf {
      grid {
        localFile {
          childImageSharp {
            fluid {
              src
              srcSet
            }
          }
        }
        source_url
        media_details {
          fileformat
          width
          height
        }
      }
    }
  }
}
`
