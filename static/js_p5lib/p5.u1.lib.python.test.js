class LibPythonTest{

  static preload(){
    main_width = 1200
    main_height = 900
    main_guiDebug = false
    main_loglevel = LOGLEVEL_INFO

    main_drawGrid = false

    lib_python_preload()
  }

  static setup(){
    this.pgb = createGraphics(width, height)
    this.setup_console()
    this.setup_editor()
  }

  static getDrawPG(){
    switch(2){
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
  }

  static getDrawPG_console(){
    this.pgb.clear()
    this.pgb.background(255)

    let count = frameCount % 800
    this.console.command('1 + 1', '2', count, 100, 150)
    this.console.command("print('hello\\nworld')", 'hello\nworld', count, 200, 300)
    this.console.command('2 + 3', '5', count, 350, 400)
    this.console.command('a = 13', '', count, 450, 500)
    this.console.command('a', '13', count, 550, 600)
    this.console.command('a + 5', '18', count, 650, 700)
    this.console.flush(count, 799)

    let pg = this.console.getPG(count)
    this.pgb.image(pg, 100, 100)
    return this.pgb
  }


  /*
  * Editor
  */

  static setup_editor(){
    /*
    let text = `print('hello00')
print('world')`
*/
  let text = `import os

def list_file(path, indent_level):
  # show directory name
  print('{}[{}]'.format(' ' * indent_level, path))

  for file_name in os.listdir(path):
    if file_name.startswith('.'):
      continue
    abs_filepath = path + '/' + file_name
    if os.path.isdir(abs_filepath):
      list_file(abs_filepath, indent_level + 1)
    else:
      print('{}- {}'.format(' ' * indent_level, file_name))

list_file('/python', 0)`

    //this.editor = Python_editor.get_Font20_W30_H10(text)
    let [columns, rows] = Python_editor.get_columnsRows(text)
    console.log(columns)
    console.log(rows)
    let title = 'Python Language'
    let titleX = Python_editor.get_titleX(title, 18, columns + 3)
    this.editor = Python_editor.get_Font18(text, columns + 3, rows, titleX, title, false)

    //this.editor = Python_editor.get_Font16_W50_H30(text)

    //let m = new Map()
    //m.set([1,1], [1,100])
    //this.editor.highLight(m)
  }

  static getDrawPG_editor(){
    this.pgb.clear()
    this.pgb.background(255)

    let pg = this.editor.getPG()
    this.pgb.image(pg, 50, 50)

    return this.pgb
  }
}
