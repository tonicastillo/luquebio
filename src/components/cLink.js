import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"

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
	return (
		<TransitionLink
			{...props}
		>
			{props.children}
		</TransitionLink>
	)
})
export default CLink;