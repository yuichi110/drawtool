class Book_Network01_02{

  static preload(){
    main_width = 800
    main_height = 800
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO

    this.imageNumber = 1
    switch(this.imageNumber){
      case 1:
        // none
        break

      default:
        break
    }
  }

  static setup(pgb){
    switch(this.imageNumber){
      case 1:
        this.setup_image1(pgb)
        break
      default:
        break
    }
  }

  static draw(pgb){
    switch(this.imageNumber){
      case 1:
        this.draw_image1(pgb)
        break
      default:
        break
    }
  }

  /***
  Image 1
  ***/

  static setup_image1(){
    this.i1_topology = new Network_TopologyManager(width, height)

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

  static draw_image1(pgb){
    this.i1_topology.drawPG(pgb)
  }

  /***
  Image 2
  ***/

  static setup_image2(){
    this.i2_pgb = createGraphics(width, height)

    
  }

  static draw_image2(pgb){

  }
}
