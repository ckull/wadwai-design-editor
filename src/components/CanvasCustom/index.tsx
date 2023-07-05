import { useEffect, useRef, useContext, useState, RefObject } from 'react'
// import { useCanvasContext } from '@components/Canvas/hooks'
import { fabric } from 'fabric'
import useEditor from 'src/hooks/useEditor'
import useElementSize from 'src/hooks/useElementSize'
import { useAtom } from 'jotai'
import { dataUrlAtom } from '../Modals/PreviewModal/store/dataUrl'

interface CanvasCustomProps {
  width: number,
  height: number
}

const CanvasCustom: React.FC<CanvasCustomProps> = ({ width, height }) => {
  //   const containerRef = useContainerHandler()
  //   const { setCanvas } = useCanvasContext()
  const [workArea, setWorkArea] = useState()
  const canvasRef: any = useRef(null)
  const workAreaRef: any = useRef(null)
  const shirtRef: any = useRef(null)
  const isMounted: any = useRef(true)
  const maskRef: any = useRef()
  const editor = useEditor()
  const [dataUrl, setDataUrl] = useAtom(dataUrlAtom)

  

  useEffect(() => {


    if (!width && !height) return



    if (isMounted.current) {


      workAreaRef.current = new fabric.Rect({
        //@ts-ignore
        id: 'workarea',
        width: 200,
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

      canvasRef.current = new fabric.Canvas(canvasRef.current, {
        backgroundColor: '#acacac',
        // backgroundImage: '/blackShirt.jpg',
        width: width - 48,
        height: height,

      })

      fabric.Image.fromURL('/black-shirt.jpg', (shirtImage) => {
        // Scale the shirt image to fit within the canvas
        let shirtImageScaleFactor = Math.min(
          canvasRef.current.width / shirtImage.getScaledWidth(),
          canvasRef.current.height / shirtImage.getScaledHeight()
        );
        canvasRef.current.add(shirtImage);
        shirtImage.scale(shirtImageScaleFactor);
        shirtImage.lockMovementX = true
        shirtImage.sendToBack()
        shirtImage.selectable = false;
        shirtImage.lockMovementY = true
        shirtImage.center()

        shirtRef.current = shirtImage
      });

      canvasRef.current.add(workAreaRef.current)

      isMounted.current = false
    }



    if (!isMounted.current) {
      canvasRef.current.clipTo = function (ctx: any) {
        workAreaRef.current.render(ctx);
      };
      canvasRef.current.setWidth(width - 48);
      canvasRef.current.setHeight(height);
      canvasRef.current.renderAll();
    }


    workAreaRef.current.center()
    // workAreaRef.current.clipPath = new fabric.Rect({
    //   width: workAreaRef.current.width,
    //   height: workAreaRef.current.height,
    //   top: workAreaRef.current.top,
    //   left: workAreaRef.current.left,
    //   absolutePositioned: true,
    // });

    if (shirtRef.current) {
      shirtRef.current.center()
    }




    // workAreaRef.current.clipPath = new fabric.Rect({
    //   left: maskRef.current.left,
    //   top: maskRef.current.top,
    //   width: maskRef.current.width,
    //   height: maskRef.current.height,
    // });

    setWorkArea(workAreaRef.current)



  }, [width, height])

  useEffect(() => {
    if(!workArea) return
    loadImage()
  }, [workArea])






  const loadBackground = () => {
    fabric.Image.fromURL('/black-shirt.jpg', (img) => {

      // Set the shirt image as the canvasRef.current background
      canvasRef.current.setBackgroundImage(img, canvasRef.current.renderAll.bind(canvasRef.current, {
        scaleX: canvasRef.current.width,
        scaleY: canvasRef.current.height,

      }));

    })
  }



  const loadImage = async () => {
    const currentScene = editor.scene.exportToJSON()
    const filtered = {
      ...currentScene,
      layers: currentScene['layers'].filter(item => item.id != 'background')
    }

    // console.log('filtered: ', filtered)
    const dataUrl = await editor.renderer.render(filtered)
    
    console.log('canvas: ',editor.canvas)
    
    // const imageUrl = `${image}`; // Replace with your Base64 image string
    // const dataUrl = editor.canvas.toDataURL()
  
    fabric.Image.fromURL(dataUrl, (img, error) => {
      if(error) {
        console.log('error')
        return
      }
      console.log('img: ', img)
      let scaleFactor = workArea.width / img.getScaledWidth();

      // If the scaled image's height is still larger than the canvas height
      if (img.getScaledHeight() * scaleFactor > workArea.height) {
        // Recompute the scale factor based on height instead
        scaleFactor = workArea.height / img.getScaledHeight();
      }

      // Scale the image
      img.scale(scaleFactor);


      // img.set({
      //   clipPath: workArea
      // });

     

      canvasRef.current.add(img);
   
      img.center()
  
      canvasRef.current.renderAll()

    });
  };

  return (
    <canvas ref={canvasRef}> </canvas>
  )
}

export default CanvasCustom