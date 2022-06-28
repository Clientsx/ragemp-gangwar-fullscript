let login = null;
let player = mp.players.local;

mp.events.add("openLogin", () => {
    if (!login)
    {
        login = mp.browsers.new("package://web/login/index.html");
        mp.game.graphics.transitionToBlurred(500);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        player.setAlpha(60);
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.disableAllControlActions(1);
        mp.game.controls.disableAllControlActions(0);
        mp.gui.chat.activate(false);
        setTimeout(() => {
            mp.gui.cursor.visible = true;
        }, 500);
    }
});

mp.events.add("closeLogin", () => {
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
        mp.discord.update('Spielt auf Gangwar', 'Spielt als '+mp.players.local.name);
    }
});

mp.events.add("TryLogin", (username) => {
    if (login)
    {
        mp.events.callRemote("Server:TryLogin", username);
    }
});

mp.events.add("Login:Failed", (error) => {
    if (login)
    {
        login.execute(`logError("${error}");`);
    }
});

mp.events.add("Login:Succes", (truecode) => {
    if (login)
    {
        mp.events.call('moveSkyCamera', mp.players.local, "down");
        login.execute(`logTrue("${truecode}");`);
    }
});