import React from "react"
import Img from 'gatsby-image'
import s from './c_logo_y_texto.module.scss'

const CLogoYTexto = ( props ) => {
	const { images, images_mobile, width, htmltext } = props.data
    if(images.length<1) return null
	const {image, description} = images[0]
	return(
		<div className={s.container}>
			<div className={s.imagecol}>
				<div className={s.circle}>
					<div className={s.circle_content}>

						<Img
							fluid={image.childImageSharp.fluid}
							alt={description}
							loading="eager"
							backgroundColor="#666666"
							objectFit="contain"
							backgroundColor="white"
							style={
								width ? {
									width: `${width}%`,
								} :
								{}
							}
						/>
					</div>
				</div>
			</div>
			<div className={s.textcol}>
				<div dangerouslySetInnerHTML={{__html:htmltext}}></div>
			</div>
		</div>
	)
}

export default CLogoYTexto