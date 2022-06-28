let garage = null;
let player = mp.players.local;
let garagentimer;
let canParkOut = true;

mp.events.add("openGarage", () => {
    if (!garage)
    {
        garage = mp.browsers.new("package://web/garage/index.html");
        mp.game.graphics.transitionToBlurred(500);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        mp.gui.chat.activate(false);
        mp.events.call("closeHUD");
        createBasicCars();
        createBasicBikes();
        setTimeout(() => {
            mp.gui.cursor.visible = true;
            mp.events.callRemote("loadGarageVehicles")
        }, 500);
    }
});


mp.events.add("closeGarage", () => {
    if (garage)
    {
        garage.destroy();
        garage = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        mp.game.graphics.transitionFromBlurred(500);
        mp.gui.chat.activate(true);
        mp.events.callRemote("Server:ReloadPlayerHUD");
    }
});

function createBasicCars()
{
    if (garage)
    {
        garage.execute(`createFahrzeugCar("Revolter", "100");`)
        garage.execute(`createFahrzeugCar("Sultan3", "65");`)
        garage.execute(`createFahrzeugCar("Zr350", "60");`)
        garage.execute(`createFahrzeugCar("Issi7", "55");`)
        garage.execute(`createFahrzeugCar("Elegy", "50");`)
        garage.execute(`createFahrzeugCar("Tailgater2", "45");`)
        garage.execute(`createFahrzeugCar("Serrano", "40");`)
        garage.execute(`createFahrzeugCar("Serrano", "40");`)
        garage.execute(`createFahrzeugCar("Vagrant", "35");`)
        garage.execute(`createFahrzeugCar("Dominator3", "30");`)
        garage.execute(`createFahrzeugCar("Dominator7", "25");`)
        garage.execute(`createFahrzeugCar("Voodoo", "20");`)
        garage.execute(`createFahrzeugCar("Tulip", "20");`)
        garage.execute(`createFahrzeugCar("Virgo", "20");`)
        garage.execute(`createFahrzeugCar("Coquette3", "15");`)
        garage.execute(`createFahrzeugCar("Buccaneer", "15");`)
        garage.execute(`createFahrzeugCar("Dominator", "15");`)
        garage.execute(`createFahrzeugCar("Faction2", "15");`)
        garage.execute(`createFahrzeugCar("Gauntlet", "15");`)
        garage.execute(`createFahrzeugCar("Impaler", "15");`)
        garage.execute(`createFahrzeugCar("Windsor2", "10");`)
        garage.execute(`createFahrzeugCar("F620", "5");`)
        garage.execute(`createFahrzeugCar("Exemplar", "4");`)
        garage.execute(`createFahrzeugCar("Zion", "3");`)
        garage.execute(`createFahrzeugCar("Felon", "2");`)
        garage.execute(`createFahrzeugCar("Oracle", "1");`)
        garage.execute(`createFahrzeugCar("Cogcabrio", "0");`)
        garage.execute(`createFahrzeugCar("Sentinel", "0");`)
    }
}

function createBasicBikes()
{
    if (garage)
    {
        garage.execute(`createBikesCar("Sanchez", "0");`)
    }
}

mp.events.add("TryParkout", (carname, level) => {
    if (garage)
    {
        if (canParkOut)
        {
            mp.events.callRemote("Server:TryParkout", carname, parseInt(level));
        }
        else if (!canParkOut)
        {
            mp.events.call("showNotification", "Error", "Garage", "Du kannst nur ein Fahrzeug pro halbe Minute ausparken!");
        }
    }
});

mp.events.add("client:parkvehicleout", () => {
    canParkOut = false;
    garagentimer = setTimeout(() => {
        canParkOut  = true;
    }, 30000);
});

mp.events.add("playerDeath", (player, reason, killer) => {
    clearTimeout(garagentimer);
    canParkOut  = true;
});

mp.events.add("client:garage:createeventcar", (name) => {
    if (garage)
    {
        garage.execute(`createEventCar("${name}", "0");`)
    }
});

mp.events.add("client:garage:createshopcar", (name) => {
    if (garage)
    {
        garage.execute(`createShopCar("${name}", "0");`)
    }
});