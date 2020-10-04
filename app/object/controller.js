export default class ObjectController {
    constructor(view, model, canvasController) {
        this.view = view
        this.model = model
        this.canvasController = canvasController

        this.setObjectX
        this.setObjectY
        this.setObjectForm

        this.getObjectX
        this.getObjectY
        this.getObjectForm

        this.moveObjectToCoordinatesX
        this.moveObjectToCoordinatesY
        this.moveObjectToCoordinatesForm

        this.moveObjectToDistanceX
        this.moveObjectToDistanceY
        this.moveObjectToDistanceForm

        this.rotateAroundX
        this.rotateAroundY
        this.rotateAroundRadius
        this.rotateAroundAngle
        this.rotateAroundForm
    }

    initializeStartScreen() {
        this.initializeElementsForSetObject()
        this.initializeElementsForGetObject()
        this.initializeElementsForMoveObjectToCoordinates()
        this.initializeElementsForMoveObjectToDistance()
        this.initializeElementsForRotateAround()
    }

    initializeElementsForSetObject() {
        const {
            setObjectX,
            setObjectY,
            setObjectForm
        } = this.view.getElementsForSetObject

        this.setObjectX = setObjectX
        this.setObjectY = setObjectY
        this.setObjectForm = setObjectForm

        this.setListenerToInput(this.setObjectX)
        this.setListenerToInput(this.setObjectY)

        this.setListenerToFormSetObject(this.setObjectForm)
    }

    initializeElementsForGetObject() {
        const {
            getObjectX,
            getObjectY,
            getObjectForm
        } = this.view.getElementsForGetObject

        this.getObjectX = getObjectX
        this.getObjectY = getObjectY
        this.getObjectForm = getObjectForm

        this.setListenerToInput(this.getObjectX)
        this.setListenerToInput(this.getObjectY)

        this.setListenerToFormGetObject(this.getObjectForm)
    }

    initializeElementsForMoveObjectToCoordinates() {
        const {
            moveObjectToCoordinatesX,
            moveObjectToCoordinatesY,
            moveObjectToCoordinatesForm
        } = this.view.getElementsForMoveObjectToCoordinates

        this.moveObjectToCoordinatesX = moveObjectToCoordinatesX
        this.moveObjectToCoordinatesY = moveObjectToCoordinatesY
        this.moveObjectToCoordinatesForm = moveObjectToCoordinatesForm

        this.setListenerToInput(this.moveObjectToCoordinatesX)
        this.setListenerToInput(this.moveObjectToCoordinatesY)

        this.setListenerToFormMoveObjectToCoordinates(this.moveObjectToCoordinatesForm)
    }

    initializeElementsForMoveObjectToDistance() {
        const {
            moveObjectToDistanceX,
            moveObjectToDistanceY,
            moveObjectToDistanceForm
        } = this.view.getElementsForMoveObjectToDistance

        this.moveObjectToDistanceX = moveObjectToDistanceX
        this.moveObjectToDistanceY = moveObjectToDistanceY
        this.moveObjectToDistanceForm = moveObjectToDistanceForm

        this.setListenerToFormMoveObjectToDistance(this.moveObjectToDistanceForm)
    }

    initializeElementsForRotateAround() {
        const {
            rotateAroundX,
            rotateAroundY,
            rotateAroundRadius,
            rotateAroundAngle,
            rotateAroundForm
        } = this.view.getElementsRotateAround

        this.rotateAroundX = rotateAroundX
        this.rotateAroundY = rotateAroundY
        this.rotateAroundRadius = rotateAroundRadius
        this.rotateAroundAngle = rotateAroundAngle
        this.rotateAroundForm = rotateAroundForm

        this.setListenerToInput(this.rotateAroundX)
        this.setListenerToInput(this.rotateAroundY)
        this.setListenerToInput(this.rotateAroundRadius)
        this.setListenerToInput(this.rotateAroundAngle)

        this.setListenerToFormMoveRotateAround(this.rotateAroundForm)
    }

    setListenerToInput(element) {
        element.addEventListener('input', (e) => {
            const onlyDigit = e.target.value.match(/(\d+)/)
            e.target.value = onlyDigit ? onlyDigit[0] : ''
        })
    }

    setListenerToFormSetObject(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const x = this.setObjectX.value
            const y = this.setObjectY.value
            const color = '#000000'
            const objectElement = { x, y, color }

            this.model.setObjectToContainer = objectElement
            this.canvasController.drawObjectOnCanvas(
                this.view.createObjectForCanvas(objectElement)
            )
        })
    }

    setListenerToFormGetObject(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const x = this.getObjectX.value
            const y = this.getObjectY.value

            this.model.setObjectForOperations(x, y)
        })
    }

    setListenerToFormMoveObjectToCoordinates(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const x = this.moveObjectToCoordinatesX.value
            const y = this.moveObjectToCoordinatesY.value

            this.model.setCoordinatesForObjectToOperation = { newX: x, newY: y }
            this.canvasController.moveObjectOnCanvas(this.model.getObjectForOperations)
            this.model.equalNewAndOldCoordinatesForObjectToOperation()
        })
    }

    setListenerToFormMoveObjectToDistance(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const x = Number(this.moveObjectToDistanceX.value) + Number(this.model.getObjectForOperations.x)
            const y = Number(this.moveObjectToDistanceY.value) + Number(this.model.getObjectForOperations.y)

            this.model.setCoordinatesForObjectToOperation = { newX: x, newY: y }
            this.canvasController.moveObjectOnCanvas(this.model.getObjectForOperations)
            this.model.equalNewAndOldCoordinatesForObjectToOperation()
        })
    }

    setListenerToFormMoveRotateAround(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const x = Number(this.rotateAroundX.value)
            const y = Number(this.rotateAroundY.value)
            const radius = Number(this.rotateAroundRadius.value)
            const angle = Number(this.rotateAroundAngle.value)
            const angleRad = angle * Math.PI / 180

            this.model.setCoordinatesForObjectToOperation = { newX: x, newY: y }
            this.canvasController.moveObjectOnCanvas(this.model.getObjectForOperations)
            this.model.equalNewAndOldCoordinatesForObjectToOperation()

            this.rotateAnimate(100, radius, angleRad)
            // this.getCoordinatesForRotate(radius, angleRad)
        })
    }

    rotateAnimate(duration, radius, angleRad) {
        let start = performance.now();

        const animate = (time) => {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            if (timeFraction < 1) {
                this.getCoordinatesForRotate(radius, angleRad * timeFraction)
                requestAnimationFrame(animate);
            }

        }
        
        requestAnimationFrame(animate);
    }

    getCoordinatesForRotate(radius, angleRad) {
        // this.canvasController.getCanvasSize.canvasPxWidth / this.canvasController.getCanvasSize.canvasWidth
console.log(Math.cos(angleRad) * radius)
        const { x: newX, y: newY } = this.model.getObjectForOperationsCoordinates
        
        this.model.setCoordinatesForObjectToOperation = {
            newX: newX + 2,
            newY: newY + 2
        }
        // this.canvasController.moveObjectOnCanvas(this.model.getObjectForOperations)
        this.canvasController.moveObjectOnCanvas({ x: newX, y: newY, newX: newX + 1, newY: newY + 1 })
        this.model.equalNewAndOldCoordinatesForObjectToOperation()
    }
}
