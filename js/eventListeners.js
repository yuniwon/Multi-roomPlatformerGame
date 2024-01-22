
// 키를 누를때 이벤트
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      if (player.velocity.y === 0) player.velocity.y = -10;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
    case 'a':
      keys.a.pressed = true;
      break;
  }
});

// 키를 때었을때 이벤트
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      // if (player.velocity.y === 0) player.velocity.y = -10;
      break;
    case 'd':
      player.velocity.x = 0; // 키를 떼면 멈추게
      keys.d.pressed = false;
      break;
    case 'a':
      player.velocity.x = 0; // 키를 떼면 멈추게
      keys.a.pressed = false;
      break;
  }
});