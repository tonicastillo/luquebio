import React, { useState } from "react"
import s from './select.module.scss'
import { navigate } from "gatsby"

const Select = (props) => {
    // const { to, title, text, type } = props //type = plus/arrow
    const { options, currentPage } = props
    return (
        <select className={s.selectCss} onChange={(e) => {
            navigate(e.target.value)
        }}>
            {options.map(option => (
                <option value={option.value} selected={option.value===currentPage} key={option.value}>{option.label}</option>
            ))}
        </select>
    )
}

export default Select