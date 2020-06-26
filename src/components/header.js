
import CLink from './cLink'
import React, { useState, useLayoutEffect } from "react"
import { useSpring, animated as a, interpolate } from 'react-spring'


import s from './header.module.scss'

import Menu from './menu'

import Logo from '../images/luque-ecologico-logo-header-small.svg'

const Header = (props) => {
  const { pageContext, dummy } = props
  const pageTemplate = typeof pageContext === 'undefined' ? '' : pageContext.page_template
  // const { isHidenOnTop } = props //TODO
  const [ isScrolled, setIsScrolled ] = useState(false)
  
  const animStyleH1 = useSpring({
    opacity: isScrolled || pageTemplate!=='INICIO' ? 1 : 0,
  })
  const animStyleHeader = useSpring({
    backgroundColor: isScrolled || pageTemplate!=='INICIO' ? 'rgba(256,256,256,1)' : 'rgba(256,256,256, 0)',
  })
  // const animStyleMenuButton = useSpring({
  //   transform: isScrolled || pageTemplate!=='INICIO' ? 'trasnlate3d(-2rem,2rem,0)' : 'translate3d(0,0,0)',
  // })
  
  
  useLayoutEffect(() => {
    const miraElScroll = () => { 
      if (window.pageYOffset > 30) {
        setIsScrolled(true)

      } else {
        setIsScrolled(false)
      }

    }
    window.addEventListener('scroll', miraElScroll)
    return () => {
      window.removeEventListener('scroll', miraElScroll)
    }
  }, [isScrolled])

  return(<a.header style={animStyleHeader} className={`${s.header} ${dummy ? s.header_dummy :''} ${pageContext && pageTemplate === 'POPUP' ? s.header_hidden :''}`}
    >
      <div className={s.header_content}>
        <a.h1 style={animStyleH1}>
          <CLink
            to="/"
          >
            <Logo
            
            />
            <span>Luque Ecológico</span>
          </CLink>
        </a.h1>
        { !dummy ?
        <Menu
          isHomeHeaderMode={!isScrolled && pageContext.page_template==='INICIO'}
          pageContext={pageContext}
        />
        :
        <div />
        }
      </div>
    </a.header>
    
  )
}
  

export default Header
