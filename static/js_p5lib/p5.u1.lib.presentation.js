function lib_presentation_preload(){
  if(_lib_presentation_preload){
    return
  }
  _lib_presentation_preload = true
  lib_common_preload()
}
let _lib_presentation_preload = false

class Presentation_enum{
  constructor(isNum1, size1, isNum2, size2, textColor){
    this.isNum1 = isNum1
    this.size1 = size1
    this.isNum2 = isNum2
    this.size2 = size2
    this.textColor = textColor

    this.data = []

    /* structure
    [
      [level1 item1, [level2 item1, level2 item2, ...]]
      [level1 item2, [level2 item1, level2 item2, ...]]
    ]
    */
  }

  push1(string){
    this.data.push([string, []])
  }

  push2(string){
    if(this.data.length == 0){
      console.error('push1 is first')
      return
    }

    let [level1, level2] = this.data[this.data.length - 1]
    level2.push(string)
  }

  drawPG(pg, baseX, baseY){
    pg.push()
    pg.translate(baseX, baseY)

    let count1 = 1
    let [padding1, padding2] = this._getPadding()
    let y1 = 0
    let y2 = 0
    for(let [level1, level2Array] of this.data){
      // Level1
      if(main_guiDebug){
        setPG_style(pg, RED, 2, 255, TRANSPARENT, 0)
        pg.rect(0, y1, 200, padding1)
      }

      if(this.isNum1){
        this._drawNumber1(pg, y1, count1)
      }else{
        this._drawBullet1(pg, y1)
      }
      this._drawText1(pg, y1, level1)
      count1 += 1
      y1 += padding1

      // Level2
      let count2 = 1
      let y2 = y1
      for(let level2 of level2Array){
        if(main_guiDebug){
          setPG_style(pg, BLUE, 2, 255, TRANSPARENT, 0)
          pg.rect(0, y2, 200, padding2)        
        }

        if(this.isNum2){
          this._drawNumber2(pg, y2, count2)
        }else{
          this._drawBullet2(pg, y2)
        }
        this._drawText2(pg, y2, level2)

        count2 += 1
        y1 += padding2
        y2 += padding2
      }
    }

    pg.pop()
  }

  _getPadding(){
    let padding1 = this._getPadding2(this.size1)
    let padding2 = this._getPadding2(this.size2)
    return [padding1, padding2]
  }

  _getPadding2(fontSize){
    switch(fontSize){
      case 28:
        return 42
      case 26:
        return 39
      case 24:
        return 36
      case 22:
        return 32
      case 20:
        return 30
      case 18:
        return 28
    }
  }

  _getTextY(fontSize){
    switch(fontSize){
      case 28:
        return 32
      case 26:
        return 29
      case 24:
        return 27
      case 22:
        return 25
      case 20:
        return 23
      case 18:
        return 21
    }
  }

  _drawNumber1(pg, y, count){
    let [padding1, padding2] = this._getPadding()
    let string =  count + '.'
    let x = padding1 * 0.15
    let textY = this._getTextY(this.size1)
    drawPG_text(pg, x, y + textY, string, this.size1, this.textColor, 255, 'mp1p')
  }

  _drawBullet1(pg, y){
    let [padding1, padding2] = this._getPadding()
    setPG_style(pg, this.textColor, 2, 255, this.textColor, 255)
    let x = padding1 * 0.5
    pg.ellipse(x, y + padding1/2, padding1/4, padding1/4)
  }

  _drawText1(pg, y, string){
    let [padding1, padding2] = this._getPadding()
    let x = padding1
    let textY = this._getTextY(this.size1)
    drawPG_text(pg, x, y + textY, string, this.size1, this.textColor, 255, 'mp1p')
  }

  _drawNumber2(pg, y, count){
    let [padding1, padding2] = this._getPadding()
    let string =  count + '.'
    let x = padding1 + padding2 * 0.15
    let textY = this._getTextY(this.size2)
    drawPG_text(pg, x, y + textY, string, this.size2, this.textColor, 255, 'mp1p')
  }

  _drawBullet2(pg, y){
    let [padding1, padding2] = this._getPadding()
    setPG_style(pg, this.textColor, 2, 255, this.textColor, 0)
    let x = padding1 + padding2 * 0.5
    pg.ellipse(x, y + padding2/2, padding2/4, padding2/4)
  }

  _drawText2(pg, y, string){
    let [padding1, padding2] = this._getPadding()
    let x = padding1 + padding2
    let textY = this._getTextY(this.size2)
    drawPG_text(pg, x, y + textY, string, this.size2, this.textColor, 255, 'mp1p')
  }




}
