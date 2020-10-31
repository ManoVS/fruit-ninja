var sword, swordImage;
var sword_sound;

//gameStates
var PLAY = 1;
var END = 0;
var gameState = 1;

var Monster, Monster_Image;
var MonsterGroup;

var Fruit;
var Fruit1, Fruit2, Fruit3,Fruit4;
var FruitsGroup;

var r;

var score;
var score_section = 0;

var gameOver,gameOver_Sound,gameOver_Image;

var position;

function preload() {
  swordImage = loadImage("sword.png");
  sword_sound = loadSound("knifeSwooshSound.mp3");
  
  gameOver_Image = loadImage("gameover.png");
  gameOver_Sound = loadSound("gameover.mp3");
  
  Monster_Image = loadAnimation("alien1.png","alien2.png");
  
  Fruit1 = loadImage("fruit1.png");
  Fruit2 = loadImage("fruit2.png");
  Fruit3 = loadImage("fruit3.png");
  Fruit4 = loadImage("fruit4.png");
  

}

function setup() {
  createCanvas(500, 500);
  
  MonsterGroup = new Group(); 
  FruitsGroup = new Group();

  sword = createSprite(40, 200, 20, 20);
  sword.addImage("sword", swordImage);
  sword.scale = 0.7;

}

function draw() {
  background("LightBlue");
  
  if(gameState === PLAY){
    //to move the sword
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
     fruits();
     Enemy();
    
    
    if(sword.isTouching(FruitsGroup)){
       FruitsGroup.destroyEach();
       score_section = score_section + 2;
       sword_sound.play();
       }

     if(sword.isTouching(MonsterGroup)){
       gameState = END;
       gameOver_Sound.play();
     }
  }
  else if(gameState === END){
    sword.addImage("sword",gameOver_Image);
    FruitsGroup.setVelocityXEach(0);
    MonsterGroup.setVelocityYEach(0);
    sword.x = 250;
    sword.y = 250;
  }
  
  fill("red");
  textSize(20);
  text("score:" + score_section,400,35);


  drawSprites();

}

function fruits() {
  if (World.frameCount % 80 === 0) {
    Fruit = createSprite(400, 200, 20, 20);
    Fruit.scale = 0.2;
    
    r = Math.round(random(1,4));
    
    if(r === 1){
      Fruit.addImage(Fruit1);
    }
    else if(r === 2){
      Fruit.addImage(Fruit2);
    }
    else if (r === 3){
      Fruit.addImage(Fruit3);
    }
    else{
      Fruit.addImage(Fruit4);
    }
    
   position = Math.round(random(1,4));
    
    if(position === 1){
      Fruit.x = 500;
      Fruit.velocityX = -7;
      }
    else if(position === 2){
         Fruit.x = 0;
         Fruit.velocityX = 7;
         }
    else if(position === 3){
         Fruit.y = 0;
         Fruit.velocityY = 7;
         }
    else if(position === 4){
         Fruit.y = 500;
         Fruit.velocityY = -7;
         }
    
    
    FruitsGroup.setLifetimeEach(100);
    
    FruitsGroup.add(Fruit);
  }

}

function Enemy() {
  if (World.frameCount % 200 === 0) {
    Monster = createSprite(400, 200, 20, 20);
    Monster.addAnimation("Monster", Monster_Image);
    Monster.y = Math.round(random(100, 300));
    Monster.velocityX = -8;
    Monster.lifetime = 50;
    MonsterGroup.add(Monster);
    
     
    var Position = Math.round(random(1,4))
    if(Position === 1){
      Monster.x = 500;
      Monster.velocityX = -7;
      }
    else if(Position === 2){
         Monster.x = 0;
         Monster.velocityX = 7;
         }
    else if(Position === 3){
         Monster.y = 0;
         Monster.velocityY = 7;
         }
    else if(Position === 4){
         Monster.y = 500;
         Monster.velocityY = -7;
         }
    
  }
}