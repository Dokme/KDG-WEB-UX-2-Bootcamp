var jpBoost;
var bigBoost;
var smallBoost;
var touchJetpack = false;
var touchBigger = false;
var touchSmaller = false;
var cursors;
var level = 1;
var ledges;
var mysterieboxes;
var bg;
var laserOnScreen;
var damageText;
var scoreText;
var scoreCounter;
var startPlatforms;
var scoreNewLevel;
var dead = false;
var waitToPlay = true;
var counter = 0;
var gameTime = 0;
var gapBetweenLedges = window.innerWidth / 3.5;
var size = window.innerWidth / 543;
var newGameBool = false;
var originaltileY;
var originalWorld;
var ledge1;
var totalHeightOfLedge;
var tileY;
var world;
var smallerboost;
var resetSmallerboost;
var setSmallerBoostImage = false; //smaller

var biggerboost;
var resetBiggerboost;
var setBiggerBoostImage = false; // bigger

var speedDown;
var resetSpeedDownboost;
var setJetpackImage = false; //jetpack

var speedUp;
var resetSpeedUpboost;
var birdOnScreen;

var playState = {
    preload: function () {
        game.load.spritesheet('mario', 'img/mario2.png', 105, 145);
        game.load.spritesheet('cd', 'img/cd.png', 259, 259);
        game.load.spritesheet('jpBoost', 'img/BoostBoxJPSpriteSheet.png', 300, 280);
        game.load.spritesheet('bigBoost', 'img/BoostBoxBigSpriteSheet.png', 300, 280);
        game.load.spritesheet('smallBoost', 'img/BoostBoxSmallSpriteSheet.png', 300, 280);
        game.load.spritesheet('laserWarning', 'img/laserWarning.png', 100, 60);
        game.load.spritesheet('bird', 'img/birds.png', 197, 197);

        //images
        game.load.image('box', 'img/mysteriebox.jpg');
        game.load.image('bg', 'img/bg1.png');
        game.load.image('ledge1', 'img/ledgeSmall.png');
        game.load.image('ledge2', 'img/ledgeMedium.png');
        game.load.image('ledge3', 'img/ledgeLarge.png');
        game.load.image('ledge4', 'img/ledgeXLarge.png');
        game.load.image('gameOver', 'img/gameover.png');
        game.load.image('newGame', 'img/newgame.png');
        game.load.image('laser', 'img/laser.png');
    },

    create: function () {
        laserOnScreen = false;
        birdOnScreen = false;
        gameTime = 0;
        dead = false;
        touchJetpack = false;
        touchBigger = false;
        touchSmaller = false;
        waitToPlay = true;
        startPlatforms = 10;
        scoreText = 0;
        scoreCounter = 0;
        scoreNewLevel = scoreCounter;
        tileY = 5;
        world = 2.5;
        originaltileY = tileY;
        originalWorld = world;
        gapBetweenLedges = window.innerWidth / 3.5;
        size = window.innerWidth / 543;
        newGameBool = false;
        
        tileY = 10;
        world = 5;

        setSmallerBoostImage = false; //smaller


        setBiggerBoostImage = false; // bigger


        setJetpackImage = false; //jetpack

        game.physics.startSystem(Phaser.Physics.ARCADE);
        bg = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'bg');

        newGameBool = true;

        // mario
        mario = game.add.sprite(160, 100, 'mario');
        mario.scale.setTo(0.4);
        mario.frame = 2;
        mario.animations.add('right', [0], 5, true);
        mario.animations.add('left', [1], 5, true);

        //cd

        cd = game.add.sprite(game.world.centerX, game.world.centerY, 'cd');
        cd.scale.setTo(0.5);
        cd.frame = 2;
        cd.anchor.setTo(0.5, 0.5);
        cd.animations.add('test', [0, 1, 2], 1, true);


        //jetpack boost
        jpBoost = game.add.button(0, 0, 'jpBoost', actionOnTapJetPack, this);
        jpBoost.inputEnabled = true;
        jpBoost.scale.setTo(0.2);
        jpBoost.frame = 1;

        jpBoost.animations.add('jpBoostActive', [0], 1, true);
        jpBoost.animations.add('jpBoostInActive', [1], 1, true);

        jpBoost.inputEnable = true;


        //big boost
        bigBoost = game.add.button(0, 60, 'bigBoost', actionOnTapBigger, this);
        bigBoost.inputEnabled = true;
        bigBoost.scale.setTo(0.2);
        bigBoost.frame = 1;

        bigBoost.animations.add('bigBoostActive', [0], 1, true);
        bigBoost.animations.add('bigBoostInActive', [1], 1, true);

        bigBoost.inputEnable = true;


        //small boost
        smallBoost = game.add.button(0, 120, 'smallBoost', actionOnTapSmaller, this);
        smallBoost.inputEnabled = true;
        smallBoost.scale.setTo(0.2);
        smallBoost.frame = 1;

        smallBoost.animations.add('smallBoostActive', [0], 1, true);
        smallBoost.animations.add('smallBoostInActive', [1], 1, true);

        smallBoost.inputEnable = true;


        //laserBeam
        var xRandomLaser = game.rnd.integerInRange(0, window.innerWidth)
        laser = game.add.sprite(xRandomLaser, game.world.height + 200, 'laser');
        laser.anchor.setTo(0.5, 1);
        laser.scale.setTo(1);
        laser.visible = false;

        //laserWarning
        laserWarning = game.add.sprite(xRandomLaser, game.world.height - 20, 'laserWarning');
        laserWarning.anchor.setTo(0.5);
        laserWarning.scale.setTo(0.7);
        laserWarning.frame = 1;

        laserWarning.animations.add('warning', [0, 1], 20, true);
        laserWarning.visible = false;

        game.time.events.add(Phaser.Timer.SECOND * 10, laserWarningBeam, this);

        game.physics.arcade.enable(laser);


        //bird
        
        
        var yRandomBird = game.rnd.integerInRange(window.innerHeight / 2, window.innerHeight)
        var xRandomBird = game.rnd.integerInRange(window.innerHeight/2, window.innerHeight)
        bird = game.add.sprite(0, yRandomBird, 'bird');
        bird.scale.setTo(0.5);
        bird.frame = 2;
        
        bird.animations.add('right', [0, 1, 2], 5, true);
        bird.animations.add('left', [3, 4, 5], 5, true);
        bird.visible = false;
        
        game.physics.arcade.enable(bird);

     
        

        game.time.events.loop(Phaser.Timer.SECOND, updateGameTime, this);

        ledges = game.add.group();
        ledges.enableBody = true;
        ledges.position.x = 0;
        ledges.position.y = 0;

        mysterieboxes = game.add.group();
        mysterieboxes.enableBody = true;


        game.physics.enable(mario, Phaser.Physics.ARCADE);
        mario.body.collideWorldBounds = true;
        //set player bounce
        mario.body.bounce.set(0.1);

        //setting gyroscope update frequency
        gyro.frequency = 2;

        //start gyroscope detection
        gyro.startTracking(function (o) {
            //updating mario velocity
            mario.body.velocity.x += o.gamma / 15;
        });

        cursors = game.input.keyboard.createCursorKeys();

        //verander scale van ledges

        ledges.scale.setTo(size, size);

        ledges.y = 0;
        //maxLedges, aantalPlatforms, mysterieboxesRandomMax
        renderLedges(1, startPlatforms, 0, 0);

        damageText = game.add.text(game.world.centerX, game.world.centerY, '', {
            font: "100px Tahoma",
            fill: "#000",
            align: "center",
        })

        damageText.anchor.setTo(0.5);

        scoreText = game.add.text(game.world.centerX, 50, 'SCORE: 0 ', {
            font: "20px Tahoma",
            fill: "#000",
            align: "center",
            fontWeight: "bold"
        })

        scoreText.anchor.setTo(0.5, 0);



        game.time.events.loop(Phaser.Timer.SECOND, updateCounterScore, this);

        game.time.events.loop(Phaser.Timer.SECOND*10, activateBird, this);
        game.time.events.loop(Phaser.Timer.SECOND*15, activateLaser, this);
        //endgame
        gameOverText = game.add.sprite(game.world.centerX, game.world.centerY, 'gameOver');
        newGameText = game.add.button(game.world.centerX, game.world.centerY + 60, 'newGame', newGame, this);
        gameOverText.anchor.setTo(0.5, 0.5);
        newGameText.anchor.setTo(0.5, 0.5);
        gameOverText.visible = false;
        newGameText.visible = false;
        gameOverText.frame = 1;
        newGameText.frame = 1;
        gameOverText.scale.setTo(0.5);
        newGameText.scale.setTo(0.5);


    },

    update: function () {
        ////console.log(smallBoost);
        if(dead)
        {
            KillAll();
        }

        
        //////console.log(ledges);
        ////console.log(ledges.position.y);
        ////console.log(ledges.height * (-1));

        // ledge.height = 5000

        // ledge.position.y * (-1) < -5000 ledge.height * (-1)
        if (ledges.position.y < (totalHeightOfLedge * (-1))) {
            ////console.log("buiten scherm");
            ledges.removeAll(true);
            ledges.y = 0;
            startPlatforms = startPlatforms + 5;
            renderLedges(1, startPlatforms, 0, 1);

            tileY = tileY * 1.2;
            world = world * 1.2;
            originaltileY = tileY;
            originalWorld = world;

        }
        // ////console.log("buiten scherm");
        /*
        if(scoreCounter - scoreNewLevel == 20)
        {
            scoreNewLevel = scoreCounter;
            ////console.log("update render ledges");
            ledges.removeAll(true);
            ledges.x = 0;
            ledges.y = 0;
            renderLedges(2, 20 , 10 );
            tileY = tileY * 1.2 ;
            world = world * 1.2;
            originaltileY = tileY;
            originalWorld = world;
        }
        */

        //mario animations
        if (mario.body.velocity.x >= 0) {
            mario.animations.play('right');
        } else {
            mario.animations.play('left');
        }

        //render
        if (counter < 100) {
            bg.tilePosition.y -= tileY;
            ledges.position.y -= world;
            mysterieboxes.position.y -= world;
        } else {
            bg.tilePosition.y -= tileY;
            ledges.position.y -= world;
            mysterieboxes.position.y -= world;
        }

        //cd animations
        if (gameTime < 3) {
            cd.animations.play('test');
        } else {
            cd.animations.stop('test');
            cd.kill();
        }

        //jetpack animations

        if (!setJetpackImage) {
            jpBoost.animations.play('jpBoostInActive');
        } else {
            jpBoost.animations.play('jpBoostActive');
        }

        if (setJetpackImage && touchJetpack) {
            speedDownboost = game.time.events.add(Phaser.Timer.SECOND * 0.1, speedDown, this);
        }


        //bigger animations
        if (!setBiggerBoostImage) {
            bigBoost.animations.play('bigBoostInActive');
        } else {
            bigBoost.animations.play('bigBoostActive');
        }

        if (setBiggerBoostImage && touchBigger) {
            biggerboost = game.time.events.add(Phaser.Timer.SECOND * 0.1, bigger, this);
        }


        //smaller animations
        if (!setSmallerBoostImage) {
            smallBoost.animations.play('smallBoostInActive');
        } else {
            smallBoost.animations.play('smallBoostActive');
        }

        if (setSmallerBoostImage && touchSmaller) {
            smallerboost = game.time.events.add(Phaser.Timer.SECOND * 0.1, smaller, this);
        }

        //bird
        
     

        game.physics.arcade.overlap(mario, bird, birdDamage, null, this);
        game.physics.arcade.overlap(mario, laser, laserDamage, null, this);
        game.physics.arcade.overlap(mario, ledges, damage, null, this);
        checkActiveBoosts();


        if(birdOnScreen)
        {
            movebird();
            //if (bird.position.x > window.innerWidth + 5 || bird.position.y < window.innerHeight)
            //{
             //   birdOnScreen = false;
            //}
        }
    },

    render: function(){
       game.debug.body(mario);
       game.debug.body(laser);
       game.debug.body(bird);
   }

};

var movebird = function(){
    //console.log("functie triggered");
    
        
        //bird.body.velocity.x = 300;
        bird.position.x += world;
        bird.position.y -= world;
        bird.animations.play("right");
    
    }


var activateBird = function(){
    var yRandomBird = game.rnd.integerInRange(window.innerHeight / 2, window.innerHeight - 50)
    birdOnScreen = true;
    bird.x = 0;
    bird.y = yRandomBird;
    bird.visible = true;
}

var movebird = function(){
    //console.log("functie triggered");
    
        
        //bird.body.velocity.x = 300;
        bird.position.x += world;
        bird.position.y -= world;
        bird.animations.play("right");
    
    }


var activateLaser = function(){
    laserOnScreen = true;
    laserWarningBeam();

}

var KillAll = function(){
    mario.visible = false;
    bigBoost.visible = false;
    bigBoost.inputEnabled = false;
    jpBoost.visible = false;
    jpBoost.inputEnabled = false;
    smallBoost.visible = false;
    smallBoost.inputEnabled = false;

    

};

var laserWarningBeam = function () {
    
    var xRandomLaser = game.rnd.integerInRange(0, window.innerWidth)
    laser.x = xRandomLaser;
    
    laserWarning.x = xRandomLaser;
    

    console.log(laser.x);
    console.log(laser.y);


    laserWarning.animations.play('warning');
    game.time.events.add(Phaser.Timer.SECOND * 4, laserWarningStop, this);
    laserWarning.visible = true;
};


var laserWarningStop = function () {
    laserWarning.animations.stop('warning');
    laserWarning.visible = false;
    laser.visible = true;
    game.time.events.add(Phaser.Timer.SECOND, laserBeamStop, this);
};

var laserBeamStop = function () {
    laser.visible = false;
}

var laserBeam = function () {
    var xRandomLaser = game.rnd.integerInRange(0, window.innerWidth)
    laser.x = xRandomLaser;
    laser.y = game.world.centerY + 100;


    console.log(laser.x);
    console.log(laser.y);
    //
    //laser = game.add.sprite(xRandomLaser, game.world.height + 200, 'laser');
    //laser.anchor.setTo(0.5, 1);
    //laser.scale.setTo(1);
    //laser.visible = false;

    //laserWarning
   // laserWarning = game.add.sprite(xRandomLaser, game.world.height - 20, 'laserWarning');
    laserWarning.x = xRandomLaser;
    laserWarning.y =  game.world.height - 20;
}

var laserDamage = function (mario, laser) {
    if (laser.visible) {
        mario.visible = false;
        gameOverText.visible = true;
        newGameText.visible = true;
        dead = true;
    }
    
    

};

var birdDamage = function (mario, bird) {
    mario.visible = false;
    gameOverText.visible = true;
    newGameText.visible = true;
    dead = true;
}


var checkActiveBoosts = function () {
    if (touchBigger || touchJetpack || touchSmaller) {

    } else {
        tileY = originaltileY;
        world = originalWorld;
    }
};







var actionOnTapJetPack = function () {
    touchJetpack = true;

    tileY = tileY / 2;
    world = world / 2;

};

var actionOnTapBigger = function () {
    touchBigger = true;
    tileY = tileY * 2;
    world = world * 2;

};

var actionOnTapSmaller = function () {
    touchSmaller = true;


};





var damage = function (mario, ledges) {

    if (ledges.key != 'box' && !touchBigger) {
        mario.visible = false;
        gameOverText.visible = true;
        newGameText.visible = true;
        dead = true;
        
        
    
        //console.log("birdonscreen is true");

        
    } else {
        EnableBoost();
        ledges.kill();

        // mystereibox aangeraakt roep functie op;

    }
};

var EnableBoost = function () {

    randomBoost = game.rnd.integerInRange(1, 3);
    if (touchSmaller || touchJetpack || touchBigger) {

    } else {
        tileY = originaltileY;
        world = originalWorld;
    }

    /*
    game.time.events.remove(smallerboost);
    game.time.events.remove(resetSmallerboost);
    game.time.events.remove(biggerboost);
    game.time.events.remove(resetBiggerboost);
    game.time.events.remove(speedDown);
    game.time.events.remove(resetSpeedDownboost);
    game.time.events.remove(speedUp);
    game.time.events.remove(resetSpeedUp);
    
    mario.scale.setTo(1);

    */
    if (randomBoost == 1) {
        // ////console.log("smaller boost");

        setSmallerBoostImage = true;
        ////console.log("smallerboost op true");

        //smallerboost = game.time.events.add(Phaser.Timer.SECOND * 0.1, smaller, this);

    } else if (randomBoost == 2) {

        setBiggerBoostImage = true;

        // biggerboost = game.time.events.add(Phaser.Timer.SECOND * 0.1, bigger, this);

    } else if (randomBoost == 3) {

        setJetpackImage = true;
    }


};




var smaller = function () {
    ////console.log("smaller functie actief");
    mario.scale.setTo(0.2);

    resetSmallerboost = game.time.events.add(Phaser.Timer.SECOND * 4, resetSmaller, this);

};

var resetSmaller = function () {
    mario.scale.setTo(0.4);
    setSmallerBoostImage = false;
    touchSmaller = false;
    game.time.events.remove(smallerboost);
    game.time.events.remove(resetSmallerboost);

};




var bigger = function () {

    mario.scale.setTo(0.8);
    resetBiggerboost = game.time.events.add(Phaser.Timer.SECOND * 4, resetBigger, this);
    setBiggerBoostImage = false;
};

var resetBigger = function () {

    mario.scale.setTo(0.4);

    touchBigger = false;
    game.time.events.remove(biggerboost);
    game.time.events.remove(resetBiggerboost);

};



var speedUp = function () {



    resetSmallerboost = game.time.events.add(Phaser.Timer.SECOND * 4, resetSpeedUp, this);

};


var resetSpeedUp = function () {




    game.time.events.remove(speedUp);
};

var speedDown = function () {



    resetSmallerboost = game.time.events.add(Phaser.Timer.SECOND * 4, resetSpeedDown, this);

};


var resetSpeedDown = function () {

    setJetpackImage = false;
    touchJetpack = false;
    game.time.events.remove(speedDown);
    game.time.events.remove(resetSmallerboost);
};




var updateCounterScore = function () {
    if (!dead && !waitToPlay) {
        //////console.log(waitToPlay);
        if (gameTime > 2) {
            scoreCounter++;
        }
        scoreText.setText('SCORE: ' + scoreCounter);
    }
};








var renderLedges = function (maxLedges, aantalPlatforms, mysterieboxesRandomMax, isSecondRun) {
    var windowheight = window.innerHeight;
    var ledgeheigt = 64;
    var height_ledgeheight = windowheight - ledgeheigt;
    var y_posDifference = (height_ledgeheight / 2); //+150
    var ledgeWidth = 543;
    ////////console.log(window.innerWidth * (-1))


    var platforms = [
        ['ledge1'],
        ['ledge2'],
        ['ledge3'],
        ['ledge4'],
    ]

    for (var index = 0; index < aantalPlatforms; index++) {
        random = game.rnd.integerInRange(0, maxLedges)
        var xRandom = game.rnd.integerInRange(0, window.innerWidth / 2)
        //         random tussen 0 en innerwidth                                    foto  
        if (isSecondRun == 1) {
            waitToPlay = false;
            ledges.create(xRandom, (index + 2) * y_posDifference + y_posDifference, platforms[random][0])
            var rnd1 = game.rnd.integerInRange(0, mysterieboxesRandomMax);
            var rnd2 = game.rnd.integerInRange(0, mysterieboxesRandomMax);
            if (rnd1 == rnd2) {
                randomX = game.rnd.integerInRange(0, window.innerWidth);
                //plaats een mysteriebox tussen deze en de volgende
                ledges.create(randomX, index * y_posDifference + y_posDifference + ledgeheigt + 10, 'box');
                //////console.log("box aangemaakt");
            }
        } else {
            if (index <= 4) {
                // ledges.create(xRandom, index * y_posDifference + y_posDifference + 500, platforms[random][0])
            } else {
                waitToPlay = false;
                ledges.create(xRandom, index * y_posDifference + y_posDifference, platforms[random][0])
                var rnd1 = game.rnd.integerInRange(0, mysterieboxesRandomMax);
                var rnd2 = game.rnd.integerInRange(0, mysterieboxesRandomMax);
                if (rnd1 == rnd2) {
                    randomX = game.rnd.integerInRange(0, window.innerWidth);
                    //plaats een mysteriebox tussen deze en de volgende
                    ledges.create(randomX, index * y_posDifference + y_posDifference + ledgeheigt + 10, 'box');
                    //////console.log("box aangemaakt");
                }
            }
        }
    }


////console.log(ledges);
totalHeightOfLedge = (ledges.children[ledges.length - 1].y) - ((ledgeheigt / 2) * aantalPlatforms);
};



var updateCounter = function () {
    counter++;
}


var updateGameTime = function () {
    gameTime++;
    //////console.log(gameTime);
}


var newGame = function () {
    // newGameBool = true;
    //mario.visible = true;
    //scoreCounter = 0;
    //dead = false;

    //ledges.removeAll(true)
    //ledges.worldPosition.x = 0;
    //ledges.worldPosition.y = 0;

    //gameOverText.visible = false;
    //newGameText.visible = false;
    //renderLedges();
    //////console.log(ledges);
    // scoreCounter = 0;
    game.state.start(game.state.current);
}