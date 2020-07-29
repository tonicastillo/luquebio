import React from "react"
import Img from 'gatsby-image/withIEPolyfill'

import SEO from "../components/seo"
import CLink from '../components/cLink'

import Content from "../components/c/content"
import Header from "../components/header"
import Footer from "../components/footer"

import Select from "../components/common/select"
import _ from 'lodash'
import s from './template-contacto.module.scss'
import { useSpring, animated as a, interpolate } from 'react-spring'
import { translations } from "../langs/translations"

// export const query = graphql`
// 	query($path: String!, $lang: String!){
// 		productoPage:pwPages(page_template: {eq: "PRODUCTOS"}, lang: {eq: $lang}) {
// 			page_url
// 		}
// 		pwPages(page_url: {eq: $path}) {
// 		...
// 	}
// `;

const ContactoTemplate = (props) => {
	
	return (
		<>
			<Header isHidenOnTop={false} pageContext={props.pageContext} />
			<div className='content_layout'>
				<SEO title="General" />
				<div className={s.contacto_page}>
					<h2 className={s.titulo}>{translations.contacto.contactaconnosotros[props.pageContext.lang]}</h2>
					<p className={s.intro}>{translations.contacto.masinfo[props.pageContext.lang]}</p>
					<div className={s.telyemail}>
						<p dangerouslySetInnerHTML={{__html:translations.contacto.infotel[props.pageContext.lang]}} />
						<p dangerouslySetInnerHTML={{__html:translations.contacto.infoemail[props.pageContext.lang]}} />
					</div>

					<form>
						<div className={s.formulario}>
								<div className={s.formulario_cols}>
								<div className={s.unafila}>
									<label for="name">{translations.contacto.nombre[props.pageContext.lang]}</label>
									<input type="text" />
								</div>
								<div className={s.unafila}>
									<label for="name">{translations.contacto.email[props.pageContext.lang]}</label>
									<input type="email" />
								</div>
								<div className={s.unafila}>
									<label for="name">{translations.contacto.telefono[props.pageContext.lang]}</label>
									<input type="phone" />
								</div>
								<div className={s.dosfilas}>
									<label for="name">{translations.contacto.mensaje[props.pageContext.lang]}</label>
									<textarea type="phone"></textarea>
								</div>
								<div className={s.unafila}>
									<div className={s.checkbox}><input type="checkbox" /><label for="name">{translations.contacto.acepto[props.pageContext.lang]}</label></div>
									<button>{translations.contacto.enviar[props.pageContext.lang]}</button>
								</div>
							</div>
						</div>
					</form>
					<div className={s.contactinfo}>
						<p dangerouslySetInnerHTML={{__html:translations.contacto.contact1[props.pageContext.lang]}} />
						<p dangerouslySetInnerHTML={{__html:translations.contacto.contact2[props.pageContext.lang]}} />
						<p dangerouslySetInnerHTML={{__html:translations.contacto.verengooglemaps[props.pageContext.lang]}} />

					</div>
				</div>
				
			</div>
			<Footer pageContext={props.pageContext} />

		</>
	)
}

export default ContactoTemplate
