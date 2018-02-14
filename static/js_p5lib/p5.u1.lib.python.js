function lib_python_preload(){
  if(_lib_python_preload){
    return
  }
  _lib_python_preload = true
  lib_common_preload()
}
let _lib_python_preload = false

class Python{
  static getPG_list(width_, height_, sColor, sWeight, fColor,
    txArray, ty, textArray, tSize, tColor){

    let len = textArray.length
    let widthArray = getArray(len, width_)
    let alphaArray = getArray(len, 255)
    let fcArray = getArray(len, fColor)
    let tcArray = getArray(len, tColor)

    let pg = getPG_horizontalRects(widthArray, height_,
                                   sColor, sWeight, 255,
                                   fcArray, alphaArray,
                                   txArray, ty , textArray,
                                   tSize, tcArray, alphaArray);

    return pg
  }
}

/*
* Output Console
*/

class Python_output{
  static get500_200(){
    return new Python_output(500, 170, 3, 180, 'Console Output',
    20, 25, 5)
  }

  static get500_300(){
    return new Python_output(500, 270, 3, 180, 'Console Output',
    20, 25, 5)
  }

  constructor(width_, height_, typeSpeed, titleX, title,
    fontSize, lineHeight, paddingBottom){
    this.backgroundColor = MIDNIGHTBLUE
    this.textColor = CLOUDS

    this.typeSpeed = typeSpeed
    this.fontSize = fontSize
    this.font = 'mp1m'
    this.lineHeight = lineHeight
    this.paddingBottom = paddingBottom

    this.inputPrompt = '$ '
    this.consoleString = this.inputPrompt
    this.state = 0
    // 0 : after flush
    // 1 : inputting
    // 2 : waiting enter
    // 3 : repeat output

    this.previousLines = []

    this.pgb = createGraphics(width_ + 5, height_ + 35)
    this.pgw = createGraphics(width_ + 5, height_ + 35)
    this.pg = createGraphics(width_, height_)

    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, SILVER, 255)
    this.pgw.rect(0, 0, width_, 50, 10)
    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, POMEGRANATE, 255)
    this.pgw.ellipse(20, 15, 15, 15)
    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, SUNFLOWER, 255)
    this.pgw.ellipse(40, 15, 15, 15)
    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, NEPHRITIS, 255)
    this.pgw.ellipse(60, 15, 15, 15)
    drawPG_text(this.pgw, titleX, 22, title, 20, MIDNIGHTBLUE, 255, 'mp1p')

    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, MIDNIGHTBLUE, 255)
    this.pgw.rect(0, height_, width_, 30, 10)
    this.pgw.rect(0, 30, width_, height_ - 15, 0)

    this.needsRedraw = true
  }

  // flush and make state to 0
  flush(count, start){
    if(count != start){
      return
    }

    this.state = 0
    this.consoleString = this.inputPrompt
    this.needsRedraw = true
  }

  // Called at STATE 0
  input(inputString, count, startInputCount, startEnterCount){
    if(count != startInputCount){
      return
    }

    this.state = 1
    this.inputBuffer = inputString
    this.enterCount = startEnterCount
  }

  // STATE 1
  _input(){
    if(this.inputBuffer.length == 0){
      // move to "wait till output time"
      this.state = 2
      return
    }
    if(frameCount % this.typeSpeed != 0){
      // wait for next char
      return
    }

    this.consoleString += this.inputBuffer.charAt(0)
    this.inputBuffer = this.inputBuffer.slice(1)
    this.needsRedraw = true
  }

  // STATE2
  _waitEnter(count){
    if(count >= this.enterCount){
      // move to "output state"
      this.consoleString += '\n'
      this.state = 3
    }else{
      // waitting
    }
  }

  // called at STATE 3
  output(outputString, count, outputCount){
    if(count != outputCount){
      return
    }
    if(this.state == 0){
      console.error('issuing command is too fast. Input is not yet called.')
      return
    }
    if(this.state != 3){
      console.error('issuing command is too fast. Input is not yet finished.')
      return
    }

    this.consoleString += outputString
    this.needsRedraw = true
  }

  getPG(count){
    switch(this.state){
      case 0:
        // do nothing
        break;
      case 1:
        this._input();
        break;
      case 2:
        this._waitEnter(count);
        break;
      case 3:
        // do nothing
        break;
      default:
        console.error('Error')
    }

    if(this.needsRedraw){
      this.pg.clear()

      let textHeight = this.lineHeight
      let lines = this.consoleString.split('\n')
      for(let line of lines){
        drawPG_text(this.pg, 10, textHeight, line, this.fontSize, CLOUDS, 255, this.font)
        textHeight += this.lineHeight
      }

      this.needsRedraw = false
    }

    this.pgb.clear()
    this.pgb.image(this.pgw, 0, 0)
    this.pgb.image(this.pg, 0, 30)

    return this.pgb
  }
}


/*
* Editor
*/

class Python_editor{

  static get_columnsRows(text){
    let columns = 0
    let lines = text.split('\n')
    let rows = lines.length

    for(let line of lines){
      let length = line.length
      if(columns < length){
        columns = length
      }
    }

    return [columns, rows]
  }

  static get_titleX(title, fontSize, columns){
    let charWidth = 9
    switch(fontSize){
      case 12:
        charWidth = 7
        break
      case 14:
        charWidth = 8
        break
      case 16:
        charWidth = 9
        break
      case 18:
        charWidth = 10
        break
      case 20:
        charWidth = 11
        break
      default:
        console.error('fontSize is not in [12, 14, 16, 18, 20]. Set default width 9.')
    }

    // title is propotional.
    // column is monosize. little bit wider than propotional
    let len = (columns - (title.length * 0.8))/2
    return len * charWidth
  }


  static get_Font12(text, columns, rows, titleX=0, title='', showLineNumber=true){
    let fontSize = 12
    let charBoxWidth = 7
    let charBoxHeight = 14
    let charBoxX = 2
    let charBoxY = 11
    let lineNumberWidth = 20
    if(!showLineNumber){
      lineNumberWidth = 0
    }

    return new Python_editor(columns, rows, titleX, title, text,
      fontSize, charBoxWidth, charBoxHeight, charBoxX, charBoxY, lineNumberWidth)
  }

  static get_Font14(text, columns, rows, titleX=0, title='', showLineNumber=true){
    let fontSize = 14
    let charBoxWidth = 8
    let charBoxHeight = 16
    let charBoxX = 2
    let charBoxY = 13
    let lineNumberWidth = 25
    if(!showLineNumber){
      lineNumberWidth = 0
    }

    return new Python_editor(columns, rows, titleX, title, text,
      fontSize, charBoxWidth, charBoxHeight, charBoxX, charBoxY, lineNumberWidth)
  }

  static get_Font16(text, columns, rows, titleX=0, title='', showLineNumber=true){
    let fontSize = 16
    let charBoxWidth = 9
    let charBoxHeight = 20
    let charBoxX = 2
    let charBoxY = 16
    let lineNumberWidth = 30
    if(!showLineNumber){
      lineNumberWidth = 0
    }

    return new Python_editor(columns, rows, titleX, title, text,
      fontSize, charBoxWidth, charBoxHeight, charBoxX, charBoxY, lineNumberWidth)
  }

  static get_Font18(text, columns, rows, titleX=0, title='', showLineNumber=true){
    let fontSize = 18
    let charBoxWidth = 10
    let charBoxHeight = 22.5
    let charBoxX = 3
    let charBoxY = 18
    let lineNumberWidth = 35
    if(!showLineNumber){
      lineNumberWidth = 0
    }

    return new Python_editor(columns, rows, titleX, title, text,
      fontSize, charBoxWidth, charBoxHeight, charBoxX, charBoxY, lineNumberWidth)
  }

  static get_Font20(text, columns, rows, titleX=0, title='', showLineNumber=true){
    let fontSize = 20
    let charBoxWidth = 11
    let charBoxHeight = 25
    let charBoxX = 3
    let charBoxY = 20
    let lineNumberWidth = 40
    if(!showLineNumber){
      lineNumberWidth = 0
    }

    return new Python_editor(columns, rows, titleX, title, text,
      fontSize, charBoxWidth, charBoxHeight, charBoxX, charBoxY, lineNumberWidth)
  }

  constructor(columns, rows, titleX, title, text,
  fontSize, charBoxWidth, charBoxHeight, charBoxX, charBoxY, lineNumberWidth){

    this.backgroundColor = MIDNIGHTBLUE
    this.textColor = CLOUDS
    this.highLightBackgroundColor = MIDNIGHTBLUE
    this.highLightTextColor = CLOUDS

    this.fontSize = fontSize
    this.font = 'mp1m'
    this.charBoxWidth = charBoxWidth
    this.charBoxHeight = charBoxHeight
    this.charBoxX = charBoxX
    this.charBoxY = charBoxY

    if(lineNumberWidth == 0){
      // padding left. But no line Numbers
      this.lineNumberWidth = 5
    }else{
      this.lineNumberWidth = lineNumberWidth
    }


    this.textMap = []
    this.highLightMap = []

    let lines = text.split('\n')
    for(let row=0; row<rows; row++){
      this.textMap.push(getArray(columns, ''))
      this.highLightMap.push(getArray(columns, false))

      if(lines.length - 1 < row){
        continue
        // num of text line is less than row
        // keep pushing ['', '',...] and [false, false,...] for the lines
      }
      for(let column=0; column<columns; column++){
        let line = lines[row]
        if(line.length -1 < column){
          break
          // nothing to do on this line.
          // break and go to next line.
        }
        this.textMap[row][column] = line.charAt(column)
      }
    }

    let width_ = this.charBoxWidth * columns
    let height_ = this.charBoxHeight * rows
    this.pgb = createGraphics(width_ + this.lineNumberWidth + 5, height_ + 35)
    this.pgw = createGraphics(width_ + this.lineNumberWidth + 5, height_ + 35)
    this.pg = createGraphics(width_, height_)
    this.needsRedraw = true

    // make windows top area
    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, SILVER, 255)
    this.pgw.rect(0, 0, width_ + this.lineNumberWidth, 50, 10)
    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, POMEGRANATE, 255)
    this.pgw.ellipse(20, 15, 15, 15)
    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, SUNFLOWER, 255)
    this.pgw.ellipse(40, 15, 15, 15)
    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, NEPHRITIS, 255)
    this.pgw.ellipse(60, 15, 15, 15)
    if(title != ''){
      let titleFontSize = 18
      drawPG_text(this.pgw, titleX, 22, title, titleFontSize, MIDNIGHTBLUE, 255, 'mp1p')
    }

    // make window text area
    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, MIDNIGHTBLUE, 255)
    this.pgw.rect(0, height_, width_ + this.lineNumberWidth, 30, 10)
    this.pgw.rect(0, 30, width_ + this.lineNumberWidth, height_ - 15, 0)

    if(lineNumberWidth != 0){
      // draw line number at text area
      this.pgw.textSize(this.fontSize)
      setPG_font(this.pgw, this.font)
      setPG_style(this.pgw, TRANSPARENT, 0, 0, ASBESTOS, 255)
      for(let row=0; row<rows; row++){
        let lineNum = (row + 1).toString()
        if(lineNum.length == 1){
          lineNum = '0' + lineNum
        }

        let x = this.charBoxX
        let y = 30 + (this.charBoxHeight * row) + this.charBoxY
        this.pgw.text(lineNum, x, y)
      }
    }
  }

  unhighLight(){
    for(let row=0; row<this.highLightMap.length; row++){
      for(let column=0; column<this.highLightMap[row].length; column++){
        this.highLightMap[row][column] = false
      }
    }

    this.needsRedraw = true
  }

  highLight(highlightLocation){
    this.unhighLight()

    for(let [key, value] of highlightLocation){
      let [keyFrom, keyTo] = key
      let [valueFrom, valueTo] = value

      keyFrom -= 1
      keyTo -= 1
      valueFrom -= 1
      valueTo -= 1

      for(let row=0; row<this.highLightMap.length; row++){
        if(row < keyFrom){
          continue
        }
        if(keyTo < row){
          continue
        }

        for(let column=0; column<this.highLightMap[row].length; column++){
          if(column < valueFrom){
            continue
          }
          if(valueTo < column){
            continue
          }
          this.highLightMap[row][column] = true
        }
      }
    }

    this.needsRedraw = true
  }

  getPG(){
    if(this.needsRedraw){
      this.pg.clear()

      // draw highlight background
      setPG_style(this.pg, TRANSPARENT, 0, 0, POMEGRANATE, 255)

      for(let row=0; row<this.highLightMap.length; row++){
        let columns = this.highLightMap[row]
        for(let column=0; column<columns.length; column++){
          if(columns[column]){
            // highlighted
            let x = this.charBoxWidth * column
            let y = this.charBoxHeight * row
            this.pg.rect(x, y, this.charBoxWidth, this.charBoxHeight, 0)
          }else{
            // do nothing. show window background color
          }
        }
      }

      // draw texts
      this.pg.textSize(this.fontSize)
      setPG_font(this.pg, this.font)
      setPG_style(this.pg, TRANSPARENT, 0, 0, this.textColor, 255)

      for(let row=0; row<this.textMap.length; row++){
        let columns = this.textMap[row]
        for(let column=0; column<columns.length; column++){
          let character = columns[column]
          if(character != ''){
            let x = (this.charBoxWidth * column) + this.charBoxX
            let y = (this.charBoxHeight * row) + this.charBoxY
            this.pg.text(character, x, y)
          }
        }
      }

      this.needsRedraw = false
    }else{
      // no update. use previous image
    }

    this.pgb.clear()
    this.pgb.image(this.pgw, 0, 0)
    this.pgb.image(this.pg, this.lineNumberWidth, 30)
    return this.pgb
  }
}


/*
* Console
*/

class Python_console{
  static get500_200(){
    return new Python_console(500, 170, 3, 210, 'python3',
    20, 25, 5)
  }

  static get500_300(){
    return new Python_console(500, 270, 3, 210, 'python3',
    20, 25, 5)
  }

  constructor(width_, height_, typeSpeed, titleX, title,
    fontSize, lineHeight, paddingBottom){
    this.backgroundColor = MIDNIGHTBLUE
    this.textColor = CLOUDS

    this.typeSpeed = typeSpeed
    this.fontSize = fontSize
    this.font = 'mp1m'
    this.lineHeight = lineHeight
    this.paddingBottom = paddingBottom

    this.inputPrompt = '>>> '
    this.inputConsole = this.inputPrompt
    this.inputBuffer = ''
    this.outputString = ''
    this.outputCount = 0
    this.state = 0
    // 0 : wait command
    // 1 : input
    // 2 : wait output
    // 3 : output
    this.previousLines = []

    this.pgb = createGraphics(width_ + 5, height_ + 35)
    this.pgw = createGraphics(width_ + 5, height_ + 35)
    this.pg = createGraphics(width_, height_)

    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, SILVER, 255)
    this.pgw.rect(0, 0, width_, 50, 10)
    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, POMEGRANATE, 255)
    this.pgw.ellipse(20, 15, 15, 15)
    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, SUNFLOWER, 255)
    this.pgw.ellipse(40, 15, 15, 15)
    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, NEPHRITIS, 255)
    this.pgw.ellipse(60, 15, 15, 15)
    drawPG_text(this.pgw, titleX, 22, title, 20, MIDNIGHTBLUE, 255, 'mp1p')

    setPG_style(this.pgw, MIDNIGHTBLUE, 1, 255, MIDNIGHTBLUE, 255)
    this.pgw.rect(0, height_, width_, 30, 10)
    this.pgw.rect(0, 30, width_, height_ - 15, 0)

    this.needsRedraw = true
  }

  command(inputString, outputString, count, inputCount, outputCount){
    if(count != inputCount){
      return
    }
    if(this.state != 0){
      console.error('issuing command is too fast. Last command is not yet finished. Ignore.')
      return
    }

    this.inputBuffer = inputString
    this.outputString = outputString
    this.outputCount = outputCount

    // move to input mode
    this.state = 1
  }

  flush(count, start){
    if(count != start){
      return
    }
    if(this.state != 0){
      console.error('issuing flush is too fast. Last command is not yet finished.')
    }

    this.inputConsole = this.inputPrompt
    this.outputString = ''
    this.outputCount = 0
    this.state = 0
    this.previousLines = []
    this.needsRedraw = true
  }

  getPG(count){
    switch(this.state){
      case 0:
        // do nothing
        break;
      case 1:
        this._input(); break;
      case 2:
        this._waitOutput(count); break;
      case 3:
        this._output(); break;
      default:
        console.error('Error')
    }

    if(this.needsRedraw){
      this.pg.clear()

      // show previous lines
      let lnum = Math.floor((this.pg.height - this.paddingBottom) / this.lineHeight) - 1
      let fromIndex = this.previousLines.length - lnum
      if(fromIndex < 0){
        fromIndex = 0
      }

      let textHeight = this.lineHeight
      let previousShowLines = this.previousLines.slice(fromIndex)
      for(let line of previousShowLines){
        drawPG_text(this.pg, 10, textHeight, line, this.fontSize, CLOUDS, 255, this.font)
        textHeight += this.lineHeight
      }

      // show current line
      drawPG_text(this.pg, 10, textHeight, this.inputConsole, this.fontSize, CLOUDS, 255, this.font)
      this.needsRedraw = false
    }

    this.pgb.clear()
    this.pgb.image(this.pgw, 0, 0)
    this.pgb.image(this.pg, 0, 30)

    return this.pgb
  }

  _input(){
    if(this.inputBuffer.length == 0){
      // move to "wait till output time"
      this.state = 2
      return
    }
    if(frameCount % this.typeSpeed != 0){
      // wait for next char
      return
    }

    this.inputConsole += this.inputBuffer.charAt(0)
    this.inputBuffer = this.inputBuffer.slice(1)
    this.needsRedraw = true
  }

  _waitOutput(count){
    if(count >= this.outputCount){
      // move to "output state"
      this.state = 3
    }else{
      // waitting
    }
  }

  _output(){
    // add previous input and output lines
    this.previousLines.push(this.inputConsole)
    if(this.outputString != ''){
      let olist = this.outputString.split('\n')
      this.previousLines = this.previousLines.concat(olist)
    }

    // initialize console
    this.inputConsole = this.inputPrompt
    this.state = 0
    this.needsRedraw = true
  }
}
