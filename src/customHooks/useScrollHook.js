import { useState, useRef, useEffect,} from 'react'

const useScrollHook = () => {
     const prevXY = useRef([0, 0])
     
     const [state, setState] = useState({
          prevX: 0,
          prevY: 0,
          y: window.scrollY,
          x: window.scrollX,
          scrolledUp: false,
          scrolledRight: false,
          scrolledDown: false,
          scrolledLeft: false,
     })

     const updateState = (e) => {
          const currentX = e.path[1].scrollX
          const currentY =  e.path[1].scrollY

          // Scroll Up
          if(currentY < prevXY.current[1]) {
               setState(state => ({
                    ...state, 
                    scrolledUp: true, 
                    scrolledDown: false, 
                    y: currentY
               }))
          }

          // Scroll Down
          if(currentY > prevXY.current[1]) {
               setState(state => ({
                    ...state, 
                    scrolledUp: false, 
                    scrolledDown: true, 
                    y: currentY
               }))
          } 

          // Scroll Right
          if(currentX < prevXY.current[0]) {
               setState(state => ({
                    ...state, 
                    scrolledRight: true, 
                    scrolledLeft: false, 
                    x: currentX
               }))
          }

          // Scroll Left
          if(currentX > prevXY.current[0]) {
               setState(state => ({
                    ...state, 
                    scrolledLeft: true, 
                    scrolledRight: false, 
                    x: currentX
               }))
          }

          prevXY.current[0] = currentX
          prevXY.current[1] = currentY
     }

     useEffect(() => {
          window.addEventListener('scroll', updateState)

          return () => window.removeEventListener('scroll', updateState)
     }, [])

     return [state]
}

export { useScrollHook }
