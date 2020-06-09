import React from "react"
import Img from 'gatsby-image'
import styles from './c_imagen.module.scss'

const CImagen = ({ props }) => {
	const { image, image_description, image_mobile, image_mobile_description } = props
	if(image && image.childImageSharp){
		return(
			<div className={styles.container}>
				<Img
					fluid={image.childImageSharp.fluid}
					alt={description}
					loading="eager"
					backgroundColor="#666666"
					objectFit="contain"
					className={styles.image}
					backgroundColor="white"
					style={{
						width: `${image_width}%`
					}}
				/>
			</div>
		)
	}
	return(<div />)
	
}

export default CImagen
