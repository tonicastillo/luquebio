
import CLink from './cLink'
import React from "react"

import s from './header.module.scss'

import Menu from './menu'

import Logo from '../images/luque-ecologico-logo-header-small.svg'

const Header = (props) => {
  const { pageContext, dummy } = props
  console.log('pageContext')
  if(pageContext)
    console.log(pageContext.page_template)
  // const { isHidenOnTop } = props //TODO
  return(<header className={`${s.header} ${dummy ? s.header_dummy :''} ${pageContext && pageContext.page_template === 'POPUP' ? s.header_hidden :''}`}
    >
      <div className={s.header_content}>
        <h1>
          <CLink
            to="/"
          >
            <Logo />
            <span>Luque Ecológico</span>
          </CLink>
        </h1>
        { !dummy ?
        <Menu pageContext={pageContext} />
        :
        <div />
        }
      </div>
    </header>
    
  )
}
  

export default Header
