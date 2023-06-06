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



    //let member = message.mentions.users.first()  || message.guild.members.cache.find(c => c.id === args[0].user);
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]).user);
    if(!member)
            {
              const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(`Sicilini görmek istediğin kişiyi etiketlemen gerek: **.sicil @kişi**`)
              return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
            }
    if(!args[0])
            {
              const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(`Hatalı kullanım. Sicilini görmek istediğin kişiyi etiketlemen gerek: **.sicil @kişi**`)
              return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
            }
            if(args[1])
                    {
                      const embed = new Discord.MessageEmbed()
                      .setColor("RED")
                      .setDescription(`Hatalı kullanım. Sicilini görmek istediğin kişiyi etiketlemen gerek: **.sicil @kişi**`)
                      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
                    }

    var mute = db.fetch(`sicil_${member.id}`);

    if(mute === null){
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`İd yanlış veya bu kişinin sicili yok. **.sicil @kişi**`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    let page = 1;
    const uzunluk = mute.length;
    const ilk = mute.slice(0, 2000);
    const hesap = uzunluk - 2000;
    const son = mute.slice(hesap);

    if(uzunluk > 4000){
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Hata: 4000 kelime sınırı aşılıyor! Lütfen en kısa zamanda yapımcım ile iletişime geç`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }

    if(uzunluk > 2000 && uzunluk <= 4000){
      const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setTitle(`Sicil Kaydı [\`${args[0]}\`]`)
      .setDescription(`${ilk}`)
      .setFooter(`Page: ${page}`, message.guild.iconURL({dynamic:true}))
      return message.channel.send({embed}).then(msg => {
        msg.react("⬅");
        msg.react("➡");
        msg.react("❌");
        let collector = msg.createReactionCollector(
          (reaction, user) => user.id
        );
        collector.on("collect", async (reaction, user) => {
          if(user.id === message.member.id){
            if (reaction._emoji.name === "⬅") {
              if(page === 1){return message.channel.send(`girdim page: ${page}`)}

              page = page - 1;
              const mesaj = new Discord.MessageEmbed()
              .setColor("BLUE")
              .setTitle(`Sicil Kaydı [\`${args[0]}\`]`)
              .setDescription(`${ilk}`)
              .setFooter(`Page: ${page}`, message.guild.iconURL({dynamic:true}))
              msg.edit(mesaj);
            }
            if (reaction._emoji.name === "➡") {
              if(page === 2){return message.channel.send(`girdim page: ${page}`)}

              page = page + 1;
              const mesaj = new Discord.MessageEmbed()
              .setColor("BLUE")
              .setTitle(`Sicil Kaydı [\`${args[0]}\`]`)
              .setDescription(`${son}`)
              .setFooter(`Page: ${page}`, message.guild.iconURL({dynamic:true}))
              msg.edit(mesaj);

            }
            if (reaction._emoji.name === "❌") {
              page = 1;
              msg.delete();
            }
          }
        });
      })
    }

      const embed = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setTitle(`Sicil Kaydı [\`${args[0]}\`]`)
          .setDescription(`${mute}`)
          return message.channel.send({embed})


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
  aliases: ['s'],
  permLevel: 0
};
exports.help = {
  name: 'sicil',
  description: '',
  usage: 'kayıt'
};
