Array.prototype.parse2D = function () { // 1차원 배열을 2차원 배열로 변환 // 프로토타입을 사용
  const rows = [];
  for (let i = 0; i < this.length; i += 16) {
    rows.push(this.slice(i, i + 16));
  }

  return rows;
}

Array.prototype.createObjectsFrom2D = function (object) { // 2차원 배열을 객체로 변환
  const objects = [];
  this.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col === 292) {
        // push to collisions array
        objects.push(new CollisionBlock({
          position: {
            x: x * 64,
            y: y * 64,
          }
        }));
      }
    });
  });
  return objects;
}