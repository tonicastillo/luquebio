
import CLink from './cLink'
import PropTypes from "prop-types"
import React from "react"

import s from './header.module.scss'

import Logo from '../images/luque-ecologico-logo-header-small.svg'

const Header = () => (
  <header className={s.header}
  >
    <h1>
      <CLink
        to="/"
      >
        <Logo />
      </CLink>
    </h1>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
