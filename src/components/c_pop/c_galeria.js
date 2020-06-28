import React from "react"
import Img from 'gatsby-image'
import s from './c_galeria.module.scss'

const CGaleria = ( props ) => {
	const { galeriaimages } = props.data
    
	return(
		<div className={s.container}>
			{
				galeriaimages.map(image => (
					<Img
						fluid={image.image.childImageSharp.fluid}
						alt={image.description}
						loading="eager"
						backgroundColor="#666666"
						objectFit="contain"
						backgroundColor="white"
					/>
				))
			}
			
		</div>
	)
}

export default CGaleria