import React from "react"
import s from './c_imagen_con_texto.module.scss'
import BackgroundImage from 'gatsby-background-image'
import { transformHTML } from '../../helpers/transformHTML'

const CImagenConTexto = (props) => {
    const { htmltext, images } = props.data
    if(images.length<1) return null
    const {image, description} = images[0]
    return (

        <BackgroundImage
            className={`${s.container}`}
            Tag="section"
            fluid={image.childImageSharp.fluid}
            backgroundColor={`#ccc`}
            description={description}
        >   <div>
                <div className={s.col1}>{transformHTML(htmltext)}</div>
            </div>
        </BackgroundImage>
    )
}


export default CImagenConTexto
