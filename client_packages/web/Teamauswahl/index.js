let team = null,
teamcam = null,
player = mp.players.local;

mp.events.add("GGW:OpenUI:Teamauswahl", (t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11) => {
    if (!team)
    {
        team = mp.browsers.new("package://web/Teamauswahl/index.html");
        team.execute(`updateTeamMembers("${t1}", "${t2}", "${t3}", "${t4}", "${t5}", "${t6}", "${t7}", "${t8}", "${t9}", "${t10}", "${t11}");`)
        mp.game.graphics.transitionToBlurred(500);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
        player.setAlpha(20);
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.disableAllControlActions(1);
        mp.game.controls.disableAllControlActions(0);
        mp.gui.chat.activate(false);
        setTimeout(() => {
            mp.gui.cursor.visible = true;
        }, 500);
    }
});

mp.events.add("GGW:CloseUI:Teamauswahl", () => {
    if (team)
    {
        team.destroy();
        team = null;
        mp.gui.cursor.visible = false;
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
        player.setAlpha(255);
        mp.game.graphics.transitionFromBlurred(500);
        mp.game.controls.enableAllControlActions(2);
        mp.game.controls.enableAllControlActions(1);
        mp.game.controls.enableAllControlActions(0);
        mp.gui.chat.activate(true);
    }
});

mp.events.add("GGW:ExecuteUI:Teamauswahl:Error", (errorcode) => {
    if (team)
    {
        team.execute(`logError("${errorcode}");`)
    }
});


mp.events.add("GGW:ExecuteUI:Teamauswahl:UpdateTeam", (frakname, frakplayer) => {
    if (team)
    {
        team.execute(`updateTeam("${frakname}", "${frakplayer}");`)
    }
});

mp.events.add("GGW:ExecuteUI:Teamauswahl:ActivateTeam", (frakname) => {
    if (team)
    {
        team.execute(`activateFraktion("${frakname}");`)
    }
});

mp.events.add("GGW:ClientEvent:TryJoinTeam", (frakname) => {
    if (team)
    {
        mp.events.callRemote("GGW:ServerEvent:TryJoinTeam", frakname);
    }
});

mp.events.add("GGW:ClientEvent:TryJoinPrivatTeam", (frakname) => {
    if (team)
    {
        mp.events.callRemote("GGW:ServerEvent:TryJoinPrivatTeam", frakname);
    }
});