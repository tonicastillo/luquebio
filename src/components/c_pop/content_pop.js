import React from "react"
import CDestacado from "./c_destacado"
// import CAccesoDirecto from "./c_acceso_directo"
// import CMargen from "./c_margen"
// import CAccesosDirectosBotones from "./c_accesos_directos_botones"
import CGaleria from './c_galeria'
import CImagen from './c_imagen'
// import CEnlacesNivelInferior from './c_enlaces_nivel_inferior'
import CTextoGeneral from './c_texto_general'
import CLogoYTexto from './c_logo_y_texto'
import CEnlacesExternos from '../c/c_enlaces_externos'

const ContentPop = props => {
	const { content } = props
	//onsole.log('ContentPop')
	//onsole.log(content)
	if(content){
		return content.map((contentData, index) => {
			switch (contentData.type) {
				case 'destacado':
					return (<CDestacado key={index} data={contentData.data} />)
				case 'imagen':
					// return (<CDestacado key={index} data={contentData.data} />)
					return (<CImagen key={index} data={contentData.data} />)
				case 'galeria':
					return (<CGaleria key={index} data={contentData.data} />)
				case 'texto_general':
					return (<CTextoGeneral key={index} data={contentData.data} />)
				case 'logo_y_texto':
					return (<CLogoYTexto key={index} data={contentData.data} />)
				case 'enlaces_externos':
					return (<CEnlacesExternos key={index} data={contentData.data} />)
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