class Web_python01_015{

  static preload(){
    main_width = 2000
    main_height = 2000
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO
    main_background = 0

    lib_python_preload()
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

  /**
  * Image 01
  * To make copy-paste easier, avoid using class scope variables.
  * setup: make local -> class at last
  * getDrawPG: make global -> local at first
  **/

  static setup_image01(){
    let pgb = createGraphics(830, 630)
    this.i01_console = Python_console.get500_300()

    this.i01_v1 = getPG_rect(80, 80, 10, TRANSPARENT, 0, 0, BELIZEHOLE, 255, 10, 53, '123', 32, WHITE, 255)
    this.i01_v2 = getPG_rect(80, 80, 10, TRANSPARENT, 0, 0, BELIZEHOLE, 255, 10, 53, '789', 32, WHITE, 255)
    this.i01_box = getPG_rect(120, 120, 10, MIDNIGHTBLUE, 10, 255)

    this.i01_text1 = createGraphics(300, 100)
    drawPG_text(this.i01_text1, 20, 80, '変数 abc', 28, MIDNIGHTBLUE, 255)

    this.i01_text2 = createGraphics(300, 100)
    drawPG_text(this.i01_text2, 20, 80, '初期化(代入)', 28, MIDNIGHTBLUE, 255)

    this.i01_text3 = createGraphics(300, 100)
    drawPG_text(this.i01_text3, 20, 80, '再代入(代入)', 28, MIDNIGHTBLUE, 255)

    this.i01_text4 = createGraphics(300, 100)
    drawPG_text(this.i01_text4, 20, 80, '参照(変数を利用)', 28, MIDNIGHTBLUE, 255)

    this.i01_pgb = pgb
  }

  static getDrawPG_image01(){
    let pgb = this.i01_pgb
    pgb.clear()
    pgb.background(255)

    let count = frameCount % 1050

    // CONSOLE
    this.i01_console.command('abc = 123', '', count, 50, 150)
    this.i01_console.command('print(abc)', '123', count, 250, 350)
    this.i01_console.command('abc + 456', '579', count, 450, 550)
    this.i01_console.command('abc = 789', '', count, 650, 750)
    this.i01_console.command('print(abc)', '789', count, 850, 950)
    this.i01_console.flush(count, 1049)
    let pg_console = this.i01_console.getPG(count)
    pgb.image(pg_console, 50, 50)

    // ANIMATION
    stayPG_corner(pgb, this.i01_box, 240, 410, count, 150, 10000)
    stayPG_corner(pgb, this.i01_text1, 225, 500, count, 150, 10000)

    let x1 = 100
    let x2 = 300
    let x3 = 500
    let y = 470

    let tx = 550
    let ty = 400

    movePG(pgb, this.i01_v1, x1, y, 0, x2, y, 0 , count, 150, 175)
    stayPG(pgb, this.i01_v1, x2, y, count, 175, 775)
    stayPG_corner(pgb, this.i01_text2, tx, ty, count, 150, 225)

    movePG(pgb, this.i01_v1, x2, y, 0, x3, y, 0 , count, 350, 375)
    stayPG(pgb, this.i01_v1, x3, y, count, 375, 425)
    stayPG_corner(pgb, this.i01_text4, tx, ty, count, 350, 425)

    movePG(pgb, this.i01_v1, x2, y, 0, x3, y, 0 , count, 550, 575)
    stayPG(pgb, this.i01_v1, x3, y, count, 575, 625)
    stayPG_corner(pgb, this.i01_text4, tx, ty, count, 550, 625)

    movePG(pgb, this.i01_v2, x1, y, 0, x2, y, 0 , count, 750, 775)
    stayPG(pgb, this.i01_v2, x2, y, count, 775, 1500)
    stayPG_corner(pgb, this.i01_text3, tx, ty, count, 750, 825)

    movePG(pgb, this.i01_v2, x2, y, 0, x3, y, 0 , count, 950, 975)
    stayPG(pgb, this.i01_v2, x3, y, count, 975, 1025)
    stayPG_corner(pgb, this.i01_text4, tx, ty, count, 950, 1025)

    savePG(pgb, 'image1_', 0, 1049)

    return pgb
  }

  /**
  * Image 02
  **/

  static setup_image02(){
    let pgb = createGraphics(1150, 410)

    // background
    let pgs = createGraphics(pgb.width, pgb.height)
    pgs.background(255)
    drawPG_text(pgs, 650, 172, 'index', 32, MIDNIGHTBLUE, 255)
    let indexPG = Python.getPG_list(75, 75, TRANSPARENT, 0, TRANSPARENT, [28, 28, 28, 28], 47, ['0', '1', '2', '3'], 32, MIDNIGHTBLUE)
    pgs.image(indexPG, 800, 125)
    drawPG_text(pgs, 650, 272, 'list', 32, MIDNIGHTBLUE, 255)

    // console
    this.i02_console = Python_console.get500_300()

    // list
    this.i02_list1 = Python.getPG_list(75, 75, BLACK, 2, BELIZEHOLE, [28, 28, 28, 28], 47, ['a', 'b', 'c', 'd'], 32, WHITE)
    this.i02_list2 = Python.getPG_list(75, 75, BLACK, 2, BELIZEHOLE, [18, 28, 28, 28], 47, ['10', 'b', 'c', 'd'], 32, WHITE)

    // red rect
    this.i02_redRect = getPG_rect(78, 175, 0, POMEGRANATE, 5, 255)

    this.i02_pgb = pgb
    this.i02_pgs = pgs
  }

  static getDrawPG_image02(){
    let pgb = this.i02_pgb
    pgb.clear()
    pgb.image(this.i02_pgs, 0, 0)

    let count = frameCount % 1100

    // console
    let cons = this.i02_console
    cons.command("a = ['a', 'b', 'c', 'd']", '', count, 50, 200)
    cons.command('print(a[0])', 'a', count, 300, 400)
    cons.command('print(a[3])', 'd', count, 500, 600)
    cons.command('a[0] = 10', '', count, 700, 800)
    cons.command('print(a[0])', '10', count, 900, 1000)
    cons.flush(count, 1099)
    pgb.image(cons.getPG(count), 50, 50)

    // list
    stayPG_corner(pgb, this.i02_list1, 800, 225, count, 200, 800)
    stayPG_corner(pgb, this.i02_list2, 800, 225, count, 800, 10000)

    // red rect
    let x1 = 797
    let x2 = 1022
    stayPG_corner(pgb, this.i02_redRect, x1, 125, count, 400, 500)
    stayPG_corner(pgb, this.i02_redRect, x2, 125, count, 600, 700)
    stayPG_corner(pgb, this.i02_redRect, x1, 125, count, 800, 900)
    stayPG_corner(pgb, this.i02_redRect, x1, 125, count, 1000, 1100)

    savePG(pgb, 'image2_', 0, 1099)

    return pgb
  }

  /**
  * Image 03
  **/

  static setup_image03(){
    let pgb = createGraphics(550, 400)

    let columns = 25
    let rows = 10

    let text1 = `a = 5
print(1)
if 10 > a:
  print(2)
  print(3)
print(4)`

    let title = 'Python Editor'
    let titleX = Python_editor.get_titleX(title, 20, columns)
    this.i3_editor1 = Python_editor.get_Font20(text1, columns, rows, titleX + 30, title, true)

    let text2 = `a = 100
print(1)
if 10 > a:
  print(2)
  print(3)
print(4)`
    this.i3_editor2 = Python_editor.get_Font20(text2, columns, rows, titleX + 30, title, true)

    this.i03_pgb = pgb
  }

  static getDrawPG_image03(){
    let pgb = this.i03_pgb
    pgb.clear()
    pgb.background(255)

    let count = frameCount % 650

    let e1 = this.i3_editor1
    let e2 = this.i3_editor2
    if(count == 0){
      e1.unhighLight()
      e2.unhighLight()
    }

    // EDITOR1
    let hdef1 = [[50, 1], [75, 2], [100, 3], [200, 4], [225, 5], [250, 6]]
    for(let [c, r] of hdef1){
      if(count == c){
        e1.highLight([[[r,r],[0, 1000]]])
      }
    }
    drawPG_textAtFrame(pgb, 400, 150, 'True', 28, POMEGRANATE, 255, count, 100, 200)
    if(0 <= count && count <= 300){
      pgb.image(e1.getPG(), 50, 50)
    }

    // EDITOR2
    let hdef2 = [[400, 1], [425, 2], [450, 3], [550, 6]]
    for(let [c, r] of hdef2){
      if(count == c){
        e2.highLight([[[r,r],[0, 1000]]])
      }
    }
    drawPG_textAtFrame(pgb, 400, 150, 'False', 28, POMEGRANATE, 255, count, 450, 550)
    if(350 <= count && count <= 600){
      pgb.image(e2.getPG(), 50, 50)
    }

    //savePG(pgb, 'image3_', 0, 649)

    return pgb
  }

  /**
  * Image 04
  **/

  static setup_image04(){
    let pgb = createGraphics(550, 400)

    let columns = 25
    let rows = 10

    let text1 = `a = 5
b = 5
print(1)
if 10 > a:
  print(2)
  if 10 > b:
    print(3)
  print(4)
print(5)`

    let title = 'Python Editor'
    let titleX = Python_editor.get_titleX(title, 20, columns)
    this.i4_editor1 = Python_editor.get_Font20(text1, columns, rows, titleX + 30, title, true)

    let text2 = `a = 5
b = 100
print(1)
if 10 > a:
  print(2)
  if 10 > b:
    print(3)
  print(4)
print(5)`
    this.i4_editor2 = Python_editor.get_Font20(text2, columns, rows, titleX + 30, title, true)

    let text3 = `a = 100
b = 5
print(1)
if 10 > a:
  print(2)
  if 10 > b:
    print(3)
  print(4)
print(5)`
    this.i4_editor3 = Python_editor.get_Font20(text3, columns, rows, titleX + 30, title, true)

    let text4 = `a = 100
b = 100
print(1)
if 10 > a:
  print(2)
  if 10 > b:
    print(3)
  print(4)
print(5)`
    this.i4_editor4 = Python_editor.get_Font20(text4, columns, rows, titleX + 30, title, true)

    this.i04_pgb = pgb
  }

  static getDrawPG_image04(){
    let pgb = this.i04_pgb
    pgb.clear()
    pgb.background(255)

    let count = frameCount % 1625

    let e1 = this.i4_editor1
    let e2 = this.i4_editor2
    let e3 = this.i4_editor3
    let e4 = this.i4_editor4
    if(count == 0){
      e1.unhighLight()
      e2.unhighLight()
      e3.unhighLight()
      e4.unhighLight()
    }

    // EDITOR1
    let hdef1 = [[50, 1], [75, 2], [100, 3], [125, 4], [225, 5], [250, 6], [350, 7], [375, 8], [400, 9]]
    for(let [c, r] of hdef1){
      if(count == c){
        e1.highLight([[[r,r],[0, 1000]]])
      }
    }
    drawPG_textAtFrame(pgb, 400, 175, 'True', 28, POMEGRANATE, 255, count, 125, 225)
    drawPG_textAtFrame(pgb, 400, 225, 'True', 28, POMEGRANATE, 255, count, 250, 350)
    if(0 <= count && count <= 450){
      pgb.image(e1.getPG(), 50, 50)
    }

    // EDITOR2
    let t2 = 500
    let hdef2 = [[t2 + 50, 1], [t2 + 75, 2], [t2 + 100, 3], [t2 + 125, 4],
    [t2 + 225, 5], [t2 + 250, 6], [t2 + 350, 8], [t2 + 375, 9]]
    for(let [c, r] of hdef2){
      if(count == c){
        e2.highLight([[[r,r],[0, 1000]]])
      }
    }
    drawPG_textAtFrame(pgb, 400, 175, 'True', 28, POMEGRANATE, 255, count, t2 + 125, t2 + 225)
    drawPG_textAtFrame(pgb, 400, 225, 'False', 28, POMEGRANATE, 255, count, t2 + 250, t2 + 350)
    if(500 <= count && count <= 925){
      pgb.image(e2.getPG(), 50, 50)
    }

    // EDITOR3
    let t3 = 975
    let hdef3 = [[t3 + 50, 1], [t3 + 75, 2], [t3 + 100, 3], [t3 + 125, 4], [t3 + 225, 9]]
    for(let [c, r] of hdef3){
      if(count == c){
        e3.highLight([[[r,r],[0, 1000]]])
      }
    }
    drawPG_textAtFrame(pgb, 400, 175, 'False', 28, POMEGRANATE, 255, count, t3 + 125, t3 + 225)
    if(975 <= count && count <= 1250){
      pgb.image(e3.getPG(), 50, 50)
    }

    // EDITOR4
    let t4 = 1300
    let hdef4 = [[t4 + 50, 1], [t4 + 75, 2], [t4 + 100, 3], [t4 + 125, 4], [t4 + 225, 9]]
    for(let [c, r] of hdef4){
      if(count == c){
        e4.highLight([[[r,r],[0, 1000]]])
      }
    }
    drawPG_textAtFrame(pgb, 400, 175, 'False', 28, POMEGRANATE, 255, count, t4 + 125, t4 + 225)
    if(1300 <= count && count <= 1575){
      pgb.image(e4.getPG(), 50, 50)
    }

    savePG(pgb, 'image4_', 0, 1624)

    return pgb
  }

  /**
  * Image 05
  **/

  static setup_image05(){
    let pgb = createGraphics(550, 400)

    let columns = 25
    let rows = 10

    let text1 = `a = 5
print(1)
if 10 > a:
  print(2)
else:
  print(3)
print(4)`

    let title = 'Python Editor'
    let titleX = Python_editor.get_titleX(title, 20, columns)
    this.i5_editor1 = Python_editor.get_Font20(text1, columns, rows, titleX + 30, title, true)


    let text2 = `a = 100
print(1)
if 10 > a:
  print(2)
else:
  print(3)
print(4)`
    this.i5_editor2 = Python_editor.get_Font20(text2, columns, rows, titleX + 30, title, true)

    this.i05_pgb = pgb
  }

  static getDrawPG_image05(){
    let pgb = this.i05_pgb
    pgb.clear()
    pgb.background(255)

    let count = frameCount % 675

    let e1 = this.i5_editor1
    let e2 = this.i5_editor2
    if(count == 0){
      e1.unhighLight()
      e2.unhighLight()
    }

    // EDITOR1
    let hdef1 = [[50, 1], [75, 2], [100, 3], [200, 4], [225, 7]]
    for(let [c, r] of hdef1){
      if(count == c){
        e1.highLight([[[r,r],[0, 1000]]])
      }
    }
    drawPG_textAtFrame(pgb, 400, 150, 'True', 28, POMEGRANATE, 255, count, 100, 200)
    if(0 <= count && count <= 275){
      pgb.image(e1.getPG(), 50, 50)
    }

    // EDITOR2
    let hdef2 = [[375, 1], [400, 2], [425, 3], [525, 5], [550, 6], [575, 7]]
    for(let [c, r] of hdef2){
      if(count == c){
        e2.highLight([[[r,r],[0, 1000]]])
      }
    }
    drawPG_textAtFrame(pgb, 400, 150, 'False', 28, POMEGRANATE, 255, count, 425, 525)
    if(350 <= count && count <= 625){
      pgb.image(e2.getPG(), 50, 50)
    }

    savePG(pgb, 'image5_', 0, 674)

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
