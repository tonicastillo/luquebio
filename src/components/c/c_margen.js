import React from "react"
import s from './c_margen.module.scss'

const cMargen = (props) => {
    const { quantity } = props.data
    console.log(s)
    console.log(quantity)
    return (
        <div className={`${s.container} ${s[`por_${quantity}`]}`} />
    )
}


export default cMargen
