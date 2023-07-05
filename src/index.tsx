import ReactDOM from "react-dom/client"
import Editor from './components/Editor'
import reportWebVitals from './reportWebVitals'
import { CanvasProvider } from './components/Canvas'
import { ChakraProvider } from '@chakra-ui/react'
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import ModalProvider from './providers/modals'
import 'focus-visible/dist/focus-visible'
import './i18n/index'
import './index.css'

const engine = new Styletron();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CanvasProvider>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <ModalProvider>
          <ChakraProvider>
            <Editor />
          </ChakraProvider>
        </ModalProvider>
      </BaseProvider>
    </StyletronProvider>
  </CanvasProvider>
)
