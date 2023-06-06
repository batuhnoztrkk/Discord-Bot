const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")
const db = require('wio.db');
const moment = require('moment')
exports.run = async (client, message, args) => {

  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

  if(message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
  || message.member.roles.cache.get('835619974025576490'))
    {

          var kontrol = db.fetch(`oban_${message.guild.id}`);
          if(kontrol){
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`Offline ban listesini temizledim. Temizlediğim idler:`)
            message.channel.send({embed})
            message.channel.send(`\`${kontrol}\``)

      db.delete(`oban_${message.guild.id}`);

      }
      else{
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Offline ban listesi zaten tertemiz.`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      }
  }

  else {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
  }

 }
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['obantemizle'],
   permLevel: 4
 };
 exports.help = {
   name: 'offlinebantemizle',
   description: '',
   usage: 'offlineban'
 };
