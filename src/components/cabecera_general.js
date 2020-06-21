import React, { useState, useEffect } from "react"
// import {useTransition, useSpring, useChain, config, useTrail, animated} from 'react-spring'
// import { useStaticQuery, graphql } from "gatsby"
// import { useMeasure } from "react-use"
// import _ from 'lodash'
import Img from 'gatsby-image/withIEPolyfill'
import {useSpring, animated} from 'react-spring'

import 'objectFitPolyfill'

import s from './cabecera_general.module.scss'

const CabeceraGeneral = (props) => {
    const { cabecera, title } = props
    console.log('CabeceraGeneral')                                                                                                                                                   
    console.log(title)

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
                                                                                                                                                 
    return (
        <div className={s.container}>
            <div className={s.images}>
                {cabecera.images.map((image, index) => (
                    <CabeceraGeneralImagen key={image.url} image={image} active={index===time} />
                ))}
            </div>
            <div className={s.text}>
                <h1>{title}</h1>
                <h2>{cabecera.text}</h2>
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
