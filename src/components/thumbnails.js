import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const ThumbGrid = ({ images, handleOpen, classes }) => {

  return images.map((image, i) => {
    console.log(image)
    if (image.acf && image.acf.video_embed_url && image.acf.video_embed_url !== '') {
      return (
        <div className='masonry-video-container' style={{'--aspect-ratio': `${image.media_details.height / image.media_details.width * 100}%`}}>
          <button onClick={handleOpen(i)}>
            <div className='video-container iframe'>
              <iframe
                title={image.alt_text}
                src={image.acf.video_embed_url}
                frameborder='0'
                allow='autoplay; fullscreen'
                allowfullscreen />
            </div>
          </button>
        </div>
      )
    } else if (image.localFile.internal.mediaType === 'image/gif') {
      return (
        <div className='masonry-image-container'>
          <button onClick={handleOpen(i)}>
            <img src={image.localFile.publicURL} alt={image.alt_text} />
          </button>
        </div>
      )
    } else {
      return (
        <div className='masonry-image-container' key={i}>
          <button onClick={handleOpen(i)}>
            {image.localFile.childImageSharp && <Img style={{width: '100%', height: 0, paddingBottom: `${image.media_details.height / image.media_details.width * 100}%`}} fixed={image.localFile.childImageSharp.fixed} alt={image.alt_text} />}
          </button>
        </div>
      )
    }
  }
  )
}

ThumbGrid.propTypes = {
  classes: PropTypes.object,
  images: PropTypes.array
}
export default ThumbGrid
