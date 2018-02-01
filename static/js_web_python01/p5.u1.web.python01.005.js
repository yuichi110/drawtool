class Web_python01_005{

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
    this.image_java = getPG_image('lang_java', 320, 320)
    this.image_c = getPG_image('lang_c', 320, 320)

    this.image_python2 = getPG_image('lang_python1', 200, 200)
    this.image_java2 = getPG_image('lang_java', 200, 200)
    this.image_c2 = getPG_image('lang_c', 200, 200)
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
    let pgb = createGraphics(1300, 1220)
    let editorColumns = 66
    let fontSize = 28
    let enumX = 800
    let enumY = 100

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

      drawPG_text(this.i01_pg_python, enumX, 80, 'Python', 36, MIDNIGHTBLUE, 255)

      let pe = new Presentation_enum(false, fontSize, false, fontSize, MIDNIGHTBLUE)
      pe.push1('長所')
      pe.push2('簡単で効率的な開発')
      pe.push2('プログラムがOSに依存しない')
      pe.push2('様々な処理に利用できる')
      pe.push1('短所')
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

      drawPG_text(this.i01_pg_java, enumX, 80, 'Java', 36, MIDNIGHTBLUE, 255)

      let pe = new Presentation_enum(false, fontSize, false, fontSize, MIDNIGHTBLUE)
      pe.push1('長所')
      pe.push2('プログラムがOSに依存しない')
      pe.push2('大規模開発に適している')
      pe.push1('短所')
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

      drawPG_text(this.i01_pg_c, enumX, 80, 'C言語', 36, MIDNIGHTBLUE, 255)

      let pe = new Presentation_enum(false, fontSize, false, fontSize, MIDNIGHTBLUE)
      pe.push1('長所')
      pe.push2('処理が高速')
      pe.push2('組み込みに使える')
      pe.push1('短所')
      pe.push2('開発が難しく効率が悪い')
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

    savePG(pgb, 'image1_', 0, 749)

    return pgb
  }

  /**
  * Image 02
  **/

  static setup_image02(){
    let pgb = createGraphics(1070, 670)
    pgb.clear()
    pgb.background(255)


    let balloon1 = getPG_roundedBalloon(
      10, 10, 300, 150,
      BOTTOM, 100, 230, 50, 75,
      MIDNIGHTBLUE, 5, 255, TRANSPARENT, 255)
    pgb.image(balloon1, 50, 50)
    drawPG_text(pgb, 90, 120, 'こんにちは。\nいい天気ですね。', 32, MIDNIGHTBLUE, 255)
    pgb.image(this.image_man, 50, 250)
    drawPG_text(pgb, 110, 600, '人間(自然言語)', 32, MIDNIGHTBLUE, 255)

    let balloon2 = getPG_roundedBalloon(
      10, 10, 300, 150,
      BOTTOM, 200, 230, 225, 250,
      MIDNIGHTBLUE, 5, 255, TRANSPARENT, 255)
    pgb.image(balloon2, 700, 50)
    drawPG_text(pgb, 740, 130, '001000111001\n001010101010', 32, MIDNIGHTBLUE, 255)
    pgb.image(this.image_robot, 700, 260)
    drawPG_text(pgb, 700, 600, '機械(電気信号=2進数)', 32, MIDNIGHTBLUE, 255)


    let arrow = getPG_bigArrowR(300, 120, 60, 30, TRANSPARENT, 10, 255, WETASPHALT, 255, true)
    pgb.image(arrow, 360, 300)
    let pg = createGraphics(150, 150)
    setPG_style(pg, POMEGRANATE, 15, 255, TRANSPARENT, 0)
    pg.ellipse(75, 75, 120, 120)
    pg.line(35, 35, 115, 115)
    pgb.image(pg, 435, 285)
    drawPG_text(pgb, 360, 470, 'お互いに言葉が通じない', 28, POMEGRANATE, 255)

    this.i02_pgb = pgb
  }

  static getDrawPG_image02(){
    let pgb = this.i02_pgb

    savePG(pgb, 'image2_', 100, 100)

    return pgb
  }

  /**
  * Image 03
  **/

  static setup_image03(){
    let pgb = createGraphics(1320, 700)
    pgb.clear()
    pgb.background(255)

    let balloon1 = getPG_roundedBalloon(
      10, 10, 300, 150,
      BOTTOM, 100, 230, 50, 75,
      MIDNIGHTBLUE, 5, 255, TRANSPARENT, 255)
    pgb.image(balloon1, 50, 50)
    drawPG_text(pgb, 115, 120, '「Hello」と\n表示させたい', 32, MIDNIGHTBLUE, 255)
    pgb.image(this.image_man, 50, 250)
    drawPG_text(pgb, 70, 600, '人間(自然言語の思考)', 32, MIDNIGHTBLUE, 255)

    let arrow = getPG_bigArrowR(150, 120, 60, 30, TRANSPARENT, 10, 255, WETASPHALT, 255, false)
    pgb.image(arrow, 360, 300)
    drawPG_text(pgb, 375, 370, 'WRITE', 32, WHITE, 255)
    pgb.image(this.image_code, 500, 200)
    drawPG_text(pgb, 572, 365, "print('Hello')", 28, ALIZARIN, 255)
    drawPG_text(pgb, 510, 600, 'プログラミング言語', 32, MIDNIGHTBLUE, 255)
    drawPG_text(pgb, 480, 650, '(人間と機械の中間言語)', 32, MIDNIGHTBLUE, 255)
    pgb.image(arrow, 820, 300)
    drawPG_text(pgb, 845, 370, 'READ', 32, WHITE, 255)


    let balloon2 = getPG_roundedBalloon(
      10, 10, 300, 150,
      BOTTOM, 200, 230, 225, 250,
      MIDNIGHTBLUE, 5, 255, TRANSPARENT, 255)
    pgb.image(balloon2, 950, 50)
    drawPG_text(pgb, 990, 130, '101101101011\n011000111011', 32, MIDNIGHTBLUE, 255)
    pgb.image(this.image_robot, 950, 260)
    drawPG_text(pgb, 950, 600, '機械(2進数での実行)', 32, MIDNIGHTBLUE, 255)
    let rectHello = getPG_rect(120, 80, 0, MIDNIGHTBLUE, 10, 255, WHITE, 255,
      15, 55, 'Hello', 36, ALIZARIN, 255)
    pgb.image(rectHello, 1055, 400)

    this.i03_pgb = pgb
  }

  static getDrawPG_image03(){
    let pgb = this.i03_pgb

    savePG(pgb, 'image3_', 100, 100)

    return pgb
  }

  /**
  * Image 04
  **/

  static setup_image04(){
    let pgb = createGraphics(1200, 650)
    pgb.clear()
    pgb.background(255)

    pgb.image(this.image_java, 50, 80)
    drawPG_text(pgb, 95, 480, '覚えることが多い', 32, MIDNIGHTBLUE, 255)

    pgb.image(this.image_python, 450, 80)
    drawPG_text(pgb, 510, 480, '簡単で汎用的', 32, MIDNIGHTBLUE, 255)
    let rectHello = getPG_rect(350, 480, 10, ALIZARIN, 10, 255)
    drawPG_text(pgb, 510, 600, '初心者向け', 40, ALIZARIN, 255)
    pgb.image(rectHello, 430, 50)

    pgb.image(this.image_c, 850, 80)
    drawPG_text(pgb, 915, 480, '難しく非効率', 32, MIDNIGHTBLUE, 255)

    this.i04_pgb = pgb
  }

  static getDrawPG_image04(){
    let pgb = this.i04_pgb

    savePG(pgb, 'image4_', 100, 100)

    return pgb
  }

  /**
  * Image 05
  **/

  static setup_image05(){
    let pgb = createGraphics(1580, 650)

    pgb.clear()
    pgb.background(255)

    let balloon1 = getPG_roundedBalloon(
      10, 10, 300, 150,
      BOTTOM, 100, 230, 50, 75,
      MIDNIGHTBLUE, 5, 255, TRANSPARENT, 255)
    pgb.image(balloon1, 50, 50)
    drawPG_text(pgb, 90, 120, 'こんにちは。\nいい天気ですね。', 32, MIDNIGHTBLUE, 255)
    pgb.image(this.image_man, 50, 250)
    drawPG_text(pgb, 110, 600, '人間(自然言語)', 32, MIDNIGHTBLUE, 255)

    let arrow = getPG_bigArrowR(780, 120, 60, 30, TRANSPARENT, 10, 255, WETASPHALT, 255, true)
    pgb.image(arrow, 400, 180)

    pgb.image(this.image_python2, 450, 300)
    drawPG_text(pgb, 450, 560, '人間に近い', 40, POMEGRANATE, 255)

    pgb.image(this.image_java2, 700, 300)
    drawPG_text(pgb, 760, 560, '中間', 40, POMEGRANATE, 255)

    pgb.image(this.image_c2, 950, 300)
    drawPG_text(pgb, 960, 560, '機械に近い', 40, POMEGRANATE, 255)

    drawPG_text(pgb, 550, 180, 'プログラミング言語の位置', 40, POMEGRANATE, 255)



    let balloon2 = getPG_roundedBalloon(
      10, 10, 300, 150,
      BOTTOM, 200, 230, 225, 250,
      MIDNIGHTBLUE, 5, 255, TRANSPARENT, 255)
    pgb.image(balloon2, 1200, 50)
    drawPG_text(pgb, 1240, 130, '001000111001\n001010101010', 32, MIDNIGHTBLUE, 255)
    pgb.image(this.image_robot, 1200, 260)
    drawPG_text(pgb, 1200, 600, '機械(電気信号=2進数)', 32, MIDNIGHTBLUE, 255)

    this.i05_pgb = pgb
  }

  static getDrawPG_image05(){
    let pgb = this.i05_pgb

    savePG(pgb, 'image4_', 100, 100)

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
