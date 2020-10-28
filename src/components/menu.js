import CLink from './cLink'
import React from "react"
import {useSpring, animated} from 'react-spring'
import { useStaticQuery, graphql } from "gatsby"
import s from './menu.module.scss'
import LinkWithArrow from './cLinkWithArrow'

import _ from 'lodash'

import { translations } from "../langs/translations"


import SvgSocialImageFacebook from '../images/social-facebook.svg'
import SvgSocialImageIntagram from '../images/social-instagram.svg'
import SvgSocialImageTwitter from '../images/social-twitter.svg'
import SvgSocialImageLinkedin from '../images/social-linkedin.svg'

import CloseButton from './animated_svg/close_botton'

const Menu = (props) => {
    const { processwire } = useStaticQuery(
        graphql`
          query {
            processwire {
                langs {
                    title
                    code
                }
                submenus {
                  title
                  pwid
                  lang
                }
                pages {
                  title
                  pwid
                  page_url
                  lang
                  submenu {
                    pwid
                  }
                  page_template
                  parentpage {
                    page_template
                  }
                }
            }
          }
        `
      )
    const { isHomeHeaderMode } = props
    const mainMenuStyleClosed = {
        transform: `translate3d(110vw,0,0)`,
    }
    const mainMenuStyleOpened = {
        transform: `translate3d(0vw,0,0)`,
    }
    const [maimMenuStyle, setMainMenuStyle] = useSpring(() => (mainMenuStyleClosed))
    const closeMenu = () => { setMainMenuStyle(mainMenuStyleClosed)}
    return(
        <div className={`${s.container} ${isHomeHeaderMode ? s.inicio : ''}`}>
            <MenuClosedButton onClickPassedEvent={() => { setMainMenuStyle(mainMenuStyleOpened)}} />
            <animated.div
                className={s.menu_container}
                style={{
                    transform: maimMenuStyle.transform
                }}
            >
                <animated.nav className={s.menu_content}>
                    <CloseButton onClickPassedEvent={closeMenu} />
                    <div className={s.block1}>
                        <LinkWithArrow to={_.find(processwire.pages, {page_template: 'INICIO', lang: props.pageContext.lang}).page_url} onClick={closeMenu} className={`${s.b_inicio} ${s.b_flecha_a_la_izquierda}`} pos="left" type="big">{translations.inicio[props.pageContext.lang]}</LinkWithArrow>
                        <LinkWithArrow to={_.find(processwire.pages, {page_template: 'PRODUCTOS', lang: props.pageContext.lang}).page_url} onClick={closeMenu} className={`${s.b_productos} ${s.b_flecha_a_la_derecha}`} pos="right" type="big">Nuestros Productos</LinkWithArrow>
                        <div className={s.boxes}>
                            { _.filter(processwire.submenus, {lang: props.pageContext.lang}).map(submenu => (
                                <div className={s.box} key={submenu.pwid}>
                                    <strong>{submenu.title}</strong>
                                    { _.filter(processwire.pages, {submenu: {pwid: submenu.pwid}, lang: props.pageContext.lang}).map(page => (

                                        <LinkWithArrow onClick={closeMenu} key={page.pwid} to={page.page_url} className={`${s.b_flecha_a_la_derecha} ${s.b_flecha_pequena}`} pos="right">{page.title}</LinkWithArrow>))
                                    }
                                </div>
                            )) }
                            
                            
                        </div>
                        <div className={s.oneline}>
                            { _.filter(processwire.pages, page => {
                                    return (page.page_template === 'GENERAL' || page.page_template === 'CONTACTO' ) && page.parentpage.page_template === 'INICIO' && page.lang === props.pageContext.lang 
                                }).map(page => (
                                <LinkWithArrow  onClick={closeMenu} key={page.pwid} to={page.page_url} className={`${s.b_flecha_a_la_derecha}`} pos="right" type="big">{page.title}</LinkWithArrow>
                            ))}
                        </div>
                    </div>
                    <div className={s.block2}>
                        <ul className={s.block2_langs}>
                            { processwire.langs.map(lang => (
                                <li key={lang.code} onClick={closeMenu}><CLink to={_.find(props.pageContext.versions, {lang: lang.code}).page_url}>{lang.title}</CLink></li>
                            ))}
                        </ul>
                        <ul className={s.block2_social}>
                            <li><a href="https://www.facebook.com/luqueecologico/" target="_blank"><span>Facebook</span><SvgSocialImageFacebook /></a></li>
                            <li><a href="https://www.instagram.com/luqueorganic/" target="_blank"><span>Instagram</span><SvgSocialImageIntagram /></a></li>
                            <li><a href="https://twitter.com/ecologicoluque" target="_blank"><span>Twitter</span><SvgSocialImageTwitter /></a></li>
                            <li><a href="https://www.linkedin.com/company/alcubilla-2000---luque-organic/" target="_blank"><span>LinkedIn</span><SvgSocialImageLinkedin /></a></li>
                        </ul>
                        <div className={s.block2_legal}>
                            { _.filter(processwire.pages, page => {
                                    return (page.page_template === 'LEGAL' ) && page.parentpage.page_template === 'INICIO' && page.lang === props.pageContext.lang 
                                }).map(page => (
                                <CLink  onClick={closeMenu} key={page.pwid} to={page.page_url}>{page.title}</CLink>
                            ))}
                        </div>
                    </div>
                </animated.nav>
            </animated.div>
        </div>
    )
}

const MenuClosedButton = (props) => {
    const { onClickPassedEvent } = props
    const animStyleDefault = {
        transform1: `translate3d(0px,-0.7rem,0)`,
        transform2: `translate3d(0px,0.7rem,0)`
    }
    const [animStyle, setAnimStyle] = useSpring(() => (animStyleDefault))
    return(
        <animated.div className={s.closed_button}
            onMouseMove={() => setAnimStyle({
                transform1: `translate3d(0px,-1.2rem,0)`,
                transform2: `translate3d(0px,1.2rem,0)`
            })}
            onMouseLeave={() => setAnimStyle(animStyleDefault)}
            onClick={onClickPassedEvent}
        >
            <animated.div
                className={s.line}
                style={{transform: animStyle.transform1}}
                
            />
            <animated.div
                className={s.line}
                style={{transform: animStyle.transform2}}
            />
        </animated.div>
        
    )
}




export default Menu
