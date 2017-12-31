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

class Python_console{
  static get500_200(){
    return new Python_console(500, 170, 3, 210, 'python3')
  }

  static get500_300(){
    return new Python_console(500, 270, 3, 210, 'python3')
  }

  constructor(width_, height_, typeSpeed, titleX, title){
    this.backgroundColor = MIDNIGHTBLUE
    this.textColor = CLOUDS

    this.typeSpeed = typeSpeed
    this.fontSize = 20
    this.font = 'mp1m'
    this.lineHeight = 25
    this.paddingBottom = 5

    this.input = '>>> '
    this.previousLines = []

    this.waitList1 = []
    this.inputList = []
    this.waitList2 = []
    this.outputList = []

    this.waitList1_ = []
    this.inputList_ = []
    this.waitList2_ = []
    this.outputList_ = []

    this.index = 0
    this.state = 0
    this.finishCount = 10000
    // 0 : wait1
    // 1 : input
    // 2 : wait2
    // 3 : output
    // 4 : end

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


  }

  command(wait1, input, wait2, output){
    this.waitList1_.push(wait1)
    this.inputList_.push(input)
    this.waitList2_.push(wait2)
    this.outputList_.push(output)
  }

  finish(i){
    this.finishCount = i
  }

  getPG(count){
    this.pgb.clear()
    this.pgb.image(this.pgw, 0, 0)

    switch(this.state){
      case 0:
        this._initialize();
        //
      case 1:
        this._wait1(count); break;
      case 2:
        this._input(); break;
      case 3:
        this._wait2(count); break;
      case 4:
        this._output(); break;
      case 5:
        this._finish(count)
        break;
      default:
        console.error('Error')
    }

    this.pg.clear()

    // show previous lines
    let lnum = Math.floor((this.pg.height - this.paddingBottom) / this.lineHeight) - 1
    let fromIndex = this.previousLines.length - lnum
    if(fromIndex < 0){
      fromIndex = 0
    }
    let previousShowLines = this.previousLines.slice(fromIndex)

    let textHeight = this.lineHeight
    for(let line of previousShowLines){
      drawPG_text(this.pg, 10, textHeight, line, this.fontSize, CLOUDS, 255, this.font)
      textHeight += this.lineHeight
    }

    // show current line
    drawPG_text(this.pg, 10, textHeight, this.input, this.fontSize, CLOUDS, 255, this.font)

    this.pgb.image(this.pg, 0, 30)
    return this.pgb
  }

  _initialize(){
    this.waitList1 = this.waitList1_.slice(0)
    this.inputList = this.inputList_.slice(0)
    this.waitList2 = this.waitList2_.slice(0)
    this.outputList = this.outputList_.slice(0)

    this.previousLines = []
    this.index = 0
    this.state = 1
  }

  _wait1(count){
    if(count >= this.waitList1[this.index]){
      this.state = 2
    }else{
      // wait
    }
  }

  _input(){
    if(this.inputList[this.index].length == 0){
      this.state = 3
      return
    }

    if(frameCount % this.typeSpeed != 0){
      return
    }

    this.input += this.inputList[this.index].charAt(0)
    this.inputList[this.index] = this.inputList[this.index].slice(1)
  }

  _wait2(count){
    if(count >= this.waitList2[this.index]){
      this.state = 4
    }else{
      // wait
    }
  }

  _output(){
    // add previous lines
    this.previousLines.push(this.input)
    let output = this.outputList[this.index]
    if(output != ''){
      let olist = output.split('\n')
      this.previousLines = this.previousLines.concat(olist)
    }

    // initialize
    this.input = '>>> '
    this.index += 1
    if(this.index == this.inputList.length){
      // no more
      this.state = 5
      this.index = 0

    }else{
      // has next
      this.state = 1
    }
  }

  _finish(count){
    if(this.finishCount <= count){
      this.state = 0
    }
  }
}
