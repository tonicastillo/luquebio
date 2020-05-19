import React from "react"
import {useSpring, animated} from 'react-spring'

const Flecha1 = (props) => {
    const { hover } = props
    // const [hover, setHover] = React.useState(false)
    const animStyle = useSpring(
        {
            offset1: hover ? 15 : 0,
            offset2: hover ? 3 : 0,
            offset3: hover ? 3 : 0,
        }
    )
    return(
        <animated.svg width="29" height="20" viewBox="0 0 29 20" fill="none">
            <animated.path d="M26 9.94067H0" stroke="#90785B" strokeWidth="2" strokeDashoffset={animStyle.offset1} strokeDasharray="26" />
            <animated.path d="M27.63 9.37L18 19" stroke="#90785B" strokeWidth="2" strokeDashoffset={animStyle.offset2} strokeDasharray="13.62" />
            <animated.path d="M27.62 10.62L18 1" stroke="#90785B" strokeWidth="2" strokeDashoffset={animStyle.offset3} strokeDasharray="13.62" />
        </animated.svg>
    )
}

export default Flecha1