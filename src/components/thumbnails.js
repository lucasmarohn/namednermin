import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const ThumbGrid = ({ images, handleOpen, classes }) => {

  return images.map((image, i) => {
    if (image.acf && image.acf.video_embed_url && image.acf.video_embed_url != '') {
      return (
        <div className='masonry-video-container' style={{'--aspect-ratio': `${image.media_details.height / image.media_details.width * 100}%`}}>
          <button onClick={handleOpen(i)}>
            <div className='video-container iframe'>
              <iframe
                src={image.acf.video_embed_url}
                frameborder='0'
                allow='autoplay; fullscreen'
                allowfullscreen />
            </div>
          </button>
        </div>
      )
    } else if (image.media_details.fileformat === 'mp4') {
      return (
        <div className='masonry-video-container' style={{'--aspect-ratio': `${image.media_details.height / image.media_details.width * 100}%`}}>
          <button onClick={handleOpen(i)}>
            <div className='video-container'>
              <video
                width={image.media_details.width}
                height={image.media_details.height}
                muted='true'
                controls>
                <source src={image.localFile.publicURL} type='video/x-m4v' />
              </video>
            </div>
          </button>
        </div>
      )
    } else {
      return (
        <div className='masonry-image-container' key={i}>
          <button onClick={handleOpen(i)}>
            {image.localFile.childImageSharp ? <Img fluid={image.localFile.childImageSharp.fluid} /> : <img src={image.localFile.publicURL} />}
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
