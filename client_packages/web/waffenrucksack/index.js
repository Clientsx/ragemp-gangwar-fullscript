let waffenrucksack = mp.browsers.new("package://web/waffenrucksack/index.html");
let showedWeaponwaffenrucksack = false;
let player = mp.players.local;

mp.keys.bind(0x72, false, function() {
    if (!showedWeaponwaffenrucksack)
    {
        if (mp.gui.cursor.visible) return;
        waffenrucksack.execute(`toggleWeaponpack(true);`);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.disableAllControlActions(1);
        mp.game.controls.disableAllControlActions(0);
        mp.gui.chat.activate(false);
        mp.gui.cursor.visible = true;

    } else if(showedWeaponwaffenrucksack)
    {
        mp.gui.cursor.visible = false;
        waffenrucksack.execute(`toggleWeaponpack(false);`);
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.game.controls.enableAllControlActions(2);
        mp.game.controls.enableAllControlActions(1);
        mp.game.controls.enableAllControlActions(0);
        mp.gui.chat.activate(true);
    }
});

mp.events.add("tryDeactivateWeapon", (weaponname, weaponhash) => {
    if(showedWeaponwaffenrucksack){
        mp.events.callRemote("server:tryDeactivateWeapon", weaponname, weaponhash);
    }
});