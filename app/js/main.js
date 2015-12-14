var game;

game = new Phaser.Game(1200, 600, Phaser.AUTO, 'mainContent');

game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);
game.state.start('Menu');
 
var myButton = document.getElementById("clickButton");
var myText = document.getElementById("helloText");

//myButton.addEventListener('click', doSomething, false)

function doSomething() {
	myText.textContent = "hello, world!";
}