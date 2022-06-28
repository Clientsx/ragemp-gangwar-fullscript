const hud = require('./instructional_buttons/hudManager');
const buttonHud = new hud(-1, "#0c0c0c");
buttonHud.addButton("Öffnen", 38);
buttonHud.toggleHud(false);

mp.events.add("GGW:ClientEvent:ToggleButtonHUD", (value) => {
    buttonHud.toggleHud(value);
});