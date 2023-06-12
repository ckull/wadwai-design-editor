import { useCanvasContext } from 'src/components/Canvas/hooks'
import DefaultToolbox from './DefaultToolbox/DefaultToolbox'
import TextToolbox from './TextToolbox/TextToolbox'
import useEditor from 'src/hooks/useEditor'
import './Toolbox.scss'

function Toolbox() {
  const { editor: {activeObject} } = useEditor()
  if (!activeObject) {
    return <DefaultToolbox />
  }
  const activeObjectType = activeObject.type

  return <div>{activeObjectType === 'textbox' ? <TextToolbox /> : <DefaultToolbox />}</div>
}

export default Toolbox
