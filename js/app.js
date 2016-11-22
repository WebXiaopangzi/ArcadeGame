var Score = function(){
    this.score = 0;
};

Score.prototype.render = function(){
    ctx.fillStyle = "white";
    ctx.fillRect(200,10,200,35);
    ctx.font = "34px Serif";
    ctx.fillStyle = "black";
    ctx.fillText("Score:"+this.score,200,35);
};

// all images of players
var allPlayers = [
'images/char-boy.png',
'images/char-cat-girl.png',
'images/char-horn-girl.png',
'images/char-pink-girl.png',
'images/char-princess-girl.png'];

// when the player win the game. Call the funciton to make the game harder.
// Create new player to change images;
// higher level, more bugs.
function harder(level){

    if (level === -1) {
        alert('You Lose! Try Again!');
        player = new Player(0);
        produceEnemies(4);
        score.score = 0;
        score.render();
        console.log('produce,enemy');
    } else if (level > 0 && level <= 4) {
        score.score = score.score + level * 200;
        score.render();
        alert('Level'+level+" Completed! Keep Going!");
        player = new Player(level);
        produceEnemies(3+level*2);
    } else if (level === 5) {
        alert('You totally win! Score:'+score.score+'! Play again?');
        player = new Player(0);
        produceEnemies(4);
        score.score = 0;
        score.render();
    }

}

function produceEnemies(num){
    allEnemies =[];
    for (var i = 0; i < num; i++) {
        allEnemies[i] = new Enemy();
        }
}



// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = Math.floor(Math.random()*3+1) * 73;
    this.speed = Math.floor(Math.random()*100);
    this.width = 60;
    this.height = 50;
    // console.log('create enemy instances');
    // console.log(this.speed);
    // console.log(this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt,player) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 606 && player.y<320) {
        this.x = this.x - 700 + this.speed * dt;
        this.y = Math.floor(Math.random()*3+1) * 73;
        score.score = score.score + 10 ;
        score.render();
        // console.log(player.y);
    } else if(this.x > 606){
        this.x = this.x - 700 + this.speed * dt;
        this.y = Math.floor(Math.random()*3+1) * 73;
    } else{
        this.x = this.x + this.speed * dt;
    }

    if(this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.y + this.height > player.y){
        //console.log(this.x+","+this.y+";"+player.x+","+player.y);

        //reset the image，level and score
        harder(-1);
    }
    this.render();
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(level){
    this.sprite = allPlayers[level];
    this.level = level;
    this.width = 60;
    this.height = 50;
    this.x = 101*2;
    this.y = 82*5;
};

Player.prototype.update = function(dt) {
    this.render();
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode){
    if (keyCode === 'left' && this.x > 0) {
        this.x = this.x - 101;
    }
    if(keyCode === 'up' && this.y > 0){
        this.y = this.y - 83;
        if (this.y < 0) {
            this.render();
            harder(this.level+1);
        }
    }
    if(keyCode === 'right' && this.x < 404){
        this.x = this.x +101;
    }
    if(keyCode === 'down' && this.y < 435){
        this.y = this.y + 83;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
produceEnemies(4);
var player = new Player(0);
var score = new Score();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
