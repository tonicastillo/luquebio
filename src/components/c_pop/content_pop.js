import React from "react"
// import CDestacado from "./c_destacado"
// import CAccesoDirecto from "./c_acceso_directo"
// import CMargen from "./c_margen"
// import CAccesosDirectosBotones from "./c_accesos_directos_botones"
import CImagen from './c_imagen'
// import CEnlacesNivelInferior from './c_enlaces_nivel_inferior'
// import CTextoGeneral from './c_texto_general'
const ContentPop = props => {
	const { content } = props
	console.log('ContentPop')
	console.log(content)
	if(content){
		return content.map((contentData, index) => {
			switch (contentData.type) {
				case 'imagen':
					// return (<CDestacado key={index} data={contentData.data} />)
					return (<CImagen key={index} data={contentData.data} />)
				
				default:
					return (
						<div key={index} />
					)
			}
		})
	}
	return null

}

export default ContentPop