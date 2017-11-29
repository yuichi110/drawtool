let _watchman_SCHEDULER_START_AFTER = 3000
let _watchman_SCHEDULER_INTERVAL = 1000

class Watchman{
  static preload(){

  }

  static setup(){
    console.log('watchman')
    setTimeout(this._setInterval, _watchman_SCHEDULER_START_AFTER)
  }

  static draw(){

  }

  static _setInterval(){
    setInterval(_watchman_taskScheduler.run, _watchman_SCHEDULER_INTERVAL)
  }

  static _run(){
    if(typeof this.instance === 'undefined'){
      this.instance = new _watchman_TaskScheduler()
    }

    this.instance.run()
  }
}

let a = 10

class _watchman_TaskScheduler{
  constructor(){
    
  }

  run(){
    console.log(a)
    a++
  }
}

function _watchman_callTaskScheduler(){
  _watchman_taskScheduler.run()
}

let _watchman_taskScheduler =
