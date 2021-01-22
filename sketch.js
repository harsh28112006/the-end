var PLAY = 1;
var END = 0;
var gameState = PLAY;
var highScore=0;
var man,manImage,ground,groundImage, backgroundImage;
var hurdle, hurdleImage;
var Obstaclegroup;
var gameState = 0;

function preload(){
  manImage = loadImage("Images/Stick man.png");
  groundImage = loadImage("Images/ground.jpg");
  hurdleImage1 = loadImage("Images/fire.png");
  hurdleImage2 = loadImage("Images/laser.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight-150);

  man = createSprite(50,600,20,20);
  man.addImage(manImage);
  man.scale = 0.1;

  ground = createSprite(displayWidth/2,displayHeight-100,displayWidth*10,20);
  ground.addImage(groundImage);

  Obstaclegroup = createGroup();
}


function draw() {
  background(0,255,255);

  ground.velocityX = -5;

  camera.on();
  camera.position.x = ground.velocityX;
  camera.position.y =  displayHeight/2;

  man.collide(ground);
  man.velocityY = man.velocityY + 10;

  if(ground.x < 0){
    ground.x = displayWidth/2;
  }

  if(keyCode === 32 && gameState === 0){
    man.velocityY = -30;
    keyCode = null;
  }

  obstacles();

  if(man.isTouching(Obstaclegroup)){
    gameState = 1;
  }

  if(gameState === 1){
    Obstaclegroup.setVelocityXEach(0);
    ground.velocityX = 0;
    camera.position.x = 0;
  }



  drawSprites();
}

function obstacles(){
  if(frameCount%30===0){
    var rand = Math.round(random(1,2));
    hurdle = createSprite(displayWidth, displayHeight - 160, 20, 20);
    hurdle.depth = 1;
    hurdle.velocityX = -5;
    

    /*console.log(man.x);
    console.log(hurdle.x);*/

    if(rand === 1){
      hurdle.addImage(hurdleImage1);
    } else if(rand === 2){
      hurdle.addImage(hurdleImage2);
    }

    hurdle.scale = 0.5;

    Obstaclegroup.add(hurdle);
    


  }
}