export default class CanvasModel {
    constructor() {
        this.canvasWidth
        this.canvasHeight
    }

    set setCanvasWidth(width) {
        this.canvasWidth = Number(width)
    }

    set setCanvasHeight(height) {
        this.canvasHeight = Number(height)
    }

    get getCanvasWidth() {
        return this.canvasWidth
    }

    get getCanvasHeight() {
        return this.canvasHeight
    }
}
