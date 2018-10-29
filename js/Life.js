class Life {
  constructor(ctx) {
    this.ctx = ctx;
    this.cellSize = 10;
    this.currentState = matrix(height/this.cellSize,width/this.cellSize);
    this.width = this.currentState[0].length
    this.height = this.currentState.length
    this.nextState = matrix(height/this.cellSize,width/this.cellSize);
    this.iterationNumber = 0;
  }

  update() {
    this.setNextState();
    this.drawCurrentState();
    this.iterationNumber++;
  }

  toggle(y,x) {
    if (this.currentState[y][x]===0) {
      this.currentState[y][x] = 1
    } else {
      this.currentState[y][x] = 0
    }
  }


  countNeighbors(y,x) {
    var neighbors = 0;
    if (this.currentState[mod((y-1),this.height)][mod((x-1),this.width)] === 1) {
      neighbors++;
    }
    if (this.currentState[mod((y-1),this.height)][mod(x,this.width)] === 1) {
      neighbors++;
    }
    if (this.currentState[mod((y-1),this.height)][mod((x+1),this.width)] === 1) {
      neighbors++;
    }
    if (this.currentState[mod(y,this.height)][mod((x-1),this.width)] === 1) {
      neighbors++;
    }
    if (this.currentState[mod(y,this.height)][mod((x+1),this.width)] === 1) {
      neighbors++;
    }
    if (this.currentState[mod((y+1),this.height)][mod((x-1),this.width)] === 1) {
      neighbors++;
    }
    if (this.currentState[mod((y+1),this.height)][mod(x,this.width)] === 1) {
      neighbors++;
    }
    if (this.currentState[mod((y+1),this.height)][mod((x+1),this.width)] === 1) {
      neighbors++;
    }
    return neighbors
  }

  setNextState() {
    for (var row = 0; row<this.height; row++) {
      for (var col = 0; col<this.width; col++) {
        if (this.currentState[row][col] === 1) {
          if (this.countNeighbors(row,col) < 2 || this.countNeighbors(row,col) > 3) {
            this.nextState[row][col] = 0;
          } else {
            this.nextState[row][col] = 1;
          } 
        } else if (this.currentState[row][col] === 0){
          if (this.countNeighbors(row,col) === 3) {
            this.nextState[row][col] = 1;
          } else {
            this.nextState[row][col] = 0;
          }
        }
      }
    }
    this.currentState = this.nextState;
    this.nextState = matrix(height/this.cellSize,width/this.cellSize);
  }

  drawCurrentState() {
    this.ctx.clearRect(0,0,width,height);
    for (var row = 0; row < this.height; row++) {
      for (var col = 0; col< this.width; col++) {
        if (this.currentState[row][col] === 1) {
          this.drawActiveCell(row,col);
        } else {
          this.drawInactiveCell(row,col);
        }
      }
    }
    this.ctx.restore();
  }

  drawActiveCell(y,x) {
    this.ctx.save();
    this.ctx.translate(xDisplacement,yDisplacement);
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(x*this.cellSize+1,y*this.cellSize+1,this.cellSize-2,this.cellSize-2);
    this.ctx.restore();
  }

  drawInactiveCell(y,x) {
    this.ctx.save();
    this.ctx.translate(xDisplacement,yDisplacement);
    this.ctx.fillStyle = "grey"
    this.ctx.fillRect(x*this.cellSize+1,y*this.cellSize+1,this.cellSize-2,this.cellSize-2);
    this.ctx.restore();
  }
}