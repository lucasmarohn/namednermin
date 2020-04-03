import React from 'react'

import LightboxReact from 'lightbox-react'
import Img from 'gatsby-image'
import NonStretchedImage from './nonStretchedImage'

const Lightbox = ({images, selectedImage, handleClose, handlePrevRequest, handleNextRequest}) => {
  const array = []

  images.forEach(image => {
    if (image.internal.mediaType === 'image/gif') {
      array.push(<div className='gatsby-image-wrapper' style={{position: 'relative', overflow: 'hidden'}}>
                   <img src={image.publicURL} style={{display: 'block', margin: 'auto', width: '100%',maxHeight: '100vh'}} />
                 </div>)
    } else {
      array.push(<NonStretchedImage fluid={image.childImageSharp.fluid} />)
    }
  })

  return (
    <LightboxReact
      enableZoom={false}
      clickOutsideToClose={true}
      mainSrc={array[selectedImage]}
      nextSrc={array[(selectedImage + 1) % array.length]}
      prevSrc={array[(selectedImage + array.length - 1) % images.length]}
      onCloseRequest={handleClose}
      onMovePrevRequest={handlePrevRequest(selectedImage, array.length)}
      onMoveNextRequest={handleNextRequest(selectedImage, array.length)} />
  )
}

export default Lightbox
