import { atom } from 'jotai';

type EditorType = {
    canvas: fabric.Canvas | null;
    previewCanvas: fabric.Canvas | null;
    workArea: any | null; // Update the type as per your requirements
    backgroundImage: string | null;
    activeObject: fabric.Object | null;
    zoomRatio: number | null;
    objects: any[] | null; // Update the type as per your requirements
};

const canvasAtom = atom<EditorType>({
    canvas: null,
    previewCanvas: null,
    workArea: null,
    backgroundImage: '/black-shirt.jpg',
    activeObject: null,
    zoomRatio: null,
    objects: null,
});

export default canvasAtom