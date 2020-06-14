import React from "react"
import SEO from "../components/seo"

import Content from "../components/c/content"
import ContentPop from "../components/c_pop/content_pop"

import s from "./template-popup.module.scss"
import CloseButton from '../components/animated_svg/close_botton'
import CLink from '../components/cLink'

export const query = graphql`
	query($path: String!, $pathParent: String!){
		pwPages(page_url: {eq: $pathParent}) {
			title
			pwid
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
					is_big
					link_title
					link_url
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

		popupPage: pwPages(page_url: {eq: $path}) {
			title
			pwid
			page_url
			page_template
			lang
			content_pop {
				type
				data {
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
		<div className='content_layout'>
			<SEO title="General" />
			<div><Content content={props.data.pwPages.content} /></div>
			<div className={s.background} />
			<div className={s.pop_window}>
				<div className={s.pop_header}>
					<div className={s.pop_header_title}>
						Aquí val el títulos
					</div>
					<div className={s.pop_header_close}>
						<CLink to={props.data.pwPages.page_url}>
							<CloseButton onClickPassedEvent={() => { console.log("click")}} />
						</CLink>
					</div>
				</div>
				<ContentPop content={props.data.popupPage.content_pop} />
			</div>
		</div>
	)
}

export default GeneralTemplate
