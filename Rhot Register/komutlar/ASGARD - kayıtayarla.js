const Discord = require('discord.js');
const ms = require("ms");
const moment = require('moment')
const talkedRecently = new Set();
const db = require("wio.db");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!");
  if(!args[0] || !args[1]) return message.channel.send('**Kayıt yetkilisi idsini ve kayıt rolünün idsini girmen gerek. Kayıt yetkilisi kayıt yapabilecek kayıt yaptığında kayıt rolü verilecektir.**');
  if(args[3]) return message.channel.send("Hatalı kullanım.");
  let rolyetkili = args[0]
  let kayıtrol = args[1]
  let kayıtrol2 = args[2]

  db.set ("kayıtYetkili_" + message.guild.id, rolyetkili)
  db.set ("kayıtRol_" + message.guild.id, kayıtrol)
  db.set ("kayıtRol2_" + message.guild.id, kayıtrol2)

  if(!db.fetch("kayıtYetkili_" + message.guild.id) || !db.fetch("kayıtRol_" + message.guild.id) || !db.fetch("kayıtRol_" + message.guild.id) )
  {
    ayarlar.kayıtKanal = ""
    ayarlar.kayıtRol = ""
    ayarlar.kayıtRol2 = ""
    message.channel.send("deneme")
  }
  else{
    ayarlar.kayıtKanal = db.fetch("kayıtYetkili_" + message.guild.id)
    ayarlar.kayıtRol = db.fetch("kayıtRol_" + message.guild.id)
    ayarlar.kayıtRol = db.fetch("kayıtRol2_" + message.guild.id)
    const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Kayıt yetkilisi/rolünü ayarladım.")
        .setDescription(`Kayıt yetkilisi :  <@&${rolyetkili}> \n Kayıt rolü : <@&${kayıtrol}> | <@&${kayıtrol2}>`)
        .setTimestamp()
        .setFooter(`${client.user.username} Kayıt Sistemi.`,message.guild.iconURL({ dynamic: true }))
        message.channel.send({embed})

        const unban = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle("KAYIT")
        .setThumbnail(message.author.avatarURL())
        .setDescription(`**• Kayıt kanal/rol ayarlayan yetkili : ${message.member} \n• Kayıt yetkilisi : <@&${rolyetkili}> \n Kayıt rolü : <@&${kayıtrol}>**`)
        .setTimestamp()
        .setFooter(`${client.user.username} Kayıt Sistemi.`,message.guild.iconURL({ dynamic: true }))
        var data = await db.fetch("logKanal_" + message.guild.id)
        message.client.channels.cache.get(data).send(unban);
  }

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['Kayıt-ayarla'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-ayarla',
  description: 'Mute için kanal ve yetkili ayarlar. (Ayarlanması zorunludur aksi takdirde mute komutu çalışmaz)',
  usage: 'mute-ayarla'
};
