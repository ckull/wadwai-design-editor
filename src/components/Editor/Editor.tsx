import Navbar from 'src/components/Editor/Navbar/Navbar'
import Panels from 'src/components/Editor/Panels/Panels'
import FooterMenu from './FooterMenu/FooterMenu'
import Toolbox from 'src/components/Editor/Toolbox/Toolbox'
import CanvasArea from 'src/components/Editor/CanvasArea/CanvasArea'
import './Editor.scss'

function Editor() {
  return (
    <div className="editor">
      <Navbar />
      <div className="section-two">
        <Panels />
        <div className="section-three">
          <Toolbox />
          <CanvasArea />
          <FooterMenu />
        </div>
      </div>
    </div>
  )
}

export default Editor
