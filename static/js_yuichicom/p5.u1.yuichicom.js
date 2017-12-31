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

    lib_python_preload()

    registerFont('avenger', '/static/font/avenger.ttf')
    registerFont('roboto', '/static/font/Roboto-Black.ttf')

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
    let pgb = createGraphics(370, 260)
    pgb.background(39, 174, 96)


    setPG_style(pgb, NEPHRITIS, 3, 255, WHITE, 255)

    pgb.push()
    pgb.translate(-140, -140)

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

    pgb.pop()

    this.i02_pgb = pgb
  }

  static getDrawPG_image02(){
    let pgb = this.i02_pgb

    let doSave = true
    if(doSave){
      if(frameCount == 50){
        savePG(pgb, 'python')
      }
    }

    return pgb
  }

  /**
  * Image 03
  *
  * Network
  *
  **/
  static setup_image03(){
    let pgb = createGraphics(300, 270)
    pgb.background(255);

    pgb.push()
    pgb.translate(-5, -25)

    // CENTER : 140, 160

    // outer circle
    setPG_style(pgb, BELIZEHOLE, 8, 255, WHITE, 255)
    pgb.ellipse(140, 160, 250, 250)

    // other circles
    setPG_style(pgb, BELIZEHOLE, 13, 255, WHITE, 255)
    pgb.ellipse(140, 160, 170, 170)
    pgb.ellipse(140, 160, 120, 120)
    pgb.ellipse(270, 160, 49, 49)

    // delete useless blue lines
    setPG_style(pgb, TRANSPARENT, 0, 0, WHITE, 255)
    pgb.rect(70, 142, 200, 36)
    pgb.rect(82, 112, 118, 20)
    pgb.rect(92, 102, 98, 20)
    pgb.rect(105, 92, 68, 20)

    // draw blue lines
    setPG_style(pgb, TRANSPARENT, 0, 0, BELIZEHOLE, 255)
    pgb.rect(60, 129, 215, 13)
    pgb.rect(85, 178, 110, 13)
    pgb.rect(220, 178, 50, 13)

    // make small white space
    setPG_style(pgb, TRANSPARENT, 0, 0, WHITE, 255)
    pgb.rect(47, 142, 20, 5)

    drawPG_text(pgb, 75, 170, 'NETWORK', 32, BELIZEHOLE, 255, 'avenger')
    pgb.pop()

    let r = 97
    let w = 18
    let h = 20

    // CENTER : 140, 160
    // Start in the center and draw the circle
    pgb.translate(135, 135);

    setPG_style(pgb, BLACK, 1, 255, TRANSPARENT, 0)
    // Our curve is a circle with radius r in the center of the window.
    //pgb.ellipse(0, 0, r*2, r*2);


    // 10 boxes along the curve
    let text = 'The Net is Vast and Infinite.'
    let xArray = [
      0,7,7,0, // 'the '
      9,7,7,0, // 'net '
      9,3,0, // 'is '
      9,7,7,7,0, // 'vast '
      9,7,7,0, // 'and '
      9,3,7,7,3,7,5,5,5] // 'infinit'
    let totalBoxes = text.length
    // We must keep track of our position along the curve
    let arclength = 105;

    //let text = 'The net is vast and infinite'

    // For every box
    for (let i = 0; i < totalBoxes; i++) {
      // Each box is centered so we move half the width
      //arclength += w/2;
      arclength += xArray[i]
      // Angle in radians is the arclength divided by the radius
      let theta = arclength / r;

      pgb.push();
      // Polar to cartesian coordinate conversion
      pgb.translate(r*cos(theta), r*sin(theta));
      // Rotate the box
      pgb.rotate(theta);
      // Display the box
      pgb.rotate(radians(90))

      /*
      pgb.fill(0,100);
      pgb.rectMode(CENTER);
      pgb.rect(0,0,w,h);
      */

      drawPG_text(pgb, 0, 0, text.charAt(i), 24, BELIZEHOLE, 255, 'roboto')

      pgb.pop();
      // Move halfway again
      arclength += w/2;
    }


    this.i03_pgb = pgb
  }

  static getDrawPG_image03(){
    let pgb = this.i03_pgb

    let doSave = true
    if(doSave){
      if(frameCount == 50){
        savePG(pgb, 'network')
      }
    }

    return pgb
  }

  /**
  * Image 04
  * python console
  **/

  static setup_image04(){
    let pgb = createGraphics(600, 700)

    let pgs = createGraphics(pgb.width, pgb.height)
    drawPG_text(pgs, 50, 447, 'index', 32, WHITE, 255)
    let indexPG = Python.getPG_list(75, 75, TRANSPARENT, 0, TRANSPARENT, [28, 28, 28], 47, ['0', '1', '2'], 32, WHITE)
    pgs.image(indexPG, 200, 400)
    drawPG_text(pgs, 50, 547, 'list', 32, WHITE, 255)
    drawPG_text(pgs, 50, 647, 'result', 32, WHITE, 255)


    let last = 1500

    let cons = Python_console.get500_300()
    cons.command(100, "a = ['a', 'bc']", 200, '')
    cons.command(300, "a.append('d')", 400, '')
    cons.command(500, 'a.pop()', 600, "'d'")
    cons.command(700, 'a', 800, "['a', 'bc']")
    cons.command(900, 'a[1]', 1000, "'bc'")
    cons.command(1100, "a[0] = 'hi'", 1200, '')
    cons.command(1300, "print(a)", 1400, "['hi', 'bc']")
    cons.finish(last - 1)

    let list1 = Python.getPG_list(75, 75, NEPHRITIS, 2, WHITE, [28, 20], 47, ['a', 'bc'], 32, NEPHRITIS)
    let list2 = Python.getPG_list(75, 75, NEPHRITIS, 2, WHITE, [28, 20, 28], 47, ['a', 'bc', 'd'], 32, NEPHRITIS)
    let list3 = Python.getPG_list(75, 75, NEPHRITIS, 2, WHITE, [20, 20], 47, ['hi', 'bc'], 32, NEPHRITIS)

    let result1 = getPG_text(500, 75, 28, 30, "'d'", 32, WHITE, 255)
    let result2 = getPG_text(500, 75, 28, 30, "['a', 'bc']", 32, WHITE, 255)
    let result3 = getPG_text(500, 75, 28, 30, "'bc'", 32, WHITE, 255)

    let redRect = getPG_rect(78, 175, 0, WHITE, 5, 255)

    this.i04_pgb = pgb
    this.i04_pgs = pgs
    this.i04_console = cons
    this.i04_last = last
    this.i04_list1 = list1
    this.i04_list2 = list2
    this.i04_list3 = list3
    this.i04_result1 = result1
    this.i04_result2 = result2
    this.i04_result3 = result3
    this.i04_redRect = redRect
  }

  static getDrawPG_image04(){
    let pgb = this.i04_pgb
    let pgs = this.i04_pgs
    let cons = this.i04_console
    let last = this.i04_last
    let list1 = this.i04_list1
    let list2 = this.i04_list2
    let list3 = this.i04_list3
    let result1 = this.i04_result1
    let result2 = this.i04_result2
    let result3 = this.i04_result3
    let redRect = this.i04_redRect

    pgb.clear()
    pgb.background(39, 174, 96)
    pgb.image(pgs, 0, 0)

    let count = frameCount % last

    // console
    let consPG = cons.getPG(count)
    pgb.image(consPG, 50, 50)

    // list
    stayPG_corner(pgb, list1, 200, 500, count, 200, 400)
    stayPG_corner(pgb, list2, 200, 500, count, 400, 600)
    stayPG_corner(pgb, list1, 200, 500, count, 600, 1200)
    stayPG_corner(pgb, list3, 200, 500, count, 1200, 10000)

    // result
    stayPG_corner(pgb, result1, 200, 617, count, 600, 700)
    stayPG_corner(pgb, result2, 200, 617, count, 800, 900)
    stayPG_corner(pgb, result3, 200, 617, count, 1000, 1100)

    // red rect
    stayPG_corner(pgb, redRect, 272, 400, count, 1000, 1100)
    stayPG_corner(pgb, redRect, 197, 400, count, 1200, 1300)

    // save
    let doSave = false
    if(doSave){
      if(frameCount <= 1500){
        savePG(pgb, 'python-console-')
      }
    }

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
