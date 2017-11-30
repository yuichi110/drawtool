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

    // start interval update checker.
    // it will be called only 1 time when Watchman started.
    case 'START':
      setInterval(intervalTask, 1000)
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
let _handlingTask = false
function intervalTask(){
  if(_handlingTask){
    console.log('Scheduler: handling something now. Skip interval task')
    return
  }else{
    _handlingTask = true
  }

  watchman_print('web worker thread')

  self.postMessage('' + new Date())
  $.get('/api/test', function(data){
    console.log('get done')
  })

  _handlingTask = false
}

function getTopology(){
  $.get('/api/topology', function(data){
    console.log('get done')
  })
}
