var Game_Over = {

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('gameover', '/dropwizard-example/app/image/Game_Over.jpg');
        game.load.image('draw', '/dropwizard-example/app/image/Draw.jpg');
    },

    create : function() {
        
    	var image = game.add.sprite(0, 0, 'gameover');
        game.cache.getImage('gameover');
        var image2;
        
        textStyle = { font: "bold 60px sans-serif",fontStyle: "italic", fill: "#ffffff", align: "center" };
        
        var imgW = game.cache.getImage("gameover").width,
        imgH = game.cache.getImage("gameover").height;
     
        image.scale.setTo(1200/imgW ,600/imgH);
        
        
        image.inputEnabled = true;
       
        
       if (win ==2) game.add.text(200, 600/2,  " Green", textStyle);
       else if (win ==1) game.add.text(200, 600/2,  "White", textStyle);
       else { image2 = game.add.sprite(0, 0, 'draw'); image2.scale.setTo(1200/imgW ,600/imgH);  image2.inputEnabled = true; image2.events.onInputDown.add(this.startGame, this);}
        image.events.onInputDown.add(this.startGame, this);


        
    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};