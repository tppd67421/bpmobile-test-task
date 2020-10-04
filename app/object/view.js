export default class ObjectView {
    constructor() {

    }

    createObjectForCanvas({ x, y, color }) {
        const element = document.createElement('div')

        element.classList.add('canvas__object')

        element.style.width = '10px'
        element.style.height = '10px'
        element.style.borderRadius = '50px'
        element.style.background = color

        element.setAttribute('data-x', x)
        element.setAttribute('data-y', y)

        return element
    }

    get getElementsForSetObject() {
        const setObjectX = document.querySelector('.set-object__x')
        const setObjectY = document.querySelector('.set-object__y')
        const setObjectForm = document.querySelector('.set-object')

        return { setObjectX, setObjectY, setObjectForm }
    }

    get getElementsForGetObject() {
        const getObjectX = document.querySelector('.get-object__x')
        const getObjectY = document.querySelector('.get-object__y')
        const getObjectForm = document.querySelector('.get-object')

        return { getObjectX, getObjectY, getObjectForm }
    }

    get getElementsForMoveObjectToCoordinates() {
        const moveObjectToCoordinatesX = document.querySelector('.move-object-to-coordinates__x')
        const moveObjectToCoordinatesY = document.querySelector('.move-object-to-coordinates__y')
        const moveObjectToCoordinatesForm = document.querySelector('.move-object-to-coordinates')

        return { moveObjectToCoordinatesX, moveObjectToCoordinatesY, moveObjectToCoordinatesForm }
    }

    get getElementsForMoveObjectToDistance() {
        const moveObjectToDistanceX = document.querySelector('.move-object-to-distance__x')
        const moveObjectToDistanceY = document.querySelector('.move-object-to-distance__y')
        const moveObjectToDistanceForm = document.querySelector('.move-object-to-distance')

        return { moveObjectToDistanceX, moveObjectToDistanceY, moveObjectToDistanceForm }
    }

    get getElementsRotateAround() {
        const rotateAroundX = document.querySelector('.rotate-around__x')
        const rotateAroundY = document.querySelector('.rotate-around__y')
        const rotateAroundRadius = document.querySelector('.rotate-around__radius')
        const rotateAroundAngle = document.querySelector('.rotate-around__angle')
        const rotateAroundForm = document.querySelector('.rotate-around')

        return {
            rotateAroundX,
            rotateAroundY,
            rotateAroundRadius,
            rotateAroundAngle,
            rotateAroundForm
        }
    }
}
