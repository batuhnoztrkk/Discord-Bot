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

  if(message.member.roles.cache.get('835619799441866822') || message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
 || message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
 || message.member.roles.cache.get('835619974025576490'))
{

  let kisi = message.mentions.members.first() || message.guild.members.cache.find(c => c.id === args[0]);
  if(!kisi)
  {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Yetki verebilmek için kişiyi etiketlemen veya id girmen gerek. **.Yetkiver <id veya @kisi>`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }));
  }
    if (kisi.roles.highest.position >= message.member.roles.highest.position){
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Bu kişi senle üst veya aynı role sahip olduğundan yetki veremez veya alamazsın.`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }));
    }
    await message.react("1️⃣");
    await message.react("2️⃣");
    await message.react("3️⃣");
    await message.react("4️⃣");
    await message.react("5️⃣");
    await message.react("6️⃣");
    await message.react("7️⃣");
    await message.react("8️⃣");
    await message.react("9️⃣");
    await message.react("⚠️").then(message.delete({ timeout: 15000 }));
    /*const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription("1️⃣ | Dørvakt, Njörðr         2️⃣ | Kvasir, Nøkkel \n 3️⃣ | Se Opp, Gersemi         4️⃣ | Freyja, Straffer \n 5️⃣ | Lofn, Straffende         6️⃣ | Iðunn, Straffende \n 7️⃣ | Gefjon, Straffende         8️⃣ | Frigg, Straffende \n 9️⃣ | Bil, Straffende         ⚠️ | Tüm yetkili rollerini siler")
    message.channel.send({embed}).then(msg => msg.delete({ timeout: 50000 }));*/

    let collector = message.createReactionCollector(
      (reaction, user) => user.id
    );


    collector.on("collect", async (reaction, user) => {
    if(user.id == message.member.id){
      if(reaction._emoji.name === "1️⃣") {
          kisi.roles.add('835083307434770432');
          kisi.roles.add('835623403330732073');
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${kisi} adlı kullanıcıya başarıyla <@&835083307434770432> ve <@&835623403330732073> rollerini verdim.`)
          message.channel.send({embed})

          const unban = new Discord.MessageEmbed()
          .setColor('GRAY')
          .setDescription(`**• Yetki veren:** ${message.member} | ${message.member.id}\` \n**• Yetki verilen kullanıcı** ${kisi} | ${kisi.id} \n **Verilen Roller:** <@&835083307434770432> ve <@&835623403330732073>`)
          var data = await db.fetch("logKanal_" + message.guild.id)
          return message.client.channels.cache.get('835628240180740116').send(unban);


      }
      if(reaction._emoji.name === "2️⃣") {
          kisi.roles.add('835623356887597107');
          kisi.roles.add('835620400288497705');
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${kisi} adlı kullanıcıya başarıyla <@&835623356887597107> ve <@&835620400288497705> rollerini verdim.`)
          message.channel.send({embed})

          const unban = new Discord.MessageEmbed()
          .setColor('GRAY')
          .setDescription(`**• Yetki veren:** ${message.member} | ${message.member.id}\` \n**• Yetki verilen kullanıcı** ${kisi} | ${kisi.id} \n **Verilen Roller:** <@&835623356887597107> ve <@&835620400288497705>`)
          var data = await db.fetch("logKanal_" + message.guild.id)
          return message.client.channels.cache.get('835628240180740116').send(unban);


      }

      if(reaction._emoji.name === "3️⃣") {
          kisi.roles.add('835620288955547732');
          kisi.roles.add('835623327044993085');
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${kisi} adlı kullanıcıya başarıyla <@&835620288955547732> ve <@&835623327044993085> rollerini verdim.`)
          message.channel.send({embed})

          const unban = new Discord.MessageEmbed()
          .setColor('GRAY')
          .setDescription(`**• Yetki veren:** ${message.member} | ${message.member.id}\` \n**• Yetki verilen kullanıcı** ${kisi} | ${kisi.id} \n **Verilen Roller:** <@&835620288955547732> ve <@&835623327044993085>`)
          var data = await db.fetch("logKanal_" + message.guild.id)
          return message.client.channels.cache.get('835628240180740116').send(unban);


      }

      if(reaction._emoji.name === "4️⃣") {
          kisi.roles.add('835623282106433546');
          kisi.roles.add('835083522170421269');
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${kisi} adlı kullanıcıya başarıyla <@&835623282106433546> ve <@&835083522170421269> rollerini verdim.`)
          message.channel.send({embed})

          const unban = new Discord.MessageEmbed()
          .setColor('GRAY')
          .setDescription(`**• Yetki veren:** ${message.member} | ${message.member.id}\` \n**• Yetki verilen kullanıcı** ${kisi} | ${kisi.id} \n **Verilen Roller:** <@&835623282106433546> ve <@&835083522170421269>`)
          var data = await db.fetch("logKanal_" + message.guild.id)
          return message.client.channels.cache.get('835628240180740116').send(unban);


      }

      if(reaction._emoji.name === "5️⃣") {
          kisi.roles.add('835623076942446622');
          kisi.roles.add('835083580278308884');
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${kisi} adlı kullanıcıya başarıyla <@&835623076942446622> ve <@&835083580278308884> rollerini verdim.`)
          message.channel.send({embed})

          const unban = new Discord.MessageEmbed()
          .setColor('GRAY')
          .setDescription(`**• Yetki veren:** ${message.member} | ${message.member.id}\` \n**• Yetki verilen kullanıcı** ${kisi} | ${kisi.id} \n **Verilen Roller:** <@&835623076942446622> ve <@&835083580278308884>`)
          var data = await db.fetch("logKanal_" + message.guild.id)
          return message.client.channels.cache.get('835628240180740116').send(unban);


      }

      if(reaction._emoji.name === "6️⃣") {
          kisi.roles.add('835622904967331911');
          kisi.roles.add('835083580278308884');
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${kisi} adlı kullanıcıya başarıyla <@&835622904967331911> ve <@&835083580278308884> rollerini verdim.`)
          message.channel.send({embed})

          const unban = new Discord.MessageEmbed()
          .setColor('GRAY')
          .setDescription(`**• Yetki veren:** ${message.member} | ${message.member.id}\` \n**• Yetki verilen kullanıcı** ${kisi} | ${kisi.id} \n **Verilen Roller:** <@&835622904967331911> ve <@&835083580278308884>`)
          var data = await db.fetch("logKanal_" + message.guild.id)
          return message.client.channels.cache.get('835628240180740116').send(unban);


      }

      if(reaction._emoji.name === "7️⃣") {
          kisi.roles.add('835622812780986408');
          kisi.roles.add('835083580278308884');
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${kisi} adlı kullanıcıya başarıyla <@&835622812780986408> ve <@&835083580278308884> rollerini verdim.`)
          message.channel.send({embed})

          const unban = new Discord.MessageEmbed()
          .setColor('GRAY')
          .setDescription(`**• Yetki veren:** ${message.member} | ${message.member.id}\` \n**• Yetki verilen kullanıcı** ${kisi} | ${kisi.id} \n **Verilen Roller:** <@&835622812780986408> ve <@&835083580278308884>`)
          var data = await db.fetch("logKanal_" + message.guild.id)
          return message.client.channels.cache.get('835628240180740116').send(unban);


      }

      if(reaction._emoji.name === "8️⃣") {
          kisi.roles.add('835621485082050590');
          kisi.roles.add('835083580278308884');
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${kisi} adlı kullanıcıya başarıyla <@&835621485082050590> ve <@&835083580278308884> rollerini verdim.`)
          message.channel.send({embed})

          const unban = new Discord.MessageEmbed()
          .setColor('GRAY')
          .setDescription(`**• Yetki veren:** ${message.member} | ${message.member.id}\` \n**• Yetki verilen kullanıcı** ${kisi} | ${kisi.id} \n **Verilen Roller:** <@&835621485082050590> ve <@&835083580278308884>`)
          var data = await db.fetch("logKanal_" + message.guild.id)
          return message.client.channels.cache.get('835628240180740116').send(unban);


      }

      if(reaction._emoji.name === "9️⃣") {
          kisi.roles.add('835621420703809577');
          kisi.roles.add('835083580278308884');
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${kisi} adlı kullanıcıya başarıyla <@&835621420703809577> ve <@&835083580278308884> rollerini verdim.`)
          message.channel.send({embed})

          const unban = new Discord.MessageEmbed()
          .setColor('GRAY')
          .setDescription(`**• Yetki veren:** ${message.member} | ${message.member.id}\` \n**• Yetki verilen kullanıcı** ${kisi} | ${kisi.id} \n **Verilen Roller:** <@&835621420703809577> ve <@&835083580278308884>`)
          var data = await db.fetch("logKanal_" + message.guild.id)
          return message.client.channels.cache.get('835628240180740116').send(unban);


      }

      if(reaction._emoji.name === "⚠️") {
          kisi.roles.remove('835083307434770432');
          kisi.roles.remove('835623403330732073');
          kisi.roles.remove('835623356887597107');
          kisi.roles.remove('835620400288497705');
          kisi.roles.remove('835620288955547732');
          kisi.roles.remove('835623327044993085');
          kisi.roles.remove('835623282106433546');
          kisi.roles.remove('835083522170421269');
          kisi.roles.remove('835623076942446622');
          kisi.roles.remove('835083580278308884');
          kisi.roles.remove('835622904967331911');
          kisi.roles.remove('835083580278308884');
          kisi.roles.remove('835622812780986408');
          kisi.roles.remove('835083580278308884');
          kisi.roles.remove('835621485082050590');
          kisi.roles.remove('835083580278308884');
          kisi.roles.remove('835621420703809577');
          kisi.roles.remove('835083580278308884');
          kisi.roles.remove('835621420703809577');
          kisi.roles.remove('835083580278308884');
          const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`${kisi} adlı kullanıcıya başarıyla **tüm** yetkili rollerini aldım.`)
          message.channel.send({embed})

          const unban = new Discord.MessageEmbed()
          .setColor('GRAY')
          .setDescription(`**• Yetki alan:** ${message.member} | ${message.member.id}\` \n**• Yetki alınan kullanıcı** ${kisi} | ${kisi.id} \n **Alınan Roller:** Tüm yetkili rolleri`)
          var data = await db.fetch("logKanal_" + message.guild.id)
          return message.client.channels.cache.get('835628240180740116').send(unban);
      }



    }
    });






}

else{
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }));
}


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Yetkiver'],
  permLevel: 0
};
exports.help = {
  name: 'yetkiver',
  description: '',
  usage: 'yetkiver'
};
