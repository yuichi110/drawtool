class LibCommonTest{

  static settings(){
    main_width = 800
    main_height = 800
    main_guidebug = false
    main_loglevel = LOGLEVEL_INFO
  }

  static setup(pgb){
    this.pg_redRect = getPG_rect(52, 52, 10, BLACK, 2, 255, RED, 255,
                                 10, 30, 'AB', 18, WHITE, 255)
    this.pg_redBall = getPG_ellipse(10, 10, TRANSPARENT, 2, 255, RED, 255)

    this.pg_bigArrow1 = getPG_bigArrow(400, 200, 50, 50, BLACK, 10, 255, RED, 255, false)
    this.pg_bigArrow2 = getPG_bigArrow(400, 200, 50, 50, BLACK, 2, 255, WHITE, 255, true)

    this.pg_cylinder1 = getPG_cylinder(200, 200, 50, BLACK, 2, 255, CONCRETE, WHITE, 255,
                                       50, 130, 'HELLO', 32, WHITE, 255)
    this.pg_cylinder2 = getPG_cylinder(200, 200, 50, TRANSPARENT, 2, 255, BLACK, CONCRETE, 255)

    this.flow1 = new Flow([100, 200, 300, 400, 500], [100, 200, 100, 200, 100], 300, 100)
    this.flow2 = new Flow([100, 200, 300, 400, 500, 600, 700], [200, 300, 200, 300, 200, 300, 200], 300, 100)
  }

  static draw(pgb){
    switch(3){
      case 1:
        this.drawTest(pgb); break
      case 2:
        this.drawMoveRect(pgb); break
      case 3:
        this.drawFlow(pgb); break
      case 4:
        this.drawLine(pgb); break
      case 5:
        this.drawBigArrow(pgb); break
      case 6:
        this.drawCylinder(pgb); break
    }
  }

  static drawTest(pgb){
    pgb.image(this.pg_redRect, 100, 100)
    pgb.image(this.pg_redBall, 200, 200)
  }

  static drawLine(pgb){
    drawPG_line(pgb, 100, 100, 300, 100, BLACK, 2, 255)
    drawPG_lineArrow(pgb, 100, 200, 300, 200, 10, BLACK, 2, 255, true, false)
    drawPG_lineArrow(pgb, 100, 300, 300, 300, 10, BLACK, 2, 255, true, true)
    drawPG_lineArrow(pgb, 100, 400, 300, 400, 10, BLACK, 2, 255, false, false)
    drawPG_lineArrow(pgb, 100, 500, 300, 500, 10, BLACK, 2, 255, false, true)
  }

  static drawMoveRect(pgb){
    let currentFrame = frameCount % 100;
    movePG(pgb, this.pg_redRect, 200, 50, 0, 500, 50, 0, currentFrame, 10, 90);
    movePG(pgb, this.pg_redRect, 200, 200, 0, 500, 200, 720, currentFrame, 10, 90);
    movePG_bezier(pgb, this.pg_redRect, 200, 350, 0, 400, 450, 300, 200, 500, 350, 0, currentFrame, 10, 90)
    movePG_bezier(pgb, this.pg_redRect, 200, 500, 0, 400, 600, 300, 350, 500, 500, 720, currentFrame, 10, 90)
  }

  static drawFlow(pgb){
    let f = frameCount % 500
    if(f == 50){
      this.flow1.start()
      this.flow2.start()
    }else if(f == 300){
      this.flow1.stop()
      this.flow2.stop()
    }

    this.flow1.draw(pgb, this.pg_redBall)
    this.flow2.draw(pgb, this.pg_redBall)
  }

  static drawBigArrow(pgb){
    pgb.image(this.pg_bigArrow1, 100, 100)
    pgb.image(this.pg_bigArrow2, 100, 400)
  }

  static drawCylinder(pgb){
    pgb.image(this.pg_cylinder1, 100, 100)
    pgb.image(this.pg_cylinder2, 100, 300)
  }

  static drawSerialBox(pgb){
    
  }
}
