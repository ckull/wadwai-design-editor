import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import { editorAtom } from 'src/stores/canvasState';
const useEditor = () => {
    const [editor, setEditor] = useAtom(editorAtom)


    return { editor, setEditor}
}

export default useEditor