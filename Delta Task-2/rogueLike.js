var map=[[]];
var level=0;
var move = 2;
var canvas= document.getElementById('mycanvas');
var context= canvas.getContext('2d');


var tileSprite1= document.createElement("img");
tileSprite1.src="echotiles.png";

var playerSprite= document.createElement("img");
playerSprite.src = "sprite1.png";

var doorSprite= document.createElement("img");
doorSprite.src = "door.jpg";

var keySprite= document.createElement("img");
keySprite.src = "key.png";

var demonSprite = document.createElement("img");
demonSprite.src = "blackDragon.png";



var doorProp= {
	x: 250,
	y: 0,
	width : 50,
	height : 100,
	keyProp: {
		x: 0,
		y: 0,
		width: 48,
		height: 48,
		keyUnlock: 0,
		tile: 0,
		goThrough1: 5,
		goThrough2: 21
	},
	goThrough1 : -1,
	goThrough2 : -1 
}

var demonProp= {
	demons: false,
	x: 250,
	y: 150,
	width: 100,
	height: 100
}



var player = {
	x: 775,
	y:475,
	direction: 4,
	stop: false,
	state:4,
	tile: 159,
	levelcomplete: false
};

var pressedKeys = {
	left : false,
	right : false,
	up : false,
	down : false
}

var keyMap = {
	68 : 'right',
	65 : 'left',
	87 : 'up',
	83 : 'down'
}
function level1() {

	doorProp= {
		x: 250,
		y: 0,
		width : 50,
		height : 100,
		keyProp: {
			x: 0,
			y: 0,
			width: 48,
			height: 48,
			keyUnlock: 0,
			tile: 0,
			goThrough1: 6,
			goThrough2: 22
		},
		goThrough1 : -1,
		goThrough2 : -1 
	}
	
	player = {
		x: 775,
		y:475,
		direction: 4,
		stop: false,
		state:4,
		tile: 159,
		levelcomplete: true
	};
	
	pressedKeys = {
		left : false,
		right : false,
		up : false,
		down : false
	}
	
	
}


function level2(){


		player = {
		x: 775,
		y: 475,
		direction: 4,
		stop: false,
		state:4,
		tile: 159,
		levelcomplete: true
	};

	doorProp= {
		x: 750,
		y: 0,
		width : 50,
		height : 100,

		keyProp: {
			x: 0,
			y: 0,
			width: 48,
			height: 48,
			tile: 0,
			keyUnlock: 0,
			goThrough1: 15,
			goThrough2: 31
		},

		goThrough1: -1,
		goThrough2: -1
    };

    pressedKeys = {
		left : false,
		right : false,
		up : false,
		down : false
      };
    level=1;
	
}

function level3() {
			player = {
			x: 775,
			y: 475,
			direction: 4,
			stop: false,
			state:4,
			tile: 159,
			levelcomplete: true
		};

		doorProp= {
			x: 0,
			y: 0,
			width : 50,
			height : 100,

			keyProp: {
				x: 0,
				y: 450,
				width: 48,
				height: 48,
				tile: 144,
				keyUnlock: 0,
				goThrough1:0,
				goThrough2:16
			},

			goThrough1: -1,
			goThrough2: -1
    	};

    	pressedKeys = {
			left : false,
			right : false,
			up : false,
			down : false
        };

        level = 2;
}


var game =1;
document.getElementById('timer').innerHTML = 02 + ":" + 00;
startTimer();

/*StartTimer takes the value in innerHTML i.e the time left and splits whatever is before and after : and takes it in an array. 0-index will be minutes and 1-index will be seconds.If the value of game becomes 0 i.e gameover is invoked the values in timearray is set to 5 minutes so that time is reset thus alering the innerHTML as well. This function is called every 1000 milliseconds using a setTimeout so that second can be decreased by 1. */


function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);

  if(Number(timeArray[0])==0){
  	if(Number(timeArray[1])==0){
  		gameover();
  	}
  }
  if( game ===0 || player.levelcomplete){

  	timeArray[0]=02;
  	timeArray[1]=00;
  	game=1;
  	player.levelcomplete = false;
  }
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  //if(m<0){alert('timer completed')}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;

  setTimeout(startTimer, 1000);
}

/* This function returns a seconds "string". String because innerHTML csnnot take in values.
Hence used the lenient equality for checking*/


function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

/*Game over function is invoked whenever we get out by either colliding with the demon(Triangle) Or get stucksomewhere Or if the timer runs out.*/

function gameover(){
    window.alert("GAME OVER! YOU LOSE!!");
    if(level === 0){
    	level1();
    }
    game=0;
    player.levelcomplete = true;
}



function colorcanvas(){
  context.beginPath();
  context.rect(0, 0,canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fill();
}
function levels(){
	map[0]= {
		cols: 16,
		rows: 10,
		tsize: 50,
		tiles: [
			1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,
			1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,
			1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,
			1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,
			1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,
			1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,
			0,0,0,1,0,1,1,1,1,1,1,0,0,1,1,1,
			0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,
			0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,
			0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,
		],

		tileType: 1,

		getTile: function(col, row){
			return this.tiles[row * map[level].cols + col];
		}
	};

	map[1]= {
		cols: 16,
		rows: 10,
		tsize: 50,
		tiles: [
			2,2,0,0,0,2,2,2,2,2,2,2,2,2,2,2,
			0,2,0,0,0,2,0,0,0,0,0,0,0,0,2,2,
			2,2,0,0,0,2,2,2,2,2,2,0,0,0,2,2,
			2,0,0,0,0,0,0,0,0,0,2,0,0,0,2,2,
			2,2,0,0,0,2,2,2,2,2,2,0,0,0,2,2,
			0,2,0,0,0,2,0,0,0,0,0,0,0,0,2,2,
			2,2,0,0,0,2,2,2,2,2,2,0,0,0,2,2,
			2,0,0,0,0,0,0,0,0,0,2,0,0,0,2,2,
			2,2,2,0,2,2,2,2,2,0,2,0,0,0,2,2,
			2,2,2,2,2,2,0,2,2,2,2,0,0,0,2,2,
		],

		tileType: 2,

		getTile: function(col, row){
			return this.tiles[row * map[level].cols + col];
		}
	}
	map[2]= {
		cols: 16,
		rows: 10,
		tsize: 50,
		tiles: [
			1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,
			1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,
			1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,
			1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,
			1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,
			1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,
			1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,
			1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
			1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		],

		tileType: 1,

		getTile: function(col, row){
			return this.tiles[row * map[level].cols + col];
		}
	}



}



function draw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	colorcanvas();
	for (var c = 0; c < map[level].cols; c++) {
  		for (var r = 0; r < map[level].rows; r++) {
  		 var tile = map[level].getTile(c, r);
  		 	if (tile !== 0) { 	
  		 		// 0 => empty tile
  		 		context.drawImage(
    				tileSprite1, // image
    				(tile - 1) * map[level].tsize, // source x
    				0, // source y
    				map[level].tsize, // source width
    				map[level].tsize, // source height
    				c * map[level].tsize, // target x
    				r * map[level].tsize, // target y
    				map[level].tsize, // target width
    				map[level].tsize // target height
    	        );
  		    }

  	/*	    if(demonSprite.demons) {
  		    	context.drawImage(
    				demonSprite, // image
    				0, // source x
    				0, // source y
    				demonProp.width, // source width
    				demonProp.height, // source height
    				demonProp.x, // target x
    				demonProp.y, // target y
    				demonProp.width, // target width
    				demonProp.height // target height
    	    	);
  		    }
                                                                   */

  		    player.tile =  (Math.floor(player.y/map[level].tsize)) * map[level].cols +Math.floor(player.x/map[level].tsize);
  		 	context.drawImage(
    			playerSprite, // image
    			(player.state-1) * map[level].tsize , // source x
    			(player.direction -1) * map[level].tsize, // source y
    			map[level].tsize, // source width
    			map[level].tsize, // source height
    			player.x-map[level].tsize/2, // target x
    			player.y-map[level].tsize/2, // target y
    			map[level].tsize, // target width
    			map[level].tsize // target height
    	    );
    	}
	}
	    if(doorProp.keyProp.keyUnlock===1) {
    		context.drawImage(
    			doorSprite, // image
    			0, // source x
    			0, // source y
    			doorProp.width, // source width
    			doorProp.height, // source height
    			doorProp.x, // target x
    			doorProp.y, // target y
   				doorProp.width,// target width
    			doorProp.height,// target height
        	);
    }

        if(doorProp.keyProp.keyUnlock===0) {
    		context.drawImage(
    			keySprite, // image
    			0, // source x
    			0, // source y
    			doorProp.keyProp.width, // source width
    			doorProp.keyProp.height, // source height
    			doorProp.keyProp.x, // target x
    			doorProp.keyProp.y, // target y
   				doorProp.keyProp.width,// target width
    			doorProp.keyProp.height,// target height
        	);
        }
}




windnload = function(){
	draw();
}


levels();

function changeState3(){
	if(player.stop){
		player.state= 3;
		setTimeout("changeState1()",200);
	}
}
function changeState1(){
	if(player.stop){
		player.state = 1;
		setTimeout("changeState3()", 200);
	}
}
function keyDown(event) {
	if(!player.stop) {
		setTimeout("changeState1()", 10);
	}
	player.stop= true;
	var key = keyMap[event.keyCode];
	pressedKeys[key] = true;
}

function keyup(event) {
	player.stop =false;
	var key = keyMap[event.keyCode];
	pressedKeys[key]= false;
	player.state = 2;
}

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyup, false);


function update(progress){

  	if (pressedKeys.left && checkOutLeft()) {
  	  player.x -= move;
  	  player.direction =2;
  	}

  	if (pressedKeys.right && checkOutRight()) {
  	  player.x += move;
  	  player.direction = 3;
  	}

  	if (pressedKeys.up && checkOutUp()) {
  	  player.y -= move;
  	  player.direction = 4;
  	}

  	if (pressedKeys.down && checkOutDown()) {
  	  player.y += move;
  	  player.direction = 1;
  	}
	
}

function loop(timeStamp) {
	var progress = (timeStamp - lastRender);

	/*if(demonProp.x<=550) {
		demonProp.x += progress;
	}

	else
	{
		demonProp.x = 250;
	}

	*/


	update(progress/10);
	draw();

	lastRender = timeStamp;
	window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);

function checkOutLeft() {
	if(map[level].tiles[player.tile] === map[level].tileType) {
		if(map[level].tiles[Math.floor(player.y/map[level].tsize) * map[level].cols +Math.floor((player.x-30)/map[level].tsize)]=== map[level].tileType){
			if(player.x-30 > 0){
				keyCheck();
				doorCheck();
				return true;
			}
		}
	}
	else {
		return false;
	}
}


function checkOutRight() {
	if(map[level].tiles[player.tile] === map[level].tileType) {
		if(map[level].tiles[(Math.floor(player.y/map[level].tsize)) * map[level].cols +Math.floor((player.x+30)/map[level].tsize)]=== map[level].tileType){
			if((player.x+30)<canvas.width){
				keyCheck();
				doorCheck();
				return true;
			}
		}
	}
	else {
		return false;
	}
}


function checkOutUp() {
	if(map[level].tiles[player.tile] === map[level].tileType) {
		if(map[level].tiles[Math.floor((player.y-30)/map[level].tsize) * map[level].cols +Math.floor((player.x)/map[level].tsize)]=== map[level].tileType){
			keyCheck();
			doorCheck();
			return true;
		}
	}
	else {
		return false;
	}
}


function checkOutDown() {
	if(map[level].tiles[player.tile] === map[level].tileType) {
		if(map[level].tiles[Math.floor((player.y+30)/map[level].tsize) * map[level].cols +Math.floor((player.x)/map[level].tsize)]=== map[level].tileType){
			keyCheck();
			doorCheck();
			return true;
		}
	}
	else {
		return false;
	}
}

function keyCheck() {
	if(player.tile=== doorProp.keyProp.tile){
		console.log('yo');
		doorProp.goThrough1=doorProp.keyProp.goThrough1;
		doorProp.goThrough2=doorProp.keyProp.goThrough2;
		setTimeout(function(){
			doorProp.keyProp.keyUnlock=1;
		},500);
	}
}


function doorCheck() {
	if(player.tile=== doorProp.goThrough1 || player.tile=== doorProp.goThrough2){
		levelcomplete = true;
		window.alert("You have completed LEVEL" + level);
		if(level!=2){
			newLevel();
		}
		else{
			window.alert("You have completed the game");
		}
	}
}


function newLevel() {
	if(level===1) {
		level3();
	}

	if(level === 0) {
		level2();
    }
}