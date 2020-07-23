import React from "react"
import SEO from "../components/seo"

import Content from "../components/c/content"
import CabeceraGeneral from "../components/cabecera_general"
import Header from "../components/header"

export const query = graphql`
	query($path: String!){
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

	}
`;

const GeneralTemplate = (props) => {
  return (
    <>
		<Header isHidenOnTop={false} pageContext={props.pageContext} />
		<div className='content_layout'>
			<SEO title="General" />
			<div>
				<CabeceraGeneral cabecera={props.data.pwPages.cabecera} title={props.pageContext.title} />
				<Content content={props.data.pwPages.content} />
			</div>
		</div>
	</>
  )
}

export default GeneralTemplate
