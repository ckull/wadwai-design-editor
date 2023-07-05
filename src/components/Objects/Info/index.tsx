import { useEffect, useMemo, useCallback, useState, useRef } from 'react'
import useEditor from 'src/hooks/useEditor'
const Info = ({
    // width,
    // height,
    // dpi,
    isShow
}) => {
    const { editor } = useEditor()
    const { activeObject } = editor
    const FIXED = 2
    const [isVisible, setIsVisible] = useState(false)
    const [pos, setPos] = useState({
        x: 0,
        y: 0
    })


    const ref = useRef()

    useEffect(() => {
        if (!activeObject && activeObject?.type !== 'Image') return


        

        // handlePositionChange()
        console.log('activeObject changed: ', activeObject)
        // activeObject && activeObject.on('moving', handlePositionChange)

        return () => {
            // activeObject.off('moving', handlePositionChange)
        }


    }, [activeObject])

    const handlePositionChange = () => {
        let infoSize = ref.current.getBoundingClientRect()
        let diff = activeObject.lineCoords['br']['x'] - activeObject.lineCoords['bl']['x']
        setPos({
            x: activeObject.lineCoords['bl']['x'] + (diff / 2) - (infoSize.width / 2),
            y: activeObject.lineCoords['bl']['y'] + 10
        })
    }


    const getInches = useCallback((value) => {
        return (value / 300)
    }, [activeObject])




    return (
        <div className={`absolute z-[100]`} style={{ left: pos.x, top: pos.y }} ref={ref}>
            <div className='flex text-white bg-slate-900 rounded-lg p-2 text-xs'>{
                `${getInches(activeObject?.width || 0)?.toFixed(2)}" x ${getInches(activeObject?.height || 0)?.toFixed(2)}" | DPI: ${activeObject?.dpi}`
            }</div>

        </div>
    )
}

export default Info