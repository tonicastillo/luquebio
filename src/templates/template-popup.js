import React from "react"
import SEO from "../components/seo"

import Content from "../components/c/content"
import ContentPop from "../components/c_pop/content_pop"

import s from "./template-popup.module.scss"
import CloseButton from '../components/animated_svg/close_botton'
import CLink from '../components/cLink'
import Header from "../components/header"
import CabeceraGeneral from "../components/cabecera_general"

const isBrowser = typeof window !== 'undefined'

export const query = graphql`
	query($path: String!, $pathParent: String!){
		pwPages(page_url: {eq: $pathParent}) {
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
								...GatsbyImageSharpFluid_withWebp_noBase64
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
			content {
				type
				data {
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
									...GatsbyImageSharpFluid_withWebp_noBase64
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

		popupPage: pwPages(page_url: {eq: $path}) {
			title
			pwid
			page_url
			page_template
			lang
			content_pop {
				type
				data {
					has_border_bottom
					has_border_top
					htmltext
					quantity
					galeriaimages {
						description
						url
						image {
							childImageSharp {
								fluid(maxWidth: 2240, quality: 50) {
									...GatsbyImageSharpFluid_withWebp_noBase64
									aspectRatio
								}
							}
						}
						focus{
							top
							left
						}
					}
					images {
						description
						url
						image {
							childImageSharp {
								fluid(maxWidth: 2240, quality: 50) {
									...GatsbyImageSharpFluid_withWebp_noBase64
									aspectRatio
								}
							}
						}
					}
					
				}
			}
		}

	}
`;

const GeneralTemplate = (props) => {
	
	return (
		<>
		<Header isHidenOnTop={false} pageContext={props.pageContext} />

		<div className='content_layout'>
			<SEO title="General" />

			{
				isBrowser ? 
					<div>
						<CabeceraGeneral cabecera={props.data.pwPages.cabecera} title={props.pageContext.title} />
						<Content content={props.data.pwPages.content} />
					</div>
				:
				null
			}
			
			<div className={s.background} />
			<div className={s.pop_window_container}>
				<div className={s.pop_window}>
					<div className={s.pop_header}>
						<div className={s.pop_header_title}>
							{props.data.pwPages.title}
						</div>
						<div className={s.pop_header_close}>
							<CLink to={props.data.pwPages.page_url}>
								<CloseButton onClickPassedEvent={null} />
							</CLink>
						</div>
					</div>
					<div className={s.pop_content}>
						<h2>{props.data.popupPage.title}</h2>
						<ContentPop content={props.data.popupPage.content_pop} />
					</div>
				</div>
			</div>
		</div>
		</>
	)
}

export default GeneralTemplate
