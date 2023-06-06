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


    var yetkili = await db.fetch("kayıtYetkili_" + message.guild.id)
    var rolss = db.fetch("kayıtRol_" + message.guild.id)
    var rolss2 = db.fetch("kayıtRol2_" + message.guild.id)
    if(!yetkili)
    {

      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Kayıt yetkilisi ayarlanmamış. Ayarlamak için **.kayıt-ayarla**`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if(!rolss)
    {

      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Kayıt edildiğinde verilecek **rol** ayarlanmamış. Ayarlamak için **.kayıt-ayarla**`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if(!rolss2)
    {

      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Kayıt edildiğinde verilecek **rol** ayarlanmamış. Ayarlamak için **.kayıt-ayarla**`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }


    if(message.member.roles.cache.get('835083307434770432') || message.member.roles.cache.get('835620400288497705') || message.member.roles.cache.get('835620288955547732') || message.member.roles.cache.get('835083522170421269')
  || message.member.roles.cache.get('835083580278308884') || message.member.roles.cache.get('835623076942446622') || message.member.roles.cache.get('835622904967331911')
 || message.member.roles.cache.get('835622812780986408') || message.member.roles.cache.get('835621485082050590') || message.member.roles.cache.get('835621420703809577')
 || message.member.roles.cache.get('835619799441866822') || message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
 || message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
 || message.member.roles.cache.get('835619974025576490'))
    {

      /*if(message.channel.id != "843616395249188914") {
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Kayıt komutları sadece <#843616395249188914> odasında kullanılabilir.`)
        message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
        return message.delete();
      }*/
        let member = message.mentions.users.first() || message.guild.members.cache.find(c => c.id === args[0]);
        if(!member)
        {
          const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Kayıt yapabilmek için : **.kayıt @kişi isim yaş**`)
          return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
        }
        
  if(!args[1])
  {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Kayıt yapabilmek için : **.kayıt @kişi isim yaş**`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
  }
  if(!args[2])
  {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Kayıt yapabilmek için : **.kayıt @kişi isim yaş**`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
  }
  if(args[3])
  {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Kayıt yapabilmek için : **.kayıt @kişi isim yaş**`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
  }


var isimsoyisim = args[1]
var yaş = args[2]
let kisi = message.guild.member(member)

await message.react("♀️");
await message.react("♂️");



let collector = message.createReactionCollector(
  (reaction, user) => user.id
);
collector.on("collect", async (reaction, user) => {
if(user.id == message.member.id){
  if(reaction._emoji.name === "♀️") {

    if(member.username.includes("Δ")){
      kisi.setNickname(`Δ ${isimsoyisim} | ${yaş}`)
    }
    else{
      kisi.setNickname(`▼ ${isimsoyisim} | ${yaş}`)
    }


    kisi.roles.add('835082645405958155');
    kisi.roles.add('835083101448962069');
    kisi.roles.remove('835082161836130354');
    kisi.roles.remove('835082233857572874').then(message.delete({ timeout: 10 }));

    const embed = new Discord.MessageEmbed()
        .setColor("PINK")
        .setTitle("Kayıt yapıldı")
        .setDescription(`Kayıt olan kullanıcı :  ${member} \n Verdiğim rol : <@&835082645405958155> | <@&835083101448962069>`)
        message.channel.send({embed})
        var kayıtlımı = db.fetch(`kayıtData_${member.id}_${message.guild.id}`);
        if(!kayıtlımı){
        db.set (`kayıtData_${member.id}_${message.guild.id}`,args[1]+" | "+args[2]+" || "+message.author.id)
        db.add ("kayıtSayısı_"+ message.guild.id + "_" +message.author.id, 1);
        }
        if(kayıtlımı){
        db.set (`kayıtData_${member.id}_${message.guild.id}`,args[1]+" | "+args[2]+" || "+message.author.id)
        }

}
  if(reaction._emoji.name === "♂️") {
    if(member.username.includes("Δ")){
      kisi.setNickname(`Δ ${isimsoyisim} | ${yaş}`)
    }
    else{
      kisi.setNickname(`▼ ${isimsoyisim} | ${yaş}`)
    }

    kisi.roles.add('835082956065996842');
    kisi.roles.add('835083192654233632');
    kisi.roles.remove('835082161836130354');
    kisi.roles.remove('835082233857572874').then(message.delete({ timeout: 10 }));
    const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Kayıt yapıldı")
        .setDescription(`Kayıt olan kullanıcı :  ${member} \n Verdiğim rol : <@&835082956065996842> | <@&835083192654233632>`)
        message.channel.send({embed})
        var kayıtlımı = db.fetch(`kayıtData_${member.id}_${message.guild.id}`);
        if(!kayıtlımı){
        db.set (`kayıtData_${member.id}_${message.guild.id}`,args[1]+" | "+args[2]+" || "+message.author.id)
        db.add ("kayıtSayısı_"+ message.guild.id + "_" +message.author.id, 1);
        return
        }
        if(kayıtlımı){
        db.set (`kayıtData_${member.id}_${message.guild.id}`,args[1]+" | "+args[2]+" || "+message.author.id)
        return
        }
}
}
});




//kisi.roles.add(rol)

/*const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("Kayıt işlemini yaptım.")
    .setDescription(`Kayıt olan kullanıcı :  ${member} \n Verdiğim rol : <@&${rol}>`)
    message.channel.send({embed})
    message.react('✅')
    db.add ("kayıtSayısı_"+ message.guild.id + "_" +message.author.id, 1)
    db.set (`kayıtData_${member.id}_${message.guild.id}`,args[1]+" | "+args[2])*/

    const unban = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTitle("Kayıt")
    .setThumbnail(message.author.avatarURL())
    .setDescription(`**• Kayıt yapan yetkili:** ${message.member} | ${message.member.id} \n**• Kayıt yapılan kullanıcı:** ${member.tag} | ${member.id} \n **Kayıt ismi:** ${isimsoyisim}`)
    .setTimestamp()
    var data = await db.fetch("logKanal_" + message.guild.id)
    message.client.channels.cache.get('835628177136025655').send(unban);
}

else {
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta ! (Kayıt yetkilisi : <@&${yetkili}>)`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }));
}


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['k'],
  permLevel: 0
};
exports.help = {
  name: 'kayıt',
  description: '',
  usage: 'kayıt'
};
