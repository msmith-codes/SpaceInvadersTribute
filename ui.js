"use strict";

const theCanvas = new Canvas("canvasHolder", 800, 600);

const UPDATE_TIME = 0;

function onStart()
{
    player = new Player(theCanvas, theCanvas.width / 2 - 25, theCanvas.height - 25);
}

// Game Loop:
function onUpdate()
{
    const now = Date.now();
    const delta = now - lastUpdate;
    
    // Rendering:
    theCanvas.Clear();
    player.onDraw();

    // Updating:
    player.onUpdate(delta);
     
    lastUpdate = now;
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

// Start Game:
onStart();

// Start Game Loop:
let lastUpdate = Date.now();
setInterval(onUpdate, UPDATE_TIME);
