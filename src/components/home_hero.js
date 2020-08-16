import CLink from './cLink'
import React, { useState, useRef } from "react"
import {useTransition, useSpring, useChain, config, useTrail, animated as a} from 'react-spring'
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
      const { homeData } = props
      //onsole.log(homeData)
      const videoUrlOriginal = homeData.video.url.replace('http','')
          
        let videoUrl= `${(typeof window !== 'undefined' && window.location.protocol !== 'https:' ? 'http' : 'https')}${videoUrlOriginal}`
    return (
        <div className={s.container}>
            <div className={s.video_container}>
                <video data-object-fit="cover" autoPlay loop muted>
                    <source type="video/mp4" src={videoUrl} />
                    <img src={homeData.image.image.childImageSharp.resize.src} />
                </video>
            </div>
            <div className={s.content}>
                <div className={s.title}>
                    <SvgTitle />
                    <span>Luque Ecológico</span>
                </div>
                <div className={s.main_block}>
                    <h2 dangerouslySetInnerHTML={{__html:homeData.text}} />
                    <nav>
                        { _.filter(processwire.submenus, {lang: props.pageContext.lang}).map(submenu => (
                            <LinkBox
                                key={submenu.title}
                                title={submenu.title}
                                links={_.filter(processwire.pages, {submenu: {pwid: submenu.pwid}, lang: props.pageContext.lang})}
                            />
                        )) }
                    </nav>
                </div>
                <div className={s.bottom_block}>
                    <ul className={s.langs}>
                            { processwire.langs.map(lang => (
                                <li key={lang.code}><CLink to={_.find(props.pageContext.versions, {lang: lang.code}).page_url}>{lang.title}</CLink></li>
                            ))}
                    </ul>
                    <ul className={s.social}>
                        <li><a href="https://www.facebook.com/luqueecologico/" target="_blank"><span>Facebook</span><SvgSocialImageFacebook /></a></li>
                        <li><a href="https://www.instagram.com/luqueorganic/" target="_blank"><span>Instagram</span><SvgSocialImageIntagram /></a></li>
                        <li><a href="https://twitter.com/ecologicoluque" target="_blank"><span>Twitter</span><SvgSocialImageTwitter /></a></li>
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
    const listSpring = useSpring({
        // config: config.stiff,
        from: { transform: 'translate(0px, 30px)' },
        to: isOpen ?
            {
                transform: 'translate(0px, 0px)'
            }
            :
            {
                transform: 'translate(0px, 30px)'
            }
    })
    useChain(isOpen ? [boxSpringRef, linksSpringRef] : [linksSpringRef, boxSpringRef], [0, isOpen ? 0.1 : 0])

    return (
        <a.div style={{ height: boxSpring.height }} onClick={() => setIsOpen(isOpen => !isOpen)}>
            <div ref={boxRef}>
                <span>{title}</span>
                <a.ul style={listSpring}>
                    {linkTrail.map((trail, i) => (
                        <a.li
                            key={i}
                            style={trail} ><LinkWithArrow to={links[i].page_url} pos="right" >{links[i].title}</LinkWithArrow></a.li>
                    ))}
                </a.ul>
            </div>
            <a.div style={{ transform: boxSpring.transform }} className={s.navBoxPlusClose} />
        </a.div>
    )
}

export default HomeHero
