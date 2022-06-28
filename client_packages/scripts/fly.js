const controlsIds = {
    F5: 327,
    W: 32, // 232
    S: 33, // 31, 219, 233, 268, 269
    A: 34, // 234
    D: 35, // 30, 218, 235, 266, 267
    Space: 321,
    LCtrl: 326,
};

global.fly = {
    flying: false, f: 2.0, w: 2.0, h: 2.0, point_distance: 1000,
};
global.gameplayCam = mp.cameras.new('gameplay');

let direction = null;
let coords = null;

function pointingAt(distance) {
    const farAway = new mp.Vector3((direction.x * distance) + (coords.x), (direction.y * distance) + (coords.y), (direction.z * distance) + (coords.z));

    const result = mp.raycasting.testPointToPoint(coords, farAway, [1, 16]);
    if (result === undefined) {
        return 'undefined';
    }
    return result;
}

let detected = false;

mp.events.add('render', () => {
    const controls = mp.game.controls;
    const fly = global.fly;
    direction = global.gameplayCam.getDirection();
    coords = global.gameplayCam.getCoord();

    mp.nametags.enabled = false;
    let isArmedExceptMelee = mp.game.invoke('0x475768A975D5AD17', mp.players.local.handle, 6);
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

    // if (mp.players.local.isJumping())
    // {
    //       setTimeout(() => {
    //           var height = mp.players.local.getHeightAboveGround();
    //           if (!mp.players.local.isFalling() || !mp.players.local.isRagdoll() || !mp.players.local.isReloading() || !mp.players.local.isInParachuteFreeFall())
    //           {
    //              if (height >= 7)
    //              {
    //                 if (!detected)
    //                 {
    //                     if (!mp.players.local.isFalling() || !mp.players.local.isRagdoll() || !mp.players.local.isReloading() || !mp.players.local.isInParachuteFreeFall())
    //                     {
    //                     mp.events.callRemote("Anticheat:SuperJump:Detected");
    //                     detected = true;
    //                     }
    //                 }
    //              }
    //          }
    //      }, 1500);
    //  }

    if (mp.players.local.getVariable("aduty"))
    {
    if (controls.isControlJustPressed(0, controlsIds.F5)) {
        fly.flying = !fly.flying;

        const player = mp.players.local;

        player.setInvincible(fly.flying);
        player.freezePosition(fly.flying);

        if (!fly.flying && !controls.isControlPressed(0, controlsIds.Space)) {
            const position = mp.players.local.position;
            position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
        }

        mp.game.graphics.notify(fly.flying ? 'Fly: ~g~an' : 'Fly: ~r~aus');
    } else if (fly.flying) {
        let updated = false;
        const position = mp.players.local.position;

        if (controls.isControlPressed(0, controlsIds.W)) {
            if (fly.f < 8.0) { fly.f *= 1.025; }

            position.x += direction.x * fly.f;
            position.y += direction.y * fly.f;
            position.z += direction.z * fly.f;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.S)) {
            if (fly.f < 8.0) { fly.f *= 1.025; }

            position.x -= direction.x * fly.f;
            position.y -= direction.y * fly.f;
            position.z -= direction.z * fly.f;
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
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
        }
    }           
}
});