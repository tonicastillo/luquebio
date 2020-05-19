import CLink from './cLink'
import React, { useState } from "react"
import {useSpring, animated} from 'react-spring'

import s from './menu.module.scss'

import Flecha1 from './animated_svg/flecha1'

const Menu = () => {

    
    return(
        <div className={s.container}
        >
            <MenuClosedButton />
            <animated.div className={s.menu_container}>
                <animated.nav className={s.menu_content}>
                    <CloseButton />
                    <div className={s.block1}>
                        <CLink to="/" className={s.b_inicio}>Inicio</CLink>
                        <LinkWithArrow to="/" className={s.b_productos} pos="right" type="big">Nuestros Productos</LinkWithArrow>
                        <div className={s.box}>
                            <strong>Somos</strong>
                            <CLink to="/">Nuestros Productos</CLink>
                            <CLink to="/">Nuestros Productos</CLink>
                            <CLink to="/">Nuestros Productos</CLink>
                            <CLink to="/">Nuestros Productos</CLink>
                            <CLink to="/">Nuestros Productos</CLink>
                        </div>
                        <div className={s.box}>
                            <strong>Somos</strong>
                            <CLink to="/">Nuestros Productos</CLink>
                            <CLink to="/">Nuestros Productos</CLink>
                        </div>
                        <div className={s.oneline}>
                            <CLink to="/">Nuestros Productos</CLink>
                            <CLink to="/">Nuestros Productos</CLink>
                        </div>
                    </div>
                    <div className={s.block2}>
                        <ul>
                            <li><CLink to="/">Español</CLink></li>
                            <li><CLink to="/">Français</CLink></li>
                            <li><CLink to="/">English</CLink></li>
                        </ul>
                        <div>
                            <ul>
                                <li><CLink to="/">Facebook</CLink></li>
                                <li><CLink to="/">Instagram</CLink></li>
                                <li><CLink to="/">Twitter</CLink></li>
                            </ul>
                            <CLink to="/">Avisos legales</CLink>
                        </div>
                    </div>
                </animated.nav>
            </animated.div>
        </div>
    )
}






const MenuClosedButton = () => {
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
        onMouseLeave={() => setAnimStyle(animStyleDefault)}>
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

const CloseButton = () => {
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
        onMouseLeave={() => setAnimStyle(animStyleDefault)}>
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
    const { pos, type } = props //pos: 'left', 'right', type: 'big', 'small'
    const [hover, setHover] = useState(false)
    return (
        <CLink
            {...props}
            onMouseMove={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            { pos === 'left' ? <Flecha1 pos={pos} hover={hover} /> : null }
            {props.children}
            { pos === 'right' ? <Flecha1 pos={pos} hover={hover} />: null }
        </CLink>
    )
}
export default Menu
