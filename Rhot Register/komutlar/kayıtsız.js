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
    if(message.member.roles.highest.position >= myRole.position)
    {
      
  let member = message.mentions.users.first() || message.guild.members.cache.find(c => c.id === args[0]);
  if(!member)
  {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Kayıtsız yapabilmek için : **.kayıtsız @kişi**`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
  }
  if(args[1])
  {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Kayıtsız yapabilmek için : **.kayıtsız @kişi**`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
  }


let kisi = message.guild.member(member)

  kisi.roles.set(["835082161836130354"]).then(msg => {

  kisi.roles.add("835082233857572874")
  kisi.setNickname(kisi.user.username)
  let asd = db.fetch (`kayıtData_${kisi.id}_${message.guild.id}`)
  if(asd){
    db.delete (`kayıtData_${kisi.id}_${message.guild.id}`)
  }

  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`<@${kisi.id}> adlı kullanıcının tüm rollerini aldım ve kayıtsız rollerini başarıyla verdim.`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 20000 }) && message.delete({ timeout: 20000 }));
})

}

else {
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta ! (Yetkili: <@&835619799441866822>)`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }));
}


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Kayıtsız'],
  permLevel: 0
};
exports.help = {
  name: 'kayıtsız',
  description: '',
  usage: 'kayıt'
};
