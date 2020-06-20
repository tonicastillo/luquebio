import React from "react"
import s from './c_enlaces_nivel_inferior.module.scss'
// import LinkWithArrow from '../cLinkWithArrow'
import Button from '../common/button'
const CEnlacesNivelInferior = (props) => {
    const { links } = props.data
    //onsole.log(links)
    return (
        <div className={s.container}>
            {links.map((link, key) => (
                <Button
                    key={key}
                    to={link.link_url}
                    type="plus"
                    title={link.link_text}
                    text={link.link_title}
                />
            ))}
        </div>
    )
}


export default CEnlacesNivelInferior
