import React from "react"
import Img from 'gatsby-image'
import s from './c_imagen.module.scss'

const CImagen = ( props ) => {
	console.log('CImagen')
	console.log(props)
	const { images, images_mobile } = props.data
	console.log('images.length')
	console.log(images.length)
    if(images.length<1) return null
	const {image, description} = images[0]
	const image_mobile = images_mobile.length<1 ? images[0].image : images_mobile[0].image
	const description_mobile = images_mobile.length<1 ? images[0].description : images_mobile[0].description
	
	return(
		<div className={s.container}>
			<Img
				fluid={image.childImageSharp.fluid}
				alt={description}
				loading="eager"
				backgroundColor="#666666"
				objectFit="contain"
				className={s.image_tablet}
				backgroundColor="white"
			/>
			<Img
				fluid={image_mobile.childImageSharp.fluid}
				alt={description_mobile}
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
