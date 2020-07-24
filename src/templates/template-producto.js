import React from "react"
import SEO from "../components/seo"
import CLink from '../components/cLink'
import _ from 'lodash'
import Img from 'gatsby-image'

// import Content from "../components/c/content"
import Header from "../components/header"
import Footer from "../components/footer"

import s from './template-producto.module.scss'

export const query = graphql`
	query($path: String!){
		pwPages(page_url: {eq: $path}) {
			pwid
			title
			page_url
			lang
			page_template
			producto_titulo_sencillo
			producto_texto_izquierda
			producto_texto_derecha
			producto_subtitulo
			producto_imagen {
				url
				description
				image {
					childImageSharp {
						fluid(maxWidth: 512, quality: 50) {
							...GatsbyImageSharpFluid_withWebp
							aspectRatio
						}
					}
				}
			}
			producto_envase
			producto_categoria
			producto_caracteristicas
		}
		categorias:allPwPages(filter: {page_template: {eq: "CATEGORIA"}, lang: {eq: "es"}}) {
			nodes {
			  title
			  page_url
			}
		}
		productos:pwPages(page_template: {eq: "PRODUCTOS"}, lang: {eq: "es"}) {
			page_url
			title
		}
	}
`;

const GeneralTemplate = (props) => {
	const producto = props.data.pwPages
	const productosPage = props.data.productos
	const categorias = props.data.categorias
	const categoria = _.find(categorias.nodes, {page_url: producto.producto_categoria})
	return (
		<>
			<Header isHidenOnTop={false} pageContext={props.pageContext} />
			<div className='content_layout'>
				<SEO title="General" />
				<div>
					<nav className={s.titulo}><CLink to={productosPage.page_url}>{productosPage.title}</CLink> | <CLink to={categoria.page_url}>{categoria.title}</CLink> </nav>
					<h1 className={s.intro}>{producto.producto_titulo_sencillo}</h1>
					<h2 className={s.subtitulo}>{producto.producto_subtitulo}</h2>
					<div className={s.fila1}>
						<div className={s.image_container}>
							{
								producto.producto_imagen.image ? 
								<Img
									fluid={producto.producto_imagen.image.childImageSharp.fluid}
									alt={producto.producto_imagen.description}
									loading="eager"
									backgroundColor="#333"
									objectFit="contain"
									style={{
										maxHeight: '100%',
									}}
									imgStyle={{ objectFit: "contain" }}
								/>
								:
								null
							}
						</div>
						<div className={s.textoFila1}>
							<div className={s.envase}>{producto.producto_envase}</div>
							<div className={s.caracteristicas} dangerouslySetInnerHTML={{__html:producto.producto_caracteristicas}} />
							<div className={s.fila2}>
								<div className={s.textoIzquierdaFila2}>
									<div dangerouslySetInnerHTML={{__html:producto.producto_texto_izquierda}} />
								</div>
								<div className={s.textoDerechaFila2}>
									<div dangerouslySetInnerHTML={{__html:producto.producto_texto_derecha}} />
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
			<Footer pageContext={props.pageContext} />
		</>
	)
}

export default GeneralTemplate
