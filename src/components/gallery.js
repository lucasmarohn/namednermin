import React, { useState, useEffect } from 'react'
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
            acf {
              video_embed_url
            }
            localFile {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
              internal {
                mediaType
              }
            }
            media_details {
              width
              height
              fileformat
            }
          }
        }
      }
    }
  `)

  const images = () => {
    const arr = []
    grid.wordpressAcfPages.acf.grid.forEach(item => {
      if (!item) return false
      arr.push(item)
    })
    return arr
  }

  useEffect(() => {

    function setupMasonryGrid () {
      console.log('setup')
      resizeAllGridItems()
    }

    function resizeGridItem (item) {
      const grid = document.querySelector('.masonry-gallery')
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'))
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))
      const rowSpan = Math.ceil((item.querySelector('button').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))
      item.style.gridRowEnd = 'span ' + rowSpan
    }

    function resizeAllGridItems () {
      const allItems = document.querySelectorAll('.masonry-gallery > *')
      for (let x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x])
      }
    }

    function resizeInstance (instance) {
      const item = instance.elements[0]
      resizeGridItem(item)
    }

    window.onload = setupMasonryGrid()
    window.addEventListener('resize', resizeAllGridItems)
  })

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
