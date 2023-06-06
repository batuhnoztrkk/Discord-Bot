const Discord = require("discord.js");
const ms = require("ms");
const db = require("wio.db");
const moment = require('moment')
const momentt = require("moment-duration-format")

const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
  var datas = await db.fetch("muteYetkili_" + message.guild.id)
  var mutelirol = db.fetch("muteRol_" + message.guild.id)
  if(!datas) return message.channel.send(`Mute yetkilisi ayarlanmamış. Birini mutelemek için mute yetkilisini ayarlaman gerek. Kullanım : .Mute-ayarla`)
  if(!mutelirol) return message.channel.send(`Muteli rolü ayarlanmamış. Birini mutelemek için mute rolünü ayarlaman gerek. Kullanım : .Mute-ayarla`)

  if(message.member.roles.cache.get('835083522170421269')
|| message.member.roles.cache.get('835083580278308884') || message.member.roles.cache.get('835623076942446622') || message.member.roles.cache.get('835622904967331911')
|| message.member.roles.cache.get('835622812780986408') || message.member.roles.cache.get('835621485082050590') || message.member.roles.cache.get('835621420703809577')
|| message.member.roles.cache.get('835619799441866822') || message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
|| message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
|| message.member.roles.cache.get('835619974025576490'))
  {


  let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]).user);
  /*if(!kişi) return message.channel.send(`Mute Atmam Gereken Kişiyi Belirt. Örnek kullanım: .mute <@kişi> <süre> <Sebep>`)
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Mute Atmam Gereken Kişiyi Belirt. **.mute <@kişi> <süre> <Sebep>**`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));*/
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\




//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

  /*db.add(`cezaPuan.${kişi.id}`, 5)

  let cezapuan = db.fetch(`cezaPuan.${kişi.id}`);

  db.add(`muteSorgu.${kişi.id}`, 1)

  let mutesorgu = db.fetch(`muteSorgu.${kişi.id}`);*/

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

    let muted = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(c => c.id === args[0]).user);
    if (!muted) {   const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Mute Atmam Gereken Kişiyi Belirt. **.mute <@kişi> <süre> <Sebep>**`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
   } else {
      if (muted.roles.highest.position >= message.member.roles.highest.position)
      {
        const embed = new Discord.MessageEmbed()
         .setColor("RED")
         .setDescription(`Bu Kullanıcı Senden Üst/Aynı Pozisyonda.`)
         return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      } else {
          if(!args[1]){
            const embed = new Discord.MessageEmbed()
           .setColor("RED")
           .setDescription(`Süre belirtmelisiniz. Örnek kullanım: .mute <@kişi> <süre> <Sebep>`)
           return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));}
        let mutezaman = args[1]
          .replace("sn", "s")
          .replace("dk", "m")
          .replace("sa", "h")
          .replace("gün", "d");
        if (!mutezaman) {
          const embed = new Discord.MessageEmbed()
         .setColor("RED")
         .setDescription(`Geçerli süre girmediniz. Örnek kullanım: .mute <@kişi> <süre> <Sebep>`)
         return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
        } else {
          let sebep = args.slice(2).join(' ');
          if(!args[2]) {
            const embed = new Discord.MessageEmbed()
           .setColor("RED")
           .setDescription(`Sebep girmediniz. Örnek kullanım: .mute <@kişi> <süre> <Sebep>`)
           return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
          }


          let vakit = mutezaman
            .replace("m", " dakika")
            .replace("s", " saniye")
            .replace("h", " saat")
            .replace("d", " d");

            await message.react("📜");
            await message.react("🔊");

            let collector = message.createReactionCollector(
              (reaction, user) => user.id
            );

            collector.on("collect", async (reaction, user) => {
              if(user.id == message.member.id){

  if(reaction._emoji.name === "📜") {

    var veri = db.fetch(`sicil_${kişi.id}`);
    if(!veri){
      db.set(`sicil_${kişi.id}`,`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından \`${sebep}\` Sebebiyle \`${vakit}\` Yazılı Kanallarda **Mute.**`);
    }
    var yardımcıdizi = [`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından \`${sebep}\` Sebebiyle \`${vakit}\` Yazılı Kanallarda **Mute.** \n\n${veri}`]
    db.set(`sicil_${kişi.id}`,`${yardımcıdizi}`);


  db.add(`mutecezayazı_${message.guild.id + kişi.id}`,1)
db.set(`muteli_${message.guild.id + kişi.id}`, 'muteli')
db.set(`süre_${muted.id + message.guild.id}`, mutezaman)

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

          try {

            message.channel.send(
              new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
                .setColor(`GREEN`)
                .setDescription(`<@${kişi.id}> (\`${kişi.id}\`) üye metin kanallarında susturuldu.

• Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
• Zaman: \`${vakit}\`
• Kanal: \`${message.channel.name}\`

• Sebep: \`${sebep}\``)
).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
            var log = await db.fetch("logKanal_" + message.guild.id)
            message.client.channels.cache.get('835919143021707344').send(
              new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
                .setColor(`GREEN`)
                .setDescription(`<@${kişi.id}> (\`${kişi.id}\`) üye metin kanallarında susturuldu.

• Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
• Zaman: \`${vakit}\`
• Kanal: \`${message.channel.name}\`

• Sebep: \`${sebep}\``)
            );
            var datass = await db.fetch("muteRol_" + message.guild.id)
            muted.roles.add(datass);
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

          } catch (e) {
            console.log(e);
          }

          setTimeout(async function() {
            db.delete(`süre_${kişi.id + message.guild.id}`);
            db.delete(`muteli_${message.guild.id + kişi.id}`);
            var datass = await db.fetch("muteRol_" + message.guild.id)
            var datak = await db.fetch("logKanal_" + message.guild.id)
            muted.roles.remove(
              datass,


              message.client.channels.cache.get('835919143021707344').send(
              new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
              .setColor('#494459')
              .setDescription(`<@${kişi.id}> (\`${kişi.id}\`) üyesinin metin kanallarında susturulması sonlandı.

• Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
• Zaman: \`${vakit}\`
• Kanal: \`${message.channel.name}\`

• Sebep: \`${sebep}\``))


            );
          }, ms(mutezaman));
}

if(reaction._emoji.name === "🔊") {


  var veri = db.fetch(`sicil_${kişi.id}`);
  if(!veri){
    db.set(`sicil_${kişi.id}`,`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından \`${sebep}\` Sebebiyle \`${vakit}\` Sesli Kanallarda **Mute.**`);
  }
  var yardımcıdizi = [`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından \`${sebep}\` Sebebiyle \`${vakit}\` Sesli Kanallarda **Mute.** \n\n${veri}`]
  db.set(`sicil_${kişi.id}`,`${yardımcıdizi}`);



  db.add(`mutecezases_${message.guild.id + kişi.id}`,1)
  db.set(`mutelises_${message.guild.id + kişi.id}`, 'muteli')
  db.set(`süreses_${kişi.id + message.guild.id}`, mutezaman)


  let süre = mutezaman;
    muted.voice.setMute(true, 'McxM');
            message.channel.send(
              new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
                .setColor(`GREEN`)
                .setDescription(`<@${kişi.id}> (\`${kişi.id}\`) üye 🔊 ses 🔊 kanallarında susturuldu.
        • Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
        • Zaman: \`${vakit}\`
        • Kanal: \`${message.channel.name}\`

        • Sebep: \`${sebep}\``)
        ).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));


                message.client.channels.cache.get('835919143021707344').send(
                  new Discord.MessageEmbed()
                  .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
                    .setColor(`GREEN`)
                    .setDescription(`<@${kişi.id}> (\`${kişi.id}\`) üye 🔊 ses 🔊 kanallarında susturuldu.

        • Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
        • Zaman: \`${vakit}\`
        • Kanal: \`${message.channel.name}\`

        • Sebep: \`${sebep}\``)
                );


      setTimeout(async function(){

        db.delete(`süreses_${kişi.id + message.guild.id}`);
        db.delete(`mutelises_${message.guild.id + kişi.id}`);

    muted.voice.setMute(false, 'McxM');
    message.client.channels.cache.get('835919143021707344').send(
            new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
            .setColor('#494459')
            .setDescription(`<@${kişi.id}> (\`${kişi.id}\`) üyesinin 🔊 ses 🔊 kanallarında susturulması sonlandı.

        • Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
        • Zaman: \`${vakit}\`
        • Kanal: \`${message.channel.name}\`

        • Sebep: \`${sebep}\``))

  }, ms(süre))

}

}
        })
        //
      }

    }

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
    aliases: ['m'],
    permLevel: 0
  };

  exports.help = {
    name: 'mute',
    description: 'Kullanıcıyı muteler. Kullanım: .mute <@kişi> <süre> <Sebep>',
    usage: 'mute [prefix]'
  };
