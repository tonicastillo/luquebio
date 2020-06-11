import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"

import HomeHero from "../components/home_hero"

import Content from "../components/c/content"


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
	}
`;

const GeneralTemplate = (props) => {
  return (
    <div className='content_layout'>
      <SEO title="General" />
      <Content content={props.data.pwPages.content} />
    </div>
  )
}

export default GeneralTemplate
