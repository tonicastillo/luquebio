import React from "react"
import s from './c_destacado.module.scss'

const CDestacado = (props) => {
    const { htmltext, has_border_top, has_border_bottom } = props.data
    return (
        <div className={`${s.container} ${has_border_top ? s.has_border_top : ''}  ${has_border_bottom ? s.has_border_bottom : ''}`} dangerouslySetInnerHTML={{__html:htmltext}}></div>
    )
}


export default CDestacado
