import React, { useState, useEffect } from "react"
// import {useTransition, useSpring, useChain, config, useTrail, animated} from 'react-spring'
// import { useStaticQuery, graphql } from "gatsby"
// import { useMeasure } from "react-use"
// import _ from 'lodash'
import Img from 'gatsby-image/withIEPolyfill'
import {useSpring, animated} from 'react-spring'
import { easeCubicOut } from 'd3-ease'

import 'objectFitPolyfill'

import s from './cabecera_general.module.scss'

const CabeceraGeneral = (props) => {
    const { cabecera, title } = props
    
    const [time, setTime] = useState(0);
    
    useEffect(() => {
        const timerID = setInterval( () => updateTime(), 6000 );
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const updateTime = () => {
        if(time + 1 >= cabecera.images.length){
            setTime(0)
        } else {
            setTime(time + 1)
        }
    }
    
    
    const animStyleH1 = useSpring(
        {
            from: { transform: "translate(-60%,0)" },
            to: { transform: "translate(0%,0)" },
            config: {
                duration: 1700,
                easing: easeCubicOut
            },
        }
    )
    const animStyleH2 = useSpring(
        {
            from: {
                transform: "translate(-100%,0)"
            },
            to: {
                transform: "translate(0%,0)"
        },
            config: {
                duration: 2400,
                easing: easeCubicOut
            },
        }
    )
    if(!cabecera){
        return null
    }
    if(!cabecera.images){
        return null
    }
    if(cabecera.images.length===0) return null
    return (
        <div className={s.container}>
            <div className={s.images}>
                {cabecera.images.map((image, index) => (
                    <CabeceraGeneralImagen key={image.url} image={image} active={index===time} />
                ))}
            </div>
            <div className={s.text}>
                <animated.h1 style={animStyleH1}>{title}</animated.h1>
                <animated.h2 style={animStyleH2}>{cabecera.text}</animated.h2>
            </div>
        </div>
    )
}


const CabeceraGeneralImagen = (props) => {
    const { image, active } = props 
    const animStyle = useSpring(
        {
            opacity: active ? 1 : 0,
            transform: active ? 'scale(1)' : 'scale(1.04)',
            config: { duration: 2000 },
        }
    )
    return(
        <animated.div style={animStyle}>
            <Img
                fluid={image.image.childImageSharp.fluid}
                alt={image.description}
                loading="eager"
                backgroundColor="#333"
                objectFit="cover"
                objectPosition={`${image.focus.left}% ${image.focus.top}%`}
                style={{
                    height: '100%'
                }}
            />
        </animated.div>
    ) 
}

export default CabeceraGeneral
