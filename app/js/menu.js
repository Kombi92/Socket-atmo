var Menu = {

    preload : function() {
        // Load all the needed resources for the menu.
        game.load.image('menu', '/dropwizard-example/app/image/Start.jpg');
    },

    create: function () {

        // Add menu screen.
        // It will act as a button to start the game.
       // this.add.button(0, 0, 'menu', this.startGame, this);
    	 
    	var image = game.add.sprite(0, 0, 'menu');
    	        game.cache.getImage('menu');
    	        
    	        var imgW = game.cache.getImage("menu").width,
    	        imgH = game.cache.getImage("menu").height;
    	     
    	        image.scale.setTo(1200/imgW ,600/imgH);
    	        
    	        image.inputEnabled = true;
    	        
    	        image.events.onInputDown.add(this.startGame, this);
    },
    	  

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};