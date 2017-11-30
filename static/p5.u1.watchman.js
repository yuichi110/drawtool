let _watchman_SCHEDULER_START_AFTER = 3000
let _watchman_SCHEDULER_INTERVAL = 1000

class Watchman{
  static preload(){

  }

  static setup(){
    console.log('watchman')
    //_watchman_a = 'javascript'
    this.worker = new Worker('/static/p5.u1.watchman.worker.js')
    this.worker.addEventListener('message', this.receiveEvent)
    this.worker.postMessage('START')
  }

  static draw(){
    /*
    if(frameCount % 10 == 0){
      this.worker.postMessage('Hello')
    }
    */
  }

  static receiveEvent(message){
    //console.log(_watchman_a)
    console.log(message.data);
  }
}

//let _watchman_a
