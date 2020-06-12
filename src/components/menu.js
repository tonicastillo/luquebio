import CLink from './cLink'
import React from "react"
import {useSpring, animated} from 'react-spring'
import { useStaticQuery, graphql } from "gatsby"
import s from './menu.module.scss'
import LinkWithArrow from './cLinkWithArrow'

import _ from 'lodash'

import SvgSocialImageFacebook from '../images/social-facebook.svg'
import SvgSocialImageIntagram from '../images/social-instagram.svg'
import SvgSocialImageTwitter from '../images/social-twitter.svg'

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
    console.log("Menu props:")
    console.log(props)
    console.log(processwire)
    // const [visible, setVisible] = useState(false)

    const mainMenuStyleClosed = {
        transform: `translate3d(110vw,0,0)`,
    }
    const mainMenuStyleOpened = {
        transform: `translate3d(0vw,0,0)`,
    }
    const [maimMenuStyle, setMainMenuStyle] = useSpring(() => (mainMenuStyleClosed))

    return(
        <div className={s.container}
        >
            <MenuClosedButton onClickPassedEvent={() => { setMainMenuStyle(mainMenuStyleOpened)}} />
            <animated.div
                className={s.menu_container}
                style={{
                    transform: maimMenuStyle.transform
                }}
            >
                <animated.nav className={s.menu_content}>
                    <CloseButton onClickPassedEvent={() => { setMainMenuStyle(mainMenuStyleClosed)}} />
                    <div className={s.block1}>
                        <LinkWithArrow to="/" className={`${s.b_inicio} ${s.b_flecha_a_la_izquierda}`} pos="left" type="big">Inicio</LinkWithArrow>
                        <LinkWithArrow to="/" className={`${s.b_productos} ${s.b_flecha_a_la_derecha}`} pos="right" type="big">Nuestros Productos</LinkWithArrow>
                        <div className={s.boxes}>
                            { _.filter(processwire.submenus, {lang: props.pageContext.lang}).map(submenu => (
                                <div className={s.box} key={submenu.pwid}>
                                    <strong>{submenu.title}</strong>
                                    { _.filter(processwire.pages, {submenu: {pwid: submenu.pwid}, lang: props.pageContext.lang}).map(page => (

                                        <LinkWithArrow key={page.pwid} to={page.page_url} className={`${s.b_flecha_a_la_derecha} ${s.b_flecha_pequena}`} pos="right">{page.title}</LinkWithArrow>))
                                    }
                                </div>
                            )) }
                            
                            
                        </div>
                        <div className={s.oneline}>
                            { _.filter(processwire.pages, {page_template: 'GENERAL', parentpage: {page_template: 'INICIO'}, lang: props.pageContext.lang}).map(page => (
                                <LinkWithArrow key={page.pwid} to={page.page_url} className={`${s.b_flecha_a_la_derecha}`} pos="right" type="big">{page.title}</LinkWithArrow>
                            ))}
                        </div>
                    </div>
                    <div className={s.block2}>
                        <ul className={s.block2_langs}>
                            { processwire.langs.map(lang => (
                                <li><CLink to={_.find(props.pageContext.versions, {lang: lang.code}).page_url}>{lang.title}</CLink></li>
                            ))}
                        </ul>
                        <ul className={s.block2_social}>
                            <li><CLink to="/"><span>Facebook</span><SvgSocialImageFacebook /></CLink></li>
                            <li><CLink to="/"><span>Instagram</span><SvgSocialImageIntagram /></CLink></li>
                            <li><CLink to="/"><span>Twitter</span><SvgSocialImageTwitter /></CLink></li>
                        </ul>
                        <div className={s.block2_legal}>
                            <CLink to="/">Avisos legales</CLink>
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

const CloseButton = (props) => {
    const { onClickPassedEvent } = props
    const animStyleDefault = {
        transform1: `rotate(45deg)`,
        transform2: `rotate(-45deg)`
    }
    const [animStyle, setAnimStyle] = useSpring(() => (animStyleDefault))
    return(
        <animated.div className={s.close}
            onMouseMove={() => setAnimStyle({
                transform1: `rotate(135deg)`,
                transform2: `rotate(-135deg)`
            })}
            onMouseLeave={() => setAnimStyle(animStyleDefault)}
            onClick={onClickPassedEvent}
        >
            <animated.div
                className={s.close_line}
                style={{transform: animStyle.transform1}}
                
            />
            <animated.div
                className={s.close_line}
                style={{transform: animStyle.transform2}}
            />
        </animated.div>
        
    )
}


export default Menu
