class Web_python01_005{

  static preload(){
    main_width = 2000
    main_height = 2000
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
    let pgb = createGraphics(1300, 1300)
    let editorColumns = 66
    let fontSize = 28
    let enumX = 800
    let enumY = 50

    {
      this.i01_pg_python = createGraphics(pgb.width, pgb.height)
      let code = `import os

def list_file(path, indent_level):
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

      let [columns, rows] = Python_editor.get_columnsRows(code)
      let title = 'Python Language'
      let titleX = Python_editor.get_titleX(title, 18, editorColumns)
      let editor = Python_editor.get_Font18(code, editorColumns, rows, titleX, title, true)
      let pg = editor.getPG()
      this.i01_pg_python.image(pg, 50, 50)

      let pe = new Presentation_enum(false, fontSize, false, fontSize, MIDNIGHTBLUE)
      pe.push1('Pythonの長所')
      pe.push2('普及している')
      pe.push2('簡単ですぐに覚えられる')
      pe.push2('OSを問わずに使える')
      pe.push2('様々な処理に利用できる')
      pe.push1('Pythonの短所')
      pe.push2('実行速度が遅い')
      pe.drawPG(this.i01_pg_python, enumX, enumY)
    }

    {
      this.i01_pg_java = createGraphics(pgb.width, pgb.height)
      let code = `import java.io.File;

public class Main {

  public static void main(String[] args){
    Main m = new Main();
    m.listFile("/python", 0);
  }

  public void printIndent(int indentLevel){
    for(int i=0; i<indentLevel; i++){
      System.out.print("  ");
    }
  }

  public void listFile(String dirPath, int indentLevel){
    printIndent(indentLevel);
    System.out.printf("[%s]\\n", dirPath);

    File dir = new File(dirPath);
    File files[] = dir.listFiles();
    for(int i=0; i<files.length; i++){
      if(files[i].getName().startsWith(".")) continue;

      if(files[i].isDirectory()){
        listFile(files[i].getAbsolutePath(), indentLevel + 1);
      }else{
        printIndent(indentLevel);
        System.out.printf("- %s\\n", files[i].getName());
      }
    }
  }
}`

      let [columns, rows] = Python_editor.get_columnsRows(code)
      let title = 'Java Language'
      let titleX = Python_editor.get_titleX(title, 18, editorColumns)
      let editor = Python_editor.get_Font18(code, editorColumns, rows, titleX, title, true)
      let pg = editor.getPG()
      this.i01_pg_java.image(pg, 50, 50)

      let pe = new Presentation_enum(false, fontSize, false, fontSize, MIDNIGHTBLUE)
      pe.push1('Javaの長所')
      pe.push2('普及している')
      pe.push2('OSを問わずに使える')
      pe.push1('Javaの短所')
      pe.push2('覚えることが多い')
      pe.drawPG(this.i01_pg_java, enumX, enumY)
    }

    {
      this.i01_pg_c = createGraphics(pgb.width, pgb.height)
      let code = `#include <stdio.h>
#include <unistd.h>
#include <dirent.h>
#include <sys/stat.h>
#include <string.h>

void printIndent(int indentLevel);
void listFile(char path[], int indentLevel);

int main(int argc, const char * argv[]) {
  listFile("/python", 0);
  return 0;
}

void printIndent(int indentLevel){
  int i;
  for(i=0; i<indentLevel; i++){
    printf("  ");
  }
}

void listFile(char dirPath[], int indentLevel){
  DIR *dir;
  struct dirent *dp;
  int i=0;
  struct stat stat_buf;

  printIndent(indentLevel);
  printf("[%s]\\n", dirPath);

  dir = opendir(dirPath);
  for(i = 0; NULL != (dp=readdir(dir)); i++){
    const char* fileName = dp->d_name;
    if('.' == fileName[0]) continue;

    char cp[512];
    strcpy(cp, dirPath);
    strcat(cp, "/");
    strcat(cp, fileName);
    stat(cp, &stat_buf);
    if(S_ISDIR(stat_buf.st_mode)){
      listFile(cp, indentLevel + 1);
    }else{
      printIndent(indentLevel);
      printf("- %s\\n", fileName);
    }
  }
  closedir(dir);
}`

      let [columns, rows] = Python_editor.get_columnsRows(code)
      let title = 'C Language'
      let titleX = Python_editor.get_titleX(title, 18, editorColumns)
      let editor = Python_editor.get_Font18(code, editorColumns, rows, titleX, title, true)
      let pg = editor.getPG()
      this.i01_pg_c.image(pg, 50, 50)

      let pe = new Presentation_enum(false, fontSize, false, fontSize, MIDNIGHTBLUE)
      pe.push1('C言語の長所')
      pe.push2('普及している')
      pe.push2('処理が高速')
      pe.push2('組み込みに使える')
      pe.push1('C言語の短所')
      pe.push2('難しく開発に時間を要する')
      pe.push2('プログラムがOSに依存')
      pe.push2('利用用途が限られる')
      pe.drawPG(this.i01_pg_c, enumX, enumY)
    }

    this.i01_pgb = pgb
  }

  static getDrawPG_image01(){
    let pgb = this.i01_pgb
    pgb.clear()
    pgb.background(255)

    let count = frameCount % 750
    if(count < 250){
      pgb.image(this.i01_pg_python, 0, 0)
    }else if(count < 500){
      pgb.image(this.i01_pg_java, 0, 0)
    }else{
      pgb.image(this.i01_pg_c, 0, 0)
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
