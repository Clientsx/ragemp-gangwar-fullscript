function SendNotification(player, state, title, message)
{
    player.call("showNotification", [state, title, message]);
}

module.exports = { SendNotification }