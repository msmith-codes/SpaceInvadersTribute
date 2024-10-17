"use strict";

const theCanvas = new Canvas("canvasContainer", 800, 600);

const FPS = 60;
const MS_PER_FRAME = FPS / 1000;
const UPDATE_TIME = 30;

const POINTS_PER_ALIEN = 100;
const MAX_SCORE = 55 * POINTS_PER_ALIEN;
let score = 0;
let tempScore = 0;
let level = 1;
let lives = 3;

function onStart()
{
    player = new Player(theCanvas, theCanvas.width / 2 - 25, theCanvas.height - 25);
    fleet = new Fleet(theCanvas, 0, 0);
    
    shield0 = new Shield(theCanvas, 100, theCanvas.height - 100);
    shield1 = new Shield(theCanvas, 300, theCanvas.height - 100);
    shield2 = new Shield(theCanvas, 500, theCanvas.height - 100);
    shield3 = new Shield(theCanvas, 700, theCanvas.height - 100);
}

// Game Loop:
function onUpdate()
{
    const now = Date.now(); 
    let delta = now - lastUpdate;
    lastUpdate = now;

    lag += delta;
            
    theCanvas.Clear();
    
    // Rendering:
    player.onDraw();
    fleet.onDraw();

    shield0.onDraw();    
    shield1.onDraw();
    shield2.onDraw();
    shield3.onDraw();

    delta = delta / 1000;

    player.onUpdate(delta);
    fleet.onUpdate(delta); 

    // Collision Detection:    
    for(let alien of fleet.aliens) {
        if(alien.alive()) {
            if(checkCollision(player.bullet, alien)) {
                player.bullet = null;
                alien.onDeath();
                score += POINTS_PER_ALIEN; 
                tempScore += POINTS_PER_ALIEN;
                fleet.increaseSpeed();

                document.getElementById("score").innerHTML = "Score: " + score;
                
                if(tempScore == MAX_SCORE) {
                    level++;
                    document.getElementById("level").innerHTML = "Level: " + level; 
                    tempScore = 0;
                    document.getElementById("score").innerHTML = "Score: " + score;
                    fleet.resetSpeed();
                    onStart();
                }

            }
        }
    }
    
    for(let element of shield0.elements) {
        if(element.alive()) {
            if(checkCollision(player.bullet, element)) {
                player.bullet = null;
                element.onDeath();
            }
            for(let alien of fleet.aliens) {
                if(alien.alive()) {
                    if(checkCollision(alien, element)) {
                        element.onDeath();
                    }
                    if(checkCollision(alien.bullet, element)) {
                        alien.bullet = null;
                        fleet.bulletPresent--;
                        element.onDeath();
                        console.log("deleting bullet collision 92");
                    }
                }
            }
        }
    }

    for(let element of shield1.elements) {
        if(element.alive()) {
            if(checkCollision(player.bullet, element)) {
                player.bullet = null;
                element.onDeath();
            }
            for(let alien of fleet.aliens) {
                if(alien.alive()) {
                    if(checkCollision(alien, element)) {
                        element.onDeath();
                    }
                    if(checkCollision(alien.bullet, element)) {
                        alien.bullet = null;
                        fleet.bulletsPresent--;
                        element.onDeath();
                        console.log("deleting bullet collision 1");

                    }
                }
            
            }
        }
    }

    for(let element of shield2.elements) {
        if(element.alive()) {
            if(checkCollision(player.bullet, element)) {
                player.bullet = null;
                element.onDeath();
            }
            for(let alien of fleet.aliens) {
                if(alien.alive()) {
                    if(checkCollision(alien, element)) {
                        element.onDeath();
                    }
                    if(checkCollision(alien.bullet, element)) {
                        alien.bullet = null;
                        fleet.bulletsPresent--;
                        element.onDeath();

                        console.log("deleting bullet collision 2");
                    }
                }
            }
        }
    }

    for(let element of shield3.elements) {
        if(element.alive()) {
            if(checkCollision(player.bullet, element)) {
                player.bullet = null;
                element.onDeath();
            }
            for(let alien of fleet.aliens) {
                if(alien.alive()) {
                    if(checkCollision(alien, element)) {
                        element.onDeath();
                    }
                    if(checkCollision(alien.bullet, element)) {
                        alien.bullet = null;
                        fleet.bulletsPresent--;
                        element.onDeath();

                        console.log("deleting bullet collision 3");
                    } 
                }
            }
        }
    }

    for(let alien of fleet.aliens) {
        if(alien.alive()) {
            if(checkCollision(alien, player)) {
                lives--;
                tempScore = 0;
                fleet.bulletsPresent = 0;
                document.getElementById("lives").innerHTML = "Lives: " + lives;
                if(lives == 0) {
                    window.location.href = "gameover.html";
                } else {
                    onStart();
                }   
            }  
            if(checkCollision(alien.bullet, player)) {
                alien.bullet = null;
                fleet.bulletsPresent = 0;
                lives--;
                tempScore = 0;
                document.getElementById("lives").innerHTML = "Lives: " + lives;
                if(lives == 0) {
                    window.location.href = "gameover.html";
                } else {
                    onStart();
                }
            }
        }   
    }
    setTimeout(onUpdate, UPDATE_TIME);
}

function checkCollision(obj1, obj2)
{
    if(obj1 == null || obj2 == null) {
        return false;
    }
    if(obj1.xPos < obj2.xPos + obj2.width &&
       obj1.xPos + obj1.width > obj2.xPos &&
       obj1.yPos < obj2.yPos + obj2.height &&
       obj1.yPos + obj1.height > obj2.yPos) {
        return true;
    }
}

// Input Handling:
function KeyInputDown(event)
{
    player.onKeyDown(event.key);
}

// Input Handling:
function KeyInputUp(event)
{
    player.onKeyUp(event.key);
}

// Register Event Listeners:
theCanvas.AddListener("keydown", KeyInputDown);
theCanvas.AddListener("keyup", KeyInputUp); // <-- Added to handle key up events, for the player to stop moving.

// Spawn Game Objects:
let player = null;

let shield0 = null;
let shield1 = null;
let shield2 = null;
let shield3 = null;

let fleet = null;

// Start Game:
onStart();

// Start Game Loop:
var lastUpdate = Date.now();
var lag = 0;
setTimeout(onUpdate, UPDATE_TIME);
