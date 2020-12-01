import React from "react"
import SEO from "../components/seo"
import CLink from "../components/cLink"
import _ from "lodash"
import Img from "gatsby-image/withIEPolyfill"

// import Content from "../components/c/content"
import Header from "../components/header"
import Footer from "../components/footer"

import s from "./template-producto.module.scss"
import { decodeHTMLEntities } from "../helpers/decodeHTMLEntities"

export const query = graphql`
	query($path: String!, $lang: String!) {
		pwPages(page_url: { eq: $path }) {
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
			producto_certificaciones
		}
		categorias: allPwPages(
			filter: { page_template: { eq: "CATEGORIA" }, lang: { eq: $lang } }
		) {
			nodes {
				title
				page_url
			}
		}
		productos: pwPages(
			page_template: { eq: "PRODUCTOS" }
			lang: { eq: $lang }
		) {
			page_url
			title
		}
		certificaciones: allPwCertificaciones(filter: { lang: { eq: $lang } }) {
			nodes {
				pwid
				title
				image {
					url
					image {
						childImageSharp {
							fluid(maxWidth: 512) {
								...GatsbyImageSharpFluid_withWebp
								aspectRatio
							}
						}
					}
				}
			}
		}
	}
`

const GeneralTemplate = props => {
	const producto = props.data.pwPages
	const productosPage = props.data.productos
	const categorias = props.data.categorias
	const categoria = _.find(categorias.nodes, {
		page_url: producto.producto_categoria,
	})
	const certificacones = _.filter(
		props.data.certificaciones.nodes,
		certificacion => {
			return _.find(producto.producto_certificaciones, value => {
				return value == certificacion.pwid
			})
		}
	)
	// certificacones.map(certificacion => {
	// 	console.log(`padding-top: ${0.01*Math.round(100*(1/certificacion.image.image.childImageSharp.fluid.aspectRatio))}rem`)
	// })

	return (
		<>
			<Header isHidenOnTop={false} pageContext={props.pageContext} />
			<div className="content_layout">
				<SEO title="General" />
				<div>
					<nav className={s.titulo}>
						<CLink to={productosPage.page_url}>
							{decodeHTMLEntities(productosPage.title)}
						</CLink>{" "}
						|{" "}
						{categoria ? (
							<CLink to={categoria.page_url}>
								{decodeHTMLEntities(categoria.title)}
							</CLink>
						) : null}{" "}
					</nav>
					<h1 className={s.intro}>{producto.producto_subtitulo}</h1>
					<h2 className={s.subtitulo}>
						{producto.producto_titulo_sencillo}
					</h2>
					<div className={s.fila1}>
						<div className={s.image_container}>
							{producto.producto_imagen.image ? (
								<Img
									fluid={
										producto.producto_imagen.image
											.childImageSharp.fluid
									}
									alt={producto.producto_imagen.description}
									loading="eager"
									backgroundColor="#333"
									objectFit="contain"
									style={{
										maxHeight: "100%",
									}}
									imgStyle={{ objectFit: "contain" }}
								/>
							) : null}
						</div>
						<div className={s.textoFila1}>
							<div className={s.envase}>
								{producto.producto_envase}
							</div>
							<div
								className={s.caracteristicas}
								dangerouslySetInnerHTML={{
									__html: producto.producto_caracteristicas,
								}}
							/>
							<div className={s.fila2}>
								<div className={s.textoIzquierdaFila2}>
									<div
										dangerouslySetInnerHTML={{
											__html:
												producto.producto_texto_izquierda,
										}}
									/>
								</div>
								<div className={s.textoDerechaFila2}>
									<div
										dangerouslySetInnerHTML={{
											__html:
												producto.producto_texto_derecha,
										}}
									/>
								</div>
							</div>
							<div className={s.certificaciones}>
								{certificacones.map(certificacion => (
									<div
										key={certificacion.pwid}
										style={{
											width: `${
												0.01 *
												Math.round(
													100 *
														(5.2 *
															certificacion.image
																.image
																.childImageSharp
																.fluid
																.aspectRatio)
												)
											}rem`,
										}}
									>
										<Img
											fluid={
												certificacion.image.image
													.childImageSharp.fluid
											}
											alt={certificacion.title}
											loading="eager"
											backgroundColor="#fff"
											objectFit="contain"
											style={{
												maxHeight: "5.2rem",
											}}
											objectPosition="0% 50%"
											imgStyle={{ objectFit: "contain" }}
										/>
									</div>
								))}
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
