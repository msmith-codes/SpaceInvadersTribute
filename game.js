"use strict";

const theCanvas = new Canvas("canvasHolder", 800, 600);

const FPS = 60;
const MS_PER_FRAME = FPS / 1000;
const UPDATE_TIME = 14;

function onStart()
{
    player = new Player(theCanvas, theCanvas.width / 2 - 25, theCanvas.height - 25);
    fleet = new Fleet(theCanvas, 0, 0);
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
   
    delta = delta / 1000;

    player.onUpdate(delta);
    fleet.onUpdate(delta); 

    // Collision Detection:    
    for(let alien of fleet.aliens) {
        if(alien.alive()) {
            if(checkCollision(player.bullet, alien)) {
                player.bullet = null;
                alien.onDeath();
            }
        }
    }

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

let fleet = null;

// Start Game:
onStart();

// Start Game Loop:
var lastUpdate = Date.now();
var lag = 0;
setInterval(onUpdate, UPDATE_TIME);
