import { useState, useLayoutEffect } from "react"
const tabletSize = 768;
const desktopSize = 1024;
//Devuelve mobile, tablet o desktop
export const useWindowSize = () => {
	const isClient = typeof window === 'object';
	
	function getSize() {
		if(isClient){
			const wWidth = window.innerWidth
			if(wWidth >= tabletSize && wWidth < desktopSize) 
				return 'tablet'
			if(wWidth >= desktopSize)
				return 'desktop'
		}
		return 'mobile'
	}

	const [windowSize, setWindowSize] = useState(getSize);

	useLayoutEffect(() => {
		if (!isClient) {
			return false;
		}
		
		function handleResize() {
			setWindowSize(getSize());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return windowSize;
}

export const useWindowRatio = () => {
	const isClient = typeof window === 'object';
	
	function getRatio() {
		if(isClient){
			const wWidth = window.innerWidth
			const wHeight = window.innerHeight
			if(wWidth >= wHeight) 
				return 'horizontal'
			if(wWidth < wHeight)
				return 'vertical'
		}
		return 'mobile'
	}

	const [windowRatio, setWindowRatio] = useState(getRatio);

	useLayoutEffect(() => {
		if (!isClient) {
			return false;
		}
		
		function handleResize() {
			setWindowRatio(getRatio());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return windowRatio;
}