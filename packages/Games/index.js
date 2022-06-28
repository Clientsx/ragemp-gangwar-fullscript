require ("./customlobby.js")
const { SendNotification } = require("../Notification/index.js");
let vehiclespawnpoint = require("./json/vehicles.json").VehiclesSpawn;

let carblip;

setInterval(() => {

    mp.vehicles.forEach(_vehicle => {
        if (_vehicle.getVariable("isAEventCar"))
        {
            _vehicle.destroy();
        }
    });

    if (carblip)
    {
        carblip.destroy();
        carblip = null;
    }

    let newPos = vehiclespawnpoint[Math.floor(Math.random() * vehiclespawnpoint.length)];

    let car = mp.vehicles.new(mp.joaat("gburrito2"), new mp.Vector3(newPos),
    {
        numberPlate: "GANGWAR",
        color: [[0, 255, 0],[0, 255, 0]]
    });
    car.setColor(135, 135);
    car.numberPlate = "GANGWAR";
    car.setVariable("isAEventCar", true);
    mp.players.broadcast(`[!{#B39500}INFORMATION!{255, 255, 255}] Es ist ein Pinker GBurrito2 aufgetaucht!`);

    carblip = mp.blips.new(1, new mp.Vector3(newPos),
    {
        name: 'Fahrzeug',
        color: 48,
        shortRange: true,
    });

}, 1800000);//1800000

function playerEnterVehicleHandler(player, vehicle, seat) {
	if (vehicle.getVariable("isAEventCar"))
    {
        mp.players.forEach(_player => {
            SendNotification(player, "Info", "INFORMATION", "Das Fahrzeug wurde bestiegen und ist nun auf dem Weg zum 'Fahrzeug Verkäufer'")
        });
        player.call("setWayPoint", [-48.4722, -1075.06])
        if (carblip)
        {
            carblip.destroy();
            carblip = null;
        }
    }
}
 
mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);

mp.events.add('server:sellVehicleShape', (player) => {
    if (player.vehicle)
    {
        if (player.vehicle.getVariable("isAEventCar"))
        {
            player.vehicle.destroy();
            player.notify("~g~Du hast das Fahrzeug abgegeben!")
            SendNotification(player, "Success", "Käufer", "Perfekt! Als Belohnung bekommst du 2000$")
        } else {
            SendNotification(player, "Error", "Käufer", "Dieses Auto will ich nicht!")
        }
    }
});