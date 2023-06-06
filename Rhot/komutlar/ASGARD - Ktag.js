const Discord = require('discord.js');
const moment = require('moment');
const db = require('wio.db');
const ms = require('ms')
exports.run = async (client, message, args, reaction) => {

  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

  const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`Rhot Tag: **Δ**`)
      return message.channel.send({embed})

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Tag'],
  permLevel: 0
};
exports.help = {
  name: 'tag',
  description: '',
  usage: 'tag'
};
