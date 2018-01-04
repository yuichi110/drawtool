class Web_python01_index{

  static preload(){
    main_width = 800
    main_height = 800
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO
    main_background = 0

    this.save = false

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
    let pgb = createGraphics(600, 700)

    let pgs = createGraphics(pgb.width, pgb.height)
    drawPG_text(pgs, 50, 447, 'index', 32, BLACK, 255)
    let indexPG = Python.getPG_list(75, 75, TRANSPARENT, 0, TRANSPARENT, [28, 28, 28], 47, ['0', '1', '2'], 32, BLACK)
    pgs.image(indexPG, 200, 400)
    drawPG_text(pgs, 50, 547, 'list', 32, BLACK, 255)
    drawPG_text(pgs, 50, 647, 'result', 32, BLACK, 255)


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

    let list1 = Python.getPG_list(75, 75, BLACK, 2, BELIZEHOLE, [28, 20], 47, ['a', 'bc'], 32, WHITE)
    let list2 = Python.getPG_list(75, 75, BLACK, 2, BELIZEHOLE, [28, 20, 28], 47, ['a', 'bc', 'd'], 32, WHITE)
    let list3 = Python.getPG_list(75, 75, BLACK, 2, BELIZEHOLE, [20, 20], 47, ['hi', 'bc'], 32, WHITE)

    let result1 = getPG_text(500, 75, 28, 30, "'d'", 32, BLACK, 255)
    let result2 = getPG_text(500, 75, 28, 30, "['a', 'bc']", 32, BLACK, 255)
    let result3 = getPG_text(500, 75, 28, 30, "'bc'", 32, BLACK, 255)

    let redRect = getPG_rect(78, 175, 0, POMEGRANATE, 5, 255)

    this.i01_pgb = pgb
    this.i01_pgs = pgs
    this.i01_console = cons
    this.i01_last = last
    this.i01_list1 = list1
    this.i01_list2 = list2
    this.i01_list3 = list3
    this.i01_result1 = result1
    this.i01_result2 = result2
    this.i01_result3 = result3
    this.i01_redRect = redRect
  }

  static getDrawPG_image01(){
    let pgb = this.i01_pgb
    let pgs = this.i01_pgs
    let cons = this.i01_console
    let last = this.i01_last
    let list1 = this.i01_list1
    let list2 = this.i01_list2
    let list3 = this.i01_list3
    let result1 = this.i01_result1
    let result2 = this.i01_result2
    let result3 = this.i01_result3
    let redRect = this.i01_redRect

    pgb.clear()
    pgb.background(255)
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
