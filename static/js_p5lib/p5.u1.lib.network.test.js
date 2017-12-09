class LibNetworkTest{

  static preload(){
    main_width = 1200
    main_height = 800
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO
  }

  static setup(){
    this.pgb = createGraphics(width, height)

    // brief packet
    this.pg_bpEth1 = Network_BriefPacket.getPG_Eth(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, false)
    this.pg_bpEth2 = Network_BriefPacket.getPG_Eth(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, true)
    this.pg_bpEthIp1 = Network_BriefPacket.getPG_EthIp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, false)
    this.pg_bpEthIp2 = Network_BriefPacket.getPG_EthIp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, true)
    this.pg_bpEthIpTcp1 = Network_BriefPacket.getPG_EthIpTcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, false, false)
    this.pg_bpEthIpTcp2 = Network_BriefPacket.getPG_EthIpTcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, true, true)
    this.pg_bpIp1 = Network_BriefPacket.getPG_Ip(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, false)
    this.pg_bpIp2 = Network_BriefPacket.getPG_Ip(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, true)
    this.pg_bpIpTcp1 = Network_BriefPacket.getPG_IpTcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, false, false)
    this.pg_bpIpTcp2 = Network_BriefPacket.getPG_IpTcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, true, true)
    this.pg_bpTcp1 = Network_BriefPacket.getPG_Tcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, false, false)
    this.pg_bpTcp2 = Network_BriefPacket.getPG_Tcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, true, true)
    this.pg_bpData = Network_BriefPacket.getPG_Data(BLACK, 2, 255, CONCRETE, BLACK)

    // brief packet small
    this.pg_bpsEth1 = Network_BriefPacketSmall.getPG_Eth(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, false)
    this.pg_bpsEth2 = Network_BriefPacketSmall.getPG_Eth(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, true)
    this.pg_bpsEthIp1 = Network_BriefPacketSmall.getPG_EthIp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, false)
    this.pg_bpsEthIp2 = Network_BriefPacketSmall.getPG_EthIp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, true)
    this.pg_bpsEthIpTcp1 = Network_BriefPacketSmall.getPG_EthIpTcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, false, false)
    this.pg_bpsEthIpTcp2 = Network_BriefPacketSmall.getPG_EthIpTcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, true, true)
    this.pg_bpsIp1 = Network_BriefPacketSmall.getPG_Ip(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, false)
    this.pg_bpsIp2 = Network_BriefPacketSmall.getPG_Ip(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, true)
    this.pg_bpsIpTcp1 = Network_BriefPacketSmall.getPG_IpTcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, false, false)
    this.pg_bpsIpTcp2 = Network_BriefPacketSmall.getPG_IpTcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, CONCRETE, BLACK, true, true)
    this.pg_bpsTcp1 = Network_BriefPacketSmall.getPG_Tcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, false, false)
    this.pg_bpsTcp2 = Network_BriefPacketSmall.getPG_Tcp(BLACK, 2, 255, CONCRETE, BLACK, CONCRETE, BLACK, true, true)
    this.pg_bpsData = Network_BriefPacketSmall.getPG_Data(BLACK, 2, 255, CONCRETE, BLACK)

    // network gear icon
    let iconSize = 200
    this.pg_GearIconL2Switch = Network_GearIcon.getPG_l2switch(iconSize, BLACK);
    this.pg_GearIconRouter = Network_GearIcon.getPG_router(iconSize, BLACK);
    this.pg_GearIconL3Switch = Network_GearIcon.getPG_l3switch(iconSize, BLACK);
    this.pg_GearIconPC = Network_GearIcon.getPG_pc(iconSize, BLACK);
    this.pg_GearIconFirewall = Network_GearIcon.getPG_firewall(iconSize, BLACK);
    this.pg_GearIconAp = Network_GearIcon.getPG_accesspoint(iconSize, BLACK);
    this.pg_GearIconLb = Network_GearIcon.getPG_loadbalancer(iconSize, BLACK);
    this.pg_GearIconStorage = Network_GearIcon.getPG_storage(iconSize, BLACK);
    this.pg_GearIconServer = Network_GearIcon.getPG_server(iconSize, BLACK);

    this.gear = new Network_Gear(100, 100, 10,
                            BLACK, 2, 255, CARROT, 255,
                            12, BLACK, 2, 255)
    this.gear.setPortsColor([GREEN, EMERALD], [EMERALD], [EMERALD, EMERALD, EMERALD], [EMERALD, EMERALD])
    this.gear.setIcon(NETWORK_GEAR_ROUTER, 10, 10, 80, WHITE)
    this.gear.setPortColor(BOTTOM, 1, RED)
    //this.gear.setText(20, 50, 'Hello', 32, BLACK, 255, false)

    this.setup_topology()
  }

  static setup_topology(){
    this.topology = new Network_TopologyManager(500, 500)

    let pg1 = getPG_rect(200, 400, 10, RED, 7, 255, TRANSPARENT, 255)
    this.topology.addPgUnder('red-area', pg1, 10, 10)

    let pg2 = getPG_ellipse(20, 40, BLACK, 2, 255, TRANSPARENT, 255)
    this.topology.addPgOver('channel', pg2, 220, 120)

    let router = new Network_Gear(100, 100, 10,
                                BLACK, 2, 255, CARROT, 255,
                                12, BLACK, 2, 255)
    router.setPortsColor([], [], [EMERALD, EMERALD], [])
    router.setIcon(NETWORK_GEAR_ROUTER, 10, 10, 80, WHITE)
    this.topology.addGear('router', router, 100, 100)

    this.topology.addGearText('router', 'name', 0, -10, 'Router01', 24, BLACK, 255)

    let l2switch = new Network_Gear(100, 100, 10,
                                BLACK, 2, 255, PETERRIVER, 255,
                                12, BLACK, 2, 255)
    l2switch.setPortsColor([EMERALD], [], [], [])
    l2switch.setIcon(NETWORK_GEAR_L2SWITCH, 10, 10, 80, WHITE)
    this.topology.addGear('l2switch', l2switch, 300, 100)

    this.topology.connectGears('router', RIGHT, 1, 'l2switch', LEFT, 1, BLACK, 2, 255)

    this.topology.addTopologyText('image-01', 30, 30, 'Hello World', 24, BLACK, 255)
  }

  static getDrawPG(){
    switch(5){
      case 1:
        return this.getDrawPG_briefPackets()
      case 2:
        return this.getDrawPG_briefPacketSmalls()
      case 3:
        return this.getDrawPG_gearIcon1()
      case 4:
        return this.getDrawPG_gearIcon2()
      case 5:
        return this.getDrawPG_gear()
      case 6:
        return this.getDrawPG_topology()
        /*
      case 7:
        this.drawSerialRects(pgb); break
      case 8:
        this.drawTable(pgb); break
        */
      default:
        console.error('Switch Error')
    }
  }

  static getDrawPG_briefPackets(){
    this.pgb.clear()
    this.pgb.background(255)

    this.pgb.image(this.pg_bpEth1, 100, 100)
    this.pgb.image(this.pg_bpEth2, 100, 200)
    this.pgb.image(this.pg_bpEthIp1, 100, 300)
    this.pgb.image(this.pg_bpEthIp2, 100, 400)
    this.pgb.image(this.pg_bpEthIpTcp1, 100, 500)
    this.pgb.image(this.pg_bpEthIpTcp2, 100, 600)

    this.pgb.image(this.pg_bpIp1, 400, 100)
    this.pgb.image(this.pg_bpIp2, 400, 200)
    this.pgb.image(this.pg_bpIpTcp1, 400, 300)
    this.pgb.image(this.pg_bpIpTcp2, 400, 400)

    this.pgb.image(this.pg_bpTcp1, 700, 100)
    this.pgb.image(this.pg_bpTcp2, 700, 200)
    this.pgb.image(this.pg_bpData, 700, 300)

    return this.pgb
  }

  static getDrawPG_briefPacketSmalls(){
    this.pgb.clear()
    this.pgb.background(255)

    this.pgb.image(this.pg_bpsEth1, 100, 100)
    this.pgb.image(this.pg_bpsEth2, 100, 200)
    this.pgb.image(this.pg_bpsEthIp1, 100, 300)
    this.pgb.image(this.pg_bpsEthIp2, 100, 400)
    this.pgb.image(this.pg_bpsEthIpTcp1, 100, 500)
    this.pgb.image(this.pg_bpsEthIpTcp2, 100, 600)

    this.pgb.image(this.pg_bpsIp1, 400, 100)
    this.pgb.image(this.pg_bpsIp2, 400, 200)
    this.pgb.image(this.pg_bpsIpTcp1, 400, 300)
    this.pgb.image(this.pg_bpsIpTcp2, 400, 400)

    this.pgb.image(this.pg_bpsTcp1, 700, 100)
    this.pgb.image(this.pg_bpsTcp2, 700, 200)
    this.pgb.image(this.pg_bpsData, 700, 300)

    return this.pgb
  }

  static getDrawPG_gearIcon1(){
    this.pgb.clear()
    this.pgb.background(255)

    this.pgb.image(this.pg_GearIconL2Switch, 100, 100);
    this.pgb.image(this.pg_GearIconRouter, 100, 400);
    this.pgb.image(this.pg_GearIconL3Switch, 400, 100);
    this.pgb.image(this.pg_GearIconPC, 400, 400)
    this.pgb.image(this.pg_GearIconFirewall, 700, 100)
    this.pgb.image(this.pg_GearIconAp, 700, 400)

    return this.pgb
  }

  static getDrawPG_gearIcon2(){
    this.pgb.clear()
    this.pgb.background(255)

    this.pgb.image(this.pg_GearIconLb, 100, 100)
    this.pgb.image(this.pg_GearIconStorage, 100, 400)
    this.pgb.image(this.pg_GearIconServer, 400, 100)

    return this.pgb
  }

  static getDrawPG_gear(){
    this.pgb.clear()
    this.pgb.background(255)

    this.pgb.image(this.gear.getPG(), 100, 100)

    return this.pgb
  }

  static getDrawPG_topology(){
    this.pgb.clear()
    this.pgb.background(255)

    this.topology.drawPG(this.pgb)

    return this.pgb
  }

}
