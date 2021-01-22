const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;

var ground;

var score = 0;
var particle;

var turn = 0;

var gameState = "start";

function setup() {

  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2, height, width, 20);

  for(var j = 75; j<= width; j = j+50){
    plinkos.push(new Plinko(j, 75))
  }
  for(var j = 50; j<= width-10; j = j+50){
    plinkos.push(new Plinko(j, 175))
  }
  for(var j = 75; j<= width-10; j = j+50){
    plinkos.push(new Plinko(j, 275))
  }
  for(var j = 50; j<= width-10; j = j+50){
    plinkos.push(new Plinko(j ,375))
  }
  
  for(var k = 0; k <=width; k = k + 80){
    divisions.push(new Division(k, height-divisionHeight/2, 10, divisionHeight));
  }

}

function draw() {

  Engine.update(engine);

  background("lightPink");

  ground.display();

  for(var i = 0; i < plinkos.length; i++){
    plinkos[i].display();
  }

  if(particle !== null){
    particle.display();
    if(particle.body.position.y > 760){
      if(particle.body.position.x < 300){
        score = score + 500;
        particle = null;
        if(turn >= 5)
        gameState == "end";
      }
      else if(particle.body.position.x < 600 && particle.position.x > 301){
          score = score + 100;
          particle = null;
          if(turn >= 5)
          gameState == "end";
      }
      else if(particle.body.position.x < 900 && particle.position.x > 601){
        score = score + 200;
        particle = null;
        if(turn >= 5)
        gameState == "end";
      }
    }
  }

  for(var k = 0; k < divisions.length; k++){
    divisions[k].display();
  }

  textSize(24);
  fill("black")
  text("Score: " + score, 20, 40);

  textSize(35);
  fill("black")
  text("500", 8, 550);
  text("500", 88, 550);
  text("500", 168, 550);
  text("500", 248, 550);
  text("100", 328, 550);
  text("100", 410, 550);
  text("100", 488, 550);
  text("200", 568, 550);
  text("200", 648, 550);
  text("200", 728, 550);

  if(gameState == "end"){
    textSize(100)
    fill("black")
    text("Game Over!", 150, 250);
  }

  drawSprites();

}

function mousePressed(){
  if(gameState !== "end"){
    turn = turn + 1;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}