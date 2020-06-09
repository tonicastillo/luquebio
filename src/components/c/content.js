import React from "react"
import CDestacado from "./c_destacado"
import CAccesoDirecto from "./c_acceso_directo"
import CMargen from "./c_margen"
import CAccesosDirectosBotones from "./c_accesos_directos_botones"
import CImagen from './c_imagen'

const Content = props => {
	const { content } = props
	console.log(props)
	
	return content.map((contentData, index) => {
		switch (contentData.type) {
			case 'destacado':
				console.log(contentData.data)
				return (<CDestacado key={index} data={contentData.data} />)
			case 'acceso_directo':
				console.log(contentData.data)
				return (<CAccesoDirecto key={index} data={contentData.data} />)
			case 'margen':
				console.log(contentData.data)
				return (<CMargen key={index} data={contentData.data} />)
			case 'accesos_directos_botones':
				console.log(contentData.data)
				return (<CAccesosDirectosBotones key={index} data={contentData.data} />)
			case 'imagen':
				console.log(contentData.data)
				return (<CImagen key={index} data={contentData.data} />)
				
				
			// case 'text_highlighted':
			// 	return (<ContentTextHighlighted key={index} data={contentData.data} />)
		
			// case 'text_regular_size':
			// 	return (<ContentTextRegularSize key={index} data={contentData.data} />)
			
			// case 'text_small_size':
			// 	return (<ContentTextSmallSize key={index} data={contentData.data} />)
			
			// case 'blocks_image_text':
			// 	return (<ContentBlocksImageText key={index} data={contentData.data} />)

			// case 'blocks_image_text_internal_link':
			// 	return (<ContentBlocksImageTextInternalLink key={index} data={contentData.data} />)

			// case 'list_type1':
			// 	return (<ContentListType1 key={index} data={contentData.data} />)

			// case 'location_map':
			// 		return (<LocationMap key={index} data={contentData.data} />)
				
			default:
				return (
					<div></div>
				)
		}
	})
}

export default Content