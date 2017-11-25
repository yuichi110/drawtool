const MODULE_LIB_COMMON_TEST = 1
const MODULE_LIB_NETWORK_TEST = 2
const MODULE_NETWORK1 = 101
const RUN_MODULE = MODULE_LIB_COMMON_TEST

const CANVAS_PARENT_ELEMENT = 'p5js-canvas-here'

const LOGLEVEL_DEBUG = 1
const LOGLEVEL_INFO = 2
const LOGLEVEL_LOG = 3
const LOGLEVEL_WARN = 4
const LOGLEVEL_ERROR = 5

/*
* Global Params.
* Please update at each Class setup methods. Not in Main module.
*/
let main_width
let main_height
let main_background
let main_frameRate
let main_pixelDensity

let main_save
let main_save_background
let main_save_prefix

let main_loglevel
let main_guidebug
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

function setup() {
  // set default params.
  main_width = 1600
  main_height = 900
  main_background = 255
  main_frameRate = 50
  main_pixelDensity = 1 // AVOID RETINA MODE

  main_save = false
  main_save_background = true
  main_save_prefix = 'p5-'

  main_loglevel = LOGLEVEL_INFO
  main_guidebug = false
  main_drawGrid = false
  main_drawGrid_color = GRAY
  main_drawGrid_weight = 1
  main_drawGrid_strongWeight = 2
  main_drawGrid_xPitch = 50
  main_drawGrid_xStrongPitch = 400
  main_drawGrid_yPitch = 50
  main_drawGrid_yStrongPitch = 300
  main_drawMouseXY = false
  main_drawMouseXY_color = BLACK
  main_drawMouseXY_textSize = 32
  main_drawMouseXY_x = main_width - 200
  main_drawMouseXY_y = main_height - 50

  /*
  * UPDATE DEFAULT PARAMETER
  * PLEASE ADD NEW MODULE CLASS HERE
  */
  switch(RUN_MODULE){
    case MODULE_LIB_COMMON_TEST:
      LibCommonTest.settings()
      break
    case MODULE_LIB_NETWORK_TEST:
      LibNetworkTest.settings()
      break
    default:
      console.log('ERROR')
  }

  _Main.setLogLevel()
  frameRate(main_frameRate)
  pixelDensity(main_pixelDensity)
  _main_canvas = createCanvas(main_width, main_height)
  _main_canvas.parent(CANVAS_PARENT_ELEMENT)
  _Main.centerCanvas();
  _main_pgb = createGraphics(width, height)

  /*
  * SETUP EACH MODULE
  * PLEASE ADD NEW MODULE CLASS HERE
  */
  switch(RUN_MODULE){
    case MODULE_LIB_COMMON_TEST:
      LibCommonTest.setup(_main_pgb)
      break
    case MODULE_LIB_NETWORK_TEST:
      LibNetworkTest.setup(_main_pgb)
      break
    default:
      console.log('ERROR')
  }
}

function draw() {
  // initialize all
  background(main_background)
  _main_pgb.clear()

  /*
  * PLEASE ADD NEW MODULE CLASS HERE
  */
  switch(RUN_MODULE){
    case MODULE_LIB_COMMON_TEST:
      LibCommonTest.draw(_main_pgb)
      break
    case MODULE_LIB_NETWORK_TEST:
      LibNetworkTest.draw(_main_pgb)
      break
    default:
      console.log('ERROR')
  }

  if(main_drawGrid){
    _Main.drawGrid(_main_pgb)
  }
  if(main_drawMouseXY){
    _Main.drawMouseXY(_main_pgb)
  }
  if(main_save){
    _Main.save(_main_pgb)
  }

  image(_main_pgb, 0, 0);
}

function windowResized() {
  _Main.centerCanvas();
}

/*
* LOCAL. Please don't touch them.
*/
let _main_pgb;
let _main_canvas

class _Main{

  static centerCanvas(){
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    if(x < 0){x = 0}
    if(y < 0){y = 0}
    _main_canvas.position(x, y)
  }

  static setLogLevel(){
    switch(main_loglevel){
      case LOGLEVEL_ERROR:
        console.debug = function(){}
        console.info = function(){}
        console.log = function(){}
        console.warn = function(){}
        break
      case LOGLEVEL_WARN:
        console.debug = function(){}
        console.info = function(){}
        console.log = function(){}
        break
      case LOGLEVEL_LOG:
        console.debug = function(){}
        console.info = function(){}
        break
      case LOGLEVEL_INFO:
        console.debug = function(){}
        break
      default:
        break
    }
  }
  static drawGrid(pgb){

  }

  static drawMouseXY(pgb){

  }

  static save(pgb){
    let fc = ('000000' + frameCount).slice(-6)
    let fname = `${main_save_prefix}${fc}.png`
    if(main_save_background){
      // Save image with background color.
      save(fname)
    }else{
      // Save Transparent background image.
      save(pgb, fname)
    }
  }
}
