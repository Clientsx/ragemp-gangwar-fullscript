let outfits = null,
outfitscam = null,
player = mp.players.local;

mp.events.add("GGW:OpenUI:Outfits", () => {
    if (!outfits)
    {
        outfits = mp.browsers.new("package://web/Outfits/index.html");
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        mp.gui.chat.activate(false);
        player.setAlpha(255);
        setTimeout(() => {
            mp.gui.cursor.visible = true;
        }, 500);

        if (!outfitscam)
        {
            outfitscam = mp.cameras.new('default', new mp.Vector3(-75.16515350341797, -825.8245849609375, 326.1752014160156), new mp.Vector3(0,0,0), 40);

            outfitscam.pointAtCoord(-75.28893280029297, -818.71875, 326.1751403808594); // Changes the rotation of the camera to point towards a location
            outfitscam.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
        }
    }
});

mp.events.add("GGW:CloseUI:Outfits", () => {
    if (outfits)
    {
        outfits.destroy();
        outfits = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        player.setAlpha(255);
        mp.gui.chat.activate(true);

        if (outfitscam)
        {
            outfitscam.destroy();
            outfitscam = null;
            mp.game.cam.renderScriptCams(false, false, 0, false, false);
        }
    }
});

mp.events.add("GGW:ExecuteUI:CreateOutfit", () => {
    if (outfits)
    {
        outfits.execute(`createOutfit();`)
    }
});

mp.events.add("GGW:ClientEvent:TryTestPlayOutfit", (outfitnumbers) => {
    if (outfits)
    {
        mp.events.callRemote("GGW:ServerEvent:TryTestPlayOutfit", parseInt(outfitnumbers));
    }
});

mp.events.add("GGW:ClientEvent:TryPlayOutfit", (outfitnumbers) => {
    if (outfits)
    {
        mp.events.callRemote("GGW:ServerEvent:TryPlayOutfit", parseInt(outfitnumbers));
    }
});