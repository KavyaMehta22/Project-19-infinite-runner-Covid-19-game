var gameState = PLAY;
var PLAY = 1;
var END = 0;

var ground;

var background, backgroundImg;

var boy, boy_running, boy_collided;

var coins, coinsImg, coins_group;

var virus, virus_group, virusImg1, virusImg2, virusImg3, virusImg4, virusImg5;

var reset, game_over;

var jumpSound, game_overSound, resetSound, warningSound;

var tree1, tree2, tree3, tree1Img, tree2Img, tree3Img, trees_group;

var obstacle1, obstacle2, obstacle3, obstacle4, obstacleImg1, obstacleImg1, obstacleImg2, obstacleImg3, obstacleImg4, obstacles_group;

var score=0;
var coinsScore=0;



function preload(){
 backgroundImg=loadImage("infinite back 3.jpg");
  
boy_running=loadAnimation("running boy 1.jpg", "running boy 2.jpg", "running boy 3.jpg", "running boy 4.jpg", "running boy 5.jpg", "running boy 6.jpg");
boy_collided=loadAnimation("boy collided.jpg");
  
obstacle1=loadImage("stone1.jpg");
  obstacle2=loadImage("stone2.jpg");
  obstacle3=loadImage("cactus.jpg");
  obstacle4=loadImage("cactus4.png");
  
tree1=loadImage("tree1.jpg");
tree2=loadImage("tree2.jpg");
tree3=loadImage("tree3.jpg");
  
game_overImg=loadImage("game over 2.jpg");
reset=loadImage("restart.png");
  
virus1=loadImage("virus2.jpg");
virus2=loadImage("virus3.jpg");
virus3=loadImage("virus4.jpg");
  
  
  
}


function setup(){
 createCanvas(400,400);
  
background1 = createSprite(0,0,800,800);
background.addImage = backgroundImg;
background.scale = 2.5;
  
ground = createSprite(200,190,390,10);
ground.scale = 1.5;
ground.visible = false;
  
boy = createSprite(10,ground.y,50,50);
boy.addImage()
boy.scale = 0.5
  
gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);
  
restart = createSprite(300,140);
restart.addImage(restartImg);
  
 
gameOver.scale = 0.5;
restart.scale = 0.5;
  
}

function draw(){
  

  text("Score: "+ score, 500,50);
  text("coinsScore: "+ score, 500,80);
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
        jumpSound.play();
    }
    
    
    boy.velocityY = boy.velocityY + 0.8
  
    
    spawnCoins();
    spawnObstacles();
    spawnTrees();
    spawnVirus();
    
    if(coins_group.isTouching(boy)){
      
      coinsScore=coinsScore+1;
      coin.visible=false;
    }
    
    if(virus_group.isTouching(boy)){
        //boy.velocityY = -12;
        
        gameState = END;
        dieSound.play()
      
      if(obstacles_group.isTouching(boy)){
        //boy.velocityY = -12;
        
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     
      boy.changeAnimation("collided", boy_collided);
    
     if(mousePressedOver(restart)) {
      reset();
    }
     
     
      ground.velocityX = 0;
      boy.velocityY = 0
      
     
       
    virus_group.setLifetimeEach(-1);
    coins_group.setLifetimeEach(-1);
     obstacles_group.setLifetimeEach(-1);
     trees_group.setLifetimeEach(-1);
     
     virus_group.setVelocityXEach(0);
     coins_group.setVelocityXEach(0);
     obstacles_group.setLifetimeEach(0);
     trees_group.setLifetimeEach(0);
   }
  
 
  
  boy.collide(Ground);
  
  


  drawSprites();

  
}

function reset(){
 gameState=PLAY; 
gameOver.visible=false;
restart.visible=false;
  
virus_group.destroyEach();
coins_group.destroyEach();
obstacles_group.destroyEach();
trees_group.destroyEach();
  
boy.changeAnimation("running",boy_running);
  score=0;
}


function spawnVirus(){
 if (frameCount % 60 === 0){
   var virus = createSprite(600,165,10,40);
   virus.velocityX = -(6 + score/100);
   
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: virus.addImage(virus1);
              break;
      case 2: virus.addImage(virus2);
              break;
      case 3: virus.addImage(virus3);
              break;
      default: break;
    }
   
               
    virus.scale = 0.5;
    virus.lifetime = 300;
   
   
    virus_group.add(virus);
 }
}

function spawnCoins() {

  if (frameCount % 20 === 0) {
    var coins = createSprite(600,120,40,10);
    coins.y=-5;
   Math.round(random(300,350,320,370));
    coins.addImage(coinsImg);
    coins.scale = 0.5;
    coins.velocityX = -3;
    
     
    coins.lifetime = 200;
    
    
    coins.depth = boy.depth;
    boy.depth = boy.depth + 1;
    
    
    coins_group.add(coins);
  }
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   virus.velocityX = -(8 + score/100);
   
    
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
   
               
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   
    obstacles_group.add(obstacle);
 }
}

function spawnTrees() {

  if (frameCount % 20 === 0) {
    var tree = createSprite(600,120,40,10);
    tree.y=-5; Math.round(random(300,350,320,370));
    tree.addImage(TreesImg);
    tree.scale = 0.5;
    tree.velocityX = -3;
    
     
    tree.lifetime = 200;
    
    
    tree.depth = boy.depth;
    boy.depth = boy.depth + 1;
    
    
    trees_group.add(trees);
  }
}
}