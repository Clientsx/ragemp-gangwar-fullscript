let frakinvite = null,
player = mp.players.local;

mp.events.add("GGW:OpenUI:FraktionInvite", (frakname) => {
    if (!frakinvite)
    {
        frakinvite = mp.browsers.new("package://web/FraktionInvite/index.html");
        frakinvite.execute(`updateFrakname("${frakname}");`);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        mp.gui.chat.activate(false);
        setTimeout(() => {
            mp.gui.cursor.visible = true;
        }, 500);
    }
});

mp.events.add("GGW:CloseUI:FraktionInvite", () => {
    if (frakinvite)
    {
        frakinvite.destroy();
        frakinvite = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.gui.chat.activate(true);
    }
});

mp.events.add("GGW:CloseUI:FraktionInvite2", (frakname) => {
    if (frakinvite)
    {
        mp.events.callRemote("GGW:ServerEvent:FraktionInvite2", frakname);
        frakinvite.destroy();
        frakinvite = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.gui.chat.activate(true);
    }
});

mp.events.add("GGW:ClientEvent:TryJoinFraktionFromInvite", (frakname) => {
    if (frakinvite)
    {
        mp.events.callRemote("GGW:ServerEvent:TryJoinFraktionFromInvite", frakname);
    }
});