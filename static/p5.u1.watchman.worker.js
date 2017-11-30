importScripts('/static/jquery.nodom.js')

self.addEventListener('message', (message) => {
  switch(message.data){
    case 'START':
      setInterval(intervalTask, 1000)
      break

    case 'CLICK':
      console.log('clicked')
      break

    default:
      break
  }
});

let _handlingTask = false

function getTopology(){
  $.get('/api/topology', function(data){
    console.log('get done')
  })
}

function intervalTask(){
  if(_handlingTask){
    // skip this time
    console.log('Scheduler: handling something now')
    return
  }else{
    _handlingTask = true
  }

  self.postMessage('' + new Date())
  $.get('/api/test', function(data){
    console.log('get done')
  })

  _handlingTask = false
}
