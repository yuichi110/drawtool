class Book_Network01_02{

  static preload(){
    main_width = 1920
    main_height = 1080
    main_background = 0
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO

    this.save = false
  }

  static setup(pgb){
    this.setup_image1()
    this.setup_image2()
  }

  static getDrawPG(){
    let imageNumber = 1
    let pgb
    switch(imageNumber){
      case 1:
        return this.getDrawPG_image1()
      case 2:
        return this.getDrawPG_image2()
      default:
        break
    }
  }

  /***
  Image 1
  ***/

  static setup_image1(){
    this.i1_pgb = createGraphics(800, 650)

    this.i1_topology = new Network_TopologyManager(this.i1_pgb.width, this.i1_pgb.height)

    let pc1 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc1.setPortsColor([], [], [EMERALD], [])
    pc1.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    this.i1_topology.addGear('pc1', pc1, 300, 100)
    this.i1_topology.addGearText('pc1', 'name',  30, -10, 'PC1', 24, BLACK, 255)
    this.i1_topology.addGearText('pc1', 'ip', -230, 40, 'IP : 10.0.0.101/8', 20, BLACK, 255)
    this.i1_topology.addGearText('pc1', 'mac', -230, 70, 'MAC : 0000.0000.0101', 20, BLACK, 255)
    this.i1_topology.addGearText('pc1', 'port', 115, 40, 'g0/1', 20, BLACK, 255)

    let pc2 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc2.setPortsColor([], [], [EMERALD], [])
    pc2.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    this.i1_topology.addGear('pc2', pc2, 300, 275)
    this.i1_topology.addGearText('pc2', 'name', 30, -10, 'PC2', 24, BLACK, 255)
    this.i1_topology.addGearText('pc2', 'ip', -230, 40, 'IP : 10.0.0.102/8', 20, BLACK, 255)
    this.i1_topology.addGearText('pc2', 'mac', -230, 70, 'MAC : 0000.0000.0102', 20, BLACK, 255)
    this.i1_topology.addGearText('pc2', 'port', 115, 40, 'g0/1', 20, BLACK, 255)

    let pc3 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc3.setPortsColor([], [], [EMERALD], [])
    pc3.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    this.i1_topology.addGear('pc3', pc3, 300, 450)
    this.i1_topology.addGearText('pc3', 'name',  30, -10, 'PC3', 24, BLACK, 255)
    this.i1_topology.addGearText('pc3', 'ip', -230, 40, 'IP : 10.0.0.103/8', 20, BLACK, 255)
    this.i1_topology.addGearText('pc3', 'mac', -230, 70, 'MAC : 0000.0000.0103', 20, BLACK, 255)
    this.i1_topology.addGearText('pc3', 'port', 115, 60, 'g0/1', 20, BLACK, 255)

    let sw1 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, PETERRIVER, 255,
                               12, BLACK, 2, 255)
    sw1.setPortsColor([EMERALD, EMERALD, EMERALD], [], [], [])
    sw1.setIcon(NETWORK_GEAR_L2SWITCH, 10, 10, 80, WHITE)
    this.i1_topology.addGear('sw1', sw1, 600, 275)
    this.i1_topology.addGearText('sw1', 'name', 10, -10, 'Switch1', 24, BLACK, 255)
    this.i1_topology.addGearText('sw1', 'port1', -70, 20, 'g0/1', 20, BLACK, 255)
    this.i1_topology.addGearText('sw1', 'port2', -70, 70, 'g0/2', 20, BLACK, 255)
    this.i1_topology.addGearText('sw1', 'port3', -70, 145, 'g0/3', 20, BLACK, 255)

    this.i1_topology.connectGears('pc1', RIGHT, 1, 'sw1', LEFT, 1, BLACK, 2, 255)
    this.i1_topology.connectGears('pc2', RIGHT, 1, 'sw1', LEFT, 2, BLACK, 2, 255)
    this.i1_topology.connectGears('pc3', RIGHT, 1, 'sw1', LEFT, 3, BLACK, 2, 255)
  }

  static getDrawPG_image1(){
    if(this.i1_topology.hasUpdate()){
      this.i1_pgb.clear()
      this.i1_pgb.background(255)
      this.i1_topology.drawPG(this.i1_pgb)
    }

    if(this.save){
      if(frameCount == 100){
        savePG(this.i1_pgb, 'book_network01_02_image1')
      }
    }

    return this.i1_pgb
  }

  /***
  Image 2
  ***/

  static setup_image2(){
    this.i2_pgb = createGraphics(1300, 600)
    this.i2_pgb.background(255)

    let admin_rect = getPG_rect(850, 425, 20, PUMPKIN, 6, 255)
    let arrowR = getPG_bigArrowR(75, 40, 25, 10, TRANSPARENT, 0, 0, NEPHRITIS, 255)
    let arrowL = getPG_bigArrowL(75, 40, 25, 10, TRANSPARENT, 0, 0, NEPHRITIS, 255)

    let w = 160
    let h = 75
    let r = 10
    let tSize = 18
    let userMode = getPG_rect(w, h, r, TRANSPARENT, 0, 0, BELIZEHOLE, 255,
                         30, 33, "　ユーザー\nEXECモード", tSize, WHITE, 255)
    let superMode = getPG_rect(w, h, r, TRANSPARENT, 0, 0, BELIZEHOLE, 255,
                               30, 33, "　　特権\nEXECモード", tSize, WHITE, 255)
    let configMode = getPG_rect(w, 380, r, TRANSPARENT, 0, 0, BELIZEHOLE, 255,
                              8, 200, "コンフィグモード", tSize, WHITE, 255)
    let configModeInt = getPG_rect(w, h, r, TRANSPARENT, 0, 0, BELIZEHOLE, 255,
                         8, 33, "インターフェース\nコンフィグモード", tSize, WHITE, 255)
    let configModeRouting = getPG_rect(w, h, r, TRANSPARENT, 0, 0, BELIZEHOLE, 255,
                               8, 33, "　ルーティング\nコンフィグモード", tSize, WHITE, 255)
    let configModeOther = getPG_rect(w, h, r, TRANSPARENT, 0, 0, BELIZEHOLE, 255,
                              8, 33, "　　その他の\nコンフィグモード", tSize, WHITE, 255)

    this.i2_pgb.image(admin_rect, 330, 75)

    this.i2_pgb.image(userMode, 100, 100)
    this.i2_pgb.image(arrowR, 295, 100)
    this.i2_pgb.image(arrowL, 295, 140)

    this.i2_pgb.image(superMode, 400, 100)
    this.i2_pgb.image(arrowR, 595, 100)
    this.i2_pgb.image(arrowL, 595, 140)

    this.i2_pgb.image(configMode, 700, 100)
    this.i2_pgb.image(configModeInt, 1000, 100)
    this.i2_pgb.image(arrowR, 895, 100)
    this.i2_pgb.image(arrowL, 895, 140)

    this.i2_pgb.image(configModeRouting, 1000, 250)
    this.i2_pgb.image(arrowR, 895, 250)
    this.i2_pgb.image(arrowL, 895, 290)

    this.i2_pgb.image(configModeOther, 1000, 400)
    this.i2_pgb.image(arrowR, 895, 400)
    this.i2_pgb.image(arrowL, 895, 440)

    drawPG_text(this.i2_pgb, 375, 475, "管理者権限が必要なモード", 24, PUMPKIN, 255)
  }

  static getDrawPG_image2(){
    if(this.save){
      if(frameCount == 100){
        savePG(this.i2_pgb, 'book_network01_02_image2')
      }
    }
    return this.i2_pgb
  }
}
