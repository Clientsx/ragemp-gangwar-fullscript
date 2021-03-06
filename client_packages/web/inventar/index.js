let inventar = null;
let player = mp.players.local;

mp.keys.bind(0x49, false, function() {
    if (!inventar)
    {
        if (mp.gui.cursor.visible) return;
        inventar = mp.browsers.new("package://web/inventar/index.html");
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.disableAllControlActions(1);
        mp.game.controls.disableAllControlActions(0);
        mp.gui.chat.activate(false);
        mp.gui.cursor.visible = true;
        loadAllItems();

    } else if(inventar)
    {
        inventar.destroy();
        inventar = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.game.controls.enableAllControlActions(2);
        mp.game.controls.enableAllControlActions(1);
        mp.game.controls.enableAllControlActions(0);
        mp.gui.chat.activate(true);
    }
});

function loadAllItems()
{
    var inventorydata = [
        {"Itemname": "Money", "Itemvalue": mp.players.local.getVariable("Money")},
        {"Itemname": "Gangwar-Tokens", "Itemvalue": mp.players.local.getVariable("GWToken")},
        {"Itemname": "Geschenk", "Itemvalue": mp.players.local.getVariable("Geschenk")}
    ];
    inventar.execute(`createItem("${JSON.stringify(inventorydata)}");`);
}

mp.events.add("Inventar:UseItem", (itemname, itemamount) => {
    if(inv){
        mp.events.callRemote("Server:Inventar:UseItem", itemname, itemamount);
    }
});
mp.events.add("Inventar:GiveItem", (itemname, itemamount) => {
    if(inv){
        mp.events.callRemote("Server:Inventar:GiveItem", itemname, itemamount);
    }
});
mp.events.add("Inventar:DropItem", (itemname, itemamount) => {
    if(inv){
        mp.events.callRemote("Server:Inventar:DropItem", itemname, itemamount);
    }
});