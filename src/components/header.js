
import CLink from './cLink'
import React from "react"

import s from './header.module.scss'

import Menu from './menu'

import Logo from '../images/luque-ecologico-logo-header-small.svg'

const Header = () => (
  <header className={s.header}
  >
    <h1>
      <CLink
        to="/"
      >
        <Logo />
        <span>Luque Ecológico</span>
      </CLink>
    </h1>
    <Menu />
  </header>
)

export default Header
