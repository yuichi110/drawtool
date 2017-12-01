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
      setInterval(checkStatusUpdate, WATCHMAN_STATUS_CHECK_INTERVAL)
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
  $.get('/api/status/topology', function(data){
    if(data['result'] == false){
      return
    }
    let lastTimestamp = parseFloat(data['data']['last'])
    if(lastTimestamp > _timestamp_statusTopology){
      _timestamp_statusTopology = lastTimestamp
      getTopology()
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
    }
  })
}

function getTopology(){
  $.get('/api/topology', function(data){
    console.log('get done')

    let gearArray = new Array()
    for(gear of gearArray){
      getGear(gear)
    }
  })
}

function getOperation(){

}


/**
*   Update Gear status
**/

function checkGearUpdate(){
  for(let gear of _gearSet){
    getGear(gear)
  }
}

function getGear(name){
  let waitTime = Math.random() *  WATCHMAN_GEAR_CHECK_INTERVAL
  setTimeout(function(){
    $.get('/api/gear/' + name), function(data){
      //
    }
  }, waitTime)
}
