import CLink from './cLink'
import React, { useState, useRef } from "react"
import {useTransition, useSpring, useChain, config, useTrail, animated} from 'react-spring'
import { useStaticQuery, graphql } from "gatsby"
import { useMeasure } from "react-use"
import _ from 'lodash'

import 'objectFitPolyfill'

import s from './home_hero.module.scss'
import LinkWithArrow from './cLinkWithArrow'

import SvgTitle from '../images/home-hero-logo-vertical.svg'
import SvgSocialImageFacebook from '../images/social-facebook.svg'
import SvgSocialImageIntagram from '../images/social-instagram.svg'
import SvgSocialImageTwitter from '../images/social-twitter.svg'

const HomeHero = (props) => {
    const { processwire } = useStaticQuery(
        graphql`
          query {
            processwire {
                submenus {
                  title
                  pwid
                  lang
                }
                pages {
                  title
                  pwid
                  lang
                  page_url
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
    // let videoUrl = `${(window.location.protocol !== 'https:' ? 'https:' : 'https')}//luque.tonicastillo.com/site/assets/files/1/luque_ecologico_sin_mosca_con_filtro_oscuro.mp4`
    return (
        <div className={s.container}>
            <div className={s.video_container}>
                <video data-object-fit="cover" autoPlay loop muted>
                    <source type="video/mp4" src="//luque.tonicastillo.com/site/assets/files/1/luque_ecologico_sin_mosca_con_filtro_oscuro70.mp4" />
                </video>
            </div>
            <div className={s.content}>
                <div className={s.title}>
                    <SvgTitle />
                    <span>Luque Ecológico</span>
                </div>
                <div className={s.main_block}>
                    <h2>AcEITES Y VINAGRES PROCEDENTES <br />DE CULTIVO ECOLÓGICO</h2>
                    <nav>
                        { _.filter(processwire.submenus, {lang: props.pageContext.lang}).map(submenu => (
                            <LinkBox
                                title={submenu.title}
                                links={_.filter(processwire.pages, {submenu: {pwid: submenu.pwid}, lang: props.pageContext.lang})}
                            />
                        )) }
                    </nav>
                </div>
                <div className={s.bottom_block}>
                    <ul className={s.langs}>
                            <li><CLink to="/">Español</CLink></li>
                            <li><CLink to="/">Français</CLink></li>
                            <li><CLink to="/">English</CLink></li>
                    </ul>
                    <ul className={s.social}>
                        <li><CLink to="/"><span>Facebook</span><SvgSocialImageFacebook /></CLink></li>
                        <li><CLink to="/"><span>Instagram</span><SvgSocialImageIntagram /></CLink></li>
                        <li><CLink to="/"><span>Twitter</span><SvgSocialImageTwitter /></CLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const LinkBox = (props) => {
    const { title, links } = props
    const [ isOpen, setIsOpen ] = useState(false)

    const [boxRef, { height }] = useMeasure();
    
    const boxSpringRef = useRef()
    const boxSpring = useSpring({
        ref: boxSpringRef,
        // config: config.stiff,
        from: { height: '34px', transform: 'rotate(0deg)' },
        to: isOpen ?
            {
                height: `${height > 80 ? height+24 : 190}px`,
                transform: 'rotate(225deg)'
            }
            :
            {
                height: '64px',
                transform: 'rotate(0deg)'
            }
    })
    const linksSpringRef = useRef()
    const linkTrail = useTrail(links.length, {
        ref: linksSpringRef,
        // config: config.stiff,
        from: { transform: 'translate3d(-5rem,0,0)', opacity: 0  },
        to: isOpen ? 
            { transform: 'translate3d(0rem,0,0)',
            opacity: 1}
            :
            { transform: 'translate3d(-5rem,0,0)',
            opacity: 0}
    })
    useChain(isOpen ? [boxSpringRef, linksSpringRef] : [linksSpringRef, boxSpringRef], [0, isOpen ? 0.1 : 0])

    return (
        <animated.div style={{ height: boxSpring.height }} onClick={() => setIsOpen(isOpen => !isOpen)}>
            <div ref={boxRef}>
                <span>{title}</span>
                <ul>
                    {linkTrail.map((trail, i) => (
                        <animated.li
                            key={i}
                            style={trail} ><LinkWithArrow to={links[i].page_url} pos="right" >{links[i].title}</LinkWithArrow></animated.li>
                    ))}
                </ul>
            </div>
            <animated.div style={{ transform: boxSpring.transform }} className={s.navBoxPlusClose} />
        </animated.div>
    )
}

export default HomeHero
