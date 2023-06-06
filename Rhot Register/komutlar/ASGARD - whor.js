const Discord = require('discord.js');
const moment = require('moment');
const db = require('wio.db');
const ms = require('ms')
exports.run = async (client, message, args, reaction) => { //835083307434770432
  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }


    var yetkili = await db.fetch("kayıtYetkili_" + message.guild.id);

    if(message.member.roles.cache.get('835623076942446622') || message.member.roles.cache.get('835622904967331911')
 || message.member.roles.cache.get('835622812780986408') || message.member.roles.cache.get('835621485082050590') || message.member.roles.cache.get('835621420703809577')
 || message.member.roles.cache.get('835619799441866822') || message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
 || message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
 || message.member.roles.cache.get('835619974025576490')){



    let member = message.mentions.users.first() || message.guild.members.cache.find(c => c.id === args[0]).user;
    if(!member)
            {
              const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(`Bir kullanıcıyı kimin kayıt ettiğini görmek için: **.kbilgi @kişi**`)
              return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
            }
    if(args[1])
            {
              const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(`Bir kullanıcıyı kimin kayıt ettiğini görmek için: **.kbilgi @kişi**`)
              return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
            }
    let kisi = message.guild.member(member) || message.guild.members.cache.find(c => c.id === args[0]).user;

    var kayıtlımı = db.fetch(`kayıtData_${member.id}_${message.guild.id}`);
    if(!kayıtlımı){
      const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Bu kullanıcı daha önce kayıt olmamış!`)
          return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if(kayıtlımı){
      const embed = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setDescription(`**İsim | Yaş | Kayıt eden idsi:** ${kayıtlımı}`)
          return message.channel.send({embed})
    }

  }

  else{
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
  }


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcıbilgi'],
  permLevel: 0
};
exports.help = {
  name: 'kbilgi',
  description: '',
  usage: 'kayıt'
};
