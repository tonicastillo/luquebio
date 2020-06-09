import React, { useState } from "react"
import CLink from '../cLink'
import Flecha1 from '../animated_svg/flecha1'
import s from './button.module.scss'

const Button = (props) => {
    const { to, text } = props
    const [hover, setHover] = useState(false)
    return (
        <CLink
            className={s.container}
            to={to}
            onMouseMove={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <span>{text}</span>
            <Flecha1 hover={hover} type={"big"} />
        </CLink>
    )
}

export default Button