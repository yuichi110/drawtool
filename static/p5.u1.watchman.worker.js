/*
* NEEDS WEB SERVER.
* RUN AS LOCAL JS FILE WILL NOT WORK.
*
* THIS IS A WEB-WORKER MODULE WHICH IS CALLED BY WATCHMAN.
* PLEASE DON'T INCLUDE IT ON HTML FILE.
*
* Watchman Worker: Task manager of Network monitoring tool
*   Created by Watchman as web-worker.
*   Mediator between Watchman (p5js drawing thread) and Rest Server.
*   Having these feature
*     - interval query for rest server to check update
*     - receive request from Watchman
*     - push drawing task to Watchman
*
* 2017/11/30
* @author Yuichi Ito yuichi@yuichi.com
*/

// Usable only in this module. Please don't move them to util.
const LOGLEVEL_DEBUG = Symbol('log level debug')
const LOGLEVEL_INFO =  Symbol('log level info')
const LOGLEVEL_LOG =   Symbol('log level log')
const LOGLEVEL_WARN =  Symbol('log level warn')
const LOGLEVEL_ERROR = Symbol('log level error')
const LOGLEVEL = LOGLEVEL_LOG

// shared util lib with Watchman
importScripts('/static/p5.u1.watchman.util.js')

// import special jquery which doesn't have dom feature.
// From Github : kpozin/jquery-nodom (based on jquery v1.6.3, MIT License)
// loading normal jquery will fail because web-worker doesn't have dom attribute.
importScripts('/static/jquery.nodom.js')


let watchman_gearCheck = true

/*
* Message receiver
* Handle message from Watchman
*/
self.addEventListener('message', (message) => {
  switch(message.data){
    // start interval status checker
    case WATCHMAN_REQUEST_INITIALIZE:
      console.log('start watchman worker : initialize')
      // start interval of status checker function.
      setInterval(checkStatusUpdate, WATCHMAN_STATUS_CHECK_INTERVAL)
      // start interval of gear chcker function after 2 times of gear check interval.
      setTimeout(function(){
        setInterval(checkGearUpdate, WATCHMAN_GEAR_CHECK_INTERVAL)
      }, WATCHMAN_GEAR_CHECK_INTERVAL * 2)
      break

    case WATCHMAN_REQUEST_INITIALIZE_NO_GEARS:

    // Click Event
    case 'CLICK':
      console.log('clicked')
      break

    // Unknow message
    default:
      break
  }
});


/*
* Interval task function
* It will be called intervally
* To avoid 2 or more tasks are run same time, having "_handlingTask" flag.
* Please use callback to communicate with rest server
*/
let _timestamp_statusTopology = 0
let _timestamp_statusOperation = 0
let _gearMap = new Map()
function checkStatusUpdate(){
  console.debug('checkStatusUpdate()')

  jqGet('/api/status/topology', function(data){
    if(data['result'] == false){
      return
    }
    let lastTimestamp = parseFloat(data['data']['last'])
    if(lastTimestamp > _timestamp_statusTopology){
      _timestamp_statusTopology = lastTimestamp
      getTopology()
    }else{
      // no topology update
    }
  })

  jqGet('/api/status/operation', function(data){
    if(data['result'] == false){
      return
    }
    let lastTimestamp = parseFloat(data['data']['last'])
    if(lastTimestamp > _timestamp_statusOperation){
      _timestamp_statusOperation = lastTimestamp
      getOperation()
    }else{
      // no operation update
    }
  })
}

let cache_size
let cache_gears
let cache_lines
let cache_texts
let cache_underObjects
let cache_overObjects
function getTopology(){
  console.debug('getTopology()')

  jqGet('/api/topology', function(data){
    if(!data['result']){
      return
    }

    let w = data['data']['width']
    let h = data['data']['height']
    let gears = data['data']['gears']  // map
    let lines = data['data']['lines']  // array
    let texts = data['data']['texts']  // array
    let underObjects = data['data']['underObjects'] // array
    let overObjects = data['data']['overObjects'] // array

    if(watchman_gearCheck){
      updateGearMap(gears)
    }
  })
}

function updateGearMap(gears){

  // (1) Add gears which are not yet registered.
  //     And check current status.
  for(let gearName in gears){
    if(!_gearMap.has(gearName)){
      // Register gear in this function
      getGear(gearName)
    }else{
      // Already registered assets are ignored.
      // They are checked intervally by checkGearUpdate().
    }
  }

  // (2) Make delete gears list.
  let removeGearArray = new Array()
  for(let [gearName, value] of _gearMap){
    if(!gearName in gears){
      // Topology doesn't have this gear.
      // Add it to delete list
      removeGearArray.push(gearName)
    }{
      // Topology has this gear.
      // Will not remove it.
    }
  }

  // (3) Remove gears from _gearMap
  for(let gearName of removeGearArray){
    _gearMap.delete(gearName)
  }
}

function getOperation(){
  console.debug('getOperation()')
  jqGet('/api/operation', function(data){

  })
}


/**
*   Update Gear status
**/

function checkGearUpdate(){
  console.debug('checkGearUpdate()')
  for(let [name, value] of _gearMap){
    getGear(name)
  }
}

function getGear(name){
  console.debug('getGear() : ' + name)
  let waitTime = Math.random() *  WATCHMAN_GEAR_CHECK_INTERVAL

  setTimeout(function(){
    gear_url = '/api/gear/' + name
    jqGet(gear_url, function(data){
      console.debug('getGear() getResponse: ' + name)
      _gearMap.set(name, data)
    })
  }, waitTime)
}

function jqGet(getUrl, successFunction, errorFunction){
  if(typeof errorFunction === 'undefined'){
    $.ajax({
      type: 'GET',
      url: getUrl,
      success: successFunction,
      error: function(){
        console.error('get failed : "' + getUrl + '"')
      }
    })
  }else{
    $.ajax({
      type: 'GET',
      url: getUrl,
      success: successFunction,
      error: errorFunction
    })
  }
}

function setLogLevel(){
  // Overwrite logging functions to suppress useless logging.
  switch(LOGLEVEL){
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
