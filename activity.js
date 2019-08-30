const cfg = require('./botCfg.json')
let num = 0

module.exports = {
start: function (Client){
  setInterval(function(){
      let gIndex = Client.guilds.size;
      var guildArr = Client.guilds.array();
      let users = 0; 
      for (let i = 0; i < gIndex; i++){
        users = users + guildArr[i].members.size;
        cfg.mmbrSize = users + 1;
      }
      
      let activs = [
        `${Client.guilds.size} servers | Neon's Team`,
        `${cfg.mmbrSize} users | Neon's Team`,
        `%help | Neon's Team`,
        `by SuperNeon4ik | Neon's Team ||`
      ]

      Client.user.setActivity(activs[num], {url: "https://www.twitch.tv/superneonofficialgg", type: "STREAMING"})
    if(num < 3){
      num++
       }
    else{
      num = 0
    }
    }, 20000)
}
};