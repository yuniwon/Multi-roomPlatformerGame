const canvas = document.getElementById('screen');
const c = canvas.getContext('2d');
canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

const parsedCollistions = CollisionsLevel1.parse2D();
const collisionBlocks = parsedCollistions.createObjectsFrom2D()

const backgroundLevel1 = new sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/backgroundLevel1.png',
});



const player = new Player();

const keys = {
  w: {
    pessed: false,
  },
  a: {
    pessed: false,
  },
  d: {
    pessed: false,
  },

}

function animate() {
  window.requestAnimationFrame(animate);
  // 배경 그리기
  backgroundLevel1.draw();
  // 충돌 블록 그리기
  collisionBlocks.forEach(block => block.draw());

  // c.clearRect(0, 0, canvas.width, canvas.height);
  player.velocity.x = 0;
  if (keys.d.pressed) { //오른쪽 키를 누르면 플레이어가 오른쪽으로 이동
    player.velocity.x = 2;
  } else if (keys.a.pressed) { //왼쪽 키를 누르면 플레이어가 왼쪽으로 이동
    player.velocity.x = -2;
  }
  player.draw();
  player.update();

}

animate();