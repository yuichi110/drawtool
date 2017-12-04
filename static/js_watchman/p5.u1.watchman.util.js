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

const WATCHMAN_TOPOLOGY_JSON = '/static/js_watchman/p5.u1.watchman.topology.json'
const WATCHMAN_WORKER_PATH = '/static/js_watchman/p5.u1.watchman.worker.js'
const WATCHMAN_STATUS_CHECK_INTERVAL = 1000
const WATCHMAN_GEAR_CHECK_INTERVAL = 5000

// watchman -> watchman-worker
const WATCHMAN_MESSAGE1_INITIALIZE = 'initialize'
const WATCHMAN_MESSAGE1_INITIALIZE_NO_GEAR_CHECK = "initialize_no_gear_check"

// watchman-worker -> watchman
const WATCHMAN_MESSAGE2_REFRESH_TOPOLOGY = 'topology'
const WATCHMAN_MESSAGE2_ADD_GEAR = 'add_gear'
const WATCHMAN_MESSAGE2_REMOVE_GEAR = 'remove_gear'
const WATCHMAN_MESSAGE2_ADD_LINE = 'add_line'
const WATCHMAN_MESSAGE2_REMOVE_LINE = 'remove_line'

const WATCHMAN_MESSAGE2_OPERATION = 'operation'

/*
const WATCHMAN_RESPONSE_ADD_GEAR = 'add_gear'
const WATCHMAN_RESPONSE_REMOVE_GEAR = 'remove_gear'
const WATCHMAN_RESPONSE_ = 'aaa'
*/

function watchman_print(t){
  console.log('watchman_print: ' + t)
}
