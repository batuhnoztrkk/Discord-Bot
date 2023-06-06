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
  if(args[0]){
    let myRole = message.guild.roles.cache.get("835619799441866822");
    if(message.member.roles.highest.position >= myRole.position){

      let member = message.mentions.users.first() || message.guild.members.cache.find(c => c.id === args[0]).user;
      if(!member)
      {
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Başkasının invite sayısını görebilmek için onu etiketlemen veya idsini girmen gerek.`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      }
      let sayı = db.fetch(`invite_${member.id}`);
      if(!sayı){
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Bu kişi daha önce kimseyi davet etmemiş.`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      }

      const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`**\`${member.tag}\`** davet sayısı: \`${sayı}\``)
      return message.channel.send({embed}).then(message.delete({ timeout: 1000 }));

    }
    else{
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Başkasının invite sayısını görebilmek görebilmek için yeterli yetkin bulunmuyor. [<@&835619799441866822>]`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
  }

  let sayı = db.fetch(`invite_${message.member.id}`);
  if(!sayı){
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Daha önce birini davet etmemişsin.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
  }

  const embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setDescription(`**\`${message.member.tag}\`** davet sayın: \`${sayı}\``)
  return message.channel.send({embed}).then(message.delete({ timeout: 1000 }));


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['davet'],
  permLevel: 0
};
exports.help = {
  name: 'invite',
  description: '',
  usage: 'kayıt'
};
