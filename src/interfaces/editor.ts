import { fabric } from "fabric"

export interface EditorType {
    canvas: fabric.Canvas | null,
    workSpace: fabric.Rect | null,
    backgroundImage: string | null,
    activeObject: fabric.Object | null,
    zoomRatio: null,
    objects: null,
}
