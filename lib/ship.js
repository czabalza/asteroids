(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Ship = function(game) {
    var args = {
      // pos: game.randomPosition(),
      pos: [game.DIM_X / 2, game.DIM_Y / 2],
      color: "pink",
      radius: 45,
      vel: [0, 0],
      game: game,
      wrappable: true,
      image: "lib/harry1.png"
    };
    Asteroids.MovingObject.call(this, args)
  };

  var Ship = Asteroids.Ship;
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    if (this.vel[0] >= 0) {
      this.image = 'lib/harry2.png';
    } else {
      this.image = 'lib/harry1.png';
    }
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet(this.game, this.pos, this.vel);
    this.game.bullets.push(bullet);
  };

})();
