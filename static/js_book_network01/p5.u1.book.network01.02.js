class Book_Network01_02{

  static preload(){
    main_width = 1920
    main_height = 1080
    main_background = 0
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO

    this.save = false
  }

  static setup(){
    this.setup_image01()
    this.setup_image02()
    this.setup_image03()
    this.setup_image04()
    /*
    this.setup_image05()
    this.setup_image06()
    this.setup_image07()
    this.setup_image08()
    this.setup_image09()
    */
  }

  static getDrawPG(){
    let imageNumber = 4
    switch(imageNumber){
      case 1:
        return this.getDrawPG_image01()
      case 2:
        return this.getDrawPG_image02()
      case 3:
        return this.getDrawPG_image03()
      case 4:
        return this.getDrawPG_image04()
      case 5:
        return this.getDrawPG_image05()
      case 6:
        return this.getDrawPG_image06()
      case 7:
        return this.getDrawPG_image07()
      case 8:
        return this.getDrawPG_image08()
      case 9:
        return this.getDrawPG_image09()
      default:
        console.error('Switch Error')
    }
  }

  /***
  Image 1 : Topology
  ***/

  static setup_image01(){
    let pgb = createGraphics(1400, 650)
    let topology = new Network_TopologyManager(pgb.width, pgb.height)

    let pc1 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc1.setPortsColor([], [], [EMERALD], [])
    pc1.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    topology.addGear('pc1', pc1, 300, 100)
    topology.addGearText('pc1', 'name',  30, -10, 'PC1', 24, BLACK, 255)
    topology.addGearText('pc1', 'ip', -230, 40, 'IP : 10.0.0.101/8', 20, BLACK, 255)
    topology.addGearText('pc1', 'mac', -230, 70, 'MAC : 0000.0000.0101', 20, BLACK, 255)
    topology.addGearText('pc1', 'port', 115, 40, 'g0/1', 20, BLACK, 255)

    let pc2 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc2.setPortsColor([], [], [EMERALD], [])
    pc2.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    topology.addGear('pc2', pc2, 300, 275)
    topology.addGearText('pc2', 'name', 30, -10, 'PC2', 24, BLACK, 255)
    topology.addGearText('pc2', 'ip', -230, 40, 'IP : 10.0.0.102/8', 20, BLACK, 255)
    topology.addGearText('pc2', 'mac', -230, 70, 'MAC : 0000.0000.0102', 20, BLACK, 255)
    topology.addGearText('pc2', 'port', 115, 40, 'g0/1', 20, BLACK, 255)

    let pc3 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc3.setPortsColor([], [], [EMERALD], [])
    pc3.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    topology.addGear('pc3', pc3, 300, 450)
    topology.addGearText('pc3', 'name',  30, -10, 'PC3', 24, BLACK, 255)
    topology.addGearText('pc3', 'ip', -230, 40, 'IP : 10.0.0.103/8', 20, BLACK, 255)
    topology.addGearText('pc3', 'mac', -230, 70, 'MAC : 0000.0000.0103', 20, BLACK, 255)
    topology.addGearText('pc3', 'port', 115, 60, 'g0/1', 20, BLACK, 255)

    let sw1 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, PETERRIVER, 255,
                               12, BLACK, 2, 255)
    sw1.setPortsColor([EMERALD, EMERALD, EMERALD], [], [], [])
    sw1.setIcon(NETWORK_GEAR_L2SWITCH, 10, 10, 80, WHITE)
    topology.addGear('sw1', sw1, 600, 275)
    topology.addGearText('sw1', 'name', 10, -10, 'Switch1', 24, BLACK, 255)
    topology.addGearText('sw1', 'port1', -70, 20, 'g0/1', 20, BLACK, 255)
    topology.addGearText('sw1', 'port2', -70, 70, 'g0/2', 20, BLACK, 255)
    topology.addGearText('sw1', 'port3', -70, 145, 'g0/3', 20, BLACK, 255)

    topology.connectGears('pc1', RIGHT, 1, 'sw1', LEFT, 1, BLACK, 2, 255)
    topology.connectGears('pc2', RIGHT, 1, 'sw1', LEFT, 2, BLACK, 2, 255)
    topology.connectGears('pc3', RIGHT, 1, 'sw1', LEFT, 3, BLACK, 2, 255)

    pgb.clear()
    pgb.background(255)
    topology.drawPG(pgb)

    let [pc1x, pc1y] = topology.getGearCenterXY('pc1')
    let [pc2x, pc2y] = topology.getGearCenterXY('pc2')
    let [pc3x, pc3y] = topology.getGearCenterXY('pc3')
    let [sw1x, sw1y] = topology.getGearCenterXY('sw1')
    this.i01_pc1x = pc1x
    this.i01_pc1y = pc1y
    this.i01_pc2x = pc2x
    this.i01_pc2y = pc2y
    this.i01_pc3x = pc3x
    this.i01_pc3y = pc3y
    this.i01_sw1x = sw1x
    this.i01_sw1y = sw1y

    this.i01_pgb = pgb
  }

  static getDrawPG_image01(){
    let pgb = this.i01_pgb
    return pgb
  }

  /***
  Image 2 : IOS CLI Mode
  ***/

  static setup_image02(){
    let pgb = createGraphics(1300, 600)
    pgb.background(255)

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

    pgb.image(admin_rect, 330, 75)

    pgb.image(userMode, 100, 100)
    pgb.image(arrowR, 295, 100)
    pgb.image(arrowL, 295, 140)

    pgb.image(superMode, 400, 100)
    pgb.image(arrowR, 595, 100)
    pgb.image(arrowL, 595, 140)

    pgb.image(configMode, 700, 100)
    pgb.image(configModeInt, 1000, 100)
    pgb.image(arrowR, 895, 100)
    pgb.image(arrowL, 895, 140)

    pgb.image(configModeRouting, 1000, 250)
    pgb.image(arrowR, 895, 250)
    pgb.image(arrowL, 895, 290)

    pgb.image(configModeOther, 1000, 400)
    pgb.image(arrowR, 895, 400)
    pgb.image(arrowL, 895, 440)

    drawPG_text(pgb, 375, 475, "管理者権限が必要なモード", 24, PUMPKIN, 255)

    this.i02_pgb = pgb
  }

  static getDrawPG_image02(){
    let pgb = this.i02_pgb

    if(this.save){
      if(frameCount == 100){
        savePG(pgb, 'book_network01_02_image2')
      }
    }
    return pgb
  }


  /**
  * Image 03 : PC1 -> PC2 Brief
  **/

  static setup_image03(){
    let pgb = createGraphics(this.i01_pgb.width, this.i01_pgb.height)
    let pgEth1 = Network_BriefPacket.getPG_EthIp(
      BLACK, 2, 255,
      CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, false)
    let pgEth2 = Network_BriefPacket.getPG_EthIp(
      BLACK, 2, 255,
      POMEGRANATE, WHITE, CONCRETE, BLACK, CONCRETE, BLACK, false)
    let pgEth3 = Network_BriefPacket.getPG_EthIp(
      BLACK, 2, 255,
      CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, true)

    let pgEthFormat1 = Network_Format.getPG_EthIp(
      BLACK, 2, 255, 20,
      CONCRETE, 25, 'PC2', BLACK, CONCRETE, 25, 'PC1', BLACK,
      CONCRETE, 25, 'PC2', BLACK, CONCRETE, 25, 'PC1', BLACK,
      CONCRETE, BLACK)

    let pgEthFormat2 = Network_Format.getPG_EthIp(
      BLACK, 2, 255, 20,
      POMEGRANATE, 25, 'PC2', WHITE, CONCRETE, 25, 'PC1', BLACK,
      CONCRETE, 25, 'PC2', BLACK, CONCRETE, 25, 'PC1', BLACK,
      CONCRETE, BLACK)

    this.i03_pgb = pgb
    this.i03_pgEth1 = pgEth1
    this.i03_pgEth2 = pgEth2
    this.i03_pgEth3 = pgEth3
    this.i03_pgEthFormat1 = pgEthFormat1
    this.i03_pgEthFormat2 = pgEthFormat2
  }

  static getDrawPG_image03(){
    let pgb = this.i03_pgb
    let static_pgb = this.i01_pgb
    let pgEth1 = this.i03_pgEth1
    let pgEth2 = this.i03_pgEth2
    let pgEth3 = this.i03_pgEth3
    let pgEthFormat1 = this.i03_pgEthFormat1
    let pgEthFormat2 = this.i03_pgEthFormat2
    let [x1, y1] = [this.i01_pc1x, this.i01_pc1y]
    let [x2, y2] = [this.i01_sw1x, this.i01_sw1y]
    let [x3, y3] = [this.i01_pc2x, this.i01_pc2y]

    // Background
    pgb.clear()
    pgb.background(255)
    pgb.image(static_pgb, 0, 0)

    let count = frameCount % 500

    // Animation1
    stayPG(pgb, pgEth1, x1, y1, count, 50, 150)
    movePG(pgb, pgEth1, x1, y1, 0, x2, y2, 0, count, 150, 200)
    stayPG(pgb, pgEth2, x2, y2, count, 200, 300)
    movePG(pgb, pgEth3, x2, y2, 0, x3, y3, 0, count, 300, 350)
    stayPG(pgb, pgEth3, x3, y3, count, 350, 450)

    // Animation2
    stayPG_corner(pgb, pgEthFormat1, 550, 460, count, 0, 200)
    stayPG_corner(pgb, pgEthFormat2, 550, 460, count, 200, 300)
    stayPG_corner(pgb, pgEthFormat1, 550, 460, count, 300, 500)

    return pgb
  }

  /**
  * Image 04 : PC1 -> PC2 Detail
  **/

  static setup_image04(){
    let pgb = createGraphics(this.i01_pgb.width, this.i01_pgb.height)

    let pgBalloon = getPG_balloon(
      100, 10, 300, 300,
      LEFT, 30, 260, 180, 230,
      TRANSPARENT, 2, 255, BELIZEHOLE, 255)
    drawPG_text(pgBalloon, 130, 50, "MAC Address Table", 28, WHITE, 255)

    let columnWidthArray = [80, 200]
    let rawHeightArray = [50, 50, 50, 50]
    let fColorTable1 = [[BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE],
     [BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE]]
    let fAlphaTable = [[255, 255], [255, 255], [255, 255], [255, 255]]
    let txTable = [[15, 25], [15, 15], [15, 15], [15, 15]]
    let tyArray = [32, 32, 32, 32]
    let textTable = [['Port', 'MAC Address'], ['g0/1', '0000.0000.0101'], ['g0/2', '0000.0000.0102'], ['g0/3', '0000.0000.0103']]
    let tColorTable = [[WHITE, WHITE], [WHITE, WHITE], [WHITE, WHITE], [WHITE, WHITE]]
    let tAlphaTable = fAlphaTable
    let pgTable1 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable, 24, tColorTable, tAlphaTable)

    let fColorTable2 = [[BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE],
     [POMEGRANATE, POMEGRANATE], [BELIZEHOLE, BELIZEHOLE]]
    let pgTable2 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable2, fAlphaTable,
      txTable, tyArray, textTable, 24, tColorTable, tAlphaTable)

    let pgEthFormat1 = Network_Format.getPG_EthIpWide(
      BLACK, 2, 255, 20,
      CONCRETE, 5, '0000.0000.0102', BLACK,
      CONCRETE, 5, '0000.0000.0101', BLACK,
      CONCRETE, 30, '10.0.0.102', BLACK,
      CONCRETE, 30, '10.0.0.101', BLACK,
      CONCRETE, BLACK)

    let pgEthFormat2 = Network_Format.getPG_EthIpWide(
      BLACK, 2, 255, 20,
      POMEGRANATE, 5, '0000.0000.0102', WHITE,
      CONCRETE, 5, '0000.0000.0101', BLACK,
      CONCRETE, 30, '10.0.0.102', BLACK,
      CONCRETE, 30, '10.0.0.101', BLACK,
      CONCRETE, BLACK)

    this.i04_pgb = pgb
    this.i04_pgBaloon = pgBalloon
    this.i04_pgTable1 = pgTable1
    this.i04_pgTable2 = pgTable2

    this.i04_pgEthFormat1 = pgEthFormat1
    this.i04_pgEthFormat2 = pgEthFormat2
  }

  static getDrawPG_image04(){
    let pgb = this.i04_pgb
    let static_pgb = this.i01_pgb
    let pgBalloon = this.i04_pgBaloon
    let pgTable1 = this.i04_pgTable1
    let pgTable2 = this.i04_pgTable2

    let pgEth1 = this.i03_pgEth1
    let pgEth2 = this.i03_pgEth2
    let pgEth3 = this.i03_pgEth3
    let pgEthFormat1 = this.i04_pgEthFormat1
    let pgEthFormat2 = this.i04_pgEthFormat2

    let [x1, y1] = [this.i01_pc1x, this.i01_pc1y]
    let [x2, y2] = [this.i01_sw1x, this.i01_sw1y]
    let [x3, y3] = [this.i01_pc2x, this.i01_pc2y]

    // Background
    pgb.clear()
    pgb.background(255)
    pgb.image(static_pgb, 0, 0)
    pgb.image(pgBalloon, 700, 50)
    //pgb.image(pgTable1, 810, 130)

    let count = frameCount % 500

    // Animation1
    stayPG(pgb, pgEth1, x1, y1, count, 50, 150)
    movePG(pgb, pgEth1, x1, y1, 0, x2, y2, 0, count, 150, 200)
    stayPG(pgb, pgEth2, x2, y2, count, 200, 300)
    movePG(pgb, pgEth3, x2, y2, 0, x3, y3, 0, count, 300, 350)
    stayPG(pgb, pgEth3, x3, y3, count, 350, 450)

    // Animation2
    stayPG_corner(pgb, pgEthFormat1, 550, 460, count, 0, 200)
    stayPG_corner(pgb, pgEthFormat2, 550, 460, count, 200, 300)
    stayPG_corner(pgb, pgEthFormat1, 550, 460, count, 300, 500)

    // Animation3
    stayPG_corner(pgb, pgTable1, 810, 130, count, 0, 200)
    stayPG_corner(pgb, pgTable2, 810, 130, count, 200, 300)
    stayPG_corner(pgb, pgTable1, 810, 130, count, 300, 500)

    return pgb
  }

  /**
  * Image 05 : ARP
  **/

  static setup_image05(){
    let pgb = createGraphics(width, height)
    this.i05_pgb = pgb
  }

  static getDrawPG_image05(){
    let pgb = this.i05_pgb
    return pgb
  }


}
