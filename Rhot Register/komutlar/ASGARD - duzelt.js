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

    if(message.member.roles.cache.get('835083307434770432') || message.member.roles.cache.get('835620400288497705') || message.member.roles.cache.get('835620288955547732') || message.member.roles.cache.get('835083522170421269')
  || message.member.roles.cache.get('835083580278308884') || message.member.roles.cache.get('835623076942446622') || message.member.roles.cache.get('835622904967331911')
 || message.member.roles.cache.get('835622812780986408') || message.member.roles.cache.get('835621485082050590') || message.member.roles.cache.get('835621420703809577')
 || message.member.roles.cache.get('835619799441866822') || message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
 || message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
 || message.member.roles.cache.get('835619974025576490')){



   let member = message.mentions.users.first() || message.guild.members.cache.find(c => c.id === args[0]);
   if(!member)
   {
     const embed = new Discord.MessageEmbed()
     .setColor("RED")
     .setDescription(`İsim değiştirmek için: **.duzelt @kişi isim yaş** ||Sadece yanlış isim kayıtlarında kullanın||`)
     return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
   }
   if(!args[1])
   {
     const embed = new Discord.MessageEmbed()
     .setColor("RED")
     .setDescription(`İsim değiştirmek için: **.duzelt @kişi isim yaş** ||Sadece yanlış isim kayıtlarında kullanın||`)
     return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
   }
   if(!args[2])
   {
     const embed = new Discord.MessageEmbed()
     .setColor("RED")
     .setDescription(`İsim değiştirmek için: **.duzelt @kişi isim yaş** ||Sadece yanlış isim kayıtlarında kullanın||`)
     return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
   }
   if(args[3])
   {
     const embed = new Discord.MessageEmbed()
     .setColor("RED")
     .setDescription(`İsim değiştirmek için: **.duzelt @kişi isim yaş** ||Sadece yanlış isim kayıtlarında kullanın||`)
     return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
   }

   let kisi = message.guild.member(member);
   var isimsoyisim = args[1]
   var yaş = args[2]
   if(kisi.user.username.includes("Δ")){
    kisi.setNickname(`Δ ${isimsoyisim} | ${yaş}`)
    const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`${kisi}, yeni kullanıcı adı **Δ ${isimsoyisim} | ${yaş}** olarak güncellendi.`)
    message.channel.send({embed}).then(msg => msg.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  }
  else{
    kisi.setNickname(`▼ ${isimsoyisim} | ${yaş}`)
    const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`${kisi}, yeni kullanıcı adı **▼ ${isimsoyisim} | ${yaş}** olarak güncellendi.`)
    message.channel.send({embed}).then(msg => msg.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));
  }
  db.set (`kayıtData_${kisi.id}_${message.guild.id}`,args[1]+" | "+args[2]+" || "+message.author.id)

   const unban = new Discord.MessageEmbed()
   .setColor('BLACK')
   .setTitle("İsim değişikliği")
   .setThumbnail(message.author.avatarURL())
   .setDescription(`**• İsim değişikliği yapan yetkili:** ${message.member} | ${message.member.id} \n**• İsmi değiştirilen kullanıcı:** ${member} | ${member.id} \n **Yeni isim:** ${isimsoyisim}  | ${yaş}`)
   .setTimestamp()
   var data = await db.fetch("logKanal_" + message.guild.id)
   return message.client.channels.cache.get('835885873319903232').send(unban);
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
  aliases: ['düzelt'],
  permLevel: 0
};
exports.help = {
  name: 'duzelt',
  description: '',
  usage: 'duzenle'
};
