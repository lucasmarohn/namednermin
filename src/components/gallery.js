import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ThumbGrid from './thumbnails'
import LightBox from './lightbox'

import 'lightbox-react/style.css'

const GalleryComponent = props => {
  const [showLightbox, setShowLightbox] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleOpen = i => e => {
    setShowLightbox(true)
    setSelectedImage(i)
  }
  const handleClose = () => {
    setShowLightbox(false)
    setSelectedImage(null)
  }
  const handlePrevRequest = (i, length) => e => {
    setSelectedImage((i - 1 + length) % length)
  }
  const handleNextRequest = (i, length) => e => {
    setSelectedImage((i + 1) % length)
  }

  const grid = useStaticQuery(graphql`
    query {
      wordpressAcfPages(wordpress_id: {eq: 8}) {
        acf {
          grid {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
            media_details {
              width
              height
            }
          }
        }
      }
    }
  `)

  const images = () => {
    const arr = []
    grid.wordpressAcfPages.acf.grid.forEach(item => {
      if (item.localFile)
        if (!item.localFile.childImageSharp) return false
      arr.push(item.localFile)
    })
    return arr
  }

  return (
    <div className='masonry-gallery'>
      <ThumbGrid images={images()} handleOpen={handleOpen} />
      {showLightbox && selectedImage !== null && (
       <LightBox
         images={images()}
         handleClose={handleClose}
         handleNextRequest={handleNextRequest}
         handlePrevRequest={handlePrevRequest}
         selectedImage={selectedImage} />
       )}
    </div>
  )
}
export default GalleryComponent
