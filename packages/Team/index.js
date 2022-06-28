let playerLevel = require("../Player/playerLevel.js")

mp.events.add("openTeamUI", (player) => {
    player.call("openTeam")
    player.call("closeHUD")
});

mp.events.addCommand("team", (player) => {
    player.dimension = 31;
    player.spawn(new mp.Vector3(-722.7653198242188, -1428.4677734375, 5.000524520874023))
    player.heading = 137.23526000976562;
    player.call("openTeam")
    player.setVariable("isFFA", false);
    player.setVariable("FFA", null);
    player.call("closeHUD")
});

mp.events.add("Server:TryJoinFraktion", (player, frakid) => {
    frakid = parseInt(frakid);
    switch (frakid) {
        case 1:
            //Grove
            player.spawn(new mp.Vector3(112.36637878417969, -1960.720703125, 20.950353622436523))
            player.heading = 20.575328826904297;

            //Kleidung
            player.setClothes(1, 111, 0, 0);     //Maske
            player.setClothes(11, 127, 9, 0);   //Oberteil
            player.setClothes(8, 1, 0, 0);      //T-Shirt
            player.setClothes(3, 0, 0, 0);      //Körper
            player.setClothes(4, 42, 2, 0);      //Hose
            player.setClothes(6, 8, 0, 0);      //Schuhe
            player.setClothes(7, 49, 0, 0);      //Acessories
            player.setVariable("Fraktion", "Grove")
        break;
        case 2:
            //Bloods
            player.spawn(new mp.Vector3(1231.3060302734375, -1591.9215087890625, 53.35645294189453))
            player.heading = -148.69357299804688;

            //Kleidung
            player.setClothes(1, 111, 5, 0);     //Maske
            player.setClothes(11, 127, 10, 0);   //Oberteil
            player.setClothes(8, 1, 0, 0);      //T-Shirt
            player.setClothes(3, 0, 0, 0);      //Körper
            player.setClothes(4, 42, 2, 0);      //Hose
            player.setClothes(6, 8, 0, 0);      //Schuhe
            player.setClothes(7, 49, 0, 0);      //Acessories
            player.setVariable("Fraktion", "Bloods")
        break;
        case 3:
            //Ballas
            player.spawn(new mp.Vector3(-38.631160736083984, -1446.04345703125, 31.493471145629883))
            player.heading = -175.08401489257812;

            //Kleidung
            player.setClothes(1, 51, 6, 0);     //Maske
            player.setClothes(11, 127, 13, 0);   //Oberteil
            player.setClothes(8, 1, 0, 0);      //T-Shirt
            player.setClothes(3, 0, 0, 0);      //Körper
            player.setClothes(4, 42, 2, 0);      //Hose
            player.setClothes(6, 57, 1, 0);      //Schuhe
            player.setClothes(7, 49, 0, 0);      //Acessories
            player.setVariable("Fraktion", "Ballas")
        break;
        case 4:
            //Vagos
            player.spawn(new mp.Vector3(343.78643798828125, -2028.657958984375, 22.35430145263672))
            player.heading = 134.8975830078125;

            //Kleidung
            player.setClothes(1, 51, 8, 0);     //Maske
            player.setClothes(11, 189, 2, 0);   //Oberteil
            player.setClothes(8, 1, 0, 0);      //T-Shirt
            player.setClothes(3, 15, 0, 0);      //Körper
            player.setClothes(4, 15, 2, 0);      //Hose
            player.setClothes(6, 57, 0, 0);      //Schuhe
            player.setClothes(7, 49, 0, 0);      //Acessories
            player.setVariable("Fraktion", "Vagos")
        break;
        case 5:
            //Crips
            player.spawn(new mp.Vector3(473.6611022949219, -1775.4915771484375, 28.693925857543945))
            player.heading = -97.27635192871094;

            //Kleidung
            player.setClothes(1, 111, 4, 0);     //Maske
            player.setClothes(11, 167, 2, 0);   //Oberteil
            player.setClothes(8, 1, 0, 0);      //T-Shirt
            player.setClothes(3, 0, 0, 0);      //Körper
            player.setClothes(4, 59, 5, 0);      //Hose
            player.setClothes(6, 57, 2, 0);      //Schuhe
            player.setClothes(7, 49, 0, 0);      //Acessories
            player.setVariable("Fraktion", "Crips")
        break;
        case 6:
            //LCN
            player.spawn(new mp.Vector3(-1535.4996337890625, 97.46726989746094, 56.76939392089844))
            player.heading = -126.93265533447266;

            //Kleidung
            player.setClothes(1, 54, 0, 0);     //Maske
            player.setClothes(11, 142, 0, 0);   //Oberteil
            player.setClothes(8, 10, 2, 0);      //T-Shirt
            player.setClothes(3, 4, 0, 0);      //Körper
            player.setClothes(4, 28, 0, 0);      //Hose
            player.setClothes(6, 10, 0, 0);      //Schuhe
            player.setClothes(7, 29, 2, 0);      //Acessories
            player.setVariable("Fraktion", "LCN")
        break;
        case 7:
            //Yakuza
            player.spawn(new mp.Vector3(-1516.617431640625, 851.7373657226562, 181.5946807861328))
            player.heading = -27.833866119384766;

            //Kleidung
            player.setClothes(1, 94, 0, 0);      //Maske
            player.setClothes(11, 145, 6, 0);    //Oberteil
            player.setClothes(8, 15, 0, 0);      //T-Shirt
            player.setClothes(3, 14, 0, 0);      //Körper
            player.setClothes(4, 28, 2, 0);      //Hose
            player.setClothes(6, 10, 12, 0);     //Schuhe
            player.setClothes(7, 0, 0, 0);       //Acessories
            player.setVariable("Fraktion", "Yakuza")
        break;
        case 8:
            //Triaden
            player.spawn(new mp.Vector3(-1804.9530029296875, 437.09698486328125, 128.70741271972656))
            player.heading = -0.32616883516311646;

            //Kleidung
            player.setClothes(1, 54, 1, 0);      //Maske
            player.setClothes(11, 77, 2, 0);    //Oberteil
            player.setClothes(8, 1, 5, 0);      //T-Shirt
            player.setClothes(3, 14, 0, 0);      //Körper
            player.setClothes(4, 24, 2, 0);      //Hose
            player.setClothes(6, 10, 0, 0);     //Schuhe
            player.setClothes(7, 0, 0, 0);       //Acessories
            player.setVariable("Fraktion", "Triaden")
        break;
    }
    player.call("closeTeam");
    player.dimension = 0;
    playerLevel.setLevelWeapon(player, player.getVariable("Level"))
    player.armour = 100;
    player.call("openHUD")
    player.call("updateHUD", [`${player.getVariable("Kills")}`, `${player.getVariable("Deaths")}`, `${player.getVariable("Xp")}`, `${player.getVariable("MaxXp")}`])
});