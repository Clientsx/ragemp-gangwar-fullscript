let notify = mp.browsers.new("package://web/notification/index.html");

mp.events.add("showNotification", (state, title, message) => {
    if (notify)
    {
        notify.execute(`callNotify("${state}", "${title}", "${message}");`);
        mp.game.audio.playSound(-1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", true, 0, true);
    }
});