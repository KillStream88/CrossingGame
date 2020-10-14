var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

let screenWidth = 1000;
let screenHight = 500;
let width = 50;
var isGameLive = true;
var isRightKeyPressed = false;
var isLeftKeyPressed = false;

class GameCharacter
{
    constructor(x, y, width, height, color, speed)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.maxSpeed = 4;
    }

    moveVertically()
    {
        if(this.y > screenHight - 100 || this.y < 50)
        {
            this.speed = -this.speed;
        }
        this.y += this.speed;
    }

    moveHorizontally()
    {
        this.x += this.speed;
    }
}

var enemies = 
[
    new GameCharacter(200, 225, width, width, "rgb(0, 0, 255)", 2),
    new GameCharacter(450, screenHight - 100, width, width, "rgb(0, 0, 255)", 3),
    new GameCharacter(700, 50, width, width, "rgb(0, 0, 255)", 4),
];

var player = new GameCharacter(50, 200, width, width, "rgb(0, 255, 0)", 0);

var win = new GameCharacter(screenWidth - width, 200, width, 100, "rgb(0, 0, 0)", 0);

var sprites = {};

var loadSprites = function()
{
    sprites.player = new Image();
    sprites.player.src = "images/hero.png";

    sprites.background = new Image();
    sprites.background.src = "images/floor.png";

    sprites.enemy = new Image();
    sprites.enemy.src = "images/enemy.png";

    sprites.win = new Image();
    sprites.win.src = "images/chest.png";
}

document.onkeydown = function(event)
{
    var keyPressed = event.keyCode; 
    if(keyPressed == 39)
    {
        isRightKeyPressed = true;
        player.speed = player.maxSpeed;
    }
    else if(keyPressed == 37)
    {
        isLeftKeyPressed = true;
        player.speed = -player.maxSpeed;
    }
};

document.onkeyup = function(event)
{
    var keyUp = event.keyCode;
    if(keyUp == 39)
    {
        isRightKeyPressed = false;
        if(isLeftKeyPressed)
        {
            player.speed = -player.maxSpeed;
        }
        else
        {
            player.speed = 0;
        }
    }
    else if (keyUp == 37)
    {
        isLeftKeyPressed = false;
        if(isRightKeyPressed)
        {
            player.speed = player.maxSpeed;
        }
        else
        {
            player.speed = 0;
        }
    }

    // var keyPressed = event.keyCode;
    // if(keyPressed == 39 || keyPressed == 37)
    // {
    //     player.speed = 0;
    // }
};

var checkCollisions = function(rect1, rect2)
{
    var xOverlap = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.width, rect2.width);

    var yOverlap = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.height, rect2.height);

    return xOverlap && yOverlap;
}

var draw = function()
{
    ctx.clearRect(0, 0, screenWidth, screenHight);

    ctx.drawImage(sprites.background, 0, 0);
    ctx.drawImage(sprites.player, player.x, player.y);
    ctx.drawImage(sprites.win, win.x, win.y);
    
    enemies.forEach(function(element)
    {
        ctx.drawImage(sprites.enemy, element.x, element.y)
    });
}

var update = function()
{
    player.moveHorizontally();

    enemies.forEach(function(element)
    {
        if(checkCollisions(player, element))
        {
            endGameLogic("Game over!");
        }
        element.moveVertically();
    });

    if(checkCollisions(player, win))
    {
        endGameLogic("You win!!");
    }
}

var endGameLogic = function(text)
{
    isGameLive = false;
    alert(text);
    window.location = "";
}

var step = function()
{
    update();
    draw();

    if(isGameLive)
    {
        window.requestAnimationFrame(step);
    }
}

loadSprites();

step();