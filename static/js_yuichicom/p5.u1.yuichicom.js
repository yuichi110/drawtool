class Www_Yuichi_Com{

  static preload(){
    main_width = 1100
    main_height = 690
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO

    registerFont('avenger', '/static/font/avenger.ttf')

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
    let pgb = createGraphics(1100, 690)
    let spgb = createGraphics(1100, 690)
    let apgb = createGraphics(1100, 500)

    // make spgb
    setPG_style(spgb, TRANSPARENT, 0, 0, MIDNIGHTBLUE, 255)
    spgb.rect(5, 100, 1090, 25)
    spgb.rect(5, 560, 1090, 25)
    drawPG_text(spgb, 5, 95, 'G', 148, MIDNIGHTBLUE, 255, 'avenger')
    drawPG_text(spgb, 165, 95, 'R', 148, MIDNIGHTBLUE, 255, 'avenger')
    drawPG_text(spgb, 325, 95, 'I', 148, MIDNIGHTBLUE, 255, 'avenger')
    drawPG_text(spgb, 405, 95, 'T', 148, MIDNIGHTBLUE, 255, 'avenger')
    drawPG_text(spgb, 6, 685, 'COMPUTING', 148, MIDNIGHTBLUE, 255, 'avenger')

    this.i01_pgb = pgb
    this.i01_spgb = spgb
    this.i01_apgb = apgb
    this.yd = new YellowDevil()
  }

  static getDrawPG_image01(){
    let pgb = this.i01_pgb
    let spgb = this.i01_spgb
    let apgb = this.i01_apgb
    let yd = this.yd

    pgb.clear()

    // static
    pgb.image(spgb, 0, 0)

    // animation
    yd.draw(apgb)
    pgb.image(apgb, 0, 60)

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

class YellowDevil{
  constructor(){
    let size = 90
    this.yrect = getPG_rect(size, size, 10, TRANSPARENT, 0, 0, SUNFLOWER, 255)
    this.brect = getPG_rect(size, size, 10, TRANSPARENT, 0, 0, PETERRIVER, 255)
    this.bball = getPG_ellipse(size, size, PETERRIVER, 15, 255, PETERRIVER, 255)
    this.rrect = getPG_ellipse(size, size, MIDNIGHTBLUE, 15, 255, ALIZARIN, 255)
    let left_xArray = [5 + size/2, 105 + size/2, 205 + size/2]
    let right_xArray = [805 + size/2, 905 + size/2, 1005 + size/2]
    let yArray = [205 + size/2, 305 + size/2, 405 + size/2]

    this.mx = 505 //+ size/2
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

    this.yGround = 405
    //this.xpos = 505
    this.ypos = this.yGround

    this.vy = 0
    this.gravity = 0.98
    //this.bounce = -1
  }

  draw(pgb){
    pgb.clear()
    this.drawMegaMan(pgb)
    let count = frameCount % 1350
    if(count < 750){
      this.drawRightToLeft(pgb, count)
    }else{
      this.drawLeftToRight(pgb, count - 750)
    }
  }

  drawMegaMan(pgb){
    pgb.image(this.brect, this.mx, this.ypos) // bottom side
    pgb.image(this.bball, this.mx, this.ypos - 100) // top side
    if(this.vy != 0){
      if(this.ypos > this.yGround){
        this.vy = 0
        this.ypos = this.yGround
      }else{
        this.vy += this.gravity;
        this.ypos += this.vy;
      }
    }
  }

  drawRightToLeft(pgb, count){
    // b1
    stayPG(pgb, this.yrect, this.rx09, this.ry09, count, 0, 150)
    movePG(pgb, this.yrect, this.rx09, this.ry09, 0, this.lx03, this.ly03, 0, count, 150, 200)
    stayPG(pgb, this.yrect, this.lx03, this.ly03, count, 200, 10000)
    if(count == 155){
      this.vy = -18
    }

    // b2
    stayPG(pgb, this.yrect, this.rx07, this.ry07, count, 0, 220)
    movePG(pgb, this.yrect, this.rx07, this.ry07, 0, this.lx01, this.ly01, 0, count, 220, 270)
    stayPG(pgb, this.yrect, this.lx01, this.ly01, count, 270, 10000)

    // b3
    stayPG(pgb, this.yrect, this.rx08, this.ry08, count, 0, 290)
    movePG(pgb, this.yrect, this.rx08, this.ry08, 0, this.lx02, this.ly02, 0, count, 290, 340)
    stayPG(pgb, this.yrect, this.lx02, this.ly02, count, 340, 10000)
    if(count == 295){
      this.vy = -22
    }

    // b4
    stayPG(pgb, this.yrect, this.rx04, this.ry04, count, 0, 360)
    movePG(pgb, this.yrect, this.rx04, this.ry04, 0, this.lx04, this.ly04, 0, count, 360, 400)
    stayPG(pgb, this.yrect, this.lx04, this.ly04, count, 400, 10000)

    // b5
    stayPG(pgb, this.yrect, this.rx06, this.ry06, count, 0, 420)
    movePG(pgb, this.yrect, this.rx06, this.ry06, 0, this.lx06, this.ly06, 0, count, 420, 460)
    stayPG(pgb, this.yrect, this.lx06, this.ly06, count, 460, 10000)
    if(count == 420){
      this.vy = -18
    }

    // b6
    stayPG(pgb, this.rrect, this.rx05, this.ry05, count, 0, 480)
    movePG(pgb, this.rrect, this.rx05, this.ry05, 0, this.lx05, this.ly05, 0, count, 480, 520)
    stayPG(pgb, this.rrect, this.lx05, this.ly05, count, 520, 10000)
    if(count == 475){
      this.vy = -22
    }

    // b7
    stayPG(pgb, this.yrect, this.rx03, this.ry03, count, 0, 540)
    movePG(pgb, this.yrect, this.rx03, this.ry03, 0, this.lx09, this.ly09, 0, count, 540, 570)
    stayPG(pgb, this.yrect, this.lx09, this.ly09, count, 570, 10000)
    if(count == 535){
      this.vy = -18
    }

    // b8
    stayPG(pgb, this.yrect, this.rx01, this.ry01, count, 0, 590)
    movePG(pgb, this.yrect, this.rx01, this.ry01, 0, this.lx07, this.ly07, 0, count, 590, 620)
    stayPG(pgb, this.yrect, this.lx07, this.ly07, count, 620, 10000)


    // b9
    stayPG(pgb, this.yrect, this.rx02, this.ry02, count, 0, 640)
    movePG(pgb, this.yrect, this.rx02, this.ry02, 0, this.lx08, this.ly08, 0, count, 640, 670)
    stayPG(pgb, this.yrect, this.lx08, this.ly08, count, 670, 10000)
    if(count == 633){
      this.vy = -22
    }
  }

  drawLeftToRight(pgb, count){
    // b1
    stayPG(pgb, this.yrect, this.lx01, this.ly01, count, 0, 50)
    movePG(pgb, this.yrect, this.lx01, this.ly01, 0, this.rx07, this.ry07, 0, count, 50, 100)
    stayPG(pgb, this.yrect, this.rx07, this.ry07, count, 100, 10000)

    // b2
    stayPG(pgb, this.yrect, this.lx02, this.ly02, count, 0, 120)
    movePG(pgb, this.yrect, this.lx02, this.ly02, 0, this.rx08, this.ry08, 0, count, 120, 170)
    stayPG(pgb, this.yrect, this.rx08, this.ry08, count, 170, 10000)
    if(count == 120){
      this.vy = -22
    }

    // b3
    stayPG(pgb, this.yrect, this.lx03, this.ly03, count, 0, 190)
    movePG(pgb, this.yrect, this.lx03, this.ly03, 0, this.rx09, this.ry09, 0, count, 190, 240)
    stayPG(pgb, this.yrect, this.rx09, this.ry09, count, 240, 10000)
    if(count == 195){
      this.vy = -18
    }

    // b4
    stayPG(pgb, this.yrect, this.lx06, this.ly06, count, 0, 260)
    movePG(pgb, this.yrect, this.lx06, this.ly06, 0, this.rx06, this.ry06, 0, count, 260, 300)
    stayPG(pgb, this.yrect, this.rx06, this.ry06, count, 300, 10000)
    if(count == 265){
      this.vy = -18
    }

    // b5
    stayPG(pgb, this.yrect, this.lx04, this.ly04, count, 0, 320)
    movePG(pgb, this.yrect, this.lx04, this.ly04, 0, this.rx04, this.ry04, 0, count, 320, 360)
    stayPG(pgb, this.yrect, this.rx04, this.ry04, count, 360, 10000)

    // b6
    stayPG(pgb, this.rrect, this.lx05, this.ly05, count, 0, 380)
    movePG(pgb, this.rrect, this.lx05, this.ly05, 0, this.rx05, this.ry05, 0, count, 380, 420)
    stayPG(pgb, this.rrect, this.rx05, this.ry05, count, 420, 10000)
    if(count == 380){
      this.vy = -22
    }

    // b7
    stayPG(pgb, this.yrect, this.lx09, this.ly09, count, 0, 440)
    movePG(pgb, this.yrect, this.lx09, this.ly09, 0, this.rx03, this.ry03, 0, count, 440, 470)
    stayPG(pgb, this.yrect, this.rx03, this.ry03, count, 470, 10000)
    if(count == 440){
      this.vy = -18
    }

    // b8
    stayPG(pgb, this.yrect, this.lx07, this.ly07, count, 0, 490)
    movePG(pgb, this.yrect, this.lx07, this.ly07, 0, this.rx01, this.ry01, 0, count, 490, 520)
    stayPG(pgb, this.yrect, this.rx01, this.ry01, count, 520, 10000)

    // b9
    stayPG(pgb, this.yrect, this.lx08, this.ly08, count, 0, 540)
    movePG(pgb, this.yrect, this.lx08, this.ly08, 0, this.rx02, this.ry02, 0, count, 540, 570)
    stayPG(pgb, this.yrect, this.rx02, this.ry02, count, 570, 10000)
    if(count == 533){
      this.vy = -22
    }
  }
}
