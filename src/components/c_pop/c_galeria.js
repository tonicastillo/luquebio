import React, {useState, useRef} from "react"
import Img from 'gatsby-image/withIEPolyfill'
import s from './c_galeria.module.scss'
import _ from 'lodash'
import { useSprings, useSpring, animated as a } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import CloseButton from '../animated_svg/close_botton'
// import Flecha1 from '../animated_svg/flecha1'

const CGaleria = ( props ) => {
	const { galeriaimages } = props.data
	const activeImage = useRef(0)
	const [isLightboxOn, setIsLightboxOn] = useState(false)
	const lightBoxSpring = useSpring({
		transform: isLightboxOn ? 'translate3d(0,0,0)' : 'translate3d(0,110%,0)'
	})
	const [springProps, setSpringProps] = useSprings(galeriaimages.length, i => ({ x: typeof window !== 'undefined' ? i * window.innerWidth : 0, sc: 1, display: 'block' }))
	const bind = useDrag((dragProps) => {
		//onsole.log(dragProps)
		const { movement, canceled } = dragProps
		const { down, delta: [xDelta], direction: [xDir], distance, cancel } = dragProps
		if(typeof window !== 'undefined'){
			if (!down && Math.abs(movement[0]) > window.innerWidth / 5) {
				if(!canceled) cancel((activeImage.current = _.clamp(activeImage.current + _.clamp((movement[0])*-1, -1, 1), 0, galeriaimages.length - 1)))
			  }
		}
		
		setSpringProps(i => {
		  if (i < activeImage.current - 1 || i > activeImage.current + 1) return { display: 'none' }
		  const x = typeof window !== 'undefined' ? (i - activeImage.current) * window.innerWidth + (down ? movement[0] : 0) : null
		  const sc = 1
		  return { x, sc, display: 'block' }
		})
	})

	const onImageClick = i => {
		activeImage.current = i
		onClipUpdate()
	}
	const onLightBoxClose = () => {
		setIsLightboxOn(false)
	}
	const onClickLeft = () => {
		activeImage.current = _.clamp(activeImage.current - 1, 0, galeriaimages.length - 1)
		onClipUpdate()
	}
	const onClickLRight = () => {
		activeImage.current = _.clamp(activeImage.current + 1, 0, galeriaimages.length - 1)
		onClipUpdate()
	}
	const onClipUpdate = () => {
		setSpringProps(i => {
			if (i < activeImage.current - 1 || i > activeImage.current + 1) return { display: 'none' }
			const x = (i - activeImage.current) * window.innerWidth
			const sc = 1
			return { x, sc, display: 'block' }
		})
		setIsLightboxOn(true)
	}
	return(
		<div className={s.container}>
			{
				galeriaimages.map((image, i) => (
					<div onClick={() => onImageClick(i)} key={image.url} className={s.imageContainer}>
						<Img
							// fluid={image.image.childImageSharp.fluid}
							sizes={{ ...image.image.childImageSharp.fluid, aspectRatio: 1 / 1 }}
							alt={image.description}
							loading="eager"
							backgroundColor="#666666"
							objectFit="cover"
							objectPosition={`${image.focus.left}% ${image.focus.top}%`}
							backgroundColor="white"
						/>
					</div>
				))
			}
			<a.div style={lightBoxSpring} className={s.lightbox}>
				<div
					className={s.close}
				>
					<CloseButton onClickPassedEvent={onLightBoxClose} />
				</div>
				<div
					className={s.left}
					onClick={onClickLeft}>
                	<svg width="10" height="16" viewBox="19 0 10 20" fill="none">
						<path d="M27.63 9.37L18 19" stroke="#ffffff" strokeWidth="1.5"/>
						<path d="M27.62 10.62L18 1" stroke="#ffffff" strokeWidth="1.5"/>
					</svg>
				</div>
				<div
					className={s.right}
					onClick={onClickLRight}>
					<svg width="10" height="16" viewBox="19 0 10 20" fill="none">
						<path d="M27.63 9.37L18 19" stroke="#ffffff" strokeWidth="1.5"/>
						<path d="M27.62 10.62L18 1" stroke="#ffffff" strokeWidth="1.5"/>
					</svg>
				</div>
				{
					springProps.map(({ x, display, sc }, i) => (
						<a.div className={s.slideImage} {...bind()} key={i} style={{ display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
							<div>
								<Img
									fluid={galeriaimages[i].image.childImageSharp.fluid}
									alt={galeriaimages[i].description}
									loading="eager"
									backgroundColor="#666666"
									objectFit="contain"
									backgroundColor="white"
									style={{
										width: '100%',
										height: '100%'
									}}
								/>
								{
									galeriaimages[i].description?
									<div className={s.description}>
										{galeriaimages[i].description}
									</div>
									:
									null
								}
								
							</div>
						</a.div>
					))
				}
			</a.div>
			

		</div>
	)
}



export default CGaleria