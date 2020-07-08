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
		console.log(page.content)
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
		//SEO image//????
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
		
		//Content image
		if(data.pages[pageIndex].content){
			for (const content of data.pages[pageIndex].content) {
				if(content.data.images){
					for (const imageSource of content.data.images) {
						if(imageSource && imageSource.url && imageSource.url !== 'undefined'){
							const imageUrl = imageSource.url
							console.log(`content Transformando: ${imageUrl}`);
	
							const extension = imageUrl.substring(imageUrl.lastIndexOf('.')+1, imageUrl.length) || imageUrl;
							
							console.log("Extensión: " + extension)
							if(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
								const image = await createRemoteFileNode({
									url: imageUrl,
									cache,
									store,
									createNode,
									createNodeId: id => `image-${id}`,
								})
								if (image) {
									imageSource.image___NODE = image.id
								}
							console.log("Imagen creada ")
							}
						}
					}
				}
				if(content.data.images_mobile){
					for (const imageSource of content.data.images_mobile) {
						if(imageSource && imageSource.url && imageSource.url !== 'undefined'){
							const imageUrl = imageSource.url
							console.log(`content Transformando: ${imageUrl}`);
	
							const extension = imageUrl.substring(imageUrl.lastIndexOf('.')+1, imageUrl.length) || imageUrl;
							
							console.log("Extensión: " + extension)
							if(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
								const image = await createRemoteFileNode({
									url: imageUrl,
									cache,
									store,
									createNode,
									createNodeId: id => `image-${id}`,
								})
								if (image) {
									imageSource.image___NODE = image.id
								}
							console.log("Imagen creada ")
							}
						}
					}
				}
				if(content.data.timeline){
					for (const imageSource of content.data.timeline) {
						if(imageSource && imageSource.url && imageSource.url !== 'undefined'){
							const imageUrl = imageSource.url
							console.log(`content Transformando: ${imageUrl}`);
	
							const extension = imageUrl.substring(imageUrl.lastIndexOf('.')+1, imageUrl.length) || imageUrl;
							
							console.log("Extensión: " + extension)
							if(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
								const image = await createRemoteFileNode({
									url: imageUrl,
									cache,
									store,
									createNode,
									createNodeId: id => `image-${id}`,
								})
								if (image) {
									imageSource.image___NODE = image.id
								}
							console.log("Imagen creada ")
							}
						}
					}
				}
				
			}
		}
		if(data.pages[pageIndex].content_pop){
			for (const content of data.pages[pageIndex].content_pop) {
				if(content.data.images){
					for (const imageSource of content.data.images) {
						if(imageSource && imageSource.url && imageSource.url !== 'undefined'){
							const imageUrl = imageSource.url
							console.log(`content Transformando: ${imageUrl}`);
	
							const extension = imageUrl.substring(imageUrl.lastIndexOf('.')+1, imageUrl.length) || imageUrl;
							
							console.log("Extensión: " + extension)
							if(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
								const image = await createRemoteFileNode({
									url: imageUrl,
									cache,
									store,
									createNode,
									createNodeId: id => `image-${id}`,
									
								})
								if (image) {
									imageSource.image___NODE = image.id
								}
							console.log("Imagen creada ")
							}
						}
					}
				}
				if(content.data.images_mobile){
					for (const imageSource of content.data.images_mobile) {
						if(imageSource && imageSource.url && imageSource.url !== 'undefined'){
							const imageUrl = imageSource.url
							console.log(`content Transformando: ${imageUrl}`);
	
							const extension = imageUrl.substring(imageUrl.lastIndexOf('.')+1, imageUrl.length) || imageUrl;
							
							console.log("Extensión: " + extension)
							if(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
								const image = await createRemoteFileNode({
									url: imageUrl,
									cache,
									store,
									createNode,
									createNodeId: id => `image-${id}`,
								})
								if (image) {
									imageSource.image___NODE = image.id
								}
							console.log("Imagen creada ")
							}
						}
					}
				}
				if(content.data.galeriaimages){
					for (const imageSource of content.data.galeriaimages) {
						if(imageSource && imageSource.url && imageSource.url !== 'undefined'){
							const imageUrl = imageSource.url
							console.log(`content Transformando: ${imageUrl}`);
	
							const extension = imageUrl.substring(imageUrl.lastIndexOf('.')+1, imageUrl.length) || imageUrl;
							
							console.log("Extensión: " + extension)
							if(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
								const image = await createRemoteFileNode({
									url: imageUrl,
									cache,
									store,
									createNode,
									createNodeId: id => `image-${id}`,
									
								})
								if (image) {
									imageSource.image___NODE = image.id
								}
							console.log("GaleriaImagen creada ")
							}
						}
					}
				}
				
			}
		}
		if(data.pages[pageIndex].cabecera){
			for (const item of data.pages[pageIndex].cabecera.images) {
		
				if(item && item.url && item.url !== 'undefined'){
					const imageUrl = item.url
					console.log(`content Transformando: ${imageUrl}`);

					const extension = imageUrl.substring(imageUrl.lastIndexOf('.')+1, imageUrl.length) || imageUrl;
					
					console.log("Extensión: " + extension)
					if(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
						const image = await createRemoteFileNode({
							url: imageUrl,
							cache,
							store,
							createNode,
							createNodeId: id => `image-${id}`,
						})
						if (image) {
							item.image___NODE = image.id
						}
						console.log("Imagen creada ")
					}
				}
			}
			// for (const item of data.pages[pageIndex].cabecera.images_mobile) {
			// 	if(item && item.url && item.url !== 'undefined'){
			// 		const imageUrl = item.url
			// 		console.log(`content Transformando: ${imageUrl}`);

			// 		const extension = imageUrl.substring(imageUrl.lastIndexOf('.')+1, imageUrl.length) || imageUrl;
					
			// 		console.log("Extensión: " + extension)
			// 		if(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
			// 			const image = await createRemoteFileNode({
			// 				url: imageUrl,
			// 				cache,
			// 				store,
			// 				createNode,
			// 				createNodeId: id => `image-${id}`,
			// 			})
			// 			if (image) {
			// 				item.image___NODE = image.id
			// 			}
			// 		console.log("Imagen creada ")
			// 		}
			// 	}
			// }
		}
		if(data.pages[pageIndex].home_hero_background_image){
			const item = data.pages[pageIndex].home_hero_background_image
			const imageUrl = item.url
			console.log(`content Transformando: ${imageUrl}`);

			const extension = imageUrl.substring(imageUrl.lastIndexOf('.')+1, imageUrl.length) || imageUrl;
			
			console.log("Extensión: " + extension)
			if(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
				const image = await createRemoteFileNode({
					url: imageUrl,
					cache,
					store,
					createNode,
					createNodeId: id => `image-${id}`,
				})
				if (image) {
					item.image___NODE = image.id
				}
				console.log("Imagen creada ")
			}
			
		}
		// if(data.pages[pageIndex].home_hero_background_video){
		// 	const item = data.pages[pageIndex].home_hero_background_video
		// 	const imageUrl = item.url
		// 	console.log(`content Transformando: ${imageUrl}`);

		// 	const extension = imageUrl.substring(imageUrl.lastIndexOf('.')+1, imageUrl.length) || imageUrl;
			
		// 	console.log("Extensión: " + extension)
		// 	if(extension === 'mp4'){
		// 		const image = await createRemoteFileNode({
		// 			url: imageUrl,
		// 			cache,
		// 			store,
		// 			createNode,
		// 			createNodeId: id => `localFile-${id}`,
		// 			ext: ".mp4",
		// 		})
		// 		if (image) {
		// 			item.localFile___NODE = image.id
		// 		}
		// 		console.log("Video creado ")
		// 	}
			
		// }
				
	}

}