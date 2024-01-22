class Player extends sprite{
  constructor({
    collisionBlocks = [], 
    imageSrc,
    frameRate
  }) {
    super({imageSrc, frameRate});
    this.position = {
      x: 200,
      y: 200,
    }
    this.velocity = {
      x: 0,
      y: 0,
    }

    this.sides = {
      bottom: this.position.y + this.height,
      // left: this.x,
      // right: this.x + this.width,
    }
    this.gravity = 0.4;
    this.collisionBlocks = collisionBlocks;
  }


  update() { // 플레이어의 위치를 업데이트
    // 블루박스
    // c.fillStyle = 'rgba(0, 0, 255, 0.5)';
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.position.x += this.velocity.x;

    this.checkForHorizontalCollisions();
    this.applyGravity();
    this.checkForVerticalCollisions();
  }

  checkForHorizontalCollisions() { // 충돌 블록과 플레이어의 충돌을 검사
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const block = this.collisionBlocks[i];
      if (this.position.x <= block.position.x + block.width && // 플레이어의 오른쪽이 충돌 블록의 왼쪽보다 오른쪽에 있고
        this.position.x + this.width >= block.position.x && // 플레이어의 왼쪽이 충돌 블록의 오른쪽보다 왼쪽에 있고
        this.position.y + this.height >= block.position.y && // 플레이어의 위쪽이 충돌 블록의 아래쪽보다 위에 있고
        this.position.y <= block.position.y + block.height // 플레이어의 바닥이 충돌 블록의 위쪽보다 아래에 있으면
      ) {
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          this.position.x = block.position.x + block.width + 0.01; // 플레이어의 위치를 충돌 블록의 오른쪽으로 옮김
          break;
        }
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          this.position.x = block.position.x - this.width - 0.01; // 플레이어의 위치를 충돌 블록의 왼쪽으로 옮김
          break;
        }
      }
    }
  };
  applyGravity() { // 중력을 적용
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() { // 충돌 블록과 플레이어의 충돌을 검사
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const block = this.collisionBlocks[i];
      if (
        this.position.x <= block.position.x + block.width && // 플레이어의 오른쪽이 충돌 블록의 왼쪽보다 오른쪽에 있고
        this.position.x + this.width >= block.position.x && // 플레이어의 왼쪽이 충돌 블록의 오른쪽보다 왼쪽에 있고
        this.position.y + this.height >= block.position.y && // 플레이어의 위쪽이 충돌 블록의 아래쪽보다 위에 있고
        this.position.y <= block.position.y + block.height // 플레이어의 바닥이 충돌 블록의 위쪽보다 아래에 있으면
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y = block.position.y + block.height + 0.01; // 플레이어의 위치를 충돌 블록의 아래쪽으로 옮김
          break;
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = block.position.y - this.height - 0.01; // 플레이어의 위치를 충돌 블록의 위쪽으로 옮김
          break;
        }
      }
    }
  };
}