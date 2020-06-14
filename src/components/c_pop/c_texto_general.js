import React from "react"
import s from './c_texto_general.module.scss'

const CTextoGeneral = ( props ) => {
	const { htmltext } = props.data
	return(
		<div className={s.container}>
			<div dangerouslySetInnerHTML={{__html:htmltext}}></div>
		</div>
	)
}

export default CTextoGeneral
