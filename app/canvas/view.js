export default class CanvasView {
    constructor() {
        this.canvas = document.querySelector('.canvas')
    }

    initializeStartScreen(width, height) {
        const elementSetCanvasWidth = document.querySelector('.canvas-size__input-width')
        const elementSetCanvasHeight = document.querySelector('.canvas-size__input-height')
        const elementCanvas = this.renderCanvas(width, height)
        
        return {
            elementSetCanvasWidth,
            elementSetCanvasHeight,
            elementCanvas
        }
    }

    renderCanvas(width, height) {
        if (this.canvas.firstChild) {
            while (this.canvas.firstChild) {
                this.canvas.firstChild.remove();
            }
        }

        this.drawObjectOnCanvas(
            this.renderCanvasRowOrCol('canvas__col-wrap', 'canvas__col-item', width)
        )
        this.drawObjectOnCanvas(
            this.renderCanvasRowOrCol('canvas__row-wrap', 'canvas__row-item', height)
        )

        return this.canvas
    }

    renderCanvasRowOrCol(itemWrapClass, itemClass, size) {
        const itemArray = new Array(size + 1).fill(null)

        const itemWrap = document.createElement('div')

        itemWrap.classList.add(itemWrapClass)

        itemArray.forEach((item) => {
            item = document.createElement('div')
            item.classList.add(itemClass)
            itemWrap.insertAdjacentElement('beforeend', item)
        })

        return itemWrap
    }

    drawObjectOnCanvas(element) {
        this.canvas.insertAdjacentElement('beforeend', element)
    }

    moveObjectOnCanvas(oldCoordX, oldCoordY, newX, newY, pxX, pxY) {
        const element = document.querySelector(`[data-x='${oldCoordX}'][data-y='${oldCoordY}']`)

        element.style.left = pxX
        element.style.top = pxY

        element.setAttribute('data-x', newX)
        element.setAttribute('data-y', newY)
    }
}
