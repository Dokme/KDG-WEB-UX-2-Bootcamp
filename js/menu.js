var menuState = {
    

    create: function(){
        console.log("in menu js");
        var nameLabel = game.add.text(80,80, 'my first game',{font:'50px Arial', fill:'#fffff'});
        
    },


    start: function(){
        console.log("in menu js");
        game.state.start('play');
    },







};