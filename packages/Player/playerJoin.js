const ComponentHandler = require("./playerComponents");
const BanHandler = require("../Banhandler/index");
const AccountHandler = require("../Accoutnhandler/index");

mp.events.add("playerJoin", async (player) => {
    player.spawn(new mp.Vector3(-722.7653198242188, -1428.4677734375, 5.000524520874023))
    player.heading = 137.23526000976562;
    player.dimension = 31;
    player.call('moveSkyCamera', [player, 'up', 2, false]);
    player.call("openLogin");

    let isBanned = await BanHandler.chekban(player.serial);

    if (isBanned)
    {
        player.kick();
    }
});

mp.events.add("Server:TryLogin", async (player, username) => {
    if (username.length <= 3) return player.call("Login:Failed", [`Der name ist zu kurz!`]);
    if(/[^a-z\d]/i.test(username)) return player.call("Login:Failed", [`Du darfst keine Sonderzeichen haben!`]);
    if (await AccountHandler.isUsernameExist(username))
    {
        if (await AccountHandler.isAccountOwner(player, username, player.socialClub))
        {
            player.call("customEvalWithDelay", [`server:loadcharacter`, 500]);
            player.name = username;
            player.call("Login:Succes", [`Willkommen zurück ${username}!`]);
            player.setVariable("Killstreak", 0);
            player.setVariable("isFFA", false)
            ComponentHandler.loadComponents(player, username);
        }
        else
        {
            player.call("Login:Failed", [`Dieser Account gehört dir nicht!`])
        }
    }
    else
    {
        if (await AccountHandler.isAccountExist(player.socialClub))
        {
            player.call("Login:Failed", [`Dieser Account Existiert nicht!`])
        }
        else
        {
            if (await AccountHandler.havePlayerAccount(player.serial))
            {
                player.call("Login:Failed", [`Du besitzt bereits einen Account!`])
            } 
            else
            {
                await AccountHandler.createPlayerAccount(player, username);
                player.name = username;
                player.setVariable("Admin", 0);
                player.setVariable("VIP", 0);
                player.setVariable("Money", 5000);
                player.setVariable("Kills", 1);
                player.setVariable("Deaths", 1);
                player.setVariable("Level", 2);
                player.setVariable("Xp", 25);
                player.setVariable("MaxXp", 100);
                player.setVariable("Killstreak", 0);
                player.setVariable("isFFA", false)
                player.call("Login:Succes", [`Erfolgreich Regestriert!`]);
                player.call("customEvalWithDelay", [`server:opencharcreator`, 3000])
            }
        }
    }
});

mp.events.addCommand("veh", (player, model) => {
    let admincar = mp.vehicles.new(model, new mp.Vector3(player.position),
        {
            heading: player.heading,
            numberPlate: "ADMIN",
            alpha: 255,
            color: [[0,0,0], [0,0,0]],
            locked: false,
            engine: true,
            dimension: player.dimension
        });
    admincar.numberPlate = "Admin";
});

mp.events.addCommand("pos", (player) => {
    if(player.vehicle){
        console.log(`${player.vehicle.position.x}, ${player.vehicle.position.y}, ${player.vehicle.position.z}`)
        console.log(`${player.vehicle.heading}`)
    } else {
        console.log(`${player.position.x}, ${player.position.y}, ${player.position.z}`)
        console.log(`${player.heading}`)
    }
});