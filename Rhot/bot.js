const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require("wio.db");
//const dbs = require('quick.db')
require('./util/eventLoader')(client);
const fynx = require("./ayarlar.json");
const { Player } = require("discord-player");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const ms = require("parse-ms");
let xp = require("./xp.json");

const player = new Player(client);
client.player = player;


const { Client, MessageEmbed } = require('discord.js');


var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


/*setInterval(() => {
  var zaman = moment().format('MMMM Do YYYY, h:mm:ss a');
  client.channels.cache.get("844567244565643264").send(`Rhot Otomatik restart: ${zaman}`).then(msg => {  
    console.log(`Otomatik restart: ${zaman}`)
    process.exit(0);
  })
  }, 7200000)*/



  client.on("message", message => {

    if(message.author.bot) {return}
    if(message.content.includes(".")) {return}
    if(message.content.length <= 5) {return}

    let filter = msg => {
      return msg.content.toLowerCase() == message.content.toLowerCase() && // check if the content is the same (sort of)
             msg.author == message.author; // check if the author is the same
    }

    let xpAdd = Math.floor(Math.random() * 7) + 8;
    
    if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 300;
    xp[message.author.id].xp =  curxp + xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
      xp[message.author.id].level = curlvl + 1;
      xp[message.author.id].xp = 0;
      db.set(`rankxp_${message.author.id}`, "0") //843630418997149736
 let kanal = message.client.channels.cache.get("843630418997149736");
     const embed = new Discord.MessageEmbed()
            .setAuthor(`Level Atladın!`, message.author.avatarURL({format : "png",dynamic : true}))
           .setDescription(`<@${message.member.user.id}> Yeni level'in: ${curlvl + 1}`);
           kanal.send({embed});
    
      //message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
    db.set(`rankxp_${message.author.id}`, xp[message.author.id].xp)
    db.set(`ranklevel_${message.author.id}`, xp[message.author.id].level)
    //console.log(xp[message.author.id].xp);
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    });
    
    });


//Tagı alan kişilere rol verme

/////////////////////////


//Yasaklı tag alana rol verme


client.on("guildMemberAdd", member => {
  let tag = "†"; ///////tag girin
  let sunucu = "833069798061244426"; ///////sunucunuzun id
  let kanal = "835628120550801479" ///////log tutulcak kanal id
  let rol = "835084060891676692"; /////tag aldımı verilmesini istediğiniz rol id

if(member.user.username.includes("†")){
member.roles.add("835084060891676692")
member.roles.remove("835082233857572874")
member.roles.remove("835082161836130354")
client.channels.cache.get(kanal).send(`**${member} | \`${member.id}\` | adlı kişi ${tag} yasaklı tagı olduğu için <@&${rol}> rolü verildi !**`)
}
})



client.on("userUpdate", async (oldUser, newUser) => {
if (oldUser.username !== newUser.username) {
let tag = "†"; ///////tag girin
let sunucu = "833069798061244426"; ///////sunucunuzun id
let kanal = "835628120550801479" ///////log tutulcak kanal id
let rol = "835084060891676692"; /////tag aldımı verilmesini istediğiniz rol id
if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
client.channels.cache.get(kanal).send(`**${newUser} | \`${newUser.id}\` | adlı kişi ${tag} yasaklı tagı aldığı için <@&${rol}> rolü verildi !**`)
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835082233857572874')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835082161836130354')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083192654233632')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835082956065996842')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083101448962069')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835082645405958155')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835622165164326933')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623403330732073')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623356887597107')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623327044993085')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623282106433546')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083307434770432')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835620400288497705')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835620288955547732')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083522170421269')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083580278308884')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623076942446622')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835622904967331911')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835622812780986408')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621485082050590')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621420703809577')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835619799441866822')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621236867989535')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621001642770462')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835620892033417259')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835268492844072970')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621861265637436')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
}
if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add('835082233857572874')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add('835082161836130354')
client.channels.cache.get(kanal).send(`**${newUser}  | \`${newUser.id}\` |  adlı kişi ${tag} yasaklı tagdan çıktığı için <@&${rol}> rolü alındı ve <@&835082233857572874> <@&835082161836130354> rolleri verildi !**`) } } })








client.on("guildMemberAdd", member => {
  let tag = "ζ"; ///////tag girin
  let sunucu = "833069798061244426"; ///////sunucunuzun id
  let kanal = "835628120550801479" ///////log tutulcak kanal id
  let rol = "835084060891676692"; /////tag aldımı verilmesini istediğiniz rol id

if(member.user.username.includes("ζ")){
member.roles.add("835084060891676692")
member.roles.remove("835082233857572874")
member.roles.remove("835082161836130354")
client.channels.cache.get(kanal).send(`**${member} | \`${member.id}\` | adlı kişi ${tag} yasaklı tagı olduğu için <@&${rol}> rolü verildi !**`)
}
})



client.on("userUpdate", async (oldUser, newUser) => {
if (oldUser.username !== newUser.username) {
let tag = "ζ"; ///////tag girin
let sunucu = "833069798061244426"; ///////sunucunuzun id
let kanal = "835628120550801479" ///////log tutulcak kanal id
let rol = "835084060891676692"; /////tag aldımı verilmesini istediğiniz rol id
if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
client.channels.cache.get(kanal).send(`**${newUser} | \`${newUser.id}\` | adlı kişi ${tag} yasaklı tagı aldığı için <@&${rol}> rolü verildi !**`)
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835082233857572874')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835082161836130354')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083192654233632')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835082956065996842')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083101448962069')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835082645405958155')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835622165164326933')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623403330732073')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623356887597107')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623327044993085')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623282106433546')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083307434770432')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835620400288497705')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835620288955547732')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083522170421269')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083580278308884')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623076942446622')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835622904967331911')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835622812780986408')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621485082050590')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621420703809577')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835619799441866822')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621236867989535')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621001642770462')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835620892033417259')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835268492844072970')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621861265637436')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
}
if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add('835082233857572874')
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add('835082161836130354')
client.channels.cache.get(kanal).send(`**${newUser}  | \`${newUser.id}\` |  adlı kişi ${tag} yasaklı tagdan çıktığı için <@&${rol}> rolü alındı ve <@&835082233857572874> <@&835082161836130354> rolleri verildi !**`) } } })








/////////////////////////



//Sunucu ses girme....
client.on("ready", () => {
  client.channels.cache.get("843859869861806100").join();
});
client.on('voiceStateUpdate', async (oldState, newState) => {
  let kontrol = newState.id
  if(kontrol === "831632169058959401"){
    client.channels.cache.get("843859869861806100").join();
  }
})



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
