(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Bullet = function(game, pos, vel) {
    var args = {
      pos: pos,
      color: "red",
      radius: 4,
      vel: [vel[0] * 4 + 1, vel[1] * 4],
      game: game,
      wrappable: false,
      image: "magic_ball.png"
    };
    Asteroids.MovingObject.call(this, args);
  };

  var Bullet = Asteroids.Bullet;
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
})();
