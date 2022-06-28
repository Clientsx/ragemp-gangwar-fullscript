const { SendNotification } = require("../Notification/index.js");

const BanHandler = require("../Banhandler/index");

mp.events.addCommand("aduty", (player) => {
    if (player.getVariable("Admin") > 0)
    {
        if (player.getVariable("aduty"))
        {
            player.setVariable("aduty", false);
            SendNotification(player, "Info", "ADMIN-SYSTEM", "Du bist nun nichtmehr im Admin Dienst!");
        } else {
            player.setVariable("aduty", true);
            SendNotification(player, "Info", "ADMIN-SYSTEM", "Du bist nun im Admin Dienst!");
        }
        player.call("updateHUDAdminStatus", [`${player.getVariable("aduty")}`])
    } else {
        SendNotification(player, "Error", "ADMIN-SYSTEM", "Du hast keine Rechte dazu!");
    }
});

mp.events.addCommand("kick", (player, fullText, clientname, reason) => {
    if (player.getVariable("Admin") >= 2)
    {
        if (clientname == null || reason == null) return;
        let currentPlayername = 0;
        mp.players.forEach(_currentPlayer => {
            if(_currentPlayer.name == clientname)
            {
                currentPlayername++;
                SendNotification(player, "Success", "ADMIN-SYSTEM", "Du hast den Spieler erfolgreich vom Server gekickt!");
                SendNotification(_currentPlayer, "Warning", "SERVER", "Du wurdest vom Server gekickt! Grund: "+reason);
                _currentPlayer.kick();
            }
        });
        if (currentPlayername >= 1)
        {
            return;
        } else {
            SendNotification(player, "Error", "ADMIN-SYSTEM", "Es wurde kein Spieler mit dem Namen gefunden!");
        }
    }
});

mp.events.addCommand("ban", (player, fullText, clientname, reason) => {
    if (player.getVariable("Admin") >= 2)
    {
        if (clientname == null || reason == null) return;
        let currentPlayername = 0;
        mp.players.forEach(_currentPlayer => {
            if(_currentPlayer.name == clientname)
            {
                currentPlayername++;
                _currentPlayer.call("showpermabanscaleform", [reason]);
                SendNotification(player, "Success", "ADMIN-SYSTEM", "Du hast den Spieler erfolgreich vom Server gebannt!");
                BanHandler.banplayer(reason, clientname);
                _currentPlayer.kick();
            }
        });
        if (currentPlayername >= 1)
        {
            return;
        } else {
            SendNotification(player, "Error", "ADMIN-SYSTEM", "Es wurde kein Spieler mit dem Namen gefunden!");
        }
    }
});


mp.events.addCommand("unban", (player, banname) => {
    if (player.getVariable("Admin") >= 5)
    {
        if (banname == null) return;
        gangwar.query("SELECT * FROM bans WHERE Username = ?",[banname],function(err,r) {
            if(r.length > 0){
                SendNotification(player, "Success", "ADMIN-SYSTEM", "Du hast den Spieler erfolgreich vom Server entbannt!");
                BanHandler.unban(clientname);
            } else {
                SendNotification(player, "Error", "ADMIN-SYSTEM", "Es wurde kein Spieler mit dem Namen gefunden!");
            }
        });
    }
});

mp.events.addCommand("resethwid", (player, scname) => {
    if (player.getVariable("Admin") >= 6)
    {
        BanHandler.resethwid(scname);
    }
});