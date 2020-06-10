import React from "react"
import {useSpring, animated} from 'react-spring'

const Plus1 = (props) => {
    const { hover } = props
    // const [hover, setHover] = React.useState(false)
    const animStyle = useSpring(
        {
            rotation: hover ? 'rotate(270) scale(1.2)' : 'rotate(0) scale(1)',
        }
    )
    
    return(
        <animated.svg width="11" height="11" viewBox="0 0 11 11" fill="none" transform={animStyle.rotation} xmlns="http://www.w3.org/2000/svg">
            <animated.path d="M0 5.57959L11 5.57959" stroke="#91785B"/>
            <animated.path d="M5.5 11L5.5 -4.61936e-07" stroke="#91785B"/>
        </animated.svg>
    )
    
}

export default Plus1
