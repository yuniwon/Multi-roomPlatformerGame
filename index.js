const canvas = document.getElementById('screen');
const c = canvas.getContext('2d');
canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

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
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);
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
