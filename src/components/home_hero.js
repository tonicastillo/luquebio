import CLink from './cLink'
import React, { useState } from "react"
import {useSpring, animated} from 'react-spring'

import 'objectFitPolyfill'

import s from './home_hero.module.scss'

import SvgTitle from '../images/home-hero-logo-vertical.svg'
import SvgSocialImageFacebook from '../images/social-facebook.svg'
import SvgSocialImageIntagram from '../images/social-instagram.svg'
import SvgSocialImageTwitter from '../images/social-twitter.svg'

const HomeHero = () => {
    
    // let videoUrl = `${(window.location.protocol !== 'https:' ? 'https:' : 'https')}//luque.tonicastillo.com/site/assets/files/1/luque_ecologico_sin_mosca_con_filtro_oscuro.mp4`
    return (
        <div className={s.container}>
            <div className={s.video_container}>
                <video data-object-fit="cover" autoPlay loop muted>
                    <source type="video/mp4" src="//luque.tonicastillo.com/site/assets/files/1/luque_ecologico_sin_mosca_con_filtro_oscuro2.mp4" />
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
                        <LinkBox>
                            <span>Somos</span>
                            <ul>
                                <li><CLink to="/">TRADICIÓN E HISTORIA</CLink></li>
                                <li><CLink to="/">FAMILIAR</CLink></li>
                                <li><CLink to="/">VALORES</CLink></li>
                                <li><CLink to="/">COMUNIDAD</CLink></li>
                                <li><CLink to="/">CALIDAD</CLink></li>
                            </ul>
                        </LinkBox>
                        <LinkBox>
                            <span>Ecológico</span>
                            <ul>
                                <li><CLink to="/">TRADICIÓN E HISTORIA</CLink></li>
                                <li><CLink to="/">VALORES</CLink></li>
                                
                            </ul>
                        </LinkBox>
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
    const { children } = props
    return (
        <animated.div>
            {children}
        </animated.div>
    )
}

export default HomeHero
