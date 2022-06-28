let userpanel = null,
player = mp.players.local;

mp.keys.bind(0x77, false, function() {
    if (!userpanel)
    {
        if (mp.gui.cursor.visible) return;
        userpanel = mp.browsers.new("package://web/Userpanel/index.html");
        userpanel.execute(`updateUserpanel(${player.getVariable("Crosshair")}, ${player.getVariable("CrosshairID")});`)
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        mp.gui.chat.activate(false);
        mp.gui.cursor.visible = true;
    } 
    else if(userpanel)
    {
        userpanel.destroy();
        userpanel = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.gui.chat.activate(true);
    }
});

mp.events.add("GGW:CloseUI:Userpanel", () => {
    if(userpanel){
        userpanel.destroy();
        userpanel = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.gui.chat.activate(true);
    }
});

mp.events.add("Userpanel:SaveCrosshair", (isActivated, selectedCrosshair) => {
    if(userpanel){
        mp.events.callRemote("Server:Userpanel:SaveCrosshair", isActivated, parseInt(selectedCrosshair));
    }
});