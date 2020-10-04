import CanvasView from './canvas/view.js'
import CanvasController from './canvas/controller.js'
import CanvasModel from './canvas/model.js'
import ObjectView from './object/view.js'
import ObjectController from './object/controller.js'
import ObjectModel from './object/model.js'

const root = document.querySelector('#root')

const canvasView = new CanvasView()
const canvasModel = new CanvasModel()
const canvasController = new CanvasController(canvasView, canvasModel)
canvasController.initializeViewStartScreen()

const objectView = new ObjectView()
const objectModel = new ObjectModel()
const objectController = new ObjectController(objectView, objectModel, canvasController)
objectController.initializeStartScreen()