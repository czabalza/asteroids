(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.COLOR = "black";
  Asteroids.RADIUS = 7;

  Asteroids.Asteroid = function (pos, game) {
    var args = {
      pos: pos,
      color: Asteroids.COLOR,
      radius: Asteroids.RADIUS,
      vel: Asteroids.Util.randomVec(2),
      game: game,
      wrappable: true,
      image: "lib/bludger.jpeg"
    };
    Asteroids.MovingObject.call(this, args)
  };

  var Asteroid = Asteroids.Asteroid;
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  }
})();
