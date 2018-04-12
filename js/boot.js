console.log("in bootjs");

var bootState = {
    
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('load');
    }
}

