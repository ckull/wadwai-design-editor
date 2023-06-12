import { fabric } from 'fabric'
import { useCallback, useEffect } from 'react'
import { useCanvasContext } from 'src/components/Canvas/hooks'
import useEditor from 'src/hooks/useEditor'
function useZoomHandler() {
  const { editor: {canvas, zoomRatio} } = useEditor()

  const updateZoom = useCallback(
    (zoomRatio: number) => {
      if (canvas) {
        canvas.zoomToPoint(new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2), zoomRatio)
      }
    },
    [canvas]
  )

  useEffect(() => {
    updateZoom(zoomRatio)
  }, [zoomRatio])
}

export default useZoomHandler
