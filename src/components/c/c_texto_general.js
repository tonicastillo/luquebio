import React from "react"
import s from './c_texto_general.module.scss'
import { transformHTML } from '../../helpers/transformHTML'

const CTextoGeneral = ( props ) => {
	const { htmltext_col1, htmltext_col2 } = props.data
	return(
		<div className={s.container}>
			{/* <div className={s.col1} dangerouslySetInnerHTML={{__html:htmltext_col1}}></div>
			<div className={s.col2} dangerouslySetInnerHTML={{__html:htmltext_col2}}></div> */}
			<div className={s.col1}>{transformHTML(htmltext_col1)}</div>
			<div className={s.col2}>{transformHTML(htmltext_col2)}</div>
		</div>
	)
}

export default CTextoGeneral
