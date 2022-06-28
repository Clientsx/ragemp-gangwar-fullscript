let lobby = null;
let player = mp.players.local;

mp.events.add("openLobby", () => {
    if (!lobby)
    {
        lobby = mp.browsers.new("package://web/lobby/index.html");
        mp.game.graphics.transitionToBlurred(500);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        mp.gui.chat.activate(false);
        setTimeout(() => {
            mp.gui.cursor.visible = true;
        }, 500);
    }
});

mp.events.add("closeLobby", () => {
    if (lobby)
    {
        lobby.destroy();
        lobby = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.game.graphics.transitionFromBlurred(500);
        mp.gui.chat.activate(true);
    }
});

mp.events.add("TryCreateLobby", (lobbyname, lobbypassword, maxplayer) => {
    if (lobby)
    {
        mp.events.callRemote("Server:TryCreateLobby", lobbyname, lobbypassword, parseInt(maxplayer))
    }
});