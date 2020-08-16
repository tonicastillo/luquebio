import React from "react"
import Img from 'gatsby-image'
import s from './c_enlaces_externos.module.scss'
import SvgSocialImageFacebook from '../../images/social-facebook.svg'
import SvgSocialImageIntagram from '../../images/social-instagram.svg'
import SvgSocialImageTwitter from '../../images/social-twitter.svg'

const CEnlacesExternos = ( props ) => {
    const { links } = props.data
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
            <div className={s.links}>
                <span>+INFO</span>
                <ul className={s.links_social}>
                    {links_social.map(link => (
                        <li key={link.link_url}><a href={link.link_url} target="_blank">{getIcon(link.link_title)}</a></li>
                    ))}
                </ul>
                <ul className={s.links_general}>{links_general.map(link => (
                        <li key={link.link_url}><a href={link.link_url} target="_blank">{link.link_title}</a></li>
                    ))}</ul>
            </div>
		</div>
	)
}




export default CEnlacesExternos
