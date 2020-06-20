import React, { useState, useRef } from "react"
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
    return (
        <div className={s.container}>
            <div className={s.images}>
                {cabecera.images.map(image => (
                    <div key={image.url}>
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
                    </div>
                ))}
            </div>
            <div className={s.text}>
                <h1>{title}</h1>
                <h2>{cabecera.text}</h2>
            </div>
        </div>
    )
}

export default CabeceraGeneral
