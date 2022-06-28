module.exports = { 
    isUsernameExist: async function(username){
        const [rows, fields, err] = await gangwar.query("SELECT Username FROM accounts WHERE Username = ?", [username])
        if(rows.length > 0){
            return true;
        }
    return false;
    },
    isAccountOwner: async function(player, username, scname){
        const [rows, fields, err] = await gangwar.query("SELECT * FROM accounts WHERE Username = ? AND SocialClub = ?", [username, scname])
        if(rows.length > 0){
            player.setVariable("Admin", rows[0].Admin);
            player.setVariable("VIP", rows[0].Vip);
            player.setVariable("Money", rows[0].Money);
            player.setVariable("Kills", rows[0].Kills);
            player.setVariable("Deaths", rows[0].Deaths);
            player.setVariable("Level", rows[0].Level);
            player.setVariable("Xp", rows[0].xp);
            player.setVariable("MaxXp", rows[0].maxxp);
            return true;
        }
    return false;
    },
    isAccountExist: async function(scname){
        const [rows, fields, err] = await gangwar.query("SELECT SocialClub FROM accounts WHERE SocialClub = ?", [scname])
        if(rows.length > 0){
            return true;
        }
    return false;
    },
    havePlayerAccount: async function(hwid){
        const [rows, fields, err] = await gangwar.query("SELECT HWID FROM accounts WHERE HWID = ?", [hwid])
        if(rows.length > 0){
            return true;
        }
    return false;
    },
    createPlayerAccount: async function(player, username){
        const [rows, fields, err] = await gangwar.query("INSERT INTO accounts SET Username = ?, SocialClub = ?, HWID = ?", [username, player.socialClub, player.serial])
            if (err) console.log(err);
    }
};