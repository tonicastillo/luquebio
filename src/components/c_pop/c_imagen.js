import React from "react"
import Img from 'gatsby-image'
import s from './c_imagen.module.scss'

const CImagen = ( props ) => {
	const { images, images_mobile, width } = props.data
    if(images.length<1) return null
	const {image, description} = images[0]
	return(
		<div className={s.container}>
			<Img
				fluid={image.childImageSharp.fluid}
				alt={description}
				loading="eager"
				backgroundColor="#666666"
				objectFit="contain"
				backgroundColor="white"
				style={
					width ? {
						width: `${width}%`
					} :
					{}
				}
			/>
		</div>
	)
}

export default CImagen