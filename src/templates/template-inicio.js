import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"

import HomeHero from "../components/home_hero"
import Header from "../components/header"

import Content from "../components/c/content"

// export const query = graphql`
// 	query($path: String!){
// 		pwPages(page_url: {eq: $path}) {
// 			title
// 			pwid
// 			page_url
// 			page_template
// 			lang
// 			seo{
// 				title
// 				description
// 				image {
// 					publicURL
// 				}
// 			}
// 			content {
// 				type
// 				data {
// 					title
// 					text
// 					image_url
// 					description
// 					image {
// 						childImageSharp {
// 							fluid(maxWidth: 2240, quality: 50) {
// 								...GatsbyImageSharpFluid_withWebp_noBase64
// 								aspectRatio
// 							}
// 						}
// 					}
// 					image_width
// 					blocks {
// 						description
// 						text
// 						title
// 						subtitle
// 						image_url
// 						image {
// 							childImageSharp {
// 								fluid(maxWidth: 2240, quality: 50) {
// 									...GatsbyImageSharpFluid_withWebp_noBase64
// 									aspectRatio
// 								}
// 							}
// 							publicURL
// 							extension
// 						}
// 						internal_url
// 					}
// 				}
// 			}
// 		}
// 	}
// `;



export const query = graphql`
	query($path: String!, $lang: String!, ){
		pwPages(page_url: {eq: $path}, lang: {eq: $lang}) {
			title
			pwid
			page_url
			page_template
			lang
			home_hero_text
			home_hero_background_video {
				url
			}
			home_hero_background_image{
				image {
					childImageSharp {
						resize(width: 720) {
						  src
						}
					  }
				}
			}
			content {
				type
				data {
					has_border_bottom
					has_border_top
					htmltext
					htmltext_col1
					htmltext_col2
					link_title
					is_big
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

// image {
// 	childImageSharp {
// 		fluid(maxWidth: 2240, quality: 50) {
// 			...GatsbyImageSharpFluid_withWebp_noBase64
// 			aspectRatio
// 		}
// 	}
// }
// image_mobile {
// 	childImageSharp {
// 		fluid(maxWidth: 2240, quality: 50) {
// 			...GatsbyImageSharpFluid_withWebp_noBase64
// 			aspectRatio
// 		}
// 	}
// }
const InicioTemplate = (props) => {
  return (
	  <>
			<Header isHidenOnTop={true} pageContext={props.pageContext} />

		<div className='content_layout content_layout_inicio'>
			<SEO title="Home" />
			<HomeHero
				homeData={{
					image: props.data.pwPages.home_hero_background_image,
					video: props.data.pwPages.home_hero_background_video,
					text: props.data.pwPages.home_hero_text,
				}}
				pageContext={props.pageContext}
			/>

		<Content content={props.data.pwPages.content} />
		</div>
	</>
  )
}

export default InicioTemplate
