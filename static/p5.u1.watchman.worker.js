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

// shared util lib with Watchman
importScripts('/static/p5.u1.watchman.util.js')

// import special jquery which doesn't have dom feature.
// From Github : kpozin/jquery-nodom (based on jquery v1.6.3, MIT License)
// loading normal jquery will fail because web-worker doesn't have dom attribute.
importScripts('/static/jquery.nodom.js')


/*
* Message receiver
* Handle message from Watchman
*/
self.addEventListener('message', (message) => {
  switch(message.data){
    // start interval status checker
    case WATCHMAN_REQUEST_INITIALIZE:
      // start interval of status checker function.
      setInterval(checkStatusUpdate, WATCHMAN_STATUS_CHECK_INTERVAL)
      // start interval of gear chcker function after 3 times of gear check interval.
      setTimeout(function(){
        setInterval(checkGearUpdate, WATCHMAN_GEAR_CHECK_INTERVAL)
      }, WATCHMAN_GEAR_CHECK_INTERVAL * 3)
      break

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
  console.log('checkStatusUpdate()')

  $.get('/api/status/topology', function(data){
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

  $.get('/api/status/operation', function(data){
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

function getTopology(){
  console.log('getTopology()')

  $.get('/api/topology', function(data){
    let gears = data['data']['gears']
    let gearNameSet = new Set()
    for(let gear of gears){
        gearNameSet.add(gear['name'])
    }

    // Add gears which are not yet registered.
    // And check current status.
    for(let gearName of gearNameSet){
      if(!_gearMap.has(gearName)){
        // Register gear in this function
        getGear(gearName)
      }else{
        // Already registered assets are ignored.
        // They are checked intervally by checkGearUpdate().
      }
    }

    // Make delete gears list.
    let removeGearArray = new Array()
    for(let [gearName, value] of _gearMap){
      if(!gearNameSet.has(gearName)){
        // Topology doesn't have this gear.
        // Add it to delete list
        removeGearArray.push(gearName)
      }{
        // Topology has this gear.
        // Will not remove it.
      }
    }

    // Delete gears
    for(let gearName of removeGearArray){
      _gearMap.delete(gearName)
    }
  })
}

function getOperation(){
  console.log('getOperation()')
  $.get('/api/operation', function(data){

  })
}


/**
*   Update Gear status
**/

function checkGearUpdate(){
  console.log('checkGearUpdate()')
  for(let [name, value] of _gearMap){
    getGear(name)
  }
}

function getGear(name){
  console.log('getGear()')
  let waitTime = Math.random() *  WATCHMAN_GEAR_CHECK_INTERVAL

  setTimeout(function(){
    gear_url = '/api/gear/' + name
    $.get(gear_url, function(data){
      _gearMap.set(name, data)
    })
  }, waitTime)
}
