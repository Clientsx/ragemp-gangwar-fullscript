require ("./playerJoin.js")
require ("./playerLevel.js")
require ("./playerHotkeys.js")
require ("./playerDeath.js")
require ("./playerAdmin.js")
require ("./playerCommands.js")
require ("./playerComponents.js")

mp.events.add("Server:ReloadPlayerHUD", (player) => {
    player.call("openHUD")
    player.call("updateHUD", [`${player.getVariable("Kills")}`, `${player.getVariable("Deaths")}`, `${player.getVariable("Xp")}`, `${player.getVariable("MaxXp")}`])
});