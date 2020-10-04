import { CANVAS_DEFAULT_WIDTH, CANVAS_DEFAULT_HEIGHT } from './../constants.js'

export default class CanvasController {
    constructor(view, model) {
        this.view = view
        this.model = model

        this.model.setCanvasWidth = CANVAS_DEFAULT_WIDTH
        this.model.setCanvasHeight = CANVAS_DEFAULT_HEIGHT

        this.elementSetCanvasWidth
        this.elementSetCanvasHeight
        this.elementCanvas
    }

    initializeViewStartScreen() {
        const {
            elementSetCanvasWidth,
            elementSetCanvasHeight,
            elementCanvas
        } = this.view.initializeStartScreen(
            this.model.getCanvasWidth,
            this.model.getCanvasHeight
        )

        this.elementSetCanvasWidth = elementSetCanvasWidth
        this.elementSetCanvasHeight = elementSetCanvasHeight
        this.elementCanvas = elementCanvas

        this.elementSetCanvasWidth.value = this.model.getCanvasWidth
        this.elementSetCanvasHeight.value = this.model.getCanvasHeight

        this.setListenerToInputForCanvasSetSize(this.elementSetCanvasWidth)
        this.setListenerToInputForCanvasSetSize(this.elementSetCanvasHeight)
    }

    setListenerToInputForCanvasSetSize(element) {
        element.addEventListener('input', (e) => {
            if (isNaN(Number(e.target.value.slice(-1)))) {
                e.target.value = e.target.value.slice(0, -1)
                return
            }

            e.target === this.elementSetCanvasWidth
                ? this.model.setCanvasWidth = e.target.value
                : this.model.setCanvasHeight = e.target.value

            this.view.renderCanvas(
                this.model.getCanvasWidth,
                this.model.getCanvasHeight
            )
        })
    }

    drawObjectOnCanvas(element) {
        const canvasPxWidth = this.elementCanvas.offsetWidth
        const canvasPxHeight = this.elementCanvas.offsetHeight

        element.style.left = `${canvasPxWidth / this.model.getCanvasWidth * Number(element.getAttribute('data-x')) - Number(element.style.width.match(/(\d+)/)[0]) / 2}px`
        element.style.top = `${canvasPxHeight / this.model.getCanvasHeight * Number(element.getAttribute('data-y')) - Number(element.style.height.match(/(\d+)/)[0]) / 2}px`

        this.view.drawObjectOnCanvas(element)
    }

    moveObjectOnCanvas({ x, y, newX, newY }) {
        const canvasPxWidth = this.elementCanvas.offsetWidth
        const canvasPxHeight = this.elementCanvas.offsetHeight
        
        const elementPxX = `${canvasPxWidth / this.model.getCanvasWidth * Number(newX) - 10 / 2}px`
        const elementPxY = `${canvasPxHeight / this.model.getCanvasHeight * Number(newY) - 10 / 2}px`

        this.view.moveObjectOnCanvas(x, y, newX, newY, elementPxX, elementPxY)
    }

    get getCanvasSize() {
        const canvasWidth = this.model.getCanvasWidth
        const canvasHeight = this.model.getCanvasHeight
        const canvasPxWidth = this.elementCanvas.offsetWidth
        const canvasPxHeight = this.elementCanvas.offsetHeight
        
        return {
            canvasWidth,
            canvasHeight,
            canvasPxWidth,
            canvasPxHeight
        }
    }
}
