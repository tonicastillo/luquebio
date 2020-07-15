import React, {useState, useLayoutEffect, useRef} from "react"
import s from './c_linea_de_tiempo.module.scss'
import { useSpring, useSprings, animated as a } from "react-spring";
import Img from 'gatsby-image'
import useDimensions from "react-use-dimensions"
// import { useMove, useDrag } from 'react-use-gesture'
import _ from 'lodash'
import { useWindowSize } from "../../helpers/screenSizeDetector"

const scrollToRef = (ref, direction) => {
    if(direction === 'right') {
        ref.current.scrollBy(typeof window === 'object' ? window.innerWidth*0.6 : 300, 0)
    } else {
        ref.current.scrollBy(typeof window === 'object' ? -window.innerWidth*0.6 : -300, 0)
    }
}

// import LinkWithArrow from '../cLinkWithArrow'
const CLineaDeTiempo = (props) => {
    //onsole.log("CLineaDeTiempo")
    const [scrollX, setScrollX] = useState(0)
    const boxScrollRef = useRef()
	const windowSize = useWindowSize()
    
    const scrollRef = useRef(null)
    const executeScroll = (direction) => {
        scrollToRef(scrollRef, direction)
    }

    const { timeline } = props.data
    const ANCHO = 940;
    const WindowWidth = typeof window === 'object' ? window.innerWidth : ANCHO - 20
    const MARGEN = 10;
    const ALTO = windowSize === 'mobile' ?  360000/WindowWidth : 340;
    const BOXANCHO = windowSize === 'mobile' ? (typeof window === 'object' ? window.innerWidth*0.8 : 480) : 480;
    const EMPUJEMOBILE = windowSize === 'mobile' ? 0.2 : 0
    const totalboxesancho = (BOXANCHO*timeline.length)
    const miraElScroll = (e) => { 
        const scrollX = e.target.scrollLeft
        const xPosPorUno = scrollX/(totalboxesancho-svgSize.width)
        setMainSprings(i => {
            return {
                boxLeft: `${BOXANCHO*0.1*i}rem`,
                boxTransform: `translate3d(-${xPosPorUno*(BOXANCHO*timeline.length-svgSize.width)*.1}rem,0,0)`,
                svgDeplacement: xPosPorUno,

            }
        })
    }
    const updateSprings = i => ({
        boxLeft: `${BOXANCHO*0.1*i}rem`,
        boxTransform: `translate3d(0rem,0,0)`,
        svgDeplacement: 0
    })
    const [mainSprings, setMainSprings] = useSprings(timeline.length, updateSprings) ;
    const [svgRef, svgSize] = useDimensions();


    const ratioPixel = ANCHO / svgSize.width

    const maxYear = _.maxBy(timeline, 'year').year
    const minYear = _.minBy(timeline, 'year').year
    const years = maxYear - minYear
    const yearsArray = []
    for (let index = minYear; index <= maxYear; index++) {
        yearsArray.push(index)
    }
    const yearsArrayx10 = []
    for (let index = minYear; index <= maxYear; index+=0.1) {
        yearsArrayx10.push(index)
    }
    return (
        <div className={s.container} >
            <div className={s.arrow_left} onClick={() => executeScroll('left')}>
                <svg width="10" height="16" viewBox="19 0 10 20" fill="none">
                    <path d="M27.63 9.37L18 19" stroke="#927758" strokeWidth="1.5"/>
                    <path d="M27.62 10.62L18 1" stroke="#927758" strokeWidth="1.5"/>
                </svg>
            </div>
            <div className={s.arrow_right} onClick={() => executeScroll('right')}>
                <svg width="10" height="16" viewBox="19 0 10 20" fill="none">
                    <path d="M27.63 9.37L18 19" stroke="#927758" strokeWidth="1.5"/>
                    <path d="M27.62 10.62L18 1" stroke="#927758" strokeWidth="1.5"/>
                </svg>
            </div>
            <div className={s.boxes} >
                {mainSprings.map(({boxTransform, boxLeft}, i) => (
                    <a.div style={{
                        left: boxLeft,
                        transform: boxTransform
                    }}
                    className={s.box} key={i}>
                        <div className={s.ano}>{timeline[i].year}</div>
                        { timeline[i].image ? 
                        <Img
                            fluid={timeline[i].image.childImageSharp.fluid}
                            alt={timeline[i].description}
                            loading="eager"
                            backgroundColor="#666666"
                            objectFit="cover"
                            className={s.image}
                            backgroundColor="white"
                        />
                        :
                        null}
                        <div className={s.text} dangerouslySetInnerHTML={{__html:timeline[i].htmltext}} />
                    </a.div>
                ))}
            </div>
            <svg ref={svgRef} width={ANCHO} height={ALTO} viewBox={`0 0 ${ANCHO} ${ALTO}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                {mainSprings.map(({ svgDeplacement }, i) => (
                    <a.path key={i} d={svgDeplacement.interpolate(svgDeplacement => {
                        const year = timeline[i].year - minYear
                        const yearPorUno = year / years
                        const posXAbajo = MARGEN + yearPorUno * (ANCHO - MARGEN * 2) 
                        return `
                        M${posXAbajo},${ALTO*0.94}
                        L${posXAbajo},${ALTO*0.82}
                        C${posXAbajo},${ALTO*(0.7+EMPUJEMOBILE*0.2)}
                        ${posXAbajo},${ALTO*(0.6+EMPUJEMOBILE*0.5)}
                        ${0.5 * (posXAbajo + (BOXANCHO*i*ratioPixel - svgDeplacement*(BOXANCHO*timeline.length-svgSize.width) * ratioPixel))},${ALTO*(0.5+EMPUJEMOBILE*0.7)}
                        C${0.5 * (posXAbajo + (BOXANCHO*i*ratioPixel - svgDeplacement*(BOXANCHO*timeline.length-svgSize.width) * ratioPixel))},${ALTO*(0.5+EMPUJEMOBILE*0.7)}
                        ${BOXANCHO*i*ratioPixel - svgDeplacement*(BOXANCHO*timeline.length-svgSize.width) * ratioPixel},${ALTO*(0.4+EMPUJEMOBILE*0.9)}
                        ${BOXANCHO*i*ratioPixel - svgDeplacement*(BOXANCHO*timeline.length-svgSize.width) * ratioPixel},${ALTO*(0.2+EMPUJEMOBILE)}
                        L${BOXANCHO*i*ratioPixel - svgDeplacement*(BOXANCHO*timeline.length-svgSize.width) * ratioPixel},${ALTO*(0)}
                        `})} stroke="#927758" />
                )
                )}
                {yearsArray.map((year, i) => {
                    const yearPorUno = i / (yearsArray.length -1 )
                    const posXAbajo = MARGEN + yearPorUno * (ANCHO - MARGEN * 2) 
                    return(
                    <path key={`year${year}`} d={`
                        M${posXAbajo},${ALTO*0.94}
                        L${posXAbajo},${ALTO*0.82}`}
                         stroke="#927758" />
                    )
                }
                )}
                {windowSize !== 'mobile' ? yearsArray.map((year, i) => {
                    const yearPorUno = i / (yearsArray.length -1 )
                    const posXAbajo = MARGEN + yearPorUno * (ANCHO - MARGEN * 2) 
                    return(
                    <text key={`year${year}text`} x={posXAbajo} y={ALTO*0.98} fill="#927758" style={{textAnchor: 'middle'}}>{year}</text>
                    )
                }
                ) : null}
                
                {yearsArrayx10.map((year, i) => {
                    const yearPorUno = i / (yearsArrayx10.length -1)
                    const posXAbajo = MARGEN + yearPorUno * (ANCHO - MARGEN * 2) 
                    return(
                    <path key={`year${year}`} d={`
                        M${posXAbajo},${ALTO*0.94}
                        L${posXAbajo},${ALTO*0.9}`}
                         stroke="#927758" />
                    )
                }
                )}
            </svg>
            {/* <a.div {...moveBind()} {...dragBind()} className={s.touch} /> */}
            <a.div ref={scrollRef} className={s.scrollbox} onScroll={(el) => miraElScroll(el)}>
                <a.div style={{
                    width: `${totalboxesancho*0.1}rem`
                }} />
            </a.div>
        </div>
    )
}


export default CLineaDeTiempo
