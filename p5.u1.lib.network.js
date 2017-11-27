/*
* Utility module for drawing network object.
*
* Classes
*  - Network_BreifPacket : draw brief packet
*  - Network_BreifPacketSmall : draw small brief packet
*
*
*
* 2017/11/26
* @author Yuichi Ito yuichi@yuichi.com
*/


/**************
* Get PGraphics of brief packet format.
* Size Large
**************/

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

const _NETWORK_BP_ETH_WIDTH = 50
const _NETWORK_BP_ETH_X = 7
const _NETWORK_BP_IP_WIDTH = 50
const _NETWORK_BP_IP_X = 15
const _NETWORK_BP_TCP_WIDTH = 75
const _NETWORK_BP_TCP_X = 15
const _NETWORK_BP_DATA_WIDTH = 100
const _NETWORK_BP_DATA_X = 25
const _NETWORK_BP_HEIGHT = 50
const _NETWORK_BP_Y = 34
const _NETWORK_BP_TEXT_SIZE = 24


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

class Nework_Asset{

}
