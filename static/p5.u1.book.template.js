class Book_Template{

  static preload(){
    main_width = 800
    main_height = 800
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
    this.i01_pgb = pgb
  }

  static getDrawPG_image01(){
    let pgb = this.i01_pgb
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
