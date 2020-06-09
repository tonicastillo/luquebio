import React from "react"
import Img from 'gatsby-image'
import s from './c_imagen.module.scss'

const CImagen = ({ props }) => {
	console.log(props)
	const { images, images_mobile } = props.data
    if(images.length<1) return null
	const {image, description} = images[0]
	const {image_mobile, image_mobile_description} = images_mobile.length<1 ? images[0] : images_mobile[0]
	
	return(
		<div className={s.container}>
			<Img
				fluid={image.childImageSharp.fluid}
				alt={description}
				loading="eager"
				backgroundColor="#666666"
				objectFit="contain"
				backgroundColor="white"
				
			/>
			<Img
				fluid={image_mobile.childImageSharp.fluid}
				alt={image_mobile_description}
				loading="eager"
				backgroundColor="#666666"
				objectFit="contain"
				className={s.image_mobile}
				backgroundColor="white"
			/>
		</div>
	)
}

export default CImagen
