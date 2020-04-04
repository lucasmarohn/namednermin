import React from 'react'

import LightboxReact from 'lightbox-react'
import NonStretchedImage from './nonStretchedImage'

const Lightbox = ({images, selectedImage, handleClose, handlePrevRequest, handleNextRequest}) => {
  const array = []

  images.forEach(image => {
    const localCopy = image.localFile
    if (localCopy && localCopy.internal.mediaType === 'image/gif') {
      array.push(<div className='gatsby-image-wrapper' style={{ position: 'relative', overflow: 'hidden' }}>
                   <img
                     src={localCopy.publicURL}
                     width={image.media_details.width}
                     height={image.media_details.height}
                     style={{ display: 'block', margin: 'auto', width: '100%', maxHeight: '100vh' }}
                     alt={image.alt_text} />
                 </div>)
    } else if (image.acf && image.acf.video_embed_url && image.acf.video_embed_url !== '') {
      array.push(
        <div className='video-container iframe'>
          <iframe
            title={image.alt_text}
            src={image.acf.video_embed_url}
            frameborder='0'
            allow='autoplay; fullscreen'
            allowfullscreen />
        </div>
      )
    } else {
      array.push(<NonStretchedImage fluid={localCopy.childImageSharp.fluid} alt={image.alt_text} />)
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
