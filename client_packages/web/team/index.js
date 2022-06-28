let team = null;
let player = mp.players.local;

mp.events.add("openTeam", () => {
    if (!team)
    {
        team = mp.browsers.new("package://web/team/index.html");
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        player.setAlpha(60);
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.disableAllControlActions(1);
        mp.game.controls.disableAllControlActions(0);
        mp.gui.chat.activate(false);
        mp.gui.cursor.visible = true;
            setTimeout(() => {
                mp.gui.cursor.visible = true;
                mp.game.ui.displayHud(false);
                mp.game.ui.displayRadar(false);
            }, 300);
    }
});

mp.events.add("closeTeam", () => {
    if (team)
    {
        team.destroy();
        team = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        player.setAlpha(255);
        mp.game.graphics.transitionFromBlurred(500);
        mp.game.controls.enableAllControlActions(2);
        mp.game.controls.enableAllControlActions(1);
        mp.game.controls.enableAllControlActions(0);
        mp.gui.chat.activate(true);
    }
});

mp.events.add("TryJoinFraktion", (frakid) => {
    if (team)
    {
        mp.events.callRemote("Server:TryJoinFraktion", frakid);
    }
});