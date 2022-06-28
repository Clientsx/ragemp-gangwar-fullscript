let hud = null;
let showed = false;
let player = mp.players.local;

mp.events.add("openHUD", () => {
    if (!hud)
    {
        hud = mp.browsers.new("package://web/hud/index.html");
    }
});

mp.events.add("updateHUD", (kills, deaths, xp, maxxp, level) => {
    if (hud)
    {
        hud.execute(`updateHud("${kills}", "${deaths}", "${xp}", "${maxxp}", "${level}");`);
    }
});

mp.events.add("startProgressbarHUD", (time) => {
    if (hud)
    {
        hud.execute(`startProgressbar("${time}");`);
    }
});

mp.events.add("updateHUDAdminStatus", (toggle) => {
    if (hud)
    {
        hud.execute(`toggleAdmindienst(${toggle});`);
    }
});

mp.events.add("showKillerScreen", (username) => {
    if (hud)
    {
        hud.execute(`showKill("${username}");`);
    }
});

mp.events.add("closeHUD", () => {
    if (hud)
    {
        hud.destroy();
        hud = null;
    }
});

mp.events.add('render', () =>
{
	if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle && hud)
	{
		if(showed === false)
		{
			hud.execute("toggleVehicleHud(true);");
			showed = true;
		}

        let vel1 = player.vehicle.getSpeed() * 3.6;
        let vel = (vel1).toFixed(0);
		
		speedo.execute(`updateVehicleHud(${vel});`);
	}
	else
	{
		if(showed)
		{
			hud.execute("toggleVehicleHud(false);");
			showed = false;
		}
	}
});