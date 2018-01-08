class LibPresentationTest{

  static preload(){
    main_width = 1200
    main_height = 900
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO

    main_drawGrid = false

    lib_presentation_preload()
  }

  static setup(){
    this.setup_enum()
  }

  static getDrawPG(){
    switch(1){
      case 1:
        return this.getDrawPG_enum();
    }
  }

  static setup_enum(){
    this.pgb_enum = createGraphics(width, height)
    let x = 50
    for(let fontSize of [28, 26, 24, 22, 20, 18]){
      let pe = new Presentation_enum(false, fontSize, true, fontSize, MIDNIGHTBLUE)
      pe.push1('hello')
      pe.push1('world')
      pe.push2('test1')
      pe.push2('test2')
      pe.push1('あいうえお')
      pe.drawPG(this.pgb_enum, x, 50)
      x += 200
    }

  }

  static getDrawPG_enum(){
    return this.pgb_enum
  }
}
