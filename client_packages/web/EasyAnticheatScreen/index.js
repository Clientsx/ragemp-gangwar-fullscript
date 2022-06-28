let eacscreen = null,
player = mp.players.local;

mp.events.add("GGW:OpenUI:EasyAnticheatScreen", (banreason) => {
    if (!eacscreen)
    {
        eacscreen = mp.browsers.new("package://web/EasyAnticheatScreen/index.html");
        mp.game.graphics.transitionToBlurred(500);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.disableAllControlActions(1);
        mp.game.controls.disableAllControlActions(0);
        mp.gui.chat.activate(false);
        setTimeout(() => {
            mp.gui.cursor.visible = true;
        }, 500);

        setTimeout(() => {
            eacscreen.execute(`triggerBan("${banreason}");`);
            setTimeout(() => {
                mp.events.callRemote("kickPlayer");
            }, 500);
        }, 5000);
    }
});