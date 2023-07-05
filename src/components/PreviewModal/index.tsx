import React, { useEffect ,useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalButton } from 'baseui/modal'
import usePreviewModal from 'src/hooks/usePreviewModal';
import { ROLE , SIZE} from 'baseui/modal';
// import CanvasCustom from '../../CanvasCustom';
import ThreeCanvas from 'src/components/ThreeCanvas';
import { useRef } from 'react';
import useElementSize from 'src/hooks/useElementSize';
import CanvasCustom from '../CanvasCustom';
type ModalProps = React.ComponentProps<typeof Modal>;

const PreviewModal: React.FC<ModalProps> = (props) => {
    const boxRef = useRef() as any;
    const modalRef = useRef()
    const previewModal = usePreviewModal()
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);        
    const { width, height } = useElementSize(boxRef, previewModal.isOpen);

    


    return (
        <Modal
            {...props}
            ref={modalRef}
            onClose={previewModal.onClose}
            isOpen={previewModal.isOpen}
            closeable
            animate
            autoFocus
            size={SIZE.default}
            role={ROLE.dialog}
            overrides={{
                Dialog: {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80vw',
                        height: '80vh',
                    },
                },
            }}
        >
            <ModalHeader>Preview and Customize your T-Shirt before publish</ModalHeader>
            <ModalBody ref={boxRef} $style={{
                display: 'flex', 
                flexGrow: '1', 
                width: '100%', 
                minHeight: '500px',
                padding: '2rem'
                }}>
                 {/* <CanvasCustom width={width} height={height}/> */}
                 <ThreeCanvas 
                    width={width}
                    height={height}
                 />
            </ModalBody>
            {/* <ModalFooter>
                <ModalButton>
                    Cancel
                </ModalButton>
                <ModalButton>Okay</ModalButton>
            </ModalFooter> */}
        </Modal>
    )
}

export default PreviewModal