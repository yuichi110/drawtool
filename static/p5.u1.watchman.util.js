/*
* NEEDS WEB SERVER.
* RUN AS LOCAL JS FILE WILL NOT WORK.
*
* WatchmanUtil : Utility Library for Watchman and Watchman-Worker(Web-Worker).
*  - To avoid mismatch, share functions between Watchman and Watchman-Worker.
*  - Global var are not shared between threads. You may get 'undefined'.
*
* 2017/11/30
* @author Yuichi Ito yuichi@yuichi.com
*/

const WATCHMAN_WORKER_PATH = '/static/p5.u1.watchman.worker.js'
const WATCHMAN_STATUS_CHECK_INTERVAL = 1000
const WATCHMAN_GEAR_CHECK_INTERVAL = 5000

// watchman -> watchman-worker
const WATCHMAN_REQUEST_INITIALIZE = 'initialize'

// watchman-worker -> watchman
const WATCHMAN_RESPONSE_TOPOLOGY = 'topology'
const WATCHMAN_RESPONSE_GEAR = 'gear'
const WATCHMAN_RESPONSE_LINE = 'line'
const WATCHMAN_RESPONSE_OPERATION = 'operation'

function watchman_print(t){
  console.log('watchman_print: ' + t)
}
