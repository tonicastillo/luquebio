import React from "react"
import Img from 'gatsby-image'

import SEO from "../components/seo"
import CLink from '../components/cLink'

import Content from "../components/c/content"
import Header from "../components/header"

import Select from "../components/common/select"
import _ from 'lodash'
import s from './template-productos.module.scss'
import { useSpring, animated as a, interpolate } from 'react-spring'
import { translations } from "../langs/translations"

export const query = graphql`
	query($path: String!, $lang: String!){
		productoPage:pwPages(page_template: {eq: "PRODUCTOS"}, lang: {eq: $lang}) {
			page_url
		}
		pwPages(page_url: {eq: $path}) {
			pwid
			title
			cabecera{
				text
				images {
					description
					url
					image {
						childImageSharp {
							fluid(maxWidth: 2240, quality: 50) {
								...GatsbyImageSharpFluid_withWebp
								aspectRatio
							}
						}
					}
					focus{
						top
						left
					}
				}
			}
			page_url
			page_template
			lang
			productos_destacados {
				page_url
			}
			content {
				type
				data {
					timeline {
						year
						url
						description
						htmltext
						image {
							childImageSharp {
								fluid(maxWidth: 512, quality: 50) {
									...GatsbyImageSharpFluid_withWebp
									aspectRatio
								}
							}
						}
					}
					has_border_bottom
					has_border_top
					htmltext
					htmltext_col1
					htmltext_col2
					link_title
					link_url
					is_big
					links {
						link_title
						link_url
						link_text
					}
					quantity
					text
					images {
						description
						url
						width
						image {
							childImageSharp {
								fluid(maxWidth: 2240, quality: 50) {
									...GatsbyImageSharpFluid_withWebp
									aspectRatio
								}
							}
						}
					}
					images_mobile {
						description
						url
						image {
							childImageSharp {
								fluid(maxWidth: 1120, quality: 50) {
									...GatsbyImageSharpFluid_withWebp_noBase64
									aspectRatio
								}
							}
						}
					}
				}
			}
		}
		productos:allPwPages(filter: {page_template: {eq: "PRODUCTO"}, lang: {eq: $lang}}) {
			nodes {
				page_url
				producto_titulo_sencillo
				producto_subtitulo
				producto_envase
				producto_categoria
				producto_caracteristicas
				producto_texto_izquierda
				producto_texto_derecha
				producto_pdf
				producto_imagen_thumb{
					description
					image{
						childImageSharp {
							fluid(maxWidth: 1227, quality: 50) {
								...GatsbyImageSharpFluid
								aspectRatio
							}
						}
					}
				}
			}
		}
		categorias:allSitePage(filter: {context: {page_template: {eq: "CATEGORIA"}, lang: {eq: $lang}}}) {
			nodes {
				context {
					page_url
					page_template
					title
				}
			}
		  }
	}
`;

const ProductosTemplate = (props) => {
	const productos = props.data.productos.nodes
	const categorias = props.data.categorias.nodes
	const selectOptions = _.map(
		categorias,
		categoria => ({value: categoria.context.page_url, label: categoria.context.title})
	)
	selectOptions.unshift({value: props.data.productoPage.page_url, label: translations.elijecategoria[props.pageContext.lang]})
	let productosFiltrados = []
	if(props.pageContext.page_template==='PRODUCTOS'){
		productosFiltrados = []
		_.forEach(productos, producto => {
			_.forEach(props.data.pwPages.productos_destacados, prod => {
				if(prod.page_url === producto.page_url){
					productosFiltrados.push(producto)
				}
			})
		})
	} else {
		productosFiltrados = _.filter(productos, producto => {
			return producto.producto_categoria===props.pageContext.page_url
		})
	}
	return (
		<>
			<Header isHidenOnTop={false} pageContext={props.pageContext} />
			<div className='content_layout'>
				<SEO title="General" />
				<div>
					<h2 className={s.titulo}>{translations.productos[props.pageContext.lang]}</h2>
					<p className={s.intro}>{translations.cuandolacalidadimporta[props.pageContext.lang]}</p>
					<Select options={selectOptions} currentPage={props.path} />
					<div className={s.productos_listado}>
						{
							productosFiltrados.map((producto, i) => (
								<CLink to={producto.page_url} key={i} className={s.producto_ficha}>
									<div className={s.image_container}>
									{
										producto.producto_imagen_thumb.image ? 
										<Img
											fluid={producto.producto_imagen_thumb.image.childImageSharp.fluid}
											alt={producto.producto_imagen_thumb.description}
											loading="eager"
											backgroundColor="#333"
											objectFit="contain"
										/>
										:
										null
									}
									</div>
									<div className={s.plus_box}>
										<span>
											<span />
											<span />
										</span>
									</div>
									<h3>{producto.producto_titulo_sencillo}</h3>
									<h4>{producto.producto_subtitulo}</h4>
									<h5>{producto.producto_envase}</h5>
								</CLink>
							))
						}
					</div>
					<Content content={props.data.pwPages.content} />

				</div>
			</div>
		</>
	)
}

export default ProductosTemplate
