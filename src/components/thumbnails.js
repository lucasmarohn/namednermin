import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const ThumbGrid = ({ images, handleOpen, classes }) => {
  return images.map((image, i) => {
    return (
      <div className='masonry-image-container' key={i}>
        <button onClick={handleOpen(i)}>
          {image.childImageSharp ? <Img fluid={image.childImageSharp.fluid} /> : <img src={image.publicURL} />}
        </button>
      </div>
    )}
  )
}

ThumbGrid.propTypes = {
  classes: PropTypes.object,
  images: PropTypes.array
}
export default ThumbGrid
