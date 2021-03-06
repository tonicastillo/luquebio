import CLink from './cLink'
import React, { useState, useLayoutEffect } from "react"
import { useSpring, animated as a, interpolate } from 'react-spring'
import { useStaticQuery, graphql } from "gatsby"

import _ from 'lodash'

import s from './header.module.scss'

import Menu from './menu'

import Logo from '../images/luque-ecologico-logo-header-small.svg'

const Header = (props) => {
  const { allPwPages } = useStaticQuery(
    graphql`
     query{
        allPwPages(filter: {page_template: {eq: "INICIO"}}) {
          nodes {
            page_url
            title
            lang
          }
        }
      }
    `
  )

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
  // ${pageContext && pageTemplate === 'POPUP' ? s.header_hidden :''}
  return(<a.header style={animStyleHeader} className={`${s.header} ${dummy ? s.header_dummy :''}`}
    >
      <div className={s.header_content}>
        <a.h1 style={animStyleH1}>
          <CLink
            to={_.find(allPwPages.nodes, {lang: props.pageContext.lang}).page_url}
            title={_.find(allPwPages.nodes, {lang: props.pageContext.lang}).title}
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
