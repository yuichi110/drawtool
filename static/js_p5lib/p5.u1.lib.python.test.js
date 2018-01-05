class LibPythonTest{

  static preload(){
    main_width = 1200
    main_height = 900
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO

    main_drawGrid = true

    lib_python_preload()
  }

  static setup(){
    this.pgb = createGraphics(width, height)
    this.setup_console()
    this.setup_editor()
  }

  static getDrawPG(){
    switch(1){
      case 1:
        return this.getDrawPG_console();
      case 2:
        return this.getDrawPG_editor();
    }
  }

  /*
  * Console
  */

  static setup_console(){
    this.console = Python_console.get500_300()
    this.console.command(100, '1 + 1', 150, '2')
    this.console.command(200, "print('hello\\nworld')", 300, 'hello\nworld')
    this.console.command(350, '2 + 3', 400, '5')
    this.console.command(450, 'a = 13', 500, '')
    this.console.command(550, 'a', 600, '13')
    this.console.command(650, 'a + 5', 700, '18')
    this.console.finish(799)
  }

  static getDrawPG_console(){
    this.pgb.clear()
    this.pgb.background(255)

    let count = frameCount % 800
    let pg = this.console.getPG(count)
    this.pgb.image(pg, 100, 100)

    return this.pgb
  }


  /*
  * Editor
  */

  static setup_editor(){
    let text = `print('hello00')
print('world')`
    //this.editor = Python_editor.get_Font20_W30_H10(text)
    this.editor = Python_editor.get_Font12_W50_H50(text)
    //this.editor = Python_editor.get_Font16_W50_H30(text)

    let m = new Map()
    m.set([1,1], [1,100])
    this.editor.highLight(m)
  }

  static getDrawPG_editor(){
    this.pgb.clear()
    this.pgb.background(255)

    let pg = this.editor.getPG()
    this.pgb.image(pg, 50, 50)

    return this.pgb
  }
}
