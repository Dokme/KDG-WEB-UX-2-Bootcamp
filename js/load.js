var text;
var button;
var x = 32;
var y = 80;
var game;
var counter = 0;
var bg;
var movingRight = true;
var movingRightM = true;


var loadState = {
    preload: function () {
        game.load.image('button', './assets/presstostart.png');
       // game.load.image('startscreen', './assets/start.jpg')
        game.load.image('bg', './assets/background.png');
        game.load.spritesheet('duck', './assets/birds.png', 197,197);
        game.load.spritesheet('mario', 'assets/mario.png', 30, 30);
        game.load.image('button', './assets/KOP.png');
        game.load.image('TITLE', './assets/MARIOCHUTE.png');
        game.load.image('PIJP', './assets/PIJP.png');
        game.load.image('bricks', './assets/bricks.png');
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        bg = game.add.tileSprite(0, 0, 1080, 1920, 'bg');
        bricks = game.add.tileSprite(0, 0, 1080, 1920, 'bricks');
    
        game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

        bricks.scale.setTo(.5);

        duck = this.game.add.sprite(-200,game.world.centerY+55,'duck')
        duck.scale.setTo(.5);
        duck.frame = 2; 

        mario = this.game.add.sprite(game.world.centerX-20, 100,'mario');
        mario.scale.setTo(1.5);
        mario.frame = 0;

        TITLE = this.game.add.sprite(game.world.centerX, game.world.centerY, 'TITLE');
        TITLE.anchor.setTo(.5);
        TITLE.scale.setTo(.30);

        button = this.game.add.sprite(game.world.centerX, game.world.centerY-20, 'button');
        button.anchor.setTo(.5);
        button.scale.setTo(.3);


        //PIJP = this.game.add.sprite(game.world.centerX, game.world.centerY-40,'PIJP')
        //PIJP.anchor.setTo(.5);
        //PIJP.scale.setTo(.48);
          

        mario.animations.add('right', [0], 5, true);
        mario.animations.add('left', [1], 5, true);

        game.time.events.add(Phaser.Timer.SECOND, fadePicture, this);

        duck.animations.add('right',[0,1,2],5,true);
        duck.animations.add('left',[3,4,5],5,true);


        game.physics.arcade.enable(duck);
        game.physics.arcade.enable(mario);

        duck.body.velocity.x = 300;
        mario.body.velocity.y = 100;
        game.input.onDown.add(goToGame, this);
    },



update: function (){
    if (counter < Infinity) {
        bg.tilePosition.y -= 10;
    } else {
        bg.tilePosition.y -= 0;
    }

    if (counter < Infinity) {
        bricks.tilePosition.y -= 5;
    } else {
        bricks.tilePosition.y -= 0;
    }


    if (movingRight) {
        duck.animations.play('right');
        duck.body.velocity.x = 300;
       
    }
    else
     {
        duck.animations.play('left');
        duck.body.velocity.x = -300;
        
    }
    if(movingRight && duck.x >= window.innerWidth)
    {
        movingRight = false;
    }
    if(!movingRight && duck.x <= -300)
    {
        movingRight = true;
    }

/*
    if (movingRightM) {
        mario.animations.play('right');
        mario.body.velocity.y = 100;
    }
    else
     {
        mario.animations.play('left');
        mario.body.velocity.y = -100; 
    }
*/
    if(mario.y >= window.innerHeight)
    {
        mario.y = -20;
    }
},

updateCounter: function () {
    counter++;
}
};

var goToGame = function () {
game.state.start('play');
};

var fadePicture = function() {

game.add.tween(button).to( { alpha: 0 }, 80000, Phaser.Easing.Linear.None, true);
game.add.tween(button).to( { alpha: 100}, 80000, Phaser.Easing.Linear.None, true);
};
