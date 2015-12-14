var snake, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

var Game = {

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('snake', '/dropwizard-example/app//image/snake1.png');
        game.load.image('snake2', '/dropwizard-example/app//image/snake2.png');
        
    },

    create : function() {

        // By setting up global variables in the create function, we initialise them on game start.
        // We need them to be globally available so that the update function can alter them.

        snake = [];
        snake2 =[];// This will work as a stack, containing the parts of our snake
        squareSize = 3;                // The length of a side of the squares. Our image is 3x3 pixels.
        score = 40;                      // Game score.
        speed = 0;                      // Game speed.
        updateDelay = 0;                // A variable for control over update rates.
        direction = 'right';
        direction2 = 'right';// The direction of our snake.
        new_direction = null;           // A buffer to store the new direction into.
        new_direction2 = null;
        addNew = false;                 // A variable used when an apple has been eaten.

        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#061f27';

        // Generate the initial snake stack. Our snake will be 10 elements long.
        for(var i = 0; i < 10; i++){
        	 snake[i] = game.add.sprite(1100+i*squareSize, 50, 'snake');
            snake2[i] = game.add.sprite(5+i*squareSize, 500, 'snake2');  // Parameters are (X coordinate, Y coordinate, image)
           
            
        }

        // Add Text to top of game.
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

        // Score.
        game.add.text(30, 20, "WYNIK", textStyle_Key);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
        // Speed.
        game.add.text(1200-(1200*0.1), 20, "PRĘDKOŚĆ", textStyle_Key);
        speedTextValue = game.add.text(1200-(1200*0.03), 18, speed.toString(), textStyle_Value);
        
        game.add.text(1200/2, 20,  getCookie("username"), textStyle_Key);


    },

    update: function() {

        // Handle arrow key presses, while not allowing illegal direction changes that will kill the player.
    	
    	var WKey = game.input.keyboard.addKey(Phaser.Keyboard.W),
    		AKey = game.input.keyboard.addKey(Phaser.Keyboard.A),
    		SKey = game.input.keyboard.addKey(Phaser.Keyboard.S),
    		DKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    	

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
        else if (AKey.isDown && direction2!='right')
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
        
        

        // A formula to calculate game speed based on the score.
        // The higher the score, the higher the game speed, with a maximum of 10;
        speed = Math.min(10, Math.floor(score/5));
        // Update speed value on game screen.
        speedTextValue.text = '' + speed;

        // Since the update function of Phaser has an update rate of around 60 FPS,
        // we need to slow that down make the game playable.

        // Increase a counter on every update call.
        updateDelay++;

        // Do game stuff only if the counter is aliquot to (10 - the game speed).
        // The higher the speed, the more frequently this is fulfilled,
        // making the snake move faster.
        if (updateDelay % (10 - speed) == 0) {


            // Snake movement

            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                
                var firstCell2 = snake2[snake2.length - 1],
                lastCell2 = snake2.shift(),
                oldLastCellx2 = lastCell2.x,
                oldLastCelly2 = lastCell2.y;
                snake2.unshift(game.add.sprite(oldLastCellx2, oldLastCelly2, 'snake2'));

            // If a new direction has been chosen from the keyboard, make it the direction of the snake now.
            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }
            
            if(new_direction2){
                direction2 = new_direction2;
                new_direction2 = null;
            }


            // Change the last cell's coordinates relative to the head of the snake, according to the direction.

            if(direction == 'right'){

                lastCell.x = firstCell.x + 3;
                lastCell.y = firstCell.y;
                
            }
            else if(direction == 'left'){
                lastCell.x = firstCell.x - 3;
                lastCell.y = firstCell.y;
              
            }
            else if(direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 3;
                
                
            }
            else if(direction == 'down'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 3;
             
            }
            
            if(direction2 == 'right'){
                
                lastCell2.x = firstCell2.x + 3;
                lastCell2.y = firstCell2.y;
            }
            else if(direction2 == 'left'){
               
                
                lastCell2.x = firstCell2.x - 3;
                lastCell2.y = firstCell2.y;
            }
            else if(direction2 == 'up'){
               
                
                lastCell2.x = firstCell2.x;
                lastCell2.y = firstCell2.y - 3;
            }
            else if(direction2 == 'down'){
                
                lastCell2.x = firstCell2.x;
                lastCell2.y = firstCell2.y + 3;
            }


            // Place the last cell in the front of the stack.
            // Mark it as the first cell.

            snake.push(lastCell);
            snake2.push(lastCell2);
            firstCell = lastCell;
            firstCell2 = lastCell2;

            // End of snake movement.



            // Increase length of snake if an apple had been eaten.
            // Create a block in the back of the snake with the old position of the previous last block (it has moved now along with the rest of the snake).
            if(addNew){
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                snake2.unshift(game.add.sprite(oldLastCellx2, oldLastCelly2, 'snake2'));
                
            }
            // Check for collision with self. Parameter is the head of the snake.
            this.selfCollision(firstCell,firstCell2);
            
           // this.selfCollision2(firstCell2);

            // Check with collision with wall. Parameter is the head of the snake.
            this.wallCollision(firstCell,firstCell2);
            //this.wallCollision2(firstCell2);
        }


    },

    

    selfCollision: function(head,head2) {

        // Check if the head of the snake overlaps with any part of the snake.
        for(var i = 0; i < snake2.length - 1; i++){
        	
            if(head.x == snake[i].x && head.y == snake[i].y){

                // If so, go to game over screen.
                game.state.start('Game_Over');
            }
            if(head.x == snake2[i].x && head.y == snake2[i].y){

                // If so, go to game over screen.
                game.state.start('Game_Over');
            }
            if(head2.x == snake[i].x && head2.y == snake[i].y){

                // If so, go to game over screen.
                game.state.start('Game_Over');
            }
            if(head2.x == snake2[i].x && head2.y == snake2[i].y){

                // If so, go to game over screen.
                game.state.start('Game_Over');
            }
            
        }

    },

    wallCollision: function(head,head2) {

        // Check if the head of the snake is in the boundaries of the game field.

        if(head.x >= 1200 || head.x < 0 || head.y >= 600 || head.y < 0){


            // If it's not in, we've hit a wall. Go to game over screen.
            game.state.start('Game_Over');
        }
        
        if(head2.x >= 1200 || head2.x < 0 || head2.y >= 600 || head2.y < 0){


            // If it's not in, we've hit a wall. Go to game over screen.
            game.state.start('Game_Over');
        }


    }

};