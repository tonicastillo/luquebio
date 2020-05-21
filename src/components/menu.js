import CLink from './cLink'
import React, { useState } from "react"
import {useSpring, animated} from 'react-spring'

import s from './menu.module.scss'

import Flecha1 from './animated_svg/flecha1'

import SvgSocialImageFacebook from '../images/social-facebook.svg'
import SvgSocialImageIntagram from '../images/social-instagram.svg'
import SvgSocialImageTwitter from '../images/social-twitter.svg'

const Menu = () => {
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
                            <div className={s.box}>
                                <strong>Somos</strong>
                                <LinkWithArrow to="/" className={`${s.b_flecha_a_la_derecha} ${s.b_flecha_pequena}`} pos="right">Tradición e historia</LinkWithArrow>
                                <LinkWithArrow to="/" className={`${s.b_flecha_a_la_derecha} ${s.b_flecha_pequena}`} pos="right">Familiar</LinkWithArrow>
                                <LinkWithArrow to="/" className={`${s.b_flecha_a_la_derecha} ${s.b_flecha_pequena}`} pos="right">Valores</LinkWithArrow>
                                <LinkWithArrow to="/" className={`${s.b_flecha_a_la_derecha} ${s.b_flecha_pequena}`} pos="right">Comunidad</LinkWithArrow>
                                <LinkWithArrow to="/" className={`${s.b_flecha_a_la_derecha} ${s.b_flecha_pequena}`} pos="right">Calidad</LinkWithArrow>
                            </div>
                            <div className={s.box}>
                                <strong>Ecológico</strong>
                                <LinkWithArrow to="/" className={`${s.b_flecha_a_la_derecha} ${s.b_flecha_pequena}`} pos="right">Medio ambiente</LinkWithArrow>
                                <LinkWithArrow to="/" className={`${s.b_flecha_a_la_derecha} ${s.b_flecha_pequena}`} pos="right">Biodiversidad</LinkWithArrow>
                            </div>
                        </div>
                        <div className={s.oneline}>
                            <LinkWithArrow to="/" className={`${s.b_flecha_a_la_derecha}`} pos="right" type="big">Visítanos</LinkWithArrow>
                            <LinkWithArrow to="/" className={`${s.b_flecha_a_la_derecha}`} pos="right" type="big">Contacto</LinkWithArrow>
                        </div>
                    </div>
                    <div className={s.block2}>
                        <ul className={s.block2_langs}>
                            <li><CLink to="/">Español</CLink></li>
                            <li><CLink to="/">Français</CLink></li>
                            <li><CLink to="/">English</CLink></li>
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

const LinkWithArrow = (props) => {
    const { pos, type } = props //pos: 'left', 'right', type: big, ...
    const [hover, setHover] = useState(false)
    return (
        <CLink
            {...props}
            onMouseMove={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            { pos === 'left' ? <Flecha1 pos={pos} hover={hover} type={type} /> : null }
            <span>{props.children}</span>
            { pos === 'right' ? <Flecha1 pos={pos} hover={hover} type={type} />: null }
        </CLink>
    )
}

export default Menu
