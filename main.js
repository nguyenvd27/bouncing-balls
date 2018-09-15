// setup canvas

var canvas = document.querySelector('canvas');//tham chiếu đến canvas
var ctx = canvas.getContext('2d');//cung cấp cho ta ngữ cảnhddeer vẽ, biến ctx biểu diễn vùng vẽ, cho phép chúng ta vẽ hình dạng 2D trên đó

var width = canvas.width = window.innerWidth;//đặt chiều rộng và chiều cao bằng với khung hình trình duyệt
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {//trả về 1 số ngẫu nhiên trong khoảng từ min đến max 
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function() {
  ctx.beginPath();//ns rằng muốn vẽ 1 hình dạng trên trình duyệt
  ctx.fillStyle = this.color;//xác định màu sắc
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);//vẽ hình tròn
  ctx.fill();//để ns hoàn thành vẽ
}

Ball.prototype.update = function() {
  //kiểm tra bóng đã chạm tới mép của khung vẽ chưa
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;//quả bóng di chuyển mỗi khi phương thức này đc gọi
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() { //kiểm tra bóng chạm nhau, nếu chạm nhau thì đổi màu bóng
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

var balls = [];

function loop() {
  // ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';//thiết lập màu cho hình chữ nhật canvas
  ctx.fillRect(0, 0, width, height);// Vẽ hình chữ nhật có màu trên toàn bộ chiều rộng và chiều cao của canvas

  while (balls.length < 30) {
    var size = random(10,20);
    var ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size
    );
    balls.push(ball);//thêm phần tử vào cuối mảng
  }

  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    // balls[i].collisionDetect();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);//hàm này sẽ tự gọi nó mỗi khi nó chạy, nên nó sẽ chạy lặp đi lặp lại
}

loop();
//thu voi github