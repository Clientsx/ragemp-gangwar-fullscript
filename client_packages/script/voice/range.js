let voiceRanges = [5, 15, 25];
let currentVoiceRange = 0;
let objectMarker = null;
let voiceTimer;
let reloadTimer;

mp.keys.bind(0x59, false, function() {
    if (mp.gui.cursor.visible) return;
    if (currentVoiceRange == voiceRanges.length) currentVoiceRange = 0;
    mp.events.callRemote("updateVoiceRange", voiceRanges[currentVoiceRange]);

    if (objectMarker)
    {
        objectMarker.destroy();
        objectMarker = null;
    }
    clearTimeout(voiceTimer);
    objectMarker = mp.markers.new(25, new mp.Vector3(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z - 0.3), voiceRanges[currentVoiceRange],
        {
            color: [16, 161, 242, 200],
            visible: true,
            dimension: mp.players.local.dimension
        });
    voiceTimer = setTimeout(() => {
        if (objectMarker)
        {
            objectMarker.destroy();
            objectMarker = null;
        }
    }, 300);

    currentVoiceRange++;
});

mp.keys.bind(0x77, false, function() {
    mp.voiceChat.cleanupAndReload(true, true, true);
});