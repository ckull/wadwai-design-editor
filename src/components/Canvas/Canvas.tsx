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
  useGrid,
  useObjects
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
  // useGrid()
  useObjects()
  useEffect(() => {
    const screenHeight = containerRef.current.clientHeight
    const screenWidth = containerRef.current.clientWidth
    const dimensionWidth = 711
    const dimensionHeight = 720

    const workAreaAspectRatio = dimensionWidth/dimensionHeight

    let workAreaWidth, workAreaHeight;

    if (screenWidth / screenHeight > workAreaAspectRatio) {
      workAreaWidth = screenHeight * workAreaAspectRatio;
      workAreaHeight = screenHeight;
    } else {
      workAreaWidth = screenWidth;
      workAreaHeight = screenWidth / workAreaAspectRatio;
    }

    console.log(workAreaWidth, workAreaHeight, workAreaAspectRatio)

    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#ecf0f1',
      height: screenHeight,
      width: screenWidth,
    })

    const zoomRatio = Math.min(screenWidth / workAreaWidth, screenHeight / workAreaHeight);
    const center = canvas.getCenter();
    const centerPoint = new fabric.Point(center.left, center.top);

    const workArea = new fabric.Rect({
      //@ts-ignore
      id: 'workarea',
      type: 'workarea',
      width: workAreaWidth,
      height: workAreaHeight,
      absolutePositioned: true,
      fill: 'transparent',
      selectable: false,
      hoverCursor: 'default',
      objectCaching: false,
      controlsAboveOverlay: true,
      backgroundColor: 'white',
    })

    canvas.add(workArea)
    workArea.center()
    

    const scaleRatio = dimensionWidth / workAreaWidth;
    console.log('scaleRatio: ', scaleRatio)

    console.log('zoomRatio: ', zoomRatio)

    workArea.set({
      scaleRatio: scaleRatio
    })
    // canvas.setZoom(zoomRatio);
    canvas.zoomToPoint(centerPoint, 0.9);


    canvas.renderAll()


    const handleResize = () => {
      const screenHeight = containerRef.current.clientHeight
      const screenWidth = containerRef.current.clientWidth
      let workAreaWidth, workAreaHeight;

      if (screenWidth / screenHeight > workAreaAspectRatio) {
        workAreaWidth = screenHeight * workAreaAspectRatio;
        workAreaHeight = screenHeight;
      } else {
        workAreaWidth = screenWidth;
        workAreaHeight = screenWidth / workAreaAspectRatio;
      }

      const scaleRatio = dimensionWidth / workAreaWidth;

      console.log('canvas scaleRatio: ', scaleRatio)
      // Update the canvas dimensions to match the container
      canvas.setDimensions({
        width: screenWidth,
        height: screenHeight,
      });

      workArea.set({
        width: screenWidth,
        height: screenHeight,
        scaleRatio: scaleRatio
      })

      setEditor({
        ...editor,
        canvas: canvas,
        workArea: workArea
      })
    }

    canvas.on('resize', handleResize)
 

    // fabric.Image.fromURL(backgroundImage, (shirtImage) => {
    //   let shirtImageScaleFactor = Math.min(
    //     canvas.width / shirtImage.getScaledWidth(),
    //     canvas.height / shirtImage.getScaledHeight()
    //   );
    //   shirtImage.set({type: 'backgroundImage'})
    //   canvas.add(shirtImage);
    //   shirtImage.scale(shirtImageScaleFactor);
    //   shirtImage.lockMovementX = true
    //   shirtImage.sendToBack()
    //   shirtImage.selectable = false;
    //   shirtImage.lockMovementY = true
    //   shirtImage.center()
    // })

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
