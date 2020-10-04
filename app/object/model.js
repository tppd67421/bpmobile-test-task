export default class ObjectModel {
    constructor() {
        this.objectContainer = {}
        this.objectForOperations
    }

    setObjectForOperations(x, y) {
        this.objectForOperations = this.objectContainer[`${x}-${y}`]
    }

    equalNewAndOldCoordinatesForObjectToOperation() {
        this.objectForOperations.x = this.objectForOperations.newX
        this.objectForOperations.y = this.objectForOperations.newY
    }

    set setObjectToContainer(object) {
        this.objectContainer[`${object.x}-${object.y}`] = object
    }

    get getObjectContainer() {
        return this.objectContainer
    }

    set setCoordinatesForObjectToOperation({ newX, newY }) {
        this.objectForOperations.newX = newX
        this.objectForOperations.newY = newY
    }
    get getObjectForOperations() {
        return this.objectForOperations
    }

    get getObjectForOperationsCoordinates() {
        const x = this.objectForOperations.x
        const y = this.objectForOperations.y
        return { x, y }
    }
}
