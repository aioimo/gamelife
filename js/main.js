
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var xDisplacement = 0;
var yDisplacement = 0;

var nextIterationBtn = document.getElementById('next-iteration');
var numberIterations = document.getElementById('iterations');
var startBtn = document.getElementById('start');
var pauseBtn = document.getElementById('pause');
pauseBtn.disabled = true;

var clearBtn = document.getElementById('clear');

var interval;

var game = new Life(ctx) 

game.drawCurrentState();


canvas.addEventListener('mousedown',function(e){
  let x = Math.floor((e.pageX - 10)/game.cellSize)
  let y = Math.floor((e.pageY - 10)/game.cellSize)
  game.toggle(y,x);
  game.drawCurrentState();
});

nextIterationBtn.addEventListener('click',function(e){
  game.update();
  numberIterations.innerText = game.iterationNumber;
});

startBtn.addEventListener('click',function(){
  pauseBtn.disabled = false;
  startBtn.disabled = true;
  nextIterationBtn.disabled = true;
  interval = setInterval(function(){
    game.update();
    numberIterations.innerText = game.iterationNumber;
  },1000/10)
});

pauseBtn.addEventListener('click',function(){
  pauseBtn.disabled = true;
  startBtn.disabled = false;
  nextIterationBtn.disabled = false;
  clearInterval(interval);
});

clearBtn.addEventListener('click',function(){
  game.clear();
  numberIterations.innerText = game.iterationNumber;
});

