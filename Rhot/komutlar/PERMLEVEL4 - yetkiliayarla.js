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
  let kişi = message.mentions.roles.first()
  if(!kişi) return message.channel.send('Ban yetkisi vermek istediğin rolü etiketlemen gerek.');
  //let user = message.guild.roles.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user
  //let member = message.guild.member(user)
  //var rol = (message.args.id);
  //console.log(rol)
  let rol = kişi.id
  var roletiket = `**kişi**`
  db.set ("banyetkili_" + message.guild.id, rol)

  if(!db.has("banyetkili_" + message.guild.id)){
    ayarlar.BanYetkilisi = ""
  }
  else{
    ayarlar.BanYetkilisi = db.fetch("banyetkili_" + message.guild.id)
    const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Ban yetkilisini ayarladım")
        .setDescription(`Ban yetkilisi rolü :  <@&${rol}>`)
        .setTimestamp()
        .setFooter(`${client.user.username} Ban Sistemi.`,message.guild.iconURL({dynamic:true}))
        .setImage("https://media.giphy.com/media/Vh2c84FAPVyvvjZJNM/giphy.gif")
        message.channel.send({embed});

        const unban = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle("BAN YETKİLİSİ")
        .setThumbnail(message.author.avatarURL())
        .setDescription(`**• Ban yetkilisini ayarlayan yetkili : ${message.member} \n• Ban yetkilisi rolü : <@&${rol}>**`)
        .setTimestamp()
        .setFooter(`${client.user.username} Ban Sistemi.`,message.guild.iconURL({dynamic:true}))
        var data = await db.fetch("logKanal_" + message.guild.id)
        message.client.channels.cache.get(data).send(unban);
  }

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['Ban-yetkili'],
  permLevel: 4
};

exports.help = {
  name: 'ban-yetkili',
  description: 'Ban yetkilisini ayarlar (Ayarlanması zorunludur aksi takdirde ban komutu çalışmaz)',
  usage: 'ban-yetkili'
};
