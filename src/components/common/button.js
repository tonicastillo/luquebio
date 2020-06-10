import React, { useState } from "react"
import CLink from '../cLink'
import Flecha1 from '../animated_svg/flecha1'
import Plus1 from '../animated_svg/plus1'
import s from './button.module.scss'

const Button = (props) => {
    const { to, title, text, type } = props //type = plus/arrow
    const [hover, setHover] = useState(false)
    return (
        <CLink
            className={`${s.container} ${s[`type__${type}`]}`}
            to={to}
            onMouseMove={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div>
                {
                    title ?
                    <span>{title}</span>
                    : null
                }
                {
                    text ?
                    <strong>{text}</strong>
                    : null
                }
            </div>
            {
                type === 'plus' ?
                <Plus1 hover={hover} />
                :
                <Flecha1 hover={hover} type={"big"} />
            }
        </CLink>
    )
}

export default Button