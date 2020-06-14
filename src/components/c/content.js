import React from "react"
import CDestacado from "./c_destacado"
import CAccesoDirecto from "./c_acceso_directo"
import CMargen from "./c_margen"
import CAccesosDirectosBotones from "./c_accesos_directos_botones"
import CImagen from './c_imagen'
import CEnlacesNivelInferior from './c_enlaces_nivel_inferior'
import CTextoGeneral from './c_texto_general'

const Content = props => {
	const { content } = props
	console.log(props)
	console.log('----')
	
	return content.map((contentData, index) => {
		switch (contentData.type) {
			case 'destacado':
				return (<CDestacado key={index} data={contentData.data} />)
			case 'acceso_directo':
				console.log('--acceso_directo')
				console.log(contentData.data)
				return (<CAccesoDirecto key={index} data={contentData.data} />)
			case 'margen':
				console.log('---margen')
				console.log(contentData.data)
				return (<CMargen key={index} data={contentData.data} />)
			case 'accesos_directos_botones':
				console.log('--accesos_directos_botones')
				console.log(contentData.data)
				return (<CAccesosDirectosBotones key={index} data={contentData.data} />)
			case 'imagen':
				console.log('--imagen')
				console.log(contentData.data)
				return (<CImagen key={index} data={contentData.data} />)
			case 'enlaces_nivel_inferior':
				console.log('--enlaces_nivel_inferior')
				console.log(contentData.data)
				return (<CEnlacesNivelInferior key={index} data={contentData.data} />)	
			case 'texto_general':
				return (<CTextoGeneral key={index} data={contentData.data} />)
					
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
					<div key={index}>HOLA: {contentData.type}</div>
				)
		}
	})
}

export default Content