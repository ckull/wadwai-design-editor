import { atom } from 'jotai';
import { EditorType } from 'src/interfaces/editor';

export const editorAtom = atom({
    canvas: null,
    workArea: null,
    backgroundImage: null,
    activeObject: null,
    zoomRatio: null,
});
