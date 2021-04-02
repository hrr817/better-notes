import { useState, useRef, useLayoutEffect } from 'react'

const useScrollHook = (options) => {

     const threshold = (options && options.threshold) || 0 

     const prevXY = useRef([0, 0])

     const [handlerAdded, setHandlerAdded] = useState(false)

     const [info, setInfo] = useState({
          prevX: 0,
          prevY: 0,
          y: 0,
          x: 0,
          scrolledUp: false,
          scrolledRight: false,
          scrolledDown: false,
          scrolledLeft: false,
     })

     const onScrollHandler = (e) => {
          // Check if onScrollHandler is added to some element
          e.target.scrollTop === undefined ? setHandlerAdded(false) : setHandlerAdded(true)

          let currentX
          let currentY

          if(handlerAdded) {
               currentX = e.target.scrollLeft
               currentY =  e.target.scrollTop
          } else {
               currentX = e.path && e.path[1].scrollX
               currentY = e.path && e.path[1].scrollY
          }

          // Scroll Up
          if(currentY < prevXY.current[1] - threshold) {
               setInfo(state => ({
                    ...state, 
                    scrolledUp: true, 
                    scrolledDown: false, 
                    y: currentY
               }))
          }

          // Scroll Down
          if(currentY > prevXY.current[1] + threshold) {
               setInfo(state => ({
                    ...state, 
                    scrolledUp: false, 
                    scrolledDown: true, 
                    y: currentY
               }))
          } 

          // Scroll Right
          if(currentX < prevXY.current[0] - threshold) {
               setInfo(state => ({
                    ...state, 
                    scrolledRight: true, 
                    scrolledLeft: false, 
                    x: currentX
               }))
          }

          // Scroll Left
          if(currentX > prevXY.current[0] + threshold) {
               setInfo(state => ({
                    ...state, 
                    scrolledLeft: true, 
                    scrolledRight: false, 
                    x: currentX
               }))
          }

          prevXY.current[0] = currentX
          prevXY.current[1] = currentY
     }

     useLayoutEffect(() => {
          !handlerAdded && document.addEventListener('scroll', onScrollHandler)

          return () => !handlerAdded && document.removeEventListener('scroll', onScrollHandler)
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

     return [info, onScrollHandler]
}

export { useScrollHook }
