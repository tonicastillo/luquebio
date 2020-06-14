import React from "react"
import {useSpring, animated} from 'react-spring'
import s from './close.module.scss'

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

export default CloseButton