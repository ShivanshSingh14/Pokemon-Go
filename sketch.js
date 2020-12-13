var pikachu,background,land,crobat,attack,rocket, bomb,r;
var invisibleland;
var score=0;
var point,pointGroup,landGroup,crobatGroup,attackGroup,rocketGroup,bombGroup;
var PLAY=1,END=0
var gamestate=PLAY
function preload(){
     
pik=loadImage("p1.gif")
background1=loadImage("b1.png")
landi=loadImage("land.png")
pointi=loadImage("poke.gif")
bati=loadImage("Crobat.gif")
I=loadImage("t.gif")  
rocketi=loadImage("m.png")
bombi=loadImage("b.gif")  
ri=loadImage("r.jpg")  
}
function setup(){
createCanvas(600,400) ; 
 
  background=createSprite(300,200,600,400)
background.addImage(background1)
background.scale=1.5

background.velocityX=-4

  
pikachu=createSprite(70,360,200,200);
pikachu.addImage(pik);  
pikachu.scale=0.2
 
invisibleland=createSprite(300,400,600,1);
invisibleland.visible = false;
 
r=createSprite(300,200,10,10)
r.addImage(ri) 
r.scale=0.5  

 

pointGroup = createGroup();
landGroup=createGroup();  
crobatGroup=createGroup(); 
attackGroup=createGroup();
bombGroup=createGroup(); 
rocketGroup=createGroup();  
 
}
function draw(){
 
   
  if(gamestate===PLAY){
     if(background.x=== 200){
    background.x=300
    }
   r.visible=false
  
  pikachu.velocityY = pikachu.velocityY + 0.8
  pikachu.collide(invisibleland);
  
   

  if( keyDown("space")&& pikachu.y >= 100){
  pikachu.velocityY = -10;   
  } 
  
  if(pointGroup.isTouching(pikachu)){
    score=score+2
    pointGroup.destroyEach();
  }
  
if(pikachu.isTouching(landGroup)){ 
pikachu.collide(landGroup) 
 }  
 
  if(keyDown(UP_ARROW)){
  
  attack1();  
  }
  if (attackGroup.isTouching(crobatGroup)){
    score=score+5
    attackGroup.destroyEach();
    crobatGroup.destroyEach();
  }
  
  if (attackGroup.isTouching(bombGroup)){
    score=score+5
    attackGroup.destroyEach();
    bombGroup.destroyEach();
  }
  
  if (attackGroup.isTouching(rocketGroup)){
    score=score+10
    attackGroup.destroyEach();
    rocketGroup.destroyEach();
  }
       
  landGroup.depth=crobatGroup.depth; 
  crobatGroup.depth=crobatGroup.depth+5
  landGroup.depth=pointGroup.depth; 
  pointGroup.depth=pointGroup.depth+5
   
  
  
  
  
  spawnrocket()
  spawnbat();
  spawnpoint();
  spawnland()
 
    
    
   
       

  }
  if(crobatGroup.isTouching(pikachu)||rocketGroup.isTouching(pikachu)||bombGroup.isTouching(pikachu)){
    
    landGroup.setLifetimeEach(-1);
    pointGroup.setLifetimeEach(-1);
    crobatGroup.setLifetimeEach(-1);
    rocketGroup.setLifetimeEach(-1);
    bombGroup.setLifetimeEach(-1);
    
    score=0;
    landGroup.destroyEach()
    pointGroup.destroyEach()
    crobatGroup.destroyEach()
    rocketGroup.destroyEach()
    bombGroup.destroyEach() 
   
    
     landGroup.setVelocityXEach(0);
     pointGroup.setVelocityXEach(0);  
     crobatGroup.setVelocityXEach(0);
     rocketGroup.setVelocityXEach(0);  
     bombGroup.setVelocityXEach(0);
     background.velocityX=0
    pikachu.velocityY=0
    
       
    gamestate=END
 
  
  }
  else if(gamestate===END){
    r.visible=true
    if(mousePressedOver(r)){
     gamestate=PLAY
     background.velocityX=-4 
    }
  }
 drawSprites();
 stroke("white"); 
 textSize(20); 
 fill("blue"); 
 text("Score = "+score,280,50) 
 stroke("white"); 
 textSize(20); 
 fill("red"); 
 text("Press Space To Jump And Up Arrow To Shoot ",100,100) 
  
}


function spawnland(){
 // write your code here  
if(frameCount%200===0){ 



land = createSprite(600,90,5,5); 
land.addImage(landi)
land.scale=0.15; 
land. velocityX=-3;  
land.y=random(180,310); 

land .lifetime=200
  
pikachu.depth=land.depth; 
pikachu.depth=pikachu.depth+1;

 landGroup.add(land) 
}   
  
}

function spawnpoint(){
 // write your code here  
if(frameCount%200===0){ 
point = createSprite(600,90,40,20);  
point.addImage(pointi);
point.scale=0.15; 
point. velocityX=-3; 
point.y=random(50,380);
point.lifetime =200;
point.depth=pikachu.depth; 
point.depth=pikachu.depth+1;
pointGroup.add(point)
 
  
}   
  
}
function spawnbat(){
 // write your code here  
if(frameCount%300===0){ 
crobat = createSprite(600,90,40,20);  
crobat.addImage(bati);
crobat.scale=0.15; 
crobat. velocityX=-3; 
crobat.y=random(10,300);
crobat.lifetime =200;
crobat.depth=pikachu.depth; 
crobat.depth=pikachu.depth+1;
crobatGroup.add(crobat)
 
  
}   
  
}
 function attack1() {
  attack= createSprite(100, 100, 60, 10);
  attack.addImage(I);
  attack.x = 70;
  attack.y=pikachu.y;
  attack.velocityX = 4;
  attack.lifetime = 200;
  attack.scale = 0.3;
  attackGroup.add(attack);
   
}
function spawnrocket(){  
  if (frameCount % 240===0){
  rocket=createSprite(600,90);  
  rocket.addImage(rocketi);
  rocket.y=Math.round(random(50,360));  
  rocket.velocityX=-3; 
  rocket.scale=0.5
    
  bomb=createSprite(600,360) ;
  bomb.addImage(bombi); 
  bomb.y=Math.round(random(10,360));  
    
  
 bomb.y=rocket.y;
    
 bomb.velocityX=-4; 
 bomb.scale=0.1   
    bomb.lifetime = 200;
    rocket.lifetime = 200;
  bombGroup.add(bomb) 
  rocketGroup.add(rocket)  
    
    
      }
  
  
} 

