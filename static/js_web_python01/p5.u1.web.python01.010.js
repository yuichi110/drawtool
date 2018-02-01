class Web_python01_010{

  static preload(){
    main_width = 2000
    main_height = 2000
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO
    main_background = 0

    lib_python_preload()

    this.image_man = getPG_image('man3', 320, 320)
    this.image_robot = getPG_image('man_robot', 320, 320)
    this.image_code = getPG_image('code', 320, 320)
    this.image_python = getPG_image('lang_python1', 320, 320)

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
    let imageNumber = 2
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
    this.i01_pgb = createGraphics(1100, 450)
    this.i01_pgs = createGraphics(this.i01_pgb.width, this.i01_pgb.height)
    this.i01_pgs.clear()
    this.i01_pgs.background(255)

    this.i01_pgs.image(this.image_man, 50, 50)
    drawPG_text(this.i01_pgs, 120, 380, 'プログラマ', 36, MIDNIGHTBLUE, 255)
    this.i01_pgs.image(this.image_python, 700, 60)

    this.i01_arrowR = getPG_bigArrowR(300, 120, 60, 30, TRANSPARENT, 10, 255, WETASPHALT, 255)
    this.i01_text1 = createGraphics(200, 100)
    drawPG_text(this.i01_text1, 20, 80, '1 + 1', 48, MIDNIGHTBLUE, 255)

    this.i01_arrowL = getPG_bigArrowL(300, 120, 60, 30, TRANSPARENT, 10, 255, WETASPHALT, 255)
    this.i01_text2 = createGraphics(200, 100)
    drawPG_text(this.i01_text2, 20, 80, '2', 48, MIDNIGHTBLUE, 255)
  }

  static getDrawPG_image01(){
    this.i01_pgb.clear()
    this.i01_pgb.image(this.i01_pgs, 0, 0)

    let count = frameCount % 300
    stayPG_corner(this.i01_pgb, this.i01_arrowR, 370, 180, count, 50, 150)
    stayPG_corner(this.i01_pgb, this.i01_text1, 420, 80, count, 50, 150)

    stayPG_corner(this.i01_pgb, this.i01_arrowL, 370, 180, count, 200, 300)
    stayPG_corner(this.i01_pgb, this.i01_text2, 500, 80, count, 200, 300)

    //savePG(this.i01_pgb, 'image1_', 0, 299)

    return this.i01_pgb
  }

  /**
  * Image 02
  **/

  static setup_image02(){
    this.i02_pgb = createGraphics(950, 400)
    this.i02_console = Python_console.get500_300()

    this.i02_text1 = createGraphics(300, 100)
    drawPG_text(this.i02_text1, 20, 80, 'ユーザー入力', 28, MIDNIGHTBLUE, 255)

    this.i02_text2 = createGraphics(300, 100)
    drawPG_text(this.i02_text2, 20, 80, 'Pythonの処理と応答', 28, MIDNIGHTBLUE, 255)
  }

  static getDrawPG_image02(){
    this.i02_pgb.clear()
    this.i02_pgb.background(255)

    let count = frameCount % 350
    this.i02_console.command('1 + 1', '2', count, 50, 100)
    this.i02_console.command("'hello' + ' python'", 'hello python', count, 150, 250)
    this.i02_console.flush(count, 349)

    let x = 600
    let y = 130
    stayPG_corner(this.i02_pgb, this.i02_text1, x, y, count, 50, 99)
    stayPG_corner(this.i02_pgb, this.i02_text2, x, y, count, 100, 149)
    stayPG_corner(this.i02_pgb, this.i02_text1, x, y, count, 150, 249)
    stayPG_corner(this.i02_pgb, this.i02_text2, x, y, count, 250, 299)

    let pg = this.i02_console.getPG(count)
    this.i02_pgb.image(pg, 50, 50)

    //savePG(this.i02_pgb, 'image2_', 0, 349)

    return this.i02_pgb
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
