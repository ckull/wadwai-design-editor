import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import  canvasAtom  from 'src/stores/canvasAtom';
const useEditor = () => {
    const [editor, setEditor] = useAtom(canvasAtom)


    return { editor, setEditor}
}

export default useEditor