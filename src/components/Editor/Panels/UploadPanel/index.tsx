import React from "react"
import { Block } from "baseui/block"
import { Button, SIZE, KIND } from "baseui/button"
import DropZone from "src/components/Dropzone"
import useEditor from "src/hooks/useEditor"
import { toBase64 } from "src/utils/data"
import { fabric } from "fabric"
import { nanoid } from "nanoid"
// import getMetadata from "~/actions/getMetadata"
// import { metadataProps } from "~/actions/getMetadata"
import { lanczosFilter } from "src/utils/filters"
import { useCoreHandler } from "src/components/Canvas/handlers"
export default function () {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [uploads, setUploads] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const {editor} = useEditor()
  const { addImage } = useCoreHandler()
//   const setIsSidebarOpen = useSetIsSidebarOpen()
  const { canvas } = editor
  const handleDropFiles = async (files: FileList) => {
    const file = files[0]

    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let preview = base64


    const upload = {
      id: nanoid(),
      src: base64,
      preview: preview,
      type: 'Image',
    }

    setUploads([...uploads, upload])
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }




  const addImageToCanvas = async (props) => {

    if (canvas) {
        console.log('add imag')
      let imgSrc = props.src

      if(!imgSrc) return 
      
      
      handleAddImage(imgSrc)
     
    }
  }

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "Image",
          src: url,
        }
        addImage(options)
      }
    },
    [editor]
  )

  const handleAddImage = async (imgSrc: string) => {
    try {
      setIsLoading(true)
      // const metadata:metadataProps = await getMetadata(imgSrc)

      console.log('add Image src: ', imgSrc)
      fabric.Image.fromURL(imgSrc, (img: fabric.Image) => {
        let scaleRatio = 300 / 100
       
        // img.resizeFilter = new fabric.Image.filters.Resize({
        //   resizeType: 'lanzcos'
        // })
        // img.applyResizeFilters();
        
          
        img.set({
          type: 'Image',
          prevScale: scaleRatio,
          dpi: 100,
          scaled: 1,
          objectCaching: true,
        })


        addObject(imgSrc)


        // var scaleFactor = canvas.workare.width / img.width;

        // img.scale(scaleRatio)
         
       
      
       
        // canvas.canvas.add(img)
        canvas.canvas.renderAll()
        img.center()

      //   canvas.canvas.on('before:render', function() {
      //     img.applyResizeFilters()
      //  })
      })
    } catch (err) {

    } finally {
      setIsLoading(false)
    }
  }


  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }} className="p-4 w-full">
        <Block
          $style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            justifyContent: "space-between",
            padding: "1.5rem",
          }}
        >
          <Block>Uploads</Block>

        
        </Block>
        {/* <Scrollable> */}
          <Block padding={"0 1.5rem"} className="overflow-auto">
            <button
              onClick={handleInputFileRefClick}
              // size={SIZE.compact}
              // kind={KIND.secondary}
              // isLoading={isLoading}
              
            >
              Computer
            </button>
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />

            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => addImageToCanvas(upload)}
                >
                  <div >
                    <img width="100%" src={upload.preview ? upload.preview : upload.url} alt="preview" />
                  </div>
                </div>
              ))}
            </div>
          </Block>
        {/* </Scrollable> */}
      </Block>
    </DropZone>
  )
}
