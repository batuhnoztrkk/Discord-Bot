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



  /*  if(!message.member.roles.cache.get(yetkili))
    {
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta ! (Kayıt yetkilisi : <@&${yetkili}>)`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }*/



    if(message.member.roles.cache.get('835083307434770432') || message.member.roles.cache.get('835620400288497705') || message.member.roles.cache.get('835620288955547732') || message.member.roles.cache.get('835083522170421269')
  || message.member.roles.cache.get('835083580278308884') || message.member.roles.cache.get('835623076942446622') || message.member.roles.cache.get('835622904967331911')
 || message.member.roles.cache.get('835622812780986408') || message.member.roles.cache.get('835621485082050590') || message.member.roles.cache.get('835621420703809577')
 || message.member.roles.cache.get('835619799441866822') || message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
 || message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
 || message.member.roles.cache.get('835619974025576490')){



    let member = message.mentions.users.first()  || message.guild.members.cache.find(c => c.id === args[0]).user;
    if(!member)
            {
              const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(`Kayıt sayısını görmek için: **.kayıtsay @kişi**`)
              return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
            }
    if(args[1])
            {
              const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(`Hatalı kullanım. Kayıt sayısını görmek için: **.kayıtsay @kişi**`)
              return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
            }
    let kisi = message.guild.member(member) || message.guild.members.cache.find(c => c.id === args[0]);

    var kayıtlımı = db.fetch("kayıtSayısı_"+ message.guild.id + "_" +member.id);
    if(!kayıtlımı){
      const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Bu kullanıcı daha önce kayıt yapmamış veya kayıt yetkilisi değil!`)
          return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if(kayıtlımı){
      const embed = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setDescription(`${member} kişinin kayıt sayısı : ${kayıtlımı}`)
          return message.channel.send({embed})
    }

  }

  else{
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta ! (Kayıt yetkilisi : <@&${yetkili}>)`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
  }


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ksay'],
  permLevel: 0
};
exports.help = {
  name: 'kayıtsay',
  description: '',
  usage: 'kayıt'
};
