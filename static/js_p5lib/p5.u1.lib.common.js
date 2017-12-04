/*
* Common utility module.
*
* (1) Sugar coting for
*  - Getting Pgraphics
*  - Drawing Pgraphics
*  - Setting Pgraphics style
*
* (2) Animation
*  - Move pgraphics item on the background pgraphics
*  - Flowing animation
*
* (3) Utility for other specific utility modules
*  - drawing serial boxes
*  - drawing table
*  - other
*
* 2017/11/26
* @author Yuichi Ito yuichi@yuichi.com
*/

const TRANSPARENT = Symbol('transparent');
const BLACK =       Symbol('black')
const WHITE =       Symbol('white')
const RED =         Symbol('red')
const BLUE =        Symbol('blue')
const GREEN =       Symbol('green')
const GRAY =        Symbol('gray')

const TURQUOISE =    Symbol('turquoise');
const EMERALD =      Symbol('emerald');
const PETERRIVER =   Symbol('peterriver');
const AMETHYST =     Symbol('amethyst');
const WETASPHALT =   Symbol('wetasphalt');
const GREENSEA =     Symbol('greensea');
const NEPHRITIS =    Symbol('nepheritis');
const BELIZEHOLE =   Symbol('belizehole');
const WISTERIA =     Symbol('wisteria');
const MIDNIGHTBLUE = Symbol('midnightblue');
const SUNFLOWER =    Symbol('sunflower');
const CARROT =       Symbol('carrot');
const ALIZARIN =     Symbol('alizarin');
const CLOUDS =       Symbol('clouds');
const CONCRETE =     Symbol('concrete');
const ORANGE =       Symbol('orange');
const PUMPKIN =      Symbol('pumpkin');
const POMEGRANATE =  Symbol('pomegrante');
const SILVER =       Symbol('silver');
const ASBESTOS =     Symbol('asbestos');

// return on string parse error
const UNDEFINED_COLOR = Symbol('undefined')

/*
* Font
*/


/*
* Animation
*/

function movePG(pgb, pg,
                x1, y1, r1, x2, y2, r2,
                currentFrame, startFrame, endFrame){
  // from start to end only
  if(currentFrame < startFrame) return;
  if(endFrame < currentFrame) return;

  if(main_guiDebug){
    setPG_style(pgb, RED, 2, 255, RED, 255)
    pgb.line(x1, y1, x2, y2)
    pgb.ellipse(x1, y1, 10, 10)
    pgb.ellipse(x2, y2, 10, 10)
  }

  // get current location
  let p = (currentFrame - startFrame)/float(endFrame - startFrame)
  let x = lerp(x1, x2, p)
  let y = lerp(y1, y2, p)

  // draw
  if(r1 == 0 && r2 == 0){
    pgb.image(pg, x - pg.width/2, y - pg.height/2)
  }else{
    pgb.push()
    let r = lerp(r1, r2, p)
    pgb.translate(x, y)
    pgb.rotate(radians(r))
    pgb.image(pg, - pg.width/2, - pg.height/2)
    pgb.pop()
  }
}

function movePG_bezier(pgb, pg,
                       x1, y1, r1, x2, y2, x3, y3, x4, y4, r2,
                       currentFrame, startFrame, endFrame){

  // from start to end only
  if(currentFrame < startFrame) return;
  if(endFrame < currentFrame) return;

  if(main_guiDebug){
    setPG_style(pgb, BLUE, 2, 255, BLUE, 255)
    pgb.line(x1, y1, x2, y2)
    pgb.line(x3, y3, x4, y4);
    pgb.ellipse(x2, y2, 10, 10);
    pgb.ellipse(x3, y3, 10, 10);

    setPG_style(pgb, RED, 2, 255, RED, 255)
    pgb.ellipse(x1, y1, 10, 10);
    pgb.ellipse(x4, y4, 10, 10);
    setPG_fill(pgb, TRANSPARENT, 255);
    pgb.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  }

  // get current location
  let p = (currentFrame - startFrame)/float(endFrame - startFrame);
  let x = bezierPoint(x1, x2, x3, x4, p);
  let y = bezierPoint(y1, y2, y3, y4, p);

  // draw
  if(r1 == 0 && r2 == 0){
    pgb.image(pg, x - pg.width/2, y - pg.height/2)
  }else{
    pgb.push()
    let r = lerp(r1, r2, p)
    pgb.translate(x, y)
    pgb.rotate(radians(r))
    pgb.image(pg, - pg.width/2, - pg.height/2)
    pgb.pop()
  }
}

/*
* Text
*/

function drawPG_text(pg, x, y, tString, tSize, tColor, tAlpha){
  pg.textSize(tSize)
  setPG_style(pg, TRANSPARENT, 0, 0, tColor, tAlpha)
  pg.text(tString, x, y)
}

/*
* Line
*/

function drawPG_line(pg, x1, y1, x2, y2, sColor, sWeight, sAlpha){
  setPG_stroke(pg, sColor, sWeight, sAlpha)
  pg.line(x1, y1, x2, y2)
}

function drawPG_lineArrow(pg, x1, y1, x2, y2, arrowLength,
                          sColor, sWeight, sAlpha, triangle=false, twoWay=false){

  let len = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  setPG_stroke(pg, sColor, sWeight, sAlpha);

  pg.push();
  pg.translate(x1, y1);
  pg.rotate(angle);
  pg.line(0, 0, len, 0);

  if(triangle){
    setPG_fill(pg, sColor, sAlpha)
    pg.triangle(len, 0,  len - arrowLength, -1 * arrowLength, len - arrowLength, arrowLength)
    if(twoWay){
      pg.triangle(0, 0, arrowLength, -1 * arrowLength, arrowLength, arrowLength)
    }
  }else{
    pg.line(len, 0, len - arrowLength, -1 * arrowLength);
    pg.line(len, 0, len - arrowLength, arrowLength);
    if(twoWay){
      pg.line(0, 0, arrowLength, -1 * arrowLength);
      pg.line(0, 0, arrowLength, arrowLength);
    }
  }
  pg.pop();
}

function drawImage_withColor(pgb, x, y, width_, height_, bColor){
  loadImage('/static/image/test.png', function(img){
    //img.pixelDensity(1)
    let img2 = createImage(img.width, img.height)
    //img2.pixelDensity(1)
    console.log(img.width)
    console.log(img.height)
    img.loadPixels()
    img2.loadPixels()
    //let c = color(255, 0, 0)

    //let i = 0
    let w = img.width * 4
    let h = img.height
    for(let x=0; x<w; x+=4){
      for(let y=0; y<h; y++){
        let loc = x + y * w
        /*
        if(img.pixels[loc] != 0){
          console.log(img.pixels[loc])
        }
        */
        if(img.pixels[loc+3] != 0){
          //console.log(img.pixels[loc])
          img.pixels[loc] = 255
          // green
          img.pixels[loc+1] = 0
          // blue
          img.pixels[loc+2] = 0
          // alpha
          img.pixels[loc+3] = 255
        }else{
          img.pixels[loc] = 0
          img.pixels[loc+1] = 0
          img.pixels[loc+2] = 0
          img.pixels[loc+3] = 0
        }
        /*
        // red
        img.pixels[loc] = img.pixels[loc]
        // green
        img.pixels[loc+1] = img.pixels[loc+1]
        // blue
        img.pixels[loc+2] = img.pixels[loc+2]
        // alpha
        img.pixels[loc+3] = img.pixels[loc+3]
        */
        /*
        //console.log(loc + ' : ' + red(img.pixels[loc]))
        let r = red(img.pixels[loc])
        //let g = green(img.pixels[loc])
        //let b = blue(img.pixels[loc])
        if(r == 255){
          img.pixels[loc] = c
        }
        */
        //i++
      }
      //img2.updatePixels()
    }
    //console.log(i)
    //img2.updatePixels()
    img.updatePixels()
    img.resize(100, 100)
    pgb.image(img, x, y)
  })
}

/*
function drawPG_dashedline(pg, x1, y1, x2, y2, n, sColor, sWeight, sAlpha){
  setPG_stroke(pg, sColor, sWeight, sAlpha)
  if(n<2){
    n = 2
  }else if(n%2==0){
    n += 1
  }

  for(let i=0; i<n; i++){
    if(i%2 == 1){
      continue
    }
    let p1 = 1.0 * i / n
    let p2 = 1.0 * (i+1) / n
    let dx1 = lerp(x1, x2, p1)
    let dy1 = lerp(y1, y2, p1)
    let dx2 = lerp(x1, x2, p2)
    let dy2 = lerp(y1, y2, p2)
    line(dx1, dy1, dx2, dy2)
    //console.log(dx1)
    //console.log(dx2)
  }
}
*/


/*
* Basic shapes
*/

function getPG_rect(width_, height_, r,
                    sColor, sWeight, sAlpha, fColor=TRANSPARENT, fAlpha=255,
                    tX=0, tY=0, tString='', tSize=18, tColor=TRANSPARENT, tAlpha=255){

  let pg = createGraphics(width_, height_)
  setPG_style(pg, sColor, sWeight, sAlpha, fColor, fAlpha)
  if(sColor == TRANSPARENT){
    sWeight = 0
  }

  pg.rectMode(CORNERS)
  let x1 = ceil(sWeight/2)
  let y1 = ceil(sWeight/2)
  let x2 = width_ - ceil(sWeight/2)
  let y2 = height_ - ceil(sWeight/2)
  pg.rect(x1, y1, x2, y2, r)

  if(tString != ''){
    pg.textSize(tSize)
    setPG_style(pg, TRANSPARENT, 0, 0, tColor, tAlpha)
    pg.text(tString, tX, tY)
  }

  return pg
}

function getPG_ellipse(width_, height_,
                      sColor, sWeight, sAlpha, fColor=TRANSPARENT, fAlpha=255,
                      tX=0, tY=0, tString='', tSize=18, tColor=TRANSPARENT, tAlpha=255){

  let pg = createGraphics(width_, height_)
  setPG_style(pg, sColor, sWeight, sAlpha, fColor, fAlpha)
  if(sColor == TRANSPARENT){
    sWeight = 0
  }

  let x = width_ / 2
  let y = height_ / 2
  let w = width_ - sWeight
  let h = height_ - sWeight
  pg.ellipse(x, y, w, h)

  if(tString != ''){
    pg.textSize(tSize)
    setPG_style(pg, TRANSPARENT, 0, 0, tColor, tAlpha)
    pg.text(tString, tX, tY)
  }

  return pg
}

function getPG_bigArrow(width_, height_, arrowWidth, arrowHeight,
                        sColor, sWeight, sAlpha, fColor, fAlpha, twoWay=false,
                        tX=0, tY=0, tString='', tSize=18, tColor=TRANSPARENT, tAlpha=255){

  let pg = createGraphics(width_, height_)
  setPG_style(pg, sColor, sWeight, sAlpha, fColor, fAlpha)
  if(sColor == TRANSPARENT){
    sWeight = 0
  }

  let x = ceil(sWeight/2);
  let y = ceil(sWeight/2);
  let w = width_ - ceil(sWeight) - 1;
  let h = height_ - ceil(sWeight) - 1;

  pg.push()
  pg.translate(x, y + h/2)
  pg.beginShape()
  if(twoWay){
    pg.vertex(0, 0)
    pg.vertex(arrowWidth, - h/2)
    pg.vertex(arrowWidth, - h/2 + arrowHeight)
  }else{
    pg.vertex(0, - h/2 + arrowHeight)
  }
  pg.vertex(w - arrowWidth, - h/2 + arrowHeight)
  pg.vertex(w - arrowWidth, - h/2)
  pg.vertex(w, 0)
  pg.vertex(w - arrowWidth, h/2)
  pg.vertex(w - arrowWidth, h/2 - arrowHeight)
  if(twoWay){
    pg.vertex(arrowWidth, h/2 - arrowHeight)
    pg.vertex(arrowWidth, h/2)
  }else{
    pg.vertex(0, h/2 - arrowHeight)
  }
  pg.endShape(CLOSE)
  pg.pop()

  if(tString != ''){
    pg.textSize(tSize)
    setPG_style(pg, TRANSPARENT, 0, 0, tColor, tAlpha)
    pg.text(tString, tX, tY)
  }

  return pg
}


/*
* Special shapes
*/

function getPG_cylinder(width_, height_, arcHeight,
                        sColor, sWeight, sAlpha, bodyColor, topEllipseColor, fAlpha,
                        tX=0, tY=0, tString='', tSize=18, tColor=TRANSPARENT, tAlpha=255){

  let pg = createGraphics(width_, height_)
  if(sColor == TRANSPARENT){
    sWeight = 0
  }

  let x = ceil(sWeight/2);
  let y = ceil(sWeight/2);
  let w = width_ - ceil(sWeight) - 1;
  let h = height_ - ceil(sWeight) - 1;

  // bottom ellipse
  let e1_x = x + w/2;
  let e1_y = y + h - arcHeight;
  let e1_w = w;
  let e1_h = arcHeight;
  setPG_style(pg, sColor, sWeight, sAlpha, bodyColor, fAlpha);
  pg.ellipse(e1_x, e1_y, e1_w, e1_h);

  // middle rectangle
  let r_x = x;
  let r_y = y + arcHeight;
  let r_w = w;
  let r_h = h - (2 * arcHeight);
  pg.noStroke();
  pg.rect(r_x, r_y, r_w, r_h);
  if(sWeight != 0){
    setPG_stroke(pg, sColor, sWeight, sAlpha);
    pg.line(r_x, r_y, r_x, r_y + r_h);
    pg.line(r_x + r_w, r_y, r_x + r_w, r_y + r_h);
  }

  // top ellipse
  let e2_x = e1_x;
  let e2_y = y + arcHeight;
  let e2_w = e1_w;
  let e2_h = e1_h;
  setPG_style(pg, sColor, sWeight, sAlpha, topEllipseColor, fAlpha);
  pg.ellipse(e2_x, e2_y, e2_w, e2_h);

  if(tString != ''){
    pg.textSize(tSize)
    setPG_style(pg, TRANSPARENT, 0, 0, tColor, tAlpha)
    pg.text(tString, tX, tY)
  }

  return pg
}


/*
* Boxes
*/

function getPG_horizontalRects(widthArray, height_,
                                sColor, sWeight, sAlpha,
                                fColorArray, fAlphaArray,
                                txArray, ty, tStringArray, tSize, tColorArray, tAlphaArray){

  if(sColor == TRANSPARENT){
    sWeight = 0
  }
  let xArray = new Array(widthArray.length);
  let y = ceil(sWeight/2);
  let width_ = 0;
  let w = 0;
  let h = height_ - ceil(sWeight) - 1;

  // update width and x positions
  for(let i=0; i<widthArray.length; i++){
    width_ += widthArray[i];

    if(i==0){
      xArray[i] = ceil(sWeight/2);
    }else{
      // sum of previous rects width + X
      xArray[i] = w + xArray[0];
    }

    if(widthArray.length == 0){
      // if box array has only 1 box, 1st box width is shorter.
      widthArray[0] = widthArray[0] - ceil(sWeight);
    }else if(i==0 || i==widthArray.length-1){
      // if not, 1st and last box is little bit shorter
      widthArray[i] = widthArray[i] - ceil(sWeight/2) - 1;
    }
    w += widthArray[i];
  }

  pg = createGraphics(width_ + 1 , height_);
  for(let i=0; i<widthArray.length; i++){
    // rect
    setPG_style(pg, sColor, sWeight, sAlpha, fColorArray[i], 255);
    pg.rect(xArray[i], y, widthArray[i], h);
    // text
    if(tStringArray[i] != ''){
      drawPG_text(pg, xArray[i] + txArray[i], ty,
      tStringArray[i], tSize, tColorArray[i], 255);
    }
  }

  return pg;
}

function getPG_verticalRects(width_, heightArray,
                             sColor, sWeight, sAlpha,
                             fColorArray, fAlphaArray,
                             txArray, tyArray, tStringArray, tSize, tColorArray, tAlphaArray){

  if(sColor == TRANSPARENT){
    sWeight = 0
  }

  let x = ceil(sWeight/2);
  let yArray = new Array(heightArray.length)
  let w = width_ - ceil(sWeight) - 1;
  let height_ = 0
  let h = 0

  // update height and y positions
  for(let i=0; i<heightArray.length; i++){
    height_ += heightArray[i];

    if(i==0){
      yArray[i] = ceil(sWeight/2);
    }else{
      // sum of previous rects height + Y
      yArray[i] = h + yArray[0];
    }

    if(heightArray.length == 0){
      // if box array has only 1 box, 1st box height is shorter.
      heightArray[0] = heightArray[0] - ceil(sWeight);
    }else if(i==0 || i==heightArray.length-1){
      // if not, 1st and last box is little bit shorter
      heightArray[i] = heightArray[i] - ceil(sWeight/2) - 1;
    }
    h += heightArray[i];
  }

  pg = createGraphics(width_ + 1 , height_);
  //console.log(width_)
  for(let i=0; i<heightArray.length; i++){
    // rect
    setPG_style(pg, sColor, sWeight, sAlpha, fColorArray[i], 255);
    pg.rect(x, yArray[i], w, heightArray[i]);
    // text
    if(tStringArray[i] != ''){
      drawPG_text(pg, x + txArray[i], yArray[i] + tyArray[i],
      tStringArray[i], tSize, tColorArray[i], 255);
    }
  }

  return pg;
}

function getPG_table(columnWidthArray, rawHeightArray,
                      sColor, sWeight, sAlpha, fColorTable, fAlphaTable,
                      txTable, tyArray, textTable, tSize, tColorTable, tAlphaTable){

  if(sColor == TRANSPARENT){
    sWeight = 0
  }
  let xArray = new Array(columnWidthArray.length);
  let yArray = new Array(rawHeightArray.length)
  let width_ = 0;
  let w = 0;
  let height_ = 0
  let h = 0

  // update width and x positions
  for(let i=0; i<columnWidthArray.length; i++){
    width_ += columnWidthArray[i];
    if(i==0){
      xArray[i] = ceil(sWeight/2);
    }else{
      xArray[i] = w + xArray[0];
    }

    if(columnWidthArray.length == 0){
      columnWidthArray[0] = columnWidthArray[0] - ceil(sWeight);
    }else if(i==0 || i==columnWidthArray.length-1){
      columnWidthArray[i] = columnWidthArray[i] - ceil(sWeight/2) - 1;
    }
    w += columnWidthArray[i];
  }

  // update height and y positions
  for(let i=0; i<rawHeightArray.length; i++){
    height_ += rawHeightArray[i];
    if(i==0){
      yArray[i] = ceil(sWeight/2);
    }else{
      yArray[i] = h + yArray[0];
    }

    if(rawHeightArray.length == 0){
      rawHeightArray[0] = rawHeightArray[0] - ceil(sWeight);
    }else if(i==0 || i==rawHeightArray.length-1){
      rawHeightArray[i] = rawHeightArray[i] - ceil(sWeight/2) - 1;
    }
    h += rawHeightArray[i];
  }

  pg = createGraphics(width_ + 1 , height_);
  //console.log(width_)
  for(let raw=0; raw<rawHeightArray.length; raw++){
    for(let column=0; column<columnWidthArray.length; column++){
      // rect
      setPG_style(pg, sColor, sWeight, sAlpha, fColorTable[raw][column], 255);
      pg.rect(xArray[column], yArray[raw], columnWidthArray[column], rawHeightArray[raw]);

      // text
      if(textTable[raw][column] != ''){
        drawPG_text(pg, xArray[column] + txTable[raw][column], yArray[raw] + tyArray[raw],
        textTable[raw][column], tSize, tColorTable[raw][column], 255);
      }
    }
  }

  return pg
}

/*
* Style
*/

function setPG_style(pg, sColor, sWeight, sAlpha, fColor, fAlpha){
  setPG_stroke(pg, sColor, sWeight, sAlpha)
  setPG_fill(pg, fColor, fAlpha)
}

function setPG_stroke(pg, sColor, sWeight, sAlpha){
  pg.strokeWeight(sWeight)

  switch(sColor){
    // BASIC COLORS
    case TRANSPARENT:
      pg.noStroke(); break;
    case BLACK:
      pg.stroke(0, sAlpha); break;
    case WHITE:
      pg.stroke(255, sAlpha); break;
    case RED:
      pg.stroke(255, 0, 0, sAlpha); break;
    case GREEN:
      pg.stroke(0, 255, 0, sAlpha); break;
    case BLUE:
      pg.stroke(0, 0, 255, sAlpha); break;

    // FLAT DESIGN (http://flatuicolors.com/)
    case TURQUOISE:
      pg.stroke(26, 188, 156, sAlpha); break;
    case EMERALD:
      pg.stroke(46, 204, 113, sAlpha); break;
    case PETERRIVER:
      pg.stroke(52, 152, 219, sAlpha); break;
    case AMETHYST:
      pg.stroke(155, 89, 182, sAlpha); break;
    case WETASPHALT:
      pg.stroke(52, 73, 94, sAlpha); break;
    case GREENSEA:
      pg.stroke(22, 160, 133, sAlpha); break;
    case NEPHRITIS:
      pg.stroke(39, 174, 96, sAlpha); break;
    case BELIZEHOLE:
      pg.stroke(41, 128, 185, sAlpha); break;
    case WISTERIA:
      pg.stroke(142, 68, 173, sAlpha); break;
    case MIDNIGHTBLUE:
      pg.stroke(44, 62, 80, sAlpha); break;
    case SUNFLOWER:
      pg.stroke(241, 196, 15, sAlpha); break;
    case CARROT:
      pg.stroke(230, 126, 34, sAlpha); break;
    case ALIZARIN:
      pg.stroke(231, 76, 60, sAlpha); break;
    case CLOUDS:
      pg.stroke(236, 240, 241, sAlpha); break;
    case CONCRETE:
      pg.stroke(149, 165, 166, sAlpha); break;
    case ORANGE:
      pg.stroke(243, 156, 18, sAlpha); break;
    case PUMPKIN:
      pg.stroke(211, 84, 0, sAlpha); break;
    case POMEGRANATE:
      pg.stroke(192, 57, 43, sAlpha); break;
    case SILVER:
      pg.stroke(189, 195, 199, sAlpha); break;
    case ASBESTOS:
      pg.stroke(127, 140, 141, sAlpha); break;
    default:
      console.error(`setPG_stroke: Color ${sColor} is not defined`)
  }
}

function setPG_fill(pg, fColor, fAlpha){
  switch(fColor){
    // BASIC COLORS
    case TRANSPARENT:
      pg.noFill(); break;
    case BLACK:
      pg.fill(0, fAlpha); break;
    case WHITE:
      pg.fill(255, fAlpha); break;
    case RED:
      pg.fill(255, 0, 0, fAlpha); break;
    case GREEN:
      pg.fill(0, 255, 0, fAlpha); break;
    case BLUE:
      pg.fill(0, 0, 255, fAlpha); break;

    // FLAT DESIGN (http://flatuicolors.com/)
    case TURQUOISE:
      pg.fill(26, 188, 156, fAlpha); break;
    case EMERALD:
      pg.fill(46, 204, 113, fAlpha); break;
    case PETERRIVER:
      pg.fill(52, 152, 219, fAlpha); break;
    case AMETHYST:
      pg.fill(155, 89, 182, fAlpha); break;
    case WETASPHALT:
      pg.fill(52, 73, 94, fAlpha); break;
    case GREENSEA:
      pg.fill(22, 160, 133, fAlpha); break;
    case NEPHRITIS:
      pg.fill(39, 174, 96, fAlpha); break;
    case BELIZEHOLE:
      pg.fill(41, 128, 185, fAlpha); break;
    case WISTERIA:
      pg.fill(142, 68, 173, fAlpha); break;
    case MIDNIGHTBLUE:
      pg.fill(44, 62, 80, fAlpha); break;
    case SUNFLOWER:
      pg.fill(241, 196, 15, fAlpha); break;
    case CARROT:
      pg.fill(230, 126, 34, fAlpha); break;
    case ALIZARIN:
      pg.fill(231, 76, 60, fAlpha); break;
    case CLOUDS:
      pg.fill(236, 240, 241, fAlpha); break;
    case CONCRETE:
      pg.fill(149, 165, 166, fAlpha); break;
    case ORANGE:
      pg.fill(243, 156, 18, fAlpha); break;
    case PUMPKIN:
      pg.fill(211, 84, 0, fAlpha); break;
    case POMEGRANATE:
      pg.fill(192, 57, 43, fAlpha); break;
    case SILVER:
      pg.fill(189, 195, 199, fAlpha); break;
    case ASBESTOS:
      pg.fill(127, 140, 141, fAlpha); break;
    default:
      console.error(`setPG_fill: Color ${fColor} is not defined`);
  }
}

function getColorSymbol(tColor){
  tColor = tColor.toLowerCase()
  switch(tColor){
    case 'transparent':
      return TRANSPARENT
    case 'black':
      return BLACK
    case 'white':
      return WHITE
    case 'red':
      return RED
    case 'green':
      return GREEN
    case 'blue':
      return BLUE

    case 'turquoise':
      return TURQUOISE
    case 'emerald':
      return EMERALD
    case 'peterriver':
      return PETERRIVER
    case 'amethyst':
      return AMETHYST
    case 'wetasphalt':
      return WETASPHALT
    case 'greensea':
      return GREENSEA
    case 'nephritis':
      return NEPHRITIS
    case 'belizehole':
      return BELIZEHOLE
    case 'wisteria':
      return WISTERIA
    case 'midnightblue':
      return MIDNIGHTBLUE
    case 'sunflower':
      return SUNFLOWER
    case 'carrot':
      return CARROT
    case 'alizarin':
      return ALIZARIN
    case 'clouds':
      return CLOUDS
    case 'concrete':
      return CONCRETE
    case 'orange':
      return ORANGE
    case 'pumpkin':
      return PUMPKIN
    case 'pomegrante':
      return POMEGRANATE
    case 'silver':
      return SILVER
    case 'asbestos':
      return ASBESTOS
    default:
      console.error(`getColorSymbol: Color ${tColor} is not defined`);
      return UNDEFINED_COLOR
  }
}

/*
* Big Classes
*/

class Flow{
  constructor(xArray, yArray, speed, distance){
    if(xArray.length != yArray.length){
      console.warn("Flow.constructor(): Length mismatch between xArray and yArray")
    }

    this.startMode = false
    this.endMode = false
    this.flowing = false

    // get sum of distance
    let sumDistance1 = 0
    for(let i=0; i<xArray.length-1; i++){
      sumDistance1 += dist(xArray[i], yArray[i], xArray[i+1], yArray[i+1])
    }

    let numItems = ceil(sumDistance1 / distance)
    // item frame array which contains each items frame number.
    // -1 means non active item
    this.itemFrameArray = new Array(numItems)

    // frame array which contanis coordinate of each frame
    let numFrames = int(sumDistance1 * main_frameRate / speed)
    this.frameArray = new Array(numFrames)

    // anchor frame array which contains key frame number
    this.anchorFrameArray = new Array(xArray.length)

    // fill anchorArray
    let sumDistance2 = 0
    this.anchorFrameArray[0] = 0 // head
    for(let i=0; i<xArray.length-2; i++){
      sumDistance2 += dist(xArray[i], yArray[i], xArray[i+1], yArray[i+1])
      let anchorFrame = int(numFrames * (1.0 * sumDistance2 / sumDistance1))
      this.anchorFrameArray[i+1] = anchorFrame
    }
    this.anchorFrameArray[this.anchorFrameArray.length - 1] = numFrames - 1 // tail

    // fill frameArray
    for(let i=0; i<this.anchorFrameArray.length-1; i++){
      let startFrame = this.anchorFrameArray[i];
      let x1 = xArray[i];
      let y1 = yArray[i];
      let endFrame = this.anchorFrameArray[i+1];
      let x2 = xArray[i+1];
      let y2 = yArray[i+1];

      for(let currentFrame=startFrame; currentFrame<endFrame; currentFrame++){
        let p = (currentFrame - startFrame)/float(endFrame - startFrame);
        let x = int(lerp(x1, x2, p))
        let y = int(lerp(y1, y2, p))
        this.frameArray[currentFrame] = [x,y];
      }
    }
    let x = xArray[xArray.length-1]
    let y = yArray[yArray.length-1]
    this.frameArray[this.frameArray.length-1] = [x,y]

    // fill itemFrameArray
    for(let i=0; i<this.itemFrameArray.length; i++){
      this.itemFrameArray[i] = -1
    }


    console.debug(this.anchorFrameArray)
    console.debug(this.itemFrameArray)
    console.debug(this.frameArray)
  }

  start(){
    if(!this.startMode){
      this.startMode = true
      this.flowing = true
    }
  }

  stop(){
    if(!this.endMode){
      this.startMode = false
      this.stopMode = true
    }
  }

  draw(pgb, pg){
    if(!this.flowing){
      return
    }

    if(main_guiDebug){
      setPG_style(pgb, RED, 10, 255, TRANSPARENT, 0)
      for(let anchorFrame of this.anchorFrameArray){
        let [x, y] = this.frameArray[anchorFrame]
        pgb.ellipse(x -10, y -10, 20, 20)
      }
    }

    // Start showing object if previous object is at good location
    // if stop mode is not yet finished, wait till finish it.
    if(this.startMode && !this.endMode){
      this._handleStartMode()
    }

    // draw all items at each frame location
    this._drawAllItems(pgb, pg)

    // move forward frames.
    // if it is end mode, will not update from maximum frames.
    // if all items are deactivated, skip drawing from next round.
    this._updateItemFrames()
  }

  _handleStartMode(){
    let startLine = int(this.frameArray.length / this.itemFrameArray.length)
    let allStarted = true
    for(let i=0; i<this.itemFrameArray.length; i++){
      if(i==0){
        if(this.itemFrameArray[0] == -1){
          // start initial item
          this.itemFrameArray[0] = 0
        }
      }else{
        let notStarted = this.itemFrameArray[i] == -1
        if(notStarted && this.itemFrameArray[i-1] == startLine){
          this.itemFrameArray[i] = 0
        }
      }

      if(this.itemFrameArray[i] == -1){
        allStarted = false
      }
    }

    if(allStarted){
       // all item started. exit start mode.
      this.startMode = false
    }
  }

  _drawAllItems(pgb, pg){
    console.debug(this.itemFrameArray)
    let itemWidth = pg.width
    let itemHeight = pg.height
    for(let i=0; i<this.itemFrameArray.length; i++){
      let frame = this.itemFrameArray[i]
      if(frame == -1){
        continue
      }
      let [x, y] = this.frameArray[frame]
      pgb.image(pg, x - itemWidth, y - itemHeight)
    }
  }

  _updateItemFrames(){
    let frameMax = this.frameArray.length - 1

    for(let i=0; i<this.itemFrameArray.length; i++){
      if(this.itemFrameArray[i] == -1){
        continue
      }

      if(this.itemFrameArray[i] == frameMax){
        if(this.stopMode){
          this.itemFrameArray[i] = -1
        }else{
          this.itemFrameArray[i] = 0
        }
      }else{
        this.itemFrameArray[i] += 1
      }
    }

    if(this.stopMode){
      let allMinus1 = true
      for(let frame of this.itemFrameArray){
        if(frame != -1){
          allMinus1 = false
          break
        }
      }

      // all items are deactivated.
      // stop drawing items till start() is called again
      if(allMinus1){
        this.stopMode = false
        this.flowing = false
      }
    }
  }
}