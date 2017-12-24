class YellowDevil{
  constructor(){
    let size = 90
    this.yrect = getPG_rect(size, size, 10, TRANSPARENT, 0, 0, SUNFLOWER, 255)
    this.brect = getPG_rect(size, size, 10, TRANSPARENT, 0, 0, PETERRIVER, 255)
    this.rrect = getPG_ellipse(size, size, MIDNIGHTBLUE, 15, 255, ALIZARIN, 255)
    let left_xArray = [5 + size/2, 105 + size/2, 205 + size/2]
    let right_xArray = [805 + size/2, 905 + size/2, 1005 + size/2]
    let yArray = [205 + size/2, 305 + size/2, 405 + size/2]

    this.mx = 505 + size/2
    this.my01 = 305 + size/2
    this.my02 = 405 + size/2

    this.lx01 = left_xArray[0]
    this.ly01 = yArray[0]
    this.lx02 = left_xArray[0]
    this.ly02 = yArray[1]
    this.lx03 = left_xArray[0]
    this.ly03 = yArray[2]
    this.lx04 = left_xArray[1]
    this.ly04 = yArray[0]
    this.lx05 = left_xArray[1]
    this.ly05 = yArray[1]
    this.lx06 = left_xArray[1]
    this.ly06 = yArray[2]
    this.lx07 = left_xArray[2]
    this.ly07 = yArray[0]
    this.lx08 = left_xArray[2]
    this.ly08 = yArray[1]
    this.lx09 = left_xArray[2]
    this.ly09 = yArray[2]

    this.rx01 = right_xArray[0]
    this.ry01 = yArray[0]
    this.rx02 = right_xArray[0]
    this.ry02 = yArray[1]
    this.rx03 = right_xArray[0]
    this.ry03 = yArray[2]
    this.rx04 = right_xArray[1]
    this.ry04 = yArray[0]
    this.rx05 = right_xArray[1]
    this.ry05 = yArray[1]
    this.rx06 = right_xArray[1]
    this.ry06 = yArray[2]
    this.rx07 = right_xArray[2]
    this.ry07 = yArray[0]
    this.rx08 = right_xArray[2]
    this.ry08 = yArray[1]
    this.rx09 = right_xArray[2]
    this.ry09 = yArray[2]

    this.xpos = 200
    this.ypos = 50
    this.vy = 0
    this.gravity = 0.98
    this.bounce = -1
  }

  draw(pgb){
    pgb.clear()

    pgb.ellipse(this.xpos, this.ypos, 30, 30);
    this.vy += this.gravity;
    this.ypos += this.vy;
    if(this.ypos > pgb.height - 15){
      this.vy *= this.bounce;
    }

    let count = frameCount % 600

    /*
     LEFT TO RIGHT
    */

    /*
    // b1
    stayPG(pgb, this.yrect, this.rx09, this.ry09, count, 0, 150)
    movePG(pgb, this.yrect, this.rx09, this.ry09, 0, this.lx03, this.ly03, 0, count, 150, 200)
    stayPG(pgb, this.yrect, this.lx03, this.ly03, count, 200, 10000)

    // b2
    stayPG(pgb, this.yrect, this.rx07, this.ry07, count, 0, 200)
    movePG(pgb, this.yrect, this.rx07, this.ry07, 0, this.lx01, this.ly01, 0, count, 200, 250)
    stayPG(pgb, this.yrect, this.lx01, this.ly01, count, 250, 10000)

    // b3
    stayPG(pgb, this.yrect, this.rx08, this.ry08, count, 0, 250)
    movePG(pgb, this.yrect, this.rx08, this.ry08, 0, this.lx02, this.ly02, 0, count, 250, 300)
    stayPG(pgb, this.yrect, this.lx02, this.ly02, count, 300, 10000)

    // b4
    stayPG(pgb, this.yrect, this.rx04, this.ry04, count, 0, 300)
    movePG(pgb, this.yrect, this.rx04, this.ry04, 0, this.lx04, this.ly04, 0, count, 300, 340)
    stayPG(pgb, this.yrect, this.lx04, this.ly04, count, 340, 10000)

    // b5
    stayPG(pgb, this.yrect, this.rx06, this.ry06, count, 0, 340)
    movePG(pgb, this.yrect, this.rx06, this.ry06, 0, this.lx06, this.ly06, 0, count, 340, 380)
    stayPG(pgb, this.yrect, this.lx06, this.ly06, count, 380, 10000)

    // b6
    stayPG(pgb, this.rrect, this.rx05, this.ry05, count, 0, 380)
    movePG(pgb, this.rrect, this.rx05, this.ry05, 0, this.lx05, this.ly05, 0, count, 380, 420)
    stayPG(pgb, this.rrect, this.lx05, this.ly05, count, 420, 10000)

    // b7
    stayPG(pgb, this.yrect, this.rx02, this.ry02, count, 0, 420)
    movePG(pgb, this.yrect, this.rx02, this.ry02, 0, this.lx08, this.ly08, 0, count, 420, 450)
    stayPG(pgb, this.yrect, this.lx08, this.ly08, count, 450, 10000)

    // b8
    stayPG(pgb, this.yrect, this.rx01, this.ry01, count, 0, 450)
    movePG(pgb, this.yrect, this.rx01, this.ry01, 0, this.lx07, this.ly07, 0, count, 450, 480)
    stayPG(pgb, this.yrect, this.lx07, this.ly07, count, 480, 10000)

    // b9
    stayPG(pgb, this.yrect, this.rx03, this.ry03, count, 0, 480)
    movePG(pgb, this.yrect, this.rx03, this.ry03, 0, this.lx09, this.ly09, 0, count, 480, 510)
    stayPG(pgb, this.yrect, this.lx09, this.ly09, count, 510, 10000)
    */

    /*
    pgb.image(this.yrect, this.lx01, this.ly01)
    pgb.image(this.yrect, this.lx02, this.ly02)
    pgb.image(this.yrect, this.lx03, this.ly03)
    pgb.image(this.yrect, this.lx04, this.ly04)
    pgb.image(this.rrect, this.lx05, this.ly05)
    pgb.image(this.yrect, this.lx06, this.ly06)
    pgb.image(this.yrect, this.lx07, this.ly07)
    pgb.image(this.yrect, this.lx08, this.ly08)
    pgb.image(this.yrect, this.lx09, this.ly09)

    pgb.image(this.yrect, this.rx01, this.ry01)
    pgb.image(this.yrect, this.rx02, this.ry02)
    pgb.image(this.yrect, this.rx03, this.ry03)
    pgb.image(this.yrect, this.rx04, this.ry04)
    pgb.image(this.rrect, this.rx05, this.ry05)
    pgb.image(this.yrect, this.rx06, this.ry06)
    pgb.image(this.yrect, this.rx07, this.ry07)
    pgb.image(this.yrect, this.rx08, this.ry08)
    pgb.image(this.yrect, this.rx09, this.ry09)

    pgb.image(this.brect, this.mx, this.my01)
    pgb.image(this.brect, this.mx, this.my02)
    */

  }
}


class Www_Yuichi_Com{

  static preload(){
    main_width = 1400
    main_height = 500
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO

    this.save = false
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
    let imageNumber = 1
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

  /**
  * Image 01
  * To make copy-paste easier, avoid using class scope variables.
  * setup: make local -> class at last
  * getDrawPG: make global -> local at first
  **/

  static setup_image01(){
    let pgb = createGraphics(width, height)
    let yrect = getPG_rect(90, 90, 10, TRANSPARENT, 0, 0, SUNFLOWER, 255)

    this.i01_pgb = pgb
    this.yd = new YellowDevil()
  }

  static getDrawPG_image01(){
    let pgb = this.i01_pgb
    let yd = this.yd

    yd.draw(pgb)

    return pgb
  }

  /**
  * Image 02
  **/

  static setup_image02(){
    let pgb = createGraphics(width, height)
    this.i02_pgb = pgb
  }

  static getDrawPG_image02(){
    let pgb = this.i02_pgb
    return pgb
  }

  /**
  * Image 03
  **/

  static setup_image03(){
    let pgb = createGraphics(width, height)
    this.i03_pgb = pgb
  }

  static getDrawPG_image03(){
    let pgb = this.i03_pgb
    return pgb
  }

  /**
  * Image 04
  **/

  static setup_image04(){
    let pgb = createGraphics(width, height)
    this.i04_pgb = pgb
  }

  static getDrawPG_image04(){
    let pgb = this.i04_pgb
    return pgb
  }

  /**
  * Image 05
  **/

  static setup_image05(){
    let pgb = createGraphics(width, height)
    this.i05_pgb = pgb
  }

  static getDrawPG_image05(){
    let pgb = this.i05_pgb
    return pgb
  }

  /**
  * Image 06
  **/

  static setup_image06(){
    let pgb = createGraphics(width, height)
    this.i06_pgb = pgb
  }

  static getDrawPG_image06(){
    let pgb = this.i06_pgb
    return pgb
  }

  /**
  * Image 07
  **/

  static setup_image07(){
    let pgb = createGraphics(width, height)
    this.i07_pgb = pgb
  }

  static getDrawPG_image07(){
    let pgb = this.i07_pgb
    return pgb
  }

  /**
  * Image 08
  **/

  static setup_image08(){
    let pgb = createGraphics(width, height)
    this.i08_pgb = pgb
  }

  static getDrawPG_image08(){
    let pgb = this.i08_pgb
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
