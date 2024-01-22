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

const player = new Player({
  collisionBlocks,
  imageSrc: './img/king/idle.png',
  frameRate: 11,
  animations: {
    idleRight: {
      imageSrc: './img/king/idle.png',
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
    },
    idleLeft: {
      imageSrc: './img/king/idleLeft.png',
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
    },
    runRight: {
      imageSrc: './img/king/runRight.png',
      frameRate: 8,
      frameBuffer: 8,
      loop: true,
    },
    runLeft: {
      imageSrc: './img/king/runLeft.png',
      frameRate: 8,
      frameBuffer: 8,
      loop: true,
    },
    enterDoor: {
      imageSrc: './img/king/enterDoor.png',
      frameRate: 8,
      frameBuffer: 8,
      loop: false,
    },

  }
});

const doors = [
  new sprite({
    position: {
      x: 767,
      y: 270,
    },
    imageSrc: './img/doorOpen.png',
    frameRate: 5,
    frameBuffer: 10,
    loop: false,
    autoplay: false,
  }),
];
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

  // 문 그리기
  doors.forEach(door => door.draw());
  // c.clearRect(0, 0, canvas.width, canvas.height);

  player.handleInput(keys);
  player.draw();
  player.update();

}

animate();