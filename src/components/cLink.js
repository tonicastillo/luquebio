import React from "react"
// import TransitionLink from "gatsby-plugin-transition-link"
import AniLink from "gatsby-plugin-transition-link/AniLink"


// const transitions = {

// 	default: {
// 		exit:{
// 			length: 1,
// 		},
// 		entry:{
// 			length: 0.1,
// 		}
// 	},
// }

const CLink = React.forwardRef((props, ref) => {
	// let transition;
	// if(props.transitionName){
	// 	transition = transitions[props.transitionName];
	// } else {
	// 	transition = transitions.default;
	// }
	const colors = ['#882433', '#91785b']
	const color= colors[Math.floor(Math.random() * colors.length)]
	if(props.ispaintdrip==="true")
		return (
			<AniLink
				paintDrip
				hex={color}

				direction="up"
				duration={1}
				{...props}
			>
				{props.children}
			</AniLink>
		)
	return (
		<AniLink
			cover
			
			direction="up"
			bg={color}
			duration={1}
			{...props}
		>
			{props.children}
		</AniLink>
	)
})
export default CLink;