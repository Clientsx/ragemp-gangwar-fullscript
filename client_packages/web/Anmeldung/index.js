let login = null,
logincam = null,
player = mp.players.local;

mp.events.add("GGW:OpenUI:Login", () => {
    if (!login)
    {
        login = mp.browsers.new("package://web/Anmeldung/index.html");
        mp.game.graphics.transitionToBlurred(500);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        player.setAlpha(20);
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.disableAllControlActions(1);
        mp.game.controls.disableAllControlActions(0);
        mp.gui.chat.activate(false);
        setTimeout(() => {
            mp.gui.cursor.visible = true;
        }, 500);
    }
});

mp.events.add("GGW:CloseUI:Login", () => {
    if (login)
    {
        login.destroy();
        login = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        player.setAlpha(255);
        mp.game.graphics.transitionFromBlurred(500);
        mp.game.controls.enableAllControlActions(2);
        mp.game.controls.enableAllControlActions(1);
        mp.game.controls.enableAllControlActions(0);
        mp.gui.chat.activate(true);
        mp.discord.update('Spielt auf German Gangwar', 'Spielt als '+mp.players.local.name);
    }
});

mp.events.add("GGW:ClientEvent:TryLogin", (username) => {
    if (login)
    {
        mp.events.callRemote("GGW:ServerEvent:TryLogin", username);
    }
});

mp.events.add("Login:Failed", (errorcode) => {
    if (login)
    {
        login.execute(`logError("${errorcode}");`);
    }
});