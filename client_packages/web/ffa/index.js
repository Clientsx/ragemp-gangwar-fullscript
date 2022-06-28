let ffa = null;
let player = mp.players.local;

mp.events.add("openFFA", (ffa1, ffa2, ffa3) => {
    if (!ffa)
    {
        ffa = mp.browsers.new("package://web/ffa/index.html");
        ffa.execute(`updateFFAPlayer("${ffa1}", "${ffa2}", "${ffa3}");`)
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

mp.events.add("closeFFA", () => {
    if (ffa)
    {
        ffa.destroy();
        ffa = null;
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

mp.events.add("closeFFA2", () => {
    if (ffa)
    {
        ffa.destroy();
        ffa = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        player.setAlpha(255);
        mp.game.graphics.transitionFromBlurred(500);
        mp.game.controls.enableAllControlActions(2);
        mp.game.controls.enableAllControlActions(1);
        mp.game.controls.enableAllControlActions(0);
        mp.gui.chat.activate(true);
        mp.events.callRemote("ffajoin_abbrechen")
    }
});

mp.events.add("tryJoinFFA", (id) => {
    if (id)
    {
        mp.events.callRemote("Server:TryJoinFFA", id);
    }
});