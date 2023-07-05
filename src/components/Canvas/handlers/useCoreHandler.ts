import { useCanvasContext } from 'src/components/Canvas/hooks'
import { useCallback } from 'react'
import { CanvasObjects } from 'src/components/Canvas'
import { propertiesToInclude } from '../constants/contants'
import useEditor from 'src/hooks/useEditor'
import { fabric } from 'fabric'
function useCoreHandler() {
  const {
    editor, setEditor
  } = useEditor()

  const { canvas, activeObject, workArea }
 = editor  // Add objects to canvas
  const addText = useCallback(
    options => {
      const { type, ...textOptions } = options
      const element = CanvasObjects[type].render(textOptions)
      //@ts-ignore
      const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')
      canvas.add(element)
      element.center()

      element.clipPath = workarea
      canvas.renderAll()
    },
    [canvas]
  )

  const addImage = useCallback(
    options => {
      const { type, ...imageOptions } = options
      // const element = CanvasObjects[type].render(imageOptions)

      const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')
      // Create a fabric.Image from URL
      fabric.Image.fromURL(imageOptions.src, (img: fabric.Image) => {
        // Set additional options for the image object
        let rFilter = new fabric.Image.filters.Resize({
          resizeType: 'lanczos',
          lanczosLobes: 3,
        
        })

        // img.filters =[rFilter]
        // img.applyFilters()
        img.resizeFilter = rFilter
        img.applyResizeFilters()

        canvas.renderAll()

   
       

        // img.scaleToWidth(1)
        // img.scaleToHeight(1)

        img.set({type: 'Image', 
        ...imageOptions,
          // left: workArea.left + offsetX,
          // top: workArea.top + offsetY,
      })
     
        canvas.add(img)
        img.center()
        // img.scale(0.3)
        img.clipPath = workarea
 
        canvas.renderAll()
        setEditor({...editor, canvas: canvas})
      } ,{ crossOrigin: 'anonymous'})
    },
    [canvas]
  )

  const removeObject = useCallback(() => {
    if (canvas && activeObject) {
      canvas.remove(activeObject)
    }
  }, [canvas, activeObject])

  // Update properties, optional set metadata if present
  const setProperty = useCallback(
    (property, value) => {
      if (activeObject) {
        activeObject.set(property, value)
        activeObject.setCoords()
        canvas.requestRenderAll()
      }
    },
    [activeObject, canvas]
  )

  const exportJSON = useCallback(() => {
    const json = canvas.toJSON(propertiesToInclude)
    return json
  }, [canvas])

  const loadJSON = useCallback(
    json => {
      if (canvas) {
        canvas.loadFromJSON(json, () => {
          canvas.requestRenderAll()
        })
      }
    },
    [canvas]
  )

  const setCanvasBackgroundColor = useCallback(
    color => {
      // @ts-ignore
      const workarea = canvas.getObjects().find(object => object.id === 'workarea')
      if (workarea) {
        workarea.set('fill', color)
        canvas.requestRenderAll()
      }
    },
    [canvas]
  )

  return { exportJSON, loadJSON, setCanvasBackgroundColor, addText, removeObject, setProperty, addImage }
}

export default useCoreHandler
