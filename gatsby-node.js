/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


const path = require("path");
const _ = require('lodash')


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
	
	const generalQuery = await graphql(
		`
			{
				processwire {
					langs {
						title
						code
					}
					pages {
						pwid
						lang
						page_url
						title
						page_template
						childrenpages
						
					}
				}
			}
    `)
    // parentpage{
    //     pwid
    //     page_url
    //     title
    // }
    console.log(generalQuery)
	const pages = generalQuery.data.processwire.pages;


	const createPagePage = (page) => {
		// const templateFile = path.resolve(`src/templates/template-${page.page_template.toLowerCase()}.js`)
		const templateName = page.page_template === 'INICIO' ? 'inicio' : 'general'
		const templateFile = path.resolve(`src/templates/template-${templateName}.js`)
		console.log("--Creando página: "+page.page_url)
		if(page.page_url){
			const versions = _.filter(pages, {pwid: page.pwid})
			createPage({
				path: page.page_url,
				component: templateFile,
				context: {
					...page,
					versions
				}
			});
		} else {
			console.log(`Falta Url para ${page.title}`);
		}
		
	};
	pages.forEach(createPagePage);
}