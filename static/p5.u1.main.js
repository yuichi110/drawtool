/*
* Main module.
* P5JS based drawing program start from here.
*
* Specifies which module needs to be called at setup() and draw() by using switch.
* Each module need to have
*  - preload() : overwrite default parameter. Do font things etc.
*  - setup()    : make static items such as PGraphics
*  - draw()     : update background pgraphics image which is passed as argument
*
* 2017/11/26
* @author Yuichi Ito yuichi@yuichi.com
*/


/*
* Please add new module class here as Symbol.
* They are switched at setup() and draw() function in this main module.
*/

// Library test modules
const MODULE_LIB_COMMON_TEST =  Symbol('module lib.common.test')
const MODULE_LIB_NETWORK_TEST = Symbol('module lib.network.test')

// Watch: needs web server
const MODULE_WATCHMAN = Symbol('module watchman')

// Books
const MODULE_BOOK_NETWORK01_01 = Symbol('module book network01 01')
const MODULE_BOOK_NETWORK01_02 = Symbol('module book network01 02')

// CHOOSED RUN MODULE
const RUN_MODULE = MODULE_BOOK_NETWORK01_02

const LOGLEVEL_DEBUG = Symbol('log level debug')
const LOGLEVEL_INFO =  Symbol('log level info')
const LOGLEVEL_LOG =   Symbol('log level log')
const LOGLEVEL_WARN =  Symbol('log level warn')
const LOGLEVEL_ERROR = Symbol('log level error')


/*
* Global Parameters.
* Please update at each Class settings() methods.
* Not in Main module.
*/
let main_width
let main_height
let main_background
let main_frameRate
let main_pixelDensity
let main_canvasParent

let main_save
let main_save_background
let main_save_prefix

let main_loglevel
let main_guiDebug
let main_drawGrid
let main_drawGrid_color
let main_drawGrid_weight
let main_drawGrid_strongWeight
let main_drawGrid_xPitch
let main_drawGrid_xStrongPitch
let main_drawGrid_yPitch
let main_drawGrid_yStrongPitch
let main_drawMouseXY
let main_drawMouseXY_color
let main_drawMouseXY_textSize
let main_drawMouseXY_x
let main_drawMouseXY_y

function preload(){
  // set default params.
  main_width =        1600
  main_height =       900
  main_background =   255
  main_frameRate =    50
  main_pixelDensity = 1 // ALWAYS AVOID RETINA DISPLAY MODE
  main_canvasParent = 'p5js-canvas-here'

  main_save =            false
  main_save_background = true
  main_save_prefix =     'p5-'

  main_loglevel = LOGLEVEL_LOG
  main_guiDebug = false

  main_drawGrid =              false
  main_drawGrid_color =        GRAY
  main_drawGrid_weight =       1
  main_drawGrid_strongWeight = 2
  main_drawGrid_xPitch =       50
  main_drawGrid_xStrongPitch = 400
  main_drawGrid_yPitch =       50
  main_drawGrid_yStrongPitch = 300

  main_drawMouseXY =          false
  main_drawMouseXY_color =    BLACK
  main_drawMouseXY_textSize = 32
  main_drawMouseXY_x =        main_width - 200
  main_drawMouseXY_y =        main_height - 50

  /*
  * Update global parameters
  * Call static preload() methods on the module.
  * Please add new module here.
  */
  switch(RUN_MODULE){
    case MODULE_LIB_COMMON_TEST:
      LibCommonTest.preload()
      break
    case MODULE_LIB_NETWORK_TEST:
      LibNetworkTest.preload()
      break
    case MODULE_WATCHMAN:
      Watchman.preload()
      break
    case MODULE_BOOK_NETWORK01_01:
      Book_Network01_01.preload()
      break
    case MODULE_BOOK_NETWORK01_02:
      Book_Network01_02.preload()
      break
    default:
      console.error(`${RUN_MODULE.toString()} is not in preload switch`)
  }

  console.log(`Module: ${RUN_MODULE.toString()}`)
}

function setup() {
  _Main.setLogLevel()
  frameRate(main_frameRate)
  pixelDensity(main_pixelDensity)
  _main_canvas = createCanvas(main_width, main_height)
  _main_canvas.parent(main_canvasParent)
  _Main.centerCanvas();

  /*
  * Setup each module. For example creating static items.
  * Call static settings() methods on the module.
  * Please add new module here.
  */
  switch(RUN_MODULE){
    case MODULE_LIB_COMMON_TEST:
      LibCommonTest.setup()
      break
    case MODULE_LIB_NETWORK_TEST:
      LibNetworkTest.setup()
      break
    case MODULE_WATCHMAN:
      Watchman.setup()
      break
    case MODULE_BOOK_NETWORK01_01:
      Book_Network01_01.setup()
      break
    case MODULE_BOOK_NETWORK01_02:
      Book_Network01_02.setup()
      break
    default:
      console.error(`${RUN_MODULE.toString()} is not in setup switch`)
  }
}

function draw() {
  // Initialize background and background pgraphics (makes it transparent).
  background(main_background)
  let drawPG

  switch(RUN_MODULE){
    case MODULE_LIB_COMMON_TEST:
      drawPG = LibCommonTest.getDrawPG()
      break
    case MODULE_LIB_NETWORK_TEST:
      drawPG = LibNetworkTest.getDrawPG()
      break
    case MODULE_WATCHMAN:
      drawPG = Watchman.getDrawPG()
      break
    case MODULE_BOOK_NETWORK01_01:
      drawPG = Book_Network01_01.getDrawPG()
      break
    case MODULE_BOOK_NETWORK01_02:
      drawPG = Book_Network01_02.getDrawPG()
      break
    default:
      console.error(`${RUN_MODULE.toString()} is not in draw switch`)
  }

  if(main_drawGrid){
    _Main.drawGrid(drawPG)
  }
  if(main_drawMouseXY){
    _Main.drawMouseXY(drawPG)
  }

  image(drawPG, 0, 0);
}

/*
* LOCAL Variables.
* Please don't touch them.
*/
let _main_canvas

function windowResized() {
  _Main.centerCanvas();
}

class _Main{

  static centerCanvas(){
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    if(x < 0){x = 0}
    if(y < 0){y = 0}
    _main_canvas.position(x, y)
  }

  static setLogLevel(){
    // Overwrite logging functions to suppress useless logging.
    switch(main_loglevel){
      case LOGLEVEL_ERROR:
        console.debug = function(){/* no logging */}
        console.info = function(){/* no logging */}
        console.log = function(){/* no logging */}
        console.warn = function(){/* no logging */}
        break
      case LOGLEVEL_WARN:
        console.debug = function(){/* no logging */}
        console.info = function(){/* no logging */}
        console.log = function(){/* no logging */}
        break
      case LOGLEVEL_LOG:
        console.debug = function(){/* no logging */}
        console.info = function(){/* no logging */}
        break
      case LOGLEVEL_INFO:
        console.debug = function(){/* no logging */}
        break
      default:
        break
    }
  }

  static drawGrid(pgb){

  }

  static drawMouseXY(pgb){

  }
}
