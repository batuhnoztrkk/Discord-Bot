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




client.on('channelUpdate', async channel => {
  const guild = channel.guild;
  const logKanalID = await db.fetch(`logKanal_${guild.id}`)
  if(logKanalID == null || !logKanalID) return
  const logKanal = guild.channels.cache.get('835628319566987305')
  guild.fetchAuditLogs(11).then(a=>{
    const kanal = a.entries.first()
    var degişiklik;
    var multiply;
    if(kanal.changes[0].key =='name') {
      degişiklik = 'İsim güncellemesi.'
      multiply = `Eski isim: ${kanal.changes[0].old}\nYeni isim: ${kanal.changes[0].new}`
    }
    if(kanal.changes[0].key =='nsfw') {
        degişiklik = 'NSFW'
      if(kanal.changes[0].old == false) {
       multiply = `NSFW Özelliği açıldı.`
      }
      else if(kanal.changes[0].old == true) multiply = `NSFW Özelligi kapatıldı.`
    }
    if (kanal.changes[0].key == "id") {
      degişiklik = "Kanaldaki bir rolün yada kişinin yetkisi güncellendi.";
      if (kanal.changes[1].key == "type") {
        if (kanal.changes[1].old == "member" || kanal.changes[1].new == "member") {
          if (kanal.changes[1].old == "member") {
            multiply = `<@${kanal.changes[0].old}>'in üzerinde birşeyler oldu.`;
          } else {
            multiply = `<@${kanal.changes[0].new}>'in üzerinde birşeyler oldu.`;
          }
        } else if (kanal.changes[1].old == "role" || kanal.changes[1].new == "role") {
          if (kanal.changes[1].old == "role") {
            multiply = `<@&${kanal.changes[0].old}>'in üzerinde birşeyler oldu.`;
          } else {
            multiply = `<@&${kanal.changes[0].new}>'in üzerinde birşeyler oldu.`;
          }
        }
      }
    }else if(kanal.changes[0].key.includes('allow')) return
   if(kanal.changes[0].key == 'rate_limit_per_user') {
     degişiklik = 'Kanaldaki mesaj atma süresi güncellendi.'
     if(kanal.changes[0].old != 0) {
       multiply = `Kanalın mesaj gönderilme süresi kapatıldı.`
     }else if (kanal.changes[0].old == 0) {
       multiply = `Kanalın mesaj gönderilme süresi ayarlandı. Süre: ${kanal.changes[0].new} Saniye.`
     }
   }
    var user = a.entries.first().executor
    const embed = new MessageEmbed()
    .setColor('#0AFF00')
    .setTitle('Kanal Güncellendi')
    .addField('Kanalı Güncelliyen:',user.tag ,true)
    .addField('Güncellenen kanal:',kanal.target.name,true)
    .addField('Güncellenen:',degişiklik,true)
    .addField('Güncelleme Bilgisi:',multiply,true)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
  })
})
client.on('channelCreate', async channel => {
    if(!channel.guild) return
    const  guild = channel.guild;
    const logKanalID = await db.fetch(`logKanal_${guild.id}`)
    if(logKanalID == null || !logKanalID) return
    const logKanal = guild.channels.cache.get('835628319566987305')
    guild.fetchAuditLogs(10).then(a=>{
    const kanal = a.entries.first()
    const user = a.entries.first().executor
    const embed = new MessageEmbed()
    .setColor('#0AFF00')
    .setTitle('Kanal Oluşturuldu')
    .addField('Kanalı oluşturan:',user.tag,true)
    .addField('Kanalın ismi:',kanal.target.name,true)
    .addField('Kanal ID:',kanal.target.id,true)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
   })
})
client.on('channelDelete', async channel => {
    const  guild = channel.guild;
    const logKanalID = await db.fetch(`logKanal_${guild.id}`)
    if(logKanalID == null || !logKanalID) return
    const logKanal = guild.channels.cache.get('835628319566987305')
    guild.fetchAuditLogs(12).then(a=>{
    const kanal = a.entries.first()
    const user = a.entries.first().executor
    const embed = new MessageEmbed()
    .setColor('#0AFF00')
    .setTitle('Kanal Silindi')
    .addField('Kanalı silen:',user.tag,true)
    .addField('Kanalın ismi:',channel.name,true)
    .addField('Kanal ID:',channel.id,true)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
   })
})


client.on('voiceStateUpdate', async (oldState, newState) => {

  let newUserChannel = newState.channelID
  let oldUserChannel = oldState.channelID
  if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return
 // if(!oldState.channelID && newState.channelID) {

    const  guild = oldState.guild || newState.guild;
  /*   const logKanalID = await db.fetch(`logKanal_${guild.id}`)
    if(logKanalID == null || !logKanalID) return*/
    const logKanal = guild.channels.cache.get('835643762234753114')
    if(newUserChannel == null){
      const embed = new MessageEmbed()
      .setColor('#0AFF00')
      .setTitle('Sesli Kanal')
      .addField('Kanaldan ayrılan:',`<@${oldState.id}>  | \`${oldState.id}\``,true)
      .addField('Kanalın ismi:',`<#${oldState.channelID}>`,true)
      .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
      .setTimestamp()
      logKanal.send(embed)
    }
    if(oldUserChannel == null){
      const embed = new MessageEmbed()
      .setColor('#0AFF00')
      .setTitle('Sesli Kanal')
      .addField('Kanala giren:',`<@${newState.id}>  | \`${oldState.id}\``,true)
      .addField('Kanalın ismi:',`<#${newState.channelID}>`,true)
      .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
      .setTimestamp()
      logKanal.send(embed)
    }
  //}

})


client.on('emojiCreate', async emoji => {
    const guild = emoji.guild;
    const logKanalID = await db.fetch(`logKanal_${guild.id}`)
    if(logKanalID == null || !logKanalID) return
    const logKanal = guild.channels.cache.get(logKanalID)
    guild.fetchAuditLogs(60).then(a=>{
    const user = a.entries.first().executor
    const embed = new MessageEmbed()
    .setColor('#0AFF00')
    .setTitle('Emoji Oluşturuldu')
    .addField('Emojiyi oluşturan:',user.tag,true)
    .addField('Emoji ismi:',emoji.name,true)
    .addField('Emoji ID:',emoji.id,true)
    .setThumbnail(emoji.url)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
    })
})
client.on('emojiDelete', async emoji => {
    const guild = emoji.guild;
    const logKanalID = await db.fetch(`logKanal_${guild.id}`)
    if(logKanalID == null || !logKanalID) return
    const logKanal = guild.channels.cache.get(logKanalID)
    guild.fetchAuditLogs(62).then(a=>{
    const user = a.entries.first().executor
    const embed = new MessageEmbed()
    .setColor('#0AFF00')
    .setTitle('Emoji silindi.')
    .addField('Emojiyi silen:',user.tag,true)
    .addField('Emoji ismi:',emoji.name,true)
    .addField('Emoji ID:',emoji.id,true)
    .setThumbnail(emoji.url)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
    })
})
client.on('roleCreate', async role => {
  const guild = role.guild;
  const logKanalID = await db.fetch(`logKanal_${guild.id}`)
  if(logKanalID == null || !logKanalID) return
  const logKanal = guild.channels.cache.get('835628141413531723')
  guild.fetchAuditLogs(30).then(a=>{
  const rol = a.entries.first()
  const user = a.entries.first().executor
  const embed = new MessageEmbed()
    .setColor('#0AFF0')
    .setTitle('Rol Oluşturuldu')
    .addField('Rolü oluşturan:',user.tag,true)
    .addField('Oluşturulan rol:',rol.target.name,true)
    .addField('Rol ID:',role.id,true)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
   })
})
client.on('roleDelete', async role => {
  const guild = role.guild;
  const logKanalID = await db.fetch(`logKanal_${guild.id}`)
  if(logKanalID == null || !logKanalID) return
  const logKanal = guild.channels.cache.get('835628141413531723')
  guild.fetchAuditLogs(32).then(a=>{
  const rol = a.entries.first()
  const user = a.entries.first().executor
  const embed = new MessageEmbed()
    .setColor(role.hexColor)
    .setTitle('Rol Silindi')
    .addField('Rolü silen:',user.tag,true)
    .addField('Silinen rol:',role.name,true)
    .addField('Rol ID:',role.id,true)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
   })
})

client.on('messageUpdate', async (oldMessage,newMessage) =>{
  if(!oldMessage.guild && !newMessage.guild) return
  if( newMessage == '') return
  if(oldMessage.author.bot && newMessage.author.bot) return
  const guild = oldMessage.guild || newMessage.guild
  const logKanalID = await db.fetch(`logKanal_${guild.id}`)
  if(logKanalID == null || !logKanalID) return
  const logKanal = guild.channels.cache.get('835628158967218196')
  const embed = new MessageEmbed()
   .setColor('#0AFF00')
     .setTitle('Mesaj Güncellendi')
     .addField('Mesaj sahibi:',oldMessage.author.tag)
     .addField('Eski mesaj:',oldMessage,true)
     .addField('Yeni mesaj:',newMessage,true)
     .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
     .setTimestamp()
     .setThumbnail(oldMessage.author.avatarURL({size:4096,dynamic:true}))
    logKanal.send(embed)

})
client.on('messageDelete', async message => {
  if(!message.guild) return
  if(message.author.bot) return
  if(message.content == ".sil 1") return
  const guild = message.guild
  const logKanalID = await db.fetch(`logKanal_${guild.id}`)
  if(logKanalID == null || !logKanalID) return
  const logKanal = guild.channels.cache.get('835628158967218196')
  const embed = new MessageEmbed()
   .setColor('#0AFF00')
     .setTitle('Mesaj Silindi')
     .addField('Mesaj sahibi:',message.author.tag)
     .addField('Silinen mesaj:',message.content,true)
     .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
     .setTimestamp()
     .setThumbnail(message.author.avatarURL({size:4096,dynamic:true}))
    logKanal.send(embed)

})


client.on('guildBanAdd', async (guild, banatılan) => {
    let ban = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
    if(!ban || !ban.executor) return;

    const banatma = new Discord.MessageEmbed()
    .setTitle('Bir Kullanıcı Manuel Olarak Banlandı')
    .setColor('RED')
    .setDescription(`Banlanan Üye ID: \`${banatılan.id}\` \nÜyeyi Banlayan: ${ban.executor} \`${ban.executor.id}\``)
    .addField(`Banlanan Üye:`, banatılan)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    const kanal = guild.channels.cache.get('835978919999570020')
    kanal.send(banatma)
})

client.on('guildBanRemove', async (guild, unbanned) => {
    let bankaldır = await guild.fetchAuditLogs({type: 'MEMBER_BAN_REMOVE'}).then(audit => audit.entries.first());
    if(!bankaldır || !bankaldır.executor) return;

    const bankaldırma = new Discord.MessageEmbed()
    .setTitle('Bir Kullanıcını Banı Manuel Olarak Kaldırıldı')
    .setColor('RED')
    .setDescription(`Banı Kaldırılan ID: \`${unbanned.id}\` \nÜyeyinin Banını Kaldıran: ${bankaldır.executor} \`${bankaldır.executor.id}\``)
    .addField(`Banı Kaldırılan Üye:`, unbanned)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    const kanal = guild.channels.cache.get('835978919999570020')
    kanal.send(bankaldırma)
})

client.on('guildMemberAdd', async botekleme => {
    let ravi = await botekleme.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
    if (!botekleme.user.bot || !ravi || !ravi.executor) return;

    const eklenenbot = new Discord.MessageEmbed()
    .setTitle('Bot Eklendi')
    .setColor('GREEN')
    .setDescription(`Eklenen Bot ID: \`${botekleme.id}\` \n Botu Ekleyen: ${ravi.executor} \`${ravi.executor.id}\``)
    .addField('Eklenen Bot:', botekleme )
    .setTimestamp()
    const kanal = guild.channels.cache.get('835978919999570020')
    kanal.send(eklenenbot).catch(err => console.log('Mesaj gönderceğim kanalı bulamadım veya Mesaj gönderemedim. '));

})


//////////Log







/*client.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const thtdm = new Discord.MessageEmbed()
         .setTitle(`DM Log`)
         .setColor('"#D50000"')
         .addField(`**Mesajı atan kişi:**`, `${message.author.tag}  |  \`[${message.author.id}]\``)
         .addField(`**Mesaj:** `, message.content)
         .setThumbnail(message.author.avatarURL())
    client.channels.cache.get("838384857553305612").send(thtdm);
    }
});*/

//Sunucu ses girme....
client.on("ready", () => {
  client.channels.cache.get("843859869861806100").join();
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  let kontrol = newState.id
  if(kontrol === "853003162911113269"){
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
