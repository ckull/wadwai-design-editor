import { useEffect } from 'react'
import useCanvasContext from 'src/components/Canvas/hooks/useCanvasContext'
import { fabric } from 'fabric'
import useEditor from 'src/hooks/useEditor'

import {
  useCustomizationHandler,
  useEventsHandler,
  useZoomHandler,
  useContainerHandler,
  useGuidelinesHandler,
} from 'src/components/Canvas/handlers'

function Canvas() {
  const containerRef = useContainerHandler()
  const { setCanvas } = useCanvasContext()
  const { editor , setEditor } = useEditor()
  const { backgroundImage } = editor
  useCustomizationHandler()
  useGuidelinesHandler()
  useEventsHandler()
  useZoomHandler()
  useEffect(() => {
    const initialHeigh = containerRef.current.clientHeight
    const initialWidth = containerRef.current.clientWidth

    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#ecf0f1',
      height: initialHeigh,
      width: initialWidth,
    })

   
    const workArea = new fabric.Rect({
      //@ts-ignore
      id: 'workarea',
      width: 250,
      height: 400,
      absolutePositioned: true,
      stroke: 'white',
      fill: 'transparent',
      strokeWidth: 1,
      selectable: false,
      hoverCursor: 'default',
      objectCaching: false,
      controlsAboveOverlay: true,
    })

    fabric.Image.fromURL(backgroundImage, (shirtImage) => {
      let shirtImageScaleFactor = Math.min(
        canvas.width / shirtImage.getScaledWidth(),
        canvas.height / shirtImage.getScaledHeight()
      );
      canvas.add(shirtImage);
      shirtImage.scale(shirtImageScaleFactor);
      shirtImage.lockMovementX = true
      shirtImage.sendToBack()
      shirtImage.selectable = false;
      shirtImage.lockMovementY = true
      shirtImage.center()
    })

    canvas.add(workArea)
    workArea.center()

    setEditor({
      ...editor,
      canvas: canvas,
      workArea: workArea
    })
  }, [])

  useEffect(() => {
    if(editor) {
      console.log(editor)
    }
  }, [editor])
  return (
    <div className="editor-canvas flex justify-center" ref={containerRef}>
      <canvas id="canvas"></canvas>
    </div>
  )
}

export default Canvas
