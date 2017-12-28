class Www_Yuichi_Com{

  static preload(){
    main_width = 1100
    main_height = 740
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO
    main_background = 0

    main_frameRate = 50

    /*
    main_drawGrid = true
    main_drawGrid_xPitch =       25
    main_drawGrid_xStrongPitch = 275
    */

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
    let imageNumber = 3
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
  *
  * LOGO
  *
  **/

  static setup_image01(){
    let pgb = createGraphics(550, 355)
    let spgb = createGraphics(550, 355)
    let apgb = createGraphics(550, 250)

    let upperTextY = 50
    let upperBorderY = 60
    let animeY = 32.5
    let bottomBorderY = 282.5
    let bottomTextY = 352.5

    drawPG_text(spgb, 140, upperTextY, 'G', 74, MIDNIGHTBLUE, 255, 'avenger')
    drawPG_text(spgb, 230, upperTextY, 'R', 74, MIDNIGHTBLUE, 255, 'avenger')
    drawPG_text(spgb, 315, upperTextY, 'I', 74, MIDNIGHTBLUE, 255, 'avenger')
    drawPG_text(spgb, 355, upperTextY, 'T', 74, MIDNIGHTBLUE, 255, 'avenger')
    setPG_style(spgb, TRANSPARENT, 0, 0, MIDNIGHTBLUE, 255)
    spgb.rect(2.5, upperBorderY, 545, 12.5)
    spgb.rect(2.5, bottomBorderY, 545, 12.5)
    drawPG_text(spgb, 2.5, bottomTextY, 'COMPUTING', 74, MIDNIGHTBLUE, 255, 'avenger')

    this.i01_pgb = pgb
    this.i01_spgb = spgb
    this.i01_apgb = apgb
    this.i01_ay = animeY
    this.yd = new YellowDevil()
  }

  static getDrawPG_image01(){
    let pgb = this.i01_pgb
    let spgb = this.i01_spgb
    let apgb = this.i01_apgb
    let animeY = this.i01_ay
    let yd = this.yd

    pgb.clear()
    pgb.background(255)

    // static
    pgb.image(spgb, 0, 0)

    // animation
    yd.draw(apgb) // 1350 frames
    pgb.image(apgb, 0, animeY)

    // save
    let doSave = false
    if(doSave){
      if(frameCount <= 1350){
        savePG(pgb, 'logo')
      }
    }

    return pgb
  }

  /**
  * Image 02
  * Python
  **/
  
  static setup_image02(){
    let pgb = createGraphics(600, 600)
    pgb.background(39, 174, 96)


    setPG_style(pgb, NEPHRITIS, 3, 255, WHITE, 255)

    // bottom left
    /*
    pgb.beginShape()
    pgb.vertex(200, 300)
    pgb.vertex(150, 350)
    pgb.vertex(200, 350)
    pgb.vertex(250, 300)
    pgb.endShape(CLOSE)
    */
    pgb.beginShape()
    pgb.vertex(200, 300)
    pgb.vertex(150, 350)
    pgb.vertex(200, 350)
    pgb.vertex(250, 300)
    pgb.endShape(CLOSE)

    // front
    pgb.beginShape()
    pgb.vertex(200, 200)
    pgb.vertex(200, 350)
    pgb.vertex(400, 350)
    pgb.vertex(400, 200)
    pgb.endShape(CLOSE)

    // right
    pgb.beginShape()
    pgb.vertex(400, 200)
    pgb.vertex(400, 350)
    pgb.vertex(450, 300)
    pgb.vertex(450, 150)
    pgb.endShape(CLOSE)

    // top
    pgb.beginShape()
    pgb.vertex(250, 150)
    pgb.vertex(200, 200)
    pgb.vertex(400, 200)
    pgb.vertex(450, 150)
    pgb.endShape(CLOSE)
    pgb.line(225, 175, 422, 175)

    // bottom front
    pgb.beginShape()
    pgb.vertex(200, 350)
    pgb.vertex(160, 390)
    pgb.vertex(360, 390)
    pgb.vertex(400, 350)
    pgb.endShape(CLOSE)

    // bottom right
    pgb.beginShape()
    pgb.vertex(450, 300)
    pgb.vertex(400, 350)
    pgb.vertex(450, 350)
    pgb.vertex(500, 300)
    pgb.endShape(CLOSE)

    // Line Paint
    setPG_style(pgb, NEPHRITIS, 3, 255, NEPHRITIS, 255)
    pgb.rect(200, 265, 20, 20)
    pgb.rect(380, 265, 20, 20)
    pgb.beginShape()
    pgb.vertex(400, 265)
    pgb.vertex(400, 285)
    pgb.vertex(450, 235)
    pgb.vertex(450, 215)
    pgb.endShape(CLOSE)

    drawPG_text(pgb, 228, 285, 'PYTHON', 28, NEPHRITIS, 255, 'avenger')




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
    let pgb = createGraphics(320, 320)

    pgb.background(255);
    let r = 100
    let w = 40
    let h = 40

    // Start in the center and draw the circle
    pgb.translate(pgb.width / 2, pgb.height / 2);
    pgb.noFill();
    pgb.stroke(0);
    // Our curve is a circle with radius r in the center of the window.
    pgb.ellipse(0, 0, r*2, r*2);

    // 10 boxes along the curve
    let totalBoxes = 10;
    // We must keep track of our position along the curve
    let arclength = 0;

    // For every box
    for (let i = 0; i < totalBoxes; i++) {
      // Each box is centered so we move half the width
      arclength += w/2;
      // Angle in radians is the arclength divided by the radius
      let theta = arclength / r;

      pgb.push();
      // Polar to cartesian coordinate conversion
      pgb.translate(r*cos(theta), r*sin(theta));
      // Rotate the box
      pgb.rotate(theta);
      // Display the box
      pgb.fill(0,100);
      pgb.rectMode(CENTER);
      pgb.rect(0,0,w,h);
      pgb.pop();
      // Move halfway again
      arclength += w/2;
    }

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
    let size = 45
    this.yrect = getPG_rect(size, size, 10, TRANSPARENT, 0, 0, SUNFLOWER, 255)
    this.brect = getPG_rect(size, size, 10, TRANSPARENT, 0, 0, PETERRIVER, 255)
    this.bball = getPG_ellipse(size, size, PETERRIVER, 15, 255, PETERRIVER, 255)
    this.rrect = getPG_ellipse(size, size, MIDNIGHTBLUE, 7.5, 255, ALIZARIN, 255)

    let left_xArray = [2.5 + size/2, 52.5 + size/2, 102.5 + size/2]
    let right_xArray = [402.5 + size/2, 452.5 + size/2, 502.5 + size/2]
    let yArray = [102.5 + size/2, 152.5 + size/2, 202.5 + size/2]
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

    this.mx = 252.5
    this.yGround = 202.5
    this.ypos = this.yGround
    this.vy = 0
    this.gravity = 0.98
    this.hj = -15
    this.sj = -12
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
    pgb.image(this.bball, this.mx, this.ypos - 50) // top side
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
    if(count == 162){
      this.vy = this.sj
    }

    // b2
    stayPG(pgb, this.yrect, this.rx07, this.ry07, count, 0, 220)
    movePG(pgb, this.yrect, this.rx07, this.ry07, 0, this.lx01, this.ly01, 0, count, 220, 270)
    stayPG(pgb, this.yrect, this.lx01, this.ly01, count, 270, 10000)

    // b3
    stayPG(pgb, this.yrect, this.rx08, this.ry08, count, 0, 290)
    movePG(pgb, this.yrect, this.rx08, this.ry08, 0, this.lx02, this.ly02, 0, count, 290, 340)
    stayPG(pgb, this.yrect, this.lx02, this.ly02, count, 340, 10000)
    if(count == 300){
      this.vy = this.hj
    }

    // b4
    stayPG(pgb, this.yrect, this.rx04, this.ry04, count, 0, 360)
    movePG(pgb, this.yrect, this.rx04, this.ry04, 0, this.lx04, this.ly04, 0, count, 360, 400)
    stayPG(pgb, this.yrect, this.lx04, this.ly04, count, 400, 10000)

    // b5
    stayPG(pgb, this.yrect, this.rx06, this.ry06, count, 0, 420)
    movePG(pgb, this.yrect, this.rx06, this.ry06, 0, this.lx06, this.ly06, 0, count, 420, 460)
    stayPG(pgb, this.yrect, this.lx06, this.ly06, count, 460, 10000)
    if(count == 427){
      this.vy = this.sj
    }

    // b6
    stayPG(pgb, this.rrect, this.rx05, this.ry05, count, 0, 480)
    movePG(pgb, this.rrect, this.rx05, this.ry05, 0, this.lx05, this.ly05, 0, count, 480, 520)
    stayPG(pgb, this.rrect, this.lx05, this.ly05, count, 520, 10000)
    if(count == 485){
      this.vy = this.hj
    }

    // b7
    stayPG(pgb, this.yrect, this.rx03, this.ry03, count, 0, 540)
    movePG(pgb, this.yrect, this.rx03, this.ry03, 0, this.lx09, this.ly09, 0, count, 540, 570)
    stayPG(pgb, this.yrect, this.lx09, this.ly09, count, 570, 10000)
    if(count == 543){
      this.vy = this.sj
    }

    // b8
    stayPG(pgb, this.yrect, this.rx01, this.ry01, count, 0, 590)
    movePG(pgb, this.yrect, this.rx01, this.ry01, 0, this.lx07, this.ly07, 0, count, 590, 620)
    stayPG(pgb, this.yrect, this.lx07, this.ly07, count, 620, 10000)


    // b9
    stayPG(pgb, this.yrect, this.rx02, this.ry02, count, 0, 640)
    movePG(pgb, this.yrect, this.rx02, this.ry02, 0, this.lx08, this.ly08, 0, count, 640, 670)
    stayPG(pgb, this.yrect, this.lx08, this.ly08, count, 670, 10000)
    if(count == 640){
      this.vy = this.hj
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
    if(count == 130){
      this.vy = this.hj
    }

    // b3
    stayPG(pgb, this.yrect, this.lx03, this.ly03, count, 0, 190)
    movePG(pgb, this.yrect, this.lx03, this.ly03, 0, this.rx09, this.ry09, 0, count, 190, 240)
    stayPG(pgb, this.yrect, this.rx09, this.ry09, count, 240, 10000)
    if(count == 203){
      this.vy = this.sj
    }

    // b4
    stayPG(pgb, this.yrect, this.lx06, this.ly06, count, 0, 260)
    movePG(pgb, this.yrect, this.lx06, this.ly06, 0, this.rx06, this.ry06, 0, count, 260, 300)
    stayPG(pgb, this.yrect, this.rx06, this.ry06, count, 300, 10000)
    if(count == 267){
      this.vy = this.sj
    }

    // b5
    stayPG(pgb, this.yrect, this.lx04, this.ly04, count, 0, 320)
    movePG(pgb, this.yrect, this.lx04, this.ly04, 0, this.rx04, this.ry04, 0, count, 320, 360)
    stayPG(pgb, this.yrect, this.rx04, this.ry04, count, 360, 10000)

    // b6
    stayPG(pgb, this.rrect, this.lx05, this.ly05, count, 0, 380)
    movePG(pgb, this.rrect, this.lx05, this.ly05, 0, this.rx05, this.ry05, 0, count, 380, 420)
    stayPG(pgb, this.rrect, this.rx05, this.ry05, count, 420, 10000)
    if(count == 385){
      this.vy = this.hj
    }

    // b7
    stayPG(pgb, this.yrect, this.lx09, this.ly09, count, 0, 440)
    movePG(pgb, this.yrect, this.lx09, this.ly09, 0, this.rx03, this.ry03, 0, count, 440, 470)
    stayPG(pgb, this.yrect, this.rx03, this.ry03, count, 470, 10000)
    if(count == 442){
      this.vy = this.sj
    }

    // b8
    stayPG(pgb, this.yrect, this.lx07, this.ly07, count, 0, 490)
    movePG(pgb, this.yrect, this.lx07, this.ly07, 0, this.rx01, this.ry01, 0, count, 490, 520)
    stayPG(pgb, this.yrect, this.rx01, this.ry01, count, 520, 10000)

    // b9
    stayPG(pgb, this.yrect, this.lx08, this.ly08, count, 0, 540)
    movePG(pgb, this.yrect, this.lx08, this.ly08, 0, this.rx02, this.ry02, 0, count, 540, 570)
    stayPG(pgb, this.yrect, this.rx02, this.ry02, count, 570, 10000)
    if(count == 540){
      this.vy = this.hj
    }
  }
}
