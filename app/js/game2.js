var snake, squareSize, score, speed,
    updateDelay, direction, new_direction, direction2, new_direction2,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value,win;

var Game = {

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('snake', '/dropwizard-example/app//image/snake1.png');
        game.load.image('snake2', '/dropwizard-example/app//image/snake2.png');
        game.load.image('wall', '/dropwizard-example/app//image/wall.png');

        game.stage.disableVisibilityChange = true;
        
    },

    create : function() {

        // By setting up global variables in the create function, we initialise them on game start.
        // We need them to be globally available so that the update function can alter them.

        snake = [];
        snake2 =[];// This will work as a stack, containing the parts of our snake
        squareSize = 3;                // The length of a side of the squares. Our image is 3x3 pixels.
        updateDelay = 0;                // A variable for control over update rates.
        direction = 'left';
        direction2 = 'right';// The direction of our snake.
        new_direction = null;           // A buffer to store the new direction into.
        new_direction2 = null;
        addNew = false;                 // A variable used when an apple has been eaten.
        takenTab=[];
        win=0;
        
			for (var i = 0; i < 1200; i++) {
			  takenTab[i] = new Array(600);
		}

        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#061f27';

        // Generate the initial snake stack. Our snake will be 10 elements long.
       
        	snake2[0] = game.add.sprite(0, 48, 'snake2');
            snake[0] = game.add.sprite(1200-squareSize, 591, 'snake');  // Parameters are (X coordinate, Y coordinate, image)
            
            takenTab[1200-squareSize][51] = true;
            takenTab[0][591] =true;

        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
        
        game.add.text(1200/2, 20,  getCookie("username"), textStyle_Key);
        
        for (var i=0 ;i<1200;i+=3){
        	takenTab[i][42]= true;
        	takenTab[i][597]= true;
        	
        	game.add.sprite(i, 42, 'wall'); 
        	game.add.sprite(i, 597, 'wall');
        }
        for (var i=42 ;i<600;i+=3){
        	takenTab[0][i]= true;
        	takenTab[1197][i]= true;
        	
        	game.add.sprite(0, i, 'wall'); 
        	game.add.sprite(1197, i, 'wall');
        }
        
    },

    update: function() {

        // Handle arrow key presses, while not allowing illegal direction changes that will kill the player.
    	
    	var WKey = game.input.keyboard.addKey(Phaser.Keyboard.W),
    		AKey = game.input.keyboard.addKey(Phaser.Keyboard.A),
    		SKey = game.input.keyboard.addKey(Phaser.Keyboard.S),
    		DKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        /*
        if (cursors.right.isDown && direction!='left')
        {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction!='right')
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction!='down')
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction!='up')
        {
            new_direction = 'down';
        }
        
        if (DKey.isDown && direction2!='left')
        {
            new_direction2 = 'right';
        }
        else
        if (AKey.isDown && direction2!='right')
        {
            new_direction2 = 'left';
        }
        else if (WKey.isDown && direction2!='down')
        {
            new_direction2 = 'up';
        }
        else if (SKey.isDown && direction2!='up')
        {
            new_direction2 = 'down';
        }
        */
        updateDelay++;
    
        if (updateDelay % 2 == 0) {
 	
            var firstCell = snake[snake.length - 1],
            firstCell2 = snake2[snake2.length - 1];
            
            takenTab[firstCell.x][firstCell.y]= true;
            takenTab[firstCell2.x][firstCell2.y]= true;
            
            var newCell = snake[snake.length - 1], newCell2= snake2[snake.length - 1];
            

            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }
            
            if(new_direction2){
                direction2 = new_direction2;
                new_direction2 = null;
            }

            if(direction == 'right'){
            	newCell.x = firstCell.x+squareSize;
            	newCell.y = firstCell.y;	
            }
           
            else if(direction == 'left'){
            	newCell.x = firstCell.x-squareSize;
            	newCell.y = firstCell.y;            	              
            }
            else if(direction == 'up'){       
            	newCell.x = firstCell.x;
            	newCell.y = firstCell.y-squareSize;    
            }
            else if(direction == 'down'){
               
            	newCell.x = firstCell.x;
            	newCell.y = firstCell.y+squareSize;
            }
            
            if(direction2 == 'right'){
            	
            	newCell2.x = firstCell2.x+squareSize;
            	newCell2.y = firstCell2.y;
            }
            else if(direction2 == 'left'){
           
            	newCell2.x = firstCell2.x-squareSize;
            	newCell2.y = firstCell2.y;
            }
            else if(direction2 == 'up'){
              
            	newCell2.x = firstCell2.x;
            	newCell2.y = firstCell2.y-squareSize;
            }
            else if(direction2 == 'down'){
           
            	newCell2.x = firstCell2.x;
            	newCell2.y = firstCell2.y+squareSize;
            }
           
           snake.push(game.add.sprite(newCell.x,newCell.y, 'snake'))
           snake2.push(game.add.sprite(newCell2.x,newCell2.y, 'snake2'))
           
           firstCell = snake[snake.length - 1];
           firstCell2 = snake2[snake2.length - 1];
           
            this.Collision(firstCell,firstCell2);

        }

    },

    Collision: function(head,head2) {

    	if (takenTab[head.x][head.y] == true) {win = 2;game.state.start('Game_Over');}
    	if (takenTab[head2.x][head2.y] == true) {win = 1;game.state.start('Game_Over');}
    	if (takenTab[head.x][head.y] == true && takenTab[head2.x][head2.y] == true)  {win = 0; game.state.start('Game_Over');}
    },

};