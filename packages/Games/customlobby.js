const { SendNotification } = require("../Notification/index.js");

const lobbys = {};

function spawnOnLobbyMap()
{
    switch (lobbyid) {
        case 1:
            
        break;
    
        default:
        break;
    }
}

mp.events.addCommand("lobby", (player) => {
    if (player.getVariable("isLobbyOwner")) return SendNotification(player, "Info", "Lobby-System", "Du hast bereits eine Lobby!");
    if (player.getVariable("VIP") == 0) return SendNotification(player, "Info", "Lobby-System", "Du hast keine Berechtigung dazu!");
    player.call("openLobby");
});

mp.events.add("Server:TryCreateLobby", (player, lobbyname, lobbypassword, maxplayer) => {
    if (player.getVariable("isLobbyOwner")) return SendNotification(player, "Info", "Lobby-System", "Du hast bereits eine Lobby!");
    if (player.getVariable("VIP") == 0) return SendNotification(player, "Info", "Lobby-System", "Du hast keine Berechtigung dazu!");
    if (lobbyname === undefined || lobbypassword === undefined || maxplayer === undefined) return;
    player.setVariable("isLobbyOwner", true);
    for (let i = 0; i < lobbys.length; i++) {
        if(lobbys[i].Name == lobbyname){
            return player.notify("~r~Eine Lobby mit diesem Namen exestiert bereits!");
        }
    }
    lobbys.push({"Besitzer": player.name, "Name": lobbyname, "Passwort": lobbypassword, "MaxSpieler": maxplayer, "Map": 1, "CurrentPlayer": 1});
    spawnOnLobbyMap(1);
});

mp.events.add("closeCustomLobby", (player) => {
    if (!player.getVariable("isLobbyOwner")) return SendNotification(player, "Info", "Lobby-System", "Du hast keine eigene Lobby!");
    player.setVariable("isLobbyOwner", false);
    for (let i = 0; i < lobbys.length; i++) {
        if(lobbys[i].Besitzer == player.name){
            lobbys.splice(i, 1);
        }
    }
});

mp.events.add("leaveCustomLobby", (player) => {
    if (player.getVariable("isLobbyOwner")) return;
    player.dimension = 0;
    //Soll am Spawn Spawnen
});

mp.events.addCommand("joinCustomLobby", (player, lobbyname, lobbypassword) => {
    if (player.getVariable("isLobbyOwner")) return;
    for (let i = 0; i < lobbys.length; i++) {
        if(lobbys[i].Name == lobbyname){
            if(lobbys[i].Passwort == lobbypassword){
                if(!lobbys[i].CurrentPlayer == lobbys[i].MaxSpieler){
                    //Soll am Spawn der Map spawnen
                    //Soll die Variable bekommen
                    lobbys[i].CurrentPlayer = lobbys[i].CurrentPlayer + 1;
                } else {
                    player.notify("~r~Lobby ist voll!")
                }
            } else {
                player.notify("~r~Passwort ist falsch!")
            }
        }
    }
});