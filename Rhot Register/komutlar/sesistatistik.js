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
  if(args[0]){//835619799441866822
    let myRole = message.guild.roles.cache.get("835619799441866822");
    if(message.member.roles.highest.position >= myRole.position){

      let member = message.mentions.users.first() || message.guild.members.cache.find(c => c.id === args[0]).user;
      if(!member)
      {
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Başkasının sesli kanal istatistiklerini görebilmek için onu etiketlemen veya idsini girmen gerek.`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      }

      const kId = member.id;
      const sesveri = []
      //const voiceChannel = message.guild.channels.cache.filter(c => c.type === 'voice');
      //console.log(voiceChannel)
      //const voiceChannelCount = message.guild.channels.cache.filter(c => c.type === 'voice').size;
      const yeniliste = ["843615871883935784", "843617468953919498", "843617950326194206", "843618891782815744", "843623045775753216", "843623110389530634", "843622872324505651", "845009180149547058", "843627379431833651", "843627450008993812", "843634573178699796", "838035732735721472"]
      //console.log(yeniliste)
      for(var i = 0; i < 12; i++){
        let database = db.fetch(`voiceData.${kId}.parentID.${yeniliste[i]}`);
        //console.log(database)

        if(database != null){
          seconds = Math.floor((database / 1000) % 60),
          minutes = Math.floor((database / (1000 * 60)) % 60),
          hours = Math.floor((database / (1000 * 60 * 60)) % 24);
          sesveri.push(`● **<#${yeniliste[i]}>** kategorisinde: \`${hours}\` Saat \`${minutes}\` Dakika \`${seconds}\` Saniye. \n ⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯`);
        }
      }
      return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(`${member.username}`, member.avatarURL({format : "png",dynamic : true}))
        .setDescription(sesveri)
        .setFooter(`Ses istatistik`, message.guild.iconURL({dynamic:true}))
      )

    }
    else{
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Başkasının sesli kanal istatistiklerini görebilmek için yeterli yetkin bulunmuyor. [<@&835619799441866822>]`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
  }


    const kId = message.member.id;
    const sesveri = []
    const yeniliste = ["843615871883935784", "843617468953919498", "843617950326194206", "843618891782815744", "843623045775753216", "843623110389530634", "843622872324505651", "845009180149547058", "843627379431833651", "843627450008993812", "843634573178699796", "838035732735721472"]
    for(var i = 0; i < 12; i++){
      let database = db.fetch(`voiceData.${kId}.parentID.${yeniliste[i]}`);
      if(database != null){
        seconds = Math.floor((database / 1000) % 60),
        minutes = Math.floor((database / (1000 * 60)) % 60),
        hours = Math.floor((database / (1000 * 60 * 60)) % 24);
        sesveri.push(`● **<#${yeniliste[i]}>** kategorisinde: \`${hours}\` Saat \`${minutes}\` Dakika \`${seconds}\` Saniye. \n ⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯`);
      }
    }
    return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL({format : "png",dynamic : true}))
      .setDescription(sesveri)
      .setFooter(`Ses istatistik`, message.guild.iconURL({dynamic:true}))
    )

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['vi', '.voiceistatistic'],
  permLevel: 0
};
exports.help = {
  name: 'stats',
  description: '',
  usage: 'kayıt'
};
