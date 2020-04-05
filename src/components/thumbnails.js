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
            <div className='video-container iframe' dangerouslySetInnerHTML={{__html: image.acf.video_embed_url}}>
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
    } else if (image.localFile && (image.localFile.internal.mediaType === 'video/webm' || image.localFile.internal.mediaType === 'video/quicktime' || image.localFile.internal.mediaType === 'video/mp4')) {
      return (
        <div className='masonry-image-container' style={{position: 'relative', '--aspect-ratio': `${image.media_details.height / image.media_details.width * 100}%`}}>
          <button onClick={handleOpen(i)}>
            <div className='video-container'>
              <video
                autoplay='true'
                muted='true'
                loop='true'
                width={image.media_details.width}
                height={image.media_details.height}>
                <source src={image.localFile.publicURL} type={image.localFile.internal.mediaType} />
              </video>
            </div>
          </button>
        </div>)
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
