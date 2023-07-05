import PreviewModal from "src/components/PreviewModal"

const ModalProvider = ({children}) => {

    return (
        < >
            <PreviewModal/>
            { children}
        </>
    )
}

export default ModalProvider