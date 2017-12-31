class LibPythonTest{

  static preload(){
    main_width = 1200
    main_height = 900
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO

    lib_python_preload()
  }

  static setup(){
    this.pgb = createGraphics(width, height)

    this.console = Python_console.get500_300()
    this.console.command(100, '1 + 1', 150, '2')
    this.console.command(200, "print('hello\\nworld')", 300, 'hello\nworld')
    this.console.command(350, '2 + 3', 400, '5')
    this.console.command(450, 'a = 13', 500, '')
    this.console.command(550, 'a', 600, '13')
    this.console.command(650, 'a + 5', 700, '18')
    this.console.finish(799)

  }

  static getDrawPG(){
    this.pgb.clear()
    this.pgb.background(255)

    let count = frameCount % 800
    let pg = this.console.getPG(count)
    this.pgb.image(pg, 100, 100)

    return this.pgb
  }
}
