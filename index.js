const canvas = document.getElementById('screen');
const c = canvas.getContext('2d');
canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576



let parsedCollistions
let collisionBlocks
let background
let doors
const player = new Player({
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
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;
            if (level > 3) level = 1;
            levels[level].init();
            player.switchSprite('idleRight');
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          }
        });
      }
    },

  }
});
let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollistions = CollisionsLevel1.parse2D();
      collisionBlocks = parsedCollistions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      if (player.currentAnimation)
      player.currentAnimation.isActive = false;
      background = new sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel1.png',
      });
      doors = [
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
    },
  },
  2: {
    init: () => {
      parsedCollistions = CollisionsLevel2.parse2D();
      collisionBlocks = parsedCollistions.createObjectsFrom2D();
      player.position.x = 95;
      player.position.y = 140;
      if (player.currentAnimation)
        player.currentAnimation.isActive = false;
      player.collisionBlocks = collisionBlocks;
      background = new sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel2.png',
      });
      doors = [
        new sprite({
          position: {
            x: 772,
            y: 335,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 10,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  3: {
    init: () => {
      parsedCollistions = CollisionsLevel3.parse2D();
      collisionBlocks = parsedCollistions.createObjectsFrom2D();
      player.position.x = 760;
      player.position.y = 161;
      if (player.currentAnimation)
        player.currentAnimation.isActive = false;
      player.collisionBlocks = collisionBlocks;
      background = new sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel3.png',
      });
      doors = [
        new sprite({
          position: {
            x: 176,
            y: 334,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 10,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  }
}



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

const overlay = {
  opacity: 0,
};

function animate() {
  window.requestAnimationFrame(animate);
  // 배경 그리기
  background.draw();
  // 충돌 블록 그리기
  collisionBlocks.forEach(block => block.draw());

  // 문 그리기
  doors.forEach(door => door.draw());
  // c.clearRect(0, 0, canvas.width, canvas.height);

  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

levels[level].init();
animate();