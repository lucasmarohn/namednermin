import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"


const ThumbGrid = ({ images, handleOpen, classes }) => {

  console.log('thumbgrid', images)
  return images.map((image, i) => {
    return (
    <div className="masonry-image-container">
      <button
        onClick={handleOpen(i)}
        key={i}
      >
        <Img
          fluid={image.childImageSharp.fluid}
        />
      </button>
    </div>
  )}
  )
}

ThumbGrid.propTypes = {
  classes: PropTypes.object,
  images: PropTypes.array,
}
export default ThumbGrid
