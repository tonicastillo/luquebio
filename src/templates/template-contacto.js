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

export const query = graphql`
	query($path: String!){
		pwPages(page_url: {eq: $path}) {
			childrenpages {
				page_url
			}
		}
	}
`;

const ContactoTemplate = (props) => {
	const callbackUrl = _.get(props, 'location.origin') + _.get(props, 'data.pwPages.childrenpages[0].page_url')
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

					<form action="http://luque.tonicastillo.com/form/" method="post">
						<div className={s.formulario}>
								<div className={s.formulario_cols}>
								<div className={s.unafila}>
									<label htmlFor="nombre">{translations.contacto.nombre[props.pageContext.lang]}</label>
									<input type="text" name="nombre" required="required" />
								</div>
								<div className={s.unafila}>
									<label htmlFor="email">{translations.contacto.email[props.pageContext.lang]}</label>
									<input type="email" name="email" required="required" />
								</div>
								<div className={s.unafila}>
									<label htmlFor="telefono">{translations.contacto.telefono[props.pageContext.lang]}</label>
									<input type="phone" name="telefono" />
								</div>
								<div className={s.dosfilas}>
									<label htmlFor="mensaje">{translations.contacto.mensaje[props.pageContext.lang]}</label>
									<textarea name="mensaje" required="required"></textarea>
								</div>
								<div className={s.unafila}>
									<div className={s.checkbox}><input type="checkbox" id="acepta" name="acepta" required="required" /><label htmlFor="acepta">{translations.contacto.acepto[props.pageContext.lang]}</label></div>
									<input type="hidden" name="idioma" value={props.pageContext.lang} />
									<input type="hidden" name="callbackurl" value={callbackUrl} />
									<button type="submit" name="submit" value="1">{translations.contacto.enviar[props.pageContext.lang]}</button>
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
