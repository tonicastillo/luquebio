/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
// import CookieConsent from "react-cookie-consent";
import { translations } from "../langs/translations"
import CLink from './cLink'

import './layout.scss'
import '../styles/_klaro.scss'
import s from './layout.module.scss'

const Layout = (props) => {
  const { children, pageContext } = props
  const { lang } = pageContext
  console.log("layoutprops", props);
  //onsole.log("Layout props:")
  //onsole.log(props)
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <>
      {children}
      {/* <CookieConsent
				location="none"
				buttonText={translations.cookiesAlertAccept[lang]}
				enableDeclineButton
				declineButtonText={translations.cookiesAlertCancel[lang]}
				cookiesAlertAccept
				cookieName="gatsby-gdpr-google-analytics"
				containerClasses={s.cookiesContainer}
				buttonStyle={{ color: "white",  background: "black" }}
				declineButtonStyle={{ color: "white", background: "rgba(180,0,0)" }}
				expires={150}
				disableStyles={true}
		>
				{lang == 'es' ? 
				<div>Este sitio web utiliza cookies propias y de terceros para el correcto funcionamiento y visualización del sitio web por parte del usuario, así como la recogida de estadísticas tal y como se recoge en la política de cookies en la columna "finalidad". Si continúa navegando, consideramos que acepta su uso. Puede cambiar la configuración u obtener más información visitando nuestra <CLink to='/politica-cookies/'>Política de Cookies</CLink>.</div>
        :
        (
          lang == 'fr' ? 
          <div>Ce site web utilise ses propres cookies et ceux de tiers pour le bon fonctionnement et la visualisation du site web par l'utilisateur, ainsi que pour la collecte de statistiques comme indiqué dans la politique en matière de cookies dans la colonne "objectif". Si vous continuez à naviguer, nous considérons que vous acceptez leur utilisation. Vous pouvez modifier les paramètres ou obtenir de plus amples informations en consultant notre <CLink to='/cookies-policy/'>politique en matière de cookies</CLink>.</div>
          :
  				<div>This website uses its own and third-party cookies for the correct operation and visualization of the website by the user, as well as the collection of statistics as set out in the cookies policy in the "purpose" column. By continuing to use this website, you agree to the use of cookies. You can change the settings or get more information <CLink to='/cookies-policy/'>here</CLink>.</div>
        )
				}
	  	</CookieConsent> */}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
