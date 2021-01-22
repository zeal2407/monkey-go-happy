
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;
var PLAY=1;
var END=2;
var gameState=PLAY;
var ground,invisibleGround


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyCollide = loadImage("monkey1.jpg");
}


function setup() {
  createCanvas(600,200)
monkey=createSprite(60,135,50,50);
monkey.addAnimation("running",monkey_running);
monkey.scale=0.09;
  
  ground=createSprite(200,190,800,20);
  invisibleGround=createSprite(201,191,800,20);
  invisibleGround.visible=false;
  ground2=createSprite(200,190,800,20);
  

  
  foodGroup=new Group;
  obstaclesGroup=new Group;
  
}


function draw() {
  background("darkgreen");
  
   stroke("black");
  textSize(20);
  fill("black");
  
  
  if(gameState===PLAY){
     ground.velocityX=-4
  if(ground.x<0){
    ground.x=ground.width/2
  }
    
    if(monkey.isTouching(foodGroup)){
    foodGroup[0].destroy();
  } 
  
  if(keyDown("space")&& monkey.y>=150){
    monkey.velocityY=-10;
  }
    food();
  obstacles();
    
   
    survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,100,50);
     
     monkey.velocityY=monkey.velocityY+0.5;
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState=END;
    }
  }
  
   else if(gameState===END){
    ground.velocityX=0;
     foodGroup.destroyEach();
     obstaclesGroup.destroyEach();
     monkey.addAnimation("collided",monkeyCollide);
     monkey.changeAnimation("collided",monkeyCollide);
       monkey.scale=0.3;
     text("Survival Time:"+survivalTime,100,50);
     survivalTime=0;
  }
  
  
 
  monkey.collide(invisibleGround);

  
  
drawSprites();
  
}

function food(){
  if(frameCount %80===0){
    var banana = createSprite(600,120,40,10);
    banana.y=Math.round(random(150,200));
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX=-3;
    banana.lifetime=200;
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    foodGroup.add(banana);
  }
  
}

function obstacles(){
  if(frameCount %300===0){
    var rock=createSprite(600,170,10,10)
    //rock.y=Math.round(random(200));
    rock.velocityX = -3;
    rock.addImage(obstacleImage);
    rock.scale=0.07
    rock.lifetime=200;
    obstaclesGroup.add(rock);
  }
}







