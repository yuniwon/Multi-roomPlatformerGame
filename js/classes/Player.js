class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    }
    this.width = 100;
    this.height = 100;
    this.sides = {
      bottom: this.position.y + this.height,
      // left: this.x,
      // right: this.x + this.width,
    }
    // this.speed = 1;
  }

  draw() { 
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() { 
    if (this.sides.bottom < canvas.height) { // 바닥에 닿지 않았으면
      this.position.y += 1; // y = y + 1; 사각형이 아래로 내려가는 것처럼 보임
      this.sides.bottom = this.position.y + this.height; // 바닥에서 멈추게 하려면 bottom = y + height; 를 써야함
    }
  }
}