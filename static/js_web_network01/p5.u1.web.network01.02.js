class Web_network01_02{

  static preload(){
    main_width = 1920
    main_height = 1080
    main_background = 0
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO

    this.save = false

    lib_network_preload()
  }

  static setup(){
    this.setup_image01()
    this.setup_image02()
    this.setup_image03()
    this.setup_image04()
    this.setup_image05()
    this.setup_image06()
    this.setup_image07()
    this.setup_image08()
    this.setup_image09()
  }

  static getDrawPG(){
    let imageNumber = 8
    switch(imageNumber){
      case 1:
        // Topology
        return this.getDrawPG_image01()
      case 2:
        // IOS Mode
        return this.getDrawPG_image02()
      case 3:
        // PC1 -> PC2 Brief
        return this.getDrawPG_image03()
      case 4:
        // PC1 -> PC2 Detail
        return this.getDrawPG_image04()
      case 5:
        // ARP request, reply
        return this.getDrawPG_image05()
      case 6:
        // MAC Learning and unicast flood
        return this.getDrawPG_image06()
      case 7:
        // Big topology
        return this.getDrawPG_image07()
      case 8:
        // Mac table on big topology
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
    let pgb = createGraphics(800, 630)
    let topology = new Network_TopologyManager(pgb.width, pgb.height)

    let pc1 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc1.setPortsColor([], [], [EMERALD], [])
    pc1.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    topology.addGear('pc1', pc1, 320, 100)
    topology.addGearText('pc1', 'name',  28, -10, 'PC1', 24, BLACK, 255)
    topology.addGearText('pc1', 'ip', -250, 40, 'IP : 10.0.0.101/8', 20, BLACK, 255)
    topology.addGearText('pc1', 'mac', -250, 70, 'MAC : 0000.0000.0101', 20, BLACK, 255)
    topology.addGearText('pc1', 'port', 115, 40, 'g0/1', 20, BLACK, 255)

    let pc2 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc2.setPortsColor([], [], [EMERALD], [])
    pc2.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    topology.addGear('pc2', pc2, 320, 275)
    topology.addGearText('pc2', 'name', 28, -10, 'PC2', 24, BLACK, 255)
    topology.addGearText('pc2', 'ip', -250, 40, 'IP : 10.0.0.102/8', 20, BLACK, 255)
    topology.addGearText('pc2', 'mac', -250, 70, 'MAC : 0000.0000.0102', 20, BLACK, 255)
    topology.addGearText('pc2', 'port', 115, 40, 'g0/1', 20, BLACK, 255)

    let pc3 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc3.setPortsColor([], [], [EMERALD], [])
    pc3.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    topology.addGear('pc3', pc3, 320, 450)
    topology.addGearText('pc3', 'name',  28, -10, 'PC3', 24, BLACK, 255)
    topology.addGearText('pc3', 'ip', -250, 40, 'IP : 10.0.0.103/8', 20, BLACK, 255)
    topology.addGearText('pc3', 'mac', -250, 70, 'MAC : 0000.0000.0103', 20, BLACK, 255)
    topology.addGearText('pc3', 'port', 115, 60, 'g0/1', 20, BLACK, 255)

    let sw1 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, PETERRIVER, 255,
                               12, BLACK, 2, 255)
    sw1.setPortsColor([EMERALD, EMERALD, EMERALD], [], [], [])
    sw1.setIcon(NETWORK_GEAR_L2SWITCH, 10, 10, 80, WHITE)
    topology.addGear('sw1', sw1, 620, 275)
    topology.addGearText('sw1', 'name', 5, -10, 'Switch1', 24, BLACK, 255)
    topology.addGearText('sw1', 'port1', -70, 25, 'g0/1', 20, BLACK, 255)
    topology.addGearText('sw1', 'port2', -70, 75, 'g0/2', 20, BLACK, 255)
    topology.addGearText('sw1', 'port3', -70, 150, 'g0/3', 20, BLACK, 255)

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

    let doSave = true
    if(doSave){
      if(frameCount == 50){
        savePG(pgb, 'net01_01_')
      }
    }

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

    let doSave = true
    if(doSave){
      if(frameCount == 50){
        savePG(pgb, 'net01_02_')
      }
    }

    return pgb
  }


  /**
  * Image 03 : PC1 -> PC2 Brief
  **/

  static setup_image03(){
    let pgb = createGraphics(this.i01_pgb.width, this.i01_pgb.height + 150)
    let pgEth1 = Network_BriefPacket.getPG_EthIp(
      BLACK, 2, 255,
      CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, false)
    let pgEth2 = Network_BriefPacket.getPG_EthIp(
      BLACK, 2, 255,
      POMEGRANATE, WHITE, CONCRETE, BLACK, CONCRETE, BLACK, false)
    let pgEth3 = Network_BriefPacket.getPG_EthIp(
      BLACK, 2, 255,
      CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, true)
    let pgEth4 = Network_BriefPacket.getPG_EthIp(
      BLACK, 2, 255,
      POMEGRANATE, WHITE, CONCRETE, BLACK, CONCRETE, BLACK, true)

    let pgEthFormat1 = Network_Format.getPG_EthIp(
      BLACK, 2, 255, 24,
      CONCRETE, 25, 'PC2', BLACK, CONCRETE, 25, 'PC1', BLACK,
      CONCRETE, 25, 'PC2', BLACK, CONCRETE, 25, 'PC1', BLACK,
      CONCRETE, BLACK)

    let pgEthFormat2 = Network_Format.getPG_EthIp(
      BLACK, 2, 255, 24,
      POMEGRANATE, 25, 'PC2', WHITE, CONCRETE, 25, 'PC1', BLACK,
      CONCRETE, 25, 'PC2', BLACK, CONCRETE, 25, 'PC1', BLACK,
      CONCRETE, BLACK)

    this.i03_pgb = pgb
    this.i03_pgEth1 = pgEth1
    this.i03_pgEth2 = pgEth2
    this.i03_pgEth3 = pgEth3
    this.i03_pgEth4 = pgEth4
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
    let pgfx = 100
    let pgfy = 620
    stayPG_corner(pgb, pgEthFormat1, pgfx, pgfy, count, 0, 200)
    stayPG_corner(pgb, pgEthFormat2, pgfx, pgfy, count, 200, 300)
    stayPG_corner(pgb, pgEthFormat1, pgfx, pgfy, count, 300, 500)

    let doSave = false
    if(doSave){
      if(frameCount <= 500){
        savePG(pgb, 'net01_03_')
      }
    }

    return pgb
  }

  /**
  * Image 04 : PC1 -> PC2 Detail
  **/

  static setup_image04(){
    let pgb = createGraphics(this.i01_pgb.width + 380, this.i01_pgb.height + 150)

    let pgBalloon = getPG_rectBalloon(
      100, 10, 300, 300,
      LEFT, 30, 260, 180, 230,
      TRANSPARENT, 2, 255, BELIZEHOLE, 255)
    drawPG_text(pgBalloon, 120, 50, "MAC Address Table", 28, WHITE, 255)

    let columnWidthArray = [80, 200]
    let rawHeightArray = [50, 50, 50, 50]
    let fColorTable1 = [[BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE],
     [BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE]]
    let fAlphaTable = [[255, 255], [255, 255], [255, 255], [255, 255]]
    let txTable = [[15, 25], [12, 10], [12, 10], [12, 10]]
    let tyArray = [32, 32, 32, 32]
    let textTable = [['Port', 'MAC Address'], ['g0/1', '0000.0000.0101'], ['g0/2', '0000.0000.0102'], ['g0/3', '0000.0000.0103']]
    let tColorTable = [[WHITE, WHITE], [WHITE, WHITE], [WHITE, WHITE], [WHITE, WHITE]]
    let tAlphaTable = fAlphaTable
    let pgTable1 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable, 22, tColorTable, tAlphaTable)

    let fColorTable2 = [[BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE],
     [POMEGRANATE, POMEGRANATE], [BELIZEHOLE, BELIZEHOLE]]
    let pgTable2 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable2, fAlphaTable,
      txTable, tyArray, textTable, 22, tColorTable, tAlphaTable)

    let pgEthFormat1 = Network_Format.getPG_EthIpWide(
      BLACK, 2, 255, 20,
      CONCRETE, 10, '0000.0000.0102', BLACK,
      CONCRETE, 10, '0000.0000.0101', BLACK,
      CONCRETE, 40, '10.0.0.102', BLACK,
      CONCRETE, 40, '10.0.0.101', BLACK,
      CONCRETE, BLACK)

    let pgEthFormat2 = Network_Format.getPG_EthIpWide(
      BLACK, 2, 255, 20,
      POMEGRANATE, 10, '0000.0000.0102', WHITE,
      CONCRETE, 10, '0000.0000.0101', BLACK,
      CONCRETE, 40, '10.0.0.102', BLACK,
      CONCRETE, 40, '10.0.0.101', BLACK,
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

    /*
    Frame Time Table
    0 - 50    : None
    50 - 150  : Show frame at PC1
    150 - 200 : Move frame from PC1 to SW1
    200 - 300 : Show frame at SW1
    300 - 350 : Move frame from SW1 to PC2
    350 - 450 : Show frame at PC2
    450 - 500 : None
    */

    let count = frameCount % 500

    // Animation1 : Frame Flow
    stayPG(pgb, pgEth1, x1, y1, count, 50, 150)
    movePG(pgb, pgEth1, x1, y1, 0, x2, y2, 0, count, 150, 200)
    stayPG(pgb, pgEth2, x2, y2, count, 200, 300)
    movePG(pgb, pgEth3, x2, y2, 0, x3, y3, 0, count, 300, 350)
    stayPG(pgb, pgEth3, x3, y3, count, 350, 450)

    // Animation2 : Frame Detail
    let pfx = 180
    let pfy = 620
    stayPG_corner(pgb, pgEthFormat1, pfx, pfy, count, 0, 200)
    stayPG_corner(pgb, pgEthFormat2, pfx, pfy, count, 200, 300)
    stayPG_corner(pgb, pgEthFormat1, pfx, pfy, count, 300, 500)

    // Animation3 : Mac Table
    stayPG_corner(pgb, pgTable1, 810, 130, count, 0, 200)
    stayPG_corner(pgb, pgTable2, 810, 130, count, 200, 300)
    stayPG_corner(pgb, pgTable1, 810, 130, count, 300, 500)

    let doSave = false
    if(doSave){
      if(frameCount <= 500){
        savePG(pgb, 'net01_04_')
      }
    }

    return pgb
  }

  /**
  * Image 05 : ARP
  **/

  static setup_image05(){
    let pgb = createGraphics(this.i01_pgb.width + 450, this.i01_pgb.height + 200)

    // ARP PACKETS
    let pg_bpArpRequest1 = Network_BriefPacket.getPG_EthArpRequest(
      BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, false)
    let pg_bpArpRequest2 = Network_BriefPacket.getPG_EthArpRequest(
      BLACK, 2, 255, POMEGRANATE, WHITE, CONCRETE, BLACK, false)
    let pg_bpArpRequest3 = Network_BriefPacket.getPG_EthArpRequest(
      BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, true)
    let pg_bpArpRequest4 = Network_BriefPacket.getPG_EthArpRequest(
      BLACK, 2, 255, CONCRETE, BLACK, POMEGRANATE, WHITE, true)

    let pg_bpArpReply1 = Network_BriefPacket.getPG_EthArpReply(
      BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, false)
    let pg_bpArpReply2 = Network_BriefPacket.getPG_EthArpReply(
      BLACK, 2, 255, POMEGRANATE, WHITE, CONCRETE, BLACK, false)
    let pg_bpArpReply3 = Network_BriefPacket.getPG_EthArpReply(
      BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, true)
    let pg_bpArpReply4 = Network_BriefPacket.getPG_EthArpReply(
      BLACK, 2, 255, CONCRETE, BLACK, POMEGRANATE, WHITE, true)

    // Exclamation Mark
    let pgExclamationBalloon = getPG_roundedBalloon(
      20, 10, 50, 50,
      BOTTOM, 30, 80, 15, 35,
      TRANSPARENT, 0, 0, POMEGRANATE, 255)
    let pgIconExclamation = Icon.getPG_exclamationMark(
      20, 10, 2, 7, 20, 40, 7,
      TRANSPARENT, 0, 0, WHITE, 255
    )
    pgExclamationBalloon.image(pgIconExclamation, 23, 10)

    // ARP BALLOON
    let pgArpBalloon1 = getPG_rectBalloon(
      10, 10, 340, 195,
      RIGHT, 390, 130, 50, 100,
      TRANSPARENT, 2, 255, BELIZEHOLE, 255)
    drawPG_text(pgArpBalloon1, 120, 42, "Arp Table", 28, WHITE, 255)

    let pgArpBalloon2 = getPG_rectBalloon(
      10, 10, 340, 160,
      RIGHT, 390, 90, 55, 105,
      TRANSPARENT, 2, 255, BELIZEHOLE, 255)

    // ARP TABLE
    let columnWidthArray = [130, 190]
    let rawHeightArray = [35, 35, 35, 35]
    let fColorTable1 = [[BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE],
     [BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE]]
    let fColorTable2 = [[BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE],
     [POMEGRANATE, POMEGRANATE], [BELIZEHOLE, BELIZEHOLE]]
    let fAlphaTable = [[255, 255], [255, 255], [255, 255], [255, 255]]
    let txTable = [[15, 35], [12, 13], [12, 13], [12, 13]]
    let tyArray = [25, 25, 25, 25]

    let textTable1_1 = [['IP Address', 'MAC Address'], ['10.0.0.101', '0000.0000.0101'],
     ['', ''], ['', '']]
    let textTable1_2 = [['IP Address', 'MAC Address'], ['10.0.0.101', '0000.0000.0101'],
      ['10.0.0.102', '0000.0000.0102'], ['', '']]
    let textTable2_1 = [['IP Address', 'MAC Address'], ['10.0.0.102', '0000.0000.0102'],
     ['', ''], ['', '']]
    let textTable2_2 = [['IP Address', 'MAC Address'], ['10.0.0.102', '0000.0000.0102'],
      ['10.0.0.101', '0000.0000.0101'], ['', '']]
    let textTable3 = [['IP Address', 'MAC Address'], ['10.0.0.103', '0000.0000.0103'],
     ['', ''], ['', '']]

    let tColorTable = [[WHITE, WHITE], [WHITE, WHITE], [WHITE, WHITE], [WHITE, WHITE]]
    let tAlphaTable = fAlphaTable

    let pgArpTable1_1 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable1_1, 20, tColorTable, tAlphaTable)
    let pgArpTable1_2 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable2, fAlphaTable,
      txTable, tyArray, textTable1_2, 20, tColorTable, tAlphaTable)
    let pgArpTable1_3 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable1_2, 20, tColorTable, tAlphaTable)

    let pgArpTable2_1 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable2_1, 20, tColorTable, tAlphaTable)
    let pgArpTable2_2 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable2, fAlphaTable,
      txTable, tyArray, textTable2_2, 20, tColorTable, tAlphaTable)
    let pgArpTable2_3 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable2_2, 20, tColorTable, tAlphaTable)

    let pgArpTable3 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable3, 20, tColorTable, tAlphaTable)

    // ARP REQUEST FORMAT
    let pg_ethArpRequestFormat1 = Network_Format.getPG_EthArp(
      BLACK, 2, 255, 20,
      CONCRETE, 15, 'FFFF.FFFF.FFFF', BLACK,
      CONCRETE, 10, '0000.0000.0101', BLACK,
      CONCRETE, 85, 'Who has "10.0.0.102" ?', BLACK)

    let pg_ethArpRequestFormat2 = Network_Format.getPG_EthArp(
      BLACK, 2, 255, 20,
      POMEGRANATE, 15, 'FFFF.FFFF.FFFF', WHITE,
      CONCRETE, 10, '0000.0000.0101', BLACK,
      CONCRETE, 85, 'Who has "10.0.0.102" ?', BLACK)

    let pg_ethArpRequestFormat3 = Network_Format.getPG_EthArp(
      BLACK, 2, 255, 20,
      CONCRETE, 15, 'FFFF.FFFF.FFFF', BLACK,
      CONCRETE, 10, '0000.0000.0101', BLACK,
      POMEGRANATE, 85, 'Who has "10.0.0.102" ?', WHITE)


    // ARP REPLY FORMAT
    let pg_ethArpReplyFormat1 = Network_Format.getPG_EthArp(
      BLACK, 2, 255, 20,
      CONCRETE, 10, '0000.0000.0101', BLACK,
      CONCRETE, 10, '0000.0000.0102', BLACK,
      CONCRETE, 28, '"0000.0000.0102" has "10.0.0.102"', BLACK, false)

    let pg_ethArpReplyFormat2 = Network_Format.getPG_EthArp(
      BLACK, 2, 255, 20,
      POMEGRANATE, 10, '0000.0000.0101', WHITE,
      CONCRETE, 10, '0000.0000.0102', BLACK,
      CONCRETE, 28, '"0000.0000.0102" has "10.0.0.102"', BLACK, false)

    let pg_ethArpReplyFormat3 = Network_Format.getPG_EthArp(
      BLACK, 2, 255, 20,
      CONCRETE, 10, '0000.0000.0101', BLACK,
      CONCRETE, 10, '0000.0000.0102', BLACK,
      POMEGRANATE, 28, '"0000.0000.0102" has "10.0.0.102"', WHITE, false)

    this.i05_pgb = pgb
    this.i05_pg_exclamation = pgExclamationBalloon
    this.i05_pg_bpArpRequest1 = pg_bpArpRequest1
    this.i05_pg_bpArpRequest2 = pg_bpArpRequest2
    this.i05_pg_bpArpRequest3 = pg_bpArpRequest3
    this.i05_pg_bpArpRequest4 = pg_bpArpRequest4

    this.i05_pg_bpArpReply1 = pg_bpArpReply1
    this.i05_pg_bpArpReply2 = pg_bpArpReply2
    this.i05_pg_bpArpReply3 = pg_bpArpReply3
    this.i05_pg_bpArpReply4 = pg_bpArpReply4

    this.i05_pg_arpBalloon1 = pgArpBalloon1
    this.i05_pg_arpBalloon2 = pgArpBalloon2

    this.i05_pg_arpTable1_1 = pgArpTable1_1
    this.i05_pg_arpTable1_2 = pgArpTable1_2
    this.i05_pg_arpTable1_3 = pgArpTable1_3
    this.i05_pg_arpTable2_1 = pgArpTable2_1
    this.i05_pg_arpTable2_2 = pgArpTable2_2
    this.i05_pg_arpTable2_3 = pgArpTable2_3
    this.i05_pg_arpTable3 = pgArpTable3

    this.i05_pg_ethArpRequestFormat1 = pg_ethArpRequestFormat1
    this.i05_pg_ethArpRequestFormat2 = pg_ethArpRequestFormat2
    this.i05_pg_ethArpRequestFormat3 = pg_ethArpRequestFormat3

    this.i05_pg_ethArpReplyFormat1 = pg_ethArpReplyFormat1
    this.i05_pg_ethArpReplyFormat2 = pg_ethArpReplyFormat2
    this.i05_pg_ethArpReplyFormat3 = pg_ethArpReplyFormat3
  }

  static getDrawPG_image05(){
    let x = 420
    let y = 30

    let pgb = this.i05_pgb
    let static_pgb = this.i01_pgb
    let pg_exclamation = this.i05_pg_exclamation

    let [x1, y1] = [this.i01_pc1x + x, this.i01_pc1y + y]
    let [x2, y2] = [this.i01_sw1x + x, this.i01_sw1y + y]
    let [x3, y3] = [this.i01_pc2x + x, this.i01_pc2y + y]
    let [x4, y4] = [this.i01_pc3x + x, this.i01_pc3y + y]

    let pg_bpArpRequest1 = this.i05_pg_bpArpRequest1
    let pg_bpArpRequest2 = this.i05_pg_bpArpRequest2
    let pg_bpArpRequest3 = this.i05_pg_bpArpRequest3
    let pg_bpArpRequest4 = this.i05_pg_bpArpRequest4

    let pg_bpArpReply1 = this.i05_pg_bpArpReply1
    let pg_bpArpReply2 = this.i05_pg_bpArpReply2
    let pg_bpArpReply3 = this.i05_pg_bpArpReply3
    let pg_bpArpReply4 = this.i05_pg_bpArpReply4

    let pg_arpBalloon1 = this.i05_pg_arpBalloon1
    let pg_arpBalloon2 = this.i05_pg_arpBalloon2
    let pg_arpTable1_1 = this.i05_pg_arpTable1_1
    let pg_arpTable1_2 = this.i05_pg_arpTable1_2
    let pg_arpTable1_3 = this.i05_pg_arpTable1_3
    let pg_arpTable2_1 = this.i05_pg_arpTable2_1
    let pg_arpTable2_2 = this.i05_pg_arpTable2_2
    let pg_arpTable2_3 = this.i05_pg_arpTable2_3
    let pg_arpTable3 = this.i05_pg_arpTable3

    let pg_ethArpRequestFormat1 = this.i05_pg_ethArpRequestFormat1
    let pg_ethArpRequestFormat2 = this.i05_pg_ethArpRequestFormat2
    let pg_ethArpRequestFormat3 = this.i05_pg_ethArpRequestFormat3

    let pg_ethArpReplyFormat1 = this.i05_pg_ethArpReplyFormat1
    let pg_ethArpReplyFormat2 = this.i05_pg_ethArpReplyFormat2
    let pg_ethArpReplyFormat3 = this.i05_pg_ethArpReplyFormat3

    pgb.clear()
    pgb.background(255)
    pgb.image(static_pgb, x, y)
    pgb.image(pg_arpBalloon1, 50, 50)
    pgb.image(pg_arpBalloon2, 50, 260)
    pgb.image(pg_arpBalloon2, 50, 440)

    let count = frameCount % 1000

    /*
    Frame Time Table

    0 - 50    : None
    50 - 150  : Show arp request frame at PC1
    150 - 200 : move it from PC1 to SW1
    200 - 300 : Show it at SW1
    300 - 350 : move it from SW1 to PC2 and PC3 (Flood)
    350 - 450 : Show it at PC2 and PC3
    450 - 500 : None

    500 - 600 : Show arp reply frame at PC2
    600 - 650 : Move it from PC2 to SW1
    650 - 750 : Showt it at SW1
    750 - 800 : Move it from SW1 to PC1
    800 - 900 : Show it at PC1
    900 - 950 : None
    */

    // Animation1 : Flowing Packet
    stayPG(pgb, pg_bpArpRequest1, x1, y1, count, 50, 150)
    movePG(pgb, pg_bpArpRequest1, x1, y1, 0, x2, y2, 0, count, 150, 200)
    stayPG(pgb, pg_bpArpRequest2, x2, y2, count, 200, 300)
    movePG(pgb, pg_bpArpRequest3, x2, y2, 0, x3, y3, 0, count, 300, 350)
    movePG(pgb, pg_bpArpRequest3, x2, y2, 0, x4, y4, 0, count, 300, 350)
    stayPG(pgb, pg_bpArpRequest4, x3, y3, count, 350, 450)
    stayPG(pgb, pg_bpArpRequest4, x4, y4, count, 350, 450)

    stayPG(pgb, pg_bpArpReply1, x3, y3, count, 500, 600)
    movePG(pgb, pg_bpArpReply1, x3, y3, 0, x2, y2, 0, count, 600, 650)
    stayPG(pgb, pg_bpArpReply2, x2, y2, count, 650, 750)
    movePG(pgb, pg_bpArpReply3, x2, y2, 0, x1, y1, 0, count, 750, 800)
    stayPG(pgb, pg_bpArpReply4, x1, y1, count, 800, 900)

    // Animation2 : Exclamation Mark
    stayPG_corner(pgb, pg_exclamation, x3 + 20, y3 - 130, count, 350, 450)
    stayPG_corner(pgb, pg_exclamation, x1 + 20, y1 - 130, count, 800, 900)

    // Animation3 : Arp Table
    stayPG_corner(pgb, pg_arpTable1_1, 70, 105, count, 0, 800)
    stayPG_corner(pgb, pg_arpTable1_2, 70, 105, count, 800, 900)
    stayPG_corner(pgb, pg_arpTable1_3, 70, 105, count, 900, 1000)

    stayPG_corner(pgb, pg_arpTable2_1, 70, 280, count, 0, 350)
    stayPG_corner(pgb, pg_arpTable2_2, 70, 280, count, 350, 450)
    stayPG_corner(pgb, pg_arpTable2_3, 70, 280, count, 450, 1000)

    stayPG_corner(pgb, pg_arpTable3, 70, 460, count, 0, 1000)

    // Animation4 : Arp Format
    let pfx = 300
    let pfy = 670
    stayPG_corner(pgb, pg_ethArpRequestFormat1, pfx, pfy, count, 0, 200)
    stayPG_corner(pgb, pg_ethArpRequestFormat2, pfx, pfy, count, 200, 300)
    stayPG_corner(pgb, pg_ethArpRequestFormat1, pfx, pfy, count, 300, 350)
    stayPG_corner(pgb, pg_ethArpRequestFormat3, pfx, pfy, count, 350, 450)

    stayPG_corner(pgb, pg_ethArpReplyFormat1, pfx, pfy, count, 500, 650)
    stayPG_corner(pgb, pg_ethArpReplyFormat2, pfx, pfy, count, 650, 750)
    stayPG_corner(pgb, pg_ethArpReplyFormat1, pfx, pfy, count, 750, 800)
    stayPG_corner(pgb, pg_ethArpReplyFormat3, pfx, pfy, count, 800, 950)

    let doSave = false
    if(doSave){
      if(frameCount <= 1000){
        savePG(pgb, 'net01_05_')
      }
    }
    //pgb.image(pg_ethArpReplyFormat1, 200, 650)

    return pgb
  }

  /**
  * Image 06
  **/

  static setup_image06(){
    let pgb = createGraphics(this.i01_pgb.width + 380, this.i01_pgb.height + 150)

    let pgBalloon = getPG_rectBalloon(
      100, 10, 300, 300,
      LEFT, 30, 260, 180, 230,
      TRANSPARENT, 2, 255, BELIZEHOLE, 255)
    drawPG_text(pgBalloon, 120, 50, "MAC Address Table", 28, WHITE, 255)

    let columnWidthArray = [80, 200]
    let rawHeightArray = [50, 50, 50, 50]
    let fColorTable1 = [[BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE],
     [BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE]]
    let fColorTable2 = [[BELIZEHOLE, BELIZEHOLE], [POMEGRANATE, POMEGRANATE],
     [BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE]]
    let fColorTable3 = [[BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE],
     [POMEGRANATE, POMEGRANATE], [BELIZEHOLE, BELIZEHOLE]]

    let fAlphaTable = [[255, 255], [255, 255], [255, 255], [255, 255]]
    let txTable = [[15, 25], [12, 10], [12, 10], [12, 10]]
    let tyArray = [32, 32, 32, 32]

    let textTable1 = [['Port', 'MAC Address'], ['', ''], ['', ''], ['', '']]
    let textTable2 = [['Port', 'MAC Address'], ['g0/1', '0000.0000.0101'], ['', ''], ['', '']]
    let textTable3 = [['Port', 'MAC Address'], ['g0/1', '0000.0000.0101'], ['g0/2', '0000.0000.0102'], ['', '']]

    let tColorTable = [[WHITE, WHITE], [WHITE, WHITE], [WHITE, WHITE], [WHITE, WHITE]]
    let tAlphaTable = fAlphaTable

    let pgTable1 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable1, 22, tColorTable, tAlphaTable)

    let pgTable2 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable2, fAlphaTable,
      txTable, tyArray, textTable2, 22, tColorTable, tAlphaTable)

    let pgTable3 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable2, 22, tColorTable, tAlphaTable)

    let pgTable4 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable3, fAlphaTable,
      txTable, tyArray, textTable3, 22, tColorTable, tAlphaTable)

    let pgTable5 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable3, 22, tColorTable, tAlphaTable)

    let pgEthFormat1 = Network_Format.getPG_EthIpWide(
      BLACK, 2, 255, 20,
      CONCRETE, 10, '0000.0000.0102', BLACK,
      CONCRETE, 10, '0000.0000.0101', BLACK,
      CONCRETE, 40, '10.0.0.102', BLACK,
      CONCRETE, 40, '10.0.0.101', BLACK,
      CONCRETE, BLACK)

    let pgEthFormat2 = Network_Format.getPG_EthIpWide(
      BLACK, 2, 255, 20,
      CONCRETE, 10, '0000.0000.0102', BLACK,
      POMEGRANATE, 10, '0000.0000.0101', WHITE,
      CONCRETE, 40, '10.0.0.102', BLACK,
      CONCRETE, 40, '10.0.0.101', BLACK,
      CONCRETE, BLACK)

    let pgEthFormat3 = Network_Format.getPG_EthIpWide(
      BLACK, 2, 255, 20,
      CONCRETE, 10, '0000.0000.0101', BLACK,
      CONCRETE, 10, '0000.0000.0102', BLACK,
      CONCRETE, 40, '10.0.0.101', BLACK,
      CONCRETE, 40, '10.0.0.102', BLACK,
      CONCRETE, BLACK)

    let pgEthFormat4 = Network_Format.getPG_EthIpWide(
      BLACK, 2, 255, 20,
      CONCRETE, 10, '0000.0000.0101', BLACK,
      POMEGRANATE, 10, '0000.0000.0102', WHITE,
      CONCRETE, 40, '10.0.0.101', BLACK,
      CONCRETE, 40, '10.0.0.102', BLACK,
      CONCRETE, BLACK)

    this.i06_pgb = pgb
    this.i06_pgBaloon = pgBalloon
    this.i06_pgTable1 = pgTable1
    this.i06_pgTable2 = pgTable2
    this.i06_pgTable3 = pgTable3
    this.i06_pgTable4 = pgTable4
    this.i06_pgTable5 = pgTable5

    this.i06_pgEthFormat1 = pgEthFormat1
    this.i06_pgEthFormat2 = pgEthFormat2
    this.i06_pgEthFormat3 = pgEthFormat3
    this.i06_pgEthFormat4 = pgEthFormat4
  }

  static getDrawPG_image06(){
    let pgb = this.i06_pgb
    let static_pgb = this.i01_pgb
    let pg_exclamation = this.i05_pg_exclamation

    let pgBalloon = this.i06_pgBaloon
    let pgTable1 = this.i06_pgTable1
    let pgTable2 = this.i06_pgTable2
    let pgTable3 = this.i06_pgTable3
    let pgTable4 = this.i06_pgTable4
    let pgTable5 = this.i06_pgTable5

    let pgEth1 = this.i03_pgEth1
    let pgEth2 = this.i03_pgEth2
    let pgEth3 = this.i03_pgEth3
    let pgEth4 = this.i03_pgEth4

    let pgEthFormat1 = this.i06_pgEthFormat1
    let pgEthFormat2 = this.i06_pgEthFormat2
    let pgEthFormat3 = this.i06_pgEthFormat3
    let pgEthFormat4 = this.i06_pgEthFormat4

    let [x1, y1] = [this.i01_pc1x, this.i01_pc1y]
    let [x2, y2] = [this.i01_sw1x, this.i01_sw1y]
    let [x3, y3] = [this.i01_pc2x, this.i01_pc2y]
    let [x4, y4] = [this.i01_pc3x, this.i01_pc3y]

    // Background
    pgb.clear()
    pgb.background(255)
    pgb.image(static_pgb, 0, 0)
    pgb.image(pgBalloon, 700, 50)

    /*
    Frame Time Table
    0 - 50    : None
    50 - 150  : Show frame at PC1
    150 - 200 : Move frame from PC1 to SW1
    200 - 300 : Show frame at SW1
    300 - 350 : Move frame from SW1 to PC2
    350 - 450 : Show frame at PC2
    450 - 500 : None
    */

    let count = frameCount % 1250

    // Animation1 : Frame Flow
    stayPG(pgb, pgEth1, x1, y1, count, 50, 150)
    movePG(pgb, pgEth1, x1, y1, 0, x2, y2, 0, count, 150, 200)
    stayPG(pgb, pgEth2, x2, y2, count, 200, 300)
    movePG(pgb, pgEth3, x2, y2, 0, x3, y3, 0, count, 300, 350)
    movePG(pgb, pgEth3, x2, y2, 0, x4, y4, 0, count, 300, 350)
    stayPG(pgb, pgEth4, x3, y3, count, 350, 450)
    stayPG(pgb, pgEth3, x4, y4, count, 350, 450)

    stayPG(pgb, pgEth1, x3, y3, count, 500, 600)
    movePG(pgb, pgEth1, x3, y3, 0, x2, y2, 0, count, 600, 650)
    stayPG(pgb, pgEth2, x2, y2, count, 650, 750)
    movePG(pgb, pgEth3, x2, y2, 0, x1, y1, 0, count, 750, 800)
    stayPG(pgb, pgEth3, x1, y1, count, 800, 900)

    movePG(pgb, pgEth1, x1, y1, 0, x2, y2, 0, count, 950, 1000)
    movePG(pgb, pgEth3, x2, y2, 0, x3, y3, 0, count, 1000, 1050)
    movePG(pgb, pgEth1, x3, y3, 0, x2, y2, 0, count, 1100, 1150)
    movePG(pgb, pgEth3, x2, y2, 0, x1, y1, 0, count, 1150, 1200)

    // Animation2 : Exclamation
    stayPG_corner(pgb, pg_exclamation, x2 + 20, y2 - 130, count, 200, 300)
    stayPG_corner(pgb, pg_exclamation, x3 + 20, y3 - 130, count, 350, 450)

    // Animation3 : Mac Table
    stayPG_corner(pgb, pgTable1, 810, 130, count, 0, 200)
    stayPG_corner(pgb, pgTable2, 810, 130, count, 200, 300)
    stayPG_corner(pgb, pgTable3, 810, 130, count, 300, 650)
    stayPG_corner(pgb, pgTable4, 810, 130, count, 650, 750)
    stayPG_corner(pgb, pgTable5, 810, 130, count, 750, 10000)

    // Animation4 : Frame Detail
    let pfx = 180
    let pfy = 620
    stayPG_corner(pgb, pgEthFormat1, pfx, pfy, count, 0, 200)
    stayPG_corner(pgb, pgEthFormat2, pfx, pfy, count, 200, 300)
    stayPG_corner(pgb, pgEthFormat1, pfx, pfy, count, 300, 450)

    stayPG_corner(pgb, pgEthFormat3, pfx, pfy, count, 500, 650)
    stayPG_corner(pgb, pgEthFormat4, pfx, pfy, count, 650, 750)
    stayPG_corner(pgb, pgEthFormat3, pfx, pfy, count, 750, 900)

    stayPG_corner(pgb, pgEthFormat1, pfx, pfy, count, 950, 1050)
    stayPG_corner(pgb, pgEthFormat3, pfx, pfy, count, 1100, 1200)

    let doSave = false
    if(doSave){
      if(frameCount <= 1250){
        savePG(pgb, 'net01_06_')
      }
    }

    return pgb
  }


  /**
  * Image 07
  **/

  static setup_image07(){
    let pgb = createGraphics(1100, 680)
    let topology = new Network_TopologyManager(pgb.width, pgb.height)

    let pc1 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc1.setPortsColor([], [], [EMERALD], [])
    pc1.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    topology.addGear('pc1', pc1, 320, 100)
    topology.addGearText('pc1', 'name',  28, -10, 'PC1', 24, BLACK, 255)
    topology.addGearText('pc1', 'ip', -250, 40, 'IP : 10.0.0.101/8', 20, BLACK, 255)
    topology.addGearText('pc1', 'mac', -250, 70, 'MAC : 0000.0000.0101', 20, BLACK, 255)
    topology.addGearText('pc1', 'port', 115, 40, 'g0/1', 20, BLACK, 255)

    let pc2 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc2.setPortsColor([], [], [EMERALD], [])
    pc2.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    topology.addGear('pc2', pc2, 320, 275)
    topology.addGearText('pc2', 'name', 28, -10, 'PC2', 24, BLACK, 255)
    topology.addGearText('pc2', 'ip', -250, 40, 'IP : 10.0.0.102/8', 20, BLACK, 255)
    topology.addGearText('pc2', 'mac', -250, 70, 'MAC : 0000.0000.0102', 20, BLACK, 255)
    topology.addGearText('pc2', 'port', 115, 65, 'g0/1', 20, BLACK, 255)

    let pc3 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc3.setPortsColor([], [], [EMERALD], [])
    pc3.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    topology.addGear('pc3', pc3, 320, 500)
    topology.addGearText('pc3', 'name',  28, -10, 'PC3', 24, BLACK, 255)
    topology.addGearText('pc3', 'ip', -250, 40, 'IP : 10.0.0.103/8', 20, BLACK, 255)
    topology.addGearText('pc3', 'mac', -250, 70, 'MAC : 0000.0000.0103', 20, BLACK, 255)
    topology.addGearText('pc3', 'port', 115, 75, 'g0/1', 20, BLACK, 255)

    let sw1 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, PETERRIVER, 255,
                               12, BLACK, 2, 255)
    sw1.setPortsColor([EMERALD, EMERALD], [], [EMERALD], [])
    sw1.setIcon(NETWORK_GEAR_L2SWITCH, 10, 10, 80, WHITE)
    topology.addGear('sw1', sw1, 620, 190)
    topology.addGearText('sw1', 'name', 5, -10, 'Switch1', 24, BLACK, 255)
    topology.addGearText('sw1', 'port1', -70, -5, 'g0/1', 20, BLACK, 255)
    topology.addGearText('sw1', 'port2', -70, 110, 'g0/2', 20, BLACK, 255)
    topology.addGearText('sw1', 'port3', 115, 40, 'g0/3', 20, BLACK, 255)

    let sw2 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, PETERRIVER, 255,
                               12, BLACK, 2, 255)
    sw2.setPortsColor([EMERALD], [], [EMERALD], [])
    sw2.setIcon(NETWORK_GEAR_L2SWITCH, 10, 10, 80, WHITE)
    topology.addGear('sw2', sw2, 620, 500)
    topology.addGearText('sw2', 'name', 5, -10, 'Switch2', 24, BLACK, 255)
    topology.addGearText('sw2', 'port1', -70, 75, 'g0/1', 20, BLACK, 255)
    topology.addGearText('sw2', 'port2', 115, 75, 'g0/2', 20, BLACK, 255)

    let sw3 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, PETERRIVER, 255,
                               12, BLACK, 2, 255)
    sw3.setPortsColor([EMERALD, EMERALD], [], [], [])
    sw3.setIcon(NETWORK_GEAR_L2SWITCH, 10, 10, 80, WHITE)
    topology.addGear('sw3', sw3, 920, 350)
    topology.addGearText('sw3', 'name', 5, -10, 'Switch3', 24, BLACK, 255)
    topology.addGearText('sw3', 'port1', -70, -30, 'g0/1', 20, BLACK, 255)
    topology.addGearText('sw3', 'port2', -70, 135, 'g0/2', 20, BLACK, 255)

    topology.connectGears('pc1', RIGHT, 1, 'sw1', LEFT, 1, BLACK, 2, 255)
    topology.connectGears('pc2', RIGHT, 1, 'sw1', LEFT, 2, BLACK, 2, 255)
    topology.connectGears('sw1', RIGHT, 1, 'sw3', LEFT, 1, BLACK, 2, 255)

    topology.connectGears('pc3', RIGHT, 1, 'sw2', LEFT, 1, BLACK, 2, 255)
    topology.connectGears('sw2', RIGHT, 1, 'sw3', LEFT, 2, BLACK, 2, 255)

    pgb.clear()
    pgb.background(255)
    topology.drawPG(pgb)

    this.i07_pgb = pgb

    let [pc1x, pc1y] = topology.getGearCenterXY('pc1')
    let [pc2x, pc2y] = topology.getGearCenterXY('pc2')
    let [pc3x, pc3y] = topology.getGearCenterXY('pc3')
    let [sw1x, sw1y] = topology.getGearCenterXY('sw1')
    let [sw2x, sw2y] = topology.getGearCenterXY('sw2')
    let [sw3x, sw3y] = topology.getGearCenterXY('sw3')
    this.i07_pc1x = pc1x
    this.i07_pc1y = pc1y
    this.i07_pc2x = pc2x
    this.i07_pc2y = pc2y
    this.i07_pc3x = pc3x
    this.i07_pc3y = pc3y
    this.i07_sw1x = sw1x
    this.i07_sw1y = sw1y
    this.i07_sw2x = sw2x
    this.i07_sw2y = sw2y
    this.i07_sw3x = sw3x
    this.i07_sw3y = sw3y
  }

  static getDrawPG_image07(){
    let pgb = this.i07_pgb

    let doSave = true
    if(doSave){
      if(frameCount == 50){
        savePG(pgb, 'net01_07_')
      }
    }

    return pgb
  }

  /**
  * Image 08
  **/

  static setup_image08(){
    let pgb = createGraphics(this.i07_pgb.width + 500, this.i07_pgb.height + 100)

    let pg_MacTableBalloon1 = getPG_rectBalloon(
      100, 10, 300, 260,
      LEFT, 30, 240, 160, 210,
      TRANSPARENT, 2, 255, BELIZEHOLE, 255)
    drawPG_text(pg_MacTableBalloon1, 115, 45, "MAC Address Table", 28, WHITE, 255)

    let columnWidthArray = [80, 200]
    let rawHeightArray = [50, 50, 50, 50]
    let fColorTable1 = [[BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE],
     [BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE]]
    let fColorTable2 = [[BELIZEHOLE, BELIZEHOLE], [POMEGRANATE, POMEGRANATE],
     [BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE]]
    let fColorTable3 = [[BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE],
     [POMEGRANATE, POMEGRANATE], [BELIZEHOLE, BELIZEHOLE]]
    let fColorTable4 = [[BELIZEHOLE, BELIZEHOLE], [BELIZEHOLE, BELIZEHOLE],
     [BELIZEHOLE, BELIZEHOLE], [POMEGRANATE, POMEGRANATE]]
    let fAlphaTable = [[255, 255], [255, 255], [255, 255], [255, 255]]
    let txTable = [[15, 25], [12, 10], [12, 10], [12, 10]]
    let tyArray = [32, 32, 32, 32]
    let textTable1 = [['Port', 'MAC Address'], ['g0/1', '0000.0000.0101'], ['g0/2', '0000.0000.0102'], ['g0/3', '0000.0000.0103']]
    let textTable2 = [['Port', 'MAC Address'], ['g0/1', '0000.0000.0103'], ['g0/2', '0000.0000.0101'], ['g0/2', '0000.0000.0102']]
    let textTable3 = [['Port', 'MAC Address'], ['g0/1', '0000.0000.0101'], ['g0/1', '0000.0000.0102'], ['g0/2', '0000.0000.0103']]
    let tColorTable = [[WHITE, WHITE], [WHITE, WHITE], [WHITE, WHITE], [WHITE, WHITE]]
    let tAlphaTable = fAlphaTable

    let pgTable1_1 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable1, 22, tColorTable, tAlphaTable)
    let pgTable1_2 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable3, fAlphaTable,
      txTable, tyArray, textTable1, 22, tColorTable, tAlphaTable)
    let pgTable1_3 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable4, fAlphaTable,
      txTable, tyArray, textTable1, 22, tColorTable, tAlphaTable)

    let pg_MacTableBalloon2 = getPG_rectBalloon(
      600, 10, 300, 220,
      LEFT, 210, 190, 90, 140,
      TRANSPARENT, 2, 255, BELIZEHOLE, 255)

    let pgTable2_1 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable2, 22, tColorTable, tAlphaTable)
    let pgTable2_2 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable2, fAlphaTable,
      txTable, tyArray, textTable2, 22, tColorTable, tAlphaTable)
    let pgTable2_3 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable4, fAlphaTable,
      txTable, tyArray, textTable2, 22, tColorTable, tAlphaTable)


    let pg_MacTableBalloon3 = getPG_rectBalloon(
      250, 10, 300, 220,
      LEFT, 70, 240, 130, 180,
      TRANSPARENT, 2, 255, BELIZEHOLE, 255)

    let pgTable3_1 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable1, fAlphaTable,
      txTable, tyArray, textTable3, 22, tColorTable, tAlphaTable)
    let pgTable3_2 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable4, fAlphaTable,
      txTable, tyArray, textTable3, 22, tColorTable, tAlphaTable)
    let pgTable3_3 = getPG_table(
      columnWidthArray, rawHeightArray, WHITE, 2, 255,
      fColorTable3, fAlphaTable,
      txTable, tyArray, textTable3, 22, tColorTable, tAlphaTable)


    let pg_redBall = getPG_ellipse(20, 20, TRANSPARENT, 0, 0, POMEGRANATE, 255)
    let y = 100
    let speed = 400
    let distance = 100
    let flow1 = new Flow(
      [this.i07_pc1x, this.i07_sw1x, this.i07_pc2x],
      [this.i07_pc1y + y, this.i07_sw1y + y, this.i07_pc2y + y],
      speed, distance)
    let flow2 = new Flow(
      [this.i07_pc1x, this.i07_sw1x, this.i07_sw3x, this.i07_sw2x, this.i07_pc3x],
      [this.i07_pc1y + y, this.i07_sw1y + y, this.i07_sw3y + y, this.i07_sw2y + y, this.i07_pc3y + y],
      speed, distance)
    let flow3 = new Flow(
      [this.i07_pc3x, this.i07_sw2x, this.i07_sw3x, this.i07_sw1x, this.i07_pc2x],
      [this.i07_pc3y + y, this.i07_sw2y + y, this.i07_sw3y + y, this.i07_sw1y + y, this.i07_pc2y + y],
      speed, distance)

    this.i08_pgb = pgb
    this.i08_pg_MacTableBalloon1 = pg_MacTableBalloon1
    this.i08_pg_MacTableBalloon2 = pg_MacTableBalloon2
    this.i08_pg_MacTableBalloon3 = pg_MacTableBalloon3

    this.i08_pg_redBall = pg_redBall
    this.i08_flow1 = flow1
    this.i08_flow2 = flow2
    this.i08_flow3 = flow3

    this.i08_pg_MacTable1_1 = pgTable1_1
    this.i08_pg_MacTable1_2 = pgTable1_2
    this.i08_pg_MacTable1_3 = pgTable1_3

    this.i08_pg_MacTable2_1 = pgTable2_1
    this.i08_pg_MacTable2_2 = pgTable2_2
    this.i08_pg_MacTable2_3 = pgTable2_3

    this.i08_pg_MacTable3_1 = pgTable3_1
    this.i08_pg_MacTable3_2 = pgTable3_2
    this.i08_pg_MacTable3_3 = pgTable3_3
  }

  static getDrawPG_image08(){
    let pgb = this.i08_pgb
    let pgb_topology = this.i07_pgb
    let pg_MacTableBalloon1 = this.i08_pg_MacTableBalloon1
    let pg_MacTableBalloon2 = this.i08_pg_MacTableBalloon2
    let pg_MacTableBalloon3 = this.i08_pg_MacTableBalloon3
    let pg_macTable1_1 = this.i08_pg_MacTable1_1
    let pg_macTable1_2 = this.i08_pg_MacTable1_2
    let pg_macTable1_3 = this.i08_pg_MacTable1_3
    let pg_macTable2_1 = this.i08_pg_MacTable2_1
    let pg_macTable2_2 = this.i08_pg_MacTable2_2
    let pg_macTable2_3 = this.i08_pg_MacTable2_3
    let pg_macTable3_1 = this.i08_pg_MacTable3_1
    let pg_macTable3_2 = this.i08_pg_MacTable3_2
    let pg_macTable3_3 = this.i08_pg_MacTable3_3

    let pg_redBall = this.i08_pg_redBall
    let flow1 = this.i08_flow1
    let flow2 = this.i08_flow2
    let flow3 = this.i08_flow3

    let y = 100
    pgb.clear()
    pgb.background(255)
    pgb.image(pgb_topology, 0, y)
    pgb.image(pg_MacTableBalloon1, 720, 50)
    pgb.image(pg_MacTableBalloon2, 620, 470)
    pgb.image(pg_MacTableBalloon3, 970, 200)

    let count = frameCount % 1350

    // Animation 1 : Flow
    switch(count){
      case 50:
        flow1.start(); break
      case 250:
        flow1.stop(); break
      case 450:
        flow2.start(); break
      case 650:
        flow2.stop(); break
      case 900:
        flow3.start(); break
      case 1100:
        flow3.stop(); break
      default:
        // none
    }

    flow1.draw(pgb, pg_redBall)
    flow2.draw(pgb, pg_redBall)
    flow3.draw(pgb, pg_redBall)

    // Animation 1 : MacTable1
    let f1 = 50
    let f2 = 370
    let f3 = 450
    let f4 = 850
    let f5 = 900
    let f6 = 1300
    stayPG_corner(pgb, pg_macTable1_1, 830, 110, count, 0, f1)
    stayPG_corner(pgb, pg_macTable1_2, 830, 110, count, f1, f2)
    stayPG_corner(pgb, pg_macTable1_1, 830, 110, count, f2, f3)
    stayPG_corner(pgb, pg_macTable1_3, 830, 110, count, f3, f4)
    stayPG_corner(pgb, pg_macTable1_1, 830, 110, count, f4, f5)
    stayPG_corner(pgb, pg_macTable1_2, 830, 110, count, f5, f6)
    stayPG_corner(pgb, pg_macTable1_1, 830, 110, count, f6, 1350)

    stayPG_corner(pgb, pg_macTable2_1, 1230, 490, count, 0, f3)
    stayPG_corner(pgb, pg_macTable2_2, 1230, 490, count, f3, f4)
    stayPG_corner(pgb, pg_macTable2_1, 1230, 490, count, f4, f5)
    stayPG_corner(pgb, pg_macTable2_3, 1230, 490, count, f5, f6)
    stayPG_corner(pgb, pg_macTable2_1, 1230, 490, count, f6, 1350)

    stayPG_corner(pgb, pg_macTable3_1, 1230, 220, count, 0, 1200)
    stayPG_corner(pgb, pg_macTable3_2, 1230, 220, count, f3, f4)
    stayPG_corner(pgb, pg_macTable3_1, 1230, 220, count, f4, f5)
    stayPG_corner(pgb, pg_macTable3_3, 1230, 220, count, f5, f6)
    stayPG_corner(pgb, pg_macTable3_1, 1230, 220, count, f6, 1350)

    let doSave = true
    if(doSave){
      if(frameCount <= 1350){
        savePG(pgb, 'net01_08_')
      }
    }

    return pgb
  }

  /**
  * Image 09
  **/

  static setup_image09(){
    let pgb = createGraphics(width, height)
    this.i09_pgb = pgb
  }

  static getDrawPG_image09(){
    let pgb = this.i09_pgb
    return pgb
  }
}
