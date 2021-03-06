(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Game = function () {
    this.DIM_X = 800;
    this.DIM_Y = 650;
    this.NUM_ASTEROIDS = 50;
    this.asteroids = this.addAsteroids(this.NUM_ASTEROIDS);
    this.ship = new Asteroids.Ship(this);
    this.bullets = [];
    var img = new Image();
    img.src = 'lib/background1.jpeg';
    this.background = img;
  };

  Asteroids.Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat([this.ship]);
  }

  Asteroids.Game.prototype.addAsteroids = function (num) {
    var asteroids = [];
    for (var i = 0; i < num; i++) {
      var position = this.randomPosition();
      asteroids.push(new Asteroids.Asteroid(position, this));
    }
    return asteroids;
  }

  Asteroids.Game.prototype.randomPosition = function () {
    return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
  }

  Asteroids.Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(this.background, 0, 0);
    var gameObjects = this.allObjects();
    for (var i = 0; i < gameObjects.length; i++) {
      gameObjects[i].draw(ctx);
    }
  }

  Asteroids.Game.prototype.moveObjects = function() {
    var gameObjects = this.allObjects();
    for (var i = 0; i < gameObjects.length; i++) {
      gameObjects[i].move();
    }
  }

  Asteroids.Game.prototype.wrap = function(pos) {
    var newX = (this.DIM_X + pos[0]) % this.DIM_X;
    var newY = (this.DIM_Y + pos[1]) % this.DIM_Y;
    return [newX, newY];
  }

  Asteroids.Game.prototype.checkCollisions = function () {
    var gameObjects = this.allObjects();
    for (var i = 0; i < gameObjects.length - 1; i++) {
      for (var j = i + 1; j < gameObjects.length; j++) {
        if (gameObjects[i].isCollidedWith(gameObjects[j])) {
          gameObjects[i].collideWith(gameObjects[j]);
        }
      }
    }
  }

  Asteroids.Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      var objectArray = this.bullets;
    } else {
      var objectArray = this.asteroids;
    }
    var objectIndex = objectArray.indexOf(object);
    objectArray.splice(objectIndex, 1);
  }

  Asteroids.Game.prototype.isOutOfBounds = function (pos) {
    return pos[0] < 0 || pos[1] < 0 ||
           pos[0] >= this.DIM_X || pos[1] >= this.DIM_Y;
  }

  Asteroids.Game.prototype.wonGame = function () {
    return this.asteroids.length === 0;
  };
})();
