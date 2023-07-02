import './Navbar.scss'
import { DownloadIcon, LogoIcon, GithubIcon } from './NavbarIcons'
import useEditor from 'src/hooks/useEditor'
import { fabric } from 'fabric'
function Navbar() {
  const { editor } = useEditor()

  const handleDownload = () => {

      const { canvas, workArea } = editor

      const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')

      // canvas.clipTo = function (ctx: any) {
      //   workarea.render(ctx);
      // };

      const dataUrl = canvas.toDataURL({
        format: 'png',
        // multiplier: workArea.scaleRatio,
        left: workArea.left,
        top: workArea.top,
        width: workArea.width,
        height: workArea.height,
      });


      // console.log('workArea: ', workarea)
      // const tempCanvas = new fabric.Canvas('temp', {
      //   height: workarea.height,
      //   width: workarea.width,
      // })

      // tempCanvas.add(workarea);
      // tempCanvas.renderAll()
      // workarea.center()

      //  const dataUrl = tempCanvas.toDataURL({
      //   format: 'png',
      //   multiplier: workArea.scaleRatio,
      //   enableRetinaScaling: false,
      // });
    

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'download.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
     
      

     
    
  }

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
      </div>
    </div>
  )
}

export default Navbar
