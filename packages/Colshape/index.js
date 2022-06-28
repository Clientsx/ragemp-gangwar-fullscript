const ColshapeHandler = require("../Colshapehandler/index")

function playerEnterColshapeHandler(player, shape) {
    if (shape.getVariable("haveMessage") == 1)
    {
        player.notify(shape.getVariable("Message"))
    }
    player.setVariable("isInColshape", true);
    player.setVariable("Colshape_Trigger", shape.getVariable("TriggerEvent"));
}

function playerExitColshapeHandler(player, shape) {
    player.setVariable("isInColshape", false);
    player.setVariable("Colshape_Trigger", null);
}
  
mp.events.add("playerExitColshape", playerExitColshapeHandler);
mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

mp.events.add("KeyE", (player) => {
    if (!player.getVariable("isInColshape")) return;
    player.call(""+player.getVariable("Colshape_Trigger"))
});

setTimeout(() => {
    ColshapeHandler.loadAllColshapes();
}, 1000);

mp.events.addCommand("createColshape", (player, fullText, event, hmessage, message) => {
    ColshapeHandler.createColshape(player, event, hmessage, message);
});