/*
* Utility module for drawing network object.
* Item Size are designed for font mplus-1p
*
* Classes
*  - Network_BreifPacket : draw brief packet.
*  - Network_BreifPacketSmall : draw small brief packet.
*  - Network_GearIcon : provide size and color, get gear icon pgraphics.
*  - Network_Gear : Gear image in the topology. Having ports and icon
*  - Network_TopologyManager : Put gears on the topology and connect them
*
* 2017/11/26
* @author Yuichi Ito yuichi@yuichi.com
*/

const NETWORK_GEAR_ROUTER = Symbol('router')
const NETWORK_GEAR_L2SWITCH = Symbol('l2switch')
const NETWORK_GEAR_L3SWITCH = Symbol('l3switch')
const NETWORK_GEAR_FIREWALL = Symbol('firewall')
const NETWORK_GEAR_AP = Symbol('accesspoint')
const NETWORK_GEAR_LOADBALANCER = Symbol('load balancer')
const NETWORK_GEAR_PC = Symbol('pc')
const NETWORK_GEAR_SERVER = Symbol('server')
const NETWORK_GEAR_STORAGE = Symbol('storage')
const NETWORK_GEAR_UNDEFINED = Symbol('undefined')

function lib_network_preload(){
  if(_lib_network_preload){
    return
  }
  _lib_network_preload = true

  lib_common_preload()
  setDefaultFont('mp1p')
}
let _lib_network_preload = false

function getNetworkGearSymbol(textName){
  textName = textName.toLowerCase()
  switch(textName){
    case 'router':
      return NETWORK_GEAR_ROUTER
    case 'l2switch':
      return NETWORK_GEAR_L2SWITCH
    case 'l3switch':
      return NETWORK_GEAR_L3SWITCH
    case 'firewal':
      return NETWORK_GEAR_FIREWALL
    case 'accesspoint':
      return NETWORK_GEAR_AP
    case 'ap':
      return NETWORK_GEAR_AP
    case 'loadbalancer':
      return NETWORK_GEAR_LOADBALANCER
    case 'pc':
      return NETWORK_GEAR_PC
    case 'server':
      return NETWORK_GEAR_SERVER
    case 'storage':
      return NETWORK_GEAR_STORAGE
    default:
      console.error('getNetworkGearSymbol: undefined symbol ' + textName)
      return NETWORK_GEAR_UNDEFINED
  }
}

/**************
* Get PGraphics of brief packet format.
* Size Large
**************/

class Network_Format{
  static getPG_EthIp(sColor, sWeight, sAlpha, tSize,
                     fcDstEth, txDstEth, textDstEth, tcDstEth,
                     fcSrcEth, txSrcEth, textSrcEth, tcSrcEth,
                     fcDstIp,  txDstIp,  textDstIp,  tcDstIp,
                     fcSrcIp,  txSrcIp,  textSrcIp,  tcSrcIp,
                     fcPayload, tcPayload){

    let widthArray = [100, 100, 100, 100, 200]
    let fcArray = [fcDstEth, fcSrcEth, fcDstIp, fcSrcIp, fcPayload]
    let faArray = [255, 255, 255, 255, 255]
    let txArray = [txDstEth, txSrcEth, txDstIp, txSrcIp, 50]
    let textArray = [textDstEth, textSrcEth, textDstIp, textSrcIp, '']
    let tcArray = [tcDstEth, tcSrcEth, tcDstIp, tcSrcEth, tcPayload]
    let taArray = [255, 255, 255, 255, 255]

    let pg = getPG_horizontalRects(widthArray, 60,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, 50 , textArray,
                                   tSize, tcArray, taArray);
    drawPG_text(pg, 12, 20, "Dst MAC", 18, tcDstEth, 255)
    drawPG_text(pg, 112, 20, "Src MAC", 18, tcSrcEth, 255)
    drawPG_text(pg, 225, 20, "Dst IP", 18, tcDstIp, 255)
    drawPG_text(pg, 325, 20, "Src IP", 18, tcSrcIp, 255)
    drawPG_text(pg, 450, 40, "Payload", 24, tcPayload, 255)


    let pgb = createGraphics(100 * 4 + 200, 96)
    drawPG_line(pgb, 5, 30, 15, 10, BLACK, 2, 255)
    drawPG_line(pgb, 15, 10, 25, 10, BLACK, 2, 255)
    drawPG_text(pgb, 34, 20, "Ethernet (L2)", 20, BLACK, 255)
    drawPG_line(pgb, 175, 10, 185, 10, BLACK, 2, 255)
    drawPG_line(pgb, 185, 10, 195, 30, BLACK, 2, 255)

    drawPG_line(pgb, 205, 30, 215, 10, BLACK, 2, 255)
    drawPG_line(pgb, 215, 10, 260, 10, BLACK, 2, 255)
    drawPG_text(pgb, 267, 20, "IP (L3)", 20, BLACK, 255)
    drawPG_line(pgb, 340, 10, 385, 10, BLACK, 2, 255)
    drawPG_line(pgb, 385, 10, 395, 30, BLACK, 2, 255)

    drawPG_line(pgb, 405, 30, 415, 10, BLACK, 2, 255)
    drawPG_line(pgb, 415, 10, 455, 10, BLACK, 2, 255)
    drawPG_text(pgb, 463, 20, "L4 + L7", 20, BLACK, 255)
    drawPG_line(pgb, 545, 10, 585, 10, BLACK, 2, 255)
    drawPG_line(pgb, 585, 10, 595, 30, BLACK, 2, 255)

    pgb.image(pg, 1, 35)
    return pgb
  }

  static getPG_EthIpWide(sColor, sWeight, sAlpha, tSize,
                         fcDstEth, txDstEth, textDstEth, tcDstEth,
                         fcSrcEth, txSrcEth, textSrcEth, tcSrcEth,
                         fcDstIp,  txDstIp,  textDstIp,  tcDstIp,
                         fcSrcIp,  txSrcIp,  textSrcIp,  tcSrcIp,
                         fcPayload, tcPayload){

    let widthArray = [180, 180, 180, 180, 150]
    let fcArray = [fcDstEth, fcSrcEth, fcDstIp, fcSrcIp, fcPayload]
    let faArray = [255, 255, 255, 255, 255]
    let txArray = [txDstEth, txSrcEth, txDstIp, txSrcIp, 0]
    let textArray = [textDstEth, textSrcEth, textDstIp, textSrcIp, '']
    let tcArray = [tcDstEth, tcSrcEth, tcDstIp, tcSrcEth, tcPayload]
    let taArray = [255, 255, 255, 255, 255]

    let pg = getPG_horizontalRects(widthArray, 60,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, 50 , textArray,
                                   tSize, tcArray, taArray);
    drawPG_text(pg, 55, 20, "Dst MAC", 18, tcDstEth, 255)
    drawPG_text(pg, 235, 20, "Src MAC", 18, tcSrcEth, 255)
    drawPG_text(pg, 425, 20, "Dst IP", 18, tcDstIp, 255)
    drawPG_text(pg, 610, 20, "Src IP", 18, tcSrcIp, 255)
    drawPG_text(pg, 750, 40, "Payload", 24, tcPayload, 255)

    let pgb = createGraphics(180 * 4 + 150, 96)
    drawPG_line(pgb, 5, 30, 15, 10, BLACK, 2, 255)
    drawPG_line(pgb, 15, 10, 100, 10, BLACK, 2, 255)
    drawPG_text(pgb, 115, 20, "Ethernet (L2)", 20, BLACK, 255)
    drawPG_line(pgb, 260, 10, 345, 10, BLACK, 2, 255)
    drawPG_line(pgb, 345, 10, 355, 30, BLACK, 2, 255)

    drawPG_line(pgb, 365, 30, 375, 10, BLACK, 2, 255)
    drawPG_line(pgb, 375, 10, 495, 10, BLACK, 2, 255)
    drawPG_text(pgb, 510, 20, "IP (L3)", 20, BLACK, 255)
    drawPG_line(pgb, 585, 10, 705, 10, BLACK, 2, 255)
    drawPG_line(pgb, 705, 10, 715, 30, BLACK, 2, 255)

    drawPG_line(pgb, 725, 30, 735, 10, BLACK, 2, 255)
    drawPG_line(pgb, 735, 10, 745, 10, BLACK, 2, 255)
    drawPG_text(pgb, 760, 20, "L4 + L7", 20, BLACK, 255)
    drawPG_line(pgb, 845, 10, 855, 10, BLACK, 2, 255)
    drawPG_line(pgb, 855, 10, 865, 30, BLACK, 2, 255)

    pgb.image(pg, 1, 35)
    return pgb
  }

  static getPG_EthArp(sColor, sWeight, sAlpha, tSize,
                         fcDstEth, txDstEth, textDstEth, tcDstEth,
                         fcSrcEth, txSrcEth, textSrcEth, tcSrcEth,
                         fcArp, txArp, textArp, tcArp, isRequest=true){

    let widthArray = [180, 180, 400]
    let fcArray = [fcDstEth, fcSrcEth, fcArp]
    let faArray = [255, 255, 255]
    let txArray = [txDstEth, txSrcEth, txArp]
    let textArray = [textDstEth, textSrcEth, textArp]
    let tcArray = [tcDstEth, tcSrcEth, tcArp]
    let taArray = [255, 255, 255]

    let pg = getPG_horizontalRects(widthArray, 60,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, 50 , textArray,
                                   tSize, tcArray, taArray);
    drawPG_text(pg, 50, 20, "Dst MAC", 18, tcDstEth, 255)
    drawPG_text(pg, 230, 20, "Src MAC", 18, tcSrcEth, 255)
    if(isRequest){
      drawPG_text(pg, 510, 20, "Arp Request", 18, tcArp, 255)
    }else{
      drawPG_text(pg, 520, 20, "Arp Reply", 18, tcArp, 255)
    }

    let pgb = createGraphics(770, 96)
    drawPG_line(pgb, 5, 30, 15, 10, BLACK, 2, 255)
    drawPG_line(pgb, 15, 10, 100, 10, BLACK, 2, 255)
    drawPG_text(pgb, 115, 20, "Ethernet (L2)", 20, BLACK, 255)
    drawPG_line(pgb, 260, 10, 345, 10, BLACK, 2, 255)
    drawPG_line(pgb, 345, 10, 355, 30, BLACK, 2, 255)

    drawPG_line(pgb, 365, 30, 375, 10, BLACK, 2, 255)
    drawPG_line(pgb, 375, 10, 520, 10, BLACK, 2, 255)
    drawPG_text(pgb, 540, 20, "ARP", 20, BLACK, 255)
    drawPG_line(pgb, 600, 10, 745, 10, BLACK, 2, 255)
    drawPG_line(pgb, 745, 10, 755, 30, BLACK, 2, 255)

    pgb.image(pg, 1, 35)
    return pgb
  }
}

class Network_BriefPacket{
  static getPG_Eth(sColor, sWeight, sAlpha,
                     fcEth, tcEth, fcData, tcData,
                     isReverse){
    if(isReverse){
      let widthArray = [_NETWORK_BP_ETH_WIDTH, _NETWORK_BP_DATA_WIDTH]
      let fcArray = [fcEth, fcData]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BP_ETH_X, _NETWORK_BP_DATA_X]
      let textArray = ['Eth', 'Data']
      let tcArray = [tcEth, tcData]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                  sColor, sWeight, sAlpha,
                                  fcArray, faArray,
                                  txArray, _NETWORK_BP_Y , textArray,
                                  _NETWORK_BP_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BP_DATA_WIDTH, _NETWORK_BP_ETH_WIDTH]
      let fcArray = [fcData, fcEth]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BP_DATA_X, _NETWORK_BP_ETH_X]
      let textArray = ['Data', 'Eth']
      let tcArray = [tcData, tcEth]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                  sColor, sWeight, sAlpha,
                                  fcArray, faArray,
                                  txArray, _NETWORK_BP_Y , textArray,
                                  _NETWORK_BP_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_EthArpRequest(sColor, sWeight, sAlpha,
                     fcEth, tcEth, fcArp, tcArp,
                     isReverse){
    if(isReverse){
      let widthArray = [_NETWORK_BP_ETH_WIDTH, _NETWORK_BP_ARP_REQUEST_WIDTH]
      let fcArray = [fcEth, fcArp]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BP_ETH_X, _NETWORK_BP_ARP_REQUEST_X]
      let textArray = ['Eth', 'Arp Request']
      let tcArray = [tcEth, tcArp]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                  sColor, sWeight, sAlpha,
                                  fcArray, faArray,
                                  txArray, _NETWORK_BP_Y , textArray,
                                  _NETWORK_BP_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BP_ARP_REQUEST_WIDTH, _NETWORK_BP_ETH_WIDTH]
      let fcArray = [fcArp, fcEth]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BP_ARP_REQUEST_X, _NETWORK_BP_ETH_X]
      let textArray = ['Arp Request', 'Eth']
      let tcArray = [tcArp, tcEth]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                  sColor, sWeight, sAlpha,
                                  fcArray, faArray,
                                  txArray, _NETWORK_BP_Y , textArray,
                                  _NETWORK_BP_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_EthArpReply(sColor, sWeight, sAlpha,
                     fcEth, tcEth, fcArp, tcArp,
                     isReverse){
    if(isReverse){
      let widthArray = [_NETWORK_BP_ETH_WIDTH, _NETWORK_BP_ARP_REPLY_WIDTH]
      let fcArray = [fcEth, fcArp]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BP_ETH_X, _NETWORK_BP_ARP_REPLY_X]
      let textArray = ['Eth', 'Arp Reply']
      let tcArray = [tcEth, tcArp]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                  sColor, sWeight, sAlpha,
                                  fcArray, faArray,
                                  txArray, _NETWORK_BP_Y , textArray,
                                  _NETWORK_BP_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BP_ARP_REPLY_WIDTH, _NETWORK_BP_ETH_WIDTH]
      let fcArray = [fcArp, fcEth]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BP_ARP_REPLY_X, _NETWORK_BP_ETH_X]
      let textArray = ['Arp Reply', 'Eth']
      let tcArray = [tcArp, tcEth]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                  sColor, sWeight, sAlpha,
                                  fcArray, faArray,
                                  txArray, _NETWORK_BP_Y , textArray,
                                  _NETWORK_BP_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_EthIp(sColor, sWeight, sAlpha,
                     fcEth, tcEth, fcIp, tcIp, fcData, tcData,
                     isReverse){

    if(isReverse){
      let widthArray = [_NETWORK_BP_ETH_WIDTH, _NETWORK_BP_IP_WIDTH,
                        _NETWORK_BP_DATA_WIDTH]
      let fcArray = [fcEth, fcIp, fcData]
      let faArray = [255, 255, 255]
      let txArray = [_NETWORK_BP_ETH_X, _NETWORK_BP_IP_X,
                     _NETWORK_BP_DATA_X]
      let textArray = ['Eth', 'IP', 'Data']
      let tcArray = [tcEth, tcIp, tcData]
      let taArray = [255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BP_Y , textArray,
                                   _NETWORK_BP_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BP_DATA_WIDTH,
                        _NETWORK_BP_IP_WIDTH, _NETWORK_BP_ETH_WIDTH]
      let fcArray = [fcData, fcIp, fcEth]
      let faArray = [255, 255, 255]
      let txArray = [_NETWORK_BP_DATA_X,
                     _NETWORK_BP_IP_X, _NETWORK_BP_ETH_X]
      let textArray = ['Data', 'IP', 'Eth']
      let tcArray = [tcData, tcIp, tcEth]
      let taArray = [255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BP_Y , textArray,
                                   _NETWORK_BP_TEXT_SIZE, tcArray, taArray);
    }
  }



  static getPG_EthIpTcp(sColor, sWeight, sAlpha,
                        fcEth, tcEth, fcIp, tcIp, fcTcp, tcTcp, fcData, tcData,
                        isUDP, isReverse){

    if(isReverse){
      let widthArray = [_NETWORK_BP_ETH_WIDTH, _NETWORK_BP_IP_WIDTH,
                        _NETWORK_BP_TCP_WIDTH, _NETWORK_BP_DATA_WIDTH]
      let fcArray = [fcEth, fcIp, fcTcp, fcData]
      let faArray = [255, 255, 255, 255]
      let txArray = [_NETWORK_BP_ETH_X, _NETWORK_BP_IP_X,
                     _NETWORK_BP_TCP_X, _NETWORK_BP_DATA_X]
      let textArray = ['Eth', 'IP', 'TCP', 'Data']
      if(isUDP){
        textArray[2] = 'UDP';
      }
      let tcArray = [tcEth, tcIp, tcTcp, tcData]
      let taArray = [255, 255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BP_Y , textArray,
                                   _NETWORK_BP_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BP_DATA_WIDTH, _NETWORK_BP_TCP_WIDTH,
                        _NETWORK_BP_IP_WIDTH, _NETWORK_BP_ETH_WIDTH]
      let fcArray = [fcData, fcTcp, fcIp, fcEth]
      let faArray = [255, 255, 255, 255]
      let txArray = [_NETWORK_BP_DATA_X, _NETWORK_BP_TCP_X,
                     _NETWORK_BP_IP_X, _NETWORK_BP_ETH_X]
      let textArray = ['Data', 'TCP', 'IP', 'Eth']
      if(isUDP){
        textArray[1] = 'UDP';
      }
      let tcArray = [tcData, tcTcp, tcIp, tcEth]
      let taArray = [255, 255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BP_Y , textArray,
                                   _NETWORK_BP_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_Ip(sColor, sWeight, sAlpha,
                 fcIp, tcIp, fcData, tcData,
                 isReverse){
    if(isReverse){
      let widthArray = [_NETWORK_BP_IP_WIDTH, _NETWORK_BP_DATA_WIDTH]
      let fcArray = [fcIp, fcData]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BP_IP_X, _NETWORK_BP_DATA_X]
      let textArray = ['IP', 'Data']
      let tcArray = [tcIp, tcData]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BP_Y , textArray,
                                   _NETWORK_BP_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BP_DATA_WIDTH, _NETWORK_BP_IP_WIDTH,]
      let fcArray = [fcData, fcIp]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BP_DATA_X, _NETWORK_BP_IP_X]
      let textArray = ['Data', 'IP']
      let tcArray = [tcData, tcIp]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BP_Y , textArray,
                                   _NETWORK_BP_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_IpTcp(sColor, sWeight, sAlpha,
                     fcIp, tcIp, fcTcp, tcTcp, fcData, tcData,
                     isUDP, isReverse){
    if(isReverse){
      let widthArray = [_NETWORK_BP_IP_WIDTH,
                        _NETWORK_BP_TCP_WIDTH, _NETWORK_BP_DATA_WIDTH]
      let fcArray = [fcIp, fcTcp, fcData]
      let faArray = [255, 255, 255]
      let txArray = [_NETWORK_BP_IP_X,
                     _NETWORK_BP_TCP_X, _NETWORK_BP_DATA_X]
      let textArray = ['IP', 'TCP', 'Data']
      if(isUDP){
        textArray[1] = 'UDP';
      }
      let tcArray = [tcIp, tcTcp, tcData]
      let taArray = [255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BP_Y , textArray,
                                   _NETWORK_BP_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BP_DATA_WIDTH, _NETWORK_BP_TCP_WIDTH,
                        _NETWORK_BP_IP_WIDTH,]
      let fcArray = [fcData, fcTcp, fcIp]
      let faArray = [255, 255, 255]
      let txArray = [_NETWORK_BP_DATA_X, _NETWORK_BP_TCP_X,
                     _NETWORK_BP_IP_X]
      let textArray = ['Data', 'TCP', 'IP']
      if(isUDP){
        textArray[1] = 'UDP';
      }
      let tcArray = [tcData, tcTcp, tcIp]
      let taArray = [255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BP_Y , textArray,
                                   _NETWORK_BP_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_Tcp(sColor, sWeight, sAlpha,
                  fcTcp, tcTcp, fcData, tcData,
                  isUDP, isReverse){

    if(isReverse){
      let widthArray = [_NETWORK_BP_TCP_WIDTH, _NETWORK_BP_DATA_WIDTH]
      let fcArray = [fcTcp, fcData]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BP_TCP_X, _NETWORK_BP_DATA_X]
      let textArray = ['TCP', 'Data']
      if(isUDP){
        textArray[0] = 'UDP';
      }
      let tcArray = [tcTcp, tcData]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BP_Y , textArray,
                                   _NETWORK_BP_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BP_DATA_WIDTH, _NETWORK_BP_TCP_WIDTH]
      let fcArray = [fcData, fcTcp]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BP_DATA_X, _NETWORK_BP_TCP_X]
      let textArray = ['Data', 'TCP']
      if(isUDP){
        textArray[1] = 'UDP';
      }
      let tcArray = [tcData, tcTcp]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BP_Y , textArray,
                                   _NETWORK_BP_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_Data(sColor, sWeight, sAlpha, fcData, tcData){
    let widthArray = [_NETWORK_BP_DATA_WIDTH]
    let fcArray = [fcData]
    let faArray = [255]
    let txArray = [_NETWORK_BP_DATA_X]
    let textArray = ['Data']
    let tcArray = [tcData]
    let taArray = [255]

    return getPG_horizontalRects(widthArray, _NETWORK_BP_HEIGHT,
                                 sColor, sWeight, sAlpha,
                                 fcArray, faArray,
                                 txArray, _NETWORK_BP_Y , textArray,
                                 _NETWORK_BP_TEXT_SIZE, tcArray, taArray);
  }
}

const _NETWORK_BP_ETH_WIDTH = 60
const _NETWORK_BP_ETH_X = 10
const _NETWORK_BP_IP_WIDTH = 50
const _NETWORK_BP_IP_X = 14
const _NETWORK_BP_TCP_WIDTH = 75
const _NETWORK_BP_TCP_X = 15
const _NETWORK_BP_DATA_WIDTH = 100
const _NETWORK_BP_DATA_X = 25
const _NETWORK_BP_ARP_REQUEST_WIDTH = 160
const _NETWORK_BP_ARP_REQUEST_X = 12
const _NETWORK_BP_ARP_REPLY_WIDTH = 130
const _NETWORK_BP_ARP_REPLY_X = 10
const _NETWORK_BP_HEIGHT = 50
const _NETWORK_BP_Y = 34
const _NETWORK_BP_TEXT_SIZE = 22


/**************
* Get PGraphics of brief packet format.
* Size Small
**************/

class Network_BriefPacketSmall{
  static getPG_Eth(sColor, sWeight, sAlpha,
                     fcEth, tcEth, fcData, tcData,
                     isReverse){
    if(isReverse){
      let widthArray = [_NETWORK_BPS_ETH_WIDTH, _NETWORK_BPS_DATA_WIDTH]
      let fcArray = [fcEth, fcData]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BPS_ETH_X, _NETWORK_BPS_DATA_X]
      let textArray = ['Eth', 'Data']
      let tcArray = [tcEth, tcData]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                  sColor, sWeight, sAlpha,
                                  fcArray, faArray,
                                  txArray, _NETWORK_BPS_Y , textArray,
                                  _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BPS_DATA_WIDTH, _NETWORK_BPS_ETH_WIDTH]
      let fcArray = [fcData, fcEth]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BPS_DATA_X, _NETWORK_BPS_ETH_X]
      let textArray = ['Data', 'Eth']
      let tcArray = [tcData, tcEth]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                  sColor, sWeight, sAlpha,
                                  fcArray, faArray,
                                  txArray, _NETWORK_BPS_Y , textArray,
                                  _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_EthIp(sColor, sWeight, sAlpha,
                     fcEth, tcEth, fcIp, tcIp, fcData, tcData,
                     isReverse){

    if(isReverse){
      let widthArray = [_NETWORK_BPS_ETH_WIDTH, _NETWORK_BPS_IP_WIDTH,
                        _NETWORK_BPS_DATA_WIDTH]
      let fcArray = [fcEth, fcIp, fcData]
      let faArray = [255, 255, 255]
      let txArray = [_NETWORK_BPS_ETH_X, _NETWORK_BPS_IP_X,
                     _NETWORK_BPS_DATA_X]
      let textArray = ['Eth', 'IP', 'Data']
      let tcArray = [tcEth, tcIp, tcData]
      let taArray = [255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BPS_Y , textArray,
                                   _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BPS_DATA_WIDTH,
                        _NETWORK_BPS_IP_WIDTH, _NETWORK_BPS_ETH_WIDTH]
      let fcArray = [fcData, fcIp, fcEth]
      let faArray = [255, 255, 255]
      let txArray = [_NETWORK_BPS_DATA_X,
                     _NETWORK_BPS_IP_X, _NETWORK_BPS_ETH_X]
      let textArray = ['Data', 'IP', 'Eth']
      let tcArray = [tcData, tcIp, tcEth]
      let taArray = [255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BPS_Y , textArray,
                                   _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_EthIpTcp(sColor, sWeight, sAlpha,
                        fcEth, tcEth, fcIp, tcIp, fcTcp, tcTcp, fcData, tcData,
                        isUDP, isReverse){

    if(isReverse){
      let widthArray = [_NETWORK_BPS_ETH_WIDTH, _NETWORK_BPS_IP_WIDTH,
                        _NETWORK_BPS_TCP_WIDTH, _NETWORK_BPS_DATA_WIDTH]
      let fcArray = [fcEth, fcIp, fcTcp, fcData]
      let faArray = [255, 255, 255, 255]
      let txArray = [_NETWORK_BPS_ETH_X, _NETWORK_BPS_IP_X,
                     _NETWORK_BPS_TCP_X, _NETWORK_BPS_DATA_X]
      let textArray = ['Eth', 'IP', 'TCP', 'Data']
      if(isUDP){
        textArray[2] = 'UDP';
      }
      let tcArray = [tcEth, tcIp, tcTcp, tcData]
      let taArray = [255, 255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BPS_Y , textArray,
                                   _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BPS_DATA_WIDTH, _NETWORK_BPS_TCP_WIDTH,
                        _NETWORK_BPS_IP_WIDTH, _NETWORK_BPS_ETH_WIDTH]
      let fcArray = [fcData, fcTcp, fcIp, fcEth]
      let faArray = [255, 255, 255, 255]
      let txArray = [_NETWORK_BPS_DATA_X, _NETWORK_BPS_TCP_X,
                     _NETWORK_BPS_IP_X, _NETWORK_BPS_ETH_X]
      let textArray = ['Data', 'TCP', 'IP', 'Eth']
      if(isUDP){
        textArray[1] = 'UDP';
      }
      let tcArray = [tcData, tcTcp, tcIp, tcEth]
      let taArray = [255, 255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BPS_Y , textArray,
                                   _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_Ip(sColor, sWeight, sAlpha,
                 fcIp, tcIp, fcData, tcData,
                 isReverse){
    if(isReverse){
      let widthArray = [_NETWORK_BPS_IP_WIDTH, _NETWORK_BPS_DATA_WIDTH]
      let fcArray = [fcIp, fcData]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BPS_IP_X, _NETWORK_BPS_DATA_X]
      let textArray = ['IP', 'Data']
      let tcArray = [tcIp, tcData]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BPS_Y , textArray,
                                   _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BPS_DATA_WIDTH, _NETWORK_BPS_IP_WIDTH,]
      let fcArray = [fcData, fcIp]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BPS_DATA_X, _NETWORK_BPS_IP_X]
      let textArray = ['Data', 'IP']
      let tcArray = [tcData, tcIp]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BPS_Y , textArray,
                                   _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_IpTcp(sColor, sWeight, sAlpha,
                     fcIp, tcIp, fcTcp, tcTcp, fcData, tcData,
                     isUDP, isReverse){
    if(isReverse){
      let widthArray = [_NETWORK_BPS_IP_WIDTH,
                        _NETWORK_BPS_TCP_WIDTH, _NETWORK_BPS_DATA_WIDTH]
      let fcArray = [fcIp, fcTcp, fcData]
      let faArray = [255, 255, 255]
      let txArray = [_NETWORK_BPS_IP_X,
                     _NETWORK_BPS_TCP_X, _NETWORK_BPS_DATA_X]
      let textArray = ['IP', 'TCP', 'Data']
      if(isUDP){
        textArray[1] = 'UDP';
      }
      let tcArray = [tcIp, tcTcp, tcData]
      let taArray = [255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BPS_Y , textArray,
                                   _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BPS_DATA_WIDTH, _NETWORK_BPS_TCP_WIDTH,
                        _NETWORK_BPS_IP_WIDTH,]
      let fcArray = [fcData, fcTcp, fcIp]
      let faArray = [255, 255, 255]
      let txArray = [_NETWORK_BPS_DATA_X, _NETWORK_BPS_TCP_X,
                     _NETWORK_BPS_IP_X]
      let textArray = ['Data', 'TCP', 'IP']
      if(isUDP){
        textArray[1] = 'UDP';
      }
      let tcArray = [tcData, tcTcp, tcIp]
      let taArray = [255, 255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BPS_Y , textArray,
                                   _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_Tcp(sColor, sWeight, sAlpha,
                  fcTcp, tcTcp, fcData, tcData,
                  isUDP, isReverse){

    if(isReverse){
      let widthArray = [_NETWORK_BPS_TCP_WIDTH, _NETWORK_BPS_DATA_WIDTH]
      let fcArray = [fcTcp, fcData]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BPS_TCP_X, _NETWORK_BPS_DATA_X]
      let textArray = ['TCP', 'Data']
      if(isUDP){
        textArray[0] = 'UDP';
      }
      let tcArray = [tcTcp, tcData]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BPS_Y , textArray,
                                   _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);

    }else{
      let widthArray = [_NETWORK_BPS_DATA_WIDTH, _NETWORK_BPS_TCP_WIDTH]
      let fcArray = [fcData, fcTcp]
      let faArray = [255, 255]
      let txArray = [_NETWORK_BPS_DATA_X, _NETWORK_BPS_TCP_X]
      let textArray = ['Data', 'TCP']
      if(isUDP){
        textArray[1] = 'UDP';
      }
      let tcArray = [tcData, tcTcp]
      let taArray = [255, 255]

      return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                   sColor, sWeight, sAlpha,
                                   fcArray, faArray,
                                   txArray, _NETWORK_BPS_Y , textArray,
                                   _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);
    }
  }

  static getPG_Data(sColor, sWeight, sAlpha, fcData, tcData){
    let widthArray = [_NETWORK_BPS_DATA_WIDTH]
    let fcArray = [fcData]
    let faArray = [255]
    let txArray = [_NETWORK_BPS_DATA_X]
    let textArray = ['Data']
    let tcArray = [tcData]
    let taArray = [255]

    return getPG_horizontalRects(widthArray, _NETWORK_BPS_HEIGHT,
                                 sColor, sWeight, sAlpha,
                                 fcArray, faArray,
                                 txArray, _NETWORK_BPS_Y , textArray,
                                 _NETWORK_BPS_TEXT_SIZE, tcArray, taArray);
  }
}

const _NETWORK_BPS_ETH_WIDTH = 40;
const _NETWORK_BPS_ETH_X = 5;
const _NETWORK_BPS_IP_WIDTH = 30;
const _NETWORK_BPS_IP_X = 7;
const _NETWORK_BPS_TCP_WIDTH = 45;
const _NETWORK_BPS_TCP_X = 5;
const _NETWORK_BPS_DATA_WIDTH = 60;
const _NETWORK_BPS_DATA_X = 10;
const _NETWORK_BPS_HEIGHT = 25;
const _NETWORK_BPS_Y = 19;
const _NETWORK_BPS_TEXT_SIZE = 18;

/**************
* Networking asset icon
**************/

class Network_GearIcon{

  static getPG_l2switch(iconSize, iconColor){
    let pg = createGraphics(iconSize , iconSize)
    if(main_guiDebug){
      pg.background(127)
    }
    setPG_style(pg, TRANSPARENT, 0, 0, iconColor, 255);

    let base = iconSize/15.0;
    let x1 = 0;
    let y1 = 0;
    let x2 = base * 2;
    let y2 = -base * 2;
    let x3 = x2
    let y3 = -base * 1
    let x4 = base * 6.5 // right top of rectangle
    let y4 = y3
    let x5 = x4
    let y5 = -y4
    let x6 = x3
    let y6 = y5
    let x7 = x6
    let y7 = -y2
    let xyArray = [[base * 0.5, base*6], [base * 0.5, base*12]]
    for(let xy of xyArray){
      let [x, y] = xy
      pg.push()
      pg.translate(x, y)
      pg.beginShape()
      pg.vertex(x1, y1)
      pg.vertex(x2, y2)
      pg.vertex(x3, y3)
      pg.vertex(x4, y4)
      pg.vertex(x5, y5)
      pg.vertex(x6, y6)
      pg.vertex(x7, y7)
      pg.endShape(CLOSE)
      pg.pop()
    }

    x1 = 0
    y1 = -base * 1
    x2 = base * 4.5
    y2 = y1
    x3 = x2
    y3 = -base * 2
    x4 = base * 6.5 // arrow top
    y4 = 0
    x5 = x3
    y5 = -y3
    x6 = x2
    y6 = -y2
    x7 = x1
    y7 = y6
    xyArray = [[base*8, base*3], [base*8, base*9]]
    for(let xy of xyArray){
      let [x, y] = xy
      pg.push()
      pg.translate(x, y)
      pg.beginShape()
      pg.vertex(x1, y1)
      pg.vertex(x2, y2)
      pg.vertex(x3, y3)
      pg.vertex(x4, y4)
      pg.vertex(x5, y5)
      pg.vertex(x6, y6)
      pg.vertex(x7, y7)
      pg.endShape(CLOSE)
      pg.pop()
    }

    return pg;
  }

  static getPG_router(iconSize, iconColor){
    let pg = createGraphics(iconSize , iconSize)
    if(main_guiDebug){
      pg.background(127)
    }
    setPG_style(pg, TRANSPARENT, 0, 0, iconColor, 255);
    pg.push();
    pg.translate(iconSize/2, iconSize/2);

    let base = iconSize/15.0;

    // Draw outside way arrow
    let x1 = base * 2
    let y1 = -base * 1
    let x2 = base * 7
    let y2 = y1
    let x3 = x2
    let y3 = -base * 2
    let x4 = base * 9 // arrow top
    let y4 = 0
    let x5 = x3
    let y5 = -y3
    let x6 = x2
    let y6 = -y2
    let x7 = x1
    let y7 = y6

    let angleArray1 = [135, 180];
    for(let angle of angleArray1){
      pg.rotate(radians(angle));
      pg.beginShape()
      pg.vertex(x1, y1)
      pg.vertex(x2, y2)
      pg.vertex(x3, y3)
      pg.vertex(x4, y4)
      pg.vertex(x5, y5)
      pg.vertex(x6, y6)
      pg.vertex(x7, y7)
      pg.endShape(CLOSE)
    }

    // Draw inside way arrow
    x1 = base * 2;
    y1 = 0;
    x2 = base * 4;
    y2 = -base * 2;
    x3 = x2
    y3 = -base * 1
    x4 = base * 9 // right top of rectangle
    y4 = y3
    x5 = x4
    y5 = -y4
    x6 = x3
    y6 = y5
    x7 = x6
    y7 = -y2
    let angleArray2 = [90, 180];
    for(let angle of angleArray2){
      pg.rotate(radians(angle));
      pg.beginShape()
      pg.vertex(x1, y1)
      pg.vertex(x2, y2)
      pg.vertex(x3, y3)
      pg.vertex(x4, y4)
      pg.vertex(x5, y5)
      pg.vertex(x6, y6)
      pg.vertex(x7, y7)
      pg.endShape(CLOSE)
    }

    pg.pop();
    return pg;
  }

  static getPG_l3switch(iconSize, iconColor){
    let pg = createGraphics(iconSize , iconSize)
    if(main_guiDebug){
      pg.background(127)
    }
    setPG_style(pg, TRANSPARENT, 0, 0, iconColor, 255);
    pg.push();
    pg.translate(iconSize/2, iconSize/2);

    let base = iconSize/15.0;
    pg.ellipse(0, 0, base * 4.5, base * 4.5);

    // Draw outside way arrow
    let x1 = base * 3.5
    let y1 = -base * 1
    let x2 = base * 7
    let y2 = y1
    let x3 = x2
    let y3 = -base * 2
    let x4 = base * 9 // arrow top
    let y4 = 0
    let x5 = x3
    let y5 = -y3
    let x6 = x2
    let y6 = -y2
    let x7 = x1
    let y7 = y6

    let angleArray = [45, 90, 90, 90];
    for(let angle of angleArray){
      pg.rotate(radians(angle));
      pg.beginShape()
      pg.vertex(x1, y1)
      pg.vertex(x2, y2)
      pg.vertex(x3, y3)
      pg.vertex(x4, y4)
      pg.vertex(x5, y5)
      pg.vertex(x6, y6)
      pg.vertex(x7, y7)
      pg.endShape(CLOSE)
    }

    pg.pop();
    return pg;
  }

  static getPG_pc(iconSize, iconColor){
    let pg = createGraphics(iconSize , iconSize)
    if(main_guiDebug){
      pg.background(127)
    }
    let base = iconSize/15.0;

    // draw monitor and frame
    let r = int(iconSize / 20)
    if(r > 10){
      r = 10 // MAX
    }
    setPG_style(pg, iconColor, base, 255, TRANSPARENT, 0);
    pg.rect(base, base * 1.5, base * 13, base * 10, r);

    // draw other frames
    setPG_style(pg, TRANSPARENT, 0, 0, iconColor, 255)
    pg.rect(base, base * 9.5, base * 13, base * 2);
    pg.rect(base * 5, base * 10.5 + 1, base * 5, base * 3);
    pg.rect(base * 3, base * 13.5, base * 9, base * 1);

    return pg
  }

  static getPG_firewall(iconSize, iconColor){
    let pg = createGraphics(iconSize , iconSize)
    if(main_guiDebug){
      pg.background(127)
    }
    setPG_style(pg, TRANSPARENT, 0, 0, iconColor, 255)

    let base = iconSize/15.0;

    // width
    let w1 = 3.85 * base   // big block
    let w2 = 3.35 * base // midium blocl
    let w3 = 2 * base // small block
    let sw = 0.75 * base   // space

    // height
    let h = 2.7 * base // block
    let sh = 0.75 * base   // space

    let y1 = 1 * base
    let y2 = y1 + (h + sh)
    let y3 = y2 + (h + sh)
    let y4 = y3 + (h + sh)

    // raw 1 and 3. all big blocks
    let x1 = 1 * base
    let x2 = x1 + (w1 + sw)
    let x3 = x2 + (w1 + sw)
    for(let y of [y1, y3]){
      pg.rect(x1, y, w1, h)
      pg.rect(x2, y, w1, h)
      pg.rect(x3, y, w1, h)
    }

    // raw 2 and 4. mix of small and big block
    x2 = x1 + (w3 + sw)
    x3 = x2 + (w2 + sw)
    let x4 = x3 + (w2 + sw)
    for(let y of [y2, y4]){
      pg.rect(x1, y, w3, h)
      pg.rect(x2, y, w2, h)
      pg.rect(x3, y, w2, h)
      pg.rect(x4, y, w3, h)
    }

    return pg
  }

  static getPG_accesspoint(iconSize, iconColor){
    let pg = createGraphics(iconSize , iconSize)
    if(main_guiDebug){
      pg.background(127)
    }
    let base = iconSize/15.0;

    pg.push()
    // make bottom center (0, 0) and rotate 180 degree
    pg.translate(iconSize/2, iconSize)
    pg.rotate(radians(180))

    // draw circle
    setPG_style(pg, TRANSPARENT, 0, 0, iconColor, 255);
    pg.ellipse(0, base * 3.5, base * 3, base * 3)

    // draw arcs
    setPG_style(pg, iconColor, base * 1.2, 255, TRANSPARENT, 0);
    pg.bezier(-base * 2, base * 6,   -base,     base * 7.5,
               base    , base * 7.5,  base * 2, base * 6);
    pg.bezier(-base * 4, base * 7.5, -base * 2, base * 10.5,
               base * 2, base * 10.5, base * 4, base * 7.5);
    pg.bezier(-base * 6, base * 9,   -base * 3, base * 13.5,
               base * 3, base * 13.5, base * 6, base * 9);

    return pg
  }

  static getPG_loadbalancer(iconSize, iconColor){
    let pg = createGraphics(iconSize , iconSize)
    if(main_guiDebug){
      pg.background(127)
    }
    setPG_style(pg, TRANSPARENT, 0, 0, iconColor, 255);
    pg.push();
    pg.translate(iconSize/2, iconSize/2);

    let base = iconSize/15.0;
    pg.ellipse(0, 0, base * 3, base * 3);

    // Left side
    let x1 = base * -6.5
    let y1 = -base * 0.75
    let x2 = base * -4
    let y2 = y1
    let x3 = x2
    let y3 = -base * 2
    let x4 = base * -2 // arrow top
    let y4 = 0
    let x5 = x3
    let y5 = -y3
    let x6 = x2
    let y6 = -y2
    let x7 = x1
    let y7 = y6
    pg.beginShape()
    pg.vertex(x1, y1)
    pg.vertex(x2, y2)
    pg.vertex(x3, y3)
    pg.vertex(x4, y4)
    pg.vertex(x5, y5)
    pg.vertex(x6, y6)
    pg.vertex(x7, y7)
    pg.endShape(CLOSE)

    // right side angle 0
    x1 = base * 2.5
    y1 = -base * 0.75
    x2 = base * 4.5
    y2 = y1
    x3 = x2
    y3 = -base * 2
    x4 = base * 6.5
    y4 = 0
    x5 = x3
    y5 = -y3
    x6 = x2
    y6 = -y2
    x7 = x1
    y7 = y6
    pg.beginShape()
    pg.vertex(x1, y1)
    pg.vertex(x2, y2)
    pg.vertex(x3, y3)
    pg.vertex(x4, y4)
    pg.vertex(x5, y5)
    pg.vertex(x6, y6)
    pg.vertex(x7, y7)
    pg.endShape(CLOSE)

    // right side angle 60 and 300. little bit longer
    x1 = base * 2.5
    y1 = -base * 0.75
    x2 = base * 5.5
    y2 = y1
    x3 = x2
    y3 = -base * 2
    x4 = base * 7.5
    y4 = 0
    x5 = x3
    y5 = -y3
    x6 = x2
    y6 = -y2
    x7 = x1
    y7 = y6
    let angleArray = [50, -100];
    for(let angle of angleArray){
      pg.rotate(radians(angle));
      pg.beginShape()
      pg.vertex(x1, y1)
      pg.vertex(x2, y2)
      pg.vertex(x3, y3)
      pg.vertex(x4, y4)
      pg.vertex(x5, y5)
      pg.vertex(x6, y6)
      pg.vertex(x7, y7)
      pg.endShape(CLOSE)
    }

    return pg
  }

  static getPG_storage(iconSize, iconColor){
    let pg = createGraphics(iconSize , iconSize)
    if(main_guiDebug){
      pg.background(127)
    }
    setPG_style(pg, TRANSPARENT, 0, 0, iconColor, 255);

    let base = iconSize/15.0;

    pg.push()
    pg.translate(iconSize/2, 0)
    pg.ellipse(0, base * 3, base * 12, base * 4)

    let yArray = [4.5, 7.5, 10.5]
    for(let y of yArray){
      pg.beginShape()
      pg.vertex(-base * 6, base * y)
      pg.bezierVertex(-base * 3, base * (y + 2), base * 3, base * (y + 2),
                      base * 6, base * y)
      pg.vertex(base * 6, base * (y + 2))
      pg.bezierVertex(base * 3, base * (y + 4), base * -3, base * (y + 4),
                      base * -6, base * (y + 2))
      pg.endShape(CLOSE)
    }

    pg.pop()
    return pg
  }

  static getPG_server(iconSize, iconColor){
    let pg = createGraphics(iconSize , iconSize)
    if(main_guiDebug){
      pg.background(127)
    }
    let base = iconSize/15.0;
    let outsideR = int(iconSize / 20)
    if(outsideR > 10){
      outsideR = 10 // MAX
    }

    let sw = 1.5
    let w = 12
    let h = 3
    let yArray = [1.5, 6, 10.5]
    for(let y of yArray){
      pg.push()
      pg.translate(base * sw, base * y)

      // outside
      setPG_style(pg, iconColor, base * 0.5, 255, TRANSPARENT, 0);
      pg.rect(0, 0, base * w, base * h, outsideR);

      // inside
      setPG_style(pg, TRANSPARENT, 0, 0, iconColor, 255)
      pg.beginShape()
      pg.vertex(0, 0)
      pg.vertex(base * w, 0)
      pg.vertex(base * w, base * h)
      pg.vertex(0, base * h)

      // crop
      let cw = 0.75
      let ch = 2
      let cropXArray = [1.5, 3, 4.5, 6, 7.5]
      for(let cropX of cropXArray){
        pg.beginContour()
        pg.vertex(base * cropX,        base * 0.5)
        pg.vertex(base * cropX,        base * (0.5 + ch))
        pg.vertex(base * (cropX + cw), base * (0.5 + ch))
        pg.vertex(base * (cropX + cw), base * 0.5)
        pg.endContour()
      }

      cw = 1
      ch = 0.5
      cropXArray = [9, 10.5]
      for(let cropX of cropXArray){
        pg.beginContour()
        pg.vertex(base * cropX,        base * 1.75)
        pg.vertex(base * cropX,        base * (1.75 + ch))
        pg.vertex(base * (cropX + cw), base * (1.75 + ch))
        pg.vertex(base * (cropX + cw), base * 1.75)
        pg.endContour()
      }

      pg.endShape(CLOSE)
      pg.pop()
    }

    return pg

  }
}

/**************
* Networking asset
*
**************/

class Network_Gear{
  constructor(width_, height_, r,
              sColor, sWeight, sAlpha, fColor, fAlpha,
              portSize, portSColor, portSWeight, portSAlpha){

    this.width = width_
    this.height = height_
    this.r = r
    this.sColor = sColor
    this.sWeight = sWeight
    this.sAlpha = sAlpha
    this.fColor = fColor
    this.fAlpha = fAlpha
    this.portSize = portSize
    this.portSColor = portSColor
    this.portSWeight = portSWeight
    this.portSAlpha = portSAlpha

    this.leftPortsColorArray = []
    this.bottomPortsColorArray = []
    this.rightPortsColorArray = []
    this.topPortsColorArray = []

    this.isDrawText = false
    this.tX = 0
    this.tY = 0
    this.tString = ''
    this.tSize = 0
    this.tColor = TRANSPARENT
    this.tAlpha = 0
    this.isTextVertical = false

    this.isDrawIcon = false
    this.iconPGraphics = null
    this.iconType = 0
    this.iconSize = 0
    this.iconColor = 0
    this.iconX = 0
    this.iconY = 0

    this.PADDING_X = 5
    this.PADDING_Y = 5

    let w = this.PADDING_X * 2 + portSize + width_  // Left + Right = (portSize/2) * 2
    let h = this.PADDING_Y * 2 + portSize + height_
    this.pg = createGraphics(w, h)
  }

  getBodyXY(){
    let x = this.PADDING_X + this.portSize/2
    let y = this.PADDING_Y + this.portSize/2
    return [x, y]
  }

  getBodyWidthHeight(){
    return [this.width, this.height]
  }

  removeIcon(){
    this.isDrawIcon = false
  }

  setIcon(iconType, iconX, iconY, iconSize, iconColor){
    this.isDrawIcon = true
    this.iconX = iconX
    this.iconY = iconY

    let exactSame = (this.iconType == iconType && this.iconSize == iconSize &&
                     this.iconColor == iconColor)
    if(!exactSame){
      // need to update icon. create new icon pgraphics.
      // It will create new canvas on the browser. Please avoid updating icon image many times.
      this.iconType = iconType
      this.iconSize = iconSize
      this.iconColor = iconColor

      switch(iconType){
        case NETWORK_GEAR_ROUTER:
          this.iconPGraphics = Network_GearIcon.getPG_router(iconSize, iconColor)
          break
        case NETWORK_GEAR_L2SWITCH:
          this.iconPGraphics = Network_GearIcon.getPG_l2switch(iconSize, iconColor)
          break
        case NETWORK_GEAR_L3SWITCH:
          this.iconPGraphics = Network_GearIcon.getPG_l3switch(iconSize, iconColor)
          break
        case NETWORK_GEAR_FIREWALL:
          this.iconPGraphics = Network_GearIcon.getPG_firewall(iconSize, iconColor)
          break
        case NETWORK_GEAR_AP:
          this.iconPGraphics = Network_GearIcon.getPG_accesspoint(iconSize, iconColor)
          break
        case NETWORK_GEAR_LOADBALANCER:
          this.iconPGraphics = Network_GearIcon.getPG_loadbalancer(iconSize, iconColor)
          break
        case NETWORK_GEAR_PC:
          this.iconPGraphics = Network_GearIcon.getPG_pc(iconSize, iconColor)
          break
        case NETWORK_GEAR_SERVER:
          this.iconPGraphics = Network_GearIcon.getPG_server(iconSize, iconColor)
          break
        case NETWORK_GEAR_STORAGE:
          this.iconPGraphics = Network_GearIcon.getPG_storage(iconSize, iconColor)
          break
        default:
          console.error("ERROR")
          this.isDrawIcon = false
      }
    }else{
      // use last image to reserve resource
    }
  }

  setText(tX, tY, tString, tSize, tColor, tAlpha, isTextVertical){
    this.isDrawText = true
    this.tX = tX
    this.tY = tY
    this.tString = tString
    this.tSize = tSize
    this.tColor = tColor
    this.tAlpha = tAlpha
    this.isTextVertical = isTextVertical
  }

  removeText(){
    this.isDrawText = false
  }



  setPortsColor(leftPortsColorArray, bottomPortsColorArray,
                rightPortsColorArray, topPortsColorArray){

    this.leftPortsColorArray = leftPortsColorArray
    this.bottomPortsColorArray = bottomPortsColorArray
    this.rightPortsColorArray = rightPortsColorArray
    this.topPortsColorArray = topPortsColorArray
  }

  setPortColor(position, n, color){
    if(n <= 0){
        console.error('Port count start from 1')
    }

    switch(position){
      case LEFT:
        if(n <= this.leftPortsColorArray.length){
          this.leftPortsColorArray[n-1] = color
        }
        break
      case BOTTOM:
        if(n <= this.bottomPortsColorArray.length){
          this.bottomPortsColorArray[n-1] = color
        }
        break
      case RIGHT:
        if(n <= this.rightPortsColorArray.length){
          this.rightPortsColorArray[n-1] = color
        }
        break
      case TOP:
        if(n <= this.topPortsColorArray.length){
          this.topPortsColorArray[n-1] = color
        }
        break
      default:
        console.error('ERROR')
    }
  }

  getPortCount(position){
    switch(position){
      case LEFT:
        return this.leftPortsColorArray.length
      case BOTTOM:
        return this.bottomPortsColorArray.length
      case RIGHT:
        return this.rightPortsColorArray.length
      case TOP:
        return this.topPortsColorArray.length
      default:
        console.error('ERROR')
        return 0
    }
  }

  getPortXY(position, n){
    // Return center of port rectangle coordinate.
    // Not left top coordinate.
    let length = 0
    let distance = 0
    let x = 0
    let y = 0
    switch(position){
      case LEFT:
        // distance between ports
        // (bodyHeight - sumOfPortSize) / numOfPorts
        length = this.leftPortsColorArray.length
        distance = (this.height - (this.portSize * length))/(length + 1)
        // center of port
        x = this.PADDING_X + this.portSize/2
        // padding + half of port size (top) + sum of distance + sum of previous portsize + center
        // -> padding + size/2 + distance * n + size * (n-1) + size/2
        // -> padding + distance * n + size * n
        y = this.PADDING_Y + (distance + this.portSize) * n
        return [x, y]

      case BOTTOM:
        length = this.bottomPortsColorArray.length
        distance = (this.width - (this.portSize * length))/(length + 1)
        x = this.PADDING_X + (distance + this.portSize) * n
        y = this.PADDING_Y + this.portSize/2 + this.height
        return [x, y]

      case RIGHT:
        length = this.rightPortsColorArray.length
        distance = (this.height - (this.portSize * length))/(length + 1)
        x = this.PADDING_X + this.portSize/2 + this.width
        y = this.PADDING_Y + (distance + this.portSize) * n
        return [x, y]

      case TOP:
        length = this.topPortsColorArray.length
        distance = (this.width - (this.portSize * length))/(length + 1)
        x = this.PADDING_X + (distance + this.portSize) * n
        y = this.PADDING_Y + this.portSize/2
        return [x, y]

      default:
        console.error('ERROR')
        return [x, y]
    }
  }

  getPG(){
    // make Pgraphics transparent first
    let pg = this.pg
    pg.clear()
    if(main_guiDebug){
      pg.background(127)
    }

    // draw body
    setPG_style(pg, this.sColor, this.sWeight, this.sAlpha, this.fColor, this.fAlpha)
    let bodyX = this.PADDING_X + this.portSize/2
    let bodyY = this.PADDING_Y + this.portSize/2
    pg.rectMode(CORNER)
    pg.rect(bodyX, bodyY, this.width, this.height, this.r)

    setPG_stroke(pg, this.portSColor, this.portSWeight, this.portSAlpha)
    pg.rectMode(CENTER)

    // left ports
    for(let i=0; i<this.leftPortsColorArray.length; i++){
      let fColor = this.leftPortsColorArray[i]
      let [x, y] = this.getPortXY(LEFT, i+1)
      setPG_fill(pg, fColor, 255)
      pg.rect(x, y, this.portSize, this.portSize)
    }

    // bottom ports
    for(let i=0; i<this.bottomPortsColorArray.length; i++){
      let fColor = this.bottomPortsColorArray[i]
      let [x, y] = this.getPortXY(BOTTOM, i+1)
      setPG_fill(pg, fColor, 255)
      pg.rect(x, y, this.portSize, this.portSize)
    }

    // right ports
    for(let i=0; i<this.rightPortsColorArray.length; i++){
      let fColor = this.rightPortsColorArray[i]
      let [x, y] = this.getPortXY(RIGHT, i+1)
      setPG_fill(pg, fColor, 255)
      pg.rect(x, y, this.portSize, this.portSize)
    }

    // top ports
    for(let i=0; i<this.topPortsColorArray.length; i++){
      let fColor = this.topPortsColorArray[i]
      let [x, y] = this.getPortXY(TOP, i+1)
      setPG_fill(pg, fColor, 255)
      pg.rect(x, y, this.portSize, this.portSize)
    }

    // draw Icon
    if(this.isDrawIcon){
      let [x, y] = this.getBodyXY()
      x += this.iconX
      y += this.iconY
      pg.image(this.iconPGraphics, x, y)
    }

    // draw Text
    if(this.isDrawText){
      setPG_style(pg, TRANSPARENT, 0, 0, this.tColor, 255)
      let [x, y] = this.getBodyXY()
      x += this.tX
      y += this.tY

      if(!this.isTextVertical){
        drawPG_text(pg, x, y, this.tString, this.tSize, this.tColor, 255)
      }else{
        pg.push()
        pg.translate(x, y)
        pg.rotate(radians(90))
        drawPG_text(pg, 0, 0, this.tString, this.tSize, this.tColor, 255)
        pg.pop()
      }
    }

    return pg
  }
}


/*
* TopologyManager
*/

class Network_TopologyManager{

  constructor(width_, height_){
    this.width = width_
    this.height = height_
    this.clear()
  }

  clear(){
    // image Pgraphics before drawing topology
    this.pgUnderItemArray = new Array()
    // image Pgraphics after drawing topology
    this.pgOverItemArray = new Array()

    this.gearMap = new Map()
    this.gearTextMap = new Map()

    this.cableMap = new Map()
    this.topologyTextMap = new Map()

    this.hasUpdateAfterLastDraw = false
  }

  hasUpdate(){
    return this.hasUpdateAfterLastDraw
  }

  addPgUnder(name, pg, x, y){
    name = name.toLowerCase()
    this.pgUnderItemArray.push([name, pg, x, y])

    this.hasUpdateAfterLastDraw = true
  }

  removePgUnder(name){
    name = name.toLowerCase()

    this.hasUpdateAfterLastDraw = true
  }

  addPgOver(name, pg, x, y){
    name = name.toLowerCase()
    this.pgOverItemArray.push([name, pg, x, y])

    this.hasUpdateAfterLastDraw = true
  }

  removePgOver(name){
    name = name.toLowerCase()

    this.hasUpdateAfterLastDraw = true
  }

  addGear(name, gear, x, y){
    name = name.toLowerCase()
    let [bodyX, bodyY] = gear.getBodyXY()
    x = x - bodyX
    y = y - bodyY
    this.gearMap.set(name, [gear, x, y])

    this.hasUpdateAfterLastDraw = true
  }

  removeGear(name){
    name = name.toLowerCase()
    if(!this.gearMap.has(name)){
      return
    }
    this.gearMap.delete(name)

    this.hasUpdateAfterLastDraw = true
  }

  getGearCenterXY(name){
    name = name.toLowerCase()
    if(!this.gearMap.has(name)){
      return [-1, -1]
    }

    let [gear, x, y] = this.gearMap.get(name)
    let [bodyX, bodyY] = gear.getBodyXY()
    let [bodyWidth, bodyHeight] = gear.getBodyWidthHeight()
    x = x + bodyX + bodyWidth/2
    y = y + bodyY + bodyHeight/2
    return [x, y]
  }

  addGearText(gearName, textTag, x, y, tString, tSize, tColor, tAlpha){
    gearName = gearName.toLowerCase()
    textTag = textTag.toLowerCase()

    if(!this.gearMap.has(gearName)){
      return
    }
    if(!this.gearTextMap.has(gearName)){
      this.gearTextMap.set(gearName, new Map())
    }
    let textMap = this.gearTextMap.get(gearName)
    textMap.set(textTag, [x, y, tString, tSize, tColor, tAlpha])

    this.hasUpdateAfterLastDraw = true
  }

  removeGearText(gearName, textTag){
    gearName = gearName.toLowerCase()
    textTag = textTag.toLowerCase()
    if(!this.gearTextMap.has(gearName)){
      return
    }
    let textMap = this.gearTextMap.get(gearName)
    if(!textMap.has(textTag)){
      return
    }
    textMap.delete(textTag)

    this.hasUpdateAfterLastDraw = true
  }

  addTopologyText(textTag, x, y, tString, tSize, tColor, tAlpha){
    textTag = textTag.toLowerCase()
    this.topologyTextMap.set(textTag, [x, y, tString, tSize, tColor, tAlpha])
  }

  connectGears(name1, position1, n1, name2, position2, n2, sColor, sWeight, sAlpha){
    name1 = name1.toLowerCase()
    name2 = name2.toLowerCase()

    if(!this.gearMap.has(name1)){
      return
    }
    if(!this.gearMap.has(name2)){
      return
    }

    let [gear1, x1, y1] = this.gearMap.get(name1)
    let [px1, py1] = gear1.getPortXY(position1, n1)
    if(px1 == -1 || py1 == -1){
      return
    }
    x1 = x1 + px1
    y1 = y1 + py1

    let [gear2, x2, y2] = this.gearMap.get(name2)
    let [px2, py2] = gear2.getPortXY(position2, n2)
    if(px2 == -1 || py2 == -1){
      return
    }
    x2 = x2 + px2
    y2 = y2 + py2

    let connectionName = name1 + position1 + n1 + name2 + position2 + n2
    let cableInfo = [name1, position1, n1, x1, y1,
                     name2, position2, n2, x2, y2,
                     sColor, sWeight, sAlpha]
    this.cableMap.set(connectionName, cableInfo)

    this.hasUpdateAfterLastDraw = true
  }

  disconnectGears(name1, position1, n1, name2, position2, n2){
    name1 = name1.toLowerCase()
    name2 = name2.toLowerCase()
    connectionName = name1 + position1 + n1 + name2 + position2 + n2

    //if()

    this.hasUpdateAfterLastDraw = true
  }

  drawPG(pg){

    // draw underground images
    for(let [name, itemPg, x, y] of this.pgUnderItemArray){
      pg.image(itemPg, x, y)
    }

    // draw cables
    for(let [connectionName, cableInfo] of this.cableMap){
      let [name1, position1, n1, x1, y1,
           name2, position2, n2, x2, y2,
           sColor, sWeight, sAlpha] = cableInfo
      drawPG_line(pg, x1, y1, x2, y2, sColor, sWeight, sAlpha)
    }

    // draw assets
    for(let [name, [gear, x, y]] of this.gearMap){
      let gearPg = gear.getPG()
      pg.image(gearPg, x, y)
    }

    // draw overground images
    for(let [name, itemPg, x, y] of this.pgOverItemArray){
      pg.image(itemPg, x, y)
    }

    // draw asset texts
    for(let [gearName, textMap] of this.gearTextMap){
      if(!this.gearMap.has(gearName)){
        continue
      }
      let [gear, gx, gy] = this.gearMap.get(gearName)
      let [bodyX, bodyY] = gear.getBodyXY()
      gx = gx + bodyX
      gy = gy + bodyY
      for(let [textTag, [x, y, tString, tSize, tColor, tAlpha]] of textMap){
        x = gx + x
        y = gy + y
        drawPG_text(pg, x, y, tString, tSize, tColor, tAlpha)
      }
    }

    // draw topology texts
    for(let [textTag, [x, y, tString, tSize, tColor, tAlpha]] of this.topologyTextMap){
      drawPG_text(pg, x, y, tString, tSize, tColor, tAlpha)
    }

    this.hasUpdateAfterLastDraw = false
  }
}

/////////
/// JSON To Topology
////////

function network_validateTopologyJson(jsonUrl){
  $.ajax({
    dataType:'json',
    url:jsonUrl,
    success: function(data){
      console.log('=== START CHECKING TOPOLOGY JSON ===')

      // check global
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

function network_loadTopologyJson_fromUrl(jsonUrl, topology){
  $.ajax({
    dataType:'json',
    url:jsonUrl,
    success: function(data){
      network_loadTopologyJson(data, topology)
    },
    error: function(xMLHttpRequest, textStatus, errorThrown){
      console.error('Json load failed')
      console.error("XMLHttpRequest : " + xMLHttpRequest.status);
      console.error("textStatus     : " + textStatus);
      console.error("errorThrown    : " + errorThrown.message);
    }
  })
}

function network_loadTopologyJson(jsonData, topology){
  // remove all previous objects
  topology.clear()

  for(let underObject of jsonData['underObjects']){
    let [pg, x, y] = _network_loadTopologyJson_object(underObject)
    if(pg != null){
      topology.addPgUnder('', pg, x, y)
    }
  }

  // add gear
  for(let gearName in jsonData['gears']){
    let gearMap = jsonData['gears'][gearName]
    let [gearObject, x, y, texts] = _network_loadTopologyJson_gear(gearMap)
    topology.addGear(gearName, gearObject, x, y)

    for(let text_ of texts){
      let [x, y, tString, tSize, tColor, tAlpha] = text_
      topology.addGearText(gearName, '', x, y, tString, tSize, tColor, tAlpha)
    }
  }

  // draw lines
  for(let line of jsonData['lines']){
    let [gear1, pos1, num1, gear2, pos2, num2,
        sColor, sWeight] = _network_loadTopologyJson_line(line)
    topology.connectGears(gear1, pos1, num1, gear2, pos2, num2,
                          sColor, sWeight, 255)
  }

  // draw over
  for(let overObject of jsonData['overObjects']){
    let [pg, x, y] = _network_loadTopologyJson_object(overObject)
    if(pg != null){
      topology.addPgOver('', pg, x, y)
    }
  }

  for(let textObject of jsonData['texts']){
    let [x, y, tString, tSize, tColor, tAlpha] =
        _network_loadTopologyJson_text(textObject)
    topology.addTopologyText('', x, y, tString, tSize, tColor, tAlpha)
  }
}

function _network_loadTopologyJson_object(ob){
  let shape = ob['shape']
  let x = ob['x']
  let y = ob['y']
  let w = ob['width']
  let h = ob['height']
  let sColor = getColorSymbol(ob['sColor'])
  let sWeight = ob['sWeight']
  let sAlpha = ob['sAlpha']
  let fColor = getColorSymbol(ob['fColor'])
  let fAlpha = ob['fAlpha']

  switch(shape){
    case 'rect':
      let pg = getPG_rect(w, h, 10, sColor, sWeight, sAlpha, fColor, fAlpha)
      return [pg, x, y]

    default:
      return [null, 0, 0]
  }
}

function _network_loadTopologyJson_gear(gear){
  let size = gear['size']
  let color = getColorSymbol(gear['color'])

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
  let left = getColorArray(gear['left-nics'])
  let bottom = getColorArray(gear['bottom-nics'])
  let right = getColorArray(gear['right-nics'])
  let top = getColorArray(gear['top-nics'])
  gearObject.setPortsColor(left, bottom, right, top)

  let icon = getNetworkGearSymbol(gear['icon'])
  gearObject.setIcon(icon, 10, 10, size - 20, WHITE)

  let texts = new Array()
  for(let text_ of gear['texts']){
    let x = text_['x']
    let y = text_['y']
    let tString = text_['text']
    let tSize = text_['size']
    let tColor = getColorSymbol(text_['color'])
    let tAlpha = text_['alpha']
    texts.push([x, y, tString, tSize, tColor, tAlpha])
  }

  let x = gear['x']
  let y = gear['y']
  return [gearObject, x, y, texts]
}

function _network_loadTopologyJson_line(line){
  let gear1 = line['gear1']
  let pos1 = line['pos1']
  let num1 = line['num1']
  let gear2 = line['gear2']
  let pos2 = line['pos2']
  let num2 = line['num2']
  let sColor = getColorSymbol(line['color'])
  let sWeight = line['weight']
  return [gear1, pos1, num1, gear2, pos2, num2, sColor, sWeight]
}

function _network_loadTopologyJson_text(text_){
  let x = text_['x']
  let y = text_['y']
  let tString = text_['text']
  let tSize = text_['size']
  let tColor = getColorSymbol(text_['color'])
  let tAlpha = text_['alpha']
  return [x, y, tString, tSize, tColor, tAlpha]
}
