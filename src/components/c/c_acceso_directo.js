import React from "react"
import s from './c_acceso_directo.module.scss'
import BackgroundImage from 'gatsby-background-image'
import LinkWithArrow from '../cLinkWithArrow'

const CAccesoDirecto = (props) => {
    const { text, link_url, link_title, images, is_big } = props.data
    if(images.length<1) return null
    const {image, description} = images[0]
    return (

        <BackgroundImage
            className={`${s.container}`}
            Tag="section"
            fluid={image.childImageSharp.fluid}
            backgroundColor={`#ccc`}
            description={description}
        >   <div className={is_big ? s.is_big : ''}>
                <LinkWithArrow to={link_url} className={'fff'} type="big" pos="right">{link_title}</LinkWithArrow>
                <div>{text}</div>
            </div>
            

        </BackgroundImage>
    )
}


export default CAccesoDirecto
