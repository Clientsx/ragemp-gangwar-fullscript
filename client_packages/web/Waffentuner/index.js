let waffentuner = null;
let player = mp.players.local;

mp.keys.bind(0x73, false, function() {
    if (!waffentuner)
    {
        if (mp.gui.cursor.visible) return;
        waffentuner = mp.browsers.new("package://web/Waffentuner/index.html");
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.disableAllControlActions(1);
        mp.game.controls.disableAllControlActions(0);
        mp.gui.chat.activate(false);
        mp.gui.cursor.visible = true;

    } else if(waffentuner)
    {
        waffentuner.destroy();
        waffentuner = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.game.controls.enableAllControlActions(2);
        mp.game.controls.enableAllControlActions(1);
        mp.game.controls.enableAllControlActions(0);
        mp.gui.chat.activate(true);
    }
});


mp.events.add("closeWeapontuner", () => {
    if(waffentuner){
        waffentuner.destroy();
        waffentuner = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.game.controls.enableAllControlActions(2);
        mp.game.controls.enableAllControlActions(1);
        mp.game.controls.enableAllControlActions(0);
        mp.gui.chat.activate(true);
    }
});

mp.events.add("tryBuyWeaponComponent", (weaponname, compstring, preis) => {
    if(waffentuner){
        mp.events.callRemote("GGW:ServerEvent:tryBuyWeaponComponent", weaponname, compstring, preis);
    }
});