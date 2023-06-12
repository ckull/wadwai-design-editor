import { atom } from 'jotai';
import { EditorType } from 'src/interfaces/editor';

const canvasAtom = atom({
    canvas: null,
    workArea: null,
    backgroundImage: '/black-shirt.jpg',
    activeObject: null,
    zoomRatio: null,
});

export default canvasAtom