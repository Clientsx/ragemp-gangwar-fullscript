const { SendNotification } = require("../Notification/index.js");

mp.events.addCommand("1vs1", (player, target) => {
    if (target == null) return SendNotification(player, "Error", "1vs1-SYSTEM", "Du musst einen Spieler angeben!");
    let findplayer = 0;
    mp.players.forEach(_currentPlayer => {
        if(_currentPlayer.name == target)
        {
            if (!_currentPlayer.getVariable("have1vs1request"))
            {
                findplayer++;
                _currentPlayer.setVariable("have1vs1request", true);
                _currentPlayer.setVariable("1vs1requestbyname", player.name);
                SendNotification(_currentPlayer, "Info", "1vs1-SYSTEM", `Du hast eine Anfrage von ${player.name} erhalten!`);
                _currentPlayer.notify("~g~/a1vs1");
                _currentPlayer.notify("~r~/d1vs1");
            } else {
                SendNotification(player, "Error", "1vs1-SYSTEM", "Dieser Spieler hat bereits eine Anfrage von jemanden!");
            }
        }
    });
    if (findplayer == 0)
    {
        SendNotification(player, "Error", "1vs1-SYSTEM", "Dieser Spieler wurde nicht gefunden!");
    }
});

mp.events.addCommand("a1vs1", (player) => {
    if (!player.getVariable("have1vs1request")) return SendNotification(player, "Error", "1vs1-SYSTEM", "Du hast keine Anfragen!");
    if (player.getVariable("isIn1vs1"))  return SendNotification(player, "Error", "1vs1-SYSTEM", "Du bist bereits in einem 1vs1 Match drinne!");
    let findplayer = 0;
    mp.players.forEach(_currentPlayer => {
        if(_currentPlayer.name == player.getVariable("1vs1requestbyname"))
        {
            findplayer++;
            let pid = player.id + 10;
            player.dimension = pid;
            player.spawn(new mp.Vector3(79.56246948242188, -864.0222778320312, 134.77005004882812))
            player.heading = -111;
            player.armour = 100;
            player.removeAllWeapons();
            _currentPlayer.removeAllWeapons();
            _currentPlayer.spawn(new mp.Vector3(124.98410034179688, -879.6631469726562, 134.77003479003906))
            _currentPlayer.heading = 65.64990234375;
            _currentPlayer.armour = 100;
            _currentPlayer.dimension = pid;
            player.giveWeapon(mp.joaat('weapon_revolver_mk2'), 60);
            _currentPlayer.giveWeapon(mp.joaat('weapon_revolver_mk2'), 60);
            player.setVariable("isIn1vs1", true);
            _currentPlayer.setVariable("isIn1vs1", true);
            _currentPlayer.setVariable("1vs1requestbyname", player.name);
            SendNotification(_currentPlayer, "Success", "1vs1-SYSTEM", `${player.name} hat deine Anfrage angenommen!`);
            SendNotification(player, "Success", "1vs1-SYSTEM", "Du hast die Anfrage erfolgreich angenommen!");
        }
    });
    if (findplayer == 0)
    {
        SendNotification(player, "Error", "1vs1-SYSTEM", "Dieser Spieler wurde nicht gefunden!");
        player.setVariable("have1vs1request", false);
        player.setVariable("1vs1requestbyname", null);
    }
});

mp.events.addCommand("d1vs1", (player) => {
    if (!player.getVariable("have1vs1request")) return SendNotification(player, "Error", "1vs1-SYSTEM", "Du hast keine Anfragen!");
    player.setVariable("have1vs1request", false);
    player.setVariable("1vs1requestbyname", null);
    SendNotification(player, "Success", "1vs1-SYSTEM", "Du hast alle Anfragen erfolgreich gelöscht!");
});