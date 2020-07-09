import React from "react"
import s from './c_linea_de_tiempo.module.scss'
import { useSprings, animated as a } from "react-spring";
import Img from 'gatsby-image'
import useDimensions from "react-use-dimensions"
import { useMove } from 'react-use-gesture'
import _ from 'lodash'
 

// import LinkWithArrow from '../cLinkWithArrow'
const CLineaDeTiempo = (props) => {
    //onsole.log("CLineaDeTiempo")
    const { timeline } = props.data
    const ANCHO = 940;
    const MARGEN = 10;
    const ALTO = 340;
    const BOXANCHO = 480;
    const updateSprings = i => ({
        boxLeft: `${BOXANCHO*0.1*i}rem`,
        boxTransform: `translate3d(0rem,0,0)`,
        svgDeplacement: 1.0
    })
    const [mainSprings, setMainSprings] = useSprings(timeline.length, updateSprings) ;
    const [svgRef, svgSize] = useDimensions();
    
    const ratioPixel = ANCHO / svgSize.width

    const maxYear = _.maxBy(timeline, 'year').year
    const minYear = _.minBy(timeline, 'year').year
    const years = maxYear - minYear

    const moveBind = useMove((moveProps) => {
		const xPosPorUno = _.clamp(((moveProps.xy[0]-svgSize.x-(svgSize.width/8))/(svgSize.width/1.4)), 0, 1)
		// const { movement, canceled } = dragProps
		// const { down, delta: [xDelta], direction: [xDir], distance, cancel } = dragProps
		// if (!down && Math.abs(movement[0]) > window.innerWidth / 5) {
		//   if(!canceled) cancel((activeImage.current = _.clamp(activeImage.current + _.clamp((movement[0])*-1, -1, 1), 0, galeriaimages.length - 1)))
		// }
		// setSpringProps(i => {
		//   if (i < activeImage.current - 1 || i > activeImage.current + 1) return { display: 'none' }
		//   const x = (i - activeImage.current) * window.innerWidth + (down ? movement[0] : 0)
		//   const sc = 1
		//   return { x, sc, display: 'block' }
        // })
        setMainSprings(i => {
            // console.log(`translate3d(-${xPosPorUno*svgSize.width*.1}rem,0,0)`)
            return {
                boxLeft: `${BOXANCHO*0.1*i}rem`,
                boxTransform: `translate3d(-${xPosPorUno*(BOXANCHO*timeline.length-svgSize.width)*.1}rem,0,0)`,
                svgDeplacement: xPosPorUno
            }
        })
    })
    
    return (
        <div className={s.container} >
            <div className={s.boxes} >
                {mainSprings.map(({boxTransform, boxLeft}, i) => (
                    <a.div style={{
                        left: boxLeft,
                        transform: boxTransform
                    }}
                    className={s.box} key={i}>
                        <div className={s.ano}>{timeline[i].year}</div>
                        <Img
                            fluid={timeline[i].image.childImageSharp.fluid}
                            alt={timeline[i].description}
                            loading="eager"
                            backgroundColor="#666666"
                            objectFit="cover"
                            className={s.image}
                            backgroundColor="white"
                        />
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
                        M${posXAbajo},${ALTO}
                        L${posXAbajo},${ALTO*0.9}
                        C${posXAbajo},${ALTO*0.8}
                        ${posXAbajo},${ALTO*0.7}
                        ${0.5 * (posXAbajo + (BOXANCHO*i*ratioPixel - svgDeplacement*(BOXANCHO*timeline.length-svgSize.width) * ratioPixel))},${ALTO*0.6}
                        C${0.5 * (posXAbajo + (BOXANCHO*i*ratioPixel - svgDeplacement*(BOXANCHO*timeline.length-svgSize.width) * ratioPixel))},${ALTO*0.6}
                        ${BOXANCHO*i*ratioPixel - svgDeplacement*(BOXANCHO*timeline.length-svgSize.width) * ratioPixel},${ALTO*0.5}
                        ${BOXANCHO*i*ratioPixel - svgDeplacement*(BOXANCHO*timeline.length-svgSize.width) * ratioPixel},${0}
                        `})} stroke="#927758" />
                )
                )}
            </svg>
            <a.div {...moveBind()} className={s.touch} />
        </div>
    )
}


export default CLineaDeTiempo
