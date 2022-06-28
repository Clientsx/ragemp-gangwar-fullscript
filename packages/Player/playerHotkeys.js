mp.events.add('StartWeste', (player) => {
    player.playAnimation('anim@heists@narcotics@funding@gang_idle', 'gang_chatting_idle01', 50, 15)
});

mp.events.add('FinishWeste', (player) => {
    player.armour = 100;
    player.setClothes(9, 15, 2, 0);
    player.stopAnimation();
});

mp.events.add('StartVerbandskasten', (player) => {
    player.playAnimation('amb@medic@standing@kneel@idle_a', 'idle_a', 50, 15)
});

mp.events.add('FinishVerbandskasten', (player) => {
    player.health = 100;
    player.stopAnimation();
});