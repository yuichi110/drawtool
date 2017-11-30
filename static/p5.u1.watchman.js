/*
* NEEDS WEB SERVER.
* RUN AS LOCAL JS FILE WILL NOT WORK.
*
* Watchman : Network monitoring tool
*   Create task webworker "Watchman Worker" and get update from it.
*   Apply the update to its p5js canvas.
*   Please avoid complex scheduling in this module. Let Watchman-Worker to do that.
*
* 2017/11/30
* @author Yuichi Ito yuichi@yuichi.com
*/

const _WATCHMAN_WORKER_PATH = '/static/p5.u1.watchman.worker.js'
const _WATCHMAN_START = 'START'
const _WATCHMAN_CLICK = 'CLICK'

let _watchman_worker
let _watchman_drawingTaskArray

class Watchman{
  static preload(){
    // make web-worker. Please take care js file path.
    _watchman_worker = new Worker(_WATCHMAN_WORKER_PATH)
    _watchman_drawingTaskArray = new Array()
  }

  static setup(){
    console.log('watchman')
    _watchman_worker.addEventListener('message', this.receiveEvent)
    _watchman_worker.postMessage('START')
  }

  static draw(pgb){
    this.handleTask(pgb)
    watchman_print('draw thread')
  }

  static handleTask(pgb){
    while(_watchman_drawingTaskArray.length != 0){
      // pickup drawing task from taskArray.
      // and delete it.
    }
  }

  static receiveEvent(message){
    // push drawing task to taskArray
    console.log(message.data);
  }
}
