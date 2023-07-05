import { fabric } from "fabric"

export const imageCalculate = (
    target: any,
    transform: any) => {
        let changedScale = transform.target.scaleX
        let scaled = target.scaled
        let scaleFactor = changedScale / scaled;
        let width = scaleFactor * (target.width * target.scaled)
        let height = scaleFactor * (target.height * target.scaled)
        let newDpi = target.dpi * (1 / scaleFactor)

        return {
            width,
            height,
            dpi: parseInt(newDpi)
        }

}