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

let _watchman_worker
let _watchman_topology
let _watchman_drawingTaskArray

class Watchman{
  static preload(){
    main_loglevel = LOGLEVEL_INFO

    // make web-worker. Please take care js file path.
    _watchman_worker = new Worker(WATCHMAN_WORKER_PATH)
    _watchman_drawingTaskArray = new Array()
  }

  static setup(){
    this.pgb = createGraphics(width, height)
    this.topology = new Network_TopologyManager(width, height)
    //network_validateTopologyJson(WATCHMAN_TOPOLOGY_JSON)
    //network_loadTopologyJson_fromUrl(WATCHMAN_TOPOLOGY_JSON, this.topology)

    _watchman_worker.addEventListener('message', this.receiveEvent)
    _watchman_worker.postMessage([WATCHMAN_MESSAGE1_INITIALIZE_NO_GEAR_CHECK, 0])
  }

  static getDrawPG(){
    // finish all tasks which is requested by worker
    this.handleTask()

    // update background if it has update
    if(this.topology.hasUpdate()){
      this.pgb.clear()
      this.topology.drawPG(this.pgb)
    }

    return this.pgb
  }

  static handleTask(){
    // do all tasks.
    while(_watchman_drawingTaskArray.length != 0){
      // pickup drawing task from taskArray.
      let [taskType, data] = _watchman_drawingTaskArray[0]
      console.log('Watchman handleTask: ' + taskType)

      // do it.
      switch(taskType){
        case WATCHMAN_MESSAGE2_REFRESH_TOPOLOGY:
          network_loadTopologyJson(data, this.topology)
          break

        default:
          break
      }

      // delete it.
      _watchman_drawingTaskArray.shift()
    }
  }

  static receiveEvent(message){
    console.log('Watchman receiveEvent')
    _watchman_drawingTaskArray.push(message.data)
  }
}
