class Player extends sprite {
  constructor({
    collisionBlocks = [],
    imageSrc,
    frameRate,
    animations,
    loop,
  }) {
    super({
      imageSrc,
      frameRate,
      animations,
      loop,
    });
    this.position = {
      x: 200,
      y: 160,
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
    this.gravity = 0.3;
    this.collisionBlocks = collisionBlocks;
  }


  update() { // 플레이어의 위치를 업데이트
    // 블루박스
    // c.fillStyle = 'rgba(0, 0, 255, 0.5)';
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.position.x += this.velocity.x;

    this.updateHitbox(); // 충돌 블록과 플레이어의 충돌을 검사하기 위한 hitbox를 업데이트
    this.checkForHorizontalCollisions();
    this.applyGravity();

    this.updateHitbox();
    // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
    this.checkForVerticalCollisions();
  }
  switchSprite(name) { // 플레이어의 스프라이트를 바꿈
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.loop = this.animations[name].loop;
    this.currentAnimation = this.animations[name];
  }
  updateHitbox() { // 충돌 블록과 플레이어의 충돌을 검사하기 위한 hitbox를 업데이트
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 54,
    }
  };

  handleInput() { // 키보드 입력을 처리
    if (this.preventInput) return;
    this.velocity.x = 0;
    if (keys.d.pressed) { //오른쪽 키를 누르면 플레이어가 오른쪽으로 이동
      this.switchSprite('runRight');
      this.velocity.x = 2;
      this.lastDirection = 'right';
    } else if (keys.a.pressed) { //왼쪽 키를 누르면 플레이어가 왼쪽으로 이동
      this.switchSprite('runLeft');
      this.velocity.x = -2;
      this.lastDirection = 'left';
    } else {
      if (this.lastDirection === 'left') this.switchSprite('idleLeft');
      else this.switchSprite('idleRight');
    }
  };

  checkForHorizontalCollisions() { // 충돌 블록과 플레이어의 충돌을 검사
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const block = this.collisionBlocks[i];
      if (this.hitbox.position.x <= block.position.x + block.width && // 플레이어의 오른쪽이 충돌 블록의 왼쪽보다 오른쪽에 있고
        this.hitbox.position.x + this.hitbox.width >= block.position.x && // 플레이어의 왼쪽이 충돌 블록의 오른쪽보다 왼쪽에 있고
        this.hitbox.position.y + this.hitbox.height >= block.position.y && // 플레이어의 위쪽이 충돌 블록의 아래쪽보다 위에 있고
        this.hitbox.position.y <= block.position.y + block.height // 플레이어의 바닥이 충돌 블록의 위쪽보다 아래에 있으면
      ) {
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offset = this.hitbox.position.x - this.position.x - block.width;
          this.position.x = block.position.x - offset + 0.01; // 플레이어의 위치를 충돌 블록의 오른쪽으로 옮김
          break;
        }
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = block.position.x - offset - 0.01; // 플레이어의 위치를 충돌 블록의 왼쪽으로 옮김
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
      if ( // 플레이어가 충돌블록 안에 닿으면
        this.hitbox.position.x <= block.position.x + block.width && // 플레이어의 오른쪽이 충돌 블록의 왼쪽보다 오른쪽에 있고
        this.hitbox.position.x + this.hitbox.width >= block.position.x && // 플레이어의 왼쪽이 충돌 블록의 오른쪽보다 왼쪽에 있고
        this.hitbox.position.y + this.hitbox.height >= block.position.y && // 플레이어의 위쪽이 충돌 블록의 아래쪽보다 위에 있고
        this.hitbox.position.y <= block.position.y + block.height // 플레이어의 바닥이 충돌 블록의 위쪽보다 아래에 있으면
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y
          this.position.y = block.position.y + offset + 0.01; // 플레이어의 위치를 충돌 블록의 아래쪽으로 옮김
          break;
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = block.position.y - offset - 0.01; // 플레이어의 위치를 충돌 블록의 위쪽으로 옮김
          break;
        }
      }
    }
  };
}