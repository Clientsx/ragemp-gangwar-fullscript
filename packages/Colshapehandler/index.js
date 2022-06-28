module.exports = { 
    loadAllColshapes: async function(){
        const [rows, fields, err] = await gangwar.query("SELECT * FROM colshapes", [])
        if(rows.length > 0){
            for (let i = 0; i < rows.length; i++) {
                let sp = mp.colshapes.newCuboid(rows[i].posX, rows[i].posY, rows[i].posZ, 2, 2, 2, rows[i].dimension);
                sp.setVariable("haveMessage", rows[i].haveMessage)
                sp.setVariable("Message", rows[i].Message)
                sp.setVariable("TriggerEvent", rows[i].Event)
    
                mp.markers.new(1, new mp.Vector3(rows[i].posX, rows[i].posY, rows[i].posZ - 1), 1,
                {
                    color: [255, 255, 255, 255],
                    visible: true,
                    dimension: rows[i].dimension
                });
            }
        }
    },
    createColshape: async function(player, event, hmessage, message){
        const [rows, fields, err] = await gangwar.query("INSERT INTO colshapes SET posX = ?, posY = ?, posZ = ?, Event = ?, haveMessage = ?, Message = ?, dimension = ?", [player.position.x, player.position.y, player.position.z, event, hmessage, message, player.dimension])
            if (err) console.log(err);
    }
};