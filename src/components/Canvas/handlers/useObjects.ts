import { useEffect, useState} from "react"
import useEditor from "src/hooks/useEditor"
const useObjects = () => {
    const { editor, setEditor } = useEditor()
    const { canvas } = editor
    const [layers, setLayers] = useState()

    useEffect(() => {
        if(canvas) {
            console.log('workArea: ', canvas.getObjects())
          canvas.on('object:added', onChanged)
          canvas.on('object:removed', onChanged)

          return () => {
            canvas.off('object:added', onChanged)
            canvas.off('object:removed', onChanged)
  
          }
        }
    }, [canvas])


    const onChanged = (changed: any) => {
        console.log('onchanged')
        let filtered = canvas.getObjects().filter(item => item.type !== ('grid' || 'workarea'))
        console.log('filter: ', filtered)
        setEditor({
            ...editor, 
            objects: filtered
        })
    }


  return {layers}
}

export default useObjects
