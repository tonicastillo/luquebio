import React from "react"
import Img from 'gatsby-image'
import s from './c_noticia_destacada.module.scss'
import SvgSocialImageFacebook from '../../images/social-facebook.svg'
import SvgSocialImageIntagram from '../../images/social-instagram.svg'
import SvgSocialImageTwitter from '../../images/social-twitter.svg'

const CNoticiaDestacada = ( props ) => {
    const { links, text, htmltext, images } = props.data
    const links_general = []
    const links_social = []
    links.forEach(link => {
        const text = link.link_title.toLowerCase().trim()
        if(
            text === 'instagram' ||
            text === 'facebook' ||
            text === 'twitter'
        ) {
            links_social.push(link)
        } else {
            links_general.push(link)
        }
    });
    const getIcon = (title) => {
        switch (title) {
            case 'instagram':
                return <SvgSocialImageIntagram />
                break;
            case 'twitter':
                return <SvgSocialImageTwitter />
                break;
            case 'facebook':
                return <SvgSocialImageFacebook />
                break;
                    
            default:
                break;
        }
    }
	return(
		<div className={s.container}>
           
            <div className={s.image}>

                { images.length>0 ?
                    <Img
                        fluid={images[0].image.childImageSharp.fluid}
                        alt={images[0].description}
                        backgroundColor="#ffffff"
                        objectFit="contain"
                        backgroundColor="white"
                        style={
                            images[0].width ? {
                                width: `${images[0].width}%`
                            } :
                            {}
                        }
                    />
                    : null
                }
            </div>
            <div className={s.text}>
                <h4>{text}</h4>
                <div className={s.htmltext} dangerouslySetInnerHTML={{__html:htmltext}} />
                {
                    links.length>0 ?
                    <div className={s.links}>
                        <span>+INFO</span>
                        <ul className={s.links_social}>
                            {links_social.map(link => (
                                <li><a href={link.link_url} target="_blank">{getIcon(link.link_title)}</a></li>
                            ))}
                        </ul>
                        <ul className={s.links_general}>{links_general.map(link => (
                                <li><a href={link.link_url} target="_blank">{link.link_title}</a></li>
                            ))}</ul>
                    </div>
                    :
                    null
                }
            </div>
		</div>
	)
}




export default CNoticiaDestacada
