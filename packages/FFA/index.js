const { spawnonTeamSpawn, spawnonffaspawn } = require("../Player/playerDeath.js");
const { setLevelWeapon } = require("../Player/playerLevel");
const { SendNotification } = require("../Notification/index.js");

mp.events.addCommand("ffa", (player) => {
    if (player.getVariable("isIn1vs1"))  return SendNotification(player, "Error", "1vs1-SYSTEM", "Du bist in einem 1vs1 Match drinne!");
    if (player.getVariable("isFFA")) return SendNotification(player, "Error", "FFA", "Du bist bereits in einer FFA drinne!");
    let ffa1amount = 0;
    let ffa2amount = 0;
    let ffa3amount = 0;

    mp.players.forEach(_player => {
        if (_player.getVariable("isFFA"))
        {
            if (_player.getVariable("FFA") == 1)
            {
                ffa1amount = _player.length;
            } else if (_player.getVariable("FFA") == 2)
            {
                ffa2amount = _player.length;
            } else if (_player.getVariable("FFA") == 3)
            {
                ffa3amount = _player.length;
            }
        }
    });

    player.call("openFFA", [`${ffa1amount}`, `${ffa2amount}`, `${ffa3amount}`]);
    player.dimension = 667;
    player.health = 100;
    player.armour = 100;
});

//ffajoin_abbrechen

mp.events.add("ffajoin_abbrechen", (player) => {
    player.dimension = 0;
    player.health = 100;
    spawnonTeamSpawn(player);
    player.armour = 100;
    player.setVariable("isFFA", false);
    player.setVariable("FFA", null);
    player.removeAllWeapons();
    setLevelWeapon(player, player.getVariable("Level"))
});

mp.events.addCommand("quitffa", (player) => {
    if (!player.getVariable("isFFA")) return SendNotification(player, "Error", "FFA", "Du bist in keiner FFA drinne!");
    player.dimension = 0;
    player.health = 100;
    player.armour = 100;
    spawnonTeamSpawn(player);
    SendNotification(player, "Success", "FFA", "Du hast die FFA erfolgreich verlassen!");
    player.setVariable("isFFA", false);
    player.setVariable("FFA", null);
    player.removeAllWeapons();
    setLevelWeapon(player, player.getVariable("Level"))
    player.armour = 100;
});

mp.events.add("Server:TryJoinFFA", (player, id) => {
    id = parseInt(id);
    player.call("closeFFA");
    switch (id) {
        case 1:
            player.removeAllWeapons();
            player.dimension = 501;
            player.giveWeapon([0x99AEEB3B, 0xD205520E, 0xBD248B55, 0x13532244, 0x1D073A89, 0xBFEFFF6D, 0x83BF0278, 0xAF113F99, 0x7F229F94, 0x624FE830, 0x9D1F17E6, 0xC78D71B4, 0x61012683], 99999);
            player.setVariable("isFFA", true);
            player.setVariable("FFA", 1);
            spawnonffaspawn(player);
            player.armour = 100;
        break;
        case 2:
            player.removeAllWeapons();
            player.dimension = 502;
            player.giveWeapon([0x99AEEB3B, 0xD205520E, 0xBD248B55, 0x13532244, 0x1D073A89, 0xBFEFFF6D, 0x83BF0278, 0xAF113F99, 0x7F229F94, 0x624FE830, 0x9D1F17E6, 0xC78D71B4, 0x61012683], 99999);
            player.setVariable("isFFA", true);
            player.setVariable("FFA", 2);
            spawnonffaspawn(player);
            player.armour = 100;
        break;
        case 3:
            player.removeAllWeapons();
            player.dimension = 503;
            player.giveWeapon([0x99AEEB3B, 0xD205520E, 0xBD248B55, 0x13532244, 0x1D073A89, 0xBFEFFF6D, 0x83BF0278, 0xAF113F99, 0x7F229F94, 0x624FE830, 0x9D1F17E6, 0xC78D71B4, 0x61012683], 99999);
            player.setVariable("isFFA", true);
            player.setVariable("FFA", 3);
            spawnonffaspawn(player);
            player.armour = 100;
        break;
        default:
            SendNotification(player, "Error", "SYSTEM", "Ein Fehler ist unterlaufen!");
        break;
    }
});