import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"

const transitions = {

	default: {
		exit:{
			length: 1,
		},
		entry:{
			length: 0.1,
		}
	},
}

const CLink = React.forwardRef(({ to, title, children, className, transitionName, style, onClick }, ref) => {
	let transition;
	if(transitionName){
		transition = transitions[transitionName];
	} else {
		transition = transitions.default;
	}
	return (
		<TransitionLink
			onClick={onClick}
			ref={ref}
			className={className}
			to={to}
			title={title}
			exit={transition.exit}
			entry={transition.entry}
			style={style}
		>
			{children}
		</TransitionLink>
	)
})
export default CLink;