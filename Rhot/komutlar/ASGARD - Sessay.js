const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")
const db = require('wio.db');
const { MessageEmbed } = require('discord.js')

const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')

exports.run = async (client, message, args) => {

  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

  if(message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
  || message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
  || message.member.roles.cache.get('835619974025576490')){

      let embed = new MessageEmbed().setColor('RANDOM')

      let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
      if (!rol){
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Rolü belirtmen gerek! .sessay @rol`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      }
      let qwe = message.guild.members.cache.filter(s => s.roles.cache.has(rol.id) && s.presence.status !== 'offline' && !s.voice.channel)

      let crossArray = new Array()
      let crossÜyeler = rol.members.filter(s => s.presence.status !== "offline" && !s.voice.channel).forEach(cross => { crossArray.push(`<@!${cross.id}>`); })
      message.channel.send(`Online olup seste olmayan ${rol} rolündeki yetkili sayısı: ${qwe.size}`)
      message.channel.send(`${crossArray.join("\n")}`, { code: "xl", split: true })
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
   aliases: ['Sessay'],
   permLevel: 0
 };
 exports.help = {
   name: 'sessay',
   description: '',
   usage: 'kayıt'
 };
