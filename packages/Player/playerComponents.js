module.exports = { 
    loadComponents: async function(player, username){
        const [rows, fields, err] = await gangwar.query("SELECT * FROM components WHERE Username = ?", [username])
        if(rows.length > 0){
            for (let i = 0; i < rows.length; i++) {
                player.giveWeaponComponent(mp.joaat("weapon_" + rows[i].Weapon), mp.joaat(rows[i].Component));
            }
        }
    },
    giveComponent: async function(player, weapon, compName){
        player.giveWeaponComponent(mp.joaat("weapon_" + weapon), mp.joaat(compName));
    },
    removeComponent: async function(player, weapon, compName){
        player.removeWeaponComponent(mp.joaat("weapon_" + weapon), mp.joaat(compName));
    },
    removeAllComponentsFromWeapon: async function(player, weapon){
        player.removeAllWeaponComponents(mp.joaat("weapon_" + weapon));
    },
    resetAllComponents: async function(player){
        player.resetAllWeaponComponents();
    }
};