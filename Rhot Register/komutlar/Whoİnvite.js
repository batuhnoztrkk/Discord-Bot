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

    let myRole = message.guild.roles.cache.get("835619799441866822");
    if(message.member.roles.highest.position >= myRole.position){

        if(!args[0]){
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`Kimi kimin davet ettiğini görmek için o kişiyi etiketlemen gerek.`)
            return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
          }

      let member = message.mentions.users.first() || message.guild.members.cache.find(c => c.id === args[0]).user;
      let sayı = db.fetch(`inviteCheck_${member.id}`);
      if(!sayı){
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Böyle biri yok veya bu kişinin verisi bulunmuyor.`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      }
      let bir = sayı.slice(0 ,18)
      let iki = sayı.slice(19)
      const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`**\`${member.tag}\`** davet eden: \`${bir}\`
      Davet kodu: \`https://discord.gg/${iki}\``)
      return message.channel.send({embed}).then(message.delete({ timeout: 1000 }));

    }
    else{
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Bu komutu kullanmak için yeterli yetlin bulunmuyor. [<@&835619799441866822>]`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['davet','kdavet'],
  permLevel: 0
};
exports.help = {
  name: 'winvite',
  description: '',
  usage: 'kayıt'
};
