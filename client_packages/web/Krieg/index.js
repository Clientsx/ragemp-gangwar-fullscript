let krieg = null,
player = mp.players.local;

mp.events.add("GGW:OpenUI:Krieg", () => {
    if (!krieg)
    {
        krieg = mp.browsers.new("package://web/Krieg/index.html");
    }
});

mp.events.add("GGW:CloseUI:Krieg", () => {
    if (krieg)
    {
        krieg.destroy();
        krieg = null;
    }
});

mp.events.add("GGW:ExecuteUI:Krieg:StartSound", (soundname) => {
    if (krieg)
    {
        krieg.execute(`playSound(${soundname});`);
    }
});