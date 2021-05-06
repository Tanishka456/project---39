var PLAY = 1;
var END = 0;
var gameState = PLAY;

var human, humanImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score;
var ground, groundImage;
var gameOver,restart;
var gameOverImage, restartImage;


function preload(){
 
  
  
  obstacle1 = loadImage("zombie1.jpg");
  obstacle2 = loadImage("zombie2.jpg");
  obstacle3 = loadImage("zombie3.jpg");
  humanImage = loadImage("human.png");
  groundImage = loadImage("ground.jpg");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.jpg");

}

function setup() {
  createCanvas(windowWidth,windowHeight );

  var message = "This is a message";
 console.log(message)
  
  human = createSprite(60,height-70,20,50);
  human.addImage(humanImage);
  human.scale = 0.1;
  
  //creating the background
//   background = createSprite(600,600,10,10);
//   background.addImage(backgroundImage);
//   background.velocityX=-3;
//   background.x = background.width/2;
  
  
  //creating the sun
  
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2;
  
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  //create Obstacle Group
  obstaclesGroup = createGroup();
  

  
  human.setCollider("rectangle",0,0,human.width,human.height);
  human.debug = true;
  
  score = 0;
  
}

function draw() {
  background(0,255,0);
  
 
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if((touches.length > 0 ||keyDown("space"))&& human.y >= height-120) {
        human.velocityY = -12;
        jumpSound.play();
       touches = [];
      
    }
    
   human.changeAnimation("running",trex_running);
    
    //add gravity
    human.velocityY = human.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(human)){
        //human.velocityY = -12;
        //jumpSound.play();
        gameState = END;
       // dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      if(mousePressedOver(restart)) {
      reset();
      touches = [];
    }

     
     //change the trex animation
      //trex.changeAnimation("collided", trex_collided);
    
     
     
      ground.velocityX = 0;
      human.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  human.collide(invisibleGround);
  
 

  drawSprites();
}

function reset(){
 
  gameOver.visible=false;
  restart.visible=false;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
  //trex.changeAnimation("running",trex_running);
  score=0;
   gameState= PLAY;
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,height-95,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
           break;
      case 3: obstacle.addImage(obstacle3);
             break;
      
     
      //default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    
    human.depth = human.depth + 1;
    
    
  }
}


