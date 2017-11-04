"use strict";

// ==UserScript==
// @name         Daunt
// @description  Hold Space Key To Auto Detect Enemies
// @match        http://vertix.io
// @match        http://www.vertix.io
// @version      1.8.1
//
// @namespace Inb4
// ==/UserScript==

var active = false;
var interval = void 0;

console.log("Developed by Inb4®")

;(() => {
    let _b = function() {
        socket.on("3", function(a) {
            let t = new Audio('http://soundboard.panictank.net/Oh%20Baby%20A%20Triple.mp3');
            if(3 == a.kd) t.play();
        });
    }

    let _t = window.setInterval(() => {
        if(socket) clearInterval(_t), _b();
    }, 0x64);
})();

function activate(event) {
    event.preventDefault();
    if (event.keyCode === 32 && !active) {
        c.removeEventListener("mousemove", gameInput, false);
        active = true;
        interval = setInterval(aimClosestPlayer, 10);
    }
}

function deactivate(event) {
    event.preventDefault();
    if (event.keyCode === 32) {
        active = false;
        clearInterval(interval);
        c.addEventListener("mousemove", gameInput, false);
    }
}

c.addEventListener("keydown", activate, false);
c.addEventListener("keyup", deactivate, false);

function getOtherPlayers(gameObjects, myTeam) {
    return gameObjects.filter(function (o) {
        return o.type === 'player' && o.dead === false && o.name !== player.name && o.team !== myTeam;
    });
}

function getMyPlayer(gameObjects) {
    return gameObjects.filter(function (o) {
        return o.name === player.name;
    })[0];
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getClosestPlayer(gameObjects) {
    var myTeam = getMyPlayer(gameObjects).team;
    var otherPlayers = getOtherPlayers(gameObjects, myTeam);
    var closestDistance = Infinity;
    var closestPlayer = void 0;
    otherPlayers.forEach(function (p) {
        var d = distance(player.x, player.y, p.x, p.y);
        if (d < closestDistance) {
            closestPlayer = p;
            closestDistance = d;
        }
    });
    return closestPlayer;
}

function getAngle(x1, y1, x2, y2) {
    return Math.atan2(y1 - y2, x1 - x2);
}

function setTarget(angle, distance) {
    target.f = angle;
    target.d = distance;
}

function aimClosestPlayer() {
    var closestPlayer = getClosestPlayer(gameObjects);
    if (!closestPlayer) {
        return;
    }
    var angle = getAngle(player.x, player.y, closestPlayer.x, closestPlayer.y);
    var distance = 100;
    setTarget(angle, distance);
    targetChanged = true;
}
