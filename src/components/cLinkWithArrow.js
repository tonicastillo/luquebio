import CLink from './cLink'
import React, { useState } from "react"
import Flecha1 from './animated_svg/flecha1'

const LinkWithArrow = (props) => {
    const { pos, type } = props //pos: 'left', 'right', type: big, ...
    const [hover, setHover] = useState(false)
    return (
        <CLink
            {...props}
            onMouseMove={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            isPaintDrip
        >
            { pos === 'left' ? <Flecha1 pos={pos} hover={hover} type={type} /> : null }
            <span>{props.children}</span>
            { pos === 'right' ? <Flecha1 pos={pos} hover={hover} type={type} />: null }
        </CLink>
    )
}

export default LinkWithArrow