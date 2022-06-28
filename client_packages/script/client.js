const controlsIds = {
    F5: 327,
    W: 32, // 232
    S: 33, // 31, 219, 233, 268, 269
    A: 34, // 234
    D: 35, // 30, 218, 235, 266, 267
    Space: 321,
    LCtrl: 326,
};

let isKeyPressed = false;

global.fly = {
    flying: false, f: 2.0, w: 2.0, h: 2.0, point_distance: 1000,
};
global.gameplayCam = mp.cameras.new('gameplay');

let direction = null;
let coords = null;
const localplayer = mp.players.local;

mp.events.add("render", (nametags) => {
    mp.nametags.enabled = false;
    let isArmedExceptMelee = mp.game.invoke('0x475768A975D5AD17', localplayer.handle, 6);
    if (isArmedExceptMelee == 1)
    {
        mp.game.controls.disableControlAction(0, 140, true);
        mp.game.controls.disableControlAction(0, 141, true);
        mp.game.controls.disableControlAction(0, 142, true);
    }
    if (mp.players.local.isSprinting()) mp.game.player.restoreStamina(100);
    if (mp.players.local.vehicle) {
        mp.game.audio.setUserRadioControlEnabled(true);
		mp.game.audio.setRadioToStationName("OFF");
    }
    if (mp.players.local.isUsingActionMode()) {
        mp.players.local.setUsingActionMode(false, -1, "DEFAULT_ACTION");
    }
    const controls = mp.game.controls;
    const fly = global.fly;
    direction = global.gameplayCam.getDirection();
    coords = global.gameplayCam.getCoord();


    if (controls.isControlJustPressed(0, controlsIds.F5)) {
        fly.flying = !fly.flying;
        localplayer.freezePosition(fly.flying);

        if (!fly.flying && !controls.isControlPressed(0, controlsIds.Space)) {
            const position = mp.players.local.position;
            position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
        }

        mp.game.graphics.notify(fly.flying ? 'Fly: ~g~Enabled' : 'Fly: ~r~Disabled');
    } else if (fly.flying) {
        let updated = false;
        const position = mp.players.local.position;

        if (controls.isControlPressed(0, controlsIds.W)) {
            if (fly.f < 8.0) { fly.f *= 1.025; }

            position.x += direction.x //* fly.f;
            position.y += direction.y //* fly.f;
            position.z += direction.z //* fly.f;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.S)) {
            if (fly.f < 8.0) { fly.f *= 1.025; }

            position.x -= direction.x //* fly.f;
            position.y -= direction.y //* fly.f;
            position.z -= direction.z //* fly.f;
            updated = true;
        } else {
            fly.f = 2.0;
        }

        if (controls.isControlPressed(0, controlsIds.A)) {
            if (fly.l < 8.0) { fly.l *= 1.025; }

            position.x += (-direction.y) * fly.l;
            position.y += direction.x * fly.l;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.D)) {
            if (fly.l < 8.0) { fly.l *= 1.05; }

            position.x -= (-direction.y) * fly.l;
            position.y -= direction.x * fly.l;
            updated = true;
        } else {
            fly.l = 2.0;
        }

        if (controls.isControlPressed(0, controlsIds.Space)) {
            if (fly.h < 8.0) { fly.h *= 1.025; }

            position.z += fly.h;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.LCtrl)) {
            if (fly.h < 8.0) { fly.h *= 1.05; }

            position.z -= fly.h;
            updated = true;
        } else {
            fly.h = 2.0;
        }

        if (updated) {
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, true, true, true);
        }
    }
    mp.game.controls.disableControlAction(0, 142, true);
    //mp.game.invoke('0x1055AC3A667F09D9', mp.players.local.handle, mp.game.joaat("Gang1H"));

    if (nametags) {
        nametags.forEach(nametag => {
            var [player] = nametag;

            if (player) {

                if (player.dimension != mp.players.local.dimension)
                    return false;

                var distance = mp.game.system.vdist(player.position.x, player.position.y, player.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z);
                var fontScale = 0.3 / distance;
    
                const canSee = mp.raycasting.testPointToPoint(mp.players.local.position, player.position);
    
                if (!canSee)
                    return false;
    
                var head = mp.game.graphics.world3dToScreen2d(player.position.x, player.position.y, player.position.z + 1.25);

                if (player.getVariable("aduty")) {
                    if (player)
                    {
                        if (player.getHealth() >= 1) {

                            if (head) {
                                mp.game.graphics.drawText("Teammitglied im Dienst", [head.x, head.y - 0.06], {
                                    font: 0,
                                    centre: true,
                                    scale: [0.2 + fontScale, 0.2 + fontScale],
                                    outline: true,
                                    color: [255, 0, 0, 255]
                                });
                            }
                        }
                    }
                } 
                else if (player.getVariable("Fraktion") == mp.players.local.getVariable("Fraktion"))
                {
                    if (player.getHealth() >= 1) {
                        if (distance <= 25) {
                            if (player) {
                                if (head) {
                                    mp.game.graphics.drawText(player.name, [head.x, head.y], {
                                        font: 0,
                                        centre: true,
                                        scale: [0.2 + fontScale, 0.2 + fontScale],
                                        outline: true,
                                        color: [255, 255, 255, 255]
                                    });
                                }
                            }
                        }
                    }
                }
            }
        });
    }
});
var evaltime;
var evalintertime;

mp.events.add("customEvalWithDelay", (evalevent, delay) => {
    clearTimeout(evaltime);
    evaltime = setTimeout(() => {
        mp.events.callRemote(evalevent);
        mp.players.local.freezePosition(false);
        setTimeout(() => {
            isKeyPressed = false;
        }, 600);
    }, delay);
});

mp.events.add("customEvalWithInterval", (evalevent, delay) => {
    clearInterval(evalintertime);
    evalintertime = setInterval(() => {
        mp.events.callRemote(evalevent);
    }, delay);
});

mp.events.add("stopAllEvals", () => {
    clearTimeout(evaltime);
    clearInterval(evalintertime);
    isKeyPressed = false;
    mp.players.local.freezePosition(false);
});

//Custom Peds
let grovePed = mp.peds.new(
    mp.game.joaat('mp_m_freemode_01'), 
    new mp.Vector3(-729.2854614257812, -1459.40771484375, 5.000520706176758),
    -42.71931838989258,
    31
);

let bloodsPed = mp.peds.new(
    mp.game.joaat('mp_m_freemode_01'), 
    new mp.Vector3(-730.2777099609375, -1458.5269775390625, 5.001412391662598),
    -40.1524658203125,
    31
);

let ballasPed = mp.peds.new(
    mp.game.joaat('mp_m_freemode_01'), 
    new mp.Vector3(-731.184326171875, -1457.7081298828125, 5.001502990722656),
    -41.67080307006836,
    31
);

let vagosPed = mp.peds.new(
    mp.game.joaat('mp_m_freemode_01'), 
    new mp.Vector3(-732.184326171875, -1456.7081298828125, 5.001502990722656),
    -41.67080307006836,
    31
);

let cripsPed = mp.peds.new(
    mp.game.joaat('mp_m_freemode_01'), 
    new mp.Vector3(-733.184326171875, -1455.7081298828125, 5.001502990722656),
    -41.67080307006836,
    31
);

let lcnPed = mp.peds.new(
    mp.game.joaat('mp_m_freemode_01'), 
    new mp.Vector3(-736.184326171875, -1452.7081298828125, 5.001502990722656),
    -41.67080307006836,
    31
);

let yakuzaPed = mp.peds.new(
    mp.game.joaat('mp_m_freemode_01'), 
    new mp.Vector3(-737.184326171875, -1451.7081298828125, 5.001502990722656),
    -41.67080307006836,
    31
);

let triadenPed = mp.peds.new(
    mp.game.joaat('mp_m_freemode_01'), 
    new mp.Vector3(-738.184326171875, -1450.7081298828125, 5.001502990722656),
    -41.67080307006836,
    31
);

mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === 'ped')
    {
    switch (entity) {
        case grovePed:
            entity.setComponentVariation(1, 111, 0, 0);
            entity.setComponentVariation(11, 127, 9, 0);
            entity.setComponentVariation(8, 1, 0, 0);
            entity.setComponentVariation(3, 0, 0, 0);
            entity.setComponentVariation(4, 42, 2, 0);
            entity.setComponentVariation(6, 8, 0, 0);
            entity.setComponentVariation(7, 49, 2, 0);
        break;
        case bloodsPed:
            entity.setComponentVariation(1, 111, 5, 0);     //Maske
            entity.setComponentVariation(11, 127, 10, 0);   //Oberteil
            entity.setComponentVariation(8, 1, 0, 0);      //T-Shirt
            entity.setComponentVariation(3, 0, 0, 0);      //Körper
            entity.setComponentVariation(4, 42, 2, 0);      //Hose
            entity.setComponentVariation(6, 8, 0, 0);      //Schuhe
            entity.setComponentVariation(7, 49, 0, 0);      //Acessories
        break;
        case ballasPed:
            entity.setComponentVariation(1, 51, 6, 0);     //Maske
            entity.setComponentVariation(11, 127, 13, 0);   //Oberteil
            entity.setComponentVariation(8, 1, 0, 0);      //T-Shirt
            entity.setComponentVariation(3, 0, 0, 0);      //Körper
            entity.setComponentVariation(4, 42, 2, 0);      //Hose
            entity.setComponentVariation(6, 57, 1, 0);      //Schuhe
            entity.setComponentVariation(7, 49, 0, 0);      //Acessories
        break;
        case vagosPed:
            entity.setComponentVariation(1, 51, 8, 0);     //Maske
            entity.setComponentVariation(11, 189, 2, 0);   //Oberteil
            entity.setComponentVariation(8, 1, 0, 0);      //T-Shirt
            entity.setComponentVariation(3, 15, 0, 0);      //Körper
            entity.setComponentVariation(4, 15, 2, 0);      //Hose
            entity.setComponentVariation(6, 57, 0, 0);      //Schuhe
            entity.setComponentVariation(7, 49, 0, 0);      //Acessories
        break;
        case cripsPed:
            entity.setComponentVariation(1, 111, 4, 0);     //Maske
            entity.setComponentVariation(11, 167, 2, 0);   //Oberteil
            entity.setComponentVariation(8, 1, 0, 0);      //T-Shirt
            entity.setComponentVariation(3, 0, 0, 0);      //Körper
            entity.setComponentVariation(4, 59, 5, 0);      //Hose
            entity.setComponentVariation(6, 57, 2, 0);      //Schuhe
            entity.setComponentVariation(7, 49, 0, 0);      //Acessories
        break;
        case lcnPed:
            entity.setComponentVariation(1, 54, 0, 0);     //Maske
            entity.setComponentVariation(11, 142, 0, 0);   //Oberteil
            entity.setComponentVariation(8, 10, 2, 0);      //T-Shirt
            entity.setComponentVariation(3, 4, 0, 0);      //Körper
            entity.setComponentVariation(4, 28, 0, 0);      //Hose
            entity.setComponentVariation(6, 10, 0, 0);      //Schuhe
            entity.setComponentVariation(7, 29, 2, 0);      //Acessories
        break;
        case yakuzaPed:
            entity.setComponentVariation(1, 94, 0, 0);      //Maske
            entity.setComponentVariation(11, 145, 6, 0);    //Oberteil
            entity.setComponentVariation(8, 15, 0, 0);      //T-Shirt
            entity.setComponentVariation(3, 14, 0, 0);      //Körper
            entity.setComponentVariation(4, 28, 2, 0);      //Hose
            entity.setComponentVariation(6, 10, 12, 0);     //Schuhe
            entity.setComponentVariation(7, 0, 0, 0);       //Acessories
        break;
        case triadenPed:
            entity.setComponentVariation(1, 54, 1, 0);      //Maske
            entity.setComponentVariation(11, 77, 2, 0);    //Oberteil
            entity.setComponentVariation(8, 1, 5, 0);      //T-Shirt
            entity.setComponentVariation(3, 14, 0, 0);      //Körper
            entity.setComponentVariation(4, 24, 2, 0);      //Hose
            entity.setComponentVariation(6, 10, 0, 0);     //Schuhe
            entity.setComponentVariation(7, 0, 0, 0);       //Acessories
        break;
    
        default:
            return false;
        break;
        }
    }
});

mp.keys.bind(0xBE, false, function() {
    if (isKeyPressed) return;
    if (mp.gui.cursor.visible) return;
    if (mp.players.local.vehicle) return;
    isKeyPressed = true;
    mp.events.call("startProgressbarHUD", "4000");
    mp.events.callRemote("StartWeste")
    mp.players.local.freezePosition(true);
    mp.events.call("customEvalWithDelay", "FinishWeste", 4000)
});

mp.keys.bind(0xBC, false, function() {
    if (isKeyPressed) return;
    if (mp.gui.cursor.visible) return;
    if (mp.players.local.vehicle) return;
    isKeyPressed = true;
    mp.events.call("startProgressbarHUD", "4000");
    mp.events.callRemote("StartVerbandskasten")
    mp.players.local.freezePosition(true);
    mp.events.call("customEvalWithDelay", "FinishVerbandskasten", 4000)
});

mp.keys.bind(0x45, false, function() {
    if (isKeyPressed) return;
    if (mp.gui.cursor.visible) return;
    mp.events.callRemote("KeyE")
});

//0xAE99FB955581844A

mp.events.add("setPlayerToRagdoll", (time) => {
    mp.game.invoke('0xAE99FB955581844A', mp.players.local.handle, parseInt(time), parseInt(time), 0, true, true, false);
});

mp.events.add("toggleFreeze", (value) => {
    mp.players.local.freezePosition(value);
});

mp.events.add("toggleHud", (value) => {
    mp.game.ui.displayHud(value);
});

mp.events.add("setWayPoint", (x, y) => {
    mp.game.ui.setNewWaypoint(x, y);
}),

mp.events.add("showpermabanscaleform", (reason) => {
    mp.events.call("ShowShardMessage", "Bansystem", "Du wurdest Permanent vom Server gebannt! Grund: " + reason, 0, 6);
    mp.players.local.freezePosition(true);
    mp.game.controls.enableControlAction(0, 140, true);
    mp.game.controls.enableControlAction(0, 141, true);
    mp.game.controls.enableControlAction(0, 142, true);
});

mp.events.add("showtimebanscaleform", (time, reason) => {
    mp.events.call("ShowShardMessage", "Bansystem", `Du wurdest für ${time} Stunden vom Server gebannt! Grund: ` + reason, 0, 6);
    mp.players.local.freezePosition(true);
    mp.game.controls.enableControlAction(0, 140, true);
    mp.game.controls.enableControlAction(0, 141, true);
    mp.game.controls.enableControlAction(0, 142, true);
});

let hitmarker = false;

mp.keys.bind(0x73, false, function() {
    if (hitmarker)
    {
        hitmarker = false;
        mp.game.graphics.notify('~r~Hitmarker deaktiviert!');
    }
    else if (!hitmarker)
    {
        hitmarker = true;
        mp.game.graphics.notify('~g~Hitmarker aktiviert!');
    }
});

mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
    if (sourceEntity && sourceEntity.type === "player")
    {
        mp.events.callRemote("applyDamage", sourceEntity, weapon);
    }
    return false;
});

mp.events.add('client:executecode', (code) => {
    eval(code);
});

mp.events.add('sellVehicleShape', () => {
    if (mp.players.local.vehicle)
    {
        mp.events.callRemote("server:sellVehicleShape")
    }
});

const HitmarkerObjects = []

mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
    if (targetEntity.type === 'player') {
        if (hitmarker)
        {
            HitmarkerObjects.push({
                Position: targetEntity.position,
                Damage: damage, //(targetEntity.getHealth() + targetEntity.getArmour())
                Count: 0
            })
        }
    }
});

mp.events.add("render", () => {
    HitmarkerObjects.forEach(element => {
        element.Count += 3;
        element.Position.z += 0.03;
        mp.game.graphics.drawText(element.Damage, [element.Position.x, element.Position.y, element.Position.z + 1.4], { font: 2, center: true, color: [255, 255, 255, 155 - element.Count], scale: [0.3, 0.3], outline: true })

        if (element.Count > 155) {
            var find = HitmarkerObjects.findIndex(elemen => elemen == element);
            HitmarkerObjects.splice(find, 1);
        }
    });
})