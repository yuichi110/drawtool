class Web_python01_020{

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
    let pgb = createGraphics(620, 620)

    let pgs = createGraphics(pgb.width, pgb.height)
    pgs.background(255)

    // index
    drawPG_text(pgs, 50, 95, 'index', 32, MIDNIGHTBLUE, 255)
    let indexPG = Python.getPG_list(75, 75, TRANSPARENT, 0, TRANSPARENT, [28, 28, 28, 28], 47, ['0', '1', '2', '3'], 32, MIDNIGHTBLUE)
    pgs.image(indexPG, 200, 50)

    // list
    drawPG_text(pgs, 50, 195, 'list', 32, MIDNIGHTBLUE, 255)
    let listPG = Python.getPG_list(75, 75, MIDNIGHTBLUE, 2, BELIZEHOLE, [28, 28, 28, 28], 47, ['a', 'b', 'c', 'd'], 32, WHITE)
    pgs.image(listPG, 200, 150)

    // codeblock box
    let boxPG = getPG_rect(400, 150, 10, TRANSPARENT, 0, 0, NEPHRITIS, 255, 30, 65, 'for文のコードブロック\n   （ループ内の処理）', 32, WHITE, 255)
    pgs.image(boxPG, 150, 400)

    // arrow
    this.i01_arrowR = getPG_bigArrowR(120, 60, 30, 15, TRANSPARENT, 0, 255, WETASPHALT, 255)

    this.i01_pgb = pgb
    this.i01_pgs = pgs
  }

  static getDrawPG_image01(){
    let pgb = this.i01_pgb
    pgb.clear()
    pgb.background(255)
    pgb.image(this.i01_pgs, 0, 0)

    let count = frameCount % 500

    let x1 = 235
    let x2 = 310
    let x3 = 385
    let x4 = 460
    let y = 315
    stayPG_angle(pgb, this.i01_arrowR, x1, y, 90, count, 50, 125)
    stayPG_angle(pgb, this.i01_arrowR, x2, y, 90, count, 150, 225)
    stayPG_angle(pgb, this.i01_arrowR, x3, y, 90, count, 250, 325)
    stayPG_angle(pgb, this.i01_arrowR, x4, y, 90, count, 350, 425)

    //savePG(pgb, 'image1_', 0, 499)

    return pgb
  }

  /**
  * Image 02
  **/

  static setup_image02(){
    let pgb = createGraphics(430, 400)

    let columns = 25
    let rows = 10

    let text1 = `a = [1,2,3,4,5]
print('start')

for i in a:
  print(i)

print('end')`

    let title = 'Python Editor'
    let titleX = Python_editor.get_titleX(title, 20, columns)
    this.i2_editor1 = Python_editor.get_Font20(text1, columns, rows, titleX + 30, title, true)
    this.i02_pgb = pgb
  }

  static getDrawPG_image02(){
    let pgb = this.i02_pgb
    pgb.clear()
    pgb.background(255)

    let count = frameCount % 1250
    let e1 = this.i2_editor1
    if(count == 0){
      e1.unhighLight()
    }

    // BEFORE FOR
    let hdef1 = [[50, 1], [75, 2], [100, 3]]
    for(let [c, r] of hdef1){
      if(count == c){
        e1.highLight([[[r,r],[0, 1000]]])
      }
    }


    // FOR LOOP
    let fhdef = [[100, 6], [300, 8], [500, 10], [700, 12], [900, 14]]
    for(let [base, index] of fhdef){
      if(count == base + 50){
        e1.unhighLight()
      }
      else if(count == base + 100){
        e1.highLight([[[1, 1], [index, index]]])
      }
      else if(count == base + 150){
        e1.highLight([[[4,4],[0, 1000]], [[1, 1], [index, index]]])
      }
      else if(count == base + 200){
        e1.highLight([[[5,5],[0, 1000]], [[1, 1], [index, index]]])
      }
    }

    // AFTER FOR
    let hdef2 = [[1150, 6], [1175, 7]]
    for(let [c, r] of hdef2){
      if(count == c){
        e1.highLight([[[r,r],[0, 1000]]])
      }
    }

    if(count == 1225){
      e1.unhighLight()
    }

    pgb.image(e1.getPG(), 50, 50)

    //savePG(pgb, 'image2_', 0, 1249)

    return pgb
  }

  /**
  * Image 03
  **/

  static setup_image03(){
    let pgb = createGraphics(570, 400)

    let columns = 25
    let rows = 10

    let text1 = `a = 5
print('start')

while a > 0:
  print(a)
  a -= 1

print('end')`

    let title = 'Python Editor'
    let titleX = Python_editor.get_titleX(title, 20, columns)
    this.i3_editor1 = Python_editor.get_Font20(text1, columns, rows, titleX + 30, title, true)

    this.i03_pgb = pgb
  }

  static getDrawPG_image03(){
    let pgb = this.i03_pgb
    pgb.clear()
    pgb.background(255)

    let count = frameCount % 1075

    let e1 = this.i3_editor1
    if(count == 0){
      e1.unhighLight()
    }

    // BEFORE LOOP
    let hdef1 = [[50, 1], [75, 2], [100, 3]]
    for(let [c, r] of hdef1){
      if(count == c){
        e1.highLight([[[r,r],[0, 1000]]])
      }
    }
    if(count == 125){
      e1.unhighLight()
    }

    // LOOP
    let hdef2 = [150, 300, 450, 600, 750]
    for(let base of hdef2){
      // requires 150 frame
      if(count == base){
        e1.highLight([[[4,4],[0, 1000]]])
      }
      else if(count == base + 100){
        e1.highLight([[[5,5],[0, 1000]]])
      }
      else if(count == base + 125){
        e1.highLight([[[6,6],[0, 1000]]])
      }
    }


    drawPG_textAtFrame(pgb, 400, 180, '5 : True', 28, POMEGRANATE, 255, count, 150, 250)
    drawPG_textAtFrame(pgb, 400, 180, '4 : True', 28, POMEGRANATE, 255, count, 300, 400)
    drawPG_textAtFrame(pgb, 400, 180, '3 : True', 28, POMEGRANATE, 255, count, 450, 550)
    drawPG_textAtFrame(pgb, 400, 180, '2 : True', 28, POMEGRANATE, 255, count, 600, 700)
    drawPG_textAtFrame(pgb, 400, 180, '1 : True', 28, POMEGRANATE, 255, count, 750, 850)


    // AFTER LOOP
    if(count == 900){
      e1.highLight([[[4,4],[0, 1000]]])
    }
    drawPG_textAtFrame(pgb, 400, 180, '0 : False', 28, POMEGRANATE, 255, count, 900, 1000)

    let hdef3 = [[1000, 7], [1025, 8]]
    for(let [c, r] of hdef3){
      if(count == c){
        e1.highLight([[[r,r],[0, 1000]]])
      }
    }

    pgb.image(e1.getPG(), 50, 50)

    savePG(pgb, 'image3_', 0, 1074)

    return pgb
  }

  /**
  * Image 04
  **/

  static setup_image04(){
    let pgb = createGraphics(900, 620)
    let pgs = createGraphics(pgb.width, pgb.height)
    pgs.clear()
    pgs.background(255)

    this.i04_arrowLeft1 = getPG_bigArrowR(200, 120, 60, 30, TRANSPARENT, 10, 255, WETASPHALT, 255, false,
    45, 70, '引数', 32, WHITE, 255)
    this.i04_arrowLeft2 = getPG_bigArrowR(200, 120, 60, 30, TRANSPARENT, 10, 255, POMEGRANATE, 255, false,
    45, 70, '引数', 32, WHITE, 255)
    drawPG_text(pgs, 145, 270, '入力', 32, MIDNIGHTBLUE, 255)

    this.i04_rect1 = getPG_rect(200, 150, 10, TRANSPARENT, 0, 0, WETASPHALT, 255, 60, 85, '関数', 40, WHITE, 255)
    this.i04_rect2 = getPG_rect(200, 150, 10, TRANSPARENT, 0, 0, POMEGRANATE, 255, 60, 85, '関数', 40, WHITE, 255)
    drawPG_text(pgs, 420, 270, '処理', 32, MIDNIGHTBLUE, 255)
    drawPG_text(pgs, 310, 320, '(リスト長を求める)', 32, MIDNIGHTBLUE, 255)

    this.i04_arrowRight1 = getPG_bigArrowR(200, 120, 60, 30, TRANSPARENT, 10, 255, WETASPHALT, 255, false,
    30, 70, '返り値', 32, WHITE, 255)
    this.i04_arrowRight2 = getPG_bigArrowR(200, 120, 60, 30, TRANSPARENT, 10, 255, POMEGRANATE, 255, false,
    30, 70, '返り値', 32, WHITE, 255)
    drawPG_text(pgs, 645, 270, '出力', 32, MIDNIGHTBLUE, 255)

    let text1 = `>>> a = len(['a', 'b', 'c'])
>>> print(a)
3
>>>`

    let columns = 35
    let rows = 5
    let title = 'Python Interpriter'
    let titleX = Python_editor.get_titleX(title, 20, columns)
    this.i04_editor1 = Python_editor.get_Font20(text1, columns, rows, titleX + 10, title, false)

    this.i04_pgb = pgb
    this.i04_pgs = pgs
  }

  static getDrawPG_image04(){
    let pgb = this.i04_pgb
    pgb.clear()
    pgb.background(255)
    pgb.image(this.i04_pgs, 0, 0)

    let count = frameCount % 500

    stayPG_corner(pgb, this.i04_arrowLeft1, 100, 65, count, 0, 100)
    stayPG_corner(pgb, this.i04_arrowLeft2, 100, 65, count, 100, 200)
    stayPG_corner(pgb, this.i04_arrowLeft1, 100, 65, count, 200, 500)

    stayPG_corner(pgb, this.i04_rect1, 350, 50, count, 0, 250)
    stayPG_corner(pgb, this.i04_rect2, 350, 50, count, 250, 350)
    stayPG_corner(pgb, this.i04_rect1, 350, 50, count, 350, 500)

    stayPG_corner(pgb, this.i04_arrowRight1, 600, 65, count, 0, 400)
    stayPG_corner(pgb, this.i04_arrowRight2, 600, 65, count, 400, 500)

    let e1 = this.i04_editor1
    if(count == 100){
      // left arrow
      e1.highLight([[[1,1],[13, 27]]])
    }else if(count == 200){
      e1.unhighLight()
    }else if(count == 250){
      // center box
      e1.highLight([[[1,1],[9, 12]], [[1,1],[28, 28]]])
    }else if(count == 350){
      e1.unhighLight()
    }else if(count == 400){
      // right arrow
      e1.highLight([[[1,1],[5, 8]]])
    }else if(count == 499){
      e1.unhighLight()
    }
    pgb.image(e1.getPG(), 150, 400)

    drawPG_textAtFrame(pgb, 600, 455, '引数', 32, POMEGRANATE, 255, count, 100, 200)
    drawPG_textAtFrame(pgb, 600, 455, '関数', 32, POMEGRANATE, 255, count, 250, 350)
    drawPG_textAtFrame(pgb, 600, 455, '返り値', 32, POMEGRANATE, 255, count, 400, 500)

    //savePG(pgb, 'image4_', 0, 499)

    return pgb
  }

  /**
  * Image 05
  **/

  static setup_image05(){
    this.i05_pgb = createGraphics(600, 620)

    this.i05_cons = Python_console.get500_300()

    this.i05_list1 = Python.getPG_list(75, 75, MIDNIGHTBLUE, 2, BELIZEHOLE, [28, 28, 28], 47, ['1', '2', '3'], 32, WHITE)
    this.i05_list2 = Python.getPG_list(75, 75, MIDNIGHTBLUE, 2, BELIZEHOLE, [28, 28, 28, 28], 47, ['1', '2', '3', '4'], 32, WHITE)

    let pgs = createGraphics(this.i05_pgb.width, this.i05_pgb.height)
    pgs.clear()
    pgs.background(255)
    drawPG_text(pgs, 50, 447, 'index', 32, MIDNIGHTBLUE, 255)
    let indexPG = Python.getPG_list(75, 75, TRANSPARENT, 0, TRANSPARENT, [28, 28, 28, 28], 47, ['0', '1', '2', '3'], 32, MIDNIGHTBLUE)
    pgs.image(indexPG, 200, 400)
    drawPG_text(pgs, 50, 547, 'list', 32, MIDNIGHTBLUE, 255)
    this.i05_pgs = pgs
  }

  static getDrawPG_image05(){
    let pgb = this.i05_pgb
    pgb.clear()
    pgb.background(255)
    pgb.image(this.i05_pgs, 0, 0)

    let count = frameCount % 1600

    let cons = this.i05_cons
    cons.command("a = [1, 2, 3]", '', count, 100, 200)
    cons.command("print(a)", '[1, 2, 3]', count, 300, 400)
    cons.command('a.append(4)', "", count, 500, 600)
    cons.command('print(a)', "[1, 2, 3, 4]", count, 700, 800)
    cons.command('b = a.pop()', "", count, 900, 1000)
    cons.command("print(b)", '4', count, 1100, 1200)
    cons.command("print(a)", "[1, 2, 3]", count, 1300, 1400)
    cons.flush(count, 1599)
    pgb.image(cons.getPG(count), 50, 50)

    // list
    stayPG_corner(pgb, this.i05_list1, 200, 500, count, 200, 600)
    stayPG_corner(pgb, this.i05_list2, 200, 500, count, 600, 1000)
    stayPG_corner(pgb, this.i05_list1, 200, 500, count, 1000, 1600)

    //savePG(pgb, 'image5_', 0, 1599)

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
