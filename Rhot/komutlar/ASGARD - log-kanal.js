const Discord = require('discord.js');
const ms = require("ms");
const moment = require('moment')
const talkedRecently = new Set();
const db = require("wio.db");
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {

  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!");
  let kanal = message.mentions.channels.first()
  if(!kanal) return message.channel.send('Log kanalının etiketlemen gerek.');
  let rol = kanal.id
  var roletiket = `**<#${rol}>**`
  db.set ("logKanal_" + message.guild.id, rol)

  if(!db.has("logKanal_" + message.guild.id)){

  }
  else{
    //ayarlar.BanYetkilisi = db.fetch("logKanal_" + message.guild.id)
    const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Log kanalını ayarladım.")
        .setDescription(`Log kanalı : ` + roletiket)
        .setTimestamp()
        .setFooter(`${client.user.username} Log Sistemi.`,message.guild.iconURL({ dynamic: true }))
        .setImage("https://media.giphy.com/media/3o7WIz0R4XwKgs2fHG/giphy.gif")
        message.channel.send({embed});

  }
message.client.channels.cache.get(rol).send("Log kanalı artık burada. Kullanılan tüm komutların logları bu kanalda tutulacak.");
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['l-a','Log-kanal'],
  permLevel: 0
};

exports.help = {
  name: 'log-kanal',
  description: 'Ban yetkilisini ayarlar (Ayarlanması zorunludur aksi takdirde bir çok komut çalışmaz)',
  usage: 'log-kanal'
};
