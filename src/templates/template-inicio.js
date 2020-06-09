import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"

import HomeHero from "../components/home_hero"

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
	query($path: String!){
		pwPages(page_url: {eq: $path}) {
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
					is_big
					link_title
					link_url
					links {
						link_title
						link_url
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
    <div class='content_layout'>
      <SEO title="Home" />
      <HomeHero />

      <Content content={props.data.pwPages.content} />
      <Link to="/page-2/">Go to page 2</Link>
    </div>
  )
  }

export default InicioTemplate
