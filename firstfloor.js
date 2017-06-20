var demonX=0;
var colorkey= '#8ED6FF';
var color='green';

var canvas= document.getElementById('mycanvas');
var context= canvas.getContext('2d');
	var myRectangle = {
        x: 50,
        y: 0,
        width: 150,
        height: 50,
        borderWidth: 5
    };

    var moveX=0;
    var moveY=0;
    var player = {
		x: canvas.width-50,
		y:canvas.height-50,
		status: 1,
		unlock: 0,
		floor: 1
   }


   function directionplayer(e){
	if(e.keyCode==87){
		collidetest(0,-5,0,-10);
	}
	if(e.keyCode==65){
		collidetest(-5,0,-10,0);
	}
	if(e.keyCode==83){
        collidetest(0,5,0,10);
	}
	if(e.keyCode==68){
		collidetest(5,0,10,0);
	}
}
function drawRectangle(myRectangle, context) {
  context.beginPath();
  context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
  context.fillStyle ='black';
  context.fill();
  context.lineWidth = myRectangle.borderWidth;
  context.strokeStyle = 'black';
  context.stroke();
}

function colorcanvas(){
  context.beginPath();
  context.rect(0, 0, 800, 500);
  context.fillStyle = "red";
  context.fill();
}

window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
	function animate(startTime) {
        // update
        var time = (new Date()).getTime() - startTime;
        var amplitude = 130;

        // in ms
        var period = 3000;
        var nextX = amplitude * Math.sin(time * 2 * Math.PI / period);
        demonX = nextX;

        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw
        	colorcanvas();
        	keyunlock();

        	if(player.unlock===0)
        		key();

        	else
        		showdoor();

	        demons();
	        firstfloor1();
	        drawplayer();


        // request new frame
        requestAnimFrame(function() {
          animate(startTime);
        });
}

setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(startTime);
      }, 1000);


function demons(){
    context.beginPath();
    context.moveTo(450+demonX,450);
    context.lineTo(500+demonX,500);
    context.lineTo(400+demonX,500);
    context.lineTo(450+demonX,450);
    context.lineJoin = 'miter';
    context.fillStyle ='blue';
     // set line color
      context.strokeStyle = 'blue';
      context.stroke();
      context.fill();
}

function firstfloor1(){
	drawRectangle(myRectangle, context);


	myRectangle.width= 50;
	myRectangle.height= 200;
	drawRectangle(myRectangle, context);


	myRectangle.x += 100;
	drawRectangle(myRectangle, context);


	myRectangle.y= 150;
	myRectangle.width=200;
	myRectangle.height= 50;
	drawRectangle(myRectangle, context);


	myRectangle.x+= 150; // x is 300
	myRectangle.width= 50;
	myRectangle.height= -100;
	drawRectangle(myRectangle, context);


	myRectangle.y= 50; //y is 50
	myRectangle.width=400;
	myRectangle.height= 80;
	drawRectangle(myRectangle, context);


	myRectangle.x = 600;// x is 600
	myRectangle.width= 100;
	myRectangle.height = 300;
	drawRectangle(myRectangle, context);


	myRectangle.y=250;//y is 250
	myRectangle.height=100;
	myRectangle.width= -400;
	drawRectangle(myRectangle, context);


	myRectangle.x=200;//x is 200
	myRectangle.height=200;
	myRectangle.width= 50;
	drawRectangle(myRectangle, context);


	myRectangle.y+=100;//y is 350
	myRectangle.height=100;
	myRectangle.width=-150;
	drawRectangle(myRectangle, context);


	myRectangle.x+= 400; //600
	myRectangle.width= 100;
	myRectangle.height=100;
	drawRectangle(myRectangle, context);



	myRectangle.height=0;
	myRectangle.width=0;
	drawRectangle(myRectangle,context);

	myRectangle.x=50;
	myRectangle.y= 0;
	myRectangle.width = 150;
	myRectangle.height =50;

}

var playerSprite= document.createElement("img");
playerSprite.src="spritekey.gif";

window.addEventListener("keydown", directionplayer, false);


var drawplayer= function() {

	context.clearRect(0, 0, canvas.width, canvas.height);
	colorcanvas();
	keyunlock();
	demons();

	if(player.unlock===0)
		key();
	else 
		showdoor();


	firstfloor1();
	context.fillStyle=color;
	context.arc(player.x+moveX, player.y+moveY, 10, 0, 2 * Math.PI, false);
	context.fill();
}

function collidetest(x,y,u,v){

    var imageData = context.getImageData(player.x+moveX+x+u, player.y+moveY+y+v, 1,1);
    var data = imageData.data;



    if(data[0]==0){
    	if(data[1]==0){
    		   if(data[2]==0){
    				return 0;
    		    }		   
    	}
    	else if(data[1]==255)
    	{
    		if(data[2]==255){
    			window.alert('YOU HAVE WON!!!');
    			player.floor= 2;
    			secondfloor();
    		}
    	}
    }

    else{

    	   moveX+=x;
    	   moveY+=y;
		   drawplayer();
    }


    if(data[0]==0){
    	if(data[1]==0){
    		if(data[2]==255){        	 
    			gameover();
    		}
    	}
    }

}
 function key(){
 	      var centerX = 0;
      var centerY = 0;
      var radius = 20;

      // save state
      context.save();

      // translate context
      context.translate( 250 , 100 );

      // scale context horizontally
      context.scale(2, 1);

      // draw circle which will be stretched into an oval
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

      // restore to original state
      context.restore();

      // apply styling
      context.fillStyle = colorkey;
      context.fill();
      context.font = 'italic 20pt Calibri';
      context.fillStyle = 'violet';
      context.fillText('key',230, 110);
      context.lineWidth = 0;
      context.strokeStyle = 'red';
      context.stroke();
 }

function keyunlock(){
	if(player.x + moveX === 250)
		if(player.y + moveY ===100){
			player.unlock =1;
			color='white';
			showdoor();
		}
}


function showdoor(){
  context.beginPath();
  context.rect(600, 150, -40, 80);
  context.fillStyle ='#00ffff';
  context.fill();
  context.lineWidth = '5';
  context.strokeStyle = 'yellow';
  context.stroke();
  context.beginPath();
  context.arc(585, 190, 10, 0, 2*Math.PI, false);
  context.fillStyle = 'purple';
  context.fill();
  context.stroke();

}


	colorcanvas();
	keyunlock();

	if(player.unlock===0)
		key();

    else
    	showdoor();

	firstfloor1();
	drawplayer();
	demons();

