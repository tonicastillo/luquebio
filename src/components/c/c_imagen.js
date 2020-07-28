import React from "react"
import Img from 'gatsby-image'
import s from './c_imagen.module.scss'
import CLink from '../cLink'
const CImagen = ( props ) => {
	const { link_url, link_title } = props.data
	
	// if(link_url){
	// 	return(
	// 		<CLink
	// 			to={link_url}
	// 			title={link_title}
	// 			className={s.container}
	// 		>
	// 			<CImagenContent
	// 				{...props}
	// 			/>
	// 		</CLink>
	// 	)
	// }
	return(
		<div className={s.container}>
			<CImagenContent
				{...props}
			/>
		</div>
	)
}

const CImagenContent = (props) => {
	const { images, images_mobile } = props.data
	if(images.length<1) return null
	const {image, description, width} = images[0]
	const image_mobile = images_mobile.length<1 ? images[0].image : images_mobile[0].image
	const description_mobile = images_mobile.length<1 ? images[0].description : images_mobile[0].description
	return(
		<>
			<Img
				fluid={image.childImageSharp.fluid}
				alt={description}
				loading="eager"
				backgroundColor="#666666"
				objectFit="contain"
				className={s.image_tablet}
				backgroundColor="white"
				style={
					width ? {
						width: `${width}%`
					} :
					{}
				}
			/>
			<Img
				fluid={image_mobile.childImageSharp.fluid}
				alt={description_mobile}
				loading="eager"
				backgroundColor="#666666"
				objectFit="contain"
				className={s.image_mobile}
				backgroundColor="white"
				style={
					width ? {
						width: `${width}%`
					} :
					{}
				}
			/>
		</>
	)
}

export default CImagen
