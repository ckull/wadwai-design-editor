import './Navbar.scss'
import { DownloadIcon, LogoIcon, GithubIcon } from './NavbarIcons'
import useEditor from 'src/hooks/useEditor'
function Navbar() {
  const { editor } = useEditor()

  const handleDownload = () => {
    if(editor) {
      const { canvas, workArea } = editor

      canvas.clipTo = function (ctx) {
        ctx.rect(
          workArea.left,
          workArea.top,
          workArea.width,
          workArea.height
        );
      };

      console.log('editor: ', canvas)
      const dataUrl = canvas.toDataURL({
        format: 'png',
        multiplier: workArea.scaleRatio,
      });

      canvas.clipTo = null;


      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'download.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
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
