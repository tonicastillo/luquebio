const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const axios = require('axios')

const API_URI = `http://luque.tonicastillo.com/api/?timestamp=${new Date().getTime()}` //Timestamp para forzar cache
console.log("Getting data from...");
console.log(API_URI);
exports.sourceNodes = async ({ actions, store, cache, createNodeId, createContentDigest }) => {
	const { createNode, createNodeField } = actions
	// Fetch data
	const { data } = await axios.get(API_URI)
	console.log(data);
	const mainNode = await createNode({
		...data,
		id: `processwire`,
		parent: null,
		children: [],
		internal: {
			type: `processwire`,
			contentDigest: createContentDigest(data),
			// mediaType: `text`, // optional
			// content: JSON.stringify(fieldData), // optional
			description: `Main content`, // optional
		}
	});

	//Crea página como node raiz para poder filtrar
	data.pages.forEach(page => {
		console.log(page.title)
		createNode({
			...page,
			id: createNodeId(page.pwid+page.lang), // required by Gatsby
			internal: {
				type: 'PWPages', // required by Gatsby
				contentDigest: createContentDigest('pwpages') // required by Gatsby, must be unique
			}
		});
	});

	for (const pageIndex in data.pages) {
		console.log("Page: " + data.pages[pageIndex].title);
		//SEO image
		if(data.pages[pageIndex].seo && data.pages[pageIndex].seo.image_url){
			const image_url = data.pages[pageIndex].seo.image_url
			console.log("SEO Transformando: " + image_url);

			const image = await createRemoteFileNode({
				url: image_url,
				cache,
				store,
				createNode,
				createNodeId: id => `image-${id}`,
			})
			if (image) {
				data.pages[pageIndex].seo.image___NODE = image.id
			}
		}
		//HOME IMAGES
		
		//Content image
		if(data.pages[pageIndex].content){
			for (const content of data.pages[pageIndex].content) {
				if(content.data.image_url && content.data.image_url != 'undefined'){
					console.log("content Transformando: " + content.data.image_url);

					const extension = content.data.image_url.substring(content.data.image_url.lastIndexOf('.')+1, content.data.image_url.length) || content.data.image_url;
                    
                    console.log("Extensión: " + extension)
                    // if(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
						const image = await createRemoteFileNode({
							url: content.data.image_url,
							cache,
							store,
							createNode,
							createNodeId: id => `image-${id}`,
						})
						if (image) {
							content.data.image___NODE = image.id
                        }
                    console.log("Imagen creada ")
					// }
				}
			}
		}
		//Content block images
		if(data.pages[pageIndex].content){
			for (const content of data.pages[pageIndex].content) {
				if(content.data.blocks){
					for (const block of content.data.blocks) {
						if(block.image_url && block.image_url != 'undefined'){
							console.log("blocks Transformando: " + block.image_url);

							const image = await createRemoteFileNode({
								url: block.image_url,
								cache,
								store,
								createNode,
								createNodeId: id => `image-${id}`,
							})
							if (image) {
								block.image___NODE = image.id
							}
						}
					}
				}
			}
		}
		
	}

}