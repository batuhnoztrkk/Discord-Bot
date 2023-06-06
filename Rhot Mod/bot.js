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
  client.channels.cache.get("844567244565643264").send(`Rhot Guard Otomatik restart: ${zaman}`).then(msg => {  
    console.log(`Otomatik restart: ${zaman}`)
    process.exit(0);
  })
  }, 7200000)*/

const usersMap = new Map();
const LIMIT = 5;
const TIME = 300000;
const DIFF = 4000;

client.on("message", message => {
  if(message.author.bot) {return}
  if (message.channel.type === "dm") {return}
  let myRole = message.guild.roles.cache.get("835621861265637436");
  if(message.member.roles.highest.position >= myRole.position){return}

  /*if(message.member.roles.cache.get('835083307434770432') || message.member.roles.cache.get('835620400288497705') || message.member.roles.cache.get('835620288955547732') || message.member.roles.cache.get('835083522170421269')
|| message.member.roles.cache.get('835083580278308884') || message.member.roles.cache.get('835623076942446622') || message.member.roles.cache.get('835622904967331911')
|| message.member.roles.cache.get('835622812780986408') || message.member.roles.cache.get('835621485082050590') || message.member.roles.cache.get('835621420703809577')
|| message.member.roles.cache.get('835619799441866822') || message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
|| message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
|| message.member.roles.cache.get('835619974025576490')){return}*/


  if(usersMap.has(message.author.id)){
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    if(difference > DIFF) {
      clearTimeout(timer);
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, TIME);
      usersMap.set(message.author.id, userData);
    }
    else{
      ++msgCount;
      if(parseInt(msgCount) === LIMIT) {
        const role = message.guild.roles.cache.get("835084116978434048");
        message.member.roles.add(role);
        //message.channel.send(`<@${message.author.id}>, 2 saniye içinde 5'den fazla mesaj attığın için **5** dakika mutelendin`)

        var veri = db.fetch(`sicil_${message.author.id}`);
        if(!veri){
          db.set(`sicil_${message.author.id}`,`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde  <@831632169058959401> Tarafından \`Spam/Flood\` Sebebiyle \`5 dakika\` Yazılı Kanallarda **Mute.**`);
        }
        var yardımcıdizi = [`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde  <@831632169058959401> Tarafından \`Spam/Flood\` Sebebiyle \`5 dakika\` Yazılı Kanallarda **Mute.** \n\n${veri}`]
        db.set(`sicil_${message.author.id}`,`${yardımcıdizi}`);

        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`<@${message.author.id}>, 2 saniye içinde 5'den fazla mesaj attığın için **5** dakika mutelendin`)
        message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete());

        db.add(`mutecezayazı_${message.guild.id + message.member.id}`,1)
        db.set(`muteli_${message.guild.id + message.member.id}`, 'muteli')
        db.set(`süre_${message.member.id + message.guild.id}`, "5")

        message.client.channels.cache.get('835919143021707344').send(
          new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
            .setColor(`GREEN`)
            .setDescription(`<@${message.author.id}> (\`${message.author.id}\`) üye metin kanallarında susturuldu.

            • Yetkili: <@831632169058959401>
            • Zaman: \`5 dakika\`
            • Kanal: \`${message.channel.name}\`

            • Sebep: \`Spam/Flood\``)
        );

        setTimeout(() => {

          db.set(`muteli_${message.guild.id + message.member.id}`)
          db.set(`süre_${message.member.id + message.guild.id}`)
          message.member.roles.remove(role);

          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`<@${message.author.id}>, Muten 5 dakika dolduğu için kalktı.`)
          message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }));

          message.client.channels.cache.get('835919143021707344').send(
          new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
          .setColor('#494459')
          .setDescription(`<@${message.author.id}> (\`${message.author.id}\`) üyesinin metin kanallarında susturulması sonlandı.

          • Yetkili: <@831632169058959401>
          • Zaman: \`5 dakika\`
          • Kanal: \`${message.channel.name}\`

          • Sebep: \`Spam/Flood\``));


        //  message.channel.send("Muten kalktı").then(msg => msg.delete({ timeout: 4000 }));
        }, TIME);
      }
      else{
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  }

  else{
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
    }, TIME)
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      time: fn
    });

  }

});

//Sunucu ses girme....
client.on("ready", () => {
  client.channels.cache.get("843859869861806100").join();
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  let kontrol = newState.id
  if(kontrol === "852998418070241280"){
    client.channels.cache.get("843859869861806100").join();
  }
})


//                 //                  //// MUTE //                  ////                 //                  ////

client.on('guildMemberAdd', async(member) => {
  var datass = db.fetch("muteRol_" + member.guild.id)
//let mute = member.guild.roles.cache.find(r => r.id === "datass");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {

member.roles.add(datass)

member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
db.delete(`süre_${member.id + member.guild.id}`)
    member.send(`Muten açıldı.`)
    var datass = db.fetch("muteRol_" + member.guild.id)
    member.roles.remove(datass);
  }, ms(süre));
}
});
//                 //                  //// MUTE //                  ////                 //                  ////


//                 //                  //// OFFLİNE BAN //                  ////                 //                  ////

client.on('guildMemberAdd', async(member) => {

  var kontrol = db.fetch(`oban_${member.guild.id}`);
  if(kontrol){
  if(kontrol.includes(member.id)){

    const embedss = new Discord.MessageEmbed()
    .setAuthor(`BANNED FROM ${member.guild.name}`)
    .setColor('0x2f3136')
    .setDescription(`İD'in: \`${kontrol}\` Offline Ban Listesinde bulunduğu için otomatik olarak süresiz banlandın.`)
    member.send(embedss).then(msg => {

      const unban = new Discord.MessageEmbed()
      .setColor('BLACK')
      .setTitle("OFFLİNE BAN")
      .setDescription(`Offline ban listesinde bulunan **<@${member.id}> \`${member.id}}\` sunucuya girdi ve otomatik olarak banlandı!`)
      var data = '835978919999570020';
      member.client.channels.cache.get(data).send(unban);
            member.ban({reason: "Offline Ban"})
          })
  }
  else{
    return
  }
}
else{return}
});

//                 //                  //// OFFLİNE BAN //                  ////                 //                  ////




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
