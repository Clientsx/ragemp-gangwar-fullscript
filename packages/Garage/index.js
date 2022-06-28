const { SendNotification } = require("../Notification/index.js");

async function loadPrivateGarageVehicles(player)
{
    const [rows, fields, err] = await gangwar.query("SELECT * FROM vehicles WHERE owner = ?", [player.name])
    if(rows.length > 0){
        for (let i = 0; i < rows.length; i++) {
            switch (rows[i].state) {
                case 1:
                    player.call("client:garage:createeventcar", [`${rows[i].model}`]);
                break;
                case 2:
                    player.call("client:garage:createshopcar", [`${rows[i].model}`]);
                break;
                default:
                break;
            }
        }
    }
}

mp.events.add("Server:TryParkout", (player, carname, level) => {
    level = parseInt(level);
    if (player.getVariable("Level") >= level)
    {
        parkoutVehicle(player, carname);
    }
    else 
    {
        SendNotification(player, "Error", "Garage", "Dein Level reicht nicht aus!")
    }
});

mp.events.add("loadGarageVehicles", (player) => {
    loadPrivateGarageVehicles(player);
});

function parkoutVehicle(player, carname)
{
    mp.vehicles.forEach(_vehicle => {
        if (_vehicle.getVariable("Owner") == player.name)
        {
            _vehicle.destroy();
        }
    });

    player.call("client:parkvehicleout")

    switch (player.getVariable("Fraktion")) {
        case "Grove":
            let distanceToGroveParkOut = player.dist(new mp.Vector3(95.27487182617188, -1959.0311279296875, 20.74538803100586));
            if (distanceToGroveParkOut >= 51) return SendNotification(player, "Error", "Garage", "Diese Garage gehört nicht deiner Fraktion!");
            let grove = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(95.27487182617188, -1959.0311279296875, 20.74538803100586),
            {
                heading: -37,
                numberPlate: "Grove",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            grove.numberPlate = "Grove";
            player.putIntoVehicle(grove, 0);
            grove.setColor(57, 57);
            grove.setVariable("Owner", player.name);
        break;
        case "Bloods":
            let distanceToBloodsParkOut = player.dist(new mp.Vector3(1170.9813232421875, -1666.7586669921875, 36.71296691894531));
            if (distanceToBloodsParkOut >= 51) return SendNotification(player, "Error", "Garage", "Diese Garage gehört nicht deiner Fraktion!");
            let bloods = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(1170.9813232421875, -1666.7586669921875, 36.71296691894531),
            {
                heading: 152,
                numberPlate: "Bloods",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            bloods.numberPlate = "Bloods";
            player.putIntoVehicle(bloods, 0);
            bloods.setColor(39, 39);
            bloods.setVariable("Owner", player.name);
        break;
        case "Ballas":
            let distanceToBallasParkOut = player.dist(new mp.Vector3(-75.23112487792969, -1458.6875, 32.096004486083984));
            if (distanceToBallasParkOut >= 51) return SendNotification(player, "Error", "Garage", "Diese Garage gehört nicht deiner Fraktion!");
            let ballas = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(-75.23112487792969, -1458.6875, 32.096004486083984),
            {
                heading: -145,
                numberPlate: "Ballas",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            ballas.numberPlate = "Ballas";
            player.putIntoVehicle(ballas, 0);
            ballas.setColor(148, 148);
            ballas.setVariable("Owner", player.name);
        break;
        case "Vagos":
            let distanceToVagosParkOut = player.dist(new mp.Vector3(313.9626159667969, -2023.148681640625, 20.531700134277344));
            if (distanceToVagosParkOut >= 51) return SendNotification(player, "Error", "Garage", "Diese Garage gehört nicht deiner Fraktion!");
            let vagos = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(313.9626159667969, -2023.148681640625, 20.531700134277344),
            {
                heading: 50,
                numberPlate: "VAGOS",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            vagos.numberPlate = "Vagos";
            player.putIntoVehicle(vagos, 0);
            vagos.setColor(42, 42);
            vagos.setVariable("Owner", player.name);
        break;
        case "Crips":
            let distanceToCripsParkOut = player.dist(new mp.Vector3(486.3067626953125, -1797.2421875, 28.404491424560547));
            if (distanceToCripsParkOut >= 51) return SendNotification(player, "Error", "Garage", "Diese Garage gehört nicht deiner Fraktion!");
            let crips = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(486.3067626953125, -1797.2421875, 28.404491424560547),
            {
                heading: -126,
                numberPlate: "Crips",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            crips.numberPlate = "Crips";
            player.putIntoVehicle(crips, 0);
            crips.setColor(83, 83);
            crips.setVariable("Owner", player.name);
        break;
        case "LCN":
            let distanceToLcnParkOut = player.dist(new mp.Vector3(-1526.3837890625, 86.91582489013672, 56.56220626831055));
            if (distanceToLcnParkOut >= 51) return SendNotification(player, "Error", "Garage", "Diese Garage gehört nicht deiner Fraktion!");
            let lcn = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(-1526.3837890625, 86.91582489013672, 56.56220626831055),
            {
                heading: -92,
                numberPlate: "LCN",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            lcn.numberPlate = "LCN";
            player.putIntoVehicle(lcn, 0);
            lcn.setColor(12, 12);
            lcn.setVariable("Owner", player.name);
        break;
        case "Yakuza":
            let distanceToYakuzaParkOut = player.dist(new mp.Vector3(-1525.282958984375, 882.4125366210938, 181.7494354248047));
            if (distanceToYakuzaParkOut >= 51) return SendNotification(player, "Error", "Garage", "Diese Garage gehört nicht deiner Fraktion!");
            let yakuza = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(-1525.282958984375, 882.4125366210938, 181.7494354248047),
            {
                heading: -77,
                numberPlate: "Yakuza",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            yakuza.numberPlate = "Yakuza";
            player.putIntoVehicle(yakuza, 0);
            yakuza.setColor(40, 40);
            yakuza.setVariable("Owner", player.name);
        break;
        case "Triaden":
            let distanceToTriadenParkOut = player.dist(new mp.Vector3(-1793.922607421875, 457.3161926269531, 128.30801391601562));
            if (distanceToTriadenParkOut >= 51) return SendNotification(player, "Error", "Garage", "Diese Garage gehört nicht deiner Fraktion!");
            let triaden = mp.vehicles.new(mp.joaat(carname), new mp.Vector3(-1793.922607421875, 457.3161926269531, 128.30801391601562),
            {
                heading: 87,
                numberPlate: "Triaden",
                alpha: 255,
                color: [[0, 255, 0],[0, 255, 0]],
                locked: false,
                engine: true,
                dimension: 0
            });
            triaden.numberPlate = "Triaden";
            player.putIntoVehicle(triaden, 0);
            triaden.setColor(82, 82);
            triaden.setVariable("Owner", player.name);
        break;
    }
    player.call("closeGarage")
}