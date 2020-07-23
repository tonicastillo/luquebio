
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
      <div>
        <ul className={s.block2_social}>
            <li><CLink to="/"><span>Facebook</span><SvgSocialImageFacebook /></CLink></li>
            <li><CLink to="/"><span>Instagram</span><SvgSocialImageIntagram /></CLink></li>
            <li><CLink to="/"><span>Twitter</span><SvgSocialImageTwitter /></CLink></li>
        </ul>
        <ul className={s.block2_langs}>
            { processwire.langs.map(lang => (
                <li key={lang.code} ><CLink to={_.find(props.pageContext.versions, {lang: lang.code}).page_url}>{lang.title}</CLink></li>
            ))}
        </ul>
        <div className={s.block2_legal}>
            <CLink to="/" >Avisos legales</CLink>
        </div>
      </div>
  )
}
  

export default Footer
