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
let _watchman_drawingTaskArray

class Watchman{
  static preload(){
    // make web-worker. Please take care js file path.
    _watchman_worker = new Worker(WATCHMAN_WORKER_PATH)
    _watchman_drawingTaskArray = new Array()
  }

  static setup(pgb){
    this.watchman_pgb = createGraphics(width, height)
    this.validate_json()
    this.loadJson(this.watchman_pgb)

    //_watchman_worker.addEventListener('message', this.receiveEvent)
    //_watchman_worker.postMessage(WATCHMAN_REQUEST_INITIALIZE)
  }

  static draw(pgb){
    this.handleTask(pgb)
    pgb.image(this.watchman_pgb, 0, 0)
    //watchman_print('draw thread')
  }

  static handleTask(pgb){
    while(_watchman_drawingTaskArray.length != 0){
      // pickup drawing task from taskArray.
      // and delete it.
    }
  }

  static receiveEvent(message){
    // push drawing task to taskArray
    console.log(message.data);
  }

  static validate_json(){
    $.ajax({
      dataType:'json',
      url:WATCHMAN_TOPOLOGY_JSON,
      success: function(data){
        console.log('=== START CHECKING TOPOLOGY JSON ===')

        let globalKeys = ['width', 'height', 'gears', 'lines',
                          'texts', 'underObjects', 'overObjects']
        let globalAllOk = true
        for(let key of globalKeys){
          if(!(key in data)){
            console.error(`global key "${key}" doesn't exist` )
            globalAllOk = false
          }
        }
        if(globalAllOk){
          console.log('global keys are OK')
        }else{
          console.error('global keys has problem')
        }

        // check gears
        let gearsKeys = ['size', 'color', 'icon', 'x', 'y',
                      'left-nics', 'bottom-nics', 'right-nics', 'top-nics', 'texts']
        let gearsOptionalKeys = ['type', 'mgmt', 'user', 'password', 'enable']
        for(let gear in data['gears']){
          let gearAllOk = true
          for(let key of gearsKeys){
            if(!(key in data['gears'][gear])){
              console.error(`gears key "${key}" doesn't exist in "${gear}"` )
              gearAllOk = false
            }
          }

          let hasOptional = false
          let missingOptional = false
          for(let key of gearsOptionalKeys){
            if(key in data['gears'][gear]){
              hasOptional = true
            }else{
              missingOptional = true
            }
          }
          if(hasOptional && missingOptional){
            console.error(`gear "${gear}" is missing some optional keys` )
            gearAllOk = false
          }

          if(gearAllOk){
            console.log(`gear "${gear}" keys are OK`)
          }else{
            console.error(`gear "${gear}" keys has problem`)
          }
        }

        console.log('======')
      },
      error: function(xMLHttpRequest, textStatus, errorThrown){
        console.error('Json load failed')
        console.error("XMLHttpRequest : " + xMLHttpRequest.status);
        console.error("textStatus     : " + textStatus);
        console.error("errorThrown    : " + errorThrown.message);
      }
    })
  }

  static loadJson(pgb){
    $.ajax({
      dataType:'json',
      url:WATCHMAN_TOPOLOGY_JSON,
      success: function(data){
        // make gears
        for(let gear in data['gears']){
          let size = data['gears'][gear]['size']
          let color = getColorSymbol(data['gears'][gear]['color'])

          let gearObject = new Network_Gear(size, size, 10,
                                      BLACK, 2, 255, color, 255,
                                      12, BLACK, 2, 255)

          // current implementation ignore port name and set same color.
          function getColorArray(portNameArray){
            let colorArray = new Array()
            for(let portName of portNameArray){
              colorArray.push(EMERALD)
            }
            return colorArray
          }
          let left = getColorArray(data['gears'][gear]['left-nics'])
          let bottom = getColorArray(data['gears'][gear]['bottom-nics'])
          let right = getColorArray(data['gears'][gear]['right-nics'])
          let top = getColorArray(data['gears'][gear]['top-nics'])
          gearObject.setPortsColor(left, bottom, right, top)

          let icon = getNetworkGearSymbol(data['gears'][gear]['icon'])
          gearObject.setIcon(icon, 10, 10, size - 20, WHITE)

          let x = data['gears'][gear]['x']
          let y = data['gears'][gear]['y']
          pgb.image(gearObject.getPG(), x, y)
        }
      },
      error: function(xMLHttpRequest, textStatus, errorThrown){
        console.error('Json load failed')
        console.error("XMLHttpRequest : " + xMLHttpRequest.status);
        console.error("textStatus     : " + textStatus);
        console.error("errorThrown    : " + errorThrown.message);
      }
    })
  }
}
