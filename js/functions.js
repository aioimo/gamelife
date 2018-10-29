

function matrix(height,width) {
  var matrix = [];
  for (var i = 0; i < height; i++) {
    var row = [];
    for (var j = 0; j < width; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
}


function mod(n, m) {
  return ((n % m) + m) % m;
}