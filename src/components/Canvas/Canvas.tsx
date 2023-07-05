import { useEffect } from 'react'
import useCanvasContext from 'src/components/Canvas/hooks/useCanvasContext'
import { fabric } from 'fabric'
import useEditor from 'src/hooks/useEditor'
import { imageCalculate } from './utils/imageCalculate'
import {
  useCustomizationHandler,
  useEventsHandler,
  useZoomHandler,
  useContainerHandler,
  useGuidelinesHandler,
  useGrid,
  useObjects
} from 'src/components/Canvas/handlers'
import ObjectInfo from '../Objects/Info'
function Canvas() {
  const containerRef = useContainerHandler()
  const { setCanvas } = useCanvasContext()
  const { editor , setEditor } = useEditor()
  const { backgroundImage, activeObject } = editor

  useCustomizationHandler()
  useGuidelinesHandler()
  useEventsHandler()
  useZoomHandler()
  // useGrid()
  useObjects()

  useEffect(() => {
    const screenHeight = containerRef.current.clientHeight
    const screenWidth = containerRef.current.clientWidth
    const dimensionWidth = 4800
    const dimensionHeight = 5400

    // const workAreaAspectRatio = dimensionWidth/dimensionHeight
    // if (screenWidth / screenHeight > workAreaAspectRatio) {
    //   dimensionWidth = screenHeight * workAreaAspectRatio;
    //   dimensionHeight = screenHeight;
    // } else {
    //   dimensionWidth = screenWidth;
    //   dimensionHeight = screenWidth / workAreaAspectRatio;
    // }

    // const scaleRatio = dimensionWidth / screenWidth;

    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#ecf0f1',
      height: screenHeight,
      width: screenWidth,
    })

    const zoomRatio = Math.min(screenWidth / dimensionWidth, screenHeight / dimensionHeight);
    const center = canvas.getCenter();
    const centerPoint = new fabric.Point(center.left, center.top);

    const workArea = new fabric.Rect({
      //@ts-ignore
      id: 'workarea',
      type: 'workarea',
      width: dimensionWidth,
      height: dimensionHeight,
      absolutePositioned: true,
       stroke: 'transparent', // Set the stroke to 'transparent' or null
      strokeWidth: 0, // Set the strokeWidth to 0
      fill: 'transparent',
      selectable: false,
      hoverCursor: 'default',
      objectCaching: true,
      backgroundColor: 'white',
    })


    // workArea.set({
    //   scaleRatio: zoomRatio
    // })

    console.log('zoomRatio: ', zoomRatio)

    canvas.add(workArea)
    workArea.center()


    canvas.zoomToPoint(centerPoint, zoomRatio);


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
        // scaleRatio: scaleRatio
      })

      setEditor({
        ...editor,
        canvas: canvas,
        workArea: workArea
      })
    }

    // canvas.on('resize', handleResize)
 

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
      workArea: workArea,
      zoomRatio: zoomRatio
    })
  }, [])

 

  useEffect(() => {
    if(editor) {
      console.log(editor)
    }
  }, [editor])
  return (
    <div className="editor-canvas flex justify-center relative" ref={containerRef}>
      <ObjectInfo isShow={true}/>
      <canvas id="canvas"></canvas>
    </div>
  )
}

export default Canvas
