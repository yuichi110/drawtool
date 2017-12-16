class Book_Network01_02{

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
    /*
    this.setup_image06()
    this.setup_image07()
    this.setup_image08()
    this.setup_image09()
    */
  }

  static getDrawPG(){
    let imageNumber = 5
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
    topology.addGearText('pc1', 'name',  28, -10, 'PC1', 24, BLACK, 255)
    topology.addGearText('pc1', 'ip', -250, 40, 'IP : 10.0.0.101/8', 20, BLACK, 255)
    topology.addGearText('pc1', 'mac', -250, 70, 'MAC : 0000.0000.0101', 20, BLACK, 255)
    topology.addGearText('pc1', 'port', 115, 40, 'g0/1', 20, BLACK, 255)

    let pc2 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc2.setPortsColor([], [], [EMERALD], [])
    pc2.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    topology.addGear('pc2', pc2, 300, 275)
    topology.addGearText('pc2', 'name', 28, -10, 'PC2', 24, BLACK, 255)
    topology.addGearText('pc2', 'ip', -250, 40, 'IP : 10.0.0.102/8', 20, BLACK, 255)
    topology.addGearText('pc2', 'mac', -250, 70, 'MAC : 0000.0000.0102', 20, BLACK, 255)
    topology.addGearText('pc2', 'port', 115, 40, 'g0/1', 20, BLACK, 255)

    let pc3 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, AMETHYST, 255,
                               12, BLACK, 2, 255)
    pc3.setPortsColor([], [], [EMERALD], [])
    pc3.setIcon(NETWORK_GEAR_PC, 10, 10, 80, WHITE)
    topology.addGear('pc3', pc3, 300, 450)
    topology.addGearText('pc3', 'name',  28, -10, 'PC3', 24, BLACK, 255)
    topology.addGearText('pc3', 'ip', -250, 40, 'IP : 10.0.0.103/8', 20, BLACK, 255)
    topology.addGearText('pc3', 'mac', -250, 70, 'MAC : 0000.0000.0103', 20, BLACK, 255)
    topology.addGearText('pc3', 'port', 115, 60, 'g0/1', 20, BLACK, 255)

    let sw1 = new Network_Gear(100, 100, 10,
                               BLACK, 2, 255, PETERRIVER, 255,
                               12, BLACK, 2, 255)
    sw1.setPortsColor([EMERALD, EMERALD, EMERALD], [], [], [])
    sw1.setIcon(NETWORK_GEAR_L2SWITCH, 10, 10, 80, WHITE)
    topology.addGear('sw1', sw1, 600, 275)
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
    let pgb = createGraphics(this.i01_pgb.width, this.i01_pgb.height + 100)

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
    //pgb.image(pgTable1, 810, 130)

    let count = frameCount % 500

    // Animation1 : Frame Flow
    stayPG(pgb, pgEth1, x1, y1, count, 50, 150)
    movePG(pgb, pgEth1, x1, y1, 0, x2, y2, 0, count, 150, 200)
    stayPG(pgb, pgEth2, x2, y2, count, 200, 300)
    movePG(pgb, pgEth3, x2, y2, 0, x3, y3, 0, count, 300, 350)
    stayPG(pgb, pgEth3, x3, y3, count, 350, 450)

    // Animation2 : Frame Detail
    let pfx = 200
    let pfy = 600
    stayPG_corner(pgb, pgEthFormat1, pfx, pfy, count, 0, 200)
    stayPG_corner(pgb, pgEthFormat2, pfx, pfy, count, 200, 300)
    stayPG_corner(pgb, pgEthFormat1, pfx, pfy, count, 300, 500)

    // Animation3 : Mac Table
    stayPG_corner(pgb, pgTable1, 810, 130, count, 0, 200)
    stayPG_corner(pgb, pgTable2, 810, 130, count, 200, 300)
    stayPG_corner(pgb, pgTable1, 810, 130, count, 300, 500)

    return pgb
  }

  /**
  * Image 05 : ARP
  **/

  static setup_image05(){
    let pgb = createGraphics(this.i01_pgb.width, this.i01_pgb.height + 170)

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
    stayPG_corner(pgb, pg_ethArpRequestFormat1, 200, 650, count, 0, 200)
    stayPG_corner(pgb, pg_ethArpRequestFormat2, 200, 650, count, 200, 300)
    stayPG_corner(pgb, pg_ethArpRequestFormat1, 200, 650, count, 300, 350)
    stayPG_corner(pgb, pg_ethArpRequestFormat3, 200, 650, count, 350, 450)

    stayPG_corner(pgb, pg_ethArpReplyFormat1, 200, 650, count, 500, 650)
    stayPG_corner(pgb, pg_ethArpReplyFormat2, 200, 650, count, 650, 750)
    stayPG_corner(pgb, pg_ethArpReplyFormat1, 200, 650, count, 750, 800)
    stayPG_corner(pgb, pg_ethArpReplyFormat3, 200, 650, count, 800, 950)


    //pgb.image(pg_ethArpReplyFormat1, 200, 650)

    return pgb
  }


}
