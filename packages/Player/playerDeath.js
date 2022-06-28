const weaponData = require("./json/weaponData.json");
let grovespawnPoints = require('./json/teamspawn.json').Grove;
let bloodsspawnPoints = require('./json/teamspawn.json').Bloods;
let ballasspawnPoints = require('./json/teamspawn.json').Ballas;
let vagosspawnPoints = require('./json/teamspawn.json').Vagos;
let cripsspawnPoints = require('./json/teamspawn.json').Crips;
let lcnspawnPoints = require('./json/teamspawn.json').LCN;
let yakuzaspawnPoints = require('./json/teamspawn.json').Yakuza;
let triadenspawnPoints = require('./json/teamspawn.json').Triaden;

let ffa1spawnPoint = require("./json/ffa1.json").FFA1;
let ffa2spawnPoint = require("./json/ffa2.json").FFA2;
let ffa3spawnPoint = require("./json/ffa3.json").FFA3;

const { setLevelWeapon } = require("./playerLevel.js")

mp.events.add("playerDeath", (player, reason, killer) => {

    loadPlayerDeath(player);

    if (player.killer && mp.players.exists(player.killer)) {
        if (!player.killer.name == player.name) {
            if (player.killer.getVariable("isFFA"))
            {
                player.killer.health = 100;
                player.killer.armour = 100;
            }
            else if (player.killer.getVariable("isIn1vs1"))
            {
                player.killer.dimension = 0;
                spawnonTeamSpawn(player.killer);
                player.killer.setVariable("isIn1vs1", false);
                player.killer.setVariable("have1vs1request", false);
                player.killer.setVariable("1vs1requestbyname", null);
        
                mp.players.forEach(_player => {
                    if (_player.getVariable("1vs1requestbyname") == player.killer.name)
                    {
                        _player.dimension = 0;
                        spawnonTeamSpawn(_player);
                        _player.setVariable("isIn1vs1", false);
                        _player.setVariable("have1vs1request", false);
                        _player.setVariable("1vs1requestbyname", null);
                    }
                });
            } else {
                player.killer.setVariable("Kills", player.killer.getVariable("Kills") + 1);
                let rd = Math.floor(Math.random() * 150);
                player.killer.setVariable("Money", player.killer.getVariable("Money") + rd);
                player.killer.notify(`~g~Du hast +${rd}$ bekommen!`);
                player.killer.setVariable("Killstreak", player.killer.getVariable("Killstreak") + 1);
                player.killer.call("updateHUD", [`${player.killer.getVariable("Kills")}`, `${player.killer.getVariable("Deaths")}`, `${player.killer.getVariable("Xp")}`, `${player.killer.getVariable("MaxXp")}`])

                if (player.killer.getVariable("VIP") > 0)
                {
                    if (player.killer.getVariable("VIP") == 1)
                    {
                        let vip1rd = Math.floor(Math.random() * 50);
                        player.killer.setVariable("Money", player.killer.getVariable("Money") + vip1rd);
                        player.killer.notify(`~g~Du hast +${vip1rd}$ VIP Bonus bekommen!`);
                    } else if (player.killer.getVariable("VIP") == 2) {
                        let vip2rd = Math.floor(Math.random() * 100);
                        player.killer.setVariable("Money", player.killer.getVariable("Money") + vip2rd);
                        player.killer.notify(`~g~Du hast +${vip2rd}$ VIP Bonus bekommen!`);
                    } else if (player.killer.getVariable("VIP") == 3) {
                        let vip3rd = Math.floor(Math.random() * 150);
                        player.killer.setVariable("Money", player.killer.getVariable("Money") + vip3rd);
                        player.killer.notify(`~g~Du hast +${vip3rd}$ VIP Bonus bekommen!`);
                    }
                }

                player.killer.setVariable("Xp", player.killer.getVariable("Xp") + 25);

                checkLevelUp(player.killer);
                checkKillstreak(player.killer);
            }
        }
    }
});

function loadPlayerDeath(player) {
    if (player.getVariable("isFFA"))
    {
        spawnonffaspawn(player);
    } else if (player.getVariable("isIn1vs1")) {
        weapon_revolver_mk2
        player.dimension = 0;
        spawnonTeamSpawn(player);
        player.setVariable("isIn1vs1", false);
        player.setVariable("have1vs1request", false);
        player.setVariable("1vs1requestbyname", null);

        mp.players.forEach(_player => {
            if (_player.getVariable("1vs1requestbyname") == player.name)
            {
                _player.dimension = 0;
                spawnonTeamSpawn(_player);
                _player.setVariable("isIn1vs1", false);
                _player.setVariable("have1vs1request", false);
                _player.setVariable("1vs1requestbyname", null);
            }
        });

    } else {
        player.spawn(new mp.Vector3(player.position));
        player.call("setPlayerToRagdoll", [4000]);
        player.call("customEvalWithDelay", ["deathstartfreeze", 3000]);
        player.setVariable("Deaths", player.getVariable("Deaths") + 1);
        player.setVariable("Killstreak", 0);

        mp.vehicles.forEach(_vehicle => {
            if (_vehicle.getVariable("Owner") == player.name)
            {
                _vehicle.destroy();
            }
        });
    }
}

function spawnonffaspawn(player) {
    switch (player.getVariable("FFA")) {
        case 1:
            let rd = Math.floor(Math.random() * ffa1spawnPoint.length);
            player.spawn(new mp.Vector3(ffa1spawnPoint[rd].x, ffa1spawnPoint[rd].y, ffa1spawnPoint[rd].z));
            player.heading = ffa1spawnPoint[rd].r;
            player.armour = 100;
        break;
        case 2:
            let rd2 = Math.floor(Math.random() * ffa2spawnPoint.length);
            player.spawn(new mp.Vector3(ffa2spawnPoint[rd2].x, ffa2spawnPoint[rd2].y, ffa2spawnPoint[rd2].z));
            player.heading = ffa2spawnPoint[rd2].r;
            player.armour = 100;
        break;
        case 3:
            let rd3 = Math.floor(Math.random() * ffa3spawnPoint.length);
            player.spawn(new mp.Vector3(ffa3spawnPoint[rd3].x, ffa3spawnPoint[rd3].y, ffa3spawnPoint[rd3].z));
            player.heading = ffa3spawnPoint[rd3].r;
            player.armour = 100;
        break;
    }
}

mp.events.add("deathstartfreeze", (player) => {
    player.call("toggleFreeze", [true]);
    player.call("customEvalWithDelay", ["StopDeath", 1000]);
});

mp.events.add("StopDeath", (player) => {
    player.call("toggleFreeze", [false]);
    player.stopAnimation();

    spawnonTeamSpawn(player);
});

function checkLevelUp(killer){
    if (killer.getVariable("Xp") >= killer.getVariable("MaxXp")){
        killer.setVariable("Xp", 0);
        killer.setVariable("MaxXp", killer.getVariable("MaxXp") + 25);
        killer.setVariable("Level", killer.getVariable("Level") + 1);
        killer.outpuChatBox(`[!{0, 160, 0}LEVEL UP!{255, 255, 255}] Du bist ein Level aufgestiegen!`)
    }
}

function checkKillstreak(killer)
{
    switch (killer.getVariable("Killstreak")) {
        case 5:
            mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}5er!{255, 255, 255} Killstreak!`);
        break;
        case 10:
            mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}10er!{255, 255, 255} Killstreak!`);
        break;
        case 15:
            mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}15er!{255, 255, 255} Killstreak!`);
        break;
        case 25:
            mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}25er!{255, 255, 255} Killstreak!`);
        break;
        case 35:
            mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}35er!{255, 255, 255} Killstreak!`);
        break;
        case 45:
            mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}45er!{255, 255, 255} Killstreak!`);
        break;
        case 50:
            mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}50er!{255, 255, 255} Killstreak!`);
        break;
        case 100:
            mp.players.broadcast(`[!{238, 255, 5}KILLSTREAK!{255, 255, 255}] ${killer.name} hat eine !{238, 255, 5}100er!{255, 255, 255} Killstreak!`);
        break;
    }
}

function spawnonTeamSpawn(player)
{
    switch (player.getVariable("Fraktion")) {
        case "Grove":
            let rd = Math.floor(Math.random() * grovespawnPoints.length);
            player.spawn(new mp.Vector3(grovespawnPoints[rd].x, grovespawnPoints[rd].y, grovespawnPoints[rd].z));
            player.heading = grovespawnPoints[rd].r;
        break;
        case "Bloods":
            let rd1 = Math.floor(Math.random() * bloodsspawnPoints.length);
            player.spawn(new mp.Vector3(bloodsspawnPoints[rd1].x, bloodsspawnPoints[rd1].y, bloodsspawnPoints[rd1].z));
            player.heading = bloodsspawnPoints[rd1].r;
        break;
        case "Ballas":
            let rd2 = Math.floor(Math.random() * ballasspawnPoints.length);
            player.spawn(new mp.Vector3(ballasspawnPoints[rd2].x, ballasspawnPoints[rd2].y, ballasspawnPoints[rd2].z));
            player.heading = ballasspawnPoints[rd2].r;
        break;
        case "Vagos":
            let rd3 = Math.floor(Math.random() * vagosspawnPoints.length);
            player.spawn(new mp.Vector3(vagosspawnPoints[rd3].x, vagosspawnPoints[rd3].y, vagosspawnPoints[rd3].z));
            player.heading = vagosspawnPoints[rd3].r;
        break;
        case "Crips":
            let rd4 = Math.floor(Math.random() * cripsspawnPoints.length);
            player.spawn(new mp.Vector3(cripsspawnPoints[rd4].x, cripsspawnPoints[rd4].y, cripsspawnPoints[rd4].z));
            player.heading = cripsspawnPoints[rd4].r;
        break;
        case "LCN":
            let rd5 = Math.floor(Math.random() * lcnspawnPoints.length);
            player.spawn(new mp.Vector3(lcnspawnPoints[rd5].x, lcnspawnPoints[rd5].y, lcnspawnPoints[rd5].z));
            player.heading = lcnspawnPoints[rd5].r;
        break;
        case "Yakuza":
            let rd6 = Math.floor(Math.random() * yakuzaspawnPoints.length);
            player.spawn(new mp.Vector3(yakuzaspawnPoints[rd6].x, yakuzaspawnPoints[rd6].y, yakuzaspawnPoints[rd6].z));
            player.heading = yakuzaspawnPoints[rd6].r;
        break;
        case "Triaden":
            let rd7 = Math.floor(Math.random() * triadenspawnPoints.length);
            player.spawn(new mp.Vector3(triadenspawnPoints[rd7].x, triadenspawnPoints[rd7].y, triadenspawnPoints[rd7].z));
            player.heading = triadenspawnPoints[rd7].r;
        break;
    
        default:
            player.notify("~r~ERROR: Log #5432")
        break;
    }
    player.armour = 100;
    player.killer = null;
    setLevelWeapon(player, player.getVariable("Level"))
    player.call("updateHUD", [`${player.getVariable("Kills")}`, `${player.getVariable("Deaths")}`, `${player.getVariable("Xp")}`, `${player.getVariable("MaxXp")}`])
}

module.exports = { spawnonTeamSpawn, spawnonffaspawn };