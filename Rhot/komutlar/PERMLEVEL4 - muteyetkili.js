const Discord = require('discord.js');
const ms = require("ms");
const moment = require('moment')
const talkedRecently = new Set();
const db = require("wio.db");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {return message.channel.send("Bu komut yetkili tarafından bu sunucuda kapatılmıştır.")}

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!");
  if(!args[0] || !args[1]) return message.channel.send('Mute yetkisi ve muteli rolü vermek istediğin rollerin **id** sini girmen gerek. **.mute-ayarla < Yetkili Rolün idsi> <Muteli rolün idsi>**');
  //let user = message.guild.roles.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user
  //let member = message.guild.member(user)
  //var rol = (message.args.id);
  //console.log(rol)
  let rol = args[0]
  let kanal = args[1]

  db.set ("muteRol_" + message.guild.id, kanal)
  db.set ("muteYetkili_" + message.guild.id, rol)

  if(!db.has("muteYetkili_" + message.guild.id) || !db.has("muteRol_" + message.guild.id)){
    ayarlar.MuteYetkilisi = ""
  }
  else{
    ayarlar.MuteYetkilisi = db.fetch("muteYetkili_" + message.guild.id)
    ayarlar.MuteliRol = db.fetch("muteRol_" + message.guild.id)
    const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Mute yetkilisini ve muteli rolü ayarladım.")
        .setDescription(`Mute yetkilisi rolü :  <@&${rol}>  \n  Muteli rol : <@&${kanal}>`)
        .setTimestamp()
        .setFooter(`${client.user.username} Mute Sistemi.`,message.guild.iconURL({ dynamic: true }))
        .setImage("https://media.giphy.com/media/1xkynOSsb8eFpbEood/giphy.gif")
        message.channel.send({embed});

        const unban = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle("MUTE YETKİLİSİ / KANAL")
        .setThumbnail(message.author.avatarURL())
        .setDescription(`**• Mute ayarlayan yetkili : ${message.member} \n• Mute yetkilisi rolü : <@&${rol}> \n• Muteli rolü : <@&${kanal}>**`)
        .setTimestamp()
        .setFooter(`${client.user.username} Mute Sistemi.`,message.guild.iconURL({ dynamic: true }))
        var data = await db.fetch("logKanal_" + message.guild.id)
        message.client.channels.cache.get(data).send(unban);
  }

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['Mute-ayarla'],
  permLevel: 4
};

exports.help = {
  name: 'mute-ayarla',
  description: 'Mute için kanal ve yetkili ayarlar. (Ayarlanması zorunludur aksi takdirde mute komutu çalışmaz)',
  usage: 'mute-ayarla'
};
