import React from "react"
import s from './c_accesos_directos_botones.module.scss'
// import LinkWithArrow from '../cLinkWithArrow'
import Button from '../common/button'
const CAccesosDirectosBotones = (props) => {
    //onsole.log("CAccesosDirectosBotones")
    const { links } = props.data
    return (
        <div className={s.container}>
            {links.map((link, key) => (
                <Button
                    key={key}
                    to={link.link_url}
                    title={link.link_title}
                />
            ))}
        </div>
    )
}


export default CAccesosDirectosBotones
