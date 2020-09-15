var monkey, monkeyimg, ground, gameOverimg, gameState, BananasGroup, StonesGroup, backdropimg, backdrop, gameOver, bananasimg,banana,count,stonesimg,stone,count;

function preload() {
  monkeyimg=loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  backdropimg=loadImage("backdrop.jpg");
  gameOverimg=loadImage("https___i.pinimg.com_originals_c6_ff_ed_c6ffedfe8cc0e75a4e5508daa63d50c3.jpg");
  bananasimg=loadImage("banana.png");
  stonesimg=loadImage("stone.png");
}

function setup() {
  createCanvas(550, 400);
  
  gameState=1;
  
  backdrop=createSprite(200,200,20,20);
  backdrop.addImage(backdropimg);
  backdrop.x = backdrop.width / 2;
  backdrop.velocityX = -6;
  backdrop.scale=2.4;
  
  monkey=createSprite(80,290,20,50);
  monkey.addAnimation("Yashi",monkeyimg);
  monkey.scale=0.09;
  
  BananasGroup=new Group();
  StonesGroup=new Group();
  
  gameOver = createSprite(275,200);
  gameOver.addImage(gameOverimg);
  gameOver.scale = 0.95;
  gameOver.visible = false;
  
  ground = createSprite(550/2,300,550,5);  
  
  count = 0;
}

function draw() {
  background(220);
  
  //console.log(gameState);
  
  if(gameState === 1){
    
    if (backdrop.x < 0) {
      backdrop.x = backdrop.width / 2;
    }

    //scoring
    count = count + Math.round(getFrameRate()/61);
    monkey.collide(ground);
    
     //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 200){
      monkey.velocityY = -12 ;
    }
    //add gravity
      monkey.velocityY = monkey.velocityY + 0.8;
  
    //console.log(monkey.y);
    
    
    //display bananas
    Bananas();
    //display stones
    Stones();
    
    score();
    
    if(monkey.isTouching(BananasGroup)){
      //monkeyscale();
      BananasGroup.destroyEach();
    }
    
    //End the game when monkey is touching the stone
    if(StonesGroup.isTouching(monkey)){
      monkey.scale=0.08;
      gameState = 0;
      monkey.velocityX=0;
      monkey.collide(StonesGroup);
    }
  }
  
  else if(gameState === 0) {
    
    //StonesGroup.visible=false;
    gameOver.visible = true;
    
    ground.visible = false;
    
    //set velcity of each game object to 0
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.visible=false;
    
    StonesGroup.destroyEach();
    BananasGroup.destroyEach();
    
  }
  
  if((keyDown("space") && gameState===0)) {
    reset();
  }

  drawSprites();
  
  fill("purple");
  textSize(20);
  text("Survival Time: "+ count, 380, 50);
}

function reset(){
  gameState=1;
  count=0;
  gameOver.visible=false;
  monkey.visible=true;
  ground.visible=true;
}

function Bananas() {
  //code for bananas
  if (frameCount % 60 === 0) {
    var banana = createSprite(400,300,40,10);
    //banana.y = random(150,180);
    banana.y = random(175,205);
    banana.addImage(bananasimg);
    banana.scale = 0.04;
    banana.velocityX = -6
    
    //assign lifetime to the variable
    banana.lifetime = 134;

    //banana.debug=true;
    banana.setCollider("rectangle",0,20,1000,460);
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    BananasGroup.add(banana);
  }
}

function Stones() {
  if(frameCount % 60 === 0) {
    var stone = createSprite(400,285,10,40);
    stone.velocityX = - (6 + 3*count/100);
    
    stone.addImage(stonesimg);
    
    //stone.debug=true;
    stone.setCollider("circle",0,0,200);
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.1;
    stone.lifetime = 70;
    //add each obstacle to the group
    StonesGroup.add(stone);
  }
}

function score(){
  switch (count) {
      case 10: monkey.scale=0.12;
             break;
      case 20: monkey.scale=0.135;
             break;
      case 30: monkey.scale=0.155;
             break;
      case 40: monkey.scale=0.16;
             break;
      default:break
    }
}

