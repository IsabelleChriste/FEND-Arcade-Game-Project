///------------------Enemy------------------------------------
//
// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.eWidth = 90;
    this.eHeight = 58;
    this.lifes = 5;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 500) {
        this.x = -200;
    }
    this.checkCollisionsE(dt);

};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(-10, 60, 120);
var enemy2 = new Enemy(-110, 145, 120);
var enemy3 = new Enemy(-40, 230, 120);
var enemy4 = new Enemy(-250, 60, 120);
var enemy5 = new Enemy(-110, 145, 120);
var enemy6 = new Enemy(-290, 145, 120);
var enemy7 = new Enemy(-231, 230, 120);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];
// Once an enemy has collided with a player, the reset function sends him back to the start.
Enemy.prototype.resetEnemy = function () {
        this.x = -177;
    }
// CheckCollisionE detects collisions between the enemy and the player, each enemy in this game has five lifes.
Enemy.prototype.checkCollisionsE = function (dt) {
    if (this.x < (player.x + player.width) && (this.x + this.eWidth) >= player.x && this.y < (player.y + player.height) && (this.y + this.eHeight) >= player.y) {
        this.resetEnemy();
        player.reset();
        this.lifes--;

        console.log(this.lifes);
        for (var z = 0; z < allEnemies.length; z++) {
            if (this.lifes === 0) {
                alert('Game Over');
                this.lifes = 5;
                player.reset();

            }
        }

    }
};
//------------------Player---------------------------------------
//
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
    this.width = 60;
    this.height = 70;
    this.score = 0;
};
Player.prototype.update = function () {
    if (this.y > 401 || this.x > 500 || this.x < -10) {
        this.reset();
    }

    this.scoreUpdate();
};
Player.prototype.reset = function () {
    this.x = 204;
    this.y = 400;
};
Player.prototype.handleInput = function (keypressed) {
    if (keypressed === 'left') {
        this.x = this.x - 100;
    }
    if (keypressed === 'right') {
        this.x = this.x + 100;
    }
    if (keypressed === 'up') {
        this.y = this.y - 82;
    }
    if (keypressed === 'down') {
        this.y = this.y + 82;
    }
};
var player1 = new Player(204, 400);
var player = player1;
// scoreUpdate adds the number of time the player reaches the river. 3 times and the game is won.
Player.prototype.scoreUpdate = function () {
    if (this.y < -8) {
        this.reset();
        this.score++;
        console.log(this.score);
        if (this.score === 3) {
            alert('You won');
            this.score = 0;
            this.reset();
        }
    }
};
// Now instantiate your objects.
// Place the player object in a variable called player
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
