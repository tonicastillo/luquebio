
import CLink from './cLink'
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import _ from 'lodash'

import SvgSocialImageFacebook from '../images/social-facebook.svg'
import SvgSocialImageIntagram from '../images/social-instagram.svg'
import SvgSocialImageTwitter from '../images/social-twitter.svg'

import s from './footer.module.scss'


const Footer = (props) => {
  const { processwire } = useStaticQuery(
    graphql`
      query {
        processwire {
            langs {
                title
                code
            }
            submenus {
              title
              pwid
              lang
            }
            pages {
              title
              pwid
              page_url
              lang
              submenu {
                pwid
              }
              page_template
              parentpage {
                page_template
              }
            }
        }
      }
    `
  )
  return(
      <div className={`content_layout ${s.footer_container}`}>
        <div className={s.footer}>
          <ul className={s.block2_langs}>
              { processwire.langs.map(lang => (
                  <li key={lang.code} ><CLink to={_.find(props.pageContext.versions, {lang: lang.code}).page_url}>{lang.title}</CLink></li>
              ))}
          </ul>
          <ul className={s.block2_social}>
            <li><a href="https://www.facebook.com/luqueecologico/" target="_blank"><span>Facebook</span><SvgSocialImageFacebook /></a></li>
            <li><a href="https://www.instagram.com/luqueorganic/" target="_blank"><span>Instagram</span><SvgSocialImageIntagram /></a></li>
            <li><a href="https://twitter.com/ecologicoluque" target="_blank"><span>Twitter</span><SvgSocialImageTwitter /></a></li>
          </ul>
          
          <div className={s.block2_legal}>
            { _.filter(processwire.pages, page => {
                    return (page.page_template === 'LEGAL' ) && page.parentpage.page_template === 'INICIO' && page.lang === props.pageContext.lang 
                }).map(page => (
                <CLink key={page.pwid} to={page.page_url}>{page.title}</CLink>
            ))}
          </div>
        </div>
      </div>
  )
}
  

export default Footer
