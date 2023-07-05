import './Navbar.scss'
import { DownloadIcon, LogoIcon, GithubIcon } from './NavbarIcons'
import useEditor from 'src/hooks/useEditor'
import { fabric } from 'fabric'
import { Button } from '@chakra-ui/react'
import {useCallback} from 'react'
import usePreviewModal from 'src/hooks/usePreviewModal'
function Navbar() {
  const { editor } = useEditor()
  const { canvas, workArea, zoomRatio } = editor
  const previewModal = usePreviewModal()


  const handleDownload = useCallback(() => {

    
    const center = canvas.getCenter();
    const centerPoint = new fabric.Point(center.left, center.top);
    const zoomIn = zoomRatio

    const zoomOut = 1.2-zoomIn
    canvas.zoomToPoint(centerPoint, 1)
    const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')

    console.log('wokArea: ', workarea)
    console.log('canvas: ', canvas)
    const dataUrl = canvas.toDataURL({
      format: 'png',
      left: centerPoint.x - workarea.width / 2,
      top: centerPoint.y - workarea.height / 2,
      width: workarea.width,
      height: workarea.height,
    });
    canvas.zoomToPoint(centerPoint, zoomIn);
    
    

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'download.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }, [canvas, zoomRatio])

  const togglePreviewModal = useCallback(() => {
    previewModal.onOpen()

    const center = canvas.getCenter();
    const centerPoint = new fabric.Point(center.left, center.top);
    const zoomIn = zoomRatio
    console.log('zoomIn: ', zoomIn)

    const zoomOut = 1.2-zoomIn
    canvas.zoomToPoint(centerPoint, 1)

    const dataUrl = canvas.toDataURL({
      format: 'png',
      left: workArea.left,
      top: workArea.top,
      width: workArea.width,
      height: workArea.height,
    });

    previewModal.setDataURL(dataUrl)

    canvas.zoomToPoint(centerPoint, zoomIn);

  }, [canvas, workArea, zoomRatio])

  return (
    <div className="navbar">
      <div className="navbar-left">
        <LogoIcon />
      </div>
      <div className="navbar-action-items">
        <div onClick={handleDownload}>
          <DownloadIcon />
        </div>
        <a href="https://github.com/xorb/react-design-editor">
          <GithubIcon />
        </a>
        <Button variant='ghost' onClick={togglePreviewModal}>
          Export
        </Button>
      </div>
    </div>
  )
}

export default Navbar
